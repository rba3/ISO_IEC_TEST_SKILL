/* ============================================================
   Examen ISO/IEC — lógica principal (sin backend)
   ============================================================ */
(function () {
  "use strict";

  var DURACION_MIN = 30;                 // límite del examen en minutos
  var UMBRAL_APROBACION = 70;            // porcentaje mínimo para aprobar
  var STORAGE_KEY = "iso_iec_quiz_estado";

  // --- Estado en memoria ---
  var estado = {
    usuario: null,        // { nombre, puesto, correo }
    preguntas: [],        // preguntas barajadas con opciones barajadas
    indice: 0,            // pregunta actual
    inicioTs: null,       // timestamp de inicio
    finTs: null,          // timestamp de fin
    tiempoRestante: DURACION_MIN * 60,
    terminado: false
  };
  var intervalo = null;

  // --- Utilidades ---
  function $(sel) { return document.querySelector(sel); }
  function crearEl(tag, clase) { var e = document.createElement(tag); if (clase) e.className = clase; return e; }

  function barajar(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function mostrarPantalla(id) {
    ["screen-registro", "screen-examen", "screen-resultados"].forEach(function (s) {
      $("#" + s).classList.toggle("hidden", s !== id);
    });
    window.scrollTo(0, 0);
  }

  function correoValido(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  // --- Preparar preguntas: barajar preguntas y opciones ---
  function prepararPreguntas() {
    var base = barajar(window.QUESTIONS);
    return base.map(function (q) {
      var opciones = q.opciones.map(function (texto, i) {
        return { texto: texto, esCorrecta: i === q.correct };
      });
      opciones = barajar(opciones);
      return {
        norma: q.norma,
        enunciado: q.enunciado,
        explicacion: q.explicacion,
        opciones: opciones,
        respuesta: null   // índice elegido dentro de opciones barajadas
      };
    });
  }

  // --- Persistencia ligera (para no perder avance al recargar) ---
  function guardarEstado() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        usuario: estado.usuario,
        preguntas: estado.preguntas,
        indice: estado.indice,
        inicioTs: estado.inicioTs,
        terminado: estado.terminado
      }));
    } catch (e) { /* almacenamiento no disponible: se continúa en memoria */ }
  }

  function limpiarEstado() {
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
  }

  function restaurarEstado() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return false;
      var d = JSON.parse(raw);
      if (!d || !d.usuario || !d.preguntas || d.terminado) return false;
      var transcurrido = Math.floor((Date.now() - d.inicioTs) / 1000);
      var restante = DURACION_MIN * 60 - transcurrido;
      if (restante <= 0) return false;    // se acabó el tiempo estando fuera
      estado.usuario = d.usuario;
      estado.preguntas = d.preguntas;
      estado.indice = d.indice || 0;
      estado.inicioTs = d.inicioTs;
      estado.tiempoRestante = restante;
      return true;
    } catch (e) { return false; }
  }

  // ============================================================
  //  REGISTRO
  // ============================================================
  function initRegistro() {
    var form = $("#form-registro");
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      if (!validarRegistro()) return;
      estado.usuario = {
        nombre: $("#nombre").value.trim(),
        puesto: $("#puesto").value.trim(),
        correo: $("#correo").value.trim()
      };
      estado.preguntas = prepararPreguntas();
      estado.indice = 0;
      estado.inicioTs = Date.now();
      estado.tiempoRestante = DURACION_MIN * 60;
      estado.terminado = false;
      guardarEstado();
      iniciarExamen();
    });
  }

  function marcarError(campo, msg) {
    $("#" + campo).classList.toggle("invalid", !!msg);
    document.querySelector('.error[data-for="' + campo + '"]').textContent = msg || "";
  }

  function validarRegistro() {
    var ok = true;
    var nombre = $("#nombre").value.trim();
    var puesto = $("#puesto").value.trim();
    var correo = $("#correo").value.trim();
    if (!nombre) { marcarError("nombre", "Escribe tu nombre completo."); ok = false; } else marcarError("nombre", "");
    if (!puesto) { marcarError("puesto", "Escribe tu puesto."); ok = false; } else marcarError("puesto", "");
    if (!correo) { marcarError("correo", "Escribe tu correo."); ok = false; }
    else if (!correoValido(correo)) { marcarError("correo", "El correo no tiene un formato válido."); ok = false; }
    else marcarError("correo", "");
    return ok;
  }

  // ============================================================
  //  EXAMEN
  // ============================================================
  function iniciarExamen() {
    $("#q-total").textContent = estado.preguntas.length;
    $("#timer").classList.remove("hidden");
    mostrarPantalla("screen-examen");
    renderPregunta();
    arrancarTimer();
  }

  function arrancarTimer() {
    actualizarTimer();
    intervalo = setInterval(function () {
      estado.tiempoRestante--;
      if (estado.tiempoRestante <= 0) {
        estado.tiempoRestante = 0;
        actualizarTimer();
        finalizar(true);
        return;
      }
      actualizarTimer();
    }, 1000);
  }

  function actualizarTimer() {
    var m = Math.floor(estado.tiempoRestante / 60);
    var s = estado.tiempoRestante % 60;
    var el = $("#timer");
    el.textContent = (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
    el.classList.toggle("warning", estado.tiempoRestante <= 300 && estado.tiempoRestante > 60);
    el.classList.toggle("danger", estado.tiempoRestante <= 60);
  }

  function renderPregunta() {
    var q = estado.preguntas[estado.indice];
    var total = estado.preguntas.length;
    $("#q-actual").textContent = estado.indice + 1;
    $("#progress-fill").style.width = ((estado.indice + 1) / total * 100) + "%";
    $("#unanswered-note").classList.add("hidden");

    var cont = $("#pregunta-container");
    cont.innerHTML = "";

    var norma = crearEl("span", "pregunta-norma");
    norma.textContent = q.norma;
    cont.appendChild(norma);

    var texto = crearEl("div", "pregunta-texto");
    texto.textContent = (estado.indice + 1) + ". " + q.enunciado;
    cont.appendChild(texto);

    var ul = crearEl("ul", "opciones");
    q.opciones.forEach(function (op, i) {
      var li = crearEl("li", "opcion" + (q.respuesta === i ? " seleccionada" : ""));
      var input = crearEl("input");
      input.type = "radio";
      input.name = "opcion";
      input.value = i;
      input.checked = q.respuesta === i;
      input.addEventListener("change", function () { seleccionar(i); });
      var span = crearEl("span");
      span.textContent = op.texto;
      li.appendChild(input);
      li.appendChild(span);
      li.addEventListener("click", function (e) {
        if (e.target.tagName !== "INPUT") { input.checked = true; seleccionar(i); }
      });
      ul.appendChild(li);
    });
    cont.appendChild(ul);

    // Botones de navegación
    $("#btn-anterior").disabled = estado.indice === 0;
    var esUltima = estado.indice === total - 1;
    $("#btn-siguiente").classList.toggle("hidden", esUltima);
    $("#btn-finalizar").classList.toggle("hidden", !esUltima);
  }

  function seleccionar(i) {
    estado.preguntas[estado.indice].respuesta = i;
    guardarEstado();
    // refrescar resaltado sin re-render completo
    var lis = $("#pregunta-container").querySelectorAll(".opcion");
    lis.forEach(function (li, idx) { li.classList.toggle("seleccionada", idx === i); });
    $("#unanswered-note").classList.add("hidden");
  }

  function initNavegacion() {
    $("#btn-anterior").addEventListener("click", function () {
      if (estado.indice > 0) { estado.indice--; renderPregunta(); window.scrollTo(0, 0); }
    });
    $("#btn-siguiente").addEventListener("click", function () {
      if (estado.indice < estado.preguntas.length - 1) { estado.indice++; renderPregunta(); window.scrollTo(0, 0); }
    });
    $("#btn-finalizar").addEventListener("click", function () {
      var sinResponder = contarSinResponder();
      if (sinResponder > 0) {
        var nota = $("#unanswered-note");
        nota.textContent = "Te faltan " + sinResponder + " pregunta(s) por responder. Puedes finalizar de todas formas o regresar a completarlas.";
        nota.classList.remove("hidden");
        // segundo clic confirma
        $("#btn-finalizar").textContent = "Finalizar de todas formas";
        $("#btn-finalizar").onclick = function () { finalizar(false); };
        return;
      }
      finalizar(false);
    });
  }

  function contarSinResponder() {
    return estado.preguntas.filter(function (q) { return q.respuesta === null; }).length;
  }

  // ============================================================
  //  RESULTADOS
  // ============================================================
  function calcular() {
    var aciertos = 0;
    estado.preguntas.forEach(function (q) {
      if (q.respuesta !== null && q.opciones[q.respuesta].esCorrecta) aciertos++;
    });
    var total = estado.preguntas.length;
    var porcentaje = Math.round(aciertos / total * 100);
    return {
      aciertos: aciertos,
      total: total,
      porcentaje: porcentaje,
      aprobado: porcentaje >= UMBRAL_APROBACION
    };
  }

  function tiempoUsadoTexto() {
    var seg = Math.min(DURACION_MIN * 60, Math.floor((estado.finTs - estado.inicioTs) / 1000));
    var m = Math.floor(seg / 60);
    var s = seg % 60;
    return m + " min " + (s < 10 ? "0" : "") + s + " s";
  }

  function fechaTexto() {
    var d = new Date(estado.finTs);
    return d.toLocaleDateString("es-MX") + " " + d.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" });
  }

  function finalizar(porTiempo) {
    if (estado.terminado) return;
    estado.terminado = true;
    estado.finTs = Date.now();
    if (intervalo) clearInterval(intervalo);
    limpiarEstado();

    var r = calcular();
    $("#timer").classList.add("hidden");
    renderResumen(r, porTiempo);
    renderRevision();
    mostrarPantalla("screen-resultados");

    // Descarga automática del PDF
    setTimeout(function () { generarPDF(r); }, 350);
  }

  function renderResumen(r, porTiempo) {
    var cont = $("#resultado-resumen");
    cont.innerHTML = "";

    if (porTiempo) {
      var aviso = crearEl("div", "resultado-datos");
      aviso.innerHTML = "<strong>Se agotó el tiempo.</strong> El examen se envió automáticamente con tus respuestas registradas.";
      aviso.style.marginBottom = "14px";
      cont.appendChild(aviso);
    }

    var score = crearEl("div", "resultado-score");
    score.textContent = r.aciertos + " / " + r.total;
    cont.appendChild(score);

    var porc = crearEl("div", "resultado-porc");
    porc.textContent = r.porcentaje + "% de aciertos";
    cont.appendChild(porc);

    var badge = crearEl("div", "badge-estado " + (r.aprobado ? "badge-aprobado" : "badge-reprobado"));
    badge.textContent = r.aprobado ? "APROBADO" : "NO APROBADO";
    cont.appendChild(badge);

    var datos = crearEl("div", "resultado-datos");
    datos.innerHTML =
      "<div><strong>" + escapar(estado.usuario.nombre) + "</strong> — " + escapar(estado.usuario.puesto) + "</div>" +
      "<div>" + escapar(estado.usuario.correo) + "</div>" +
      "<div>Fecha: " + fechaTexto() + " · Tiempo utilizado: " + tiempoUsadoTexto() + "</div>" +
      "<div>Umbral de aprobación: " + UMBRAL_APROBACION + "%</div>";
    cont.appendChild(datos);
  }

  function renderRevision() {
    var cont = $("#revision-container");
    cont.innerHTML = "";
    estado.preguntas.forEach(function (q, idx) {
      var correctaIdx = -1;
      q.opciones.forEach(function (o, i) { if (o.esCorrecta) correctaIdx = i; });
      var acerto = q.respuesta !== null && q.opciones[q.respuesta].esCorrecta;

      var item = crearEl("div", "revision-item " + (acerto ? "correcta" : "incorrecta"));

      var num = crearEl("div", "revision-num");
      num.textContent = "Pregunta " + (idx + 1) + " · " + q.norma + " · " + (acerto ? "Correcta" : "Incorrecta");
      item.appendChild(num);

      var preg = crearEl("div", "revision-preg");
      preg.textContent = q.enunciado;
      item.appendChild(preg);

      var tuResp = crearEl("div", "revision-linea");
      var tuTexto = q.respuesta === null ? "(sin responder)" : q.opciones[q.respuesta].texto;
      tuResp.innerHTML = '<span class="etq">Tu respuesta:</span> <span class="' +
        (acerto ? "txt-correcta" : "txt-incorrecta") + '">' + escapar(tuTexto) + "</span>";
      item.appendChild(tuResp);

      if (!acerto) {
        var corr = crearEl("div", "revision-linea");
        corr.innerHTML = '<span class="etq">Respuesta correcta:</span> <span class="txt-correcta">' +
          escapar(q.opciones[correctaIdx].texto) + "</span>";
        item.appendChild(corr);
      }

      var expl = crearEl("div", "revision-expl");
      expl.textContent = q.explicacion;
      item.appendChild(expl);

      cont.appendChild(item);
    });
  }

  function escapar(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function initResultados() {
    $("#btn-descargar-pdf").addEventListener("click", function () { generarPDF(calcular()); });
    $("#btn-reiniciar").addEventListener("click", function () {
      limpiarEstado();
      window.location.reload();
    });
  }

  // ============================================================
  //  PDF (jsPDF)
  // ============================================================
  function generarPDF(r) {
    var jsPDFctor = (window.jspdf && window.jspdf.jsPDF) || window.jsPDF;
    if (!jsPDFctor) { alert("No se pudo cargar el generador de PDF."); return; }

    var doc = new jsPDFctor({ unit: "pt", format: "a4" });
    var W = doc.internal.pageSize.getWidth();
    var H = doc.internal.pageSize.getHeight();
    var margen = 48;
    var y = margen;
    var anchoTexto = W - margen * 2;

    function nuevaPaginaSiHaceFalta(alto) {
      if (y + alto > H - margen) { doc.addPage(); y = margen; }
    }

    // Encabezado
    doc.setFillColor(18, 58, 94);
    doc.rect(0, 0, W, 70, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Examen ISO/IEC — Calidad y Pruebas de Software", margen, 34);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("Normas: ISO/IEC 25010, 25023, 25040, 29119, 24765", margen, 52);
    y = 96;

    // Datos del participante
    doc.setTextColor(28, 39, 51);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Datos del participante", margen, y); y += 18;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text("Nombre: " + estado.usuario.nombre, margen, y); y += 15;
    doc.text("Puesto: " + estado.usuario.puesto, margen, y); y += 15;
    doc.text("Correo: " + estado.usuario.correo, margen, y); y += 15;
    doc.text("Fecha: " + fechaTexto() + "    Tiempo utilizado: " + tiempoUsadoTexto(), margen, y); y += 24;

    // Resultado
    doc.setFillColor(232, 240, 251);
    doc.roundedRect(margen, y, anchoTexto, 60, 6, 6, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(18, 58, 94);
    doc.text("Resultado: " + r.aciertos + " / " + r.total + "  (" + r.porcentaje + "%)", margen + 16, y + 26);
    doc.setFontSize(12);
    if (r.aprobado) doc.setTextColor(26, 127, 75); else doc.setTextColor(192, 57, 43);
    doc.text(r.aprobado ? "APROBADO" : "NO APROBADO", margen + 16, y + 46);
    doc.setTextColor(91, 104, 117);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("Umbral de aprobación: " + UMBRAL_APROBACION + "%", margen + anchoTexto - 16, y + 46, { align: "right" });
    y += 82;

    // Detalle de respuestas
    doc.setTextColor(28, 39, 51);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Detalle de respuestas", margen, y); y += 18;

    estado.preguntas.forEach(function (q, idx) {
      var correctaIdx = -1;
      q.opciones.forEach(function (o, i) { if (o.esCorrecta) correctaIdx = i; });
      var acerto = q.respuesta !== null && q.opciones[q.respuesta].esCorrecta;
      var tuTexto = q.respuesta === null ? "(sin responder)" : q.opciones[q.respuesta].texto;

      // Enunciado
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10.5);
      doc.setTextColor(28, 39, 51);
      var preg = doc.splitTextToSize((idx + 1) + ". [" + q.norma + "] " + q.enunciado, anchoTexto);
      nuevaPaginaSiHaceFalta(preg.length * 13 + 46);
      doc.text(preg, margen, y); y += preg.length * 13 + 3;

      // Tu respuesta
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      if (acerto) doc.setTextColor(26, 127, 75); else doc.setTextColor(192, 57, 43);
      var tr = doc.splitTextToSize("Tu respuesta: " + tuTexto + (acerto ? "  (correcta)" : "  (incorrecta)"), anchoTexto);
      nuevaPaginaSiHaceFalta(tr.length * 12 + 26);
      doc.text(tr, margen, y); y += tr.length * 12 + 2;

      // Respuesta correcta (si falló)
      if (!acerto) {
        doc.setTextColor(26, 127, 75);
        var rc = doc.splitTextToSize("Respuesta correcta: " + q.opciones[correctaIdx].texto, anchoTexto);
        nuevaPaginaSiHaceFalta(rc.length * 12 + 14);
        doc.text(rc, margen, y); y += rc.length * 12 + 2;
      }
      y += 8;
    });

    // Pie con numeración de páginas
    var totalPag = doc.internal.getNumberOfPages();
    for (var p = 1; p <= totalPag; p++) {
      doc.setPage(p);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(150, 160, 170);
      doc.text("Examen ISO/IEC · Página " + p + " de " + totalPag, W / 2, H - 20, { align: "center" });
    }

    var nombreArchivo = "Resultado_ISO_IEC_" + limpiarNombreArchivo(estado.usuario.nombre) + ".pdf";
    doc.save(nombreArchivo);
  }

  function limpiarNombreArchivo(s) {
    return String(s).normalize("NFD").replace(/[̀-ͯ]/g, "")
      .replace(/[^a-zA-Z0-9]+/g, "_").replace(/^_+|_+$/g, "") || "participante";
  }

  // ============================================================
  //  ARRANQUE
  // ============================================================
  function init() {
    initRegistro();
    initNavegacion();
    initResultados();

    // Restaurar examen en curso si el usuario recargó
    if (restaurarEstado()) {
      iniciarExamen();
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();

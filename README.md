# Examen ISO/IEC — Calidad y Pruebas de Software

Sitio web estático (sin backend) que aplica un examen de opción múltiple sobre las normas:

- **ISO/IEC 25010** — Modelo de calidad del producto y calidad en uso
- **ISO/IEC 25023** — Medición de la calidad del producto
- **ISO/IEC 25040** — Proceso de evaluación de la calidad
- **ISO/IEC/IEEE 29119** — Pruebas de software (testing)
- **ISO/IEC/IEEE 24765** — Vocabulario de ingeniería de software y sistemas (SEVOCAB)

## Características

- 25 preguntas de opción múltiple (se barajan preguntas y opciones en cada intento).
- Registro del participante: nombre, puesto y correo electrónico.
- Temporizador con límite de **30 minutos**; al agotarse, el examen se envía automáticamente.
- Calificación automática con umbral de aprobación del **70%**.
- Revisión pregunta por pregunta: tu respuesta vs. la respuesta correcta, con una explicación breve.
- Reporte en **PDF** que se descarga de forma automática al terminar y también con un botón manual.
- **Sin base de datos**: la información del participante solo vive en su navegador
  (memoria y `localStorage` para no perder el avance si recarga). No se envía nada a ningún servidor.

## Uso

Abre `index.html` en un navegador, o publícalo en GitHub Pages y comparte el enlace.

## Estructura

- `index.html` — pantallas de registro, examen y resultados.
- `styles.css` — estilos.
- `questions.js` — banco de 25 preguntas.
- `app.js` — lógica del examen, temporizador, calificación y generación de PDF.
- `vendor/jspdf.umd.min.js` — librería jsPDF (incluida localmente).

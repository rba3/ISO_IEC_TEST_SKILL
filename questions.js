// Banco de preguntas del examen ISO/IEC.
// Cada pregunta: norma, enunciado, opciones (4), indice de la correcta (correct), y una explicacion breve.
window.QUESTIONS = [
  // ===================== ISO/IEC 25010 =====================
  {
    norma: "ISO/IEC 25010",
    enunciado: "¿Qué describe principalmente la norma ISO/IEC 25010?",
    opciones: [
      "Un modelo de calidad para el producto software y la calidad en uso",
      "Un proceso para gestionar riesgos de seguridad de la información",
      "Un método para estimar el costo de un proyecto de software",
      "Un lenguaje para modelar bases de datos relacionales"
    ],
    correct: 0,
    explicacion: "La 25010 define el modelo de calidad: la calidad del producto (8 características) y la calidad en uso."
  },
  {
    norma: "ISO/IEC 25010",
    enunciado: "¿Cuántas características de calidad del producto define el modelo de la ISO/IEC 25010?",
    opciones: ["5", "6", "8", "10"],
    correct: 2,
    explicacion: "El modelo de calidad del producto tiene 8 características, cada una con sus subcaracterísticas."
  },
  {
    norma: "ISO/IEC 25010",
    enunciado: "La capacidad de un sistema para funcionar correctamente cuando se traslada a un entorno distinto corresponde a la característica de:",
    opciones: ["Fiabilidad", "Portabilidad", "Usabilidad", "Compatibilidad"],
    correct: 1,
    explicacion: "Portabilidad es el grado en que el sistema puede transferirse de un entorno de hardware, software u operativo a otro."
  },
  {
    norma: "ISO/IEC 25010",
    enunciado: "¿Cuál de las siguientes NO es una característica del modelo de calidad del producto de la ISO/IEC 25010?",
    opciones: ["Mantenibilidad", "Seguridad", "Rentabilidad", "Eficiencia de desempeño"],
    correct: 2,
    explicacion: "La rentabilidad no es una característica del modelo. Las ocho son: adecuación funcional, eficiencia de desempeño, compatibilidad, usabilidad, fiabilidad, seguridad, mantenibilidad y portabilidad."
  },
  {
    norma: "ISO/IEC 25010",
    enunciado: "La 'calidad en uso' de la ISO/IEC 25010 se refiere sobre todo a:",
    opciones: [
      "El resultado de usar el producto en un contexto real (eficacia, eficiencia, satisfacción, entre otros)",
      "El número de defectos encontrados durante las pruebas unitarias",
      "El cumplimiento de las políticas internas de la organización",
      "La cantidad de líneas de código del producto"
    ],
    correct: 0,
    explicacion: "La calidad en uso mide el resultado de la interacción del usuario con el producto en un contexto específico: eficacia, eficiencia, satisfacción, ausencia de riesgo y cobertura de contexto."
  },
  {
    norma: "ISO/IEC 25010",
    enunciado: "¿A qué característica pertenece la subcaracterística 'capacidad de ser probado' (testability)?",
    opciones: ["Usabilidad", "Fiabilidad", "Mantenibilidad", "Compatibilidad"],
    correct: 2,
    explicacion: "La capacidad de ser probado es una subcaracterística de la mantenibilidad, junto con modularidad, reusabilidad, analizabilidad y modificabilidad."
  },

  // ===================== ISO/IEC 25023 =====================
  {
    norma: "ISO/IEC 25023",
    enunciado: "¿Cuál es el propósito principal de la ISO/IEC 25023?",
    opciones: [
      "Definir métricas para medir la calidad del producto software descrita en la 25010",
      "Establecer los requisitos de un sistema de gestión de calidad",
      "Especificar cómo redactar casos de prueba automatizados",
      "Describir el ciclo de vida del desarrollo ágil"
    ],
    correct: 0,
    explicacion: "La 25023 proporciona medidas (métricas) para evaluar cuantitativamente las características y subcaracterísticas de calidad del producto definidas en la 25010."
  },
  {
    norma: "ISO/IEC 25023",
    enunciado: "Dentro de la familia SQuaRE (25000), la 25023 pertenece a la división de:",
    opciones: [
      "Requisitos de calidad",
      "Medición de la calidad",
      "Gestión de la calidad",
      "Modelo de calidad"
    ],
    correct: 1,
    explicacion: "La 25023 forma parte de la división de medición de calidad (2502n) de la serie SQuaRE."
  },
  {
    norma: "ISO/IEC 25023",
    enunciado: "Una medida de calidad según la ISO/IEC 25023 típicamente se expresa como:",
    opciones: [
      "Una opinión subjetiva del líder de proyecto",
      "Una fórmula o función de medición que produce un valor cuantitativo",
      "Un color asignado a cada requisito",
      "El nombre del responsable de la prueba"
    ],
    correct: 1,
    explicacion: "Las medidas se definen mediante una función de medición que combina elementos medidos y produce un valor numérico interpretable."
  },
  {
    norma: "ISO/IEC 25023",
    enunciado: "Las métricas de la ISO/IEC 25023 están directamente asociadas a las características de:",
    opciones: [
      "La ISO/IEC 25010 (calidad del producto)",
      "La ISO 9001 (sistema de gestión)",
      "La ISO/IEC 27001 (seguridad de la información)",
      "La ISO/IEC 12207 (procesos de ciclo de vida)"
    ],
    correct: 0,
    explicacion: "La 25023 mide las mismas 8 características y sus subcaracterísticas definidas por el modelo de calidad del producto de la 25010."
  },
  {
    norma: "ISO/IEC 25023",
    enunciado: "¿Para qué sirve normalizar el resultado de una medida (por ejemplo, a un rango de 0 a 1) en la ISO/IEC 25023?",
    opciones: [
      "Para poder comparar e interpretar medidas de distinta naturaleza de forma homogénea",
      "Para reducir el tamaño del código fuente",
      "Para eliminar la necesidad de pruebas",
      "Para cifrar los datos del proyecto"
    ],
    correct: 0,
    explicacion: "Normalizar permite interpretar y comparar medidas heterogéneas contra un objetivo común, facilitando la evaluación."
  },

  // ===================== ISO/IEC 25040 =====================
  {
    norma: "ISO/IEC 25040",
    enunciado: "¿Qué define principalmente la ISO/IEC 25040?",
    opciones: [
      "El proceso de referencia para evaluar la calidad del producto software",
      "El modelo de datos de una aplicación web",
      "Las reglas de codificación segura",
      "El formato de los reportes financieros de un proyecto"
    ],
    correct: 0,
    explicacion: "La 25040 describe el proceso de evaluación de la calidad del producto software, con sus actividades y tareas."
  },
  {
    norma: "ISO/IEC 25040",
    enunciado: "¿Cuál es normalmente la PRIMERA actividad del proceso de evaluación de la ISO/IEC 25040?",
    opciones: [
      "Establecer los requisitos de la evaluación",
      "Ejecutar la evaluación",
      "Emitir el informe final",
      "Concluir la evaluación"
    ],
    correct: 0,
    explicacion: "El proceso inicia estableciendo los requisitos de la evaluación (propósito, alcance, rigor), antes de especificar, diseñar, ejecutar y concluir."
  },
  {
    norma: "ISO/IEC 25040",
    enunciado: "En la ISO/IEC 25040, ¿qué se hace durante la actividad de 'especificar la evaluación'?",
    opciones: [
      "Seleccionar las métricas, definir criterios de decisión y niveles a alcanzar",
      "Instalar el software en producción",
      "Contratar al equipo de desarrollo",
      "Redactar el manual de usuario"
    ],
    correct: 0,
    explicacion: "Especificar la evaluación implica seleccionar los módulos/medidas de calidad y establecer criterios de decisión y de valoración."
  },
  {
    norma: "ISO/IEC 25040",
    enunciado: "El proceso de evaluación de la ISO/IEC 25040 puede aplicarse:",
    opciones: [
      "Solo al final del proyecto, nunca antes",
      "En distintos momentos del ciclo de vida del producto",
      "Únicamente por el cliente final",
      "Solo a software de código abierto"
    ],
    correct: 1,
    explicacion: "La evaluación puede realizarse en diferentes etapas del ciclo de vida, no solo al terminar el producto."
  },
  {
    norma: "ISO/IEC 25040",
    enunciado: "¿Qué rol cumplen los 'criterios de decisión' en la evaluación de la ISO/IEC 25040?",
    opciones: [
      "Definen los umbrales para interpretar los resultados y valorar si la calidad es aceptable",
      "Determinan el sueldo del equipo evaluador",
      "Indican el lenguaje de programación a usar",
      "Sustituyen a la ejecución de las pruebas"
    ],
    correct: 0,
    explicacion: "Los criterios de decisión fijan los umbrales que permiten interpretar las medidas y concluir si el producto cumple los objetivos de calidad."
  },

  // ===================== ISO/IEC/IEEE 29119 =====================
  {
    norma: "ISO/IEC/IEEE 29119",
    enunciado: "¿Sobre qué tema trata la familia de normas ISO/IEC/IEEE 29119?",
    opciones: [
      "Pruebas de software (testing)",
      "Gestión de configuración",
      "Arquitectura de microservicios",
      "Licenciamiento de software"
    ],
    correct: 0,
    explicacion: "La 29119 es el estándar internacional dedicado a las pruebas de software: conceptos, procesos, documentación y técnicas."
  },
  {
    norma: "ISO/IEC/IEEE 29119",
    enunciado: "La ISO/IEC/IEEE 29119 organiza las pruebas en tres niveles de proceso. ¿Cuáles son?",
    opciones: [
      "Organizacional, de gestión de pruebas y dinámico",
      "Unitario, de integración y de sistema",
      "Manual, automatizado e híbrido",
      "Funcional, no funcional y de regresión"
    ],
    correct: 0,
    explicacion: "Define procesos de prueba organizacionales, de gestión de las pruebas y procesos dinámicos de prueba."
  },
  {
    norma: "ISO/IEC/IEEE 29119",
    enunciado: "¿Qué técnica de diseño de pruebas basada en especificación está descrita en la ISO/IEC/IEEE 29119?",
    opciones: [
      "Partición de equivalencia",
      "Compilación incremental",
      "Integración continua",
      "Refactorización automática"
    ],
    correct: 0,
    explicacion: "La parte de técnicas incluye métodos como partición de equivalencia, análisis de valores límite, tablas de decisión y transición de estados."
  },
  {
    norma: "ISO/IEC/IEEE 29119",
    enunciado: "Respecto a la documentación de pruebas, la ISO/IEC/IEEE 29119:",
    opciones: [
      "Propone plantillas y contenidos para documentos como el plan de pruebas",
      "Prohíbe documentar cualquier actividad de prueba",
      "Solo aplica a videojuegos",
      "Obliga a usar una única herramienta comercial"
    ],
    correct: 0,
    explicacion: "Una de sus partes define plantillas y ejemplos de documentación de pruebas, incluyendo el plan de pruebas."
  },
  {
    norma: "ISO/IEC/IEEE 29119",
    enunciado: "El enfoque de pruebas basado en riesgo, promovido por la ISO/IEC/IEEE 29119, busca principalmente:",
    opciones: [
      "Priorizar el esfuerzo de prueba según el riesgo asociado a cada elemento",
      "Probar todo con la misma intensidad sin importar el riesgo",
      "Eliminar la fase de pruebas para ahorrar tiempo",
      "Reemplazar a los testers por documentación"
    ],
    correct: 0,
    explicacion: "El testing basado en riesgo enfoca el esfuerzo donde el impacto y la probabilidad de fallo son mayores."
  },

  // ===================== ISO/IEC/IEEE 24765 =====================
  {
    norma: "ISO/IEC/IEEE 24765",
    enunciado: "¿Qué proporciona la ISO/IEC/IEEE 24765?",
    opciones: [
      "Un vocabulario de ingeniería de sistemas y software (definiciones de términos)",
      "Un lenguaje de programación funcional",
      "Un modelo de madurez de procesos",
      "Un protocolo de red para IoT"
    ],
    correct: 0,
    explicacion: "La 24765 (SEVOCAB) es el vocabulario que reúne y define términos usados en ingeniería de sistemas y software."
  },
  {
    norma: "ISO/IEC/IEEE 24765",
    enunciado: "El vocabulario de la ISO/IEC/IEEE 24765 se conoce comúnmente con el nombre de:",
    opciones: ["SEVOCAB", "SWEBOK", "CMMI", "ITIL"],
    correct: 0,
    explicacion: "Se le conoce como SEVOCAB (Systems and software Engineering Vocabulary)."
  },
  {
    norma: "ISO/IEC/IEEE 24765",
    enunciado: "¿Cuál es el principal beneficio de contar con un vocabulario común como la ISO/IEC/IEEE 24765?",
    opciones: [
      "Reducir ambigüedades y unificar el significado de los términos entre equipos y normas",
      "Aumentar el número de defectos en el software",
      "Sustituir a todas las demás normas de calidad",
      "Obligar a usar un único idioma en el mundo"
    ],
    correct: 0,
    explicacion: "Un vocabulario común mejora la comunicación y la consistencia terminológica entre profesionales, documentos y estándares."
  },
  {
    norma: "ISO/IEC/IEEE 24765",
    enunciado: "Las definiciones incluidas en la ISO/IEC/IEEE 24765 se recopilan principalmente a partir de:",
    opciones: [
      "Otras normas y estándares de ingeniería de sistemas y software",
      "Publicaciones de mercadotecnia",
      "Comentarios anónimos en redes sociales",
      "El código fuente de un solo producto"
    ],
    correct: 0,
    explicacion: "SEVOCAB consolida definiciones provenientes de múltiples estándares reconocidos de la ingeniería de software y sistemas."
  }
];

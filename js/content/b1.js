/* Bloque 1 · Panorama de la IA y conceptos clave */
(function () {
  'use strict';
  const D = PL.D, K = PL.K;
  const { P, rect, frame, box, card, txt, chip, arrow, path, icon, sprite, robot, person, bubble, win, msg, paper, bars, probBars, meter, stamp, table, flow, show, pop, pulse, blink, glow, sparkle, qmark, typed, lerp, ease, clamp, line, measure, rnd } = D;
  const { banner, heading, mail, axes, dot, circle, knob, tokens, badge, code, vbars, scale, ticket } = K;
  const late = a => clamp(a * 2 - 1);

  PL.block({
    id: 'b1', n: 1, short: 'Panorama de IA', title: 'Panorama de la IA y conceptos clave', hours: 7, color: '#4f86e0',
    question: '¿Qué es la IA y cómo funciona un modelo generativo?',
    evidence: 'Clasificación razonada de tres herramientas',
    idea: 'La IA no es magia ni una única tecnología. Los asistentes generativos son una parte reciente de un campo más amplio y generan respuestas a partir de patrones, no de una garantía de verdad.'
  });

  /* ------------------------------------------------------------------ */
  PL.concept({
    id: 'que-es-ia', block: 'b1', title: '¿Qué es la inteligencia artificial?',
    idea: 'Un sistema de IA usa datos, reglas o modelos aprendidos para producir una salida útil ante una entrada. Su utilidad depende del problema planteado, de los datos, del diseño y de la supervisión humana.',
    explain: [
      'La inteligencia artificial es el campo que diseña sistemas capaces de realizar tareas que, en una persona, asociaríamos con percibir, clasificar, recomendar, predecir, razonar sobre información o generar contenido. La definición es amplia a propósito: entra desde un sistema de reglas que diagnostica averías hasta un modelo que redacta un informe.',
      'Conviene evitar dos extremos. Uno es presentar la IA como una mente equivalente a la humana: puede parecer inteligente sin tener experiencia, intención ni responsabilidad moral. El otro es despacharla con un «solo hace estadística», como si eso le quitara impacto: se basa en cálculo y optimización, pero sus salidas afectan a decisiones, procesos y personas.',
      'Para analizar cualquier sistema sirven tres preguntas: qué capacidad reproduce (perspectiva académica), de qué datos aprende o con qué información trabaja (técnica) y qué ocurre si se equivoca y quién responde (organizativa y regulatoria).'
    ],
    panels: [
      {
        title: 'Entrada → sistema → salida',
        caption: 'Tres tareas muy distintas comparten una misma estructura: una entrada, un sistema que aplica reglas o un modelo aprendido, y una salida útil.',
        steps: [
          'Toda IA recibe una entrada: una foto, un correo, una pregunta, una ruta…',
          'El sistema aplica reglas escritas por personas o un modelo aprendido a partir de datos.',
          'Devuelve una salida útil: una etiqueta, una probabilidad, una recomendación o un texto nuevo.',
          'La estructura es la misma en tareas muy distintas: lo que cambia es el tipo de entrada y de salida.'
        ],
        draw(g) {
          txt('ENTRADA', 79, 22, { size: 10, color: P.sky, align: 'center', weight: 700 });
          txt('SISTEMA DE IA', 240, 22, { size: 10, color: P.purple, align: 'center', weight: 700 });
          txt('SALIDA', 401, 22, { size: 10, color: P.mint, align: 'center', weight: 700 });
          const cy = [67, 127, 187];
          show(g.at(0), () => {
            box(24, 44, 110, 46, { fill: P.gray2 }); sprite('cat', 32, 55, 2); txt('foto', 64, 56, { size: 10 }); txt('de un gato', 64, 70, { size: 8, color: P.light });
            box(24, 104, 110, 46, { fill: P.gray2 }); icon('mail', 32, 115, 2); txt('correo', 64, 116, { size: 10 }); txt('recibido', 64, 130, { size: 8, color: P.light });
            box(24, 164, 110, 46, { fill: P.gray2 }); icon('chat', 32, 175, 2); txt('«Resume', 64, 176, { size: 10 }); txt('el acta»', 64, 190, { size: 8, color: P.light });
          });
          show(g.at(1), () => {
            card(186, 44, 108, 166, 'MODELO', P.purple, { active: g.on(1) });
            icon('chip', 216, 70, 4);
            if (g.from(1)) pulse(240, 94, P.purple, 22);
            chip('reglas', 240, 132, { align: 'center', fill: P.paper, w: 80 });
            chip('patrones', 240, 156, { align: 'center', fill: P.paper, w: 80 });
            chip('datos', 240, 180, { align: 'center', fill: P.paper, w: 80 });
          });
          cy.forEach(y => { arrow(136, y, 184, y, { p: g.at(1), color: P.sky }); arrow(296, y, 344, y, { p: g.at(2), color: P.mint }); });
          show(g.at(2), () => {
            chip('GATO · 97 %', 401, cy[0] - 9, { align: 'center', fill: P.mint, w: 106, size: 9 });
            chip('SPAM', 401, cy[1] - 9, { align: 'center', fill: P.red, w: 106, size: 9 });
            paper(358, 164, 86, 46, { title: 'Resumen', lines: 3 });
          });
          show(g.at(3), () => {
            txt('clasificar', 401, cy[0] + 12, { size: 8, color: P.yellow, align: 'center' });
            txt('filtrar', 401, cy[1] + 12, { size: 8, color: P.yellow, align: 'center' });
            txt('generar', 401, 214, { size: 8, color: P.yellow, align: 'center' });
            banner('Misma estructura · tareas muy distintas', { y: 236 });
          });
        }
      },
      {
        title: 'Ni mente humana ni «solo estadística»',
        caption: 'Dos extremos habituales y la postura útil entre ambos.',
        steps: [
          'Extremo 1: imaginar la IA como una mente que entiende, siente y responde moralmente. No lo es.',
          'Extremo 2: «solo hace estadística», como si por eso no tuviera consecuencias. Las tiene.',
          'Postura útil: cálculo estadístico y optimización… con impacto real en decisiones, procesos y personas.'
        ],
        draw(g) {
          show(g.at(0), () => {
            card(16, 26, 148, 176, 'EXTREMO 1', P.pink);
            bubble(26, 48, 128, 38, { text: 'Te entiendo y sé\nlo que sientes', tx: 82, ty: 100, size: 8.5 });
            robot(66, 104, { mood: 'sure', color: P.pink });
            txt('«Es una mente\ncomo la nuestra»', 90, 152, { align: 'center', size: 8.5, color: P.light });
            stamp('MITO', 92, 122, { a: late(g.at(0)) });
          });
          show(g.at(1), () => {
            card(316, 26, 148, 176, 'EXTREMO 2', P.sky);
            bubble(326, 48, 128, 38, { text: 'Solo son números.\nDa igual.', tx: 382, ty: 100, size: 8.5 });
            robot(366, 104, { mood: 'think', color: P.navy });
            ['0101', '1100', '0110'].forEach((b, i) => txt(b, 334 + i * 40, 92 + ((i % 2) * 4) + Math.sin(D.T * 2 + i) * 2, { size: 7, color: P.gray3, font: 'mono' }));
            txt('«Sin consecuencias\nreales»', 390, 152, { align: 'center', size: 8.5, color: P.light });
            stamp('MITO', 392, 122, { a: late(g.at(1)) });
          });
          show(g.at(2), () => {
            card(176, 26, 128, 176, 'POSTURA ÚTIL', P.mint, { active: g.on(2) });
            icon('chip', 222, 48, 3);
            txt('cálculo estadístico\n+ optimización', 240, 90, { align: 'center', size: 8.5 });
            txt('con impacto real en', 240, 118, { align: 'center', size: 7.5, color: P.yellow });
            icon('target', 192, 134, 2); icon('gear', 228, 134, 2); icon('user', 264, 134, 2);
            txt('decisiones', 204, 162, { align: 'center', size: 6.5, color: P.light });
            txt('procesos', 240, 172, { align: 'center', size: 6.5, color: P.light });
            txt('personas', 276, 162, { align: 'center', size: 6.5, color: P.light });
            banner('Puede parecer inteligente sin intención, experiencia ni responsabilidad moral', { y: 214, size: 8.5 });
          });
        }
      },
      {
        title: 'Tres perspectivas sobre el mismo sistema',
        caption: 'Un sistema que prioriza currículos analizado con tres preguntas complementarias.',
        steps: [
          'Perspectiva académica: ¿qué capacidad concreta queremos reproducir? Aquí, clasificar candidaturas.',
          'Perspectiva técnica: ¿de qué datos aprende? De currículos y de decisiones de selección pasadas.',
          'Perspectiva organizativa y regulatoria: ¿qué pasa si se equivoca y quién responde? En selección de personal el riesgo es alto.',
          'Las tres miran el mismo sistema. Un análisis serio combina las tres preguntas.'
        ],
        draw(g) {
          box(150, 16, 180, 70, { fill: P.gray2 });
          robot(160, 28, { mood: 'think', color: P.purple });
          txt('Sistema que prioriza', 200, 30, { size: 8.5, color: P.light });
          txt('currículos', 200, 42, { size: 12, color: P.yellow, weight: 700 });
          icon('doc', 200, 60, 1); icon('doc', 214, 60, 1); icon('doc', 228, 60, 1); icon('doc', 242, 60, 1);
          const cards = [
            { t: 'ACADÉMICA', ic: 'bulb', q: '¿Qué capacidad concreta reproduce?', a: '→ clasificar candidaturas', col: P.blue },
            { t: 'TÉCNICA', ic: 'db', q: '¿De qué datos aprende?', a: '→ CV y decisiones pasadas', col: P.orange },
            { t: 'ORGANIZATIVA / LEGAL', ic: 'shield', q: '¿Qué pasa si se equivoca? ¿Quién responde?', a: '→ riesgo alto: supervisión', col: P.pink }
          ];
          cards.forEach((cd, i) => {
            const x = 16 + i * 156, cx = x + 68;
            path([[240, 86], [240, 98], [cx, 98], [cx, 110]], { p: g.at(i), color: cd.col });
            show(g.at(i), () => {
              card(x, 112, 136, 114, cd.t, cd.col, { active: g.on(i) || g.on(3) });
              icon(cd.ic, cx - 12, 134, 2);
              txt(cd.q, cx, 164, { size: 8.5, align: 'center', maxW: 120 });
              txt(cd.a, cx, 198, { size: 8, align: 'center', maxW: 124, color: P.mint });
            });
          });
          show(g.at(3), () => banner('3 preguntas · 1 sistema', { y: 238, h: 22 }));
        }
      },
      {
        title: 'Lo que la IA no es',
        caption: 'Cuatro ideas erróneas frecuentes y la realidad que conviene recordar.',
        steps: [
          'No es necesariamente un chatbot: también clasifica imágenes, detecta fraude o recomienda rutas.',
          'No es infalible, aunque responda con fluidez y seguridad.',
          'No conoce automáticamente tu organización ni tus documentos.',
          'No arregla un proceso mal definido ni justifica meter datos sensibles en servicios no aprobados.'
        ],
        draw(g) {
          const items = [
            { m: 'IA = chatbot', r: 'También ve, filtra, recomienda y predice', ic: 'camera' },
            { m: 'Si suena seguro, es cierto', r: 'Fluidez no es verdad: verifica', ic: 'search' },
            { m: 'Ya conoce mi empresa', r: 'Solo sabe lo que le das o recupera', ic: 'folder' },
            { m: 'La IA arregla el proceso', r: 'Primero proceso y datos; luego IA', ic: 'gear' }
          ];
          items.forEach((it, i) => {
            const x = 16 + (i % 2) * 232, y = 18 + Math.floor(i / 2) * 120;
            show(g.at(i), () => {
              card(x, y, 216, 108, 'MITO ' + (i + 1), P.red, { active: g.on(i) });
              icon('cross', x + 12, y + 25, 1);
              txt('«' + it.m + '»', x + 30, y + 26, { size: 10, color: P.light, maxW: 176, fit: true });
              show(late(g.at(i)), () => {
                box(x + 10, y + 52, 196, 46, { fill: P.gray2, shadow: false });
                icon(it.ic, x + 18, y + 63, 2);
                txt(it.r, x + 50, y + 60, { size: 8.5, maxW: 150, color: P.mint });
              }, 4);
            });
          });
        }
      }
    ],
    examples: [
      ['Sistema de reglas', 'Un programa que diagnostica averías de una impresora con reglas del tipo «si hay luz roja y la bandeja está vacía, recargar papel». Es IA aunque no aprenda.'],
      ['Recomendador', 'Una plataforma de vídeo sugiere series a partir de lo que han visto personas con gustos parecidos.'],
      ['Visión por computador', 'Una app lee facturas escaneadas y extrae el importe total y la fecha.'],
      ['Asistente generativo', 'Un chat redacta un primer borrador de informe a partir de unas notas.']
    ],
    mistakes: [
      'Reducir «IA» a «ChatGPT» o a cualquier chatbot.',
      'Atribuirle intención o comprensión humana («me ha entendido», «sabe que…»).',
      'Pensar que, por basarse en estadística, sus errores no tienen consecuencias.'
    ],
    questions: [
      ['Piensa en una herramienta de IA que uses a diario. ¿Cuál es su entrada y cuál su salida?', 'Ejemplo: el teclado del móvil. Entrada: lo que llevas escrito. Salida: dos o tres palabras sugeridas, ordenadas por probabilidad. Identificar entrada y salida ayuda a ver qué hace realmente el sistema y dónde puede fallar.'],
      ['¿Por qué decimos que una IA puede «parecer inteligente» sin serlo como una persona?', 'Porque produce conductas que asociamos con inteligencia (responder, clasificar, redactar) sin experiencia vivida, intención ni responsabilidad moral. El resultado puede ser útil; la comprensión humana no está garantizada.'],
      ['Si una IA «solo hace estadística», ¿por qué debería preocuparnos su impacto?', 'Porque sus salidas se usan para decidir: a quién se entrevista, qué correo se bloquea, qué cliente recibe una oferta. Que el mecanismo sea estadístico no reduce las consecuencias sobre procesos y personas.'],
      ['Aplica las tres perspectivas a un chatbot de atención al cliente.', 'Académica: responder consultas frecuentes. Técnica: aprende de un modelo general y trabaja con la base de conocimiento de la empresa. Organizativa: si da información errónea sobre una devolución, ¿quién responde ante el cliente? Debe haber revisión y vías de escalado.'],
      ['¿Qué mito de la lista has escuchado más en tu entorno? ¿Cómo lo rebatirías con un ejemplo?', 'Respuesta abierta. Un buen argumento combina el mito con un caso concreto: «no conoce tu empresa: pregúntale por la política de vacaciones interna y verás que inventa o generaliza».']
    ],
    quiz: [
      { q: '¿Cuál de estas afirmaciones describe mejor qué es la IA?', o: ['Un programa que piensa como una persona', 'Un campo que diseña sistemas que producen salidas útiles a partir de datos, reglas o modelos', 'Cualquier chatbot que conversa', 'Una base de datos de hechos comprobados'], c: 1, why: 'La IA es un campo amplio: incluye reglas, modelos aprendidos y sistemas generativos. No equivale a una mente humana ni a un chatbot.' },
      { q: 'Un sistema que diagnostica averías con reglas «si A y B, entonces C», sin aprender de datos…', o: ['No es IA', 'Es IA, aunque no es machine learning', 'Es deep learning', 'Es IA generativa'], c: 1, why: 'Los sistemas expertos de reglas pertenecen al campo de la IA aunque no aprendan de ejemplos.' },
      { q: '¿Qué pregunta corresponde a la perspectiva organizativa y regulatoria?', o: ['¿Qué capacidad reproduce?', '¿Con qué datos se entrenó?', '¿Qué ocurre si se equivoca y quién responde?', '¿Cuántos parámetros tiene?'], c: 2, why: 'Esta perspectiva mira el impacto, el riesgo, la transparencia y la responsabilidad.' }
    ],
    terms: [['IA', 'Campo que diseña sistemas capaces de realizar tareas que asociamos con la inteligencia: percibir, clasificar, predecir, recomendar o generar.'], ['Sistema experto', 'Sistema de IA basado en reglas escritas por personas, sin aprendizaje a partir de datos.']]
  });

  /* ------------------------------------------------------------------ */
  PL.concept({
    id: 'mapa-ia', block: 'b1', slide: 'S5', title: 'El mapa: IA → ML → DL → IA generativa',
    idea: 'Son conjuntos anidados: toda la IA generativa es deep learning, todo el deep learning es machine learning y todo el machine learning es IA. Pero no al revés.',
    explain: [
      'No todo sistema de IA usa machine learning. Un sistema experto con reglas del tipo «si ocurre A y B, recomendar C» pertenece al campo de la IA aunque no aprenda de datos. El machine learning aparece cuando el sistema encuentra la relación a partir de ejemplos, en lugar de depender de reglas escritas una a una.',
      'El deep learning es una familia de técnicas de machine learning basada en redes neuronales con muchas capas. Destaca en visión por computador, voz, traducción, recomendación y en los modelos generativos de gran escala.',
      'La IA generativa produce contenido nuevo: texto, imágenes, audio, vídeo, código o datos estructurados. «Nuevo» no significa original en sentido artístico ni verdadero en sentido factual: significa que el modelo construye una salida a partir de patrones aprendidos y del contexto que recibe.'
    ],
    panels: [
      {
        title: 'Cuatro conjuntos, uno dentro de otro',
        caption: 'Cada nivel es una parte del anterior. Cada uno se acompaña de un ejemplo típico.',
        steps: [
          'IA: el campo completo. Cualquier sistema que realiza tareas que asociamos con inteligencia, aprenda o no. Ej.: planificar rutas.',
          'Machine learning: la parte de la IA que aprende patrones a partir de ejemplos. Ej.: filtro de spam.',
          'Deep learning: machine learning con redes neuronales de muchas capas. Ej.: reconocer objetos en fotos.',
          'IA generativa: modelos profundos que crean contenido nuevo: texto, imagen, audio, vídeo o código.'
        ],
        draw(g) {
          const L = [
            { t: 'INTELIGENCIA ARTIFICIAL', x: 14, y: 14, w: 452, h: 232, col: P.sky, fill: '#17203a', ex: 'planificar rutas', ic: 'pin' },
            { t: 'MACHINE LEARNING', x: 34, y: 50, w: 412, h: 188, col: P.blue, fill: '#1a2850', ex: 'filtro de spam', ic: 'mail' },
            { t: 'DEEP LEARNING', x: 54, y: 86, w: 372, h: 144, col: P.orange, fill: '#2b2843', ex: 'reconocer objetos', ic: 'camera' },
            { t: 'IA GENERATIVA', x: 74, y: 122, w: 332, h: 100, col: P.purple, fill: '#30254f', ex: 'crear contenido', ic: 'palette' }
          ];
          L.forEach((l, i) => show(g.at(i), () => {
            rect(l.x, l.y, l.w, l.h, l.fill);
            frame(l.x, l.y, l.w, l.h, l.col, 2);
            if (g.on(i)) glow(l.x, l.y, l.w, l.h, l.col);
            txt(l.t, l.x + 10, l.y + 10, { size: 10, color: l.col, weight: 700 });
            icon(l.ic, l.x + l.w - 134, l.y + 5, 2);
            txt(l.ex, l.x + l.w - 104, l.y + 11, { size: 8.5, color: P.light });
          }, 0));
          show(g.at(3), () => {
            robot(88, 160, { mood: 'happy', color: P.purple });
            tokens(['texto', 'imagen', 'audio', 'vídeo', 'código'], 270, 176, { align: 'center', font: 'sans', size: 9, reveal: i => clamp(g.at(3) * 6 - i) });
          });
        }
      },
      {
        title: 'IA sin aprendizaje: un sistema de reglas',
        caption: 'Un sistema experto para diagnosticar una impresora: reglas escritas por personas encadenadas en un árbol de decisión.',
        steps: [
          'Un sistema experto aplica reglas escritas por personas: «si ocurre A y B, recomendar C».',
          'Las reglas forman un árbol: cada respuesta lleva a la siguiente pregunta hasta una solución.',
          'Resuelve una tarea de diagnóstico, así que es IA. Pero no aprende de datos: no es machine learning.'
        ],
        draw(g) {
          show(g.at(0), () => {
            card(16, 22, 206, 168, 'REGLAS ESCRITAS A MANO', P.sky);
            code([
              { t: 'SI no imprime', color: P.sky }, { t: '  Y luz roja', color: P.sky }, { t: '  Y bandeja vacía', color: P.sky },
              { t: 'ENTONCES', color: P.yellow }, { t: '  → recargar papel', color: P.mint }, '',
              { t: 'SI luz roja', color: P.sky }, { t: '  Y bandeja llena', color: P.sky }, { t: 'ENTONCES → abrir tapa', color: P.mint }
            ], 28, 46, { size: 8, lh: 12 });
            person(186, 146, { shirt: P.teal });
          });
          show(g.at(1), () => {
            const N = (s, x, y, col) => chip(s, x, y, { align: 'center', fill: col, size: 8.5 });
            line(350, 47, 300, 88, P.light); line(350, 47, 428, 88, P.light);
            line(300, 105, 262, 148, P.light); line(300, 105, 350, 148, P.light);
            txt('sí', 316, 60, { size: 8, color: P.mint }); txt('no', 392, 60, { size: 8, color: P.red });
            txt('sí', 268, 122, { size: 8, color: P.mint }); txt('no', 330, 122, { size: 8, color: P.red });
            N('¿Luz roja?', 350, 30, P.yellow);
            N('¿Bandeja vacía?', 300, 88, P.yellow);
            N('Reiniciar', 428, 88, P.mint);
            N('Recargar papel', 262, 148, P.mint);
            N('Abrir tapa', 350, 148, P.mint);
            const t = (D.T * 0.5) % 1;
            const pts = [[350, 47], [300, 88], [300, 105], [262, 148]];
            const seg = Math.min(2, Math.floor(t * 3)), f = t * 3 - seg;
            dot(lerp(pts[seg][0], pts[seg + 1][0], f), lerp(pts[seg][1], pts[seg + 1][1], f), P.orange, 4);
          });
          show(g.at(2), () => {
            chip('¿Es IA?  SÍ', 130, 204, { align: 'center', fill: P.mint, size: 10, icon: 'check', iconTint: P.ink });
            chip('¿Aprende de datos?  NO', 344, 204, { align: 'center', fill: P.red, size: 10, icon: 'cross', iconTint: P.ink });
            banner('Todo el machine learning es IA, pero no toda la IA es machine learning', { y: 236, size: 8.5 });
          });
        }
      },
      {
        title: 'Reglas a mano frente a aprender de ejemplos',
        caption: 'El mismo problema, detectar spam, resuelto de dos maneras.',
        steps: [
          'Con reglas: una persona escribe cada condición. «Si contiene GRATIS → spam». Funciona con lo previsto.',
          'Llega «¡GR4TIS!» y se cuela. Hay que escribir otra regla… y otra. La lista nunca termina.',
          'Con machine learning: el sistema recibe miles de correos ya etiquetados como spam o no spam…',
          '…y encuentra por sí mismo los patrones que los separan, incluidas variantes que nadie escribió.'
        ],
        draw(g) {
          card(14, 18, 220, 210, 'CON REGLAS', P.sky);
          person(24, 40, { shirt: P.teal });
          code([{ t: 'si "GRATIS" → spam', color: P.white }, { t: 'si "GR4TIS" → spam', color: P.orange }, { t: 'si "GRAT1S" → spam', color: P.orange }, { t: 'si "0ferta" → spam', color: P.orange }, { t: '…y otra regla más', color: P.red }], 58, 44, { size: 7.5, lh: 13, reveal: i => i === 0 ? 1 : clamp(g.at(1) * 5 - (i - 1)) });
          mail(24, 120, { w: 88, h: 32, title: 'GRATIS hoy' });
          arrow(116, 136, 146, 136, { color: P.mint });
          chip('spam ✓', 150, 128, { fill: P.mint, size: 8.5 });
          show(g.at(1), () => {
            mail(24, 168, { w: 88, h: 32, title: '¡GR4TIS!' });
            arrow(116, 184, 146, 184, { color: P.red });
            chip('se cuela ✗', 150, 176, { fill: P.red, size: 8.5 });
            txt('47 reglas y subiendo', 124, 212, { size: 7.5, color: P.red, align: 'center' });
          });
          card(246, 18, 220, 210, 'CON MACHINE LEARNING', P.blue);
          show(g.at(2), () => {
            const tags = ['spam', 'ok', 'ok', 'spam', 'ok', 'spam'];
            tags.forEach((tg, i) => mail(256 + (i % 3) * 68, 42 + Math.floor(i / 3) * 42, { w: 60, h: 32, tag: tg === 'spam' ? 'spam' : 'no spam', tagColor: tg === 'spam' ? P.red : P.mint, seed: i + 2 }));
            txt('miles de correos etiquetados', 356, 128, { size: 8, color: P.light, align: 'center' });
          });
          show(g.at(3), () => {
            robot(256, 148, { mood: 'think', color: P.blue });
            mail(304, 152, { w: 74, h: 32, title: '¡GR4TIS!' });
            arrow(380, 168, 396, 168, { color: P.mint });
            chip('SPAM 94 %', 398, 160, { fill: P.red, size: 8.5, w: 62 });
            txt('detecta variantes nuevas', 356, 204, { size: 8, color: P.mint, align: 'center' });
          });
        }
      },
      {
        title: 'Actividad: sitúa seis herramientas en el mapa',
        caption: 'Clasificación orientativa: se valora el razonamiento (qué tarea hace, qué datos usa, si genera contenido), no adivinar la arquitectura exacta.',
        steps: [
          'Seis herramientas cotidianas. ¿Dónde las situarías? Piensa qué tarea realizan y si generan contenido.',
          'GPS: calcula rutas con algoritmos de búsqueda y reglas; puede funcionar sin aprender de datos → IA.',
          'Filtro de spam y recomendador: aprenden patrones a partir de ejemplos y comportamiento → machine learning.',
          'Reconocimiento facial: redes neuronales profundas sobre imágenes → deep learning. No genera contenido.',
          'Chatbot y generador de imágenes: crean contenido nuevo → IA generativa.'
        ],
        draw(g) {
          const rings = [
            { t: 'IA', x: 150, y: 20, w: 316, h: 216, col: P.sky, fill: '#17203a' },
            { t: 'MACHINE LEARNING', x: 162, y: 54, w: 292, h: 174, col: P.blue, fill: '#1a2850' },
            { t: 'DEEP LEARNING', x: 174, y: 90, w: 268, h: 130, col: P.orange, fill: '#2b2843' },
            { t: 'GENERATIVA', x: 186, y: 126, w: 244, h: 86, col: P.purple, fill: '#30254f' }
          ];
          rings.forEach(r => { rect(r.x, r.y, r.w, r.h, r.fill); frame(r.x, r.y, r.w, r.h, r.col, 2); txt(r.t, r.x + 8, r.y + 7, { size: 8, color: r.col, weight: 700 }); });
          txt('HERRAMIENTAS', 70, 12, { size: 8, color: P.light, align: 'center' });
          const tools = [
            { t: 'GPS', ic: 'pin', s: 1, to: [300, 28] },
            { t: 'Filtro de spam', ic: 'mail', s: 2, to: [250, 64] },
            { t: 'Recomendador', ic: 'tv', s: 2, to: [352, 64] },
            { t: 'Reconoc. facial', ic: 'camera', s: 3, to: [272, 100] },
            { t: 'Chatbot', ic: 'chat', s: 4, to: [196, 158] },
            { t: 'Gen. imágenes', ic: 'palette', s: 4, to: [300, 158] }
          ];
          tools.forEach((tl, i) => {
            const a = g.at(tl.s);
            const x = lerp(22, tl.to[0], a), y = lerp(28 + i * 34, tl.to[1], a);
            chip(tl.t, x, y, { icon: tl.ic, w: 96, h: 20, size: 7.5, fill: P.paper, shadow: true });
            if (g.on(tl.s) && g.p > 0.95) glow(x, y, 96, 20, P.yellow);
            if (a === 0 && g.on(0)) qmark(122, 30 + i * 34, P.yellow, 1);
          });
          show(g.at(4), () => txt('Clasificación orientativa: los productos reales combinan técnicas', 240, 246, { size: 8, color: P.light, align: 'center' }));
        }
      }
    ],
    examples: [
      ['IA sin ML', 'Un planificador de rutas o un sistema experto de reglas.'],
      ['Machine learning', 'Detectar spam a partir de correos etiquetados; predecir la demanda de un producto.'],
      ['Deep learning', 'Reconocer objetos en imágenes, transcribir voz, traducir.'],
      ['IA generativa', 'Redactar un borrador de informe, crear una imagen para una presentación, generar código.']
    ],
    mistakes: [
      'Usar «IA» y «IA generativa» como sinónimos.',
      'Creer que todo sistema de IA aprende de datos.',
      'Pensar que «contenido nuevo» significa «contenido verdadero» u «original».'
    ],
    questions: [
      ['¿En qué nivel situarías un filtro de spam y por qué?', 'En machine learning: aprende patrones a partir de mensajes ya clasificados. Puede usar deep learning si procesa el lenguaje con redes profundas, pero no genera contenido, así que no es IA generativa. Si solo bloqueara palabras con reglas fijas, sería IA sin ML.'],
      ['¿Por qué «nuevo» no significa «verdadero» en IA generativa?', 'Porque el modelo construye una salida plausible a partir de patrones y del contexto. Puede combinar elementos de forma inédita y, aun así, ser falsa o inexacta.'],
      ['Un recomendador de series, ¿es machine learning, deep learning o ambas cosas?', 'Ambas pueden ser ciertas: aprende de comportamiento (ML) y muchos usan redes profundas para representar usuarios y contenidos (DL). Además suelen añadir reglas de negocio. Lo importante es razonar el mecanismo predominante.'],
      ['De las seis herramientas de la actividad, ¿cuál sería más arriesgado usar sin revisión? ¿Por qué?', 'Por ejemplo, el reconocimiento facial: un error puede identificar mal a una persona con consecuencias graves. O el chatbot, si da información incorrecta a clientes. El riesgo depende del uso, no solo de la técnica.'],
      ['¿Cuál de las seis herramientas puede ser útil sin «entender» como una persona?', 'Todas. El GPS calcula rutas excelentes sin entender qué es una ciudad; el filtro de spam clasifica sin comprender el mensaje. La utilidad no requiere comprensión humana.']
    ],
    quiz: [
      { q: '¿Cuál es la relación correcta?', o: ['ML ⊃ IA ⊃ DL', 'IA ⊃ ML ⊃ DL ⊃ IA generativa', 'IA generativa ⊃ DL ⊃ ML', 'Son cuatro campos independientes'], c: 1, why: 'Son conjuntos anidados de fuera hacia dentro: IA, machine learning, deep learning e IA generativa.' },
      { q: 'El deep learning se caracteriza por…', o: ['Usar solo reglas escritas a mano', 'Usar redes neuronales con muchas capas', 'Generar siempre texto', 'No necesitar datos'], c: 1, why: 'Es una familia de técnicas de ML basadas en redes neuronales profundas.' },
      { q: 'Un sistema de reconocimiento facial que identifica personas en fotos es sobre todo…', o: ['IA generativa', 'Deep learning no generativo', 'Un sistema de reglas', 'No es IA'], c: 1, why: 'Usa redes profundas sobre imágenes, pero clasifica o identifica: no crea contenido nuevo.' }
    ],
    terms: [['Machine learning', 'Parte de la IA en la que el sistema aprende relaciones a partir de ejemplos en lugar de reglas escritas una a una.'], ['Deep learning', 'Familia de técnicas de machine learning basadas en redes neuronales con muchas capas.'], ['IA generativa', 'Modelos que producen contenido nuevo (texto, imagen, audio, vídeo, código) a partir de patrones aprendidos y del contexto.']]
  });

  /* ------------------------------------------------------------------ */
  PL.concept({
    id: 'supervisado', block: 'b1', slide: 'S6', title: 'Aprendizaje supervisado',
    idea: 'El modelo aprende de ejemplos con la respuesta conocida (etiquetas) para predecir la respuesta en casos nuevos. La calidad de las etiquetas es decisiva.',
    explain: [
      'En el aprendizaje supervisado se entrega al modelo una colección de ejemplos con una respuesta conocida. El objetivo es aprender la relación entre las características de entrada y una etiqueta, una clase o un valor de salida.',
      '«Supervisado» no significa que una persona mire cada predicción en tiempo real; significa que durante el entrenamiento existían etiquetas o resultados de referencia. Si esas etiquetas están sesgadas, incompletas o mal definidas, el modelo aprende exactamente ese problema.',
      'Hay dos grandes tipos de tarea: clasificación (la salida es una categoría: spam o no spam, tipo de incidencia) y regresión (la salida es un número: demanda prevista, precio estimado).'
    ],
    panels: [
      {
        title: 'Aprender con ejemplos etiquetados',
        caption: 'Correos marcados como «spam» o «no spam» entrenan un modelo que luego estima la categoría de un correo nuevo.',
        steps: [
          'Partimos de miles de correos que alguien ya marcó como «spam» o «no spam». Esas marcas son las etiquetas.',
          'Durante el entrenamiento, el modelo busca qué rasgos se asocian a cada etiqueta: palabras, remitentes, enlaces…',
          'Llega un correo nuevo, sin etiqueta. El modelo estima su categoría con una probabilidad.',
          '«Supervisado» no significa que alguien vigile cada predicción: significa que al entrenar había respuestas de referencia.'
        ],
        draw(g) {
          show(g.at(0), () => {
            card(14, 22, 142, 182, 'EJEMPLOS ETIQUETADOS', P.blue, { active: g.on(0) });
            const tags = ['spam', 'ok', 'ok', 'spam', 'spam', 'ok'];
            tags.forEach((tg, i) => mail(22 + (i % 2) * 66, 46 + Math.floor(i / 2) * 50, { w: 60, h: 36, tag: tg === 'spam' ? 'spam' : 'no spam', tagColor: tg === 'spam' ? P.red : P.mint, seed: i + 1 }));
          });
          arrow(158, 100, 194, 96, { p: g.at(1), color: P.sky });
          show(g.at(1), () => {
            robot(204, 66, { mood: 'think', color: P.purple });
            txt('aprende patrones', 220, 112, { size: 8, color: P.light, align: 'center' });
            chip('«GRATIS»', 220, 132, { align: 'center', fill: P.red, size: 8 });
            chip('enlace extraño', 220, 154, { align: 'center', fill: P.red, size: 8 });
            chip('remitente conocido', 220, 176, { align: 'center', fill: P.mint, size: 8 });
          });
          show(g.at(2), () => {
            mail(300, 26, { w: 86, h: 36, title: 'Nuevo' });
            qmark(392, 30, P.yellow, 2);
            arrow(300, 50, 244, 78, { color: P.sky });
            arrow(244, 98, 296, 118, { color: P.mint });
            probBars(286, 114, [{ label: 'spam', v: 0.91, color: P.red }, { label: 'no spam', v: 0.09, color: P.mint }], { labelW: 56, barW: 96, p: g.at(2), highlight: 0, gap: 20 });
          });
          show(g.at(3), () => banner('Supervisado = había respuestas de referencia al entrenar', { y: 232 }));
        }
      },
      {
        title: 'Etiquetas malas, modelo malo',
        caption: 'Un sesgo al etiquetar se convierte en una regla aprendida por el modelo.',
        steps: [
          'Un modelo supervisado aprende exactamente lo que dicen sus etiquetas.',
          'Quien etiquetó marcó como «spam» casi todos los correos de proveedores extranjeros, aunque fueran legítimos.',
          'El modelo aprende ese atajo: «extranjero = spam». Y bloquea la factura de un proveedor real.',
          'Calidad de las etiquetas = calidad del modelo. Hay que revisar cómo, quién y con qué criterio se etiqueta.'
        ],
        draw(g) {
          person(20, 40, { shirt: P.teal, label: 'etiquetador' });
          const rows = [['Pedido · Lyon', 'spam', true], ['Factura · Oporto', 'spam', true], ['Reunión · Jaén', 'ok', false], ['Oferta falsa', 'spam', false]];
          rows.forEach((r, i) => show(g.at(0), () => {
            mail(56, 26 + i * 44, { w: 104, h: 32, title: r[0], tag: r[1] === 'spam' ? 'spam' : 'no spam', tagColor: r[1] === 'spam' ? P.red : P.mint, seed: i + 4 });
            if (r[2] && g.from(1)) { icon('warn', 164, 32 + i * 44, 1.5); }
          }));
          show(g.at(1), () => txt('legítimos,\nmal etiquetados', 186, 40, { size: 7.5, color: P.yellow }));
          arrow(186, 140, 216, 140, { p: g.at(2), color: P.sky });
          show(g.at(2), () => {
            robot(224, 120, { mood: 'sure', color: P.purple });
            bubble(204, 66, 96, 34, { text: 'extranjero\n= spam', tx: 240, ty: 118, size: 9, fill: P.yellow });
            mail(320, 70, { w: 120, h: 36, title: 'Factura · Lyon' });
            txt('proveedor legítimo', 380, 112, { size: 7.5, color: P.light, align: 'center' });
            arrow(258, 150, 316, 150, { color: P.red });
            stamp('BLOQUEADO', 380, 158, { a: late(g.at(2)) });
          });
          show(g.at(3), () => banner('Calidad de las etiquetas = calidad del modelo', { y: 230 }));
        }
      },
      {
        title: 'Dos tipos de pregunta: categoría o número',
        caption: 'Clasificación y regresión: las dos se aprenden con ejemplos cuya respuesta conocemos.',
        steps: [
          'Clasificación: la salida es una categoría. ¿Spam o no? ¿Fraude o no? ¿Qué tipo de incidencia es?',
          'Regresión: la salida es un número. ¿Cuántas unidades se venderán? ¿Qué precio tendrá este piso?',
          'En ambos casos el modelo aprende de ejemplos con la respuesta conocida.'
        ],
        draw(g) {
          show(g.at(0), () => {
            card(14, 22, 218, 196, 'CLASIFICACIÓN → CATEGORÍA', P.blue, { active: g.on(0) });
            ticket(40, 46, 'Incidencia: «no arranca el portátil»', { w: 166, h: 22 });
            robot(30, 92, { mood: 'think', color: P.blue }); txt('modelo', 46, 134, { size: 7.5, color: P.light, align: 'center' });
            const bins = [['factura', P.yellow], ['avería', P.orange], ['consulta', P.sky]];
            bins.forEach((b, i) => {
              const x = 28 + i * 66;
              rect(x, 150, 58, 46, P.ink); rect(x + 2, 152, 54, 42, P.gray2); rect(x, 150, 58, 4, b[1]);
              txt(b[0], x + 29, 200, { size: 8, align: 'center', color: i === 1 && g.at(0) > 0.9 ? P.yellow : P.light });
            });
            const f = g.at(0);
            ticket(lerp(104, 98, f), lerp(84, 164, f), 'ticket', { w: 34, h: 16 });
            if (f > 0.95) glow(94, 150, 58, 46, P.orange);
          });
          show(g.at(1), () => {
            card(248, 22, 218, 196, 'REGRESIÓN → NÚMERO', P.orange, { active: g.on(1) });
            axes(270, 48, 180, 128, 'm²', 'precio');
            for (let i = 0; i < 12; i++) { const x = 284 + i * 13, y = 160 - i * 8.5 + (rnd(i + 9) - 0.5) * 22; dot(x, y, P.sky, 2.5); }
            line(278, 168, 448, 62, P.orange, 2);
            const nx = 412;
            line(nx, 174, nx, 86, P.yellow, 1, true); line(nx, 86, 272, 86, P.yellow, 1, true);
            dot(nx, 86, P.yellow, 4);
            chip('≈ 186.000 €', 330, 186, { align: 'center', fill: P.yellow, size: 9 });
          });
          show(g.at(2), () => banner('En ambos casos: ejemplos con la respuesta conocida → modelo', { y: 232 }));
        }
      }
    ],
    examples: [
      ['Clasificar documentos', 'Facturas, contratos o currículos etiquetados por tipo.'],
      ['Detección de fraude', 'Operaciones históricas marcadas como fraudulentas o legítimas.'],
      ['Abandono de clientes', 'Predecir qué clientes es probable que se den de baja a partir de casos pasados.'],
      ['Estimación de demanda', 'Predecir ventas de la próxima semana con el histórico de ventas.'],
      ['Análisis de sentimiento', 'Reseñas etiquetadas como positivas, neutras o negativas.']
    ],
    mistakes: [
      'Creer que «supervisado» significa que una persona revisa cada predicción.',
      'Dar por buenas las etiquetas sin revisar cómo se crearon.',
      'Confundir una probabilidad alta con una certeza.'
    ],
    questions: [
      ['¿Qué señal recibe un sistema supervisado durante el entrenamiento?', 'La respuesta correcta de cada ejemplo: la etiqueta (spam / no spam) o el valor (precio real). Esa señal le permite medir su error y ajustarse.'],
      ['Si las etiquetas de un modelo de selección de personal reflejan decisiones pasadas sesgadas, ¿qué ocurrirá?', 'El modelo reproducirá el sesgo: aprenderá a imitar esas decisiones, incluidas las injustas. Por eso hay que auditar las etiquetas y los resultados por grupos.'],
      ['Propón un caso de aprendizaje supervisado en tu sector. ¿Qué sería la etiqueta?', 'Respuesta abierta. Ejemplo en atención al cliente: tickets históricos (entrada) y el departamento que finalmente lo resolvió (etiqueta), para enrutar automáticamente los nuevos.'],
      ['¿Es clasificación o regresión predecir cuántos minutos tardará un pedido en llegar?', 'Regresión: la salida es un número. Si en cambio predijéramos «llega a tiempo / con retraso», sería clasificación.']
    ],
    quiz: [
      { q: '¿Qué necesita imprescindiblemente el aprendizaje supervisado?', o: ['Una recompensa por cada acción', 'Ejemplos con la respuesta conocida', 'Datos sin ninguna etiqueta', 'Una persona revisando cada predicción'], c: 1, why: 'Necesita ejemplos etiquetados durante el entrenamiento.' },
      { q: 'Predecir el precio de una vivienda es una tarea de…', o: ['Clasificación', 'Regresión', 'Agrupamiento', 'Refuerzo'], c: 1, why: 'La salida es un valor numérico, así que es regresión.' },
      { q: 'Si las etiquetas de entrenamiento están sesgadas…', o: ['El modelo corrige el sesgo solo', 'El modelo aprende el sesgo', 'No influye en el resultado', 'El modelo deja de funcionar'], c: 1, why: 'El modelo aprende lo que le enseñan las etiquetas, incluidos sus errores.' }
    ],
    terms: [['Aprendizaje supervisado', 'Aprendizaje a partir de ejemplos con la respuesta conocida (etiqueta o valor).'], ['Etiqueta', 'Respuesta de referencia asociada a un ejemplo de entrenamiento.'], ['Clasificación', 'Tarea cuya salida es una categoría.'], ['Regresión', 'Tarea cuya salida es un valor numérico.']]
  });

  /* ------------------------------------------------------------------ */
  PL.concept({
    id: 'no-supervisado', block: 'b1', slide: 'S6', title: 'Aprendizaje no supervisado',
    idea: 'Sin respuestas etiquetadas, el sistema busca estructura en los datos: grupos parecidos o casos atípicos. Una persona debe interpretar y validar lo que encuentra.',
    explain: [
      'En el aprendizaje no supervisado no existe una respuesta correcta para cada ejemplo. El sistema busca estructura: grupos de elementos similares, comportamientos atípicos, dimensiones relevantes o relaciones entre elementos.',
      'Ejemplo: analizar compras para encontrar segmentos de clientes con hábitos parecidos. El sistema no recibe las etiquetas «ocasional» o «recurrente»; detecta agrupaciones que después una persona interpreta y valida.',
      'Es muy útil para explorar, pero un grupo estadístico no es una verdad descubierta: puede ser poco útil para el negocio, carecer de interpretación clara o discriminar de forma indirecta.'
    ],
    panels: [
      {
        title: 'Datos sin etiquetas: encontrar grupos',
        caption: 'Cada punto es un cliente según su frecuencia de compra y su gasto medio. Nadie ha dicho qué grupos existen.',
        steps: [
          'Tenemos los datos de compra de muchos clientes, sin ninguna etiqueta: solo frecuencia y gasto.',
          'El algoritmo agrupa los puntos parecidos. Aparecen tres grupos.',
          'El sistema no sabe qué significan. Una persona los interpreta y les pone nombre.'
        ],
        draw(g) {
          axes(40, 26, 290, 196, 'frecuencia', 'gasto');
          const groups = [{ cx: 110, cy: 180, col: P.sky, name: 'ocasionales' }, { cx: 260, cy: 150, col: P.mint, name: 'fieles' }, { cx: 150, cy: 72, col: P.orange, name: 'grandes cuentas' }];
          const a1 = g.at(1);
          groups.forEach((gr, k) => {
            const pts = [];
            for (let i = 0; i < 11; i++) pts.push([gr.cx + (rnd(i * 3 + k * 17) - 0.5) * 64, gr.cy + (rnd(i * 7 + k * 5) - 0.5) * 42]);
            if (a1 > 0) show(a1, () => { const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]); frame(Math.min(...xs) - 8, Math.min(...ys) - 8, Math.max(...xs) - Math.min(...xs) + 16, Math.max(...ys) - Math.min(...ys) + 16, gr.col, 1); }, 0);
            pts.forEach(p => dot(p[0], p[1], a1 > 0.5 ? gr.col : P.light, 3));
            show(g.at(2), () => chip(gr.name, gr.cx, gr.cy - 40 + (k === 2 ? -6 : 0), { align: 'center', fill: gr.col, size: 8.5 }));
          });
          box(346, 40, 120, 70, { fill: P.gray2 });
          txt(g.from(1) ? '3 grupos\nencontrados' : 'clientes\nsin etiquetas', 406, 58, { size: 10, align: 'center', color: g.from(1) ? P.mint : P.white });
          show(g.at(2), () => { person(392, 128, { shirt: P.purple }); txt('nombres puestos\npor una persona', 406, 176, { size: 8, align: 'center', color: P.yellow }); });
        }
      },
      {
        title: 'Detectar lo raro: anomalías',
        caption: 'Cada punto es una operación con tarjeta según la hora y el importe.',
        steps: [
          'Cada punto es una operación con tarjeta: hora del día e importe.',
          'La mayoría forman una nube compacta: es el comportamiento habitual de esta persona.',
          'Un punto queda muy lejos: 3.200 € a las 04:12. El sistema lo marca como anomalía.',
          'Anomalía no es sinónimo de fraude: puede ser un viaje. Una persona revisa antes de bloquear.'
        ],
        draw(g) {
          axes(40, 26, 280, 196, '', 'importe');
          ['0 h', '6 h', '12 h', '18 h'].forEach((h, i) => txt(h, 42 + i * 68, 226, { size: 7, color: P.light }));
          txt('hora del día →', 318, 226, { size: 7.5, color: P.light, align: 'right' });
          const a1 = g.at(1);
          for (let i = 0; i < 34; i++) { const x = 150 + (rnd(i * 5) - 0.5) * 150, y = 180 + (rnd(i * 11) - 0.5) * 50; dot(x, y, a1 > 0.5 ? P.sky : P.light, 2.5); }
          show(a1, () => { frame(66, 148, 168, 66, P.sky, 1); txt('habitual', 70, 136, { size: 8, color: P.sky }); }, 0);
          const ox = 64, oy = 52;
          dot(ox, oy, g.from(2) ? P.red : P.light, 3);
          if (g.from(2)) { pulse(ox, oy, P.red, 10); }
          show(g.at(2), () => chip('3.200 € · 04:12', ox + 22, oy - 8, { fill: P.red, size: 8.5 }));
          show(g.at(3), () => {
            person(370, 74, { shirt: P.teal });
            bubble(340, 26, 120, 34, { text: '¿fraude o viaje?', tx: 384, ty: 72, size: 9 });
            chip('revisar antes de bloquear', 400, 130, { align: 'center', fill: P.yellow, size: 8 });
            icon('search', 386, 152, 2);
          });
        }
      },
      {
        title: 'Un grupo estadístico no es una verdad',
        caption: 'Un segmento creado por el algoritmo puede esconder una discriminación indirecta.',
        steps: [
          'El algoritmo propone un grupo: «clientes con baja probabilidad de pago».',
          'Al examinarlo, casi todos viven en el mismo barrio.',
          'Usar ese grupo para denegar crédito discriminaría indirectamente por lugar de residencia.',
          'Los grupos se interpretan y validan con criterio de negocio, legal y ético antes de usarlos.'
        ],
        draw(g) {
          show(g.at(0), () => {
            card(14, 22, 206, 190, 'GRUPO 3 (propuesto)', P.purple, { active: g.on(0) });
            for (let i = 0; i < 8; i++) icon('user', 30 + (i % 4) * 46, 50 + Math.floor(i / 4) * 44, 2, P.light);
            chip('«baja probabilidad de pago»', 117, 140, { align: 'center', fill: P.paper, size: 8 });
          });
          show(g.at(1), () => {
            for (let i = 0; i < 8; i++) icon('pin', 44 + (i % 4) * 46, 70 + Math.floor(i / 4) * 44, 1);
            chip('mismo barrio: 92 %', 117, 172, { align: 'center', fill: P.orange, size: 9 });
          });
          arrow(222, 116, 262, 116, { p: g.at(2), color: P.red });
          show(g.at(2), () => {
            card(266, 22, 200, 190, '¿USARLO PARA DECIDIR?', P.red, { active: g.on(2) });
            icon('warn', 344, 50, 4);
            txt('Denegar crédito\nal grupo 3', 366, 108, { size: 10, align: 'center' });
            stamp('DISCRIMINACIÓN', 366, 168, { a: late(g.at(2)), size: 10 });
            txt('INDIRECTA', 366, 184, { size: 8, color: P.red, align: 'center' });
          });
          show(g.at(3), () => banner('Interpretar y validar: negocio, legal y ética', { y: 230, icon: 'shield', color: P.mint }));
        }
      }
    ],
    examples: [
      ['Segmentación de clientes', 'Descubrir grupos con hábitos de compra parecidos para diseñar campañas.'],
      ['Detección de anomalías', 'Señalar operaciones, accesos o lecturas de sensores fuera de lo habitual.'],
      ['Agrupación de documentos', 'Organizar miles de correos o incidencias por temas sin categorías previas.'],
      ['Exploración de datos', 'Detectar patrones o relaciones antes de definir un modelo supervisado.']
    ],
    mistakes: [
      'Tratar un grupo estadístico como una verdad sobre las personas.',
      'Bloquear automáticamente todo lo anómalo sin revisión.',
      'Olvidar que los nombres de los grupos los pone una persona.'
    ],
    questions: [
      ['¿Qué diferencia hay entre la señal del aprendizaje supervisado y la del no supervisado?', 'En el supervisado la señal es la respuesta correcta de cada ejemplo. En el no supervisado no hay respuesta: la señal es la similitud o diferencia entre los propios datos.'],
      ['¿Por qué una anomalía no debe tratarse automáticamente como fraude?', 'Porque «raro» no es «malo»: un viaje, una compra excepcional o un cambio de hábitos también son anómalos. Bloquear sin revisar genera falsos positivos y perjudica a clientes legítimos.'],
      ['¿Cómo validarías que un segmento de clientes es útil para el negocio?', 'Comprobando si tiene una interpretación clara, si es estable en el tiempo, si permite acciones distintas (una campaña específica) y si no se apoya en variables que discriminen indirectamente (barrio, edad, género).'],
      ['Piensa en datos de tu trabajo sin etiquetas. ¿Qué estructura te gustaría descubrir?', 'Respuesta abierta. Ejemplo: incidencias de soporte sin categoría, para descubrir los temas más frecuentes y priorizar documentación.']
    ],
    quiz: [
      { q: 'En el aprendizaje no supervisado…', o: ['Cada ejemplo tiene su respuesta correcta', 'El sistema busca estructura sin respuestas etiquetadas', 'El sistema recibe recompensas', 'No se usan datos'], c: 1, why: 'No hay etiquetas: se buscan grupos, anomalías o relaciones.' },
      { q: '¿Quién da significado a los grupos encontrados?', o: ['El algoritmo, automáticamente', 'Una persona que los interpreta y valida', 'Nadie: no tienen significado', 'El cliente'], c: 1, why: 'El sistema encuentra agrupaciones; su interpretación y validación son humanas.' },
      { q: 'Un ejemplo típico de aprendizaje no supervisado es…', o: ['Predecir el precio de un piso', 'Segmentar clientes por hábitos de compra', 'Enseñar a un robot a andar con recompensas', 'Clasificar correos etiquetados'], c: 1, why: 'La segmentación sin etiquetas previas es el caso clásico.' }
    ],
    terms: [['Aprendizaje no supervisado', 'Aprendizaje sin respuestas etiquetadas que busca grupos, anomalías o relaciones en los datos.'], ['Clustering (agrupamiento)', 'Técnica que agrupa elementos parecidos entre sí.'], ['Anomalía', 'Dato que se aleja del comportamiento habitual; no implica necesariamente un problema.']]
  });

  /* ------------------------------------------------------------------ */
  const MAZE_WALLS = ['1,0', '1,1', '1,2', '3,1', '3,2', '3,3', '3,4', '5,0', '5,1', '5,2'];
  const MAZE_PATH = [[0, 0], [0, 1], [0, 2], [0, 3], [1, 3], [2, 3], [2, 2], [2, 1], [2, 0], [3, 0], [4, 0], [4, 1], [4, 2], [4, 3], [5, 3], [6, 3], [6, 4]];
  PL.concept({
    id: 'refuerzo', block: 'b1', slide: 'S6', title: 'Aprendizaje por refuerzo',
    idea: 'Un agente actúa, recibe recompensas o penalizaciones y mejora su estrategia con la repetición. Lo crítico es qué se premia: el sistema optimizará exactamente eso.',
    explain: [
      'En el aprendizaje por refuerzo un agente toma decisiones, recibe una recompensa o penalización y mejora su estrategia con la repetición. Se parece a aprender por prueba, error y retroalimentación.',
      'Ejemplo: un sistema que aprende a jugar partidas, controlar un robot o asignar recursos en una simulación. No memoriza una respuesta correcta para cada situación; aprende qué secuencias de acciones aumentan la recompensa definida.',
      'La parte crítica es la recompensa. Si se premia una métrica mal elegida, el sistema puede optimizarla de forma indeseada. Por eso la pregunta «¿qué estamos premiando realmente?» es tan importante como el algoritmo. Los productos reales suelen combinar este y otros métodos.'
    ],
    panels: [
      {
        title: 'Prueba, error y recompensa',
        caption: 'Un agente aprende a cruzar un laberinto sin que nadie le indique el camino.',
        steps: [
          'Un agente (el robot) debe llegar a la estrella. Nadie le dice el camino.',
          'Prueba acciones. Chocar con un muro: −1. Acercarse a la meta: pequeña recompensa.',
          'Tras muchas partidas, la recompensa total crece: ha aprendido qué secuencia de acciones funciona.',
          'No memoriza «la respuesta correcta»: aprende una estrategia a partir de la retroalimentación.'
        ],
        draw(g) {
          const x0 = 22, y0 = 36, cs = 28;
          for (let c = 0; c < 7; c++) for (let r = 0; r < 5; r++) {
            const wall = MAZE_WALLS.includes(c + ',' + r);
            rect(x0 + c * cs, y0 + r * cs, cs, cs, P.ink);
            rect(x0 + c * cs + 1, y0 + r * cs + 1, cs - 2, cs - 2, wall ? '#0a0f1d' : '#34436b');
            if (wall) { for (let k = 0; k < 3; k++) { rect(x0 + c * cs + 2, y0 + r * cs + 5 + k * 9, cs - 4, 1, P.gray3); rect(x0 + c * cs + (k % 2 ? 8 : 18), y0 + r * cs + 1 + k * 9, 1, 9, P.gray3); } }
          }
          icon('star', x0 + 6 * cs + 2, y0 + 4 * cs + 2, 2);
          const center = ([c, r]) => [x0 + c * cs + cs / 2, y0 + r * cs + cs / 2];
          let rx = x0 + 6, ry = y0 + 4;
          if (g.on(1)) {
            const t = (D.T * 0.8) % 1, k = Math.sin(t * Math.PI);
            rx = x0 + 6 + k * 14;
            [['1,0', -1], ['3,1', -1], ['5,2', -1]].forEach(([w], i) => { const [c, r] = w.split(',').map(Number); txt('−1', x0 + c * cs + 7, y0 + r * cs + 9, { size: 9, color: P.red, weight: 700 }); });
            txt('+0,1', x0 + 4, y0 + cs + 9, { size: 8, color: P.mint });
          }
          if (g.from(2)) {
            path(MAZE_PATH.map(center), { p: g.at(2), color: P.mint, w: 3 });
            const t = (D.T * 0.25) % 1, n = MAZE_PATH.length - 1, idx = Math.min(n - 1, Math.floor(t * n)), f = t * n - idx;
            const [ax, ay] = center(MAZE_PATH[idx]), [bx, by] = center(MAZE_PATH[idx + 1]);
            rx = lerp(ax, bx, f) - 8; ry = lerp(ay, by, f) - 10;
          }
          robot(rx, ry, { s: 1, mood: g.on(1) ? 'confused' : 'happy', color: P.orange, still: true });
          if (g.on(0)) qmark(x0 + 30, y0 - 2, P.yellow, 1);
          show(g.at(2), () => {
            card(246, 30, 220, 160, 'RECOMPENSA POR PARTIDA', P.yellow);
            vbars(262, 64, 188, 96, [0.08, 0.18, 0.3, 0.46, 0.62, 0.8, 0.94], { labels: ['1', '5', '10', '50', '100', '300', '500'], color: P.mint, reveal: i => clamp(g.at(2) * 8 - i) });
            txt('partidas →', 450, 178, { size: 7, color: P.light, align: 'right' });
          });
          show(g.at(3), () => banner('Aprende una estrategia, no una respuesta memorizada', { y: 232 }));
        }
      },
      {
        title: 'Cuidado con lo que premias',
        caption: 'Un robot limpiador premiado por «no ver suciedad» encuentra un atajo indeseado.',
        steps: [
          'Queremos un robot que limpie la oficina. Lo premiamos cada vez que su cámara no ve suciedad.',
          'El robot descubre un atajo: taparse la cámara con un cubo. Recompensa máxima… y oficina sucia.',
          'Ha optimizado la métrica, no el objetivo. La pregunta clave: ¿qué estamos premiando realmente?',
          'Pasa también en negocio: premiar solo «tiempo en la app» puede favorecer contenido adictivo.'
        ],
        draw(g) {
          card(14, 22, 290, 196, 'OFICINA', P.sky);
          rect(18, 40, 282, 174, '#1c2742');
          for (let i = 0; i < 9; i++) { const x = 30 + rnd(i + 3) * 250, y = 52 + rnd(i * 4 + 1) * 140; rect(x, y, 10, 6, '#6b4a2f'); rect(x + 3, y - 2, 5, 2, '#6b4a2f'); }
          const cheat = g.from(1);
          const rx = cheat ? 140 : 120 + Math.sin(D.T * 0.9) * 60;
          robot(rx, 110, { mood: cheat ? 'sure' : 'happy', color: P.teal });
          if (cheat) show(g.at(1), () => { rect(rx + 2, 108, 28, 20, P.ink); rect(rx + 4, 110, 24, 16, P.gray3); rect(rx, 124, 32, 4, P.light); txt('cubo', rx + 16, 96, { size: 7, color: P.light, align: 'center' }); });
          card(318, 22, 148, 104, 'RECOMPENSA', P.yellow);
          txt('+1 por cada momento\nsin ver suciedad', 392, 44, { size: 7.5, align: 'center', color: P.light });
          txt(cheat ? '+9.999' : '+12', 392, 74, { size: 22, align: 'center', color: cheat ? P.yellow : P.white, weight: 700 });
          if (cheat) sparkle(440, 80);
          show(g.at(1), () => stamp('ATAJO', 160, 190, { a: late(g.at(1)), color: P.orange }));
          show(g.at(2), () => {
            chip('métrica: no ver suciedad', 392, 140, { align: 'center', fill: P.orange, size: 8, w: 146 });
            txt('≠', 392, 160, { size: 14, align: 'center', color: P.red, weight: 700 });
            chip('objetivo: oficina limpia', 392, 182, { align: 'center', fill: P.mint, size: 8, w: 146 });
          });
          show(g.at(3), () => banner('Negocio: premiar solo «tiempo en la app» puede fomentar contenido adictivo', { y: 232, icon: 'phone', size: 8.5 }));
        }
      },
      {
        title: 'Las tres señales, comparadas',
        caption: 'Supervisado, no supervisado y refuerzo se distinguen por la señal de la que aprenden.',
        steps: [
          'Supervisado: aprende de ejemplos con respuesta. Señal: la etiqueta correcta.',
          'No supervisado: aprende de datos sin respuesta. Señal: la similitud entre los datos.',
          'Refuerzo: aprende actuando. Señal: la recompensa o penalización tras cada acción.',
          'Los productos reales combinan métodos. Un recomendador puede usar los tres, además de reglas de negocio.'
        ],
        draw(g) {
          const cols = [
            { t: 'SUPERVISADO', col: P.blue, d: 'ejemplos + respuesta', s: 'la etiqueta correcta', ex: 'spam / no spam' },
            { t: 'NO SUPERVISADO', col: P.orange, d: 'datos sin respuesta', s: 'la similitud', ex: 'segmentos de clientes' },
            { t: 'REFUERZO', col: P.purple, d: 'acciones y resultados', s: 'la recompensa', ex: 'juego, robot, recursos' }
          ];
          cols.forEach((cl, i) => {
            const x = 14 + i * 156;
            show(g.at(i), () => {
              card(x, 14, 140, 168, cl.t, cl.col, { active: g.on(i) });
              if (i === 0) { mail(x + 10, 38, { w: 56, h: 32, tag: 'spam', tagColor: P.red }); mail(x + 74, 38, { w: 56, h: 32, tag: 'no spam', tagColor: P.mint, seed: 6 }); }
              if (i === 1) { for (let k = 0; k < 7; k++) { dot(x + 30 + rnd(k) * 26, 46 + rnd(k + 9) * 22, P.sky, 2.5); dot(x + 90 + rnd(k + 4) * 26, 50 + rnd(k + 2) * 22, P.mint, 2.5); } }
              if (i === 2) { robot(x + 40, 34, { s: 1, color: P.orange }); arrow(x + 62, 46, x + 88, 46, { color: P.yellow }); icon('star', x + 92, 38, 2); }
              txt(cl.ex, x + 70, 82, { size: 7.5, align: 'center', color: P.light });
              txt('DATOS', x + 10, 102, { size: 7.5, color: P.yellow }); txt(cl.d, x + 10, 113, { size: 8.5, maxW: 124 });
              txt('SEÑAL', x + 10, 136, { size: 7.5, color: P.yellow }); txt(cl.s, x + 10, 147, { size: 9.5, maxW: 124, color: cl.col, weight: 700 });
            });
          });
          show(g.at(3), () => {
            box(160, 200, 160, 40, { fill: P.paper });
            arrow(84, 184, 160, 212, { color: P.blue }); arrow(240, 184, 240, 199, { color: P.orange }); arrow(396, 184, 320, 212, { color: P.purple });
            icon('tv', 170, 208, 2);
            txt('Recomendador real', 200, 208, { size: 9, color: P.ink, weight: 700 });
            txt('combina métodos', 200, 222, { size: 8, color: P.ink });
            chip('+ reglas de negocio', 398, 212, { align: 'center', fill: P.yellow, size: 8 });
            arrow(342, 220, 322, 220, { color: P.yellow });
          });
        }
      }
    ],
    examples: [
      ['Juegos', 'Sistemas que aprenden a jugar partidas mejorando su puntuación con miles de intentos.'],
      ['Robótica', 'Un brazo robótico que aprende a coger objetos en una simulación.'],
      ['Asignación de recursos', 'Optimizar la climatización de un edificio premiando el ahorro sin perder confort.'],
      ['Ajuste de asistentes', 'La retroalimentación humana sobre respuestas se usa como señal para mejorar modelos de lenguaje.']
    ],
    mistakes: [
      'Elegir una recompensa fácil de medir pero distinta del objetivo real.',
      'Pensar que el agente «entiende» la meta: solo maximiza la recompensa definida.',
      'Afirmar con certeza qué método usa un producto cuya arquitectura no conocemos.'
    ],
    questions: [
      ['¿Qué estamos premiando realmente si un sistema de atención al cliente se recompensa por cerrar tickets rápido?', 'La rapidez de cierre, no la resolución. Puede aprender a cerrar tickets sin resolverlos o a derivarlos. Conviene combinar métricas: resolución confirmada, satisfacción, reaperturas.'],
      ['Diferencia una «métrica» de un «objetivo» con un ejemplo de tu entorno.', 'Ejemplo: objetivo = clientes satisfechos; métrica = número de encuestas con 5 estrellas. Si solo premias la métrica, alguien puede presionar para obtener 5 estrellas sin mejorar el servicio.'],
      ['¿Qué señal recibe el sistema en cada uno de los tres tipos de aprendizaje?', 'Supervisado: la respuesta correcta de cada ejemplo. No supervisado: ninguna respuesta, solo la similitud entre datos. Refuerzo: una recompensa o penalización tras actuar.'],
      ['¿Por qué decimos que un recomendador puede combinar los tres métodos?', 'Puede predecir valoraciones con datos etiquetados (supervisado), agrupar usuarios parecidos (no supervisado) y ajustar qué mostrar según clics o tiempo de visionado (refuerzo), además de aplicar reglas de negocio.']
    ],
    quiz: [
      { q: 'En el aprendizaje por refuerzo el agente aprende a partir de…', o: ['Ejemplos etiquetados', 'Recompensas y penalizaciones por sus acciones', 'Grupos de datos similares', 'Reglas escritas por personas'], c: 1, why: 'Actúa, recibe retroalimentación y ajusta su estrategia.' },
      { q: 'Un robot limpiador se tapa la cámara para «no ver suciedad». Es un ejemplo de…', o: ['Aprendizaje supervisado', 'Recompensa mal diseñada', 'Alucinación', 'Sobreentrenamiento'], c: 1, why: 'El sistema optimiza la métrica premiada en lugar del objetivo real.' },
      { q: '¿Qué es más acertado sobre los productos reales?', o: ['Usan un único tipo de aprendizaje', 'Suelen combinar varios métodos y reglas', 'Siempre usan refuerzo', 'Nunca usan reglas'], c: 1, why: 'Lo habitual es combinar métodos; por eso se identifica el mecanismo predominante.' }
    ],
    terms: [['Aprendizaje por refuerzo', 'Aprendizaje en el que un agente mejora su estrategia a partir de recompensas y penalizaciones.'], ['Agente', 'Sistema que observa, decide y actúa en un entorno.'], ['Recompensa', 'Señal numérica que indica lo bien o mal que ha ido una acción; define qué optimiza el sistema.']]
  });

  /* ------------------------------------------------------------------ */
  PL.concept({
    id: 'valor', block: 'b1', title: 'Dónde vemos IA y cómo reconocer valor real',
    idea: 'La IA aporta valor cuando reduce trabajo repetitivo, mejora una decisión con evidencia, acelera el acceso a información o produce un primer borrador revisable. No por añadir un chat a una aplicación.',
    explain: [
      'Convivimos con IA a diario: el teclado predictivo estima la siguiente palabra, el filtro de correo calcula la probabilidad de que un mensaje sea malicioso, un recomendador encuentra afinidades y un sistema de visión lee facturas o imágenes industriales.',
      'Para evaluar un caso de uso hay seis preguntas: qué problema se resuelve, qué decisión o documento mejora, si hay datos de calidad y autorizados, qué error puede cometer y con qué consecuencia, quién revisará el resultado y si la IA es la solución más simple y proporcionada.',
      'Señales de uso forzado: no hay un problema concreto, solo ganas de «usar IA»; la tarea se resuelve mejor con una regla o una mejora de proceso; faltan datos fiables; verificar cada salida cuesta más que el ahorro; o el impacto de un error es alto y no hay supervisión humana.'
    ],
    panels: [
      {
        title: 'IA en un día cualquiera',
        caption: 'Cinco momentos cotidianos en los que interviene algún tipo de IA, cada uno con su técnica predominante.',
        steps: [
          '07:45 · El teclado del móvil predice la siguiente palabra.',
          '09:10 · El filtro de correo aparta mensajes no deseados o maliciosos.',
          '14:30 · Una app de visión lee una factura escaneada y extrae el importe.',
          '21:00 · Un recomendador sugiere una serie a partir de lo que han visto personas parecidas.',
          'Y cuando lo pides, un asistente generativo redacta, resume o transforma formatos.'
        ],
        draw(g) {
          rect(30, 36, 420, 3, P.gray3);
          const items = [
            { h: '07:45', ic: 'phone', tag: 'predicción' },
            { h: '09:10', ic: 'mail', tag: 'clasificación' },
            { h: '14:30', ic: 'camera', tag: 'visión' },
            { h: '21:00', ic: 'tv', tag: 'recomendación' },
            { h: 'a demanda', ic: 'chat', tag: 'generativa' }
          ];
          items.forEach((it, i) => {
            const cx = 58 + i * 91, x = cx - 42;
            rect(cx - 4, 33, 8, 9, g.from(i) ? P.yellow : P.gray3);
            show(g.at(i), () => {
              card(x, 54, 84, 168, it.h, g.on(i) ? P.orange : P.blue, { active: g.on(i) });
              icon(it.ic, cx - 12, 78, 2);
              if (i === 0) { box(x + 8, 110, 68, 20, { fill: P.white, shadow: false }); txt('Nos vemos…', x + 12, 116, { size: 7.5, color: P.ink }); ['mañana', 'luego', 'ya'].forEach((s, k) => chip(s, cx, 136 + k * 18, { align: 'center', fill: k === 0 ? P.yellow : P.paper, size: 7, w: 54, h: 15 })); }
              if (i === 1) { mail(x + 12, 112, { w: 60, h: 36, tag: 'spam', tagColor: P.red }); txt('apartado', cx, 162, { size: 7.5, color: P.light, align: 'center' }); }
              if (i === 2) { paper(x + 12, 108, 60, 66, { lines: 4, seed: 7 }); rect(x + 18, 154, 46, 10, P.yellow); txt('84,20 €', cx - 2, 155, { size: 7.5, color: P.ink, align: 'center', weight: 700 }); }
              if (i === 3) { [P.purple, P.orange, P.teal].forEach((cl, k) => { box(x + 10 + k * 22, 116, 20, 28, { fill: cl, shadow: false }); }); icon('star', cx - 6, 152, 1); txt('Te puede gustar', cx, 168, { size: 6.5, color: P.light, align: 'center' }); }
              if (i === 4) { msg(x + 8, 110, 68, 'Resume este acta en 3 puntos', { who: 'user', size: 6.5 }); msg(x + 8, 146, 68, '1… 2… 3…', { size: 6.5 }); }
              chip(it.tag, cx, 196, { align: 'center', fill: P.mint, size: 7, w: 74 });
            });
          });
        }
      },
      {
        title: 'Seis preguntas antes de decir «usemos IA»',
        caption: 'Un filtro para convertir una idea en un caso de uso evaluable.',
        steps: [
          '1 · ¿Qué problema de negocio o de usuario resolvemos? 2 · ¿Qué decisión, documento o búsqueda mejora exactamente?',
          '3 · ¿Hay datos o fuentes de calidad y con permiso de uso? 4 · ¿Qué error puede cometer y qué consecuencia tendría?',
          '5 · ¿Quién revisará el resultado antes de aplicarlo? 6 · ¿Es la IA la solución más simple y proporcionada?',
          'Si alguna respuesta es «no lo sé», todavía no hay caso de uso: hay una idea por explorar.'
        ],
        draw(g) {
          chip('«Usemos IA»', 86, 18, { align: 'center', fill: P.yellow, size: 10, icon: 'bulb' });
          rect(80, 42, 12, 168, P.gray2); frame(78, 42, 16, 168, P.ink, 2);
          const qs = ['¿Qué problema de negocio o de usuario resolvemos?', '¿Qué decisión, documento o búsqueda mejora exactamente?', '¿Hay datos o fuentes de calidad y con permiso de uso?', '¿Qué error puede cometer y qué consecuencia tendría?', '¿Quién revisará el resultado antes de aplicarlo?', '¿Es la solución más simple y proporcionada?'];
          qs.forEach((q, i) => {
            const st = Math.floor(i / 2), y = 26 + i * 32, a = g.at(st);
            rect(66, 52 + i * 26, 40, 4, a > 0.5 ? P.mint : P.gray3);
            show(a, () => {
              box(150, y, 316, 28, { fill: P.gray2, shadow: false });
              badge(i + 1, 156, y + 7, P.orange);
              txt(q, 178, y + 9, { size: 8.5, maxW: 280, fit: true });
              icon('check', 448, y + 8, 1);
            }, 4);
          });
          show(g.at(3), () => {
            arrow(86, 212, 86, 226, { color: P.mint });
            banner('¿Algún «no lo sé»? → todavía es una idea por explorar', { y: 232, x: 16, w: 448 });
          });
        }
      },
      {
        title: 'Valor real frente a uso forzado',
        caption: 'Dos propuestas en la misma empresa. Solo una tiene un problema concreto y medible.',
        steps: [
          'Caso A: «Pongamos un chatbot en la web porque todo el mundo lo tiene». No hay un problema definido.',
          'Caso B: 3.000 incidencias diarias se clasifican a mano y tardan dos días en llegar al equipo correcto.',
          'B tiene problema concreto, datos históricos, una métrica (tiempo de asignación) y revisión humana posible.',
          'Alarma: si verificar cada salida cuesta más que el ahorro que produce, el caso no compensa.'
        ],
        draw(g) {
          show(g.at(0), () => {
            card(14, 18, 218, 160, 'A · «QUEREMOS UN CHATBOT»', P.red, { active: g.on(0) });
            robot(30, 50, { mood: 'happy', color: P.pink });
            bubble(74, 44, 146, 30, { text: '¡Hola! ¿En qué puedo ayudarte?', tx: 64, ty: 64, size: 8 });
            txt('problema: ¿?', 74, 90, { size: 9, color: P.light }); txt('métrica: ¿?', 74, 106, { size: 9, color: P.light }); txt('datos: ¿?', 74, 122, { size: 9, color: P.light });
            qmark(196, 96, P.red, 2);
            meter(30, 156, 186, 0.2, { label: 'valor esperado', n: 10 });
          });
          show(g.at(1), () => {
            card(248, 18, 218, 160, 'B · 3.000 INCIDENCIAS / DÍA', P.mint, { active: g.on(1) || g.on(2) });
            for (let i = 0; i < 5; i++) ticket(262 + i * 4, 40 + i * 5, 'ticket', { w: 56, h: 18 });
            icon('clock', 352, 46, 2);
            txt(g.from(2) ? '2 h' : '2 días', 384, 52, { size: 12, color: g.from(2) ? P.mint : P.red, weight: 700 });
            show(g.at(2), () => {
              chip('datos históricos', 384, 86, { align: 'center', fill: P.paper, size: 7.5, w: 120 });
              chip('métrica clara', 384, 106, { align: 'center', fill: P.paper, size: 7.5, w: 120 });
              chip('revisión humana', 384, 126, { align: 'center', fill: P.paper, size: 7.5, w: 120 });
            });
            meter(264, 156, 186, g.from(2) ? 0.85 : 0.6, { label: 'valor esperado', n: 10 });
          });
          show(g.at(3), () => {
            scale(240, 188, -0.7, (x, y) => chip('coste de verificar', x, y - 18, { align: 'center', fill: P.red, size: 7.5 }), (x, y) => chip('ahorro', x, y - 18, { align: 'center', fill: P.mint, size: 7.5 }), { len: 100 });
            txt('no compensa', 240, 240, { size: 8, color: P.red, align: 'center' });
          });
        }
      },
      {
        title: 'A veces gana una regla sencilla',
        caption: 'No todo problema necesita un modelo: comparar con la solución más simple que funciona.',
        steps: [
          'Problema: los pedidos de más de 500 € necesitan la aprobación del responsable.',
          'Propuesta forzada: entrenar un modelo que «aprenda» qué pedidos aprobar. Datos, coste, errores, mantenimiento…',
          'Solución proporcionada: una regla. SI importe > 500 € → enviar a aprobación. Exacta, barata y auditable.',
          'La pregunta no es «¿podemos usar IA?», sino «¿cuál es la solución más simple que funciona?».'
        ],
        draw(g) {
          show(g.at(0), () => { paper(14, 70, 116, 96, { title: 'Pedido #2087', lines: 3, seed: 4 }); txt('640 €', 72, 134, { size: 18, color: P.ink, align: 'center', weight: 700 }); });
          arrow(132, 104, 150, 70, { p: g.at(1), color: P.red });
          arrow(132, 134, 150, 170, { p: g.at(2), color: P.mint });
          show(g.at(1), () => {
            card(152, 18, 314, 98, 'PROPUESTA FORZADA: UN MODELO', P.red, { active: g.on(1) });
            robot(164, 50, { mood: 'confused', color: P.pink });
            ['recoger datos', 'entrenar', 'evaluar', 'mantener'].forEach((s, i) => chip(s, 210 + (i % 2) * 96, 46 + Math.floor(i / 2) * 22, { fill: P.paper, size: 7.5, w: 88 }));
            for (let i = 0; i < 4; i++) icon('coin', 410 + (i % 2) * 14, 46 + Math.floor(i / 2) * 14, 1);
            stamp('DESPROPORCIONADO', 330, 100, { a: late(g.at(1)), size: 10 });
          });
          show(g.at(2), () => {
            card(152, 128, 314, 92, 'SOLUCIÓN PROPORCIONADA: UNA REGLA', P.mint, { active: g.on(2) });
            code([{ t: 'SI importe > 500 €', color: P.sky }, { t: '   → enviar a aprobación', color: P.mint }], 166, 154, { size: 9 });
            ['exacta', 'barata', 'auditable'].forEach((s, i) => chip(s, 168 + i * 96, 192, { fill: P.mint, size: 8, w: 88, icon: 'check', iconTint: P.ink }));
          });
          show(g.at(3), () => banner('¿Cuál es la solución más simple que funciona?', { y: 232 }));
        }
      }
    ],
    examples: [
      ['Valor real', 'Clasificar automáticamente miles de incidencias diarias con revisión de los casos dudosos.'],
      ['Valor real', 'Generar un primer borrador de respuesta a consultas frecuentes que una persona revisa antes de enviar.'],
      ['Uso forzado', 'Un chatbot en la web sin objetivo, sin métrica y sin base de conocimiento fiable.'],
      ['Uso forzado', 'Un modelo para decidir algo que una regla resuelve con exactitud (umbral de importe, fecha límite).']
    ],
    mistakes: [
      'Empezar por la tecnología («queremos IA») en lugar de por el problema.',
      'No calcular el coste de revisar cada salida.',
      'Ignorar qué pasa cuando el sistema se equivoca.'
    ],
    questions: [
      ['¿Qué caso de uso de IA en tu sector podría estar forzado? ¿Por qué?', 'Respuesta abierta. Busca señales: no hay métrica, faltan datos fiables, una regla bastaría, el error tendría alto impacto sin supervisión o revisar cuesta más que hacerlo a mano.'],
      ['Aplica las seis preguntas a «resumir automáticamente las actas de reunión».', '1) Problema: se pierde tiempo leyendo actas largas. 2) Mejora: un resumen con decisiones y responsables. 3) Datos: actas internas autorizadas. 4) Error: omitir una decisión o atribuirla mal. 5) Revisión: quien convocó la reunión. 6) Proporcionalidad: sí, si se revisa y ahorra tiempo real.'],
      ['¿Por qué el coste de verificar puede hacer inviable un caso de uso?', 'Si cada salida requiere tanta revisión como hacer el trabajo desde cero, la IA no ahorra nada y añade riesgo. El valor está en el ahorro neto tras la verificación necesaria.'],
      ['Da un ejemplo de tarea donde una regla o una búsqueda normal es mejor que la IA.', 'Calcular si una factura supera un importe, encontrar un documento por su número de expediente, validar el formato de un DNI. Son tareas exactas donde un modelo probabilístico solo añade error.']
    ],
    quiz: [
      { q: '¿Cuál es una señal de uso forzado de IA?', o: ['Hay un problema medible', 'Existen datos autorizados', 'La tarea se resuelve mejor con una regla sencilla', 'Hay revisión humana prevista'], c: 2, why: 'Si una regla exacta resuelve el problema, un modelo probabilístico solo añade coste y error.' },
      { q: 'El teclado predictivo del móvil es un ejemplo de…', o: ['Predicción del siguiente token o palabra', 'Aprendizaje por refuerzo puro', 'Sistema de reglas', 'Visión por computador'], c: 0, why: 'Estima qué palabra es probable a continuación.' },
      { q: 'Antes de implantar IA, ¿qué pregunta es imprescindible?', o: ['¿Qué modelo es el más grande?', '¿Qué error puede cometer y qué consecuencia tendría?', '¿Tiene chat?', '¿Lo usa la competencia?'], c: 1, why: 'Conocer el impacto del error define la supervisión necesaria y si el caso compensa.' }
    ],
    terms: [['Caso de uso', 'Problema concreto que se pretende resolver con una herramienta, con datos, métrica y responsable definidos.'], ['Uso forzado', 'Aplicación de IA sin problema claro o donde una solución más simple funciona mejor.']]
  });

  /* ------------------------------------------------------------------ */
  PL.concept({
    id: 'siguiente-token', block: 'b1', slide: 'S9', title: 'Un LLM predice el siguiente token',
    idea: 'Un modelo de lenguaje calcula una probabilidad para cada posible siguiente token, elige uno, lo añade al texto y repite. Una respuesta larga es ese bucle repetido muchas veces.',
    explain: [
      'Un LLM (Large Language Model) recibe una secuencia de texto y calcula una distribución de probabilidades para el siguiente token. Selecciona uno según esa distribución, lo añade al contexto y repite el proceso. Una respuesta aparentemente compleja es el resultado de repetir esta operación muchas veces.',
      'Decir que «predice la siguiente palabra» es una simplificación útil, pero técnicamente predice tokens: palabras, fragmentos de palabra, signos o secuencias frecuentes.',
      'El modelo no consulta por defecto una base de datos de hechos comprobados. Aprendió regularidades estadísticas durante el entrenamiento y, al responder, combina esos patrones con la conversación, los documentos y las instrucciones que recibe. En preguntas triviales, probabilidad y verdad suelen coincidir; en temas recientes, internos o poco documentados, una respuesta probable puede ser falsa.'
    ],
    panels: [
      {
        title: '«La capital de Francia es…»',
        caption: 'El modelo asigna una probabilidad a cada continuación posible y elige una.',
        steps: [
          'El modelo recibe un texto: «La capital de Francia es».',
          'Calcula una probabilidad para cada posible siguiente token.',
          'Selecciona uno según esa distribución. Aquí «París» es muchísimo más probable, y se añade al texto.',
          'No «sabe geografía» como una persona: para ese contexto, esa continuación es extremadamente probable.'
        ],
        draw(g) {
          const row = tokens(['La', ' capital', ' de', ' Francia', ' es'], 30, 34, { size: 10 });
          const endX = row.x0 + row.w + 4;
          if (!g.from(2) && blink(0.5)) rect(endX + 2, 34, 3, 18, P.white);
          robot(30, 104, { mood: g.from(2) ? 'happy' : 'think', color: P.purple });
          show(g.at(1), () => {
            txt('siguiente token', 236, 80, { size: 8, color: P.light });
            probBars(150, 98, [{ label: 'París', v: 0.92 }, { label: 'Lyon', v: 0.03 }, { label: 'una', v: 0.02 }, { label: 'bonita', v: 0.01 }, { label: 'Marsella', v: 0.01 }], { labelW: 80, barW: 170, p: g.at(1), highlight: g.from(2) ? 0 : null, gap: 20 });
          });
          if (g.from(2)) {
            const a = g.at(2);
            chip(' París', lerp(186, endX + 4, a), lerp(96, 34, a), { size: 10, fill: P.yellow, font: 'mono' });
          }
          show(g.at(3), () => banner('Probable para ese contexto, no «conocimiento» humano', { y: 232 }));
        }
      },
      {
        title: 'Token a token: el bucle',
        caption: 'Cada token generado pasa a formar parte del contexto con el que se predice el siguiente.',
        steps: [
          'Contexto: «Granada es una». El modelo predice el siguiente token: «ciudad».',
          '«ciudad» se añade al contexto. Ahora predice a partir de «Granada es una ciudad».',
          'Y otra vez: «situada», «al», «pie»… Cada token nuevo se convierte en contexto.',
          'Una respuesta larga es este bucle repetido cientos de veces. Por eso un error temprano arrastra a los siguientes.'
        ],
        draw(g) {
          box(16, 20, 448, 44, { fill: P.gray2 });
          txt('CONTEXTO', 24, 25, { size: 7, color: P.light });
          const extra = [' situada', ' al', ' pie', ' de', ' Sierra', ' Nevada'];
          const n = g.from(2) ? Math.ceil(g.at(2) * extra.length) : 0;
          const list = ['Granada', ' es', ' una'].concat(g.from(1) ? [' ciudad'] : [], extra.slice(0, n));
          tokens(list, 24, 37, { size: 8.5, colors: list.map((_, i) => i < 3 ? P.blue : P.yellow) });
          robot(60, 104, { mood: 'think', color: P.purple });
          arrow(76, 66, 76, 100, { color: P.sky });
          arrow(98, 128, 176, 128, { color: P.sky });
          card(180, 100, 150, 56, 'SIGUIENTE TOKEN', P.orange);
          const cur = g.on(0) ? 'ciudad' : g.on(1) ? 'situada' : (extra[Math.min(extra.length - 1, Math.max(0, n))] || 'Nevada').trim();
          txt(cur, 255, 126, { size: 13, color: P.yellow, align: 'center', font: 'mono', weight: 600 });
          path([[332, 128], [350, 128], [350, 80], [300, 80], [300, 66]], { color: P.mint });
          txt('se añade', 354, 92, { size: 7.5, color: P.mint });
          card(396, 100, 70, 56, 'VUELTA', P.navy);
          txt(String(g.on(0) ? 1 : g.on(1) ? 2 : 2 + n), 431, 124, { size: 16, align: 'center', weight: 700 });
          show(g.at(3), () => banner('Un error temprano se arrastra: cada token condiciona a los siguientes', { y: 232 }));
        }
      },
      {
        title: 'Probable no es lo mismo que verdadero',
        caption: 'El mismo mecanismo funciona bien con datos muy documentados y falla en temas recientes o internos.',
        steps: [
          'Tema muy documentado: probabilidad y verdad suelen coincidir. «París» es correcto.',
          'Tema reciente o interno: «¿Quién ganó el premio de innovación de nuestra empresa en 2026?».',
          'El modelo genera igualmente la continuación más plausible… y aparece un nombre inventado, con total seguridad.',
          'Cuanto menos documentado está algo, más fácil es que la respuesta «probable» sea falsa.'
        ],
        draw(g) {
          show(g.at(0), () => {
            txt('TEMA MUY DOCUMENTADO', 20, 20, { size: 8, color: P.mint });
            box(20, 36, 176, 40, { fill: P.paper }); txt('«La capital de Francia es…»', 108, 50, { size: 8.5, color: P.ink, align: 'center' });
            arrow(200, 56, 228, 56, { color: P.sky });
            robot(232, 36, { color: P.purple });
            arrow(270, 56, 298, 56, { color: P.mint });
            chip('París', 302, 46, { fill: P.mint, size: 10 }); icon('check', 356, 46, 2);
          });
          show(g.at(1), () => {
            txt('TEMA RECIENTE O INTERNO', 20, 112, { size: 8, color: P.orange });
            box(20, 128, 176, 52, { fill: P.paper }); txt('¿Quién ganó el premio de innovación de nuestra empresa en 2026?', 108, 136, { size: 8, color: P.ink, align: 'center', maxW: 164 });
            arrow(200, 154, 228, 154, { color: P.sky });
            robot(232, 134, { color: P.purple, mood: g.from(2) ? 'sure' : 'think' });
          });
          show(g.at(2), () => {
            arrow(270, 154, 298, 154, { color: P.red });
            chip('Marta López', 302, 144, { fill: P.yellow, size: 10 });
            stamp('INVENTADO', 400, 186, { a: late(g.at(2)) });
          });
          show(g.at(1), () => { txt('documentación', 420, 22, { size: 7.5, color: P.light, align: 'center' }); meter(384, 40, 74, 0.9, { n: 6, color: P.mint }); meter(384, 132, 74, 0.15, { n: 6, color: P.red }); });
          show(g.at(3), () => banner('Menos documentado → más riesgo de que lo «probable» sea falso', { y: 232 }));
        }
      },
      {
        title: 'El contexto cambia la siguiente palabra',
        caption: 'La misma palabra, «banco», lleva a continuaciones distintas según lo que la rodea.',
        steps: [
          'Misma palabra, contextos distintos: «banco».',
          '«Me senté en el banco del…» → parque, jardín, paseo.',
          '«Pedí un préstamo al banco y me…» → concedieron, denegaron, pidieron.',
          'Tema, gramática, instrucción e historial desplazan las probabilidades. Por eso el contexto que das importa tanto.'
        ],
        draw(g) {
          show(g.at(1), () => {
            tokens(['Me', ' senté', ' en', ' el', ' banco', ' del'], 24, 20, { size: 9, colors: [P.blue, P.blue, P.blue, P.blue, P.yellow, P.blue] });
            probBars(40, 48, [{ label: 'parque', v: 0.62 }, { label: 'jardín', v: 0.2 }, { label: 'paseo', v: 0.1 }], { labelW: 70, barW: 150, p: g.at(1), highlight: 0 });
            icon('pin', 330, 54, 3);
          });
          show(g.at(0), () => { chip('banco', 240, 110, { align: 'center', fill: P.yellow, size: 13 }); if (g.on(0)) { qmark(282, 106); qmark(186, 106); } });
          show(g.at(2), () => {
            tokens(['Pedí', ' un', ' préstamo', ' al', ' banco', ' y', ' me'], 24, 140, { size: 9, colors: [P.orange, P.orange, P.orange, P.orange, P.yellow, P.orange, P.orange] });
            probBars(40, 168, [{ label: 'concedieron', v: 0.48 }, { label: 'denegaron', v: 0.31 }, { label: 'pidieron', v: 0.12 }], { labelW: 70, barW: 150, p: g.at(2), highlight: 0 });
            icon('coin', 330, 174, 3);
          });
          show(g.at(3), () => banner('El contexto desplaza las probabilidades', { y: 236 }));
        }
      }
    ],
    examples: [
      ['Autocompletar', 'El teclado del móvil propone «mañana» tras «nos vemos».'],
      ['Redacción', 'Un asistente escribe un correo token a token, cada uno condicionado por los anteriores.'],
      ['Error que se arrastra', 'Si al principio afirma una fecha errónea, el resto del párrafo se construye sobre ella.']
    ],
    mistakes: [
      'Creer que el modelo consulta una base de datos de hechos al responder.',
      'Pensar que una respuesta fluida implica conocimiento comprobado.',
      'Olvidar que lo que escribes (contexto) cambia lo que el modelo considera probable.'
    ],
    questions: [
      ['¿Qué información del contexto haría cambiar la siguiente palabra en «El banco…»?', 'El tema de la conversación (parques o finanzas), la instrucción (escribe un poema / un informe), la gramática de lo anterior y el historial. Todo eso desplaza las probabilidades.'],
      ['¿Por qué en preguntas triviales el modelo suele acertar?', 'Porque la respuesta correcta aparece muchísimas veces en los datos de entrenamiento: lo más probable y lo verdadero coinciden.'],
      ['¿Qué tipo de preguntas tienen más riesgo de respuesta probable pero falsa?', 'Las de hechos recientes, información interna de una organización, datos muy específicos (cifras, fechas, citas) y temas poco documentados.'],
      ['Si un modelo comete un error en la primera frase, ¿por qué puede empeorar el resto?', 'Porque cada token generado pasa a ser contexto: el modelo continúa de forma coherente con lo ya escrito, incluido el error.']
    ],
    quiz: [
      { q: '¿Qué hace un LLM al generar texto?', o: ['Busca la respuesta en una base de datos verificada', 'Predice repetidamente el siguiente token según probabilidades', 'Copia frases de internet', 'Razona como una persona'], c: 1, why: 'Calcula probabilidades, elige un token, lo añade y repite.' },
      { q: 'Una respuesta muy probable…', o: ['Es siempre verdadera', 'Puede ser falsa en temas recientes o poco documentados', 'Nunca es verdadera', 'Es verdadera si el texto es largo'], c: 1, why: 'Probabilidad y verdad coinciden a menudo en temas triviales, pero no siempre.' },
      { q: 'Tras elegir un token, el modelo…', o: ['Termina la respuesta', 'Lo añade al contexto y predice el siguiente', 'Lo verifica en internet', 'Borra el contexto'], c: 1, why: 'Es un proceso autorregresivo: cada token se suma al contexto.' }
    ],
    terms: [['LLM', 'Large Language Model: modelo de lenguaje grande que genera texto prediciendo tokens.'], ['Distribución de probabilidades', 'Valores que indican lo probable que es cada posible siguiente token.']]
  });

  /* ------------------------------------------------------------------ */
  PL.concept({
    id: 'tokens', block: 'b1', slide: 'S10', title: 'Tokens y tokenización',
    idea: 'Un token es la unidad de texto que procesa el modelo: una palabra, un fragmento o un signo. Los tokens determinan cuánto cabe, cuánto tarda y cuánto cuesta.',
    explain: [
      'La tokenización divide una entrada en unidades manejables. El número de tokens no coincide siempre con el de caracteres ni con el de palabras: una palabra poco frecuente, una URL, un fragmento de código o ciertos idiomas se fragmentan de forma distinta.',
      'Los tokens importan por tres razones: capacidad (entrada y salida compiten por un espacio de contexto limitado), rendimiento (más texto suele implicar más tiempo) y coste (en servicios de API se paga por tokens de entrada y salida).',
      'Markdown ayuda a conservar la estructura en texto plano y suele ser preferible a pegar capturas de contenido textual. Pero no conviene afirmar que siempre sea «muchísimo más barato»: depende de la herramienta y del contenido. La recomendación sólida es aportar información limpia, estructurada y necesaria.'
    ],
    panels: [
      {
        title: 'Cortar el texto en piezas',
        caption: 'Segmentación ilustrativa: cada tokenizador corta de forma algo distinta.',
        steps: [
          'Texto de entrada: «La tokenización no es magia.»',
          'El tokenizador lo divide en piezas frecuentes: algunas son palabras completas, otras fragmentos o signos.',
          'Cada pieza se convierte en un número (su identificador). El modelo trabaja con esos números.',
          'Resultado: 5 palabras, 28 caracteres y 8 tokens. Las tres cuentas no coinciden.'
        ],
        draw(g) {
          box(40, 22, 400, 40, { fill: P.paper });
          txt('«La tokenización no es magia.»', 240, 33, { size: 14, color: P.ink, align: 'center', font: 'sans' });
          arrow(240, 66, 240, 84, { p: g.at(1), color: P.sky });
          const list = ['La', ' token', 'ización', ' no', ' es', ' mag', 'ia', '.'];
          const ids = ['3120', '4632', '17520', '708', '1253', '12405', '688', '13'];
          let pos = null;
          if (g.from(1)) pos = tokens(list, 240, 92, { align: 'center', size: 11, reveal: i => clamp(g.at(1) * list.length - i + 1) });
          show(g.at(2), () => {
            pos.items.forEach((it, i) => { arrow(it.cx, 116, it.cx, 128, { color: P.navy, head: 4 }); txt(ids[i], it.cx, 132, { size: 8, align: 'center', color: P.yellow, font: 'mono' }); });
            txt('identificadores numéricos', 240, 150, { size: 8, align: 'center', color: P.light });
          });
          show(g.at(3), () => {
            chip('5 palabras', 110, 178, { align: 'center', fill: P.sky, size: 10, w: 110 });
            chip('28 caracteres', 240, 178, { align: 'center', fill: P.paper, size: 10, w: 120 });
            chip('8 tokens', 370, 178, { align: 'center', fill: P.yellow, size: 10, w: 110 });
            banner('Tokens ≠ palabras ≠ caracteres', { y: 220 });
          });
        }
      },
      {
        title: 'No todos los textos se trocean igual',
        caption: 'Segmentaciones ilustrativas. Palabras raras, URLs y código se fragmentan más.',
        steps: [
          'Palabra muy frecuente: «house» → suele ser 1 token.',
          'Palabra larga o poco frecuente: «electroencefalografista» → varios tokens.',
          'Una URL o un fragmento de código se fragmenta mucho: barras, signos, números…',
          'Idioma, rareza y formato cambian la cuenta. Por eso conviene medir, no suponer.'
        ],
        draw(g) {
          const rows = [
            { s: 'house', t: ['house'], st: 0 },
            { s: 'electroencefalografista', t: ['electro', 'ence', 'fal', 'ograf', 'ista'], st: 1 },
            { s: 'https://ej.com/a?id=42', t: ['https', '://', 'ej', '.com', '/a', '?id', '=42'], st: 2 },
            { s: 'def f(x):', t: ['def', ' f', '(x', '):'], st: 2 }
          ];
          rows.forEach((r, i) => {
            const y = 26 + i * 48;
            show(g.at(r.st), () => {
              box(14, y, 170, 30, { fill: P.paper, shadow: false });
              txt(r.s, 99, y + 10, { size: 8.5, color: P.ink, align: 'center', font: 'mono', maxW: 160, fit: true });
              arrow(188, y + 15, 204, y + 15, { color: P.sky });
              tokens(r.t, 208, y + 6, { size: 8 });
              chip(r.t.length + (r.t.length === 1 ? ' token' : ' tokens'), 466, y + 6, { align: 'right', fill: r.t.length > 3 ? P.orange : P.mint, size: 8.5 });
            });
          });
          show(g.at(3), () => banner('Mide los tokens: no los supongas', { y: 228 }));
        }
      },
      {
        title: 'Por qué importan: capacidad, tiempo y coste',
        caption: 'Tres efectos prácticos del número de tokens.',
        steps: [
          'Capacidad: instrucciones, documentos y respuesta comparten un espacio limitado.',
          'Rendimiento: más tokens que procesar suele significar más tiempo de espera.',
          'Coste: en servicios de API se paga por tokens de entrada y de salida.',
          'Moraleja: aporta la información necesaria, limpia y estructurada; no todo lo que tengas.'
        ],
        draw(g) {
          show(g.at(0), () => {
            card(14, 18, 140, 140, 'CAPACIDAD', P.blue, { active: g.on(0) });
            const segs = [[0.15, P.purple, 'instrucc.'], [0.55, P.orange, 'documento'], [0.3, P.mint, 'respuesta']];
            let yy = 46;
            segs.forEach(s => { const h = 80 * s[0]; rect(40, yy, 36, h, s[1]); txt(s[2], 84, yy + h / 2 - 4, { size: 7.5, color: s[1] }); yy += h; });
            frame(38, 44, 40, 84, P.white, 2);
            txt('límite', 58, 132, { size: 7.5, align: 'center', color: P.light });
          });
          show(g.at(1), () => {
            card(170, 18, 140, 140, 'RENDIMIENTO', P.orange, { active: g.on(1) });
            icon('clock', 222, 44, 3);
            meter(186, 112, 108, 0.35 + 0.5 * ((D.T * 0.3) % 1), { label: 'tiempo de espera', n: 8, color: P.orange });
            txt('más tokens = más espera', 240, 132, { size: 7.5, align: 'center', color: P.light });
          });
          show(g.at(2), () => {
            card(326, 18, 140, 140, 'COSTE', P.yellow, { active: g.on(2) });
            for (let i = 0; i < 6; i++) icon('coin', 356 + (i % 3) * 26, 48 + Math.floor(i / 3) * 26, 2);
            txt('entrada + salida', 396, 112, { size: 8.5, align: 'center' });
            txt('(en servicios de API)', 396, 126, { size: 7, align: 'center', color: P.light });
          });
          show(g.at(3), () => {
            txt('Documento entero', 120, 176, { size: 8.5, align: 'right', color: P.light });
            rect(128, 176, 270, 12, P.red); txt('40.000 tokens', 404, 177, { size: 8, color: P.red });
            txt('Solo lo relevante', 120, 198, { size: 8.5, align: 'right', color: P.light });
            rect(128, 198, 46, 12, P.mint); txt('6.000 tokens', 180, 199, { size: 8, color: P.mint });
            banner('Limpio, estructurado y necesario', { y: 228 });
          });
        }
      },
      {
        title: 'Texto estructurado frente a captura de pantalla',
        caption: 'Dos formas de pasar la misma tabla a un asistente.',
        steps: [
          'Para compartir una tabla con un asistente puedes pegar una captura… o el texto en Markdown.',
          'La captura obliga a interpretar la imagen (si la herramienta tiene visión) y puede perder o confundir detalles.',
          'El texto en Markdown conserva la estructura y es fácil de revisar, corregir y reutilizar.',
          'Matiz: el ahorro depende de la herramienta y del contenido. La regla sólida: información limpia y necesaria.'
        ],
        draw(g) {
          show(g.at(0), () => {
            card(14, 20, 196, 150, 'CAPTURA (IMAGEN)', P.orange);
            for (let r = 0; r < 6; r++) for (let c = 0; c < 8; c++) { const v = rnd(r * 13 + c * 7); rect(26 + c * 22, 46 + r * 18, 20, 16, v > 0.66 ? P.gray3 : v > 0.33 ? P.gray2 : '#47557a'); }
            card(270, 20, 196, 150, 'TEXTO MARKDOWN', P.mint);
            code(['| Mes | Ventas |', '|-----|--------|', '| Ene |    120 |', '| Feb |    135 |', '| Mar |    128 |'], 284, 50, { size: 9, color: P.white, lh: 18 });
          });
          robot(224, 72, { mood: g.on(1) ? 'confused' : g.from(2) ? 'happy' : 'think', color: P.purple });
          show(g.at(1), () => { qmark(110, 92, P.red, 3); txt('requiere visión ·\npuede perder detalles', 112, 180, { size: 8, align: 'center', color: P.orange }); });
          show(g.at(2), () => { icon('check', 430, 140, 2); txt('estructura visible ·\nfácil de revisar', 368, 180, { size: 8, align: 'center', color: P.mint }); });
          show(g.at(3), () => banner('El ahorro depende de la herramienta. Regla: limpio y necesario', { y: 228 }));
        }
      }
    ],
    examples: [
      ['Coste de API', 'Enviar un PDF de 200 páginas para preguntar por un dato consume muchos tokens de entrada; mejor enviar solo la sección relevante.'],
      ['Idiomas', 'El mismo texto puede ocupar más tokens en un idioma que en otro según el tokenizador.'],
      ['Código y URLs', 'Las cadenas con símbolos se fragmentan en muchas piezas.']
    ],
    mistakes: [
      'Calcular tokens como si fueran palabras.',
      'Pegar documentos enteros «por si acaso».',
      'Afirmar que Markdown siempre es muchísimo más barato, sin matices.'
    ],
    questions: [
      ['¿Por qué una instrucción muy larga consume contexto que podría hacer falta para otra cosa?', 'Porque la ventana de contexto es limitada y compartida: lo que ocupen las instrucciones no puede usarse para documentos o para la respuesta.'],
      ['Tienes que preguntar por una cláusula de un contrato de 80 páginas. ¿Qué harías para gastar menos tokens sin perder calidad?', 'Localizar y aportar solo la sección relevante (con su contexto mínimo: definiciones y excepciones), o usar una herramienta con recuperación de fragmentos (RAG) y pedir citas.'],
      ['¿Por qué no se puede saber exactamente cuántos tokens tiene un texto contando palabras?', 'Porque cada tokenizador segmenta distinto y depende de la frecuencia de las piezas, el idioma, los signos y el formato. Hay que medirlo con la herramienta del proveedor.']
    ],
    quiz: [
      { q: 'Un token es…', o: ['Siempre una palabra', 'La unidad de texto que procesa el modelo: palabra, fragmento o signo', 'Una frase completa', 'Un carácter'], c: 1, why: 'Puede ser una palabra, una parte de ella o un signo.' },
      { q: '¿Qué tres aspectos afectan los tokens?', o: ['Color, tamaño y fuente', 'Capacidad, rendimiento y coste', 'Verdad, sesgo y ética', 'Idioma, país y fecha'], c: 1, why: 'Determinan cuánto cabe, cuánto tarda y cuánto cuesta.' },
      { q: '¿Qué recomendación es más sólida?', o: ['Pegar siempre capturas', 'Aportar información limpia, estructurada y necesaria', 'Pegar todos los documentos disponibles', 'Escribir sin signos de puntuación'], c: 1, why: 'Menos ruido y menos tokens innecesarios mejoran resultado y coste.' }
    ],
    terms: [['Token', 'Unidad de texto que procesa el modelo: palabra, fragmento de palabra o signo.'], ['Tokenización', 'Proceso que divide un texto en tokens.']]
  });

  /* ------------------------------------------------------------------ */
  PL.concept({
    id: 'contexto', block: 'b1', title: 'Ventana de contexto y «memoria»',
    idea: 'La ventana de contexto es todo lo que el modelo puede considerar en una interacción: instrucciones, historial, archivos, pregunta y respuesta. Más grande no significa atención perfecta.',
    explain: [
      'La ventana de contexto incluye normalmente las instrucciones del sistema, el historial de la conversación, los archivos o fragmentos recuperados, la pregunta actual y la respuesta que se está generando. Todo compite por el mismo espacio.',
      'Una ventana amplia permite trabajar con más material, pero no garantiza que todos los detalles se utilicen con la misma precisión. Un documento muy largo, mal estructurado o con instrucciones contradictorias puede degradar el resultado. Conviene resumir, estructurar, separar tareas y pedir que se cite o localice la evidencia.',
      'La «memoria» de una herramienta puede ser el historial de un chat, el contexto compartido de un proyecto, unas preferencias persistentes o información recuperada de archivos o conectores. No son equivalentes: antes de confiar en una memoria persistente hay que comprobar qué guarda, quién puede verlo y cómo se borra.'
    ],
    panels: [
      {
        title: 'Todo compite por el mismo espacio',
        caption: 'La ventana de contexto como una barra de capacidad que se va llenando.',
        steps: [
          'La ventana de contexto es lo que el modelo puede considerar en una interacción. Tiene un límite.',
          'Dentro van las instrucciones del sistema y el historial de la conversación…',
          '…los archivos o fragmentos recuperados y la pregunta actual…',
          '…y también la respuesta que se está generando. Si la entrada lo ocupa casi todo, queda poco para responder.'
        ],
        draw(g) {
          robot(224, 18, { mood: 'think', color: P.purple });
          txt('VENTANA DE CONTEXTO', 240, 66, { size: 10, color: P.yellow, align: 'center', weight: 700 });
          box(28, 84, 424, 56, { fill: P.ink, shadow: true });
          const segs = [{ t: 'sistema', v: 0.1, col: P.purple, s: 1 }, { t: 'historial', v: 0.28, col: P.blue, s: 1 }, { t: 'archivos', v: 0.34, col: P.orange, s: 2 }, { t: 'pregunta', v: 0.07, col: P.yellow, s: 2 }, { t: 'respuesta', v: 0.21, col: P.mint, s: 3 }];
          let x = 32;
          segs.forEach((sg, i) => {
            const a = g.at(sg.s), w = 416 * sg.v;
            if (a > 0) {
              rect(x, 88, w * a, 48, sg.col);
              if (i === 4 && blink(0.4)) rect(x + w * a - 4, 92, 3, 40, P.ink);
              show(a, () => { line(x + w / 2, 142, x + w / 2, i % 2 ? 176 : 152, sg.col, 1); chip(sg.t, x + w / 2, i % 2 ? 176 : 152, { align: 'center', fill: sg.col, size: 8.5 }); }, 0);
            }
            x += w;
          });
          if (g.on(0)) { txt('capacidad máxima', 240, 104, { size: 10, align: 'center', color: P.light }); }
          show(g.at(3), () => banner('Si la entrada lo ocupa casi todo, queda poco espacio para responder', { y: 222, icon: 'warn' }));
        }
      },
      {
        title: 'Cuando el historial no cabe',
        caption: 'En una conversación larga, lo más antiguo puede quedar fuera de la ventana.',
        steps: [
          'En una conversación larga, los mensajes se van acumulando dentro de la ventana.',
          'Cuando se supera la capacidad, la herramienta recorta, resume o deja fuera lo más antiguo.',
          'Resultado: el modelo «olvida» una instrucción que diste al principio.',
          'Buena práctica: repetir lo esencial, resumir periódicamente o empezar un chat nuevo con un resumen.'
        ],
        draw(g) {
          const msgs = [['user', 'Responde siempre en tono formal.'], ['ai', 'Entendido.'], ['user', 'Resume el informe A.'], ['ai', 'Resumen del informe A…'], ['user', 'Ahora el informe B.'], ['ai', 'Resumen del informe B…'], ['user', 'Y el C, por favor.'], ['ai', '¡Hecho, crack! Ahí va el C.']];
          const fy = 46, fh = 134, rh = 22;
          const count = g.on(0) ? 4 : g.on(1) ? 7 : 8;
          const prevCount = g.on(1) ? 4 : g.on(2) ? 7 : count;
          const sc = n => Math.max(0, n * rh - fh);
          const scroll = lerp(sc(prevCount), sc(count), g.p);
          for (let i = 0; i < count; i++) {
            const y = fy + i * rh - scroll;
            const out = y < fy - 4;
            const [who, s] = msgs[i];
            D.show(out ? 0.35 : 1, () => {
              const w = 150, x = who === 'user' ? 316 - w : 164;
              box(x, y, w, 18, { fill: who === 'user' ? P.blue : (i === 7 ? P.red : P.white), shadow: false });
              txt(s, x + 6, y + 5, { size: 7.5, color: P.ink, maxW: w - 12, fit: true });
              if (i === 0) frame(x - 2, y - 2, w + 4, 22, P.yellow, 2);
            }, 0);
          }
          frame(156, fy - 6, 168, fh + 12, P.yellow, 2);
          txt('VENTANA', 240, fy + fh + 10, { size: 8, color: P.yellow, align: 'center' });
          show(g.at(1), () => { chip('fuera de la ventana', 80, 24, { align: 'center', fill: P.gray3, color: P.white, size: 8 }); icon('scissors', 140, 20, 1); });
          show(g.at(2), () => { robot(380, 90, { mood: 'confused', color: P.purple }); bubble(346, 36, 116, 34, { text: '¿Tono formal?\nNo lo veo.', tx: 396, ty: 88, size: 8 }); });
          show(g.at(3), () => banner('Repite lo esencial o empieza un chat nuevo con un resumen', { y: 230 }));
        }
      },
      {
        title: 'Ventana grande no es atención perfecta',
        caption: 'Un documento larguísimo cabe, pero un detalle enterrado en mitad puede usarse peor.',
        steps: [
          'Cargas un documento de 300 páginas. Cabe en la ventana.',
          'Pero un detalle enterrado en mitad del texto puede usarse con menos precisión.',
          'Mejora: estructura con títulos, separa tareas y pide que localice y cite la evidencia.'
        ],
        draw(g) {
          show(g.at(0), () => {
            box(24, 18, 124, 214, { fill: P.paper });
            for (let i = 0; i < 26; i++) rect(34, 28 + i * 7.6, 90 + rnd(i) * 14, 2, i === 13 ? P.orange : P.light);
            txt('300 páginas', 86, 238, { size: 8, align: 'center', color: P.light });
            if (g.on(0)) chip('cabe ✓', 86, 120, { align: 'center', fill: P.mint, size: 9 });
          });
          show(g.at(1), () => {
            for (let i = 0; i < 26; i++) { const d = Math.abs(i - 12.5) / 12.5; const col = d > 0.66 ? P.mint : d > 0.33 ? P.yellow : P.gray3; rect(154, 28 + i * 7.6, 12, 6, col); }
            txt('atención', 160, 236, { size: 7.5, align: 'center', color: P.light });
            chip('plazo: 5 de mayo', 146, 120, { fill: P.orange, size: 7.5 });
            robot(214, 186, { mood: 'confused', color: P.purple });
            bubble(200, 142, 88, 36, { text: '¿Cuál era\nel plazo?', tx: 230, ty: 184, size: 8.5 });
          });
          show(g.at(2), () => {
            card(298, 18, 168, 190, 'ESTRUCTURADO', P.mint);
            code([{ t: '# 1. Contexto', color: P.sky }, '  …', { t: '# 2. Plazos', color: P.sky }, { t: '  5 de mayo', color: P.yellow, hl: '#3a3a1e' }, { t: '# 3. Riesgos', color: P.sky }, '  …'], 310, 44, { size: 9, lh: 18, w: 150 });
            chip('cita: p. 147', 382, 160, { align: 'center', fill: P.yellow, size: 9, icon: 'link' });
          });
        }
      },
      {
        title: 'Cuatro cosas que llamamos «memoria»',
        caption: 'Mecanismos distintos que conviene no confundir.',
        steps: [
          '1 · El historial disponible dentro de un chat.',
          '2 · El contexto compartido de un proyecto: instrucciones y archivos comunes.',
          '3 · Preferencias persistentes que configura la persona usuaria.',
          '4 · Información recuperada de archivos o conectores. Para todas: ¿qué guarda, quién lo ve y cómo se borra?'
        ],
        draw(g) {
          const items = [['HISTORIAL DEL CHAT', 'chat', 'lo dicho en esta conversación', P.blue], ['CONTEXTO DE PROYECTO', 'folder', 'instrucciones y archivos compartidos', P.orange], ['PREFERENCIAS', 'gear', 'lo que configuras de forma persistente', P.purple], ['RECUPERACIÓN', 'plug', 'archivos o conectores consultados', P.teal]];
          items.forEach((it, i) => {
            const x = 16 + (i % 2) * 232, y = 16 + Math.floor(i / 2) * 100;
            show(g.at(i), () => {
              card(x, y, 216, 88, (i + 1) + ' · ' + it[0], it[3], { active: g.on(i) });
              icon(it[1], x + 14, y + 36, 3);
              txt(it[2], x + 60, y + 38, { size: 9, maxW: 146 });
            });
          });
          show(g.at(3), () => {
            chip('¿Qué guarda?', 92, 220, { align: 'center', fill: P.yellow, size: 9, icon: 'eye' });
            chip('¿Quién lo ve?', 240, 220, { align: 'center', fill: P.yellow, size: 9, icon: 'user', iconTint: P.ink });
            chip('¿Cómo se borra?', 388, 220, { align: 'center', fill: P.yellow, size: 9, icon: 'cross', iconTint: P.ink });
          });
        }
      }
    ],
    examples: [
      ['Chat largo', 'Tras decenas de mensajes, el asistente deja de respetar el formato pedido al principio.'],
      ['Documento extenso', 'Un informe de 300 páginas cabe, pero conviene indicar la sección y pedir la página exacta.'],
      ['Memoria persistente', 'Una preferencia guardada («respóndeme en inglés») aparece en conversaciones posteriores.']
    ],
    mistakes: [
      'Suponer que el modelo recuerda todo lo hablado en un chat muy largo.',
      'Confundir el historial de un chat con una memoria persistente.',
      'Pegar documentos enormes sin estructura y esperar precisión en los detalles.'
    ],
    questions: [
      ['¿Qué elementos ocupan la ventana de contexto además de tu pregunta?', 'Las instrucciones del sistema, el historial de la conversación, los archivos o fragmentos recuperados y la propia respuesta que se va generando.'],
      ['El asistente ha dejado de seguir una instrucción que diste al principio. ¿Qué harías?', 'Repetir la instrucción, pedir un resumen del estado y empezar un chat nuevo con ese resumen e instrucciones claras, o guardar la instrucción en el proyecto si la herramienta lo permite.'],
      ['¿Qué tres preguntas harías antes de activar una memoria persistente?', '¿Qué guarda exactamente? ¿Quién puede verlo (yo, mi organización, el proveedor)? ¿Cómo se consulta y se borra?'],
      ['¿Por qué pedir que el modelo cite la página ayuda con documentos largos?', 'Le obliga a localizar la evidencia en lugar de responder de memoria general, y te permite comprobarla rápidamente.']
    ],
    quiz: [
      { q: 'La ventana de contexto incluye…', o: ['Solo la pregunta actual', 'Instrucciones, historial, archivos, pregunta y respuesta', 'Todo internet', 'Solo los archivos adjuntos'], c: 1, why: 'Todo lo que el modelo considera en la interacción comparte ese espacio.' },
      { q: 'Una ventana de contexto muy grande…', o: ['Garantiza que se usan todos los detalles con precisión', 'Permite más material, pero no garantiza atención perfecta', 'Elimina las alucinaciones', 'Hace innecesario estructurar'], c: 1, why: 'Más capacidad no implica que cada detalle se use igual de bien.' },
      { q: '¿Cuál NO es un tipo de «memoria» de las herramientas?', o: ['Historial del chat', 'Contexto de proyecto', 'Preferencias persistentes', 'Comprensión humana de tu vida'], c: 3, why: 'Las memorias son mecanismos técnicos concretos, no comprensión.' }
    ],
    terms: [['Ventana de contexto', 'Cantidad de información que el modelo puede considerar en una interacción, incluida la respuesta.'], ['Memoria persistente', 'Información que una herramienta conserva entre conversaciones.']]
  });

  /* ------------------------------------------------------------------ */
  const softmax = (logits, temp) => { const e = logits.map(l => Math.exp(l / temp)); const s = e.reduce((a, b) => a + b, 0); return e.map(v => v / s); };
  PL.concept({
    id: 'temperatura', block: 'b1', title: 'Temperatura y muestreo',
    idea: 'La temperatura controla cuánto se concentra el modelo en las opciones más probables. Baja: salidas repetibles. Alta: más variedad. No es un mando de verdad.',
    explain: [
      'La temperatura controla, de forma simplificada, cuánto se concentra el modelo en las opciones de token más probables. Una temperatura baja tiende a producir salidas más repetibles; una alta introduce más variación y puede ser útil para idear.',
      'No conviene presentarla como un mando de «verdad». Bajarla no verifica datos, no elimina sesgos y no impide una alucinación: el modelo puede repetir el mismo error de forma consistente.',
      'Para tareas que requieren precisión, las medidas útiles son aportar fuentes, fijar restricciones, solicitar citas, ejecutar comprobaciones y revisar con criterio experto. En muchas interfaces de chat la temperatura no es configurable; en las API sí suele serlo.'
    ],
    panels: [
      {
        title: 'El mando de la temperatura',
        caption: 'La misma distribución de probabilidades, concentrada o repartida según la temperatura.',
        steps: [
          'Para completar «Un servicio ___», el modelo tiene una distribución de probabilidades.',
          'Temperatura baja: concentra la probabilidad en las opciones más probables. Salidas más repetibles.',
          'Temperatura alta: reparte la probabilidad entre más opciones. Más variación… y más sorpresa.'
        ],
        draw(g) {
          const vals = [0.5, 0.12, 0.92];
          const prev = g.step > 0 ? vals[g.step - 1] : vals[0];
          const v = lerp(prev, vals[g.step], g.p);
          knob(80, 110, 34, v, { label: 'temperatura', color: v < 0.3 ? P.sky : v > 0.7 ? P.orange : P.yellow });
          txt(v < 0.3 ? 'BAJA' : v > 0.7 ? 'ALTA' : 'MEDIA', 80, 168, { size: 12, align: 'center', weight: 700, color: v < 0.3 ? P.sky : v > 0.7 ? P.orange : P.yellow });
          chip('Un servicio ___', 316, 22, { align: 'center', fill: P.paper, size: 11, font: 'mono' });
          const labels = ['rápido', 'ágil', 'eficaz', 'veloz', 'relámpago'];
          const pr = softmax([2.2, 1.6, 1.2, 0.4, -0.2], 0.25 + v * 1.7);
          probBars(170, 62, labels.map((l, i) => ({ label: l, v: pr[i], color: v < 0.3 ? P.sky : v > 0.7 ? P.orange : P.blue })), { labelW: 80, barW: 180, gap: 26 });
          show(g.at(1), () => { if (g.on(1)) chip('más repetible', 316, 200, { align: 'center', fill: P.sky, size: 10 }); });
          show(g.at(2), () => { if (g.on(2)) chip('más variado', 316, 200, { align: 'center', fill: P.orange, size: 10 }); });
        }
      },
      {
        title: 'Mismo prompt, tres intentos',
        caption: 'Tres respuestas al mismo encargo con temperatura baja y alta.',
        steps: [
          'Pedimos tres veces: «Propón un eslogan para una cafetería de barrio».',
          'Con temperatura baja, las tres respuestas son casi idénticas.',
          'Con temperatura alta, aparecen ideas distintas: útil para una lluvia de ideas.',
          'Para idear: variedad + selección humana. Para formatos fijos: temperatura baja e instrucciones concretas.'
        ],
        draw(g) {
          chip('«Propón un eslogan para una cafetería de barrio»', 240, 14, { align: 'center', fill: P.paper, size: 9 });
          const cols = [
            { t: 'TEMPERATURA BAJA', col: P.sky, v: 0.15, o: ['Café de calidad, cada día.', 'Café de calidad, cada día.', 'Café de calidad cada día.'], s: 1 },
            { t: 'TEMPERATURA ALTA', col: P.orange, v: 0.9, o: ['Despierta tu barrio.', 'Aquí el tiempo se toma con leche.', 'Tu pausa favorita, recién hecha.'], s: 2 }
          ];
          cols.forEach((cl, k) => {
            const x = 14 + k * 234;
            show(g.at(cl.s), () => {
              card(x, 42, 218, 152, cl.t, cl.col, { active: g.on(cl.s) });
              knob(x + 194, 82, 10, cl.v, { color: cl.col });
              cl.o.forEach((s, i) => { badge(i + 1, x + 10, 72 + i * 38 + 6, cl.col); box(x + 30, 72 + i * 38, 150, 28, { fill: P.white, shadow: false }); txt(s, x + 36, 81 + i * 38, { size: 8, color: P.ink, maxW: 140, fit: true, font: 'sans' }); });
            });
          });
          show(g.at(3), () => banner('Idear: variedad + selección humana · Formato fijo: baja + instrucciones', { y: 214, size: 8.5 }));
        }
      },
      {
        title: 'La temperatura no es un mando de verdad',
        caption: 'Si el dato no está disponible, bajar la temperatura solo hace que el error sea consistente.',
        steps: [
          'Preguntamos un dato que el modelo no tiene: «¿Cuántas personas trabajan en nuestra delegación de Jaén?».',
          'Con temperatura alta, inventa cifras distintas cada vez: 48, 112, 75…',
          'Con temperatura baja, inventa… siempre la misma: 48, 48, 48. Consistente no es correcto.',
          'Para precisión: fuentes, restricciones, citas, comprobaciones y revisión experta.'
        ],
        draw(g) {
          box(30, 14, 420, 30, { fill: P.paper }); txt('«¿Cuántas personas trabajan en nuestra delegación de Jaén?»', 240, 24, { size: 9, color: P.ink, align: 'center', font: 'sans' });
          const rows = [{ t: 'ALTA', v: 0.9, col: P.orange, n: ['48', '112', '75'], s: 1, y: 60 }, { t: 'BAJA', v: 0.12, col: P.sky, n: ['48', '48', '48'], s: 2, y: 128 }];
          rows.forEach(r => show(g.at(r.s), () => {
            box(20, r.y, 440, 56, { fill: P.gray2 });
            knob(52, r.y + 28, 14, r.v, { color: r.col });
            txt(r.t, 78, r.y + 22, { size: 11, color: r.col, weight: 700 });
            r.n.forEach((n, i) => { box(140 + i * 66, r.y + 12, 54, 32, { fill: P.white }); txt(n, 167 + i * 66, r.y + 20, { size: 13, color: P.ink, align: 'center', weight: 700 }); });
            stamp('INVENTADO', 400, r.y + 28, { a: late(g.at(r.s)), size: 11 });
          }));
          show(g.at(2), () => txt('consistente ≠ correcto', 240, 188, { size: 10, color: P.yellow, align: 'center' }));
          show(g.at(3), () => {
            ['fuentes', 'restricciones', 'citas', 'comprobaciones', 'revisión experta'].forEach((s, i) => chip(s, 22 + i * 90, 214, { fill: P.mint, size: 8, w: 84 }));
          });
        }
      },
      {
        title: 'Qué ajustar según el objetivo',
        caption: 'La temperatura es solo una pieza; según la tarea pesan más otras prácticas.',
        steps: [
          'Generar ideas variadas → más diversidad, varias alternativas y selección humana.',
          'Transformar un texto con formato fijo → instrucciones muy concretas y temperatura baja, si es configurable.',
          'Responder sobre un documento → el documento como fuente (o RAG), citas y verificación.',
          'Cálculo o decisión crítica → la herramienta adecuada, datos trazables y revisión humana.'
        ],
        draw(g) {
          const rows = [['bulb', 'Generar ideas', 'Más diversidad, varias alternativas y selección humana', 0.85], ['doc', 'Formato fijo', 'Instrucciones concretas y temperatura baja', 0.15], ['book', 'Sobre un documento', 'Documento como fuente o RAG, citas y verificación', -1], ['target', 'Cálculo o decisión crítica', 'Herramienta adecuada, datos trazables y revisión humana', -1]];
          rows.forEach((r, i) => {
            const y = 16 + i * 58;
            show(g.at(i), () => {
              box(14, y, 452, 50, { fill: g.on(i) ? P.gray2 : P.gray });
              icon(r[0], 24, y + 13, 2);
              txt(r[1], 58, y + 10, { size: 10, weight: 700, maxW: 120 });
              arrow(184, y + 25, 204, y + 25, { color: P.yellow });
              txt(r[2], 212, y + 12, { size: 8.5, maxW: 190, color: P.light });
              if (r[3] >= 0) knob(436, y + 25, 11, r[3], { color: r[3] > 0.5 ? P.orange : P.sky });
              else txt('no es\nla clave', 436, y + 13, { size: 7.5, align: 'center', color: P.light });
            });
          });
        }
      }
    ],
    examples: [
      ['Lluvia de ideas', 'Nombres para un producto: pedir diez alternativas variadas y elegir.'],
      ['Extracción de datos', 'Pasar facturas a una tabla con columnas fijas: instrucciones precisas y salidas estables.'],
      ['Dato crítico', 'Una cifra para un informe: buscarla en la fuente, no ajustar la temperatura.']
    ],
    mistakes: [
      'Bajar la temperatura «para que no invente».',
      'Usar temperatura alta en tareas de formato estricto.',
      'Creer que todas las interfaces permiten configurarla.'
    ],
    questions: [
      ['¿Por qué bajar la temperatura no evita una alucinación?', 'Porque solo concentra la elección en lo más probable según el modelo. Si el modelo no tiene el dato, lo más probable puede ser una invención, que además se repetirá de forma consistente.'],
      ['¿Qué temperatura usarías para generar nombres de producto y cuál para convertir facturas a una tabla?', 'Para nombres, más alta (variedad y luego selección humana). Para la tabla, baja, con instrucciones precisas y un formato definido.'],
      ['Si tu herramienta de chat no permite ajustar la temperatura, ¿cómo consigues más variedad?', 'Pidiendo explícitamente varias alternativas diferentes entre sí, con estilos o enfoques distintos, y regenerando respuestas.']
    ],
    quiz: [
      { q: 'Una temperatura baja produce…', o: ['Respuestas más verdaderas', 'Salidas más repetibles', 'Más creatividad', 'Respuestas más largas'], c: 1, why: 'Concentra la elección en las opciones más probables.' },
      { q: 'Para responder con precisión sobre un documento lo más eficaz es…', o: ['Subir la temperatura', 'Bajar la temperatura a cero', 'Usar el documento como fuente y pedir citas', 'Repetir la pregunta muchas veces'], c: 2, why: 'La precisión viene de las fuentes y la verificación, no del muestreo.' },
      { q: 'La temperatura alta es útil para…', o: ['Cálculos', 'Lluvia de ideas', 'Datos legales', 'Formatos fijos'], c: 1, why: 'Introduce variación que favorece la ideación.' }
    ],
    terms: [['Temperatura', 'Parámetro que controla cuánto se concentra el modelo en los tokens más probables.'], ['Muestreo', 'Forma de elegir el siguiente token a partir de la distribución de probabilidades.']]
  });

  /* ------------------------------------------------------------------ */
  PL.concept({
    id: 'alucinacion', block: 'b1', slide: 'S13', title: 'Alucinaciones: comprobar antes de confiar',
    idea: 'Una alucinación es una salida incorrecta, no respaldada o inventada que el modelo presenta como válida. El tono seguro no es una señal de calidad.',
    explain: [
      'Una alucinación puede adoptar la forma de una cita inexistente, una fecha falsa, una explicación técnica plausible pero equivocada, un requisito legal inventado o un detalle atribuido a un documento que no lo contiene.',
      'Las causas habituales son el contexto insuficiente, las preguntas ambiguas, la falta de fuentes, la información desactualizada, los errores de recuperación y la propia tendencia del modelo a completar una respuesta coherente.',
      'Protocolo de reducción de riesgo: delimitar qué información puede usar el modelo; pedir que indique incertidumbres y se abstenga sin evidencia; solicitar fuentes verificables; abrir la fuente y comprobar que respalda exactamente la afirmación; contrastar los datos críticos con una fuente primaria; y no publicar, enviar ni ejecutar nada sin una revisión proporcional a su impacto.'
    ],
    panels: [
      {
        title: 'Una cita que no existe',
        caption: 'Respuesta fluida con una referencia normativa ficticia, contrastada con la fuente oficial.',
        steps: [
          'Preguntamos qué norma regula el teletrabajo en nuestro sector.',
          'La respuesta es fluida, segura y cita «Real Decreto 47/2024, artículo 12». Suena oficial.',
          'Abrimos la fuente oficial: esa norma no existe, o no dice eso.',
          'Alucinación: salida inventada presentada como válida. El tono seguro no es una señal de calidad.'
        ],
        draw(g) {
          const w = win(14, 18, 270, 200, 'Asistente');
          show(g.at(0), () => msg(w.x + 60, w.y + 4, 190, '¿Qué norma regula el teletrabajo en mi sector?', { who: 'user' }));
          show(g.at(1), () => {
            msg(w.x, w.y + 46, 220, typed('Lo regula el Real Decreto 47/2024, artículo 12, que obliga a la empresa a compensar todos los gastos.', g.at(1) * 1.2), { size: 8.5 });
            robot(w.x + 6, w.y + 120, { mood: 'sure', color: P.purple });
            txt('tono: 100 % seguro', w.x + 50, w.y + 134, { size: 8, color: P.yellow });
          });
          show(g.at(2), () => {
            paper(308, 30, 156, 170, { title: 'Boletín oficial' });
            icon('search', 318, 54, 2);
            txt('«RD 47/2024»', 346, 60, { size: 9, color: P.ink });
            bars(320, 86, 130, 5, { color: P.light, seed: 3, gap: 9 });
            icon('cross', 368, 128, 3);
            stamp('NO EXISTE', 386, 182, { a: late(g.at(2)) });
          });
          show(g.at(3), () => banner('El tono seguro no es una señal de calidad', { y: 232, icon: 'warn' }));
        }
      },
      {
        title: 'De dónde salen las alucinaciones',
        caption: 'Un puente con huecos: cada hueco es una causa. El modelo tiende a rellenarlos con piezas plausibles.',
        steps: [
          'Primeros huecos: contexto insuficiente y pregunta ambigua.',
          'Más huecos: falta de fuentes e información desactualizada.',
          'Otro hueco: errores al recuperar documentos (se trae el fragmento equivocado).',
          'Y la tendencia del modelo a completar siempre una respuesta coherente: rellena los huecos con piezas inventadas.'
        ],
        draw(g) {
          rect(0, 160, 90, 110, P.gray2); rect(0, 160, 90, 3, P.light);
          rect(390, 160, 90, 110, P.gray2); rect(390, 160, 90, 3, P.light);
          txt('PREGUNTA', 45, 176, { size: 8, align: 'center', color: P.light });
          txt('RESPUESTA', 435, 176, { size: 8, align: 'center', color: P.light });
          const gaps = [{ i: 1, t: 'contexto insuficiente', s: 0, up: true }, { i: 3, t: 'pregunta ambigua', s: 0, up: false }, { i: 5, t: 'sin fuentes', s: 1, up: true }, { i: 7, t: 'info desactualizada', s: 1, up: false }, { i: 9, t: 'recuperación errónea', s: 2, up: true }];
          for (let b = 0; b < 10; b++) {
            const x = 90 + b * 30;
            const gp = gaps.find(q => q.i === b);
            const open = gp && g.from(gp.s);
            if (!open) { rect(x, 160, 30, 14, P.ink); rect(x + 1, 161, 28, 12, P.navy); rect(x + 1, 161, 28, 2, P.light); }
            else if (g.from(3)) { show(g.at(3), () => { rect(x, 160, 30, 14, P.ink); rect(x + 1, 161, 28, 12, P.orange); txt('?', x + 15, 162, { size: 9, color: P.ink, align: 'center', weight: 700 }); }, 0); }
          }
          gaps.forEach(gp => show(g.at(gp.s), () => {
            const cx = 90 + gp.i * 30 + 15;
            const y = gp.up ? 124 : 188;
            line(cx, gp.up ? y + 17 : y, cx, gp.up ? 158 : 176, P.red, 1);
            chip(gp.t, cx, y, { align: 'center', fill: P.red, size: 7.5 });
          }));
          const rx = g.from(3) ? lerp(30, 410, g.at(3)) : 30;
          robot(rx, 141, { s: 1, mood: g.from(3) ? 'sure' : 'think', color: P.purple, still: true });
          show(g.at(3), () => banner('Tiende a completar: rellena huecos con piezas plausibles', { y: 232, color: P.orange }));
        }
      },
      {
        title: 'Seguridad aparente frente a exactitud',
        caption: 'Lo segura que suena una respuesta y lo correcta que es son cosas distintas.',
        steps: [
          'Dos respuestas. A: «Creo que fue en 2019, pero conviene comprobarlo». B: «Sin ninguna duda: fue en 2017».',
          'Medimos qué tan segura suena cada una…',
          '…y qué tan correcta es. La que suena más segura es la equivocada.',
          'Pide que el modelo exprese su incertidumbre y que se abstenga si no hay evidencia.'
        ],
        draw(g) {
          const cards = [{ t: 'RESPUESTA A', s: '«Creo que fue en 2019, pero conviene comprobarlo.»', mood: 'think', sure: 0.35, ok: 0.9, x: 14 }, { t: 'RESPUESTA B', s: '«Sin ninguna duda: fue en 2017.»', mood: 'sure', sure: 0.97, ok: 0.08, x: 248 }];
          cards.forEach(cd => {
            show(g.at(0), () => {
              card(cd.x, 16, 218, 120, cd.t, P.navy);
              robot(cd.x + 12, 56, { mood: cd.mood, color: P.purple });
              bubble(cd.x + 54, 42, 154, 56, { text: cd.s, tx: cd.x + 48, ty: 70, size: 8.5, font: 'sans' });
            });
            show(g.at(1), () => meter(cd.x + 14, 160, 190, cd.sure * g.at(1), { label: 'suena segura', n: 10, color: P.yellow }));
            show(g.at(2), () => { meter(cd.x + 14, 196, 190, cd.ok * g.at(2), { label: 'es correcta', n: 10 }); icon(cd.ok > 0.5 ? 'check' : 'cross', cd.x + 196, 140, 2); });
          });
          show(g.at(3), () => banner('Pide incertidumbre explícita y abstención si no hay evidencia', { y: 232 }));
        }
      },
      {
        title: 'Protocolo en seis pasos',
        caption: 'Una escalera de comprobaciones antes de usar una salida de IA.',
        steps: [
          '1 · Delimita qué información puede usar. 2 · Pide que indique incertidumbres y se abstenga sin evidencia.',
          '3 · Solicita fuentes o citas verificables. 4 · Abre la fuente y comprueba que respalda exactamente la afirmación.',
          '5 · Contrasta los datos críticos con una fuente primaria o con una persona responsable competente.',
          '6 · No publiques, envíes ni ejecutes sin una revisión proporcional al impacto.'
        ],
        draw(g) {
          const st = [['folder', 'Delimita la información'], ['question', 'Pide incertidumbre'], ['link', 'Pide citas verificables'], ['search', 'Abre la fuente'], ['target', 'Contrasta lo crítico'], ['shield', 'Revisa antes de publicar']];
          const reveal = [0, 0, 1, 1, 2, 3];
          let top = 0;
          st.forEach((s, i) => {
            const x = 20 + i * 74, y = 206 - i * 32, h = 254 - y;
            const a = g.at(reveal[i]);
            if (a > 0) top = i;
            show(a, () => {
              box(x, y, 72, h, { fill: i === 5 ? P.green : P.gray2 });
              badge(i + 1, x + 4, y + 4, P.orange);
              icon(s[0], x + 52, y + 4, 1);
              txt(s[1], x + 6, y + 22, { size: 7.5, maxW: 62, lh: 9 });
            }, 0);
          });
          const px = 20 + top * 74 + 24, py = 206 - top * 32 - 38;
          person(px, py, { shirt: P.orange });
          if (g.from(3)) { sparkle(px + 40, py + 4); }
        }
      }
    ],
    examples: [
      ['Cita inexistente', 'Una referencia bibliográfica con autores, revista y año plausibles que no existe.'],
      ['Requisito legal inventado', 'Un plazo o artículo normativo que suena oficial y no figura en la norma.'],
      ['Atribución falsa', '«Según el documento adjunto…» seguido de algo que el documento no dice.'],
      ['Dato desactualizado', 'Un precio o una función de producto que cambió después del entrenamiento.']
    ],
    mistakes: [
      'Fiarse del tono seguro o del formato profesional.',
      'Aceptar una cita sin abrirla.',
      'Comprobar que la fuente existe pero no que respalda la frase exacta.'
    ],
    questions: [
      ['¿Qué afirmación concreta deberías verificar antes de usar una respuesta que incluye una cifra, una fecha y una cita?', 'Las tres, empezando por las de mayor impacto. Abrir la cita y comprobar que existe y que dice exactamente eso; contrastar cifra y fecha con una fuente primaria.'],
      ['¿Por qué un chatbot convincente no es necesariamente una fuente fiable?', 'Porque su objetivo técnico es producir texto plausible, no verificar hechos. La fluidez y la seguridad no indican que haya evidencia detrás.'],
      ['Redacta una instrucción que reduzca el riesgo de alucinación al resumir un informe.', 'Ejemplo: «Usa únicamente el informe adjunto. Para cada conclusión, indica la página. Si el informe no permite afirmar algo, escribe "no consta" en lugar de inferirlo. Señala las incertidumbres al final».'],
      ['¿Cómo debe cambiar la revisión según el impacto del resultado?', 'Una lluvia de ideas apenas requiere revisión; un correo a un cliente, revisión editorial y de datos; un contenido legal, sanitario o financiero, revisión por un profesional competente y fuentes oficiales.']
    ],
    quiz: [
      { q: '¿Qué es una alucinación?', o: ['Un error de conexión', 'Una salida incorrecta o inventada presentada como válida', 'Una respuesta lenta', 'Una respuesta en otro idioma'], c: 1, why: 'Es contenido no respaldado que el modelo presenta como cierto.' },
      { q: 'La señal más fiable de que una afirmación es correcta es…', o: ['Que el modelo suene seguro', 'Que la fuente abierta la respalde exactamente', 'Que la respuesta sea larga', 'Que incluya una referencia con formato oficial'], c: 1, why: 'Hay que abrir la fuente y comprobar que dice exactamente eso.' },
      { q: '¿Cuál es una causa habitual de alucinación?', o: ['Pregunta concreta con fuentes adjuntas', 'Contexto insuficiente o pregunta ambigua', 'Usar Markdown', 'Pedir citas'], c: 1, why: 'Sin contexto ni fuentes, el modelo completa huecos con lo plausible.' }
    ],
    terms: [['Alucinación', 'Salida incorrecta, no respaldada o inventada que el modelo presenta como válida.'], ['Fuente primaria', 'Documento original o responsable directo de un dato (norma oficial, informe original, organismo competente).']]
  });

  /* ------------------------------------------------------------------ */
  PL.concept({
    id: 'modelos', block: 'b1', title: 'Modelos, parámetros y apertura',
    idea: 'Los parámetros son valores aprendidos durante el entrenamiento. Su número indica escala, no calidad para tu tarea. Cerrado, pesos abiertos y open source ofrecen distintos grados de control.',
    explain: [
      'Los proveedores ofrecen familias de modelos con distintos tamaños, costes, capacidades, velocidades y condiciones de uso. Los parámetros son valores internos aprendidos durante el entrenamiento; su número da una idea de escala, pero no basta para comparar calidad o adecuación. La evaluación depende de la tarea, los datos, el idioma, el contexto disponible, la seguridad y el coste.',
      'Modelo cerrado: se usa mediante la interfaz o la API del proveedor y no publica sus pesos. Pesos abiertos (open weight): permite descargar y ejecutar los parámetros bajo una licencia determinada. Open source: además de los pesos, implica condiciones sobre el código y la licencia; no es sinónimo automático de open weight.',
      'Un modelo local o de pesos abiertos puede ofrecer más control técnico y de datos, pero exige hardware, conocimientos, mantenimiento y una evaluación de seguridad propia.'
    ],
    panels: [
      {
        title: 'Parámetros: millones de perillas aprendidas',
        caption: 'Entrenar es ajustar muchísimos valores internos hasta que el error de predicción baja.',
        steps: [
          'Un modelo tiene millones o miles de millones de parámetros: valores internos.',
          'Entrenar es como girar un panel enorme de perillas hasta que las predicciones mejoran y el error baja.',
          'Más parámetros indican escala, pero no garantizan ser el mejor para tu tarea.',
          'Para elegir hay que evaluar: tarea, idioma, datos, contexto, seguridad, velocidad y coste.'
        ],
        draw(g) {
          card(14, 16, 222, 140, 'PARÁMETROS', P.purple);
          const training = g.on(1);
          for (let r = 0; r < 4; r++) for (let c = 0; c < 7; c++) {
            const cx = 36 + c * 30, cy = 50 + r * 26;
            const base = rnd(r * 7 + c) * 6;
            const a = training ? base + D.T * (1 + rnd(c + r) * 2) : base + (g.from(2) ? 1.3 : 0);
            circle(cx, cy, 9, P.ink); circle(cx, cy, 8, P.gray3);
            line(cx, cy, cx + Math.cos(a) * 7, cy + Math.sin(a) * 7, P.yellow, 2);
          }
          show(g.at(1), () => {
            card(250, 16, 216, 140, 'ERROR DE PREDICCIÓN', P.orange);
            axes(266, 42, 184, 96);
            const pts = []; for (let i = 0; i <= 20; i++) pts.push([270 + i * 8.8, 130 - 80 * Math.exp(-i / 5)]);
            path(pts, { p: g.at(1), color: P.orange, arrow: false });
            txt('entrenamiento →', 450, 128, { size: 7, color: P.light, align: 'right' });
          });
          show(g.at(2), () => {
            box(14, 166, 452, 56, { fill: P.gray2 });
            txt('Tarea: clasificar facturas', 24, 172, { size: 8, color: P.light });
            txt('Modelo enorme', 24, 188, { size: 9 }); rect(130, 188, 160, 10, P.blue); txt('91 %', 296, 188, { size: 8.5 });
            txt('Modelo pequeño', 24, 204, { size: 9 }); rect(130, 204, 156, 10, P.mint); txt('90 %', 292, 204, { size: 8.5 });
            chip('10× más barato y rápido', 386, 196, { align: 'center', fill: P.mint, size: 8 });
          });
          show(g.at(3), () => banner('Evalúa: tarea · idioma · datos · contexto · seguridad · velocidad · coste', { y: 232, size: 8.5 }));
        }
      },
      {
        title: 'Cerrado, pesos abiertos y open source',
        caption: 'Tres formas de acceso a un modelo, de menos a más apertura.',
        steps: [
          'Modelo cerrado: lo usas a través de la interfaz o la API del proveedor. No publica sus pesos.',
          'Pesos abiertos (open weight): puedes descargar y ejecutar los parámetros, bajo una licencia concreta.',
          'Open source: además implica condiciones sobre código y licencia. No es sinónimo automático de open weight.'
        ],
        draw(g) {
          const cards = [
            { t: 'CERRADO', col: P.red, d: 'Uso por interfaz o API del proveedor. Pesos no publicados.', k: 'menos control técnico', ic: () => { icon('cloud', 50, 46, 3); icon('lock', 66, 70, 2); } },
            { t: 'PESOS ABIERTOS', col: P.orange, d: 'Descargas y ejecutas los parámetros según su licencia.', k: 'más control', ic: () => { icon('chip', 206, 46, 3); arrow(258, 44, 258, 82, { color: P.mint }); } },
            { t: 'OPEN SOURCE', col: P.mint, d: 'Pesos + código + licencia abierta. No es lo mismo que open weight.', k: 'más transparencia', ic: () => { icon('chip', 344, 50, 2); icon('doc', 372, 50, 2); icon('gear', 400, 50, 2); } }
          ];
          cards.forEach((cd, i) => {
            const x = 14 + i * 156;
            show(g.at(i), () => {
              card(x, 18, 140, 200, cd.t, cd.col, { active: g.on(i) });
              cd.ic();
              txt(cd.d, x + 70, 104, { size: 8.5, maxW: 124, align: 'center' });
              chip(cd.k, x + 70, 188, { align: 'center', fill: cd.col, size: 8, w: 120 });
            });
          });
          show(g.at(2), () => { arrow(40, 238, 440, 238, { color: P.light }); txt('más apertura →', 440, 244, { size: 7.5, color: P.light, align: 'right' }); });
        }
      },
      {
        title: 'Más control, más responsabilidad',
        caption: 'Modelo local frente a servicio gestionado: no hay opción universal.',
        steps: [
          'Un modelo local o de pesos abiertos da más control técnico y de datos: la información no tiene por qué salir de tu infraestructura.',
          'A cambio exige hardware, conocimientos, mantenimiento y una evaluación de seguridad propia.',
          'Un servicio gestionado reduce esa carga, pero dependes de sus condiciones y de dónde procesa los datos.',
          'No hay opción universal: decide según datos, equipo, presupuesto y riesgo.'
        ],
        draw(g) {
          show(g.at(0), () => {
            card(14, 18, 218, 190, 'MODELO LOCAL / PESOS ABIERTOS', P.orange);
            icon('server', 32, 46, 3); icon('lock', 76, 64, 2);
            meter(30, 112, 186, 0.9 * g.at(0), { label: 'control técnico y de datos', n: 10, color: P.mint });
          });
          show(g.at(1), () => {
            meter(30, 150, 186, 0.85 * g.at(1), { label: 'carga operativa', n: 10, color: P.red });
            txt('hardware · mantenimiento · seguridad', 123, 170, { size: 7.5, color: P.light, align: 'center' });
          });
          show(g.at(2), () => {
            card(248, 18, 218, 190, 'SERVICIO GESTIONADO', P.blue);
            icon('cloud', 266, 46, 3);
            meter(264, 112, 186, 0.45 * g.at(2), { label: 'control técnico y de datos', n: 10, color: P.mint });
            meter(264, 150, 186, 0.25 * g.at(2), { label: 'carga operativa', n: 10, color: P.red });
            txt('dependes de sus condiciones', 357, 170, { size: 7.5, color: P.light, align: 'center' });
          });
          show(g.at(3), () => banner('Decide según datos, equipo, presupuesto y riesgo', { y: 224 }));
        }
      }
    ],
    examples: [
      ['Modelo cerrado', 'Un asistente comercial accesible por web o API, sin acceso a sus pesos.'],
      ['Pesos abiertos', 'Un modelo descargable que una organización ejecuta en sus servidores para datos sensibles.'],
      ['Elección por tarea', 'Un modelo pequeño y rápido para clasificar correos; uno más capaz para redactar informes complejos.']
    ],
    mistakes: [
      'Elegir modelo solo por número de parámetros.',
      'Usar «open source» y «open weight» como sinónimos.',
      'Pensar que un modelo local es automáticamente seguro.'
    ],
    questions: [
      ['¿Por qué el número de parámetros no basta para elegir un modelo?', 'Porque la calidad depende de la tarea, el idioma, los datos y el contexto. Un modelo más pequeño puede rendir igual en una tarea concreta siendo más barato y rápido.'],
      ['¿Qué ventaja y qué coste tiene ejecutar un modelo de pesos abiertos en tu empresa?', 'Ventaja: más control sobre los datos y la configuración. Coste: hardware, personal técnico, mantenimiento, actualizaciones y una evaluación de seguridad propia.'],
      ['¿Qué criterios pondrías en una comparación de modelos para tu equipo?', 'Calidad en tareas reales (con la misma rúbrica), idioma, contexto disponible, privacidad y lugar de procesamiento, coste, velocidad, condiciones de licencia y soporte.']
    ],
    quiz: [
      { q: 'Los parámetros de un modelo son…', o: ['Las instrucciones que escribe el usuario', 'Valores internos aprendidos durante el entrenamiento', 'Los documentos adjuntos', 'Los ajustes de la interfaz'], c: 1, why: 'Se ajustan al entrenar y determinan cómo responde el modelo.' },
      { q: 'Un modelo «open weight»…', o: ['Siempre es open source', 'Permite descargar y ejecutar sus pesos según una licencia', 'Es siempre gratuito y sin condiciones', 'Solo funciona por API'], c: 1, why: 'Publica sus pesos bajo una licencia; open source implica además condiciones sobre código y licencia.' },
      { q: 'Más parámetros significa…', o: ['Siempre mejor calidad', 'Mayor escala, pero no necesariamente mejor para tu tarea', 'Menor coste', 'Ausencia de errores'], c: 1, why: 'La adecuación se evalúa con la tarea real.' }
    ],
    terms: [['Parámetro', 'Valor interno de un modelo aprendido durante el entrenamiento.'], ['Modelo cerrado', 'Modelo accesible solo mediante la interfaz o API del proveedor, sin publicar sus pesos.'], ['Pesos abiertos (open weight)', 'Modelo cuyos parámetros pueden descargarse y ejecutarse bajo una licencia.'], ['Open source', 'Apertura que incluye condiciones sobre código y licencia, no solo los pesos.']]
  });
})();

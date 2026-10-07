/* Bloque 2 · Prompting, buenas prácticas y Markdown */
(function () {
  'use strict';
  const D = PL.D, K = PL.K;
  const { P, rect, frame, box, card, txt, chip, arrow, path, icon, sprite, robot, person, bubble, win, msg, paper, bars, probBars, meter, stamp, table, flow, show, pop, pulse, blink, glow, sparkle, qmark, typed, lerp, ease, clamp, line, measure, rnd } = D;
  const { banner, heading, mail, axes, dot, circle, knob, tokens, badge, code, vbars, scale, ticket } = K;
  const late = a => clamp(a * 2 - 1);

  PL.block({
    id: 'b2', n: 2, short: 'Prompting y Markdown', title: 'Prompting, buenas prácticas y Markdown', hours: 6, color: '#f28c38',
    question: '¿Cómo se conversa con la IA para obtener un resultado útil?',
    evidence: 'Tres prompts mejorados y un vault de Obsidian',
    idea: 'Un buen resultado no aparece por una frase mágica. Es consecuencia de un encargo claro, de información suficiente, de iteración y de validación.'
  });

  /* ------------------------------------------------------------------ */
  PL.concept({
    id: 'prompt', block: 'b2', slide: 'S3', title: 'Prompt pobre frente a prompt cuidado',
    idea: 'Un prompt es la entrada que damos a un sistema generativo. Mejorarlo no es buscar fórmulas mágicas: es hacer explícitas las decisiones que una persona competente necesitaría para hacer el encargo.',
    explain: [
      'Un prompt es la entrada que proporcionamos a un sistema generativo: una pregunta, un encargo, un texto que transformar, un conjunto de datos o una instrucción con archivos adjuntos. El prompt engineering es la práctica de diseñar esa entrada para conseguir una salida útil, verificable y adecuada al contexto.',
      'No consiste en memorizar fórmulas ni en tratar a la herramienta como si tuviera secretos. Consiste en explicitar qué se quiere, para quién, con qué información, bajo qué límites y cómo se reconocerá un resultado correcto.',
      'Cuando el encargo es vago, el modelo rellena cada hueco con la opción más probable. El resultado suele ser genérico, y a veces incluye datos inventados. Un encargo cuidado no es perfecto, pero reduce lo que el modelo tiene que adivinar.'
    ],
    panels: [
      {
        title: 'Un encargo vago obliga a adivinar',
        caption: '«Hazme un email para un cliente» deja abiertas casi todas las decisiones importantes.',
        steps: [
          'Pedimos: «Hazme un email para un cliente».',
          'El modelo tiene que adivinar: ¿a quién?, ¿por qué motivo?, ¿qué tono?, ¿qué longitud?, ¿qué datos puede usar?',
          'Rellena cada hueco con lo más probable: sale un correo genérico… que no sirve para nuestra situación.'
        ],
        draw(g) {
          person(20, 120, { shirt: P.teal });
          show(g.at(0), () => bubble(14, 44, 130, 50, { text: '«Hazme un email\npara un cliente»', tx: 34, ty: 118, size: 10 }));
          arrow(150, 150, 184, 150, { p: g.at(1), color: P.sky });
          robot(198, 130, { mood: g.from(1) ? 'confused' : 'happy', color: P.purple });
          const qs = [['¿a quién?', 186, 50], ['¿por qué?', 262, 74], ['¿qué tono?', 262, 186], ['¿cuánto?', 160, 204], ['¿qué datos?', 140, 100]];
          qs.forEach((q, i) => show(clamp(g.at(1) * 5 - i), () => chip(q[0], q[1], q[2], { fill: P.yellow, size: 8.5 })));
          arrow(300, 150, 332, 150, { p: g.at(2), color: P.light });
          show(g.at(2), () => {
            paper(336, 52, 130, 150, { title: 'Correo' });
            txt('Estimado cliente: esperamos que se encuentre bien. Le escribimos para informarle de… Quedamos a su disposición.', 344, 74, { size: 7.5, color: P.ink, maxW: 114, font: 'sans' });
            stamp('GENÉRICO', 400, 172, { a: late(g.at(2)), color: P.orange });
          });
        }
      },
      {
        title: 'Cada decisión explícita elimina una suposición',
        caption: 'El mismo encargo, reescrito pieza a pieza. A la derecha, las dudas del modelo se van resolviendo.',
        steps: [
          'Decimos para quién es: «una clienta».',
          'Qué ocurre y qué debe incluir: retraso de dos días; disculpa, nueva fecha y propuesta de seguimiento.',
          'El tono y la longitud: profesional y cercano, máximo seis líneas.',
          'Y los límites: no inventar datos ni compensaciones; devolver solo el correo. Ya no tiene que adivinar.'
        ],
        draw(g) {
          card(14, 14, 270, 222, 'PROMPT CUIDADO', P.mint);
          const L = [['Redacta un correo para una clienta', 0], ['a la que debemos comunicar un', 1], ['retraso de dos días en la entrega.', 1], ['Incluye disculpa, nueva fecha', 1], ['concreta y propuesta de seguimiento.', 1], ['Tono profesional y cercano.', 2], ['Máximo seis líneas.', 2], ['No inventes datos ni compensaciones.', 3], ['Devuelve solo el correo.', 3]];
          const cols = [P.sky, P.orange, P.purple, P.mint];
          code(L.map(l => ({ t: l[0], color: g.on(l[1]) ? P.yellow : cols[l[1]] })), 26, 42, { size: 7.5, lh: 20, reveal: i => g.at(L[i][1]) });
          const rows = [['destinatario', 0], ['motivo', 1], ['contenido', 1], ['tono', 2], ['longitud', 2], ['límites', 3]];
          robot(424, 22, { s: 1, mood: g.from(3) ? 'happy' : 'confused', color: P.purple });
          rows.forEach((r, i) => {
            const y = 54 + i * 30, ok = g.at(r[1]) > 0.6;
            box(300, y, 166, 24, { fill: ok ? '#1f3b33' : P.gray2, shadow: false });
            icon(ok ? 'check' : 'question', 306, y + 6, 1, ok ? P.mint : P.yellow);
            txt(r[0], 324, y + 7, { size: 9, color: ok ? P.mint : P.white });
            if (g.on(r[1]) && g.p > 0.9) glow(300, y, 166, 24, P.yellow);
          });
        }
      },
      {
        title: 'Mismo modelo, dos resultados',
        caption: 'Los dos correos que produce el mismo asistente con el encargo vago y con el cuidado.',
        steps: [
          'Con el encargo vago: correo genérico, sin fecha y con una compensación inventada.',
          'Con el encargo cuidado: disculpa, aviso del retraso, hueco para la nueva fecha y seguimiento.',
          'Fíjate: como no le dimos la fecha, deja un hueco en lugar de inventarla. Eso es lo que pedimos.',
          'El segundo prompt no es perfecto: simplemente el modelo ya no adivina lo importante.'
        ],
        draw(g) {
          show(g.at(0), () => {
            card(14, 16, 218, 174, 'ENCARGO VAGO', P.red);
            box(24, 40, 198, 104, { fill: P.white, shadow: false });
            txt('Estimado cliente: lamentamos las molestias. Como compensación le ofrecemos un 10 % de descuento en su próximo pedido. Saludos cordiales.', 32, 48, { size: 8, color: P.ink, maxW: 182, font: 'sans' });
            chip('genérico', 30, 152, { fill: P.red, size: 7.5 });
            chip('sin fecha', 94, 152, { fill: P.red, size: 7.5 });
            chip('10 % inventado', 160, 152, { fill: P.red, size: 7.5 });
          });
          show(g.at(1), () => {
            card(248, 16, 218, 174, 'ENCARGO CUIDADO', P.mint);
            box(258, 40, 198, 104, { fill: P.white, shadow: false });
            txt('Hola, Laura: sentimos comunicarte que tu pedido llegará con dos días de retraso, el [nueva fecha]. Te escribiremos ese día para confirmar la entrega. Gracias por tu paciencia.', 266, 48, { size: 8, color: P.ink, maxW: 182, font: 'sans' });
            chip('disculpa', 264, 152, { fill: P.mint, size: 7.5 });
            chip('seguimiento', 322, 152, { fill: P.mint, size: 7.5 });
            chip('6 líneas', 398, 152, { fill: P.mint, size: 7.5 });
          });
          show(g.at(2), () => { glow(264, 66, 64, 13, P.yellow); chip('deja hueco en vez de inventar', 357, 200, { align: 'center', fill: P.yellow, size: 8 }); });
          show(g.at(3), () => banner('Mejor prompt = menos decisiones dejadas al azar', { y: 232 }));
        }
      },
      {
        title: 'Antes y después: «Resume este informe y dime qué hacer»',
        caption: 'Las seis decisiones que convierten un encargo débil en uno controlable.',
        steps: [
          'Prompt débil: «Resume este informe y dime qué hacer». ¿Para quién? ¿Con qué evidencia? ¿En qué formato?',
          'El prompt mejorado fija el lector (dirección comercial) y la fuente autorizada (solo el informe adjunto).',
          'También la estructura (3 conclusiones, riesgos, 2 acciones), la evidencia (cita de página) y el límite (400 palabras).',
          'Y qué hacer si falta información: decirlo en lugar de inferir. Además separa hallazgos de recomendaciones.'
        ],
        draw(g) {
          show(g.at(0), () => {
            card(14, 16, 150, 110, 'DÉBIL', P.red);
            txt('«Resume este informe y dime qué hacer»', 89, 44, { size: 9.5, align: 'center', maxW: 130 });
            ['¿lector?', '¿evidencia?', '¿formato?'].forEach((s, i) => chip(s, 22 + i * 47, 100, { fill: P.yellow, size: 6.5, w: 44 }));
          });
          arrow(166, 70, 186, 70, { p: g.at(1), color: P.mint });
          const parts = [['LECTOR', 'para la dirección comercial', P.sky, 1], ['FUENTE', 'solo el informe adjunto', P.orange, 1], ['ESTRUCTURA', '3 conclusiones, riesgos, 2 acciones', P.purple, 2], ['EVIDENCIA', 'cita página o sección', P.mint, 2], ['LÍMITE', 'máx. 400 palabras, tono ejecutivo', P.pink, 2], ['SI FALTA INFO', 'dilo, no lo infieras', P.yellow, 3]];
          show(g.at(1), () => card(188, 16, 278, 214, 'MEJORADO', P.mint));
          parts.forEach((pt, i) => show(g.at(pt[3]), () => {
            const y = 40 + i * 31;
            chip(pt[0], 196, y, { fill: pt[2], size: 7.5, w: 84 });
            txt(pt[1], 288, y + 4, { size: 8.5, maxW: 170 });
            if (g.on(pt[3]) && g.p > 0.9) glow(196, y, 84, 16, P.yellow);
          }));
          show(g.at(3), () => { box(14, 140, 150, 90, { fill: P.gray2 }); txt('HALLAZGO', 24, 150, { size: 8, color: P.sky }); txt('≠', 89, 168, { size: 16, align: 'center', color: P.red }); txt('RECOMENDACIÓN', 24, 196, { size: 8, color: P.purple }); txt('lo dicen los datos', 24, 162, { size: 7, color: P.light }); txt('lo propones tú', 24, 208, { size: 7, color: P.light }); });
        }
      }
    ],
    examples: [
      ['Correo', '«Hazme un email» → «Correo de seis líneas a una clienta para comunicar un retraso de dos días; incluye disculpa, nueva fecha y seguimiento; no inventes compensaciones».'],
      ['Resumen', '«Resume esto» → «Resume el acta en tres decisiones con responsable y fecha, en una tabla; si falta un dato, escribe "no consta"».'],
      ['Ideas', '«Dame ideas» → «Propón 8 nombres para un taller de bicicletas en Granada, cortos, en español, sin juegos de palabras en inglés».']
    ],
    mistakes: [
      'Pensar que existe una frase mágica que lo arregla todo.',
      'Omitir para quién es el resultado y para qué se usará.',
      'No decir qué hacer si falta información, y aceptar lo que el modelo invente.'
    ],
    questions: [
      ['¿Qué dato falta en el encargo pobre que más cambiaría el resultado?', 'El motivo del correo (y con él el objetivo): no es igual informar de un retraso que negociar una renovación o pedir disculpas. Después, el destinatario y los límites sobre qué datos se pueden usar.'],
      ['¿Qué contexto das por supuesto cuando pides algo a una persona de tu equipo?', 'Normalmente el cliente, el historial, el tono de la empresa, el plazo y el formato habitual. Con una IA hay que explicitarlo porque no comparte ese contexto.'],
      ['Reescribe «Hazme una presentación sobre IA» con al menos cuatro decisiones explícitas.', 'Ejemplo: «Esquema de 8 diapositivas para presentar a la dirección de una pyme de logística tres usos realistas de IA. Una idea por diapositiva, con un ejemplo y un riesgo. Sin cifras que no te proporcione. Devuelve título y tres viñetas por diapositiva».'],
      ['¿Por qué es buena señal que el modelo deje «[nueva fecha]» en lugar de inventarla?', 'Porque cumple la restricción «no inventes datos»: marca lo que falta para que una persona lo complete, en lugar de presentar como hecho un dato que no tiene.']
    ],
    quiz: [
      { q: '¿Qué es el prompt engineering?', o: ['Memorizar frases secretas', 'Diseñar la entrada para obtener una salida útil, verificable y adecuada', 'Programar el modelo', 'Pedir siempre respuestas largas'], c: 1, why: 'Se trata de explicitar objetivo, contexto, límites, formato y criterio.' },
      { q: 'Ante un encargo vago, el modelo…', o: ['Se niega a responder', 'Rellena los huecos con las opciones más probables', 'Pregunta siempre antes', 'Busca en tus archivos'], c: 1, why: 'Completa con lo probable, lo que suele dar resultados genéricos o inventados.' },
      { q: '¿Qué instrucción reduce más el riesgo de datos inventados?', o: ['«Sé creativo»', '«Hazlo profesional»', '«Si falta información, indícalo en lugar de inferirla»', '«Responde rápido»'], c: 2, why: 'Define la conducta ante información insuficiente.' }
    ],
    terms: [['Prompt', 'Entrada que se proporciona a un sistema generativo: pregunta, encargo, texto, datos o archivos.'], ['Prompt engineering', 'Práctica de diseñar la entrada para obtener una salida útil, verificable y adecuada.']]
  });

  /* ------------------------------------------------------------------ */
  const PIECES = [
    ['ROL', '¿Desde qué criterio trabaja?', '«Actúa como revisor de comunicación interna»', P.sky],
    ['CONTEXTO', '¿Qué necesita saber?', '«Somos una empresa B2B de formación»', P.blue],
    ['OBJETIVO', '¿Qué resultado concreto?', '«Resume las tres decisiones pendientes»', P.orange],
    ['ENTRADA', '¿Qué texto o fuentes usa?', '«Usa únicamente el acta adjunta»', P.yellow],
    ['RESTRICCIONES', '¿Qué incluir o evitar?', '«No inventes cifras; máx. 150 palabras»', P.red],
    ['FORMATO', '¿Cómo se entrega?', '«Tabla: decisión, responsable, fecha»', P.mint],
    ['EJEMPLOS', '¿Qué estilo o estructura?', '«Sigue este ejemplo de tono…»', P.purple],
    ['CRITERIO', '¿Cómo se comprobará?', '«Cada afirmación enlaza a una fuente»', P.pink]
  ];
  PL.concept({
    id: 'anatomia-prompt', block: 'b2', slide: 'S4–S5', title: 'Anatomía de una buena instrucción',
    idea: 'Una instrucción útil se construye con piezas: rol, contexto, objetivo, entrada, restricciones, formato, ejemplos y criterio de calidad. Cada pieza reduce un tipo de incertidumbre.',
    explain: [
      'No todas las piezas son necesarias en todos los casos, pero cada una elimina una duda concreta: desde qué criterio trabajar, qué contexto falta, qué resultado se busca, qué información usar, qué evitar, cómo entregarlo, qué estilo seguir y cómo se comprobará.',
      'Una plantilla útil: Objetivo (qué y para quién) · Contexto e información disponible · Instrucciones (fuentes permitidas, elementos obligatorios, qué evitar y qué hacer si falta información) · Formato de salida · Verificación (incertidumbres y separación entre hechos y recomendaciones).',
      'Regla práctica: si una decisión puede cambiar el resultado, debe aparecer en el prompt o convertirse en una pregunta previa.'
    ],
    panels: [
      {
        title: 'Ocho piezas de una instrucción',
        caption: 'Cada pieza responde a una pregunta y tiene un ejemplo típico.',
        steps: [
          'Rol o perspectiva (¿desde qué criterio?) y contexto (¿qué necesita saber que no está en la conversación?).',
          'Objetivo (¿qué resultado concreto?) e información de entrada (¿qué texto, datos o fuentes debe usar?).',
          'Restricciones (¿qué debe incluir o evitar?) y formato (¿cómo debe entregarse?).',
          'Ejemplos (¿qué estilo o estructura se espera?) y criterio de calidad (¿cómo se comprobará?).'
        ],
        draw(g) {
          txt('PIEZA', 64, 6, { size: 7.5, color: P.light, align: 'center' });
          txt('pregunta que responde', 196, 6, { size: 7.5, color: P.light, align: 'center' });
          txt('ejemplo', 370, 6, { size: 7.5, color: P.light, align: 'center' });
          PIECES.forEach((pc, i) => show(g.at(Math.floor(i / 2)), () => {
            const y = 18 + i * 31;
            chip(pc[0], 14, y, { fill: pc[3], size: 8, w: 100, h: 26 });
            box(118, y, 156, 26, { fill: P.gray2, shadow: false });
            txt(pc[1], 124, y + 8, { size: 8.5, maxW: 146, fit: true });
            box(278, y, 188, 26, { fill: P.white, shadow: false });
            txt(pc[2], 284, y + 8, { size: 7.5, color: P.ink, maxW: 176, fit: true });
            if (g.on(Math.floor(i / 2)) && g.p > 0.9) glow(14, y, 452, 26, P.yellow);
          }, 4));
        }
      },
      {
        title: 'Cada pieza elimina un tipo de incertidumbre',
        caption: 'Las dudas que rodean al modelo desaparecen a medida que añadimos piezas.',
        steps: [
          'Sin piezas, el modelo está rodeado de dudas: para quién, qué resultado, con qué fuentes, en qué formato…',
          'Añadimos contexto, objetivo y entrada: desaparecen tres dudas.',
          'Añadimos restricciones y formato: dos dudas menos.',
          'Con rol, ejemplos y criterio de calidad, el encargo queda claro. Ya no adivina.'
        ],
        draw(g) {
          const doubts = [['¿qué sabe?', 1], ['¿qué quiero?', 1], ['¿con qué fuentes?', 1], ['¿qué evito?', 2], ['¿cómo lo entrego?', 2], ['¿desde qué criterio?', 3], ['¿qué estilo?', 3], ['¿cómo se comprueba?', 3]];
          robot(224, 108, { mood: g.from(3) ? 'happy' : 'confused', color: P.purple });
          doubts.forEach((d, i) => {
            const a = -Math.PI / 2 + i * (Math.PI * 2 / 8);
            const x = 240 + Math.cos(a) * 176, y = 126 + Math.sin(a) * 88;
            const solved = g.at(d[1]) > 0.5;
            chip(d[0], x, y - 8, { align: 'center', fill: solved ? P.mint : P.yellow, size: 8, icon: solved ? 'check' : 'question', iconTint: P.ink });
            line(240, 126, lerp(240, x, 0.62), lerp(126, y, 0.62), solved ? P.mint : P.gray3, 1, !solved);
          });
          show(g.at(3), () => banner('Encargo claro: el modelo ya no adivina', { y: 236, color: P.mint }));
        }
      },
      {
        title: 'La plantilla general',
        caption: 'Una plantilla reutilizable para cualquier encargo; los corchetes se sustituyen por tu caso.',
        steps: [
          'Objetivo: «Necesito que [acción concreta] para [uso o destinatario]».',
          'Contexto e información disponible: datos necesarios, texto, audiencia, situación y definiciones.',
          'Instrucciones: fuentes permitidas, qué incluir, qué evitar y «si falta información, pregunta primero».',
          'Formato de salida (estructura, extensión, tono) y verificación: incertidumbres y hechos separados de recomendaciones.'
        ],
        draw(g) {
          paper(24, 12, 300, 238, { title: 'plantilla-encargo.md' });
          const L = [[{ t: '## Objetivo', color: P.blue }, 0], [{ t: 'Necesito que [acción] para [uso]', color: P.ink }, 0], [{ t: '## Contexto e información', color: P.blue }, 1], [{ t: '[datos, audiencia, situación]', color: P.ink }, 1], [{ t: '## Instrucciones', color: P.blue }, 2], [{ t: '- Usa [fuentes permitidas]', color: P.ink }, 2], [{ t: '- Incluye [obligatorio]', color: P.ink }, 2], [{ t: '- Evita [suposiciones, tono…]', color: P.ink }, 2], [{ t: '- Si falta info, pregunta antes', color: P.ink }, 2], [{ t: '## Formato de salida', color: P.blue }, 3], [{ t: '[estructura, extensión, tono]', color: P.ink }, 3], [{ t: '## Verificación', color: P.blue }, 3], [{ t: 'Separa hechos y recomendaciones', color: P.ink }, 3]];
          L.forEach((l, i) => { if (g.on(l[1])) rect(30, 32 + i * 16.5, 286, 15, 'rgba(247,207,90,.35)'); });
          code(L.map(l => l[0]), 36, 35, { size: 8, lh: 16.5, reveal: i => g.at(L[i][1]) });
          const notes = [['qué y para quién', P.orange], ['lo que no sabe', P.blue], ['límites y fuentes', P.red], ['cómo se entrega y comprueba', P.mint]];
          notes.forEach((n, i) => show(g.at(i), () => { chip(n[0], 344, 30 + i * 52, { fill: n[1], size: 8.5, w: 122 }); if (g.on(i)) arrow(340, 38 + i * 52, 326, 38 + i * 52, { color: P.yellow }); }));
        }
      },
      {
        title: '¿Cuántas piezas necesito?',
        caption: 'Más piezas cuanto más compleja o arriesgada es la tarea.',
        steps: [
          'Tarea sencilla y mecánica: «Pasa este texto a mayúsculas». Bastan objetivo y entrada.',
          'Tarea media: «Resume el acta para el equipo». Añade destinatario, formato y límites.',
          'Tarea compleja o con riesgo: un informe para un cliente. Todas las piezas, incluido el criterio de calidad.',
          'Regla práctica: si una decisión puede cambiar el resultado, debe estar en el prompt o convertirse en pregunta.'
        ],
        draw(g) {
          const cols = [{ t: 'SENCILLA', ex: '«Pasa a mayúsculas»', n: 2, r: 0.15 }, { t: 'MEDIA', ex: '«Resume el acta»', n: 5, r: 0.5 }, { t: 'COMPLEJA', ex: 'Informe para cliente', n: 8, r: 0.92 }];
          cols.forEach((cl, k) => {
            const x = 14 + k * 156;
            show(g.at(k), () => {
              card(x, 14, 140, 200, 'TAREA ' + cl.t, [P.mint, P.yellow, P.red][k], { active: g.on(k) });
              txt(cl.ex, x + 70, 36, { size: 8.5, align: 'center', maxW: 128 });
              for (let i = 0; i < cl.n; i++) { const pc = PIECES[[2, 3, 1, 4, 5, 0, 6, 7][i]]; chip(pc[0], x + 70, 150 - i * 14, { align: 'center', fill: pc[3], size: 6.5, w: 110, h: 13 }); }
              meter(x + 14, 196, 112, cl.r, { label: 'riesgo', n: 8 });
            });
          });
          show(g.at(3), () => banner('Si una decisión cambia el resultado, va en el prompt o se pregunta', { y: 232, size: 8.5 }));
        }
      }
    ],
    examples: [
      ['Revisión de comunicación', 'Rol: revisor de comunicación interna · Objetivo: detectar ambigüedades · Formato: lista de frases con propuesta alternativa.'],
      ['Extracción', 'Entrada: 20 facturas · Formato: tabla con proveedor, fecha, importe · Restricción: si un campo no aparece, «no consta».'],
      ['Clasificación con ejemplos', 'Ejemplos: tres comentarios ya clasificados · Criterio: cada etiqueta justificada en una frase.']
    ],
    mistakes: [
      'Escribir un rol muy elaborado y olvidar el objetivo o el formato.',
      'Mezclar instrucciones, datos y ejemplos sin separarlos.',
      'Usar todas las piezas por rutina en tareas triviales.'
    ],
    questions: [
      ['¿Qué pieza quitarías solo si la tarea es muy sencilla?', 'El contexto extenso, el rol o los ejemplos, si la transformación es mecánica y evidente. El objetivo y un formato mínimo casi nunca conviene omitirlos.'],
      ['¿Qué diferencia hay entre una restricción y un criterio de calidad?', 'La restricción limita qué hacer o evitar («no inventes cifras», «máximo 150 palabras»). El criterio dice cómo se comprobará que el resultado sirve («cada afirmación enlaza a una fuente»).'],
      ['Elige una tarea real de tu trabajo y escribe su objetivo en una frase con acción y destinatario.', 'Respuesta abierta. Formato recomendado: «Necesito que [acción concreta] para [uso o destinatario]». Ejemplo: «Necesito que resumas este contrato en cinco riesgos para el equipo de compras».'],
      ['¿Por qué separar con títulos las partes del prompt ayuda al modelo?', 'Distingue qué es instrucción, qué es dato y qué es ejemplo. Reduce la confusión, por ejemplo que tome un ejemplo como información real o una cita como orden.']
    ],
    quiz: [
      { q: '«Tabla con decisión, responsable y fecha» corresponde a la pieza…', o: ['Contexto', 'Formato', 'Rol', 'Criterio'], c: 1, why: 'Define cómo debe entregarse la salida.' },
      { q: '«Usa únicamente el acta adjunta» corresponde a…', o: ['Información de entrada', 'Ejemplos', 'Rol', 'Objetivo'], c: 0, why: 'Indica qué fuente debe usar.' },
      { q: 'La regla práctica sobre las piezas dice que…', o: ['Siempre hay que usar las ocho', 'Si una decisión puede cambiar el resultado, debe estar en el prompt o preguntarse', 'Basta con el rol', 'Cuanto más largo, mejor'], c: 1, why: 'Lo importante es no dejar al azar las decisiones relevantes.' }
    ],
    terms: [['Restricción', 'Condición que limita qué debe incluir o evitar la salida.'], ['Formato de salida', 'Estructura, extensión, idioma y tono en que se entrega el resultado.'], ['Criterio de calidad', 'Condición con la que se comprobará que la respuesta es válida.']]
  });

  /* ------------------------------------------------------------------ */
  PL.concept({
    id: 'estrategias', block: 'b2', slide: 'S6', title: 'Estrategias de conversación',
    idea: 'Pedir preguntas antes de generar, descomponer los encargos complejos, solicitar un razonamiento verificable y mostrar ejemplos mejora el control sobre el resultado.',
    explain: [
      'Cuando un encargo tiene decisiones abiertas, conviene pedir al modelo que identifique qué necesita saber antes de producir nada. La salida prematura se convierte en una conversación de descubrimiento, y además revela lo que no habíamos pensado.',
      'Un encargo complejo mejora si se divide en etapas: entender el problema y las fuentes, proponer un esquema, acordar criterios, producir un borrador, revisar una parte concreta y verificar contra una checklist. Si la tarea es simple, basta con una instrucción clara.',
      'Pedir que el modelo «piense paso a paso» no prueba que su razonamiento interno sea correcto. Es más robusto pedir un resumen verificable: datos usados, supuestos, operaciones comprobables y revisión de posibles errores. Los ejemplos (pocos y anonimizados) muestran el patrón de estilo o estructura, pero no sustituyen la explicación.'
    ],
    panels: [
      {
        title: 'Pide preguntas antes de generar',
        caption: 'Una conversación en la que el asistente pregunta lo imprescindible antes de redactar.',
        steps: [
          'Encargo con decisiones abiertas: «Prepara una propuesta de formación para un cliente».',
          'En vez de generar ya, añades: «Antes de redactar, hazme las preguntas imprescindibles. No generes todavía».',
          'El asistente pregunta por público, alcance, restricciones, plazo y criterio de éxito.',
          'Respondes y solo entonces genera. La salida prematura se ha convertido en descubrimiento.'
        ],
        draw(g) {
          const w = win(14, 10, 452, 250, 'Asistente · propuesta de formación');
          let y = w.y;
          show(g.at(0), () => { msg(w.x + 200, y, 240, 'Prepara una propuesta de formación para un cliente.', { who: 'user' }); });
          y += 30;
          show(g.at(1), () => { msg(w.x + 140, y, 300, 'Antes de redactar, hazme las preguntas imprescindibles. No generes todavía.', { who: 'user', fill: P.yellow }); });
          y += 32;
          show(g.at(2), () => {
            box(w.x, y, 270, 98, { fill: P.white, shadow: false });
            ['1. ¿Quién asistirá y qué nivel tiene?', '2. ¿Qué temas entran y cuáles no?', '3. ¿Hay presupuesto o formato fijo?', '4. ¿Para cuándo la necesitas?', '5. ¿Cómo sabremos que ha funcionado?'].forEach((q, i) => txt(q, w.x + 8, y + 7 + i * 18, { size: 8.5, color: P.ink, font: 'sans', a: 1 }));
            robot(w.x + 284, y + 40, { s: 1, mood: 'think', color: P.purple });
          });
          y += 106;
          show(g.at(3), () => { chip('Respuestas ✓', w.x + 440, y, { align: 'right', fill: P.blue, size: 8.5 }); chip('Propuesta v1, ajustada a tus respuestas', w.x, y + 22, { fill: P.mint, size: 8.5, icon: 'doc' }); });
        }
      },
      {
        title: 'Descomponer un encargo complejo',
        caption: 'Seis etapas para controlar un encargo con muchas decisiones.',
        steps: [
          '1 · Entender el problema y las fuentes. 2 · Proponer un esquema o plan.',
          '3 · Acordar criterios. 4 · Producir un primer borrador.',
          '5 · Revisar una parte concreta. 6 · Verificar contra una checklist.',
          'No hay que fragmentarlo todo: si la tarea es simple, una instrucción clara basta.'
        ],
        draw(g) {
          const st = [['ENTENDER', 'search'], ['ESQUEMA', 'list'], ['CRITERIOS', 'target'], ['BORRADOR', 'pencil'], ['REVISAR', 'eye'], ['CHECKLIST', 'check']];
          st.forEach((s, i) => {
            const row = Math.floor(i / 3), col = row === 0 ? i : 5 - i;
            const x = 26 + col * 156, y = 24 + row * 104;
            const a = g.at(Math.floor(i / 2));
            show(a, () => {
              card(x, y, 116, 76, (i + 1) + ' · ' + s[0], g.on(Math.floor(i / 2)) ? P.orange : P.blue, { size: 8 });
              icon(s[1], x + 46, y + 30, 2, s[1] === 'check' ? P.mint : undefined);
            });
            if (i < 5) {
              const a2 = g.at(Math.floor((i + 1) / 2));
              if (i === 2) arrow(x + 58, y + 78, x + 58, y + 102, { p: a2, color: P.mint });
              else if (row === 0) arrow(x + 118, y + 38, x + 154, y + 38, { p: a2, color: P.mint });
              else arrow(x - 2, y + 38, x - 38, y + 38, { p: a2, color: P.mint });
            }
          });
          show(g.at(3), () => banner('¿Tarea simple? Una instrucción clara basta', { y: 230 }));
        }
      },
      {
        title: 'Razonamiento verificable, no una falsa garantía',
        caption: 'Comparación entre «confía en mí» y un resumen que se puede comprobar pieza a pieza.',
        steps: [
          'Que el modelo escriba «he pensado paso a paso» no demuestra que su razonamiento sea correcto o completo.',
          'Mejor: pide datos usados, supuestos, operaciones comprobables y una revisión de posibles errores.',
          'Así puedes comprobar cada pieza. Y añade siempre: «No inventes datos faltantes».'
        ],
        draw(g) {
          show(g.at(0), () => {
            card(14, 16, 186, 210, 'CAJA NEGRA', P.red);
            rect(40, 70, 134, 90, P.ink); frame(40, 70, 134, 90, P.gray3, 2);
            txt('?', 107, 98, { size: 30, color: P.gray3, align: 'center' });
            bubble(26, 168, 162, 40, { text: '«Confía en mí: el resultado es 126»', size: 8.5 });
            robot(90, 34, { s: 1, mood: 'sure', color: P.purple });
          });
          show(g.at(1), () => {
            card(216, 16, 250, 210, 'RESUMEN VERIFICABLE', P.mint);
            const rows = [['DATOS USADOS', 'ventas T1 = 120 (tabla 2)'], ['SUPUESTOS', 'crecimiento del 5 %'], ['OPERACIONES', '120 × 1,05 = 126'], ['REVISIÓN', 'falta el dato de marzo']];
            rows.forEach((r, i) => { const y = 42 + i * 44; txt(r[0], 228, y, { size: 7.5, color: P.yellow }); box(228, y + 11, 226, 24, { fill: P.white, shadow: false }); txt(r[1], 236, y + 18, { size: 8.5, color: P.ink, font: 'mono' }); show(g.at(2), () => icon(i === 3 ? 'warn' : 'check', 436, y + 17, 1), 0); });
          });
          show(g.at(2), () => banner('«No inventes datos faltantes»', { y: 236, color: P.mint }));
        }
      },
      {
        title: 'Ejemplos que muestran el patrón',
        caption: 'Clasificar comentarios de clientes mostrando antes tres ejemplos resueltos (few-shot).',
        steps: [
          'Queremos clasificar comentarios de clientes en: elogio, queja o sugerencia.',
          'Damos tres ejemplos resueltos. El modelo ve el patrón: comentario → etiqueta.',
          'Ante un comentario nuevo, aplica el mismo formato y criterio.',
          'Anonimiza los ejemplos reales y revisa que no contengan instrucciones no deseadas. Un ejemplo muestra el patrón, no sustituye la explicación.'
        ],
        draw(g) {
          show(g.at(0), () => { chip('ELOGIO', 120, 14, { align: 'center', fill: P.mint, size: 9 }); chip('QUEJA', 240, 14, { align: 'center', fill: P.red, size: 9 }); chip('SUGERENCIA', 360, 14, { align: 'center', fill: P.sky, size: 9 }); });
          const ex = [['«Me encantó la atención en tienda.»', 'ELOGIO', P.mint], ['«El pedido llegó roto.»', 'QUEJA', P.red], ['«Podríais abrir los sábados.»', 'SUGERENCIA', P.sky]];
          ex.forEach((e, i) => show(clamp(g.at(1) * 3 - i), () => {
            const y = 46 + i * 34;
            box(30, y, 270, 26, { fill: P.white, shadow: false }); txt(e[0], 38, y + 8, { size: 8.5, color: P.ink, font: 'sans' });
            arrow(306, y + 13, 340, y + 13, { color: P.light });
            chip(e[1], 346, y + 4, { fill: e[2], size: 8.5, w: 100 });
          }));
          show(g.at(2), () => {
            rect(24, 156, 432, 2, P.gray3);
            box(30, 168, 270, 26, { fill: P.yellow, shadow: false }); txt('«La app se cierra al pagar.»', 38, 176, { size: 8.5, color: P.ink, font: 'sans' });
            arrow(306, 181, 340, 181, { color: P.yellow });
            robot(352, 160, { s: 1, color: P.purple });
            chip('QUEJA', 380, 172, { fill: P.red, size: 8.5, w: 66 });
          });
          show(g.at(3), () => banner('Anonimiza los ejemplos · el patrón no sustituye la explicación', { y: 228, icon: 'shield', color: P.mint }));
        }
      }
    ],
    examples: [
      ['Preguntas previas', '«Antes de redactar la propuesta, revisa el encargo y hazme las preguntas imprescindibles sobre público, alcance, restricciones, plazo y criterio de éxito. No generes todavía».'],
      ['Razonamiento verificable', '«Resuelve el problema. Después presenta los datos usados, los supuestos, las operaciones comprobables y una revisión de posibles errores. No inventes datos faltantes».'],
      ['Descomposición', 'Primero un índice del informe; después criterios; después cada sección por separado; al final, una checklist.']
    ],
    mistakes: [
      'Pedir el producto final cuando aún no están claras las decisiones clave.',
      'Tomar una explicación paso a paso como prueba de corrección.',
      'Usar ejemplos reales con datos personales sin anonimizar.'
    ],
    questions: [
      ['¿Cuándo es mejor pedir preguntas de aclaración que una primera respuesta?', 'Cuando hay decisiones abiertas que cambian el resultado (público, alcance, formato, restricciones) o cuando no tienes claro qué necesitas. Si la tarea es simple y está bien definida, no hace falta.'],
      ['¿Qué tres preguntas evitarían el mayor número de errores en un encargo de tu trabajo?', 'Respuesta abierta. Suelen ser: ¿para quién es y qué sabe ya?, ¿qué información está autorizada y qué no se puede inventar?, ¿cómo sabremos que el resultado está listo?'],
      ['¿Por qué un razonamiento visible no garantiza que el resultado sea correcto?', 'Porque el texto explicativo también es generado: puede ser plausible y estar equivocado, o no reflejar cómo se obtuvo realmente la respuesta. Lo útil es que puedas comprobar datos, supuestos y operaciones.'],
      ['¿Qué riesgos tiene usar como ejemplos correos reales de clientes?', 'Exponer datos personales y que el ejemplo contenga instrucciones o información que el modelo tome como válida. Hay que anonimizarlos y revisarlos.']
    ],
    quiz: [
      { q: 'Pedir «hazme las preguntas imprescindibles, no generes todavía» sirve para…', o: ['Ahorrar tokens', 'Cerrar decisiones abiertas antes de generar', 'Que el modelo piense más rápido', 'Evitar citar fuentes'], c: 1, why: 'Convierte una salida prematura en una conversación de descubrimiento.' },
      { q: 'Un «resumen de razonamiento verificable» incluye…', o: ['Solo la respuesta final', 'Datos usados, supuestos, operaciones y revisión de errores', 'Una frase de confianza', 'El código interno del modelo'], c: 1, why: 'Permite comprobar cada pieza por separado.' },
      { q: 'Sobre los ejemplos en un prompt, es cierto que…', o: ['Sustituyen la explicación', 'Muestran el patrón y deben anonimizarse si son reales', 'Cuantos más, mejor siempre', 'No influyen en el resultado'], c: 1, why: 'Reducen ambigüedad de estilo y estructura, pero no ocultan requisitos.' }
    ],
    terms: [['Few-shot', 'Técnica de incluir unos pocos ejemplos resueltos en el prompt para mostrar el patrón esperado.'], ['Iteración', 'Mejorar un resultado en rondas sucesivas con cambios concretos.']]
  });

  /* ------------------------------------------------------------------ */
  PL.concept({
    id: 'validar', block: 'b2', slide: 'S8', title: 'Validar siempre',
    idea: 'La validación forma parte del trabajo con IA, no es un extra final. Su intensidad debe ser proporcional a la consecuencia de un error.',
    explain: [
      'Cada tipo de salida tiene un riesgo habitual y una validación mínima: una lluvia de ideas requiere selección humana; un borrador, revisión editorial y contraste de hechos; un resumen de fuentes, abrir las citas; un dato o cifra, una fuente primaria; un asesoramiento legal, sanitario o financiero, un profesional competente; y el código, pruebas en un entorno controlado.',
      'Checklist básica: ¿responde exactamente a la petición?, ¿qué es hecho, inferencia o recomendación?, ¿existen y están bien atribuidas las cifras, nombres, fechas y referencias?, ¿la fuente respalda la frase completa o solo una parte?, ¿hay suposiciones no autorizadas?, ¿el tono y el formato sirven al destinatario?, ¿lo aprobaría una persona responsable?'
    ],
    panels: [
      {
        title: 'Revisión proporcional al riesgo',
        caption: 'Seis tipos de salida ordenados de menor a mayor riesgo, con su validación mínima.',
        steps: [
          'Lluvia de ideas → selección humana y viabilidad. Borrador de texto → revisión editorial y contraste de hechos.',
          'Resumen de fuentes → abrir y comprobar las citas. Dato, cifra o cita → fuente primaria o responsable.',
          'Legal, sanitario o financiero → profesional competente y fuentes oficiales. Código o automatización → pruebas y entorno controlado.',
          'La validación no es opcional: forma parte del trabajo.'
        ],
        draw(g) {
          const rows = [['bulb', 'Lluvia de ideas', 'Selección humana y viabilidad', 0.25], ['pencil', 'Borrador de texto', 'Revisión editorial y de hechos', 0.5], ['book', 'Resumen de fuentes', 'Abrir y comprobar las citas', 0.5], ['target', 'Dato, cifra o cita', 'Fuente primaria o responsable', 0.75], ['shield', 'Legal, sanitario, financiero', 'Profesional competente', 1], ['gear', 'Código o automatización', 'Pruebas en entorno controlado', 1]];
          txt('riesgo', 438, 8, { size: 7.5, color: P.light, align: 'center' });
          rows.forEach((r, i) => show(g.at(Math.floor(i / 2)), () => {
            const y = 20 + i * 34;
            box(14, y, 452, 30, { fill: g.on(Math.floor(i / 2)) ? P.gray2 : P.gray, shadow: false });
            icon(r[0], 22, y + 3, 2);
            txt(r[1], 54, y + 9, { size: 9, maxW: 150, fit: true });
            arrow(212, y + 15, 230, y + 15, { color: P.yellow });
            txt(r[2], 236, y + 9, { size: 8.5, color: P.mint, maxW: 172, fit: true });
            meter(414, y + 10, 48, r[3], { n: 4, h: 10, color: r[3] > 0.8 ? P.red : r[3] > 0.4 ? P.orange : P.yellow });
          }, 4));
          show(g.at(3), () => banner('La validación forma parte del trabajo', { y: 230 }));
        }
      },
      {
        title: 'Hechos, inferencias y recomendaciones',
        caption: 'Una respuesta de IA coloreada según el tipo de afirmación.',
        steps: [
          'Una respuesta mezcla tipos de afirmación. Léela buscando cuál es cuál.',
          'Hechos (azul): se comprueban en la fuente. «Las ventas cayeron un 8 % en marzo».',
          'Inferencias (naranja): ¿están justificadas? «Probablemente por la subida de precios».',
          'Recomendaciones (morado): son decisiones humanas. «Conviene lanzar una promoción».'
        ],
        draw(g) {
          box(14, 16, 300, 196, { fill: P.white });
          const segs = [['Las ventas cayeron un 8 % en marzo,', 1, P.blue], ['el peor mes del año (informe, p. 4).', 1, P.blue], ['Probablemente se debe a la subida', 2, P.orange], ['de precios de febrero.', 2, P.orange], ['Conviene lanzar una promoción', 3, P.purple], ['en abril para recuperar clientes.', 3, P.purple]];
          segs.forEach((sg, i) => {
            const y = 30 + i * 28;
            if (g.at(sg[1]) > 0) { D.show(g.at(sg[1]), () => rect(22, y - 3, 284, 20, sg[2]), 0); }
            txt(sg[0], 28, y, { size: 9.5, color: g.at(sg[1]) > 0.5 ? P.white : P.ink, font: 'sans' });
          });
          const legend = [['HECHO', '→ verifica la fuente', P.blue], ['INFERENCIA', '→ ¿está justificada?', P.orange], ['RECOMENDACIÓN', '→ decide una persona', P.purple]];
          legend.forEach((l, i) => show(g.at(i + 1), () => { chip(l[0], 330, 30 + i * 62, { fill: l[2], size: 8.5, w: 134, color: P.white }); txt(l[1], 334, 52 + i * 62, { size: 8.5, color: P.light }); }));
        }
      },
      {
        title: 'La cita respalda solo una parte',
        caption: 'Una afirmación con cita en la que la fuente solo apoya la primera mitad.',
        steps: [
          'Respuesta: «Las ventas cayeron un 8 % por la subida de precios [p. 4]». Hay una cita, parece sólido.',
          'Abrimos la página 4: «Las ventas cayeron un 8 % en marzo». No dice nada de precios.',
          'La primera mitad está respaldada; la causa no. La cita da apariencia de evidencia a toda la frase.',
          'Pregunta clave: ¿la fuente respalda la frase completa o solo una parte?'
        ],
        draw(g) {
          show(g.at(0), () => {
            box(14, 18, 452, 50, { fill: P.white });
            txt('«Las ventas cayeron un 8 %', 26, 34, { size: 11, color: P.ink, font: 'sans' });
            txt('por la subida de precios', 214, 34, { size: 11, color: P.ink, font: 'sans' });
            chip('[p. 4]', 392, 30, { fill: P.yellow, size: 9 });
          });
          show(g.at(1), () => {
            arrow(410, 70, 410, 124, { color: P.yellow });
            paper(250, 126, 216, 92, { title: 'Informe · página 4' });
            txt('«Las ventas cayeron un 8 % en marzo.»', 260, 150, { size: 9, color: P.ink, maxW: 196, font: 'sans' });
            bars(260, 180, 190, 3, { color: P.light, seed: 2 });
          });
          show(g.at(2), () => {
            rect(22, 54, 186, 4, P.mint); icon('check', 110, 74, 2);
            rect(210, 54, 170, 4, P.red); icon('cross', 284, 74, 2);
            chip('respaldado', 110, 102, { align: 'center', fill: P.mint, size: 8.5 });
            chip('no consta', 290, 102, { align: 'center', fill: P.red, size: 8.5 });
            robot(60, 150, { mood: 'think', color: P.purple });
          });
          show(g.at(3), () => banner('¿Respalda la frase completa o solo una parte?', { y: 228 }));
        }
      },
      {
        title: 'Checklist antes de enviar',
        caption: 'Siete comprobaciones antes de que una salida llegue a un cliente o se publique.',
        steps: [
          '¿Responde exactamente a la petición? ¿Separa hechos, inferencias y recomendaciones?',
          '¿Cifras, nombres, fechas y referencias existen y están bien atribuidos? ¿La fuente respalda la frase completa?',
          '¿Se han introducido suposiciones no autorizadas? ¿Tono, accesibilidad y formato sirven al destinatario?',
          '¿Una persona responsable lo aprobaría antes de enviarlo o publicarlo?'
        ],
        draw(g) {
          const items = ['¿Responde exactamente a la petición?', '¿Separa hechos, inferencias y recomendaciones?', '¿Cifras, nombres, fechas y referencias existen?', '¿La fuente respalda la frase completa?', '¿Hay suposiciones no autorizadas?', '¿Tono y formato sirven al destinatario?', '¿Lo aprobaría una persona responsable?'];
          items.forEach((it, i) => show(g.at(Math.min(3, Math.floor(i / 2))), () => {
            const y = 16 + i * 32;
            box(14, y, 316, 26, { fill: P.gray2, shadow: false });
            rect(22, y + 7, 12, 12, P.ink); rect(24, y + 9, 8, 8, P.white);
            if (g.at(Math.min(3, Math.floor(i / 2))) > 0.6) icon('check', 20, y + 5, 1);
            txt(it, 42, y + 8, { size: 8.5, maxW: 280, fit: true });
          }, 4));
          show(g.at(3), () => {
            person(370, 110, { shirt: P.purple, label: 'responsable' });
            stamp('APROBADO', 398, 200, { a: late(g.at(3)), color: P.mint });
          });
        }
      }
    ],
    examples: [
      ['Correo a cliente', 'Comprobar nombre, fecha, importe y que no promete nada no autorizado.'],
      ['Informe con cifras', 'Cada cifra con su fuente; separar conclusiones de recomendaciones.'],
      ['Código', 'Ejecutar pruebas y revisar seguridad antes de llevarlo a producción.']
    ],
    mistakes: [
      'Revisar solo el estilo y no los hechos.',
      'Dar por buena una cita sin comprobar si respalda la frase completa.',
      'Aplicar la misma revisión ligera a todo, sea cual sea el riesgo.'
    ],
    questions: [
      ['¿Qué afirmación de una respuesta de IA revisarías antes de enviarla a un cliente?', 'Las verificables y de impacto: cifras, fechas, nombres, compromisos (plazos, descuentos, condiciones) y cualquier referencia normativa o contractual.'],
      ['Clasifica: «El contrato vence el 30 de junio», «El cliente parece descontento», «Deberíamos llamarle esta semana».', 'Hecho (comprobable en el contrato), inferencia (¿en qué se basa?) y recomendación (decisión humana).'],
      ['¿Por qué una cita puede dar falsa seguridad?', 'Porque su presencia sugiere evidencia aunque la fuente solo respalde parte de la frase, hable del tema en general o no exista. Hay que abrirla y leerla.'],
      ['¿Qué validación mínima pedirías para un resumen de un documento legal?', 'Abrir las citas, contrastar los puntos críticos con el texto original y, si se va a tomar una decisión, revisión por un profesional competente.']
    ],
    quiz: [
      { q: 'La intensidad de la validación debe ser…', o: ['Siempre la misma', 'Proporcional a la consecuencia de un error', 'Mínima para ahorrar tiempo', 'Solo para código'], c: 1, why: 'A más impacto de un error, más revisión.' },
      { q: '«Probablemente se debe a la subida de precios» es…', o: ['Un hecho', 'Una inferencia', 'Una cita', 'Un formato'], c: 1, why: 'Es una interpretación que hay que justificar.' },
      { q: 'Para un dato o cifra concreta, la validación mínima es…', o: ['Preguntar otra vez al modelo', 'Una fuente primaria o responsable', 'Comprobar el tono', 'Ninguna'], c: 1, why: 'Los datos se contrastan con su origen.' }
    ],
    terms: [['Validación', 'Comprobación de que una salida es correcta, está respaldada y sirve al destinatario.'], ['Inferencia', 'Conclusión que se deduce de los datos pero no está afirmada en ellos.']]
  });

  /* ------------------------------------------------------------------ */
  PL.concept({
    id: 'privacidad', block: 'b2', slide: 'S9', title: 'Privacidad: anonimizar no es borrar un nombre',
    idea: 'No se pegan datos personales, credenciales, secretos o información de clientes en servicios no autorizados. Y anonimizar exige quitar también las pistas que, combinadas, identifican a alguien.',
    explain: [
      'No deben pegarse en un servicio no autorizado datos personales identificables, credenciales, secretos empresariales, contratos completos, datos de salud, información bancaria o información de clientes. Antes de usar una herramienta hay que conocer sus condiciones de tratamiento de datos y las políticas de la organización.',
      'La anonimización no consiste solo en sustituir un nombre. Cargo, fecha, ubicación, importe, número de expediente o una situación poco frecuente pueden identificar a una persona al combinarse.',
      'Si no se puede anonimizar de forma fiable, se debe usar un entorno autorizado o no usar la IA para esa tarea.'
    ],
    panels: [
      {
        title: 'Lo que no se pega en un servicio no autorizado',
        caption: 'Siete tipos de información que se detienen antes de llegar a una herramienta no aprobada.',
        steps: [
          'Datos personales identificables, credenciales y secretos empresariales: fuera.',
          'Contratos completos, datos de salud, información bancaria e información de clientes: fuera.',
          'Antes de usar una herramienta: conoce sus condiciones de tratamiento de datos y la política de tu organización.'
        ],
        draw(g) {
          const items = [['user', 'Datos personales', 0], ['key', 'Credenciales', 0], ['lock', 'Secretos empresariales', 0], ['doc', 'Contratos completos', 1], ['warn', 'Datos de salud', 1], ['coin', 'Información bancaria', 1], ['folder', 'Información de clientes', 1]];
          items.forEach((it, i) => {
            const a = g.at(it[2]);
            const y = 40 + i * 28;
            const x = lerp(14, 140, ease(clamp(a * 1.3)));
            chip(it[1], x, y, { icon: it[0], fill: P.paper, size: 8.5, w: 150, h: 24 });
            if (a > 0.9) icon('cross', 296, y + 6, 1);
          });
          rect(318, 36, 6, 200, P.red);
          icon('shield', 303, 0, 3, P.red);
          icon('cloud', 362, 86, 5);
          txt('SERVICIO NO\nAUTORIZADO', 398, 152, { size: 8, align: 'center', color: P.light });
          show(g.at(2), () => banner('Conoce las condiciones de datos y la política de tu organización', { y: 238, h: 26, size: 8.5 }));
        }
      },
      {
        title: 'Anonimizar no es solo borrar el nombre',
        caption: 'Ejemplo ficticio: tras quitar el nombre, la combinación de detalles sigue identificando a la persona.',
        steps: [
          'Texto original: incluye un nombre propio. Claramente identificable.',
          'Sustituimos el nombre por «[persona]». ¿Ya es anónimo?',
          'No: cargo, sede, fecha y situación siguen ahí. Son identificadores indirectos.',
          'Combinados, apuntan a una única persona: la jefa de RR. HH. de la sede de Motril. Reidentificada.'
        ],
        draw(g) {
          box(14, 16, 290, 150, { fill: P.white });
          txt('Asunto: baja médica', 24, 26, { size: 8.5, color: P.navy, font: 'sans' });
          const name = g.from(1) ? '[persona]' : 'Lucía Moreno';
          const parts = [[name, 'n'], [', jefa de RR. HH.', 'c'], [' de la sede de Motril,', 's'], [' está de baja desde el 3 de marzo', 'f'], [' por una operación poco habitual.', 'r']];
          const lines = [[parts[0], parts[1]], [parts[2]], [parts[3]], [parts[4]]];
          lines.forEach((ln, j) => {
            let x = 24;
            ln.forEach(pt => {
              const w = measure(pt[0], 9.5, { font: 'sans' });
              const indirect = pt[1] !== 'n';
              if ((pt[1] === 'n' && g.on(0)) || (indirect && g.from(2))) rect(x - 1, 50 + j * 24 - 2, w + 2, 16, pt[1] === 'n' ? P.red : 'rgba(242,140,56,.55)');
              if (pt[1] === 'n' && g.from(1)) rect(x - 1, 50 + j * 24 - 2, w + 2, 16, P.light);
              txt(pt[0], x, 50 + j * 24, { size: 9.5, color: P.ink, font: 'sans' });
              x += w;
            });
          });
          show(g.at(1), () => { chip('¿anónimo?', 160, 140, { align: 'center', fill: P.yellow, size: 9 }); });
          show(g.at(2), () => {
            [['cargo', 'user'], ['sede', 'pin'], ['fecha', 'calendar'], ['caso raro', 'warn']].forEach((q, i) => chip(q[0], 326, 20 + i * 34, { icon: q[1], fill: P.orange, size: 8.5, w: 118 }));
          });
          show(g.at(3), () => {
            [0, 1, 2, 3].forEach(i => line(444, 31 + i * 34, 438, 184, P.orange, 1));
            person(426, 184, { shirt: P.red });
            stamp('REIDENTIFICADA', 160, 206, { a: late(g.at(3)), size: 12 });
          });
        }
      },
      {
        title: 'Minimizar y generalizar',
        caption: 'Cada dato se sustituye por una categoría amplia o se elimina si no hace falta para la tarea.',
        steps: [
          'El nombre pasa a «[persona]». El cargo concreto, a «[responsable de un área]».',
          'La sede, a «[una sede]». La fecha exacta, a «[primer trimestre]».',
          'El motivo médico no hace falta para la tarea (redactar un aviso de ausencia): se elimina.',
          'Resultado: solo lo imprescindible para la tarea, y sin combinación que identifique.'
        ],
        draw(g) {
          const rows = [['Lucía Moreno', '[persona]', 0], ['jefa de RR. HH.', '[responsable de área]', 0], ['sede de Motril', '[una sede]', 1], ['3 de marzo', '[primer trimestre]', 1], ['operación poco habitual', '(eliminado)', 2]];
          txt('ORIGINAL', 100, 10, { size: 8, color: P.red, align: 'center' });
          txt('MINIMIZADO', 370, 10, { size: 8, color: P.mint, align: 'center' });
          rows.forEach((r, i) => {
            const y = 26 + i * 36, a = g.at(r[2]);
            box(20, y, 160, 26, { fill: P.white, shadow: false });
            txt(r[0], 100, y + 8, { size: 9, color: P.ink, align: 'center', font: 'sans' });
            if (a > 0.5) rect(26, y + 12, 148, 2, P.red);
            arrow(186, y + 13, 266, y + 13, { p: a, color: P.yellow });
            show(a, () => { box(272, y, 196, 26, { fill: r[2] === 2 ? P.gray3 : P.mint, shadow: false }); txt(r[1], 370, y + 8, { size: 9, color: P.ink, align: 'center', font: 'sans' }); }, 0);
          });
          show(g.at(3), () => banner('Solo lo imprescindible para la tarea', { y: 214, icon: 'shield', color: P.mint }));
        }
      },
      {
        title: 'Decidir: ¿se puede anonimizar de forma fiable?',
        caption: 'Un árbol de decisión sencillo antes de usar IA con información delicada.',
        steps: [
          'Primera pregunta: ¿la tarea implica datos personales, de clientes o confidenciales?',
          'Si no: usa la herramienta según la política de tu organización.',
          'Si sí: ¿puedes anonimizarlos de forma fiable (incluidas las pistas indirectas)? Si es así, anonimiza y usa.',
          'Si no puedes: usa un entorno autorizado para esos datos… o no uses la IA para esa tarea.'
        ],
        draw(g) {
          const N = (s, x, y, col, w = 150) => chip(s, x, y, { align: 'center', fill: col, size: 8.5, w, h: 30 });
          show(g.at(0), () => N('¿Datos personales, de clientes o confidenciales?', 240, 14, P.yellow, 300));
          show(g.at(1), () => { line(180, 46, 100, 86, P.light); txt('no', 128, 58, { size: 9, color: P.mint }); N('Usar según la política', 100, 88, P.mint); });
          show(g.at(2), () => { line(300, 46, 360, 86, P.light); txt('sí', 338, 58, { size: 9, color: P.red }); N('¿Anonimización fiable?', 360, 88, P.yellow); line(320, 120, 260, 160, P.light); txt('sí', 278, 132, { size: 9, color: P.mint }); N('Anonimizar y usar', 250, 162, P.mint); });
          show(g.at(3), () => { line(400, 120, 410, 160, P.light); txt('no', 414, 134, { size: 9, color: P.red }); N('Entorno autorizado', 404, 162, P.sky, 120); txt('o', 404, 198, { size: 9, align: 'center', color: P.light }); N('No usar IA', 404, 212, P.red, 120); });
          person(28, 180, { shirt: P.teal });
        }
      }
    ],
    examples: [
      ['Mal', 'Pegar el contrato completo de un cliente en un chat personal para resumirlo.'],
      ['Mejor', 'Usar el entorno corporativo autorizado o extraer solo las cláusulas necesarias sin identificadores.'],
      ['Reidentificación', '«El único técnico de la delegación de Baza que pidió excedencia en 2025» identifica a alguien sin decir su nombre.']
    ],
    mistakes: [
      'Creer que borrar el nombre basta para anonimizar.',
      'Usar herramientas personales con información de la empresa.',
      'Dar por hecho que «privado» en una herramienta significa «autorizado para cualquier dato».'
    ],
    questions: [
      ['¿Qué dato aparentemente inocente sigue permitiendo identificar a alguien?', 'Cargo, fecha exacta, ubicación, importe, número de expediente o una situación poco frecuente. Por separado parecen inofensivos; combinados pueden señalar a una sola persona.'],
      ['Necesitas ayuda para redactar una respuesta a la queja de un cliente. ¿Cómo lo harías respetando la privacidad?', 'Describir la situación con categorías («un cliente con un pedido retrasado dos semanas»), sin nombre, correo, número de pedido ni datos que lo identifiquen, y completar los datos reales fuera de la herramienta.'],
      ['¿Qué deberías comprobar antes de usar una herramienta de IA con información de tu empresa?', 'Si está autorizada para ese tipo de datos, qué hace el proveedor con ellos (retención, entrenamiento), quién puede acceder y qué dice la política interna.'],
      ['¿Cuándo es mejor no usar IA para una tarea?', 'Cuando los datos no pueden anonimizarse de forma fiable y no hay un entorno autorizado, o cuando el impacto de un error es alto y no hay supervisión adecuada.']
    ],
    quiz: [
      { q: 'Anonimizar correctamente implica…', o: ['Borrar solo el nombre', 'Eliminar identificadores directos e indirectos y minimizar los datos', 'Cambiar el idioma', 'Usar mayúsculas'], c: 1, why: 'Las combinaciones de detalles también identifican.' },
      { q: 'Si no puedes anonimizar de forma fiable…', o: ['Lo pegas igualmente', 'Usas un entorno autorizado o no usas la IA para esa tarea', 'Lo divides en varios mensajes', 'Pides al modelo que lo olvide'], c: 1, why: 'Es la regla de seguridad del bloque.' },
      { q: '¿Cuál es un identificador indirecto?', o: ['El DNI', 'El correo personal', 'El cargo junto con la sede y la fecha', 'El nombre completo'], c: 2, why: 'Por separado no identifica; combinado, sí.' }
    ],
    terms: [['Anonimización', 'Proceso que impide identificar a una persona, eliminando identificadores directos e indirectos.'], ['Identificador indirecto', 'Dato que, combinado con otros, permite identificar a una persona (cargo, fecha, ubicación…).'], ['Minimización', 'Usar solo los datos imprescindibles para la tarea.']]
  });

  /* ------------------------------------------------------------------ */
  PL.concept({
    id: 'markdown', block: 'b2', slide: 'S10–S11', title: 'Markdown como formato de trabajo',
    idea: 'Markdown añade estructura a texto plano con unos pocos símbolos. Es portable, legible sin una aplicación concreta, fácil de versionar y muy útil para conversar con asistentes de IA.',
    explain: [
      'Markdown es una forma ligera de añadir estructura: # para títulos, ** para negrita, guiones para listas, [texto](url) para enlaces, > para citas y comillas invertidas para código. El archivo sigue siendo legible aunque no se renderice.',
      'GitHub Flavored Markdown (GFM) añade tablas, listas de tareas y texto tachado. La tabla conviene cuando se comparan campos repetidos; para explicar una idea compleja suele ser mejor una lista o un párrafo bien redactado.',
      'Funciona bien con IA porque separa con claridad títulos, restricciones y ejemplos, evita el ruido de formatos propietarios, es fácil de revisar y comparar, y deja specs y notas en archivos accesibles a largo plazo.'
    ],
    panels: [
      {
        title: 'Fuente y resultado',
        caption: 'El mismo archivo visto como texto plano (izquierda) y renderizado (derecha).',
        steps: [
          'A la izquierda, el archivo .md: texto plano con unos pocos símbolos.',
          'Al renderizar, # se convierte en título y ** en negrita.',
          'Los guiones forman listas y los corchetes, casillas de tarea.',
          'El enlace y la cita también aparecen. Y el archivo original sigue siendo perfectamente legible.'
        ],
        draw(g) {
          card(14, 14, 218, 212, 'PLAN.MD', P.blue);
          code([{ t: '# Plan de la semana', color: P.yellow }, { t: 'Entrega del **bloque 2**.', color: P.white }, '', { t: '- [x] Leer apuntes', color: P.sky }, { t: '- [ ] Mejorar 3 prompts', color: P.sky }, '', { t: '[Guía](https://obsidian.md)', color: P.mint }, '', { t: '> Validar siempre.', color: P.pink }], 26, 40, { size: 8.5, lh: 19 });
          arrow(236, 120, 244, 120, { p: g.at(1), color: P.yellow });
          card(248, 14, 218, 212, 'RENDERIZADO', P.orange);
          show(g.at(1), () => { txt('Plan de la semana', 260, 40, { size: 13, color: P.white, font: 'sans' }); rect(260, 58, 190, 1, P.gray3); txt('Entrega del', 260, 66, { size: 9.5, font: 'sans', weight: 400 }); txt('bloque 2.', 318, 66, { size: 9.5, font: 'sans', weight: 700, color: P.yellow }); });
          show(g.at(2), () => { box(262, 100, 11, 11, { fill: P.mint, shadow: false }); icon('check', 262, 99, 1, P.ink); txt('Leer apuntes', 280, 100, { size: 9.5, font: 'sans', weight: 400 }); box(262, 120, 11, 11, { fill: P.white, shadow: false }); txt('Mejorar 3 prompts', 280, 120, { size: 9.5, font: 'sans', weight: 400 }); });
          show(g.at(3), () => { txt('Guía', 260, 152, { size: 9.5, color: P.sky, font: 'sans' }); rect(260, 164, 26, 1, P.sky); rect(260, 180, 3, 18, P.pink); txt('Validar siempre.', 270, 183, { size: 9.5, color: P.light, font: 'sans', weight: 400 }); banner('Legible como texto · estructurado al renderizar', { y: 236 }); });
        }
      },
      {
        title: 'Cada símbolo, una estructura',
        caption: 'Chuleta de la sintaxis básica de Markdown.',
        steps: [
          '# Título · ## Apartado · ### Subapartado. **negrita** y *cursiva*.',
          '- Elemento de lista · 1. Paso numerado.',
          '[Texto visible](https://ejemplo.com) para enlaces · > para citas o notas destacadas.',
          'Comillas invertidas para `código corto` y bloques de código o texto preformateado.'
        ],
        draw(g) {
          const rows = [['# Título', 'Título principal', 0], ['**negrita** *cursiva*', 'negrita y cursiva', 0], ['- elemento', '• elemento de lista', 1], ['1. primer paso', '1. paso numerado', 1], ['[texto](url)', 'enlace clicable', 2], ['> nota', 'cita destacada', 2], ['`código`', 'código en línea', 3]];
          txt('ESCRIBES', 110, 6, { size: 8, color: P.sky, align: 'center' });
          txt('OBTIENES', 360, 6, { size: 8, color: P.orange, align: 'center' });
          rows.forEach((r, i) => show(g.at(r[2]), () => {
            const y = 18 + i * 32;
            box(14, y, 196, 26, { fill: P.ink, shadow: false, border: P.gray3 });
            txt(r[0], 24, y + 7, { size: 9, font: 'mono', color: P.yellow });
            arrow(216, y + 13, 246, y + 13, { color: P.light });
            box(252, y, 214, 26, { fill: P.white, shadow: false });
            if (i === 0) txt('Título principal', 260, y + 5, { size: 12, color: P.ink, font: 'sans' });
            else if (i === 1) { txt('negrita', 260, y + 7, { size: 9.5, color: P.ink, font: 'sans', weight: 700 }); txt('y cursiva', 304, y + 7, { size: 9.5, color: P.navy, font: 'sans', weight: 400 }); }
            else if (i === 4) { txt('enlace clicable', 260, y + 7, { size: 9.5, color: P.blue, font: 'sans' }); rect(260, y + 19, 78, 1, P.blue); }
            else if (i === 5) { rect(258, y + 4, 3, 18, P.orange); txt('cita destacada', 266, y + 7, { size: 9.5, color: P.navy, font: 'sans', weight: 400 }); }
            else if (i === 6) { rect(258, y + 5, 52, 16, P.paper); txt('código', 262, y + 7, { size: 9, color: P.ink, font: 'mono' }); }
            else txt(r[1], 260, y + 7, { size: 9.5, color: P.ink, font: 'sans', weight: 400 });
          }, 4));
        }
      },
      {
        title: 'Extensiones GFM: tablas, tareas y tachado',
        caption: 'GitHub Flavored Markdown añade estructuras útiles para documentación y seguimiento.',
        steps: [
          'Tablas: se escriben con barras verticales y guiones. Úsalas para comparar campos repetidos.',
          'Listas de tareas: - [ ] pendiente y - [x] completada.',
          'Texto tachado con ~~doble virgulilla~~.',
          'Para explicar una idea compleja, mejor una lista o un párrafo: el formato debe mostrar la estructura, no convertirlo todo en una cuadrícula.'
        ],
        draw(g) {
          show(g.at(0), () => {
            code([{ t: '| Tarea   | Resp. | Estado |', color: P.yellow }, { t: '|---------|-------|--------|', color: P.gray3 }, { t: '| Revisar | Ana   | Hecho  |', color: P.white }, { t: '| Enviar  | Luis  | Pend.  |', color: P.white }], 18, 20, { size: 8, lh: 15 });
            table(258, 16, [72, 64, 72], [['Tarea', 'Resp.', 'Estado'], ['Revisar', 'Ana', 'Hecho'], ['Enviar', 'Luis', 'Pend.']], { rh: 20, leftFirst: false });
          });
          show(g.at(1), () => {
            code([{ t: '- [ ] Tarea pendiente', color: P.sky }, { t: '- [x] Tarea completada', color: P.sky }], 18, 100, { size: 8.5, lh: 18 });
            box(260, 98, 11, 11, { fill: P.white, shadow: false }); txt('Tarea pendiente', 278, 98, { size: 9.5, font: 'sans', weight: 400 });
            box(260, 118, 11, 11, { fill: P.mint, shadow: false }); icon('check', 260, 117, 1, P.ink); txt('Tarea completada', 278, 118, { size: 9.5, font: 'sans', weight: 400 });
          });
          show(g.at(2), () => {
            code([{ t: '~~texto tachado~~', color: P.pink }], 18, 156, { size: 8.5 });
            const w = txt('texto tachado', 260, 156, { size: 9.5, font: 'sans', weight: 400, color: P.light }).w; rect(260, 160, w, 1.5, P.light);
          });
          show(g.at(3), () => banner('Tabla para campos repetidos · párrafo o lista para ideas complejas', { y: 222, size: 8.5 }));
        }
      },
      {
        title: 'Por qué funciona bien con IA',
        caption: 'El mismo encargo en un documento con formato propietario y en Markdown.',
        steps: [
          'Un documento con formato propietario arrastra estilos, tablas anidadas y metadatos que no aportan al encargo.',
          'En Markdown, los títulos separan con claridad objetivo, restricciones y ejemplos.',
          'Es portable y versionable: se puede comparar qué cambió entre una versión y otra.',
          'Y reutilizable: el mismo archivo sirve como prompt, como spec o como nota de estudio.'
        ],
        draw(g) {
          show(g.at(0), () => {
            card(14, 14, 200, 170, 'ENCARGO.DOCX', P.navy);
            for (let i = 0; i < 9; i++) { const w = 60 + rnd(i * 4) * 110; rect(26, 40 + i * 14, w, 6, [P.gray3, P.purple, P.gray3, P.sky][i % 4]); }
            txt('estilos · tablas anidadas · metadatos', 114, 166, { size: 7, color: P.light, align: 'center' });
          });
          show(g.at(1), () => {
            card(232, 14, 234, 170, 'ENCARGO.MD', P.mint);
            code([{ t: '## Objetivo', color: P.yellow }, 'Resumir el acta para el equipo.', { t: '## Restricciones', color: P.yellow }, '- Máximo 150 palabras', '- No inventar fechas', { t: '## Ejemplo', color: P.yellow }, '| Decisión | Resp. | Fecha |'], 244, 40, { size: 7.5, lh: 17 });
          });
          show(g.at(2), () => { box(14, 194, 222, 40, { fill: P.gray2 }); txt('v1 → v2', 24, 200, { size: 8, color: P.light, font: 'mono' }); txt('- Máximo 200 palabras', 24, 212, { size: 7.5, color: P.red, font: 'mono' }); txt('+ Máximo 150 palabras', 24, 222, { size: 7.5, color: P.mint, font: 'mono' }); });
          show(g.at(3), () => { [['chat', 'prompt'], ['doc', 'spec'], ['book', 'nota']].forEach((r, i) => { icon(r[0], 256 + i * 72, 196, 2); txt(r[1], 268 + i * 72, 224, { size: 8, align: 'center', color: P.light }); }); });
        }
      }
    ],
    examples: [
      ['Prompt estructurado', '## Objetivo · ## Contexto · ## Restricciones · ## Formato, cada uno con su contenido.'],
      ['Apuntes', 'Notas de clase con títulos, listas y enlaces que se leen igual en cualquier editor.'],
      ['Seguimiento', 'Una lista de tareas - [ ] / - [x] para la entrega del bloque.']
    ],
    mistakes: [
      'Convertir todo en tablas, incluso las ideas que piden un párrafo.',
      'Pegar capturas de texto en lugar del texto estructurado.',
      'Mezclar instrucciones y datos sin títulos que los separen.'
    ],
    questions: [
      ['¿Qué parte de «# Plan» es contenido y qué parte es estructura?', '«Plan» es el contenido; el símbolo # indica la estructura (título de primer nivel). Lo mismo con guiones, corchetes o asteriscos.'],
      ['¿Cuándo usarías una tabla y cuándo una lista en una nota?', 'Tabla para comparar elementos con los mismos campos (herramienta, coste, privacidad). Lista o párrafo para explicar un razonamiento o una idea con matices.'],
      ['¿Por qué Markdown facilita trabajar a largo plazo?', 'Porque es texto plano: se abre con cualquier editor, no depende de una aplicación concreta, se puede versionar y comparar, y se reutiliza en prompts, specs y documentación.']
    ],
    quiz: [
      { q: '¿Qué símbolo crea un título en Markdown?', o: ['*', '#', '>', '-'], c: 1, why: '# título, ## apartado, ### subapartado.' },
      { q: '«- [x] Tarea» representa…', o: ['Un enlace', 'Una tarea completada', 'Una tabla', 'Un título'], c: 1, why: 'Es una lista de tareas de GFM marcada como hecha.' },
      { q: 'Una ventaja de Markdown para trabajar con IA es que…', o: ['Siempre es muchísimo más barato', 'Separa con claridad instrucciones, restricciones y ejemplos', 'Solo funciona en una aplicación', 'Añade imágenes automáticamente'], c: 1, why: 'Hace visible la estructura sin ruido de formato.' }
    ],
    terms: [['Markdown', 'Formato ligero que añade estructura a texto plano con símbolos sencillos.'], ['GFM', 'GitHub Flavored Markdown: extensión con tablas, listas de tareas y tachado.']]
  });

  /* ------------------------------------------------------------------ */
  PL.concept({
    id: 'obsidian', block: 'b2', slide: 'S12', title: 'Vault de Obsidian: enlazar conocimiento',
    idea: 'Obsidian es un editor de notas sobre archivos Markdown locales. El valor está en la práctica: capturar conceptos, enlazarlos y volver a encontrarlos, no en acumular aplicaciones ni en un grafo vistoso.',
    explain: [
      'Un vault es una carpeta de notas .md. Para el máster: crear un vault «Master IA», una nota índice «00 Indice del Master» y una nota por bloque («01 Panorama de IA», «02 Prompting y Markdown»…), con tres conceptos clave y un ejemplo propio en cada una.',
      'Los enlaces internos se crean con [[Nombre de la nota]]. Conviene añadir en cada bloque una sección «Preguntas pendientes». La vista de grafo es solo una visualización: importa más la estructura de enlaces y poder encontrar las notas.',
      'Una plantilla de nota por clase con fecha, bloque y etiquetas, idea principal, conceptos clave enlazados, ejemplo de tu trabajo, dudas pendientes y enlaces al índice hace que el hábito sea sostenible.'
    ],
    panels: [
      {
        title: 'Un vault es una carpeta de notas',
        caption: 'La estructura recomendada para el máster: una carpeta, un índice y una nota por bloque.',
        steps: [
          'Crea un vault (una carpeta) llamado, por ejemplo, «Master IA».',
          'Dentro, una nota índice: «00 Indice del Master».',
          'Y una nota por bloque, con tres conceptos clave y un ejemplo propio en cada una.',
          'Son archivos .md locales: tuyos y legibles con cualquier editor, aunque cambies de aplicación.'
        ],
        draw(g) {
          show(g.at(0), () => { icon('folder', 30, 30, 4); txt('Master IA', 90, 46, { size: 14, weight: 700 }); txt('vault = carpeta', 90, 64, { size: 8.5, color: P.light }); });
          const files = [['00 Indice del Master.md', 1, P.yellow], ['01 Panorama de IA.md', 2, P.sky], ['02 Prompting y Markdown.md', 2, P.sky], ['03 Specs-Driven Development.md', 2, P.sky], ['04 RAG y NotebookLM.md', 2, P.sky], ['05 ChatGPT y Claude.md', 2, P.sky]];
          files.forEach((f, i) => show(g.at(f[1]) * (f[1] === 2 ? clamp(g.at(2) * 5 - (i - 1)) : 1), () => {
            const y = 94 + i * 24;
            line(48, y - 12, 48, y + 8, P.gray3, 2); line(48, y + 8, 60, y + 8, P.gray3, 2);
            icon('doc', 64, y + 2, 1, f[2] === P.yellow ? P.orange : P.navy);
            txt(f[0], 82, y + 3, { size: 9, color: f[2] });
          }, 3));
          show(g.at(2), () => { box(300, 96, 166, 110, { fill: P.white }); txt('01 Panorama de IA', 308, 104, { size: 9, color: P.ink }); ['- token', '- contexto', '- alucinación', 'Ejemplo: …'].forEach((l, i) => txt(l, 308, 124 + i * 18, { size: 8.5, color: P.navy, font: 'mono' })); });
          show(g.at(3), () => banner('Archivos .md locales: tuyos y portables', { y: 236 }));
        }
      },
      {
        title: 'Enlaces internos que construyen una red',
        caption: 'Escribir [[Nombre de la nota]] crea una conexión navegable entre notas.',
        steps: [
          'En la nota índice escribes [[01 Panorama de IA]], [[02 Prompting y Markdown]]… Cada enlace lleva a su nota.',
          'Las notas se enlazan entre sí por relaciones útiles: Tokens → Ventana de contexto, Prompting → Specs.',
          'La vista de grafo muestra esa red. Útil para orientarse, pero es una consecuencia, no el objetivo.',
          'Añade en cada bloque una sección «Preguntas pendientes»: es tu lista de dudas para la siguiente clase.'
        ],
        draw(g) {
          const nodes = [[240, 40, '00 ÍNDICE', P.yellow], [90, 110, 'PANORAMA', P.sky], [190, 140, 'PROMPTING', P.orange], [300, 140, 'SPECS', P.purple], [400, 110, 'RAG', P.mint], [70, 196, 'TOKENS', P.sky], [170, 210, 'CONTEXTO', P.sky]];
          const e1 = [[0, 1], [0, 2], [0, 3], [0, 4]], e2 = [[5, 6], [2, 3], [3, 4], [1, 5]];
          show(g.at(0), () => e1.forEach(e => line(nodes[e[0]][0], nodes[e[0]][1], nodes[e[1]][0], nodes[e[1]][1], P.gray3, 2)), 0);
          show(g.at(1), () => e2.forEach(e => line(nodes[e[0]][0], nodes[e[0]][1], nodes[e[1]][0], nodes[e[1]][1], P.mint, 2)), 0);
          nodes.forEach((n, i) => show(i < 5 ? 1 : g.at(1), () => chip(n[2], n[0], n[1] - 9, { align: 'center', fill: n[3], size: 8 }), 0));
          show(g.at(0), () => { box(300, 10, 166, 46, { fill: P.ink, border: P.gray3 }); txt('[[01 Panorama de IA]]', 308, 18, { size: 8, color: P.mint, font: 'mono' }); txt('[[02 Prompting y…]]', 308, 34, { size: 8, color: P.mint, font: 'mono' }); });
          show(g.at(2), () => chip('vista de grafo = visualización', 380, 186, { align: 'center', fill: P.paper, size: 8 }));
          show(g.at(3), () => { box(272, 208, 194, 40, { fill: P.white }); txt('## Preguntas pendientes', 280, 214, { size: 8, color: P.blue, font: 'mono' }); txt('- [ ] ¿chunk con solape?', 280, 230, { size: 8, color: P.ink, font: 'mono' }); });
        }
      },
      {
        title: 'Plantilla de nota para cada clase',
        caption: 'Una estructura fija ayuda a que tomar notas sea un hábito rápido.',
        steps: [
          'Cabecera (frontmatter) con fecha, bloque y etiquetas: permite filtrar y buscar.',
          'Idea principal y conceptos clave, cada uno enlazado a su nota con una definición propia.',
          'Un ejemplo de tu trabajo: es lo que convierte el concepto en algo tuyo.',
          'Dudas y comprobaciones pendientes, y un enlace de vuelta al índice.'
        ],
        draw(g) {
          paper(24, 10, 300, 244, { title: 'Plantilla clase.md' });
          const L = [[{ t: '---', color: P.navy }, 0], [{ t: 'fecha: 2026-10-07', color: P.purple }, 0], [{ t: 'bloque: 02', color: P.purple }, 0], [{ t: 'tags: [master-ia, concepto]', color: P.purple }, 0], [{ t: '---', color: P.navy }, 0], [{ t: '## Idea principal', color: P.blue }, 1], [{ t: '## Conceptos clave', color: P.blue }, 1], [{ t: '- [[Contexto]]: definición propia', color: P.ink }, 1], [{ t: '## Ejemplo de mi trabajo', color: P.blue }, 2], [{ t: '## Dudas pendientes', color: P.blue }, 3], [{ t: '- [ ] …', color: P.ink }, 3], [{ t: '## Enlaces', color: P.blue }, 3], [{ t: '- [[00 Indice del Master]]', color: P.ink }, 3]];
          L.forEach((l, i) => { if (g.on(l[1])) rect(30, 30 + i * 17, 286, 16, 'rgba(247,207,90,.35)'); });
          code(L.map(l => l[0]), 36, 33, { size: 8, lh: 17 });
          const notes = [['filtrar y buscar', P.purple], ['enlazar conceptos', P.blue], ['hacerlo tuyo', P.orange], ['seguir aprendiendo', P.mint]];
          notes.forEach((n, i) => show(g.at(i), () => chip(n[0], 344, 26 + i * 54, { fill: n[1], size: 8.5, w: 122 })));
        }
      },
      {
        title: 'Grafo vistoso frente a estructura útil',
        caption: 'Lo que importa es encontrar una nota cuando la necesitas.',
        steps: [
          'Un grafo lleno de enlaces por palabras sueltas parece impresionante…',
          '…pero encontrar una nota concreta cuesta minutos.',
          'Una estructura sencilla —índice → bloque → concepto— la encuentra en segundos.',
          'Enlaza por relaciones de trabajo («verifica», «alimenta», «aplica»), no solo porque dos notas compartan una palabra.'
        ],
        draw(g) {
          show(g.at(0), () => {
            card(14, 14, 218, 196, 'GRAFO VISTOSO', P.red);
            const pts = []; for (let i = 0; i < 22; i++) pts.push([30 + rnd(i * 3) * 186, 40 + rnd(i * 7 + 1) * 120]);
            for (let i = 0; i < 40; i++) { const a = pts[Math.floor(rnd(i * 5) * 22)], b = pts[Math.floor(rnd(i * 9 + 2) * 22)]; line(a[0], a[1], b[0], b[1], P.gray3, 1); }
            pts.forEach(p => dot(p[0], p[1], P.purple, 2.5));
          });
          show(g.at(1), () => { icon('clock', 30, 172, 2); txt('2 min buscando…', 60, 178, { size: 9, color: P.red }); });
          show(g.at(2), () => {
            card(248, 14, 218, 196, 'ESTRUCTURA ÚTIL', P.mint);
            chip('00 ÍNDICE', 357, 40, { align: 'center', fill: P.yellow, size: 8.5 });
            line(357, 57, 300, 80, P.light); line(357, 57, 414, 80, P.light);
            chip('02 PROMPTING', 300, 80, { align: 'center', fill: P.orange, size: 7.5 }); chip('04 RAG', 414, 80, { align: 'center', fill: P.mint, size: 7.5 });
            line(300, 96, 280, 118, P.light); line(300, 96, 330, 118, P.light); line(414, 96, 414, 118, P.light);
            chip('PIEZAS', 280, 118, { align: 'center', fill: P.paper, size: 7 }); chip('VALIDAR', 336, 118, { align: 'center', fill: P.paper, size: 7 }); chip('CITAS', 414, 118, { align: 'center', fill: P.paper, size: 7 });
            icon('clock', 264, 172, 2); txt('10 s', 294, 178, { size: 9, color: P.mint });
          });
          show(g.at(3), () => banner('Enlaza por relaciones de trabajo, no por palabras sueltas', { y: 226 }));
        }
      }
    ],
    examples: [
      ['Nota de concepto', '«Ventana de contexto»: definición propia, un ejemplo de tu trabajo y enlace a [[Tokens]].'],
      ['Enlace útil', '[[Prompting]] → [[Specs]], porque una tarea repetida necesita requisitos persistentes.'],
      ['Preguntas pendientes', '- [ ] ¿Cómo elige NotebookLM qué fragmentos citar?']
    ],
    mistakes: [
      'Dedicar tiempo a decorar el grafo en lugar de escribir notas útiles.',
      'Copiar apuntes sin ejemplo propio ni definición con tus palabras.',
      'Crear enlaces entre notas solo porque comparten una palabra.'
    ],
    questions: [
      ['¿Qué enlace permitiría reutilizar mejor una nota en otro bloque?', 'Uno que exprese una relación de trabajo: por ejemplo, [[RAG]] → [[Citas]] («recuperar no basta sin comprobar el fragmento») o [[Privacidad]] → [[Fuentes]] («qué material puede incorporarse»).'],
      ['¿Por qué incluir un ejemplo de tu trabajo en cada nota?', 'Porque conecta el concepto con tu realidad, facilita recordarlo y te obliga a comprobar que lo has entendido lo bastante como para aplicarlo.'],
      ['¿Qué ventaja tiene que el vault sean archivos .md locales?', 'Son tuyos, se abren con cualquier editor, puedes hacer copias o versiones y puedes usarlos como fuente en otras herramientas, por ejemplo un cuaderno de NotebookLM.']
    ],
    quiz: [
      { q: 'Un vault de Obsidian es…', o: ['Una base de datos en la nube', 'Una carpeta de archivos Markdown', 'Un modelo de IA', 'Una red social'], c: 1, why: 'Obsidian trabaja sobre archivos .md locales.' },
      { q: '¿Cómo se crea un enlace interno?', o: ['<a href>', '[[Nombre de la nota]]', '#nota', '**nota**'], c: 1, why: 'La sintaxis wiki de doble corchete enlaza notas.' },
      { q: 'Lo más importante de un vault es…', o: ['Un grafo vistoso', 'Poder encontrar y reutilizar las notas', 'Tener muchas notas', 'Usar muchas etiquetas'], c: 1, why: 'El grafo es solo una visualización.' }
    ],
    terms: [['Vault', 'Carpeta de notas Markdown gestionada con Obsidian.'], ['Enlace interno', 'Enlace entre notas con la sintaxis [[Nombre de la nota]].'], ['Nota índice', 'Nota que organiza y enlaza las demás notas del vault.']]
  });
})();

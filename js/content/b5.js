/* Bloque 5 · ChatGPT y Claude en el entorno de trabajo */
(function () {
  'use strict';
  const D = PL.D, K = PL.K;
  const { P, rect, frame, box, card, txt, chip, arrow, path, icon, sprite, robot, person, bubble, win, msg, paper, bars, probBars, meter, stamp, table, flow, show, pop, pulse, blink, glow, sparkle, qmark, typed, lerp, ease, clamp, line, measure, rnd } = D;
  const { banner, heading, mail, axes, dot, circle, knob, tokens, badge, code, vbars, scale, ticket } = K;
  const late = a => clamp(a * 2 - 1);

  PL.block({
    id: 'b5', n: 5, short: 'ChatGPT y Claude', title: 'ChatGPT y Claude en el entorno de trabajo', hours: 4, color: '#f39ac1',
    question: '¿Qué herramienta conviene para cada tarea?',
    evidence: 'Matriz de decisión con cinco tareas reales',
    idea: 'Las herramientas cambian rápido y no hay una ganadora universal. La elección se basa en la tarea, el contexto disponible, la privacidad, la calidad comprobable y el flujo de trabajo.'
  });

  /* ------------------------------------------------------------------ */
  PL.concept({
    id: 'pregunta-correcta', block: 'b5', slide: 'S2–S3', title: 'Evitar la pregunta equivocada',
    idea: '«¿Qué herramienta es mejor?» produce opiniones de marca. La pregunta útil es: ¿qué herramienta, configuración y proceso son adecuados para esta tarea, estas fuentes, este riesgo y este equipo?',
    explain: [
      'Preguntar «¿cuál es mejor?» suele producir respuestas de marca o anécdotas. La pregunta útil incluye la tarea, las fuentes, el riesgo y el equipo, y su respuesta es condicional.',
      'Capacidades comunes que se deben evaluar: conversación y redacción; trabajo con archivos y, cuando esté disponible, imágenes, audio o datos; búsqueda o investigación web; instrucciones persistentes y proyectos; edición iterativa de documentos o código; asistentes configurados para tareas repetidas; y controles de datos, administración, permisos y conectores.',
      'Las capacidades cambian: en cada demostración hay que comprobar las funciones disponibles y no prometer características, precios, límites o políticas que puedan haber variado. Los conceptos del bloque permanecen aunque cambie la interfaz.'
    ],
    panels: [
      {
        title: '«¿Cuál es mejor?» frente a la pregunta útil',
        caption: 'Una discusión de marcas comparada con una decisión condicionada a la tarea.',
        steps: [
          '«¿Qué herramienta es mejor?» suele terminar en opiniones de marca y anécdotas.',
          'La pregunta útil: ¿qué herramienta, configuración y proceso son adecuados para esta tarea…',
          '…con estas fuentes, este riesgo y este equipo?',
          'La respuesta es condicionada, no universal: «para esta tarea, con estas fuentes, preferimos…».'
        ],
        draw(g) {
          show(g.at(0), () => {
            card(14, 14, 190, 200, '¿CUÁL ES MEJOR?', P.red);
            person(40, 130, { shirt: P.teal }); person(140, 130, { shirt: P.orange, phase: 2 });
            bubble(22, 50, 80, 36, { text: '¡A es la mejor!', tx: 52, ty: 128, size: 8.5 });
            bubble(116, 50, 80, 36, { text: '¡Qué va, B!', tx: 152, ty: 128, size: 8.5 });
            txt('opiniones y anécdotas', 109, 186, { size: 8, color: P.red, align: 'center' });
          });
          show(g.at(1), () => {
            card(222, 14, 244, 200, 'PREGUNTA ÚTIL', P.mint);
            chip('TAREA', 300, 44, { align: 'center', fill: P.orange, size: 9, w: 100 });
          });
          show(g.at(2), () => {
            chip('FUENTES', 410, 44, { align: 'center', fill: P.sky, size: 9, w: 92 });
            chip('RIESGO', 300, 72, { align: 'center', fill: P.red, size: 9, w: 100 });
            chip('EQUIPO', 410, 72, { align: 'center', fill: P.purple, size: 9, w: 92 });
            arrow(344, 96, 344, 116, { color: P.mint });
            ['herramienta', 'configuración', 'proceso'].forEach((s, i) => chip(s, 254 + i * 72, 122, { fill: P.paper, size: 8, w: 66 }));
          });
          show(g.at(3), () => { box(232, 152, 224, 50, { fill: P.yellow }); txt('«Para esta tarea, con estas fuentes y este riesgo, preferimos…»', 344, 160, { size: 8.5, color: P.ink, align: 'center', maxW: 210, font: 'sans' }); banner('Decisión condicionada, no universal', { y: 232 }); });
        }
      },
      {
        title: 'Capacidades comunes que hay que evaluar',
        caption: 'Siete capacidades presentes, con matices, en los asistentes actuales.',
        steps: [
          'Conversación y redacción; trabajo con archivos y, si está disponible, imágenes, audio o datos; búsqueda o investigación web.',
          'Instrucciones persistentes y organización por proyectos; edición iterativa de documentos o código.',
          'Asistentes configurados para tareas repetidas; controles de datos, administración, permisos y conectores.',
          'Antes de decidir: comprobar qué está disponible en tu plan y en tu organización.'
        ],
        draw(g) {
          const caps = [['chat', 'Conversación y redacción', 0], ['folder', 'Archivos, imagen, audio, datos', 0], ['globe', 'Búsqueda o investigación web', 0], ['gear', 'Instrucciones y proyectos', 1], ['pencil', 'Edición iterativa', 1], ['chip', 'Asistentes configurados', 2], ['shield', 'Datos, permisos y conectores', 2]];
          caps.forEach((c, i) => show(g.at(c[2]), () => {
            const col = i % 4, row = Math.floor(i / 4);
            const x = 14 + col * 116 + (row ? 58 : 0), y = 16 + row * 104;
            card(x, y, 104, 92, '', [P.blue, P.orange, P.sky, P.purple, P.mint, P.pink, P.teal][i], { active: g.on(c[2]) });
            icon(c[1] === 'shield' ? 'shield' : c[0], x + 40, y + 24, 2);
            txt(c[1], x + 52, y + 56, { size: 8, align: 'center', maxW: 92 });
          }));
          show(g.at(3), () => banner('Comprueba qué está disponible en tu plan y tu organización', { y: 234 }));
        }
      },
      {
        title: 'Las funciones cambian: comprueba el día de la demo',
        caption: 'Tres instantáneas ficticias de la misma herramienta en distintos meses.',
        steps: [
          'Nombres de botones, límites, precios y modelos cambian con frecuencia.',
          'Lo que hoy está en un plan puede no estar en otro, o desaparecer el mes que viene.',
          'Antes de una demostración o una decisión: comprobar interfaz, plan y política vigentes.',
          'Los conceptos (proyecto, fuente, permiso, verificación) permanecen aunque cambie la interfaz.'
        ],
        draw(g) {
          const snaps = [['ENERO', [1, 1, 0, 0]], ['JUNIO', [1, 1, 1, 0]], ['OCTUBRE', [1, 2, 1, 1]]];
          const feats = ['proyectos', 'límite de archivos', 'conectores', 'nueva función'];
          snaps.forEach((s, k) => show(g.at(Math.min(1, k)), () => {
            const x = 14 + k * 150;
            card(x, 14, 136, 150, s[0], P.navy, { titleColor: P.white });
            icon('calendar', x + 104, 20, 1);
            feats.forEach((f, i) => { const st = s[1][i]; icon(st === 0 ? 'cross' : st === 2 ? 'warn' : 'check', x + 10, 44 + i * 28, 1); txt(f, x + 28, 46 + i * 28, { size: 8.5, color: st ? P.white : P.gray3 }); });
          }));
          show(g.at(2), () => { person(404, 172, { shirt: P.pink }); icon('search', 428, 156, 2); chip('interfaz · plan · política', 300, 180, { align: 'center', fill: P.yellow, size: 9 }); });
          show(g.at(3), () => banner('Cambia la interfaz; los conceptos permanecen', { y: 220 }));
        }
      }
    ],
    examples: [
      ['Pregunta pobre', '«¿ChatGPT o Claude?»'],
      ['Pregunta útil', '«Para resumir informes de 80 páginas con citas, con documentos no confidenciales y un equipo de cinco personas, ¿qué herramienta y configuración nos sirven mejor?»'],
      ['Comprobación previa', 'Revisar el mismo día de la clase qué funciones incluye el plan que usa el alumnado.']
    ],
    mistakes: [
      'Decidir por la marca o por lo que dicen las redes.',
      'Prometer funciones o precios sin comprobarlos.',
      'Generalizar a partir de una única prueba.'
    ],
    questions: [
      ['Reformula «¿Qué IA es mejor?» como una pregunta útil para tu trabajo.', 'Ejemplo: «¿Qué herramienta y configuración nos sirven para redactar respuestas a clientes en español, usando nuestra guía de estilo, sin enviar datos personales y con revisión del responsable?».'],
      ['¿Qué capacidad es decisiva para tu caso de uso?', 'Respuesta abierta. Si trabajas con documentos, el uso de archivos y las citas; si en equipo, proyectos y permisos; si iteras un producto, la edición en un espacio separado; si hay datos sensibles, los controles de datos.'],
      ['¿Por qué no conviene memorizar la interfaz de una herramienta?', 'Porque cambia a menudo. Lo duradero es saber qué buscar: dónde se definen instrucciones, cómo se gestionan las fuentes, qué permisos hay y cómo se verifica el resultado.']
    ],
    quiz: [
      { q: 'La pregunta útil para elegir herramienta incluye…', o: ['Solo la marca', 'Tarea, fuentes, riesgo y equipo', 'El precio más bajo', 'La popularidad'], c: 1, why: 'La respuesta depende de esas condiciones.' },
      { q: 'Antes de una demo de una herramienta conviene…', o: ['Fiarse de lo que había hace un año', 'Comprobar funciones, plan y política vigentes', 'No preparar nada', 'Usar datos reales de clientes'], c: 1, why: 'Las capacidades y condiciones cambian.' },
      { q: 'Una conclusión responsable suena como…', o: ['«A es mejor siempre»', '«Para esta tarea, con estas fuentes, preferimos A»', '«Todas son iguales»', '«La más cara es mejor»'], c: 1, why: 'Es condicionada a la tarea y la evidencia.' }
    ],
    terms: [['Capacidad', 'Función que ofrece una herramienta (archivos, proyectos, edición, conectores…), sujeta a plan y configuración.']]
  });

  /* ------------------------------------------------------------------ */
  PL.concept({
    id: 'chatgpt', block: 'b5', slide: 'S4–S5', title: 'ChatGPT en un flujo de trabajo',
    idea: 'Proyectos para no repetir contexto, asistentes configurados para tareas repetibles y un espacio de edición (Canvas) para iterar sobre un documento con cambios verificables.',
    explain: [
      'Un proyecto agrupa conversaciones, instrucciones y, según la configuración, archivos relacionados con un objetivo. Buena práctica: descripción de alcance, instrucciones de estilo, fuentes permitidas y reglas sobre datos. No convierte automáticamente lo almacenado en fuente fiable: conviene indicar qué documentos prevalecen y pedir citas.',
      'Un asistente configurado (GPT personalizado) encapsula instrucciones, tono, conocimiento autorizado y, a veces, acciones. Antes de compartirlo: propósito y límites, instrucciones y fuentes, acceso a acciones externas, qué datos recibe y dónde se procesan, cómo se evalúa y quién lo actualiza.',
      'Un espacio de edición como Canvas permite trabajar sobre un documento o código sin que cada versión ocupe el chat. La regla es la de SDD: «hazlo más profesional» es poco verificable; «reduce un 20 %, conserva las tres ideas y adapta el tono a dirección comercial» se puede revisar. Memoria, tareas programadas, investigación profunda o conectores requieren evaluar privacidad y permisos.'
    ],
    panels: [
      {
        title: 'Proyecto: contexto reutilizable',
        caption: 'Un proyecto reúne alcance, instrucciones, archivos y chats de un mismo objetivo (interfaz simplificada).',
        steps: [
          'Creamos un proyecto con una descripción de alcance: «Comunicación con clientes del área de formación».',
          'Añadimos instrucciones de estilo y reglas sobre datos: qué no se puede subir ni inventar.',
          'Añadimos las fuentes permitidas e indicamos cuál prevalece si hay conflicto.',
          'Los chats del proyecto reutilizan ese contexto. Aun así: pide citas cuando el contenido importe.'
        ],
        draw(g) {
          card(14, 14, 290, 222, 'PROYECTO · COMUNICACIÓN CLIENTES', P.mint);
          const rows = [['doc', 'Alcance', 'clientes del área de formación', 0], ['gear', 'Instrucciones', 'tono cercano; respuestas de 120 palabras', 1], ['shield', 'Reglas de datos', 'sin datos personales; no inventar plazos', 1], ['folder', 'Fuentes', 'guía de estilo (prevalece) · FAQ', 2], ['chat', 'Chats', 'respuestas a consultas del día', 3]];
          rows.forEach((r, i) => show(g.at(r[3]), () => {
            const y = 40 + i * 38;
            box(24, y, 270, 32, { fill: P.gray2, shadow: false });
            icon(r[0], 30, y + 4, 2, r[0] === 'shield' ? P.mint : undefined);
            txt(r[1], 62, y + 4, { size: 8.5, color: P.yellow });
            txt(r[2], 62, y + 17, { size: 8, maxW: 224, fit: true });
          }, 4));
          show(g.at(3), () => { [0, 1, 2].forEach(i => { box(330, 40 + i * 44, 136, 34, { fill: P.white }); txt('Chat ' + (i + 1), 338, 46 + i * 44, { size: 8, color: P.ink }); bars(338, 60 + i * 44, 110, 1, { seed: i + 3 }); line(304, 196, 330, 57 + i * 44, P.mint, 1); }); chip('pide citas', 398, 182, { align: 'center', fill: P.yellow, size: 9, icon: 'link' }); });
        }
      },
      {
        title: 'Asistente configurado para tareas repetibles',
        caption: 'Un asistente que encapsula instrucciones, tono y conocimiento, y la revisión antes de compartirlo.',
        steps: [
          'Un asistente configurado encapsula instrucciones, tono, conocimiento autorizado y, a veces, acciones.',
          'Sirve para tareas repetibles: revisar documentos con una checklist, aplicar una guía de estilo, orientar sobre un proceso.',
          'Antes de compartirlo: propósito y límites, instrucciones y fuentes, acciones externas, datos que recibe y dónde se procesan…',
          '…cómo se evaluará su calidad y quién es responsable de actualizarlo.'
        ],
        draw(g) {
          show(g.at(0), () => {
            card(14, 14, 170, 210, 'ASISTENTE «REVISOR»', P.purple);
            robot(82, 38, { color: P.purple });
            ['instrucciones', 'tono', 'conocimiento', 'acciones (opc.)'].forEach((s, i) => chip(s, 99, 92 + i * 26, { align: 'center', fill: i === 3 ? P.gray3 : P.paper, size: 8, w: 130, color: i === 3 ? P.white : P.ink }));
          });
          show(g.at(1), () => {
            ['revisar con checklist', 'aplicar guía de estilo', 'orientar un proceso'].forEach((s, i) => { arrow(186, 60 + i * 30, 206, 60 + i * 30, { color: P.mint }); chip(s, 210, 52 + i * 30, { fill: P.mint, size: 8, w: 120 }); });
          });
          const checks = [['Propósito y límites', 2], ['Instrucciones y fuentes', 2], ['Acciones externas', 2], ['Datos y dónde se procesan', 2], ['Cómo se evalúa', 3], ['Responsable de actualizar', 3]];
          show(g.at(2), () => card(340, 14, 126, 210, 'ANTES DE COMPARTIR', P.yellow, { size: 7.5 }));
          checks.forEach((c, i) => show(g.at(c[1]), () => { icon('check', 348, 42 + i * 30, 1); txt(c[0], 364, 43 + i * 30, { size: 7.5, maxW: 96 }); }, 3));
        }
      },
      {
        title: 'Canvas: editar el documento, no la conversación',
        caption: 'Un espacio de edición lateral y dos formas de pedir un cambio.',
        steps: [
          'El documento se abre en un espacio propio, junto al chat. Cada versión no ocupa la conversación entera.',
          'Petición vaga: «Hazlo más profesional». ¿Qué cambia exactamente? Difícil de revisar.',
          'Petición verificable: «Reduce el texto un 20 %, conserva las tres ideas y adapta el tono a dirección comercial».',
          'Ahora se puede comprobar: longitud, tres ideas presentes y tono. La misma regla que en SDD.'
        ],
        draw(g) {
          const w = win(14, 12, 452, 230, 'Chat + espacio de edición');
          box(w.x, w.y, 130, 204, { fill: P.gray2, shadow: false });
          show(g.at(1), () => { msg(w.x + 6, w.y + 8, 118, '«Hazlo más profesional»', { who: 'user', fill: P.red, size: 7.5 }); qmark(w.x + 100, w.y + 40, P.red, 1); });
          show(g.at(2), () => msg(w.x + 6, w.y + 66, 118, '«Reduce un 20 %, conserva las 3 ideas y tono para dirección comercial»', { who: 'user', fill: P.mint, size: 7.5 }));
          show(g.at(0), () => {
            box(w.x + 140, w.y, 300, 204, { fill: P.white, shadow: false });
            txt('Propuesta de formación', w.x + 150, w.y + 8, { size: 10, color: P.ink, font: 'sans' });
            const L = g.from(2) ? 6 : 8;
            for (let i = 0; i < L; i++) rect(w.x + 150, w.y + 30 + i * 13, 240 + rnd(i) * 30, 5, i === 1 || i === 3 || i === 5 ? P.sky : P.light);
          });
          show(g.at(3), () => { ['−20 % ✓', '3 ideas ✓', 'tono ✓'].forEach((s, i) => chip(s, w.x + 150 + i * 92, w.y + 170, { fill: P.mint, size: 8.5, w: 84 })); });
        }
      },
      {
        title: 'Otras funciones, las mismas preguntas',
        caption: 'Funciones útiles que exigen evaluar privacidad y permisos antes de activarlas.',
        steps: [
          'Memoria, tareas programadas, investigación profunda, análisis de archivos y conectores pueden ser muy útiles…',
          '…pero cada una amplía qué datos se guardan o a qué sistemas se accede.',
          'La comodidad de conectar una fuente no elimina la pregunta: ¿quién tiene autorización para verla?'
        ],
        draw(g) {
          const f = [['gear', 'Memoria'], ['clock', 'Tareas programadas'], ['search', 'Investigación profunda'], ['doc', 'Análisis de archivos'], ['plug', 'Conectores']];
          f.forEach((it, i) => show(g.at(0), () => {
            const x = 14 + i * 92;
            card(x, 20, 84, 110, '', P.blue);
            icon(it[0], x + 30, 40, 2);
            txt(it[1], x + 42, 74, { size: 8, align: 'center', maxW: 76 });
            show(g.at(1), () => { icon('lock', x + 34, 100, 1.5, P.yellow); }, 0);
          }, 4));
          show(g.at(1), () => txt('más datos guardados · más sistemas accesibles', 240, 146, { size: 9, color: P.yellow, align: 'center' }));
          show(g.at(2), () => { person(60, 170, { shirt: P.teal }); bubble(100, 168, 300, 40, { text: '¿Quién tiene autorización para ver esta información?', tx: 92, ty: 186, size: 9.5 }); });
        }
      }
    ],
    examples: [
      ['Proyecto', '«Asignatura Fundamentos de IA»: instrucciones de formato, apuntes como fuente principal y chats de repaso.'],
      ['Asistente configurado', 'Un revisor de correos a clientes que aplica la guía de estilo y señala datos que faltan.'],
      ['Canvas', 'Iterar una propuesta comercial pidiendo cambios localizados y verificables.']
    ],
    mistakes: [
      'Subir al proyecto documentos sin autorización «porque es privado».',
      'Compartir un asistente configurado sin revisar qué datos recibe o qué acciones puede ejecutar.',
      'Pedir cambios vagos en el espacio de edición.'
    ],
    questions: [
      ['¿Qué archivo no deberías subir aunque el proyecto sea privado?', 'Datos personales, secretos, contratos completos o cualquier información sin autorización para esa herramienta. «Privado» en la interfaz no significa autorizado por la organización.'],
      ['¿Qué cambio pertenece a la configuración del asistente y cuál al documento actual?', '«Responde siempre con estructura ejecutiva» es configuración (persistente). «Acorta este párrafo y conserva las cifras» es una edición puntual del documento.'],
      ['Escribe una petición verificable para mejorar un informe en un espacio de edición.', 'Ejemplo: «Reduce la introducción a 80 palabras, mantén las tres conclusiones con sus cifras y sustituye los tecnicismos por lenguaje para dirección».']
    ],
    quiz: [
      { q: 'Un proyecto en ChatGPT sirve para…', o: ['Entrenar un modelo nuevo', 'Agrupar conversaciones, instrucciones y archivos de un mismo objetivo', 'Compartir datos sin control', 'Publicar en internet'], c: 1, why: 'Evita repetir el contexto en cada chat.' },
      { q: '¿Qué conviene revisar antes de compartir un asistente configurado?', o: ['Solo el nombre', 'Propósito, fuentes, acciones, datos, evaluación y responsable', 'El color del icono', 'Nada'], c: 1, why: 'Es un producto que otras personas usarán.' },
      { q: 'Una petición verificable para Canvas es…', o: ['«Mejóralo»', '«Reduce un 20 %, conserva las 3 ideas y tono para dirección comercial»', '«Hazlo más bonito»', '«Más profesional»'], c: 1, why: 'Permite comprobar si se cumplió.' }
    ],
    terms: [['Proyecto', 'Espacio que agrupa conversaciones, instrucciones y archivos de un mismo objetivo.'], ['GPT personalizado / asistente configurado', 'Asistente con instrucciones, tono, conocimiento y, a veces, acciones predefinidas para una tarea repetible.'], ['Canvas', 'Espacio de edición lateral de ChatGPT para trabajar sobre documentos o código.']]
  });

  /* ------------------------------------------------------------------ */
  PL.concept({
    id: 'claude', block: 'b5', slide: 'S6–S7', title: 'Claude en un flujo de trabajo',
    idea: 'Proyectos para agrupar instrucciones y conocimiento con visibilidad controlada, y artifacts para iterar sobre un producto reconocible con una revisión controlada.',
    explain: [
      'El patrón de proyecto en Claude cumple la misma necesidad: agrupar un ámbito de trabajo con instrucciones y material de referencia, por ejemplo una asignatura, un cliente o un proceso, siempre que los datos estén autorizados y se compruebe qué se comparte y con quién.',
      'Los artifacts son resultados sustanciales que se muestran en un espacio separado del chat: un documento, una página web, un gráfico o código. Revisión controlada: definir la spec, generar una primera versión, comprobar tres criterios, pedir solo los cambios necesarios y comprobar que el cambio no estropeó otros criterios.',
      'El comportamiento de los modelos varía según idioma, tarea, longitud o versión. En lugar de afirmar que una herramienta siempre es mejor para textos o código, se compara una muestra real con el mismo encargo, las mismas fuentes y la misma rúbrica.'
    ],
    panels: [
      {
        title: 'Proyecto: instrucciones, conocimiento y conversaciones',
        caption: 'Tres módulos y un control de visibilidad (interfaz simplificada).',
        steps: [
          'Instrucciones del proyecto: el comportamiento común (formato, tono, qué evitar).',
          'Conocimiento: documentos autorizados que sirven de referencia.',
          'Conversaciones: cada chat del proyecto parte de ese contexto.',
          'Visibilidad: decide quién puede ver o editar el proyecto, y retira el acceso cuando termine.'
        ],
        draw(g) {
          const mods = [['INSTRUCCIONES', 'gear', 'formato, tono, límites', P.blue], ['CONOCIMIENTO', 'folder', 'documentos autorizados', P.orange], ['CONVERSACIONES', 'chat', 'chats con ese contexto', P.purple]];
          mods.forEach((m, i) => show(g.at(i), () => {
            const x = 14 + i * 156;
            card(x, 20, 140, 120, m[0], m[3], { active: g.on(i) });
            icon(m[1], x + 52, 48, 3);
            txt(m[2], x + 70, 96, { size: 8.5, align: 'center', maxW: 126 });
            if (i < 2) arrow(x + 142, 80, x + 154, 80, { color: P.mint });
          }));
          show(g.at(3), () => {
            box(14, 156, 452, 80, { fill: P.gray2 });
            icon('shield', 26, 176, 3, P.mint);
            txt('VISIBILIDAD DEL PROYECTO', 72, 168, { size: 9, color: P.mint });
            [['solo yo', true], ['mi equipo: leer', true], ['mi equipo: editar', false], ['enlace público', false]].forEach((v, i) => { box(72 + i * 96, 188, 88, 24, { fill: v[1] ? P.mint : P.gray3, shadow: false }); txt(v[0], 116 + i * 96, 195, { size: 8, color: P.ink, align: 'center', maxW: 80, fit: true }); });
          });
        }
      },
      {
        title: 'Artifacts: iterar sobre un producto',
        caption: 'Un resultado en un espacio propio y una revisión controlada en cinco pasos.',
        steps: [
          'Definimos la spec y generamos una primera versión: aparece como un artifact, separado del chat.',
          'Comprobamos tres criterios. Uno falla: la tabla no muestra la fecha.',
          'Pedimos solo el cambio necesario: «Añade la columna fecha; no cambies nada más».',
          'v2: comprobamos el criterio corregido… y que el cambio no ha estropeado los otros dos.'
        ],
        draw(g) {
          box(14, 14, 120, 222, { fill: P.gray2 });
          txt('CHAT', 74, 22, { size: 8, color: P.light, align: 'center' });
          show(g.at(0), () => msg(20, 40, 108, 'Genera la tabla de seguimiento según la spec', { who: 'user', size: 7.5 }));
          show(g.at(2), () => msg(20, 100, 108, '«Añade la columna fecha; no cambies nada más»', { who: 'user', size: 7.5, fill: P.yellow }));
          show(g.at(0), () => {
            const v2 = g.from(3);
            const c = win(146, 14, 196, 160, 'Artifact · ' + (v2 ? 'v2' : 'v1'), { fill: P.white });
            table(c.x, c.y, v2 ? [64, 60, 60] : [92, 92], [v2 ? ['Tarea', 'Resp.', 'Fecha'] : ['Tarea', 'Resp.'], v2 ? ['Revisar', 'Ana', '14/10'] : ['Revisar', 'Ana'], v2 ? ['Enviar', 'Luis', '17/10'] : ['Enviar', 'Luis']], { rh: 22, size: 7.5, leftFirst: false });
            if (v2) glow(c.x + 124, c.y, 60, 66, P.mint);
          });
          const crit = [['Tareas y responsables', true, true], ['Columna de fecha', false, true], ['Máximo 10 filas', true, true]];
          show(g.at(1), () => {
            card(354, 14, 112, 160, 'CRITERIOS', P.mint, { size: 8 });
            crit.forEach((c, i) => { const ok = g.from(3) ? c[2] : c[1]; icon(ok ? 'check' : 'cross', 360, 42 + i * 40, 1); txt(c[0], 376, 43 + i * 40, { size: 7.5, maxW: 84 }); });
          });
          show(g.at(3), () => banner('Cambio mínimo · sin romper lo que ya funcionaba', { y: 190, x: 146, w: 320, size: 8.5 }));
        }
      },
      {
        title: 'Texto largo y código: qué comprobar',
        caption: 'Criterios de revisión distintos para cada tipo de resultado.',
        steps: [
          'Texto largo: fidelidad a las fuentes, estructura, omisiones, tono y citas.',
          'Código: requisitos, pruebas, seguridad, legibilidad y comportamiento ejecutable; no basta con que «parezca correcto».',
          'Y no afirmes que una herramienta «siempre» es mejor para algo: compara una muestra real con el mismo encargo y la misma rúbrica.'
        ],
        draw(g) {
          show(g.at(0), () => {
            card(14, 14, 218, 196, 'TEXTO LARGO', P.orange, { active: g.on(0) });
            ['Fidelidad a las fuentes', 'Estructura', 'Omisiones', 'Tono', 'Citas'].forEach((s, i) => { icon('check', 24, 44 + i * 30, 1); txt(s, 42, 45 + i * 30, { size: 9.5 }); });
          });
          show(g.at(1), () => {
            card(248, 14, 218, 196, 'CÓDIGO', P.blue, { active: g.on(1) });
            ['Cumple los requisitos', 'Pasa las pruebas', 'Seguridad', 'Legibilidad', 'Se ejecuta como se espera'].forEach((s, i) => { icon('check', 258, 44 + i * 30, 1); txt(s, 276, 45 + i * 30, { size: 9.5 }); });
          });
          show(g.at(2), () => banner('Compara con la misma muestra y la misma rúbrica', { y: 226 }));
        }
      }
    ],
    examples: [
      ['Proyecto de asignatura', 'Instrucciones de formato, apuntes como conocimiento y visibilidad solo para el grupo.'],
      ['Artifact', 'Una página web sencilla que se itera con cambios mínimos y se revisa contra la spec.'],
      ['Revisión de código', 'Ejecutar pruebas antes de aceptar una función generada.']
    ],
    mistakes: [
      'Iterar en el chat con mensajes interminables en lugar de sobre el producto.',
      'Pedir varios cambios a la vez y no comprobar si se rompió algo.',
      'Afirmar que una herramienta es «la mejor para código» sin comparar.'
    ],
    questions: [
      ['¿Qué permiso mínimo necesitaría un compañero para revisar el resultado de un proyecto?', 'Normalmente lectura o comentario. No necesita editar el conocimiento ni cambiar las instrucciones si solo va a revisar la salida. Principio: el menor acceso suficiente.'],
      ['¿Qué criterio usarías antes de compartir un artifact?', 'Que cumple la spec, que los datos y afirmaciones importantes están verificados, que se entiende en el dispositivo donde se verá y que no expone datos sensibles ni ejecuta acciones sin revisión.'],
      ['¿Por qué comprobar los otros criterios tras un cambio aparentemente pequeño?', 'Porque al regenerar, el modelo puede alterar partes que ya estaban bien (regresión). Comprobarlo evita perder calidad sin darse cuenta.']
    ],
    quiz: [
      { q: 'Un artifact es…', o: ['Un error del modelo', 'Un resultado sustancial mostrado en un espacio separado del chat', 'Un tipo de token', 'Un permiso'], c: 1, why: 'Documento, web, gráfico o código sobre el que se itera.' },
      { q: 'En la revisión controlada, tras pedir un cambio hay que…', o: ['Publicar directamente', 'Comprobar que el cambio no estropeó otros criterios', 'Borrar la versión anterior', 'Cambiar de herramienta'], c: 1, why: 'Evita regresiones.' },
      { q: 'Para revisar código generado, lo más importante es…', o: ['Que parezca correcto', 'Requisitos, pruebas, seguridad y comportamiento ejecutable', 'Que sea largo', 'Que tenga comentarios'], c: 1, why: 'Hay que comprobar que funciona y es seguro.' }
    ],
    terms: [['Artifact', 'Resultado sustancial (documento, web, gráfico, código) que Claude muestra en un espacio separado del chat.'], ['Regresión', 'Empeoramiento de algo que antes funcionaba, causado por un cambio.']]
  });

  /* ------------------------------------------------------------------ */
  PL.concept({
    id: 'comparar', block: 'b5', slide: 'S8–S10', title: 'Comparar herramientas de manera responsable',
    idea: 'Una comparación justa usa la misma tarea, el mismo material, el mismo prompt y la misma rúbrica. La conclusión se expresa con condiciones: una sola prueba no demuestra superioridad universal.',
    explain: [
      'Actividad: cada grupo prueba la misma tarea en dos herramientas con el mismo material y un prompt idéntico. Tareas posibles: resumir un documento largo con citas, redactar un correo bajo restricciones, transformar una tabla en conclusiones prudentes, crear una imagen para una presentación, generar o revisar código pequeño, o diseñar una guía de estudio desde fuentes propias.',
      'Matriz de comparación: cumple el objetivo, respeta formato y límites, usa correctamente las fuentes, calidad de tono o estructura, errores o invenciones, facilidad de iteración, adecuación de privacidad y equipo, y decisión justificada, siempre con evidencia.',
      'No se usa información confidencial ni se asume que los planes gratuitos tengan las mismas funciones. La conclusión se formula así: «para esta tarea, con estas fuentes y este criterio, preferimos…».'
    ],
    panels: [
      {
        title: 'Una comparación justa',
        caption: 'Lo que debe mantenerse igual para que la comparación diga algo.',
        steps: [
          'Misma tarea y mismo material de entrada para las dos herramientas.',
          'Prompt idéntico, copiado tal cual.',
          'Misma rúbrica para puntuar los dos resultados.',
          'Sin información confidencial. Y ojo: los planes gratuitos no siempre incluyen las mismas funciones.'
        ],
        draw(g) {
          const same = [['MISMA TAREA Y MATERIAL', 'doc', 0], ['MISMO PROMPT', 'chat', 1], ['MISMA RÚBRICA', 'list', 2]];
          same.forEach((s, i) => show(g.at(s[2]), () => { const y = 20 + i * 62; card(170, y, 140, 50, s[0], P.yellow, { size: 7.5, active: g.on(s[2]) }); icon(s[1], 228, y + 22, 1.5); arrow(168, y + 25, 120, y + 25 + (i - 1) * 8, { color: P.sky }); arrow(312, y + 25, 360, y + 25 + (i - 1) * 8, { color: P.pink }); }));
          card(14, 30, 100, 150, 'HERRAMIENTA A', P.sky, { size: 7.5 }); robot(48, 70, { color: P.sky });
          card(366, 30, 100, 150, 'HERRAMIENTA B', P.pink, { size: 7.5 }); robot(400, 70, { color: P.pink, phase: 2 });
          show(g.at(3), () => { chip('sin datos confidenciales', 130, 214, { align: 'center', fill: P.mint, size: 8.5, icon: 'shield', iconTint: P.ink }); chip('¿mismo plan y funciones?', 350, 214, { align: 'center', fill: P.yellow, size: 8.5, icon: 'warn' }); });
        }
      },
      {
        title: 'La matriz de comparación',
        caption: 'Cada criterio se puntúa con evidencia, no con impresiones.',
        steps: [
          'Criterios de resultado: cumple el objetivo, respeta formato y límites, usa bien las fuentes.',
          'Criterios de calidad: tono y estructura, errores o invenciones detectados.',
          'Criterios de uso: facilidad para iterar, adecuación a la privacidad y al equipo.',
          'Cada celda va acompañada de su evidencia. Y al final, una decisión justificada.'
        ],
        draw(g) {
          const rows = [['Cumple el objetivo', '✓', '✓', 'ambos'], ['Formato y límites', '✗', '✓', 'A: 310 palabras'], ['Uso de fuentes', '✓', '✓', 'citas abiertas'], ['Tono y estructura', '✓', 'medio', 'B: algo rígido'], ['Errores o invenciones', '1', '0', 'A inventa una fecha'], ['Facilidad de iteración', '✓', '✓', '—'], ['Privacidad y equipo', '✓', '✗', 'B no aprobada']];
          const st = [0, 0, 0, 1, 1, 2, 2];
          table(14, 14, [150, 50, 50, 202], [['Criterio', 'A', 'B', 'Evidencia']], { rh: 22 });
          rows.forEach((r, i) => show(g.at(st[i]), () => {
            const col = v => v === '✓' || v === '0' ? P.mint : v === '✗' || v === '1' ? P.red : P.yellow;
            table(14, 36 + i * 24, [150, 50, 50, 202], [[r[0], { t: r[1], color: col(r[1]) }, { t: r[2], color: col(r[2]) }, { t: r[3], color: P.light }]], { rh: 24, head: false });
          }, 0));
          show(g.at(3), () => { box(14, 210, 452, 32, { fill: P.yellow }); txt('Decisión: A para esta tarea (B no está aprobada para estos datos), con revisión de fechas.', 240, 220, { size: 8.5, color: P.ink, align: 'center', maxW: 440, fit: true, font: 'sans' }); });
        }
      },
      {
        title: 'Conclusión condicionada',
        caption: 'Dos formas de comunicar el resultado de la comparación.',
        steps: [
          'Conclusión típica: «B es mejor que A». Generaliza a partir de una sola prueba.',
          'Conclusión responsable: «Para resumir informes largos con citas, con estas fuentes y esta rúbrica, preferimos B».',
          'Una sola prueba no demuestra superioridad universal: cambia la tarea, el idioma o la versión y el resultado puede cambiar.'
        ],
        draw(g) {
          show(g.at(0), () => { card(14, 20, 452, 70, 'GENERALIZA', P.red); txt('«B es mejor que A.»', 240, 50, { size: 13, align: 'center', font: 'sans' }); icon('cross', 430, 46, 2); });
          show(g.at(1), () => { card(14, 104, 452, 80, 'CONDICIONADA', P.mint); txt('«Para resumir informes largos con citas, con estas fuentes y esta rúbrica, preferimos B.»', 230, 128, { size: 10, align: 'center', maxW: 400, font: 'sans' }); icon('check', 430, 134, 2); });
          show(g.at(2), () => banner('Una prueba ≠ superioridad universal', { y: 204 }));
        }
      },
      {
        title: 'Seis tareas para comparar en grupo',
        caption: 'Encargos sugeridos para la actividad comparativa del bloque.',
        steps: [
          'Resumir un documento largo con citas. Redactar un correo para un cliente bajo restricciones.',
          'Transformar una tabla de datos en conclusiones prudentes. Crear una imagen para una presentación con una consigna clara.',
          'Generar o revisar una pieza pequeña de código. Diseñar una guía de estudio desde fuentes propias.'
        ],
        draw(g) {
          const t = [['book', 'Resumir un documento largo con citas'], ['mail', 'Correo a cliente con restricciones'], ['list', 'Tabla → conclusiones prudentes'], ['image', 'Imagen para una presentación'], ['chip', 'Generar o revisar código pequeño'], ['folder', 'Guía de estudio desde fuentes propias']];
          t.forEach((it, i) => show(g.at(Math.floor(i / 2)), () => {
            const x = 14 + (i % 2) * 232, y = 16 + Math.floor(i / 2) * 76;
            box(x, y, 220, 66, { fill: P.gray2 });
            badge(i + 1, x + 8, y + 8, P.pink);
            icon(it[0], x + 14, y + 30, 2);
            txt(it[1], x + 50, y + 22, { size: 9.5, maxW: 160 });
          }));
        }
      }
    ],
    examples: [
      ['Comparación justa', 'Mismo PDF, mismo prompt y misma rúbrica en dos asistentes; se anotan las citas incorrectas de cada uno.'],
      ['Matriz', 'Siete criterios con evidencia por celda y una decisión final condicionada.'],
      ['Conclusión', '«Para correos a clientes en español con nuestra guía, preferimos A; para resúmenes largos con citas, B».']
    ],
    mistakes: [
      'Cambiar el prompt entre una herramienta y otra.',
      'Puntuar por impresión sin anotar evidencia.',
      'Concluir «X es mejor» a partir de una única prueba.'
    ],
    questions: [
      ['¿Qué sería una comparación justa entre dos asistentes?', 'La misma tarea, el mismo material de entrada, el mismo prompt, la misma rúbrica y, a ser posible, planes comparables. Y anotar la evidencia de cada puntuación.'],
      ['¿Por qué incluir «privacidad y equipo» en la matriz?', 'Porque una herramienta excelente puede no estar autorizada para tus datos o no permitir colaborar como necesita el equipo; eso puede decidir la elección.'],
      ['Redacta una conclusión condicionada para una comparación que hayas hecho o imagines.', 'Ejemplo: «Para generar borradores de correo a clientes en español con nuestra guía de estilo y sin datos personales, preferimos A, porque respetó la longitud en 5 de 5 casos y B en 3 de 5».']
    ],
    quiz: [
      { q: 'En una comparación justa debe mantenerse igual…', o: ['Solo la tarea', 'Tarea, material, prompt y rúbrica', 'El color de la interfaz', 'Nada'], c: 1, why: 'Si cambian, no se sabe qué causó la diferencia.' },
      { q: 'Cada celda de la matriz debería ir acompañada de…', o: ['Una opinión', 'Evidencia', 'Un emoji', 'El precio'], c: 1, why: 'La decisión se apoya en evidencia, no en impresiones.' },
      { q: 'Una sola prueba en la que gana B demuestra…', o: ['Que B es mejor siempre', 'Que B fue mejor en esa tarea, con esas condiciones', 'Que A no sirve', 'Nada en absoluto'], c: 1, why: 'La conclusión es condicionada.' }
    ],
    terms: [['Rúbrica', 'Conjunto de criterios con los que se puntúa un resultado.'], ['Matriz de decisión', 'Tabla que compara opciones según criterios y evidencia.']]
  });

  /* ------------------------------------------------------------------ */
  PL.concept({
    id: 'organizacion', block: 'b5', slide: 'S11–S12', title: 'Uso en la organización: datos, conectores y MCP',
    idea: 'Los planes personales y los espacios corporativos difieren en administración, retención de datos, accesos y conectores. Un conector amplía la utilidad… y también la superficie de riesgo.',
    explain: [
      'Los planes personales y los espacios corporativos pueden diferir en límites, administración, retención de datos, controles de acceso, conectores, soporte y condiciones de uso. Antes de contratar o desplegar una herramienta conviene hablar con seguridad, privacidad, compras y TI.',
      'Siete preguntas antes de usar IA con información de empresa: qué datos se enviarán y si son necesarios; si hay autorización para esa herramienta y esos datos; quién accede al contenido y a los resultados; si se usan para entrenar, retener o mejorar el servicio según el plan; si se pueden revocar accesos, borrar contenido y auditar el uso; qué conector o acción externa puede leer o modificar información; y qué supervisión humana hay antes de que una salida afecte a un cliente o proceso.',
      'Un conector permite usar información o acciones de otros sistemas. El Model Context Protocol (MCP) es un estándar para conectar modelos o agentes con herramientas y fuentes externas. Dos ideas: amplía la utilidad y amplía la superficie de riesgo. Permisos, alcance y trazabilidad importan tanto como la calidad del modelo.'
    ],
    panels: [
      {
        title: 'Uso personal frente a espacio de organización',
        caption: 'Diferencias habituales (varían según proveedor y plan; compruébalas siempre).',
        steps: [
          'Un plan personal y un espacio corporativo pueden diferir en límites y administración…',
          '…en retención de datos y controles de acceso…',
          '…y en conectores, soporte y condiciones de uso.',
          'Antes de contratar o desplegar: seguridad, privacidad, compras y TI.'
        ],
        draw(g) {
          const rows = [['Límites de uso', 'según tu plan', 'acordados en contrato', 0], ['Administración', 'tú', 'administradores', 0], ['Retención de datos', 'condiciones del plan', 'política corporativa', 1], ['Controles de acceso', 'tu cuenta', 'roles y grupos', 1], ['Conectores', 'los que actives', 'aprobados por TI', 2], ['Soporte y condiciones', 'estándar', 'contrato y soporte', 2]];
          table(14, 14, [170, 140, 142], [['Aspecto', 'Personal (habitual)', 'Organización (habitual)']], { rh: 22 });
          rows.forEach((r, i) => show(g.at(r[3]), () => table(14, 36 + i * 26, [170, 140, 142], [[r[0], { t: r[1], color: P.light }, { t: r[2], color: P.mint }]], { rh: 26, head: false }), 0));
          show(g.at(3), () => { ['seguridad', 'privacidad', 'compras', 'TI'].forEach((s, i) => { person(40 + i * 110, 196, { shirt: [P.red, P.purple, P.yellow, P.blue][i], s: 1, phase: i }); txt(s, 66 + i * 110, 206, { size: 9 }); }); });
        }
      },
      {
        title: 'Siete preguntas antes de usar IA con información de empresa',
        caption: 'Una puerta que solo se abre si todas tienen respuesta.',
        steps: [
          '¿Qué datos se enviarán y son necesarios? ¿Existe autorización para esta herramienta con esos datos?',
          '¿Quién puede acceder al contenido y a los resultados? ¿Se usan para entrenar, retener o mejorar el servicio según el plan?',
          '¿Se pueden revocar accesos, borrar contenido y auditar el uso? ¿Qué conector o acción externa puede leer o modificar información?',
          '¿Qué supervisión humana hay antes de que una salida afecte a un cliente o proceso?'
        ],
        draw(g) {
          const q = [['¿Qué datos y son necesarios?', 0], ['¿Hay autorización?', 0], ['¿Quién accede?', 1], ['¿Entrenamiento o retención?', 1], ['¿Revocar, borrar, auditar?', 2], ['¿Qué conectores o acciones?', 2], ['¿Qué supervisión humana?', 3]];
          q.forEach((it, i) => show(g.at(it[1]), () => { const y = 14 + i * 32; box(14, y, 300, 26, { fill: P.gray2, shadow: false }); badge(i + 1, 20, y + 6, P.pink); txt(it[0], 42, y + 8, { size: 9, maxW: 250, fit: true }); icon('check', 294, y + 7, 1); }, 4));
          const open = g.at(3);
          rect(340, 30, 120, 200, P.gray);
          frame(340, 30, 120, 200, P.ink, 3);
          rect(343, 33, 57 * (1 - open) + 0.5, 194, P.navy); rect(457 - 57 * (1 - open), 33, 57 * (1 - open), 194, P.navy);
          icon(open > 0.5 ? 'check' : 'lock', 388, 116, 2, open > 0.5 ? P.mint : P.yellow);
          txt('información de empresa', 400, 238, { size: 7.5, align: 'center', color: P.light });
        }
      },
      {
        title: 'Conectores y MCP: más alcance, más superficie de riesgo',
        caption: 'Cada conexión añade información o acciones… y una puerta más que vigilar.',
        steps: [
          'Un asistente sin conectores solo trabaja con lo que le das en la conversación.',
          'Los conectores le dan acceso a otros sistemas: archivos, correo, calendario, gestor de clientes. MCP es un estándar para esas conexiones.',
          'Cada conexión amplía la utilidad… y la superficie de riesgo: qué puede leer, qué puede modificar.',
          'Permisos, alcance y trazabilidad importan tanto como la calidad del modelo.'
        ],
        draw(g) {
          const cx = 240, cy = 124;
          const risk = g.at(2);
          if (risk > 0) { circle(cx, cy, Math.round(40 + 70 * risk), 'rgba(239,90,90,.12)'); circle(cx, cy, Math.round(30 + 50 * risk), 'rgba(239,90,90,.12)'); }
          robot(cx - 16, cy - 22, { color: P.purple });
          const sys = [['folder', 'Archivos', -150, -70], ['mail', 'Correo', 150, -70], ['calendar', 'Calendario', -150, 60], ['db', 'Clientes (CRM)', 150, 60]];
          sys.forEach((s, i) => show(g.at(1), () => {
            const x = cx + s[2], y = cy + s[3];
            line(cx, cy, x, y, P.mint, 2, true);
            box(x - 46, y - 24, 92, 48, { fill: P.gray2 });
            icon(s[0], x - 12, y - 18, 2);
            txt(s[1], x, y + 10, { size: 8, align: 'center' });
            rect(lerp(cx, x, 0.5) - 5, lerp(cy, y, 0.5) - 5, 10, 10, P.yellow);
          }));
          show(g.at(1), () => chip('MCP: estándar de conexión', cx, 220, { align: 'center', fill: P.yellow, size: 8.5, icon: 'plug', iconTint: P.ink }));
          show(g.at(2), () => { txt('superficie de riesgo', cx, 22, { size: 9, color: P.red, align: 'center' }); });
          show(g.at(3), () => banner('Permisos · alcance · trazabilidad', { y: 242, h: 22 }));
        }
      },
      {
        title: 'Permiso mínimo y revisión de acciones',
        caption: 'La misma tarea con un acceso amplio y con el acceso mínimo necesario.',
        steps: [
          'Tarea: «Resume los correos del proyecto Alfa de esta semana».',
          'Acceso excesivo: leer, enviar y borrar en todo el buzón. Mucho más de lo necesario.',
          'Permiso mínimo: solo lectura y solo la carpeta del proyecto. Suficiente para resumir.',
          'Si el asistente propone una acción (enviar una respuesta), una persona la revisa y confirma antes de ejecutarla.'
        ],
        draw(g) {
          show(g.at(0), () => { box(60, 12, 360, 30, { fill: P.blue }); txt('«Resume los correos del proyecto Alfa de esta semana»', 240, 20, { size: 9.5, color: P.ink, align: 'center', font: 'sans' }); });
          show(g.at(1), () => {
            card(14, 56, 218, 120, 'ACCESO EXCESIVO', P.red, { active: g.on(1) });
            ['leer todo', 'enviar', 'borrar'].forEach((s, i) => chip(s, 24 + i * 70, 84, { fill: P.red, size: 8, w: 64 }));
            icon('mail', 40, 116, 3); txt('todo el buzón', 120, 126, { size: 9, color: P.red });
            icon('cross', 196, 148, 2);
          });
          show(g.at(2), () => {
            card(248, 56, 218, 120, 'PERMISO MÍNIMO', P.mint, { active: g.on(2) });
            chip('solo lectura', 258, 84, { fill: P.mint, size: 8, w: 90 });
            icon('folder', 270, 112, 3); txt('carpeta «Alfa»', 350, 126, { size: 9, color: P.mint });
            icon('check', 430, 148, 2);
          });
          show(g.at(3), () => {
            box(14, 188, 452, 54, { fill: P.gray2 });
            robot(24, 196, { s: 1, color: P.purple });
            chip('Acción propuesta: enviar respuesta al cliente', 48, 198, { fill: P.yellow, size: 8.5 });
            arrow(300, 206, 330, 206, { color: P.yellow });
            person(340, 192, { s: 1, shirt: P.teal });
            chip('revisar y confirmar', 362, 198, { fill: P.mint, size: 8.5, icon: 'check', iconTint: P.ink });
            txt('ninguna acción externa sin revisión humana', 240, 226, { size: 8, color: P.light, align: 'center' });
          });
        }
      }
    ],
    examples: [
      ['Conector de archivos', 'Acceso de lectura a una carpeta concreta, no a toda la unidad compartida.'],
      ['Acción con confirmación', 'El asistente prepara el borrador del correo; una persona lo revisa y lo envía.'],
      ['Gobierno', 'Revisar con TI qué conectores están aprobados y con qué permisos.']
    ],
    mistakes: [
      'Conceder permisos globales «para que funcione».',
      'Permitir acciones externas sin confirmación humana.',
      'Usar una cuenta personal con información de la empresa.'
    ],
    questions: [
      ['¿Qué condiciones deben cumplirse antes de conectar una herramienta a datos de empresa?', 'Que esté autorizada para ese tipo de datos, que el acceso sea el mínimo necesario, que se sepa quién ve qué, cómo se retienen y borran los datos, que se pueda auditar y revocar, y que haya supervisión humana antes de cualquier acción con impacto.'],
      ['¿Cuál es el permiso mínimo necesario para resumir los correos de un proyecto?', 'Lectura, limitada a la carpeta o etiqueta del proyecto y al periodo necesario. No hace falta enviar, borrar ni leer el resto del buzón.'],
      ['¿Qué parte del flujo debe seguir siendo humana aunque la herramienta sea muy buena?', 'Definir el problema, autorizar los datos, verificar lo relevante y decidir o confirmar las acciones que afectan a clientes, procesos o personas.']
    ],
    quiz: [
      { q: 'MCP (Model Context Protocol) es…', o: ['Un modelo de lenguaje', 'Un estándar para conectar modelos o agentes con herramientas y fuentes externas', 'Un tipo de licencia', 'Un formato de imagen'], c: 1, why: 'Facilita las conexiones, que hay que gobernar con permisos.' },
      { q: 'Un conector a sistemas de la empresa…', o: ['Solo aporta ventajas', 'Amplía la utilidad y también la superficie de riesgo', 'No necesita permisos', 'Sustituye la política de datos'], c: 1, why: 'Más alcance implica más que vigilar.' },
      { q: 'Para resumir los correos de un proyecto, el permiso adecuado es…', o: ['Leer, enviar y borrar todo el buzón', 'Solo lectura de la carpeta del proyecto', 'Administrador', 'Ninguno: que lo adivine'], c: 1, why: 'Principio de permiso mínimo.' }
    ],
    terms: [['Conector', 'Integración que permite a una herramienta usar información o acciones de otros sistemas.'], ['MCP', 'Model Context Protocol: estándar para conectar modelos o agentes con herramientas y fuentes externas.'], ['Permiso mínimo', 'Conceder solo el acceso imprescindible para completar una tarea.']]
  });

  /* ------------------------------------------------------------------ */
  PL.concept({
    id: 'cierre', block: 'b5', title: 'Cierre: la habilidad que conecta todos los bloques',
    idea: 'La habilidad clave no es «saber hablar con un chatbot», sino formular un problema con claridad, conservar evidencia, reconocer la incertidumbre y decidir de forma responsable con ayuda de la IA.',
    explain: [
      'El recorrido lleva desde «¿qué es la IA?» a una práctica profesional: definir un problema, aportar fuentes autorizadas, escribir una instrucción o una spec, generar una primera versión, verificarla y escoger el entorno adecuado para trabajar.',
      'En todas las entregas se debe poder explicar qué se pidió a la herramienta, qué información se proporcionó, qué partes se revisaron, qué se cambió con criterio propio y qué fuentes respaldan las afirmaciones importantes.'
    ],
    panels: [
      {
        title: 'El recorrido completo',
        caption: 'Seis pasos que resumen la asignatura, cada uno asociado a un bloque.',
        steps: [
          'Entender qué hace la herramienta y sus límites (bloque 1).',
          'Pedir con claridad y en una estructura reutilizable (bloque 2) y, si el encargo es complejo, con una spec (bloque 3).',
          'Trabajar con fuentes propias y citas (bloque 4).',
          'Verificar el resultado y elegir el entorno adecuado según tarea, datos y riesgo (bloque 5).'
        ],
        draw(g) {
          const st = [['ENTENDER', 'bulb', 'B1', P.blue, 0], ['PEDIR', 'chat', 'B2', P.orange, 1], ['ESPECIFICAR', 'doc', 'B3', P.purple, 1], ['FUENTES', 'book', 'B4', P.teal, 2], ['VERIFICAR', 'check', 'B2-B5', P.mint, 3], ['ELEGIR ENTORNO', 'shield', 'B5', P.pink, 3]];
          st.forEach((s, i) => show(g.at(s[4]), () => {
            const x = 14 + (i % 3) * 156, y = 20 + Math.floor(i / 3) * 110;
            card(x, y, 140, 92, (i + 1) + ' · ' + s[0], s[3], { active: g.on(s[4]), size: 8 });
            icon(s[1], x + 54, y + 32, 2, s[1] === 'shield' || s[1] === 'check' ? s[3] : undefined);
            chip(s[2], x + 70, y + 66, { align: 'center', fill: P.paper, size: 7.5 });
            if (i % 3 < 2) arrow(x + 142, y + 46, x + 154, y + 46, { color: P.light });
          }));
          show(g.at(3), () => banner('Problema claro · evidencia · incertidumbre reconocida · decisión responsable', { y: 238, h: 24, size: 8.5 }));
        }
      },
      {
        title: 'Lo que sigue siendo humano',
        caption: 'La IA reduce trabajo de búsqueda, redacción, clasificación o prototipado; el juicio profesional no se delega.',
        steps: [
          'La IA ayuda a buscar, redactar, clasificar y prototipar más rápido.',
          'Pero definir el problema sigue siendo humano.',
          'Verificar lo relevante sigue siendo humano.',
          'Y decidir, y responder de la decisión, sigue siendo humano.'
        ],
        draw(g) {
          show(g.at(0), () => {
            card(14, 20, 200, 200, 'AYUDA DE LA IA', P.purple);
            robot(98, 46, { color: P.purple });
            ['buscar', 'redactar', 'clasificar', 'prototipar'].forEach((s, i) => chip(s, 114, 100 + i * 26, { align: 'center', fill: P.paper, size: 9, w: 140 }));
          });
          const hum = [['DEFINIR EL PROBLEMA', 'target', 1], ['VERIFICAR LO RELEVANTE', 'search', 2], ['DECIDIR Y RESPONDER', 'shield', 3]];
          hum.forEach((h, i) => show(g.at(h[2]), () => {
            const y = 20 + i * 70;
            card(234, y, 232, 60, h[0], P.mint, { active: g.on(h[2]) });
            icon(h[1], 246, y + 26, 2, h[1] === 'shield' ? P.mint : undefined);
            person(424, y + 18, { s: 1, shirt: P.orange, still: true });
          }));
          show(g.at(3), () => banner('La IA no elimina el juicio profesional', { y: 236 }));
        }
      }
    ],
    examples: [
      ['Entrega con criterio', 'Explicar qué se pidió, qué información se dio, qué se revisó, qué se cambió y qué fuentes lo respaldan.'],
      ['Transferencia', 'Aplicar el ciclo problema → fuentes → instrucción/spec → generar → verificar → decidir en una tarea real del trabajo.']
    ],
    mistakes: [
      'Medir el aprendizaje por «saber usar un chatbot» en lugar de por el criterio.',
      'Entregar resultados sin poder explicar cómo se obtuvieron.'
    ],
    questions: [
      ['¿Qué cinco cosas debes poder explicar de cualquier entrega hecha con IA?', 'Qué se pidió, qué información se proporcionó, qué partes se revisaron, qué se cambió con criterio propio y qué fuentes respaldan las afirmaciones importantes.'],
      ['Elige una tarea de tu trabajo y recórrela con los seis pasos del cierre.', 'Respuesta abierta. Ejemplo: responder a reclamaciones. Entender (qué puede y no puede hacer el asistente), pedir (prompt con guía de estilo), especificar (criterios de una buena respuesta), fuentes (política de devoluciones), verificar (checklist) y elegir entorno (herramienta aprobada, sin datos personales).'],
      ['¿Qué concepto de la asignatura te parece más útil para tu día a día? ¿Por qué?', 'Respuesta abierta para debate final. Suele salir la verificación, la privacidad o las specs.']
    ],
    quiz: [
      { q: 'Según el cierre, la habilidad clave es…', o: ['Conocer todos los botones', 'Formular problemas, conservar evidencia, reconocer incertidumbre y decidir con responsabilidad', 'Escribir prompts largos', 'Usar la herramienta más cara'], c: 1, why: 'Es la habilidad que conecta los cinco bloques.' },
      { q: '¿Qué sigue siendo responsabilidad humana?', o: ['Nada', 'Definir el problema, verificar lo relevante y decidir', 'Solo pulsar «generar»', 'Elegir la fuente tipográfica'], c: 1, why: 'Es el principio de toda la asignatura.' }
    ],
    terms: [['Juicio profesional', 'Capacidad de definir, verificar y decidir con criterio y responsabilidad, que la IA no sustituye.']]
  });
})();

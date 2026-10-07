/* Bloque 4 · RAG, embeddings y NotebookLM */
(function () {
  'use strict';
  const D = PL.D, K = PL.K;
  const { P, rect, frame, box, card, txt, chip, arrow, path, icon, sprite, robot, person, bubble, win, msg, paper, bars, probBars, meter, stamp, table, flow, show, pop, pulse, blink, glow, sparkle, qmark, typed, lerp, ease, clamp, line, measure, rnd } = D;
  const { banner, heading, mail, axes, dot, circle, knob, tokens, badge, code, vbars, scale, ticket } = K;
  const late = a => clamp(a * 2 - 1);

  PL.block({
    id: 'b4', n: 4, short: 'RAG y NotebookLM', title: 'RAG, embeddings y NotebookLM', hours: 6, color: '#3cc6c6',
    question: '¿Cómo responde una IA sobre fuentes propias sin inventar?',
    evidence: 'Cuaderno con fuentes y respuestas citadas',
    idea: 'Para responder sobre información privada, reciente o específica no basta con la memoria del modelo. RAG recupera fuentes relevantes y las entrega como contexto para responder con trazabilidad.'
  });

  /* huella vectorial en barras */
  function vec(x, y, seed, w = 60, h = 14, col = P.teal) {
    for (let i = 0; i < 10; i++) { const v = rnd(seed * 13 + i); rect(x + i * (w / 10), y + h - v * h, w / 10 - 1, v * h, col); }
  }

  /* ------------------------------------------------------------------ */
  PL.concept({
    id: 'problema-fuentes', block: 'b4', slide: 'S2', title: 'Una IA general no conoce tus fuentes',
    idea: 'Un modelo no incorpora automáticamente los documentos de tu empresa, tus apuntes ni la decisión de ayer. Si le preguntas por ello sin fuentes, puede generar una respuesta plausible e inventada.',
    explain: [
      'Un LLM se entrena con datos disponibles hasta cierto momento y no conoce por sí mismo los documentos de una empresa, un expediente, los apuntes de una clase o una decisión tomada ayer. Aunque una herramienta tenga búsqueda web o memoria, eso no garantiza que conozca un documento privado ni que use la versión correcta.',
      'Cuando se le pregunta por información que no tiene, puede generar una respuesta plausible. Es especialmente peligroso porque la fluidez del texto se confunde con conocimiento comprobado.',
      'Demostración: preguntar a un chat sin documentos «¿qué criterios exactos se evalúan en la práctica de SDD de este máster?», anotar los detalles inventados y repetir la pregunta en un cuaderno con los apuntes, abriendo las citas.'
    ],
    panels: [
      {
        title: 'Una pregunta sin fuentes',
        caption: 'Un chat general responde sobre los criterios de evaluación de este máster sin tener los apuntes.',
        steps: [
          'Preguntamos a un chat sin documentos: «¿Qué criterios exactos se evalúan en la práctica de SDD de este máster?».',
          'La respuesta es inmediata, ordenada y segura.',
          'Pero los criterios y porcentajes no salen de ningún documento: son plausibles e inventados.',
          'Peligro: la fluidez del texto se confunde con conocimiento comprobado.'
        ],
        draw(g) {
          const w = win(14, 12, 300, 224, 'Chat general · sin documentos');
          show(g.at(0), () => msg(w.x + 60, w.y, 226, '¿Qué criterios exactos se evalúan en la práctica de SDD de este máster?', { who: 'user' }));
          show(g.at(1), () => {
            box(w.x, w.y + 44, 240, 120, { fill: P.white, shadow: false });
            txt('Se evalúan cuatro criterios:', w.x + 8, w.y + 50, { size: 8.5, color: P.ink, font: 'sans' });
            ['1. Creatividad (30 %)', '2. Uso de herramientas (25 %)', '3. Presentación oral (25 %)', '4. Trabajo en equipo (20 %)'].forEach((l, i) => { txt(l, w.x + 14, w.y + 70 + i * 20, { size: 8.5, color: P.ink, font: 'sans' }); if (g.from(2)) rect(w.x + 12, w.y + 80 + i * 20, 150, 1.5, P.red); });
            robot(w.x + 248, w.y + 80, { s: 1, mood: 'sure', color: P.purple });
          });
          show(g.at(2), () => { ['sin fuente', 'inventado', 'inventado', 'inventado'].forEach((t, i) => chip(t, 330, 84 + i * 20, { fill: P.red, size: 7.5 })); stamp('NO CONSTA EN LOS APUNTES', 400, 200, { a: late(g.at(2)), size: 8.5 }); });
          show(g.at(3), () => banner('Fluidez ≠ conocimiento comprobado', { y: 242, h: 22 }));
        }
      },
      {
        title: 'La misma pregunta, con las fuentes',
        caption: 'Un cuaderno con los apuntes de la asignatura responde citando el fragmento de origen.',
        steps: [
          'Creamos un cuaderno y añadimos los apuntes de la asignatura como fuente.',
          'Hacemos la misma pregunta.',
          'La respuesta enumera los criterios reales de la rúbrica, cada uno con su marca de cita.',
          'Abrimos la cita: el fragmento de los apuntes respalda exactamente la respuesta.'
        ],
        draw(g) {
          show(g.at(0), () => { card(14, 14, 110, 220, 'FUENTES', P.teal); chip('apuntes.md', 22, 42, { icon: 'doc', fill: P.mint, size: 7.5, w: 94 }); });
          show(g.at(1), () => { box(134, 14, 186, 34, { fill: P.blue }); txt('¿Qué criterios se evalúan en la práctica de SDD?', 142, 20, { size: 8, color: P.ink, maxW: 172, font: 'sans' }); });
          show(g.at(2), () => {
            box(134, 56, 186, 140, { fill: P.white });
            ['Concreción', 'Control', 'Verificabilidad', 'Ejecución', 'Aprendizaje'].forEach((c, i) => { txt('• ' + c, 142, 64 + i * 24, { size: 9, color: P.ink, font: 'sans' }); chip(String(i < 3 ? 1 : 1), 300, 62 + i * 24, { fill: P.yellow, size: 7, w: 14, h: 13, pad: 2 }); });
          });
          show(g.at(3), () => {
            arrow(322, 70, 336, 70, { color: P.yellow });
            paper(338, 30, 128, 170, { title: 'apuntes.md · B3' });
            txt('Rúbrica', 346, 50, { size: 8, color: P.navy, font: 'sans' });
            rect(344, 64, 114, 76, 'rgba(247,207,90,.55)');
            ['| Concreción |', '| Control |', '| Verificabilidad |', '| Ejecución |', '| Aprendizaje |'].forEach((l, i) => txt(l, 348, 68 + i * 14, { size: 7.5, color: P.ink, font: 'mono' }));
            icon('check', 390, 160, 2);
          });
        }
      },
      {
        title: 'Lo que el modelo no puede saber',
        caption: 'Lo que queda fuera del entrenamiento de cualquier modelo general.',
        steps: [
          'El modelo aprendió de datos disponibles hasta una fecha de corte.',
          'Todo lo posterior —noticias recientes, la decisión de ayer— no está en lo que aprendió.',
          'Y lo privado nunca estuvo: documentos internos, expedientes, los apuntes de esta clase.',
          'Búsqueda web o memoria no garantizan acceso a tu documento privado ni a su versión correcta.'
        ],
        draw(g) {
          rect(30, 100, 420, 4, P.light);
          show(g.at(0), () => { rect(30, 88, 250, 28, 'rgba(79,134,224,.35)'); txt('lo que aprendió el modelo', 155, 70, { size: 9, color: P.sky, align: 'center' }); rect(278, 80, 4, 44, P.yellow); txt('fecha de corte', 280, 130, { size: 8, color: P.yellow, align: 'center' }); });
          show(g.at(1), () => { chip('noticias recientes', 320, 50, { fill: P.orange, size: 8 }); chip('la decisión de ayer', 330, 132, { fill: P.orange, size: 8 }); });
          show(g.at(2), () => {
            box(60, 160, 360, 60, { fill: P.gray2 });
            icon('lock', 72, 176, 2);
            ['documentos internos', 'expedientes', 'apuntes de clase'].forEach((s, i) => chip(s, 106 + i * 104, 178, { fill: P.red, size: 8, w: 98 }));
            txt('PRIVADO: nunca estuvo', 240, 204, { size: 8, align: 'center', color: P.light });
          });
          show(g.at(3), () => banner('Web o memoria ≠ acceso a tu documento privado y vigente', { y: 236 }));
        }
      }
    ],
    examples: [
      ['Política interna', '«¿Cuántos días de teletrabajo permite nuestra política?» sin aportar la política: respuesta genérica o inventada.'],
      ['Decisión reciente', 'El modelo no sabe que ayer se cambió el proveedor.'],
      ['Apuntes', 'Sin los apuntes, inventa criterios de evaluación plausibles.']
    ],
    mistakes: [
      'Preguntar por documentos propios a un chat que no los tiene.',
      'Creer que la memoria del chat equivale a conocer tus archivos.',
      'Dar por buena una respuesta porque «suena» a tu empresa.'
    ],
    questions: [
      ['¿Por qué es peligrosa una respuesta plausible sobre información interna?', 'Porque parece correcta y puede usarse para decidir, aunque no se apoye en ningún documento. El error pasa inadvertido precisamente por su verosimilitud.'],
      ['Si una herramienta tiene búsqueda web, ¿conoce tus documentos privados?', 'No. La búsqueda web accede a contenido público; tus documentos internos solo están disponibles si los aportas o la herramienta está conectada a ellos con permisos.'],
      ['¿Cómo demostrarías en clase la diferencia entre responder con y sin fuentes?', 'Haciendo la misma pregunta concreta a un chat sin documentos y a un cuaderno con los apuntes, anotando los detalles inventados en el primero y abriendo las citas en el segundo.']
    ],
    quiz: [
      { q: 'Un LLM general, ¿conoce los documentos internos de tu empresa?', o: ['Sí, siempre', 'No, salvo que se los proporciones o esté conectado a ellos', 'Sí, si tiene búsqueda web', 'Solo si son recientes'], c: 1, why: 'Lo privado no forma parte de su entrenamiento.' },
      { q: 'Sin fuentes, ante una pregunta sobre información que no tiene, el modelo puede…', o: ['Negarse siempre', 'Generar una respuesta plausible pero inventada', 'Buscar en tu ordenador', 'Llamar a un experto'], c: 1, why: 'Tiende a completar la respuesta.' },
      { q: 'La fecha de corte de un modelo indica…', o: ['Cuándo caduca la licencia', 'Hasta cuándo llegan los datos con los que se entrenó', 'La hora del servidor', 'La versión de la interfaz'], c: 1, why: 'Lo posterior no está en lo aprendido.' }
    ],
    terms: [['Fecha de corte', 'Momento hasta el que llegan los datos con los que se entrenó un modelo.']]
  });

  /* ------------------------------------------------------------------ */
  PL.concept({
    id: 'embeddings', block: 'b4', slide: 'S4', title: 'Embeddings: el significado como posición',
    idea: 'Un embedding es una representación numérica (un vector) de un fragmento de contenido. Textos con significado parecido quedan cerca, aunque no compartan palabras.',
    explain: [
      'Un embedding puede representar una palabra, una frase, un párrafo o una imagen, según el modelo. Suele ser un vector: una lista de muchos números. La analogía útil es un mapa de significado: en un mapa, dos lugares cercanos tienen coordenadas parecidas; en un espacio semántico, dos textos con ideas relacionadas tienden a estar cerca.',
      '«El felino descansa en el sillón» y «el gato duerme en el sofá» están próximos porque comparten significado. Una búsqueda literal (Ctrl+F) puede no encontrar «dinero» en un texto que habla de «dificultades económicas»; una búsqueda semántica sí.',
      'Para comparar vectores se usa una medida de similitud, como la similitud coseno (compara la dirección de dos vectores). Pero la cercanía no equivale a verdad: dos textos pueden ser cercanos y contradecirse, o no responder exactamente a la pregunta. Por eso se combina con filtros, metadatos y revisión humana.'
    ],
    panels: [
      {
        title: 'Del texto al vector',
        caption: 'Un modelo de embeddings convierte una frase en una lista de números que la sitúa en un mapa de significado.',
        steps: [
          'Partimos de un fragmento de texto: «El gato duerme en el sofá».',
          'Un modelo de embeddings lo procesa.',
          'Devuelve un vector: una lista de cientos o miles de números.',
          'Ese vector es una posición en un espacio de significado (aquí simplificado a dos dimensiones).'
        ],
        draw(g) {
          show(g.at(0), () => { box(14, 30, 150, 50, { fill: P.paper }); txt('«El gato duerme en el sofá»', 89, 42, { size: 9.5, color: P.ink, align: 'center', maxW: 136, font: 'sans' }); sprite('cat', 76, 88, 2); });
          arrow(166, 56, 190, 56, { p: g.at(1), color: P.sky });
          show(g.at(1), () => { card(192, 24, 96, 66, 'MODELO DE EMBEDDINGS', P.teal, { size: 6.5 }); icon('chip', 228, 52, 2); });
          arrow(290, 56, 312, 56, { p: g.at(2), color: P.sky });
          show(g.at(2), () => {
            box(314, 22, 152, 72, { fill: P.ink, border: P.gray3 });
            txt('[ 0,12  −0,83  0,44', 322, 32, { size: 8.5, color: P.yellow, font: 'mono' });
            txt('  0,07   0,91 −0,26', 322, 48, { size: 8.5, color: P.yellow, font: 'mono' });
            txt('  …  (768 números) ]', 322, 64, { size: 8.5, color: P.light, font: 'mono' });
          });
          show(g.at(3), () => {
            card(150, 110, 316, 140, 'MAPA DE SIGNIFICADO (2D)', P.purple);
            axes(166, 134, 284, 104);
            dot(300, 170, P.yellow, 5); pulse(300, 170, P.yellow, 10);
            chip('«el gato duerme en el sofá»', 312, 156, { fill: P.yellow, size: 7.5 });
            arrow(390, 94, 310, 160, { color: P.yellow, dash: true });
          });
        }
      },
      {
        title: 'Un mapa de significado',
        caption: 'Frases representadas como puntos: las que significan algo parecido forman grupos.',
        steps: [
          'Frases sobre gatos quedan juntas aunque usen palabras distintas: «gato» y «felino», «sofá» y «sillón».',
          'Frases sobre dinero forman otro grupo: «falta de dinero», «dificultades económicas», «pago pendiente».',
          'Llega una consulta: «problemas para pagar». Sus vecinos más cercanos están en el grupo del dinero.',
          'Cerca = significado parecido, aunque no compartan ni una palabra.'
        ],
        draw(g) {
          axes(24, 14, 432, 214);
          const A = [['el gato duerme en el sofá', 90, 60], ['el felino descansa en el sillón', 120, 92], ['mi mascota ronronea', 70, 120]];
          const B = [['falta de dinero', 300, 152], ['dificultades económicas', 318, 180], ['pago pendiente del proveedor', 282, 206]];
          show(g.at(0), () => { frame(50, 44, 210, 96, P.orange, 1); A.forEach(a => { dot(a[1], a[2], P.orange, 4); txt(a[0], a[1] + 8, a[2] - 5, { size: 8, color: P.orange }); }); sprite('cat', 220, 100, 2); });
          show(g.at(1), () => { frame(268, 138, 196, 84, P.mint, 1); B.forEach(b => { dot(b[1], b[2], P.mint, 4); txt(b[0], b[1] + 8, b[2] - 5, { size: 8, color: P.mint, maxW: 140, fit: true }); }); icon('coin', 428, 146, 2); });
          show(g.at(2), () => {
            const qx = 396, qy = 118;
            B.forEach(b => line(qx, qy, b[1], b[2], P.yellow, 1, true));
            dot(qx, qy, P.yellow, 5); pulse(qx, qy, P.yellow, 10);
            chip('consulta: «problemas para pagar»', 466, 92, { fill: P.yellow, size: 8, align: 'right' });
          });
          show(g.at(3), () => banner('Cerca = significado parecido, aunque cambien las palabras', { y: 238, h: 24 }));
        }
      },
      {
        title: 'Ctrl+F frente a búsqueda semántica',
        caption: 'Buscar «dinero» en un informe que nunca usa esa palabra.',
        steps: [
          'Un informe dice: «La familia atraviesa dificultades económicas desde marzo».',
          'Búsqueda literal (Ctrl+F) de «dinero»: 0 resultados. La palabra no aparece.',
          'Búsqueda semántica de «dinero»: recupera el fragmento, porque su significado está cerca.',
          'La búsqueda semántica encuentra formulaciones equivalentes. Pero el fragmento todavía hay que leerlo y validarlo.'
        ],
        draw(g) {
          show(g.at(0), () => { paper(14, 14, 200, 140, { title: 'informe-caso-12.pdf' }); bars(24, 38, 170, 3, { seed: 3 }); rect(22, 66, 182, 34, g.from(2) ? 'rgba(111,220,159,.5)' : 'rgba(0,0,0,0)'); txt('«La familia atraviesa dificultades económicas desde marzo.»', 26, 70, { size: 8.5, color: P.ink, maxW: 176, font: 'sans' }); bars(24, 110, 170, 4, { seed: 8 }); });
          show(g.at(1), () => {
            card(232, 14, 234, 90, 'BÚSQUEDA LITERAL (CTRL+F)', P.red);
            box(244, 40, 140, 22, { fill: P.white, shadow: false }); txt('dinero', 252, 46, { size: 9, color: P.ink, font: 'mono' }); icon('search', 390, 40, 2);
            txt('0 resultados', 300, 76, { size: 11, color: P.red, weight: 700 });
          });
          show(g.at(2), () => {
            card(232, 116, 234, 100, 'BÚSQUEDA SEMÁNTICA', P.mint);
            box(244, 142, 140, 22, { fill: P.white, shadow: false }); txt('dinero', 252, 148, { size: 9, color: P.ink, font: 'mono' }); icon('search', 390, 142, 2);
            chip('«dificultades económicas…»  0,82', 244, 176, { fill: P.mint, size: 8 });
            arrow(240, 184, 208, 90, { color: P.mint, dash: true });
          });
          show(g.at(3), () => banner('Encuentra lo equivalente, pero hay que leerlo y validarlo', { y: 230 }));
        }
      },
      {
        title: 'Cercanía no es verdad',
        caption: 'Dos casos en los que un fragmento cercano no sirve como respuesta.',
        steps: [
          '«El plazo es el 5 de mayo» y «El plazo NO es el 5 de mayo» comparten casi todas las palabras…',
          '…y quedan muy cerca en el mapa, aunque se contradicen.',
          'Otro caso: preguntamos por el plazo de 2026 y lo más cercano es el plazo de 2025. Cercano, pero no responde.',
          'Por eso la recuperación se combina con filtros, metadatos (fecha, versión) y revisión humana.'
        ],
        draw(g) {
          show(g.at(0), () => { chip('«El plazo es el 5 de mayo»', 20, 20, { fill: P.mint, size: 9 }); chip('«El plazo NO es el 5 de mayo»', 20, 46, { fill: P.red, size: 9 }); });
          show(g.at(1), () => {
            card(250, 14, 216, 96, 'EN EL MAPA', P.purple);
            dot(340, 70, P.mint, 4); dot(352, 76, P.red, 4); frame(326, 56, 40, 34, P.yellow, 1);
            txt('casi en el mismo punto', 358, 92, { size: 7.5, color: P.yellow, align: 'center' });
            stamp('SE CONTRADICEN', 130, 90, { a: late(g.at(1)), size: 9 });
          });
          show(g.at(2), () => {
            box(14, 124, 452, 70, { fill: P.gray2 });
            txt('Pregunta: «¿Cuál es el plazo de 2026?»', 24, 132, { size: 9 });
            chip('Recuperado: «El plazo de 2025 fue el 30 de abril»  0,91', 24, 152, { fill: P.orange, size: 8.5 });
            txt('cercano… pero no responde a la pregunta', 24, 176, { size: 8.5, color: P.orange });
          });
          show(g.at(3), () => { ['filtros', 'metadatos (fecha, versión)', 'revisión humana'].forEach((s, i) => chip(s, 24 + i * 150, 210, { fill: P.mint, size: 9, w: 140, icon: i === 2 ? 'user' : 'check', iconTint: P.ink })); });
        }
      }
    ],
    examples: [
      ['Sinónimos', '«Baja laboral» recupera fragmentos que hablan de «incapacidad temporal».'],
      ['Otro idioma', 'Algunos modelos sitúan cerca «contrato» y «contract».'],
      ['Límite', '«Se permite» y «no se permite» pueden quedar muy próximos.']
    ],
    mistakes: [
      'Pensar que un embedding «entiende» o verifica el contenido.',
      'Confundir similitud alta con respuesta correcta.',
      'Olvidar las negaciones, fechas y versiones al recuperar.'
    ],
    questions: [
      ['Escribe un par de frases con significado parecido y vocabulario diferente, y otro par con vocabulario parecido y significado opuesto.', 'Ejemplo 1: «El pedido se retrasará» / «La entrega llegará más tarde». Ejemplo 2: «El curso es obligatorio» / «El curso no es obligatorio». El primer par queda cerca y debe; el segundo queda cerca y no debería.'],
      ['¿Por qué una búsqueda literal perdería parte de la información relevante?', 'Porque solo encuentra las palabras exactas. Si el documento usa sinónimos o paráfrasis («dificultades económicas» en lugar de «dinero»), no aparece.'],
      ['¿Por qué la búsqueda semántica no resuelve por sí sola contradicciones, fechas o negaciones?', 'Porque mide parecido de significado general, no exactitud. Un fragmento cercano puede estar desactualizado, negar lo contrario o hablar de otro año. Hacen falta filtros y lectura humana.']
    ],
    quiz: [
      { q: 'Un embedding es…', o: ['Una imagen comprimida', 'Una representación numérica (vector) de un contenido', 'Un tipo de prompt', 'Una base de datos'], c: 1, why: 'Convierte un fragmento en una lista de números.' },
      { q: 'Dos textos con embeddings cercanos…', o: ['Son idénticos', 'Tienen significado parecido, aunque cambien las palabras', 'Son verdaderos', 'Son del mismo autor'], c: 1, why: 'La cercanía refleja similitud de significado.' },
      { q: '«Cercanía semántica» equivale a…', o: ['Verdad', 'Parecido de significado, no exactitud', 'Misma fecha', 'Mismo documento'], c: 1, why: 'Dos textos pueden ser cercanos y contradecirse.' }
    ],
    terms: [['Embedding', 'Representación numérica de un contenido que permite comparar su significado.'], ['Vector', 'Lista ordenada de números; en IA, la forma habitual de un embedding.'], ['Similitud semántica', 'Medida de cuánto se parecen dos contenidos en significado.'], ['Similitud coseno', 'Medida habitual de similitud que compara la dirección de dos vectores.']]
  });

  /* ------------------------------------------------------------------ */
  PL.concept({
    id: 'chunking', block: 'b4', slide: 'S6', title: 'Chunking: trocear antes de recuperar',
    idea: 'Un documento largo se divide en fragmentos (chunks), a menudo con solapamiento y con metadatos. El tamaño y el lugar del corte condicionan lo que se recupera.',
    explain: [
      'Un documento de muchas páginas no suele convertirse en un solo vector. Se divide en fragmentos, a menudo con solapamiento, y cada uno conserva metadatos como el documento de origen, la página, el título o la fecha.',
      'Un fragmento demasiado grande mezcla temas, añade ruido y ocupa contexto innecesario; uno demasiado pequeño pierde referencias, definiciones o condiciones; un corte que parte una tabla, una negación o una excepción puede cambiar el sentido.',
      'No hay un tamaño universal: depende del documento, el idioma, la estructura, la pregunta prevista y el modelo. Lo práctico es inspeccionar qué fragmento se ha recuperado y si conserva contexto suficiente.'
    ],
    panels: [
      {
        title: 'Trocear un documento',
        caption: 'Un documento se corta en fragmentos que se solapan y llevan etiquetas de procedencia.',
        steps: [
          'Partimos de un documento largo: la política de teletrabajo, 12 páginas.',
          'Se divide en fragmentos (chunks) de tamaño parecido.',
          'Entre fragmentos consecutivos se deja un solapamiento, para no perder lo que queda en el borde.',
          'Cada fragmento conserva metadatos: documento, página, apartado y fecha.'
        ],
        draw(g) {
          show(g.at(0), () => { paper(14, 14, 120, 220, { title: 'politica.pdf' }); bars(24, 38, 96, 22, { seed: 9, gap: 8.5 }); });
          const cuts = [62, 114, 166];
          show(g.at(1), () => cuts.forEach(y => { line(10, y, 140, y, P.yellow, 2, true); icon('scissors', 140, y - 6, 1); }));
          const ch = [['chunk 1', 'p. 1', '§1 Objeto'], ['chunk 2', 'p. 2', '§2 Días'], ['chunk 3', 'p. 3', '§3 Excepciones'], ['chunk 4', 'p. 4', '§4 Equipos']];
          ch.forEach((c, i) => show(g.at(1) * clamp(g.at(1) * 4 - i), () => {
            const x = 170 + (i % 2) * 150, y = 16 + Math.floor(i / 2) * 116;
            box(x, y, 136, 70, { fill: P.paper });
            txt(c[0], x + 8, y + 6, { size: 8.5, color: P.ink });
            bars(x + 8, y + 22, 118, 4, { seed: i + 2, gap: 8 });
            if (g.from(2) && i > 0) rect(x + 4, y + 20, 128, 10, 'rgba(242,140,56,.45)');
            if (g.from(3)) { chip(c[1], x, y + 74, { fill: P.teal, size: 7 }); chip(c[2], x + 34, y + 74, { fill: P.yellow, size: 7 }); chip('2026', x + 104, y + 74, { fill: P.light, size: 7 }); }
          }));
          show(g.at(2), () => chip('solape', 300, 120, { align: 'center', fill: P.orange, size: 8 }));
        }
      },
      {
        title: 'Demasiado grande, equilibrado, demasiado pequeño',
        caption: 'Tres tamaños de fragmento. Colores: regla (azul), excepción (naranja), fecha de vigencia (amarillo) y ruido (gris).',
        steps: [
          'Demasiado grande: incluye la regla, la excepción, la fecha… y mucho ruido de otros temas. Diluye lo útil y ocupa contexto.',
          'Equilibrado: una idea central con su excepción y su fecha. Lo que hace falta para responder.',
          'Demasiado pequeño: solo la regla. Se pierde la excepción y la respuesta será incompleta.',
          'No hay tamaño universal: hay que inspeccionar qué fragmento se recupera.'
        ],
        draw(g) {
          const cols = [{ t: 'DEMASIADO GRANDE', col: P.red, seg: [P.gray3, P.gray3, P.blue, P.orange, P.yellow, P.gray3, P.gray3, P.gray3, P.gray3], note: 'ruido · ocupa contexto', ic: 'cross' }, { t: 'EQUILIBRADO', col: P.mint, seg: [P.blue, P.orange, P.yellow], note: 'idea + condiciones', ic: 'check' }, { t: 'DEMASIADO PEQUEÑO', col: P.orange, seg: [P.blue], note: 'pierde la excepción', ic: 'cross' }];
          cols.forEach((cl, k) => show(g.at(k), () => {
            const x = 14 + k * 156;
            card(x, 14, 140, 206, cl.t, cl.col, { active: g.on(k) });
            cl.seg.forEach((sc, i) => rect(x + 14, 40 + i * 15, 112, 11, sc));
            frame(x + 10, 36, 120, cl.seg.length * 15 + 4, P.white, 1);
            icon(cl.ic, x + 58, 182, 2);
            txt(cl.note, x + 70, 204, { size: 8, color: cl.col, align: 'center' });
          }));
          show(g.at(3), () => banner('Inspecciona qué fragmento se recupera', { y: 232 }));
        }
      },
      {
        title: 'Un corte en mal sitio cambia el sentido',
        caption: 'La regla y su excepción quedan en fragmentos distintos y solo se recupera la regla.',
        steps: [
          'Texto: «Se permite el teletrabajo dos días por semana, excepto durante el cierre trimestral».',
          'El corte cae justo antes de «excepto». La regla queda en un fragmento y la excepción en otro.',
          'Pregunta: «¿Puedo teletrabajar la semana del cierre?». Se recupera solo el primer fragmento → «Sí, dos días». Incorrecto.',
          'Con un corte por frase completa (o solape suficiente), regla y excepción viajan juntas → «No durante el cierre».'
        ],
        draw(g) {
          show(g.at(0), () => { box(14, 14, 452, 40, { fill: P.paper }); txt('«Se permite el teletrabajo dos días por semana,', 24, 20, { size: 9.5, color: P.ink, font: 'sans' }); txt('excepto durante el cierre trimestral.»', 24, 36, { size: 9.5, color: P.ink, font: 'sans' }); });
          show(g.at(1), () => {
            line(20, 34, 300, 34, P.yellow, 2, true); icon('scissors', 302, 28, 1);
            box(14, 66, 220, 34, { fill: P.blue }); txt('A: «…dos días por semana,»', 22, 77, { size: 8.5, color: P.ink });
            box(246, 66, 220, 34, { fill: P.orange }); txt('B: «excepto durante el cierre…»', 254, 77, { size: 8.5, color: P.ink });
          });
          show(g.at(2), () => {
            txt('«¿Puedo teletrabajar la semana del cierre?»', 24, 112, { size: 9 });
            chip('recupera A', 24, 130, { fill: P.blue, size: 8 });
            robot(100, 126, { s: 1, mood: 'sure', color: P.purple });
            bubble(124, 126, 112, 26, { text: '«Sí, dos días.»', tx: 118, ty: 138, size: 9 });
            stamp('INCORRECTO', 300, 140, { a: late(g.at(2)), size: 11 });
          });
          show(g.at(3), () => {
            box(14, 170, 452, 34, { fill: P.mint }); txt('A+B: «…dos días por semana, excepto durante el cierre…»', 22, 181, { size: 8.5, color: P.ink });
            robot(100, 212, { s: 1, mood: 'happy', color: P.purple });
            bubble(124, 212, 220, 26, { text: '«No durante el cierre trimestral.»', tx: 118, ty: 224, size: 9 });
            icon('check', 360, 216, 2);
          });
        }
      }
    ],
    examples: [
      ['Tablas', 'Si se corta una tabla por la mitad, las cifras pierden su encabezado.'],
      ['Excepciones', '«Salvo», «excepto» o «no se aplica cuando» deben viajar con la regla.'],
      ['Metadatos', 'Página y fecha permiten citar y descartar versiones antiguas.']
    ],
    mistakes: [
      'Elegir un tamaño fijo sin revisar qué se recupera.',
      'Cortar en medio de frases, tablas o listas.',
      'Perder los metadatos de procedencia al trocear.'
    ],
    questions: [
      ['¿Qué condición se pierde si el fragmento es demasiado corto?', 'Excepciones, fechas de vigencia, definiciones o el sujeto de la regla. El fragmento queda «limpio» pero incompleto, y la respuesta puede ser incorrecta.'],
      ['¿Para qué sirve el solapamiento entre fragmentos?', 'Para que la información que cae en el borde de un corte aparezca también en el fragmento siguiente, reduciendo el riesgo de separar una idea de sus condiciones.'],
      ['¿Cómo comprobarías en NotebookLM si el chunking está funcionando bien?', 'Abriendo las citas de varias respuestas y mirando si el fragmento recuperado contiene todo lo necesario (regla, excepción, fecha) o si falta contexto.']
    ],
    quiz: [
      { q: 'Un chunk demasiado grande…', o: ['Siempre es mejor', 'Mezcla temas, añade ruido y ocupa contexto', 'Pierde la excepción', 'No se puede indexar'], c: 1, why: 'Diluye el pasaje útil entre información irrelevante.' },
      { q: 'El solapamiento entre chunks sirve para…', o: ['Ahorrar espacio', 'No perder información en los bordes del corte', 'Cifrar el texto', 'Traducir'], c: 1, why: 'Lo que queda en el borde aparece en ambos fragmentos.' },
      { q: '¿Cuál es el tamaño ideal de chunk?', o: ['Siempre 500 palabras', 'No hay tamaño universal: depende del documento y de la pregunta', 'Una frase', 'El documento entero'], c: 1, why: 'Hay que probar e inspeccionar.' }
    ],
    terms: [['Chunk', 'Fragmento de un documento que se indexa y recupera de forma independiente.'], ['Chunking', 'Proceso de dividir documentos en fragmentos.'], ['Metadato', 'Dato sobre el dato: documento de origen, página, fecha, autor, permisos…'], ['Solapamiento', 'Parte de texto compartida entre fragmentos consecutivos.']]
  });

  /* ------------------------------------------------------------------ */
  PL.concept({
    id: 'vectorial', block: 'b4', slide: 'S7', title: 'Índices y bases de datos vectoriales',
    idea: 'Los vectores y sus metadatos se guardan en índices preparados para buscar vecinos cercanos a gran escala. Ante una pregunta, se busca qué fragmentos están más relacionados y se filtran por fecha, permisos o tipo.',
    explain: [
      'Los vectores y sus metadatos se guardan en sistemas capaces de ejecutar búsquedas de vecinos cercanos a gran escala: bases de datos o índices vectoriales. Algunas herramientas conocidas son FAISS, Chroma o Pinecone, pero los nombres no son lo esencial.',
      'Ante una pregunta, el sistema calcula su embedding y busca qué fragmentos están más próximos. Después entrega esos fragmentos al modelo generativo junto con la pregunta.',
      'Los metadatos permiten filtrar: excluir versiones caducadas, respetar los permisos de quien pregunta o limitar la búsqueda a un área o tipo de documento.'
    ],
    panels: [
      {
        title: 'Guardar vectores con sus metadatos',
        caption: 'Cada fila del índice une un fragmento, su vector y sus etiquetas.',
        steps: [
          'Cada fragmento del documento…',
          '…se convierte en un vector (su huella de significado).',
          'Vector y metadatos se guardan juntos en el índice: documento, página, fecha y permisos.',
          'El índice está listo para buscar por significado y filtrar por etiquetas.'
        ],
        draw(g) {
          const rows = [['chunk 1', 'politica.pdf', 'p. 1', '2026', 'todos'], ['chunk 2', 'politica.pdf', 'p. 2', '2026', 'todos'], ['chunk 3', 'nominas.xlsx', 'h. 1', '2026', 'RR. HH.'], ['chunk 4', 'politica-2023.pdf', 'p. 2', '2023', 'todos']];
          show(g.at(0), () => rows.forEach((r, i) => { box(14, 40 + i * 40, 70, 30, { fill: P.paper, shadow: false }); txt(r[0], 49, 50 + i * 40, { size: 8.5, color: P.ink, align: 'center' }); }));
          show(g.at(1), () => rows.forEach((r, i) => { arrow(88, 55 + i * 40, 104, 55 + i * 40, { color: P.sky, head: 4 }); box(108, 40 + i * 40, 76, 30, { fill: P.ink, shadow: false, border: P.gray3 }); vec(116, 47 + i * 40, i + 1, 60, 16); }));
          show(g.at(2), () => {
            icon('db', 196, 8, 2); txt('ÍNDICE VECTORIAL', 226, 14, { size: 9, color: P.purple });
            table(192, 36 + 0, [86, 40, 40, 66], [['documento', 'pág.', 'fecha', 'permiso']].concat(rows.map(r => [r[1], r[2], r[3], { t: r[4], color: r[4] === 'todos' ? P.mint : P.orange }])), { rh: 40, size: 7.5, leftFirst: true });
          });
          show(g.at(3), () => banner('Buscar por significado · filtrar por etiquetas', { y: 236 }));
        }
      },
      {
        title: 'Buscar los vecinos más cercanos',
        caption: 'La pregunta se convierte en un punto del mismo mapa y se buscan los fragmentos más próximos.',
        steps: [
          'El índice contiene miles de fragmentos, cada uno como un punto en el espacio de significado.',
          'La pregunta «¿Cuántos días de teletrabajo puedo hacer?» se convierte también en un punto.',
          'Se buscan los vecinos más cercanos: los 3 fragmentos más similares.',
          'Esos fragmentos, ordenados por similitud, son los candidatos a entrar en el contexto del modelo.'
        ],
        draw(g) {
          card(14, 14, 290, 226, 'ESPACIO DE SIGNIFICADO', P.purple);
          for (let i = 0; i < 46; i++) dot(30 + rnd(i * 3) * 258, 38 + rnd(i * 7 + 2) * 190, P.gray3, 2);
          const qx = 170, qy = 128;
          const nn = [[184, 116, 0.89], [150, 140, 0.84], [192, 150, 0.79]];
          nn.forEach(n => dot(n[0], n[1], g.from(2) ? P.mint : P.gray3, 3));
          show(g.at(1), () => { dot(qx, qy, P.yellow, 5); chip('pregunta', qx - 50, qy - 8, { align: 'center', fill: P.yellow, size: 8 }); }, 0);
          show(g.at(2), () => { const r = 14 + g.at(2) * 22; frame(qx - r, qy - r, r * 2, r * 2, P.yellow, 1); nn.forEach((n, i) => { line(qx, qy, n[0], n[1], P.mint, 1); txt(String(i + 1), n[0] + 5, n[1] - 10, { size: 8, color: P.mint }); }); }, 0);
          show(g.at(3), () => {
            card(316, 14, 150, 226, 'TOP 3', P.mint);
            [['§2 Días de teletrabajo', 0.89], ['§3 Excepciones', 0.84], ['FAQ teletrabajo', 0.79]].forEach((f, i) => { badge(i + 1, 324, 44 + i * 58, P.mint); txt(f[0], 344, 44 + i * 58, { size: 8, maxW: 116 }); txt('similitud ' + String(f[1]).replace('.', ','), 344, 62 + i * 58, { size: 7.5, color: P.mint }); });
          });
        }
      },
      {
        title: 'Filtros: fecha, permisos y tipo',
        caption: 'Entre los fragmentos cercanos, los metadatos descartan los caducados y los no autorizados.',
        steps: [
          'La búsqueda devuelve cuatro fragmentos cercanos a la pregunta.',
          'Filtro de fecha: se descarta la política de 2023, ya derogada.',
          'Filtro de permisos: quien pregunta no es de RR. HH.; se descarta el fragmento de nóminas.',
          'Al modelo solo llega lo relevante, vigente y autorizado. (FAISS, Chroma, Pinecone… los nombres no son lo esencial).'
        ],
        draw(g) {
          const res = [['§2 Días de teletrabajo', '2026', 'todos', null], ['Política 2023 · §2', '2023', 'todos', 1], ['Nóminas · complemento', '2026', 'RR. HH.', 2], ['§3 Excepciones', '2026', 'todos', null]];
          res.forEach((r, i) => show(g.at(0), () => {
            const y = 16 + i * 46, out = r[3] != null && g.at(r[3]) > 0.5;
            box(14, y, 300, 38, { fill: out ? P.gray : P.gray2, shadow: false });
            txt(r[0], 24, y + 7, { size: 9, color: out ? P.gray3 : P.white });
            chip(r[1], 24, y + 20, { fill: r[1] === '2023' ? P.orange : P.light, size: 7 }); chip(r[2], 64, y + 20, { fill: r[2] === 'todos' ? P.mint : P.pink, size: 7 });
            if (out) { rect(20, y + 18, 288, 2, P.red); icon('cross', 290, y + 12, 1); }
            if (!out && g.from(3)) icon('check', 290, y + 12, 1);
          }, 4));
          show(g.at(1), () => chip('filtro: fecha ≥ 2026', 330, 66, { fill: P.orange, size: 8.5, icon: 'calendar' }));
          show(g.at(2), () => chip('filtro: permisos', 330, 112, { fill: P.pink, size: 8.5, icon: 'lock' }));
          show(g.at(3), () => { arrow(320, 180, 360, 180, { color: P.mint }); robot(370, 160, { color: P.purple }); txt('solo lo relevante,\nvigente y autorizado', 386, 206, { size: 7.5, color: P.mint, align: 'center' }); });
        }
      }
    ],
    examples: [
      ['Filtro de fecha', 'Excluir políticas caducadas o priorizar la versión vigente.'],
      ['Filtro de permisos', 'Impedir que se recuperen documentos que la persona no puede consultar.'],
      ['Filtro de área', 'Buscar solo en documentos de un departamento o proceso.']
    ],
    mistakes: [
      'Indexar documentos sin fecha ni versión.',
      'Olvidar los permisos: el índice puede «saltarse» el control de acceso.',
      'Centrarse en el nombre de la herramienta en lugar de en el flujo.'
    ],
    questions: [
      ['¿Qué metadato usarías para no recuperar una política caducada?', 'La fecha de vigencia o el estado de la versión (vigente / derogada), y filtrar por él en la búsqueda.'],
      ['¿Qué ocurriría si se indexan documentos contradictorios y sin fecha?', 'El sistema podría recuperar indistintamente versiones antiguas y nuevas, y el modelo mezclarlas o elegir la equivocada sin que se note.'],
      ['¿Por qué los permisos deben aplicarse también en la recuperación?', 'Porque, si no, una persona podría obtener a través del asistente información de documentos a los que no tiene acceso directo.']
    ],
    quiz: [
      { q: 'Un índice vectorial sirve para…', o: ['Traducir textos', 'Buscar rápidamente los vectores más cercanos a una consulta', 'Generar imágenes', 'Guardar contraseñas'], c: 1, why: 'Es la búsqueda de vecinos cercanos a gran escala.' },
      { q: 'Para no recuperar documentos que la persona no puede ver, se usa…', o: ['Temperatura baja', 'Filtros por permisos en los metadatos', 'Más tokens', 'Un prompt más largo'], c: 1, why: 'Los permisos deben respetarse al recuperar.' },
      { q: 'FAISS, Chroma o Pinecone son…', o: ['Modelos de lenguaje', 'Ejemplos de herramientas de índices vectoriales', 'Formatos de archivo', 'Lenguajes de programación'], c: 1, why: 'Son ejemplos; lo esencial es el concepto.' }
    ],
    terms: [['Índice vectorial', 'Estructura que guarda vectores y metadatos y permite buscar los más cercanos a una consulta.'], ['Recuperación', 'Paso que selecciona los fragmentos más relevantes para una pregunta.']]
  });

  /* ------------------------------------------------------------------ */
  PL.concept({
    id: 'rag', block: 'b4', slide: 'S8', title: 'RAG: recuperar antes de generar',
    idea: 'RAG (Retrieval-Augmented Generation) añade al contexto del modelo los fragmentos recuperados de fuentes autorizadas antes de pedirle que responda, y conserva las citas.',
    explain: [
      'Flujo: se incorporan documentos autorizados; el sistema extrae el texto, lo divide y lo indexa; la persona pregunta; la pregunta se transforma en un vector; se recuperan los fragmentos más relevantes (con filtros de fuente, fecha, permisos o tipo); esos fragmentos entran en el contexto del modelo; el modelo redacta la respuesta y la herramienta muestra, idealmente, las citas.',
      'RAG permite responder sobre documentación propia sin reentrenar un modelo, trabajar con información nueva, aportar trazabilidad si se conservan las citas y reducir la necesidad de completar huecos con conocimiento general.',
      'RAG no garantiza recuperar el fragmento correcto, no corrige documentos obsoletos, contradictorios o mal escaneados, no evita del todo que el modelo malinterprete o invente una conexión, no sustituye permisos ni política de datos y no libera de comprobar la cita.'
    ],
    panels: [
      {
        title: 'El flujo completo',
        caption: 'Arriba, la preparación de las fuentes; abajo, lo que ocurre con cada pregunta.',
        steps: [
          'Se incorporan documentos autorizados al sistema.',
          'El sistema extrae el texto, lo divide en fragmentos y los indexa con sus metadatos.',
          'La persona formula una pregunta, que se transforma en un vector para buscar por significado.',
          'Se recuperan los fragmentos más relevantes, aplicando filtros de fuente, fecha o permisos.',
          'Pregunta y fragmentos entran juntos en el contexto del modelo, que redacta la respuesta con citas.'
        ],
        draw(g) {
          txt('PREPARACIÓN (una vez)', 20, 8, { size: 8, color: P.light });
          txt('CADA PREGUNTA', 20, 112, { size: 8, color: P.light });
          const top = flow([{ t: 'FUENTES', icon: 'folder' }, { t: 'TROCEAR', icon: 'scissors' }, { t: 'ÍNDICE', icon: 'db' }], 20, 22, 290, { bw: 82, bh: 56, active: g.step <= 1 ? g.step * 1.5 | 0 : -1, reveal: i => g.at(i === 0 ? 0 : 1) });
          const bot = flow([{ t: 'PREGUNTA', icon: 'question' }, { t: 'VECTOR', icon: 'chip' }, { t: 'RECUPERAR', icon: 'search' }, { t: 'CONTEXTO', icon: 'list' }, { t: 'RESPUESTA', icon: 'chat' }], 20, 128, 440, { bw: 76, bh: 56, active: g.step >= 2 ? [0, 0, 1, 2, 4][g.step] : -1, reveal: i => g.at([2, 2, 3, 4, 4][i]) });
          show(g.at(3), () => { path([[top[2].cx, 80], [top[2].cx, 104], [bot[2].cx, 104], [bot[2].cx, 126]], { color: P.mint }); chip('filtros', bot[2].cx + 8, 92, { fill: P.yellow, size: 7 }); });
          show(g.at(4), () => { chip('respuesta + citas [1][2]', 360, 200, { align: 'center', fill: P.mint, size: 9, icon: 'link' }); robot(330, 22, { color: P.purple }); txt('modelo generativo', 346, 64, { size: 7.5, color: P.light, align: 'center' }); arrow(bot[3].cx, 126, 346, 70, { color: P.purple, dash: true }); });
          if (g.on(3)) banner('Se recupera antes de generar', { y: 240, h: 22 });
        }
      },
      {
        title: 'Lo que resuelve RAG',
        caption: 'Cuatro ventajas de responder a partir de fuentes recuperadas.',
        steps: [
          'Responde sobre documentación propia sin reentrenar el modelo.',
          'Permite trabajar con información nueva o actualizada: basta con actualizar las fuentes.',
          'Aporta trazabilidad si las citas se conservan y se pueden abrir.',
          'Reduce la necesidad de que el modelo complete huecos con conocimiento general.'
        ],
        draw(g) {
          const items = [['folder', 'Documentación propia', 'sin reentrenar el modelo'], ['calendar', 'Información nueva', 'actualizando las fuentes'], ['link', 'Trazabilidad', 'citas que se pueden abrir'], ['shield', 'Menos huecos', 'menos relleno con conocimiento general']];
          items.forEach((it, i) => show(g.at(i), () => {
            const x = 14 + (i % 2) * 232, y = 16 + Math.floor(i / 2) * 112;
            card(x, y, 220, 100, 'VENTAJA ' + (i + 1), P.mint, { active: g.on(i) });
            icon(it[0], x + 14, y + 36, 3, it[0] === 'shield' ? P.mint : undefined);
            txt(it[1], x + 62, y + 38, { size: 11, weight: 700, maxW: 150 });
            txt(it[2], x + 62, y + 58, { size: 8.5, color: P.light, maxW: 150 });
          }));
        }
      },
      {
        title: 'Dónde puede fallar',
        caption: 'Cinco puntos débiles a lo largo del flujo. RAG reduce riesgos, no los elimina.',
        steps: [
          'Recuperación: puede traer un fragmento irrelevante o incompleto.',
          'Fuentes: no corrige documentos obsoletos, contradictorios o mal escaneados.',
          'Generación: el modelo puede interpretar mal una evidencia correcta o inventar una conexión.',
          'Permisos: no sustituye el control de acceso ni la política de datos.',
          'Persona usuaria: si no abre la cita, el error pasa inadvertido.'
        ],
        draw(g) {
          const nodes = flow([{ t: 'FUENTES', icon: 'folder' }, { t: 'RECUPERAR', icon: 'search' }, { t: 'MODELO', icon: 'chip' }, { t: 'RESPUESTA', icon: 'chat' }], 20, 70, 440, { bw: 84, bh: 56 });
          const fails = [[1, 'fragmento erróneo', 0, true, 22], [0, 'obsoleto o mal escaneado', 1, false, 160], [2, 'malinterpreta o inventa', 2, true, 22], [0, 'no sustituye los permisos', 3, false, 182], [3, 'nadie abre la cita', 4, false, 160]];
          fails.forEach(f => show(g.at(f[2]), () => {
            const n = nodes[f[0]];
            icon('warn', n.cx - 12, f[3] ? 46 : 130, 2);
            chip(f[1], Math.max(70, n.cx), f[4], { align: 'center', fill: P.red, size: 8 });
            if (g.on(f[2])) pulse(n.cx, n.cy, P.red, 30);
          }));
          show(g.at(4), () => banner('RAG reduce el riesgo; no lo elimina', { y: 236 }));
        }
      },
      {
        title: 'Checklist de calidad de un sistema con fuentes',
        caption: 'Preguntas para evaluar un asistente que responde a partir de documentos.',
        steps: [
          '¿Las fuentes son fiables, vigentes y autorizadas? ¿Se identifican versión y fecha?',
          '¿Respeta los permisos de quien pregunta? ¿Incluye citas navegables y relevantes?',
          '¿La cita respalda la afirmación exacta, no solo el tema? ¿Qué hace cuando no hay evidencia o es contradictoria?',
          '¿Hay una persona responsable de actualizar y retirar fuentes?'
        ],
        draw(g) {
          const items = [['Fuentes fiables, vigentes y autorizadas', 0], ['Versión y fecha identificables', 0], ['Respeta los permisos de quien pregunta', 1], ['Citas navegables y relevantes', 1], ['La cita respalda la afirmación exacta', 2], ['Responde bien sin evidencia o con contradicciones', 2], ['Responsable de actualizar y retirar fuentes', 3]];
          items.forEach((it, i) => show(g.at(it[1]), () => {
            const y = 14 + i * 34;
            box(14, y, 380, 28, { fill: P.gray2, shadow: false });
            badge(i + 1, 20, y + 7, P.teal);
            txt(it[0], 42, y + 9, { size: 9, maxW: 340, fit: true });
            icon('check', 372, y + 8, 1);
          }, 4));
          show(g.at(3), () => { person(420, 200, { shirt: P.teal, label: 'responsable' }); });
        }
      }
    ],
    examples: [
      ['Asistente de RR. HH.', 'Responde sobre la política vigente citando el apartado, y deriva a una persona si no hay evidencia.'],
      ['Soporte técnico', 'Recupera fragmentos de manuales y muestra la página de origen.'],
      ['Estudio', 'Un cuaderno de NotebookLM con los apuntes de la asignatura.']
    ],
    mistakes: [
      'Creer que RAG elimina las alucinaciones.',
      'Indexar todo sin revisar calidad, versión ni permisos.',
      'No abrir las citas porque «ya vienen de las fuentes».'
    ],
    questions: [
      ['¿En qué punto del flujo RAG puede producirse una respuesta incorrecta?', 'En casi todos: fuentes obsoletas o mal escaneadas, troceado que separa condiciones, recuperación del fragmento equivocado, generación que malinterpreta o inventa, y citas que no respaldan la frase exacta.'],
      ['¿Qué tipo de pregunta no debería responder un sistema RAG sin escalarla a una persona?', 'Las de alto impacto o con evidencia insuficiente o contradictoria: decisiones legales, sanitarias, económicas o sobre personas concretas.'],
      ['Explica RAG con tus palabras en una frase.', 'Ejemplo: «Antes de responder, el sistema busca en mis documentos los fragmentos relevantes, se los pasa al modelo junto con la pregunta y me muestra de dónde sale cada afirmación».']
    ],
    quiz: [
      { q: 'RAG significa…', o: ['Random Answer Generator', 'Retrieval-Augmented Generation: generación aumentada por recuperación', 'Rapid AI Growth', 'Reentrenar Antes de Generar'], c: 1, why: 'Recupera fuentes y las añade al contexto antes de generar.' },
      { q: '¿Qué NO garantiza RAG?', o: ['Responder sobre documentación propia', 'Que siempre se recupere el fragmento correcto', 'Trabajar con información nueva', 'Mostrar citas si se conservan'], c: 1, why: 'La recuperación puede fallar.' },
      { q: 'Para actualizar la información de un sistema RAG…', o: ['Hay que reentrenar el modelo', 'Basta con actualizar las fuentes indexadas', 'No se puede', 'Se sube la temperatura'], c: 1, why: 'Es una de sus ventajas principales.' }
    ],
    terms: [['RAG', 'Retrieval-Augmented Generation: arquitectura que recupera fragmentos de fuentes y los añade al contexto antes de generar.'], ['Contexto recuperado', 'Fragmentos de las fuentes que se entregan al modelo junto con la pregunta.']]
  });

  /* ------------------------------------------------------------------ */
  PL.concept({
    id: 'citas', block: 'b4', slide: 'S13', title: 'Citas: evidencia o decoración',
    idea: 'Una cita válida respalda la afirmación exacta: el mismo sujeto, la misma regla y las mismas condiciones. Compartir tema o vocabulario no basta. También cuentan el contexto, la autoridad, la fecha y la versión.',
    explain: [
      'Una cita puede ser relevante (habla del tema) sin ser evidencia suficiente (no demuestra la afirmación concreta). Hay que comparar sujeto, regla y condiciones.',
      'Conviene leer las líneas anteriores y posteriores al fragmento citado: una condición («en los proyectos piloto», «salvo comunicaciones internas») puede cambiar el sentido.',
      'Además de lo que dice, importa quién lo dice, cuándo y en qué versión: un blog antiguo, un borrador interno o la política oficial vigente no tienen el mismo valor.'
    ],
    panels: [
      {
        title: 'Cita exacta frente a cita decorativa',
        caption: 'Dos citas para la misma afirmación. Solo una la demuestra.',
        steps: [
          'Afirmación de la respuesta: «La revisión es obligatoria antes de publicar».',
          'Cita 1: «Todo contenido debe revisarse antes de su publicación». Mismo sujeto, misma obligación, misma condición. ✓',
          'Cita 2: «Las revisiones pueden mejorar la calidad del contenido». Comparte vocabulario, pero no habla de obligación. ✗',
          'Relevancia temática no es evidencia suficiente.'
        ],
        draw(g) {
          show(g.at(0), () => { box(60, 12, 360, 34, { fill: P.yellow }); txt('«La revisión es obligatoria antes de publicar.»', 240, 22, { size: 10, color: P.ink, align: 'center', font: 'sans' }); });
          show(g.at(1), () => {
            card(14, 64, 218, 150, 'CITA 1 · EXACTA', P.mint, { active: g.on(1) });
            txt('«Todo contenido debe revisarse antes de su publicación.»', 123, 90, { size: 9.5, align: 'center', maxW: 196, font: 'sans' });
            ['sujeto ✓', 'obligación ✓', 'antes de publicar ✓'].forEach((s, i) => chip(s, 123, 136 + i * 22, { align: 'center', fill: P.mint, size: 8, w: 140 }));
          });
          show(g.at(2), () => {
            card(248, 64, 218, 150, 'CITA 2 · DECORATIVA', P.red, { active: g.on(2) });
            txt('«Las revisiones pueden mejorar la calidad del contenido.»', 357, 90, { size: 9.5, align: 'center', maxW: 196, font: 'sans' });
            ['tema ✓', 'obligación ✗', 'condición ✗'].forEach((s, i) => chip(s, 357, 136 + i * 22, { align: 'center', fill: i ? P.red : P.mint, size: 8, w: 140 }));
          });
          show(g.at(3), () => banner('Relevante ≠ evidencia suficiente', { y: 232 }));
        }
      },
      {
        title: 'Lee el contexto de la cita',
        caption: 'Al ampliar el fragmento citado aparece una condición que cambia el sentido.',
        steps: [
          'La cita parece perfecta: «La revisión es obligatoria antes de publicar».',
          'Ampliamos el fragmento y leemos las líneas anteriores y posteriores…',
          '…«En los proyectos piloto de 2023, la revisión es obligatoria antes de publicar». La obligación tenía límites.',
          'Antes de reutilizar una cita, lee su contexto: puede estar recortada.'
        ],
        draw(g) {
          paper(60, 14, 360, 200, { title: 'manual-de-estilo.pdf · p. 7' });
          show(g.at(1), () => { bars(74, 44, 330, 2, { seed: 4, gap: 10 }); bars(74, 150, 330, 3, { seed: 7, gap: 10 }); }, 0);
          const y = 98;
          if (g.from(2)) { rect(70, y - 26, 340, 20, 'rgba(242,140,56,.45)'); txt('En los proyectos piloto de 2023,', 76, y - 22, { size: 10, color: P.ink, font: 'sans' }); }
          rect(70, y - 4, 340, 22, 'rgba(247,207,90,.55)');
          txt('la revisión es obligatoria antes de publicar.', 76, y, { size: 10, color: P.ink, font: 'sans' });
          if (g.from(2)) { rect(70, y + 22, 340, 20, 'rgba(242,140,56,.45)'); txt('Desde 2024 se aplica solo a contenido externo.', 76, y + 26, { size: 10, color: P.ink, font: 'sans' }); }
          show(g.at(1), () => { arrow(240, 66, 240, 74, { color: P.yellow }); arrow(240, 152, 240, 144, { color: P.yellow }); }, 0);
          show(g.at(2), () => stamp('CONDICIÓN', 380, 60, { a: late(g.at(2)), color: P.orange, size: 10 }));
          show(g.at(3), () => banner('Lee las líneas anteriores y posteriores', { y: 232 }));
        }
      },
      {
        title: 'Autoridad, fecha y versión',
        caption: 'La misma regla aparece en tres fuentes de distinto valor.',
        steps: [
          'Fuente A: un blog personal de 2021 que resume la norma.',
          'Fuente B: un borrador interno, versión 0.3, sin aprobar.',
          'Fuente C: la política oficial vigente, versión 2.0 de 2026.',
          'Solo C sirve como evidencia para una decisión. Autoridad, fecha y versión también cuentan.'
        ],
        draw(g) {
          const src = [['A · BLOG PERSONAL', '2021', 'resumen no oficial', 0.2, P.red], ['B · BORRADOR v0.3', '2025', 'sin aprobar', 0.45, P.orange], ['C · POLÍTICA v2.0', '2026', 'oficial y vigente', 0.95, P.mint]];
          src.forEach((s, i) => show(g.at(i), () => {
            const x = 14 + i * 156;
            card(x, 14, 140, 200, s[0], s[4], { active: g.on(i) || (g.on(3) && i === 2) });
            icon(i === 0 ? 'globe' : 'doc', x + 52, 42, 3);
            chip(s[1], x + 70, 90, { align: 'center', fill: P.paper, size: 9, icon: 'calendar' });
            txt(s[2], x + 70, 118, { size: 8.5, align: 'center', color: P.light });
            meter(x + 14, 160, 112, s[3], { label: 'valor como evidencia', n: 8 });
            if (g.from(3)) icon(i === 2 ? 'check' : 'cross', x + 58, 184, 2);
          }));
          show(g.at(3), () => banner('Autoridad · fecha · versión', { y: 232 }));
        }
      }
    ],
    examples: [
      ['Cita suficiente', 'El fragmento afirma la misma regla, con el mismo sujeto y condiciones.'],
      ['Cita decorativa', 'Habla del tema con palabras parecidas, pero no prueba la conclusión.'],
      ['Cita recortada', 'Omite «salvo» o «solo en» y cambia el alcance de la norma.']
    ],
    mistakes: [
      'Contar las citas en lugar de leerlas.',
      'Aceptar una cita porque comparte palabras clave.',
      'Ignorar la fecha o la versión de la fuente citada.'
    ],
    questions: [
      ['¿Cómo distingues relevancia temática de evidencia suficiente?', 'Comparando la afirmación con el fragmento: ¿mismo sujeto, misma regla o dato, mismas condiciones? Si solo comparte el tema o el vocabulario, es relevante pero no evidencia.'],
      ['¿Qué puede fallar aunque una respuesta cite una fuente?', 'Que la fuente no diga exactamente eso, que esté recortada, que sea antigua o no oficial, o que la cita apunte al documento correcto pero al fragmento equivocado.'],
      ['¿Qué tres datos de una fuente comprobarías antes de usarla para decidir?', 'Autoridad (quién la emite), fecha y versión (si está vigente).']
    ],
    quiz: [
      { q: 'Una cita es evidencia suficiente cuando…', o: ['Comparte palabras con la afirmación', 'Respalda la afirmación exacta: sujeto, regla y condiciones', 'Es larga', 'Aparece la primera'], c: 1, why: 'Debe demostrar la frase concreta.' },
      { q: '¿Por qué leer las líneas que rodean una cita?', o: ['Por cortesía', 'Porque una condición cercana puede cambiar el sentido', 'Para contar palabras', 'No es necesario'], c: 1, why: 'Las citas recortadas engañan.' },
      { q: 'Entre un blog de 2021 y la política oficial vigente…', o: ['Valen igual', 'La política oficial vigente tiene más valor como evidencia', 'El blog es mejor porque resume', 'Ninguna sirve'], c: 1, why: 'Autoridad, fecha y versión cuentan.' }
    ],
    terms: [['Cita', 'Referencia localizable al fragmento de una fuente que respalda una afirmación.'], ['Evidencia suficiente', 'Fragmento que demuestra la afirmación exacta, no solo el tema.']]
  });

  /* ------------------------------------------------------------------ */
  PL.concept({
    id: 'notebooklm', block: 'b4', slide: 'S11', title: 'Taller: NotebookLM o herramienta equivalente',
    idea: 'El objetivo no es memorizar botones, sino practicar el flujo fuente → pregunta → respuesta → cita → verificación, y reconocer cuándo las fuentes no contienen la respuesta.',
    explain: [
      'NotebookLM es un ejemplo de entorno para trabajar con un conjunto de fuentes. Las opciones de importación y las funciones cambian, así que el foco está en el flujo de trabajo. Se recomiendan materiales no sensibles y diversos: estos apuntes, un artículo autorizado, un documento de otra asignatura y, opcionalmente, una transcripción.',
      'Pasos: crear un cuaderno con nombre descriptivo; añadir 3-4 fuentes y comprobar que se procesaron; preguntar algo que esté explícito en una fuente y abrir la cita; preguntar algo que no esté y observar si la herramienta reconoce el límite; generar una guía de estudio o preguntas de repaso y validar una muestra.',
      'En lugar de «hazme un resumen», conviene hacer preguntas que obliguen a usar evidencia: comparar definiciones citando cada diferencia, extraer criterios en una tabla con cita o formular preguntas de repaso indicando la sección que permite comprobarlas.'
    ],
    panels: [
      {
        title: 'Fuente → pregunta → respuesta → cita',
        caption: 'Recreación simplificada de un cuaderno basado en fuentes (la interfaz real puede variar).',
        steps: [
          'Creamos un cuaderno con nombre descriptivo y añadimos tres o cuatro fuentes autorizadas.',
          'Preguntamos algo cuya respuesta esté explícita en una fuente.',
          'La respuesta llega con marcas de cita numeradas.',
          'Abrimos la cita: aparece el fragmento exacto. Ahora sí podemos comprobar.'
        ],
        draw(g) {
          const w = win(10, 8, 460, 254, 'Cuaderno · Fundamentos de IA aplicada');
          show(g.at(0), () => {
            box(w.x, w.y, 120, 222, { fill: P.gray2, shadow: false });
            txt('FUENTES', w.x + 8, w.y + 6, { size: 8, color: P.teal });
            ['apuntes.md', 'guia-rag.pdf', 'articulo-web', 'otra-asign.pdf'].forEach((s, i) => { icon('doc', w.x + 8, w.y + 24 + i * 24, 1, P.teal); txt(s, w.x + 24, w.y + 26 + i * 24, { size: 8, maxW: 88, fit: true }); icon('check', w.x + 104, w.y + 24 + i * 24, 1); });
          });
          show(g.at(1), () => { box(w.x + 128, w.y, 196, 34, { fill: P.blue, shadow: false }); txt('¿Qué no resuelve RAG?', w.x + 136, w.y + 11, { size: 9, color: P.ink, font: 'sans' }); });
          show(g.at(2), () => {
            box(w.x + 128, w.y + 42, 196, 120, { fill: P.white, shadow: false });
            [['No garantiza recuperar el fragmento correcto', 1], ['No corrige documentos obsoletos', 1], ['No sustituye los permisos', 2]].forEach((l, i) => { txt('• ' + l[0], w.x + 136, w.y + 50 + i * 34, { size: 8, color: P.ink, maxW: 160, font: 'sans' }); chip(String(l[1]), w.x + 306, w.y + 48 + i * 34, { fill: P.yellow, size: 7, w: 14, h: 13, pad: 2 }); });
          });
          show(g.at(3), () => {
            glow(w.x + 306, w.y + 48, 14, 13, P.yellow);
            box(w.x + 332, w.y, 116, 222, { fill: P.paper, shadow: false });
            txt('[1] apuntes.md', w.x + 338, w.y + 6, { size: 8, color: P.navy });
            txt('§5 «Qué no resuelve RAG»', w.x + 338, w.y + 20, { size: 7, color: P.navy, maxW: 106, fit: true });
            rect(w.x + 336, w.y + 36, 108, 56, 'rgba(247,207,90,.6)');
            txt('«No garantiza que se recupere el fragmento correcto. No corrige documentos obsoletos…»', w.x + 340, w.y + 40, { size: 7.5, color: P.ink, maxW: 100, font: 'sans' });
            bars(w.x + 340, w.y + 104, 96, 6, { seed: 3 });
          });
        }
      },
      {
        title: 'Cuando la respuesta no está en las fuentes',
        caption: 'Preguntamos algo que ninguna fuente contiene y comparamos dos comportamientos.',
        steps: [
          'Preguntamos: «¿Cuál es el horario de tutorías de la asignatura?». Ninguna fuente lo dice.',
          'Buen comportamiento: «Las fuentes no contienen esa información». Reconoce el límite.',
          'Mal comportamiento: «Los martes de 16 a 18 h». Completa el hueco con algo plausible.',
          'Siguiente paso: añadir una fuente autorizada que lo contenga, reformular… y nunca dar por buena una respuesta sin cita.'
        ],
        draw(g) {
          show(g.at(0), () => { box(60, 12, 360, 32, { fill: P.blue }); txt('«¿Cuál es el horario de tutorías de la asignatura?»', 240, 21, { size: 9.5, color: P.ink, align: 'center', font: 'sans' }); });
          show(g.at(1), () => {
            card(14, 60, 218, 120, 'RECONOCE EL LÍMITE', P.mint, { active: g.on(1) });
            robot(26, 98, { s: 2, mood: 'happy', color: P.purple });
            bubble(66, 88, 156, 54, { text: '«Las fuentes no contienen esa información.»', tx: 62, ty: 116, size: 8.5, font: 'sans' });
            icon('check', 110, 150, 2);
          });
          show(g.at(2), () => {
            card(248, 60, 218, 120, 'RELLENA EL HUECO', P.red, { active: g.on(2) });
            robot(260, 98, { s: 2, mood: 'sure', color: P.purple });
            bubble(300, 88, 156, 54, { text: '«Los martes de 16 a 18 h.»', tx: 296, ty: 116, size: 9, font: 'sans' });
            stamp('SIN CITA', 378, 160, { a: late(g.at(2)), size: 10 });
          });
          show(g.at(3), () => { chip('añadir fuente autorizada', 24, 196, { fill: P.mint, size: 8.5, icon: 'folder' }); chip('reformular la pregunta', 190, 196, { fill: P.paper, size: 8.5, icon: 'pencil' }); chip('sin cita, no vale', 346, 196, { fill: P.yellow, size: 8.5, icon: 'link' }); banner('Distingue respuesta basada en fuentes de conocimiento general', { y: 230, size: 8.5 }); });
        }
      },
      {
        title: 'Preguntas que obligan a usar evidencia',
        caption: '«Hazme un resumen» frente a tres preguntas de calidad para un cuaderno.',
        steps: [
          'Pregunta pobre: «Hazme un resumen». No pide evidencia ni estructura.',
          'Mejor: «Compara cómo los documentos definen RAG. Cita la fuente de cada diferencia y separa definiciones de inferencias».',
          'Mejor: «Extrae los criterios de evaluación del Bloque 3 en una tabla con criterio, evidencia esperada y cita. Si falta, escribe "no especificado"».',
          'Mejor: «Formula cinco preguntas de repaso que solo puedan responderse con estas fuentes e indica qué sección permite comprobarlas».'
        ],
        draw(g) {
          show(g.at(0), () => { chip('«Hazme un resumen»', 20, 16, { fill: P.red, size: 10, icon: 'cross', iconTint: P.ink }); txt('sin evidencia · sin estructura', 200, 22, { size: 8.5, color: P.red }); });
          const good = [['COMPARAR', 'Compara las definiciones de RAG; cita la fuente de cada diferencia; separa definición e inferencia.', P.sky], ['EXTRAER', 'Criterios del Bloque 3 en tabla con evidencia y cita; si falta: «no especificado».', P.orange], ['REPASAR', '5 preguntas que solo se respondan con las fuentes, con la sección que las comprueba.', P.purple]];
          good.forEach((gd, i) => show(g.at(i + 1), () => {
            const y = 50 + i * 64;
            card(14, y, 452, 56, gd[0], gd[2], { active: g.on(i + 1) });
            txt(gd[1], 24, y + 24, { size: 9, maxW: 400, font: 'sans' });
            icon('link', 444, y + 26, 1);
          }));
        }
      },
      {
        title: 'Flujo de estudio recomendado',
        caption: 'Un ciclo para usar el cuaderno durante todo el máster.',
        steps: [
          '1 · Guarda los materiales de cada clase en tu vault de Markdown. 2 · Añade al cuaderno solo las fuentes relevantes.',
          '3 · Haz preguntas de comprensión y pide citas. 4 · Convierte las respuestas revisadas en tarjetas, esquemas o notas propias.',
          '5 · Detecta lagunas: preguntas sin evidencia, contradicciones o términos no entendidos.',
          '6 · Vuelve a las fuentes primarias antes de estudiar o reutilizar una afirmación importante.'
        ],
        draw(g) {
          const st = [['VAULT', 'folder', 0], ['FUENTES', 'doc', 0], ['PREGUNTAS', 'question', 1], ['TARJETAS', 'list', 1], ['LAGUNAS', 'search', 2], ['PRIMARIAS', 'book', 3]];
          const cx = 240, cy = 130, rx = 176, ry = 90;
          const pos = st.map((_, i) => { const a = -Math.PI / 2 + i * (Math.PI * 2 / 6); return [cx + Math.cos(a) * rx, cy + Math.sin(a) * ry]; });
          pos.forEach((p, i) => { const q = pos[(i + 1) % 6]; arrow(lerp(p[0], q[0], 0.3), lerp(p[1], q[1], 0.3), lerp(p[0], q[0], 0.7), lerp(p[1], q[1], 0.7), { p: g.at(st[(i + 1) % 6][2]), color: P.mint }); });
          st.forEach((s, i) => show(g.at(s[2]), () => { card(pos[i][0] - 46, pos[i][1] - 24, 92, 48, (i + 1) + ' · ' + s[0], g.on(s[2]) ? P.orange : P.teal, { size: 7.5 }); icon(s[1], pos[i][0] - 12, pos[i][1] - 4, 2); }, 0));
          txt('ESTUDIAR\nCON FUENTES', cx, cy - 10, { size: 10, align: 'center', color: P.teal });
        }
      }
    ],
    examples: [
      ['Pregunta explícita', '«¿Qué tres efectos tienen los tokens según los apuntes?» → respuesta con cita al Bloque 1.'],
      ['Pregunta sin evidencia', '«¿Qué nota mínima hay que sacar?» → debería reconocer que no consta.'],
      ['Guía de estudio', 'Pedir preguntas de repaso con la sección que las responde y validar una muestra.']
    ],
    mistakes: [
      'Cargar decenas de archivos desordenados «por si acaso».',
      'Aceptar respuestas sin abrir ninguna cita.',
      'Confundir una respuesta general con una basada en las fuentes.'
    ],
    questions: [
      ['¿Qué harías si la fuente no contiene la respuesta?', 'Aceptar que no consta, buscar y añadir una fuente autorizada que la contenga o reformular la pregunta. No completar el hueco con conocimiento general sin avisar.'],
      ['¿Qué fuentes añadirías a tu cuaderno para este máster y cuáles no?', 'Sí: apuntes, guías oficiales, artículos autorizados, tus notas. No: documentos con datos personales, material sin permiso de uso o archivos irrelevantes que añaden ruido.'],
      ['Escribe una pregunta de calidad para tu cuaderno sobre el Bloque 2.', 'Ejemplo: «Extrae las piezas de una buena instrucción en una tabla con pieza, pregunta que responde y ejemplo, citando la sección de cada una».']
    ],
    quiz: [
      { q: 'El objetivo del taller de NotebookLM es…', o: ['Memorizar los botones', 'Practicar el flujo fuente → pregunta → respuesta → cita → verificación', 'Generar resúmenes largos', 'Subir el máximo de archivos'], c: 1, why: 'Las interfaces cambian; el flujo permanece.' },
      { q: 'Si las fuentes no contienen la respuesta, la herramienta debería…', o: ['Inventar algo plausible', 'Reconocer el límite', 'Responder con conocimiento general sin avisar', 'Cerrar el cuaderno'], c: 1, why: 'Es el comportamiento que se observa en el taller.' },
      { q: '¿Cuál es una pregunta que obliga a usar evidencia?', o: ['«Hazme un resumen»', '«Extrae los criterios en una tabla con su cita»', '«Cuéntame algo»', '«¿Qué opinas?»'], c: 1, why: 'Exige estructura y procedencia.' }
    ],
    terms: [['NotebookLM', 'Herramienta de Google para trabajar con un conjunto de fuentes y obtener respuestas citadas.'], ['Cuaderno', 'Espacio de trabajo que agrupa fuentes, preguntas y notas sobre un tema.']]
  });
})();

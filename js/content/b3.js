/* Bloque 3 · Specs-Driven Development */
(function () {
  'use strict';
  const D = PL.D, K = PL.K;
  const { P, rect, frame, box, card, txt, chip, arrow, path, icon, sprite, robot, person, bubble, win, msg, paper, bars, probBars, meter, stamp, table, flow, show, pop, pulse, blink, glow, sparkle, qmark, typed, lerp, ease, clamp, line, measure, rnd } = D;
  const { banner, heading, mail, axes, dot, circle, knob, tokens, badge, code, vbars, scale, ticket } = K;
  const late = a => clamp(a * 2 - 1);

  PL.block({
    id: 'b3', n: 3, short: 'Specs-Driven Development', title: 'Specs-Driven Development', hours: 5, color: '#a184f0',
    question: '¿Cómo se controla un encargo complejo antes de generarlo?',
    evidence: 'Spec, entregable y reflexión de verificación',
    idea: 'Cuando el resultado tiene varias partes, un prompt aislado no basta. Una especificación convierte expectativas difusas en un acuerdo verificable antes de generar.'
  });

  /* mini maqueta de landing */
  function landing(x, y, w, h, o = {}) {
    const c = win(x, y, w, h, o.title || 'landing.html', { fill: P.white, bar: P.gray3 });
    rect(c.x, c.y, c.w, 34, o.hero || P.orange);
    txt(o.brand || 'ARTESANA SHOES', c.x + 8, c.y + 7, { size: 10, color: P.ink });
    txt(o.claim || 'Hecho a mano para ti', c.x + 8, c.y + 21, { size: 7.5, color: P.ink });
    rect(c.x + 6, c.y + 40, 44, 34, P.light); icon('image', c.x + 16, c.y + 46, 2);
    txt(o.price || '89 €', c.x + 58, c.y + 44, { size: 10, color: P.ink });
    txt(o.quote || '«¡Los mejores!» — Marta G.', c.x + 58, c.y + 60, { size: 7, color: P.navy, maxW: c.w - 64, fit: true });
    chip(o.cta || 'Comprar', c.x + 6, c.y + 82, { fill: P.blue, size: 8, color: P.white });
    return c;
  }

  /* ------------------------------------------------------------------ */
  PL.concept({
    id: 'prompt-no-basta', block: 'b3', slide: 'S2', title: 'Cuando un prompt no basta',
    idea: 'En un encargo con muchas partes aparecen decisiones implícitas. Si no se explicitan, el modelo las completa con opciones probables: no desobedece, es que el encargo tenía huecos.',
    explain: [
      'Un prompt resuelve bien una consulta acotada: resumir un párrafo, proponer asuntos de correo o pasar un texto a una tabla. Cuando se pide una web, un informe, un proceso, una automatización o un código con varios requisitos, aparecen muchas decisiones implícitas.',
      'Si esas decisiones no se explicitan, el modelo elige estructuras genéricas, inventa textos comerciales, añade funciones no pedidas u olvida requisitos que para la persona usuaria eran obvios.',
      'Demostración típica: pedir «Crea una landing page para una marca de calzado artesanal» y revisar juntos qué ha inventado: nombre, precios, testimonios, imágenes, público, tono, estructura y condiciones comerciales.'
    ],
    panels: [
      {
        title: 'Lo que se inventa cuando pides «sin más»',
        caption: 'Una landing generada a partir de una sola frase, con las decisiones que el modelo tomó por su cuenta.',
        steps: [
          'Pedimos: «Crea una landing page para una marca de calzado artesanal».',
          'En segundos aparece algo vistoso y aparentemente terminado…',
          '…pero ha decidido por nosotros: nombre de marca, precio, testimonio, imagen y llamada a comprar.',
          'Pregunta al grupo: ¿cuáles de esas decisiones serían aceptables en una empresa real?'
        ],
        draw(g) {
          person(20, 150, { shirt: P.teal });
          show(g.at(0), () => bubble(10, 40, 150, 70, { text: '«Crea una landing page para una marca de calzado artesanal»', tx: 34, ty: 148, size: 9 }));
          arrow(170, 130, 196, 130, { p: g.at(1), color: P.sky });
          show(g.at(1), () => landing(200, 20, 220, 150));
          const tags = [['nombre inventado', 330, 22], ['precio inventado', 330, 74], ['testimonio inventado', 412, 112], ['imagen inventada', 204, 186], ['«Comprar» no pedido', 290, 186]];
          tags.forEach((t, i) => show(clamp(g.at(2) * 5 - i), () => chip(t[0], t[1], t[2], { fill: P.red, size: 7.5, align: i === 2 ? 'right' : 'left' })));
          show(g.at(2), () => { line(330, 34, 300, 46, P.red, 1); line(330, 86, 292, 72, P.red, 1); line(360, 112, 340, 104, P.red, 1); line(236, 186, 236, 150, P.red, 1); line(300, 186, 240, 176, P.red, 1); });
          show(g.at(3), () => banner('¿Qué decisiones serían aceptables en una empresa real?', { y: 230 }));
        }
      },
      {
        title: 'El iceberg de las decisiones implícitas',
        caption: 'Lo escrito en el prompt es la punta; debajo están las decisiones que nadie ha tomado.',
        steps: [
          'Lo que escribimos es solo la punta: «una landing para calzado artesanal».',
          'Debajo quedan decisiones sin tomar: objetivo, audiencia, alcance y contenido autorizado…',
          '…restricciones legales, tono, qué no se puede inventar y criterios para darlo por bueno.',
          'Si no se explicitan, el modelo las completa con opciones probables. No desobedece: el encargo tenía huecos.'
        ],
        draw(g) {
          rect(0, 74, 480, 196, '#12305a');
          for (let x = 0; x < 480; x += 16) rect(x + ((D.T * 8) % 16), 74, 8, 2, P.sky);
          const rowsUp = [[210, 30, 60], [180, 44, 120], [160, 58, 160]];
          rowsUp.forEach(r => rect(r[0], r[1] - 8, r[2], 16, P.white));
          const rowsDown = [[150, 74, 180], [110, 98, 260], [80, 122, 320], [70, 146, 340], [90, 170, 300], [130, 194, 220], [180, 218, 120]];
          rowsDown.forEach(r => rect(r[0], r[1], r[2], 24, '#9fc5e8'));
          txt('«landing para calzado»', 240, 46, { size: 8.5, color: P.ink, align: 'center' });
          const hidden = [['objetivo', 1, 150, 104], ['audiencia', 1, 250, 104], ['alcance', 1, 350, 104], ['contenido autorizado', 1, 200, 130], ['límites legales', 2, 110, 156], ['tono', 2, 220, 156], ['qué no inventar', 2, 320, 156], ['criterios de aceptación', 2, 240, 182]];
          hidden.forEach(h => show(g.at(h[1]), () => chip(h[0], h[2], h[3], { align: 'center', fill: P.ink, color: P.yellow, size: 8.5, border: P.yellow })));
          show(g.at(3), () => banner('El modelo no desobedece: rellena los huecos del encargo', { y: 238, h: 26 }));
        }
      },
      {
        title: 'Petición acotada frente a encargo complejo',
        caption: 'Cuándo basta con un prompt y cuándo hace falta un acuerdo previo.',
        steps: [
          'Un prompt basta para consultas acotadas: resumir un párrafo, proponer asuntos de correo, pasar un texto a tabla.',
          'Una web, un informe, un proceso o una automatización acumulan muchas decisiones y requisitos.',
          'Para esos encargos conviene un acuerdo previo y verificable: una especificación.'
        ],
        draw(g) {
          show(g.at(0), () => {
            card(14, 16, 200, 200, 'CONSULTA ACOTADA', P.mint, { active: g.on(0) });
            ['Resumir un párrafo', 'Proponer 5 asuntos de correo', 'Pasar texto a tabla'].forEach((s, i) => chip(s, 26, 44 + i * 26, { fill: P.paper, size: 8.5, w: 176 }));
            chip('1 prompt claro', 114, 136, { align: 'center', fill: P.yellow, size: 9 });
            arrow(114, 156, 114, 176, { color: P.mint });
            icon('check', 102, 180, 2);
          });
          show(g.at(1), () => {
            card(232, 16, 234, 200, 'ENCARGO COMPLEJO', P.purple, { active: g.on(1) });
            [['web', 'image'], ['informe', 'doc'], ['proceso', 'gear'], ['código', 'chip']].forEach((r, i) => { icon(r[1], 248 + i * 54, 44, 2); txt(r[0], 260 + i * 54, 72, { size: 7.5, color: P.light, align: 'center' }); });
            for (let i = 0; i < 14; i++) { const x = 246 + (i % 7) * 30, y = 92 + Math.floor(i / 7) * 22; rect(x, y, 22, 14, [P.yellow, P.orange, P.pink, P.sky][i % 4]); txt('?', x + 11, y + 2, { size: 9, color: P.ink, align: 'center' }); }
            txt('muchas decisiones', 349, 142, { size: 8, color: P.light, align: 'center' });
          });
          show(g.at(2), () => {
            arrow(349, 156, 349, 172, { color: P.mint });
            chip('SPEC: acuerdo verificable', 349, 176, { align: 'center', fill: P.mint, size: 9, icon: 'doc' });
            banner('Encargo complejo → especificación antes de generar', { y: 230 });
          });
        }
      }
    ],
    examples: [
      ['Landing', 'Sin spec, la IA inventa nombre, precios y testimonios.'],
      ['Informe', 'Sin alcance definido, mezcla temas y añade recomendaciones no pedidas.'],
      ['Automatización', 'Sin requisitos, elige herramientas y casos límite por su cuenta.']
    ],
    mistakes: [
      'Pedir un entregable complejo en una sola frase.',
      'Culpar al modelo de «desobedecer» cuando el encargo tenía huecos.',
      'Aceptar contenidos comerciales inventados porque «quedan bien».'
    ],
    questions: [
      ['¿Qué hueco tendría mayor impacto en el resultado final de una landing?', 'El objetivo: una landing para captar citas no se diseña igual que una informativa o una de venta. Después, la audiencia y el contenido autorizado (qué datos se pueden usar).'],
      ['¿Qué decisiones de la landing inventada serían inaceptables en una empresa real?', 'Precios, testimonios y nombres de clientes inventados, afirmaciones de calidad no verificadas y condiciones comerciales. Pueden ser engañosos e incluso tener implicaciones legales.'],
      ['¿Qué decisión debe tomar una persona antes de que la IA pueda producir un buen borrador?', 'Para qué sirve el entregable y para quién, qué información está autorizada y cómo se reconocerá que está bien. Sin eso, la IA solo puede adivinar.']
    ],
    quiz: [
      { q: 'Cuando un encargo complejo deja decisiones sin tomar, el modelo…', o: ['Se niega a responder', 'Las completa con opciones probables', 'Pregunta siempre', 'Genera solo lo que está explícito'], c: 1, why: 'Rellena los huecos, a menudo con contenido genérico o inventado.' },
      { q: '¿Cuándo basta un prompt?', o: ['Para una web completa', 'Para una consulta acotada', 'Para un proceso de empresa', 'Nunca'], c: 1, why: 'Las tareas pequeñas y bien definidas no necesitan spec.' },
      { q: 'La landing generada «sin más» suele incluir…', o: ['Solo lo pedido', 'Precios, testimonios y nombres inventados', 'Citas de fuentes', 'Preguntas al usuario'], c: 1, why: 'Son decisiones que el encargo no cerraba.' }
    ],
    terms: [['Decisión implícita', 'Elección necesaria para hacer un encargo que nadie ha explicitado.']]
  });

  /* ------------------------------------------------------------------ */
  PL.concept({
    id: 'spec', block: 'b3', slide: 'S4', title: 'Qué es una especificación',
    idea: 'Una spec es un documento breve que define el resultado esperado antes de construirlo. No burocratiza: reduce malentendidos, da un criterio común y permite verificar.',
    explain: [
      'Anatomía mínima: problema y objetivo (qué se construye y para qué), audiencia y uso (quién lo utilizará), alcance (qué incluye y qué queda fuera), restricciones (qué no debe inventar o vulnerar), criterios de aceptación (cómo sabremos que está bien) y fuentes y dependencias (qué información se puede usar).',
      'Un requisito expresa una necesidad: «la web debe tener un formulario». Un criterio de aceptación permite comprobarla: «el formulario solicita nombre, correo y consentimiento; muestra un mensaje de confirmación; no permite enviarlo vacío».',
      'Cuanto más observable sea un criterio, menos discusión habrá al revisar el resultado.'
    ],
    panels: [
      {
        title: 'Anatomía mínima de una spec',
        caption: 'Seis apartados, cada uno con su pregunta y un ejemplo de la landing de calzado.',
        steps: [
          'Problema y objetivo (¿qué se construye y para qué?) · Audiencia y uso (¿quién lo utilizará?).',
          'Alcance (¿qué incluye y qué queda fuera?) · Restricciones (¿qué no debe inventar o vulnerar?).',
          'Criterios de aceptación (¿cómo sabremos que está bien?) · Fuentes y dependencias (¿qué información se puede usar?).',
          'Una página basta. No es burocracia: es un acuerdo que permite verificar.'
        ],
        draw(g) {
          const rows = [['OBJETIVO', '¿Qué y para qué?', 'Página de captación de contactos', P.orange], ['AUDIENCIA', '¿Quién la usa?', 'Quien busca calzado artesanal', P.sky], ['ALCANCE', '¿Qué entra y qué no?', '4 secciones; sin tienda online', P.blue], ['RESTRICCIONES', '¿Qué no inventar?', 'Ni precios, ni testimonios', P.red], ['CRITERIOS', '¿Cómo sabremos que está bien?', 'CTA visible, lectura móvil', P.mint], ['FUENTES', '¿Qué información usar?', 'Dossier de marca aprobado', P.yellow]];
          rows.forEach((r, i) => show(g.at(Math.floor(i / 2)), () => {
            const y = 14 + i * 36;
            chip(r[0], 14, y, { fill: r[3], size: 8, w: 104, h: 30 });
            box(122, y, 150, 30, { fill: P.gray2, shadow: false });
            txt(r[1], 130, y + 10, { size: 8.5, maxW: 136, fit: true });
            box(276, y, 190, 30, { fill: P.white, shadow: false });
            txt(r[2], 284, y + 10, { size: 8.5, color: P.ink, maxW: 176, fit: true });
          }, 4));
          show(g.at(3), () => banner('Una página · un acuerdo verificable', { y: 236 }));
        }
      },
      {
        title: 'Requisito frente a criterio de aceptación',
        caption: 'Un requisito expresa una necesidad; los criterios permiten comprobarla mirando el resultado.',
        steps: [
          'Requisito: expresa una necesidad. «La web debe tener un formulario».',
          'Criterio 1: «Solicita nombre, correo y consentimiento». Se comprueba mirando los campos.',
          'Criterios 2 y 3: «Muestra un mensaje de confirmación» y «No permite enviar el formulario vacío».',
          'Cuanto más observable sea el criterio, menos discusión habrá al revisar.'
        ],
        draw(g) {
          show(g.at(0), () => { card(14, 20, 150, 70, 'REQUISITO', P.orange); txt('«La web debe tener un formulario»', 89, 46, { size: 9, align: 'center', maxW: 136 }); });
          const crit = [['Pide nombre, correo y consentimiento', 1], ['Muestra confirmación al enviar', 2], ['No se envía vacío', 2]];
          crit.forEach((c, i) => {
            const y = 108 + i * 42;
            path([[89, 92], [89, y + 14], [104, y + 14]], { p: g.at(c[1]), color: P.mint });
            show(g.at(c[1]), () => { box(108, y, 168, 30, { fill: P.gray2, shadow: false }); badge(i + 1, 114, y + 8, P.mint); txt(c[0], 134, y + 10, { size: 8, maxW: 136, fit: true }); });
          });
          show(g.at(1), () => {
            const c = win(296, 20, 170, 196, 'Formulario', { fill: P.white });
            ['Nombre', 'Correo'].forEach((f, i) => { txt(f, c.x + 4, c.y + 4 + i * 34, { size: 8, color: P.ink }); box(c.x + 4, c.y + 16 + i * 34, c.w - 8, 16, { fill: P.white, shadow: false, border: P.navy }); });
            box(c.x + 4, c.y + 76, 11, 11, { fill: P.white, shadow: false, border: P.navy }); txt('Acepto el tratamiento de datos', c.x + 20, c.y + 77, { size: 7, color: P.ink, maxW: 130, fit: true });
            chip('Enviar', c.x + 4, c.y + 98, { fill: P.blue, size: 8.5, color: P.white });
            show(g.at(2), () => { chip('Completa los campos obligatorios', c.x + 4, c.y + 124, { fill: P.red, size: 7, w: c.w - 8, color: P.white }); chip('✓ ¡Gracias! Te contactaremos', c.x + 4, c.y + 148, { fill: P.mint, size: 7, w: c.w - 8 }); }, 2);
          });
          show(g.at(3), () => banner('Más observable = menos discusión', { y: 238, w: 270, h: 22 }));
        }
      },
      {
        title: '¿Observable o vago?',
        caption: 'Clasificamos criterios de aceptación según si se pueden comprobar mirando el resultado.',
        steps: [
          '«Que quede bonito» → vago: ¿bonito para quién? No se puede comprobar.',
          '«El botón de cita se ve sin hacer scroll en móvil» → observable: se comprueba mirando.',
          '«Lenguaje claro» → vago… salvo que se concrete: «sin tecnicismos y frases de menos de 25 palabras».',
          '«Cada afirmación procede de la información facilitada» → observable: se contrasta con las fuentes.'
        ],
        draw(g) {
          card(14, 108, 210, 128, 'VAGO', P.red);
          card(256, 108, 210, 128, 'OBSERVABLE', P.mint);
          const items = [['«Que quede bonito»', 0, 0], ['«CTA visible sin scroll en móvil»', 1, 1], ['«Lenguaje claro»', 2, 0], ['«Sin tecnicismos; frases < 25 palabras»', 2, 1], ['«Cada afirmación procede de las fuentes»', 3, 1]];
          const slot = [0, 0];
          items.forEach(it => {
            const a = g.at(it[1]);
            if (a <= 0) return;
            const k = slot[it[2]]++;
            const tx = it[2] ? 361 : 119, ty = 132 + k * 24;
            const x = lerp(240, tx, ease(a)), y = lerp(30, ty, ease(a));
            chip(it[0], x, y, { align: 'center', fill: it[2] ? P.mint : P.orange, size: 8, w: 194 });
          });
          show(g.on(2) ? g.at(2) : 0, () => arrow(160, 156, 262, 156, { color: P.yellow }));
          robot(224, 40, { s: 1, mood: 'think', color: P.purple, still: false });
        }
      }
    ],
    examples: [
      ['Requisito', '«La web debe tener un formulario de cita».'],
      ['Criterio observable', '«El formulario solicita solo nombre, correo, teléfono opcional y una descripción breve».'],
      ['Restricción', '«No utilizar precios, reseñas, horarios ni certificaciones que no estén en las fuentes».']
    ],
    mistakes: [
      'Escribir criterios subjetivos («moderno», «bonito», «profesional») sin concretar.',
      'Confundir el requisito con su comprobación.',
      'Intentar resolver cada detalle de implementación en la spec.'
    ],
    questions: [
      ['¿Qué prueba demostraría que el formulario no acepta campos vacíos?', 'Intentar enviarlo con cada campo obligatorio vacío y comprobar que el envío se bloquea con un mensaje comprensible junto al campo. La evidencia puede ser una captura, un vídeo o un test automatizado.'],
      ['Convierte en observable: «La página debe cargar rápido».', 'Por ejemplo: «En móvil con conexión 4G, el contenido principal se muestra en menos de 3 segundos», comprobado con una herramienta de medición.'],
      ['¿Qué dato no debería faltar en una spec si el resultado se publica fuera del aula?', 'Las fuentes autorizadas y el responsable de aprobarlo, además de las restricciones sobre qué no se puede inventar ni publicar (datos personales, precios, afirmaciones no verificadas).']
    ],
    quiz: [
      { q: '¿Cuál es un criterio de aceptación observable?', o: ['«Que sea atractiva»', '«El botón de cita es visible sin scroll en un móvil de 390 px»', '«Que guste al cliente»', '«Moderna»'], c: 1, why: 'Se puede comprobar mirando el resultado.' },
      { q: 'El apartado «Alcance» de una spec responde a…', o: ['¿Quién la usará?', '¿Qué incluye y qué queda fuera?', '¿Qué fuentes usar?', '¿Cuánto cuesta?'], c: 1, why: 'Delimita lo incluido y lo excluido.' },
      { q: 'La función principal de una spec es…', o: ['Burocratizar el trabajo', 'Reducir malentendidos y permitir verificar', 'Sustituir la revisión humana', 'Hacer el prompt más largo'], c: 1, why: 'Convierte expectativas difusas en un acuerdo verificable.' }
    ],
    terms: [['Spec (especificación)', 'Documento breve que define el resultado esperado antes de construirlo.'], ['Alcance', 'Delimitación de lo que incluye y excluye un entregable.'], ['Requisito', 'Necesidad que debe cumplir el resultado.'], ['Criterio de aceptación', 'Condición observable que permite comprobar si un requisito se cumple.']]
  });

  /* ------------------------------------------------------------------ */
  const SDD = [['ESPECIFICAR', 'doc'], ['ACLARAR', 'question'], ['GENERAR', 'chip'], ['VERIFICAR', 'list'], ['ITERAR', 'pencil']];
  PL.concept({
    id: 'flujo-sdd', block: 'b3', slide: 'S5', title: 'Ciclo Specs-Driven Development',
    idea: 'Especificar → aclarar ambigüedades → generar → verificar → iterar. Si la verificación revela un hueco, se vuelve a la spec en lugar de pedir «hazlo mejor».',
    explain: [
      'Especificar: escribir objetivo, audiencia, alcance, fuentes permitidas, restricciones y criterios de aceptación. Una spec inicial puede tener una página.',
      'Aclarar: pedir a la IA, a una persona usuaria o a un compañero que identifique preguntas abiertas (tono, información legal, qué pasa si no hay imagen, prioridad móvil, datos que no se pueden usar). Generar: entregar la spec cerrada con las fuentes; separar la fase de preguntas de la de generación evita que el modelo elija demasiado pronto.',
      'Verificar: convertir los criterios en una checklist y señalar qué se cumple, qué falla y con qué evidencia. Iterar: pedir un cambio concreto o corregir la spec si el criterio era ambiguo. Debe evitarse el «hazlo mejor» sin explicar qué condición no se cumplió.'
    ],
    panels: [
      {
        title: 'El ciclo completo',
        caption: 'Cinco fases en bucle. La flecha de retorno lleva lo aprendido de nuevo a la spec.',
        steps: [
          'Especificar: objetivo, audiencia, alcance, fuentes, restricciones y criterios. Una página basta.',
          'Aclarar ambigüedades: pedir a la IA, a un usuario o a un compañero las preguntas abiertas.',
          'Generar: entregar la spec cerrada y las fuentes. Separar preguntas y generación evita elegir demasiado pronto.',
          'Verificar: convertir los criterios en checklist. No basta con que «parezca bueno».',
          'Iterar: pedir un cambio concreto o ajustar la spec si el criterio era ambiguo. Y el ciclo continúa.'
        ],
        draw(g) {
          const cx = 240, cy = 128, rx = 170, ry = 86;
          const pos = SDD.map((_, i) => { const a = -Math.PI / 2 + i * (Math.PI * 2 / 5); return [cx + Math.cos(a) * rx, cy + Math.sin(a) * ry]; });
          pos.forEach((p, i) => { const q = pos[(i + 1) % 5]; const a = g.at(i === 4 ? 4 : i + 1); arrow(lerp(p[0], q[0], 0.28), lerp(p[1], q[1], 0.28), lerp(p[0], q[0], 0.72), lerp(p[1], q[1], 0.72), { p: a, color: i === 4 ? P.yellow : P.mint, w: i === 4 ? 3 : 2 }); });
          txt('SDD', cx, cy - 12, { size: 18, align: 'center', color: P.purple });
          txt('generar no es el final', cx, cy + 10, { size: 8.5, align: 'center', color: P.light });
          SDD.forEach((s, i) => show(g.at(i), () => {
            const [x, y] = pos[i];
            card(x - 54, y - 26, 108, 52, (i + 1) + ' · ' + s[0], g.on(i) ? P.orange : g.past(i) ? P.mint : P.purple, { active: g.on(i), size: 8 });
            icon(s[1], x - 12, y - 4, 2);
          }, 0));
          show(g.at(4), () => chip('vuelve a la spec', (pos[4][0] + pos[0][0]) / 2 - 26, (pos[4][1] + pos[0][1]) / 2 - 22, { align: 'center', fill: P.yellow, size: 8 }));
        }
      },
      {
        title: 'Aclarar ambigüedades antes de generar',
        caption: 'Las preguntas abiertas se pegan como notas sobre la spec y se resuelven antes de generar.',
        steps: [
          'Tenemos una primera spec. Parece completa…',
          'Al revisarla (con IA o con un compañero) aparecen preguntas: ¿qué tono?, ¿qué texto legal?, ¿y si no hay imagen?…',
          'Respondemos cada pregunta y la decisión pasa a la spec.',
          'Spec cerrada: ahora sí, a generar.'
        ],
        draw(g) {
          paper(130, 14, 220, 222, { title: 'spec-landing.md', lines: 0 });
          bars(140, 40, 196, 20, { color: P.light, seed: 5, gap: 9 });
          const notes = [['¿Qué tono?', 'cercano', 40, 30], ['¿Texto legal?', 'aviso RGPD', 360, 40], ['¿Sin imagen?', 'icono neutro', 30, 110], ['¿Prioridad móvil?', 'sí', 364, 120], ['¿Qué datos no?', 'ni precios', 50, 180]];
          notes.forEach((n, i) => show(clamp(g.at(1) * 5 - i), () => {
            const solved = g.at(2) > 0.5;
            box(n[2], n[3], 90, 44, { fill: solved ? P.mint : P.yellow });
            txt(n[0], n[2] + 6, n[3] + 7, { size: 8.5, color: P.ink, maxW: 80, fit: true });
            if (solved) txt('→ ' + n[1], n[2] + 6, n[3] + 24, { size: 8, color: P.ink, maxW: 80, fit: true });
            line(n[2] + (n[2] < 200 ? 90 : 0), n[3] + 22, n[2] < 200 ? 140 : 340, n[3] + 30, solved ? P.mint : P.yellow, 1, !solved);
          }));
          show(g.at(3), () => stamp('SPEC CERRADA', 240, 140, { a: late(g.at(3)), color: P.mint, size: 14 }));
        }
      },
      {
        title: 'Verificar: criterio → checklist → evidencia',
        caption: 'Cada criterio de aceptación se comprueba con una evidencia concreta, no con una impresión.',
        steps: [
          'Cada criterio de aceptación se convierte en una línea de checklist.',
          'Para cada línea: ¿se cumple? Señala la evidencia: captura, enlace, resultado de una prueba.',
          'Un criterio falla: el formulario pide la fecha de nacimiento, que no estaba en la spec.',
          'Resultado: no «parece bueno», sino 4 criterios cumplidos con evidencia y 1 por corregir.'
        ],
        draw(g) {
          const rows = [['Criterio', 'Estado', 'Evidencia'], ['Propósito claro en 10 s', 'ok', 'prueba con 3 personas'], ['CTA visible para pedir cita', 'ok', 'captura móvil 390 px'], ['Servicios en lenguaje claro', 'ok', 'revisión de textos'], ['Formulario: solo campos acordados', 'ko', 'pide fecha de nacimiento'], ['Afirmaciones con fuente', 'ok', 'dossier p. 2-3']];
          rows.forEach((r, j) => {
            const y = 16 + j * 34;
            const a = j === 0 ? g.at(0) : j === 4 ? g.at(2) : g.at(j < 4 ? 1 : 1);
            if (j === 0) show(g.at(0), () => table(14, y, [190, 66, 196], [r], { rh: 26 }), 0);
            else show(g.at(0), () => {
              box(14, y, 190, 28, { fill: P.gray2, shadow: false });
              txt(r[0], 22, y + 9, { size: 8.5, maxW: 176, fit: true });
              box(204, y, 66, 28, { fill: P.gray, shadow: false });
              box(270, y, 196, 28, { fill: P.gray, shadow: false });
              const st = j === 4 ? g.at(2) : g.at(1);
              if (st > 0.5) { icon(r[1] === 'ok' ? 'check' : 'cross', 231, y + 8, 1); txt(r[2], 278, y + 9, { size: 8, color: r[1] === 'ok' ? P.mint : P.red, maxW: 182, fit: true }); }
            }, 0);
          });
          show(g.at(3), () => { chip('4 cumplidos', 140, 228, { align: 'center', fill: P.mint, size: 10, icon: 'check', iconTint: P.ink }); chip('1 por corregir', 340, 228, { align: 'center', fill: P.red, size: 10, icon: 'cross', iconTint: P.ink }); });
        }
      },
      {
        title: 'Iterar con precisión',
        caption: '«Hazlo mejor» frente a una petición que nombra el criterio que falló.',
        steps: [
          'Petición vaga: «Hazlo mejor». El modelo no sabe qué condición falló y cambia cosas al azar.',
          'Petición precisa: «Falla el criterio 4: el formulario pide fecha de nacimiento. Elimínala y no cambies nada más».',
          'Si el criterio era ambiguo, la corrección se hace en la spec, no solo en el resultado.',
          'Iterar no es fracasar: es control de calidad.'
        ],
        draw(g) {
          show(g.at(0), () => {
            card(14, 16, 218, 150, '«HAZLO MEJOR»', P.red);
            for (let i = 0; i < 7; i++) { const y = 42 + i * 16; rect(26, y, 120 + rnd(i) * 60, 6, P.gray3); if (rnd(i + 3) > 0.4) { rect(24, y - 2, 4, 10, P.red); } }
            txt('cambia 9 cosas al azar', 123, 154, { size: 8, color: P.red, align: 'center' });
          });
          show(g.at(1), () => {
            card(248, 16, 218, 150, 'PETICIÓN PRECISA', P.mint);
            txt('«Falla el criterio 4: el formulario pide fecha de nacimiento. Elimínala y no cambies nada más.»', 357, 40, { size: 8.5, align: 'center', maxW: 196 });
            for (let i = 0; i < 4; i++) rect(262, 104 + i * 12, 150, 6, P.gray3);
            rect(260, 126, 4, 10, P.mint); txt('− fecha de nacimiento', 270, 126, { size: 7.5, color: P.mint });
            txt('1 cambio, comprobable', 357, 154, { size: 8, color: P.mint, align: 'center' });
          });
          show(g.at(2), () => {
            paper(170, 172, 140, 48, { title: 'spec-landing.md', lines: 2 });
            icon('pencil', 290, 188, 2);
            arrow(357, 168, 312, 190, { color: P.yellow });
            txt('¿criterio ambiguo? → corrige la spec', 240, 228, { size: 8.5, color: P.yellow, align: 'center' });
          });
          show(g.at(3), () => banner('Iterar = control de calidad', { y: 246, h: 20, size: 8.5 }));
        }
      }
    ],
    examples: [
      ['Aclarar', '«Revisa esta spec y enumera solo las ambigüedades que impiden cumplir los criterios sin inventar».'],
      ['Verificar', 'Checklist con cada criterio, estado (cumplido, fallido, pendiente) y evidencia.'],
      ['Iterar', '«El criterio 2 falla: el CTA no se ve sin scroll en móvil. Súbelo a la cabecera y no toques el resto».']
    ],
    mistakes: [
      'Saltar de la spec a generar sin resolver las ambigüedades.',
      'Dar por verificado algo porque «parece correcto».',
      'Pedir «hazlo mejor» sin señalar qué criterio falló.'
    ],
    questions: [
      ['¿En qué punto conviene volver atrás en vez de pedir «hazlo mejor»?', 'Cuando la verificación descubre que un criterio era ambiguo o imposible de medir, o que faltaba una decisión. Entonces se corrige la spec y se vuelve a generar o ajustar.'],
      ['¿Qué harías con un criterio que no puede comprobarse?', 'Reformularlo para hacerlo observable o marcarlo como pendiente con justificación. No se debe dar por cumplido por apariencia.'],
      ['¿Por qué separar la fase de preguntas de la de generación?', 'Porque si se mezclan, el modelo tiende a elegir respuestas probables para las dudas y generar ya; separarlas obliga a cerrar las decisiones antes.'],
      ['¿Cuándo termina el ciclo SDD?', 'Cuando todos los criterios tienen un estado y una evidencia suficiente, y lo que falla está corregido o aceptado de forma explícita.']
    ],
    quiz: [
      { q: '¿Cuál es el orden del ciclo SDD?', o: ['Generar → especificar → verificar', 'Especificar → aclarar → generar → verificar → iterar', 'Verificar → generar → aclarar', 'Aclarar → generar → publicar'], c: 1, why: 'Primero se acuerda y aclara, después se genera y se comprueba.' },
      { q: 'Si falla un criterio porque era ambiguo, lo correcto es…', o: ['Pedir «hazlo mejor»', 'Corregir la spec y volver a generar o ajustar', 'Ignorarlo', 'Cambiar de herramienta'], c: 1, why: 'El problema estaba en el acuerdo, no solo en el resultado.' },
      { q: 'Verificar significa…', o: ['Mirar si parece bonito', 'Comprobar cada criterio con evidencia', 'Leer el resultado una vez', 'Preguntar al modelo si está bien'], c: 1, why: 'Cada criterio tiene un estado y una prueba.' }
    ],
    terms: [['SDD', 'Specs-Driven Development: especificar, aclarar, generar, verificar e iterar.'], ['Checklist de aceptación', 'Lista de criterios con su estado y evidencia.'], ['Iteración', 'Ciclo de corrección dirigido por un criterio concreto.']]
  });

  /* ------------------------------------------------------------------ */
  PL.concept({
    id: 'spec-ejemplo', block: 'b3', slide: 'S6–S9', title: 'Ejemplo guiado: la spec del Taller Sierra',
    idea: 'Una spec real de una página, un prompt para revisarla sin generar y otro para generar desde la spec cerrada con autocomprobación.',
    explain: [
      'Spec: landing de captación para Taller Sierra, un taller de reparación de bicicletas en Granada. Alcance: cabecera, propuesta de valor, tres servicios, proceso de cita y formulario; sin pago ni agenda real. Fuentes: texto y logotipo del cliente; nada de precios, reseñas, horarios o certificaciones que no estén en ellas.',
      'Criterios de aceptación: el propósito se entiende en 10 segundos; hay una llamada a la acción visible para pedir cita; los servicios se entienden; el formulario pide solo nombre, correo, teléfono opcional y descripción; cada afirmación procede de la información facilitada.',
      'Primero se pide revisar la spec «como responsable de producto y contenido, sin generar todavía», enumerando las ambigüedades por prioridad. Después se genera «usando exclusivamente la spec y las fuentes», comprobando cada criterio en una checklist e indicando lo que no pueda cumplirse por falta de datos.'
    ],
    panels: [
      {
        title: 'La spec, apartado a apartado',
        caption: 'Spec del Taller Sierra en Markdown. El resaltado indica la parte que se comenta en cada paso.',
        steps: [
          'Objetivo y audiencia: landing de una página para pedir cita; adultos de Granada con bicicleta que reparar.',
          'Alcance y fuentes permitidas: cuatro secciones y formulario; solo texto y logotipo del cliente.',
          'Restricciones: español claro, máximo cuatro secciones, legible en móvil, sin testimonios inventados.',
          'Criterios de aceptación: lo que se comprobará después, uno a uno.'
        ],
        draw(g) {
          paper(14, 8, 300, 256, { title: 'spec-taller-sierra.md' });
          const L = [['# Spec: landing Taller Sierra', 0, P.purple], ['## Objetivo', 0, P.blue], ['Landing para pedir cita', 0, P.ink], ['## Audiencia', 0, P.blue], ['Adultos de Granada con bici', 0, P.ink], ['## Alcance', 1, P.blue], ['- 4 secciones + formulario', 1, P.ink], ['- Sin pago ni agenda real', 1, P.ink], ['## Fuentes permitidas', 1, P.blue], ['- Texto y logo del cliente', 1, P.ink], ['## Restricciones', 2, P.blue], ['- Español claro; legible en móvil', 2, P.ink], ['- Sin testimonios inventados', 2, P.ink], ['## Criterios de aceptación', 3, P.blue]];
          L.forEach((l, i) => { if (g.on(l[1])) rect(20, 26 + i * 16.5, 286, 15, 'rgba(247,207,90,.35)'); });
          code(L.map(l => ({ t: l[0], color: l[2] })), 26, 29, { size: 8, lh: 16.5 });
          const crit = ['Propósito claro en 10 s', 'CTA visible para pedir cita', 'Servicios comprensibles', 'Formulario: solo 4 campos', 'Todo procede de las fuentes'];
          show(g.at(3), () => { card(326, 30, 140, 200, 'CRITERIOS', P.mint); crit.forEach((c, i) => { badge(i + 1, 334, 56 + i * 34, P.mint); txt(c, 354, 58 + i * 34, { size: 8, maxW: 106 }); }); });
          const notes = [['qué y para quién', P.orange], ['qué entra y con qué', P.blue], ['qué no se hace', P.red]];
          notes.forEach((n, i) => { if (g.on(i)) chip(n[0], 390, 110, { align: 'center', fill: n[1], size: 9 }); });
        }
      },
      {
        title: 'Primero, revisar la spec (sin generar)',
        caption: 'Un prompt que pide solo las ambigüedades, agrupadas por prioridad.',
        steps: [
          'Prompt: «Revisa la siguiente especificación como responsable de producto y contenido. No generes la landing todavía».',
          '«Enumera solo las ambigüedades o decisiones necesarias para cumplir los criterios sin inventar información. Agrupa por prioridad».',
          'Respuesta: prioridad alta (¿qué tres servicios?, ¿hay logotipo?), media (¿tono de tú o de usted?) y baja (¿colores de marca?).',
          'Respondemos y actualizamos la spec. Ahora está cerrada.'
        ],
        draw(g) {
          show(g.at(0), () => { box(14, 12, 452, 40, { fill: P.yellow }); txt('«Revisa la spec como responsable de producto y contenido. No generes la landing todavía.»', 240, 20, { size: 8.5, color: P.ink, align: 'center', maxW: 436, font: 'sans' }); });
          show(g.at(1), () => { box(14, 58, 452, 30, { fill: P.yellow }); txt('«Enumera solo las ambigüedades. Agrupa por prioridad.»', 240, 67, { size: 8.5, color: P.ink, align: 'center', font: 'sans' }); });
          const cols = [['ALTA', P.red, ['¿Qué tres servicios exactos?', '¿Hay logotipo en buena calidad?']], ['MEDIA', P.orange, ['¿Tú o usted?', '¿Teléfono obligatorio?']], ['BAJA', P.sky, ['¿Colores de marca?', '¿Foto del local?']]];
          cols.forEach((c, k) => show(g.at(2), () => {
            const x = 14 + k * 154;
            card(x, 98, 144, 118, 'PRIORIDAD ' + c[0], c[1]);
            c[2].forEach((q, i) => { box(x + 8, 124 + i * 40, 128, 32, { fill: g.from(3) ? P.mint : P.white, shadow: false }); txt(q, x + 14, 129 + i * 40, { size: 8, color: P.ink, maxW: 116 }); });
          }));
          show(g.at(3), () => banner('Respuestas incorporadas → spec cerrada', { y: 230, color: P.mint }));
        }
      },
      {
        title: 'Generar desde la spec cerrada y autocomprobar',
        caption: 'El resultado incluye su propia checklist y marca lo que falta en lugar de inventarlo.',
        steps: [
          'Prompt: «Genera el contenido de la landing usando exclusivamente la spec y las fuentes incluidas».',
          '«Antes de entregar, comprueba cada criterio de aceptación en una checklist breve».',
          '«Si un criterio no puede cumplirse por falta de datos, indícalo y no lo inventes».',
          'Resultado: landing + checklist. No había horario en las fuentes: aparece «[horario pendiente]», no uno inventado.'
        ],
        draw(g) {
          show(g.at(0), () => { paper(14, 20, 90, 70, { title: 'spec', lines: 3 }); paper(14, 100, 90, 70, { title: 'fuentes', lines: 3, seed: 4 }); arrow(108, 96, 132, 96, { color: P.sky }); robot(136, 76, { color: P.purple }); arrow(172, 96, 190, 96, { color: P.mint }); });
          show(g.at(0), () => {
            const c = win(194, 14, 162, 214, 'taller-sierra.html', { fill: P.white });
            rect(c.x, c.y, c.w, 30, P.teal); txt('TALLER SIERRA', c.x + 6, c.y + 5, { size: 9, color: P.ink }); txt('Reparamos tu bici en Granada', c.x + 6, c.y + 18, { size: 7, color: P.ink });
            ['Puesta a punto', 'Frenos y cambios', 'Ruedas'].forEach((s, i) => chip(s, c.x + 4, c.y + 38 + i * 18, { fill: P.paper, size: 7, w: c.w - 8, h: 15 }));
            chip('Pedir cita', c.x + 4, c.y + 96, { fill: P.orange, size: 8 });
            show(g.at(3), () => { rect(c.x + 4, c.y + 120, c.w - 8, 16, P.yellow); txt('[horario pendiente]', c.x + 8, c.y + 124, { size: 7.5, color: P.ink }); }, 0);
            bars(c.x + 4, c.y + 146, c.w - 12, 4, { seed: 6 });
          });
          show(g.at(1), () => {
            card(366, 14, 100, 214, 'CHECKLIST', P.mint);
            ['propósito', 'CTA visible', 'servicios', 'formulario', 'fuentes'].forEach((s, i) => { icon(i === 4 && g.from(2) ? 'warn' : 'check', 374, 40 + i * 30, 1); txt(s, 390, 42 + i * 30, { size: 8 }); });
          });
          show(g.at(2), () => { chip('falta el horario: no se inventa', 280, 236, { align: 'center', fill: P.yellow, size: 8.5 }); });
        }
      },
      {
        title: 'El taller en siete pasos',
        caption: 'Recorrido de la práctica principal del bloque, con revisión entre pares.',
        steps: [
          '1 · Define el problema y el usuario final en dos o tres frases. 2 · Escribe la spec con la plantilla.',
          '3 · Intercámbiala: otra persona marca ambigüedades y criterios poco comprobables.',
          '4 · Pide a una IA preguntas de aclaración, respóndelas y actualiza la spec. 5 · Genera una primera versión.',
          '6 · Pasa la checklist de aceptación. 7 · Registra una iteración: qué falló, qué pediste y cómo quedó.'
        ],
        draw(g) {
          const st = [['Problema y usuario', 'target', 0], ['Escribir spec', 'doc', 0], ['Revisión entre pares', 'user', 1], ['Preguntas a la IA', 'question', 2], ['Generar v1', 'chip', 2], ['Checklist', 'list', 3], ['Registrar iteración', 'pencil', 3]];
          rect(30, 120, 420, 4, P.gray3);
          st.forEach((s, i) => {
            const x = 40 + i * 66, up = i % 2 === 0;
            show(g.at(s[2]), () => {
              rect(x - 3, 116, 10, 12, g.on(s[2]) ? P.yellow : P.mint);
              const y = up ? 30 : 140;
              box(x - 28, y, 62, 74, { fill: g.on(s[2]) ? P.gray2 : P.gray });
              badge(i + 1, x - 24, y + 4, P.purple);
              icon(s[1], x - 10, y + 22, 2, s[1] === 'user' ? P.orange : undefined);
              txt(s[0], x + 3, y + 50, { size: 7.5, align: 'center', maxW: 56 });
              line(x + 2, up ? y + 74 : y, x + 2, up ? 116 : 128, P.gray3, 1);
            });
          });
          show(g.at(1), () => { person(330, 222, { shirt: P.teal, still: true, s: 1 }); person(352, 222, { shirt: P.orange, still: true, s: 1 }); txt('intercambio', 346, 246, { size: 7, align: 'center', color: P.light }); });
        }
      }
    ],
    examples: [
      ['Prompt de revisión', '«Revisa la siguiente especificación como si fueras responsable de producto y contenido. No generes la landing todavía. Enumera solo las ambigüedades… Agrupa las preguntas por prioridad».'],
      ['Prompt de generación', '«Genera el contenido de la landing usando exclusivamente la especificación y las fuentes incluidas. Antes de entregar, comprueba cada criterio… Si un criterio no puede cumplirse por falta de datos, indícalo».'],
      ['Entregables del taller', 'Plantilla de correo, landing sencilla, documento de una página, guía de proceso o una función de código pequeña.']
    ],
    mistakes: [
      'Elegir un entregable demasiado grande para especificarlo y revisarlo en clase.',
      'Saltarse la revisión entre pares.',
      'No registrar la iteración: qué falló y qué se cambió.'
    ],
    questions: [
      ['¿Qué cambiaría si las fuentes del Taller Sierra no estuvieran autorizadas?', 'No se podrían usar: el sistema debería pedirlas o limitarse a la estructura con marcadores pendientes, sin buscar ni inventar datos para completar el texto.'],
      ['¿Por qué es valioso que el resultado marque «[horario pendiente]»?', 'Porque cumple la restricción de no inventar y hace visible lo que falta. Una persona puede completarlo con el dato real antes de publicar.'],
      ['En la revisión entre pares, ¿qué preguntas debe responder quien revisa la spec?', '¿Se entiende el objetivo sin conocer el proyecto? ¿Está definida la audiencia? ¿El alcance distingue lo incluido de lo excluido? ¿Las restricciones evitan invenciones relevantes? ¿Los criterios se pueden comprobar observando el resultado? ¿Están identificadas las fuentes autorizadas?']
    ],
    quiz: [
      { q: 'El primer prompt sobre la spec debe…', o: ['Generar la landing', 'Revisar ambigüedades sin generar todavía', 'Pedir precios', 'Traducirla'], c: 1, why: 'Separar revisión y generación evita decisiones prematuras.' },
      { q: 'Si falta un dato al generar desde la spec, el modelo debe…', o: ['Inventarlo con algo plausible', 'Indicarlo y no inventarlo', 'Omitir la sección sin avisar', 'Usar un dato de otra empresa'], c: 1, why: 'Lo pide explícitamente el prompt de generación.' },
      { q: 'En el taller, el entregable debe ser…', o: ['Un proyecto completo de software', 'Lo bastante pequeño para especificarlo, generarlo y revisarlo en el aula', 'Lo más grande posible', 'Siempre código'], c: 1, why: 'Así se puede completar el ciclo entero.' }
    ],
    terms: [['Fuente autorizada', 'Información que se permite usar para generar el resultado.'], ['Revisión entre pares', 'Revisión de la spec por otra persona para detectar ambigüedades y criterios no comprobables.']]
  });

  /* ------------------------------------------------------------------ */
  PL.concept({
    id: 'trazabilidad', block: 'b3', slide: 'S10', title: 'Rigor, trazabilidad y colaboración',
    idea: 'Una spec hace visibles decisiones que quedarían escondidas en conversaciones o en la cabeza de alguien. Conservar evidencia suficiente permite revisar, colaborar y responder de un resultado.',
    explain: [
      'Una spec mejora el trabajo con IA y también la colaboración humana: varias personas pueden revisar el mismo acuerdo y detectar la causa de una discrepancia.',
      'Trazabilidad mínima: versión de la spec, fuentes o datos autorizados, herramienta o modelo usado cuando sea relevante, fecha de generación, criterios de aceptación, resultado de la verificación y cambios introducidos por revisión humana.',
      'No hace falta registrar cada frase en tareas de bajo riesgo. Sí conviene conservar evidencia cuando el resultado se usa en un proyecto, se comparte con un cliente o afecta a una decisión importante.'
    ],
    panels: [
      {
        title: 'Qué conservar',
        caption: 'La ficha mínima de trazabilidad de un entregable generado con ayuda de IA.',
        steps: [
          'Versión de la spec y fuentes o datos autorizados.',
          'Herramienta o modelo usado (cuando sea relevante) y fecha de generación.',
          'Criterios de aceptación, resultado de la verificación y cambios hechos en la revisión humana.',
          'Con esa ficha, cualquiera puede reconstruir qué se hizo, con qué y por qué.'
        ],
        draw(g) {
          card(14, 14, 290, 220, 'FICHA DE TRAZABILIDAD', P.purple);
          const rows = [['doc', 'Versión de la spec', 'v1.3', 0], ['folder', 'Fuentes autorizadas', 'dossier.pdf', 0], ['chip', 'Herramienta / modelo', 'asistente X', 1], ['calendar', 'Fecha de generación', '07/10/2026', 1], ['list', 'Criterios', '5 criterios', 2], ['check', 'Verificación', '4 ✓ · 1 ✗', 2], ['user', 'Cambios humanos', 'quita fecha nac.', 2]];
          rows.forEach((r, i) => show(g.at(r[3]), () => {
            const y = 40 + i * 27;
            icon(r[0], 24, y + 1, 1, r[0] === 'user' ? P.orange : undefined);
            txt(r[1], 42, y + 2, { size: 8.5 });
            chip(r[2], 296, y - 2, { align: 'right', fill: P.paper, size: 7.5 });
          }, 3));
          show(g.at(2), () => {
            txt('versiones', 386, 18, { size: 8, color: P.light, align: 'center' });
            ['v1.1', 'v1.2', 'v1.3'].forEach((v, i) => { chip(v, 386, 36 + i * 52, { align: 'center', fill: i === 2 ? P.mint : P.gray3, size: 9, color: P.ink }); if (i < 2) arrow(386, 54 + i * 52, 386, 86 + i * 52, { color: P.light }); });
            txt('+ criterio 4 aclarado', 394, 66, { size: 7, color: P.light }); txt('+ corrección humana', 394, 118, { size: 7, color: P.light });
          });
          show(g.at(3), () => banner('Reconstruir qué se hizo, con qué y por qué', { y: 240, h: 22, x: 14, w: 452 }));
        }
      },
      {
        title: 'Una spec compartida por varias personas',
        caption: 'Sin acuerdo escrito, cada persona imagina un resultado distinto; con él, las discrepancias se localizan.',
        steps: [
          'Sin spec: diseño, contenido y cliente imaginan resultados distintos. Nadie lo sabe hasta el final.',
          'Con spec: todos revisan el mismo documento.',
          'Aparece una discrepancia («¿formulario con teléfono obligatorio?») y se localiza en un criterio concreto.',
          'La spec hace visibles decisiones que, si no, quedarían en la cabeza de alguien.'
        ],
        draw(g) {
          const ppl = [[40, P.teal, 'diseño'], [210, P.orange, 'contenido'], [380, P.pink, 'cliente']];
          ppl.forEach((p, i) => {
            person(p[0], 160, { shirt: p[1], label: p[2], phase: i });
            show(g.until(0), () => { box(p[0] - 26, 70, 76, 70, { fill: P.white }); [P.purple, P.mint, P.yellow][i] && rect(p[0] - 20, 76, 64, 18, [P.purple, P.mint, P.yellow][i]); bars(p[0] - 20, 102, 60, 3, { seed: i + 2 }); }, 0);
          });
          show(g.until(0), () => txt('tres ideas distintas del mismo encargo', 240, 30, { size: 9, align: 'center', color: P.red }), 0);
          show(g.at(1), () => { paper(180, 34, 120, 110, { title: 'spec v1', lines: 6 }); ppl.forEach(p => line(p[0] + 12, 158, 240, 146, P.mint, 1)); });
          show(g.at(2), () => { rect(190, 96, 100, 10, 'rgba(239,90,90,.6)'); chip('criterio 4: ¿teléfono obligatorio?', 240, 10, { align: 'center', fill: P.yellow, size: 8.5 }); arrow(240, 28, 240, 92, { color: P.yellow }); });
          show(g.at(3), () => banner('Decisiones visibles, no escondidas en una cabeza', { y: 232 }));
        }
      },
      {
        title: 'Trazabilidad proporcional al riesgo',
        caption: 'No todo necesita el mismo registro.',
        steps: [
          'Tarea de bajo riesgo (proponer asuntos para un correo interno): basta con revisar el resultado.',
          'Entregable de un proyecto: spec con versión, fuentes y checklist.',
          'Resultado para un cliente o una decisión importante: ficha completa, incluida la revisión humana.'
        ],
        draw(g) {
          const cols = [['BAJO RIESGO', 'Asuntos para un correo interno', 0.15, ['revisión rápida']], ['PROYECTO', 'Guía de proceso del equipo', 0.55, ['spec + versión', 'fuentes', 'checklist']], ['CLIENTE / DECISIÓN', 'Propuesta para un cliente', 0.95, ['spec + versión', 'fuentes', 'herramienta y fecha', 'checklist + evidencia', 'cambios humanos']]];
          cols.forEach((c, k) => show(g.at(k), () => {
            const x = 14 + k * 156;
            card(x, 14, 140, 220, c[0], [P.mint, P.yellow, P.red][k], { active: g.on(k) });
            txt(c[1], x + 70, 38, { size: 8.5, align: 'center', maxW: 126 });
            meter(x + 14, 84, 112, c[2], { label: 'registro necesario', n: 8, color: [P.mint, P.yellow, P.red][k] });
            c[3].forEach((it, i) => chip(it, x + 70, 104 + i * 24, { align: 'center', fill: P.paper, size: 7.5, w: 120 }));
          }));
        }
      }
    ],
    examples: [
      ['Registro breve', '«v1.2 · fuentes: dossier 2026 · generado el 07/10 · 5/5 criterios · cambiado el tono del CTA tras revisión».'],
      ['Colaboración', 'El equipo comenta sobre la spec en lugar de discutir sobre versiones del resultado.'],
      ['Auditoría', 'Ante una reclamación, se puede mostrar qué fuentes se usaron y quién aprobó el texto.']
    ],
    mistakes: [
      'No guardar qué fuentes se usaron.',
      'Perder la versión de la spec con la que se generó el resultado.',
      'Registrar todo para tareas triviales y nada para las importantes.'
    ],
    questions: [
      ['¿Cómo ayuda una spec a trabajar con varias personas?', 'Da un acuerdo común que todos pueden revisar. Cuando hay una discrepancia, se puede localizar en un apartado o criterio concreto en lugar de discutir impresiones sobre el resultado.'],
      ['¿Qué registrarías si entregas a un cliente un informe elaborado con IA?', 'Versión de la spec, fuentes autorizadas, herramienta y fecha, criterios y resultado de la verificación, y los cambios introducidos en la revisión humana.'],
      ['¿Qué criterio de aceptación falta normalmente en un encargo de tu trabajo?', 'Respuesta abierta. Muy a menudo faltan los criterios de fuente («cada dato con su origen») y de alcance («qué no incluye»).']
    ],
    quiz: [
      { q: '¿Qué elemento forma parte de la trazabilidad mínima?', o: ['El color favorito del cliente', 'La versión de la spec y las fuentes autorizadas', 'Todas las frases de la conversación', 'El número de tokens'], c: 1, why: 'Permiten reconstruir con qué se generó el resultado.' },
      { q: 'En una tarea de bajo riesgo…', o: ['Hay que registrar cada frase', 'Basta con una revisión proporcional', 'No se revisa nada', 'Se necesita una auditoría externa'], c: 1, why: 'La trazabilidad es proporcional al impacto.' },
      { q: 'Una ventaja colaborativa de la spec es…', o: ['Que sustituye la comunicación', 'Que hace visibles las decisiones y localiza discrepancias', 'Que evita revisar', 'Que acelera la generación'], c: 1, why: 'Todos revisan el mismo acuerdo.' }
    ],
    terms: [['Trazabilidad', 'Capacidad de reconstruir cómo se obtuvo un resultado: spec, fuentes, herramienta, fecha, verificación y cambios.']]
  });
})();

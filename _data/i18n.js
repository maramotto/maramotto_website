// Moved from js/i18n.js during B-1 (real English URLs). Single source of
// truth for the site's translated strings, now consumed at build time by
// the `t` filter (eleventy/filters/t.js) instead of client-side JS.
module.exports = {
  es: {
    /* --- NAV --- */
    'nav.projects':       'En qu\u00e9 ando',
    'nav.blog':           'Blog',
    'nav.workshops':      'Talleres',
    'nav.about':          'Sobre m\u00ed',
    'nav.contact':        'Contacto',
    'nav.home':           'Inicio',

    /* --- INDEX: HERO --- */
    'hero.subtitle':      'Artista \u00b7 Ingeniera de Software \u00b7 Tecn\u00f3loga Creativa',
    'hero.description':   'Construyo e invento objetos donde lo artesanal y lo digital se encuentran. C\u00f3digo, pintura, m\u00fasica, sonido y visuales.',
    'hero.cta.work':      'Ver mi trabajo',
    'hero.cta.about':     'Sobre m\u00ed',

    /* --- FEATURED PROJECT: CUERPOSONORO --- */
    'featured.label':         'En qu\u00e9 ando',
    'featured.visual.label':  'Cuerpo \u2192 Datos \u2192 Sonido',
    'featured.desc.1':        '\u00bfY si fuera tu cuerpo el que genera el sonido al moverse, en lugar de reaccionar a \u00e9l? CuerpoSonoro convierte el movimiento en sonido en tiempo real: sin partitura, sin secuencias grabadas, sin sensores. Solo t\u00fa movi\u00e9ndote.',
    'featured.tag.creative':  'Creative Coding',
    'featured.tag.sound':     'Sonido',
    'featured.cta':           'Ver proyecto \u2192',

    /* --- EN QU\u00c9 ANDO: ESTRATOS --- */
    'estratos.tagline':          'Datos p\u00fablicos \u2192 Sonido \u2192 Instalaci\u00f3n sonora',
    'estratos.desc':             '\u00bfY si la historia de un territorio se pudiera escuchar? Estratos convierte datos p\u00fablicos \u2014los que est\u00e1n ah\u00ed, disponibles, pero que nadie mira\u2014 en una instalaci\u00f3n sonora que cuenta lo que esconden.',
    'estratos.tag.opendata':     'Datos abiertos',
    'estratos.tag.sonification': 'Sonificaci\u00f3n de datos',
    'estratos.tag.installation': 'Instalaci\u00f3n',
    'estratos.status':           'En construcci\u00f3n',
    'estratos.status.cta':       'Escr\u00edbeme si te interesa \u2192',

    /* --- EN QU\u00c9 ANDO: UNIVERSO PUNZADAS --- */
    'punzadas.tagline':      'Podcast \u2192 Datos \u2192 Visualizaci\u00f3n y buscador',
    'punzadas.desc':         '<em>Punzadas Sonoras</em> es mi podcast favorito: me fascina c\u00f3mo In\u00e9s y Paula eligen los temas y c\u00f3mo los abordan. Siempre quise una biblioteca con las obras, autoras y referencias de sus m\u00e1s de 100 episodios, as\u00ed que la he construido.',
    'punzadas.tag.data':     'Datos',
    'punzadas.tag.search':   'Buscador',
    'punzadas.tag.dataviz':  'Visualizaci\u00f3n de datos',
    'punzadas.link':         'Ver proyecto \u2192',

    /* --- ABOUT --- */
    'about.label':        'Sobre m\u00ed',
    'about.title':        'Arte + Curiosidad + Creatividad',
    'about.p1':           'Soy feliz cuando imagino algo y consigo hacerlo real. Da igual si acaba siendo software, una canci\u00f3n, una acuarela o un taller: el impulso es el mismo.',
    'about.p2':           'Vengo de la ingenier\u00eda de software, pero la curiosidad me lleva lejos. Compongo y produzco m\u00fasica, pinto, hago macrofotograf\u00eda y dise\u00f1o instalaciones que convierten datos en sonido. Mezclar arte y c\u00f3digo no me parece raro, para m\u00ed es de lo m\u00e1s natural.',
    'about.p3':           '\u00daltimamente me interesa mucho lo que pasa cuando los datos dejan de ser una tabla o un gr\u00e1fico y se convierten en algo que se puede escuchar o tocar.',
    'about.p4':           'Creo en la tecnolog\u00eda que sirve a las personas. Es un conjunto de herramientas incre\u00edble, pero solo tiene sentido cuando se emplea en mejorar la vida de las personas y de los seres vivos.',
    'about.p5':           'Cuando no estoy creando, estoy con mi perro Otto, explorando r\u00edos y embalses en nuestro kayak, nadando, o en la carretera con nuestro coche camperizado buscando la pr\u00f3xima aventura.',

    /* --- SKILLS --- */
    'skills.label':           'Lo que hago',
    'skills.title':           'Multidisciplinar por naturaleza',
    'skill.code.title':       'C\u00f3digo y Software',
    'skill.code.desc':        'Desarrollo de software e IA, aplicaciones web, an\u00e1lisis de datos, creative coding.',
    'skill.music.title':      'M\u00fasica y Audio',
    'skill.music.desc':       'Composici\u00f3n, producci\u00f3n musical, ingenier\u00eda de audio para podcasts.',
    'skill.techart.title':    'Instalaciones tech-art',
    'skill.techart.desc':     'Objetos e instalaciones que convierten datos en sonido y movimiento.',
    'skill.visual.title':     'Arte Visual',
    'skill.visual.desc':      'Macrofotograf\u00eda, pintura, collage.',
    'skill.workshops.title':  'Talleres',
    'skill.workshops.desc':   'Talleres presenciales y online que fomentan la creatividad en adultos.',

    /* --- WORKSHOPS PAGE --- */
    'workshops.label':         'Talleres',
    'workshops.title':         'Talleres de creatividad',
    'workshops.intro':         'Talleres <<PENDIENTE: presenciales/online/ambos>> que fomentan la creatividad en adultos <<PENDIENTE: para quién concretamente>>.',
    'workshops.format.title':  'Formato',
    'workshops.format.body':   '<<PENDIENTE: describir formato y duración con el dato confirmado>>',
    'workshops.forwho.title':  '¿Para quién?',
    'workshops.forwho.body':   '<<PENDIENTE>>',
    'workshops.outcome.title': 'Qué te llevas',
    'workshops.outcome.body':  '<<PENDIENTE: qué hace/produce un participante>>',
    'workshops.cta.title':     '¿Te interesa?',
    'workshops.cta.body':      'Cuéntame qué buscas y hablamos.',
    'workshops.cta.button':    'Escríbeme',

    /* --- CONTACT --- */
    'contact.label':      'Contacto',
    'contact.title':      '\u00bfTrabajamos juntas?',
    'contact.desc':       '\u00bfTienes un proyecto en mente? \u00bfBuscas un perfil t\u00e9cnico y creativo?<br>Me encantar\u00eda saber de ti.',
    'contact.cta':        'Escr\u00edbeme',

    /* --- FOOTER --- */
    'footer.text':        'Hecho con arte y c\u00f3digo',

    /* ============================
       CUERPOSONORO PROJECT PAGE
       ============================ */

    /* --- Project hero --- */
    'cs.tagline':         'Software que transforma el movimiento del cuerpo humano en sonido. Cuerpo humano y tecnolog\u00eda transformados en arte, unidos en un solo proyecto.',
    'cs.tag.creative':    'Creative Coding',
    'cs.tag.arttech':     'Arte + Tecnolog\u00eda',
    'cs.tag.sound':       'Sonido',
    'cs.tag.body':        'Interacci\u00f3n corporal',

    /* --- The question --- */
    'cs.question.title':  'La pregunta',
    'cs.question.p1':     '\u00bfY si tu cuerpo fuera un instrumento musical? No una met\u00e1fora, no una danza, un instrumento real donde cada gesto produce un sonido \u00fanico, donde tu postura da forma al paisaje sonoro a tu alrededor.',
    'cs.question.p2':     'CuerpoSonoro naci\u00f3 de esa pregunta. Es un proyecto de software que explora la conexi\u00f3n entre el movimiento corporal y la generaci\u00f3n de sonido en tiempo real, convirtiendo el cuerpo humano en una interfaz musical expresiva.',

    /* --- How it works --- */
    'cs.how.title':       'C\u00f3mo funciona',
    'cs.how.p1.html':     'El software captura el movimiento corporal a trav\u00e9s de una c\u00e1mara y lo traduce en par\u00e1metros musicales. Cada gesto, cada postura genera una respuesta sonora diferente. No hay partituras ni secuencias pregrabadas: <span class="highlight">t\u00fa creas el sonido con tu propio cuerpo en tiempo real</span>.',
    'cs.how.p2':          'El principio art\u00edstico clave: el cuerpo no "toca notas" \u2014 el cuerpo da forma al sonido. No es un instrumento que dispara eventos discretos, sino una interfaz que moldea continuamente un paisaje sonoro vivo. Cualquier posici\u00f3n del cuerpo produce un estado sonoro interesante; no hay "notas falsas". Es como meter las manos en arcilla: siempre hay una forma, solo cambia cu\u00e1l.',

    /* --- Web demo --- */
    'cs.demo.title':      'Prueba la demo web',
    'cs.demo.p1':         'Experimenta CuerpoSonoro directamente en tu navegador. La demo web usa MediaPipe.js para la detecci\u00f3n de postura y la Web Audio API para la s\u00edntesis de sonido \u2014 no necesitas instalar nada.',
    'cs.demo.fallback.html': 'Si la demo no carga arriba, puedes <a href="https://cuerposonoro.art" target="_blank" rel="noopener" style="color: var(--teal); font-weight: 600;">abrirla en una nueva pesta\u00f1a</a>.',
    'cs.contact.title':   '\u00bfUn proyecto parecido en mente?',
    'cs.contact.cta':     'Escr\u00edbeme',

    /* --- Why it matters --- */
    'cs.why.title':       'Por qu\u00e9 este proyecto es importante para m\u00ed',
    'cs.why.p1':          'CuerpoSonoro se sit\u00faa exactamente donde me gusta trabajar: la intersecci\u00f3n del arte, la tecnolog\u00eda y la experiencia humana. Es un proyecto que requiere pensamiento musical, habilidad de programaci\u00f3n y una comprensi\u00f3n del cuerpo como medio expresivo.',
    'cs.why.p2.html':     'Representa lo que creo que la tecnolog\u00eda deber\u00eda ser: una herramienta que <span class="highlight">sirve a las personas, ampl\u00eda sus capacidades creativas y crea experiencias que de otro modo no existir\u00edan</span>.',

    /* --- Tech stack --- */
    'cs.tech.title':      'Stack tecnol\u00f3gico',
    'cs.tech.cv':         'Visi\u00f3n por computador',
    'cs.tech.audio':      'Motor de audio',
    'cs.tech.comm':       'Comunicaci\u00f3n',
    'cs.tech.demo':       'Demo web',
    'cs.tech.infra':      'Infraestructura',
    'cs.tech.test':       'Testing',
    'cs.tech.test.val':   'pytest \u2014 129 tests automatizados',
    'cs.tech.source':     'C\u00f3digo fuente',
    'cs.tech.source.val': 'Open Source (MIT)',

    /* --- Under the hood --- */
    'cs.hood.title':      'Bajo el cap\u00f3',
    'cs.hood.p1':         'CuerpoSonoro ejecuta un pipeline en tiempo real que va desde la captura de c\u00e1mara hasta la salida de audio en menos de 80 milisegundos. As\u00ed fluyen los datos por el sistema:',

    /* Pipeline steps */
    'cs.pipe.1.title':    'Captura',
    'cs.pipe.1.detail':   'C\u00e1mara a 640\u00d7480',
    'cs.pipe.2.title':    'Pose',
    'cs.pipe.2.detail':   '33 puntos corporales detectados por frame',
    'cs.pipe.3.title':    'Features',
    'cs.pipe.3.detail':   '17 descriptores de movimiento extra\u00eddos',
    'cs.pipe.4.title':    'Mapeo',
    'cs.pipe.4.detail':   'Features mapeadas a par\u00e1metros de sonido',
    'cs.pipe.5.title':    'Sonido',
    'cs.pipe.5.detail':   'S\u00edntesis de audio en tiempo real',

    /* --- Pose estimation --- */
    'cs.pose.title':      'Estimaci\u00f3n de pose y extracci\u00f3n de features',
    'cs.pose.p1.html':    'El sistema usa <span class="highlight">MediaPipe Pose</span> para detectar 33 puntos corporales en tiempo real a ~20\u201322 FPS. A partir de estas coordenadas, un m\u00f3dulo de extracci\u00f3n de features calcula 17 descriptores de movimiento que describen el car\u00e1cter de tu movimiento \u2014 no solo d\u00f3nde est\u00e1 tu cuerpo, sino <em>c\u00f3mo</em> se mueve:',

    /* Tech detail items */
    'cs.detail.energy.label':   'Energ\u00eda',
    'cs.detail.energy.value':   'Energ\u00eda de movimiento',
    'cs.detail.energy.desc':    'Actividad corporal global basada en velocidad de puntos',
    'cs.detail.balance.label':  'Equilibrio',
    'cs.detail.balance.value':  '\u00cdndice de simetr\u00eda',
    'cs.detail.balance.desc':   'Equilibrio izquierda-derecha del cuerpo',
    'cs.detail.fluidity.label': 'Fluidez',
    'cs.detail.fluidity.value': 'Suavidad temporal',
    'cs.detail.fluidity.desc':  'M\u00e9trica de jerk \u2014 movimiento fluido vs. brusco',
    'cs.detail.arms.label':     'Brazos',
    'cs.detail.arms.value':     '\u00c1ngulos de brazos',
    'cs.detail.arms.desc':      '\u00c1ngulo de elevaci\u00f3n de ambos brazos',
    'cs.detail.height.label':   'Altura',
    'cs.detail.height.value':   'Extensi\u00f3n vertical',
    'cs.detail.height.desc':    'Cu\u00e1n estirado o comprimido est\u00e1 el cuerpo',
    'cs.detail.tilt.label':     'Inclinaci\u00f3n',
    'cs.detail.tilt.value':     'Inclinaci\u00f3n de cadera y cabeza',
    'cs.detail.tilt.desc':      'Inclinaci\u00f3n lateral de caderas y cabeza',
    'cs.detail.hands.label':    'Manos',
    'cs.detail.hands.value':    'Velocidad y altura de manos',
    'cs.detail.hands.desc':     'Velocidad y posici\u00f3n vertical de ambas manos',
    'cs.detail.triggers.label': 'Disparadores',
    'cs.detail.triggers.value': 'Disparadores de movimiento',
    'cs.detail.triggers.desc':  'Movimientos repentinos de manos detectados como eventos',

    /* --- Movement → Sound mapping --- */
    'cs.mapping.title':         'Movimiento \u2192 Mapeo de sonido',
    'cs.mapping.p1':            'Cada feature de movimiento controla un aspecto espec\u00edfico del sonido. El mapeo est\u00e1 dise\u00f1ado para ser intuitivo \u2014 tu cuerpo entiende la conexi\u00f3n antes de que tu mente lo haga:',
    'cs.mapping.header.move':   'Movimiento',
    'cs.mapping.header.sound':  'Efecto sonoro',
    'cs.mapping.fast':          'Movimiento r\u00e1pido',
    'cs.mapping.fast.sound':    'Sonido m\u00e1s brillante y fuerte',
    'cs.mapping.arms':          'Levantar los brazos',
    'cs.mapping.arms.sound':    'Tono m\u00e1s agudo',
    'cs.mapping.asym':          'Asimetr\u00eda corporal',
    'cs.mapping.asym.sound':    'Paneo est\u00e9reo',
    'cs.mapping.smooth':        'Movimiento suave y fluido',
    'cs.mapping.smooth.sound':  'Reverb largo, textura legato',
    'cs.mapping.abrupt':        'Movimiento brusco y repentino',
    'cs.mapping.abrupt.sound':  'Distorsi\u00f3n, textura staccato',
    'cs.mapping.vert':          'Estiramiento vertical',
    'cs.mapping.vert.sound':    'Registro m\u00e1s alto y et\u00e9reo',
    'cs.mapping.hand':          'Velocidad de manos',
    'cs.mapping.hand.sound':    'Intensidad y duraci\u00f3n de notas',
    'cs.mapping.head':          'Inclinaci\u00f3n de cabeza',
    'cs.mapping.head.sound':    'Barrido de filtro global',

    /* --- Explore the code --- */
    'cs.code.title':      'Explora el c\u00f3digo',
    'cs.code.desc':       'CuerpoSonoro es open source. Explora el c\u00f3digo, ejec\u00fatalo en local o construye sobre \u00e9l.',
    'cs.code.github':     'GitHub \u2014 CuerpoSonoro',
    'cs.code.demo':       'Demo en vivo',

    /* --- CS Footer --- */
    'footer.home':        'Inicio',

    /* ============================
       UNIVERSO PUNZADAS PROJECT PAGE
       ============================ */

    /* --- Project hero --- */
    'up.stat.episodes':   'episodios catalogados',
    'up.stat.authors':    'autoras y autores citados',
    'up.stat.mentions':   'menciones extraídas',
    'up.tagline':         '<em>Punzadas Sonoras</em> es mi podcast favorito: me fascina cómo Inés y Paula eligen los temas y cómo los abordan. Siempre quise una biblioteca con las obras, autoras y referencias de sus más de 100 episodios, así que la he construido.',
    'up.tag.data':        'Datos',
    'up.tag.search':      'Buscador',
    'up.tag.dataviz':     'Visualización de datos',

    /* --- The question --- */
    'up.question.title':  'La pregunta',
    'up.question.p1':     'Las descripciones oficiales de los episodios solo cuentan una fracción de lo que realmente se cita. ¿Y si se pudiera buscar cualquier autora, obra o tema mencionado en el podcast, con la cita exacta y el minuto en el que se dijo?',
    'up.question.p2':     'Universo Punzadas nació de esa pregunta. Cataloga cada referencia cultural citada en los 118 episodios del podcast: libros, películas, discos, autoras, autores y los temas que las conectan.',

    /* --- How it works --- */
    'up.how.title':       'Cómo funciona',
    'up.how.p1.html':     'Cada episodio se transcribe y se lee entero, palabra por palabra. Solo entra en el catálogo lo que se puede señalar con <span class="highlight">una cita literal en el audio</span> — nada se completa por conocimiento externo.',
    'up.how.p2':          'Las transcripciones se generan con mlx-whisper (modelo large-v3) y diarización con pyannote 3.1, corriendo en local. La extracción de referencias — qué se cita, quién lo cita y en qué episodio — se hace a mano, leyendo la transcripción completa con un criterio editorial documentado.',

    /* --- Try the catalogue --- */
    'up.demo.title':      'Explora el catálogo',
    'up.demo.p1':         'Búscalo directamente aquí: por autora, obra, tema o episodio, con gráficos que conectan las referencias entre sí.',
    'up.demo.fallback.html': 'Si no carga arriba, puedes <a href="https://universopunzadas.com" target="_blank" rel="noopener" style="color: var(--teal); font-weight: 600;">abrirlo en una nueva pestaña</a>.',

    /* --- Why it matters --- */
    'up.why.title':       'Por qué este proyecto es importante para mí',
    'up.why.p1':          'Universo Punzadas junta dos cosas que me encantan: escuchar el podcast y construir herramientas de datos. Es un proyecto que exige paciencia — horas de audio escuchadas y transcritas — y cuidado editorial: cada dato tiene que poder señalarse con una cita literal.',
    'up.why.p2.html':     'Para mí representa lo que más me gusta de trabajar con datos: <span class="highlight">convertir algo disperso y difícil de encontrar en algo navegable, buscable y compartido</span>.',

    /* --- Tech stack --- */
    'up.tech.title':          'Stack tecnológico',
    'up.tech.transcription':  'Transcripción',
    'up.tech.extraction':     'Extracción',
    'up.tech.extraction.val': 'Criterio editorial manual, cita a cita',
    'up.tech.frontend':       'Frontend',
    'up.tech.dataviz':        'Gráficos',
    'up.tech.data':           'Datos',
    'up.tech.data.val':       'JSON generado con scripts Python',
    'up.tech.infra':          'Infraestructura',
    'up.tech.source':         'Código fuente',
    'up.tech.source.val':     'Open Source (MIT)',

    /* --- Pipeline --- */
    'up.pipeline.title':  'De la voz al catálogo',
    'up.pipeline.p1':     'Cada episodio nuevo recorre el mismo proceso, de principio a fin:',
    'up.pipe.1.title':    'Transcripción',
    'up.pipe.1.detail':   'Audio → texto con hablante identificado',
    'up.pipe.2.title':    'Extracción',
    'up.pipe.2.detail':   'Lectura completa, cita a cita',
    'up.pipe.3.title':    'Datos',
    'up.pipe.3.detail':   'Reconciliación y QA, JSON para la web',
    'up.pipe.4.title':    'Web',
    'up.pipe.4.detail':   'Buscador y gráficos publicados',

    /* --- Explore the code --- */
    'up.code.title':      'Explora el código',
    'up.code.desc':       'Universo Punzadas es open source. Explora el código o visita el catálogo completo.',
    'up.code.github':     'GitHub — Universo Punzadas',
    'up.code.site':       'Ver el catálogo',
    'up.contact.title':   '¿Un proyecto parecido en mente?',
    'up.contact.cta':     'Escríbeme',
  },

  en: {
    /* --- NAV --- */
    'nav.projects':       'What I\'m up to',
    'nav.blog':           'Blog',
    'nav.workshops':      'Workshops',
    'nav.about':          'About',
    'nav.contact':        'Contact',
    'nav.home':           'Home',

    /* --- INDEX: HERO --- */
    'hero.subtitle':      'Artist \u00b7 Software Engineer \u00b7 Creative Technologist',
    'hero.description':   'I build and invent objects where the handmade and the digital meet. Code, painting, music, sound and visuals.',
    'hero.cta.work':      'See my work',
    'hero.cta.about':     'About me',

    /* --- FEATURED PROJECT: CUERPOSONORO --- */
    'featured.label':         'What I\'m up to',
    'featured.visual.label':  'Body \u2192 Data \u2192 Sound',
    'featured.desc.1':        'What if your body were the one generating sound as it moves, rather than reacting to it? CuerpoSonoro turns movement into sound in real time: no score, no pre-recorded sequences, no sensors. Just you, moving.',
    'featured.tag.creative':  'Creative Coding',
    'featured.tag.sound':     'Sound',
    'featured.cta':           'View project \u2192',

    /* --- WHAT I'M UP TO: ESTRATOS --- */
    'estratos.tagline':          'Public data \u2192 Sound \u2192 Sound installation',
    'estratos.desc':             'What if the story of a place could be heard? Estratos turns public data \u2014 the kind that\'s out there, available, but that nobody ever looks at \u2014 into a sound installation that tells you what it\'s hiding.',
    'estratos.tag.opendata':     'Open data',
    'estratos.tag.sonification': 'Data sonification',
    'estratos.tag.installation': 'Installation',
    'estratos.status':           'Work in progress',
    'estratos.status.cta':       'Reach out if you\'re interested →',

    /* --- WHAT I'M UP TO: UNIVERSO PUNZADAS --- */
    'punzadas.tagline':      'Podcast \u2192 Data \u2192 Visualisation and search',
    'punzadas.desc':         '<em>Punzadas Sonoras</em> is my favourite podcast: I\'m fascinated by how In\u00e9s and Paula choose their subjects and the way they get into them. I always wanted a library of the works, authors and references from their 100-plus episodes, so I built one.',
    'punzadas.tag.data':     'Data',
    'punzadas.tag.search':   'Search',
    'punzadas.tag.dataviz':  'Data visualisation',
    'punzadas.link':         'View project →',

    /* --- ABOUT --- */
    'about.label':        'About me',
    'about.title':        'Art + Curiosity + Creativity',
    'about.p1':           'I\'m happy when I imagine something and manage to make it real. Whether it ends up being software, a song, a watercolour or a workshop, the impulse is the same.',
    'about.p2':           'I come from software engineering, but curiosity takes me a long way from it. I compose and produce music, I paint, I do macro photography and I design installations that turn data into sound. Mixing art and code doesn\'t strike me as odd \u2014 to me it\'s the most natural thing there is.',
    'about.p3':           'Lately I\'m fascinated by what happens when data stops being a table or a chart and becomes something you can hear or touch.',
    'about.p4':           'I believe in technology that serves people. It\'s an incredible set of tools, but it only makes sense when it\'s used to improve the lives of people and of every living thing.',
    'about.p5':           'When I\'m not making something, I\'m with my dog Otto, exploring rivers and reservoirs in our kayak, swimming, or on the road in our camper van looking for the next adventure.',

    /* --- SKILLS --- */
    'skills.label':           'What I do',
    'skills.title':           'Multidisciplinary by nature',
    'skill.code.title':       'Code & Software',
    'skill.code.desc':        'Software and AI development, web applications, data analysis, creative coding.',
    'skill.music.title':      'Music & Audio',
    'skill.music.desc':       'Composition, music production, audio engineering for podcasts.',
    'skill.techart.title':    'Tech-art installations',
    'skill.techart.desc':     'Objects and installations that turn data into sound and movement.',
    'skill.visual.title':     'Visual Art',
    'skill.visual.desc':      'Macro photography, painting, collage.',
    'skill.workshops.title':  'Workshops',
    'skill.workshops.desc':   'In-person and online workshops that foster creativity in adults.',

    /* --- WORKSHOPS PAGE --- */
    'workshops.label':         'Workshops',
    'workshops.title':         'Creativity workshops',
    'workshops.intro':         '<<PENDIENTE>> workshops that foster creativity in adults <<PENDIENTE>>.',
    'workshops.format.title':  'Format',
    'workshops.format.body':   '<<PENDIENTE>>',
    'workshops.forwho.title':  'Who are they for?',
    'workshops.forwho.body':   '<<PENDIENTE>>',
    'workshops.outcome.title': 'What you\'ll come away with',
    'workshops.outcome.body':  '<<PENDIENTE>>',
    'workshops.cta.title':     'Interested?',
    'workshops.cta.body':      'Tell me what you\'re looking for and let\'s talk.',
    'workshops.cta.button':    'Get in touch',

    /* --- CONTACT --- */
    'contact.label':      'Contact',
    'contact.title':      'Shall we work together?',
    'contact.desc':       'Got a project in mind? Looking for a technical and creative profile?<br>I\'d love to hear from you.',
    'contact.cta':        'Get in touch',

    /* --- FOOTER --- */
    'footer.text':        'Made with art and code',

    /* ============================
       CUERPOSONORO PROJECT PAGE
       ============================ */

    /* --- Project hero --- */
    'cs.tagline':         'Software that transforms human body movement into sound. Human body and technology transformed into art, united in a single project.',
    'cs.tag.creative':    'Creative Coding',
    'cs.tag.arttech':     'Art + Technology',
    'cs.tag.sound':       'Sound',
    'cs.tag.body':        'Body Interaction',

    /* --- The question --- */
    'cs.question.title':  'The question',
    'cs.question.p1':     'What if your body were a musical instrument? Not a metaphor, not a dance, an actual instrument where every gesture produces a unique sound, where your posture shapes the sonic landscape around you.',
    'cs.question.p2':     'CuerpoSonoro was born from that question. It\'s a software project that explores the connection between body movement and real-time sound generation, turning the human body into an expressive musical interface.',

    /* --- How it works --- */
    'cs.how.title':       'How it works',
    'cs.how.p1.html':     'The software captures body movement through a camera and translates it into musical parameters. Every gesture, every posture generates a different sonic response. There are no scores or pre-recorded sequences: <span class="highlight">you create the sound with your own body in real-time</span>.',
    'cs.how.p2':          'The key artistic principle: the body doesn\'t "play notes" \u2014 the body shapes sound. It\'s not an instrument that triggers discrete events, but an interface that continuously moulds a living soundscape. Any position of the body produces an interesting sonic state; there are no "wrong notes". It\'s like putting your hands in clay: there\'s always a shape, only which shape changes.',

    /* --- Web demo --- */
    'cs.demo.title':      'Try the web demo',
    'cs.demo.p1':         'Experience CuerpoSonoro directly in your browser. The web demo uses MediaPipe.js for pose detection and the Web Audio API for sound synthesis \u2014 no installation needed.',
    'cs.demo.fallback.html': 'If the demo doesn\'t load above, you can <a href="https://cuerposonoro.art" target="_blank" rel="noopener" style="color: var(--teal); font-weight: 600;">open it in a new tab</a>.',
    'cs.contact.title':   'Got a similar project in mind?',
    'cs.contact.cta':     'Get in touch',

    /* --- Why it matters --- */
    'cs.why.title':       'Why this project matters to me',
    'cs.why.p1':          'CuerpoSonoro sits exactly where I like to work: the intersection of art, technology and human experience. It\'s a project that requires musical thinking, programming skill, and an understanding of the body as an expressive medium.',
    'cs.why.p2.html':     'It represents what I believe technology should be: a tool that <span class="highlight">serves people, extends their creative capabilities, and creates experiences that wouldn\'t exist otherwise</span>.',

    /* --- Tech stack --- */
    'cs.tech.title':      'Technology stack',
    'cs.tech.cv':         'Computer vision',
    'cs.tech.audio':      'Audio engine',
    'cs.tech.comm':       'Communication',
    'cs.tech.demo':       'Web demo',
    'cs.tech.infra':      'Infrastructure',
    'cs.tech.test':       'Testing',
    'cs.tech.test.val':   'pytest \u2014 129 automated tests',
    'cs.tech.source':     'Source',
    'cs.tech.source.val': 'Open Source (MIT)',

    /* --- Under the hood --- */
    'cs.hood.title':      'Under the hood',
    'cs.hood.p1':         'CuerpoSonoro runs a real-time pipeline that goes from camera capture to audio output in under 80 milliseconds. Here\'s how data flows through the system:',

    /* Pipeline steps */
    'cs.pipe.1.title':    'Capture',
    'cs.pipe.1.detail':   'Camera feed at 640\u00d7480',
    'cs.pipe.2.title':    'Pose',
    'cs.pipe.2.detail':   '33 body landmarks detected per frame',
    'cs.pipe.3.title':    'Features',
    'cs.pipe.3.detail':   '17 movement descriptors extracted',
    'cs.pipe.4.title':    'Mapping',
    'cs.pipe.4.detail':   'Features mapped to sound parameters',
    'cs.pipe.5.title':    'Sound',
    'cs.pipe.5.detail':   'Real-time audio synthesis',

    /* --- Pose estimation --- */
    'cs.pose.title':      'Pose estimation & feature extraction',
    'cs.pose.p1.html':    'The system uses <span class="highlight">MediaPipe Pose</span> to detect 33 body landmarks in real-time at ~20\u201322 FPS. From these raw coordinates, a custom feature extraction module computes 17 movement descriptors that describe the character of your movement \u2014 not just where your body is, but <em>how</em> it moves:',

    /* Tech detail items */
    'cs.detail.energy.label':   'Energy',
    'cs.detail.energy.value':   'Motion energy',
    'cs.detail.energy.desc':    'Overall body activity based on landmark velocity',
    'cs.detail.balance.label':  'Balance',
    'cs.detail.balance.value':  'Symmetry index',
    'cs.detail.balance.desc':   'Left-right balance of the body',
    'cs.detail.fluidity.label': 'Fluidity',
    'cs.detail.fluidity.value': 'Temporal smoothness',
    'cs.detail.fluidity.desc':  'Jerk metric \u2014 fluid vs. abrupt movement',
    'cs.detail.arms.label':     'Arms',
    'cs.detail.arms.value':     'Arm angles',
    'cs.detail.arms.desc':      'Elevation angle of both arms',
    'cs.detail.height.label':   'Height',
    'cs.detail.height.value':   'Vertical extension',
    'cs.detail.height.desc':    'How stretched or compressed the body is',
    'cs.detail.tilt.label':     'Tilt',
    'cs.detail.tilt.value':     'Hip & head tilt',
    'cs.detail.tilt.desc':      'Lateral inclination of hips and head',
    'cs.detail.hands.label':    'Hands',
    'cs.detail.hands.value':    'Hand velocity & height',
    'cs.detail.hands.desc':     'Speed and vertical position of both hands',
    'cs.detail.triggers.label': 'Triggers',
    'cs.detail.triggers.value': 'Movement triggers',
    'cs.detail.triggers.desc':  'Sudden hand movements detected as events',

    /* --- Movement → Sound mapping --- */
    'cs.mapping.title':         'Movement \u2192 Sound mapping',
    'cs.mapping.p1':            'Each movement feature controls a specific aspect of the sound. The mapping is designed to feel intuitive \u2014 your body understands the connection before your mind does:',
    'cs.mapping.header.move':   'Movement',
    'cs.mapping.header.sound':  'Sound effect',
    'cs.mapping.fast':          'Fast movement',
    'cs.mapping.fast.sound':    'Brighter, louder sound',
    'cs.mapping.arms':          'Raising arms',
    'cs.mapping.arms.sound':    'Higher pitch',
    'cs.mapping.asym':          'Body asymmetry',
    'cs.mapping.asym.sound':    'Stereo panning',
    'cs.mapping.smooth':        'Smooth, fluid motion',
    'cs.mapping.smooth.sound':  'Long reverb, legato texture',
    'cs.mapping.abrupt':        'Abrupt, jerky motion',
    'cs.mapping.abrupt.sound':  'Distortion, staccato texture',
    'cs.mapping.vert':          'Vertical stretch',
    'cs.mapping.vert.sound':    'Higher, more ethereal register',
    'cs.mapping.hand':          'Hand velocity',
    'cs.mapping.hand.sound':    'Note intensity and duration',
    'cs.mapping.head':          'Head tilt',
    'cs.mapping.head.sound':    'Global filter sweep',

    /* --- Explore the code --- */
    'cs.code.title':      'Explore the code',
    'cs.code.desc':       'CuerpoSonoro is open source. Dive into the code, run it locally, or build on top of it.',
    'cs.code.github':     'GitHub \u2014 CuerpoSonoro',
    'cs.code.demo':       'Live Demo',

    /* --- CS Footer --- */
    'footer.home':        'Home',

    /* ============================
       UNIVERSO PUNZADAS PROJECT PAGE
       ============================ */

    /* --- Project hero --- */
    'up.stat.episodes':   'episodes catalogued',
    'up.stat.authors':    'authors cited',
    'up.stat.mentions':   'mentions extracted',
    'up.tagline':         '<em>Punzadas Sonoras</em> is my favourite podcast: I\'m fascinated by how Inés and Paula choose their subjects and the way they get into them. I always wanted a library of the works, authors and references from their 100-plus episodes, so I built one.',
    'up.tag.data':        'Data',
    'up.tag.search':      'Search',
    'up.tag.dataviz':     'Data visualisation',

    /* --- The question --- */
    'up.question.title':  'The question',
    'up.question.p1':     'Official episode descriptions only tell a fraction of what\'s actually cited. What if you could search any author, work or subject mentioned on the podcast, with the exact quote and the minute it was said?',
    'up.question.p2':     'Universo Punzadas was born from that question. It catalogues every cultural reference cited across the podcast\'s 118 episodes: books, films, records, authors, and the subjects that connect them.',

    /* --- How it works --- */
    'up.how.title':       'How it works',
    'up.how.p1.html':     'Every episode is transcribed and read in full, word by word. Only what can be pinned to <span class="highlight">a literal quote in the audio</span> makes it into the catalogue — nothing is filled in from outside knowledge.',
    'up.how.p2':          'Transcripts are generated with mlx-whisper (large-v3 model) and pyannote 3.1 diarisation, running locally. Extracting references — what\'s cited, who cites it and in which episode — is done by hand, reading the full transcript against a documented editorial criterion.',

    /* --- Try the catalogue --- */
    'up.demo.title':      'Explore the catalogue',
    'up.demo.p1':         'Search it directly here: by author, work, subject or episode, with charts that connect the references to each other.',
    'up.demo.fallback.html': 'If it doesn\'t load above, you can <a href="https://universopunzadas.com" target="_blank" rel="noopener" style="color: var(--teal); font-weight: 600;">open it in a new tab</a>.',

    /* --- Why it matters --- */
    'up.why.title':       'Why this project matters to me',
    'up.why.p1':          'Universo Punzadas brings together two things I love: listening to the podcast and building data tools. It\'s a project that demands patience — hours of audio listened to and transcribed — and editorial care: every data point has to be traceable to a literal quote.',
    'up.why.p2.html':     'To me it represents what I love most about working with data: <span class="highlight">turning something scattered and hard to find into something navigable, searchable and shared</span>.',

    /* --- Tech stack --- */
    'up.tech.title':          'Technology stack',
    'up.tech.transcription':  'Transcription',
    'up.tech.extraction':     'Extraction',
    'up.tech.extraction.val': 'Manual editorial criterion, quote by quote',
    'up.tech.frontend':       'Frontend',
    'up.tech.dataviz':        'Charts',
    'up.tech.data':           'Data',
    'up.tech.data.val':       'JSON generated with Python scripts',
    'up.tech.infra':          'Infrastructure',
    'up.tech.source':         'Source',
    'up.tech.source.val':     'Open Source (MIT)',

    /* --- Pipeline --- */
    'up.pipeline.title':  'From voice to catalogue',
    'up.pipeline.p1':     'Every new episode goes through the same process, start to finish:',
    'up.pipe.1.title':    'Transcription',
    'up.pipe.1.detail':   'Audio → text with speaker identification',
    'up.pipe.2.title':    'Extraction',
    'up.pipe.2.detail':   'Full read-through, quote by quote',
    'up.pipe.3.title':    'Data',
    'up.pipe.3.detail':   'Reconciliation and QA, JSON for the site',
    'up.pipe.4.title':    'Web',
    'up.pipe.4.detail':   'Search and charts published',

    /* --- Explore the code --- */
    'up.code.title':      'Explore the code',
    'up.code.desc':       'Universo Punzadas is open source. Explore the code or visit the full catalogue.',
    'up.code.github':     'GitHub — Universo Punzadas',
    'up.code.site':       'View the catalogue',
    'up.contact.title':   'Got a similar project in mind?',
    'up.contact.cta':     'Get in touch',
  }
};

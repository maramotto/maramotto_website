// Moved from js/i18n.js during B-1 (real English URLs). Single source of
// truth for the site's translated strings, now consumed at build time by
// the `t` filter (eleventy/filters/t.js) instead of client-side JS.
module.exports = {
  es: {
    /* --- NAV --- */
    'nav.projects':       'Proyectos',
    'nav.blog':           'Blog',
    'nav.contact':        'Cont\u00e1ctame',
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
    'skill.code.title':       'C\u00f3digo y software',
    'skill.code.desc':        'Desarrollo de software e IA, aplicaciones web, an\u00e1lisis de datos, creative coding.',
    'skill.music.title':      'M\u00fasica y audio',
    'skill.music.desc':       'Composici\u00f3n, producci\u00f3n musical, ingenier\u00eda de audio para podcasts.',
    'skill.techart.title':    'Instalaciones tech-art',
    'skill.techart.desc':     'Objetos e instalaciones que convierten datos en sonido y movimiento.',
    'skill.visual.title':     'Arte visual',
    'skill.visual.desc':      'Macrofotograf\u00eda, pintura, collage.',
    'skill.workshops.title':  'Talleres',
    'skill.workshops.desc':   'Talleres presenciales y online que fomentan la creatividad en adultos.',

    /* --- LEGAL PAGE --- */
    'legal.title':         'Aviso legal',
    'legal.intro':         'Este sitio es un proyecto personal de Mara Crespo.',
    'legal.owner.title':   'Titular',
    'legal.owner.body':    'Mara Crespo, contacto: hello@maramotto.com.',
    'legal.purpose.title': 'Objeto',
    'legal.purpose.body':  'maramotto.com presenta proyectos personales de arte y tecnolog\u00eda, y ofrece informaci\u00f3n de contacto para talleres y colaboraciones.',

    /* --- PRIVACY PAGE --- */
    'privacy.title':           'Privacidad',
    'privacy.intro':           'Este sitio no usa cookies ni recopila datos personales m\u00e1s all\u00e1 de lo estrictamente necesario para funcionar.',
    'privacy.analytics.title': 'Anal\u00edtica',
    'privacy.analytics.body':  'Actualmente este sitio no usa ninguna herramienta de anal\u00edtica. Est\u00e1 previsto incorporar en el futuro Umami, una herramienta de anal\u00edtica sin cookies y sin datos personales, alojada en servidor propio, sin compartir datos con terceros. Esta p\u00e1gina se actualizar\u00e1 cuando est\u00e9 activa.',
    'privacy.storage.title':   'Almacenamiento',
    'privacy.storage.body':    'Este sitio no guarda nada en tu navegador: ni cookies, ni almacenamiento local.',
    'privacy.embeds.title':    'Contenido incrustado',
    'privacy.embeds.body':     'Las páginas de CuerpoSonoro y Universo Punzadas incrustan contenido de cuerposonoro.art y universopunzadas.com, ambos también proyectos de Mara. Cargar esas páginas transmite tu IP a esos dominios. La demo de CuerpoSonoro funciona en tu propio navegador — no se sube nada a ningún servidor.',

    /* --- CONTACT --- */
    'contact.label':      'Contacto',
    'contact.title':      '\u00bfTrabajamos juntas?',
    'contact.desc':       '\u00bfTienes un proyecto en mente? \u00bfBuscas un perfil t\u00e9cnico y creativo?<br>Me encantar\u00eda saber de ti.',
    'contact.cta':        'Escr\u00edbeme',

    /* --- FOOTER --- */
    'footer.text':        'Hecho con arte y c\u00f3digo',
    'footer.legal':       'Aviso legal',
    'footer.privacy':     'Privacidad',

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
    'cs.contact.title':   '\u00bfUn proyecto parecido en mente?',
    'cs.contact.cta':     'Escr\u00edbeme',

    /* --- Why it matters --- */
    'cs.why.title':       'Por qu\u00e9 este proyecto es importante para m\u00ed',
    'cs.why.p1':          'Este proyecto surge de la necesidad de volver a ser. De recoger los pedazos y aprender a habitar un cuerpo que durante mucho tiempo existi\u00f3 solo como coraza, como lugar de dolor y de delito, como algo err\u00f3neo que deb\u00eda cambiar a cualquier precio.',
    'cs.why.p2':          'CuerpoSonoro es mi manera de volver a \u00e9l. De escucharlo. De hacer que su movimiento (imperfecto, real, m\u00edo) sea el origen de algo bello, y no la consecuencia de las violencias que lo atraviesan.',

    /* --- Tech stack --- */
    'cs.tech.title':      'Stack tecnol\u00f3gico',
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

    /* --- What the system measures --- */
    'cs.desc.title':          'Qu\u00e9 mide el sistema',
    'cs.desc.intro':          'El m\u00f3dulo vision_processor extrae decenas de descriptores en cada fotograma. Cada uno captura una dimensi\u00f3n diferente del movimiento y se mapea a un par\u00e1metro musical concreto. Aqu\u00ed est\u00e1n los principales.',

    'cs.desc.energy.name':     'Energ\u00eda',
    'cs.desc.energy.body':     'Intensidad global del movimiento: velocidad de las articulaciones clave (mu\u00f1ecas, tobillos, nariz) entre fotogramas. Alta energ\u00eda significa que el cuerpo se mueve r\u00e1pido y con amplitud.',
    'cs.desc.energy.map':      'Volumen y resonancia del filtro',

    'cs.desc.symmetry.name':   'Simetr\u00eda',
    'cs.desc.symmetry.body':   'Equilibrio izquierda\u2013derecha del cuerpo. Se calcula a partir de la desviaci\u00f3n horizontal de ambas mu\u00f1ecas respecto al centro del fotograma.',
    'cs.desc.symmetry.map':    'Paneo est\u00e9reo',

    'cs.desc.smoothness.name': 'Fluidez',
    'cs.desc.smoothness.body': 'Fluidez frente a brusquedad del movimiento. Mide c\u00f3mo cambia abruptamente la aceleraci\u00f3n (jerk). Los gestos lentos y sostenidos punt\u00faan alto; los repentinos, bajo.',
    'cs.desc.smoothness.map':  'Frecuencia de corte del filtro',

    'cs.desc.feet.name':       'Posici\u00f3n de los pies',
    'cs.desc.feet.body':       'Centro horizontal de ambos tobillos en el espacio de captura. Divide la zona en cuatro regiones arm\u00f3nicas.',
    'cs.desc.feet.map':        'Selecci\u00f3n de acorde (I, IV, V, VI)',

    'cs.desc.knee.name':       '\u00c1ngulo de rodillas',
    'cs.desc.knee.body':       '\u00c1ngulo medio de flexi\u00f3n de rodillas. Piernas rectas = m\u00e1ximo. Rodillas flexionadas = valor bajo. Permite crescendos y decrescendos naturales con el cuerpo.',
    'cs.desc.knee.map':        'Velocidad del acorde (intensidad)',

    'cs.desc.hands.name':      'Altura de las manos',
    'cs.desc.hands.body':      'Posici\u00f3n vertical de cada mano relativa a la altura del cuerpo. La mano derecha controla la octava grave, la izquierda la octava aguda.',
    'cs.desc.hands.map':       'Selecci\u00f3n de nota mel\u00f3dica',

    'cs.desc.jerk.name':       'Jerk de manos',
    'cs.desc.jerk.body':       'Detecta movimientos bruscos de mu\u00f1eca. Un jerk alto en un \u00fanico fotograma es la condici\u00f3n de disparo: activa un evento note on.',
    'cs.desc.jerk.map':        'Disparo de nota',

    'cs.desc.elbow.name':      '\u00c1ngulo codo\u2013cadera',
    'cs.desc.elbow.body':      '\u00c1ngulo entre el brazo y el torso para cada lado. Brazo junto al cuerpo = tono estable. Brazo extendido = glissando. Movimiento oscilante = vibrato.',
    'cs.desc.elbow.map':       'Pitch bend / vibrato',

    'cs.desc.head.name':       'Inclinaci\u00f3n de cabeza',
    'cs.desc.head.body':       'Inclinaci\u00f3n lateral de la cabeza, medida por la diferencia de altura entre ambas orejas. Controla un filtro global que afecta a todo el sonido.',
    'cs.desc.head.map':        'Filtro tonal global (CC74)',

    'cs.compare.title':          'Demo web vs. instalación',
    'cs.compare.demo.title':     'Demo web — cuerposonoro.art',
    'cs.compare.demo.1':         'MediaPipe corriendo directamente en el navegador (JS)',
    'cs.compare.demo.2':         'Síntesis de audio vía Web Audio API',
    'cs.compare.demo.3':         '5 descriptores de movimiento principales',
    'cs.compare.demo.4':         'Accesible desde cualquier dispositivo con cámara',
    'cs.compare.install.title':  'Instalación — el sistema real',
    'cs.compare.install.1':      'MediaPipe en Python — CPU, Metal o TensorRT (GPU Jetson)',
    'cs.compare.install.2':      'Síntesis en SuperCollider o MIDI/MPE a sintetizador externo',
    'cs.compare.install.3':      'Decenas de descriptores de movimiento, 12 features MPE',
    'cs.compare.install.4':      'Diseñado para actuación en vivo e instalación física',

    'cs.stack.layer.vision':   'Visión por computador',
    'cs.stack.layer.audio':    'Síntesis de audio',
    'cs.stack.layer.core':     'Núcleo',
    'cs.stack.layer.infra':    'Infraestructura',
    'cs.stack.mediapipe.desc':     'Detección de pose corporal con 33 puntos. Funciona en CPU, Metal (Apple Silicon) o GPU (Jetson).',
    'cs.stack.opencv.desc':        'Captura de cámara y procesado de fotogramas. Buffer de baja latencia, 30 FPS.',
    'cs.stack.supercollider.desc': 'Síntesis sonora algorítmica vía OSC. SynthDefs en tiempo real controlados por los descriptores de movimiento.',
    'cs.stack.midi.desc':          'Salida MIDI Polyphonic Expression para sintetizadores externos (Surge XT). Dos modos: clásico y musical.',
    'cs.stack.python.desc':        'Lógica central de la aplicación. Extracción de features, comunicación OSC/MIDI, orquestación del pipeline.',
    'cs.stack.docker.desc':        'Despliegue portable y reproducible. Arquitectura de dos servicios para minimizar latencia entre procesos.',

    'cs.demo.privacy':  'La cámara no graba nada. Solo se procesan arrays de coordenadas — nada se sube a ningún servidor.',
    'cs.demo.cta':      'Probar la demo',

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
    'up.disclaimer':      'Proyecto independiente de admiradora, sin relación oficial con <em>Punzadas Sonoras</em> ni con sus autoras.',
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
    'nav.projects':       'Projects',
    'nav.blog':           'Blog',
    'nav.contact':        'Contact me',
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
    'skill.code.title':       'Code and software',
    'skill.code.desc':        'Software and AI development, web applications, data analysis, creative coding.',
    'skill.music.title':      'Music and audio',
    'skill.music.desc':       'Composition, music production, audio engineering for podcasts.',
    'skill.techart.title':    'Tech-art installations',
    'skill.techart.desc':     'Objects and installations that turn data into sound and movement.',
    'skill.visual.title':     'Visual art',
    'skill.visual.desc':      'Macro photography, painting, collage.',
    'skill.workshops.title':  'Workshops',
    'skill.workshops.desc':   'In-person and online workshops that foster creativity in adults.',

    /* --- LEGAL PAGE --- */
    'legal.title':         'Legal notice',
    'legal.intro':         'This site is a personal project by Mara Crespo.',
    'legal.owner.title':   'Owner',
    'legal.owner.body':    'Mara Crespo, contact: hello@maramotto.com.',
    'legal.purpose.title': 'Purpose',
    'legal.purpose.body':  'maramotto.com presents personal art and technology projects, and provides contact information for workshops and collaborations.',

    /* --- PRIVACY PAGE --- */
    'privacy.title':           'Privacy',
    'privacy.intro':           'This site does not use cookies or collect personal data beyond what is strictly necessary to function.',
    'privacy.analytics.title': 'Analytics',
    'privacy.analytics.body':  'This site does not currently use any analytics tool. I plan to add Umami — a self-hosted, cookie-free analytics tool that collects no personal data and shares nothing with third parties. This page will be updated once it is active.',
    'privacy.storage.title':   'Storage',
    'privacy.storage.body':    'This site stores nothing in your browser — no cookies, no local storage.',
    'privacy.embeds.title':    'Embedded content',
    'privacy.embeds.body':     "The CuerpoSonoro and Universo Punzadas pages embed content from cuerposonoro.art and universopunzadas.com, both also Mara's own projects. Loading those pages transmits your IP to those domains. The CuerpoSonoro demo runs in your own browser — nothing is uploaded to any server.",

    /* --- CONTACT --- */
    'contact.label':      'Contact',
    'contact.title':      'Shall we work together?',
    'contact.desc':       'Got a project in mind? Looking for a technical and creative profile?<br>I\'d love to hear from you.',
    'contact.cta':        'Get in touch',

    /* --- FOOTER --- */
    'footer.text':        'Made with art and code',
    'footer.legal':       'Legal notice',
    'footer.privacy':     'Privacy',

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
    'cs.contact.title':   'Got a similar project in mind?',
    'cs.contact.cta':     'Get in touch',

    /* --- Why it matters --- */
    'cs.why.title':       'Why this project matters to me',
    'cs.why.p1':          'This project grows out of a need to return to being. To gather the pieces and learn to inhabit a body that for a long time existed only as armor, as a place of pain and damage, as something wrong that had to change at any cost.',
    'cs.why.p2':          'CuerpoSonoro is my way back to it. To listen to it. To let its movement (imperfect, real, mine) be the origin of something beautiful, not the consequence of the violences that run through it.',

    /* --- Tech stack --- */
    'cs.tech.title':      'Technology stack',
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

    /* --- What the system measures --- */
    'cs.desc.title':          'What the system measures',
    'cs.desc.intro':          'The vision_processor module extracts dozens of descriptors from each frame. Each one captures a different dimension of movement and maps to a specific musical parameter. Here are the main ones.',

    'cs.desc.energy.name':     'Energy',
    'cs.desc.energy.body':     'Overall motion intensity: velocity of key joints (wrists, ankles, nose) between frames. High energy means the body is moving fast and with amplitude.',
    'cs.desc.energy.map':      'Volume and filter resonance',

    'cs.desc.symmetry.name':   'Symmetry',
    'cs.desc.symmetry.body':   'Left\u2013right balance of the body. Calculated from the horizontal deviation of both wrists relative to the centre of the frame.',
    'cs.desc.symmetry.map':    'Stereo panning',

    'cs.desc.smoothness.name': 'Smoothness',
    'cs.desc.smoothness.body': 'Fluidity vs. abruptness of movement. Measures how abruptly acceleration changes (jerk). Slow, sustained gestures score high; sudden ones score low.',
    'cs.desc.smoothness.map':  'Filter cutoff frequency',

    'cs.desc.feet.name':       'Foot position',
    'cs.desc.feet.body':       'Horizontal centre of both ankles in the frame space. Divides the capture zone into four harmonic regions.',
    'cs.desc.feet.map':        'Chord selection (I, IV, V, VI)',

    'cs.desc.knee.name':       'Knee angle',
    'cs.desc.knee.body':       'Average knee flexion angle. Straight legs = maximum. Bent knees = lower value. Allows natural crescendos and decrescendos through the body.',
    'cs.desc.knee.map':        'Chord velocity (loudness)',

    'cs.desc.hands.name':      'Hand height',
    'cs.desc.hands.body':      'Vertical position of each hand relative to body height. Right hand controls the lower octave, left hand the higher octave.',
    'cs.desc.hands.map':       'Melodic note selection',

    'cs.desc.jerk.name':       'Hand jerk',
    'cs.desc.jerk.body':       'Detects sudden wrist movements. High jerk in a single frame is the trigger condition: it fires a note on event.',
    'cs.desc.jerk.map':        'Note trigger',

    'cs.desc.elbow.name':      'Elbow\u2013hip angle',
    'cs.desc.elbow.body':      'Angle between arm and torso for each side. Arm close to the body = stable pitch. Extended arm = glissando. Oscillating movement = vibrato.',
    'cs.desc.elbow.map':       'Pitch bend / vibrato',

    'cs.desc.head.name':       'Head tilt',
    'cs.desc.head.body':       'Lateral tilt of the head, measured from the height difference between both ears. Controls a global filter affecting all sound.',
    'cs.desc.head.map':        'Global tonal filter (CC74)',

    'cs.compare.title':          'Web demo vs. installation',
    'cs.compare.demo.title':     'Web demo \u2014 cuerposonoro.art',
    'cs.compare.demo.1':         'MediaPipe running directly in the browser (JS)',
    'cs.compare.demo.2':         'Audio synthesis via Web Audio API',
    'cs.compare.demo.3':         '5 core motion descriptors',
    'cs.compare.demo.4':         'Accessible from any device with a webcam',
    'cs.compare.install.title':  'Installation \u2014 the real system',
    'cs.compare.install.1':      'MediaPipe in Python \u2014 CPU, Metal or TensorRT (Jetson GPU)',
    'cs.compare.install.2':      'SuperCollider synthesis or MIDI/MPE to external synth',
    'cs.compare.install.3':      'Dozens of motion descriptors, 12 MPE features',
    'cs.compare.install.4':      'Designed for live performance and physical installation',

    'cs.stack.layer.vision':   'Computer vision',
    'cs.stack.layer.audio':    'Audio synthesis',
    'cs.stack.layer.core':     'Core',
    'cs.stack.layer.infra':    'Infrastructure',
    'cs.stack.mediapipe.desc':     '33-landmark body pose detection. Runs on CPU, Metal (Apple Silicon) or GPU (Jetson).',
    'cs.stack.opencv.desc':        'Camera capture and frame processing. Low-latency buffer, 30 FPS.',
    'cs.stack.supercollider.desc': 'Algorithmic sound synthesis via OSC. Real-time SynthDefs controlled by motion features.',
    'cs.stack.midi.desc':          'MIDI Polyphonic Expression output for external synthesizers (Surge XT). Two modes: classic and musical.',
    'cs.stack.python.desc':        'Core application logic. Feature extraction, OSC/MIDI communication, pipeline orchestration.',
    'cs.stack.docker.desc':        'Portable, reproducible deployment. Two-service architecture to minimise inter-process latency.',

    'cs.demo.privacy':  'The camera records nothing. Only arrays of coordinates are processed \u2014 nothing is uploaded to any server.',
    'cs.demo.cta':      'Try the demo',

    /* --- Explore the code --- */
    'cs.code.title':      'Explore the code',
    'cs.code.desc':       'CuerpoSonoro is open source. Dive into the code, run it locally, or build on top of it.',
    'cs.code.github':     'GitHub \u2014 CuerpoSonoro',
    'cs.code.demo':       'Live demo',

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
    'up.disclaimer':      'An independent fan project, unaffiliated with <em>Punzadas Sonoras</em> or its hosts.',
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

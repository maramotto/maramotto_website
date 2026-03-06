/**
 * i18n.js — Internationalization for maramotto.com
 * Languages: Spanish (default) / English
 * Usage: elements use data-i18n="key" attribute
 *        data-i18n-html="key" for innerHTML (allows <em>, <strong>, <span> etc.)
 */

const TRANSLATIONS = {
  es: {
    /* --- NAV --- */
    'nav.projects':       'Proyectos',
    'nav.about':          'Sobre m\u00ed',
    'nav.contact':        'Contacto',
    'nav.home':           'Inicio',

    /* --- INDEX: HERO --- */
    'hero.subtitle':      'Ingeniera de Software \u00b7 Artista \u00b7 Tecn\u00f3loga Creativa',
    'hero.description':   'Creo cosas en la intersecci\u00f3n entre el arte y la tecnolog\u00eda.<br>Me apasiona cacharrear, inventar y dar vida a las ideas.<br>Desde c\u00f3digo que convierte el movimiento humano en sonido<br>hasta mezclar IA y conocimiento artesanal para crear piezas \u00fanicas de moda reciclada.',
    'hero.cta.work':      'Ver mi trabajo',
    'hero.cta.about':     'Sobre m\u00ed',

    /* --- FEATURED PROJECT --- */
    'featured.label':         'Proyecto destacado',
    'featured.visual.label':  'Cuerpo \u2192 Sonido',
    'featured.desc.1':        '\u00bfY si tu cuerpo pudiera crear y dar forma al sonido? CuerpoSonoro es un proyecto de software que transforma el movimiento del cuerpo humano en sonido en tiempo real, convirtiendo gestos y posturas en paisajes sonoros en constante cambio.',
    'featured.desc.2':        'Vive en la intersecci\u00f3n del arte, la tecnolog\u00eda y el cuerpo. Exactamente el tipo de trabajo que me encanta.',
    'featured.tag.creative':  'Creative Coding',
    'featured.tag.sound':     'Sonido',
    'featured.cta':           'Explorar el proyecto \u2192',

    /* --- PORTFOLIO --- */
    'portfolio.label':        'Portfolio',
    'portfolio.title':        'M\u00e1s proyectos',
    'librored.desc':          'Una aplicaci\u00f3n web para el intercambio de libros entre personas. Tecnolog\u00eda al servicio de la comunidad.',
    'librored.tag.webapp':    'App Web',
    'librored.link':          'Ver en GitHub \u2192',
    'spotify.title':          'Explorando datos de Spotify',
    'spotify.desc':           'An\u00e1lisis exploratorio de datos de usuario de Spotify. Ciencia de datos aplicada a la m\u00fasica.',
    'spotify.tag.datascience':'Ciencia de Datos',
    'spotify.link':           'Ver en GitHub \u2192',

    /* --- ABOUT --- */
    'about.label':        'Sobre m\u00ed',
    'about.title':        'Arte + C\u00f3digo + Curiosidad',
    'about.p1':           'Soy una persona creativa apasionada por el arte, la ciencia y la tecnolog\u00eda. Soy m\u00e1s feliz cuando imagino algo y consigo hacerlo realidad, ya sea un programa, una canci\u00f3n, una pintura con plotter de pinceles o un accesorio de moda hecho con materiales reciclados.',
    'about.p2':           'Mi formaci\u00f3n es en ingenier\u00eda de software, pero mi curiosidad va mucho m\u00e1s all\u00e1. Compongo y produzco m\u00fasica, pinto abstracci\u00f3n, hago macrofotograf\u00eda y dise\u00f1o piezas de moda reciclada con patrones cortados por l\u00e1ser CNC.',
    'about.p3.html':      'Para m\u00ed, fusionar arte y c\u00f3digo es natural. Me encanta <strong>caminar por los bordes entre disciplinas</strong> e inventar nuevas formas de conectarlas. Creo en la tecnolog\u00eda que sirve a las personas. <strong>Las personas primero.</strong>',
    'about.p4':           'Cuando no estoy creando, me encontrar\u00e1s con mi perra, explorando r\u00edos y embalses en kayak, nadando en el mar o recorriendo carreteras en nuestro coche viejo buscando la pr\u00f3xima aventura.',

    /* --- SKILLS --- */
    'skills.label':           'Lo que hago',
    'skills.title':           'Multidisciplinar por naturaleza',
    'skill.code.title':       'C\u00f3digo y Software',
    'skill.code.desc':        'Desarrollo de software, desarrollo de IA, aplicaciones web, an\u00e1lisis de datos, creative coding',
    'skill.music.title':      'M\u00fasica y Audio',
    'skill.music.desc':       'Composici\u00f3n, producci\u00f3n musical, ingenier\u00eda de audio para podcasts',
    'skill.visual.title':     'Arte Visual',
    'skill.visual.desc':      'Macrofotograf\u00eda, acuarela, pintura acr\u00edlica',
    'skill.fashion.title':    'Moda y Textiles',
    'skill.fashion.desc':     'Upcycling, dise\u00f1o de patrones, corte l\u00e1ser CNC',

    /* --- CONTACT --- */
    'contact.label':      'Contacto',
    'contact.title':      '\u00bfTrabajamos juntas?',
    'contact.desc':       '\u00bfTienes un proyecto en mente? \u00bfBuscas un perfil creativo-t\u00e9cnico? Me encantar\u00eda saber de ti.',
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
  },

  en: {
    /* --- NAV --- */
    'nav.projects':       'Projects',
    'nav.about':          'About',
    'nav.contact':        'Contact',
    'nav.home':           'Home',

    /* --- INDEX: HERO --- */
    'hero.subtitle':      'Software Engineer \u00b7 Artist \u00b7 Creative Technologist',
    'hero.description':   'I create things at the intersection of art and technology.<br>I\'m passionate about tinkering, inventing and bringing ideas to life.<br>From code that turns the human movement into sound<br>to mixing AI and craft knowledge to create unique upcycled fashion pieces.',
    'hero.cta.work':      'See my work',
    'hero.cta.about':     'About me',

    /* --- FEATURED PROJECT --- */
    'featured.label':         'Featured Project',
    'featured.visual.label':  'Body \u2192 Sound',
    'featured.desc.1':        'What if your body were to create and shape sound? CuerpoSonoro is a software project that transforms human body movement into sound in real time, turning gestures and postures into ever-changing soundscapes.',
    'featured.desc.2':        'It lives at the intersection of art, technology and the body. Exactly the kind of work I love.',
    'featured.tag.creative':  'Creative Coding',
    'featured.tag.sound':     'Sound',
    'featured.cta':           'Explore the project \u2192',

    /* --- PORTFOLIO --- */
    'portfolio.label':        'Portfolio',
    'portfolio.title':        'More projects',
    'librored.desc':          'A web application for exchanging books between people. Technology at the service of community.',
    'librored.tag.webapp':    'Web App',
    'librored.link':          'View on GitHub \u2192',
    'spotify.title':          'Exploring Spotify Data',
    'spotify.desc':           'Exploratory data analysis of Spotify user data. Data science applied to music.',
    'spotify.tag.datascience':'Data Science',
    'spotify.link':           'View on GitHub \u2192',

    /* --- ABOUT --- */
    'about.label':        'About me',
    'about.title':        'Art + Code + Curiosity',
    'about.p1':           'I\'m a creative person passionate about art, science and technology. I\'m happiest when I imagine something and manage to make it real, whether it\'s a piece of software, a song, a brush plotter painting or a fashion accessory made from recycled materials.',
    'about.p2':           'My background is in software engineering, but my curiosity goes much further. I compose and produce music, abstract painting, do macrophotography, and design upcycled fashion pieces with CNC laser-cut patterns.',
    'about.p3.html':      'For me, blending art and code is natural. I love <strong>walking the edges between disciplines</strong> and inventing new ways to connect them. I believe in technology that serves people. <strong>Humans first.</strong>',
    'about.p4':           'When I\'m not creating, you\'ll find me with my dog, exploring rivers and reservoirs by kayak, swimming in the sea or hitting the road in our old car looking for the next adventure.',

    /* --- SKILLS --- */
    'skills.label':           'What I do',
    'skills.title':           'Multidisciplinary by nature',
    'skill.code.title':       'Code & Software',
    'skill.code.desc':        'Software development, AI development, web applications, data analysis, creative coding',
    'skill.music.title':      'Music & Audio',
    'skill.music.desc':       'Composition, music production, audio engineering for podcasts',
    'skill.visual.title':     'Visual Art',
    'skill.visual.desc':      'Macrophotography, watercolour, acrylic painting',
    'skill.fashion.title':    'Fashion & Textiles',
    'skill.fashion.desc':     'Upcycling, pattern design, CNC laser cutting',

    /* --- CONTACT --- */
    'contact.label':      'Contact',
    'contact.title':      'Shall we work together?',
    'contact.desc':       'Have a project in mind? Looking for a creative-technical profile? I\'d love to hear from you.',
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
  }
};

/* ---- Engine ---- */

const I18N_STORAGE_KEY = 'mara_lang';
let currentLang = localStorage.getItem(I18N_STORAGE_KEY) || 'es';

function t(key) {
  return TRANSLATIONS[currentLang]?.[key] || TRANSLATIONS['es']?.[key] || key;
}

function applyTranslations() {
  // data-i18n -> textContent
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });

  // data-i18n-html -> innerHTML (for markup like <em>, <strong>, <span>)
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    el.innerHTML = t(key);
  });

  // Update lang toggle buttons
  document.querySelectorAll('.lang-toggle__btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === currentLang);
  });

  document.documentElement.lang = currentLang;
}

function setLang(lang) {
  if (!TRANSLATIONS[lang]) return;
  currentLang = lang;
  localStorage.setItem(I18N_STORAGE_KEY, lang);
  applyTranslations();
}

// Expose globally
window.i18n = { t, setLang, getCurrentLang: () => currentLang };

// Apply on load
document.addEventListener('DOMContentLoaded', () => {
  applyTranslations();

  // Wire up language toggle buttons
  document.querySelectorAll('.lang-toggle__btn').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });
});

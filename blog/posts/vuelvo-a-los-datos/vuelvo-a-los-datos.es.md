---
title: "Vuelvo a los datos, un piso más arriba"
date: 2026-09-22
lang: es
translationKey: vuelvo-a-los-datos
category: engineering
tags: ["carrera", "ia", "aforo"]
imageFile: "cover.svg"
imageRatio: square
excerpt: "Vuelvo a los datos cinco años después de dejarlos, y el oficio ya no es el mismo. Sobre lo que ha cambiado, por qué saber programar ya no basta, y Aforo, el proyecto con el que estoy aprendiendo arquitectura de datos en público."
---

Durante siete años mi trabajo consistió en mover datos de un sitio a otro sin que se rompieran por el camino. Mi día a día eran pipelines, ETLs y esquemas que cambiaban sin avisar. Ahí aprendí casi todo lo que sé sobre construir software que tiene que funcionar de verdad, todos los días, con datos que nunca llegan como te prometieron que llegarían.

Después me fui a otras cosas. Ahora vuelvo, pero no al mismo sitio, porque ese sitio ya no existe.

## Lo que ha cambiado en cinco años

En 2021, "data engineer" era una de esas etiquetas que abrían puertas solas. Todo el mundo estaba montando su modern data stack: un warehouse en la nube, una herramienta de ingesta, dbt para transformar y un BI encima. Salían herramientas nuevas cada semana, había dinero para probarlas todas y parecía que se contrataba a cualquiera que supiera escribir un DAG. El analytics engineer se estrenó como rol propio. Daba la sensación de que la demanda no iba a tocar techo nunca.

Luego llegaron la subida de tipos, los despidos y la pregunta incómoda que nadie se había hecho durante el boom: ¿cuánto nos cuesta todo esto y qué valor nos está dando? Muchos equipos de datos dejaron de ser la apuesta de futuro y pasaron a tener que justificar cada factura del warehouse. Las herramientas empezaron a consolidarse. El discurso cambió de 'añade otra pieza al stack' a '¿de verdad necesitamos todas estas piezas?'.

Y en medio de todo eso llegó la IA generativa. Primero fue una curiosidad. Después se convirtió en la razón por la que las empresas volvieron a mirar sus datos, porque para que un modelo sirva de algo necesitas datos limpios (aunque esto sea, en realidad, una quimera), gobernados y trazables, y alguien que responda de su calidad. Durante años el linaje, los contratos de datos, los permisos y la calidad fueron la parte aburrida del trabajo. Hoy son lo que separa un piloto vistoso de algo que funciona en producción. A eso se suman los formatos de tabla abiertos como Iceberg, que están cambiando cómo se diseñan las plataformas, y una regulación como la AI Act que ha puesto la gobernanza en la agenda de dirección.

El resultado es que el mercado de datos de 2026 no se parece al de 2021. Hay menos sitio para quien solo sabe ejecutar y más necesidad de gente que sepa decidir qué arquitectura usar, cuánto va a costar, qué riesgos asume y qué merece la pena construir y qué no.

## La parte que me cuesta admitir

Durante años tuve claros mis puntos fuertes: SQL y programar, y en concreto Python. Llevo más de diez años escribiéndolo. Era donde más cómoda me sentía y donde más valor aportaba. Mover datos, limpiar datos, sacar información con queries complejas, saberme el modelo de datos de memoria.

Hoy una IA escribe en segundos lo que antes me llevaba una tarde: un pipeline razonable, un modelo de dbt, un endpoint, un test. No siempre lo hace bien, pero cada vez lo hace mejor. Eso cambia las reglas, porque si una máquina puede hacer algo en segundos, ese algo deja de diferenciarte.

No voy a fingir que no escuece un poco y que me ha dejado noqueada por un tiempo. Aun así, creo que la lectura correcta no es 'saber programar ya no sirve', sino 'saber programar ya no basta'. Mis años con Python no se han evaporado. Son justo lo que me permite detectar cuándo el código que propone la IA es sutilmente incorrecto, cuándo algo que funciona en local va a reventar con diez veces más volumen y cuándo el problema no está en el código sino en el diseño. La IA ha subido el suelo para todo el mundo, pero no ha subido igual el techo del criterio.

Así que me hice una pregunta: si escribir código ya no es mi ventaja, ¿cuál quiero que sea?

## Hacia dónde voy

Mi respuesta es la arquitectura. Quiero crecer hacia roles de plataforma y arquitectura de datos, los que deciden cómo encajan las piezas, cuánto cuestan, cómo se gobiernan y cómo evolucionan cuando cambian las necesidades. Es un trabajo que la IA amplifica en lugar de sustituir. También es lo que más conecta con lo que siempre me ha gustado de los datos, que es entender el sistema entero y no solo mi trozo.

Para llegar ahí estoy haciendo dos cosas.

La primera es estudiar. Terminar la carrera de Ingeniería del Software mientras trabajaba me dejó claro que formarse no es una etapa, sino parte del oficio. Ahora toca profundizar en orquestación, streaming, formatos de tabla abiertos, gobierno del dato y diseño de plataformas.

La segunda es construir, porque lo que estudio sin construir se me olvida en dos semanas (siendo generosa). Por eso he empezado **Aforo**, un proyecto personal y público en el que voy a montar una plataforma de datos desde cero durante el próximo año y pico (con esto de la IA, calcular tiempos ahora se me hace algo más difícil). El primer dominio es el patrimonio cultural. La idea es cruzar el flujo en tiempo real de Wikimedia (EventStreams y las páginas vistas de Wikipedia) con catálogos lentos y heterogéneos como los de Europeana, el Met o el Rijksmuseum. Quiero responder a una pregunta: qué parte del patrimonio europeo es realmente visible en la infraestructura de conocimiento abierto, desglosada por institución, país y tipo de objeto.

Parece un problema pequeño, pero en cuanto rascas aparece de todo. Hay que resolver entidades y lidiar con datos que llegan a ritmos muy distintos y con esquemas que no se parecen entre sí. También hay que controlar costes, porque todo corre en un VPS modesto y no en una cuenta de nube sin límite. Son justo las decisiones que quiero aprender a tomar bien. Además, la plataforma está pensada para no depender del dominio, así que debería aguantar (va a aguantar) si algún día le añado otro.

El código está en [GitHub](https://github.com/maramotto/aforo) con licencia Apache 2.0. Aquí iré contando lo que aprenda por el camino: lo que funcione, lo que no y lo que cambiaría si empezara de nuevo.

## Renovarse o quedarse atrás

Si algo me han enseñado estos cinco años es que en tecnología no hay posiciones seguras. Lo que en 2021 era un perfil muy demandado hoy es una habilidad que se da por hecha, o algo que hace una máquina. No lo digo con pesimismo. Es lo que siempre ha pasado en este oficio, solo que ahora va más rápido, mucho más rápido.

Para mí, renovarse no es perseguir cada herramienta nueva. Es preguntarse cada cierto tiempo qué parte de lo que haces sigue teniendo valor, qué parte se está convirtiendo en algo que cualquiera (o cualquier cosa) puede hacer, y dónde quieres estar cuando ese cambio termine de pasar. Yo me lo he preguntado, y la respuesta me ha devuelto al sitio donde empecé, solo que un piso más arriba.

Nos leemos por aquí.

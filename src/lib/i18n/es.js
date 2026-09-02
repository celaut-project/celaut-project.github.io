/*
 * Copia en español. Misma estructura de claves que en.js — cualquier
 * clave que falte aquí cae automáticamente al inglés, así que la
 * página nunca se queda en blanco.
 *
 * Criterios de traducción
 * -----------------------
 * • Tuteo, que es el registro habitual en sitios técnicos en español.
 * • Los términos propios del paradigma (BOX, API, NET, nodo, servicio,
 *   microVM, DePIN, Ergo) se mantienen tal cual: son vocabulario del
 *   proyecto, no palabras a traducir.
 * • Se conserva el HTML en línea (<strong>, <em>) y la puntuación
 *   tipográfica del original.
 */

export default {
	common: {
		scroll: 'Desliza',
		toTop: '↑ Arriba',
		backToTop: 'Volver arriba',
		gains: 'Ganas',
		costs: 'Cuesta',
		visit: 'Visitar →',
		readMore: 'Leer más →',
		viewOnGitHub: 'Ver en GitHub →',
		languageLabel: 'Idioma',
		switchLanguage: 'Cambiar de idioma',
		toc: {
			nav: 'Navegación por secciones',
			title: 'En esta página',
			open: 'Abrir el menú de secciones',
			close: 'Cerrar el menú de secciones'
		}
	},
	theme: {
		toLight: 'Cambiar al tema claro',
		toDark: 'Cambiar al tema oscuro',
		toggle: 'Cambiar tema'
	},
	topbar: {
		nav: 'Secciones de Celaut',
		links: {
			depin: {
				label: 'Alquila tu PC',
				short: 'Tu PC'
			},
			developers: {
				label: 'Desarrolladores',
				short: 'Devs'
			},
			users: {
				label: 'Usuarios',
				short: 'Usuarios'
			},
			paradigm: {
				label: 'Paradigma',
				short: 'Paradigma'
			}
		}
	},
	home: {
		hero: {
			tagline: 'Una arquitectura peer-to-peer para el diseño y la distribución de software',
			primary: 'Empieza a usarlo',
			secondary: 'Saber más',
			facts: [
				'Inspirado en los autómatas celulares: un comportamiento global resistente que emerge de reglas locales simples.',
				'Determinista por diseño: entradas idénticas producen siempre una salida idéntica y verificable.',
				'Sin registro central. Los servicios se distribuyen peer-to-peer entre nodos independientes.',
				'Cada servicio se direcciona por contenido: su hash es su nombre, así que nada puede sustituirse en silencio.',
				'Los nodos ejecutan cada servicio sellado dentro de su propio microentorno aislado.',
				'La reputación vive en la cadena: la confianza se gana y se demuestra, nunca la concede un guardián.',
				'Tres principios, de arriba abajo: descentralización, simplicidad y determinismo.'
			]
		},
		atoms: {
			eyebrow: 'Las dos piezas primitivas',
			note: 'Dos átomos. La especificación, la ejecución, el pago y la reputación son la forma en que interactúan.',
			items: [
				{
					title: 'Un nodo',
					body: 'Un <strong>ordenador o dispositivo</strong> que habla con sus pares y gestiona la ejecución de servicios. Aporta el hardware, decide si ejecutar el trabajo en local o pasarlo a otro, y nunca necesita entender qué hace el software.'
				},
				{
					title: 'Un servicio',
					body: 'Un <strong>contenedor de software determinista</strong> construido para hacer una sola cosa. Está sellado frente al nodo que lo ejecuta: el nodo no inspecciona el programa, y el programa no sabe en qué máquina ha aterrizado.'
				}
			]
		},
		index: {
			sections: {
				foundations: 'Orígenes',
				atoms: 'Nodos y servicios',
				nodes: 'La red',
				services: 'Servicios',
				'service-spec': 'Especificación',
				execution: 'Ejecución',
				determinism: 'Determinismo',
				coordination: 'Coordinación',
				'core-principles': 'Principios',
				'what-is-not': 'Lo que no es',
				implementations: 'Implementaciones',
				applications: 'Aplicaciones',
				'user-roles': '¿Cuál eres tú?'
			}
		},
		scenes: {
			foundations: {
				label: 'De dónde viene',
				beats: [
					{
						h: 'Empieza con un puñado de reglas.',
						p: 'En los años cuarenta, <strong>John von Neumann</strong> y <strong>Stanislaw Ulam</strong> introdujeron los autómatas celulares: modelos que mostraban cómo pueden emerger comportamientos complejos a partir de otros simples.'
					},
					{
						h: 'Aquí no dirige nadie.',
						p: 'En 1970, <strong>el «juego de la vida» de John Horton Conway</strong> se convirtió en el ejemplo clásico: una cuadrícula donde cada célula solo mira a sus vecinas y que, aun así, produce estructuras intrincadas que evolucionan.'
					},
					{
						h: 'Esa es toda la filosofía de diseño.',
						p: 'Estas ideas explican cómo los sistemas descentralizados pueden <strong>alcanzar complejidad sin control central</strong>, la filosofía que guía a Celaut. Reglas simples en el nodo y en el servicio, y un sistema adaptativo encima.',
						note: 'Descentralización · Simplicidad · Determinismo'
					}
				]
			},
			nodes: {
				label: 'La red',
				beats: [
					{
						h: 'Tener nodos no es la diferencia.',
						p: 'Casi todas las redes descentralizadas tienen nodos, y casi todas siguen dependiendo de algo muy poderoso: <strong>el protocolo que todo el mundo tiene que ejecutar</strong>. Las reglas son el centro, aunque las máquinas no lo sean.'
					},
					{
						h: 'Celaut no tiene protocolo que acordar.',
						p: 'Los nodos no tienen que fijar de antemano un protocolo de comunicación: <strong>declaran al contacto las interfaces que soportan y los métodos de pago que aceptan</strong>. Dos nodos hablan de aquello que resulta que tienen en común; donde no coinciden, simplemente no hablan.'
					},
					{
						h: 'Así que cambias tu nodo, no la red.',
						p: 'Una nueva política de precios, otro método de pago, un formato de especificación que todavía nadie más interpreta: lo <strong>implementas en tu propio nodo</strong> y funciona con quien ya lo soporte. Nadie vota, no hay que migrar nada y <strong>no hay ningún hard fork que sobrevivir</strong>.',
						note: 'Sin protocolo común. Sin versión común. Sin permisos.'
					}
				]
			},
			services: {
				label: 'Lo que se ejecuta',
				beats: [
					{
						h: 'Un servicio es un contenedor sellado.',
						p: 'Los servicios en Celaut son <strong>contenedores de software deterministas</strong> diseñados para realizar una tarea concreta. Nada más elaborado que eso.'
					},
					{
						h: 'Siguiendo el principio de caja negra.',
						p: 'Operan <strong>con independencia de los nodos que los ejecutan</strong> y se centran solo en su funcionalidad. El nodo no necesita entender el servicio, y el servicio no necesita saber nada del nodo.'
					},
					{
						h: 'Aislado, en cada ejecución.',
						p: 'Cada petición se ejecuta como un <strong>proceso aislado</strong>, en su propia <strong>máquina virtual</strong>, con su propio kernel y una frontera impuesta por el hardware, lo que abstrae el entorno de ejecución y mantiene intacta la barrera de seguridad.',
						note: 'Lo que entra y lo que sale. Esa es toda la interfaz.'
					}
				]
			},
			'service-spec': {
				label: 'Cómo se especifica un servicio',
				explore: 'Explorar {what}',
				exploreClose: 'Volver al servicio completo',
				beats: [
					{
						h: '<strong>BOX</strong>: el entorno.',
						p: 'Arquitectura, sistema de archivos, variables de entorno, punto de entrada, configuración y recursos. Especifica directamente toda la estructura de archivos en lugar de depender de imágenes o repositorios externos, y eso es lo que hace que la ejecución sea reproducible en cualquier nodo.'
					},
					{
						h: '<strong>API</strong>: la interfaz.',
						p: 'Cómo comunicarse con el servicio, los sistemas de pago que acepta y los costes asociados. Permite usar los servicios sin que ningún controlador central negocie el protocolo en su nombre.'
					},
					{
						h: '<strong>NET</strong>: el alcance de red.',
						p: 'Por defecto un servicio está <strong>aislado</strong>: solo puede hablar con su padre, con sus hijos y con el nodo que lo ejecuta. Si necesita el mundo exterior, <strong>las redes a las que llegará se nombran en su propia especificación</strong>; el nodo se las concede porque quiere ejecutar bien el servicio, y tú obtienes la garantía de que nunca podrá llegar a ningún otro sitio.'
					},
					{
						h: 'Tres componentes. Un servicio portable.',
						p: 'Juntos crean <strong>servicios portables y reproducibles</strong> que se despliegan igual en toda la red, manteniendo la seguridad y el determinismo.',
						note: 'Sin dependencias de terceros. Nada queda implícito.'
					}
				]
			},
			execution: {
				label: 'Quién decide qué',
				beats: [
					{
						h: 'Un servicio pide sus hijos.',
						p: 'Un servicio puede solicitar la ejecución de <strong>servicios hijo</strong> a través de su nodo. Declara <strong>los recursos que necesita cada uno</strong> y les entrega un presupuesto para gastar. No una máquina, no una región: recursos.'
					},
					{
						h: 'El nodo decide dónde se ejecutan.',
						p: 'Compara <strong>el coste de ejecutar la instancia localmente con el que le cotiza cada uno de sus pares</strong> y elige el que considera mejor. Un hijo se queda aquí; otro aterriza en un par.'
					},
					{
						h: 'El padre nunca se entera.',
						p: 'No sabe si un hijo acabó en esta máquina o en otra parte, y no necesita saberlo. Lo único que vigila es <strong>cuánto consumen sus hijos y a qué ritmo gastan</strong>, para poder equilibrarlo.'
					},
					{
						h: 'Esa separación es todo el truco.',
						p: 'Los operadores de nodos se ocupan del lado físico: hardware, capacidad, precio, ubicación. Los desarrolladores de servicios <strong>declaran los recursos que necesitan y nada sobre infraestructura</strong>. Ninguno tiene que hacer el trabajo del otro, y eso es exactamente lo que mantiene simples ambas mitades.',
						note: 'Dos preocupaciones. Una línea limpia entre ellas.'
					}
				]
			},
			determinism: {
				label: 'Por qué se sostiene',
				beats: [
					{
						h: 'Misma entrada. Misma salida.',
						p: 'Los servicios se especifican por completo para buscar <strong>resultados reproducibles</strong> a lo largo del tiempo y entre nodos. Con las mismas entradas, la misma especificación debería producir las mismas salidas, sin importar dónde ni cuándo se ejecute.'
					},
					{
						h: 'No es una garantía en todos los casos.',
						p: 'Un servicio que sale a una red no puede ser perfectamente reproducible: la red responde distinto. Pero una <strong>especificación lleva mucho más que una definición de Docker</strong>: la arquitectura, el sistema de ficheros entero, el entrypoint, la configuración. Así que esto se parece mucho más a ejecutar un programa normal que a descargar una imagen y confiar.'
					},
					{
						h: 'Lo que hace medible la confianza.',
						p: 'Como el software no puede derivar, una <strong>prueba de reputación registrada hace tiempo sigue diciendo algo cierto hoy</strong>, siempre que el servicio no salga a ninguna red, que es su estado por defecto.'
					},
					{
						h: 'Y además viaja.',
						p: 'Como nada del entorno se deja al anfitrión, la misma especificación produce el mismo comportamiento en <strong>un portátil, un servidor de sobra o un nodo del que nunca has oído hablar</strong>. Dónde se ejecuta deja de formar parte de la respuesta.',
						note: 'Todo especificado, así que nada queda en manos de la máquina.'
					}
				]
			},
			coordination: {
				label: 'Cómo cooperan los desconocidos',
				more: 'El modelo de confianza al completo →',
				beats: [
					{
						h: 'La reputación va primero.',
						p: '<strong>Nunca se presupone confianza entre las partes.</strong> Los nodos no confían en otros nodos; tú no confías de entrada ni en un servicio ni en el nodo que lo ejecuta; un nodo tampoco tiene por qué confiar en el servicio que ejecuta. La única dirección que sí se sostiene es la contraria: un servicio sí puede confiar en su nodo, porque quien decidió ejecutarlo eligió ese nodo. Así que nada empieza con un apretón de manos, sino con una consulta: la reputación son <strong>registros en ledgers</strong>, opiniones más que veredictos, y cada actor las pondera según las fuentes en las que ya confía.'
					},
					{
						h: 'Después pagas por una promesa de recursos.',
						p: 'Solo cuando el historial cuadra se mueve algo. Quien solicita paga <strong>por adelantado</strong>, y lo que compra es una promesa: <strong>tanta computación, durante tanto tiempo</strong>. Los mecanismos de pago quedan <strong>fuera de la arquitectura central</strong>, así que no hay ningún ledger empotrado.'
					},
					{
						h: 'El aval del nodo es su reputación.',
						p: 'Nada le obliga a cumplir esa promesa. Lo que lo sostiene es que <strong>el resultado se escribe de vuelta en el ledger</strong>, y un nodo cuyo historial dice que cobró y entregó de menos deja de ser elegido. Cada parte tiene un interés permanente en que al siguiente desconocido le guste lo que lea.',
						note: 'Consultar · pagar · entregar · registrar. Y vuelta a empezar.'
					}
				]
			},
			'core-principles': {
				label: 'Las reglas que sostiene',
				beats: [
					{
						h: 'Nada de eso era una lista de funciones.',
						p: 'Una red sin protocolo que acordar, servicios sellados frente a las máquinas que los ejecutan, redes declaradas de antemano, pago antes de la ejecución: cada una de esas cosas es una <strong>consecuencia</strong>. Tres compromisos las producen, y se sostienen entre sí.'
					},
					{
						h: 'Descentralización.',
						p: 'Ningún <strong>punto único de control o de fallo</strong>. Los nodos se comunican y se coordinan dinámicamente, sin nada en medio a lo que pedir permiso, que es justamente por lo que no había ningún protocolo que acordar.'
					},
					{
						h: 'Simplicidad.',
						p: '<strong>Reglas minimalistas</strong> que reducen la complejidad, de modo que cada componente sigue siendo lo bastante pequeño como para entenderlo y mantenerlo por separado. Un servicio es un contenedor, una interfaz y un alcance de red, y eso es todo.'
					},
					{
						h: 'Determinismo.',
						p: 'Los servicios se especifican con el detalle suficiente para <strong>reproducir sus resultados</strong> a lo largo del tiempo y entre máquinas. Mismas entradas, mismas salidas, se ejecuten donde se ejecuten y cuando se ejecuten, que es lo que hace que una reputación registrada hace un año siga mereciendo la pena hoy.',
						note: 'Quita cualquiera de los tres y los otros dos dejan de valer gran cosa.'
					}
				]
			}
		},
		roles: {
			eyebrow: 'Elige tu entrada',
			heading: '¿Cuál eres tú?',
			intro: 'Como usuarios podemos desempeñar tres tipos de rol en el ecosistema. Cada uno tiene su propia puerta de entrada.',
			items: [
				{
					eyebrow: 'Rol 01',
					title: 'Mantenedores de nodos',
					lede: 'De forma parecida a los mineros en los sistemas blockchain, los mantenedores de nodos aportan recursos computacionales a la red. Ejecutan los servicios que solicitan los usuarios a cambio de un pago, sin necesidad de entender qué hace exactamente cada servicio.',
					points: [
						'Aportan recursos de hardware',
						'Ejecutan servicios bajo demanda',
						'Reciben compensación por los recursos'
					],
					primary: 'Alquila tu PC',
					secondary: 'Levanta un nodo'
				},
				{
					eyebrow: 'Rol 02',
					title: 'Desarrolladores de servicios',
					lede: 'Los desarrolladores crean servicios que pueden ejecutarse en cualquier nodo compatible de la red. Se centran en construir funcionalidad sin preocuparse por los detalles de la infraestructura subyacente.',
					points: [
						'Diseñan especificaciones de servicio',
						'Construyen aplicaciones deterministas',
						'Distribuyen servicios a los nodos'
					],
					primary: 'Construye sobre Celaut',
					secondary: 'Explorar Skills'
				},
				{
					eyebrow: 'Rol 03',
					title: 'Usuarios de servicios',
					lede: 'Los usuarios finales lanzan servicios en los nodos y pagan por los recursos computacionales utilizados.',
					points: [
						'Solicitan la ejecución de servicios',
						'Pagan por los recursos computacionales',
						'Consumen las salidas del servicio'
					],
					primary: 'Usa la red',
					secondary: 'Explorar Skills'
				}
			]
		},
		principles: {
			items: [
				{
					title: 'Descentralización'
				},
				{
					title: 'Simplicidad'
				},
				{
					title: 'Determinismo'
				}
			]
		},
		whatIsNot: {
			eyebrow: 'Malentendidos habituales',
			heading: 'Lo que Celaut no es',
			intro: 'La arquitectura se parece lo suficiente a varias cosas conocidas como para confundirse con ellas. Merece la pena ser preciso con las diferencias.',
			items: [
				{
					title: 'No es una única red',
					body: 'Celaut define una <strong>arquitectura flexible</strong>, no una red predeterminada. Es probable que surjan redes predominantes, pero el sistema admite muchas construcciones peer-to-peer en lugar de imponer una sola.'
				},
				{
					title: 'No es una pila de protocolos completa',
					body: 'Aporta <strong>principios fundamentales</strong> para construir pilas de distribución de computación, no una pila completa y cerrada. Las implementaciones actuales se apoyan en componentes como gRPC o Docker, y esas son elecciones intercambiables.'
				},
				{
					title: 'No es un proyecto blockchain',
					body: 'Celaut <strong>no tiene criptomoneda propia</strong> ni DAOs. Sí incorpora tecnologías blockchain donde se ganan su sitio —registrar reputación, liquidar pagos entre desconocidos— sin adoptar el ecosistema más amplio que las rodea.'
				}
			]
		},
		implementations: {
			eyebrow: 'El software',
			heading: 'Qué existe hoy',
			intro: 'La arquitectura es una especificación, y cualquiera puede implementar un nodo contra ella. Una implementación mueve la red ahora mismo; la segunda es una dirección anunciada, y así queda marcada.',
			items: [
				{
					name: 'Nodo',
					stage: 'En marcha',
					body: 'La implementación de referencia, en Python3 y Rust. Ejecuta servicios, negocia el coste con los pares, provee direcciones y tokens, y resuelve dependencias se ejecuten donde se ejecuten. Se instala en Linux con un solo comando, y en Windows 11 mediante un instalador firmado que provisiona su propio entorno Linux aislado.'
				},
				{
					name: 'Chatui',
					stage: 'Concepto',
					body: 'La intención declarada de construir un nodo para Android que llegue a los servicios mediante una interfaz de chat sencilla, sin confiar en ningún otro nodo. El repositorio contiene hoy esa descripción y nada más: todavía no hay código que ejecutar.'
				}
			],
			note: 'Aquí nada es un marcador de posición de algo que ya funciona en otra parte. Lo que funciona, funciona; lo que no, lo dice.'
		},
		applications: {
			eyebrow: 'Dónde ya está funcionando',
			heading: 'Impacto y aplicaciones reales',
			intro: 'La arquitectura no es un experimento mental. Está en uso a dos distancias distintas: como la capa en sí, y como cimiento de algo con su propia razón de existir.',
			layerHeading: 'La arquitectura, encendida',
			layerTag: 'La capa en sí',
			layerIntro: 'Ninguna de las dos es una aplicación construida sobre Celaut. Son lo que Celaut <strong>es</strong>, una vez que hay nodos funcionando de verdad.',
			layer: [
				{
					name: 'DePIN',
					body: 'Cualquiera puede ejecutar un nodo Celaut y pasar a formar parte de una red de infraestructura física descentralizada. Cada nodo descubre pares, ejecuta y orquesta servicios y gestiona sus dependencias, convirtiendo ordenadores corrientes en cómputo compartido y resistente a la censura. Esto es la red, no un producto sobre ella.'
				},
				{
					name: 'Unstoppable Skills',
					body: 'Un registro totalmente on-chain y sin servidores donde los protagonistas son los problemas. En lugar de buscar servicios, los agentes buscan una habilidad y descubren los servicios que la cubren, con benchmarks reales y clasificación por reputación. Es la forma en que se alcanza en la práctica la capa de reputación del paradigma: sobre Ergo, con implicación real de por medio, porque nadie hace spam sin arriesgar su reputación.'
				}
			],
			builtOnHeading: 'Construido encima',
			builtOnTag: 'Proyecto independiente',
			builtOnIntro: 'Un paso más allá: un producto con su propio propósito y sus propios usuarios, que da la casualidad de que está ensamblado con servicios Celaut. Seguiría teniendo sentido si se reconstruyera sobre otra cosa, y eso es exactamente lo que lo convierte en evidencia.',
			builtOn: {
				name: 'Game of Prompts',
				body: [
					'Una plataforma competitiva donde los creadores diseñan <strong>servicios-juego</strong> que evalúan a los robots que juegan, y los jugadores escriben <strong>servicios-solucionador</strong> que intentan maximizar su puntuación.',
					'Los servicios siguen el paradigma Celaut, y todo el sistema usa la blockchain de Ergo para registrar resultados y transferir premios.'
				]
			},
			ergoDocs: 'Documentación de Ergo',
			formalPaper: 'Artículo formal'
		}
	},
	depin: {
		meta: {
			title: 'Alquila tu PC — Celaut DePIN',
			description: 'Vende los recursos de tu ordenador cuando no los estás usando. La capa DePIN de Celaut es completamente peer-to-peer, te deja fijar el precio de la computación contando con tu factura de la luz y aísla cada carga de trabajo dentro de una microVM.'
		},
		topbarTitle: 'Alquila tu PC',
		index: {
			sections: {
				rent: 'La idea',
				p2p: 'Peer-to-peer',
				electricity: 'Tu factura de la luz',
				isolation: 'Aislamiento',
				payoff: 'Lo que obtienes',
				responsibilities: 'Qué hace un nodo',
				steps: 'De la instalación al ingreso',
				roles: 'La otra cara',
				cta: 'Empezar'
			}
		},
		hero: {
			eyebrow: 'Celaut DePIN',
			title: 'Alquila tu PC.',
			tagline: 'Vende los recursos de tu ordenador cuando no los estás usando.',
			lede: 'Tu máquina pasa inactiva la mayor parte del día. Celaut convierte esa capacidad sin usar en algo por lo que la gente paga: directamente, en tus términos y con cada carga de trabajo sellada lejos de tu sistema.',
			actions: [
				'Empieza a alquilar tu PC',
				'Cómo funciona'
			],
			stats: [
				{
					value: '100%',
					label: 'peer-to-peer, sin ninguna empresa en medio'
				},
				{
					value: 'Tú',
					label: 'pones el precio, contando con tu factura de la luz'
				},
				{
					value: 'microVM',
					label: 'aislamiento para cada carga de trabajo que alojas'
				}
			]
		},
		scenes: {
			rent: {
				label: 'La idea',
				beats: [
					{
						h: 'Tu PC está inactivo ahora mismo.',
						p: 'La mayoría de los equipos personales pasan sin usarse buena parte del día. Eso es hardware real —núcleos, memoria, disco— sin hacer absolutamente nada.'
					},
					{
						h: 'Vende lo que no estás usando.',
						p: 'Celaut divide tu máquina en <strong>capacidad que puedes alquilar</strong>. Tú decides cuánta va a la red y cuánta se queda contigo; el resto de la máquina sigue funcionando exactamente como siempre.'
					},
					{
						h: 'Cobra por el trabajo que hace.',
						p: 'Los pares que necesitan computación encuentran tu nodo, acuerdan un precio directamente con él y pagan por ejecución. <strong>El pago se liquida en Ergo</strong> según termina cada trabajo.',
						note: 'Sin centro de datos. Sin intermediarios. Sin esperar a un pago mensual.'
					}
				]
			},
			p2p: {
				label: 'Ventaja 01',
				beats: [
					{
						h: 'Completamente peer-to-peer.',
						p: 'Cualquier otra plataforma de «alquila tu hardware» pone una empresa en medio. Controla el mercado, se lleva su parte, fija las reglas y puede expulsarte de su red cuando le apetezca.'
					},
					{
						h: 'Aquí no hay nadie en medio.',
						p: 'Celaut <strong>no tiene fundación ni empresa</strong> sentada entre las dos partes. Tu nodo y el par que quiere computación hablan entre sí <strong>directamente</strong>: descubrimiento, negociación, ejecución y liquidación.'
					},
					{
						h: 'Lo que significa que nadie puede cortarte el grifo.',
						p: 'Ninguna cuenta que suspender, ningunos términos que cambien bajo tus pies, ninguna comisión que crezca en silencio. La interacción es <strong>completamente peer-to-peer</strong>, así que lo único de lo que depende cada parte es de la otra.',
						note: 'Nada en lo que registrarse. Nada de lo que ser expulsado.'
					}
				]
			},
			electricity: {
				label: 'Ventaja 02',
				beats: [
					{
						h: 'Regalar computación no sale gratis.',
						p: 'Tener la máquina encendida cuesta electricidad, y ese coste no es plano: se mueve a lo largo del día y cambia según dónde vivas.'
					},
					{
						h: 'Métela en el precio.',
						p: 'Celaut te permite <strong>incorporar opcionalmente el coste eléctrico</strong> al precio que fijas para tu computación. Tu nodo cotiza el trabajo con tu factura de la luz en la ecuación, así que alquilar capacidad nunca te cuesta dinero sin que te enteres.'
					},
					{
						h: 'Y decide cuándo estás abierto.',
						p: '<strong>La disponibilidad y el tiempo de ejecución también los fijas tú.</strong> Alquila la máquina solo de madrugada, cuando la luz es más barata, limita cuánto puede durar un trabajo o desconéctate del todo: la red simplemente enruta a otro sitio.',
						note: 'Tus tarifas. Tus horas. Tu margen.'
					}
				]
			},
			isolation: {
				label: 'Ventaja 03',
				beats: [
					{
						h: '¿De quién es el código que se ejecuta en mi PC?',
						p: 'Es la primera pregunta que hace cualquiera con sentido común. Alquilar tu máquina no puede significar darle las llaves a desconocidos.'
					},
					{
						h: 'Aislamiento total de la ejecución.',
						p: 'Cada carga de trabajo se ejecuta sellada dentro de su propia <strong>microVM</strong>: una máquina virtual real, con su propio kernel y una frontera impuesta por hardware, no un contenedor con kernel compartido. No puede ver tus archivos, tu red ni ninguna otra carga de trabajo de la máquina.'
					},
					{
						h: 'La misma tecnología con la que funcionan las grandes nubes.',
						p: 'Las microVM son lo que usan los <strong>grandes proveedores cloud</strong> para ejecutar código no confiable de millones de desconocidos sobre hardware compartido. Celaut pone ese mismo modelo de aislamiento en tu escritorio: la garantía no es una promesa, es la arquitectura.',
						note: 'Termina el trabajo, se destruye la VM. No persiste nada.'
					}
				]
			}
		},
		payoff: {
			heading: 'Lo que obtienes realmente',
			items: [
				{
					title: 'Hardware inactivo, trabajando',
					body: 'El equipo de juego dormido a las 3 de la mañana, la estación de trabajo parada el fin de semana, una caja de repuesto en un armario. Si puede ejecutar nodo, puede ganar dinero.'
				},
				{
					title: 'Tú pones las condiciones',
					body: 'Precio por unidad de computación, en qué horas estás disponible, cuánto de la máquina estás dispuesto a ceder. Todo tuyo y modificable.'
				},
				{
					title: 'Cobras por adelantado',
					body: 'A un nodo se le paga de antemano por una promesa de recursos, en Ergo (ERG): sin facturas, sin calendario de pagos de una plataforma, sin mínimos. La reputación es el aval de que cumplirá.'
				},
				{
					title: 'Nada en lo que confiar',
					body: 'Los servicios se direccionan por contenido: quien lo solicita recibe exactamente el software que pidió, y tú lo ejecutas sin inspeccionarlo ni responder por él.'
				},
				{
					title: 'Tus archivos siguen siendo tuyos',
					body: 'Cada carga de trabajo vive en su propia microVM con su propio kernel. Nunca ve tu disco, tu red ni nada más de la máquina.'
				},
				{
					title: 'Te vas cuando quieras',
					body: 'Paras el nodo y la red te rodea. No hay contrato, no hay ataduras y no hay a quién pedir permiso.'
				}
			]
		},
		responsibilities: {
			heading: 'Qué hace realmente el nodo que tienes en tu máquina',
			intro: 'Un nodo es un <strong>ordenador o dispositivo</strong> que se comunica con sus pares y gestiona la ejecución de servicios. El paradigma le asigna cuatro tareas, y no pone ningún coordinador por encima de él.',
			items: [
				{
					title: 'Ejecución de servicios',
					body: 'Negocia los costes de ejecución con sus pares y decide si ejecutar un servicio localmente o delegarlo, de modo que los recursos van donde resultan más baratos.'
				},
				{
					title: 'Comunicación',
					body: 'Declara al contacto las interfaces que soporta y los métodos de pago que acepta, que es lo que permite que los protocolos evolucionen sin acuerdo previo.'
				},
				{
					title: 'Seguridad',
					body: 'Emite y gestiona las direcciones y los tokens de autenticación con los que se identifica cada interacción entre servicios.'
				},
				{
					title: 'Dependencias',
					body: 'Se asegura de que un servicio pueda alcanzar lo que necesita, esté donde esté ejecutándose esa dependencia dentro de la red.'
				}
			],
			note: 'Nada de eso exige saber para qué sirve el software que ejecuta.'
		},
		steps: {
			heading: 'De la instalación a los ingresos',
			items: [
				{
					title: 'Instala nodo',
					body: 'Un comando en Linux, un instalador en Windows. Tu máquina se une a la red y empieza a descubrir pares.'
				},
				{
					title: 'Fija tu precio y tus horas',
					body: 'Dile al nodo cuánto cuesta tu computación —incluida la electricidad si quieres contarla— y cuándo está disponible.'
				},
				{
					title: 'Acepta trabajo',
					body: 'Los pares negocian directamente con tu nodo. Las cargas aceptadas se ejecutan selladas dentro de una microVM, aisladas de todo lo demás.'
				},
				{
					title: 'Cobra',
					body: 'El pago se cobra por adelantado en Ergo; la reputación se registra a medida que el trabajo se cumple. La contribución se recompensa; los resultados siguen siendo auditables.'
				}
			]
		},
		roles: {
			heading: 'La otra cara del intercambio',
			intro: 'Alquilar tu PC es una mitad de la red. La otra mitad es poder <em>usarla</em>, y las mismas propiedades que te protegen como anfitrión son las que hacen que merezca la pena comprar en ella.',
			items: [
				{
					title: 'Desarrolladores',
					body: 'Publica un programa una vez como servicio sellado y direccionado por contenido, y deja que la red lo aloje, lo descubra y lo escale. La reproducibilidad viene del diseño, no del SLA de un proveedor.',
					link: 'Para desarrolladores →'
				},
				{
					title: 'Agentes y usuarios',
					body: 'Solicita servicios por el problema que resuelven y paga por ejecución. Sin cuenta cloud, sin ataduras, y el sello demuestra que recibiste exactamente el software que pediste.',
					link: 'Para usuarios finales →'
				},
				{
					title: 'Anfitriones',
					body: 'Ese eres tú. Aporta el hardware que tengas; la capa de virtualización del nodo hace que las cargas acaben igualmente donde encajan, incluso entre arquitecturas de CPU distintas.'
				}
			]
		},
		cta: {
			heading: 'Enciende tu máquina inactiva.',
			body: 'Instalar un nodo es un solo comando. Es la forma más rápida de ver cuánto vale tu hardware cuando no está haciendo nada más.',
			actions: [
				'Levanta un nodo',
				'Lee el paradigma'
			]
		}
	},
	developers: {
		meta: {
			title: 'Para desarrolladores — Constrúyelo una vez, se ejecuta en cualquier parte | Celaut',
			description: 'Construye servicios Celaut: especifica un BOX, una API y un alcance NET, entrégalo a un nodo y deja que la red lo distribuya y lo ejecute. Sin infraestructura, sin configuración y sin plataforma en medio.'
		},
		topbarTitle: 'Para desarrolladores',
		index: {
			sections: {
				spec: 'La idea',
				agnostic: 'Corre donde sea',
				distribute: 'Distribución',
				compose: 'Composición',
				payoff: 'Lo que obtienes',
				distribution: 'Cómo se propaga',
				steps: 'Del código a la red',
				tradeoffs: 'El intercambio',
				roles: 'Los demás',
				cta: 'Empezar'
			}
		},
		hero: {
			eyebrow: 'Desarrolladores de servicios',
			title: 'Constrúyelo una vez.',
			tagline: 'Y deja de pensar en dónde se ejecuta.',
			lede: 'Un servicio Celaut no es un despliegue: es una especificación. Describe el entorno, la interfaz y el alcance de red, entrégaselo a un solo nodo y la red se encarga a partir de ahí.',
			actions: [
				'Explorar Skills',
				'Cómo funciona'
			],
			stats: [
				{
					value: 'BOX · API · NET',
					label: 'tres componentes; eso es toda la especificación'
				},
				{
					value: 'Sin DevOps',
					label: 'los nodos ejecutan; no hay ninguna cuenta cloud que abrir'
				},
				{
					value: 'Determinista',
					label: 'mismas entradas, mismas salidas, en cualquier nodo y momento'
				}
			]
		},
		scenes: {
			spec: {
				label: 'La idea',
				beats: [
					{
						h: 'No despliegas. Especificas.',
						p: 'No hay ningún servidor que aprovisionar, ninguna imagen que subir ni ningún pipeline que mantener en verde. Un servicio en Celaut es una descripción escrita de lo que necesita para ejecutarse.'
					},
					{
						h: 'Tres componentes. Eso es todo.',
						p: '<strong>BOX</strong> describe el entorno de ejecución: arquitectura, sistema de archivos, variables de entorno, punto de entrada y configuración. Especifica directamente toda la estructura de archivos en lugar de apuntar a una imagen externa, y eso es lo que mantiene reproducible la ejecución.'
					},
					{
						h: 'Y cómo llega el mundo hasta él.',
						p: '<strong>API</strong> define cómo hablan con él los clientes y otros servicios, además de los métodos de pago aceptados y los costes. <strong>NET</strong> nombra las redes externas a las que llegará: por defecto un servicio está aislado, y cualquier alcance mayor se declara en la propia especificación, así que los usuarios saben de antemano hasta dónde puede llegar.',
						note: 'Portable, reproducible y libre de dependencias de terceros.'
					}
				]
			},
			agnostic: {
				label: 'Ventaja 01',
				beats: [
					{
						h: 'Escribieras lo que escribieras, se publica igual.',
						p: 'Celaut no te pide adoptar un framework, un runtime ni un SDK. Te pide un sistema de archivos y un punto de entrada.'
					},
					{
						h: 'Al nodo tampoco le importa.',
						p: 'Los servicios siguen el <strong>principio de caja negra</strong>: operan con independencia de los detalles de los nodos que los ejecutan, y los nodos los ejecutan sin necesidad de entender qué hacen.'
					},
					{
						h: 'Así que cualquier nodo compatible lo aceptará.',
						p: 'El BOX declara la microarquitectura a la que apunta, de modo que los nodos saben si encajan. Más allá de eso, <strong>tu servicio puede ejecutarlo cualquiera en cualquier nodo compatible</strong>: ese es todo el contrato.',
						note: 'Sin ataduras, porque no hay nada a lo que atarse.'
					}
				]
			},
			distribute: {
				label: 'Ventaja 02',
				beats: [
					{
						h: 'Entrégaselo a un nodo.',
						p: 'No publicas en ninguna tienda ni esperas ninguna revisión. Al desarrollador solo le hace falta <strong>enviar el servicio a uno o varios nodos</strong>.'
					},
					{
						h: 'La red lo lleva a partir de ahí.',
						p: 'Esos nodos se encargan de <strong>distribuir el servicio entre los demás</strong>. No hay registro central de servicios: los servicios se propagan peer-to-peer, así que no hay punto único de fallo ni ningún guardián decidiendo si tienes permiso para entrar.'
					},
					{
						h: 'Descubrible, si tú quieres.',
						p: 'Los nodos también pueden <strong>subir el servicio a un sistema de reputación</strong>, para que usuarios y otros servicios juzguen si usarlo y cuándo. Los servicios pueden declararse en un registro en blockchain —como el <strong>Sigma Reputation System</strong> en Ergo— para mejorar la visibilidad y la confianza.',
						note: 'Nada en lo que registrarse. Nadie llevándose una comisión.'
					}
				]
			},
			compose: {
				label: 'Ventaja 03',
				beats: [
					{
						h: 'Servicios que llaman a servicios.',
						p: 'Un servicio puede solicitar la ejecución de otros servicios —sus <strong>servicios hijo</strong>— a través del nodo que lo ejecuta. Los flujos de trabajo complejos se construyen por composición, no con configuración de orquestación.'
					},
					{
						h: 'El nodo decide dónde aterrizan.',
						p: 'Los nodos gestionan las instancias de servicio y deciden si ejecutarlas localmente o repartir la carga entre sus pares. Las dependencias son problema del nodo: él se asegura de que los servicios alcancen lo que necesitan a lo largo de la red.'
					},
					{
						h: 'Y tú nunca llegas a saber dónde.',
						p: '<strong>El servicio padre no sabe dónde se ejecutan sus dependencias.</strong> Cada hijo simplemente declara los recursos que necesita. Tú escribes la composición; la red resuelve la ubicación.',
						note: 'Sin planificador que configurar. Sin topología que mantener.'
					}
				]
			}
		},
		payoff: {
			heading: 'Lo que te da la arquitectura',
			items: [
				{
					title: 'Especifica, no despliegues',
					body: 'Un servicio es un BOX (arquitectura, sistema de archivos, entorno, punto de entrada, configuración), una API y un alcance NET. Escríbelo y ya está: no hay ningún paso de despliegue del que ocuparse.'
				},
				{
					title: 'Autocontenido por construcción',
					body: 'El BOX describe toda la estructura de archivos que el servicio necesita, en lugar de apuntar a imágenes o repositorios externos. Ningún registro de terceros puede desaparecer bajo tus pies.'
				},
				{
					title: 'Una caja negra, a propósito',
					body: 'Los servicios operan con independencia de los nodos que los ejecutan. Nunca programas contra el entorno de un nodo, porque nunca te dicen cuál es.'
				},
				{
					title: 'Reproducible, no «en la medida de lo posible»',
					body: 'Con las mismas entradas, un servicio produce siempre las mismas salidas, sin importar dónde ni cuándo se ejecute. Aquí el determinismo es una propiedad arquitectónica, no la promesa de un proveedor.'
				},
				{
					title: 'Composición sin orquestación',
					body: 'Un servicio puede solicitar la ejecución de servicios hijo a través de su nodo. El padre no sabe dónde se ejecutan; cada uno se limita a declarar los recursos que necesita.'
				},
				{
					title: 'Reputación que se acumula',
					body: 'Como un servicio es determinista y está aislado por defecto, una prueba de reputación registrada hace tiempo sigue diciendo algo cierto sobre él hoy.'
				}
			]
		},
		steps: {
			heading: 'Del código a ejecutarse en la red',
			items: [
				{
					title: 'Escribe el servicio',
					body: 'Cualquier lenguaje, cualquier stack. Lo que importa es el sistema de archivos que necesita y el comando que lo arranca, no el framework al que recurriste.'
				},
				{
					title: 'Especifica BOX, API y NET',
					body: 'Declara el entorno, cómo hablan con el servicio quienes lo llaman y qué acceso a redes externas debería poder solicitar, si es que necesita alguno.'
				},
				{
					title: 'Envíalo a un nodo',
					body: 'Con un nodo basta. Él distribuye el servicio a los demás y puede publicarlo en un sistema de reputación para que usuarios y otros servicios lo encuentren.'
				},
				{
					title: 'Deja que la red lo ejecute',
					body: 'Los nodos negocian el coste y deciden dónde se ejecuta cada instancia. Tú no estás en el bucle y no tienes ninguna infraestructura que mantener viva.'
				}
			]
		},
		distribution: {
			heading: 'Cómo se propaga realmente un servicio',
			intro: 'No hay tienda en la que publicar ni revisión que esperar. Un servicio se entrega a un nodo, y la red lo lleva desde ahí: por defecto fuera de la cadena, y opcionalmente en ella.',
			items: [
				{
					title: 'Peer-to-peer por defecto',
					body: 'Celaut <strong>no tiene un registro central de servicios</strong>. Los servicios se propagan entre nodos peer-to-peer, así que pueden encontrarse directamente y no hay ningún guardián decidiendo si tienes permiso para entrar.'
				},
				{
					title: 'En un registro, si se lo gana',
					body: 'Los servicios también pueden declararse en una blockchain que implemente un registro —como el <strong>Sigma Reputation System</strong> en Ergo— cuando la visibilidad y un rastro auditable valen más que quedarse completamente fuera de la cadena.'
				}
			]
		},
		tradeoffs: {
			heading: 'El intercambio que estás haciendo de verdad',
			intro: 'Hoy, publicar software significa elegir entre alojarlo tú mismo o pedirle a la gente que lo ejecute por su cuenta. Ambas opciones cuestan algo. Lo que afirma Celaut es estrecho y concreto: toma las ventajas de cada una sin sus inconvenientes, al precio de tu control sobre el servicio en ejecución.',
			items: [
				{
					label: 'Un servicio web alojado',
					good: 'Los usuarios no necesitan infraestructura ni configuración.',
					bad: 'No puedes demostrar que el sistema no ha cambiado, y los usuarios tienen que creerte cuando dices que no haces mal uso de los datos de sus peticiones.'
				},
				{
					label: 'Código fuente que ejecutan ellos',
					good: 'Determinista —una vez descargado no puedes cambiarlo a sus espaldas— y los datos de sus peticiones nunca te llegan.',
					bad: 'Necesitan hardware capaz y tienen que sobrevivir a la configuración, que es donde la mayoría de la gente se rinde.'
				},
				{
					label: 'Un servicio Celaut',
					good: 'Ninguna infraestructura que gestionar y nada que configurar, porque la especificación ya cubre el contenedor, la arquitectura, las necesidades de red y la interfaz.',
					bad: 'Renuncias al control: no puedes modificar, limitar ni extraer datos de un servicio una vez está ahí fuera. Y ese es justo el objetivo.',
					highlight: true
				}
			]
		},
		roles: {
			heading: 'El resto de la red',
			intro: 'Tu servicio necesita un sitio donde ejecutarse y alguien para quien ejecutarse. Detrás de ambas cosas también hay personas.',
			items: [
				{
					title: 'Mantenedores de nodos',
					body: 'Aportan el hardware y ejecutan lo que se les solicite, sin necesidad de entender qué hace tu servicio, a cambio de un pago.',
					link: 'Alquila tu PC →'
				},
				{
					title: 'Usuarios finales',
					body: 'Lanzan servicios en los nodos y pagan por los recursos computacionales utilizados, y pueden verificar que lo que se ejecutó es exactamente lo que describía la especificación.',
					link: 'Para usuarios finales →'
				},
				{
					title: 'El paradigma',
					body: 'La arquitectura completa: nodos, servicios, especificación, coordinación mediante sistemas de reputación y pago, y por qué todo ello es necesario.',
					link: 'Lee el artículo →'
				}
			]
		},
		cta: {
			heading: 'Empieza por los problemas.',
			body: 'Unstoppable Skills es un registro donde los protagonistas son los problemas: busca una habilidad y encuentra los servicios que la cubren, sus benchmarks y su reputación. Es el camino más corto entre «qué debería construir» y «quién lo necesita».',
			actions: [
				'Explorar Skills',
				'Lee el paradigma'
			]
		}
	},
	users: {
		meta: {
			title: 'Para usuarios finales — Ejecútalo y paga por lo que use | Celaut',
			description: 'Lanza servicios en nodos Celaut y paga solo por los recursos computacionales utilizados. Sin cuentas, sin suscripciones y sin plataforma en medio: los servicios se ejecutan aislados y de forma determinista, así que obtienes exactamente lo que describe la especificación.'
		},
		topbarTitle: 'Para usuarios finales',
		index: {
			sections: {
				ask: 'La idea',
				proof: 'Lo que recibes',
				sealed: 'Sellado',
				pay: 'Lo que pagas',
				payoff: 'Lo que obtienes',
				steps: 'De la petición al resultado',
				tradeoffs: 'El intercambio',
				roles: 'Los demás',
				cta: 'Empezar'
			}
		},
		hero: {
			eyebrow: 'Usuarios de servicios',
			title: 'Ejecútalo.',
			tagline: 'Paga por lo que use. Nada más.',
			lede: 'Lanza un servicio en un nodo, recibe el resultado y paga por la computación que consumió. No hay cuenta que crear, ni suscripción que cancelar, ni empresa sentada entre tú y la máquina que hizo el trabajo.',
			actions: [
				'Explorar Skills',
				'Cómo funciona'
			],
			stats: [
				{
					value: 'Sin cuenta',
					label: 'nada en lo que registrarse, nada de lo que ser excluido'
				},
				{
					value: 'Por ejecución',
					label: 'pagas por los recursos computacionales realmente usados'
				},
				{
					value: 'Aislado',
					label: 'los servicios se ejecutan sellados y no ven lo que no se les dio'
				}
			]
		},
		scenes: {
			ask: {
				label: 'La idea',
				beats: [
					{
						h: 'Pregúntale a la red, no a una empresa.',
						p: 'Quieres que algo se haga: ejecutar un modelo, analizar una secuencia, operar con un bot, procesar un archivo. Hoy eso significa elegir un proveedor y abrirte una cuenta con él.'
					},
					{
						h: 'Los nodos responden directamente.',
						p: 'Celaut <strong>no tiene registro central de servicios</strong>. Los servicios se distribuyen entre nodos peer-to-peer, y los nodos declaran al contacto las interfaces que soportan y los <strong>métodos de pago que aceptan</strong>, así que no hay que acordar nada con nadie de antemano.'
					},
					{
						h: 'Tratas con la máquina que hace el trabajo.',
						p: 'Tu nodo negocia el coste de ejecución con un par y el trabajo se hace. <strong>No hay ninguna plataforma en medio</strong> llevándose una comisión, fijando las reglas o capaz de expulsarte de una red a la que nunca te uniste.',
						note: 'Sin registro. Sin suscripción. Sin intermediarios.'
					}
				]
			},
			proof: {
				label: 'Ventaja 01',
				beats: [
					{
						h: '¿Cómo sabes qué se ejecutó realmente?',
						p: 'Con un servicio alojado, no puedes. El operador no puede demostrar que el sistema no ha cambiado, así que cuando una herramienta se hace popular nada impide que su rendimiento baje discretamente para ahorrar costes.'
					},
					{
						h: 'Aquí el servicio <em>es</em> su especificación.',
						p: 'Un servicio especifica todo su entorno: arquitectura, sistema de archivos, punto de entrada, configuración. Cambia cualquier cosa y pasa a ser <strong>un servicio distinto</strong>, no una actualización silenciosa del que estabas usando.'
					},
					{
						h: 'Así que el resultado es reproducible.',
						p: 'Con las mismas entradas, un servicio <strong>produce siempre las mismas salidas</strong>, sin importar qué nodo lo ejecute ni cuándo. Eso es lo que hace que un registro de reputación de hace meses siga valiendo algo hoy.',
						note: 'El determinismo es la garantía. No una promesa: el diseño.'
					}
				]
			},
			sealed: {
				label: 'Ventaja 02',
				beats: [
					{
						h: 'Tu petición no es asunto de nadie más.',
						p: 'Cuando envías una carga de trabajo a algún sitio, la pregunta honesta es quién más llega a verla por el camino.'
					},
					{
						h: 'Cada ejecución está aislada.',
						p: 'El nodo ejecuta el servicio como una <strong>instancia aislada</strong>: su propia máquina virtual. Por defecto un servicio está completamente cortado de las redes externas y solo puede hablar con su padre, sus hijos y el nodo que lo ejecuta.'
					},
					{
						h: 'Y el desarrollador no está al otro lado.',
						p: '<strong>Los desarrolladores de servicios no pueden controlar, modificar ni extraer datos de un servicio</strong>, porque no controlan los nodos que lo distribuyen y lo ejecutan. Cualquier acceso de red más amplio tiene que declararse en la especificación, a la vista, antes de que lo ejecutes.',
						note: 'Aislado por defecto. El acceso se solicita, nunca se da por supuesto.'
					}
				]
			},
			pay: {
				label: 'Ventaja 03',
				beats: [
					{
						h: 'Pagas antes de que se ejecute. Punto.',
						p: 'Los usuarios lanzan servicios en los nodos y <strong>pagan por adelantado por una promesa de recursos</strong>. Esa es toda la relación comercial.'
					},
					{
						h: 'Nada se acumula mientras no lo usas.',
						p: 'No hay asientos, ni planes, ni mínimo mensual. El pago se cobra <strong>de antemano</strong> a cambio de los recursos a consumir; la prueba de pago da acceso. El aval del nodo es su reputación, no una factura al final.'
					},
					{
						h: 'Con precio de mercado, no de tarifario.',
						p: 'Los nodos fijan sus propios costes y compiten con ellos, y <strong>los servicios tienen un coste marginal cero</strong> —el coste de ejecutar uno recae en el nodo—, así que muchos empiezan gratis para construir reputación. Los sistemas de pago quedan fuera de la arquitectura central, así que qué ledger lo liquida tampoco está fijado.',
						note: 'Paga por ejecución. Vete cuando quieras. No hay nada que cancelar.'
					}
				]
			}
		},
		payoff: {
			heading: 'Lo que obtienes realmente',
			items: [
				{
					title: 'Ninguna infraestructura que gestionar',
					body: 'De eso se encargan los nodos. No hay proveedor cloud que elegir, ni máquina que mantener viva, ni nada que dejar encendido entre usos.'
				},
				{
					title: 'Ninguna configuración',
					body: 'La especificación del servicio ya cubre cómo se construye el contenedor, la arquitectura que necesita, sus requisitos de red y su interfaz. Nada de eso te toca resolverlo a ti.'
				},
				{
					title: 'El desarrollador no llega hasta ti',
					body: 'Los desarrolladores de servicios no pueden controlar, modificar ni extraer datos de un servicio: no controlan los nodos que lo distribuyen y lo ejecutan.'
				},
				{
					title: 'No puede cambiar a tus espaldas',
					body: 'Un servicio es determinista: las mismas entradas producen las mismas salidas, cuando sea y donde sea que se ejecute. Nadie puede degradarlo en silencio para ahorrar costes.'
				},
				{
					title: 'Juzgado por reputación, no por ranking',
					body: 'La reputación vive como registros en un ledger, y cada participante pondera las fuentes en las que confía. No hay ninguna portada editorial decidiendo qué ves.'
				},
				{
					title: 'Nada de lo que puedan echarte',
					body: 'El descubrimiento es peer-to-peer y sin registro central, así que no hay cuenta que suspender ni ficha que retirar.'
				}
			]
		},
		steps: {
			heading: 'De «necesito esto» a un resultado',
			items: [
				{
					title: 'Encuentra el servicio',
					body: 'Busca por el problema que quieres resolver. Los nodos descubren servicios peer-to-peer, y registros como Unstoppable Skills relacionan problemas con los servicios que los cubren.'
				},
				{
					title: 'Solicita una ejecución',
					body: 'Tu nodo habla directamente con un par que puede ejecutarlo. Las interfaces y los métodos de pago aceptados se declaran al contacto, así que no hay que acordar nada de antemano.'
				},
				{
					title: 'Se ejecuta, sellado',
					body: 'El nodo ejecuta el servicio como una instancia aislada —su propia máquina virtual— sin más acceso que el que pedía la especificación.'
				},
				{
					title: 'Paga por adelantado',
					body: 'A un nodo se le paga de antemano por una promesa de recursos, y la prueba de pago da acceso. La reputación es el aval. Sin suscripción, sin mínimos y sin factura permanente.'
				}
			]
		},
		tradeoffs: {
			heading: 'Frente a las dos opciones que tienes hoy',
			intro: 'Tomemos como ejemplo un bot de trading. Ahora mismo, o le entregas tu cartera a un servicio web, o buscas el código fuente y lo ejecutas tú. Cada opción te da una cosa y te cuesta otra.',
			items: [
				{
					label: 'Usar un servicio web',
					good: 'No ejecutas infraestructura ni configuras nada.',
					bad: 'No puedes atribuirle reputación, porque el operador no puede demostrar que el sistema no ha cambiado, ni asegurarte que no hace mal uso de los datos de tus peticiones.'
				},
				{
					label: 'Ejecutar tú el código fuente',
					good: 'Es determinista, y el desarrollador no tiene ningún control sobre los datos de tus peticiones.',
					bad: 'Necesitas hardware capaz de ejecutarlo y tienes que lidiar con la configuración, que suele ser donde la gente se rinde y vuelve a la primera opción.'
				},
				{
					label: 'Usar un servicio Celaut',
					good: 'Sin infraestructura, sin configuración, y el desarrollador sigue sin poder controlar, modificar ni extraer datos del servicio.',
					bad: 'Pagas por ejecución y dependes de que en la red haya un nodo dispuesto a ejecutarlo a un precio que aceptes.',
					highlight: true
				}
			]
		},
		roles: {
			heading: 'Las otras personas de la red',
			intro: 'Alguien escribió el servicio y la máquina de alguien lo ejecuta. Los dos papeles están abiertos también para ti.',
			items: [
				{
					title: 'Mantenedores de nodos',
					body: 'Aportan el hardware que ejecuta lo que solicitas, a cambio de un pago y sin necesidad de saber qué hace el servicio.',
					link: '¿Tienes hardware de sobra? →'
				},
				{
					title: 'Desarrolladores de servicios',
					body: 'Escriben servicios que puede ejecutar cualquier nodo compatible, y se los entregan a la red en lugar de alojarlos.',
					link: 'Para desarrolladores →'
				},
				{
					title: 'El paradigma',
					body: 'Nodos, servicios, especificación y los sistemas de reputación y pago que permiten cooperar a partes que no confían entre sí.',
					link: 'Lee el artículo →'
				}
			]
		},
		cta: {
			heading: 'Empieza por el problema que tienes.',
			body: 'Unstoppable Skills es un registro completamente on-chain y sin servidores donde los protagonistas son los propios problemas. Busca una habilidad y encuentra los servicios que la cubren, benchmarks comparativos reales, discusión y ranking basado en reputación.',
			actions: [
				'Explorar Skills',
				'Mejor alquila tu PC'
			]
		}
	},
	install: {
		meta: {
			title: 'Instalar Nodo — Celaut',
			description: 'Instala un nodo Celaut (nodo) en Linux, Windows o macOS.'
		},
		topbarTitle: 'Instalar nodo',
		heading: 'Levanta un nodo Celaut',
		subtitle: 'Instala <strong>nodo</strong> y únete a la red descentralizada: descubre pares, ejecuta y orquesta servicios y convierte tu máquina en computación compartida y resistente a la censura.',
		tabs: {
			linux: 'Linux',
			windows: 'Windows',
			mac: 'macOS'
		},
		copy: 'Copiar',
		copied: 'Copiado ✓',
		linux: {
			heading: 'Linux',
			intro: 'Instalación básica: ejecuta esto en tu terminal.',
			notes: [
				'El script necesita <code>sudo</code> para la configuración a nivel de sistema. Los runtimes de Python, Java y <code>yq</code> se instalan localmente dentro del directorio principal del nodo.',
				'¿Prefieres una instalación manual y sin sudo? Sigue la {link}.'
			],
			manualLink: 'guía manual'
		},
		windows: {
			heading: 'Windows 11',
			intro: 'Descarga y ejecuta el instalador oficial:',
			download: 'Descargar Nodo-Setup.exe',
			notes: [
				'El instalador crea automáticamente una distribución de Linux aislada y dedicada a Nodo, de modo que el nodo se ejecuta separado del resto de tu sistema.',
				'No hace falta preparar a mano ningún entorno Linux.'
			]
		},
		mac: {
			heading: 'macOS',
			intro: 'Todavía <strong>no hay un instalador nativo</strong> para macOS.',
			notes: [
				'El soporte para macOS está previsto. Mientras tanto, puedes ejecutar un nodo en una máquina Linux o en una VM Linux.',
				'Sigue {link} para estar al tanto.'
			],
			repoLink: 'el repositorio de nodo'
		}
	},
	paradigm: {
		meta: {
			title: 'Celaut — Artículo formal',
			description: 'Celaut: una arquitectura peer-to-peer para el diseño y la distribución de software. El artículo formal.'
		},
		topbarTitle: 'Artículo formal',
		toc: 'Índice',
		tocNav: 'Tabla de contenidos',
		systemBehaviorHeading: 'Comportamiento del sistema',
		executionHeading: 'Ejecución de un servicio',
		balancerHeading: 'Balanceo de carga de servicios'
	},
	viz: {
		home: {
			generation: 'generación {n}',
			lifeRule: '2 o 3 vecinas: vive · exactamente 3: nace',
			oneProtocol: 'un protocolo que todos deben ejecutar',
			networkSplits: 'cambia las reglas y la red se parte',
			whereOverlap: 'hablan donde coinciden',
			noVote: 'sin voto · sin migración · sin fork',
			blackBox: 'caja negra',
			input: 'entrada',
			output: 'salida',
			box: 'BOX',
			environment: 'entorno',
			api: 'API',
			interface: 'interfaz',
			nets: [
				'bitcoin-mainnet',
				'ipfs',
				'nostr',
				'google.com',
				'family-photos.lan',
				'api.weather.gov',
				'pg-cluster-a'
			],
			netsCompact: [
				'bitcoin',
				'ipfs',
				'google.com',
				'family-photos',
				'nostr',
				'weather-api'
			],
			zoom: {
				source: 'celaut.proto · message Service',
				box: {
					title: 'BOX · Container',
					rows: [
						'architecture — la CPU y el entorno que necesita',
						'filesystem — cada fichero, incluido, no un nombre de imagen',
						'init — el entrypoint y cómo arranca',
						'config_declaration — qué ficheros son configuración',
						'resources — at_init y at_most',
						'environment_variables — declaradas, con sus formatos'
					]
				},
				api: {
					title: 'API · Interfaz',
					rows: [
						'slot — un puerto y el transporte que habla',
						'protocol_stack — los protocolos de ese slot',
						'mu_per_call — el precio de cada método',
						'payment_contracts — los ledgers que acepta',
						'un coste fijo al arrancar y luego coste por uso'
					]
				},
				net: {
					title: 'NET · Network',
					rows: [
						'una entrada por cada dominio de comunicación al que puede llegar',
						'tags / prose / formal — cómo se nombra el dominio',
						'protocol_stack — qué deben hablar esos pares',
						'environment_variable — qué pares cuentan como suyos',
						'no declarar nada aquí es no tener salida alguna'
					]
				}
			},
			net: 'NET',
			netDeclared: 'NET · declarada en la spec',
			nowhereElse: 'y a ningún otro sitio',
			itsNodeItsParent: 'su nodo · su padre',
			aService: 'un servicio',
			children: 'hijos',
			whatTheySpend: 'qué gastan, no dónde están',
			developersShort: 'desarrolladores · qué necesita',
			developersLong: 'desarrolladores · qué necesita y qué gasta',
			operatorsShort: 'operadores · dónde se ejecuta',
			operatorsLong: 'operadores · dónde se ejecuta y qué cuesta',
			thisNode: 'este nodo',
			aPeer: 'un par',
			cost: 'coste {value}',
			oneInput: 'una entrada',
			when: [
				'ahora',
				'dentro de un año',
				'en otro hardware'
			],
			identicalEveryTime: 'idéntica, siempre',
			reputationLedger: 'reputación · registros en un ledger',
			sourcesYouTrust: 'las fuentes en las que confías',
			principles: {
				consequences: [
					'→ ningún protocolo que acordar',
					'→ un contenedor, una interfaz, un alcance',
					'→ reputación que conserva su sentido'
				],
				derivedFrom: 'todo lo demás se deriva'
			},
			firstWhatSources: 'primero: ¿qué dicen mis fuentes de él?',
			rightShort: '2 vCPU · 30 min',
			rightLong: 'derecho a 2 vCPU · 30 min',
			paymentRights: 'pago ⇄ derechos de recursos',
			outcomeRecorded: 'el resultado queda en su historial',
			nextStranger: 'y eso es lo que leerá el siguiente desconocido',
			requester: 'solicitante',
			node: 'nodo'
		},
		developers: {
			box: 'BOX',
			api: 'API',
			net: 'NET',
			service: 'servicio',
			anyCompatibleNode: 'cualquier nodo compatible',
			optionalRegistry: 'registro de reputación opcional',
			yourService: 'tu servicio',
			itsNode: 'su nodo',
			neverFindOut: 'nunca sabrás dónde'
		},
		users: {
			you: 'tú',
			noAccount: 'sin cuenta',
			eachPeerItsUnit: 'cada nodo cotiza en lo que acepta',
			whatYouAsked: 'lo que pediste',
			whatNodeRuns: 'lo que ejecuta el nodo',
			identicalItRuns: 'idéntico — se ejecuta',
			microvm: 'microVM',
			destroyed: 'destruida',
			theDeveloper: 'el desarrollador',
			theHostMachine: 'la máquina anfitriona',
			computeUsed: 'computación que usaste',
			whatYouPay: 'lo que pagas',
			chargingStops: 'acaba el trabajo — deja de cobrar',
			subscription: 'una suscripción, cobrando igualmente'
		},
		depin: {
			electricityCost: 'tu coste eléctrico',
			priceYouSet: 'el precio que fijas',
			availableWindow: 'disponible 22:00 – 07:00',
			marginCovered: 'margen cubierto'
		}
	}
};

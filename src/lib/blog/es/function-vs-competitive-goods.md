# Bienes de función y bienes competitivos: por qué la abundancia no basta para eliminar la desigualdad

## Planteamiento

Se oye a menudo que, cuando la IA sea lo bastante capaz, el software y cualquier servicio automatizable serán prácticamente gratis, y que eso acabará con buena parte de la desigualdad económica. Creo que eso vale para algunos bienes y no para otros, y que la línea que los separa se puede trazar.

Lo que los separa es cómo se mide su éxito. Hay dos maneras:

- contra un **umbral fijo**: ¿funciona?
- contra **los demás participantes**: ¿es mejor que el del rival?

Casi ningún bien es puramente de un tipo; lo normal es una mezcla. Para saber dónde cae uno sirve esta pregunta: si todos mis rivales consiguieran la misma mejora que yo, ¿cuánto valor me quedaría? En un bien de función, casi todo. En uno competitivo, casi nada. Llamo *valor posicional* a la parte que se pierde: la que solo existe mientras yo esté por delante de los demás.

La hipótesis es que, con IA abundante, el precio de los bienes de función tiende a caer hasta lo que cuesta producirlos, y el de los competitivos no, porque en estos lo que se paga es la ventaja sobre el resto.

La distinción no es nueva. Fred Hirsch llamó *bienes posicionales* a los que valen según la posición relativa (1976). Lazear y Rosen estudiaron las competiciones en las que el premio se reparte por puesto y no por producción, a las que llamaron torneos (1981). Frank y Cook describieron cómo se extienden por toda la economía los mercados en los que pequeñas diferencias de capacidad traen diferencias enormes de recompensa (1995). Lo que añadimos es aplicarlo al cómputo de la IA, y dos curvas que dicen cuándo la abundancia iguala el terreno y cuándo no.

## Bienes de función

Son los que solo tienen que cumplir su cometido: un formulario de reservas, una herramienta interna de inventario, un trámite administrativo, el programa de contabilidad de una asociación, un script que ordena archivos.

O funcionan o no. La reserva queda registrada o no queda, y una vez que funciona, mejorarla aporta poco: una aplicación de reservas el doble de buena no trae el doble de clientes, porque eso depende de cuánta gente quiera cenar allí.

De ahí salen tres cosas:

1. **Sirve cualquier solución que funcione.** Nadie paga más por una versión mejor si la que tiene ya cumple.
2. **Hacer otra a medida cuesta poco más que la inferencia (el coste de usar el modelo ya entrenado para producir cada resultado).** Quedan la integración con otros sistemas, el mantenimiento y alguien que responda cuando algo falla, pero el trabajo de desarrollo, que hoy es la mayor parte del precio, es justo lo que más se abarata.
3. **Cobrar mucho más que eso es difícil**, porque el cliente puede encargar una alternativa por poco dinero.

Aquí la abundancia cumple lo que promete. Lo que hoy cuesta decenas de miles de euros de desarrollo queda al alcance de casi cualquiera, y el ahorro se lo quedan quienes antes eran clientes.

Eso sí, el precio no llegará al coste pelado de la inferencia. Quedan cosas que el cómputo no produce: alguien que responda de la herramienta cuando falle, que guarde bien los datos y que cumpla la normativa del sector, y lo que cuesta pasar de una herramienta a otra. Lo más probable es que el precio caiga hasta el coste de producir más el coste de la confianza. Y puede que el precio ni siquiera sea el cambio más grande. Jevons vio en 1865 que las máquinas de vapor más eficientes no ahorraban carbón: Gran Bretaña quemaba más, porque el carbón pasaba a merecer la pena para más cosas. Si los bienes de función se abaratan, se harán muchísimos más, para gente y problemas que nunca habrían podido pagar uno.

Ahora bien, hay menos bienes de función puros de lo que parece. La web de un restaurante enseña la carta y acepta reservas, pero también compite con las de otros restaurantes por la atención de quien está decidiendo dónde cenar. Lo primero se abarata; lo segundo, no. La mayoría de los bienes reales mezclan las dos cosas, y lo que interesa saber de cada uno es qué parte de su valor depende de la posición.

### Encontrarlos

Hasta un bien de función puro hay que encontrarlo. Si cualquiera puede encargar una herramienta de reservas por muy poco, habrá miles, y quien necesite una no las va a comparar todas. Se quedará con lo que le enseñe primero la tienda de aplicaciones, el buscador o el *marketplace*.

Esos intermediarios son de los mercados donde más claramente el ganador se lo lleva todo: el que tiene más usuarios atrae a más proveedores, y el que tiene más proveedores atrae a más usuarios. Así que el bien puede volverse casi gratis mientras la renta se va a quien controla el escaparate. Ahí es donde se concentra la parte funcional, y no en fabricar el bien.

## Bienes competitivos

Son los que compiten contra los de otros y valen lo que valgan frente a ellos: un robot de trading, un sistema de precios dinámicos, un algoritmo de puja publicitaria (el que decide cuánto pagar por cada anuncio), un detector de fraude, un motor logístico, una herramienta de descubrimiento de fármacos.

Aquí no hay umbral que alcanzar, porque la referencia es lo que hacen los demás. Un robot de trading es bueno frente a los que tiene al otro lado de la operación, y deja de serlo en cuanto aparece uno mejor.

Pienso en alguien que le pide a una IA «hazme un robot de trading para ganar dinero» y gasta 200 $ en cómputo. Su robot va a operar contra los de quienes gastaron 10 $ y contra los de quienes gastaron 20.000 $. Que funcione se da por hecho; lo que importa es en qué puesto de esa distribución acaba.

### De dónde sale la ventaja

El cómputo es una de las cosas que deciden ese puesto. En trading también cuentan la latencia (el retraso con que llega cada orden al mercado) y estar físicamente cerca de la bolsa; en detección de fraude, años de datos de transacciones propios; en logística, la flota y los almacenes; en fármacos, el acceso regulatorio y los ensayos clínicos; y en casi todos, la distribución y la marca.

La mayoría de estos factores refuerzan la concentración, porque suelen estar en las mismas manos que el cómputo y se alimentan entre sí: con más datos el modelo mejora, un modelo mejor atrae clientes y los clientes generan más datos. Unos pocos juegan a favor de los pequeños: datos de un nicho, relaciones locales, conocer a fondo un dominio. Abaratar los modelos no hace desaparecer ninguna de estas ventajas, y en algunos mercados las deja como lo único que distingue a un competidor de otro.

### Suma cero y suma positiva

Hay competencias en las que lo que gana uno lo pierde otro, y otras en las que, además, se produce algo.

- **Suma cero o casi.** Es el caso del trading especulativo o de las pujas publicitarias. Aquí aparece el **efecto Reina Roja**: todos gastan cada vez más y las posiciones apenas se mueven. (El nombre viene de la biología: Van Valen lo usó en 1973 para las especies que tienen que seguir evolucionando solo para quedarse donde están.) Y el excedente se **disipa**: el cómputo que gastan entre todos solo cambia de manos rentas que ya existían, y por el camino consume energía y silicio.
- **Suma positiva.** En el descubrimiento de fármacos, la detección de fraude o la logística, la competencia deja algo detrás: un tratamiento, menos fraude, envíos más baratos. Parte del gasto se pierde porque varios rivales hacen el mismo trabajo, pero el saldo para la sociedad puede ser positivo aunque la carrera salga cara.

En los dos casos puede crecer la desigualdad, pero el despilfarro es sobre todo cosa del primero.

## Las dos curvas

Todo lo anterior depende de dos relaciones que se pueden medir:

> **Curva 1: cuánta calidad se obtiene con cada unidad más de cómputo.**
>
> **Curva 2: cuánta cuota de mercado o beneficio se obtiene con cada unidad más de calidad.**

La curva 1 puede aplanarse pronto, y entonces gastar cien veces más da un resultado apenas mejor y el robot de 200 $ queda cerca del de 20.000 $. O puede seguir subiendo: cada vez que el cómputo se multiplica por diez, la calidad mejora de forma apreciable.

Un ejemplo, con números inventados que solo sirven para ver la forma. Tomemos los robots de trading de antes y puntuémoslos de 0 a 100.

- Si la curva 1 se aplana, el robot de 200 $ saca unos 85 puntos y el de 20.000 $ unos 91. Cien veces más gasto compra seis puntos, y quién gana lo decide lo demás: datos, latencia, distribución.
- Si la curva 1 sigue subiendo, pongamos doce puntos por cada vez que el cómputo se multiplica por diez, el robot de 200 $ saca unos 56 y el de 20.000 $ unos 80. La distancia es de 24 puntos, y cada vez que el gasto vuelve a multiplicarse por diez se abre más.

<figure class="chart">
<svg viewBox="0 0 480 300" role="img" aria-labelledby="curve1-title curve1-desc">
<title id="curve1-title">Curva 1: dos formas posibles</title>
<desc id="curve1-desc">Esbozo ilustrativo, no son datos. Calidad frente a cómputo gastado, en escala logarítmica. Si la curva se aplana, un robot de 200 $ saca unos 85 puntos y uno de 20.000 $ unos 91. Si sigue subiendo, sacan unos 56 y 80.</desc>
<line class="grid" x1="56" y1="135.0" x2="464" y2="135.0"/>
<line class="grid" x1="56" y1="20.0" x2="464" y2="20.0"/>
<line class="guide" x1="243.8" y1="20" x2="243.8" y2="250"/>
<line class="guide" x1="407.0" y1="20" x2="407.0" y2="250"/>
<line class="axis" x1="56" y1="250" x2="464" y2="250"/>
<line class="axis" x1="56" y1="20" x2="56" y2="250"/>
<text class="tick" x="48" y="255.0" text-anchor="end">0</text>
<text class="tick" x="48" y="140.0" text-anchor="end">50</text>
<text class="tick" x="48" y="25.0" text-anchor="end">100</text>
<text class="tick" x="137.6" y="270" text-anchor="middle">10 $</text>
<text class="tick" x="243.8" y="270" text-anchor="middle">200 $</text>
<text class="tick" x="407.0" y="270" text-anchor="middle">20.000 $</text>
<text class="axis-label" x="260" y="294" text-anchor="middle">Cómputo gastado (escala logarítmica)</text>
<text class="axis-label" transform="translate(21 135) rotate(-90)" text-anchor="middle">Calidad</text>
<path class="curve flat" d="M56.0 188.2 L60.1 184.8 L64.2 181.4 L68.2 177.8 L72.3 174.1 L76.4 170.4 L80.5 166.6 L84.6 162.7 L88.6 158.8 L92.7 154.9 L96.8 150.9 L100.9 146.9 L105.0 142.9 L109.0 138.9 L113.1 134.9 L117.2 131.0 L121.3 127.0 L125.4 123.2 L129.4 119.4 L133.5 115.7 L137.6 112.0 L141.7 108.5 L145.8 105.0 L149.8 101.7 L153.9 98.4 L158.0 95.3 L162.1 92.3 L166.2 89.3 L170.2 86.5 L174.3 83.9 L178.4 81.3 L182.5 78.9 L186.6 76.5 L190.6 74.3 L194.7 72.2 L198.8 70.2 L202.9 68.3 L207.0 66.5 L211.0 64.9 L215.1 63.3 L219.2 61.8 L223.3 60.4 L227.4 59.0 L231.4 57.8 L235.5 56.6 L239.6 55.6 L243.7 54.5 L247.8 53.6 L251.8 52.7 L255.9 51.8 L260.0 51.1 L264.1 50.3 L268.2 49.7 L272.2 49.0 L276.3 48.4 L280.4 47.9 L284.5 47.4 L288.6 46.9 L292.6 46.5 L296.7 46.0 L300.8 45.7 L304.9 45.3 L309.0 45.0 L313.0 44.7 L317.1 44.4 L321.2 44.1 L325.3 43.9 L329.4 43.6 L333.4 43.4 L337.5 43.2 L341.6 43.0 L345.7 42.9 L349.8 42.7 L353.8 42.6 L357.9 42.4 L362.0 42.3 L366.1 42.2 L370.2 42.1 L374.2 42.0 L378.3 41.9 L382.4 41.8 L386.5 41.7 L390.6 41.6 L394.6 41.6 L398.7 41.5 L402.8 41.4 L406.9 41.4 L411.0 41.3 L415.0 41.3 L419.1 41.3 L423.2 41.2 L427.3 41.2 L431.4 41.1 L435.4 41.1 L439.5 41.1 L443.6 41.0 L447.7 41.0 L451.8 41.0 L455.8 41.0 L459.9 41.0 L464.0 40.9"/>
<path class="curve rise" d="M56.0 185.6 L60.1 184.2 L64.2 182.8 L68.2 181.5 L72.3 180.1 L76.4 178.7 L80.5 177.3 L84.6 175.9 L88.6 174.6 L92.7 173.2 L96.8 171.8 L100.9 170.4 L105.0 169.0 L109.0 167.7 L113.1 166.3 L117.2 164.9 L121.3 163.5 L125.4 162.1 L129.4 160.8 L133.5 159.4 L137.6 158.0 L141.7 156.6 L145.8 155.2 L149.8 153.9 L153.9 152.5 L158.0 151.1 L162.1 149.7 L166.2 148.3 L170.2 147.0 L174.3 145.6 L178.4 144.2 L182.5 142.8 L186.6 141.4 L190.6 140.1 L194.7 138.7 L198.8 137.3 L202.9 135.9 L207.0 134.5 L211.0 133.2 L215.1 131.8 L219.2 130.4 L223.3 129.0 L227.4 127.6 L231.4 126.3 L235.5 124.9 L239.6 123.5 L243.7 122.1 L247.8 120.7 L251.8 119.4 L255.9 118.0 L260.0 116.6 L264.1 115.2 L268.2 113.8 L272.2 112.5 L276.3 111.1 L280.4 109.7 L284.5 108.3 L288.6 106.9 L292.6 105.6 L296.7 104.2 L300.8 102.8 L304.9 101.4 L309.0 100.0 L313.0 98.7 L317.1 97.3 L321.2 95.9 L325.3 94.5 L329.4 93.1 L333.4 91.8 L337.5 90.4 L341.6 89.0 L345.7 87.6 L349.8 86.2 L353.8 84.9 L357.9 83.5 L362.0 82.1 L366.1 80.7 L370.2 79.3 L374.2 78.0 L378.3 76.6 L382.4 75.2 L386.5 73.8 L390.6 72.4 L394.6 71.1 L398.7 69.7 L402.8 68.3 L406.9 66.9 L411.0 65.5 L415.0 64.2 L419.1 62.8 L423.2 61.4 L427.3 60.0 L431.4 58.6 L435.4 57.3 L439.5 55.9 L443.6 54.5 L447.7 53.1 L451.8 51.7 L455.8 50.4 L459.9 49.0 L464.0 47.6"/>
<circle class="dot flat" cx="243.8" cy="54.5" r="5"/>
<circle class="dot rise" cx="243.8" cy="122.1" r="5"/>
<circle class="dot flat" cx="407.0" cy="41.4" r="5"/>
<circle class="dot rise" cx="407.0" cy="66.9" r="5"/>
<text class="value" x="234.8" y="45.5" text-anchor="end">85</text>
<text class="value" x="398.0" y="32.4" text-anchor="end">91</text>
<text class="value" x="253.8" y="142.1">56</text>
<text class="value" x="417.0" y="86.9">80</text>
<text class="series flat" x="309.0" y="33.0" text-anchor="middle">Se aplana</text>
<text class="series rise" x="323.1" y="131.3">Sigue subiendo</text>
</svg>
<figcaption>Curva 1, dos formas posibles. Un esbozo ilustrativo con números inventados, no son datos.</figcaption>
</figure>

La curva 2 depende de cómo sea el mercado. Donde el ganador se lo lleva casi todo (las búsquedas, las plataformas con efectos de red, el precio más bajo en un mercado transparente), una ventaja pequeña basta para concentrarlo. Donde el mercado está repartido por geografía, por nichos o por gustos, ser mejor da algo más de cuota, pero poca. En el ejemplo, quedarse seis puntos por detrás cuesta unos cuantos clientes en un mercado repartido, y puede costar el mercado entero donde el ganador se lo lleva casi todo.

Cruzando las dos sale esta tabla:

| | **Mercado repartido** | **El ganador se lo lleva casi todo** |
| :--- | :--- | :--- |
| **La curva 1 se aplana** | Competencia abierta. Los bienes competitivos se comportan casi como los de función. | Concentración debida a datos, distribución o marca. |
| **La curva 1 sigue subiendo** | El capital da ventaja, pero caben varios actores grandes. | Concentración fuerte: quien más gasta más gana, y quien más gana más puede gastar. |

La imagen de una espiral hacia el **control centralizado**, eso que se ha llamado **tecnofeudalismo** (un poder concentrado en pocas plataformas que cobran a los demás por usarlas), corresponde a la casilla de abajo a la derecha. La de arriba a la izquierda lleva a una **competencia descentralizada**, y las otras dos quedan en medio. Lo más probable es que cada sector acabe en una casilla diferente.

Esto quiere decir que el reparto del poder puede depender mucho de hechos técnicos y de cómo esté organizado cada mercado, además de las decisiones políticas. En un sector donde la curva 1 sigue subiendo y el ganador se lo lleva todo, regular el acceso a los modelos sirve de poco, porque lo escaso son otras cosas. Donde la política sí puede actuar es sobre la curva 2, que se deja mover más: portabilidad de datos, interoperabilidad, defensa de la competencia.

## ¿Y si el cómputo sigue abaratándose?

El precio del cómputo lleva décadas bajando, y eso puede tener dos efectos opuestos.

- **Igualar.** Si el punto en que la curva 1 se aplana queda pronto al alcance de cualquiera, la ventaja que hoy compra quien gasta 20.000 $ la tendrá mañana quien gaste 200 $.
- **Reina Roja.** Si la curva no se aplana, el abaratamiento solo sube las pujas: todos compran más con el mismo dinero y cada uno sigue en su puesto.

Cuál de los dos pesa más vuelve a depender de la forma de la curva 1, así que el precio del cómputo, por sí solo, no decide nada.

## Dos efectos de segundo orden

**1. Lo funcional acaba siendo competitivo.** Cuando un bien de función pasa a ser gratis y lo tienen todos, ya no sirve para distinguirse, y la competencia se va a otra parte. Un restaurante que hoy destaca por tener una web decente no destacará por eso mañana; competirá en precios dinámicos, en cómo hace las compras o en su reputación. Cada vez que el precio de algo funcional se hunde, la competencia se muda al siguiente terreno que todavía no está saturado.

**2. La desigualdad pasa a ser de posición más que de recursos.** Puede salir un mundo en el que casi todos tengan cubiertas sus necesidades funcionales a muy bajo coste y en el que, a la vez, la competencia por los puestos sea más dura y más cara que nunca. Contra este tipo de desigualdad hay un límite que no depende de ningún dato: si se da lo mismo a todos, las posiciones relativas no cambian. Una renta básica universal funciona contra la escasez, pero si todos reciben lo mismo, todos pueden gastar lo mismo en cómputo y cada uno sigue en el mismo lugar de la distribución. Quizá entre más gente en la competición, pero ganarán los mismos.

## Objeciones

Las dos objeciones más serias que conozco son estas.

**Un optimista tecnológico** diría que la IA abarata también todo lo demás: generar datos sintéticos, conseguir distribución, crear una marca. Y que cada mercado que se satura abre otros, con nichos donde un actor pequeño puede ganar. Puede pasar, y sería el escenario de la casilla de arriba a la izquierda. Pero eso se sigue de la forma de las dos curvas, y no de lo capaz que sea la IA. Además, hay factores que el software no abarata: la latencia, la infraestructura física, el acceso regulatorio.

**Un escéptico de la concentración** recordaría que las ventajas tecnológicas siempre han acabado erosionándose: los monopolios se debilitan, los rivales copian, las autoridades de competencia intervienen, y la historia está llena de líderes desbancados. También puede pasar, y empujaría hacia las casillas de la izquierda. Pero esa erosión funcionaba porque copiar salía más barato que innovar. Si la ventaja está en el cómputo y los datos acumulados, copiar puede costar lo mismo que competir. No lo sé, y para comprobarlo están los indicadores de la sección siguiente.

## Cómo saber hacia dónde va esto

La hipótesis se puede poner a prueba. Para saber en qué casilla está cada sector, habría que seguir estos datos:

- **Márgenes del software a medida y de la gestión estandarizada.** Si bajan de forma sostenida, los bienes de función se comportan como predice la hipótesis.
- **Concentración del gasto en cómputo:** qué parte del gasto mundial en entrenamiento e inferencia hacen los mayores compradores, y cómo cambia con el tiempo.
- **Rendimiento marginal en pruebas comparativas (benchmarks):** cuánto mejora el resultado al doblar el cómputo en tareas donde un sistema se enfrenta a otros. Es una medida directa de la curva 1.
- **Relación entre gasto (en cómputo e I+D) y cuota de mercado.** Si la cuota sigue de cerca al gasto, la curva 2 es empinada.
- **Rotación de líderes:** cada cuánto cambian los primeros puestos en los sectores que más usan IA.

## Resumen

| | **Función** | **Competitivo, suma positiva** | **Competitivo, suma cero** |
| :--- | :--- | :--- | :--- |
| **Criterio de éxito** | ¿Funciona? | Mejor que el rival, y además crea valor | Mejor que el rival |
| **¿Satura?** | Sí, al llegar al umbral | Según la curva 1 | Según la curva 1 |
| **Coste** | Se acerca al de inferencia e integración | Gasto creciente, en parte productivo | Gasto creciente, en gran parte perdido |
| **Fuentes de ventaja** | Casi ninguna una vez cruzado el umbral | Cómputo, datos, infraestructura, acceso regulatorio | Cómputo, latencia, datos, distribución |
| **Quién se queda el excedente** | Los usuarios | Usuarios y ganadores | Quien gana la carrera |
| **Desigualdad** | Tiende a bajar | Según la curva 2 | Tiende a reproducirse |
| **Hacia dónde va el poder** | Descentralización | Según la casilla | Centralización, si la curva 1 sigue subiendo |

## Conclusión

Con IA avanzada conviven dos lógicas, a menudo dentro de un mismo bien.

En la parte funcional, la abundancia cumple: el precio cae hacia el coste de producir y gastar de más no da ventaja. Para esa parte del consumo, la post-escasez es real.

En la parte competitiva eso no ocurre solo. Al medirse contra los demás no hay techo, y el cómputo se suma a los datos, la infraestructura y la distribución como fuente de ventaja. Si eso reproduce la desigualdad, y cuánto, depende de dos curvas que hoy entiendo mal y que pueden ser distintas en cada sector.

El error más común es tomar una de las dos lógicas por el todo. Quien mira la primera anuncia el fin de la escasez; quien mira la segunda, un feudalismo definitivo. Cada uno tiene razón en su parte.

Lo funcional parece tener el camino bastante claro. Lo que está por decidir es cómo se reparten el cómputo y los demás factores de los que viven los bienes competitivos, y qué forma tienen las dos curvas en cada sector.

## Dónde entra Celaut

Celaut es mi proyecto, así que lo que sigue es cómo lo veo encajar en este argumento, con el sesgo que eso supone.

Celaut es una arquitectura *peer-to-peer* para diseñar y distribuir software: servicios reproducibles que cualquier nodo puede ejecutar, anunciar o pagar, sin autoridad central. Se cruza con lo anterior en cuatro sitios.

**1. Distribuye la parte funcional, y la manera de encontrarla.** Un servicio es una unidad reproducible y direccionable por contenido, y una vez publicado cualquier nodo puede ejecutarlo. Pero, como he visto, ejecutarlo es lo fácil; la concentración está en encontrarlo. El Celaut Registry está en la cadena y no tiene dueño, y permite buscar por el problema que se quiere resolver, en vez de por proveedor, con *benchmarks* y reputación. Sigue habiendo una clasificación, y un servicio con buen historial se verá más que uno nuevo, pero ese puesto se gana con mediciones y el escaparate no es de nadie. Si lo único que importa es que algo funcione, basta con encontrarlo y ejecutarlo.

**2. Es un mercado de cómputo.** Cualquiera puede [alquilar su equipo](/depin) cuando no lo usa, al precio que le salga a cuenta según lo que pague de luz; los nodos negocian entre ellos y liquidan en Ergo o en Bitcoin. Un mercado abierto, en el que se entra sin pedir permiso, reduce que todo pase por unos pocos proveedores, y alquilar capacidad por ráfagas deja a un actor pequeño competir sin tener máquinas propias. Celaut actúa sobre el cómputo y sobre nada más: no da datos propietarios, ni latencia, ni distribución.

**3. Game of Prompts sirve para medir la curva 1.** En esta plataforma, hecha con servicios Celaut, unos diseñan servicios-juego que puntúan a los robots y otros escriben servicios-solucionador que intentan sacar la máxima puntuación; resultados y premios quedan registrados en Ergo. Es un caso competitivo y medible: se puede ver cuánto sube un solucionador en la clasificación cuando se le da más cómputo, que es uno de los indicadores de arriba.

Eso sí, un juego es cerrado: sus reglas no cambian mientras dura, y el mercado simulado de un juego de trading no reacciona a los robots. Los mercados competitivos reales sí, y una ventaja se desgasta en cuanto los demás la copian. Game of Prompts podría medir también eso, la propia Reina Roja: volviendo a ejecutar los solucionadores ganadores de juegos anteriores contra los más nuevos (son servicios direccionables por contenido, así que se ejecutan exactamente igual que entonces), o con juegos cuyos rivales sean los mejores solucionadores ya enviados. Lo rápido que cae un antiguo ganador en la clasificación diría lo rápido que se gasta una ventaja.

**4. La reputación pesa más en lo competitivo.** Si un bien es funcional, uno mismo comprueba si funciona. Si es competitivo, saber si un servicio es mejor que otro exige mediciones comparables y un historial difícil de falsificar. Celaut tiene una capa de reputación en la que hacer spam cuesta algo. Es una pieza del problema, nada más.

### Lo que Celaut no resuelve

Celaut no cambia la forma de ninguna de las dos curvas. Si la curva 1 sigue subiendo y el mercado premia al ganador, quien tenga más capital comprará más cómputo, también en un mercado abierto. Tampoco gana en precio a los grandes proveedores: el cómputo de consumo masivo tiene fuertes economías de escala, y a un *hyperscaler* una unidad de cómputo le puede costar menos de lo que un PC de casa gasta solo en luz para hacer el mismo trabajo. Donde un mercado abierto entre pares tiene hueco es en la capacidad por ráfagas, la inferencia cerca del usuario y los nichos que no atienden los grandes, no en competir en la frontera. Tampoco toca la desigualdad posicional. Lo que puede hacer es empujar hacia la descentralización en lo que le corresponde: que la infraestructura de cómputo no tenga dueño, que la parte funcional de los bienes circule como bien común, que encontrarla no dependa de un solo escaparate y que para competir no haga falta pedir permiso.

Si el resultado depende en buena parte de cómo se reparta el cómputo, montar una red abierta donde se ofrece, se paga y se verifica entre pares es apostar por una de las casillas de la tabla.

## Para seguir leyendo

- El [paradigma de Celaut](/paradigm), con la especificación formal.
- [Alquila tu PC](/depin), para el lado de la oferta de cómputo.
- Fred Hirsch, *Social Limits to Growth*, Harvard University Press, 1976, de donde viene la idea de bien posicional.
- Edward P. Lazear y Sherwin Rosen, «[Rank-Order Tournaments as Optimum Labor Contracts](https://doi.org/10.1086/261010)», *Journal of Political Economy* 89(5), 1981, para la teoría de torneos.
- Robert H. Frank y Philip J. Cook, *The Winner-Take-All Society*, Free Press, 1995.
- Leigh Van Valen, «[A New Evolutionary Law](https://www.mn.uio.no/cees/english/services/van-valen/evolutionary-theory/volume-1/)», *Evolutionary Theory* 1, 1973, para la Reina Roja.
- William Stanley Jevons, *The Coal Question*, Macmillan, 1865, para por qué abaratar suele traer más consumo.

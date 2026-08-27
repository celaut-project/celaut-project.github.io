# *Celaut*: una arquitectura peer-to-peer para el diseño y la distribución de software

<br>

**Contexto**

En los años cuarenta, el matemático John von Neumann, en colaboración con Stanislaw Ulam, introdujo el concepto de autómata celular y creó modelos que demostraban cómo pueden emerger comportamientos complejos a partir de reglas simples. Sobre esa base, en 1970 John Horton Conway presentó «el juego de la vida», un autómata celular que se convirtió en el ejemplo clásico de cómo un sistema puede evolucionar hacia patrones intrincados a partir de interacciones básicas. Estas ideas aportan una perspectiva valiosa sobre cómo los sistemas descentralizados pueden alcanzar complejidad sin control central, y sirven de filosofía guía para el diseño de *Celaut*.

**Definición**

*Celaut* es un conjunto de reglas simples para el diseño y la distribución de software, cuyo objetivo es crear un sistema robusto, escalable y adaptativo a través de los principios de **descentralización**, **simplicidad** y **determinismo**.

**Principios**

1. **Descentralización**: ningún punto único de control o de fallo, lo que permite a los nodos comunicarse y coordinarse dinámicamente.
2. **Simplicidad**: reglas minimalistas que reducen la complejidad y garantizan que cada componente pueda entenderse y mantenerse con facilidad.
3. **Determinismo**: los servicios se comportan de forma predecible, siguiendo reglas definidas que aseguran la reproducibilidad de los resultados entre nodos distintos.

**Arquitectura de *Celaut*: nodos y servicios**

La arquitectura de *Celaut* se construye alrededor de dos elementos centrales: los **nodos** y los **servicios**. Juntos crean una red distribuida en la que cada parte contribuye a la funcionalidad del conjunto, igual que los agentes de un autómata celular.

- **Nodos**:
    Un nodo representa un ordenador o dispositivo dentro de la red *Celaut* capaz de comunicarse con otros nodos y de gestionar la ejecución de servicios. La naturaleza descentralizada de *Celaut* se encarna en la forma en que los nodos interactúan, sin que exista un punto único de fallo ni control centralizado. Las responsabilidades clave de un nodo son:

    1. **Ejecución de servicios**: los nodos gestionan las instancias de servicio y deciden si ejecutarlas localmente o repartir la carga entre nodos pares. Así se consigue un uso óptimo de los recursos y del rendimiento, de forma parecida a como las células de un autómata celular interactúan con sus vecinas para mantener el equilibrio del sistema.

    2. **Interfaz de comunicación**: una interfaz robusta garantiza un intercambio de datos fluido entre nodos y servicios, lo que permite una coordinación efectiva. En particular, los nodos no necesitan acordar de antemano un protocolo de comunicación concreto, porque la interfaz abstrae esos detalles y deja flexibilidad en las interacciones. Esta característica se explica en detalle más abajo.

    3. **Provisión de direcciones y tokens**: los nodos facilitan interacciones seguras gestionando las direcciones de comunicación y los tokens de autenticación, de modo que los servicios sean fácilmente accesibles sin renunciar a la seguridad.

    4. **Gestión de dependencias**: los nodos se aseguran de que los servicios tengan acceso a las dependencias que necesitan. Esas dependencias, a menudo llamadas «servicios hijo», pueden ejecutarse en el mismo nodo o en otro distinto. Esta característica permite a un servicio padre acceder a sus servicios hijo y coordinarse con ellos, garantizando un ecosistema de servicios fluido y eficiente incluso cuando los servicios están repartidos por la red.

    Un ejemplo de implementación de nodo con Python3 y Rust es **Nodo** [aquí](https://github.com/*Celaut*-project/nodo).

- **Servicios**:
    Un servicio en *Celaut* es un contenedor de software determinista diseñado para realizar una tarea concreta. Siguiendo el principio de **caja negra**, los servicios operan con independencia de los detalles de los nodos que los ejecutan y se centran únicamente en su funcionalidad. Sus aspectos clave son:

    - **Ejecución como instancias aisladas**: cuando un usuario solicita un servicio, este se envía a un nodo, que lo ejecuta como un proceso aislado —en un contenedor o en una máquina virtual, según la arquitectura del nodo—. Esta abstracción encaja con el principio de **simplicidad**, ya que los servicios no necesitan conocer el entorno de ejecución.

    - **Comportamiento determinista**: los servicios siguen reglas predefinidas para asegurar resultados consistentes. Esto encaja con el énfasis de *Celaut* en el **determinismo**: con las mismas entradas, un servicio producirá siempre la misma salida, sin importar qué nodo lo ejecute.

    - **Ejecución jerárquica**: una característica singular de los servicios en *Celaut* es su capacidad de solicitar la ejecución de otros servicios (servicios hijo) a través del nodo, lo que permite flujos de trabajo complejos. Es un reflejo de los comportamientos emergentes de los autómatas celulares, donde interacciones simples dan lugar a patrones más sofisticados.

**Coordinar incentivos: reputación y pagos**

En sistemas descentralizados como *Celaut*, la coordinación no va solo de interacciones técnicas: también implica alinear los incentivos de todos los participantes para que el sistema funcione con eficacia. *Celaut* incorpora dos mecanismos clave para lograr esa alineación:

- **Sistemas de reputación**:
    Cada nodo y cada servicio puede construir una reputación basada en su historial de interacciones. Nodos y servicios tienen incentivos para mantener altos estándares de fiabilidad y calidad y así preservar su reputación. Una buena reputación anima a otros nodos y usuarios a confiar en ellos e interactuar con ellos, lo que constituye un incentivo natural para comportarse con honradez y ofrecer servicios de calidad. Este mecanismo crea una forma de autorregulación dentro de la red, en la que los participantes tienen un interés directo en mantener su buen nombre.

- **Mecanismos de pago**:
    Más allá de la reputación, la cooperación entre nodos y servicios también se facilita mediante sistemas de pago. Cuando un nodo ejecuta un servicio, o cuando dos servicios interactúan entre sí, puede intercambiarse una compensación por los recursos usados o las tareas completadas. Estos pagos crean un incentivo directo para que los nodos aporten recursos y para que los servicios entreguen valor, lo que fomenta la colaboración y los intercambios justos en toda la red. Los mecanismos de pago garantizan que la asignación de recursos sea eficiente, permitiendo que nodos y servicios operen según sus fortalezas y capacidades.

Estos mecanismos se describen con más detalle más adelante y proporcionan el marco económico que hace viable el enfoque descentralizado de *Celaut*. Igual que dos nodos se comunican sin necesidad de acordar un protocolo concreto, estos sistemas operan con independencia de la arquitectura central. La razón de esa separación, y la forma en que permite flexibilidad y adaptabilidad en las interacciones, se explica más abajo.

**Del concepto a la práctica**

El diseño de *Celaut* refleja los principios subyacentes de los autómatas celulares: reglas simples a nivel de nodo y de servicio dan lugar a un sistema complejo y adaptativo. Al descentralizar el control, simplificar las interacciones y garantizar un comportamiento determinista, *Celaut* crea un marco flexible para la distribución y la automatización de software. Eso permite que los servicios se centren en sus funciones esenciales mientras los nodos gestionan la orquestación y la distribución, dando lugar a un sistema capaz de adaptarse y escalar según surgen nuevos requisitos.

**Impacto real de *Celaut***

La arquitectura de *Celaut* permite iterar y experimentar más rápido, de forma parecida a ejecutar simulaciones en un entorno controlado. Eso la hace especialmente valiosa en escenarios donde el despliegue y la prueba rápida de métodos nuevos son cruciales. Con las capacidades que ofrece la computación moderna, *Celaut* puede aprovechar estos principios para simular sistemas complejos de formas antes inimaginables, abriendo nuevas vías para mejorar la eficiencia y el rendimiento en distintos sectores.

Esta arquitectura permite que los servicios se centren en su funcionalidad, sin preocuparse por la infraestructura subyacente. Los nodos, por su parte, pueden gestionar eficientemente la ejecución de instancias, sin preocuparse por su utilidad.

<br>


## ¿Cómo se especifica un servicio?

La especificación de un servicio en *Celaut* consta de tres componentes principales:

### Contenedor | *BOX*
El componente **BOX** define el entorno en el que se ejecutará el servicio, garantizando consistencia en cómo se ejecuta entre nodos distintos. A diferencia de otros métodos de contenerización, el BOX de *Celaut* no depende de imágenes o repositorios externos: especifica directamente toda la estructura de archivos necesaria para ejecutar el servicio. Incluye los siguientes detalles:

- **Arquitectura**: especifica la microarquitectura del hardware sobre el que se pretende ejecutar el servicio, asegurando la compatibilidad entre el servicio y el nodo que lo ejecuta.

- **Sistema de archivos**: es una descripción exhaustiva de la estructura de archivos del servicio, que encapsula todos los archivos y directorios que necesita para operar. Incluye binarios, bibliotecas, archivos de configuración y cualquier otro recurso necesario.
    - Las **ramas de elementos** (*item branches*) definen la estructura del sistema de archivos, y cada rama representa un archivo, un enlace simbólico o una estructura de directorios anidada.
    - Este enfoque permite que todo el entorno sea autocontenido, reduce la dependencia de repositorios de terceros y mantiene el **determinismo**, ya que el entorno de ejecución del servicio es siempre el mismo con independencia del nodo anfitrión.

- **Variables de entorno**: especifica los pares clave-valor a los que el servicio puede acceder en tiempo de ejecución, lo que permite una configuración dinámica sin alterar la estructura de archivos.

- **Punto de entrada**: define el script o comando que inicia el proceso principal del servicio al ejecutarse. Así el nodo sabe cómo arrancar el servicio correctamente.

- **Config**: incluye las rutas y formatos de configuración que el nodo debe cargar al arrancar el servicio. Aporta información necesaria, como las asignaciones iniciales de recursos o parámetros específicos de ejecución.

- **Gateway esperado**: describe cómo se comunica el servicio con el nodo *Celaut*, especificando los protocolos y métodos (el *gateway app protocol*) que espera del nodo. Este componente garantiza una comunicación fluida entre el servicio y su entorno anfitrión, tratando al nodo como un sistema operativo que proporciona las interacciones de nivel de sistema.

La especificación BOX permite que los servicios *Celaut* sean portables, reproducibles y libres de dependencias de terceros, en línea con los principios de **simplicidad** y **determinismo**.

### Interfaz | *API*
La *API* (interfaz de programación de aplicaciones) en Celaut es el conjunto de reglas y especificaciones que definen cómo pueden interactuar los clientes y otros servicios con un servicio dentro del ecosistema. Su propósito principal es establecer un método claro y consistente para que distintos componentes de software se comuniquen entre sí, de modo que los servicios sean accesibles y utilizables de forma predecible.

A través de la *API* se definen los protocolos de comunicación y los endpoints con los que un servicio recibe y procesa peticiones. Eso garantiza que cualquier entidad externa, ya sea un usuario u otro servicio, pueda integrarse con el servicio siguiendo un conjunto estandarizado de instrucciones y sin necesidad de entender su funcionamiento interno.

Un aspecto fundamental de la *API* en Celaut es su papel en la descentralización. Al proporcionar una interfaz bien definida, los servicios pueden operar de forma autónoma sin depender de un controlador centralizado que gestione las interacciones. Eso hace al sistema más escalable y resistente, porque cada servicio es autosuficiente en su capacidad de comunicarse y colaborar con otros componentes del ecosistema.

La especificación *API* permite que los servicios sean fáciles de acceder y usar por parte de los clientes, manteniendo un método de interacción consistente. Respalda el principio de **descentralización** de *Celaut* al permitir que los servicios sean autosuficientes en su comunicación, sin depender de un controlador centralizado para negociar el protocolo.

### Red | *NET*
El componente **NET** define el alcance del acceso a redes externas que un servicio puede solicitar y con el que puede interactuar. Por defecto, un servicio está aislado de las redes externas y solo puede comunicarse con su servicio padre (el cliente que lo creó), sus servicios hijo y el nodo *Celaut* que lo ejecuta. Este aislamiento garantiza el **determinismo** y refuerza la **seguridad** al impedir fugas de datos o interacciones no autorizadas.

Sin embargo, algunos servicios necesitan acceso a redes externas para funcionar. Por ejemplo, un servicio que actúa como nodo de Bitcoin necesita interactuar con la red de Bitcoin en general. Para permitirlo sin comprometer la seguridad, *Celaut* admite lo siguiente:

- **Acceso externo controlado**: el servicio no accede directamente a direcciones IP o nodos externos. En su lugar, envía una petición a su nodo *Celaut* indicando que necesita acceso a una red concreta (por ejemplo, «bitcoin-mainnet»). El nodo *Celaut* verifica la petición y proporciona una lista de nodos pares de confianza con los que el servicio puede interactuar.

- **Petición de pares de red por parte del servicio**: un servicio como un nodo de Bitcoin puede solicitar recursos adicionales o pares de red comunicándose con su nodo *Celaut*. Por ejemplo, puede pedir: «necesito pares de "bitcoin-mainnet"». El nodo evalúa la petición y devuelve una lista de instancias verificadas (que pueden ser otros nodos de Bitcoin ejecutándose como servicios en la red *Celaut*).

- **Conocimiento y redirección del nodo**: si el nodo *Celaut* que recibió la petición sabe que no puede encontrar pares adecuados (por ejemplo, porque no hay otros nodos de Bitcoin en su red), buscará un nodo *Celaut* par que sí pueda satisfacer el requisito. Así los servicios siempre pueden encontrar las conexiones de red necesarias, aunque el nodo *Celaut* inicial esté limitado.

El componente **NET** permite a *Celaut* equilibrar la necesidad de conectividad externa con los valores fundamentales de **seguridad** y **determinismo**, garantizando que los servicios permanezcan aislados salvo que se les permita explícitamente acceder a redes más amplias.

<br><br>

La especificación de un servicio es una parte clave de la arquitectura de *Celaut*, ya que permite que los servicios se desplieguen y ejecuten de forma consistente y predecible.

<br>

El nodo cargará el servicio a partir del binario y le proporcionará los recursos que necesita para ejecutarse.

No hay una única manera de definir un servicio.
Por ejemplo, la [implementación en Proto3](https://github.com/*Celaut*-project/service-lib/blob/master/node-driver/src/node_driver/gateway/protos/*Celaut*.proto#L66) es una de las muchas variantes posibles.

<br>

No todos los nodos aceptarán todas las variantes posibles de una especificación de servicio.

>Por ejemplo, el nodo A entiende una especificación proto3 concreta y otra en JSON. Otro nodo B entiende la especificación JSON y otra en JSON + sistema de archivos comprimido. Ambos nodos pueden transmitir servicios de la especificación que tienen en común, en este caso JSON.

<br>

## Los distintos tipos de rol de usuario en el sistema

Como usuarios podemos desempeñar tres tipos de rol:

- Mantenedor de nodos (parecido a quien mantiene un minero en una blockchain).
- Desarrollador de servicios. Estos servicios puede ejecutarlos cualquiera en cualquier nodo (cualquier nodo compatible, en términos de arquitectura, etc.).
- Usuarios que lanzan servicios en los nodos.

Por tanto, quien mantiene un nodo (usuario de tipo 1) no se preocupa de si está minando PoW, ejecutando un bot de trading, analizando una secuencia de ADN o lo que sea que hagan los servicios que ejecuta. Simplemente ejecuta los servicios que solicitan los usuarios de tipo 3 a cambio de una prueba de pago (en una blockchain o por cualquier otro método de pago aceptado). El desarrollador (usuario de tipo 2) solo necesita enviarlo a uno o varios nodos, y estos se encargarán de distribuir el servicio entre los demás o de subirlo a un sistema de reputación, para que los usuarios (u otros servicios) sepan si usarlo, cuándo y por qué.

>Esta es una visión simple del sistema; al introducir más complejidad, la cantidad de roles de usuario posibles también podría crecer.

<br>


## Siguiendo los pasos de la naturaleza en los ecosistemas digitales

Imagina *Celaut* como un ecosistema digital que refleja la dinámica de un ecosistema biológico. En esta analogía:

1. Los nodos como organismos: los nodos de *Celaut* pueden compararse con los organismos de un ecosistema natural. Cada nodo representa una entidad distinta, con sus propias capacidades y funciones, igual que distintas especies ocupan diversos nichos en el entorno. Esos nodos interactúan entre sí y forman una red parecida a la trama interconectada de la vida en los ecosistemas.

2. Los servicios como funciones biológicas: los servicios de *Celaut* son análogos a las funciones o procesos biológicos de los organismos. Cada servicio realiza una tarea concreta, igual que los órganos de un ser vivo desempeñan funciones especializadas. Del mismo modo que los órganos trabajan en armonía para sostener la vida, los servicios colaboran dentro de los nodos para cubrir necesidades computacionales diversas.

3. La descentralización como diversidad: el principio de descentralización de *Celaut* puede equipararse a la biodiversidad de los ecosistemas naturales. En la naturaleza, la biodiversidad garantiza resiliencia y adaptabilidad, porque las especies diversas contribuyen a la estabilidad y funcionalidad del ecosistema. De forma parecida, la descentralización en *Celaut* mitiga los riesgos asociados a los puntos únicos de fallo y mejora la capacidad del sistema de adaptarse a condiciones cambiantes.

4. La eficiencia como optimización energética: la eficiencia en *Celaut* refleja la optimización energética que se observa en los sistemas naturales. En los ecosistemas biológicos, la energía fluye a través de las redes tróficas, y los organismos optimizan su gasto energético para maximizar supervivencia y reproducción. Del mismo modo, *Celaut* optimiza los recursos computacionales y reparte las tareas entre nodos para minimizar la latencia y el desperdicio de recursos.

5. La simplicidad y el determinismo como leyes naturales: los principios de simplicidad y determinismo de *Celaut* resuenan con las leyes que rigen los sistemas naturales. Igual que las leyes físicas dictan el comportamiento de la materia y la energía en el universo, las reglas simples de *Celaut* rigen las interacciones entre nodos y servicios. Este marco determinista garantiza consistencia y previsibilidad, de forma análoga a la previsibilidad de los fenómenos naturales gobernados por leyes fundamentales.

<br>


## Sistemas de confianza

En *Celaut*, las distintas partes del sistema, nodos y servicios, no confían entre sí; por tanto, es un sistema trustless. Por eso es poco probable que un nodo ejecute servicios gratis, o que un servicio funcione sin que se haga un pago en un contrato y se reciba prueba de ello (aunque, obviamente, pueden hacerlo si quieren; en el caso de los servicios es económicamente viable porque tienen un coste marginal cero).
<br>Ahora bien, para permitir la interacción entre esas partes sin confianza entre ellas hacen falta contratos, contratos sociales (en una sociedad de nodos y servicios), que transmitan valor y asignen reputación a cada parte. Por tanto, tenemos dos tipos de sistemas (desde un punto de vista relativamente abstracto): sistemas de pago y sistemas de reputación.

> Una estrategia posible para un nodo es ofrecer la ejecución de servicios sin intercambiar valor al principio, para aumentar su reputación y, cuando tenga reputación ante los demás, empezar a subir su coste.

> A diferencia de los nodos, la naturaleza de los servicios es tener un coste marginal cero: no tienen límite en el número de unidades simultáneas en que se ejecutan (ya que el coste de ejecutarlos recae en los nodos), así que es bastante probable que muchos servicios empiecen con coste cero para ganar reputación, exijan un coste cuando la tengan y sigan siendo competitivos, y vuelvan a coste cero cuando dejen de serlo.


### Sistemas de pago

Los sistemas de pago permiten transferir valor entre entidades en *Celaut*. Estos son algunos tipos posibles:

#### Contratos inteligentes de licencia

Un sistema de contratos que permite emitir licencias de uso para servicios y nodos, donde el Ledger es la red en la que se acuerda la verdad. Así, si A quiere ejecutar un método de B, consultará su contrato, ejecutará el comando definido (conectándose al Ledger), y el contrato del Ledger emitirá una licencia que A enviará a B para habilitar la ejecución del método deseado.

Hay cuatro tipos distintos de licencia según dos clasificaciones diferentes. Por un lado, si la licencia es elástica o estática; por otro, si es interactiva o no interactiva.

- Las **licencias elásticas** son las que permiten restringir su uso en función de ciertos parámetros (número de peticiones, tiempo, métodos, variables de entorno, etc.).

- Las **licencias estáticas** son las que no restringen el uso. B conoce las claves de la licencia y el contrato la proporciona sin poder limitar su uso.

- Las **licencias interactivas** exigen que B se conecte al Ledger para verificar la validez de la licencia proporcionada.

- Las **licencias no interactivas** no exigen que B se conecte al Ledger para verificar la validez de la licencia proporcionada.

<br>

De ahí resultan los cuatro tipos de licencia:

- Estática interactiva (muy sencilla; poco útil)
- Estática no interactiva (mejor para servicios)
- Elástica interactiva (mejor para nodos)
- Elástica no interactiva (bastante compleja; versátil)

<br>

> Los ledgers pueden ser redes públicas y sin permisos como Bitcoin o Ergo, o plataformas privadas y cerradas como Stripe. El único requisito es que todos los participantes los soporten.

<br>


### Sistemas de reputación

Los sistemas de reputación permiten a usuarios, nodos y servicios crear un ecosistema social sobre el que tomar decisiones. Los nodos necesitan saber en qué pares pueden confiar para solicitarles la ejecución de servicios.
A los usuarios, que ejecutan servicios, les ayuda a determinar qué servicios rendirán mejor en la tarea que quieren realizar.

En *Celaut*, la reputación se representa como registros en Ledgers, que constituyen una opinión.

En el caso de los servicios, su naturaleza determinista da a su reputación una perspectiva distinta a la de los nodos.
Una prueba de reputación (un registro) publicada hace tiempo puede tener el mismo valor que una actual respecto a un servicio (esto es cierto cuando el servicio no interactúa con redes, que es la forma por defecto de un servicio: completamente aislado).
Si sí interactúa con alguna red, su reputación puede depender de la reputación de las redes a las que se conecta, que no tienen esa propiedad determinista, ya que pueden cambiar con el tiempo. Esto es así porque el servicio en sí no ha cambiado.

En cambio, la reputación de un nodo es más valiosa cuanto más reciente es, ya que su comportamiento puede variar con el tiempo.
Cuando los nodos se presentan entre sí, muestran pruebas de su reputación, y los demás pueden opinar de forma no consensuada sobre si son más o menos fiables.

Cada nodo, servicio u otro tipo de actor de un sistema de reputación confía en distintas fuentes en distinto grado, y esas fuentes, a su vez, confían en distinto grado en otras fuentes, nodos, servicios u otras entidades. Así, cuando a un actor determinado se le presenta una entidad desconocida, consultará las opiniones de sus fuentes de confianza.

Para una comprensión más concreta de cómo funciona un sistema de reputación, puedes leer: [Documentación del Sigma Reputation Panel](https://github.com/reputation-systems/sigma-reputation-panel/blob/master/README.md)

<br>


## Por qué es necesario

Lo que *Celaut* pretende resolver es precisamente la separación entre el «*cómo se resuelve un problema*» y el «*dónde y quién lo resuelve*».

Tomemos, por ejemplo, un bot de trading.

>Los bots de trading son programas automáticos que ejecutan órdenes de compra y venta en los mercados financieros a partir de algoritmos predefinidos. Son importantes porque pueden operar 24/7, reaccionar rápido a los cambios del mercado y eliminar sesgos emocionales, lo que mejora la eficiencia y la consistencia de las estrategias.


<br>

En este contexto, si quieres usar un bot de trading ahora mismo, acudirás a la web y podrás:

1. Buscar un servicio web que gestione tu cartera de activos, que tiene:
    1. Ventajas:
        1. No necesitas ejecutar la infraestructura tú mismo.
        2. No necesitas configurar nada.
    2. Inconvenientes:
        1. No puedes atribuirle reputación, porque quien desarrolla el servicio
        web no puede demostrar que el sistema no ha cambiado (por ejemplo,
        cuando un bot ha ganado muchos usuarios, podrían reducir su
        rendimiento para empujarte a usar otro más nuevo).
        2. Quienes desarrollan el servicio web no pueden asegurarte que no están
        haciendo mal uso de los datos de tus peticiones (en este caso, los
        movimientos de tu cartera).
2. Buscar un código fuente (en GitHub, etc.) que puedas ejecutar por tu cuenta en tu PC (o en la nube).
    1. Ventajas:
        1. Es determinista, en el sentido de que (si no puede conectarse a
        internet) tendrás la seguridad de que su comportamiento o rendimiento no cambiarán en el futuro, porque quien lo desarrolló no puede modificar el código que ya descargaste.
        2. Quien desarrolla el servicio no tiene ningún control sobre los datos de tus peticiones.
    2. Inconvenientes:
        1. Necesitas disponer de equipo (infraestructura) capaz de ejecutar el código.
        2. Tienes que lidiar con problemas de configuración del sistema (que a menudo
        son lo bastante serios como para que un usuario medio opte por un servicio web).

Frente a estas dos opciones, *Celaut* permite tomar las ventajas de ambas sin sus inconvenientes. He aquí por qué:



- La gestión de la infraestructura es innecesaria, porque de ella se encargan los nodos. No hace falta buscar un proveedor cloud.

- No se requiere configuración. La especificación del servicio cubre cómo se construye el contenedor, su arquitectura, sus requisitos de red y su interfaz. Los usuarios no tienen que preocuparse por nada de eso.

- Quienes desarrollan servicios no pueden controlar, modificar ni extraer datos del servicio. No controlan los nodos que lo distribuyen y lo ejecutan. Aun así, pueden tener incentivos para crearlo.

<br>


## Comportamiento del sistema

Esta sección describe el comportamiento del sistema, incluidas las interacciones entre sus partes,
para mostrar con mayor claridad la naturaleza de la arquitectura.

- [Ejecución de un servicio](execution_of_a_service.md)
- [Balanceo de carga de servicios](service_balancer.md)
- [Node handshake]()

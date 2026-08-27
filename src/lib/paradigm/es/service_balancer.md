[*<-- Volver a la página principal*](README.md#system-behavior)

### Diagrama de secuencia de un proceso de balanceo de servicios

Cuando un nodo recibe una petición para instanciar un servicio, es el nodo quien decide en qué nodo de la red debe instanciarse, localmente o en otro nodo. Para ello compara el coste de ejecutar la instancia en cada uno de sus pares con el coste de ejecutarla localmente y elige el que considera mejor (por ejemplo, el más bajo).

Cuando los clientes (otros pares) le preguntan por su coste de ejecutar un servicio, les dará el coste de ejecutarlo localmente o en otro de sus pares.

<br>

En el siguiente diagrama de secuencia (figura 4c0) se expone el proceso de balanceo de carga para ejecutar nuevas instancias de servicio. Se asume que un servicio ha recibido la petición de ejecutar la instancia de un servicio.

![Diagrama del balanceador de servicios](assets/4c0f64_service_balance_diagram.excalidraw.svg) *Figura 4c0: diagrama de balanceo de servicios*

<br>

Los agentes implicados en el diagrama de secuencia anterior (figura 4c0) son los siguientes:

- El nodo A es el nodo que solicita el coste y la generación de la nueva instancia de un servicio.
- El nodo B es otro nodo de la red.

Durante la secuencia se exponen las siguientes interacciones:

1. El nodo A solicita a cada uno de sus pares en la red el coste de ejecutar una instancia del servicio. Usa el método de obtención de coste según la interfaz de cada par.

2. El nodo B calcula el coste de ejecutar el servicio localmente.

3. El nodo A calcula el coste de ejecutar el servicio localmente y lo compara con los costes recibidos. En este caso decide que el coste más bajo es el del nodo B.

4. El nodo A solicita al nodo B que ejecute una instancia del servicio, le envía la especificación y espera a que le devuelva su dirección y su token.

5. El nodo B ejecuta la instancia del servicio que le entrega el nodo A, almacena la instancia en su registro considerando que el padre es el nodo A y devuelve su dirección y su token.

6. El nodo A recibe la dirección y el token del nodo B y almacena la instancia en el registro como instancia externa.

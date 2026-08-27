[*<-- Volver a la página principal*](README.md#system-behavior)


### Diagrama de secuencia de la ejecución de una instancia de servicio

![Diagrama de casos de uso](assets/e29d99_service_execution_diagram.excalidraw.svg)*__Figura e29__: diagrama de secuencia de la ejecución de una instancia de servicio*

<br>

Los agentes que participan en el diagrama de secuencia anterior (figura e29) son los siguientes:

- Servicio principal: es la instancia del servicio que solicita instanciar otro servicio en su nodo.

- Nodo: es el nodo al que el servicio principal solicita la generación de la nueva instancia.

- Dependencia: es la nueva instancia que el servicio principal quería usar.

<br>

Durante la secuencia se producen las siguientes interacciones:

1. La instancia del servicio principal envía la especificación de otro servicio a su nodo mediante el método *StartService()*. Se asume que el nodo se encargará de ejecutar una instancia de ese servicio y devolverá la dirección de la nueva instancia, así como el token correspondiente.

2. El nodo, tras recibir la petición del servicio principal, almacena la especificación completa o, si ya la tiene almacenada, detiene el flujo de la petición (para quedarse solo con el hash del servicio solicitado).

3. El nodo instancia el servicio solicitado, carga la configuración (el archivo *__config __* en su raíz) y ejecuta su punto de entrada.

4. La dependencia arranca con la ejecución descrita en el punto de entrada de su especificación.

5. El nodo obtiene la dirección de la instancia del contenedor y calcula el token correspondiente; el token será un identificador secreto de la nueva instancia de servicio y depende de la implementación del nodo. ~~El nodo almacena la instancia en el registro como instancia interna y al servicio que la solicitó como su padre.~~ Por último, devuelve la dirección y el token de la instancia al servicio principal.

6. El servicio principal, que solicitó la instancia, usa la dependencia a través de la dirección que le ha proporcionado el nodo.

7. El servicio principal decide detener la dependencia, así que ejecuta el método *StopService()* del nodo enviándole el token de la dependencia.

8. El nodo detiene el contenedor de la dependencia y lo elimina del registro.

>Los métodos *StartService()* y *StopService()* son métodos de referencia, pero pueden variar entre implementaciones de nodo. La interfaz del nodo, usada por los clientes y los servicios locales (servicios que ejecuta el nodo) para hacer peticiones y controlar recursos y dependencias, la proporciona el propio nodo a los nuevos clientes o servicios locales.

>El archivo *__ config __* indica la configuración de cada servicio (variables de entorno, interfaz del nodo, etc.), que depende de cada servicio, ya que su esquema se indica en la especificación de cada uno. El nodo puede tener la capacidad de escribir en uno o varios esquemas y, si no es compatible, puede decidir no instanciar el servicio o usar un servicio de traducción.

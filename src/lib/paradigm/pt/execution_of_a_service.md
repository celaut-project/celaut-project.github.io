[*<-- Voltar à página principal*](README.md#system-behavior)


### Diagrama de sequência da execução de uma instância de serviço

![Diagrama de caso de uso](assets/e29d99_service_execution_diagram.excalidraw.svg)*__Figura e29__: diagrama de sequência da execução de uma instância de serviço*

<br>

Os agentes que participam do diagrama de sequência anterior (figura e29) são os seguintes:

- Serviço principal: é a instância do serviço que solicita instanciar outro serviço em seu nó.

- Nó: é o nó ao qual o serviço principal solicita a geração da nova instância.

- Dependência: é a nova instância que o serviço principal queria usar.

<br>

As seguintes interações ocorrem durante a sequência:

1. A instância do serviço principal envia a especificação de outro serviço ao seu nó usando o método *StartService()*. Isso pressupõe que o nó se encarregará de executar uma instância desse serviço e retornará o endereço da nova instância, assim como o token correspondente.

2. O nó, após receber a requisição do serviço principal, armazena a especificação completa ou, se ela já estiver armazenada, interrompe o fluxo da requisição (para pegar apenas o hash do serviço solicitado).

3. O nó instancia o serviço solicitado, carregando a configuração (o arquivo *__config __* em sua raiz) e executando seu ponto de entrada.

4. A dependência inicia com a execução descrita no ponto de entrada de sua especificação.

5. O nó obtém o endereço da instância do contêiner e calcula o token correspondente; o token será um identificador secreto da nova instância de serviço e depende da implementação do nó. ~~O nó armazena a instância no registro como uma instância interna, e o serviço que a solicitou como seu pai.~~ Por fim, ele retorna o endereço e o token da instância ao serviço principal.

6. O serviço principal, o solicitante da instância, usa a dependência por meio do endereço que o nó lhe forneceu.

7. O serviço principal decide encerrar a dependência, então executa o método *StopService()* do nó, enviando-lhe o token da dependência.

8. O nó encerra o contêiner da dependência e a remove do registro.

>Os métodos *StartService()* e *StopService()* são métodos de referência, mas podem variar entre implementações de nó. A interface do nó, usada por clientes e serviços locais (serviços que rodam no nó) para fazer requisições e controlar recursos e dependências, é fornecida pelo nó a novos clientes ou serviços locais.

>O arquivo *__ config __* indica a configuração de cada serviço (variáveis de ambiente, interface do nó, etc.), que depende de cada serviço, já que seu esquema é indicado na especificação de cada um. O nó pode ter a capacidade de escrever em um ou mais esquemas, e, se não for compatível, pode decidir não instanciar o serviço ou usar um serviço de tradução.

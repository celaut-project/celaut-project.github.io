[*<-- Voltar à página principal*](README.md#system-behavior)

### Diagrama de sequência de um processo de balanceamento de serviços

Quando um nó recebe uma requisição para instanciar um serviço, é o nó que decide em qual nó da rede ele deve ser instanciado, localmente ou em outro nó. Para isso, ele compara o custo de executar a instância em cada um de seus pares com o custo de executá-la localmente e escolhe o que considera melhor (por exemplo, o mais baixo).

Quando clientes (outros pares) perguntam sobre seu custo para executar um serviço, ele informará o custo de executá-lo localmente ou em outro de seus pares.

<br>

No diagrama de sequência a seguir (figura 4c0), o processo de balanceamento de carga para executar novas instâncias de serviço é exposto. Presume-se que um serviço tenha recebido a requisição para executar a instância de um serviço.

![Diagrama do balanceador de serviços](assets/4c0f64_service_balance_diagram.excalidraw.svg) *Figura 4c0: diagrama de balanceamento de serviços*

<br>

Os agentes envolvidos no diagrama de sequência anterior (figura 4c0) são os seguintes:

- O nó A é o nó que solicita o custo e a geração da nova instância de um serviço.
- O nó B é outro nó da rede.

As seguintes interações são expostas durante a sequência:

1. O nó A solicita a cada um de seus pares na rede o custo de executar uma instância do serviço. Ele usa o método de obtenção de custo de acordo com a interface de cada par.

2. O nó B calcula o custo de executar o serviço localmente.

3. O nó A calcula o custo de executar o serviço localmente e o compara com os custos recebidos. Nesse caso, decide que o custo mais baixo é o do nó B.

4. O nó A solicita ao nó B que execute uma instância do serviço, envia a ele a especificação correspondente e aguarda que ele retorne seu endereço e token.

5. O nó B executa a instância do serviço que o nó A lhe entrega, armazena a instância em seu registro considerando que o pai é o nó A, e retorna seu endereço e token.

6. O nó A recebe o endereço e o token do nó B, e armazena a instância no registro como uma instância externa.

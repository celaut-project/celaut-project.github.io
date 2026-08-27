# *Celaut*: uma arquitetura ponto a ponto para o design e a distribuição de software

<br>

**Contexto**

Na década de 1940, o matemático John von Neumann, em colaboração com Stanislaw Ulam, introduziu o conceito de autômato celular, criando modelos que demonstraram como comportamentos complexos podiam emergir de regras simples. Com base nisso, em 1970, John Horton Conway apresentou "O Jogo da Vida", um autômato celular que se tornou o exemplo clássico de como um sistema pode evoluir para padrões intrincados a partir de interações básicas. Essas ideias oferecem uma visão valiosa de como sistemas descentralizados podem alcançar complexidade sem controle central, o que serve como filosofia orientadora para o design do *Celaut*.

**Definição**

*Celaut* é um conjunto de regras simples para o design e a distribuição de software, com o objetivo de criar um sistema robusto, escalável e adaptativo por meio dos princípios de **descentralização**, **simplicidade** e **determinismo**.

**Princípios**

1. **Descentralização**: nenhum ponto único de controle ou falha, permitindo que os nós se comuniquem e se coordenem dinamicamente.
2. **Simplicidade**: regras minimalistas que reduzem a complexidade, garantindo que cada componente possa ser compreendido e mantido com facilidade.
3. **Determinismo**: os serviços se comportam de forma previsível, seguindo regras definidas que garantem a reprodutibilidade dos resultados entre diferentes nós.

***Celaut* — Arquitetura: nós e serviços**

A arquitetura do *Celaut* é construída em torno de dois elementos centrais: **nós** e **serviços**. Juntos, eles criam uma rede distribuída em que cada parte contribui para a funcionalidade geral, de forma semelhante aos agentes em um autômato celular.

- **Nós**:
    Um nó representa um computador ou dispositivo dentro da rede *Celaut* que pode se comunicar com outros nós e gerenciar a execução de serviços. A natureza descentralizada do *Celaut* se manifesta na forma como os nós interagem, garantindo que não haja ponto único de falha ou controle centralizado. As principais responsabilidades de um nó incluem:

    1. **Execução de serviços**: os nós gerenciam instâncias de serviço, decidindo se as executam localmente ou distribuem a carga entre nós pares. Isso garante utilização ideal de recursos e desempenho, de forma semelhante a como células em um autômato celular interagem com suas vizinhas para manter o equilíbrio do sistema.

    2. **Interface de comunicação**: uma interface robusta garante uma troca de dados fluida entre nós e serviços, permitindo uma coordenação eficaz. Vale notar que os nós não precisam concordar previamente com um protocolo de comunicação específico, já que a interface abstrai esses detalhes, permitindo flexibilidade nas interações. Esse recurso é explicado em mais detalhes a seguir.

    3. **Provisionamento de endereços e tokens**: os nós facilitam interações seguras ao gerenciar endereços de comunicação e tokens de autenticação, tornando os serviços facilmente acessíveis e ao mesmo tempo mantendo a segurança.

    4. **Gerenciamento de dependências**: os nós garantem que os serviços tenham acesso às dependências necessárias. Essas dependências, frequentemente chamadas de "serviços filhos", podem rodar no mesmo nó ou em nós diferentes. Esse recurso permite que um serviço pai acesse e se coordene com seus serviços filhos, garantindo um ecossistema de serviços fluido e eficiente, mesmo com os serviços distribuídos pela rede.

    Um exemplo de implementação de um nó usando Python3 e Rust é o **Nodo**, disponível [aqui](https://github.com/*Celaut*-project/nodo).

- **Serviços**:
    Um serviço no *Celaut* é um contêiner de software determinístico projetado para realizar uma tarefa específica. Seguindo o princípio da **caixa-preta**, os serviços operam de forma independente dos detalhes dos nós que os executam, focando apenas em sua funcionalidade. Os principais aspectos dos serviços incluem:

    - **Execução como instâncias isoladas**: quando um usuário solicita um serviço, ele é enviado a um nó, que o executa como um processo isolado — em um contêiner ou em uma máquina virtual, dependendo da arquitetura do nó. Essa abstração está alinhada ao princípio da **simplicidade**, já que os serviços não precisam ter conhecimento do ambiente de execução.

    - **Comportamento determinístico**: os serviços seguem regras predefinidas para garantir resultados consistentes. Isso está alinhado à ênfase do *Celaut* no **determinismo**, em que, dadas as mesmas entradas, um serviço sempre produzirá a mesma saída, independentemente de qual nó o execute.

    - **Execução hierárquica**: uma característica única dos serviços no *Celaut* é a capacidade de solicitar a execução de outros serviços (serviços filhos) por meio do nó, permitindo fluxos de trabalho complexos. Isso reflete os comportamentos emergentes vistos em autômatos celulares, em que interações simples podem levar a padrões mais sofisticados.

**Coordenando incentivos: reputação e pagamentos**

Em sistemas descentralizados como o *Celaut*, a coordenação não envolve apenas interações técnicas — ela também exige alinhar os incentivos de todos os participantes para garantir que o sistema funcione de forma eficaz. O *Celaut* incorpora dois mecanismos-chave para alcançar esse alinhamento:

- **Sistemas de reputação**:
    Cada nó e serviço pode construir uma reputação com base em seu histórico de interações. Nós e serviços são incentivados a manter altos padrões de confiabilidade e qualidade para preservar sua reputação. Uma reputação sólida incentiva outros nós e usuários a confiarem neles e interagirem com eles, oferecendo um incentivo natural para se comportarem de forma justa e fornecerem serviços de qualidade. Esse mecanismo de reputação cria uma forma de autorregulação dentro da rede, em que os participantes têm um interesse direto em manter sua boa reputação.

- **Mecanismos de pagamento**:
    Além da reputação, a cooperação entre nós e serviços também é facilitada por sistemas de pagamento. Quando um nó executa um serviço, ou quando serviços interagem entre si, uma compensação pode ser trocada por recursos usados ou tarefas concluídas. Esses pagamentos criam um incentivo direto para que os nós contribuam com recursos e para que os serviços entreguem valor, incentivando a colaboração e trocas justas em toda a rede. Os mecanismos de pagamento garantem que a alocação de recursos seja eficiente, permitindo que nós e serviços operem de acordo com suas forças e capacidades.

Esses mecanismos são descritos em mais detalhes adiante, fornecendo a estrutura econômica que garante a viabilidade da abordagem descentralizada do *Celaut*. De forma semelhante a como dois nós se comunicam sem precisar concordar com um protocolo específico, esses sistemas operam de forma independente da arquitetura central. O motivo dessa separação, e a forma como ela permite flexibilidade e adaptabilidade nas interações, é explicado mais adiante.

**Conectando o conceitual e o prático**

O design do *Celaut* reflete os princípios subjacentes dos autômatos celulares: regras simples no nível do nó e do serviço levam a um sistema complexo e adaptativo. Ao descentralizar o controle, simplificar as interações e garantir um comportamento determinístico, o *Celaut* cria um framework flexível para a distribuição e a automação de software. Isso permite que os serviços foquem em suas funções principais enquanto os nós gerenciam a orquestração e a distribuição, resultando em um sistema capaz de se adaptar e escalar à medida que surgem novos requisitos.

**Impacto real do *Celaut***

A arquitetura do *Celaut* permite iteração e experimentação mais rápidas, de forma parecida com executar simulações em um ambiente controlado. Isso a torna particularmente valiosa em cenários em que a implantação e o teste rápidos de novos métodos são cruciais. Com as capacidades oferecidas pela computação moderna, o *Celaut* pode aproveitar esses princípios para simular sistemas complexos de formas antes inimagináveis, abrindo novos caminhos para melhorar a eficiência e o desempenho em diversos setores.

Essa arquitetura permite que os serviços foquem em sua funcionalidade, sem se preocupar com a infraestrutura subjacente. Os nós, por sua vez, podem gerenciar de forma eficiente a execução de instâncias, sem se preocupar com sua utilidade.

<br>


## Como um serviço é especificado?

A especificação de um serviço no *Celaut* consiste em três componentes principais:

### Contêiner | *BOX*
O componente **BOX** define o ambiente em que o serviço será executado, garantindo consistência na forma como o serviço é executado em diferentes nós. Diferentemente de outros métodos de conteinerização, o BOX do *Celaut* não depende de imagens ou repositórios externos; em vez disso, ele especifica diretamente toda a estrutura de arquivos necessária para executar o serviço. Inclui os seguintes detalhes:

- **Arquitetura**: especifica a microarquitetura do hardware em que o serviço pretende rodar, garantindo compatibilidade entre o serviço e o nó em execução.

- **Sistema de arquivos**: uma descrição abrangente da estrutura de arquivos do serviço, encapsulando todos os arquivos e diretórios necessários para o serviço operar. Isso inclui binários, bibliotecas, arquivos de configuração e quaisquer outros recursos necessários.
    - **Ramificações de itens (Item Branches)** definem a estrutura do sistema de arquivos, com cada ramificação representando um arquivo, um link simbólico, ou uma estrutura de diretórios aninhada.
    - Essa abordagem permite que todo o ambiente seja autocontido, reduzindo a dependência de repositórios de terceiros e mantendo o **determinismo**, já que o ambiente de execução do serviço permanece o mesmo, independentemente do nó hospedeiro.

- **Variáveis de ambiente**: especificam pares chave-valor que o serviço pode acessar durante a execução, permitindo configuração dinâmica sem alterar a estrutura de arquivos central.

- **Ponto de entrada**: define o script ou comando que inicia o processo principal do serviço quando executado. Isso garante que o nó saiba como iniciar o serviço corretamente.

- **Config**: inclui os caminhos e formatos de configuração que o nó deve carregar ao iniciar o serviço. Fornece informações necessárias, como alocações iniciais de recursos ou parâmetros específicos de execução.

- **Gateway esperado (Expected Gateway)**: descreve como o serviço se comunica com o nó *Celaut*, especificando os protocolos e métodos (protocolo de aplicação do gateway) que ele espera do nó. Esse componente garante uma comunicação fluida entre o serviço e seu ambiente hospedeiro, tratando o nó como um sistema operacional que fornece interações em nível de sistema.

A especificação BOX permite que os serviços do *Celaut* sejam portáteis, reproduzíveis e livres de dependências de terceiros, alinhando-se aos princípios de **simplicidade** e **determinismo**.

### Interface | *API*
A *API* (Interface de Programação de Aplicações) no Celaut é o conjunto de regras e especificações que define como clientes e outros serviços podem interagir com um serviço dentro do ecossistema. Seu principal objetivo é estabelecer um método claro e consistente para que diferentes componentes de software se comuniquem entre si, garantindo que os serviços sejam acessíveis e utilizáveis de forma previsível.

Por meio da *API*, protocolos de comunicação e endpoints são definidos para que um serviço receba e processe requisições. Isso garante que qualquer entidade externa, seja um usuário ou outro serviço, possa integrar-se ao serviço seguindo um conjunto padronizado de instruções, sem precisar entender seu funcionamento interno.

Um aspecto fundamental da *API* no Celaut é seu papel na descentralização. Ao fornecer uma interface bem definida, os serviços podem operar de forma autônoma, sem depender de um controlador centralizado para gerenciar as interações. Isso torna o sistema mais escalável e resiliente, já que cada serviço é autossuficiente em sua capacidade de se comunicar e colaborar com outros componentes do ecossistema.

A especificação da *API* permite que os serviços sejam facilmente acessados e usados pelos clientes, mantendo um método consistente de interação. Ela dá suporte ao princípio de **descentralização** do *Celaut*, permitindo que os serviços sejam autossuficientes em sua comunicação, sem depender de um controlador centralizado para a negociação de protocolo.

### Rede | *NET*
O componente **NET** define o escopo de acesso à rede externa que um serviço pode solicitar e com o qual pode interagir. Por padrão, um serviço é isolado das redes externas, podendo se comunicar apenas com seu serviço pai (o cliente que o criou), seus serviços filhos e o nó *Celaut* que o executa. Esse isolamento garante o **determinismo** e reforça a **segurança**, evitando vazamentos de dados não autorizados ou interações indevidas.

No entanto, alguns serviços exigem acesso a redes externas para sua funcionalidade. Por exemplo, um serviço que atua como um nó Bitcoin precisa interagir com a rede Bitcoin mais ampla. Para permitir isso sem comprometer a segurança, o *Celaut* permite o seguinte:

- **Acesso externo controlado**: o serviço não acessa diretamente endereços IP ou nós externos. Em vez disso, ele envia uma requisição ao seu nó *Celaut*, especificando a necessidade de acesso a uma rede específica (por exemplo, "bitcoin-mainnet"). O nó *Celaut* verifica essa requisição e fornece uma lista de nós pares confiáveis com os quais o serviço pode interagir.

- **Solicitação de pares de rede pelo serviço**: um serviço como um nó Bitcoin pode solicitar recursos ou pares de rede adicionais ao se comunicar com seu nó *Celaut*. Por exemplo, ele pode solicitar: "preciso de pares de 'bitcoin-mainnet'". O nó avalia essa requisição e retorna uma lista de instâncias verificadas (que podem ser outros nós Bitcoin rodando como serviços na rede *Celaut*).

- **Ciência e redirecionamento pelo nó**: se o nó *Celaut* que recebeu a requisição do serviço sabe que não consegue encontrar pares adequados (por exemplo, nenhum outro nó Bitcoin em sua rede), ele buscará um nó *Celaut* par que possa atender a essa necessidade. Isso garante que os serviços sempre consigam encontrar as conexões de rede necessárias, mesmo que o nó *Celaut* inicial seja limitado.

O componente **NET** permite que o *Celaut* equilibre a necessidade de conectividade externa com os valores centrais de **segurança** e **determinismo**, garantindo que os serviços permaneçam isolados a menos que tenham permissão explícita para acessar redes mais amplas.

<br><br>

A especificação de um serviço é uma parte fundamental da arquitetura do *Celaut*, pois permite que os serviços sejam implantados e executados de forma consistente e previsível.

<br>

O nó carregará o serviço a partir do binário e fornecerá a ele os recursos necessários para funcionar.

Não existe uma única forma de definir um serviço.
Por exemplo, a [implementação Proto3](https://github.com/*Celaut*-project/service-lib/blob/master/node-driver/src/node_driver/gateway/protos/*Celaut*.proto#L66) é apenas uma das muitas variações possíveis.

<br>

Nem todos os nós aceitarão todas as variações possíveis de uma especificação de serviço.

>Por exemplo, o nó A entende uma especificação proto3 específica e outra em JSON. Outro nó B entende a especificação JSON e outra em JSON + sistema de arquivos compactado. Ambos os nós podem transmitir serviços da especificação que têm em comum, neste caso, JSON.

<br>

## Diferentes tipos de papéis de usuário no sistema

Como usuários, podemos desempenhar três tipos de papéis:

- Operador de nó (semelhante a alguém que mantém um minerador em uma blockchain).
- Desenvolvedor de serviços. Esses serviços podem ser executados por qualquer um em qualquer nó (qualquer nó compatível, em termos de arquitetura, etc.).
- Usuários que executam serviços em nós.

Portanto, a pessoa que mantém um nó (usuário do tipo 1) não se preocupa se ele está minerando PoW, rodando um bot de trading, analisando uma sequência de DNA, ou o que quer que os serviços que ele executa façam. Ela simplesmente executa os serviços que os usuários do tipo 3 solicitam, em troca de uma prova de pagamento (em uma blockchain ou em qualquer outro método de pagamento aceito). O desenvolvedor (usuário do tipo 2) só precisa enviá-lo a um ou vários nós, e eles se encarregarão de distribuir o serviço entre outros e/ou enviá-lo a um sistema de reputação, para que os usuários (ou outros serviços) saibam se, quando e por que usá-lo.

>Essa é uma visão simplificada do sistema; ao introduzir mais complexidade, a quantidade de possíveis papéis de usuário também pode crescer.

<br>


## Seguindo os passos da natureza em ecossistemas digitais

Imagine o *Celaut* como um ecossistema digital, espelhando a dinâmica de um ecossistema biológico encontrado na natureza. Nessa analogia:

1. Nós como organismos: os nós dentro do *Celaut* podem ser comparados a organismos em um ecossistema natural. Cada nó representa uma entidade distinta com suas próprias capacidades e funções, semelhante a diferentes espécies ocupando diversos nichos no ambiente. Esses nós interagem entre si, formando uma rede semelhante à teia interconectada da vida encontrada nos ecossistemas.

2. Serviços como funções biológicas: os serviços dentro do *Celaut* são análogos a funções ou processos biológicos encontrados em organismos. Cada serviço realiza uma tarefa específica, semelhante a como órgãos em organismos vivos desempenham funções especializadas. Assim como os órgãos trabalham em conjunto de forma harmoniosa para sustentar a vida, os serviços colaboram dentro dos nós para atender a necessidades computacionais diversas.

3. Descentralização como diversidade: o princípio de descentralização do *Celaut* pode ser equiparado à biodiversidade em ecossistemas naturais. Na natureza, a biodiversidade garante resiliência e adaptabilidade, já que espécies diversas contribuem para a estabilidade e a funcionalidade do ecossistema. Da mesma forma, a descentralização no *Celaut* mitiga riscos associados a pontos únicos de falha e aumenta a capacidade do sistema de se adaptar a condições em mudança.

4. Eficiência como otimização de energia: a eficiência no *Celaut* espelha a otimização de energia observada em sistemas naturais. Em ecossistemas biológicos, a energia flui através de cadeias alimentares, com organismos otimizando o gasto de energia para maximizar sobrevivência e reprodução. Da mesma forma, o *Celaut* otimiza recursos computacionais, distribuindo tarefas entre nós para minimizar latência e desperdício de recursos.

5. Simplicidade e determinismo como leis naturais: os princípios de simplicidade e determinismo no *Celaut* ressoam com as leis subjacentes que governam sistemas naturais. Assim como as leis físicas ditam o comportamento da matéria e da energia no universo, as regras simples do *Celaut* governam as interações entre nós e serviços. Esse framework determinístico garante consistência e previsibilidade, semelhante à previsibilidade dos fenômenos naturais governados por leis fundamentais.

<br>


## Sistemas de confiança

No *Celaut*, as diferentes partes do sistema, nós e serviços, não confiam umas nas outras, portanto é um sistema sem confiança prévia. É por isso que é improvável que um nó execute serviços de graça, ou que um serviço não funcione sem que um pagamento seja feito em um contrato e sua prova seja recebida (embora, obviamente, eles possam fazer isso se quiserem; no caso dos serviços, é economicamente viável porque têm um custo marginal zero).
<br>No entanto, para permitir a interação entre essas partes sem confiança prévia entre elas, são necessários contratos, contratos sociais (em uma sociedade de nós e serviços), para transmitir valor e atribuir reputação a cada parte. Portanto, temos dois tipos de sistemas (de um ponto de vista relativamente abstrato): sistemas de pagamento e sistemas de reputação.

> Uma estratégia possível para um nó é oferecer a execução de serviços sem trocar valor no início, para aumentar sua reputação, e, quando já tiver reputação junto a outros, começar a aumentar seu custo.

> Diferentemente dos nós, a natureza dos serviços é ter custo marginal zero, o que significa que não há limite para o número de unidades simultâneas em que são executados (já que o custo de executá-los recai sobre os nós), então é bastante provável que muitos serviços comecem com custo zero para ganhar reputação, exijam um custo quando já tiverem reputação e quiserem permanecer competitivos, e voltem a custo zero quando deixarem de ser competitivos.


### Sistemas de pagamento

Os sistemas de pagamento permitem a transferência de valor entre entidades no *Celaut*. Aqui estão alguns tipos possíveis:

#### Contratos inteligentes de licença

Um sistema de contratos que permite a emissão de licenças de uso para serviços e nós, em que o Ledger é a rede na qual a verdade é acordada. Dessa forma, se A quiser executar um método de B, ele verificará seu contrato, executará o comando definido (conectando-se ao Ledger), e o contrato do Ledger emitirá uma licença, que A enviará a B para permitir a execução do método desejado.

Existem quatro tipos distintos de licenças, com base em duas classificações diferentes. Por um lado, se a licença é elástica ou estática, e por outro, se é interativa ou não interativa.

- **Licenças elásticas** são aquelas que permitem restringir seu uso com base em certos parâmetros (número de requisições, tempo, métodos, variáveis de ambiente, etc.).

- **Licenças estáticas** são aquelas que não restringem o uso. B conhece as chaves da licença, e o contrato fornece a licença sem poder limitar seu uso.

- **Licenças interativas** exigem que B se conecte ao Ledger para verificar a validade da licença fornecida.

- Licenças **não interativas** não exigem que B se conecte ao Ledger para verificar a validade da licença fornecida.

<br>

Isso resulta nos quatro tipos de licenças:

- Estática interativa (muito direta — pouco útil)
- Estática não interativa (melhor para serviços)
- Elástica interativa (melhor para nós)
- Elástica não interativa (bastante complexa — versátil)

<br>

> Os ledgers podem ser redes públicas e sem permissão, como Bitcoin ou Ergo, ou plataformas privadas fechadas, como o Stripe. O único requisito é que todos os participantes as suportem.

<br>


### Sistemas de reputação

Os sistemas de reputação permitem que usuários, nós e serviços criem um ecossistema social sobre o qual tomar decisões. Os nós precisam saber em quais pares podem confiar para solicitar a execução de serviços.
Para os usuários, que executam serviços, isso os ajuda a determinar quais serviços terão o melhor desempenho para a tarefa que desejam realizar.

No *Celaut*, a reputação é representada como registros em Ledgers, que representam uma opinião.

No caso dos serviços, sua natureza determinística oferece uma perspectiva diferente sobre sua reputação em comparação com os nós.
Uma prova de reputação (um registro) publicada há algum tempo pode ter o mesmo valor que uma atual em relação a um serviço (isso é verdadeiro quando o serviço não interage com redes, que é a forma padrão de um serviço, completamente isolado).
Se ele interagir com alguma rede, sua reputação pode depender da reputação das redes às quais se conecta, que não têm essa propriedade determinística, já que podem mudar com o tempo. Isso ocorre porque o próprio serviço não mudou.

Por outro lado, a reputação de um nó é mais valiosa quanto mais recente for, já que seu comportamento pode variar com o tempo.
Quando os nós se apresentam uns aos outros, eles mostram provas de sua reputação, e outros podem opinar de forma não consensual sobre se são mais ou menos confiáveis.

Cada nó, serviço ou outro tipo de ator em um sistema de reputação confia em várias fontes em diferentes graus, e essas fontes, por sua vez, confiam em diferentes graus em outras fontes, nós, serviços ou entidades. Assim, quando um determinado ator se depara com uma entidade desconhecida, ele verificará as opiniões de suas fontes confiáveis.

Para uma compreensão mais específica de como funciona um sistema de reputação, você pode ler: [Documentação do Sigma Reputation Panel](https://github.com/reputation-systems/sigma-reputation-panel/blob/master/README.md)

<br>


## Por que isso é necessário

O que o *Celaut* pretende resolver é precisamente a separação entre "*como resolver um problema*" e "*onde e por quem ele é resolvido*".

Tome, por exemplo, um bot de trading.

>Bots de trading são programas de software automatizados que executam ordens de compra e venda em mercados financeiros com base em algoritmos predefinidos. Eles são importantes porque podem operar 24 horas por dia, 7 dias por semana, reagir rapidamente a mudanças de mercado e remover vieses emocionais, melhorando a eficiência e a consistência das estratégias de trading.


<br>

Nesse contexto, se você quiser usar um bot de trading agora mesmo, poderá ir à internet e:

1. Procurar um serviço web que gerenciará seu portfólio de ativos, o qual tem:
    1. Vantagens:
        1. Você não precisa rodar a infraestrutura você mesmo.
        2. Você não precisa configurar nada.
    2. Desvantagens:
        1. Você não pode atribuir reputação a ele, porque o desenvolvedor do
        serviço web não consegue provar que o sistema não mudou (por exemplo,
        quando um bot ganha um grande número de usuários, ele pode reduzir
        seu desempenho para incentivar você a usar um mais novo).
        2. Os desenvolvedores do serviço web não podem garantir que não estão
        usando de forma indevida os dados de suas requisições (nesse caso,
        os movimentos do seu portfólio).
2. Procurar um código-fonte (no GitHub, etc.) que você possa rodar no seu PC (ou na nuvem) por conta própria.
    1. Vantagens:
        1. É determinístico, no sentido de que (se não conseguir se conectar à
        internet) você terá certeza de que seu comportamento e/ou desempenho não mudarão no futuro, porque o desenvolvedor não pode modificar o código-fonte que você já baixou.
        2. O desenvolvedor do serviço não tem controle sobre os dados de suas requisições.
    2. Desvantagens:
        1. Você precisa possuir equipamento (infraestrutura) capaz de rodar o código.
        2. Você tem que lidar com problemas de configuração do sistema (que muitas vezes
        são significativos o bastante para que um usuário comum opte por um serviço web).

Em contraste com essas duas opções, o *Celaut* permite obter as vantagens das duas soluções anteriores sem suas desvantagens. Eis o porquê:



- O gerenciamento de infraestrutura é desnecessário, já que os nós cuidam disso. Não há necessidade de buscar um provedor de nuvem.

- Nenhuma configuração é necessária. A especificação do serviço cobre como o contêiner é construído, sua arquitetura, seus requisitos de rede e sua interface. Os usuários não precisam se preocupar com nada disso.

- Os desenvolvedores de serviços não podem controlar, modificar ou extrair dados do serviço. Eles não controlam os nós que o distribuem e o executam. No entanto, podem ser incentivados a criá-lo.

<br>


## Comportamento do sistema

Esta seção descreve o comportamento do sistema, incluindo as interações entre as partes do sistema,
a fim de mostrar com mais clareza a natureza dessa arquitetura.

- [Execução de um serviço](execution_of_a_service.md)
- [Balanceamento de carga de serviços](service_balancer.md)
- [Node handshake]()

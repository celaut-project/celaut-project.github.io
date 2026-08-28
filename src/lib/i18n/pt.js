/*
 * Tradução em português (variante geral/brasileira). Estrutura idêntica
 * a en.js / es.js / zh.js / hi.js / ru.js / fr.js — qualquer chave
 * ausente aqui cai automaticamente para o inglês, então a página nunca
 * fica em branco.
 *
 * Princípios de tradução
 * -----------
 * • Os termos próprios da arquitetura Celaut (BOX, API, NET, nó/nodo,
 *   microVM, DePIN, Ergo etc.) permanecem sem tradução — são
 *   terminologia do próprio projeto, não palavras a traduzir.
 * • O HTML embutido no original (<strong>, <em>) é mantido como está.
 */

export default {
	common: {
		scroll: 'Role para baixo',
		toTop: '↑ Topo',
		backToTop: 'Voltar ao topo',
		gains: 'Vantagens',
		costs: 'Custos',
		visit: 'Visitar →',
		readMore: 'Saiba mais →',
		viewOnGitHub: 'Ver no GitHub →',
		languageLabel: 'Idioma',
		switchLanguage: 'Mudar de idioma'
	},

	theme: {
		toLight: 'Mudar para o tema claro',
		toDark: 'Mudar para o tema escuro',
		toggle: 'Alternar tema'
	},

	topbar: {
		nav: 'Seções do Celaut',
		links: {
			depin: { label: 'Alugue seu PC', short: 'Alugar' },
			developers: { label: 'Desenvolvedores', short: 'Devs' },
			users: { label: 'Usuários', short: 'Usuários' },
			paradigm: { label: 'Paradigma', short: 'Paradigma' }
		}
	},

	/* ============================================================== *
	 * Página inicial
	 * ============================================================== */
	home: {
		hero: {
			tagline: 'Uma arquitetura ponto a ponto para o design e a distribuição de software',
			primary: 'Comece a usar',
			secondary: 'Saiba mais',
			facts: [
				'Inspirado em autômatos celulares — um comportamento global resiliente emerge de regras locais simples.',
				'Determinístico por design: entradas idênticas sempre produzem uma saída idêntica e verificável.',
				'Nenhum registro central. Os serviços são distribuídos de ponto a ponto entre nós independentes.',
				'Cada serviço é endereçado por conteúdo — seu hash é o seu nome, então nada pode ser substituído silenciosamente.',
				'Os nós executam cada serviço lacrado dentro de seu próprio microambiente isolado.',
				'A reputação vive on-chain: a confiança é conquistada e comprovável, nunca concedida por um guardião.',
				'Três princípios, do início ao fim: descentralização, simplicidade e determinismo.'
			]
		},

		atoms: {
			eyebrow: 'As duas primitivas',
			heading: 'Nós e serviços',
			intro: 'Celaut é construído a partir de dois conceitos atômicos. Todo o resto — especificação, execução, pagamento, reputação — é a forma como eles interagem.',
			items: [
				{
					title: 'Um nó',
					body: 'Um <strong>computador ou dispositivo</strong> que conversa com seus pares e gerencia a execução de serviços. Fornece o hardware, decide se roda o trabalho localmente ou o repassa, e nunca precisa entender o que o software faz.'
				},
				{
					title: 'Um serviço',
					body: 'Um <strong>contêiner de software determinístico</strong> feito para cumprir uma única tarefa. Ele é selado em relação ao nó que o executa: o nó não inspeciona o programa, e o programa não sabe em qual máquina foi parar.'
				}
			]
		},

		index: {
			nav: 'Navegação por seção',
			title: 'Nesta página',
			open: 'Abrir menu de seções',
			close: 'Fechar menu de seções',
			sections: {
				foundations: 'Origens',
				atoms: 'Nós e serviços',
				nodes: 'Nós',
				services: 'Serviços',
				'service-spec': 'Especificação do serviço',
				execution: 'Execução',
				determinism: 'Determinismo',
				coordination: 'Coordenação',
				'user-roles': 'Qual é o seu papel?',
				'core-principles': 'Princípios fundamentais',
				'what-is-not': 'O que não é',
				implementations: 'Implementações',
				'coordination-detail': 'Incentivos',
				'service-distribution': 'Distribuição de serviços',
				applications: 'Aplicações'
			}
		},

		scenes: {
			foundations: {
				label: 'De onde isso vem',
				beats: [
					{
						h: 'Tudo começa com um punhado de regras.',
						p: 'Na década de 1940, o matemático <strong>John von Neumann</strong>, junto com <strong>Stanislaw Ulam</strong>, introduziu os autômatos celulares: modelos que mostraram como comportamentos complexos podiam emergir de regras simples.'
					},
					{
						h: 'Aqui, ninguém está no comando.',
						p: 'Em 1970, o <strong>“Jogo da Vida” de John Horton Conway</strong> se tornou o exemplo clássico: uma grade em que cada célula só olha para suas vizinhas, e ainda assim o conjunto produz uma estrutura intrincada e em evolução.'
					},
					{
						h: 'Essa é toda a filosofia de design.',
						p: 'Essas ideias mostram como sistemas descentralizados podem <strong>alcançar complexidade sem controle central</strong> — a filosofia que guia o Celaut. Regras simples no nível do nó e do serviço, com um sistema adaptativo por cima.',
						note: 'Descentralização · Simplicidade · Determinismo'
					}
				]
			},
			nodes: {
				label: 'Esta rede',
				beats: [
					{
						h: 'Ter nós não é o que faz a diferença.',
						p: 'A maioria das redes descentralizadas tem nós, e a maioria delas ainda depende de uma coisa poderosa: <strong>o protocolo que todo mundo precisa executar</strong>. As regras continuam sendo o centro, mesmo quando as máquinas não são.'
					},
					{
						h: 'O Celaut não tem protocolo algum a combinar.',
						p: 'Os nós não precisam se alinhar previamente sobre um protocolo de comunicação — eles <strong>declaram, ao entrar em contato, as interfaces que suportam e os métodos de pagamento que aceitam</strong>. Dois nós conversam apenas sobre o que têm em comum; onde não há sobreposição, simplesmente não conversam.'
					},
					{
						h: 'Assim, você muda o seu nó, não a rede inteira.',
						p: 'Uma nova política de preços, outro método de pagamento, um formato de especificação que ninguém mais interpreta ainda — você <strong>implementa isso no seu próprio nó</strong> e ele funciona com quem já o suporta. Ninguém vota, nada precisa ser migrado, e não há <strong>hard fork nenhum a sobreviver</strong>.',
						note: 'Sem protocolo compartilhado. Sem versão compartilhada. Sem permissão necessária.'
					}
				]
			},
			services: {
				label: 'O que roda nela',
				beats: [
					{
						h: 'Um serviço é um contêiner lacrado.',
						p: 'Os serviços no Celaut são <strong>contêineres de software determinísticos</strong> projetados para realizar uma tarefa específica. Nada mais elaborado do que isso.'
					},
					{
						h: 'Seguindo o princípio da caixa-preta.',
						p: 'Eles operam <strong>de forma independente dos nós que os executam</strong>, focando apenas em sua funcionalidade. O nó não precisa entender o serviço, e o serviço não precisa saber nada sobre o nó.'
					},
					{
						h: 'Isolado, sempre.',
						p: 'Cada requisição roda como um <strong>processo isolado</strong> — em um contêiner ou em uma máquina virtual, dependendo do nó —, o que abstrai o ambiente de execução e mantém intacta a barreira de segurança.',
						note: 'O que entra, o que sai. Essa é toda a interface.'
					}
				]
			},
			'service-spec': {
				label: 'Como um serviço é especificado',
				beats: [
					{
						h: '<strong>BOX</strong> — o ambiente.',
						p: 'Arquitetura, sistema de arquivos, variáveis de ambiente, ponto de entrada, configuração e recursos. Ele especifica diretamente toda a estrutura de arquivos, em vez de depender de imagens ou repositórios externos, o que é justamente o que torna a execução reproduzível em qualquer nó.'
					},
					{
						h: '<strong>API</strong> — a interface.',
						p: 'Como se comunicar com o serviço, quais sistemas de pagamento ele aceita e os custos associados. Isso permite que os serviços sejam usados sem que nenhum controlador central negocie o protocolo em nome deles.'
					},
					{
						h: '<strong>NET</strong> — o escopo de rede.',
						p: 'Por padrão, um serviço é <strong>isolado</strong>: só pode falar com seu pai, seus filhos e o nó que o executa. Se ele precisa do mundo externo, <strong>as redes às quais terá acesso são nomeadas em sua própria especificação</strong> — o nó as concede porque quer executar o serviço corretamente, e você obtém a garantia de que ele nunca poderá alcançar nenhum outro lugar.'
					},
					{
						h: 'Três componentes. Um serviço portátil.',
						p: 'Juntos, eles criam <strong>serviços portáteis e reproduzíveis</strong> que são implantados de forma consistente em toda a rede, mantendo segurança e determinismo.',
						note: 'Nenhuma dependência de terceiros. Nada fica implícito.'
					}
				]
			},
			execution: {
				label: 'Quem decide o quê',
				beats: [
					{
						h: 'Um serviço pede seus filhos.',
						p: 'Um serviço pode, através do seu nó, solicitar a execução de <strong>serviços filhos</strong>. Ele declara <strong>os recursos que cada um precisa</strong> e entrega um orçamento para que os gastem. Não uma máquina, não uma região — recursos.'
					},
					{
						h: 'O nó decide onde eles rodam.',
						p: 'Ele compara <strong>o custo de executar a instância localmente com o custo cotado por cada um dos seus pares</strong> e escolhe o que considera melhor. Um filho fica aqui; outro acaba em um par.'
					},
					{
						h: 'O pai nunca descobre.',
						p: 'Ele não sabe se um filho terminou nesta máquina ou em outra, e não precisa saber. Tudo o que observa é <strong>o que seus filhos consomem e a que velocidade estão gastando</strong>, para poder equilibrar isso.'
					},
					{
						h: 'Essa divisão é todo o truque.',
						p: 'Os operadores de nó cuidam do lado físico: hardware, capacidade, preço, posicionamento. Os desenvolvedores de serviço <strong>declaram os recursos que precisam e nada sobre infraestrutura</strong>. Nenhum dos dois precisa fazer o trabalho do outro — e é justamente isso que mantém as duas metades simples.',
						note: 'Duas preocupações distintas. Uma linha clara entre elas.'
					}
				]
			},
			determinism: {
				label: 'Por que isso se sustenta',
				beats: [
					{
						h: 'Mesma entrada. Mesma saída. Sempre.',
						p: 'Os serviços são totalmente especificados para garantir <strong>resultados reproduzíveis</strong> ao longo do tempo e entre nós. Com as mesmas entradas, eles sempre produzem as mesmas saídas, não importa onde ou quando sejam executados.'
					},
					{
						h: 'O que torna a confiança mensurável.',
						p: 'Como o software não pode mudar sozinho, uma <strong>prova de reputação registrada há muito tempo ainda diz algo verdadeiro hoje</strong> — desde que o serviço não se conecte a nenhuma rede, que é seu estado padrão.'
					},
					{
						h: 'E ele viaja para qualquer lugar.',
						p: 'Como nada no ambiente fica a cargo do host, a mesma especificação produz o mesmo comportamento em <strong>um laptop, um servidor sobressalente ou um nó do qual você nunca ouviu falar</strong>. Onde ele roda deixa de fazer parte da resposta.',
						note: 'Totalmente especificado, para que nada fique a critério da máquina.'
					}
				]
			},
			coordination: {
				label: 'Como estranhos cooperam',
				beats: [
					{
						h: 'A reputação vem primeiro.',
						p: 'Nós e serviços <strong>não confiam uns nos outros</strong> — o Celaut é um sistema sem confiança prévia. Então nada começa com um aperto de mãos; começa com uma consulta. Reputação são <strong>registros em ledgers</strong>, opiniões em vez de veredictos, e cada ator pondera as fontes em que já confia para decidir se vale a pena falar com um estranho.'
					},
					{
						h: 'Depois você paga por uma promessa de recursos.',
						p: 'Só depois que o registro se confirma é que algo se move. Quem solicita paga <strong>adiantado</strong>, e o que compra é uma promessa: <strong>tanta computação, por tanto tempo</strong>. Os mecanismos de pagamento ficam <strong>fora da arquitetura central</strong>, de modo que nenhum ledger específico é embutido nela.'
					},
					{
						h: 'A garantia do nó é a sua reputação.',
						p: 'Nada o obriga a honrar essa promessa. O que o mantém fiel é que <strong>o resultado é escrito de volta no ledger</strong> — e um nó cujo histórico diz que recebeu pagamento e entregou menos do que devia deixa de ser escolhido. Cada parte tem um interesse constante em que o próximo estranho goste do que lê.',
						note: 'Verificar · pagar · entregar · registrar. E recomeçar.'
					}
				]
			}
		},

		roles: {
			eyebrow: 'Escolha seu caminho',
			heading: 'Qual é o seu papel?',
			intro: 'Como usuários, podemos desempenhar três tipos de papéis nesse ecossistema. Cada um tem sua própria porta de entrada.',
			items: [
				{
					eyebrow: 'Papel 01',
					title: 'Operadores de nó',
					lede: 'De forma semelhante aos mineradores em sistemas blockchain, os operadores de nó fornecem recursos computacionais à rede. Eles executam os serviços solicitados pelos usuários em troca de pagamento, sem precisar entender a funcionalidade específica desses serviços.',
					points: [
						'Fornecem recursos de hardware',
						'Executam serviços sob demanda',
						'Recebem compensação pelos recursos'
					],
					primary: 'Alugue seu PC',
					secondary: 'Rodar um nó'
				},
				{
					eyebrow: 'Papel 02',
					title: 'Desenvolvedores de serviços',
					lede: 'Os desenvolvedores criam serviços que podem rodar em qualquer nó compatível da rede. Eles se concentram em construir a funcionalidade sem se preocupar com os detalhes da infraestrutura subjacente.',
					points: [
						'Projetam especificações de serviço',
						'Constroem aplicações determinísticas',
						'Distribuem serviços aos nós'
					],
					primary: 'Criar no Celaut',
					secondary: 'Explorar o Skills'
				},
				{
					eyebrow: 'Papel 03',
					title: 'Usuários de serviços',
					lede: 'Usuários finais executam serviços em nós, pagando pelos recursos computacionais utilizados.',
					points: [
						'Solicitam a execução de serviços',
						'Pagam pelos recursos computacionais',
						'Consomem os resultados do serviço'
					],
					primary: 'Usar a rede',
					secondary: 'Explorar o Skills'
				}
			]
		},

		principles: {
			eyebrow: 'As regras que ele segue',
			heading: 'Princípios fundamentais do Celaut',
			intro: 'Três compromissos dos quais toda a arquitetura deriva. Tudo o que foi dito acima — nós sem protocolo, serviços lacrados, redes declaradas — é consequência deles.',
			items: [
				{
					title: 'Descentralização',
					body: 'O Celaut elimina <strong>pontos únicos de controle ou falha</strong> ao permitir que os nós se comuniquem e se coordenem dinamicamente, sem nada no meio a quem pedir permissão.'
				},
				{
					title: 'Simplicidade',
					body: 'A arquitetura segue <strong>regras minimalistas</strong> que reduzem a complexidade, para que cada componente permaneça pequeno o suficiente para ser compreendido e mantido de forma independente.'
				},
				{
					title: 'Determinismo',
					body: 'Os serviços são totalmente especificados para garantir <strong>resultados reproduzíveis</strong> ao longo do tempo e entre nós. Com as mesmas entradas, produzem as mesmas saídas, não importa onde ou quando sejam executados.'
				}
			]
		},

		whatIsNot: {
			eyebrow: 'Equívocos comuns',
			heading: 'O que o Celaut não é',
			intro: 'Essa arquitetura se parece o suficiente com várias coisas familiares para ser confundida com elas. Vale a pena ser preciso sobre as diferenças.',
			items: [
				{
					title: 'Não é uma única rede',
					body: 'O Celaut define uma <strong>arquitetura flexível</strong>, não uma rede predeterminada. Redes predominantes podem muito bem surgir, mas o sistema suporta muitas construções ponto a ponto em vez de impor uma única.'
				},
				{
					title: 'Não é uma pilha de protocolos completa',
					body: 'Ele fornece <strong>princípios fundamentais</strong> para construir pilhas de distribuição de computação, não uma pilha completa e fechada. As implementações atuais se apoiam em componentes como gRPC ou Docker, e essas são escolhas intercambiáveis.'
				},
				{
					title: 'Não é um projeto blockchain',
					body: 'O Celaut <strong>não tem criptomoeda nativa</strong> nem DAOs. Ele incorpora tecnologias blockchain onde elas fazem sentido — registrar reputação, liquidar pagamentos entre estranhos — sem adotar o ecossistema mais amplo ao redor delas.'
				}
			]
		},

		nodes: {
			eyebrow: 'Essas máquinas',
			heading: 'Nós: a base da rede',
			intro: 'Um nó é um <strong>computador ou dispositivo</strong> que se comunica com pares e gerencia a execução de serviços. Quatro tarefas, e nenhum coordenador acima delas.',
			jobs: [
				{
					title: 'Execução de serviços',
					body: 'Ele negocia custos de execução com os pares e decide se executa um serviço localmente ou o delega, para que os recursos vão para onde são mais baratos.'
				},
				{
					title: 'Comunicação',
					body: 'Ele declara as interfaces que suporta e os métodos de pagamento que aceita ao entrar em contato, o que é o que permite que os protocolos evoluam sem acordo prévio.'
				},
				{
					title: 'Segurança',
					body: 'Ele emite e gerencia os endereços e tokens de autenticação pelos quais cada interação com um serviço é identificada.'
				},
				{
					title: 'Dependências',
					body: 'Ele garante que um serviço possa alcançar o que precisa, onde quer que essa dependência esteja rodando na rede.'
				}
			],
			implementationsHeading: 'Implementações que você já pode rodar hoje',
			implementations: [
				{
					name: 'Nodo',
					body: 'A implementação de referência, construída com Python3 e Rust — um exemplo funcional de como um nó é implantado na prática.'
				},
				{
					name: 'Chatui',
					body: 'Um nó para dispositivos Android. Ele expõe serviços por meio de interfaces de chat básicas, sem exigir confiança em nenhum outro nó.'
				}
			]
		},

		coordination: {
			eyebrow: 'O que faz estranhos cooperarem',
			heading: 'Mecanismos de coordenação',
			intro: 'Nenhum dos dois faz parte da arquitetura central, e isso é deliberado: ambos ficam fora dela, para que nenhum ledger ou moeda específicos sejam embutidos.',
			items: [
				{
					title: 'Sistemas de reputação',
					body: 'Um histórico de interações, registrado em ledgers como opiniões em vez de veredictos. É <strong>o que é consultado primeiro</strong>, antes que qualquer um se comprometa com algo.',
					points: [
						'Cada ator pondera, a seu próprio critério, as fontes em que já confia.',
						'A reputação vale a pena ser protegida, então ela se torna a garantia por trás de uma promessa.',
						'O resultado é uma autorregulação, sem nenhuma autoridade emitindo veredictos.'
					]
				},
				{
					title: 'Mecanismos de pagamento',
					body: 'Um nó é pago <strong>de antemão</strong> em troca da promessa de recursos a serem consumidos — tanta computação, por tanto tempo. Sua garantia não é uma fatura depois do fato; é <strong>a sua reputação</strong>.',
					points: [
						'O pagamento é cobrado adiantado, antes de a execução começar.',
						'A prova de pagamento é o que dá acesso aos serviços que a exigem.',
						'Um nó que recebe o pagamento e entrega menos do que prometeu perde reputação, e deixa de ser escolhido.'
					]
				}
			],
			note: 'Verificar o registro · pagar pelo direito · entregar · registrar o resultado.'
		},

		distribution: {
			eyebrow: 'Fazendo chegar ao mundo',
			heading: 'Distribuição de serviços',
			intro: 'Não há loja para publicar nem revisão para esperar. Um desenvolvedor entrega o serviço a um nó, e a rede leva daí em diante.',
			items: [
				{
					title: 'Descoberta descentralizada',
					body: 'O Celaut não tem <strong>nenhum registro central de serviços</strong>. Os serviços se espalham entre os nós de ponto a ponto, para que possam ser encontrados diretamente — e não há nenhum guardião decidindo se você tem permissão para entrar.'
				},
				{
					title: 'Integração opcional com blockchain',
					body: 'Os serviços também podem ser declarados em uma blockchain que implemente um registro — como o <strong>Sigma Reputation System</strong> na Ergo — quando visibilidade e um histórico auditável valem mais do que ficar totalmente fora da cadeia.'
				}
			]
		},

		applications: {
			eyebrow: 'Onde já está funcionando',
			heading: 'Impacto e aplicações no mundo real',
			intro: 'Essa arquitetura não é um experimento mental. Estes são os lugares onde ela está em uso hoje.',
			ours: [
				{
					name: 'DePin',
					body: 'Qualquer um pode rodar um nó Celaut e fazer parte de uma rede de infraestrutura física descentralizada. Cada nó descobre pares, executa e orquestra serviços, e gerencia suas dependências — transformando computadores comuns em computação compartilhada e resistente à censura.'
				},
				{
					name: 'Unstoppable Skills',
					body: 'Um registro totalmente on-chain e sem servidor onde os problemas são os protagonistas. Em vez de procurar serviços, os agentes buscam uma habilidade e descobrem os serviços que a cobrem, com benchmarks reais e classificação baseada em reputação. Construído sobre a Ergo e o Celaut, com incentivo nativo embutido: ninguém consegue enviar spam sem arriscar a própria reputação.'
				}
			],
			thirdPartyHeading: 'Projetos de terceiros',
			thirdPartyTag: 'não construídos por nós',
			thirdParty: {
				name: 'Game of Prompts',
				body: [
					'Uma plataforma competitiva em que criadores projetam <strong>serviços-jogo</strong> que avaliam os robôs que jogam neles, e jogadores escrevem <strong>serviços-solucionadores</strong> que tentam maximizar sua pontuação.',
					'Esses serviços seguem o paradigma Celaut, e todo o sistema usa a blockchain Ergo para registrar resultados e transferir prêmios.'
				]
			},
			ergoDocs: 'Documentação da Ergo',
			formalPaper: 'Artigo formal'
		}
	},

	/* ============================================================== *
	 * /depin — Alugue seu PC
	 * ============================================================== */
	depin: {
		meta: {
			title: 'Alugue seu PC — Celaut DePIN',
			description:
				'Venda os recursos do seu computador quando você não os estiver usando. A camada DePIN do Celaut é totalmente ponto a ponto, permite precificar a computação considerando seu custo de energia, e isola cada carga de trabalho dentro de uma microVM.'
		},
		topbarTitle: 'Alugue seu PC',
		hero: {
			eyebrow: 'Celaut DePIN',
			title: 'Alugue seu PC.',
			tagline: 'Venda os recursos do seu computador quando você não os estiver usando.',
			lede: 'Sua máquina passa a maior parte do dia ociosa. O Celaut transforma essa capacidade não utilizada em algo pelo qual as pessoas pagam — diretamente, nos seus termos, com cada carga de trabalho lacrada e isolada do seu sistema.',
			actions: ['Comece a alugar seu PC', 'Veja como funciona'],
			stats: [
				{ value: '100%', label: 'totalmente ponto a ponto — nenhuma empresa no meio' },
				{ value: 'Você', label: 'define o preço, considerando sua conta de energia' },
				{ value: 'microVM', label: 'isolamento para cada carga de trabalho que você hospeda' }
			]
		},
		scenes: {
			rent: {
				label: 'A ideia',
				beats: [
					{
						h: 'Seu PC está ocioso agora mesmo.',
						p: 'A maioria das máquinas pessoais fica sem uso na maior parte do dia. Isso é hardware de verdade — núcleos, memória, disco — sem fazer absolutamente nada.'
					},
					{
						h: 'Venda o que você não está usando.',
						p: 'O Celaut divide sua máquina em <strong>capacidade que você pode alugar</strong>. Você decide quanto vai para a rede e quanto fica com você — o resto da máquina continua funcionando exatamente como sempre funcionou.'
					},
					{
						h: 'Receba pelo trabalho que ela faz.',
						p: 'Pares que precisam de computação encontram o seu nó, negociam um preço diretamente com ele e pagam a cada execução. <strong>O pagamento é liquidado na Ergo</strong> assim que cada trabalho termina.',
						note: 'Sem data center. Sem intermediários. Sem esperar por um repasse mensal.'
					}
				]
			},
			p2p: {
				label: 'Vantagem 01',
				beats: [
					{
						h: 'Totalmente ponto a ponto.',
						p: 'Toda outra plataforma de “alugue seu hardware” coloca uma empresa no meio. Ela controla o mercado, fica com uma parte, define as regras e pode remover você da rede dela quando quiser.'
					},
					{
						h: 'Aqui, não há ninguém no meio.',
						p: 'O Celaut não tem <strong>fundação nem empresa</strong> alguma sentada entre as duas partes. Seu nó e o par que precisa de computação conversam <strong>diretamente</strong> — descoberta, negociação, execução, liquidação.'
					},
					{
						h: 'O que significa que ninguém pode te desconectar.',
						p: 'Nenhuma conta para suspender, nenhum termo que mude sem o seu conhecimento, nenhuma taxa que cresça silenciosamente. A interação é <strong>totalmente ponto a ponto</strong>, então a única coisa da qual cada lado depende é o outro lado.',
						note: 'Nada para se cadastrar. Nada de onde você possa ser removido.'
					}
				]
			},
			electricity: {
				label: 'Vantagem 02',
				beats: [
					{
						h: 'Computação não é de graça.',
						p: 'Manter sua máquina ligada custa energia, e esse custo não é fixo — ele muda ao longo do dia e varia conforme onde você mora.'
					},
					{
						h: 'Considere isso no preço.',
						p: 'O Celaut permite que você <strong>inclua opcionalmente o custo de energia</strong> no preço que define para sua computação. Seu nó precifica o trabalho levando em conta sua conta de luz, para que alugar capacidade nunca lhe custe dinheiro sem que você perceba.'
					},
					{
						h: 'E decida quando você está disponível.',
						p: '<strong>Disponibilidade e tempo de execução também são definidos por você.</strong> Alugue a máquina apenas à noite, quando a energia é mais barata, limite a duração máxima de um único trabalho, ou fique completamente offline — a rede simplesmente encontra outro caminho.',
						note: 'Suas tarifas. Seus horários. Sua margem.'
					}
				]
			},
			isolation: {
				label: 'Vantagem 03',
				beats: [
					{
						h: 'O código de quem está rodando no meu PC?',
						p: 'É a primeira pergunta que qualquer pessoa sensata faz. Alugar sua máquina não pode significar entregar as chaves dela a estranhos.'
					},
					{
						h: 'Isolamento total de execução.',
						p: 'Cada carga de trabalho roda lacrada dentro de sua própria <strong>microVM</strong> — uma máquina virtual de verdade, com seu próprio kernel e uma fronteira imposta por hardware, e não um contêiner com kernel compartilhado. Ela não consegue ver seus arquivos, sua rede, nem nenhuma outra carga de trabalho na máquina.'
					},
					{
						h: 'A mesma tecnologia usada pelas grandes nuvens.',
						p: 'microVMs são o que os <strong>grandes provedores de nuvem</strong> usam para executar código não confiável de milhões de estranhos em hardware compartilhado. O Celaut traz esse mesmo modelo de isolamento para a sua mesa — essa garantia não é uma promessa, é a arquitetura.',
						note: 'O trabalho termina, a VM é destruída. Nada persiste.'
					}
				]
			}
		},
		payoff: {
			heading: 'O que você realmente ganha',
			items: [
				{
					title: 'Hardware ocioso, trabalhando',
					body: 'A máquina de jogos dormindo às 3 da manhã, a estação de trabalho ociosa no fim de semana, um equipamento sobressalente em um armário. Se ele consegue rodar o nodo, ele consegue render.'
				},
				{
					title: 'Você define os termos',
					body: 'Preço por unidade de computação, quais horários você está disponível, quanto da máquina está disposto a ceder. Tudo isso é seu para mudar.'
				},
				{
					title: 'Pago adiantado',
					body: 'Um nó é pago de antemão por uma promessa de recursos — na Ergo (ERG), sem faturas, sem cronograma de pagamento de plataforma, sem limite mínimo. A reputação é a garantia de que ele vai entregar.'
				},
				{
					title: 'Nada em que confiar',
					body: 'Os serviços são endereçados por conteúdo: quem solicita recebe exatamente o software que pediu, e você o executa sem precisar inspecioná-lo ou responder por ele.'
				},
				{
					title: 'Seus arquivos continuam seus',
					body: 'Cada carga de trabalho vive em sua própria microVM com seu próprio kernel. Ela nunca vê seu disco, sua rede, nem nada mais na máquina.'
				},
				{
					title: 'Saia quando quiser',
					body: 'Pare o nó e a rede encontra um caminho ao seu redor. Não há contrato, não há vínculo, e não há ninguém a quem pedir permissão.'
				}
			]
		},
		steps: {
			heading: 'Da instalação à renda',
			items: [
				{
					title: 'Instale o nodo',
					body: 'Um comando no Linux, um instalador no Windows. Sua máquina entra na rede e começa a descobrir pares.'
				},
				{
					title: 'Defina seu preço e horários',
					body: 'Informe ao nó quanto custa a sua computação — incluindo energia, se você quiser considerá-la — e quando ela está disponível.'
				},
				{
					title: 'Aceite trabalhos',
					body: 'Os pares negociam diretamente com o seu nó. As cargas de trabalho aceitas rodam lacradas dentro de uma microVM, isoladas de tudo o mais.'
				},
				{
					title: 'Receba o pagamento',
					body: 'O pagamento é cobrado adiantado na Ergo; a reputação é registrada à medida que o trabalho é honrado. A contribuição é recompensada; os resultados continuam auditáveis.'
				}
			]
		},
		roles: {
			heading: 'O outro lado da troca',
			intro: 'Alugar seu PC é metade da rede. A outra metade é poder <em>usá-la</em> — e as mesmas propriedades que protegem você como anfitrião são o que torna essa rede digna de se comprar.',
			items: [
				{
					title: 'Desenvolvedores',
					body: 'Publique um programa uma única vez, como um serviço lacrado e endereçado por conteúdo, e deixe a rede hospedá-lo, descobri-lo e escaloná-lo. A reprodutibilidade vem do design, não do SLA de um provedor.',
					link: 'Para desenvolvedores →'
				},
				{
					title: 'Agentes e usuários',
					body: 'Solicite serviços pelo problema que eles resolvem e pague a cada execução. Sem conta na nuvem, sem vínculo — e o lacre prova que você recebeu exatamente o software que pediu.',
					link: 'Para usuários finais →'
				},
				{
					title: 'Anfitriões',
					body: 'Esse é você. Contribua com qualquer hardware que tenha; a camada de virtualização do nó garante que as cargas de trabalho encontrem onde encaixar, mesmo entre arquiteturas de processador diferentes.'
				}
			]
		},
		cta: {
			heading: 'Ligue sua máquina ociosa.',
			body: 'Instalar um nó leva apenas um comando. É a forma mais rápida de descobrir quanto vale o seu hardware quando ele não está fazendo mais nada.',
			actions: ['Rodar um nó', 'Ler o paradigma']
		}
	},

	/* ============================================================== *
	 * /developers — Construa uma vez
	 * ============================================================== */
	developers: {
		meta: {
			title: 'Para desenvolvedores — construa uma vez, rode em qualquer lugar | Celaut',
			description:
				'Crie serviços Celaut: defina um BOX, uma API e um escopo NET, entregue-os a um nó, e deixe a rede distribuir e executar tudo. Sem infraestrutura, sem configuração, sem plataforma no meio.'
		},
		topbarTitle: 'Para desenvolvedores',
		hero: {
			eyebrow: 'Desenvolvedores de serviços',
			title: 'Construa uma vez.',
			tagline: 'Depois pare de pensar em onde isso roda.',
			lede: 'Um serviço Celaut não é uma implantação — é uma especificação. Descreva o ambiente, a interface e o escopo de rede, entregue-o a um único nó, e a rede assume a partir daí.',
			actions: ['Explorar o Skills', 'Veja como funciona'],
			stats: [
				{ value: 'BOX · API · NET', label: 'três componentes — essa é toda a especificação' },
				{ value: 'Sem DevOps', label: 'os nós cuidam da execução; nenhuma conta na nuvem a abrir' },
				{ value: 'Determinístico', label: 'mesmas entradas, mesmas saídas, em qualquer nó, a qualquer momento' }
			]
		},
		scenes: {
			spec: {
				label: 'A ideia',
				beats: [
					{
						h: 'Você não implanta. Você especifica.',
						p: 'Não há servidor para provisionar, nenhuma imagem para publicar, nenhum pipeline para manter verde. Um serviço no Celaut é uma descrição escrita do que ele precisa para rodar.'
					},
					{
						h: 'Três componentes. Isso é tudo.',
						p: '<strong>BOX</strong> descreve o ambiente de execução — arquitetura, sistema de arquivos, variáveis de ambiente, ponto de entrada, configuração. Ele especifica diretamente toda a estrutura de arquivos, em vez de apontar para uma imagem externa, o que é justamente o que mantém a execução reproduzível.'
					},
					{
						h: 'E como o mundo chega até ele.',
						p: '<strong>API</strong> define como clientes e outros serviços falam com ele, além dos métodos de pagamento aceitos e custos. <strong>NET</strong> nomeia as redes externas que ele vai alcançar — por padrão um serviço é isolado, e qualquer coisa além disso é declarada na própria especificação, para que os usuários saibam de antemão até onde ele pode ir.',
						note: 'Portátil, reproduzível, livre de dependências de terceiros.'
					}
				]
			},
			agnostic: {
				label: 'Vantagem 01',
				beats: [
					{
						h: 'Não importa o que você escreveu, ele é entregue da mesma forma.',
						p: 'O Celaut não pede que você adote um framework, um runtime ou um SDK. Ele pede um sistema de arquivos e um ponto de entrada.'
					},
					{
						h: 'O nó também não se importa.',
						p: 'Os serviços seguem o <strong>princípio da caixa-preta</strong>: operam de forma independente dos detalhes dos nós que os executam, e os nós os executam sem precisar entender o que fazem.'
					},
					{
						h: 'Assim, qualquer nó compatível vai aceitá-lo.',
						p: 'O BOX declara a microarquitetura que ele visa, então os nós sabem se são compatíveis. Além disso, <strong>seu serviço pode ser executado por qualquer pessoa em qualquer nó compatível</strong> — esse é todo o contrato.',
						note: 'Sem aprisionamento, porque não há nada em que ficar preso.'
					}
				]
			},
			distribute: {
				label: 'Vantagem 02',
				beats: [
					{
						h: 'Entregue-o a um nó.',
						p: 'Você não publica em uma loja e não espera por revisão. O desenvolvedor só precisa <strong>enviar o serviço a um ou mais nós</strong>.'
					},
					{
						h: 'A partir daí, a rede leva adiante.',
						p: 'Esses nós cuidam de <strong>distribuir o serviço entre outros</strong>. Não existe registro central de serviços — os serviços se espalham de ponto a ponto, então não há ponto único de falha nem guardião decidindo se você pode entrar.'
					},
					{
						h: 'Descobrível, se você quiser.',
						p: 'Os nós também podem <strong>enviar o serviço a um sistema de reputação</strong>, para que usuários e outros serviços possam julgar se e quando usá-lo. Os serviços podem ser declarados em um registro em blockchain — como o <strong>Sigma Reputation System</strong> na Ergo — para melhorar visibilidade e confiança.',
						note: 'Nada para se cadastrar. Ninguém ficando com uma comissão.'
					}
				]
			},
			compose: {
				label: 'Vantagem 03',
				beats: [
					{
						h: 'Serviços que chamam serviços.',
						p: 'Um serviço pode, através do nó que o executa, solicitar a execução de outros serviços — seus <strong>serviços filhos</strong>. Fluxos de trabalho complexos são construídos por composição, não por configuração de orquestração.'
					},
					{
						h: 'O nó decide onde eles pousam.',
						p: 'Os nós gerenciam instâncias de serviço e decidem se as executam localmente ou distribuem a carga entre os pares. As dependências são um problema que o nó resolve — ele garante que os serviços consigam alcançar o que precisam em toda a rede.'
					},
					{
						h: 'E você nunca descobre onde.',
						p: '<strong>O serviço pai não sabe onde suas dependências são executadas.</strong> Cada filho apenas declara os recursos que precisa. Você escreve a composição; a rede resolve o posicionamento.',
						note: 'Nenhum agendador para configurar. Nenhuma topologia para manter.'
					}
				]
			}
		},
		payoff: {
			heading: 'O que essa arquitetura dá a você',
			items: [
				{
					title: 'Especifique, não implante',
					body: 'Um serviço é um BOX (arquitetura, sistema de arquivos, ambiente, ponto de entrada, configuração), uma API e um escopo NET. Escreva isso e pronto — não há etapa de implantação da qual você precise se responsabilizar.'
				},
				{
					title: 'Autocontido por construção',
					body: 'O BOX descreve toda a estrutura de arquivos que o serviço precisa, em vez de apontar para imagens ou repositórios externos. Nenhum registro de terceiros pode sumir debaixo dos seus pés.'
				},
				{
					title: 'Uma caixa-preta, de propósito',
					body: 'Os serviços operam de forma independente dos nós que os executam. Você nunca escreve código voltado ao ambiente de um nó, porque nunca lhe dizem qual é esse ambiente.'
				},
				{
					title: 'Reproduzível, não “melhor esforço”',
					body: 'Com as mesmas entradas, um serviço sempre produz as mesmas saídas, não importa onde ou quando seja executado. Aqui o determinismo é uma propriedade arquitetural, não a promessa de um provedor.'
				},
				{
					title: 'Composição sem orquestração',
					body: 'Um serviço pode, através do seu nó, solicitar a execução de serviços filhos. O pai não sabe onde eles rodam; cada um apenas declara os recursos de que precisa.'
				},
				{
					title: 'Reputação que se acumula',
					body: 'Como um serviço é determinístico e isolado por padrão, uma prova de reputação registrada há muito tempo ainda diz algo verdadeiro sobre ele hoje.'
				}
			]
		},
		steps: {
			heading: 'Do código até rodar na rede',
			items: [
				{
					title: 'Escreva o serviço',
					body: 'Qualquer linguagem, qualquer stack. O que importa é o sistema de arquivos de que ele precisa e o comando que o inicia — não o framework que você escolheu.'
				},
				{
					title: 'Especifique BOX, API e NET',
					body: 'Declare o ambiente, como quem chama o serviço fala com ele e qual acesso à rede externa ele deveria poder solicitar, se algum.'
				},
				{
					title: 'Envie-o a um nó',
					body: 'Um nó já é suficiente. Ele distribui o serviço a outros e pode publicá-lo em um sistema de reputação para que usuários e outros serviços possam encontrá-lo.'
				},
				{
					title: 'Deixe a rede executá-lo',
					body: 'Os nós negociam o custo e decidem onde cada instância é executada. Você não está no ciclo, e não tem infraestrutura nenhuma para manter viva.'
				}
			]
		},
		tradeoffs: {
			heading: 'A troca que você realmente está fazendo',
			intro: 'Hoje, publicar software significa escolher entre hospedá-lo você mesmo ou pedir que as pessoas o rodem por conta própria. As duas opções custam algo. A afirmação do Celaut é estreita e específica: ele pega as vantagens de cada uma sem suas desvantagens — ao custo do seu controle sobre o serviço em execução.',
			items: [
				{
					label: 'Um serviço web hospedado',
					good: 'Os usuários não precisam de infraestrutura nem de configuração.',
					bad: 'Você não consegue provar que o sistema não mudou, e os usuários precisam confiar na sua palavra de que os dados das requisições deles não estão sendo mal utilizados.'
				},
				{
					label: 'Código-fonte que eles mesmos rodam',
					good: 'Determinístico — depois de baixado, você não pode alterá-lo sem que eles percebam — e os dados das requisições deles nunca chegam até você.',
					bad: 'Eles precisam de hardware capaz e têm que sobreviver à configuração, que é onde a maioria das pessoas desiste.'
				},
				{
					label: 'Um serviço Celaut',
					good: 'Nenhuma infraestrutura para gerenciar e nada para configurar, porque a especificação já cobre o contêiner, a arquitetura, as necessidades de rede e a interface.',
					bad: 'Você abre mão do controle: não pode modificar, limitar ou extrair dados de um serviço uma vez que ele está lá fora. É exatamente esse o ponto.',
					highlight: true
				}
			]
		},
		roles: {
			heading: 'O resto da rede',
			intro: 'Seu serviço precisa de um lugar para rodar e de alguém para quem rodar. Ambos também são pessoas.',
			items: [
				{
					title: 'Operadores de nó',
					body: 'Eles fornecem o hardware e executam o que for solicitado, sem precisar entender o que o seu serviço faz, em troca de pagamento.',
					link: 'Alugue seu PC →'
				},
				{
					title: 'Usuários finais',
					body: 'Eles executam serviços em nós e pagam pelos recursos computacionais utilizados — e podem verificar que o que rodou é exatamente o que a especificação descrevia.',
					link: 'Para usuários finais →'
				},
				{
					title: 'O paradigma',
					body: 'A arquitetura completa: nós, serviços, especificação, coordenação por meio de sistemas de reputação e pagamento, e por que tudo isso é necessário.',
					link: 'Ler o artigo →'
				}
			]
		},
		cta: {
			heading: 'Comece pelos problemas.',
			body: 'O Unstoppable Skills é um registro onde os problemas são os protagonistas: busque uma habilidade e encontre os serviços que a cobrem, seus benchmarks e sua reputação. É o caminho mais curto entre “o que eu deveria construir” e “quem precisa disso”.',
			actions: ['Explorar o Skills', 'Ler o paradigma']
		}
	},

	/* ============================================================== *
	 * /users — Execute, pague pelo que foi usado
	 * ============================================================== */
	users: {
		meta: {
			title: 'Para usuários finais — execute, pague pelo que foi usado | Celaut',
			description:
				'Execute serviços em nós Celaut e pague apenas pelos recursos computacionais utilizados. Sem contas, sem assinaturas, sem plataforma no meio — os serviços rodam de forma isolada e determinística, então você recebe exatamente o que a especificação descreve.'
		},
		topbarTitle: 'Para usuários finais',
		hero: {
			eyebrow: 'Usuários de serviços',
			title: 'Execute.',
			tagline: 'Pague pelo que foi usado. Nada mais.',
			lede: 'Execute um serviço em um nó, obtenha o resultado, pague pela computação que ele consumiu. Não há conta para criar, nenhuma assinatura para cancelar, e nenhuma empresa sentada entre você e a máquina que fez o trabalho.',
			actions: ['Explorar o Skills', 'Veja como funciona'],
			stats: [
				{ value: 'Sem conta', label: 'nada para se cadastrar, nada de onde você possa ser bloqueado' },
				{ value: 'Por execução', label: 'você paga apenas pelos recursos computacionais realmente usados' },
				{ value: 'Isolado', label: 'os serviços rodam lacrados e não veem nada que não lhes foi dado' }
			]
		},
		scenes: {
			ask: {
				label: 'A ideia',
				beats: [
					{
						h: 'Pergunte à rede, não a uma empresa.',
						p: 'Você quer que algo seja feito — rodar um modelo, analisar uma sequência, fazer um bot operar, processar um arquivo. Hoje isso significa escolher um provedor e abrir uma conta com ele.'
					},
					{
						h: 'Os nós respondem diretamente.',
						p: 'O Celaut não tem <strong>nenhum registro central de serviços</strong>. Os serviços são distribuídos entre nós de ponto a ponto, e os nós declaram suas interfaces suportadas e os <strong>métodos de pagamento aceitos</strong> ao entrar em contato — então nada precisa ser combinado com ninguém antecipadamente.'
					},
					{
						h: 'Você lida com a máquina que faz o trabalho.',
						p: 'Seu nó negocia o custo de execução com um par, e o trabalho acontece. Não há <strong>plataforma nenhuma no meio</strong> tirando uma parte, definindo as regras, ou capaz de remover você de uma rede que você nunca entrou.',
						note: 'Sem cadastro. Sem assinatura. Sem intermediário.'
					}
				]
			},
			proof: {
				label: 'Vantagem 01',
				beats: [
					{
						h: 'Como você sabe o que realmente rodou?',
						p: 'Com um serviço hospedado, você não sabe. O operador não consegue provar que o sistema não mudou — então, quando uma ferramenta fica popular, nada impede que seu desempenho caia silenciosamente para te empurrar em direção a uma mais nova.'
					},
					{
						h: 'Aqui, o serviço <em>é</em> a sua especificação.',
						p: 'Um serviço especifica todo o seu ambiente — arquitetura, sistema de arquivos, ponto de entrada, configuração. Mude qualquer coisa nele e passa a ser <strong>um serviço diferente</strong>, não uma atualização silenciosa daquele que você estava usando.'
					},
					{
						h: 'Então o resultado é reproduzível.',
						p: 'Com as mesmas entradas, um serviço <strong>sempre produz as mesmas saídas</strong>, não importa qual nó o execute ou quando. É isso que faz um registro de reputação de meses atrás ainda valer alguma coisa hoje.',
						note: 'O determinismo é a garantia. Não uma promessa — o design em si.'
					}
				]
			},
			sealed: {
				label: 'Vantagem 02',
				beats: [
					{
						h: 'Sua requisição não é assunto de mais ninguém.',
						p: 'Quando você envia uma carga de trabalho para algum lugar, a pergunta honesta é: quem mais consegue vê-la pelo caminho.'
					},
					{
						h: 'Toda execução é isolada.',
						p: 'O nó executa o serviço como uma <strong>instância isolada</strong> — um contêiner ou uma máquina virtual. Por padrão, um serviço está completamente cortado das redes externas, podendo falar apenas com seu pai, seus filhos e o nó que o executa.'
					},
					{
						h: 'E o desenvolvedor não está do outro lado.',
						p: '<strong>Os desenvolvedores de serviço não conseguem controlar, modificar ou extrair dados de um serviço</strong>, porque não controlam os nós que o distribuem e o executam. Qualquer acesso de rede mais amplo precisa ser declarado na especificação, abertamente, antes mesmo de você executá-lo.',
						note: 'Isolado por padrão. O acesso é solicitado, nunca presumido.'
					}
				]
			},
			pay: {
				label: 'Vantagem 03',
				beats: [
					{
						h: 'Você paga antes de rodar. Ponto final.',
						p: 'Os usuários executam serviços em nós e <strong>pagam adiantado por uma promessa de recursos</strong>. Essa é toda a relação comercial.'
					},
					{
						h: 'Nada se acumula enquanto você está inativo.',
						p: 'Não há assento, nem plano, nem piso mensal. O pagamento é cobrado <strong>de antemão</strong> em troca dos recursos a serem consumidos; a prova de pagamento libera o acesso. A garantia do nó é a sua reputação, não uma conta no final.'
					},
					{
						h: 'Precificado por um mercado, não por uma página de preços.',
						p: 'Os nós definem seus próprios custos e competem por eles, e <strong>os serviços têm custo marginal zero</strong> — o custo de executar um recai sobre o nó —, então muitos começam de graça para construir reputação. Os sistemas de pagamento ficam fora da arquitetura central, então qual ledger faz a liquidação também não é fixo.',
						note: 'Pague por execução. Saia quando quiser. Nada para cancelar.'
					}
				]
			}
		},
		payoff: {
			heading: 'O que você realmente ganha',
			items: [
				{
					title: 'Nenhuma infraestrutura para gerenciar',
					body: 'Os nós cuidam disso. Não há provedor de nuvem para escolher, nenhuma máquina para manter viva, e nada para deixar rodando entre um uso e outro.'
				},
				{
					title: 'Nenhuma configuração',
					body: 'A especificação do serviço já cobre como o contêiner é construído, a arquitetura de que ele precisa, seus requisitos de rede e sua interface. Nada disso é seu para resolver.'
				},
				{
					title: 'O desenvolvedor não tem alcance',
					body: 'Os desenvolvedores de serviço não conseguem controlar, modificar ou extrair dados de um serviço — eles não controlam os nós que o distribuem e o executam.'
				},
				{
					title: 'Ele não pode mudar sem você perceber',
					body: 'Um serviço é determinístico: as mesmas entradas produzem as mesmas saídas, não importa quando ou onde seja executado. Ninguém pode degradá-lo silenciosamente para te empurrar para um mais novo.'
				},
				{
					title: 'Julgado pela reputação, não por classificação',
					body: 'A reputação vive como registros em um ledger, e cada participante pondera as fontes em que confia. Não há página inicial editorial decidindo o que você vê.'
				},
				{
					title: 'Nada de onde você possa ser removido',
					body: 'A descoberta é ponto a ponto, sem registro central, então não há conta para suspender nem anúncio para retirar.'
				}
			]
		},
		steps: {
			heading: 'De “eu preciso que isso seja feito” até um resultado',
			items: [
				{
					title: 'Encontre o serviço',
					body: 'Busque pelo problema que você quer resolver. Os nós descobrem serviços de ponto a ponto, e registros como o Unstoppable Skills mapeiam problemas aos serviços que os cobrem.'
				},
				{
					title: 'Solicite uma execução',
					body: 'Seu nó fala diretamente com um par capaz de executá-lo. Interfaces e métodos de pagamento aceitos são declarados ao entrar em contato, então nada precisa ser combinado antecipadamente.'
				},
				{
					title: 'Ele roda, lacrado',
					body: 'O nó executa o serviço como uma instância isolada — um contêiner ou uma máquina virtual — sem nenhum acesso além do que a especificação pedia.'
				},
				{
					title: 'Pague adiantado',
					body: 'Um nó é pago de antemão por uma promessa de recursos, com a prova de pagamento liberando o acesso. A reputação é a garantia. Sem assinatura, sem mínimo, sem conta permanente.'
				}
			]
		},
		tradeoffs: {
			heading: 'Contra as duas opções que você tem hoje',
			intro: 'Tome um bot de trading como exemplo. Agora mesmo, você ou entrega seu portfólio a um serviço web, ou encontra o código-fonte e o roda você mesmo. Cada escolha te dá uma coisa e te custa outra.',
			items: [
				{
					label: 'Usar um serviço web',
					good: 'Você não roda nenhuma infraestrutura e não configura nada.',
					bad: 'Você não consegue atribuir reputação a ele, porque o operador não consegue provar que o sistema não mudou — e não consegue te garantir que os dados das suas requisições não estão sendo mal utilizados.'
				},
				{
					label: 'Rodar o código-fonte você mesmo',
					good: 'É determinístico, e o desenvolvedor não tem controle nenhum sobre os dados das suas requisições.',
					bad: 'Você precisa de hardware capaz de rodá-lo e tem que lidar com a configuração — que costuma ser onde as pessoas desistem e voltam para a primeira opção.'
				},
				{
					label: 'Usar um serviço Celaut',
					good: 'Nenhuma infraestrutura, nenhuma configuração, e o desenvolvedor ainda assim não consegue controlar, modificar ou extrair dados do serviço.',
					bad: 'Você paga por execução, e depende de a rede ter um nó disposto a executá-lo por um preço que você aceite.',
					highlight: true
				}
			]
		},
		roles: {
			heading: 'As outras pessoas na rede',
			intro: 'Alguém escreveu o serviço e a máquina de alguém o executa. Os dois papéis também estão abertos para você.',
			items: [
				{
					title: 'Operadores de nó',
					body: 'Eles fornecem o hardware que executa o que você solicita, em troca de pagamento — sem precisar saber o que o serviço faz.',
					link: 'Tem hardware sobrando? →'
				},
				{
					title: 'Desenvolvedores de serviços',
					body: 'Eles escrevem serviços que qualquer nó compatível pode executar, e os entregam à rede em vez de hospedá-los.',
					link: 'Para desenvolvedores →'
				},
				{
					title: 'O paradigma',
					body: 'Nós, serviços, especificação, e os sistemas de reputação e pagamento que permitem que partes que não confiam umas nas outras ainda assim cooperem.',
					link: 'Ler o artigo →'
				}
			]
		},
		cta: {
			heading: 'Comece pelo problema que você tem.',
			body: 'O Unstoppable Skills é um registro totalmente on-chain e sem servidor, onde os próprios problemas são os protagonistas. Busque uma habilidade e encontre os serviços que a cobrem, benchmarks comparativos reais, discussões e classificação baseada em reputação.',
			actions: ['Explorar o Skills', 'Alugar seu PC em vez disso']
		}
	},

	/* ============================================================== *
	 * /install
	 * ============================================================== */
	install: {
		meta: {
			title: 'Instalar o Nodo — Celaut',
			description: 'Instale um nó Celaut (nodo) no Linux, Windows ou macOS.'
		},
		topbarTitle: 'Instalar o nodo',
		heading: 'Rode um nó Celaut',
		subtitle:
			'Instale o <strong>nodo</strong> e entre na rede descentralizada — descubra pares, execute e orquestre serviços, e transforme sua máquina em computação compartilhada e resistente à censura.',
		tabs: { linux: 'Linux', windows: 'Windows', mac: 'macOS' },
		copy: 'Copiar',
		copied: 'Copiado ✓',
		linux: {
			heading: 'Linux',
			intro: 'Instalação básica — execute isto no seu terminal:',
			notes: [
				'O script precisa de <code>sudo</code> para a configuração em nível de sistema. Os runtimes de Python, Java e <code>yq</code> são instalados localmente dentro do diretório principal do nó.',
				'Prefere uma instalação manual, sem sudo? Siga o {link}.'
			],
			manualLink: 'guia manual'
		},
		windows: {
			heading: 'Windows 11',
			intro: 'Baixe e execute o instalador oficial:',
			download: 'Baixar Nodo-Setup.exe',
			notes: [
				'O instalador cria automaticamente uma distribuição Linux isolada dedicada ao Nodo, para que o nó rode separado do resto do seu sistema.',
				'Nenhuma configuração manual de ambiente Linux é necessária.'
			]
		},
		mac: {
			heading: 'macOS',
			intro: 'Um instalador nativo para macOS <strong>ainda não está disponível</strong>.',
			notes: [
				'O suporte a macOS está planejado. Por enquanto, você pode rodar um nó em uma máquina Linux ou em uma VM Linux.',
				'Siga o {link} para atualizações.'
			],
			repoLink: 'repositório do nodo'
		}
	},

	/* ============================================================== *
	 * /paradigm
	 * ============================================================== */
	paradigm: {
		meta: {
			title: 'Celaut — Artigo formal',
			description:
				'Celaut: uma arquitetura ponto a ponto para o design e a distribuição de software — o artigo formal.'
		},
		topbarTitle: 'Artigo formal',
		toc: 'Índice',
		tocNav: 'Sumário',
		systemBehaviorHeading: 'Comportamento do sistema',
		executionHeading: 'Execução de um serviço',
		balancerHeading: 'Balanceamento de carga de serviços'
	},

	/* ============================================================== *
	 * Palavras exibidas nas cenas <canvas>.
	 * Mantidas curtas de propósito — são rótulos, não frases, e seu
	 * layout é posicionado manualmente.
	 * ============================================================== */
	viz: {
		home: {
			generation: 'geração {n}',
			lifeRule: '2 ou 3 vizinhas: viva · exatamente 3: nasce',
			oneProtocol: 'um protocolo que todo mundo precisa executar',
			networkSplits: 'mude as regras e a rede se divide',
			whereOverlap: 'conversam onde há coincidência',
			noVote: 'sem votação · sem migração · sem fork',
			blackBox: 'caixa-preta',
			input: 'entrada',
			output: 'saída',
			box: 'BOX',
			environment: 'ambiente',
			api: 'API',
			interface: 'interface',
			netDeclared: 'NET · declarado na especificação',
			nowhereElse: 'e nenhum outro lugar',
			itsNodeItsParent: 'seu nó · seu pai',
			aService: 'um serviço',
			children: 'filhos',
			whatTheySpend: 'o que gastam, não onde estão',
			developersShort: 'desenvolvedores · o que ele precisa',
			developersLong: 'desenvolvedores · o que ele precisa, o que gasta',
			operatorsShort: 'operadores · onde roda',
			operatorsLong: 'operadores · onde roda, quanto custa',
			thisNode: 'este nó',
			aPeer: 'um par',
			cost: 'custo {value}',
			oneInput: 'uma entrada',
			when: ['agora', 'daqui a um ano', 'em outro hardware'],
			identicalEveryTime: 'idêntico, todas as vezes',
			reputationLedger: 'reputação · registros em um ledger',
			sourcesYouTrust: 'as fontes em que você confia',
			firstWhatSources: 'primeiro: o que dizem as minhas fontes?',
			rightShort: '2 vCPU · 30 min',
			rightLong: 'direito a 2 vCPU · 30 min',
			paymentRights: 'pagamento ⇄ direitos sobre recursos',
			outcomeRecorded: 'o resultado entra no seu registro',
			nextStranger: 'e é isso que o próximo estranho vai ler',
			requester: 'solicitante',
			node: 'nó'
		},
		developers: {
			box: 'BOX',
			api: 'API',
			net: 'NET',
			service: 'serviço',
			anyCompatibleNode: 'qualquer nó compatível',
			optionalRegistry: 'registro de reputação opcional',
			yourService: 'seu serviço',
			itsNode: 'seu nó',
			neverFindOut: 'você nunca vai descobrir onde'
		},
		users: {
			you: 'você',
			noAccount: 'sem conta',
			whatYouAsked: 'o que você pediu',
			whatNodeRuns: 'o que o nó executa',
			identicalItRuns: 'idêntico — está rodando',
			microvm: 'microVM',
			destroyed: 'destruída',
			theDeveloper: 'o desenvolvedor',
			theHostMachine: 'a máquina host',
			computeUsed: 'a computação que você realmente usou',
			whatYouPay: 'o que você paga',
			chargingStops: 'o trabalho termina — a cobrança para',
			subscription: 'uma assinatura, que cobra independentemente disso'
		},
		depin: {
			electricityCost: 'seu custo de energia',
			priceYouSet: 'o preço que você define',
			availableWindow: 'disponível 22h – 7h',
			marginCovered: 'margem coberta'
		}
	}
};

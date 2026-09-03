/*
 * Traduction française. Structure identique à en.js / es.js / zh.js /
 * hi.js / ru.js — toute clé absente ici retombe automatiquement sur
 * l'anglais, la page ne reste donc jamais vide.
 *
 * Principes de traduction
 * -----------
 * • Le vocabulaire propre à l'architecture Celaut (BOX, API, NET,
 *   nœud/nodo, microVM, DePIN, Ergo, etc.) reste inchangé — ce sont des
 *   termes du projet, pas des mots à traduire.
 * • Le HTML en ligne présent dans l'original (<strong>, <em>) est
 *   conservé tel quel.
 */

export default {
	common: {
		scroll: 'Faites défiler',
		toTop: '↑ Haut de page',
		backToTop: 'Retour en haut',
		gains: 'Avantages',
		costs: 'Inconvénients',
		visit: 'Visiter →',
		readMore: 'En savoir plus →',
		viewOnGitHub: 'Voir sur GitHub →',
		languageLabel: 'Langue',
		switchLanguage: 'Changer de langue',
		toc: {
			nav: 'Navigation par section',
			title: 'Sur cette page',
			open: 'Ouvrir le menu des sections',
			close: 'Fermer le menu des sections'
		}
	},
	theme: {
		toLight: 'Passer au thème clair',
		toDark: 'Passer au thème sombre',
		toggle: 'Changer de thème'
	},
	topbar: {
		nav: 'Sections de Celaut',
		links: {
			depin: {
				label: 'Louez votre PC',
				short: 'Louer'
			},
			developers: {
				label: 'Développeurs',
				short: 'Dévs'
			},
			users: {
				label: 'Utilisateurs',
				short: 'Utilis.'
			},
			paradigm: {
				label: 'Paradigme',
				short: 'Paradigme'
			}
		}
	},
	home: {
		hero: {
			tagline: 'Une architecture pair-à-pair pour la conception et la distribution de logiciels',
			primary: 'Commencer à l’utiliser',
			secondary: 'En savoir plus',
			facts: [
				'Inspiré des automates cellulaires — un comportement global résilient émerge de règles locales simples.',
				'Déterministe par conception : des entrées identiques produisent toujours une sortie identique et vérifiable.',
				'Aucun registre central. Les services sont distribués de pair à pair entre des nœuds indépendants.',
				'Chaque service est adressé par son contenu — son hachage est son nom, rien ne peut donc être substitué en silence.',
				'Les nœuds exécutent chaque service scellé dans son propre micro-environnement isolé.',
				'La réputation vit sur la chaîne : la confiance se gagne et se prouve, elle n’est jamais accordée par un gardien.',
				'Trois principes, à tous les niveaux : décentralisation, simplicité et déterminisme.'
			]
		},
		atoms: {
			eyebrow: 'Les deux primitives',
			note: 'Deux atomes. La spécification, l’exécution, le paiement et la réputation ne sont que la manière dont ils interagissent.',
			items: [
				{
					title: 'Un nœud',
					body: 'Un <strong>ordinateur ou un appareil</strong> qui dialogue avec ses pairs et gère l’exécution des services. Il fournit le matériel, décide s’il exécute le travail localement ou le transmet, et n’a jamais besoin de comprendre ce que fait le logiciel.'
				},
				{
					title: 'Un service',
					body: 'Un <strong>conteneur logiciel déterministe</strong> conçu pour faire une seule chose. Il est scellé vis-à-vis du nœud qui l’exécute : le nœud n’inspecte pas le programme, et le programme ignore sur quelle machine il a atterri.'
				}
			]
		},
		index: {
			sections: {
				foundations: 'Origines',
				atoms: 'Nœuds et services',
				nodes: 'Le réseau',
				services: 'Services',
				'service-spec': 'Spécification',
				execution: 'Exécution',
				determinism: 'Déterminisme',
				coordination: 'Coordination',
				'core-principles': 'Principes fondamentaux',
				'what-is-not': 'Ce que ce n’est pas',
				implementations: 'Implémentations',
				applications: 'Applications',
				'user-roles': 'Quel est votre rôle ?'
			}
		},
		scenes: {
			foundations: {
				label: 'D’où ça vient',
				beats: [
					{
						h: 'Tout commence avec une poignée de règles.',
						p: 'Dans les années 1940, le mathématicien <strong>John von Neumann</strong> et <strong>Stanislaw Ulam</strong> ont introduit les automates cellulaires : des modèles montrant comment des comportements complexes peuvent émerger de règles simples.'
					},
					{
						h: 'Personne ne dirige quoi que ce soit ici.',
						p: 'En 1970, <strong>le « jeu de la vie » de John Horton Conway</strong> est devenu l’exemple classique : une grille où chaque cellule ne regarde que ses voisines, et pourtant l’ensemble produit une structure complexe et évolutive.'
					},
					{
						h: 'C’est toute la philosophie de conception.',
						p: 'Ces idées éclairent la manière dont les systèmes décentralisés peuvent <strong>atteindre la complexité sans contrôle central</strong> — la philosophie qui guide Celaut. Des règles simples au niveau du nœud et du service, un système adaptatif au-dessus.',
						note: 'Décentralisation · Simplicité · Déterminisme'
					}
				]
			},
			nodes: {
				label: 'Ce réseau',
				beats: [
					{
						h: 'Avoir des nœuds n’est pas ce qui fait la différence.',
						p: 'La plupart des réseaux décentralisés ont des nœuds, et la plupart d’entre eux dépendent encore d’une chose puissante : <strong>le protocole que tout le monde doit exécuter</strong>. Les règles restent le centre, même quand les machines ne le sont pas.'
					},
					{
						h: 'Celaut n’a aucun protocole à s’accorder au préalable.',
						p: 'Les nœuds n’ont pas besoin de convenir d’avance d’un protocole de communication — ils <strong>déclarent, au contact, les interfaces qu’ils prennent en charge et les méthodes de paiement qu’ils acceptent</strong>. Deux nœuds ne parlent que de ce qu’ils ont éventuellement en commun ; là où ça ne coïncide pas, ils ne se parlent tout simplement pas.'
					},
					{
						h: 'Vous changez donc votre nœud, pas le réseau.',
						p: 'Une nouvelle politique de tarification, une autre méthode de paiement, un format de spécification que personne d’autre n’analyse encore — vous <strong>l’implémentez dans votre propre nœud</strong> et il fonctionne avec quiconque le prend déjà en charge. Personne ne vote, rien n’a besoin d’être migré, et il n’y a <strong>aucun hard fork à traverser</strong>.',
						note: 'Aucun protocole commun. Aucune version commune. Aucune permission requise.'
					}
				]
			},
			services: {
				label: 'Ce qui tourne dessus',
				beats: [
					{
						h: 'Un service est un conteneur scellé.',
						p: 'Les services dans Celaut sont des <strong>conteneurs logiciels déterministes</strong> conçus pour accomplir une tâche précise. Rien de plus élaboré que cela.'
					},
					{
						h: 'En suivant le principe de la boîte noire.',
						p: 'Ils fonctionnent <strong>indépendamment des nœuds qui les exécutent</strong>, en se concentrant uniquement sur leur fonctionnalité. Le nœud n’a pas besoin de comprendre le service, et le service n’a pas besoin de savoir quoi que ce soit sur le nœud.'
					},
					{
						h: 'Isolé, à chaque fois.',
						p: 'Chaque requête s’exécute comme un <strong>processus isolé</strong>, dans sa propre <strong>machine virtuelle</strong>, avec son propre noyau et une frontière imposée par le matériel — ce qui masque l’environnement d’exécution et préserve intacte la barrière de sécurité.',
						note: 'Ce qui entre, ce qui sort. C’est là toute l’interface.'
					}
				]
			},
			'service-spec': {
				label: 'Comment un service est spécifié',
				explore: 'Explorer {what}',
				exploreClose: 'Revenir au service entier',
				beats: [
					{
						h: '<strong>BOX</strong> — l’environnement.',
						p: 'Architecture, système de fichiers, variables d’environnement, point d’entrée, configuration et ressources. Il définit directement toute la structure de fichiers plutôt que de dépendre d’images ou de dépôts externes, ce qui est précisément ce qui rend l’exécution reproductible sur n’importe quel nœud.'
					},
					{
						h: '<strong>API</strong> — l’interface.',
						p: 'Comment communiquer avec le service, les systèmes de paiement qu’il accepte et les coûts associés. Cela permet d’utiliser les services sans qu’un quelconque contrôleur central négocie le protocole en leur nom.'
					},
					{
						h: '<strong>NET</strong> — la portée réseau.',
						p: 'Par défaut, un service est <strong>isolé</strong> : il ne peut parler qu’à son parent, à ses enfants et au nœud qui l’exécute. S’il a besoin du monde extérieur, <strong>les réseaux qu’il pourra atteindre sont nommés dans sa propre spécification</strong> — le nœud les accorde parce qu’il veut exécuter correctement le service, et vous obtenez la garantie qu’il ne pourra jamais aller ailleurs.'
					},
					{
						h: 'Trois composants. Un service portable.',
						p: 'Ensemble, ils créent des <strong>services portables et reproductibles</strong> qui se déploient de façon cohérente sur tout le réseau, tout en préservant sécurité et déterminisme.',
						note: 'Aucune dépendance envers des tiers. Rien n’est laissé implicite.'
					}
				]
			},
			execution: {
				label: 'Qui décide quoi',
				beats: [
					{
						h: 'Un service demande ses enfants.',
						p: 'Un service peut, via son nœud, demander l’exécution de <strong>services enfants</strong>. Il indique <strong>les ressources dont chacun a besoin</strong> et leur remet un budget à dépenser. Pas une machine, pas une région — des ressources.'
					},
					{
						h: 'Le nœud décide où ils s’exécutent.',
						p: 'Il compare <strong>le coût d’exécuter l’instance localement au coût annoncé par chacun de ses pairs</strong> et choisit celui qu’il juge le meilleur. Un enfant reste ici ; un autre atterrit chez un pair.'
					},
					{
						h: 'Le parent ne le découvre jamais.',
						p: 'Il ne sait pas si un enfant a fini sur cette machine ou ailleurs, et il n’a pas besoin de le savoir. Tout ce qu’il surveille, c’est <strong>ce que ses enfants consomment et à quelle vitesse ils le dépensent</strong>, pour pouvoir équilibrer cela.'
					},
					{
						h: 'Cette séparation est tout le secret.',
						p: 'Les opérateurs de nœuds gèrent le côté physique : matériel, capacité, prix, placement. Les développeurs de services <strong>déclarent les ressources dont ils ont besoin, et rien sur l’infrastructure</strong>. Ni l’un ni l’autre n’a à faire le travail de l’autre — c’est précisément ce qui garde les deux moitiés simples.',
						note: 'Deux préoccupations distinctes. Une ligne nette entre elles.'
					}
				]
			},
			determinism: {
				label: 'Pourquoi ça tient',
				beats: [
					{
						h: 'Même entrée. Même sortie.',
						p: 'Les services sont entièrement spécifiés pour viser des <strong>résultats reproductibles</strong> dans le temps et entre les nœuds. Avec les mêmes entrées, la même spécification est censée produire les mêmes sorties, quel que soit l’endroit ou le moment de son exécution.'
					},
					{
						h: 'Pas une garantie dans tous les cas.',
						p: 'Un service qui atteint un réseau ne peut pas être parfaitement reproductible : le réseau répond autrement. Mais une <strong>spécification porte bien plus qu’une définition Docker</strong> : l’architecture, tout le système de fichiers, le point d’entrée, la configuration. On est donc beaucoup plus proche d’exécuter un programme ordinaire que de tirer une image en espérant.'
					},
					{
						h: 'Ce qui rend la confiance mesurable.',
						p: 'Comme le logiciel ne peut pas dériver, une <strong>preuve de réputation enregistrée il y a longtemps dit encore quelque chose de vrai aujourd’hui</strong> — à condition que le service ne se connecte à aucun réseau, ce qui est son état par défaut.'
					},
					{
						h: 'Et il voyage.',
						p: 'Comme rien dans l’environnement n’est laissé à la discrétion de l’hôte, la même spécification produit le même comportement sur <strong>un ordinateur portable, un serveur de secours ou un nœud dont vous n’avez jamais entendu parler</strong>. L’endroit où ça s’exécute cesse de faire partie de la réponse.',
						note: 'Entièrement spécifié, pour que rien ne soit laissé à la machine.'
					}
				]
			},
			coordination: {
				label: 'Comment des inconnus coopèrent',
				more: 'Le modèle de confiance en détail →',
				beats: [
					{
						h: 'La réputation vient en premier.',
						p: '<strong>La confiance n’est jamais présupposée entre les parties.</strong> Les nœuds ne font pas confiance aux autres nœuds ; vous ne faites confiance ni d’emblée à un service ni au nœud qui l’exécute ; un nœud n’a pas non plus à faire confiance au service qu’il exécute. La seule direction qui tienne est l’inverse : un service peut faire confiance à son nœud, puisque celui qui a décidé de l’exécuter a choisi ce nœud. Rien ne commence donc par une poignée de main, mais par une vérification : la réputation, ce sont des <strong>enregistrements sur des registres</strong>, des opinions plutôt que des verdicts, que chaque acteur pèse selon les sources auxquelles il fait déjà confiance.'
					},
					{
						h: 'Puis vous payez pour une promesse de ressources.',
						p: 'C’est seulement une fois l’enregistrement vérifié que quelque chose bouge. Le demandeur paie <strong>d’avance</strong>, et ce qu’il achète est une promesse : <strong>tant de calcul, pendant tant de temps</strong>. Les mécanismes de paiement restent <strong>en dehors de l’architecture centrale</strong>, si bien qu’aucun registre particulier n’y est intégré.'
					},
					{
						h: 'La garantie du nœud, c’est sa réputation.',
						p: 'Rien ne le force à honorer cette promesse. Ce qui le retient, c’est que <strong>le résultat est réécrit dans le registre</strong> — et un nœud dont l’historique indique qu’il a été payé sans livrer ce qu’il devait cesse d’être choisi. Chaque partie a un intérêt permanent à ce que le prochain inconnu apprécie ce qu’il lit.',
						note: 'Vérifier · payer · livrer · enregistrer. Puis recommencer.'
					}
				]
			},
			'core-principles': {
				label: 'Les règles qu’il tient',
				beats: [
					{
						h: 'Rien de tout cela n’était une liste de fonctionnalités.',
						p: 'Un réseau sans protocole à accorder, des services scellés vis-à-vis des machines qui les exécutent, des réseaux déclarés d’avance, un paiement avant l’exécution : chacune de ces choses est une <strong>conséquence</strong>. Trois engagements les produisent, et ils se tiennent mutuellement.'
					},
					{
						h: 'Décentralisation.',
						p: 'Aucun <strong>point unique de contrôle ou de défaillance</strong>. Les nœuds communiquent et se coordonnent dynamiquement, sans rien au milieu à qui demander la permission — ce qui explique qu’il n’y ait eu aucun protocole à accorder au départ.'
					},
					{
						h: 'Simplicité.',
						p: 'Des <strong>règles minimalistes</strong> qui réduisent la complexité, si bien que chaque composant reste assez petit pour être compris et maintenu seul. Un service, c’est un conteneur, une interface et une portée réseau, et c’est tout.'
					},
					{
						h: 'Déterminisme.',
						p: 'Les services sont spécifiés assez complètement pour <strong>reproduire leurs résultats</strong> dans le temps et d’une machine à l’autre. Mêmes entrées, mêmes sorties, où et quand qu’ils s’exécutent — c’est ce qui fait qu’une réputation enregistrée il y a un an vaut encore la peine d’être lue aujourd’hui.',
						note: 'Retirez l’un des trois et les deux autres ne valent plus grand-chose.'
					}
				]
			}
		},
		roles: {
			eyebrow: 'Choisissez votre porte d’entrée',
			heading: 'Quel est votre rôle ?',
			intro: 'En tant qu’utilisateurs, nous pouvons jouer trois types de rôles dans cet écosystème. Chacun a sa propre porte d’entrée.',
			items: [
				{
					eyebrow: 'Rôle 01',
					title: 'Opérateurs de nœuds',
					lede: 'À l’image des mineurs dans les systèmes blockchain, les opérateurs de nœuds fournissent des ressources de calcul au réseau. Ils exécutent les services demandés par les utilisateurs en échange d’un paiement, sans avoir besoin de comprendre la fonction précise de ces services.',
					points: [
						'Fournissent des ressources matérielles',
						'Exécutent des services à la demande',
						'Reçoivent une compensation pour les ressources'
					],
					primary: 'Louez votre PC',
					secondary: 'Faire tourner un nœud'
				},
				{
					eyebrow: 'Rôle 02',
					title: 'Développeurs de services',
					lede: 'Les développeurs créent des services capables de fonctionner sur n’importe quel nœud compatible du réseau. Ils se concentrent sur la construction de la fonctionnalité sans se soucier des détails de l’infrastructure sous-jacente.',
					points: [
						'Conçoivent des spécifications de service',
						'Construisent des applications déterministes',
						'Distribuent des services aux nœuds'
					],
					primary: 'Créer sur Celaut',
					secondary: 'Explorer Skills'
				},
				{
					eyebrow: 'Rôle 03',
					title: 'Utilisateurs de services',
					lede: 'Les utilisateurs finaux lancent des services sur des nœuds, en payant pour les ressources de calcul utilisées.',
					points: [
						'Demandent l’exécution d’un service',
						'Paient pour les ressources de calcul',
						'Consomment les résultats du service'
					],
					primary: 'Utiliser le réseau',
					secondary: 'Explorer Skills'
				}
			]
		},
		principles: {
			items: [
				{
					title: 'Décentralisation'
				},
				{
					title: 'Simplicité'
				},
				{
					title: 'Déterminisme'
				}
			]
		},
		whatIsNot: {
			eyebrow: 'Malentendus fréquents',
			heading: 'Ce que Celaut n’est pas',
			intro: 'Cette architecture ressemble suffisamment à plusieurs choses familières pour qu’on la confonde avec elles. Il vaut la peine de préciser ces différences.',
			items: [
				{
					title: 'Ce n’est pas un réseau unique',
					body: 'Celaut définit une <strong>architecture flexible</strong>, et non un réseau prédéterminé unique. Des réseaux dominants pourront bien émerger, mais le système prend en charge de nombreuses constructions pair-à-pair plutôt que d’en imposer une seule.'
				},
				{
					title: 'Ce n’est pas une pile de protocoles complète',
					body: 'Elle fournit des <strong>principes fondamentaux</strong> pour construire des piles de distribution de calcul, pas une pile complète et figée. Les implémentations actuelles s’appuient sur des composants comme gRPC et Ergo, et ce sont des choix interchangeables.'
				},
				{
					title: 'Ce n’est pas un projet blockchain',
					body: 'Celaut <strong>n’a pas de cryptomonnaie native</strong> ni de DAO. Elle intègre bien des technologies blockchain là où elles trouvent leur place — enregistrer la réputation, régler des paiements entre inconnus — sans pour autant adopter l’écosystème plus large qui les entoure.'
				}
			]
		},
		implementations: {
			eyebrow: 'Le logiciel',
			heading: 'Ce qui existe aujourd’hui',
			intro: 'L’architecture est une spécification, et n’importe qui peut implémenter un nœud qui s’y conforme. Une implémentation fait tourner le réseau aujourd’hui ; la seconde est une direction annoncée, et elle est signalée comme telle.',
			items: [
				{
					name: 'Nodo',
					stage: 'En service',
					body: 'L’implémentation de référence, en Python3 et Rust. Elle exécute des services, négocie le coût avec les pairs, fournit adresses et jetons, et résout les dépendances où qu’elles s’exécutent. Installable sous Linux en une seule commande, et sous Windows 11 via un installeur officiel qui prépare son propre environnement Linux isolé.'
				},
				{
					name: 'Chatui',
					stage: 'Concept',
					body: 'L’intention déclarée de construire un nœud Android qui atteint les services via une simple interface de discussion, sans faire confiance à aucun autre nœud. Le dépôt contient aujourd’hui cette description et rien d’autre — il n’y a pas encore de code à exécuter.'
				}
			],
			note: 'Rien ici ne remplace provisoirement quelque chose qui fonctionnerait déjà ailleurs. Ce qui tourne, tourne ; ce qui ne tourne pas, le dit.'
		},
		applications: {
			eyebrow: 'Où c’est déjà en marche',
			heading: 'Impact et applications dans le monde réel',
			intro: 'L’architecture n’est pas une expérience de pensée. Elle est utilisée à deux distances différentes : comme la couche elle-même, et comme fondation de quelque chose qui a sa propre raison d’exister.',
			layerHeading: 'L’architecture, allumée',
			layerTag: 'La couche elle-même',
			layerIntro: 'Aucune des deux n’est une application construite sur Celaut. Elles sont ce que Celaut <strong>est</strong>, une fois que des nœuds tournent vraiment.',
			layer: [
				{
					name: 'DePIN',
					body: 'N’importe qui peut faire tourner un nœud Celaut et rejoindre un réseau d’infrastructure physique décentralisée. Chaque nœud découvre des pairs, exécute et orchestre des services, et gère leurs dépendances — transformant des ordinateurs ordinaires en calcul partagé et résistant à la censure. C’est le réseau, pas un produit posé dessus.'
				},
				{
					name: 'Unstoppable Skills',
					body: 'Un registre entièrement on-chain et sans serveur où les protagonistes sont les problèmes. Au lieu de chercher des services, les agents cherchent une compétence et découvrent les services qui la couvrent, avec de vrais benchmarks et un classement fondé sur la réputation. C’est ainsi qu’on atteint concrètement la couche de réputation du paradigme — sur Ergo, avec un vrai enjeu personnel : personne ne spamme sans risquer sa réputation.'
				}
			],
			builtOnHeading: 'Construit par-dessus',
			builtOnTag: 'Projet indépendant',
			builtOnIntro: 'Un cran plus loin : un produit avec son propre objectif et ses propres utilisateurs, qui se trouve être assemblé à partir de services Celaut. Il garderait tout son sens s’il était reconstruit sur autre chose — et c’est exactement ce qui en fait une preuve.',
			builtOn: {
				name: 'Game of Prompts',
				body: [
					'Une plateforme compétitive où les créateurs conçoivent des <strong>services-jeux</strong> qui évaluent les robots qui y jouent, et où les joueurs écrivent des <strong>services-solveurs</strong> qui tentent de maximiser leur score.',
					'Ces services suivent le paradigme Celaut, et l’ensemble du système utilise la blockchain Ergo pour enregistrer les résultats et transférer les gains.'
				]
			},
			ergoDocs: 'Documentation d’Ergo',
			formalPaper: 'Article formel'
		}
	},
	depin: {
		meta: {
			title: 'Louez votre PC — Celaut DePIN',
			description: 'Vendez les ressources de votre ordinateur lorsque vous ne les utilisez pas. La couche DePIN de Celaut est entièrement pair-à-pair, vous permet de fixer le prix du calcul en tenant compte de votre facture d’électricité, et isole chaque charge de travail dans une microVM.'
		},
		topbarTitle: 'Louez votre PC',
		index: {
			sections: {
				rent: 'L’idée',
				p2p: 'Pair-à-pair',
				electricity: 'Votre facture',
				isolation: 'Isolation',
				payoff: 'Ce que vous obtenez',
				responsibilities: 'Ce que fait un nœud',
				steps: 'De l’installation au revenu',
				roles: 'L’autre côté',
				cta: 'Commencer'
			}
		},
		hero: {
			eyebrow: 'Celaut DePIN',
			title: 'Louez votre PC.',
			tagline: 'Vendez les ressources de votre ordinateur lorsque vous ne les utilisez pas.',
			lede: 'Votre machine reste inactive la majeure partie de la journée. Celaut transforme cette capacité inutilisée en quelque chose que les gens paient — directement, selon vos conditions, chaque charge de travail restant scellée à l’écart de votre système.',
			actions: [
				'Commencer à louer votre PC',
				'Voir comment ça fonctionne'
			],
			stats: [
				{
					value: '100 %',
					label: 'entièrement pair-à-pair — aucune entreprise au milieu'
				},
				{
					value: 'Vous',
					label: 'fixez le prix, en tenant compte de votre facture d’électricité'
				},
				{
					value: 'microVM',
					label: 'isolation pour chaque charge de travail hébergée'
				}
			]
		},
		scenes: {
			rent: {
				label: 'L’idée',
				beats: [
					{
						h: 'Votre PC est inactif en ce moment même.',
						p: 'La plupart des machines personnelles restent inutilisées la majeure partie de la journée. C’est du matériel bien réel — cœurs, mémoire, disque — qui ne fait absolument rien.'
					},
					{
						h: 'Vendez ce que vous n’utilisez pas.',
						p: 'Celaut découpe votre machine en <strong>capacité que vous pouvez louer</strong>. Vous décidez de la part qui va au réseau et de celle qui vous reste — le reste de la machine continue de fonctionner exactement comme avant.'
					},
					{
						h: 'Soyez payé pour le travail qu’elle accomplit.',
						p: 'Les pairs qui ont besoin de calcul trouvent votre nœud, négocient un prix directement avec lui, et paient à chaque exécution. <strong>Le paiement se règle sur Ergo</strong> dès qu’une tâche se termine.',
						note: 'Aucun centre de données. Aucun intermédiaire. Aucune attente de versement mensuel.'
					}
				]
			},
			p2p: {
				label: 'Avantage 01',
				beats: [
					{
						h: 'Entièrement pair-à-pair.',
						p: 'Toutes les autres plateformes de « location de votre matériel » placent une entreprise au milieu. Elle détient la place de marché, prend sa part, fixe les règles, et peut vous retirer de son réseau quand elle le souhaite.'
					},
					{
						h: 'Ici, personne n’est au milieu.',
						p: 'Celaut n’a <strong>ni fondation ni entreprise</strong> assise entre les deux parties. Votre nœud et le pair qui a besoin de calcul se parlent <strong>directement</strong> — découverte, négociation, exécution, règlement.'
					},
					{
						h: 'Ce qui signifie que personne ne peut vous couper.',
						p: 'Aucun compte à suspendre, aucune condition qui change à votre insu, aucun frais qui augmente en silence. L’interaction est <strong>entièrement pair-à-pair</strong>, si bien que la seule chose dont chaque côté dépend, c’est l’autre côté.',
						note: 'Rien à inscrire. Rien dont on puisse vous exclure.'
					}
				]
			},
			electricity: {
				label: 'Avantage 02',
				beats: [
					{
						h: 'Le calcul ne se donne pas gratuitement.',
						p: 'Faire tourner votre machine coûte de l’électricité, et ce coût n’est pas fixe — il évolue au fil de la journée et change selon l’endroit où vous vivez.'
					},
					{
						h: 'Intégrez-le au prix.',
						p: 'Celaut vous permet d’<strong>intégrer, si vous le souhaitez, le coût de l’électricité</strong> au prix que vous fixez pour votre calcul. Votre nœud établit ses tarifs en tenant compte de votre facture d’électricité, si bien que louer votre capacité ne vous coûte jamais de l’argent sans que vous le sachiez.'
					},
					{
						h: 'Et décidez quand vous êtes disponible.',
						p: '<strong>La disponibilité et la durée d’exécution vous appartiennent aussi.</strong> Louez la machine uniquement la nuit, quand l’électricité est la moins chère, plafonnez la durée maximale d’une tâche, ou passez entièrement hors ligne — le réseau trouvera simplement une autre route.',
						note: 'Vos tarifs. Vos horaires. Votre marge.'
					}
				]
			},
			isolation: {
				label: 'Avantage 03',
				beats: [
					{
						h: 'Le code de qui tourne sur mon PC ?',
						p: 'C’est la première question que se pose toute personne sensée. Louer sa machine ne peut pas signifier remettre les clés à des inconnus.'
					},
					{
						h: 'Isolation totale de l’exécution.',
						p: 'Chaque charge de travail s’exécute scellée dans sa propre <strong>microVM</strong> — une véritable machine virtuelle avec son propre noyau et une frontière imposée par le matériel, pas un conteneur à noyau partagé. Elle ne peut voir ni vos fichiers, ni votre réseau, ni aucune autre charge de travail sur la machine.'
					},
					{
						h: 'La même technologie que celle des grands clouds.',
						p: 'Les microVM sont ce que les <strong>grands fournisseurs cloud</strong> utilisent pour exécuter du code non fiable venant de millions d’inconnus sur du matériel partagé. Celaut apporte ce même modèle d’isolation sur votre bureau — cette garantie n’est pas une promesse, c’est l’architecture elle-même.',
						note: 'La tâche se termine, la VM est détruite. Rien ne persiste.'
					}
				]
			}
		},
		payoff: {
			heading: 'Ce que vous obtenez réellement',
			items: [
				{
					title: 'Du matériel inactif, mis au travail',
					body: 'Le PC de jeu endormi à 3 heures du matin, la station de travail inactive le week-end, une machine de secours dans un placard. Si elle peut faire tourner nodo, elle peut rapporter de l’argent.'
				},
				{
					title: 'Vous fixez les conditions',
					body: 'Le prix par unité de calcul, les heures où vous êtes disponible, la part de la machine que vous êtes prêt à céder. Tout cela est à vous de le modifier.'
				},
				{
					title: 'Payé d’avance',
					body: 'Un nœud est payé en amont pour une promesse de ressources — sur Ergo (ERG), aucune facture, aucun calendrier de versements imposé par une plateforme, aucun seuil minimum. La réputation est la garantie qu’il livrera.'
				},
				{
					title: 'Rien à qui faire confiance',
					body: 'Les services sont adressés par contenu : le demandeur obtient exactement le logiciel qu’il a demandé, et vous l’exécutez sans avoir à l’inspecter ni à vous en porter garant.'
				},
				{
					title: 'Vos fichiers restent les vôtres',
					body: 'Chaque charge de travail vit dans sa propre microVM avec son propre noyau. Elle ne voit jamais votre disque, votre réseau, ni quoi que ce soit d’autre sur la machine.'
				},
				{
					title: 'Partez quand vous voulez',
					body: 'Arrêtez le nœud et le réseau contourne votre absence. Aucun contrat, aucun engagement, et personne à qui demander la permission.'
				}
			]
		},
		responsibilities: {
			heading: 'Ce que fait réellement le nœud sur votre machine',
			intro: 'Un nœud est un <strong>ordinateur ou un appareil</strong> qui communique avec ses pairs et gère l’exécution des services. Le paradigme lui confie quatre tâches, et ne place aucun coordinateur au-dessus de lui.',
			items: [
				{
					title: 'Exécution des services',
					body: 'Il négocie les coûts d’exécution avec ses pairs et décide d’exécuter un service localement ou de le déléguer, afin que les ressources aillent là où elles sont les moins chères.'
				},
				{
					title: 'Communication',
					body: 'Il déclare, au contact, les interfaces qu’il prend en charge et les méthodes de paiement qu’il accepte, ce qui permet aux protocoles d’évoluer sans accord préalable.'
				},
				{
					title: 'Sécurité',
					body: 'Il émet et gère les adresses et les jetons d’authentification qui identifient chaque interaction avec un service.'
				},
				{
					title: 'Dépendances',
					body: 'Il s’assure qu’un service peut atteindre ce dont il a besoin, où que cette dépendance soit en train de s’exécuter dans le réseau.'
				}
			],
			note: 'Rien de tout cela n’exige de savoir à quoi sert le logiciel qu’il exécute.'
		},
		steps: {
			heading: 'De l’installation aux revenus',
			items: [
				{
					title: 'Installez nodo',
					body: 'Une commande sous Linux, un installateur sous Windows. Votre machine rejoint le réseau et commence à découvrir des pairs.'
				},
				{
					title: 'Fixez votre prix et vos horaires',
					body: 'Indiquez au nœud le coût de votre calcul — électricité incluse si vous voulez la prendre en compte — et quand il est disponible.'
				},
				{
					title: 'Acceptez du travail',
					body: 'Les pairs négocient directement avec votre nœud. Les charges de travail acceptées s’exécutent scellées à l’intérieur d’une microVM, isolées de tout le reste.'
				},
				{
					title: 'Soyez payé',
					body: 'Le paiement est encaissé d’avance sur Ergo ; la réputation est inscrite à mesure que le travail est honoré. La contribution est récompensée ; les résultats restent vérifiables.'
				}
			]
		},
		roles: {
			heading: 'L’autre côté de l’échange',
			intro: 'Louer votre PC n’est qu’une moitié du réseau. L’autre moitié consiste à pouvoir <em>l’utiliser</em> — et ce sont ces mêmes propriétés qui vous protègent en tant qu’hôte qui font que ce réseau vaut la peine qu’on y achète des services.',
			items: [
				{
					title: 'Développeurs',
					body: 'Publiez un programme une seule fois, sous forme de service scellé et adressé par contenu, et laissez le réseau l’héberger, le faire découvrir et le mettre à l’échelle. La reproductibilité vient de la conception, pas du SLA d’un fournisseur.',
					link: 'Pour les développeurs →'
				},
				{
					title: 'Agents et utilisateurs',
					body: 'Demandez des services en fonction du problème qu’ils résolvent, et payez à chaque exécution. Aucun compte cloud, aucun engagement — et le sceau prouve que vous avez obtenu exactement le logiciel demandé.',
					link: 'Pour les utilisateurs finaux →'
				},
				{
					title: 'Hôtes',
					body: 'C’est vous. Apportez le matériel que vous avez, quel qu’il soit ; la couche de virtualisation du nœud fait que les charges de travail trouvent quand même où atterrir, même entre architectures de processeur différentes.'
				}
			]
		},
		cta: {
			heading: 'Réveillez votre machine inactive.',
			body: 'Installer un nœud ne prend qu’une commande. C’est le moyen le plus rapide de découvrir la valeur de votre matériel quand il ne fait rien d’autre.',
			actions: [
				'Faire tourner un nœud',
				'Lire le paradigme'
			]
		}
	},
	developers: {
		meta: {
			title: 'Pour les développeurs — construire une fois, exécuter partout | Celaut',
			description: 'Créez des services Celaut : définissez un BOX, une API et une portée NET, remettez-les à un nœud, et laissez le réseau distribuer et exécuter le tout. Aucune infrastructure, aucune configuration, aucune plateforme au milieu.'
		},
		topbarTitle: 'Pour les développeurs',
		index: {
			sections: {
				spec: 'L’idée',
				agnostic: 'Tourne partout',
				distribute: 'Distribution',
				compose: 'Composition',
				payoff: 'Ce que vous obtenez',
				distribution: 'Comment ça se diffuse',
				steps: 'Du code au réseau',
				tradeoffs: 'Le marché',
				roles: 'Les autres',
				cta: 'Commencer'
			}
		},
		hero: {
			eyebrow: 'Développeurs de services',
			title: 'Construisez-le une fois.',
			tagline: 'Puis arrêtez de vous demander où ça tourne.',
			lede: 'Un service Celaut n’est pas un déploiement — c’est une spécification. Décrivez l’environnement, l’interface et la portée réseau, remettez-le à un seul nœud, et le réseau prend le relais à partir de là.',
			actions: [
				'Explorer Skills',
				'Voir comment ça fonctionne'
			],
			stats: [
				{
					value: 'BOX · API · NET',
					label: 'trois composants — c’est toute la spécification'
				},
				{
					value: 'Sans DevOps',
					label: 'les nœuds gèrent l’exécution ; aucun compte cloud à ouvrir'
				},
				{
					value: 'Déterministe',
					label: 'mêmes entrées, mêmes sorties, sur n’importe quel nœud, à tout moment'
				}
			]
		},
		scenes: {
			spec: {
				label: 'L’idée',
				beats: [
					{
						h: 'Vous ne déployez pas. Vous spécifiez.',
						p: 'Il n’y a aucun serveur à provisionner, aucune image à publier, aucun pipeline à maintenir au vert. Un service dans Celaut est une description écrite de ce dont il a besoin pour fonctionner.'
					},
					{
						h: 'Trois composants. C’est tout.',
						p: '<strong>BOX</strong> décrit l’environnement d’exécution — architecture, système de fichiers, variables d’environnement, point d’entrée, configuration. Il définit directement toute la structure de fichiers plutôt que de pointer vers une image externe, ce qui préserve la reproductibilité de l’exécution.'
					},
					{
						h: 'Et comment le monde y accède.',
						p: '<strong>API</strong> définit comment les clients et les autres services lui parlent, ainsi que les méthodes de paiement acceptées et les coûts. <strong>NET</strong> nomme les réseaux externes qu’il pourra atteindre — par défaut un service est isolé, et tout ce qui dépasse cela est déclaré dans la spécification elle-même, afin que les utilisateurs sachent d’emblée où il peut aller.',
						note: 'Portable, reproductible, libre de toute dépendance envers des tiers.'
					}
				]
			},
			agnostic: {
				label: 'Avantage 01',
				beats: [
					{
						h: 'Quel que soit votre code, il est livré de la même façon.',
						p: 'Celaut ne vous demande pas d’adopter un framework, un runtime ou un SDK. Il demande un système de fichiers et un point d’entrée.'
					},
					{
						h: 'Le nœud ne s’en soucie pas non plus.',
						p: 'Les services suivent le <strong>principe de la boîte noire</strong> : ils fonctionnent indépendamment des détails des nœuds qui les exécutent, et les nœuds les exécutent sans avoir besoin de comprendre ce qu’ils font.'
					},
					{
						h: 'N’importe quel nœud compatible peut donc l’accepter.',
						p: 'Le BOX déclare la micro-architecture qu’il cible, si bien que les nœuds savent s’ils correspondent. Au-delà de cela, <strong>votre service peut être exécuté par n’importe qui sur n’importe quel nœud compatible</strong> — c’est tout le contrat.',
						note: 'Aucun enfermement, parce qu’il n’y a rien où s’enfermer.'
					}
				]
			},
			distribute: {
				label: 'Avantage 02',
				beats: [
					{
						h: 'Remettez-le à un nœud.',
						p: 'Vous ne publiez pas sur une boutique et vous n’attendez pas de revue. Le développeur n’a besoin que d’<strong>envoyer le service à un ou plusieurs nœuds</strong>.'
					},
					{
						h: 'À partir de là, le réseau le porte.',
						p: 'Ces nœuds se chargent de <strong>distribuer le service parmi les autres</strong>. Il n’existe aucun registre central de services — les services se propagent de pair à pair, si bien qu’il n’y a aucun point unique de défaillance ni aucun gardien pour décider si vous êtes autorisé à entrer.'
					},
					{
						h: 'Découvrable, si vous le souhaitez.',
						p: 'Les nœuds peuvent aussi <strong>téléverser le service vers un système de réputation</strong>, afin que les utilisateurs et d’autres services puissent juger s’il faut l’utiliser, et quand. Les services peuvent être déclarés sur un registre blockchain — comme le <strong>Sigma Reputation System</strong> sur Ergo — pour améliorer la visibilité et la confiance.',
						note: 'Rien à inscrire. Personne ne prend de commission.'
					}
				]
			},
			compose: {
				label: 'Avantage 03',
				beats: [
					{
						h: 'Des services qui appellent des services.',
						p: 'Un service peut, via le nœud qui l’exécute, demander l’exécution d’autres services — ses <strong>services enfants</strong>. Les flux de travail complexes se construisent par composition, pas par une configuration d’orchestration.'
					},
					{
						h: 'Le nœud décide où ils atterrissent.',
						p: 'Les nœuds gèrent les instances de service et décident de les exécuter localement ou de répartir la charge entre pairs. Les dépendances sont un problème que le nœud résout : il s’assure que les services peuvent atteindre ce dont ils ont besoin à travers tout le réseau.'
					},
					{
						h: 'Et vous ne savez jamais où.',
						p: '<strong>Le service parent ne sait pas où s’exécutent ses dépendances.</strong> Chaque enfant indique simplement les ressources dont il a besoin. Vous écrivez la composition ; le réseau résout le placement.',
						note: 'Aucun ordonnanceur à configurer. Aucune topologie à maintenir.'
					}
				]
			}
		},
		payoff: {
			heading: 'Ce que cette architecture vous offre',
			items: [
				{
					title: 'Spécifiez, ne déployez pas',
					body: 'Un service est un BOX (architecture, système de fichiers, environnement, point d’entrée, configuration), une API et une portée NET. Écrivez cela et c’est terminé — aucune étape de déploiement dont il faille se charger.'
				},
				{
					title: 'Autonome par construction',
					body: 'Le BOX décrit toute la structure de fichiers dont le service a besoin, plutôt que de pointer vers des images ou des dépôts externes. Aucun registre tiers ne peut disparaître sous vos pieds.'
				},
				{
					title: 'Une boîte noire, à dessein',
					body: 'Les services fonctionnent indépendamment des nœuds qui les exécutent. Vous n’écrivez jamais de code contre l’environnement d’un nœud, parce qu’on ne vous dit jamais ce qu’il est.'
				},
				{
					title: 'Reproductible, pas « au mieux »',
					body: 'Avec les mêmes entrées, un service produit toujours les mêmes sorties, quel que soit l’endroit ou le moment de son exécution. Ici, le déterminisme est une propriété architecturale, pas la promesse d’un fournisseur.'
				},
				{
					title: 'Composition sans orchestration',
					body: 'Un service peut, via son nœud, demander l’exécution de services enfants. Le parent ne sait pas où ils s’exécutent ; chacun se contente d’indiquer les ressources dont il a besoin.'
				},
				{
					title: 'Une réputation qui s’accumule',
					body: 'Comme un service est déterministe et isolé par défaut, une preuve de réputation enregistrée il y a longtemps dit encore quelque chose de vrai à son sujet aujourd’hui.'
				}
			]
		},
		steps: {
			heading: 'Du code jusqu’à l’exécution sur le réseau',
			items: [
				{
					title: 'Écrivez le service',
					body: 'N’importe quel langage, n’importe quelle stack. Ce qui compte, c’est le système de fichiers dont il a besoin et la commande qui le lance — pas le framework que vous avez choisi.'
				},
				{
					title: 'Spécifiez BOX, API et NET',
					body: 'Déclarez l’environnement, comment les appelants communiquent avec le service et quel accès réseau externe il devrait pouvoir demander, le cas échéant.'
				},
				{
					title: 'Envoyez-le à un nœud',
					body: 'Un seul nœud suffit. Il distribue le service à d’autres et peut le publier dans un système de réputation afin que les utilisateurs et d’autres services puissent le trouver.'
				},
				{
					title: 'Laissez le réseau l’exécuter',
					body: 'Les nœuds négocient le coût et décident où chaque instance s’exécute. Vous n’êtes pas dans la boucle, et vous n’avez aucune infrastructure à maintenir en vie.'
				}
			]
		},
		distribution: {
			heading: 'Comment un service se diffuse réellement',
			intro: 'Il n’y a pas de boutique où publier ni de validation à attendre. Un service est remis à un nœud, et le réseau le porte à partir de là — hors chaîne par défaut, et sur la chaîne en option.',
			items: [
				{
					title: 'Pair-à-pair par défaut',
					body: 'Celaut n’a <strong>aucun registre central de services</strong>. Les services se propagent entre nœuds de pair à pair, de sorte qu’ils peuvent être trouvés directement — et il n’y a aucun gardien pour décider si vous êtes autorisé à entrer.'
				},
				{
					title: 'Sur un registre, s’il le mérite',
					body: 'Les services peuvent aussi être déclarés sur une blockchain qui implémente un registre — comme le <strong>Sigma Reputation System</strong> sur Ergo — lorsque la visibilité et une trace vérifiable valent plus que de rester entièrement hors chaîne.'
				}
			]
		},
		tradeoffs: {
			heading: 'Le compromis que vous faites vraiment',
			intro: 'Aujourd’hui, publier un logiciel signifie choisir entre l’héberger soi-même et demander aux gens de le faire tourner eux-mêmes. Ces deux options coûtent quelque chose. L’affirmation de Celaut est étroite et précise : elle prend les avantages de chacune sans leurs inconvénients — au prix de votre contrôle sur le service en cours d’exécution.',
			items: [
				{
					label: 'Un service web hébergé',
					good: 'Les utilisateurs n’ont besoin ni d’infrastructure ni de configuration.',
					bad: 'Vous ne pouvez pas prouver que le système n’a pas changé, et les utilisateurs doivent vous croire sur parole que les données de leurs requêtes ne sont pas détournées.'
				},
				{
					label: 'Du code source qu’ils font tourner eux-mêmes',
					good: 'Déterministe — une fois téléchargé, vous ne pouvez pas le modifier dans leur dos — et les données de leurs requêtes ne vous parviennent jamais.',
					bad: 'Ils ont besoin d’un matériel capable de le faire tourner et doivent survivre à la configuration, ce qui est là où la plupart des gens abandonnent.'
				},
				{
					label: 'Un service Celaut',
					good: 'Aucune infrastructure à gérer et rien à configurer, parce que la spécification couvre déjà le conteneur, l’architecture, les besoins réseau et l’interface.',
					bad: 'Vous renoncez au contrôle : vous ne pouvez ni modifier, ni limiter, ni extraire des données d’un service une fois qu’il est diffusé. C’est précisément le principe.',
					highlight: true
				}
			]
		},
		roles: {
			heading: 'Le reste du réseau',
			intro: 'Votre service a besoin d’un endroit où s’exécuter et de quelqu’un pour qui s’exécuter. Ce sont là aussi des personnes.',
			items: [
				{
					title: 'Opérateurs de nœuds',
					body: 'Ils fournissent le matériel et exécutent tout ce qui est demandé, sans avoir besoin de comprendre ce que fait votre service, en échange d’un paiement.',
					link: 'Louez votre PC →'
				},
				{
					title: 'Utilisateurs finaux',
					body: 'Ils lancent des services sur des nœuds et paient pour les ressources de calcul utilisées — et peuvent vérifier que ce qui a tourné est exactement ce que décrivait la spécification.',
					link: 'Pour les utilisateurs finaux →'
				},
				{
					title: 'Le paradigme',
					body: 'L’architecture complète : nœuds, services, spécification, coordination via des systèmes de réputation et de paiement, et pourquoi tout cela est nécessaire.',
					link: 'Lire l’article →'
				}
			]
		},
		cta: {
			heading: 'Partez des problèmes.',
			body: 'Unstoppable Skills est un registre où les problèmes sont les protagonistes : recherchez une compétence, et trouvez les services qui la couvrent, leurs benchmarks et leur réputation. C’est le chemin le plus court entre « que devrais-je construire » et « qui en a besoin ».',
			actions: [
				'Explorer Skills',
				'Lire le paradigme'
			]
		}
	},
	users: {
		meta: {
			title: 'Pour les utilisateurs finaux — exécutez-le, payez ce qu’il a utilisé | Celaut',
			description: 'Lancez des services sur des nœuds Celaut et ne payez que les ressources de calcul utilisées. Aucun compte, aucun abonnement, aucune plateforme au milieu — les services s’exécutent de façon isolée et déterministe, si bien que vous obtenez exactement ce que décrit la spécification.'
		},
		topbarTitle: 'Pour les utilisateurs finaux',
		index: {
			sections: {
				ask: 'L’idée',
				proof: 'Ce que vous recevez',
				sealed: 'Scellé',
				pay: 'Ce que vous payez',
				payoff: 'Ce que vous obtenez',
				steps: 'De la demande au résultat',
				tradeoffs: 'Le marché',
				roles: 'Les autres',
				cta: 'Commencer'
			}
		},
		hero: {
			eyebrow: 'Utilisateurs de services',
			title: 'Exécutez-le.',
			tagline: 'Payez ce qu’il a utilisé. Rien d’autre.',
			lede: 'Lancez un service sur un nœud, obtenez le résultat, payez le calcul qu’il a consommé. Aucun compte à créer, aucun abonnement à résilier, et aucune entreprise assise entre vous et la machine qui a fait le travail.',
			actions: [
				'Explorer Skills',
				'Voir comment ça fonctionne'
			],
			stats: [
				{
					value: 'Sans compte',
					label: 'rien à inscrire, rien dont on puisse vous exclure'
				},
				{
					value: 'À chaque exécution',
					label: 'vous ne payez que les ressources de calcul réellement utilisées'
				},
				{
					value: 'Isolé',
					label: 'les services s’exécutent scellés et ne voient rien qu’on ne leur ait pas donné'
				}
			]
		},
		scenes: {
			ask: {
				label: 'L’idée',
				beats: [
					{
						h: 'Demandez au réseau, pas à une entreprise.',
						p: 'Vous voulez que quelque chose soit fait — exécuter un modèle, analyser une séquence, faire trader un bot, traiter un fichier. Aujourd’hui, cela signifie choisir un fournisseur et ouvrir un compte chez lui.'
					},
					{
						h: 'Les nœuds répondent directement.',
						p: 'Celaut n’a <strong>aucun registre central de services</strong>. Les services sont distribués entre nœuds de pair à pair, et les nœuds déclarent, au contact, les interfaces qu’ils prennent en charge et les <strong>méthodes de paiement acceptées</strong> — rien n’a donc besoin d’être convenu avec qui que ce soit à l’avance.'
					},
					{
						h: 'Vous traitez avec la machine qui fait le travail.',
						p: 'Votre nœud négocie le coût d’exécution avec un pair, et le travail se fait. Il n’y a <strong>aucune plateforme au milieu</strong> pour prendre une commission, fixer les règles, ou pouvoir vous exclure d’un réseau que vous n’avez jamais rejoint.',
						note: 'Aucune inscription. Aucun abonnement. Aucun intermédiaire.'
					}
				]
			},
			proof: {
				label: 'Avantage 01',
				beats: [
					{
						h: 'Comment savez-vous ce qui a vraiment tourné ?',
						p: 'Avec un service hébergé, vous ne le savez pas. L’opérateur ne peut pas prouver que le système n’a pas changé — donc quand un outil devient populaire, rien n’empêche sa performance de baisser en silence pour réduire les coûts.'
					},
					{
						h: 'Ici, le service <em>est</em> sa spécification.',
						p: 'Un service spécifie tout son environnement — architecture, système de fichiers, point d’entrée, configuration. Modifiez quoi que ce soit là-dedans et c’est <strong>un service différent</strong>, pas une mise à jour silencieuse de celui que vous utilisiez.'
					},
					{
						h: 'Le résultat est donc reproductible.',
						p: 'Avec les mêmes entrées, un service <strong>produit toujours les mêmes sorties</strong>, quel que soit le nœud qui l’exécute ou le moment. C’est ce qui fait qu’un enregistrement de réputation vieux de plusieurs mois vaut encore quelque chose aujourd’hui.',
						note: 'Le déterminisme est la garantie. Pas une promesse — la conception elle-même.'
					}
				]
			},
			sealed: {
				label: 'Avantage 02',
				beats: [
					{
						h: 'Votre requête ne regarde personne d’autre.',
						p: 'Quand vous envoyez une charge de travail quelque part, la vraie question est de savoir qui d’autre pourra la voir en chemin.'
					},
					{
						h: 'Chaque exécution est isolée.',
						p: 'Le nœud exécute le service comme une <strong>instance isolée</strong> — sa propre machine virtuelle. Par défaut, un service est entièrement coupé des réseaux externes, ne pouvant parler qu’à son parent, à ses enfants et au nœud qui l’exécute.'
					},
					{
						h: 'Et le développeur n’est pas de l’autre côté.',
						p: '<strong>Les développeurs de services ne peuvent ni contrôler, ni modifier, ni extraire des données d’un service</strong>, parce qu’ils ne contrôlent pas les nœuds qui le distribuent et l’exécutent. Tout accès réseau plus large doit être déclaré dans la spécification, ouvertement, avant même que vous ne l’exécutiez.',
						note: 'Isolé par défaut. L’accès se demande, il ne se présume jamais.'
					}
				]
			},
			pay: {
				label: 'Avantage 03',
				beats: [
					{
						h: 'Vous payez avant l’exécution. Point final.',
						p: 'Les utilisateurs lancent des services sur des nœuds et <strong>paient d’avance pour une promesse de ressources</strong>. C’est là toute la relation commerciale.'
					},
					{
						h: 'Rien ne s’accumule pendant que vous êtes inactif.',
						p: 'Il n’y a ni abonnement, ni palier, ni plancher mensuel. Le paiement est encaissé <strong>en amont</strong> en échange des ressources à consommer ; la preuve de paiement conditionne l’accès. La garantie du nœud, c’est sa réputation, pas une facture à la fin.'
					},
					{
						h: 'Le prix vient d’un marché, pas d’une page tarifaire.',
						p: 'Les nœuds fixent leurs propres coûts et se font concurrence dessus, et <strong>les services ont un coût marginal nul</strong> — le coût d’en faire tourner un retombe sur le nœud — si bien que beaucoup démarrent gratuitement pour bâtir leur réputation. Les systèmes de paiement restent en dehors de l’architecture centrale, donc le registre qui règle tout n’est pas fixé non plus.',
						note: 'Payez à chaque exécution. Partez quand vous voulez. Rien à résilier.'
					}
				]
			}
		},
		payoff: {
			heading: 'Ce que vous obtenez réellement',
			items: [
				{
					title: 'Aucune infrastructure à gérer',
					body: 'Les nœuds s’en chargent. Aucun fournisseur cloud à choisir, aucune machine à maintenir en vie, et rien à laisser tourner entre deux utilisations.'
				},
				{
					title: 'Aucune configuration',
					body: 'La spécification du service couvre déjà comment le conteneur est construit, l’architecture dont il a besoin, ses exigences réseau et son interface. Rien de tout cela n’est à démêler par vous.'
				},
				{
					title: 'Le développeur n’a aucune portée',
					body: 'Les développeurs de services ne peuvent ni contrôler, ni modifier, ni extraire des données d’un service — ils ne contrôlent pas les nœuds qui le distribuent et l’exécutent.'
				},
				{
					title: 'Il ne peut pas changer dans votre dos',
					body: 'Un service est déterministe : les mêmes entrées produisent les mêmes sorties, quel que soit le moment ou l’endroit où il s’exécute. Personne ne peut le dégrader en silence pour réduire les coûts.'
				},
				{
					title: 'Jugé par la réputation, pas par un classement',
					body: 'La réputation vit sous forme d’enregistrements sur un registre, et chaque participant pèse les sources auxquelles il fait confiance. Il n’y a aucune page d’accueil éditoriale qui décide de ce que vous voyez.'
				},
				{
					title: 'Rien dont on puisse vous retirer',
					body: 'La découverte se fait de pair à pair, sans registre central, il n’y a donc aucun compte à suspendre ni aucune annonce à retirer.'
				}
			]
		},
		steps: {
			heading: 'De « j’ai besoin que ce soit fait » à un résultat',
			items: [
				{
					title: 'Trouvez le service',
					body: 'Cherchez selon le problème que vous voulez résoudre. Les nœuds découvrent les services de pair à pair, et des registres comme Unstoppable Skills relient les problèmes aux services qui les couvrent.'
				},
				{
					title: 'Demandez une exécution',
					body: 'Votre nœud parle directement à un pair capable de l’exécuter. Les interfaces et les méthodes de paiement acceptées sont déclarées au contact, si bien que rien n’a besoin d’être convenu à l’avance.'
				},
				{
					title: 'Il s’exécute, scellé',
					body: 'Le nœud exécute le service comme une instance isolée — sa propre machine virtuelle — sans autre accès que celui demandé par la spécification.'
				},
				{
					title: 'Payez d’avance',
					body: 'Un nœud est payé en amont pour une promesse de ressources, et la preuve de paiement conditionne l’accès. La réputation est la garantie. Aucun abonnement, aucun minimum, aucune facture permanente.'
				}
			]
		},
		tradeoffs: {
			heading: 'Face aux deux options que vous avez aujourd’hui',
			intro: 'Prenons un bot de trading comme exemple. Aujourd’hui, vous confiez votre portefeuille à un service web, ou vous trouvez le code source et le faites tourner vous-même. Chaque choix vous donne une chose et vous en coûte une autre.',
			items: [
				{
					label: 'Utiliser un service web',
					good: 'Vous ne gérez aucune infrastructure et ne configurez rien.',
					bad: 'Vous ne pouvez pas lui attribuer de réputation, parce que l’opérateur ne peut pas prouver que le système n’a pas changé — et ne peut pas vous garantir que les données de vos requêtes ne sont pas détournées.'
				},
				{
					label: 'Faire tourner vous-même le code source',
					good: 'C’est déterministe, et le développeur n’a aucun contrôle sur les données de vos requêtes.',
					bad: 'Vous avez besoin d’un matériel capable de le faire tourner, et vous devez gérer la configuration — ce qui est en général là où les gens abandonnent et reviennent à la première option.'
				},
				{
					label: 'Utiliser un service Celaut',
					good: 'Aucune infrastructure, aucune configuration, et le développeur ne peut toujours ni contrôler, ni modifier, ni extraire des données du service.',
					bad: 'Vous payez à chaque exécution, et vous dépendez de la présence, dans le réseau, d’un nœud prêt à l’exécuter au prix que vous acceptez.',
					highlight: true
				}
			]
		},
		roles: {
			heading: 'Les autres personnes du réseau',
			intro: 'Quelqu’un a écrit le service et la machine de quelqu’un le fait tourner. Ces deux rôles vous sont aussi ouverts.',
			items: [
				{
					title: 'Opérateurs de nœuds',
					body: 'Ils fournissent le matériel qui exécute ce que vous demandez, en échange d’un paiement — sans avoir besoin de savoir ce que fait le service.',
					link: 'Vous avez du matériel disponible ? →'
				},
				{
					title: 'Développeurs de services',
					body: 'Ils écrivent des services que n’importe quel nœud compatible peut exécuter, et les confient au réseau plutôt que de les héberger eux-mêmes.',
					link: 'Pour les développeurs →'
				},
				{
					title: 'Le paradigme',
					body: 'Les nœuds, les services, la spécification, et les systèmes de réputation et de paiement qui permettent à des parties qui ne se font pas confiance de coopérer malgré tout.',
					link: 'Lire l’article →'
				}
			]
		},
		cta: {
			heading: 'Partez du problème que vous avez.',
			body: 'Unstoppable Skills est un registre entièrement on-chain et sans serveur où les problèmes eux-mêmes sont les protagonistes. Recherchez une compétence et trouvez les services qui la couvrent, de vrais benchmarks comparatifs, des discussions, et un classement basé sur la réputation.',
			actions: [
				'Explorer Skills',
				'Louer plutôt votre PC'
			]
		}
	},
	install: {
		meta: {
			title: 'Installer Nodo — Celaut',
			description: 'Installez un nœud Celaut (nodo) sur Linux, Windows ou macOS.'
		},
		topbarTitle: 'Installer nodo',
		heading: 'Faites tourner un nœud Celaut',
		subtitle: 'Installez <strong>nodo</strong> et rejoignez le réseau décentralisé — découvrez des pairs, exécutez et orchestrez des services, et transformez votre machine en puissance de calcul partagée et résistante à la censure.',
		tabs: {
			linux: 'Linux',
			windows: 'Windows',
			mac: 'macOS'
		},
		copy: 'Copier',
		copied: 'Copié ✓',
		linux: {
			heading: 'Linux',
			intro: 'Installation de base — exécutez ceci dans votre terminal :',
			notes: [
				'Le script a besoin de <code>sudo</code> pour la configuration au niveau système. Les runtimes Python, Java et <code>yq</code> s’installent localement dans le répertoire principal du nœud.',
				'Vous préférez une installation manuelle, sans sudo ? Suivez le {link}.'
			],
			manualLink: 'guide manuel'
		},
		windows: {
			heading: 'Windows 11',
			intro: 'Téléchargez et exécutez l’installateur officiel :',
			download: 'Télécharger Nodo-Setup.exe',
			notes: [
				'L’installateur crée automatiquement une distribution Linux isolée dédiée à Nodo, afin que le nœud tourne séparément du reste de votre système.',
				'Aucune configuration manuelle d’un environnement Linux n’est nécessaire.'
			]
		},
		mac: {
			heading: 'macOS',
			intro: 'Un installateur natif pour macOS n’est <strong>pas encore disponible</strong>.',
			notes: [
				'La prise en charge de macOS est prévue. En attendant, vous pouvez faire tourner un nœud sur une machine Linux ou une VM Linux.',
				'Suivez le {link} pour les mises à jour.'
			],
			repoLink: 'dépôt de nodo'
		}
	},
	paradigm: {
		meta: {
			title: 'Celaut — Article formel',
			description: 'Celaut : une architecture pair-à-pair pour la conception et la distribution de logiciels — l’article formel.'
		},
		topbarTitle: 'Article formel',
		toc: 'Sommaire',
		tocNav: 'Table des matières',
		systemBehaviorHeading: 'Comportement du système',
		executionHeading: 'Exécution d’un service',
		balancerHeading: 'Répartition de charge des services'
	},
	viz: {
		home: {
			generation: 'génération {n}',
			lifeRule: '2 ou 3 voisines : vivante · exactement 3 : naissance',
			oneProtocol: 'un seul protocole que tout le monde doit exécuter',
			networkSplits: 'changez les règles et le réseau se scinde',
			whereOverlap: 'elles se parlent là où ça coïncide',
			noVote: 'aucun vote · aucune migration · aucun fork',
			blackBox: 'boîte noire',
			input: 'entrée',
			output: 'sortie',
			box: 'BOX',
			environment: 'environnement',
			api: 'API',
			interface: 'interface',
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
						'architecture — le processeur et l’environnement requis',
						'filesystem — chaque fichier, inclus, pas un nom d’image',
						'init — le point d’entrée et son démarrage',
						'config_declaration — quels fichiers sont de la configuration',
						'resources — at_init et at_most',
						'environment_variables — déclarées, avec leurs formats'
					]
				},
				api: {
					title: 'API · Interface',
					rows: [
						'slot — un port, et le transport qu’il parle',
						'protocol_stack — les protocoles de ce slot',
						'mu_per_call — le prix de chaque méthode',
						'payment_contracts — les registres qu’il accepte',
						'un coût fixe au départ, puis un coût à l’usage'
					]
				},
				net: {
					title: 'NET · Network',
					rows: [
						'une entrée par domaine de communication atteignable',
						'tags / prose / formal — comment le domaine est nommé',
						'protocol_stack — ce que ces pairs doivent parler',
						'environment_variable — quels pairs comptent comme les siens',
						'ne rien déclarer ici, c’est n’avoir aucune sortie'
					]
				}
			},
			net: 'NET',
			netDeclared: 'NET · déclaré dans la spécification',
			nowhereElse: 'et nulle part ailleurs',
			itsNodeItsParent: 'son nœud · son parent',
			aService: 'un service',
			children: 'enfants',
			whatTheySpend: 'ce qu’ils dépensent, pas où ils sont',
			developersShort: 'développeurs · ce dont il a besoin',
			developersLong: 'développeurs · ce dont il a besoin, ce qu’il dépense',
			operatorsShort: 'opérateurs · où ça tourne',
			operatorsLong: 'opérateurs · où ça tourne, ce que ça coûte',
			thisNode: 'ce nœud',
			aPeer: 'un pair',
			cost: 'coût {value}',
			oneInput: 'une entrée',
			when: [
				'maintenant',
				'dans un an',
				'sur un autre matériel'
			],
			identicalEveryTime: 'identique, à chaque fois',
			reputationLedger: 'réputation · enregistrements sur un registre',
			sourcesYouTrust: 'les sources auxquelles vous faites confiance',
			principles: {
				consequences: [
					'→ aucun protocole à accorder',
					'→ un conteneur, une interface, une portée',
					'→ une réputation qui garde son sens'
				],
				derivedFrom: 'tout le reste en découle'
			},
			firstWhatSources: 'd’abord : qu’en disent mes sources ?',
			rightShort: '2 vCPU · 30 min',
			rightLong: 'droit à 2 vCPU · 30 min',
			paymentRights: 'paiement ⇄ droits sur des ressources',
			outcomeRecorded: 'le résultat s’inscrit dans son historique',
			nextStranger: 'et c’est ce que lira le prochain inconnu',
			requester: 'demandeur',
			node: 'nœud'
		},
		developers: {
			box: 'BOX',
			api: 'API',
			net: 'NET',
			service: 'service',
			anyCompatibleNode: 'n’importe quel nœud compatible',
			optionalRegistry: 'registre de réputation optionnel',
			yourService: 'votre service',
			itsNode: 'son nœud',
			neverFindOut: 'vous ne saurez jamais où'
		},
		users: {
			you: 'vous',
			noAccount: 'sans compte',
			eachPeerItsUnit: 'chaque pair cote dans ce qu’il accepte',
			whatYouAsked: 'ce que vous avez demandé',
			whatNodeRuns: 'ce que le nœud exécute',
			identicalItRuns: 'identique — ça tourne',
			microvm: 'microVM',
			destroyed: 'détruite',
			theDeveloper: 'le développeur',
			theHostMachine: 'la machine hôte',
			computeUsed: 'le calcul que vous avez réellement utilisé',
			whatYouPay: 'ce que vous payez',
			chargingStops: 'la tâche se termine — la facturation s’arrête',
			subscription: 'un abonnement, qui facture indépendamment de ça'
		},
		depin: {
			electricityCost: 'votre coût d’électricité',
			priceYouSet: 'le prix que vous fixez',
			availableWindow: 'disponible 22 h – 7 h',
			marginCovered: 'marge couverte'
		}
	}
};

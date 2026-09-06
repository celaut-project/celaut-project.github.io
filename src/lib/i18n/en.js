/*
 * English copy. The source of truth for every user-facing string on
 * the site, and the fallback whenever another locale is missing a key.
 *
 * Shape notes
 * -----------
 * • Values may be strings, arrays or objects. Card lists live here as
 *   arrays so components iterate instead of hard-coding markup.
 * • `h` / `p` inside scene beats may contain inline HTML (<strong>,
 *   <em>) and are rendered with {@html}. Nothing here is user input.
 * • `viz.*` holds the short words painted onto the <canvas> scenes.
 * • Timing, layout and hrefs are NOT here — they are structure, and
 *   live with the components.
 */

export default {
	common: {
		scroll: 'Scroll',
		toTop: '↑ Top',
		backToTop: 'Back to top',
		gains: 'Gains',
		costs: 'Costs',
		visit: 'Visit →',
		readMore: 'Read more →',
		viewOnGitHub: 'View on GitHub →',
		languageLabel: 'Language',
		switchLanguage: 'Change language',
		// Chrome for the section-index rail. Shared by every long page
		// (the landing page and the three audience pages), so it lives
		// here rather than being repeated per namespace. The section
		// LABELS stay with their page, under `<page>.index.sections`.
		toc: {
			nav: 'Section navigation',
			title: 'On this page',
			open: 'Open section menu',
			close: 'Close section menu'
		}
	},

	theme: {
		toLight: 'Switch to light theme',
		toDark: 'Switch to dark theme',
		toggle: 'Toggle theme'
	},

	topbar: {
		nav: 'Celaut sections',
		links: {
			depin: { label: 'Rent your PC', short: 'Rent PC' },
			developers: { label: 'Developers', short: 'Devs' },
			users: { label: 'Users', short: 'Users' },
			paradigm: { label: 'Paradigm', short: 'Paradigm' }
		}
	},

	/* ============================================================== *
	 * Landing page
	 * ============================================================== */
	home: {
		hero: {
			tagline: 'A Peer-to-Peer Architecture for Software Design and Distribution',
			primary: 'Start to use it',
			secondary: 'Learn More',
			facts: [
				'Inspired by cellular automata — resilient global behaviour emerging from simple local rules.',
				'Deterministic by design: identical inputs always produce identical, verifiable output.',
				'No central registry. Services are distributed peer-to-peer across independent nodes.',
				'Every service is content-addressed — its hash is its name, so nothing can be silently swapped.',
				'Nodes run each service sealed inside its own isolated micro-environment.',
				'Reputation lives on-chain: trust is earned and provable, never granted by a gatekeeper.',
				'Three principles, all the way down: decentralization, simplicity, and determinism.'
			]
		},

		atoms: {
			eyebrow: 'The two primitives',
			// The scene introduces one primitive at a time, so the first beat
			// is deliberately silent: nothing is said while the stage is still
			// empty. `note` closes the scene once both are on screen.
			note: 'Two atoms. Specification, execution, payment and reputation are all how they interact.',
			items: [
				{
					title: 'A node',
					body: 'A <strong>computer or device</strong> that talks to peers and manages service execution. It provides hardware, decides whether to run work locally or pass it on, and never needs to understand what the software does.'
				},
				{
					title: 'A service',
					body: 'A <strong>deterministic software container</strong> built to do one job. It is sealed from the node that runs it: the node doesn’t inspect the program, and the program doesn’t know which machine it landed on.'
				}
			]
		},

		index: {
			sections: {
				foundations: 'Foundations',
				atoms: 'Nodes & Services',
				nodes: 'The network',
				services: 'Services',
				'service-spec': 'Service Spec',
				execution: 'Execution',
				determinism: 'Determinism',
				coordination: 'Coordination',
				'core-principles': 'Core Principles',
				'what-is-not': 'What It Is Not',
				implementations: 'Implementations',
				applications: 'Applications',
				'user-roles': 'Which one are you?'
			}
		},

		scenes: {
			foundations: {
				label: 'Where it comes from',
				beats: [
					{
						h: 'It starts with a handful of rules.',
						p: 'In the 1940s <strong>John von Neumann</strong> and <strong>Stanislaw Ulam</strong> introduced cellular automata: models that showed how complex behaviours could emerge from simple ones.'
					},
					{
						h: 'Nobody is directing this.',
						p: 'In 1970 <strong>John Horton Conway’s &ldquo;Game of Life&rdquo;</strong> became the classic example: a grid where each cell only ever looks at its neighbours, and yet the whole thing produces intricate, evolving structure.'
					},
					{
						h: 'That’s the whole design philosophy.',
						p: 'These ideas offer insight into how decentralized systems can <strong>achieve complexity without central control</strong> — the guiding philosophy behind Celaut. Simple rules at the node and service level, an adaptive system on top.',
						note: 'Decentralization · Simplicity · Determinism'
					}
				]
			},
			nodes: {
				label: 'The network',
				beats: [
					{
						h: 'Having nodes is not the difference.',
						p: 'Most decentralized networks have nodes, and most of them still depend on one powerful thing: <strong>the protocol everybody has to run</strong>. The rules are the centre, even when the machines are not.'
					},
					{
						h: 'Celaut has no protocol to agree on.',
						p: 'Nodes don’t have to settle on a communication protocol in advance — they <strong>declare the interfaces they support and the payment methods they accept on contact</strong>. Two nodes talk about whatever they happen to have in common; where they don’t overlap, they simply don’t talk.'
					},
					{
						h: 'So you change your node, not the network.',
						p: 'A new pricing policy, another payment method, a specification format nobody else parses yet — you <strong>implement it in your own node</strong> and it works with whoever already supports it. Nobody votes, nothing has to be migrated, and there is <strong>no hard fork to survive</strong>.',
						note: 'No shared protocol. No shared version. No permission.'
					}
				]
			},
			services: {
				label: 'What runs on it',
				beats: [
					{
						h: 'A service is a sealed container.',
						p: 'Services in Celaut are <strong>deterministic software containers</strong> designed to perform a specific task. Nothing more elaborate than that.'
					},
					{
						h: 'Following the black box principle.',
						p: 'They operate <strong>independently of the nodes that execute them</strong>, focusing solely on their functionality. The node doesn’t need to understand the service, and the service doesn’t need to know anything about the node.'
					},
					{
						h: 'Isolated, every single time.',
						p: 'Each request runs as an <strong>isolated process</strong> — in its own <strong>virtual machine</strong>, with its own kernel and a hardware-enforced boundary — which abstracts away the execution environment and keeps the security barrier intact.',
						note: 'What goes in, what comes out. That’s the whole interface.'
					}
				]
			},
			'service-spec': {
				label: 'How a service is specified',
				// Labels for the Explore control that zooms the scene into one
				// component. `{what}` is the component's own name.
				explore: 'Explore {what}',
				exploreClose: 'Back to the whole service',
				beats: [
					{
						h: '<strong>BOX</strong> — the environment.',
						p: 'Architecture, filesystem, environment variables, entrypoint, configuration and resources. It specifies the entire file structure directly rather than relying on external images or repositories, which is what makes execution reproducible on any node.'
					},
					{
						h: '<strong>API</strong> — the interface.',
						p: 'How to communicate with the service, the payment systems it accepts and the associated costs. It lets services be used without any central controller negotiating protocol on their behalf.'
					},
					{
						h: '<strong>NET</strong> — the network scope.',
						p: 'By default a service is <strong>isolated</strong>: it can talk only to its parent, its children and the node running it. If it needs the outside world, <strong>the networks it will reach are named in its own specification</strong> — the node grants them, because it wants to run the service properly, and you get the guarantee that it can never reach anywhere else.'
					},
					{
						h: 'Three components. One portable service.',
						p: 'Together they create <strong>portable, reproducible services</strong> that deploy consistently across the network while maintaining security and determinism.',
						note: 'No third-party dependencies. Nothing left implicit.'
					}
				]
			},
			execution: {
				label: 'Who decides what',
				beats: [
					{
						h: 'A service asks for its children.',
						p: 'A service can request the execution of <strong>child services</strong> through its node. It states <strong>the resources each one needs</strong> and hands over a budget for them to spend. Not a machine, not a region — resources.'
					},
					{
						h: 'The node decides where they run.',
						p: 'It compares <strong>the cost of running the instance locally against the cost each of its peers quotes</strong> and picks the one it considers best. One child stays here; another lands on a peer.'
					},
					{
						h: 'The parent never finds out.',
						p: 'It doesn’t know whether a child ended up on this machine or somewhere else, and it doesn’t need to. All it watches is <strong>what its children consume and how fast they’re spending</strong>, so it can balance that.'
					},
					{
						h: 'That split is the whole trick.',
						p: 'Node operators deal with the physical side: hardware, capacity, price, placement. Service developers <strong>declare the resources they need and nothing about infrastructure</strong>. Neither has to do the other’s job — which is exactly what keeps both halves simple.',
						note: 'Two concerns. One clean line between them.'
					}
				]
			},
			determinism: {
				label: 'Why it holds',
				beats: [
					{
						h: 'Same input. Same output.',
						p: 'Services are fully specified to aim at <strong>reproducible results</strong> across time and nodes. Given the same inputs, the same specification is meant to produce the same outputs, regardless of where or when it runs.'
					},
					{
						h: 'Not a guarantee in every case.',
						p: 'A service that reaches a network can’t be perfectly reproducible — the network answers differently. But a <strong>specification carries far more than a Docker definition does</strong>: the architecture, the whole filesystem, the entrypoint, the config. So this sits much closer to running a plain program than to pulling an image and hoping.'
					},
					{
						h: 'Which makes trust measurable.',
						p: 'Because the software can’t drift, a <strong>reputation proof recorded some time ago still says something true today</strong> — provided the service doesn’t reach out to a network, which is its default state.'
					},
					{
						h: 'And it travels.',
						p: 'Because nothing about the environment is left to the host, the same specification produces the same behaviour on <strong>a laptop, a spare server or a node you have never heard of</strong>. Where it runs stops being part of the answer.',
						note: 'Fully specified, so nothing is left to the machine.'
					}
				]
			},
			coordination: {
				label: 'How strangers cooperate',
				more: 'The trust model in full →',
				beats: [
					{
						h: 'Reputation comes first.',
						p: '<strong>Trust is never assumed between parties.</strong> Nodes don’t trust other nodes; you don’t inherently trust a service or the node running it; a node doesn’t have to trust the service it executes. The one direction that does hold is the other way round — a service can trust its node, because whoever decided to run it picked that node. So nothing starts with a handshake; it starts with a lookup: reputation is <strong>records on ledgers</strong>, opinions rather than verdicts, weighed by each actor against the sources it already trusts.'
					},
					{
						h: 'Then you pay for a promise of resources.',
						p: 'Only once the record checks out does anything move. The requester pays <strong>up front</strong>, and what they buy is a promise: <strong>this much compute, for this long</strong>. Payment mechanisms sit <strong>outside the core architecture</strong>, so no particular ledger is baked in.'
					},
					{
						h: 'The node’s guarantee is its reputation.',
						p: 'Nothing forces it to honour that right. What holds it is that <strong>the outcome is written back to the ledger</strong> — and a node whose record says it took payment and under-delivered stops getting chosen. Each party has a standing interest in the next stranger liking what they read.',
						note: 'Check · pay · deliver · record. Then round again.'
					}
				]
			},

			// The closing scene of the paradigm sequence. Not a new idea:
			// the three commitments every scene before it is a consequence
			// of. The canvas draws them as a closed figure and takes the
			// vertex names from `home.principles.items`, so the drawing and
			// the words can never disagree in any locale.
			'core-principles': {
				label: 'The rules it holds to',
				beats: [
					{
						h: 'None of that was a feature list.',
						p: 'A network with no protocol to agree on, services sealed from the machines that run them, networks named up front, payment before execution — every one of those is a <strong>consequence</strong>. Three commitments produce them, and they hold each other up.'
					},
					{
						h: 'Decentralization.',
						p: 'No <strong>single point of control or failure</strong>. Nodes communicate and coordinate dynamically, with nothing in the middle to ask permission from — which is why there was no protocol to agree on in the first place.'
					},
					{
						h: 'Simplicity.',
						p: '<strong>Minimalist rules</strong> that reduce complexity, so each component stays small enough to be understood and maintained on its own. A service is a container, an interface and a network scope, and that is the whole of it.'
					},
					{
						h: 'Determinism.',
						p: 'Services are specified completely enough to <strong>reproduce their results</strong> across time and across machines. Same inputs, same outputs, wherever and whenever they run — which is what makes a reputation recorded a year ago still worth reading today.',
						note: 'Drop any one of the three and the other two stop being worth much.'
					}
				]
			}
		},

		roles: {
			eyebrow: 'Pick your way in',
			heading: 'Which one are you?',
			intro: 'As users, we can play three types of roles in the ecosystem. Each has its own way in.',
			items: [
				{
					eyebrow: 'Role 01',
					title: 'Node maintainers',
					lede: 'Similar to miners in blockchain systems, node maintainers provide computational resources to the network. They execute services requested by users in exchange for payment, without needing to understand the specific functionality of those services.',
					points: [
						'Provide hardware resources',
						'Execute services on request',
						'Receive compensation for resources'
					],
					primary: 'Rent your PC',
					secondary: 'Run a node'
				},
				{
					eyebrow: 'Role 02',
					title: 'Service developers',
					lede: 'Developers create services that can run on any compatible node in the network. They focus on building functionality without worrying about the underlying infrastructure details.',
					points: [
						'Design service specifications',
						'Build deterministic applications',
						'Distribute services to nodes'
					],
					primary: 'Build on Celaut',
					secondary: 'Explore Skills'
				},
				{
					eyebrow: 'Role 03',
					title: 'Service users',
					lede: 'End users launch services on nodes, paying for the computational resources used.',
					points: [
						'Request service execution',
						'Pay for computational resources',
						'Consume service outputs'
					],
					primary: 'Use the network',
					secondary: 'Explore Skills'
				}
			]
		},

		// The three principle NAMES, read by the core-principles canvas
		// scene for its vertex labels. The prose that used to live here is
		// now the scene's caption beats, under `home.scenes.core-principles`.
		principles: {
			items: [
				{
					title: 'Decentralization'
				},
				{
					title: 'Simplicity'
				},
				{
					title: 'Determinism'
				}
			]
		},

		whatIsNot: {
			eyebrow: 'Common misreadings',
			heading: 'What Celaut is not',
			intro: 'The architecture sits close enough to several familiar things to be mistaken for them. It is worth being precise about the differences.',
			items: [
				{
					title: 'Not a single network',
					body: 'Celaut defines a <strong>flexible architecture</strong>, not one predetermined network. Predominant networks may well emerge, but the system supports many peer-to-peer constructions rather than dictating a singular one.'
				},
				{
					title: 'Not a complete protocol stack',
					body: 'It provides <strong>core principles</strong> for building computation distribution stacks, not a full opinionated stack. Current implementations lean on components like gRPC and Ergo, and those are interchangeable choices.'
				},
				{
					title: 'Not a blockchain project',
					body: 'Celaut has <strong>no native cryptocurrency</strong> and no DAOs. It does incorporate blockchain technologies where they earn their place — recording reputation, settling payment between strangers — without adopting the broader ecosystem around them.'
				}
			]
		},

		// What exists, and at what stage. This block used to be a
		// subsection of a "Nodes: the foundation of the network" block whose
		// four node responsibilities duplicated the /depin page wholesale;
		// those moved to `depin.responsibilities` and this stands on its own.
		//
		// The `stage` field is the honest part. Nodo is a running node with
		// installers for two operating systems; Chatui is a repository with
		// a README and no implementation behind it yet. Presenting the two as
		// a matched pair of "implementations you can run today" was a claim
		// the second one could not support.
		implementations: {
			eyebrow: 'The software',
			heading: 'What exists today',
			intro: 'The architecture is a specification, and anyone can implement a node against it. One implementation runs the network now; a second is an announced direction, and is marked as such.',
			items: [
				{
					name: 'Nodo',
					stage: 'Running',
					body: 'The reference implementation, in Python3 and Rust. It executes services, negotiates cost with peers, provisions addresses and tokens, and resolves dependencies wherever they run. Installable on Linux with one command, and on Windows 11 through an official installer that provisions its own isolated Linux environment.'
				},
				{
					name: 'Chatui',
					stage: 'Concept',
					body: 'A stated intention to build an Android node that reaches services through a plain chat interface, without trusting any other node. The repository currently holds that description and nothing more — there is no code to run yet.'
				}
			],
			note: 'Nothing here is a placeholder for something that already works elsewhere. What runs, runs; what does not, says so.'
		},

		// Two layers, not two owners.
		//
		// The old shape here was "ours" versus "third-party / not built by
		// us", which put a company voice on a page that has none, and drew
		// the wrong line anyway: what actually separates these things is
		// DISTANCE FROM THE ARCHITECTURE. DePIN and Skills are what the
		// architecture does when you switch it on — remove Celaut and there
		// is nothing left of them. Game of Prompts is a product with its own
		// reason to exist that happens to be built out of Celaut services;
		// it would still be a game if it were rebuilt on something else.
		// That is the distinction worth drawing, and it is one the reader
		// can act on: the first layer is what running a node gets you, the
		// second is what other people can go and make with it.
		applications: {
			eyebrow: 'Where it is already running',
			heading: 'Real-world impact and applications',
			intro: 'The architecture is not a thought experiment. It is in use at two different distances — as the layer itself, and as the foundation under something with its own reason to exist.',
			layerHeading: 'The architecture, switched on',
			layerTag: 'The layer itself',
			layerIntro: 'Neither of these is an application built on Celaut. They are what Celaut <strong>is</strong>, once nodes are actually running.',
			layer: [
				{
					name: 'DePIN',
					body: 'Anyone can run a Celaut node and become part of a decentralized physical infrastructure network. Each node discovers peers, executes and orchestrates services, and manages their dependencies — turning ordinary computers into shared, censorship-resistant compute. This is the network, not a product on it.'
				},
				{
					name: 'Unstoppable Skills',
					body: 'A fully on-chain, serverless registry where the problems are the protagonists. Instead of hunting for services, agents search for a skill and discover the services that cover it, with real benchmarks and reputation-based ranking. It is how the paradigm’s reputation layer is actually reached — on Ergo, with native skin-in-the-game: nobody spams without risking reputation.'
				}
			],
			builtOnHeading: 'Built on top of it',
			builtOnTag: 'Independent project',
			builtOnIntro: 'One step further out: a product with its own purpose and its own users, which happens to be assembled from Celaut services. It would still make sense if it were rebuilt on something else — that is exactly what makes it evidence.',
			builtOn: {
				name: 'Game of Prompts',
				body: [
					'A competitive platform where creators design <strong>game-services</strong> that evaluate the robots playing them, and players write <strong>solver-services</strong> that try to maximise their score.',
					'The services follow the Celaut paradigm, and the whole system uses the Ergo blockchain to record results and transfer prizes.'
				]
			},
			ergoDocs: 'Ergo docs',
			formalPaper: 'Formal paper'
		}
	},

	/* ============================================================== *
	 * /depin — Rent your PC
	 * ============================================================== */
	depin: {
		meta: {
			title: 'Rent your PC — Celaut DePIN',
			description:
				"Sell your computer's resources when you're not using them. Celaut's DePIN layer is fully peer-to-peer, lets you price compute around your electricity costs, and isolates every workload inside a microVM."
		},
		topbarTitle: 'Rent your PC',
		// Section-index labels for the left rail, in page order.
		index: {
			sections: {
				rent: 'The idea',
				p2p: 'Peer-to-peer',
				electricity: 'Your power bill',
				isolation: 'Isolation',
				payoff: 'What you get',
				responsibilities: 'What a node does',
				steps: 'Install to income',
				roles: 'The other side',
				cta: 'Get started'
			}
		},
		hero: {
			eyebrow: 'Celaut DePIN',
			title: 'Rent your PC.',
			tagline: "Sell your computer's resources when you're not using them.",
			lede: 'Your machine spends most of the day idle. Celaut turns that unused capacity into something people pay for — directly, on your terms, with every workload sealed away from your system.',
			actions: ['Start renting your PC', 'See how it works'],
			stats: [
				{ value: '100%', label: 'peer-to-peer — no company in the middle' },
				{ value: 'You', label: 'set the price, factoring in your power bill' },
				{ value: 'microVM', label: 'isolation for every workload you host' }
			]
		},
		scenes: {
			rent: {
				label: 'The idea',
				beats: [
					{
						h: 'Your PC is idle right now.',
						p: 'Most personal machines sit unused for the majority of every day. That’s real hardware — cores, memory, disk — doing nothing at all.'
					},
					{
						h: 'Sell what you’re not using.',
						p: 'Celaut carves your machine into <strong>capacity you can rent out</strong>. You decide how much of it goes to the network and how much stays yours — the rest of the machine keeps working exactly as it always did.'
					},
					{
						h: 'Get paid for the work it does.',
						p: 'Peers who need compute find your node, agree a price with it directly, and pay <strong>up front</strong> for a promise of resources. <strong>Payment settles on Ergo</strong>; reputation is the guarantee the node will deliver.',
						note: 'No datacenter. No middleman. No monthly payout wait.'
					}
				]
			},
			p2p: {
				label: 'Benefit 01',
				beats: [
					{
						h: 'Fully peer-to-peer.',
						p: 'Every other &ldquo;rent out your hardware&rdquo; platform puts a company in the middle. It holds the marketplace, takes the cut, sets the rules, and can remove you from its network whenever it likes.'
					},
					{
						h: 'There is nobody in the middle.',
						p: 'Celaut has <strong>no foundation and no company</strong> sitting between the two parties. Your node and the peer that wants compute talk to each other <strong>directly</strong> — discovery, negotiation, execution, settlement.'
					},
					{
						h: 'Which means nobody can cut you off.',
						p: 'No account to suspend, no terms to change under you, no fee that quietly grows. The interaction is <strong>completely peer-to-peer</strong>, so the only thing either side depends on is the other side.',
						note: 'Nothing to sign up for. Nothing to be de-platformed from.'
					}
				]
			},
			electricity: {
				label: 'Benefit 02',
				beats: [
					{
						h: 'Compute isn’t free to give away.',
						p: 'Running your machine costs electricity, and that cost isn’t flat — it moves through the day and changes with where you live.'
					},
					{
						h: 'Price it in.',
						p: 'Celaut lets you <strong>optionally factor electricity costs</strong> into the price you set for your compute. Your node prices work with your power bill in the equation, so renting out capacity never quietly costs you money.'
					},
					{
						h: 'And decide when you’re open.',
						p: '<strong>Availability and runtime are yours to set too.</strong> Only rent the machine overnight when power is cheapest, cap how long a single job may run, or go offline entirely — the network simply routes elsewhere.',
						note: 'Your rates. Your hours. Your margin.'
					}
				]
			},
			isolation: {
				label: 'Benefit 03',
				beats: [
					{
						h: 'Whose code is running on my PC?',
						p: 'It’s the first question anyone sensible asks. Renting out your machine can’t mean handing strangers the keys to it.'
					},
					{
						h: 'Full execution isolation.',
						p: 'Every workload runs sealed inside its own <strong>microVM</strong> — a real virtual machine with its own kernel and a hardware-enforced boundary, not a shared-kernel container. It cannot see your files, your network, or any other workload on the machine.'
					},
					{
						h: 'The same tech the big clouds run on.',
						p: 'microVMs are what <strong>major cloud providers</strong> use to run untrusted code from millions of strangers on shared hardware. Celaut puts that same isolation model on your desk — the guarantee isn’t a promise, it’s the architecture.',
						note: 'Job ends, VM is destroyed. Nothing persists.'
					}
				]
			}
		},
		payoff: {
			heading: 'What you actually get',
			items: [
				{
					title: 'Idle hardware, working',
					body: 'Gaming rig asleep at 3am, workstation idle over the weekend, a spare box in a cupboard. If it can run nodo, it can earn.'
				},
				{
					title: 'You set the terms',
					body: "Price per unit of compute, which hours you're available, how much of the machine you're willing to hand over. All of it yours to change."
				},
				{
					title: 'Paid up front',
					body: 'A node is paid beforehand for a promise of resources — on Ergo (ERG), no invoices, no platform payout schedule, no minimum threshold. Reputation is the guarantee it will deliver.'
				},
				{
					title: 'Nothing to trust',
					body: 'Services are content-addressed: the requester gets the exact software they asked for, and you run it without inspecting or vouching for it.'
				},
				{
					title: 'Your files stay yours',
					body: 'A workload lives in its own microVM with its own kernel. It never sees your disk, your network, or anything else on the machine.'
				},
				{
					title: 'Leave whenever',
					body: 'Stop the node and the network routes around you. There is no contract, no lock-in, and nobody to ask for permission.'
				}
			]
		},
		// The four responsibilities the paradigm assigns to a node. These
		// used to sit on the landing page as "Nodes: the foundation of the
		// network", which restated an entire page that already exists — this
		// one. They belong here, between what you get for running a node and
		// how you start one: this is the answer to "what is the software on
		// my machine actually doing all day?"
		responsibilities: {
			heading: 'What the node on your machine actually does',
			intro: 'A node is a <strong>computer or device</strong> that communicates with peers and manages service execution. The paradigm gives it four jobs, and puts no coordinator above it.',
			items: [
				{
					title: 'Service execution',
					body: 'It negotiates execution costs with peers and decides whether to run a service locally or delegate it, so resources go where they are cheapest.'
				},
				{
					title: 'Communication',
					body: 'It declares the interfaces it supports and the payment methods it accepts on contact, which is what lets protocols evolve without prior agreement.'
				},
				{
					title: 'Security',
					body: 'It issues and manages the addresses and authentication tokens every service interaction is identified by.'
				},
				{
					title: 'Dependencies',
					body: 'It makes sure a service can reach what it needs, wherever across the network that dependency happens to be running.'
				}
			],
			note: 'None of it requires knowing what the software it runs is for.'
		},
		steps: {
			heading: 'From install to income',
			items: [
				{
					title: 'Install nodo',
					body: 'One command on Linux, an installer on Windows. Your machine joins the network and starts discovering peers.'
				},
				{
					title: 'Set your price and hours',
					body: "Tell the node what your compute costs — including electricity if you want it factored in — and when it's available."
				},
				{
					title: 'Accept work',
					body: 'Peers negotiate directly with your node. Accepted workloads run sealed inside a microVM, isolated from everything else.'
				},
				{
					title: 'Get paid',
					body: 'Payment is taken up front on Ergo; reputation is recorded as the work is honoured. Contribution is rewarded; results stay auditable.'
				}
			]
		},
		roles: {
			heading: 'The other side of the trade',
			intro: 'Renting your PC out is one half of the network. The other half is being able to <em>use</em> it — and the same properties that protect you as a host are what make the network worth buying from.',
			items: [
				{
					title: 'Developers',
					body: "Ship a program once as a sealed, content-addressed service and let the network host, discover and scale it. Reproducibility comes from the design, not from a provider's SLA.",
					link: 'For developers →'
				},
				{
					title: 'Agents &amp; users',
					body: 'Request services by the problem they solve and pay per execution. No cloud account, no lock-in — and the seal proves you got exactly the software you asked for.',
					link: 'For final users →'
				},
				{
					title: 'Hosts',
					body: "That's you. Contribute whatever hardware you have; the node's virtualization layer means workloads still land somewhere they fit, even across CPU architectures."
				}
			]
		},
		cta: {
			heading: 'Turn your idle machine on.',
			body: "Installing a node takes one command. It's the fastest way to see what your hardware is worth when it isn't doing anything else.",
			actions: ['Run a node', 'Read the paradigm']
		}
	},

	/* ============================================================== *
	 * /developers — Build it once
	 * ============================================================== */
	developers: {
		meta: {
			title: 'For developers — Build once, run anywhere | Celaut',
			description:
				'Build Celaut services: specify a BOX, an API and a NET scope, hand it to one node, and let the network distribute and execute it. No infrastructure, no configuration, no platform in the middle.'
		},
		topbarTitle: 'For developers',
		// Section-index labels for the left rail, in page order.
		index: {
			sections: {
				spec: 'The idea',
				agnostic: 'Run anywhere',
				distribute: 'Distribution',
				compose: 'Composition',
				payoff: 'What you get',
				distribution: 'How it spreads',
				steps: 'Code to network',
				tradeoffs: 'The trade',
				roles: 'The rest',
				cta: 'Get started'
			}
		},
		hero: {
			eyebrow: 'Service developers',
			title: 'Build it once.',
			tagline: 'Then stop thinking about where it runs.',
			lede: "A Celaut service isn't a deployment — it's a specification. Describe the environment, the interface and the network scope, hand it to a single node, and the network takes it from there.",
			actions: ['Explore Skills', 'See how it works'],
			stats: [
				{ value: 'BOX · API · NET', label: 'three components — that is the whole specification' },
				{ value: 'No DevOps', label: 'nodes handle execution; there is no cloud account to open' },
				{ value: 'Deterministic', label: 'same inputs, same outputs, on any node, at any time' }
			]
		},
		scenes: {
			spec: {
				label: 'The idea',
				beats: [
					{
						h: 'You don’t deploy. You specify.',
						p: 'There is no server to provision, no image to push, no pipeline to keep green. A service in Celaut is a written description of what it needs to run.'
					},
					{
						h: 'Three components. That’s all of it.',
						p: '<strong>BOX</strong> describes the execution environment — architecture, filesystem, environment variables, entrypoint, config. It specifies the entire file structure directly, rather than pointing at an external image, which is what keeps execution reproducible.'
					},
					{
						h: 'And how the world reaches it.',
						p: '<strong>API</strong> defines how clients and other services talk to it, plus accepted payment methods and costs. <strong>NET</strong> names the external networks it will reach — by default a service is isolated, and anything wider is declared in the specification itself, so users know up front where it can go.',
						note: 'Portable, reproducible, free of third-party dependencies.'
					}
				]
			},
			agnostic: {
				label: 'Benefit 01',
				beats: [
					{
						h: 'Whatever you wrote, it ships the same way.',
						p: 'Celaut doesn’t ask you to adopt a framework, a runtime or an SDK. It asks for a filesystem and an entrypoint.'
					},
					{
						h: 'The node doesn’t care either.',
						p: 'Services follow the <strong>black box principle</strong>: they operate independently of the details of the nodes that execute them, and nodes run them without needing to understand what they do.'
					},
					{
						h: 'So any compatible node will take it.',
						p: 'The BOX declares the microarchitecture it targets, so nodes know whether they’re a match. Beyond that, <strong>your service can be run by anyone on any compatible node</strong> — that’s the whole contract.',
						note: 'No lock-in, because there’s nothing to be locked into.'
					}
				]
			},
			distribute: {
				label: 'Benefit 02',
				beats: [
					{
						h: 'Hand it to one node.',
						p: 'You don’t publish to a store and you don’t wait for review. The developer only needs to <strong>send the service to one or more nodes</strong>.'
					},
					{
						h: 'The network carries it from there.',
						p: 'Those nodes handle <strong>distributing the service among others</strong>. There is no central service registry — services spread peer-to-peer, so there’s no single point of failure and no gatekeeper deciding whether you’re allowed in.'
					},
					{
						h: 'Discoverable, if you want it to be.',
						p: 'Nodes can also <strong>upload the service to a reputation system</strong>, so users and other services can judge whether to use it, and when. Services can be declared on a blockchain registry — like the <strong>Sigma Reputation System</strong> on Ergo — to improve visibility and trust.',
						note: 'Nothing to sign up for. Nobody taking a cut.'
					}
				]
			},
			compose: {
				label: 'Benefit 03',
				beats: [
					{
						h: 'Services that call services.',
						p: 'A service can request the execution of other services — its <strong>child services</strong> — through the node running it. Complex workflows are built by composition, not by orchestration config.'
					},
					{
						h: 'The node decides where they land.',
						p: 'Nodes manage service instances and decide whether to run them locally or distribute the load across peers. Dependencies are the node’s problem to solve — it ensures services can reach what they need across the network.'
					},
					{
						h: 'And you never find out where.',
						p: '<strong>The parent service does not know where its dependencies are executed.</strong> Each child simply states the resources it requires. You write the composition; the network solves the placement.',
						note: 'No scheduler to configure. No topology to maintain.'
					}
				]
			}
		},
		payoff: {
			heading: 'What the architecture gives you',
			items: [
				{
					title: 'Specify, don’t deploy',
					body: 'A service is a BOX (architecture, filesystem, environment, entrypoint, config), an API and a NET scope. Write that down and you are done — there is no deployment step to own.'
				},
				{
					title: 'Self-contained by construction',
					body: 'The BOX describes the entire file structure the service needs, rather than pointing at external images or repositories. No third-party registry can go missing underneath you.'
				},
				{
					title: 'A black box, on purpose',
					body: "Services operate independently of the nodes that execute them. You never write against a node's environment, because you are never told what it is."
				},
				{
					title: 'Reproducible, not “best effort”',
					body: 'Given the same inputs a service always produces the same outputs, regardless of where or when it runs. Determinism is an architectural property here, not a provider promise.'
				},
				{
					title: 'Composition without orchestration',
					body: 'A service can request the execution of child services through its node. The parent does not know where they run; each one just states the resources it needs.'
				},
				{
					title: 'Reputation you can accumulate',
					body: 'Because a service is deterministic and isolated by default, a reputation proof recorded a while ago still says something true about it today.'
				}
			]
		},
		steps: {
			heading: 'From code to running on the network',
			items: [
				{
					title: 'Write the service',
					body: 'Any language, any stack. What matters is the filesystem it needs and the command that starts it — not the framework you reached for.'
				},
				{
					title: 'Specify BOX, API and NET',
					body: 'Declare the environment, how callers talk to the service and what (if any) external network access it should be able to request.'
				},
				{
					title: 'Send it to a node',
					body: 'One node is enough. It distributes the service to others and can publish it to a reputation system so users and other services can find it.'
				},
				{
					title: 'Let the network run it',
					body: 'Nodes negotiate cost and decide where each instance executes. You are not in the loop, and you have no infrastructure to keep alive.'
				}
			]
		},
		// The two routes a service takes once it leaves its developer.
		// This used to be a "Service distribution" block on the landing
		// page, where it duplicated the coordination and specification
		// scenes above it and served an audience the landing page had not
		// yet asked the reader to identify with. Distribution is a
		// developer's problem, so it sits on the developer's page, directly
		// after the distribute scene it makes concrete.
		distribution: {
			heading: 'How a service actually spreads',
			intro: 'There is no store to publish to and no review to wait for. A service is handed to one node, and the network carries it from there — by default off-chain, and optionally on it.',
			items: [
				{
					title: 'Peer-to-peer by default',
					body: 'Celaut has <strong>no central service registry</strong>. Services spread across nodes peer-to-peer, so they can be found directly — and there is no gatekeeper deciding whether you are allowed in.'
				},
				{
					title: 'On a registry, if it earns its place',
					body: 'Services can also be declared on a blockchain that implements a registry — like the <strong>Sigma Reputation System</strong> on Ergo — when visibility and an auditable trail are worth more than staying entirely off-chain. It is an option, never a requirement.'
				}
			]
		},
		tradeoffs: {
			heading: 'The trade you’re actually making',
			intro: "Today, shipping software means picking between hosting it yourself and asking people to run it themselves. Both options cost something. Celaut's claim is narrow and specific: it takes the advantages of each without their disadvantages — at the price of your control over the running service.",
			items: [
				{
					label: 'A hosted web service',
					good: 'Users need no infrastructure and no configuration.',
					bad: "You can't prove the system hasn't changed, and users have to take your word that their request data isn't being misused."
				},
				{
					label: 'Source code they run themselves',
					good: "Deterministic — once downloaded, you can't change it under them — and their request data never reaches you.",
					bad: 'They need capable hardware and have to survive the configuration, which is where most people give up.'
				},
				{
					label: 'A Celaut service',
					good: 'No infrastructure to manage and nothing to configure, because the spec already covers the container, architecture, network needs and interface.',
					bad: "You give up control: you can't modify, throttle or extract data from a service once it's out there. That's the point.",
					highlight: true
				}
			]
		},
		roles: {
			heading: 'The rest of the network',
			intro: 'Your service needs somewhere to run and someone to run it for. Both of those are people too.',
			items: [
				{
					title: 'Node maintainers',
					body: 'They provide the hardware and execute whatever is requested, without needing to understand what your service does, in exchange for payment.',
					link: 'Rent your PC →'
				},
				{
					title: 'Final users',
					body: 'They launch services on nodes and pay for the computational resources used — and can verify that what ran is exactly what the spec described.',
					link: 'For final users →'
				},
				{
					title: 'The paradigm',
					body: 'The full architecture: nodes, services, specification, coordination through reputation and payment systems, and why any of it is necessary.',
					link: 'Read the paper →'
				}
			]
		},
		cta: {
			heading: 'Start from the problems.',
			body: 'Unstoppable Skills is a registry where the problems are the protagonists: search for a skill, and find the services that cover it, their benchmarks and their reputation. It’s the shortest path from &ldquo;what should I build&rdquo; to &ldquo;who needs it&rdquo;.',
			actions: ['Explore Skills', 'Read the paradigm']
		}
	},

	/* ============================================================== *
	 * /users — Run it, pay for what it used
	 * ============================================================== */
	users: {
		meta: {
			title: 'For final users — Run it, pay for what it used | Celaut',
			description:
				'Launch services on Celaut nodes and pay only for the computational resources used. No accounts, no subscriptions, no platform in the middle — services run isolated and deterministically, so you get exactly what the specification describes.'
		},
		topbarTitle: 'For final users',
		// Section-index labels for the left rail, in page order.
		index: {
			sections: {
				ask: 'The idea',
				proof: 'What you get back',
				sealed: 'Sealed',
				pay: 'What you pay',
				payoff: 'What you get',
				steps: 'Ask to result',
				tradeoffs: 'The trade',
				roles: 'The others',
				cta: 'Get started'
			}
		},
		hero: {
			eyebrow: 'Service users',
			title: 'Run it.',
			tagline: 'Pay for what it used. Nothing else.',
			lede: "Launch a service on a node, get the result, pay for the compute it consumed. There's no account to create, no subscription to cancel, and no company sitting between you and the machine that did the work.",
			actions: ['Explore Skills', 'See how it works'],
			stats: [
				{ value: 'No account', label: 'nothing to sign up for, nothing to be locked out of' },
				{ value: 'Per execution', label: 'you pay for the computational resources actually used' },
				{ value: 'Isolated', label: 'services run sealed, and see nothing they were not given' }
			]
		},
		scenes: {
			ask: {
				label: 'The idea',
				beats: [
					{
						h: 'Ask the network, not a company.',
						p: 'You want something done — a model run, a sequence analysed, a bot traded, a file processed. Today that means picking a provider and opening an account with them.'
					},
					{
						h: 'Nodes answer directly.',
						p: 'Celaut has <strong>no central service registry</strong>. Services are distributed across nodes peer-to-peer, and nodes declare their supported interfaces and <strong>accepted payment methods on contact</strong> — so nothing has to be agreed with anyone in advance.'
					},
					{
						h: 'You deal with the machine that does the work.',
						p: 'Your node negotiates the execution cost with a peer and the work happens. There is <strong>no platform in the middle</strong> taking a cut, setting the rules, or able to remove you from a network you never joined.',
						note: 'No signup. No subscription. No middleman.'
					}
				]
			},
			proof: {
				label: 'Benefit 01',
				beats: [
					{
						h: 'How do you know what actually ran?',
						p: 'With a hosted service you can’t. The operator can’t prove the system hasn’t changed — so when a tool gets popular, nothing stops its performance quietly dropping to save costs.'
					},
					{
						h: 'Here, the service <em>is</em> its specification.',
						p: 'A service specifies its entire environment — architecture, filesystem, entrypoint, config. Change any of it and it is <strong>a different service</strong>, not a silent update to the one you were using.'
					},
					{
						h: 'So the result is reproducible.',
						p: 'Given the same inputs, a service <strong>always produces the same outputs</strong>, regardless of which node executes it or when. That’s what makes a reputation record from months ago still worth something today.',
						note: 'Determinism is the guarantee. Not a promise — the design.'
					}
				]
			},
			sealed: {
				label: 'Benefit 02',
				beats: [
					{
						h: 'Your request is nobody else’s business.',
						p: 'When you send a workload somewhere, the honest question is who else gets to see it on the way through.'
					},
					{
						h: 'Every execution is isolated.',
						p: 'The node runs the service as an <strong>isolated instance</strong> — its own virtual machine. By default a service is cut off from external networks entirely, able to talk only to its parent, its children and the node running it.'
					},
					{
						h: 'And the developer isn’t on the other end.',
						p: '<strong>Service developers cannot control, modify or extract data from a service</strong>, because they don’t control the nodes that distribute and run it. Any wider network access has to be declared in the specification, in the open, before you ever run it.',
						note: 'Isolated by default. Access is requested, never assumed.'
					}
				]
			},
			pay: {
				label: 'Benefit 03',
				beats: [
					{
						h: 'You pay before it runs. Full stop.',
						p: 'Users launch services on nodes and <strong>pay up front for a promise of resources</strong>. That’s the entire commercial relationship.'
					},
					{
						h: 'Nothing accrues while you’re idle.',
						p: 'There is no seat, no tier and no monthly floor. Payment is taken <strong>beforehand</strong> in exchange for resources to be consumed; proof of payment gates access. The node’s guarantee is its reputation, not a bill at the end.'
					},
					{
						h: 'Priced by a market, not a pricing page.',
						p: 'Nodes set their own costs and compete on them, and <strong>services have a marginal cost of zero</strong> — the cost of running one falls on the node — so many start free to build reputation. Payment systems sit outside the core architecture, so which ledger settles it is not fixed either.',
						note: 'Pay per execution. Leave whenever. Nothing to cancel.'
					}
				]
			}
		},
		payoff: {
			heading: 'What you actually get',
			items: [
				{
					title: 'No infrastructure to manage',
					body: 'The nodes handle it. There is no cloud provider to choose, no machine to keep alive, and nothing to leave running between uses.'
				},
				{
					title: 'No configuration',
					body: 'The service specification already covers how the container is built, the architecture it needs, its network requirements and its interface. None of that is yours to work out.'
				},
				{
					title: 'The developer has no reach',
					body: "Service developers can't control, modify or extract data from a service — they don't control the nodes that distribute and run it."
				},
				{
					title: 'It can’t change under you',
					body: 'A service is deterministic: the same inputs produce the same outputs, whenever and wherever it runs. Nobody can quietly throttle it to save costs.'
				},
				{
					title: 'Judged by reputation, not ranking',
					body: 'Reputation lives as records on a ledger, and each participant weighs the sources it trusts. There is no editorial front page deciding what you see.'
				},
				{
					title: 'Nothing to be removed from',
					body: 'Discovery is peer-to-peer with no central registry, so there is no account to suspend and no listing to pull.'
				}
			]
		},
		steps: {
			heading: 'From “I need this done” to a result',
			items: [
				{
					title: 'Find the service',
					body: 'Search by the problem you want solved. Nodes discover services peer-to-peer, and registries like Unstoppable Skills map problems to the services that cover them.'
				},
				{
					title: 'Request an execution',
					body: 'Your node talks directly to a peer that can run it. Interfaces and accepted payment methods are declared on contact, so nothing has to be agreed in advance.'
				},
				{
					title: 'It runs, sealed',
					body: 'The node executes the service as an isolated instance — its own virtual machine — with no access beyond what the specification asked for.'
				},
				{
					title: 'Pay up front',
					body: 'A node is paid beforehand for a promise of resources, with proof of payment gating access. Reputation is the guarantee. No subscription, no minimum, no standing bill.'
				}
			]
		},
		tradeoffs: {
			heading: 'Against the two options you have today',
			intro: 'Take a trading bot as the example. Right now you either hand your portfolio to a web service, or you find the source and run it yourself. Each choice buys you one thing and costs you another.',
			items: [
				{
					label: 'Use a web service',
					good: 'You run no infrastructure and configure nothing.',
					bad: "You can't attribute reputation to it, because the operator can't prove the system hasn't changed — and can't assure you your request data isn't misused."
				},
				{
					label: 'Run the source yourself',
					good: "It's deterministic, and the developer has no control over your request data.",
					bad: 'You need hardware capable of running it, and you have to deal with the configuration — which is usually where people give up and go back to option one.'
				},
				{
					label: 'Use a Celaut service',
					good: "No infrastructure, no configuration, and the developer still can't control, modify or extract data from the service.",
					bad: 'You pay per execution, and you depend on the network having a node willing to run it at a price you accept.',
					highlight: true
				}
			]
		},
		roles: {
			heading: 'The other people in the network',
			intro: "Someone wrote the service and someone's machine runs it. Both roles are open to you too.",
			items: [
				{
					title: 'Node maintainers',
					body: 'They provide the hardware that executes what you request, in exchange for payment — without needing to know what the service does.',
					link: 'Have spare hardware? →'
				},
				{
					title: 'Service developers',
					body: 'They write services that any compatible node can run, and hand them to the network rather than hosting them.',
					link: 'For developers →'
				},
				{
					title: 'The paradigm',
					body: "Nodes, services, specification, and the reputation and payment systems that let parties who don't trust each other still cooperate.",
					link: 'Read the paper →'
				}
			]
		},
		cta: {
			heading: 'Start from the problem you have.',
			body: 'Unstoppable Skills is a fully on-chain, serverless registry where the problems themselves are the protagonists. Search for a skill and find the services that cover it, real comparative benchmarks, discussion, and reputation-based ranking.',
			actions: ['Explore Skills', 'Rent your PC instead']
		}
	},

	/* ============================================================== *
	 * /install
	 * ============================================================== */
	install: {
		meta: {
			title: 'Install Nodo — Celaut',
			description: 'Install a Celaut node (nodo) on Linux, Windows, or macOS.'
		},
		topbarTitle: 'Install nodo',
		heading: 'Run a Celaut Node',
		subtitle:
			'Install <strong>nodo</strong> and join the decentralized network — discover peers, execute and orchestrate services, and turn your machine into shared, censorship-resistant compute.',
		tabs: { linux: 'Linux', windows: 'Windows', mac: 'macOS' },
		copy: 'Copy',
		copied: 'Copied ✓',
		linux: {
			heading: 'Linux',
			intro: 'Basic installation — run this in your terminal:',
			notes: [
				"The script needs <code>sudo</code> for system-level setup. Python, Java and <code>yq</code> runtimes are installed locally under the node's main directory.",
				'Prefer a manual, no-sudo install? Follow the {link}.'
			],
			manualLink: 'manual guide'
		},
		windows: {
			heading: 'Windows 11',
			intro: 'Download and run the official installer:',
			download: 'Download Nodo-Setup.exe',
			notes: [
				'The installer automatically creates an isolated Linux distribution dedicated to Nodo, so the node runs separated from the rest of your system.',
				'No manual Linux environment setup is required.'
			]
		},
		mac: {
			heading: 'macOS',
			intro: 'A native macOS installer is <strong>not available yet</strong>.',
			notes: [
				'Support for macOS is planned. In the meantime, you can run a node on a Linux machine or a Linux VM.',
				'Follow {link} for updates.'
			],
			repoLink: 'the nodo repository'
		}
	},

	/* ============================================================== *
	 * /paradigm
	 * ============================================================== */
	paradigm: {
		meta: {
			title: 'Celaut — Formal Paper',
			description:
				'Celaut: a peer-to-peer architecture for software design and distribution — the formal paper.'
		},
		topbarTitle: 'Formal Paper',
		toc: 'Index',
		tocNav: 'Table of contents',
		systemBehaviorHeading: 'System behavior',
		executionHeading: 'Execution of a service',
		balancerHeading: 'Service load balancing'
	},

	/* ============================================================== *
	 * Words painted onto the <canvas> scenes.
	 * Kept short on purpose — they are labels, not sentences, and the
	 * layout positions them by hand.
	 * ============================================================== */
	viz: {
		home: {
			generation: 'generation {n}',
			lifeRule: '2 or 3 neighbours: live · exactly 3: born',
			oneProtocol: 'one protocol everyone must run',
			networkSplits: 'change the rules and the network splits',
			whereOverlap: 'they talk wherever they overlap',
			noVote: 'no vote · no migration · no fork',
			blackBox: 'black box',
			input: 'input',
			output: 'output',
			box: 'BOX',
			environment: 'environment',
			api: 'API',
			interface: 'interface',
			// Example networks a specification can name. Identifiers rather
			// than prose, and deliberately not all crypto: a service may
			// declare a public chain, a plain web host, or a private network
			// that exists on nobody's registry. The scene rotates through them.
			nets: [
				'bitcoin-mainnet',
				'ipfs',
				'nostr',
				'google.com',
				'family-photos.lan',
				'api.weather.gov',
				'pg-cluster-a'
			],
			netsCompact: ['bitcoin', 'ipfs', 'google.com', 'family-photos', 'nostr', 'weather-api'],
			// The Explore panels: what the specification actually carries for
			// each component (message Service in celaut.proto).
			zoom: {
				source: 'celaut.proto · message Service',
				box: {
					title: 'BOX · Container',
					rows: [
						'architecture — the CPU and environment it needs',
						'filesystem — every file, inline, not an image name',
						'init — the entrypoint and how it starts',
						'config_declaration — which files are configuration',
						'resources — at_init and at_most',
						'environment_variables — declared, with their formats'
					]
				},
				api: {
					title: 'API · Interface',
					rows: [
						'slot — a port, plus the transport it speaks',
						'protocol_stack — the protocols on that slot',
						'mu_per_call — the price of each method',
						'payment_contracts — the ledgers it accepts',
						'a fixed cost to start, then cost by usage'
					]
				},
				net: {
					title: 'NET · Network',
					rows: [
						'one entry per communication domain it may reach',
						'tags / prose / formal — how the domain is named',
						'protocol_stack — what those peers must speak',
						'environment_variable — which peers count as its own',
						'nothing declared here means no outside reach at all'
					]
				}
			},
			net: 'NET',
			netDeclared: 'NET · declared in the spec',
			nowhereElse: 'and nowhere else',
			itsNodeItsParent: 'its node · its parent',
			aService: 'a service',
			children: 'children',
			whatTheySpend: 'what they spend, not where they are',
			developersShort: 'developers · what it needs',
			developersLong: 'developers · what it needs, what it spends',
			operatorsShort: 'operators · where it runs',
			operatorsLong: 'operators · where it runs, what it costs',
			thisNode: 'this node',
			aPeer: 'a peer',
			cost: 'cost {value}',
			oneInput: 'one input',
			when: ['now', 'in a year', 'on other hardware'],
			identicalEveryTime: 'identical, every time',
			reputationLedger: 'reputation · records on a ledger',
			sourcesYouTrust: 'the sources you trust',
			// Painted onto the core-principles scene. The vertex NAMES come
			// from home.principles.items, so only the derived consequences
			// and the closing line live here. Order matches the vertices:
			// decentralization, simplicity, determinism.
			principles: {
				consequences: [
					'→ no protocol to agree on',
					'→ a container, an interface, a scope',
					'→ reputation that keeps its meaning'
				],
				derivedFrom: 'everything else is derived'
			},
			firstWhatSources: 'first: what do my sources say about it?',
			rightShort: '2 vCPU · 30 min',
			rightLong: 'right to 2 vCPU · 30 min',
			paymentRights: 'payment ⇄ resource rights',
			outcomeRecorded: 'the outcome goes on its record',
			nextStranger: 'and that is what the next stranger reads',
			requester: 'requester',
			node: 'node'
		},
		developers: {
			box: 'BOX',
			api: 'API',
			net: 'NET',
			service: 'service',
			anyCompatibleNode: 'any compatible node',
			optionalRegistry: 'optional reputation registry',
			yourService: 'your service',
			itsNode: 'its node',
			neverFindOut: 'you never find out where'
		},
		users: {
			you: 'you',
			noAccount: 'no account',
			eachPeerItsUnit: 'each peer quotes in what it accepts',
			whatYouAsked: 'what you asked for',
			whatNodeRuns: 'what the node runs',
			identicalItRuns: 'identical — it runs',
			microvm: 'microVM',
			destroyed: 'destroyed',
			theDeveloper: 'the developer',
			theHostMachine: 'the host machine',
			computeUsed: 'compute you actually used',
			whatYouPay: 'what you pay',
			chargingStops: 'job ends — charging stops',
			subscription: 'a subscription, charging regardless'
		},
		depin: {
			electricityCost: 'your electricity cost',
			priceYouSet: 'the price you set',
			availableWindow: 'available 22:00 – 07:00',
			marginCovered: 'margin covered'
		}
	}
};

/*
 * Versiunea în limba română. Aceeași structură de chei ca en.js —
 * orice cheie lipsă de aici cade automat pe engleză, așa că pagina nu
 * rămâne niciodată goală.
 *
 * Repere de traducere
 * -------------------
 * • Adresare cu „tu”, registrul obișnuit pe site-urile tehnice
 *   românești.
 * • Termenii proprii paradigmei (BOX, API, NET, nod, serviciu, microVM,
 *   DePIN, nodo, Ergo) rămân ca atare: sunt vocabularul proiectului, nu
 *   cuvinte de tradus.
 * • Se păstrează HTML-ul inline (<strong>, <em>) și punctuația
 *   tipografică a originalului.
 */

export default {
	common: {
		scroll: 'Derulează',
		toTop: '↑ Sus',
		backToTop: 'Înapoi sus',
		gains: 'Câștiguri',
		costs: 'Costuri',
		visit: 'Vizitează →',
		readMore: 'Citește mai mult →',
		viewOnGitHub: 'Vezi pe GitHub →',
		languageLabel: 'Limbă',
		switchLanguage: 'Schimbă limba'
	},
	theme: {
		toLight: 'Comută pe tema luminoasă',
		toDark: 'Comută pe tema întunecată',
		toggle: 'Comută tema'
	},
	topbar: {
		nav: 'Secțiuni Celaut',
		links: {
			depin: {
				label: 'Închiriază-ți PC-ul',
				short: 'PC'
			},
			developers: {
				label: 'Dezvoltatori',
				short: 'Dev'
			},
			users: {
				label: 'Utilizatori',
				short: 'Utilizatori'
			},
			paradigm: {
				label: 'Paradigmă',
				short: 'Paradigmă'
			}
		}
	},
	home: {
		hero: {
			tagline: 'O arhitectură peer-to-peer pentru proiectarea și distribuirea software-ului',
			primary: 'Începe să-l folosești',
			secondary: 'Află mai multe',
			facts: [
				'Inspirat de automatele celulare — comportament global robust care emerge din reguli locale simple.',
				'Determinist prin proiectare: aceleași intrări produc mereu aceeași ieșire, verificabilă.',
				'Fără registru central. Serviciile se distribuie peer-to-peer între noduri independente.',
				'Fiecare serviciu este adresat prin conținut — hash-ul său îi este numele, așa că nimic nu poate fi înlocuit pe tăcute.',
				'Nodurile rulează fiecare serviciu sigilat în propriul micromediu izolat.',
				'Reputația trăiește on-chain: încrederea se câștigă și se dovedește, nu o acordă vreun portar.',
				'Trei principii, până la capăt: descentralizare, simplitate și determinism.'
			]
		},
		atoms: {
			eyebrow: 'Cele două elemente primitive',
			heading: 'Noduri și servicii',
			intro: 'Celaut este construit din două concepte atomice. Tot restul — specificație, execuție, plată, reputație — este modul în care ele interacționează.',
			items: [
				{
					title: 'Un nod',
					body: 'Un <strong>calculator sau dispozitiv</strong> care vorbește cu semenii săi și gestionează execuția serviciilor. Pune la dispoziție hardware-ul, decide dacă rulează lucrarea local sau o pasează mai departe și nu are nevoie vreodată să înțeleagă ce face software-ul.'
				},
				{
					title: 'Un serviciu',
					body: 'Un <strong>container software determinist</strong> construit pentru o singură treabă. Este sigilat față de nodul care îl rulează: nodul nu inspectează programul, iar programul nu știe pe ce mașină a aterizat.'
				}
			]
		},
		index: {
			nav: 'Navigare pe secțiuni',
			title: 'Pe această pagină',
			open: 'Deschide meniul de secțiuni',
			close: 'Închide meniul de secțiuni',
			sections: {
				foundations: 'Origini',
				atoms: 'Noduri și servicii',
				nodes: 'Noduri',
				services: 'Servicii',
				'service-spec': 'Specificație',
				execution: 'Execuție',
				determinism: 'Determinism',
				coordination: 'Coordonare',
				'user-roles': 'Tu care ești?',
				'core-principles': 'Principii',
				'what-is-not': 'Ce nu este',
				implementations: 'Implementări',
				'coordination-detail': 'Stimulente',
				'service-distribution': 'Distribuire',
				applications: 'Aplicații'
			}
		},
		scenes: {
			foundations: {
				label: 'De unde vine',
				beats: [
					{
						h: 'Totul începe cu o mână de reguli.',
						p: 'În anii 1940, <strong>John von Neumann</strong> și <strong>Stanislaw Ulam</strong> au introdus automatele celulare: modele care arătau cum pot emerge comportamente complexe din altele simple.'
					},
					{
						h: 'Nimeni nu dirijează asta.',
						p: 'În 1970, <strong>&ldquo;Jocul vieții&rdquo; al lui John Horton Conway</strong> a devenit exemplul clasic: o grilă în care fiecare celulă se uită doar la vecinii ei și care, cu toate acestea, produce structuri complicate, în continuă evoluție.'
					},
					{
						h: 'Asta e toată filosofia de proiectare.',
						p: 'Aceste idei arată cum pot sistemele descentralizate să <strong>atingă complexitate fără control central</strong> — filosofia care ghidează Celaut. Reguli simple la nivel de nod și serviciu, un sistem adaptiv deasupra.',
						note: 'Descentralizare · Simplitate · Determinism'
					}
				]
			},
			nodes: {
				label: 'Rețeaua',
				beats: [
					{
						h: 'Faptul că are noduri nu e diferența.',
						p: 'Majoritatea rețelelor descentralizate au noduri și, cu toate astea, depind în continuare de un lucru puternic: <strong>protocolul pe care trebuie să-l ruleze toată lumea</strong>. Regulile rămân centrul, chiar și când mașinile nu sunt.'
					},
					{
						h: 'Celaut nu are niciun protocol asupra căruia să te înțelegi.',
						p: 'Nodurile nu trebuie să convină dinainte asupra unui protocol de comunicare — își <strong>declară interfețele pe care le acceptă și metodele de plată pe care le primesc chiar la contact</strong>. Două noduri vorbesc despre ce se întâmplă să aibă în comun; acolo unde nu se suprapun, pur și simplu nu vorbesc.'
					},
					{
						h: 'Așa că îți schimbi nodul, nu rețeaua.',
						p: 'O politică nouă de preț, încă o metodă de plată, un format de specificație pe care nimeni altcineva nu-l citește încă — îl <strong>implementezi în propriul nod</strong> și funcționează cu oricine îl acceptă deja. Nimeni nu votează, nimic nu trebuie migrat și <strong>nu există niciun hard fork de supraviețuit</strong>.',
						note: 'Fără protocol comun. Fără versiune comună. Fără permisiune.'
					}
				]
			},
			services: {
				label: 'Ce rulează pe ea',
				beats: [
					{
						h: 'Un serviciu este un container sigilat.',
						p: 'Serviciile din Celaut sunt <strong>containere software deterministe</strong> concepute pentru o sarcină anume. Nimic mai elaborat de atât.'
					},
					{
						h: 'După principiul cutiei negre.',
						p: 'Ele funcționează <strong>independent de nodurile care le execută</strong>, concentrându-se exclusiv pe funcționalitatea lor. Nodul nu are nevoie să înțeleagă serviciul, iar serviciul nu are nevoie să știe nimic despre nod.'
					},
					{
						h: 'Izolat, de fiecare dată.',
						p: 'Fiecare cerere rulează ca un <strong>proces izolat</strong> — într-un container sau într-o mașină virtuală, în funcție de nod — ceea ce abstractizează mediul de execuție și păstrează intactă bariera de securitate.',
						note: 'Ce intră, ce iese. Asta e toată interfața.'
					}
				]
			},
			'service-spec': {
				label: 'Cum se specifică un serviciu',
				beats: [
					{
						h: '<strong>BOX</strong> — mediul.',
						p: 'Arhitectură, sistem de fișiere, variabile de mediu, punct de intrare, configurație și resurse. Specifică direct întreaga structură de fișiere, în loc să se bazeze pe imagini sau depozite externe, și tocmai asta face execuția reproductibilă pe orice nod.'
					},
					{
						h: '<strong>API</strong> — interfața.',
						p: 'Cum se comunică cu serviciul, ce sisteme de plată acceptă și costurile aferente. Permite folosirea serviciilor fără niciun controlor central care să negocieze protocolul în numele lor.'
					},
					{
						h: '<strong>NET</strong> — domeniul de rețea.',
						p: 'Implicit, un serviciu este <strong>izolat</strong>: poate vorbi doar cu părintele său, cu copiii săi și cu nodul care îl rulează. Dacă are nevoie de lumea de afară, <strong>rețelele pe care le va atinge sunt numite chiar în specificația lui</strong> — nodul i le acordă, fiindcă vrea să ruleze serviciul cum trebuie, iar tu primești garanția că nu poate ajunge nicăieri altundeva.'
					},
					{
						h: 'Trei componente. Un serviciu portabil.',
						p: 'Împreună creează <strong>servicii portabile și reproductibile</strong>, care se comportă consecvent în toată rețeaua, păstrând securitatea și determinismul.',
						note: 'Fără dependențe externe. Nimic lăsat implicit.'
					}
				]
			},
			execution: {
				label: 'Cine ce decide',
				beats: [
					{
						h: 'Un serviciu își cere copiii.',
						p: 'Un serviciu poate cere execuția unor <strong>servicii-copil</strong> prin nodul său. Precizează <strong>resursele de care are nevoie fiecare</strong> și le predă un buget de cheltuit. Nu o mașină, nu o regiune — resurse.'
					},
					{
						h: 'Nodul decide unde rulează.',
						p: 'Compară <strong>costul rulării instanței local cu prețul pe care îl oferă fiecare dintre semenii săi</strong> și îl alege pe cel pe care îl consideră cel mai bun. Un copil rămâne aici; altul aterizează la un semen.'
					},
					{
						h: 'Părintele nu află niciodată.',
						p: 'Nu știe dacă un copil a ajuns pe această mașină sau în altă parte și nici nu are nevoie să știe. Tot ce urmărește este <strong>ce consumă copiii lui și cât de repede cheltuiesc</strong>, ca să poată echilibra asta.'
					},
					{
						h: 'Această separare e tot secretul.',
						p: 'Operatorii de noduri se ocupă de partea fizică: hardware, capacitate, preț, plasare. Dezvoltatorii de servicii <strong>declară resursele de care au nevoie și nimic despre infrastructură</strong>. Niciunul nu trebuie să facă treaba celuilalt — exact asta ține ambele jumătăți simple.',
						note: 'Două preocupări. O linie curată între ele.'
					}
				]
			},
			determinism: {
				label: 'De ce rezistă',
				beats: [
					{
						h: 'Aceeași intrare. Aceeași ieșire. Mereu.',
						p: 'Serviciile sunt specificate complet, ca să asigure <strong>rezultate reproductibile</strong> în timp și între noduri. La aceleași intrări produc mereu aceleași ieșiri, indiferent unde sau când rulează.'
					},
					{
						h: 'Ceea ce face încrederea măsurabilă.',
						p: 'Fiindcă software-ul nu poate devia, <strong>o dovadă de reputație înregistrată cu ceva timp în urmă spune și azi ceva adevărat</strong> — cu condiția ca serviciul să nu se întindă spre vreo rețea, ceea ce e starea lui implicită.'
					},
					{
						h: 'Și călătorește odată cu el.',
						p: 'Fiindcă nimic din mediu nu e lăsat la latitudinea gazdei, aceeași specificație produce același comportament pe <strong>un laptop, un server rămas liber sau un nod de care n-ai auzit vreodată</strong>. Unde rulează încetează să mai fie parte din răspuns.',
						note: 'Specificat complet, deci nimic lăsat pe seama mașinii.'
					}
				]
			},
			coordination: {
				label: 'Cum cooperează necunoscuții',
				beats: [
					{
						h: 'Reputația vine prima.',
						p: 'Nodurile și serviciile <strong>nu au încredere unele în altele</strong> — Celaut este un sistem trustless. Așa că nimic nu începe cu o strângere de mână, ci cu o consultare. Reputația înseamnă <strong>înregistrări în registre</strong>, opinii mai degrabă decât verdicte, iar fiecare actor cântărește sursele în care are deja încredere ca să decidă dacă un necunoscut merită să fie ascultat.'
					},
					{
						h: 'Apoi plătești pentru o promisiune de resurse.',
						p: 'Abia după ce înregistrarea trece verificarea se mișcă ceva. Solicitantul plătește <strong>în avans</strong>, iar ce cumpără este o promisiune: <strong>atâta calcul, pentru atâta timp</strong>. Mecanismele de plată stau <strong>în afara arhitecturii de bază</strong>, deci niciun registru anume nu e încastrat în ea.'
					},
					{
						h: 'Garanția nodului este reputația sa.',
						p: 'Nimic nu-l obligă să-și țină promisiunea. Ce îl reține este faptul că <strong>rezultatul este scris înapoi în registru</strong> — iar un nod al cărui istoric spune că a încasat și a livrat mai puțin încetează să mai fie ales. Fiecare parte are un interes permanent ca următorului necunoscut să-i placă ce citește.',
						note: 'Verifică · plătește · livrează · înregistrează. Apoi din nou.'
					}
				]
			}
		},
		roles: {
			eyebrow: 'Alege-ți intrarea',
			heading: 'Tu care ești?',
			intro: 'Ca utilizatori, putem juca trei tipuri de roluri în ecosistem. Fiecare are propria intrare.',
			items: [
				{
					eyebrow: 'Rolul 01',
					title: 'Operatori de noduri',
					lede: 'Similar minerilor din sistemele blockchain, operatorii de noduri furnizează rețelei resurse de calcul. Execută serviciile cerute de utilizatori în schimbul unei plăți, fără să fie nevoiți să înțeleagă funcționalitatea specifică a acelor servicii.',
					points: [
						'Furnizează resurse hardware',
						'Execută servicii la cerere',
						'Primesc compensație pentru resurse'
					],
					primary: 'Închiriază-ți PC-ul',
					secondary: 'Rulează un nod'
				},
				{
					eyebrow: 'Rolul 02',
					title: 'Dezvoltatori de servicii',
					lede: 'Dezvoltatorii creează servicii care pot rula pe orice nod compatibil din rețea. Se concentrează pe construirea funcționalității, fără să-și facă griji pentru detaliile infrastructurii de dedesubt.',
					points: [
						'Proiectează specificații de servicii',
						'Construiesc aplicații deterministe',
						'Distribuie servicii către noduri'
					],
					primary: 'Construiește pe Celaut',
					secondary: 'Explorează Skills'
				},
				{
					eyebrow: 'Rolul 03',
					title: 'Utilizatori de servicii',
					lede: 'Utilizatorii finali lansează servicii pe noduri, plătind pentru resursele de calcul folosite.',
					points: [
						'Cer execuția unui serviciu',
						'Plătesc pentru resurse de calcul',
						'Consumă rezultatele serviciului'
					],
					primary: 'Folosește rețeaua',
					secondary: 'Explorează Skills'
				}
			]
		},
		principles: {
			eyebrow: 'Regulile de care se ține',
			heading: 'Principiile fundamentale ale Celaut',
			intro: 'Trei angajamente din care derivă întreaga arhitectură. Tot ce e mai sus — noduri fără protocol, servicii sigilate, rețele declarate — este o consecință a lor.',
			items: [
				{
					title: 'Descentralizare',
					body: 'Celaut elimină <strong>punctele unice de control sau de eșec</strong>, lăsând nodurile să comunice și să se coordoneze dinamic, fără nimeni la mijloc de la care să ceri permisiunea.'
				},
				{
					title: 'Simplitate',
					body: 'Arhitectura urmează <strong>reguli minimaliste</strong> care reduc complexitatea, astfel încât fiecare componentă rămâne suficient de mică pentru a fi înțeleasă și întreținută pe cont propriu.'
				},
				{
					title: 'Determinism',
					body: 'Serviciile sunt specificate complet, ca să asigure <strong>rezultate reproductibile</strong> în timp și între noduri. La aceleași intrări produc aceleași ieșiri, indiferent unde sau când rulează.'
				}
			]
		},
		whatIsNot: {
			eyebrow: 'Confuzii frecvente',
			heading: 'Ce nu este Celaut',
			intro: 'Arhitectura stă suficient de aproape de câteva lucruri familiare încât să fie confundată cu ele. Merită să fim preciși în privința diferențelor.',
			items: [
				{
					title: 'Nu este o singură rețea',
					body: 'Celaut definește o <strong>arhitectură flexibilă</strong>, nu o rețea predeterminată. Pot foarte bine să apară rețele dominante, dar sistemul susține multe construcții peer-to-peer, în loc să dicteze una singură.'
				},
				{
					title: 'Nu este o stivă completă de protocoale',
					body: 'Oferă <strong>principii fundamentale</strong> pentru construirea unor stive de distribuire a calculului, nu o stivă completă cu opinii despre tot. Implementările actuale se sprijină pe componente precum gRPC sau Docker, iar acelea sunt alegeri interschimbabile.'
				},
				{
					title: 'Nu este un proiect blockchain',
					body: 'Celaut <strong>nu are criptomonedă proprie</strong> și nu are DAO-uri. Folosește totuși tehnologii blockchain acolo unde își merită locul — înregistrarea reputației, decontarea plăților între necunoscuți — fără a adopta ecosistemul mai larg din jurul lor.'
				}
			]
		},
		nodes: {
			eyebrow: 'Mașinile',
			heading: 'Nodurile: temelia rețelei',
			intro: 'Un nod este un <strong>calculator sau dispozitiv</strong> care comunică cu semenii săi și gestionează execuția serviciilor. Patru sarcini și niciun coordonator deasupra lor.',
			jobs: [
				{
					title: 'Execuția serviciilor',
					body: 'Negociază costurile de execuție cu semenii săi și decide dacă rulează un serviciu local sau îl deleagă, astfel încât resursele să meargă acolo unde sunt cele mai ieftine.'
				},
				{
					title: 'Comunicare',
					body: 'Își declară interfețele acceptate și metodele de plată primite chiar la contact, ceea ce permite protocoalelor să evolueze fără o înțelegere prealabilă.'
				},
				{
					title: 'Securitate',
					body: 'Emite și gestionează adresele și jetoanele de autentificare prin care este identificată fiecare interacțiune cu un serviciu.'
				},
				{
					title: 'Dependențe',
					body: 'Se asigură că un serviciu poate ajunge la ce are nevoie, oriunde în rețea s-ar întâmpla să ruleze acea dependență.'
				}
			],
			implementationsHeading: 'Implementări pe care le poți rula chiar azi',
			implementations: [
				{
					name: 'Nodo',
					body: 'Implementarea de referință, construită cu Python3 și Rust — un exemplu funcțional al modului în care un nod este pus în practică.'
				},
				{
					name: 'Chatui',
					body: 'Un nod pentru dispozitive Android. Expune serviciile prin interfețe de chat simple, fără să-ți ceară încredere în vreun alt nod.'
				}
			]
		},
		coordination: {
			eyebrow: 'Ce îi face pe necunoscuți să coopereze',
			heading: 'Mecanisme de coordonare',
			intro: 'Niciunul nu face parte din arhitectura de bază și asta e intenționat: amândouă stau în afara ei, ca să nu fie încastrat vreodată un anumit registru sau o anumită monedă.',
			items: [
				{
					title: 'Sisteme de reputație',
					body: 'Un istoric al interacțiunilor, înregistrat în registre ca opinii, nu ca verdicte. Este <strong>primul lucru consultat</strong>, înainte ca cineva să se angajeze la ceva.',
					points: [
						'Fiecare actor cântărește, după propria judecată, sursele în care are deja încredere.',
						'Bunul renume merită protejat, așa că devine garanția din spatele unei promisiuni.',
						'Rezultatul este autoreglarea, fără vreo autoritate care să dea verdicte.'
					]
				},
				{
					title: 'Mecanisme de plată',
					body: 'Un nod este plătit <strong>în avans</strong>, în schimbul unei promisiuni privind resursele ce vor fi consumate — atâta calcul, pentru atâta timp. Garanția lui nu e o factură ulterioară; este <strong>reputația sa</strong>.',
					points: [
						'Plata se încasează în avans, înainte ca execuția să înceapă.',
						'Dovada plății deschide accesul la serviciile care o cer.',
						'Un nod care încasează și livrează mai puțin pierde reputație, deci încetează să mai fie ales.'
					]
				}
			],
			note: 'Verifică istoricul · plătește dreptul · livrează · înregistrează rezultatul.'
		},
		distribution: {
			eyebrow: 'Cum ajunge în lume',
			heading: 'Distribuirea serviciilor',
			intro: 'Nu există niciun magazin în care să publici și nicio verificare de așteptat. Dezvoltatorul predă serviciul unui nod, iar de acolo îl duce mai departe rețeaua.',
			items: [
				{
					title: 'Descoperire descentralizată',
					body: 'Celaut <strong>nu are un registru central de servicii</strong>. Serviciile se răspândesc între noduri peer-to-peer, deci pot fi găsite direct — și nu există niciun portar care să decidă dacă ai voie înăuntru.'
				},
				{
					title: 'Integrare opțională cu blockchain',
					body: 'Serviciile pot fi declarate și pe un blockchain care implementează un registru — precum <strong>Sigma Reputation System</strong> pe Ergo — atunci când vizibilitatea și o urmă auditabilă valorează mai mult decât a rămâne complet off-chain.'
				}
			]
		},
		applications: {
			eyebrow: 'Unde rulează deja',
			heading: 'Impact și aplicații în lumea reală',
			intro: 'Arhitectura nu este un experiment mental. Acestea sunt locurile în care se folosește azi.',
			ours: [
				{
					name: 'DePin',
					body: 'Oricine poate rula un nod Celaut și poate deveni parte dintr-o rețea descentralizată de infrastructură fizică. Fiecare nod își descoperă semenii, execută și orchestrează servicii și le gestionează dependențele — transformând calculatoare obișnuite în putere de calcul partajată și rezistentă la cenzură.'
				},
				{
					name: 'Unstoppable Skills',
					body: 'Un registru complet on-chain, fără server, în care protagonistele sunt problemele. În loc să vâneze servicii, agenții caută o abilitate și descoperă serviciile care o acoperă, cu benchmark-uri reale și clasare bazată pe reputație. Construit pe Ergo și Celaut, cu miză reală: nimeni nu face spam fără să-și riște reputația.'
				}
			],
			thirdPartyHeading: 'Terți',
			thirdPartyTag: 'nu este făcut de noi',
			thirdParty: {
				name: 'Game of Prompts',
				body: [
					'O platformă competitivă în care creatorii proiectează <strong>servicii-joc</strong> ce evaluează roboții care le joacă, iar jucătorii scriu <strong>servicii-rezolvitor</strong> care încearcă să-și maximizeze scorul.',
					'Serviciile urmează paradigma Celaut, iar întregul sistem folosește blockchain-ul Ergo pentru a înregistra rezultatele și a transfera premiile.'
				]
			},
			ergoDocs: 'Documentația Ergo',
			formalPaper: 'Lucrarea formală'
		}
	},
	depin: {
		meta: {
			title: 'Închiriază-ți PC-ul — Celaut DePIN',
			description: 'Vinde resursele calculatorului tău când nu-l folosești. Stratul DePIN al Celaut este complet peer-to-peer, îți permite să stabilești prețul calculului în funcție de costurile cu electricitatea și izolează fiecare sarcină într-un microVM.'
		},
		topbarTitle: 'Închiriază-ți PC-ul',
		hero: {
			eyebrow: 'Celaut DePIN',
			title: 'Închiriază-ți PC-ul.',
			tagline: 'Vinde resursele calculatorului tău când nu-l folosești.',
			lede: 'Mașina ta stă degeaba cea mai mare parte a zilei. Celaut transformă acea capacitate nefolosită în ceva pentru care oamenii plătesc — direct, în condițiile tale, cu fiecare sarcină sigilată departe de sistemul tău.',
			actions: [
				'Începe să-ți închiriezi PC-ul',
				'Vezi cum funcționează'
			],
			stats: [
				{
					value: '100%',
					label: 'peer-to-peer — fără vreo companie la mijloc'
				},
				{
					value: 'Tu',
					label: 'stabilești prețul, cu factura la curent inclusă în calcul'
				},
				{
					value: 'microVM',
					label: 'izolare pentru fiecare sarcină pe care o găzduiești'
				}
			]
		},
		scenes: {
			rent: {
				label: 'Ideea',
				beats: [
					{
						h: 'PC-ul tău stă degeaba chiar acum.',
						p: 'Majoritatea calculatoarelor personale stau nefolosite cea mai mare parte a fiecărei zile. Acela e hardware real — nuclee, memorie, disc — care nu face absolut nimic.'
					},
					{
						h: 'Vinde ce nu folosești.',
						p: 'Celaut îți decupează mașina în <strong>capacitate pe care o poți închiria</strong>. Tu decizi cât din ea merge în rețea și cât rămâne a ta — restul mașinii funcționează exact ca înainte.'
					},
					{
						h: 'Fii plătit pentru munca pe care o face.',
						p: 'Semenii care au nevoie de calcul îți găsesc nodul, se înțeleg direct cu el asupra prețului și plătesc per execuție. <strong>Plata se decontează pe Ergo</strong> pe măsură ce fiecare lucrare se termină.',
						note: 'Fără centru de date. Fără intermediar. Fără așteptat plata lunară.'
					}
				]
			},
			p2p: {
				label: 'Beneficiul 01',
				beats: [
					{
						h: 'Complet peer-to-peer.',
						p: 'Orice altă platformă de tip &ldquo;închiriază-ți hardware-ul&rdquo; pune o companie la mijloc. Ea deține piața, ia comisionul, stabilește regulile și te poate scoate din rețeaua ei oricând vrea.'
					},
					{
						h: 'Nu e nimeni la mijloc.',
						p: 'Celaut <strong>nu are nici fundație, nici companie</strong> care să stea între cele două părți. Nodul tău și semenul care vrea calcul vorbesc <strong>direct</strong> între ei — descoperire, negociere, execuție, decontare.'
					},
					{
						h: 'Ceea ce înseamnă că nimeni nu te poate deconecta.',
						p: 'Niciun cont de suspendat, niciun termen schimbat pe la spatele tău, niciun comision care crește pe tăcute. Interacțiunea este <strong>complet peer-to-peer</strong>, așa că singurul lucru de care depinde fiecare parte este cealaltă parte.',
						note: 'Nimic la care să te înscrii. Nimic din care să fii exclus.'
					}
				]
			},
			electricity: {
				label: 'Beneficiul 02',
				beats: [
					{
						h: 'Calculul nu e gratis de dăruit.',
						p: 'Ținerea mașinii pornite costă curent, iar costul acela nu e constant — se mișcă pe parcursul zilei și diferă în funcție de unde locuiești.'
					},
					{
						h: 'Include-l în preț.',
						p: 'Celaut îți permite să <strong>incluzi opțional costurile cu electricitatea</strong> în prețul pe care îl ceri pentru calculul tău. Nodul tău stabilește prețul cu factura la curent în ecuație, așa că închirierea capacității nu te costă niciodată bani pe tăcute.'
					},
					{
						h: 'Și decide când ești deschis.',
						p: '<strong>Disponibilitatea și durata de rulare le stabilești tot tu.</strong> Închiriază mașina doar noaptea, când curentul e cel mai ieftin, limitează cât poate rula o singură lucrare sau ieși complet offline — rețeaua pur și simplu redirecționează în altă parte.',
						note: 'Tarifele tale. Orele tale. Marja ta.'
					}
				]
			},
			isolation: {
				label: 'Beneficiul 03',
				beats: [
					{
						h: 'Al cui cod rulează pe PC-ul meu?',
						p: 'E prima întrebare pe care o pune orice om cu scaun la cap. Să-ți închiriezi mașina nu poate însemna să dai cheile unor necunoscuți.'
					},
					{
						h: 'Izolare totală a execuției.',
						p: 'Fiecare sarcină rulează sigilată în propriul <strong>microVM</strong> — o mașină virtuală adevărată, cu nucleu propriu și o graniță impusă hardware, nu un container cu nucleu partajat. Nu îți poate vedea fișierele, rețeaua sau vreo altă sarcină de pe mașină.'
					},
					{
						h: 'Aceeași tehnologie pe care rulează marii furnizori de cloud.',
						p: 'microVM-urile sunt ceea ce folosesc <strong>marii furnizori de cloud</strong> ca să ruleze cod neverificat de la milioane de necunoscuți pe hardware partajat. Celaut pune exact acel model de izolare pe biroul tău — garanția nu e o promisiune, e arhitectura însăși.',
						note: 'Lucrarea se termină, VM-ul e distrus. Nu rămâne nimic.'
					}
				]
			}
		},
		payoff: {
			heading: 'Ce obții de fapt',
			items: [
				{
					title: 'Hardware nefolosit, pus la treabă',
					body: 'Calculatorul de gaming care doarme la 3 dimineața, stația de lucru care stă tot weekendul, o carcasă de rezervă din dulap. Dacă poate rula nodo, poate câștiga.'
				},
				{
					title: 'Tu stabilești condițiile',
					body: 'Prețul pe unitate de calcul, orele în care ești disponibil, cât din mașină ești dispus să cedezi. Toate sunt ale tale, oricând de schimbat.'
				},
				{
					title: 'Plătit în avans',
					body: 'Un nod este plătit în avans pentru o promisiune de resurse — pe Ergo (ERG), fără facturi, fără calendar de plăți impus de o platformă, fără prag minim. Reputația este garanția că va livra.'
				},
				{
					title: 'Nimic de care să depindă încrederea',
					body: 'Serviciile sunt adresate prin conținut: solicitantul primește exact software-ul pe care l-a cerut, iar tu îl rulezi fără să-l inspectezi și fără să garantezi pentru el.'
				},
				{
					title: 'Fișierele tale rămân ale tale',
					body: 'O sarcină trăiește în propriul microVM, cu nucleu propriu. Nu îți vede niciodată discul, rețeaua sau altceva de pe mașină.'
				},
				{
					title: 'Pleacă oricând',
					body: 'Oprește nodul și rețeaua te ocolește. Nu există contract, nu există blocare și nu e nimeni de la care să ceri voie.'
				}
			]
		},
		steps: {
			heading: 'De la instalare la venit',
			items: [
				{
					title: 'Instalează nodo',
					body: 'O singură comandă pe Linux, un installer pe Windows. Mașina ta intră în rețea și începe să-și descopere semenii.'
				},
				{
					title: 'Stabilește-ți prețul și orele',
					body: 'Spune-i nodului cât costă calculul tău — inclusiv curentul, dacă vrei să fie luat în calcul — și când este disponibil.'
				},
				{
					title: 'Acceptă lucrări',
					body: 'Semenii negociază direct cu nodul tău. Sarcinile acceptate rulează sigilate într-un microVM, izolate de tot restul.'
				},
				{
					title: 'Încasează',
					body: 'Plata se încasează în avans pe Ergo; reputația se înregistrează pe măsură ce lucrarea este onorată. Contribuția e răsplătită, iar rezultatele rămân auditabile.'
				}
			]
		},
		roles: {
			heading: 'Cealaltă parte a schimbului',
			intro: 'Să-ți închiriezi PC-ul este o jumătate din rețea. Cealaltă jumătate este să o poți <em>folosi</em> — iar exact proprietățile care te protejează ca gazdă sunt cele care fac rețeaua să merite ca loc de unde să cumperi.',
			items: [
				{
					title: 'Dezvoltatori',
					body: 'Trimite un program o singură dată, ca serviciu sigilat și adresat prin conținut, și lasă rețeaua să-l găzduiască, să-l facă descoperibil și să-l scaleze. Reproductibilitatea vine din proiectare, nu din SLA-ul unui furnizor.',
					link: 'Pentru dezvoltatori →'
				},
				{
					title: 'Agenți &amp; utilizatori',
					body: 'Cere servicii după problema pe care o rezolvă și plătește per execuție. Fără cont de cloud, fără blocare — iar sigiliul dovedește că ai primit exact software-ul pe care l-ai cerut.',
					link: 'Pentru utilizatori finali →'
				},
				{
					title: 'Gazde',
					body: 'Adică tu. Contribuie cu orice hardware ai; stratul de virtualizare al nodului face ca sarcinile să aterizeze totuși undeva unde se potrivesc, chiar și între arhitecturi CPU diferite.'
				}
			]
		},
		cta: {
			heading: 'Pornește-ți mașina care stă degeaba.',
			body: 'Instalarea unui nod ia o singură comandă. E cel mai rapid mod de a vedea cât valorează hardware-ul tău atunci când nu face nimic altceva.',
			actions: [
				'Rulează un nod',
				'Citește paradigma'
			]
		}
	},
	developers: {
		meta: {
			title: 'Pentru dezvoltatori — Construiește o dată, rulează oriunde | Celaut',
			description: 'Construiește servicii Celaut: specifică un BOX, un API și un domeniu NET, predă-l unui nod și lasă rețeaua să-l distribuie și să-l execute. Fără infrastructură, fără configurare, fără platformă la mijloc.'
		},
		topbarTitle: 'Pentru dezvoltatori',
		hero: {
			eyebrow: 'Dezvoltatori de servicii',
			title: 'Construiește-l o singură dată.',
			tagline: 'Apoi nu te mai gândi unde rulează.',
			lede: 'Un serviciu Celaut nu este o desfășurare — este o specificație. Descrie mediul, interfața și domeniul de rețea, predă-l unui singur nod, iar rețeaua se ocupă de restul.',
			actions: [
				'Explorează Skills',
				'Vezi cum funcționează'
			],
			stats: [
				{
					value: 'BOX · API · NET',
					label: 'trei componente — asta e toată specificația'
				},
				{
					value: 'Fără DevOps',
					label: 'nodurile se ocupă de execuție; nu ai niciun cont de cloud de deschis'
				},
				{
					value: 'Determinist',
					label: 'aceleași intrări, aceleași ieșiri, pe orice nod, oricând'
				}
			]
		},
		scenes: {
			spec: {
				label: 'Ideea',
				beats: [
					{
						h: 'Nu desfășori. Specifici.',
						p: 'Nu ai niciun server de provizionat, nicio imagine de trimis, niciun pipeline de ținut pe verde. Un serviciu în Celaut este o descriere scrisă a ceea ce îi trebuie ca să ruleze.'
					},
					{
						h: 'Trei componente. Asta e tot.',
						p: '<strong>BOX</strong> descrie mediul de execuție — arhitectură, sistem de fișiere, variabile de mediu, punct de intrare, configurație. Specifică direct întreaga structură de fișiere, în loc să indice o imagine externă, iar asta menține execuția reproductibilă.'
					},
					{
						h: 'Și cum ajunge lumea la el.',
						p: '<strong>API</strong> definește cum vorbesc clienții și alte servicii cu el, plus metodele de plată acceptate și costurile. <strong>NET</strong> numește rețelele externe pe care le va atinge — implicit un serviciu este izolat, iar orice depășește asta se declară chiar în specificație, așa că utilizatorii știu dinainte până unde poate ajunge.',
						note: 'Portabil, reproductibil, fără dependențe externe.'
					}
				]
			},
			agnostic: {
				label: 'Beneficiul 01',
				beats: [
					{
						h: 'Orice ai fi scris, se livrează la fel.',
						p: 'Celaut nu-ți cere să adopți un framework, un runtime sau un SDK. Îți cere un sistem de fișiere și un punct de intrare.'
					},
					{
						h: 'Nici nodului nu-i pasă.',
						p: 'Serviciile urmează <strong>principiul cutiei negre</strong>: funcționează independent de detaliile nodurilor care le execută, iar nodurile le rulează fără să aibă nevoie să înțeleagă ce fac.'
					},
					{
						h: 'Așa că îl va accepta orice nod compatibil.',
						p: 'BOX declară microarhitectura vizată, ca nodurile să știe dacă se potrivesc. Dincolo de asta, <strong>serviciul tău poate fi rulat de oricine pe orice nod compatibil</strong> — ăsta e tot contractul.',
						note: 'Fără blocare, fiindcă nu există nimic care să te blocheze.'
					}
				]
			},
			distribute: {
				label: 'Beneficiul 02',
				beats: [
					{
						h: 'Predă-l unui nod.',
						p: 'Nu publici într-un magazin și nu aștepți nicio verificare. Dezvoltatorul trebuie doar să <strong>trimită serviciul către unul sau mai multe noduri</strong>.'
					},
					{
						h: 'De acolo îl duce rețeaua mai departe.',
						p: 'Acele noduri se ocupă de <strong>distribuirea serviciului către altele</strong>. Nu există un registru central de servicii — serviciile se răspândesc peer-to-peer, deci nu există niciun punct unic de eșec și niciun portar care să decidă dacă ai voie înăuntru.'
					},
					{
						h: 'Și poate fi găsit, dacă vrei asta.',
						p: 'Nodurile pot totodată <strong>încărca serviciul într-un sistem de reputație</strong>, astfel încât utilizatorii și alte servicii să poată judeca dacă și când să-l folosească. Serviciile pot fi declarate într-un registru pe blockchain — precum <strong>Sigma Reputation System</strong> pe Ergo — pentru vizibilitate și încredere sporite.',
						note: 'Nimic la care să te înscrii. Nimeni care să ia un comision.'
					}
				]
			},
			compose: {
				label: 'Beneficiul 03',
				beats: [
					{
						h: 'Servicii care apelează servicii.',
						p: 'Un serviciu poate cere execuția altor servicii — <strong>serviciile-copil</strong> ale sale — prin nodul care îl rulează. Fluxurile complexe se construiesc prin compunere, nu prin configurație de orchestrare.'
					},
					{
						h: 'Nodul decide unde aterizează.',
						p: 'Nodurile gestionează instanțele de servicii și decid dacă le rulează local sau distribuie sarcina între semeni. Dependențele sunt problema nodului — el se asigură că serviciile pot ajunge la ce le trebuie în toată rețeaua.'
					},
					{
						h: 'Și nu afli niciodată unde.',
						p: '<strong>Serviciul părinte nu știe unde îi sunt executate dependențele.</strong> Fiecare copil doar precizează resursele de care are nevoie. Tu scrii compunerea; rețeaua rezolvă plasarea.',
						note: 'Niciun planificator de configurat. Nicio topologie de întreținut.'
					}
				]
			}
		},
		payoff: {
			heading: 'Ce îți oferă arhitectura',
			items: [
				{
					title: 'Specifică, nu desfășura',
					body: 'Un serviciu este un BOX (arhitectură, sistem de fișiere, mediu, punct de intrare, configurație), un API și un domeniu NET. Scrie asta și ai terminat — nu există niciun pas de desfășurare de care să răspunzi.'
				},
				{
					title: 'Autonom prin construcție',
					body: 'BOX descrie întreaga structură de fișiere de care are nevoie serviciul, în loc să indice imagini sau depozite externe. Niciun registru terț nu poate dispărea de sub tine.'
				},
				{
					title: 'O cutie neagră, în mod intenționat',
					body: 'Serviciile funcționează independent de nodurile care le execută. Nu scrii niciodată pentru mediul unui nod, fiindcă nu ți se spune niciodată care este acela.'
				},
				{
					title: 'Reproductibil, nu „pe cât se poate”',
					body: 'La aceleași intrări, un serviciu produce mereu aceleași ieșiri, indiferent unde sau când rulează. Aici determinismul este o proprietate arhitecturală, nu o promisiune de furnizor.'
				},
				{
					title: 'Compunere fără orchestrare',
					body: 'Un serviciu poate cere execuția unor servicii-copil prin nodul său. Părintele nu știe unde rulează; fiecare doar precizează resursele de care are nevoie.'
				},
				{
					title: 'Reputație pe care o poți acumula',
					body: 'Fiindcă un serviciu este determinist și izolat implicit, o dovadă de reputație înregistrată cu ceva timp în urmă spune și azi ceva adevărat despre el.'
				}
			]
		},
		steps: {
			heading: 'De la cod la rulat în rețea',
			items: [
				{
					title: 'Scrie serviciul',
					body: 'Orice limbaj, orice stivă. Contează sistemul de fișiere de care are nevoie și comanda care îl pornește — nu framework-ul spre care ai întins mâna.'
				},
				{
					title: 'Specifică BOX, API și NET',
					body: 'Declară mediul, felul în care apelanții vorbesc cu serviciul și ce acces la rețele externe (dacă e cazul) ar trebui să poată cere.'
				},
				{
					title: 'Trimite-l unui nod',
					body: 'Un singur nod e de ajuns. Distribuie serviciul altora și îl poate publica într-un sistem de reputație, ca utilizatorii și alte servicii să-l poată găsi.'
				},
				{
					title: 'Lasă rețeaua să-l ruleze',
					body: 'Nodurile negociază costul și decid unde se execută fiecare instanță. Tu nu ești în buclă și nu ai nicio infrastructură de ținut în viață.'
				}
			]
		},
		tradeoffs: {
			heading: 'Schimbul pe care îl faci de fapt',
			intro: 'Azi, a livra software înseamnă să alegi între a-l găzdui tu însuți și a le cere oamenilor să-l ruleze singuri. Ambele variante costă ceva. Afirmația Celaut este îngustă și precisă: preia avantajele fiecăreia fără dezavantajele lor — cu prețul controlului tău asupra serviciului aflat în execuție.',
			items: [
				{
					label: 'Un serviciu web găzduit',
					good: 'Utilizatorii nu au nevoie nici de infrastructură, nici de configurare.',
					bad: 'Nu poți dovedi că sistemul nu s-a schimbat, iar utilizatorii trebuie să te creadă pe cuvânt că datele lor de cerere nu sunt folosite abuziv.'
				},
				{
					label: 'Cod sursă pe care îl rulează singuri',
					good: 'Determinist — odată descărcat, nu-l mai poți schimba pe la spatele lor — iar datele lor de cerere nu ajung niciodată la tine.',
					bad: 'Le trebuie hardware capabil și trebuie să supraviețuiască configurării, iar acolo renunță cei mai mulți.'
				},
				{
					label: 'Un serviciu Celaut',
					good: 'Nicio infrastructură de gestionat și nimic de configurat, fiindcă specificația acoperă deja containerul, arhitectura, nevoile de rețea și interfața.',
					bad: 'Renunți la control: nu poți modifica, limita sau extrage date dintr-un serviciu odată ce a ieșit în lume. Exact asta e ideea.',
					highlight: true
				}
			]
		},
		roles: {
			heading: 'Restul rețelei',
			intro: 'Serviciul tău are nevoie de un loc în care să ruleze și de cineva pentru care să ruleze. Ambele sunt tot oameni.',
			items: [
				{
					title: 'Operatori de noduri',
					body: 'Ei pun la dispoziție hardware-ul și execută orice li se cere, contra plată, fără să aibă nevoie să înțeleagă ce face serviciul tău.',
					link: 'Închiriază-ți PC-ul →'
				},
				{
					title: 'Utilizatori finali',
					body: 'Ei lansează servicii pe noduri și plătesc resursele de calcul folosite — și pot verifica faptul că ce a rulat este exact ce descria specificația.',
					link: 'Pentru utilizatori finali →'
				},
				{
					title: 'Paradigma',
					body: 'Arhitectura completă: noduri, servicii, specificație, coordonare prin sisteme de reputație și de plată și de ce e nevoie de toate acestea.',
					link: 'Citește lucrarea →'
				}
			]
		},
		cta: {
			heading: 'Pornește de la probleme.',
			body: 'Unstoppable Skills este un registru în care protagonistele sunt problemele: caută o abilitate și găsește serviciile care o acoperă, benchmark-urile și reputația lor. E cel mai scurt drum de la „ce ar trebui să construiesc” la „cine are nevoie de asta”.',
			actions: [
				'Explorează Skills',
				'Citește paradigma'
			]
		}
	},
	users: {
		meta: {
			title: 'Pentru utilizatori finali — Rulează-l, plătește cât a consumat | Celaut',
			description: 'Lansează servicii pe noduri Celaut și plătește doar resursele de calcul folosite. Fără conturi, fără abonamente, fără platformă la mijloc — serviciile rulează izolat și determinist, deci primești exact ce descrie specificația.'
		},
		topbarTitle: 'Pentru utilizatori finali',
		hero: {
			eyebrow: 'Utilizatori de servicii',
			title: 'Rulează-l.',
			tagline: 'Plătește cât a consumat. Nimic altceva.',
			lede: 'Lansează un serviciu pe un nod, ia rezultatul, plătește calculul consumat. Nu ai niciun cont de creat, niciun abonament de anulat și nicio companie între tine și mașina care a făcut treaba.',
			actions: [
				'Explorează Skills',
				'Vezi cum funcționează'
			],
			stats: [
				{
					value: 'Fără cont',
					label: 'nimic la care să te înscrii, nimic din care să fii blocat'
				},
				{
					value: 'Per execuție',
					label: 'plătești resursele de calcul folosite efectiv'
				},
				{
					value: 'Izolat',
					label: 'serviciile rulează sigilate și nu văd nimic din ce nu li s-a dat'
				}
			]
		},
		scenes: {
			ask: {
				label: 'Ideea',
				beats: [
					{
						h: 'Întreabă rețeaua, nu o companie.',
						p: 'Vrei ca ceva să fie făcut — un model rulat, o secvență analizată, un bot care tranzacționează, un fișier procesat. Azi asta înseamnă să alegi un furnizor și să-ți deschizi cont la el.'
					},
					{
						h: 'Nodurile răspund direct.',
						p: 'Celaut <strong>nu are un registru central de servicii</strong>. Serviciile sunt distribuite între noduri peer-to-peer, iar nodurile își declară interfețele acceptate și <strong>metodele de plată primite chiar la contact</strong> — deci nu trebuie convenit nimic cu nimeni dinainte.'
					},
					{
						h: 'Ai de-a face direct cu mașina care face treaba.',
						p: 'Nodul tău negociază costul execuției cu un semen și treaba se întâmplă. Nu există <strong>nicio platformă la mijloc</strong> care să ia un comision, să stabilească regulile sau care să te poată scoate dintr-o rețea în care nu te-ai înscris niciodată.',
						note: 'Fără înscriere. Fără abonament. Fără intermediar.'
					}
				]
			},
			proof: {
				label: 'Beneficiul 01',
				beats: [
					{
						h: 'De unde știi ce a rulat de fapt?',
						p: 'Cu un serviciu găzduit, nu ai de unde. Operatorul nu poate dovedi că sistemul nu s-a schimbat — așa că, atunci când un instrument devine popular, nimic nu împiedică performanța lui să scadă pe tăcute, ca să te împingă spre unul mai nou.'
					},
					{
						h: 'Aici, serviciul <em>este</em> specificația lui.',
						p: 'Un serviciu își specifică întregul mediu — arhitectură, sistem de fișiere, punct de intrare, configurație. Schimbă orice din astea și devine <strong>un alt serviciu</strong>, nu o actualizare tăcută a celui pe care îl foloseai.'
					},
					{
						h: 'Deci rezultatul este reproductibil.',
						p: 'La aceleași intrări, un serviciu <strong>produce mereu aceleași ieșiri</strong>, indiferent ce nod îl execută sau când. Tocmai de asta o înregistrare de reputație de acum câteva luni valorează ceva și azi.',
						note: 'Determinismul e garanția. Nu o promisiune — proiectarea însăși.'
					}
				]
			},
			sealed: {
				label: 'Beneficiul 02',
				beats: [
					{
						h: 'Cererea ta nu e treaba nimănui altcuiva.',
						p: 'Când trimiți o sarcină undeva, întrebarea onestă este cine altcineva o mai vede pe drum.'
					},
					{
						h: 'Fiecare execuție este izolată.',
						p: 'Nodul rulează serviciul ca <strong>instanță izolată</strong> — un container sau o mașină virtuală. Implicit, un serviciu este complet rupt de rețelele externe și poate vorbi doar cu părintele său, cu copiii săi și cu nodul care îl rulează.'
					},
					{
						h: 'Iar dezvoltatorul nu stă la celălalt capăt.',
						p: '<strong>Dezvoltatorii de servicii nu pot controla, modifica sau extrage date dintr-un serviciu</strong>, fiindcă nu controlează nodurile care îl distribuie și îl rulează. Orice acces mai larg la rețea trebuie declarat în specificație, la vedere, înainte să-l rulezi vreodată.',
						note: 'Izolat implicit. Accesul se cere, niciodată nu se presupune.'
					}
				]
			},
			pay: {
				label: 'Beneficiul 03',
				beats: [
					{
						h: 'Plătești înainte să ruleze. Punct.',
						p: 'Utilizatorii lansează servicii pe noduri și <strong>plătesc în avans pentru o promisiune de resurse</strong>. Asta e toată relația comercială.'
					},
					{
						h: 'Nu se acumulează nimic cât stai degeaba.',
						p: 'Nu există loc alocat, nu există niveluri și nu există prag lunar. Plata se încasează <strong>în avans</strong>, în schimbul resurselor ce vor fi consumate; dovada plății deschide accesul. Garanția nodului este reputația sa, nu o factură la final.'
					},
					{
						h: 'Prețul îl face o piață, nu o pagină de tarife.',
						p: 'Nodurile își stabilesc singure costurile și concurează pe ele, iar <strong>serviciile au cost marginal zero</strong> — costul rulării unuia cade în sarcina nodului — așa că multe pornesc gratis, ca să-și construiască reputație. Sistemele de plată stau în afara arhitecturii de bază, deci nici registrul care face decontarea nu este fixat.',
						note: 'Plătește per execuție. Pleacă oricând. Nimic de anulat.'
					}
				]
			}
		},
		payoff: {
			heading: 'Ce obții de fapt',
			items: [
				{
					title: 'Nicio infrastructură de gestionat',
					body: 'Se ocupă nodurile. Nu ai niciun furnizor de cloud de ales, nicio mașină de ținut în viață și nimic care să rămână pornit între utilizări.'
				},
				{
					title: 'Fără configurare',
					body: 'Specificația serviciului acoperă deja cum se construiește containerul, ce arhitectură îi trebuie, ce cerințe de rețea are și care îi este interfața. Nimic din astea nu e treaba ta.'
				},
				{
					title: 'Dezvoltatorul nu ajunge la tine',
					body: 'Dezvoltatorii de servicii nu pot controla, modifica sau extrage date dintr-un serviciu — nu controlează nodurile care îl distribuie și îl rulează.'
				},
				{
					title: 'Nu se poate schimba pe la spatele tău',
					body: 'Un serviciu este determinist: aceleași intrări produc aceleași ieșiri, oricând și oriunde ar rula. Nimeni nu-l poate înrăutăți pe tăcute ca să te împingă spre unul mai nou.'
				},
				{
					title: 'Judecat după reputație, nu după clasament',
					body: 'Reputația trăiește ca înregistrări într-un registru, iar fiecare participant cântărește sursele în care are încredere. Nu există nicio pagină principală editorială care să decidă ce vezi.'
				},
				{
					title: 'Nimic din care să fii scos',
					body: 'Descoperirea este peer-to-peer, fără registru central, deci nu există cont de suspendat și nici listare de retras.'
				}
			]
		},
		steps: {
			heading: 'De la „am nevoie să fac asta” la un rezultat',
			items: [
				{
					title: 'Găsește serviciul',
					body: 'Caută după problema pe care vrei să o rezolvi. Nodurile descoperă servicii peer-to-peer, iar registre precum Unstoppable Skills leagă problemele de serviciile care le acoperă.'
				},
				{
					title: 'Cere o execuție',
					body: 'Nodul tău vorbește direct cu un semen care o poate rula. Interfețele și metodele de plată acceptate se declară la contact, deci nu trebuie convenit nimic dinainte.'
				},
				{
					title: 'Rulează, sigilat',
					body: 'Nodul execută serviciul ca instanță izolată — un container sau o mașină virtuală — fără niciun acces dincolo de ce a cerut specificația.'
				},
				{
					title: 'Plătește în avans',
					body: 'Un nod este plătit în avans pentru o promisiune de resurse, iar dovada plății deschide accesul. Garanția este reputația. Fără abonament, fără minim, fără factură care curge.'
				}
			]
		},
		tradeoffs: {
			heading: 'Față de cele două opțiuni pe care le ai azi',
			intro: 'Ia ca exemplu un bot de tranzacționare. Acum ori îți predai portofoliul unui serviciu web, ori găsești sursa și îl rulezi singur. Fiecare alegere îți dă un lucru și te costă altul.',
			items: [
				{
					label: 'Folosești un serviciu web',
					good: 'Nu rulezi nicio infrastructură și nu configurezi nimic.',
					bad: 'Nu îi poți atribui reputație, fiindcă operatorul nu poate dovedi că sistemul nu s-a schimbat — și nu îți poate garanta că datele tale de cerere nu sunt folosite abuziv.'
				},
				{
					label: 'Rulezi tu însuți sursa',
					good: 'Este determinist, iar dezvoltatorul nu are niciun control asupra datelor tale de cerere.',
					bad: 'Ai nevoie de hardware capabil să-l ruleze și trebuie să te descurci cu configurarea — de obicei acolo renunță oamenii și se întorc la prima opțiune.'
				},
				{
					label: 'Folosești un serviciu Celaut',
					good: 'Fără infrastructură, fără configurare, iar dezvoltatorul tot nu poate controla, modifica sau extrage date din serviciu.',
					bad: 'Plătești per execuție și depinzi de existența în rețea a unui nod dispus să-l ruleze la un preț pe care îl accepți.',
					highlight: true
				}
			]
		},
		roles: {
			heading: 'Ceilalți oameni din rețea',
			intro: 'Cineva a scris serviciul, iar mașina cuiva îl rulează. Ambele roluri îți sunt deschise și ție.',
			items: [
				{
					title: 'Operatori de noduri',
					body: 'Ei pun la dispoziție hardware-ul care execută ce ceri, contra plată — fără să aibă nevoie să știe ce face serviciul.',
					link: 'Ai hardware nefolosit? →'
				},
				{
					title: 'Dezvoltatori de servicii',
					body: 'Ei scriu servicii pe care le poate rula orice nod compatibil și le predau rețelei în loc să le găzduiască.',
					link: 'Pentru dezvoltatori →'
				},
				{
					title: 'Paradigma',
					body: 'Noduri, servicii, specificație și sistemele de reputație și de plată care le permit unor părți fără încredere reciprocă să coopereze totuși.',
					link: 'Citește lucrarea →'
				}
			]
		},
		cta: {
			heading: 'Pornește de la problema pe care o ai.',
			body: 'Unstoppable Skills este un registru complet on-chain, fără server, în care protagonistele sunt problemele înseși. Caută o abilitate și găsește serviciile care o acoperă, benchmark-uri comparative reale, discuții și clasare bazată pe reputație.',
			actions: [
				'Explorează Skills',
				'Mai bine închiriază-ți PC-ul'
			]
		}
	},
	install: {
		meta: {
			title: 'Instalează Nodo — Celaut',
			description: 'Instalează un nod Celaut (nodo) pe Linux, Windows sau macOS.'
		},
		topbarTitle: 'Instalează nodo',
		heading: 'Rulează un nod Celaut',
		subtitle: 'Instalează <strong>nodo</strong> și intră în rețeaua descentralizată — descoperă semeni, execută și orchestrează servicii și transformă-ți mașina în putere de calcul partajată și rezistentă la cenzură.',
		tabs: {
			linux: 'Linux',
			windows: 'Windows',
			mac: 'macOS'
		},
		copy: 'Copiază',
		copied: 'Copiat ✓',
		linux: {
			heading: 'Linux',
			intro: 'Instalare de bază — rulează asta în terminal:',
			notes: [
				'Scriptul are nevoie de <code>sudo</code> pentru configurarea la nivel de sistem. Mediile de rulare Python, Java și <code>yq</code> se instalează local, în directorul principal al nodului.',
				'Preferi o instalare manuală, fără sudo? Urmează {link}.'
			],
			manualLink: 'ghidul manual'
		},
		windows: {
			heading: 'Windows 11',
			intro: 'Descarcă și rulează installerul oficial:',
			download: 'Descarcă Nodo-Setup.exe',
			notes: [
				'Installerul creează automat o distribuție Linux izolată, dedicată Nodo, astfel încât nodul rulează separat de restul sistemului tău.',
				'Nu e nevoie să configurezi manual niciun mediu Linux.'
			]
		},
		mac: {
			heading: 'macOS',
			intro: 'Un installer nativ pentru macOS <strong>nu este încă disponibil</strong>.',
			notes: [
				'Suportul pentru macOS este planificat. Între timp, poți rula un nod pe o mașină Linux sau într-o mașină virtuală Linux.',
				'Urmărește {link} pentru noutăți.'
			],
			repoLink: 'depozitul nodo'
		}
	},
	paradigm: {
		meta: {
			title: 'Celaut — Lucrarea formală',
			description: 'Celaut: o arhitectură peer-to-peer pentru proiectarea și distribuirea software-ului — lucrarea formală.'
		},
		topbarTitle: 'Lucrarea formală',
		toc: 'Cuprins',
		tocNav: 'Tabla de materii',
		systemBehaviorHeading: 'Comportamentul sistemului',
		executionHeading: 'Execuția unui serviciu',
		balancerHeading: 'Echilibrarea încărcării serviciilor'
	},
	viz: {
		home: {
			generation: 'generația {n}',
			lifeRule: '2 sau 3 vecini: trăiește · exact 3: se naște',
			oneProtocol: 'un protocol pe care trebuie să-l ruleze toți',
			networkSplits: 'schimbi regulile și rețeaua se rupe',
			whereOverlap: 'vorbesc oriunde se suprapun',
			noVote: 'fără vot · fără migrare · fără fork',
			blackBox: 'cutie neagră',
			input: 'intrare',
			output: 'ieșire',
			box: 'BOX',
			environment: 'mediu',
			api: 'API',
			interface: 'interfață',
			netDeclared: 'NET · declarat în specificație',
			nowhereElse: 'și nicăieri altundeva',
			itsNodeItsParent: 'nodul său · părintele său',
			aService: 'un serviciu',
			children: 'copii',
			whatTheySpend: 'ce cheltuiesc, nu unde sunt',
			developersShort: 'dezvoltatori · de ce are nevoie',
			developersLong: 'dezvoltatori · de ce are nevoie, ce cheltuiește',
			operatorsShort: 'operatori · unde rulează',
			operatorsLong: 'operatori · unde rulează, cât costă',
			thisNode: 'acest nod',
			aPeer: 'un semen',
			cost: 'cost {value}',
			oneInput: 'o intrare',
			when: [
				'acum',
				'peste un an',
				'pe alt hardware'
			],
			identicalEveryTime: 'identic, de fiecare dată',
			reputationLedger: 'reputație · înregistrări într-un registru',
			sourcesYouTrust: 'sursele în care ai încredere',
			firstWhatSources: 'mai întâi: ce spun sursele mele despre el?',
			rightShort: '2 vCPU · 30 min',
			rightLong: 'drept la 2 vCPU · 30 min',
			paymentRights: 'plată ⇄ drepturi asupra resurselor',
			outcomeRecorded: 'rezultatul intră în istoricul lui',
			nextStranger: 'și exact asta citește următorul necunoscut',
			requester: 'solicitant',
			node: 'nod'
		},
		developers: {
			box: 'BOX',
			api: 'API',
			net: 'NET',
			service: 'serviciu',
			anyCompatibleNode: 'orice nod compatibil',
			optionalRegistry: 'registru de reputație opțional',
			yourService: 'serviciul tău',
			itsNode: 'nodul său',
			neverFindOut: 'nu afli niciodată unde'
		},
		users: {
			you: 'tu',
			noAccount: 'fără cont',
			whatYouAsked: 'ce ai cerut',
			whatNodeRuns: 'ce rulează nodul',
			identicalItRuns: 'identic — rulează',
			microvm: 'microVM',
			destroyed: 'distrus',
			theDeveloper: 'dezvoltatorul',
			theHostMachine: 'mașina gazdă',
			computeUsed: 'calculul folosit efectiv',
			whatYouPay: 'ce plătești',
			chargingStops: 'lucrarea se termină — taxarea se oprește',
			subscription: 'un abonament care taxează oricum'
		},
		depin: {
			electricityCost: 'costul tău cu electricitatea',
			priceYouSet: 'prețul pe care îl stabilești',
			availableWindow: 'disponibil 22:00 – 07:00',
			marginCovered: 'marjă acoperită'
		}
	}
};

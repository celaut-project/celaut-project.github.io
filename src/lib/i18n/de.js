/*
 * Deutsche Fassung. Dieselbe Schlüsselstruktur wie en.js — jeder hier
 * fehlende Schlüssel fällt automatisch auf das Englische zurück, die
 * Seite bleibt also nie leer.
 *
 * Übersetzungsleitlinien
 * ----------------------
 * • Sachliches „du“, wie in deutschsprachigen Technikseiten üblich.
 * • Begriffe des Paradigmas (BOX, API, NET, Node, Service, microVM,
 *   DePIN, nodo, Ergo) bleiben unübersetzt: sie sind Projektvokabular,
 *   keine zu übersetzenden Wörter.
 * • Inline-HTML (<strong>, <em>) und die typografische Zeichensetzung
 *   des Originals bleiben erhalten.
 */

export default {
	common: {
		scroll: 'Scrollen',
		toTop: '↑ Nach oben',
		backToTop: 'Zurück nach oben',
		gains: 'Vorteile',
		costs: 'Kosten',
		visit: 'Besuchen →',
		readMore: 'Mehr lesen →',
		viewOnGitHub: 'Auf GitHub ansehen →',
		languageLabel: 'Sprache',
		switchLanguage: 'Sprache wechseln',
		toc: {
			nav: 'Bereichsnavigation',
			title: 'Auf dieser Seite',
			open: 'Bereichsmenü öffnen',
			close: 'Bereichsmenü schließen'
		}
	},
	theme: {
		toLight: 'Zum hellen Design wechseln',
		toDark: 'Zum dunklen Design wechseln',
		toggle: 'Design umschalten'
	},
	topbar: {
		nav: 'Celaut-Bereiche',
		links: {
			depin: {
				label: 'PC vermieten',
				short: 'PC'
			},
			developers: {
				label: 'Entwickler',
				short: 'Devs'
			},
			users: {
				label: 'Nutzer',
				short: 'Nutzer'
			},
			paradigm: {
				label: 'Paradigma',
				short: 'Paradigma'
			}
		}
	},
	home: {
		hero: {
			tagline: 'Eine Peer-to-Peer-Architektur für Softwareentwurf und -verteilung',
			primary: 'Jetzt loslegen',
			secondary: 'Mehr erfahren',
			facts: [
				'Inspiriert von zellulären Automaten — robustes globales Verhalten, das aus einfachen lokalen Regeln entsteht.',
				'Deterministisch von Grund auf: gleiche Eingaben liefern immer die gleiche, überprüfbare Ausgabe.',
				'Kein zentrales Register. Services verbreiten sich peer-to-peer über unabhängige Nodes.',
				'Jeder Service ist inhaltsadressiert — sein Hash ist sein Name, nichts lässt sich still austauschen.',
				'Nodes führen jeden Service versiegelt in seiner eigenen isolierten Mikroumgebung aus.',
				'Reputation liegt on-chain: Vertrauen wird verdient und ist belegbar, nie von einem Türsteher vergeben.',
				'Drei Prinzipien, durchgehend: Dezentralisierung, Einfachheit und Determinismus.'
			]
		},
		atoms: {
			eyebrow: 'Die zwei Grundbausteine',
			note: 'Zwei Atome. Spezifikation, Ausführung, Bezahlung und Reputation sind nur die Art, wie sie zusammenspielen.',
			items: [
				{
					title: 'Ein Node',
					body: 'Ein <strong>Rechner oder Gerät</strong>, das mit Peers spricht und die Ausführung von Services verwaltet. Es stellt die Hardware, entscheidet, ob Arbeit lokal läuft oder weitergereicht wird, und muss nie verstehen, was die Software tut.'
				},
				{
					title: 'Ein Service',
					body: 'Ein <strong>deterministischer Software-Container</strong>, gebaut für genau eine Aufgabe. Er ist gegenüber dem ausführenden Node versiegelt: der Node schaut nicht ins Programm hinein, und das Programm weiß nicht, auf welcher Maschine es gelandet ist.'
				}
			]
		},
		index: {
			sections: {
				foundations: 'Ursprünge',
				atoms: 'Nodes & Services',
				nodes: 'Das Netzwerk',
				services: 'Services',
				'service-spec': 'Spezifikation',
				execution: 'Ausführung',
				determinism: 'Determinismus',
				coordination: 'Koordination',
				'core-principles': 'Prinzipien',
				'what-is-not': 'Was es nicht ist',
				implementations: 'Implementierungen',
				applications: 'Anwendungen',
				'user-roles': 'Welche Rolle hast du?'
			}
		},
		scenes: {
			foundations: {
				label: 'Woher es kommt',
				beats: [
					{
						h: 'Es beginnt mit einer Handvoll Regeln.',
						p: 'In den 1940ern führten <strong>John von Neumann</strong> und <strong>Stanislaw Ulam</strong> zelluläre Automaten ein: Modelle, die zeigten, wie komplexes Verhalten aus einfachem entstehen kann.'
					},
					{
						h: 'Hier führt niemand Regie.',
						p: '1970 wurde <strong>John Horton Conways „Game of Life“</strong> zum klassischen Beispiel: ein Raster, in dem jede Zelle immer nur ihre Nachbarn betrachtet — und das trotzdem verwickelte, sich entwickelnde Strukturen hervorbringt.'
					},
					{
						h: 'Genau das ist die ganze Entwurfsphilosophie.',
						p: 'Diese Ideen zeigen, wie dezentrale Systeme <strong>Komplexität ohne zentrale Steuerung erreichen</strong> können — die Leitidee hinter Celaut. Einfache Regeln auf Node- und Service-Ebene, ein anpassungsfähiges System darüber.',
						note: 'Dezentralisierung · Einfachheit · Determinismus'
					}
				]
			},
			nodes: {
				label: 'Das Netzwerk',
				beats: [
					{
						h: 'Nodes zu haben ist nicht der Unterschied.',
						p: 'Die meisten dezentralen Netzwerke haben Nodes — und hängen trotzdem an einer mächtigen Sache: <strong>dem Protokoll, das alle fahren müssen</strong>. Die Regeln sind die Mitte, auch wenn die Maschinen es nicht sind.'
					},
					{
						h: 'Celaut hat kein Protokoll, auf das man sich einigen müsste.',
						p: 'Nodes müssen sich vorab auf kein Kommunikationsprotokoll festlegen — sie <strong>nennen beim Kontakt die Schnittstellen, die sie unterstützen, und die Zahlungsmittel, die sie akzeptieren</strong>. Zwei Nodes reden über das, was sie zufällig gemeinsam haben; wo es keine Überschneidung gibt, reden sie eben nicht.'
					},
					{
						h: 'Du änderst also deinen Node, nicht das Netzwerk.',
						p: 'Eine neue Preispolitik, ein weiteres Zahlungsmittel, ein Spezifikationsformat, das sonst noch niemand liest — du <strong>baust es in deinen eigenen Node ein</strong>, und es funktioniert mit allen, die es bereits unterstützen. Niemand stimmt ab, nichts muss migriert werden, und es gibt <strong>keinen Hard Fork zu überstehen</strong>.',
						note: 'Kein gemeinsames Protokoll. Keine gemeinsame Version. Keine Erlaubnis.'
					}
				]
			},
			services: {
				label: 'Was darauf läuft',
				beats: [
					{
						h: 'Ein Service ist ein versiegelter Container.',
						p: 'Services in Celaut sind <strong>deterministische Software-Container</strong>, gebaut für eine bestimmte Aufgabe. Nichts Komplizierteres als das.'
					},
					{
						h: 'Nach dem Black-Box-Prinzip.',
						p: 'Sie arbeiten <strong>unabhängig von den Nodes, die sie ausführen</strong>, und kümmern sich allein um ihre Funktion. Der Node muss den Service nicht verstehen, und der Service muss nichts über den Node wissen.'
					},
					{
						h: 'Isoliert, jedes einzelne Mal.',
						p: 'Jede Anfrage läuft als <strong>isolierter Prozess</strong> — in einer eigenen <strong>virtuellen Maschine</strong>, mit eigenem Kernel und einer hardwaregestützten Grenze —, was die Ausführungsumgebung wegabstrahiert und die Sicherheitsgrenze intakt hält.',
						note: 'Was hineingeht, was herauskommt. Das ist die ganze Schnittstelle.'
					}
				]
			},
			'service-spec': {
				label: 'Wie ein Service spezifiziert wird',
				explore: '{what} erkunden',
				exploreClose: 'Zurück zum ganzen Service',
				beats: [
					{
						h: '<strong>BOX</strong> — die Umgebung.',
						p: 'Architektur, Dateisystem, Umgebungsvariablen, Entrypoint, Konfiguration und Ressourcen. Sie beschreibt die gesamte Dateistruktur direkt, statt sich auf externe Images oder Repositories zu stützen — und genau das macht die Ausführung auf jedem Node reproduzierbar.'
					},
					{
						h: '<strong>API</strong> — die Schnittstelle.',
						p: 'Wie man mit dem Service kommuniziert, welche Zahlungssysteme er akzeptiert und was er kostet. Damit lassen sich Services nutzen, ohne dass eine zentrale Instanz für sie ein Protokoll aushandelt.'
					},
					{
						h: '<strong>NET</strong> — der Netzwerkumfang.',
						p: 'Standardmäßig ist ein Service <strong>isoliert</strong>: Er kann nur mit seinem Eltern-Service, seinen Kindern und dem ausführenden Node sprechen. Braucht er die Außenwelt, werden <strong>die Netze, die er erreichen wird, in seiner eigenen Spezifikation benannt</strong> — der Node gewährt sie, weil er den Service korrekt ausführen will, und du bekommst die Garantie, dass er nirgendwo sonst hinkommt.'
					},
					{
						h: 'Drei Bestandteile. Ein portabler Service.',
						p: 'Zusammen ergeben sie <strong>portable, reproduzierbare Services</strong>, die sich netzwerkweit gleich verhalten und dabei Sicherheit und Determinismus wahren.',
						note: 'Keine Drittabhängigkeiten. Nichts bleibt implizit.'
					}
				]
			},
			execution: {
				label: 'Wer was entscheidet',
				beats: [
					{
						h: 'Ein Service fragt nach seinen Kindern.',
						p: 'Ein Service kann über seinen Node die Ausführung von <strong>Kind-Services</strong> anfordern. Er nennt <strong>die Ressourcen, die jedes davon braucht</strong>, und gibt ein Budget mit, das sie ausgeben dürfen. Keine Maschine, keine Region — Ressourcen.'
					},
					{
						h: 'Der Node entscheidet, wo sie laufen.',
						p: 'Er vergleicht <strong>die Kosten einer lokalen Ausführung mit dem Preis, den jeder seiner Peers nennt</strong>, und nimmt den, den er für den besten hält. Ein Kind bleibt hier; ein anderes landet bei einem Peer.'
					},
					{
						h: 'Der Eltern-Service erfährt es nie.',
						p: 'Er weiß nicht, ob ein Kind auf dieser Maschine gelandet ist oder woanders, und er muss es auch nicht. Er beobachtet nur, <strong>was seine Kinder verbrauchen und wie schnell sie ausgeben</strong>, um das ausbalancieren zu können.'
					},
					{
						h: 'Diese Trennung ist der ganze Kniff.',
						p: 'Node-Betreiber kümmern sich um das Physische: Hardware, Kapazität, Preis, Platzierung. Service-Entwickler <strong>deklarieren die Ressourcen, die sie brauchen, und nichts zur Infrastruktur</strong>. Keiner muss die Arbeit des anderen machen — genau das hält beide Hälften einfach.',
						note: 'Zwei Belange. Eine saubere Linie dazwischen.'
					}
				]
			},
			determinism: {
				label: 'Warum es trägt',
				beats: [
					{
						h: 'Gleiche Eingabe. Gleiche Ausgabe.',
						p: 'Services sind vollständig spezifiziert, um über Zeit und Nodes hinweg <strong>reproduzierbare Ergebnisse</strong> anzustreben. Bei gleichen Eingaben soll dieselbe Spezifikation dieselben Ausgaben liefern, egal wo und wann sie läuft.'
					},
					{
						h: 'Keine Garantie in jedem Fall.',
						p: 'Ein Service, der ein Netz erreicht, kann nicht perfekt reproduzierbar sein — das Netz antwortet anders. Aber eine <strong>Spezifikation trägt weit mehr als eine Docker-Definition</strong>: die Architektur, das gesamte Dateisystem, den Entrypoint, die Konfiguration. Das liegt also viel näher am Ausführen eines gewöhnlichen Programms als am Ziehen eines Images auf gut Glück.'
					},
					{
						h: 'Das macht Vertrauen messbar.',
						p: 'Weil die Software nicht abdriften kann, <strong>sagt ein vor einiger Zeit aufgezeichneter Reputationsnachweis auch heute noch etwas Wahres aus</strong> — vorausgesetzt, der Service greift auf kein Netz zu, was sein Standardzustand ist.'
					},
					{
						h: 'Und es reist mit.',
						p: 'Weil nichts an der Umgebung dem Wirt überlassen bleibt, erzeugt dieselbe Spezifikation dasselbe Verhalten auf <strong>einem Laptop, einem übrigen Server oder einem Node, von dem du nie gehört hast</strong>. Wo etwas läuft, ist keine Teilantwort mehr.',
						note: 'Vollständig spezifiziert — der Maschine bleibt nichts überlassen.'
					}
				]
			},
			coordination: {
				label: 'Wie Fremde kooperieren',
				more: 'Das Vertrauensmodell im Detail →',
				beats: [
					{
						h: 'Reputation kommt zuerst.',
						p: '<strong>Vertrauen wird zwischen den Beteiligten nie vorausgesetzt.</strong> Nodes vertrauen anderen Nodes nicht; du vertraust weder einem Service noch dem Node, der ihn ausführt, von vornherein; und ein Node muss dem Service, den er ausführt, ebenfalls nicht vertrauen. Die eine Richtung, die trägt, ist die umgekehrte: ein Service kann seinem Node vertrauen, denn wer ihn ausführen ließ, hat genau diesen Node gewählt. Nichts beginnt also mit einem Handschlag, sondern mit einem Nachschlagen: Reputation sind <strong>Einträge in Ledgern</strong>, Meinungen statt Urteile, gewichtet nach den Quellen, denen jeder Akteur ohnehin traut.'
					},
					{
						h: 'Dann zahlst du für ein Ressourcenversprechen.',
						p: 'Erst wenn der Eintrag standhält, bewegt sich etwas. Der Anfragende zahlt <strong>im Voraus</strong>, und was er kauft, ist ein Versprechen: <strong>so viel Rechenleistung, für so lange</strong>. Zahlungsmechanismen sitzen <strong>außerhalb der Kernarchitektur</strong>, es ist also kein bestimmtes Ledger fest eingebaut.'
					},
					{
						h: 'Die Garantie des Nodes ist seine Reputation.',
						p: 'Nichts zwingt ihn, dieses Versprechen einzulösen. Was ihn hält, ist, dass <strong>das Ergebnis zurück ins Ledger geschrieben wird</strong> — und ein Node, dessen Eintrag sagt, er habe kassiert und zu wenig geliefert, wird nicht mehr gewählt. Beide Seiten haben ein dauerhaftes Interesse daran, dass dem nächsten Fremden gefällt, was er liest.',
						note: 'Prüfen · zahlen · liefern · eintragen. Dann von vorn.'
					}
				]
			},
			'core-principles': {
				label: 'Die Regeln, an die es sich hält',
				beats: [
					{
						h: 'Nichts davon war eine Funktionsliste.',
						p: 'Ein Netzwerk ohne Protokoll, auf das man sich einigen muss, Services, die gegenüber den ausführenden Maschinen versiegelt sind, vorab deklarierte Netzwerke, Bezahlung vor der Ausführung — jedes Einzelne davon ist eine <strong>Folge</strong>. Drei Verpflichtungen bringen sie hervor, und sie tragen einander.'
					},
					{
						h: 'Dezentralisierung.',
						p: 'Kein <strong>einzelner Kontroll- oder Ausfallpunkt</strong>. Nodes kommunizieren und stimmen sich dynamisch ab, ohne etwas dazwischen, das um Erlaubnis gefragt werden müsste — weshalb es von vornherein kein Protokoll gab, auf das man sich hätte einigen müssen.'
					},
					{
						h: 'Einfachheit.',
						p: '<strong>Minimalistische Regeln</strong>, die Komplexität reduzieren, sodass jede Komponente klein genug bleibt, um für sich verstanden und gepflegt zu werden. Ein Service ist ein Container, eine Schnittstelle und ein Netzwerk-Scope — mehr nicht.'
					},
					{
						h: 'Determinismus.',
						p: 'Services sind vollständig genug spezifiziert, um ihre <strong>Ergebnisse reproduzierbar</strong> zu machen, über die Zeit und über Maschinen hinweg. Gleiche Eingaben, gleiche Ausgaben, wo und wann immer sie laufen — genau das macht eine vor einem Jahr aufgezeichnete Reputation heute noch lesenswert.',
						note: 'Nimm eines der drei weg, und die anderen beiden sind kaum noch etwas wert.'
					}
				]
			}
		},
		roles: {
			eyebrow: 'Wähle deinen Einstieg',
			heading: 'Welche Rolle hast du?',
			intro: 'Als Nutzer können wir im Ökosystem drei Arten von Rollen einnehmen. Jede hat ihren eigenen Einstieg.',
			items: [
				{
					eyebrow: 'Rolle 01',
					title: 'Node-Betreiber',
					lede: 'Ähnlich wie Miner in Blockchain-Systemen stellen Node-Betreiber dem Netzwerk Rechenressourcen bereit. Sie führen von Nutzern angeforderte Services gegen Bezahlung aus, ohne deren konkrete Funktion verstehen zu müssen.',
					points: [
						'Hardware-Ressourcen bereitstellen',
						'Services auf Anfrage ausführen',
						'Vergütung für Ressourcen erhalten'
					],
					primary: 'PC vermieten',
					secondary: 'Node betreiben'
				},
				{
					eyebrow: 'Rolle 02',
					title: 'Service-Entwickler',
					lede: 'Entwickler bauen Services, die auf jedem kompatiblen Node im Netzwerk laufen können. Sie konzentrieren sich auf die Funktionalität, ohne sich um die darunterliegende Infrastruktur zu kümmern.',
					points: [
						'Service-Spezifikationen entwerfen',
						'Deterministische Anwendungen bauen',
						'Services an Nodes verteilen'
					],
					primary: 'Auf Celaut bauen',
					secondary: 'Skills erkunden'
				},
				{
					eyebrow: 'Rolle 03',
					title: 'Service-Nutzer',
					lede: 'Endnutzer starten Services auf Nodes und zahlen für die genutzten Rechenressourcen.',
					points: [
						'Service-Ausführung anfordern',
						'Für Rechenressourcen zahlen',
						'Service-Ergebnisse nutzen'
					],
					primary: 'Netzwerk nutzen',
					secondary: 'Skills erkunden'
				}
			]
		},
		principles: {
			items: [
				{
					title: 'Dezentralisierung'
				},
				{
					title: 'Einfachheit'
				},
				{
					title: 'Determinismus'
				}
			]
		},
		whatIsNot: {
			eyebrow: 'Häufige Missverständnisse',
			heading: 'Was Celaut nicht ist',
			intro: 'Die Architektur liegt nahe genug an mehreren vertrauten Dingen, um mit ihnen verwechselt zu werden. Es lohnt sich, bei den Unterschieden präzise zu sein.',
			items: [
				{
					title: 'Kein einzelnes Netzwerk',
					body: 'Celaut definiert eine <strong>flexible Architektur</strong>, kein vorbestimmtes Netzwerk. Es mögen sich dominante Netze herausbilden, aber das System trägt viele Peer-to-Peer-Konstruktionen, statt eine einzige vorzuschreiben.'
				},
				{
					title: 'Kein vollständiger Protokoll-Stack',
					body: 'Es liefert <strong>Kernprinzipien</strong> für den Bau von Stacks zur Verteilung von Berechnungen, keinen fertigen, meinungsstarken Stack. Aktuelle Implementierungen stützen sich auf Komponenten wie gRPC und Ergo, und das sind austauschbare Entscheidungen.'
				},
				{
					title: 'Kein Blockchain-Projekt',
					body: 'Celaut hat <strong>keine eigene Kryptowährung</strong> und keine DAOs. Es nutzt Blockchain-Technologien dort, wo sie ihren Platz verdienen — Reputation festhalten, Zahlungen zwischen Fremden abwickeln —, ohne das ganze Ökosystem drumherum zu übernehmen.'
				}
			]
		},
		implementations: {
			eyebrow: 'Die Software',
			heading: 'Was es heute gibt',
			intro: 'Die Architektur ist eine Spezifikation, und jede und jeder kann einen Node dagegen implementieren. Eine Implementierung trägt das Netzwerk heute; eine zweite ist eine angekündigte Richtung und wird auch so gekennzeichnet.',
			items: [
				{
					name: 'Nodo',
					stage: 'Läuft',
					body: 'Die Referenzimplementierung, in Python3 und Rust. Sie führt Services aus, verhandelt Kosten mit Peers, stellt Adressen und Tokens bereit und löst Abhängigkeiten auf, wo immer sie laufen. Unter Linux mit einem einzigen Befehl installierbar, unter Windows 11 über einen offiziellen Installer, der seine eigene isolierte Linux-Umgebung einrichtet.'
				},
				{
					name: 'Chatui',
					stage: 'Konzept',
					body: 'Die erklärte Absicht, einen Android-Node zu bauen, der Services über eine schlichte Chat-Oberfläche erreicht, ohne einem anderen Node vertrauen zu müssen. Das Repository enthält derzeit diese Beschreibung und sonst nichts — es gibt noch keinen Code zum Ausführen.'
				}
			],
			note: 'Nichts hier ist ein Platzhalter für etwas, das anderswo schon funktioniert. Was läuft, läuft; was nicht läuft, sagt es.'
		},
		applications: {
			eyebrow: 'Wo es bereits läuft',
			heading: 'Wirkung und Anwendungen in der Praxis',
			intro: 'Die Architektur ist kein Gedankenexperiment. Sie ist in zwei unterschiedlichen Abständen im Einsatz — als die Schicht selbst, und als Fundament unter etwas, das seinen eigenen Daseinsgrund hat.',
			layerHeading: 'Die Architektur, eingeschaltet',
			layerTag: 'Die Schicht selbst',
			layerIntro: 'Keines von beiden ist eine auf Celaut gebaute Anwendung. Sie sind das, was Celaut <strong>ist</strong>, sobald tatsächlich Nodes laufen.',
			layer: [
				{
					name: 'DePIN',
					body: 'Jede und jeder kann einen Celaut-Node betreiben und Teil eines dezentralen physischen Infrastrukturnetzwerks werden. Jeder Node findet Peers, führt Services aus und orchestriert sie, und verwaltet ihre Abhängigkeiten — gewöhnliche Rechner werden so zu geteilter, zensurresistenter Rechenleistung. Das ist das Netzwerk, kein Produkt darauf.'
				},
				{
					name: 'Unstoppable Skills',
					body: 'Ein vollständig on-chain betriebenes, serverloses Register, in dem die Probleme die Hauptrolle spielen. Statt nach Services zu suchen, suchen Agenten nach einer Fähigkeit und finden die Services, die sie abdecken — mit echten Benchmarks und reputationsbasiertem Ranking. So wird die Reputationsschicht des Paradigmas praktisch erreichbar: auf Ergo, mit echtem Einsatz, denn niemand spammt, ohne Reputation zu riskieren.'
				}
			],
			builtOnHeading: 'Darauf aufgebaut',
			builtOnTag: 'Eigenständiges Projekt',
			builtOnIntro: 'Einen Schritt weiter draußen: ein Produkt mit eigenem Zweck und eigenen Nutzern, das zufällig aus Celaut-Services zusammengesetzt ist. Es ergäbe auch dann noch Sinn, wenn es auf etwas anderem neu gebaut würde — und genau das macht es zum Beleg.',
			builtOn: {
				name: 'Game of Prompts',
				body: [
					'Eine Wettbewerbsplattform, auf der Kreative <strong>Game-Services</strong> entwerfen, die die spielenden Roboter bewerten, und Spieler <strong>Solver-Services</strong> schreiben, die ihre Punktzahl maximieren sollen.',
					'Die Services folgen dem Celaut-Paradigma, und das ganze System nutzt die Ergo-Blockchain, um Ergebnisse festzuhalten und Preise zu übertragen.'
				]
			},
			ergoDocs: 'Ergo-Doku',
			formalPaper: 'Formales Paper'
		}
	},
	depin: {
		meta: {
			title: 'PC vermieten — Celaut DePIN',
			description: 'Verkaufe die Ressourcen deines Rechners, wenn du ihn gerade nicht brauchst. Die DePIN-Schicht von Celaut ist vollständig peer-to-peer, lässt dich Rechenleistung rund um deine Stromkosten bepreisen und kapselt jede Last in einer microVM.'
		},
		topbarTitle: 'PC vermieten',
		index: {
			sections: {
				rent: 'Die Idee',
				p2p: 'Peer-to-Peer',
				electricity: 'Deine Stromrechnung',
				isolation: 'Isolation',
				payoff: 'Was du bekommst',
				responsibilities: 'Was ein Node tut',
				steps: 'Von der Installation zum Ertrag',
				roles: 'Die andere Seite',
				cta: 'Loslegen'
			}
		},
		hero: {
			eyebrow: 'Celaut DePIN',
			title: 'Vermiete deinen PC.',
			tagline: 'Verkaufe die Ressourcen deines Rechners, wenn du ihn gerade nicht brauchst.',
			lede: 'Deine Maschine steht den größten Teil des Tages still. Celaut macht aus dieser ungenutzten Kapazität etwas, wofür Leute zahlen — direkt, zu deinen Bedingungen, und jede Last sauber von deinem System abgeschottet.',
			actions: [
				'PC jetzt vermieten',
				'So funktioniert es'
			],
			stats: [
				{
					value: '100 %',
					label: 'peer-to-peer — keine Firma dazwischen'
				},
				{
					value: 'Du',
					label: 'setzt den Preis, inklusive deiner Stromrechnung'
				},
				{
					value: 'microVM',
					label: 'Isolation für jede Last, die du hostest'
				}
			]
		},
		scenes: {
			rent: {
				label: 'Die Idee',
				beats: [
					{
						h: 'Dein PC ist gerade im Leerlauf.',
						p: 'Die meisten privaten Rechner stehen den überwiegenden Teil des Tages ungenutzt herum. Das ist echte Hardware — Kerne, Speicher, Platte —, die überhaupt nichts tut.'
					},
					{
						h: 'Verkaufe, was du nicht brauchst.',
						p: 'Celaut schneidet aus deiner Maschine <strong>Kapazität heraus, die du vermieten kannst</strong>. Du entscheidest, wie viel davon ins Netzwerk geht und wie viel deins bleibt — der Rest der Maschine arbeitet genau wie vorher.'
					},
					{
						h: 'Werde für die geleistete Arbeit bezahlt.',
						p: 'Peers, die Rechenleistung brauchen, finden deinen Node, einigen sich direkt mit ihm auf einen Preis und zahlen pro Ausführung. <strong>Die Abwicklung läuft über Ergo</strong>, sobald ein Auftrag abgeschlossen ist.',
						note: 'Kein Rechenzentrum. Kein Vermittler. Kein Warten auf Monatsauszahlungen.'
					}
				]
			},
			p2p: {
				label: 'Vorteil 01',
				beats: [
					{
						h: 'Vollständig peer-to-peer.',
						p: 'Jede andere Plattform zum „Vermieten deiner Hardware“ setzt eine Firma dazwischen. Sie hält den Marktplatz, nimmt die Provision, setzt die Regeln und kann dich jederzeit aus ihrem Netz entfernen.'
					},
					{
						h: 'Es ist niemand dazwischen.',
						p: 'Celaut hat <strong>keine Stiftung und keine Firma</strong>, die zwischen den beiden Parteien sitzt. Dein Node und der Peer, der Rechenleistung will, reden <strong>direkt</strong> miteinander — Auffinden, Verhandeln, Ausführen, Abrechnen.'
					},
					{
						h: 'Also kann dich niemand abklemmen.',
						p: 'Kein Konto zum Sperren, keine Bedingungen, die sich unter dir ändern, keine Gebühr, die still wächst. Die Interaktion ist <strong>vollständig peer-to-peer</strong>, das Einzige, worauf sich beide Seiten verlassen, ist die jeweils andere.',
						note: 'Nichts, wofür man sich anmeldet. Nichts, wovon man verbannt werden kann.'
					}
				]
			},
			electricity: {
				label: 'Vorteil 02',
				beats: [
					{
						h: 'Rechenleistung ist nicht umsonst zu verschenken.',
						p: 'Deine Maschine laufen zu lassen kostet Strom, und dieser Preis ist nicht konstant — er schwankt über den Tag und hängt davon ab, wo du wohnst.'
					},
					{
						h: 'Rechne ihn ein.',
						p: 'Celaut lässt dich <strong>Stromkosten optional einpreisen</strong>. Dein Node bepreist Arbeit mit deiner Stromrechnung in der Gleichung, sodass dich das Vermieten von Kapazität nie still Geld kostet.'
					},
					{
						h: 'Und entscheide, wann du geöffnet hast.',
						p: '<strong>Verfügbarkeit und Laufzeit legst du ebenfalls fest.</strong> Vermiete die Maschine nur nachts, wenn der Strom am günstigsten ist, begrenze, wie lange ein einzelner Auftrag laufen darf, oder geh ganz offline — das Netzwerk leitet einfach woanders hin.',
						note: 'Deine Preise. Deine Zeiten. Deine Marge.'
					}
				]
			},
			isolation: {
				label: 'Vorteil 03',
				beats: [
					{
						h: 'Wessen Code läuft da auf meinem PC?',
						p: 'Das ist die erste Frage, die jeder vernünftige Mensch stellt. Die eigene Maschine zu vermieten darf nicht heißen, Fremden die Schlüssel dazu zu geben.'
					},
					{
						h: 'Vollständige Ausführungsisolation.',
						p: 'Jede Last läuft versiegelt in ihrer eigenen <strong>microVM</strong> — einer echten virtuellen Maschine mit eigenem Kernel und hardwaregestützter Grenze, nicht in einem Container mit geteiltem Kernel. Sie sieht weder deine Dateien noch dein Netzwerk noch irgendeine andere Last auf der Maschine.'
					},
					{
						h: 'Dieselbe Technik, auf der die großen Clouds laufen.',
						p: 'microVMs sind das, was <strong>große Cloud-Anbieter</strong> nutzen, um nicht vertrauenswürdigen Code von Millionen Fremder auf geteilter Hardware auszuführen. Celaut bringt dasselbe Isolationsmodell auf deinen Schreibtisch — die Garantie ist kein Versprechen, sie ist die Architektur.',
						note: 'Auftrag endet, VM wird zerstört. Nichts bleibt zurück.'
					}
				]
			}
		},
		payoff: {
			heading: 'Was du tatsächlich bekommst',
			items: [
				{
					title: 'Ungenutzte Hardware, die arbeitet',
					body: 'Der Gaming-Rechner, der um 3 Uhr schläft, die Workstation, die übers Wochenende stillsteht, eine übrige Kiste im Schrank. Wenn nodo darauf läuft, kann sie verdienen.'
				},
				{
					title: 'Du setzt die Bedingungen',
					body: 'Preis pro Recheneinheit, zu welchen Zeiten du verfügbar bist, wie viel der Maschine du abgeben willst. Alles davon kannst du jederzeit ändern.'
				},
				{
					title: 'Bezahlung im Voraus',
					body: 'Ein Node wird vorab für ein Ressourcenversprechen bezahlt — auf Ergo (ERG), keine Rechnungen, kein Auszahlungsplan einer Plattform, keine Mindestsumme. Die Reputation ist die Garantie, dass er liefert.'
				},
				{
					title: 'Nichts, dem man vertrauen muss',
					body: 'Services sind inhaltsadressiert: Der Anfragende bekommt genau die Software, nach der er gefragt hat, und du führst sie aus, ohne sie zu prüfen oder für sie zu bürgen.'
				},
				{
					title: 'Deine Dateien bleiben deine',
					body: 'Eine Last lebt in ihrer eigenen microVM mit eigenem Kernel. Sie sieht nie deine Platte, dein Netzwerk oder sonst etwas auf der Maschine.'
				},
				{
					title: 'Geh, wann du willst',
					body: 'Stoppe den Node, und das Netzwerk leitet um dich herum. Es gibt keinen Vertrag, keine Bindung und niemanden, den man um Erlaubnis fragen müsste.'
				}
			]
		},
		responsibilities: {
			heading: 'Was der Node auf deiner Maschine tatsächlich tut',
			intro: 'Ein Node ist ein <strong>Rechner oder Gerät</strong>, das mit Peers kommuniziert und die Ausführung von Services verwaltet. Das Paradigma gibt ihm vier Aufgaben — und setzt keinen Koordinator über ihn.',
			items: [
				{
					title: 'Service-Ausführung',
					body: 'Er verhandelt Ausführungskosten mit Peers und entscheidet, ob ein Service lokal läuft oder delegiert wird, damit Ressourcen dorthin gehen, wo sie am günstigsten sind.'
				},
				{
					title: 'Kommunikation',
					body: 'Er nennt beim Kontakt die Schnittstellen, die er unterstützt, und die Zahlungsmittel, die er akzeptiert — das lässt Protokolle ohne vorherige Absprache weiterwachsen.'
				},
				{
					title: 'Sicherheit',
					body: 'Er vergibt und verwaltet die Adressen und Authentifizierungs-Token, über die jede Service-Interaktion identifiziert wird.'
				},
				{
					title: 'Abhängigkeiten',
					body: 'Er stellt sicher, dass ein Service erreicht, was er braucht — wo auch immer im Netzwerk diese Abhängigkeit gerade läuft.'
				}
			],
			note: 'Nichts davon setzt voraus, zu wissen, wofür die ausgeführte Software gedacht ist.'
		},
		steps: {
			heading: 'Von der Installation zum Einkommen',
			items: [
				{
					title: 'nodo installieren',
					body: 'Ein Befehl unter Linux, ein Installer unter Windows. Deine Maschine tritt dem Netzwerk bei und beginnt, Peers zu finden.'
				},
				{
					title: 'Preis und Zeiten festlegen',
					body: 'Sag dem Node, was deine Rechenleistung kostet — inklusive Strom, wenn du ihn einpreisen willst — und wann sie verfügbar ist.'
				},
				{
					title: 'Arbeit annehmen',
					body: 'Peers verhandeln direkt mit deinem Node. Angenommene Lasten laufen versiegelt in einer microVM, isoliert von allem anderen.'
				},
				{
					title: 'Bezahlt werden',
					body: 'Die Zahlung wird im Voraus auf Ergo eingezogen; Reputation wird eingetragen, während die Arbeit eingelöst wird. Beitrag wird belohnt, Ergebnisse bleiben prüfbar.'
				}
			]
		},
		roles: {
			heading: 'Die andere Seite des Handels',
			intro: 'Deinen PC zu vermieten ist die eine Hälfte des Netzwerks. Die andere ist, es <em>nutzen</em> zu können — und genau die Eigenschaften, die dich als Host schützen, machen das Netzwerk als Anbieter interessant.',
			items: [
				{
					title: 'Entwickler',
					body: 'Liefere ein Programm einmal als versiegelten, inhaltsadressierten Service aus und lass das Netzwerk es hosten, auffindbar machen und skalieren. Reproduzierbarkeit kommt aus dem Entwurf, nicht aus dem SLA eines Anbieters.',
					link: 'Für Entwickler →'
				},
				{
					title: 'Agenten &amp; Nutzer',
					body: 'Fordere Services nach dem Problem an, das sie lösen, und zahle pro Ausführung. Kein Cloud-Konto, keine Bindung — und die Versiegelung beweist, dass du genau die Software bekommen hast, nach der du gefragt hast.',
					link: 'Für Endnutzer →'
				},
				{
					title: 'Hosts',
					body: 'Das bist du. Steuere bei, welche Hardware auch immer du hast; die Virtualisierungsschicht des Nodes sorgt dafür, dass Lasten trotzdem dort landen, wo sie passen — auch über CPU-Architekturen hinweg.'
				}
			]
		},
		cta: {
			heading: 'Schalte deine untätige Maschine ein.',
			body: 'Einen Node zu installieren dauert einen Befehl. Es ist der schnellste Weg zu sehen, was deine Hardware wert ist, wenn sie sonst nichts tut.',
			actions: [
				'Node betreiben',
				'Paradigma lesen'
			]
		}
	},
	developers: {
		meta: {
			title: 'Für Entwickler — Einmal bauen, überall laufen lassen | Celaut',
			description: 'Baue Celaut-Services: spezifiziere eine BOX, eine API und einen NET-Bereich, übergib es einem Node und lass das Netzwerk es verteilen und ausführen. Keine Infrastruktur, keine Konfiguration, keine Plattform dazwischen.'
		},
		topbarTitle: 'Für Entwickler',
		index: {
			sections: {
				spec: 'Die Idee',
				agnostic: 'Läuft überall',
				distribute: 'Verteilung',
				compose: 'Komposition',
				payoff: 'Was du bekommst',
				distribution: 'Wie es sich verbreitet',
				steps: 'Vom Code ins Netzwerk',
				tradeoffs: 'Der Handel',
				roles: 'Die anderen',
				cta: 'Loslegen'
			}
		},
		hero: {
			eyebrow: 'Service-Entwickler',
			title: 'Bau es einmal.',
			tagline: 'Und hör auf, darüber nachzudenken, wo es läuft.',
			lede: 'Ein Celaut-Service ist kein Deployment — er ist eine Spezifikation. Beschreibe die Umgebung, die Schnittstelle und den Netzwerkbereich, übergib das an einen einzigen Node, und das Netzwerk macht den Rest.',
			actions: [
				'Skills erkunden',
				'So funktioniert es'
			],
			stats: [
				{
					value: 'BOX · API · NET',
					label: 'drei Bestandteile — das ist die ganze Spezifikation'
				},
				{
					value: 'Kein DevOps',
					label: 'Nodes übernehmen die Ausführung; es gibt kein Cloud-Konto zu eröffnen'
				},
				{
					value: 'Deterministisch',
					label: 'gleiche Eingaben, gleiche Ausgaben, auf jedem Node, zu jeder Zeit'
				}
			]
		},
		scenes: {
			spec: {
				label: 'Die Idee',
				beats: [
					{
						h: 'Du deployst nicht. Du spezifizierst.',
						p: 'Es gibt keinen Server bereitzustellen, kein Image zu pushen, keine Pipeline grün zu halten. Ein Service in Celaut ist eine schriftliche Beschreibung dessen, was er zum Laufen braucht.'
					},
					{
						h: 'Drei Bestandteile. Mehr ist es nicht.',
						p: '<strong>BOX</strong> beschreibt die Ausführungsumgebung — Architektur, Dateisystem, Umgebungsvariablen, Entrypoint, Konfiguration. Sie legt die gesamte Dateistruktur direkt fest, statt auf ein externes Image zu zeigen, und genau das hält die Ausführung reproduzierbar.'
					},
					{
						h: 'Und wie die Welt ihn erreicht.',
						p: '<strong>API</strong> definiert, wie Clients und andere Services mit ihm sprechen, dazu akzeptierte Zahlungsmittel und Kosten. <strong>NET</strong> benennt die externen Netze, die er erreichen wird — standardmäßig ist ein Service isoliert, und alles Weitere wird in der Spezifikation selbst deklariert, sodass Nutzer vorab wissen, wohin er kann.',
						note: 'Portabel, reproduzierbar, frei von Drittabhängigkeiten.'
					}
				]
			},
			agnostic: {
				label: 'Vorteil 01',
				beats: [
					{
						h: 'Was auch immer du geschrieben hast, es wird gleich ausgeliefert.',
						p: 'Celaut verlangt von dir kein Framework, keine Runtime und kein SDK. Es verlangt ein Dateisystem und einen Entrypoint.'
					},
					{
						h: 'Dem Node ist es ebenso egal.',
						p: 'Services folgen dem <strong>Black-Box-Prinzip</strong>: Sie arbeiten unabhängig von den Details der Nodes, die sie ausführen, und Nodes führen sie aus, ohne verstehen zu müssen, was sie tun.'
					},
					{
						h: 'Also nimmt ihn jeder kompatible Node.',
						p: 'Die BOX deklariert die Mikroarchitektur, auf die sie zielt, damit Nodes wissen, ob sie passen. Darüber hinaus gilt: <strong>Dein Service kann von jedem auf jedem kompatiblen Node ausgeführt werden</strong> — das ist der ganze Vertrag.',
						note: 'Keine Bindung, weil es nichts gibt, woran man gebunden wäre.'
					}
				]
			},
			distribute: {
				label: 'Vorteil 02',
				beats: [
					{
						h: 'Übergib ihn einem Node.',
						p: 'Du veröffentlichst nicht in einem Store und wartest auf keine Prüfung. Der Entwickler muss den <strong>Service nur an einen oder mehrere Nodes schicken</strong>.'
					},
					{
						h: 'Das Netzwerk trägt ihn von dort weiter.',
						p: 'Diese Nodes übernehmen die <strong>Verteilung des Service an andere</strong>. Es gibt kein zentrales Service-Register — Services verbreiten sich peer-to-peer, es gibt also keinen Single Point of Failure und keinen Türsteher, der entscheidet, ob du reindarfst.'
					},
					{
						h: 'Auffindbar, wenn du das willst.',
						p: 'Nodes können den <strong>Service auch in ein Reputationssystem hochladen</strong>, damit Nutzer und andere Services beurteilen können, ob und wann sie ihn nutzen. Services lassen sich in einem Blockchain-Register deklarieren — etwa im <strong>Sigma Reputation System</strong> auf Ergo —, um Sichtbarkeit und Vertrauen zu verbessern.',
						note: 'Nichts, wofür man sich anmeldet. Niemand, der eine Provision nimmt.'
					}
				]
			},
			compose: {
				label: 'Vorteil 03',
				beats: [
					{
						h: 'Services, die Services aufrufen.',
						p: 'Ein Service kann über den ausführenden Node die Ausführung anderer Services anfordern — seiner <strong>Kind-Services</strong>. Komplexe Abläufe entstehen durch Komposition, nicht durch Orchestrierungskonfiguration.'
					},
					{
						h: 'Der Node entscheidet, wo sie landen.',
						p: 'Nodes verwalten Service-Instanzen und entscheiden, ob sie lokal laufen oder die Last auf Peers verteilt wird. Abhängigkeiten sind das Problem des Nodes — er stellt sicher, dass Services netzwerkweit erreichen, was sie brauchen.'
					},
					{
						h: 'Und du erfährst nie, wo.',
						p: '<strong>Der Eltern-Service weiß nicht, wo seine Abhängigkeiten ausgeführt werden.</strong> Jedes Kind nennt lediglich die Ressourcen, die es braucht. Du schreibst die Komposition; das Netzwerk löst die Platzierung.',
						note: 'Kein Scheduler zu konfigurieren. Keine Topologie zu pflegen.'
					}
				]
			}
		},
		payoff: {
			heading: 'Was die Architektur dir gibt',
			items: [
				{
					title: 'Spezifizieren statt deployen',
					body: 'Ein Service ist eine BOX (Architektur, Dateisystem, Umgebung, Entrypoint, Konfiguration), eine API und ein NET-Bereich. Schreib das auf, und du bist fertig — es gibt keinen Deployment-Schritt zu verantworten.'
				},
				{
					title: 'In sich geschlossen, konstruktionsbedingt',
					body: 'Die BOX beschreibt die gesamte Dateistruktur, die der Service braucht, statt auf externe Images oder Repositories zu zeigen. Kein Drittregister kann dir unter den Füßen verschwinden.'
				},
				{
					title: 'Eine Black Box, mit Absicht',
					body: 'Services arbeiten unabhängig von den Nodes, die sie ausführen. Du schreibst nie gegen die Umgebung eines Nodes, weil sie dir nie mitgeteilt wird.'
				},
				{
					title: 'Reproduzierbar, nicht „nach bestem Bemühen“',
					body: 'Bei gleichen Eingaben liefert ein Service immer die gleichen Ausgaben, egal wo und wann er läuft. Determinismus ist hier eine Eigenschaft der Architektur, kein Versprechen eines Anbieters.'
				},
				{
					title: 'Komposition ohne Orchestrierung',
					body: 'Ein Service kann über seinen Node die Ausführung von Kind-Services anfordern. Der Eltern-Service weiß nicht, wo sie laufen; jedes nennt nur die Ressourcen, die es braucht.'
				},
				{
					title: 'Reputation, die sich ansammelt',
					body: 'Weil ein Service deterministisch und standardmäßig isoliert ist, sagt ein vor einiger Zeit aufgezeichneter Reputationsnachweis auch heute noch etwas Wahres über ihn aus.'
				}
			]
		},
		steps: {
			heading: 'Vom Code bis zum Laufen im Netzwerk',
			items: [
				{
					title: 'Den Service schreiben',
					body: 'Jede Sprache, jeder Stack. Worauf es ankommt, sind das benötigte Dateisystem und der Befehl, der ihn startet — nicht das Framework, zu dem du gegriffen hast.'
				},
				{
					title: 'BOX, API und NET spezifizieren',
					body: 'Deklariere die Umgebung, wie Aufrufer mit dem Service sprechen und welchen externen Netzzugriff er (falls überhaupt) anfordern können soll.'
				},
				{
					title: 'An einen Node schicken',
					body: 'Ein Node genügt. Er verteilt den Service an andere und kann ihn in einem Reputationssystem veröffentlichen, damit Nutzer und andere Services ihn finden.'
				},
				{
					title: 'Das Netzwerk ausführen lassen',
					body: 'Nodes verhandeln Kosten und entscheiden, wo jede Instanz läuft. Du bist nicht Teil der Schleife und hast keine Infrastruktur am Leben zu halten.'
				}
			]
		},
		distribution: {
			heading: 'Wie sich ein Service tatsächlich verbreitet',
			intro: 'Es gibt keinen Store zum Veröffentlichen und keine Prüfung, auf die man warten müsste. Ein Service wird einem Node übergeben, und das Netzwerk trägt ihn von dort weiter — standardmäßig off-chain, optional on-chain.',
			items: [
				{
					title: 'Standardmäßig Peer-to-Peer',
					body: 'Celaut hat <strong>kein zentrales Service-Register</strong>. Services verbreiten sich peer-to-peer über Nodes und lassen sich direkt finden — und niemand entscheidet als Türsteher, ob du reindarfst.'
				},
				{
					title: 'In einem Register, wenn es sich lohnt',
					body: 'Services können auch auf einer Blockchain mit Registerfunktion deklariert werden — etwa im <strong>Sigma Reputation System</strong> auf Ergo —, wenn Sichtbarkeit und eine prüfbare Spur mehr wert sind als vollständige Off-Chain-Zurückhaltung.'
				}
			]
		},
		tradeoffs: {
			heading: 'Der Handel, den du wirklich eingehst',
			intro: 'Heute heißt Software ausliefern: entweder selbst hosten oder die Leute bitten, sie selbst zu betreiben. Beides kostet etwas. Celauts Behauptung ist eng und konkret: Es nimmt die Vorteile von beidem ohne deren Nachteile — zum Preis deiner Kontrolle über den laufenden Service.',
			items: [
				{
					label: 'Ein gehosteter Webservice',
					good: 'Nutzer brauchen keine Infrastruktur und keine Konfiguration.',
					bad: 'Du kannst nicht beweisen, dass sich das System nicht geändert hat, und Nutzer müssen dir glauben, dass ihre Anfragedaten nicht missbraucht werden.'
				},
				{
					label: 'Quellcode, den sie selbst betreiben',
					good: 'Deterministisch — einmal heruntergeladen, kannst du es ihnen nicht unter den Füßen ändern — und ihre Anfragedaten erreichen dich nie.',
					bad: 'Sie brauchen leistungsfähige Hardware und müssen die Konfiguration überstehen, woran die meisten Leute scheitern.'
				},
				{
					label: 'Ein Celaut-Service',
					good: 'Keine Infrastruktur zu verwalten und nichts zu konfigurieren, weil die Spezifikation Container, Architektur, Netzbedarf und Schnittstelle bereits abdeckt.',
					bad: 'Du gibst Kontrolle ab: Du kannst einen Service, der einmal draußen ist, nicht mehr ändern, drosseln oder Daten daraus abziehen. Genau das ist der Punkt.',
					highlight: true
				}
			]
		},
		roles: {
			heading: 'Der Rest des Netzwerks',
			intro: 'Dein Service braucht einen Ort zum Laufen und jemanden, für den er läuft. Beides sind ebenfalls Menschen.',
			items: [
				{
					title: 'Node-Betreiber',
					body: 'Sie stellen die Hardware und führen gegen Bezahlung aus, was angefordert wird, ohne verstehen zu müssen, was dein Service tut.',
					link: 'PC vermieten →'
				},
				{
					title: 'Endnutzer',
					body: 'Sie starten Services auf Nodes und zahlen für die genutzten Rechenressourcen — und können prüfen, dass genau das lief, was die Spezifikation beschrieb.',
					link: 'Für Endnutzer →'
				},
				{
					title: 'Das Paradigma',
					body: 'Die vollständige Architektur: Nodes, Services, Spezifikation, Koordination über Reputations- und Zahlungssysteme, und warum das alles nötig ist.',
					link: 'Paper lesen →'
				}
			]
		},
		cta: {
			heading: 'Fang bei den Problemen an.',
			body: 'Unstoppable Skills ist ein Register, in dem die Probleme die Hauptrolle spielen: Suche nach einem Skill und finde die Services, die ihn abdecken, ihre Benchmarks und ihre Reputation. Es ist der kürzeste Weg von „was soll ich bauen“ zu „wer braucht es“.',
			actions: [
				'Skills erkunden',
				'Paradigma lesen'
			]
		}
	},
	users: {
		meta: {
			title: 'Für Endnutzer — Ausführen und für den Verbrauch zahlen | Celaut',
			description: 'Starte Services auf Celaut-Nodes und zahle nur für die genutzten Rechenressourcen. Keine Konten, keine Abos, keine Plattform dazwischen — Services laufen isoliert und deterministisch, du bekommst also genau das, was die Spezifikation beschreibt.'
		},
		topbarTitle: 'Für Endnutzer',
		index: {
			sections: {
				ask: 'Die Idee',
				proof: 'Was du zurückbekommst',
				sealed: 'Versiegelt',
				pay: 'Was du zahlst',
				payoff: 'Was du bekommst',
				steps: 'Von der Anfrage zum Ergebnis',
				tradeoffs: 'Der Handel',
				roles: 'Die anderen',
				cta: 'Loslegen'
			}
		},
		hero: {
			eyebrow: 'Service-Nutzer',
			title: 'Führ es aus.',
			tagline: 'Zahle für den Verbrauch. Sonst nichts.',
			lede: 'Starte einen Service auf einem Node, hol dir das Ergebnis, zahle für die verbrauchte Rechenleistung. Es gibt kein Konto anzulegen, kein Abo zu kündigen und keine Firma zwischen dir und der Maschine, die die Arbeit gemacht hat.',
			actions: [
				'Skills erkunden',
				'So funktioniert es'
			],
			stats: [
				{
					value: 'Kein Konto',
					label: 'nichts, wofür man sich anmeldet, nichts, wovon man ausgesperrt wird'
				},
				{
					value: 'Pro Ausführung',
					label: 'du zahlst für die tatsächlich genutzten Rechenressourcen'
				},
				{
					value: 'Isoliert',
					label: 'Services laufen versiegelt und sehen nichts, was ihnen nicht gegeben wurde'
				}
			]
		},
		scenes: {
			ask: {
				label: 'Die Idee',
				beats: [
					{
						h: 'Frag das Netzwerk, nicht eine Firma.',
						p: 'Du willst etwas erledigt haben — ein Modell laufen lassen, eine Sequenz analysieren, einen Bot handeln lassen, eine Datei verarbeiten. Heute heißt das: einen Anbieter aussuchen und dort ein Konto eröffnen.'
					},
					{
						h: 'Nodes antworten direkt.',
						p: 'Celaut hat <strong>kein zentrales Service-Register</strong>. Services sind peer-to-peer über Nodes verteilt, und Nodes nennen ihre unterstützten Schnittstellen und <strong>akzeptierten Zahlungsmittel beim Kontakt</strong> — nichts muss vorab mit irgendwem vereinbart werden.'
					},
					{
						h: 'Du hast es mit der Maschine zu tun, die arbeitet.',
						p: 'Dein Node verhandelt die Ausführungskosten mit einem Peer, und die Arbeit passiert. Es gibt <strong>keine Plattform dazwischen</strong>, die eine Provision nimmt, Regeln setzt oder dich aus einem Netzwerk entfernen könnte, dem du nie beigetreten bist.',
						note: 'Keine Anmeldung. Kein Abo. Kein Vermittler.'
					}
				]
			},
			proof: {
				label: 'Vorteil 01',
				beats: [
					{
						h: 'Woher weißt du, was tatsächlich lief?',
						p: 'Bei einem gehosteten Service gar nicht. Der Betreiber kann nicht beweisen, dass sich das System nicht geändert hat — wenn ein Werkzeug also beliebt wird, hindert nichts daran, seine Leistung still absinken zu lassen, um Kosten zu sparen.'
					},
					{
						h: 'Hier <em>ist</em> der Service seine Spezifikation.',
						p: 'Ein Service spezifiziert seine gesamte Umgebung — Architektur, Dateisystem, Entrypoint, Konfiguration. Ändere irgendetwas davon, und es ist <strong>ein anderer Service</strong>, kein stilles Update dessen, den du benutzt hast.'
					},
					{
						h: 'Das Ergebnis ist also reproduzierbar.',
						p: 'Bei gleichen Eingaben liefert ein Service <strong>immer die gleichen Ausgaben</strong>, egal welcher Node ihn ausführt und wann. Genau deshalb ist ein Reputationseintrag von vor Monaten heute noch etwas wert.',
						note: 'Determinismus ist die Garantie. Kein Versprechen — der Entwurf.'
					}
				]
			},
			sealed: {
				label: 'Vorteil 02',
				beats: [
					{
						h: 'Deine Anfrage geht niemanden sonst etwas an.',
						p: 'Wenn du eine Last irgendwohin schickst, ist die ehrliche Frage, wer sie unterwegs sonst noch zu sehen bekommt.'
					},
					{
						h: 'Jede Ausführung ist isoliert.',
						p: 'Der Node führt den Service als <strong>isolierte Instanz</strong> aus — in einer eigenen virtuellen Maschine. Standardmäßig ist ein Service vollständig von externen Netzen abgeschnitten und kann nur mit seinem Eltern-Service, seinen Kindern und dem ausführenden Node sprechen.'
					},
					{
						h: 'Und der Entwickler sitzt nicht am anderen Ende.',
						p: '<strong>Service-Entwickler können einen Service nicht steuern, ändern oder Daten daraus abziehen</strong>, weil sie die Nodes nicht kontrollieren, die ihn verteilen und ausführen. Jeder weitergehende Netzzugriff muss offen in der Spezifikation deklariert sein, bevor du ihn je ausführst.',
						note: 'Standardmäßig isoliert. Zugriff wird erbeten, nie vorausgesetzt.'
					}
				]
			},
			pay: {
				label: 'Vorteil 03',
				beats: [
					{
						h: 'Du zahlst, bevor es läuft. Punkt.',
						p: 'Nutzer starten Services auf Nodes und <strong>zahlen im Voraus für ein Ressourcenversprechen</strong>. Das ist die gesamte Geschäftsbeziehung.'
					},
					{
						h: 'Im Leerlauf läuft nichts auf.',
						p: 'Es gibt keinen Platz, keine Stufe und keinen Monatssockel. Bezahlt wird <strong>vorab</strong> im Gegenzug für zu verbrauchende Ressourcen; der Zahlungsnachweis öffnet den Zugang. Die Garantie des Nodes ist seine Reputation, keine Rechnung am Ende.'
					},
					{
						h: 'Bepreist von einem Markt, nicht von einer Preisseite.',
						p: 'Nodes setzen ihre eigenen Kosten und konkurrieren darüber, und <strong>Services haben Grenzkosten von null</strong> — die Kosten der Ausführung trägt der Node —, weshalb viele kostenlos starten, um Reputation aufzubauen. Zahlungssysteme sitzen außerhalb der Kernarchitektur, welches Ledger abrechnet, ist also ebenfalls nicht festgelegt.',
						note: 'Pro Ausführung zahlen. Jederzeit gehen. Nichts zu kündigen.'
					}
				]
			}
		},
		payoff: {
			heading: 'Was du tatsächlich bekommst',
			items: [
				{
					title: 'Keine Infrastruktur zu verwalten',
					body: 'Die Nodes erledigen das. Es gibt keinen Cloud-Anbieter auszuwählen, keine Maschine am Leben zu halten und nichts, was zwischen zwei Nutzungen weiterlaufen müsste.'
				},
				{
					title: 'Keine Konfiguration',
					body: 'Die Service-Spezifikation deckt bereits ab, wie der Container gebaut wird, welche Architektur er braucht, was er vom Netz braucht und wie seine Schnittstelle aussieht. Nichts davon musst du herausfinden.'
				},
				{
					title: 'Der Entwickler hat keinen Zugriff',
					body: 'Service-Entwickler können einen Service nicht steuern, ändern oder Daten daraus abziehen — sie kontrollieren die Nodes nicht, die ihn verteilen und ausführen.'
				},
				{
					title: 'Es kann sich nicht unter dir ändern',
					body: 'Ein Service ist deterministisch: Gleiche Eingaben liefern gleiche Ausgaben, wann und wo auch immer er läuft. Niemand kann ihn still drosseln, um Kosten zu sparen.'
				},
				{
					title: 'Nach Reputation beurteilt, nicht nach Ranking',
					body: 'Reputation lebt als Einträge in einem Ledger, und jeder Teilnehmer gewichtet die Quellen, denen er traut. Es gibt keine redaktionelle Startseite, die entscheidet, was du siehst.'
				},
				{
					title: 'Nichts, wovon man entfernt werden kann',
					body: 'Das Auffinden läuft peer-to-peer ohne zentrales Register, es gibt also kein Konto zu sperren und keinen Eintrag zurückzuziehen.'
				}
			]
		},
		steps: {
			heading: 'Von „ich brauche das“ zum Ergebnis',
			items: [
				{
					title: 'Den Service finden',
					body: 'Suche nach dem Problem, das du gelöst haben willst. Nodes finden Services peer-to-peer, und Register wie Unstoppable Skills ordnen Probleme den Services zu, die sie abdecken.'
				},
				{
					title: 'Eine Ausführung anfordern',
					body: 'Dein Node spricht direkt mit einem Peer, der sie ausführen kann. Schnittstellen und akzeptierte Zahlungsmittel werden beim Kontakt genannt, es muss also nichts vorab vereinbart werden.'
				},
				{
					title: 'Es läuft, versiegelt',
					body: 'Der Node führt den Service als isolierte Instanz aus — in einer eigenen virtuellen Maschine — ohne Zugriff über das hinaus, was die Spezifikation verlangt hat.'
				},
				{
					title: 'Im Voraus zahlen',
					body: 'Ein Node wird vorab für ein Ressourcenversprechen bezahlt, und der Zahlungsnachweis öffnet den Zugang. Die Reputation ist die Garantie. Kein Abo, keine Mindestsumme, keine laufende Rechnung.'
				}
			]
		},
		tradeoffs: {
			heading: 'Gegen die zwei Optionen, die du heute hast',
			intro: 'Nimm einen Trading-Bot als Beispiel. Aktuell übergibst du entweder dein Portfolio einem Webservice oder du suchst den Quellcode und betreibst ihn selbst. Jede Wahl bringt dir eines und kostet dich etwas anderes.',
			items: [
				{
					label: 'Einen Webservice nutzen',
					good: 'Du betreibst keine Infrastruktur und konfigurierst nichts.',
					bad: 'Du kannst ihm keine Reputation zuschreiben, weil der Betreiber nicht beweisen kann, dass sich das System nicht geändert hat — und dir nicht zusichern kann, dass deine Anfragedaten nicht missbraucht werden.'
				},
				{
					label: 'Den Quellcode selbst betreiben',
					good: 'Es ist deterministisch, und der Entwickler hat keine Kontrolle über deine Anfragedaten.',
					bad: 'Du brauchst Hardware, die das stemmt, und musst dich mit der Konfiguration herumschlagen — woran die meisten aufgeben und zu Option eins zurückkehren.'
				},
				{
					label: 'Einen Celaut-Service nutzen',
					good: 'Keine Infrastruktur, keine Konfiguration, und der Entwickler kann den Service trotzdem nicht steuern, ändern oder Daten daraus abziehen.',
					bad: 'Du zahlst pro Ausführung und bist darauf angewiesen, dass es im Netzwerk einen Node gibt, der ihn zu einem Preis ausführt, den du akzeptierst.',
					highlight: true
				}
			]
		},
		roles: {
			heading: 'Die anderen Leute im Netzwerk',
			intro: 'Jemand hat den Service geschrieben, und jemandes Maschine führt ihn aus. Beide Rollen stehen auch dir offen.',
			items: [
				{
					title: 'Node-Betreiber',
					body: 'Sie stellen die Hardware, die ausführt, was du anforderst, gegen Bezahlung — ohne wissen zu müssen, was der Service tut.',
					link: 'Hardware übrig? →'
				},
				{
					title: 'Service-Entwickler',
					body: 'Sie schreiben Services, die jeder kompatible Node ausführen kann, und übergeben sie dem Netzwerk, statt sie zu hosten.',
					link: 'Für Entwickler →'
				},
				{
					title: 'Das Paradigma',
					body: 'Nodes, Services, Spezifikation und die Reputations- und Zahlungssysteme, mit denen Parteien kooperieren können, die einander nicht vertrauen.',
					link: 'Paper lesen →'
				}
			]
		},
		cta: {
			heading: 'Fang bei deinem Problem an.',
			body: 'Unstoppable Skills ist ein vollständig on-chain laufendes, serverloses Register, in dem die Probleme selbst die Hauptrolle spielen. Suche nach einem Skill und finde die Services, die ihn abdecken, echte Vergleichs-Benchmarks, Diskussion und reputationsbasiertes Ranking.',
			actions: [
				'Skills erkunden',
				'Lieber PC vermieten'
			]
		}
	},
	install: {
		meta: {
			title: 'Nodo installieren — Celaut',
			description: 'Installiere einen Celaut-Node (nodo) unter Linux, Windows oder macOS.'
		},
		topbarTitle: 'nodo installieren',
		heading: 'Betreibe einen Celaut-Node',
		subtitle: 'Installiere <strong>nodo</strong> und tritt dem dezentralen Netzwerk bei — finde Peers, führe Services aus und orchestriere sie, und mach aus deiner Maschine geteilte, zensurresistente Rechenleistung.',
		tabs: {
			linux: 'Linux',
			windows: 'Windows',
			mac: 'macOS'
		},
		copy: 'Kopieren',
		copied: 'Kopiert ✓',
		linux: {
			heading: 'Linux',
			intro: 'Grundinstallation — führe das in deinem Terminal aus:',
			notes: [
				'Das Skript braucht <code>sudo</code> für die Einrichtung auf Systemebene. Die Laufzeitumgebungen für Python, Java und <code>yq</code> werden lokal im Hauptverzeichnis des Nodes installiert.',
				'Lieber manuell und ohne sudo installieren? Folge der {link}.'
			],
			manualLink: 'Anleitung für die manuelle Installation'
		},
		windows: {
			heading: 'Windows 11',
			intro: 'Lade den offiziellen Installer herunter und führe ihn aus:',
			download: 'Nodo-Setup.exe herunterladen',
			notes: [
				'Der Installer legt automatisch eine eigene, isolierte Linux-Distribution für Nodo an, sodass der Node getrennt vom Rest deines Systems läuft.',
				'Eine manuelle Einrichtung einer Linux-Umgebung ist nicht nötig.'
			]
		},
		mac: {
			heading: 'macOS',
			intro: 'Ein nativer macOS-Installer ist <strong>noch nicht verfügbar</strong>.',
			notes: [
				'Unterstützung für macOS ist geplant. In der Zwischenzeit kannst du einen Node auf einer Linux-Maschine oder in einer Linux-VM betreiben.',
				'Folge {link} für Updates.'
			],
			repoLink: 'dem nodo-Repository'
		}
	},
	paradigm: {
		meta: {
			title: 'Celaut — Formales Paper',
			description: 'Celaut: eine Peer-to-Peer-Architektur für Softwareentwurf und -verteilung — das formale Paper.'
		},
		topbarTitle: 'Formales Paper',
		toc: 'Index',
		tocNav: 'Inhaltsverzeichnis',
		systemBehaviorHeading: 'Systemverhalten',
		executionHeading: 'Ausführung eines Service',
		balancerHeading: 'Lastverteilung von Services'
	},
	viz: {
		home: {
			generation: 'Generation {n}',
			lifeRule: '2 oder 3 Nachbarn: lebt · genau 3: geboren',
			oneProtocol: 'ein Protokoll, das alle fahren müssen',
			networkSplits: 'ändere die Regeln, und das Netzwerk spaltet sich',
			whereOverlap: 'sie reden dort, wo sie sich überschneiden',
			noVote: 'keine Abstimmung · keine Migration · kein Fork',
			blackBox: 'Black Box',
			input: 'Eingabe',
			output: 'Ausgabe',
			box: 'BOX',
			environment: 'Umgebung',
			api: 'API',
			interface: 'Schnittstelle',
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
						'architecture — die CPU und Umgebung, die er braucht',
						'filesystem — jede Datei enthalten, kein Image-Name',
						'init — der Entrypoint und wie er startet',
						'config_declaration — welche Dateien Konfiguration sind',
						'resources — at_init und at_most',
						'environment_variables — deklariert, samt Formaten'
					]
				},
				api: {
					title: 'API · Schnittstelle',
					rows: [
						'slot — ein Port samt Transport, den er spricht',
						'protocol_stack — die Protokolle auf diesem Slot',
						'mu_per_call — der Preis jeder Methode',
						'payment_contracts — die Ledger, die er akzeptiert',
						'fixe Kosten zum Start, danach Kosten nach Nutzung'
					]
				},
				net: {
					title: 'NET · Network',
					rows: [
						'ein Eintrag pro erreichbarer Kommunikationsdomäne',
						'tags / prose / formal — wie die Domäne benannt wird',
						'protocol_stack — was diese Peers sprechen müssen',
						'environment_variable — welche Peers als seine gelten',
						'hier nichts zu deklarieren heißt: gar kein Weg nach draußen'
					]
				}
			},
			net: 'NET',
			netDeclared: 'NET · in der Spezifikation deklariert',
			nowhereElse: 'und sonst nirgendwo',
			itsNodeItsParent: 'sein Node · sein Eltern-Service',
			aService: 'ein Service',
			children: 'Kinder',
			whatTheySpend: 'was sie ausgeben, nicht wo sie sind',
			developersShort: 'Entwickler · was es braucht',
			developersLong: 'Entwickler · was es braucht, was es ausgibt',
			operatorsShort: 'Betreiber · wo es läuft',
			operatorsLong: 'Betreiber · wo es läuft, was es kostet',
			thisNode: 'dieser Node',
			aPeer: 'ein Peer',
			cost: 'Kosten {value}',
			oneInput: 'eine Eingabe',
			when: [
				'jetzt',
				'in einem Jahr',
				'auf anderer Hardware'
			],
			identicalEveryTime: 'identisch, jedes Mal',
			reputationLedger: 'Reputation · Einträge in einem Ledger',
			sourcesYouTrust: 'die Quellen, denen du traust',
			principles: {
				consequences: [
					'→ kein Protokoll zum Einigen',
					'→ ein Container, eine Schnittstelle, ein Scope',
					'→ Reputation, die ihre Bedeutung behält'
				],
				derivedFrom: 'alles andere folgt daraus'
			},
			firstWhatSources: 'zuerst: was sagen meine Quellen dazu?',
			rightShort: '2 vCPU · 30 Min',
			rightLong: 'Recht auf 2 vCPU · 30 Min',
			paymentRights: 'Zahlung ⇄ Ressourcenrechte',
			outcomeRecorded: 'das Ergebnis kommt in seinen Eintrag',
			nextStranger: 'und genau das liest der nächste Fremde',
			requester: 'Anfragender',
			node: 'Node'
		},
		developers: {
			box: 'BOX',
			api: 'API',
			net: 'NET',
			service: 'Service',
			anyCompatibleNode: 'jeder kompatible Node',
			optionalRegistry: 'optionales Reputationsregister',
			yourService: 'dein Service',
			itsNode: 'sein Node',
			neverFindOut: 'du erfährst nie, wo'
		},
		users: {
			you: 'du',
			noAccount: 'kein Konto',
			eachPeerItsUnit: 'jeder Peer nennt seinen Preis in dem, was er annimmt',
			whatYouAsked: 'was du angefordert hast',
			whatNodeRuns: 'was der Node ausführt',
			identicalItRuns: 'identisch — es läuft',
			microvm: 'microVM',
			destroyed: 'zerstört',
			theDeveloper: 'der Entwickler',
			theHostMachine: 'die Host-Maschine',
			computeUsed: 'tatsächlich genutzte Rechenleistung',
			whatYouPay: 'was du zahlst',
			chargingStops: 'Auftrag endet — Abrechnung stoppt',
			subscription: 'ein Abo, das unabhängig davon abrechnet'
		},
		depin: {
			electricityCost: 'deine Stromkosten',
			priceYouSet: 'der Preis, den du setzt',
			availableWindow: 'verfügbar 22:00 – 07:00',
			marginCovered: 'Marge gedeckt'
		}
	}
};

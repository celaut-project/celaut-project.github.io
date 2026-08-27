/*
 * Tafsiri ya Kiswahili. Muundo ni sawa na en.js / es.js / zh.js /
 * hi.js / ru.js / fr.js / pt.js — ufunguo wowote usiopo hapa
 * unarudi kiotomatiki kwenye Kiingereza, hivyo ukurasa hauachwi
 * tupu kamwe.
 *
 * Kanuni za tafsiri
 * -----------
 * • Msamiati maalum wa muundo wa Celaut (BOX, API, NET, node/nodo,
 *   microVM, DePIN, Ergo n.k.) unabaki bila kutafsiriwa — hii ni
 *   istilahi ya mradi wenyewe, si maneno ya kutafsiriwa.
 * • HTML iliyopachikwa katika maandishi asili (<strong>, <em>)
 *   imebaki kama ilivyo.
 */

export default {
	common: {
		scroll: 'Sogeza chini',
		toTop: '↑ Juu',
		backToTop: 'Rudi juu',
		gains: 'Faida',
		costs: 'Gharama',
		visit: 'Tembelea →',
		readMore: 'Soma zaidi →',
		viewOnGitHub: 'Ona kwenye GitHub →',
		languageLabel: 'Lugha',
		switchLanguage: 'Badilisha lugha'
	},

	theme: {
		toLight: 'Badilisha kwenda mandhari nyepesi',
		toDark: 'Badilisha kwenda mandhari nyeusi',
		toggle: 'Badilisha mandhari'
	},

	topbar: {
		nav: 'Sehemu za Celaut',
		links: {
			depin: { label: 'Kodisha PC yako', short: 'Kodisha' },
			developers: { label: 'Wasanidi programu', short: 'Wasanidi' },
			users: { label: 'Watumiaji', short: 'Watumiaji' },
			paradigm: { label: 'Mfumo msingi', short: 'Mfumo' }
		}
	},

	/* ============================================================== *
	 * Ukurasa wa nyumbani
	 * ============================================================== */
	home: {
		hero: {
			tagline: 'Muundo wa mtandao usio na kituo kikuu (peer-to-peer) kwa ubunifu na usambazaji wa programu',
			primary: 'Anza kuitumia',
			secondary: 'Jifunze zaidi',
			facts: [
				'Iliyoongozwa na otomatiki za seli — tabia thabiti ya kimataifa inatokana na kanuni rahisi za kienyeji.',
				'Ina uhakika kwa muundo wake: pembejeo zinazofanana daima huzalisha matokeo yanayofanana na yanayothibitishika.',
				'Hakuna orodha kuu ya usajili. Huduma zinasambazwa moja kwa moja kati ya nodi huru.',
				'Kila huduma inatambulishwa kwa maudhui yake — hashi yake ndiyo jina lake, hivyo hakuna kitu kinachoweza kubadilishwa kimya kimya.',
				'Nodi huendesha kila huduma ikiwa imefungwa ndani ya mazingira yake madogo yaliyotengwa.',
				'Sifa njema inaishi kwenye msururu wa data (blockchain): imani inapatikana na kuthibitika, kamwe haitolewi na mlinzi wa lango.',
				'Kanuni tatu, kwenye kila ngazi: ugatuaji, urahisi, na uhakika.'
			]
		},

		index: {
			nav: 'Uongozaji wa sehemu',
			title: 'Kwenye ukurasa huu',
			open: 'Fungua menyu ya sehemu',
			close: 'Funga menyu ya sehemu',
			sections: {
				foundations: 'Asili',
				nodes: 'Nodi',
				services: 'Huduma',
				'service-spec': 'Vipimo vya huduma',
				execution: 'Utekelezaji',
				determinism: 'Uhakika',
				coordination: 'Uratibu',
				'user-roles': 'Wewe ni yupi?',
				'core-principles': 'Kanuni msingi',
				'what-is-not': 'Ambacho si',
				implementations: 'Utekelezaji halisi',
				'coordination-detail': 'Vichocheo',
				'service-distribution': 'Usambazaji wa huduma',
				applications: 'Matumizi'
			}
		},

		scenes: {
			foundations: {
				label: 'Chanzo chake',
				beats: [
					{
						h: 'Kila kitu kinaanzia kwa sheria chache tu.',
						p: 'Katika miaka ya 1940, mwanahisabati <strong>John von Neumann</strong> pamoja na <strong>Stanislaw Ulam</strong> walianzisha dhana ya otomatiki za seli: mifano iliyoonyesha jinsi tabia changamano zinavyoweza kutokana na sheria rahisi.'
					},
					{
						h: 'Hapa hakuna anayeongoza chochote.',
						p: 'Mnamo 1970, <strong>“Mchezo wa Uhai” wa John Horton Conway</strong> ulikuwa mfano wa kawaida: gridi ambapo kila seli inaangalia tu majirani zake, na bado mfumo mzima unazalisha muundo tata unaobadilika.'
					},
					{
						h: 'Hii ndiyo falsafa nzima ya ubunifu.',
						p: 'Mawazo haya yanaonyesha jinsi mifumo isiyo na kituo kikuu inavyoweza <strong>kufikia utata bila udhibiti wa kati</strong> — hii ndiyo falsafa inayoongoza Celaut. Sheria rahisi kwenye ngazi ya nodi na huduma, na juu yake mfumo unaobadilika kulingana na hali.',
						note: 'Ugatuaji · Urahisi · Uhakika'
					}
				]
			},
			nodes: {
				label: 'Mtandao huu',
				beats: [
					{
						h: 'Kuwa na nodi si tofauti yenyewe.',
						p: 'Mitandao mingi isiyo na kituo kikuu ina nodi, na mingi bado inategemea kitu kimoja chenye nguvu: <strong>itifaki ambayo kila mtu lazima aiendeshe</strong>. Sheria zinabaki katikati, hata kama mashine zenyewe hazipo katikati.'
					},
					{
						h: 'Celaut haina itifaki ya kukubaliana kabla.',
						p: 'Nodi hazihitaji kukubaliana mapema kuhusu itifaki ya mawasiliano — zinapowasiliana <strong>zinatangaza violesura vinavyoviunga mkono na njia za malipo zinazokubali</strong>. Nodi mbili zinazungumza tu kuhusu kile wanachofanana; pale ambapo hakuna ufananifu, hazizungumzi tu.'
					},
					{
						h: 'Kwa hivyo unabadilisha nodi yako, si mtandao mzima.',
						p: 'Sera mpya ya bei, njia nyingine ya malipo, muundo wa vipimo ambao bado hakuna anayeuchambua — unao<strong>tekeleza kwenye nodi yako mwenyewe</strong> na unafanya kazi na yeyote anayeuunga mkono tayari. Hakuna anayepiga kura, hakuna kinachohitaji kuhamishwa, na <strong>hakuna hard fork ya kuvumilia</strong>.',
						note: 'Hakuna itifaki ya pamoja. Hakuna toleo la pamoja. Hakuna ruhusa inayohitajika.'
					}
				]
			},
			services: {
				label: 'Kinachoendeshwa juu yake',
				beats: [
					{
						h: 'Huduma ni chombo kilichofungwa.',
						p: 'Huduma katika Celaut ni <strong>vyombo vya programu vyenye uhakika</strong> vilivyoundwa kutekeleza kazi maalum. Hakuna chochote ngumu zaidi ya hilo.'
					},
					{
						h: 'Ikifuata kanuni ya sanduku jeusi.',
						p: 'Zinafanya kazi <strong>bila kutegemea nodi zinazoziendesha</strong>, zikizingatia tu kazi yake. Nodi haihitaji kuelewa huduma, na huduma haihitaji kujua chochote kuhusu nodi.'
					},
					{
						h: 'Zilizotengwa, kila wakati.',
						p: 'Kila ombi linaendeshwa kama <strong>mchakato uliotengwa</strong> — ndani ya chombo au mashine pepe, kutegemea nodi — jambo linaloficha mazingira ya utekelezaji na kudumisha kizuizi cha usalama bila kuguswa.',
						note: 'Kinachoingia, kinachotoka. Huo ndio muundo mzima wa kiunganishi.'
					}
				]
			},
			'service-spec': {
				label: 'Jinsi huduma inavyobainishwa',
				beats: [
					{
						h: '<strong>BOX</strong> — mazingira.',
						p: 'Muundo wa maunzi, mfumo wa faili, vigezo vya mazingira, sehemu ya kuanzia, mipangilio, na rasilimali. Inabainisha moja kwa moja muundo mzima wa faili badala ya kutegemea picha au ghala za nje, na hii ndiyo inayofanya utekelezaji kuwa wa kurudiwa kwenye nodi yoyote.'
					},
					{
						h: '<strong>API</strong> — kiunganishi.',
						p: 'Jinsi ya kuwasiliana na huduma, mifumo ya malipo inayokubali, na gharama zinazohusiana. Hii inaruhusu huduma kutumika bila mdhibiti yeyote wa kati kujadili itifaki kwa niaba yao.'
					},
					{
						h: '<strong>NET</strong> — wigo wa mtandao.',
						p: 'Kwa default, huduma <strong>imetengwa</strong>: inaweza kuzungumza tu na mzazi wake, watoto wake, na nodi inayoiendesha. Ikihitaji dunia ya nje, <strong>mitandao itakayofikia inatajwa ndani ya vipimo vyake vyenyewe</strong> — nodi inavipa kwa sababu inataka kuendesha huduma ipasavyo, na wewe unapata uhakikisho kwamba haiwezi kamwe kufikia mahali pengine.'
					},
					{
						h: 'Vipengele vitatu. Huduma moja inayoweza kubebeka.',
						p: 'Kwa pamoja vinaunda <strong>huduma zinazoweza kubebeka na kurudiwa</strong> ambazo zinasambazwa kwa uthabiti katika mtandao mzima huku zikidumisha usalama na uhakika.',
						note: 'Hakuna utegemezi wa wahusika wengine. Hakuna kilichoachwa bila kuelezwa.'
					}
				]
			},
			execution: {
				label: 'Nani anaamua nini',
				beats: [
					{
						h: 'Huduma inaomba watoto wake.',
						p: 'Huduma inaweza, kupitia nodi yake, kuomba utekelezaji wa <strong>huduma za watoto</strong>. Inabainisha <strong>rasilimali anazohitaji kila mmoja</strong> na kuwapatia bajeti ya kutumia. Si mashine, si eneo — rasilimali tu.'
					},
					{
						h: 'Nodi inaamua watakapoendeshwa.',
						p: 'Inalinganisha <strong>gharama ya kuendesha kielelezo kwa ndani na gharama inayotolewa na kila mwenzake</strong> na kuchagua ile inayoiona bora zaidi. Mtoto mmoja anabaki hapa; mwingine anaishia kwa mwenzake.'
					},
					{
						h: 'Mzazi haiji kujua kamwe.',
						p: 'Haijui kama mtoto ameishia kwenye mashine hii au mahali pengine, na haihitaji kujua. Kinachofuatiliwa tu ni <strong>kinachotumiwa na watoto wake na kwa kasi gani wanakitumia</strong>, ili iweze kulinganisha hilo.'
					},
					{
						h: 'Mgawanyo huo ndio siri nzima.',
						p: 'Waendeshaji wa nodi wanashughulikia upande wa kimwili: maunzi, uwezo, bei, mahali. Wasanidi wa huduma <strong>wanabainisha rasilimali wanazohitaji na hakuna kuhusu miundombinu</strong>. Hakuna anayehitaji kufanya kazi ya mwenzake — na hicho ndicho kinachoweka pande zote mbili rahisi.',
						note: 'Mambo mawili tofauti. Mstari safi kati yao.'
					}
				]
			},
			determinism: {
				label: 'Kwa nini inashikilia',
				beats: [
					{
						h: 'Pembejeo ile ile. Matokeo yale yale. Daima.',
						p: 'Huduma zinabainishwa kikamilifu ili kuhakikisha <strong>matokeo yanayorudiwa</strong> katika muda na kati ya nodi. Zikipewa pembejeo zile zile, daima zinazalisha matokeo yale yale, bila kujali zinaendeshwa wapi au lini.'
					},
					{
						h: 'Jambo linalofanya imani kupimika.',
						p: 'Kwa kuwa programu haiwezi kubadilika, <strong>uthibitisho wa sifa njema uliorekodiwa muda mrefu uliopita bado unasema kitu cha kweli leo</strong> — ilimradi huduma haiwasiliani na mtandao wowote, ambayo ndiyo hali yake ya kawaida.'
					},
					{
						h: 'Na inasafiri popote.',
						p: 'Kwa kuwa hakuna sehemu ya mazingira iliyoachwa kwa mwenyeji, vipimo vile vile vinazalisha tabia ile ile kwenye <strong>kompyuta ndogo, seva ya akiba, au nodi ambayo hujawahi kusikia habari zake</strong>. Mahali inapoendeshwa hakuwi tena sehemu ya jibu.',
						note: 'Imebainishwa kikamilifu, hivyo hakuna kilichoachwa kwa mashine kuamua.'
					}
				]
			},
			coordination: {
				label: 'Jinsi wageni wanavyoshirikiana',
				beats: [
					{
						h: 'Sifa njema inakuja kwanza.',
						p: 'Nodi na huduma <strong>haziaminiani</strong> — Celaut ni mfumo usio na imani ya awali. Hivyo hakuna kinachoanza kwa mkono wa salamu; kinaanza kwa uchunguzi. Sifa njema ni <strong>rekodi kwenye vitabu vya hesabu (ledgers)</strong>, ni maoni badala ya hukumu, na kila mhusika anapima vyanzo anavyoviamini tayari ili kuamua kama mgeni anastahili kuzungumza naye.'
					},
					{
						h: 'Kisha thamani inanunua haki juu ya rasilimali.',
						p: 'Ni pale tu rekodi inapothibitika ndipo kitu kinaposogea. Anayeomba analipa, na kile anachopata badala yake si ahadi — ni <strong>haki ya kutumia rasilimali za nodi</strong>: kiasi fulani cha uchakataji, kwa muda fulani. Mifumo ya malipo inabaki <strong>nje ya muundo msingi</strong>, hivyo hakuna kitabu maalum cha hesabu kilichowekwa ndani yake.'
					},
					{
						h: 'Na nodi inatimiza, kwa sababu rekodi ndiyo dhamana.',
						p: 'Hakuna kinachoilazimisha kutimiza haki hiyo. Kinachoishikilia ni kwamba <strong>matokeo yanaandikwa tena kwenye kitabu cha hesabu</strong> — na nodi ambayo rekodi yake inasema ilipokea malipo na kutolipa kikamilifu inakoma kuchaguliwa. Kila upande una maslahi ya kudumu kwamba mgeni ajaye atapenda anachosoma.',
						note: 'Kagua · lipa · tekeleza · rekodi. Kisha tena.'
					}
				]
			}
		},

		roles: {
			eyebrow: 'Chagua njia yako',
			heading: 'Wewe ni yupi?',
			intro: 'Kama watumiaji, tunaweza kuwa na aina tatu za majukumu katika mfumo huu ikolojia. Kila moja ina njia yake ya kuingia.',
			items: [
				{
					eyebrow: 'Jukumu 01',
					title: 'Waendeshaji wa nodi',
					lede: 'Kwa namna inayofanana na wachimbaji (miners) katika mifumo ya blockchain, waendeshaji wa nodi wanatoa rasilimali za uchakataji kwa mtandao. Wanaendesha huduma zinazoombwa na watumiaji kwa kubadilishana na malipo, bila kuhitaji kuelewa kazi maalum ya huduma hizo.',
					points: [
						'Wanatoa rasilimali za maunzi',
						'Wanaendesha huduma kwa ombi',
						'Wanapokea malipo kwa rasilimali'
					],
					primary: 'Kodisha PC yako',
					secondary: 'Endesha nodi'
				},
				{
					eyebrow: 'Jukumu 02',
					title: 'Wasanidi wa huduma',
					lede: 'Wasanidi wanaunda huduma zinazoweza kuendeshwa kwenye nodi yoyote inayolingana kwenye mtandao. Wanazingatia kujenga uwezo bila kujali maelezo ya miundombinu ya msingi.',
					points: [
						'Wanabuni vipimo vya huduma',
						'Wanajenga programu zenye uhakika',
						'Wanasambaza huduma kwa nodi'
					],
					primary: 'Unda kwenye Celaut',
					secondary: 'Chunguza Skills'
				},
				{
					eyebrow: 'Jukumu 03',
					title: 'Watumiaji wa huduma',
					lede: 'Watumiaji wa mwisho wanaendesha huduma kwenye nodi, wakilipia rasilimali za uchakataji zilizotumika.',
					points: [
						'Wanaomba utekelezaji wa huduma',
						'Wanalipia rasilimali za uchakataji',
						'Wanatumia matokeo ya huduma'
					],
					primary: 'Tumia mtandao',
					secondary: 'Chunguza Skills'
				}
			]
		},

		principles: {
			eyebrow: 'Sheria inazoshikilia',
			heading: 'Kanuni msingi za Celaut',
			intro: 'Ahadi tatu ambazo muundo mzima unatokana nazo. Kila kitu kilichotajwa hapo juu — nodi bila itifaki, huduma zilizofungwa, mitandao iliyotangazwa — ni matokeo ya hizi.',
			items: [
				{
					title: 'Ugatuaji',
					body: 'Celaut inaondoa <strong>vituo vya pekee vya udhibiti au kushindwa</strong> kwa kuruhusu nodi kuwasiliana na kuratibiana kwa njia inayobadilika, bila chochote katikati cha kuomba ruhusa.'
				},
				{
					title: 'Urahisi',
					body: 'Muundo unafuata <strong>sheria za msingi tu</strong> zinazopunguza utata, ili kila kipengele kibaki kidogo cha kutosha kueleweka na kutunzwa peke yake.'
				},
				{
					title: 'Uhakika',
					body: 'Huduma zinabainishwa kikamilifu ili kuhakikisha <strong>matokeo yanayorudiwa</strong> katika muda na kati ya nodi. Zikipewa pembejeo zile zile, zinazalisha matokeo yale yale, bila kujali zinaendeshwa wapi au lini.'
				}
			]
		},

		whatIsNot: {
			eyebrow: 'Makosa ya kawaida ya kuelewa',
			heading: 'Celaut si nini',
			intro: 'Muundo huu unafanana sana na vitu kadhaa vinavyojulikana hivyo kuchanganyikiwa navyo. Inafaa kuwa sahihi kuhusu tofauti hizo.',
			items: [
				{
					title: 'Si mtandao mmoja tu',
					body: 'Celaut inaeleza <strong>muundo unaobadilika</strong>, si mtandao mmoja uliowekwa mapema. Mitandao mikubwa inaweza kabisa kuibuka, lakini mfumo unaunga mkono mifumo mingi ya kutopitia kituo kikuu badala ya kuamuru mmoja tu.'
				},
				{
					title: 'Si mkusanyiko kamili wa itifaki',
					body: 'Inatoa <strong>kanuni msingi</strong> za kujenga mikusanyiko ya usambazaji wa uchakataji, si mkusanyiko kamili uliowekwa. Utekelezaji wa sasa unategemea vipengele kama gRPC au Docker, na hivyo ni chaguzi zinazoweza kubadilishwa.'
				},
				{
					title: 'Si mradi wa blockchain',
					body: 'Celaut <strong>haina sarafu yake ya kidijitali</strong> wala DAO. Inajumuisha teknolojia za blockchain pale zinapofaa — kurekodi sifa njema, kulipia kati ya wageni — bila kuchukua mfumo mpana zaidi unaozizunguka.'
				}
			]
		},

		nodes: {
			eyebrow: 'Mashine hizi',
			heading: 'Nodi: msingi wa mtandao',
			intro: 'Nodi ni <strong>kompyuta au kifaa</strong> kinachowasiliana na wenzake na kusimamia utekelezaji wa huduma. Kazi nne, na hakuna mratibu juu yake.',
			jobs: [
				{
					title: 'Utekelezaji wa huduma',
					body: 'Inajadiliana na wenzake kuhusu gharama za utekelezaji na kuamua kama kuendesha huduma kwa ndani au kuikabidhi, ili rasilimali ziende ambako ni nafuu zaidi.'
				},
				{
					title: 'Mawasiliano',
					body: 'Inatangaza violesura inavyoviunga mkono na njia za malipo inazokubali inapowasiliana, jambo linaloruhusu itifaki kubadilika bila makubaliano ya awali.'
				},
				{
					title: 'Usalama',
					body: 'Inatoa na kusimamia anwani na tokeni za uthibitishaji ambazo kila mwingiliano wa huduma unatambulishwa nazo.'
				},
				{
					title: 'Utegemezi',
					body: 'Inahakikisha huduma inaweza kufikia kile inachohitaji, popote katika mtandao ambako utegemezi huo unaendeshwa.'
				}
			],
			implementationsHeading: 'Utekelezaji unaoweza kuuendesha leo',
			implementations: [
				{
					name: 'Nodo',
					body: 'Utekelezaji wa rejea, uliojengwa kwa Python3 na Rust — mfano halisi wa jinsi nodi inavyowekwa kimatendo.'
				},
				{
					name: 'Chatui',
					body: 'Nodi kwa vifaa vya Android. Inaonyesha huduma kupitia violesura vya mazungumzo vya msingi, bila kuhitaji imani kwa nodi nyingine yoyote.'
				}
			]
		},

		coordination: {
			eyebrow: 'Kinachowafanya wageni kushirikiana',
			heading: 'Mifumo ya uratibu',
			intro: 'Hakuna kati ya hivi viwili kilicho sehemu ya muundo msingi, na hilo ni kwa makusudi: vyote viwili vinabaki nje yake, ili hakuna kitabu maalum cha hesabu au sarafu vinavyowekwa ndani.',
			items: [
				{
					title: 'Mifumo ya sifa njema',
					body: 'Historia ya mwingiliano, iliyorekodiwa kwenye vitabu vya hesabu kama maoni badala ya hukumu. Hicho ndicho <strong>kinachoangaliwa kwanza</strong>, kabla mtu yeyote hajajitolea kwa lolote.',
					points: [
						'Kila mhusika anapima kwa hiari yake vyanzo anavyoviamini tayari.',
						'Hadhi njema inastahili kulindwa, hivyo inakuwa dhamana nyuma ya ahadi.',
						'Matokeo ni kujidhibiti wenyewe, bila mamlaka yoyote kutoa hukumu.'
					]
				},
				{
					title: 'Mifumo ya malipo',
					body: 'Thamani inayobadilishwa kwa rasilimali zilizotumika. Kile ambacho malipo yananunua ni <strong>haki halisi</strong> — kiasi fulani cha uchakataji, kwa muda fulani — si ahadi ya tabia njema.',
					points: [
						'Nodi zinalipwa kwa rasilimali ambazo huduma inatumia kikweli.',
						'Uthibitisho wa malipo ndio unaofungua ufikiaji wa huduma zinazouhitaji.',
						'Vitabu vya hesabu vinaweza kuwa vya wazi bila ruhusa, au vya faragha na vilivyofungwa.'
					]
				}
			],
			note: 'Kagua rekodi · lipa kwa haki · tekeleza · rekodi matokeo.'
		},

		distribution: {
			eyebrow: 'Kuipeleka duniani',
			heading: 'Usambazaji wa huduma',
			intro: 'Hakuna duka la kuchapisha, wala ukaguzi wa kusubiri. Msanidi anakabidhi huduma kwa nodi moja, na mtandao unaibeba kutoka hapo.',
			items: [
				{
					title: 'Ugunduzi usio na kituo kikuu',
					body: 'Celaut haina <strong>orodha kuu ya usajili wa huduma</strong>. Huduma zinasambaa kati ya nodi moja kwa moja, hivyo zinaweza kupatikana moja kwa moja — na hakuna mlinzi wa lango anayeamua kama umeruhusiwa kuingia.'
				},
				{
					title: 'Muunganisho wa hiari na blockchain',
					body: 'Huduma zinaweza pia kutangazwa kwenye blockchain inayotekeleza orodha ya usajili — kama <strong>Sigma Reputation System</strong> kwenye Ergo — pale mwonekano na kumbukumbu inayoweza kukaguliwa vinapokuwa na thamani zaidi kuliko kubaki nje ya msururu wa data kabisa.'
				}
			]
		},

		applications: {
			eyebrow: 'Ambako tayari inatumika',
			heading: 'Athari halisi na matumizi',
			intro: 'Muundo huu si jaribio la kifikra tu. Haya ndiyo mahali unapotumika leo.',
			ours: [
				{
					name: 'DePin',
					body: 'Yeyote anaweza kuendesha nodi ya Celaut na kuwa sehemu ya mtandao wa miundombinu halisi usio na kituo kikuu. Kila nodi inagundua wenzake, inaendesha na kuratibu huduma, na kusimamia utegemezi wake — ikigeuza kompyuta za kawaida kuwa uchakataji unaoshirikiwa na usiozuilika na udhibiti.'
				},
				{
					name: 'Unstoppable Skills',
					body: 'Orodha ya usajili iliyo kabisa kwenye msururu wa data na isiyo na seva, ambapo mashujaa ni matatizo yenyewe. Badala ya kutafuta huduma, mawakala wanatafuta ujuzi fulani na kugundua huduma zinazoushughulikia, zikiwa na vipimo halisi (benchmarks) na uorodheshaji unaotegemea sifa njema. Imejengwa juu ya Ergo na Celaut, ikiwa na motisha halisi ya kushiriki hatari: hakuna anayeweza kutuma taka bila kuhatarisha sifa yake njema.'
				}
			],
			thirdPartyHeading: 'Miradi ya wahusika wengine',
			thirdPartyTag: 'haikujengwa na sisi',
			thirdParty: {
				name: 'Game of Prompts',
				body: [
					'Jukwaa la ushindani ambapo wabunifu wanaunda <strong>huduma-mchezo</strong> zinazotathmini roboti zinazocheza ndani yake, na wachezaji wanaandika <strong>huduma-mtatuzi</strong> zinazojaribu kuongeza alama zao.',
					'Huduma hizi zinafuata mfumo msingi wa Celaut, na mfumo mzima unatumia blockchain ya Ergo kurekodi matokeo na kuhamisha zawadi.'
				]
			},
			ergoDocs: 'Nyaraka za Ergo',
			formalPaper: 'Karatasi rasmi'
		}
	},

	/* ============================================================== *
	 * /depin — Kodisha PC yako
	 * ============================================================== */
	depin: {
		meta: {
			title: 'Kodisha PC yako — Celaut DePIN',
			description:
				'Uza rasilimali za kompyuta yako pale usipozitumia. Safu ya DePIN ya Celaut haina kituo kikuu kabisa, inakuruhusu kuweka bei ya uchakataji ukizingatia gharama zako za umeme, na kutenga kila mzigo wa kazi ndani ya microVM.'
		},
		topbarTitle: 'Kodisha PC yako',
		hero: {
			eyebrow: 'Celaut DePIN',
			title: 'Kodisha PC yako.',
			tagline: 'Uza rasilimali za kompyuta yako pale usipozitumia.',
			lede: 'Mashine yako inatumia sehemu kubwa ya siku bila kazi. Celaut inageuza uwezo huo usiotumika kuwa kitu ambacho watu wanalipia — moja kwa moja, kwa masharti yako, huku kila mzigo wa kazi ukiwa umefungwa mbali na mfumo wako.',
			actions: ['Anza kukodisha PC yako', 'Ona jinsi inavyofanya kazi'],
			stats: [
				{ value: '100%', label: 'bila kituo kikuu kabisa — hakuna kampuni katikati' },
				{ value: 'Wewe', label: 'unaweka bei, ukizingatia bili yako ya umeme' },
				{ value: 'microVM', label: 'utenganishaji kwa kila mzigo wa kazi unaohifadhi' }
			]
		},
		scenes: {
			rent: {
				label: 'Wazo',
				beats: [
					{
						h: 'PC yako ipo bila kazi sasa hivi.',
						p: 'Mashine nyingi za binafsi zinakaa bila kutumika sehemu kubwa ya kila siku. Hilo ni maunzi halisi — cores, kumbukumbu, diski — bila kufanya lolote kabisa.'
					},
					{
						h: 'Uza kile ambacho hukitumii.',
						p: 'Celaut inagawa mashine yako kuwa <strong>uwezo unaoweza kukodisha</strong>. Wewe unaamua kiasi kinachokwenda kwenye mtandao na kiasi kinachobaki kwako — sehemu iliyobaki ya mashine inaendelea kufanya kazi kama ilivyokuwa daima.'
					},
					{
						h: 'Lipwa kwa kazi inayofanya.',
						p: 'Wenzake wanaohitaji uchakataji wanaipata nodi yako, wanajadiliana bei moja kwa moja nayo, na kulipa kwa kila utekelezaji. <strong>Malipo yanakamilishwa kwenye Ergo</strong> mara kazi inapokamilika.',
						note: 'Hakuna kituo cha data. Hakuna mtu wa katikati. Hakuna kusubiri malipo ya kila mwezi.'
					}
				]
			},
			p2p: {
				label: 'Faida 01',
				beats: [
					{
						h: 'Bila kituo kikuu kabisa.',
						p: 'Kila jukwaa lingine la “kodisha maunzi yako” linaweka kampuni katikati. Inashikilia soko, inachukua sehemu yake, inaweka sheria, na inaweza kukuondoa kwenye mtandao wake wakati wowote inapotaka.'
					},
					{
						h: 'Hapa, hakuna mtu katikati.',
						p: 'Celaut haina <strong>msingi wala kampuni</strong> yoyote iliyoketi kati ya pande mbili. Nodi yako na mwenzake anayehitaji uchakataji wanazungumza <strong>moja kwa moja</strong> — ugunduzi, majadiliano, utekelezaji, ukamilishaji wa malipo.'
					},
					{
						h: 'Jambo linalomaanisha hakuna anayeweza kukukata.',
						p: 'Hakuna akaunti ya kusimamishwa, hakuna masharti yanayobadilika bila wewe kujua, hakuna ada inayokua kimya kimya. Mwingiliano huu ni <strong>usio na kituo kikuu kabisa</strong>, hivyo kitu pekee kila upande unategemea ni upande mwingine.',
						note: 'Hakuna kitu cha kujiandikisha. Hakuna kitakachokutoa nje.'
					}
				]
			},
			electricity: {
				label: 'Faida 02',
				beats: [
					{
						h: 'Uchakataji si wa bure kutoa.',
						p: 'Kuendesha mashine yako kunagharimu umeme, na gharama hiyo si thabiti — inabadilika kila siku na kutegemea unapoishi.'
					},
					{
						h: 'Iweke katika bei.',
						p: 'Celaut inakuruhusu <strong>kuweka gharama za umeme kwa hiari</strong> kwenye bei unayoweka kwa uchakataji wako. Nodi yako inaweka bei ya kazi ikizingatia bili yako ya umeme, ili kukodisha uwezo kusikuletee hasara kimya kimya.'
					},
					{
						h: 'Na amua unapokuwa tayari.',
						p: '<strong>Upatikanaji na muda wa uendeshaji navyo unaviamua wewe.</strong> Kodisha mashine usiku tu, wakati umeme ni nafuu zaidi, weka kikomo cha muda wa juu wa kazi moja, au uwe nje ya mtandao kabisa — mtandao utaelekeza tu mahali pengine.',
						note: 'Bei zako. Masaa yako. Faida yako.'
					}
				]
			},
			isolation: {
				label: 'Faida 03',
				beats: [
					{
						h: 'Msimbo wa nani unaendeshwa kwenye PC yangu?',
						p: 'Hicho ndicho swali la kwanza ambalo mtu yeyote mwenye busara ataliuliza. Kukodisha mashine yako hakuwezi kumaanisha kuwapa wageni funguo zake.'
					},
					{
						h: 'Utenganishaji kamili wa utekelezaji.',
						p: 'Kila mzigo wa kazi unaendeshwa ukiwa umefungwa ndani ya <strong>microVM</strong> yake — mashine pepe halisi yenye kernel yake mwenyewe na mpaka unaowekwa na maunzi, si chombo chenye kernel inayoshirikiwa. Haiwezi kuona faili zako, mtandao wako, wala mzigo mwingine wowote wa kazi kwenye mashine.'
					},
					{
						h: 'Teknolojia ile ile inayoendesha mawingu makubwa.',
						p: 'microVM ndizo <strong>watoa huduma wakubwa wa mawingu</strong> wanazotumia kuendesha msimbo usioaminika wa mamilioni ya wageni kwenye maunzi yanayoshirikiwa. Celaut inaleta mfano huo huo wa utenganishaji kwenye meza yako — uhakikisho huo si ahadi, ni muundo wenyewe.',
						note: 'Kazi inapokamilika, VM inaharibiwa. Hakuna kinachobaki.'
					}
				]
			}
		},
		payoff: {
			heading: 'Unachopata kikweli',
			items: [
				{
					title: 'Maunzi yasiyotumika, yakifanya kazi',
					body: 'Mashine ya michezo ikiwa imelala saa 9 usiku, kituo cha kazi kisichotumika wikendi, sanduku la akiba kabatini. Ikiwa linaweza kuendesha nodo, linaweza kupata pesa.'
				},
				{
					title: 'Wewe unaweka masharti',
					body: 'Bei kwa kila kipimo cha uchakataji, ni masaa gani upo tayari, ni kiasi gani cha mashine uko tayari kutoa. Vyote hivyo ni vyako kubadilisha.'
				},
				{
					title: 'Unalipwa kwa kila utekelezaji',
					body: 'Ukamilishaji unatokea kwenye Ergo (ERG) mara kazi inapokamilika — hakuna ankara, hakuna ratiba ya malipo ya jukwaa, hakuna kiwango cha chini.'
				},
				{
					title: 'Hakuna cha kuamini',
					body: 'Huduma zinatambulishwa kwa maudhui: anayeomba anapata programu halisi aliyoiomba, na wewe unaiendesha bila kuhitaji kuikagua au kuwa mdhamini wake.'
				},
				{
					title: 'Faili zako zinabaki zako',
					body: 'Kila mzigo wa kazi unaishi kwenye microVM yake mwenyewe yenye kernel yake mwenyewe. Haioni kamwe diski yako, mtandao wako, wala kitu kingine chochote kwenye mashine.'
				},
				{
					title: 'Ondoka wakati wowote unapotaka',
					body: 'Simamisha nodi na mtandao unapata njia inayozunguka wewe. Hakuna mkataba, hakuna kufungwa, na hakuna wa kumuomba ruhusa.'
				}
			]
		},
		steps: {
			heading: 'Kutoka usakinishaji hadi kipato',
			items: [
				{
					title: 'Sakinisha nodo',
					body: 'Amri moja kwenye Linux, kisakinishi kwenye Windows. Mashine yako inajiunga na mtandao na kuanza kugundua wenzake.'
				},
				{
					title: 'Weka bei yako na masaa',
					body: 'Mwambie nodi ni kiasi gani uchakataji wako unagharimu — ikiwa ni pamoja na umeme kama unataka kuuzingatia — na ni lini inapatikana.'
				},
				{
					title: 'Kubali kazi',
					body: 'Wenzake wanajadiliana moja kwa moja na nodi yako. Mizigo ya kazi iliyokubaliwa inaendeshwa ikiwa imefungwa ndani ya microVM, iliyotengwa na kila kitu kingine.'
				},
				{
					title: 'Lipwa',
					body: 'Malipo na sifa njema vinakamilishwa kwenye Ergo mara kila utekelezaji unapokamilika. Mchango unatuzwa; matokeo yanabaki kuweza kukaguliwa.'
				}
			]
		},
		roles: {
			heading: 'Upande mwingine wa mabadilishano',
			intro: 'Kukodisha PC yako ni nusu moja ya mtandao. Nusu nyingine ni kuweza <em>kuutumia</em> — na sifa zile zile zinazokulinda kama mwenyeji ndizo zinazofanya mtandao huu ustahili kununua kutoka kwake.',
			items: [
				{
					title: 'Wasanidi',
					body: 'Chapisha programu mara moja kama huduma iliyofungwa na inayotambulishwa kwa maudhui, na acha mtandao uihifadhi, uigundue, na kuikuza. Uwezo wa kurudia unatoka kwenye muundo wenyewe, si kwenye SLA ya mtoa huduma.',
					link: 'Kwa wasanidi →'
				},
				{
					title: 'Mawakala na watumiaji',
					body: 'Omba huduma kulingana na tatizo wanalolitatua na ulipe kwa kila utekelezaji. Hakuna akaunti ya wingu, hakuna kufungwa — na muhuri unathibitisha kwamba umepata programu halisi uliyoiomba.',
					link: 'Kwa watumiaji wa mwisho →'
				},
				{
					title: 'Wenyeji',
					body: 'Huyo ni wewe. Changia maunzi yoyote uliyonayo; safu ya uwakilishi pepe wa nodi inahakikisha mizigo ya kazi bado inapata mahali panapofaa, hata kati ya muundo tofauti wa vichakataji (CPU).'
				}
			]
		},
		cta: {
			heading: 'Washa mashine yako isiyotumika.',
			body: 'Kusakinisha nodi kunahitaji amri moja tu. Ni njia ya haraka zaidi ya kugundua thamani ya maunzi yako pale yasipofanya kitu kingine chochote.',
			actions: ['Endesha nodi', 'Soma mfumo msingi']
		}
	},

	/* ============================================================== *
	 * /developers — Jenga mara moja
	 * ============================================================== */
	developers: {
		meta: {
			title: 'Kwa wasanidi — jenga mara moja, endesha popote | Celaut',
			description:
				'Unda huduma za Celaut: bainisha BOX, API, na wigo wa NET, ikabidhi kwa nodi moja, na uache mtandao ukisambaze na kuutekeleze. Hakuna miundombinu, hakuna mipangilio, hakuna jukwaa katikati.'
		},
		topbarTitle: 'Kwa wasanidi',
		hero: {
			eyebrow: 'Wasanidi wa huduma',
			title: 'Jenga mara moja.',
			tagline: 'Kisha acha kufikiria kuhusu inaendeshwa wapi.',
			lede: 'Huduma ya Celaut si utekelezaji — ni vipimo. Eleza mazingira, kiunganishi, na wigo wa mtandao, ikabidhi kwa nodi moja tu, na mtandao unachukua jukumu kutoka hapo.',
			actions: ['Chunguza Skills', 'Ona jinsi inavyofanya kazi'],
			stats: [
				{ value: 'BOX · API · NET', label: 'vipengele vitatu — hivyo ndivyo vipimo vyote' },
				{ value: 'Hakuna DevOps', label: 'nodi zinashughulikia utekelezaji; hakuna akaunti ya wingu ya kufungua' },
				{ value: 'Uhakika', label: 'pembejeo zile zile, matokeo yale yale, kwenye nodi yoyote, wakati wowote' }
			]
		},
		scenes: {
			spec: {
				label: 'Wazo',
				beats: [
					{
						h: 'Hutekelezi. Unabainisha.',
						p: 'Hakuna seva ya kuandaa, hakuna picha ya kupeleka, hakuna mtiririko wa kazi wa kuuweka wa kijani. Huduma katika Celaut ni maelezo yaliyoandikwa ya kile inachohitaji ili kuendeshwa.'
					},
					{
						h: 'Vipengele vitatu. Hicho ndicho.',
						p: '<strong>BOX</strong> inaeleza mazingira ya utekelezaji — muundo wa maunzi, mfumo wa faili, vigezo vya mazingira, sehemu ya kuanzia, mipangilio. Inabainisha moja kwa moja muundo mzima wa faili badala ya kuelekeza kwenye picha ya nje, na hilo ndilo linaloweka utekelezaji kuwa wa kurudiwa.'
					},
					{
						h: 'Na jinsi dunia inavyoifikia.',
						p: '<strong>API</strong> inaeleza jinsi wateja na huduma nyingine wanavyozungumza nayo, pamoja na njia za malipo zinazokubaliwa na gharama. <strong>NET</strong> inataja mitandao ya nje itakayoifikia — kwa default huduma imetengwa, na chochote kinachozidi hilo kinatangazwa ndani ya vipimo vyenyewe, ili watumiaji wajue mapema mahali inaweza kwenda.',
						note: 'Inayoweza kubebeka, inayoweza kurudiwa, huru kutoka utegemezi wa wahusika wengine.'
					}
				]
			},
			agnostic: {
				label: 'Faida 01',
				beats: [
					{
						h: 'Chochote ulichoandika, kinapelekwa vile vile.',
						p: 'Celaut haikutaki uwekeze kwenye mfumo fulani, mazingira ya kuendesha, au SDK. Inataka mfumo wa faili na sehemu ya kuanzia.'
					},
					{
						h: 'Nodi haijali pia.',
						p: 'Huduma zinafuata <strong>kanuni ya sanduku jeusi</strong>: zinafanya kazi bila kutegemea maelezo ya nodi zinazoziendesha, na nodi zinaziendesha bila kuhitaji kuelewa zinachofanya.'
					},
					{
						h: 'Kwa hivyo nodi yoyote inayolingana itaikubali.',
						p: 'BOX inatangaza muundo mdogo wa maunzi (microarchitecture) inayolenga, ili nodi zijue kama zinalingana. Zaidi ya hilo, <strong>huduma yako inaweza kuendeshwa na yeyote kwenye nodi yoyote inayolingana</strong> — hicho ndicho mkataba wote.',
						note: 'Hakuna kufungwa, kwa sababu hakuna kitu cha kufungwa nacho.'
					}
				]
			},
			distribute: {
				label: 'Faida 02',
				beats: [
					{
						h: 'Ikabidhi kwa nodi moja.',
						p: 'Hauchapishi kwenye duka na husubiri ukaguzi. Msanidi anahitaji tu <strong>kutuma huduma kwa nodi moja au zaidi</strong>.'
					},
					{
						h: 'Kutoka hapo, mtandao unaibeba.',
						p: 'Nodi hizo zinashughulikia <strong>kusambaza huduma kwa nyingine</strong>. Hakuna orodha kuu ya usajili wa huduma — huduma zinasambaa moja kwa moja, hivyo hakuna kituo kimoja cha kushindwa wala mlinzi wa lango anayeamua kama umeruhusiwa kuingia.'
					},
					{
						h: 'Inaweza kugunduliwa, kama unavyotaka.',
						p: 'Nodi zinaweza pia <strong>kupakia huduma kwenye mfumo wa sifa njema</strong>, ili watumiaji na huduma nyingine waweze kuamua kama kuitumia, na lini. Huduma zinaweza kutangazwa kwenye orodha ya usajili ya blockchain — kama <strong>Sigma Reputation System</strong> kwenye Ergo — ili kuboresha mwonekano na imani.',
						note: 'Hakuna cha kujiandikisha. Hakuna anayechukua sehemu.'
					}
				]
			},
			compose: {
				label: 'Faida 03',
				beats: [
					{
						h: 'Huduma zinazoita huduma.',
						p: 'Huduma inaweza, kupitia nodi inayoiendesha, kuomba utekelezaji wa huduma nyingine — <strong>huduma zake za watoto</strong>. Mitiririko changamano ya kazi inajengwa kwa mchanganyiko, si kwa mipangilio ya uratibu.'
					},
					{
						h: 'Nodi inaamua watakapotua.',
						p: 'Nodi zinasimamia vielelezo vya huduma na kuamua kama kuviendesha kwa ndani au kugawa mzigo kati ya wenzake. Utegemezi ni tatizo ambalo nodi inatatua — inahakikisha huduma zinaweza kufikia kile zinachohitaji katika mtandao mzima.'
					},
					{
						h: 'Na huji kujua kamwe mahali.',
						p: '<strong>Huduma mzazi haijui watoto wake wanaendeshwa wapi.</strong> Kila mtoto anabainisha tu rasilimali anazohitaji. Wewe unaandika mchanganyiko; mtandao unatatua mahali pa kuweka.',
						note: 'Hakuna mratibu wa kupanga. Hakuna muundo wa kudumisha.'
					}
				]
			}
		},
		payoff: {
			heading: 'Muundo huu unakupa nini',
			items: [
				{
					title: 'Bainisha, usitekeleze',
					body: 'Huduma ni BOX (muundo wa maunzi, mfumo wa faili, mazingira, sehemu ya kuanzia, mipangilio), API, na wigo wa NET. Andika hilo na umemaliza — hakuna hatua ya utekelezaji ya kuwajibika nayo.'
				},
				{
					title: 'Inajitosheleza kwa muundo wake',
					body: 'BOX inaeleza muundo mzima wa faili unaohitajika na huduma, badala ya kuelekeza kwenye picha au ghala za nje. Hakuna orodha ya wahusika wengine inayoweza kupotea chini ya miguu yako.'
				},
				{
					title: 'Sanduku jeusi, kwa makusudi',
					body: 'Huduma zinafanya kazi bila kutegemea nodi zinazoziendesha. Huandiki kamwe msimbo ukilenga mazingira ya nodi fulani, kwa sababu huambiwi kamwe ni mazingira gani.'
				},
				{
					title: 'Inayoweza kurudiwa, si “jitihada bora zaidi”',
					body: 'Pembejeo zile zile daima zinazalisha matokeo yale yale, bila kujali inaendeshwa wapi au lini. Hapa uhakika ni sifa ya muundo, si ahadi ya mtoa huduma.'
				},
				{
					title: 'Mchanganyiko bila uratibu',
					body: 'Huduma inaweza, kupitia nodi yake, kuomba utekelezaji wa huduma za watoto. Mzazi hajui zinaendeshwa wapi; kila moja inabainisha tu rasilimali inazohitaji.'
				},
				{
					title: 'Sifa njema inayokusanyika',
					body: 'Kwa kuwa huduma ina uhakika na imetengwa kwa default, uthibitisho wa sifa njema uliorekodiwa muda mrefu uliopita bado unasema kitu cha kweli kuihusu leo.'
				}
			]
		},
		steps: {
			heading: 'Kutoka msimbo hadi kuendeshwa kwenye mtandao',
			items: [
				{
					title: 'Andika huduma',
					body: 'Lugha yoyote, muundo wowote. Kinachohitajika ni mfumo wa faili unaohitajika na amri inayoianzisha — si mfumo uliochagua.'
				},
				{
					title: 'Bainisha BOX, API, na NET',
					body: 'Eleza mazingira, jinsi waitaji wanavyozungumza na huduma, na ufikiaji gani wa mtandao wa nje inapaswa kuweza kuomba, kama upo.'
				},
				{
					title: 'Ipeleke kwa nodi',
					body: 'Nodi moja inatosha. Inasambaza huduma kwa wengine na inaweza kuichapisha kwenye mfumo wa sifa njema ili watumiaji na huduma nyingine waweze kuipata.'
				},
				{
					title: 'Acha mtandao uiendeshe',
					body: 'Nodi zinajadiliana gharama na kuamua kila kielelezo kinaendeshwa wapi. Wewe hupo katika mzunguko huo, na huna miundombinu yoyote ya kuiweka hai.'
				}
			]
		},
		tradeoffs: {
			heading: 'Mabadilishano unayoyafanya kwa kweli',
			intro: 'Leo, kuchapisha programu kunamaanisha kuchagua kati ya kuihifadhi mwenyewe na kuwaomba watu waiendeshe wao wenyewe. Chaguzi zote mbili zina gharama. Dai la Celaut ni finyu na maalum: linachukua faida za kila moja bila hasara zake — kwa gharama ya udhibiti wako juu ya huduma inayoendeshwa.',
			items: [
				{
					label: 'Huduma ya wavuti iliyohifadhiwa',
					good: 'Watumiaji hawahitaji miundombinu wala mipangilio.',
					bad: 'Huwezi kuthibitisha mfumo haujabadilika, na watumiaji lazima wakuamini kwa neno lako kwamba data za maombi yao hazitumiwi vibaya.'
				},
				{
					label: 'Msimbo wa chanzo wanaouendesha wenyewe',
					good: 'Wenye uhakika — mara ukishapakuliwa, huwezi kuubadilisha bila wao kujua — na data za maombi yao hazifiki kwako kamwe.',
					bad: 'Wanahitaji maunzi yenye uwezo na wanapaswa kuvumilia mipangilio, ambapo watu wengi hukata tamaa.'
				},
				{
					label: 'Huduma ya Celaut',
					good: 'Hakuna miundombinu ya kusimamia na hakuna cha kupanga, kwa sababu vipimo tayari vinajumuisha chombo, muundo wa maunzi, mahitaji ya mtandao, na kiunganishi.',
					bad: 'Unaachia udhibiti: huwezi kubadilisha, kupunguza, wala kutoa data kutoka kwa huduma mara inapokuwa nje huko. Hicho ndicho kilicho lengo.',
					highlight: true
				}
			]
		},
		roles: {
			heading: 'Sehemu iliyobaki ya mtandao',
			intro: 'Huduma yako inahitaji mahali pa kuendeshwa na mtu wa kuendeshwa kwa ajili yake. Wote wawili pia ni watu.',
			items: [
				{
					title: 'Waendeshaji wa nodi',
					body: 'Wanatoa maunzi na kuendesha chochote kinachoombwa, bila kuhitaji kuelewa huduma yako inafanya nini, kwa kubadilishana na malipo.',
					link: 'Kodisha PC yako →'
				},
				{
					title: 'Watumiaji wa mwisho',
					body: 'Wanaendesha huduma kwenye nodi na kulipia rasilimali za uchakataji zilizotumika — na wanaweza kuthibitisha kwamba kilichoendeshwa ni sawasawa na vile vipimo vilivyoeleza.',
					link: 'Kwa watumiaji wa mwisho →'
				},
				{
					title: 'Mfumo msingi',
					body: 'Muundo mzima: nodi, huduma, vipimo, uratibu kupitia mifumo ya sifa njema na malipo, na kwa nini yote hayo ni muhimu.',
					link: 'Soma karatasi →'
				}
			]
		},
		cta: {
			heading: 'Anzia kwenye matatizo yenyewe.',
			body: 'Unstoppable Skills ni orodha ya usajili ambapo mashujaa ni matatizo yenyewe: tafuta ujuzi, na upate huduma zinazoushughulikia, vipimo vyao, na sifa yao njema. Ni njia fupi zaidi kutoka “nijenge nini” hadi “nani anahitaji hili”.',
			actions: ['Chunguza Skills', 'Soma mfumo msingi']
		}
	},

	/* ============================================================== *
	 * /users — Iendeshe, lipia kilichotumika
	 * ============================================================== */
	users: {
		meta: {
			title: 'Kwa watumiaji wa mwisho — iendeshe, lipia kilichotumika | Celaut',
			description:
				'Endesha huduma kwenye nodi za Celaut na ulipie tu rasilimali za uchakataji zilizotumika. Hakuna akaunti, hakuna usajili wa kudumu, hakuna jukwaa katikati — huduma zinaendeshwa zikiwa zimetengwa na kwa uhakika, hivyo unapata sawasawa na vile vipimo vinavyoeleza.'
		},
		topbarTitle: 'Kwa watumiaji wa mwisho',
		hero: {
			eyebrow: 'Watumiaji wa huduma',
			title: 'Iendeshe.',
			tagline: 'Lipia kilichotumika. Hakuna kingine.',
			lede: 'Endesha huduma kwenye nodi, pata matokeo, lipia uchakataji ulioutumia. Hakuna akaunti ya kuunda, hakuna usajili wa kufuta, na hakuna kampuni iliyoketi kati yako na mashine iliyofanya kazi hiyo.',
			actions: ['Chunguza Skills', 'Ona jinsi inavyofanya kazi'],
			stats: [
				{ value: 'Hakuna akaunti', label: 'hakuna cha kujiandikisha, hakuna cha kukuzuia' },
				{ value: 'Kwa kila utekelezaji', label: 'unalipia tu rasilimali za uchakataji zilizotumika kikweli' },
				{ value: 'Zilizotengwa', label: 'huduma zinaendeshwa zikiwa zimefungwa, na hazioni chochote wasichopewa' }
			]
		},
		scenes: {
			ask: {
				label: 'Wazo',
				beats: [
					{
						h: 'Uliza mtandao, si kampuni.',
						p: 'Unataka kitu kifanyike — kuendesha mfano, kuchambua mfuatano, kufanya boti ifanye biashara, kuchakata faili. Leo hilo linamaanisha kuchagua mtoa huduma na kufungua akaunti naye.'
					},
					{
						h: 'Nodi zinajibu moja kwa moja.',
						p: 'Celaut haina <strong>orodha kuu ya usajili wa huduma</strong>. Huduma zinasambazwa kati ya nodi moja kwa moja, na nodi zinatangaza violesura vinavyoviunga mkono na <strong>njia za malipo zinazokubali</strong> zinapowasiliana — hivyo hakuna kinachohitaji kukubaliwa na yeyote mapema.'
					},
					{
						h: 'Unashughulika na mashine inayofanya kazi.',
						p: 'Nodi yako inajadiliana gharama ya utekelezaji na mwenzake na kazi inafanyika. Hakuna <strong>jukwaa katikati</strong> linalochukua sehemu, kuweka sheria, au kuweza kukuondoa kwenye mtandao ambao hukuwahi kuujiunga.',
						note: 'Hakuna kujiandikisha. Hakuna usajili wa kudumu. Hakuna mtu wa katikati.'
					}
				]
			},
			proof: {
				label: 'Faida 01',
				beats: [
					{
						h: 'Unajuaje kile kilichoendeshwa kikweli?',
						p: 'Kwa huduma iliyohifadhiwa, huwezi kujua. Mwendeshaji hawezi kuthibitisha mfumo haujabadilika — hivyo zana inapokuwa maarufu, hakuna kinachozuia utendaji wake kushuka kimya kimya ili kukuelekeza kwenye mpya zaidi.'
					},
					{
						h: 'Hapa, huduma <em>ni</em> vipimo vyake.',
						p: 'Huduma inabainisha mazingira yake yote — muundo wa maunzi, mfumo wa faili, sehemu ya kuanzia, mipangilio. Badilisha lolote kati ya hayo na inakuwa <strong>huduma tofauti</strong>, si sasisho la kimya la ile uliyokuwa unaitumia.'
					},
					{
						h: 'Kwa hiyo matokeo yanaweza kurudiwa.',
						p: 'Kwa pembejeo zile zile, huduma <strong>daima inazalisha matokeo yale yale</strong>, bila kujali ni nodi gani inayoiendesha au lini. Hicho ndicho kinachofanya rekodi ya sifa njema kutoka miezi iliyopita bado ina thamani leo.',
						note: 'Uhakika ndio uthibitisho. Si ahadi — muundo wenyewe.'
					}
				]
			},
			sealed: {
				label: 'Faida 02',
				beats: [
					{
						h: 'Ombi lako si shughuli ya mtu mwingine.',
						p: 'Unapotuma mzigo wa kazi mahali fulani, swali la kweli ni: ni nani mwingine anayeweza kuuona katika njia yake.'
					},
					{
						h: 'Kila utekelezaji umetengwa.',
						p: 'Nodi inaendesha huduma kama <strong>kielelezo kilichotengwa</strong> — chombo au mashine pepe. Kwa default huduma imekatwa kabisa kutoka mitandao ya nje, ikiweza kuzungumza tu na mzazi wake, watoto wake, na nodi inayoiendesha.'
					},
					{
						h: 'Na msanidi hayuko upande mwingine.',
						p: '<strong>Wasanidi wa huduma hawawezi kudhibiti, kubadilisha, au kutoa data kutoka kwa huduma</strong>, kwa sababu hawadhibiti nodi zinazoisambaza na kuiendesha. Ufikiaji wowote mpana wa mtandao lazima utangazwe kwenye vipimo, kwa uwazi, kabla hata hujaiendesha.',
						note: 'Imetengwa kwa default. Ufikiaji unaombwa, hauchukuliwi kuwa umepewa.'
					}
				]
			},
			pay: {
				label: 'Faida 03',
				beats: [
					{
						h: 'Unalipia kazi. Hakuna zaidi.',
						p: 'Watumiaji wanaendesha huduma kwenye nodi na <strong>kulipia rasilimali za uchakataji zilizotumika</strong>. Hicho ndicho uhusiano mzima wa kibiashara.'
					},
					{
						h: 'Hakuna kinachokusanyika ukiwa hutumii.',
						p: 'Hakuna nafasi maalum, hakuna daraja, hakuna kiwango cha chini cha kila mwezi. Utekelezaji unapokamilika, malipo yanakamilika pamoja nayo — malipo yanabadilishwa kwa rasilimali zilizotumika, na uthibitisho wa malipo ndio unaofungua ufikiaji.'
					},
					{
						h: 'Bei inatokana na soko, si ukurasa wa bei.',
						p: 'Nodi zinaweka gharama zake zenyewe na kushindana kwazo, na <strong>huduma zina gharama ya ziada ya sifuri</strong> — gharama ya kuendesha moja inaanguka kwa nodi — hivyo nyingi zinaanza bila malipo ili kujenga sifa njema. Mifumo ya malipo inabaki nje ya muundo msingi, hivyo hata ni kitabu gani cha hesabu kinachokamilisha malipo hakijawekwa pia.',
						note: 'Lipia kwa kila utekelezaji. Ondoka wakati wowote unapotaka. Hakuna cha kufuta.'
					}
				]
			}
		},
		payoff: {
			heading: 'Unachopata kikweli',
			items: [
				{
					title: 'Hakuna miundombinu ya kusimamia',
					body: 'Nodi zinashughulikia hayo. Hakuna mtoa huduma wa wingu wa kuchagua, hakuna mashine ya kuiweka hai, na hakuna kitu cha kuacha kikiendeshwa kati ya matumizi.'
				},
				{
					title: 'Hakuna mipangilio',
					body: 'Vipimo vya huduma tayari vinajumuisha jinsi chombo kinavyojengwa, muundo wa maunzi unaohitajika, mahitaji yake ya mtandao, na kiunganishi chake. Hakuna kati ya hayo ni jukumu lako kutatua.'
				},
				{
					title: 'Msanidi hana ufikiaji',
					body: 'Wasanidi wa huduma hawawezi kudhibiti, kubadilisha, au kutoa data kutoka kwa huduma — hawadhibiti nodi zinazoisambaza na kuiendesha.'
				},
				{
					title: 'Haiwezi kubadilika bila wewe kujua',
					body: 'Huduma ina uhakika: pembejeo zile zile zinazalisha matokeo yale yale, bila kujali ni lini au wapi inaendeshwa. Hakuna anayeweza kuidhoofisha kimya kimya ili kukuelekeza kwenye mpya zaidi.'
				},
				{
					title: 'Inahukumiwa kwa sifa njema, si uorodheshaji',
					body: 'Sifa njema inaishi kama rekodi kwenye kitabu cha hesabu, na kila mshiriki anapima vyanzo anavyoviamini. Hakuna ukurasa wa mbele wa uhariri unaoamua unachokiona.'
				},
				{
					title: 'Hakuna cha kutolewa kutoka',
					body: 'Ugunduzi ni moja kwa moja, bila orodha kuu ya usajili, hivyo hakuna akaunti ya kusimamishwa wala tangazo la kuondolewa.'
				}
			]
		},
		steps: {
			heading: 'Kutoka “nahitaji hili lifanyike” hadi matokeo',
			items: [
				{
					title: 'Pata huduma',
					body: 'Tafuta kulingana na tatizo unalotaka kutatua. Nodi zinagundua huduma moja kwa moja, na orodha za usajili kama Unstoppable Skills zinaunganisha matatizo na huduma zinazoyashughulikia.'
				},
				{
					title: 'Omba utekelezaji',
					body: 'Nodi yako inazungumza moja kwa moja na mwenzake anayeweza kuiendesha. Violesura na njia za malipo zinazokubaliwa zinatangazwa zinapowasiliana, hivyo hakuna kinachohitaji kukubaliwa mapema.'
				},
				{
					title: 'Inaendeshwa, ikiwa imefungwa',
					body: 'Nodi inaendesha huduma kama kielelezo kilichotengwa — chombo au mashine pepe — bila ufikiaji zaidi ya kile vipimo vilivyoomba.'
				},
				{
					title: 'Lipia kilichotumika',
					body: 'Malipo yanabadilishwa kwa rasilimali zilizotumika, na uthibitisho wa malipo ndio unaofungua ufikiaji. Hakuna usajili, hakuna kiwango cha chini, hakuna ankara ya kudumu.'
				}
			]
		},
		tradeoffs: {
			heading: 'Dhidi ya chaguzi mbili ulizonazo leo',
			intro: 'Chukua boti ya biashara kama mfano. Sasa hivi, ama unakabidhi mkoba wako kwa huduma ya wavuti, au unatafuta chanzo na kuiendesha mwenyewe. Kila chaguo linakupa kitu na kinakugharimu kitu kingine.',
			items: [
				{
					label: 'Tumia huduma ya wavuti',
					good: 'Huendeshi miundombinu yoyote na hupangi chochote.',
					bad: 'Huwezi kuipa sifa njema, kwa sababu mwendeshaji hawezi kuthibitisha mfumo haujabadilika — na hawezi kukuhakikishia kwamba data za maombi yako hazitumiwi vibaya.'
				},
				{
					label: 'Endesha chanzo mwenyewe',
					good: 'Ina uhakika, na msanidi hana udhibiti wowote juu ya data za maombi yako.',
					bad: 'Unahitaji maunzi yenye uwezo wa kuiendesha, na unapaswa kushughulikia mipangilio — ambapo mara nyingi watu hukata tamaa na kurudi kwenye chaguo la kwanza.'
				},
				{
					label: 'Tumia huduma ya Celaut',
					good: 'Hakuna miundombinu, hakuna mipangilio, na msanidi bado hawezi kudhibiti, kubadilisha, wala kutoa data kutoka kwa huduma.',
					bad: 'Unalipia kwa kila utekelezaji, na unategemea mtandao kuwa na nodi iliyo tayari kuiendesha kwa bei unayokubali.',
					highlight: true
				}
			]
		},
		roles: {
			heading: 'Watu wengine kwenye mtandao',
			intro: 'Mtu fulani aliandika huduma na mashine ya mtu fulani inaiendesha. Majukumu yote mawili yapo wazi kwako pia.',
			items: [
				{
					title: 'Waendeshaji wa nodi',
					body: 'Wanatoa maunzi yanayoendesha kile unachoomba, kwa kubadilishana na malipo — bila kuhitaji kujua huduma inafanya nini.',
					link: 'Una maunzi ya ziada? →'
				},
				{
					title: 'Wasanidi wa huduma',
					body: 'Wanaandika huduma ambazo nodi yoyote inayolingana inaweza kuziendesha, na kuzikabidhi kwa mtandao badala ya kuzihifadhi wenyewe.',
					link: 'Kwa wasanidi →'
				},
				{
					title: 'Mfumo msingi',
					body: 'Nodi, huduma, vipimo, na mifumo ya sifa njema na malipo inayoruhusu pande zisizoaminiana kushirikiana bado.',
					link: 'Soma karatasi →'
				}
			]
		},
		cta: {
			heading: 'Anzia kwenye tatizo ulilonalo.',
			body: 'Unstoppable Skills ni orodha ya usajili iliyo kabisa kwenye msururu wa data na isiyo na seva, ambapo mashujaa ni matatizo yenyewe. Tafuta ujuzi na upate huduma zinazoushughulikia, vipimo halisi vya kulinganisha, majadiliano, na uorodheshaji unaotegemea sifa njema.',
			actions: ['Chunguza Skills', 'Kodisha PC yako badala yake']
		}
	},

	/* ============================================================== *
	 * /install
	 * ============================================================== */
	install: {
		meta: {
			title: 'Sakinisha Nodo — Celaut',
			description: 'Sakinisha nodi ya Celaut (nodo) kwenye Linux, Windows, au macOS.'
		},
		topbarTitle: 'Sakinisha nodo',
		heading: 'Endesha Nodi ya Celaut',
		subtitle:
			'Sakinisha <strong>nodo</strong> na ujiunge na mtandao usio na kituo kikuu — gundua wenzako, endesha na ratibu huduma, na geuza mashine yako kuwa uchakataji unaoshirikiwa na usiozuilika na udhibiti.',
		tabs: { linux: 'Linux', windows: 'Windows', mac: 'macOS' },
		copy: 'Nakili',
		copied: 'Imenakiliwa ✓',
		linux: {
			heading: 'Linux',
			intro: 'Usakinishaji wa msingi — endesha hii kwenye terminal yako:',
			notes: [
				'Skripti inahitaji <code>sudo</code> kwa mipangilio ya ngazi ya mfumo. Mazingira ya kuendesha ya Python, Java, na <code>yq</code> yanasakinishwa kwa ndani ndani ya saraka kuu ya nodi.',
				'Unapendelea usakinishaji wa mkono, bila sudo? Fuata {link}.'
			],
			manualLink: 'mwongozo wa mkono'
		},
		windows: {
			heading: 'Windows 11',
			intro: 'Pakua na endesha kisakinishi rasmi:',
			download: 'Pakua Nodo-Setup.exe',
			notes: [
				'Kisakinishi kinaunda kiotomatiki mfumo wa Linux uliotengwa maalum kwa ajili ya Nodo, ili nodi iendeshwe ikitengwa na sehemu iliyobaki ya mfumo wako.',
				'Hakuna mipangilio ya mkono ya mazingira ya Linux inayohitajika.'
			]
		},
		mac: {
			heading: 'macOS',
			intro: 'Kisakinishi asili cha macOS <strong>bado hakipatikani</strong>.',
			notes: [
				'Msaada kwa macOS umepangwa. Wakati huo huo, unaweza kuendesha nodi kwenye mashine ya Linux au VM ya Linux.',
				'Fuata {link} kwa masasisho.'
			],
			repoLink: 'ghala la nodo'
		}
	},

	/* ============================================================== *
	 * /paradigm
	 * ============================================================== */
	paradigm: {
		meta: {
			title: 'Celaut — Karatasi Rasmi',
			description:
				'Celaut: muundo usio na kituo kikuu kwa ubunifu na usambazaji wa programu — karatasi rasmi.'
		},
		topbarTitle: 'Karatasi Rasmi',
		toc: 'Yaliyomo',
		tocNav: 'Jedwali la yaliyomo',
		systemBehaviorHeading: 'Tabia ya mfumo',
		executionHeading: 'Utekelezaji wa huduma',
		balancerHeading: 'Ulinganishaji wa mzigo wa huduma'
	},

	/* ============================================================== *
	 * Maneno yanayoonyeshwa kwenye maonyesho ya <canvas>.
	 * Yamewekwa mafupi kwa makusudi — ni lebo, si sentensi, na
	 * mpangilio wake umewekwa kwa mkono.
	 * ============================================================== */
	viz: {
		home: {
			generation: 'kizazi {n}',
			lifeRule: 'majirani 2 au 3: hai · sawasawa 3: kuzaliwa',
			oneProtocol: 'itifaki moja ambayo kila mtu lazima aiendeshe',
			networkSplits: 'badilisha sheria na mtandao unagawanyika',
			whereOverlap: 'zinazungumza ambako panafanana',
			noVote: 'hakuna kupiga kura · hakuna kuhamishwa · hakuna fork',
			blackBox: 'sanduku jeusi',
			input: 'pembejeo',
			output: 'matokeo',
			box: 'BOX',
			environment: 'mazingira',
			api: 'API',
			interface: 'kiunganishi',
			netDeclared: 'NET · imetangazwa kwenye vipimo',
			nowhereElse: 'na hakuna mahali pengine',
			itsNodeItsParent: 'nodi yake · mzazi wake',
			aService: 'huduma moja',
			children: 'watoto',
			whatTheySpend: 'wanachotumia, si walipo',
			developersShort: 'wasanidi · kinachohitajika',
			developersLong: 'wasanidi · kinachohitajika, kinachotumika',
			operatorsShort: 'waendeshaji · panapoendeshwa',
			operatorsLong: 'waendeshaji · panapoendeshwa, gharama yake',
			thisNode: 'nodi hii',
			aPeer: 'mwenzake',
			cost: 'gharama {value}',
			oneInput: 'pembejeo moja',
			when: ['sasa', 'baada ya mwaka mmoja', 'kwenye maunzi mengine'],
			identicalEveryTime: 'inafanana, kila wakati',
			reputationLedger: 'sifa njema · rekodi kwenye kitabu cha hesabu',
			sourcesYouTrust: 'vyanzo unavyoviamini',
			firstWhatSources: 'kwanza: vyanzo vyangu vinasemaje kuhusu hilo?',
			rightShort: '2 vCPU · dakika 30',
			rightLong: 'haki ya 2 vCPU · dakika 30',
			paymentRights: 'malipo ⇄ haki juu ya rasilimali',
			outcomeRecorded: 'matokeo yanaingia kwenye rekodi yake',
			nextStranger: 'na hicho ndicho mgeni ajaye atakachosoma',
			requester: 'anayeomba',
			node: 'nodi'
		},
		developers: {
			box: 'BOX',
			api: 'API',
			net: 'NET',
			service: 'huduma',
			anyCompatibleNode: 'nodi yoyote inayolingana',
			optionalRegistry: 'orodha ya usajili ya sifa njema ya hiari',
			yourService: 'huduma yako',
			itsNode: 'nodi yake',
			neverFindOut: 'huji kujua kamwe mahali'
		},
		users: {
			you: 'wewe',
			noAccount: 'hakuna akaunti',
			whatYouAsked: 'ulichoomba',
			whatNodeRuns: 'kinachoendeshwa na nodi',
			identicalItRuns: 'inafanana — inaendeshwa',
			microvm: 'microVM',
			destroyed: 'imeharibiwa',
			theDeveloper: 'msanidi',
			theHostMachine: 'mashine mwenyeji',
			computeUsed: 'uchakataji ulioutumia kikweli',
			whatYouPay: 'unacholipia',
			chargingStops: 'kazi inakamilika — malipo yanasimama',
			subscription: 'usajili, unaotoza bila kujali hilo'
		},
		depin: {
			electricityCost: 'gharama yako ya umeme',
			priceYouSet: 'bei uliyoiweka',
			availableWindow: 'inapatikana 22:00 – 07:00',
			marginCovered: 'faida iliyofunikwa'
		}
	}
};

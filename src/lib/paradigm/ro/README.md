# *Celaut*: o arhitectură peer-to-peer pentru proiectarea și distribuirea software-ului

<br>

**Context**

În anii 1940, matematicianul John von Neumann, în colaborare cu Stanislaw Ulam, a introdus conceptul de automat celular, creând modele care arătau cum pot emerge comportamente complexe din reguli simple. Pornind de la această bază, în 1970 John Horton Conway a prezentat „Jocul vieții”, un automat celular care a devenit exemplul clasic al felului în care un sistem poate evolua spre tipare complicate pornind de la interacțiuni elementare. Aceste idei oferă perspective valoroase asupra modului în care sistemele descentralizate pot atinge complexitate fără control central, ceea ce servește drept filosofie călăuzitoare pentru proiectarea *Celaut*.

**Definiție**

*Celaut* este un set de reguli simple pentru proiectarea și distribuirea software-ului, având ca scop crearea unui sistem robust, scalabil și adaptiv prin principiile **descentralizării**, **simplității** și **determinismului**.

**Principii**

1. **Descentralizare**: niciun punct unic de control sau de eșec, ceea ce permite nodurilor să comunice și să se coordoneze dinamic.
2. **Simplitate**: reguli minimaliste care reduc complexitatea, asigurând că fiecare componentă poate fi înțeleasă și întreținută cu ușurință.
3. **Determinism**: serviciile se comportă previzibil, urmând reguli definite care asigură reproductibilitatea rezultatelor pe noduri diferite.

**Arhitectura *Celaut*: noduri și servicii**

Arhitectura *Celaut* este construită în jurul a două elemente esențiale: **nodurile** și **serviciile**. Împreună, ele creează o rețea distribuită în care fiecare parte contribuie la funcționalitatea de ansamblu, întocmai ca agenții dintr-un automat celular.

- **Noduri**:
    Un nod reprezintă un calculator sau un dispozitiv din rețeaua *Celaut* care poate comunica cu alte noduri și poate gestiona execuția serviciilor. Natura descentralizată a *Celaut* se întruchipează în felul în care nodurile interacționează, asigurând absența oricărui punct unic de eșec sau control centralizat. Responsabilitățile-cheie ale unui nod includ:

    1. **Execuția serviciilor**: nodurile gestionează instanțele de servicii, hotărând dacă le rulează local sau distribuie sarcina către nodurile semene. Astfel se asigură o utilizare optimă a resurselor și o performanță bună, la fel cum celulele dintr-un automat celular interacționează cu vecinii lor pentru a menține echilibrul sistemului.

    2. **Interfața de comunicare**: o interfață robustă asigură un schimb de date fără sincope între noduri și servicii, permițând o coordonare eficientă. Notabil, nodurile nu trebuie să convină dinainte asupra unui protocol de comunicare anume, întrucât interfața abstractizează aceste detalii și lasă flexibilitate în interacțiuni. Această trăsătură este explicată mai pe larg mai jos.

    3. **Furnizarea de adrese și jetoane**: nodurile facilitează interacțiuni sigure prin gestionarea adreselor de comunicare și a jetoanelor de autentificare, făcând serviciile ușor accesibile și păstrând totodată securitatea.

    4. **Gestionarea dependențelor**: nodurile se asigură că serviciile au acces la dependențele de care au nevoie. Aceste dependențe, numite adesea „servicii-copil”, pot rula pe același nod sau pe unul diferit. Această trăsătură permite unui serviciu-părinte să acceseze și să se coordoneze cu serviciile sale copil, asigurând un ecosistem de servicii fluid și eficient, chiar și atunci când serviciile sunt distribuite prin rețea.

    Un exemplu de implementare a unui nod folosind Python3 și Rust este **Nodo** [aici](https://github.com/*Celaut*-project/nodo).

- **Servicii**:
    Un serviciu în *Celaut* este un container software determinist, proiectat să îndeplinească o sarcină anume. Urmând principiul **cutiei negre**, serviciile funcționează independent de detaliile nodurilor care le execută, concentrându-se exclusiv pe funcționalitatea lor. Aspectele-cheie ale serviciilor includ:

    - **Execuția ca instanțe izolate**: când un utilizator cere un serviciu, acesta este trimis unui nod, care îl rulează ca proces izolat — fie într-un container, fie într-o mașină virtuală, în funcție de arhitectura nodului. Această abstractizare se aliniază principiului **simplității**, întrucât serviciile nu trebuie să cunoască mediul de execuție.

    - **Comportament determinist**: serviciile urmează reguli prestabilite pentru a asigura rezultate consecvente. Acest lucru se aliniază accentului pus de *Celaut* pe **determinism**: la aceleași intrări, un serviciu va produce mereu aceeași ieșire, indiferent ce nod îl execută.

    - **Execuție ierarhică**: o caracteristică aparte a serviciilor din *Celaut* este capacitatea lor de a cere execuția altor servicii (servicii-copil) prin intermediul nodului, ceea ce face posibile fluxuri de lucru complexe. Asta oglindește comportamentele emergente observate la automatele celulare, unde interacțiuni simple pot duce la tipare mai sofisticate.

**Coordonarea stimulentelor: reputație și plăți**

În sisteme descentralizate precum *Celaut*, coordonarea nu ține doar de interacțiunile tehnice — ea presupune și alinierea stimulentelor tuturor participanților, pentru ca sistemul să funcționeze eficient. *Celaut* încorporează două mecanisme-cheie pentru a obține această aliniere:

- **Sisteme de reputație**:
    Fiecare nod și fiecare serviciu își poate construi o reputație pe baza istoricului său de interacțiuni. Nodurile și serviciile sunt stimulate să mențină standarde înalte de fiabilitate și calitate pentru a-și păstra reputația. O reputație solidă încurajează alte noduri și utilizatori să aibă încredere în ele și să interacționeze cu ele, oferind un stimulent natural pentru a se comporta corect și a livra servicii de calitate. Acest mecanism de reputație creează în rețea o formă de autoreglare, în care participanții au un interes direct în a-și păstra bunul renume.

- **Mecanisme de plată**:
    Dincolo de reputație, cooperarea dintre noduri și servicii este facilitată și prin sisteme de plată. Când un nod execută un serviciu sau când serviciile interacționează între ele, se poate schimba o compensație pentru resursele folosite sau pentru sarcinile îndeplinite. Aceste plăți creează un stimulent direct pentru ca nodurile să contribuie cu resurse și pentru ca serviciile să livreze valoare, încurajând colaborarea și schimburile corecte în întreaga rețea. Mecanismele de plată asigură o alocare eficientă a resurselor, permițând nodurilor și serviciilor să funcționeze în acord cu punctele lor forte și cu capacitățile lor.

Aceste mecanisme sunt descrise mai detaliat mai încolo și oferă cadrul economic care asigură viabilitatea abordării descentralizate a *Celaut*. Asemenea felului în care două noduri comunică fără să fie nevoie să convină asupra unui protocol anume, aceste sisteme funcționează independent de arhitectura de bază. Rațiunea din spatele acestei separări și modul în care ea permite flexibilitate și adaptabilitate în interacțiuni sunt explicate mai jos.

**O punte între conceptual și practic**

Proiectarea *Celaut* reflectă principiile de fond ale automatelor celulare: reguli simple la nivel de nod și de serviciu duc la un sistem complex și adaptiv. Descentralizând controlul, simplificând interacțiunile și asigurând un comportament determinist, *Celaut* creează un cadru flexibil pentru distribuirea și automatizarea software-ului. Astfel, serviciile se pot concentra pe funcțiile lor esențiale, în timp ce nodurile se ocupă de orchestrare și distribuire, rezultând un sistem capabil să se adapteze și să scaleze pe măsură ce apar cerințe noi.

**Impactul *Celaut* în lumea reală**

Arhitectura *Celaut* permite iterații și experimentări mai rapide, la fel ca rularea unor simulări într-un mediu controlat. Asta o face deosebit de valoroasă în scenariile în care implementarea și testarea rapidă a unor metode noi sunt esențiale. Cu posibilitățile oferite de calculul modern, *Celaut* poate valorifica aceste principii pentru a simula sisteme complexe în moduri de neimaginat până acum, deschizând căi noi de a îmbunătăți eficiența și performanța în diverse industrii.

Această arhitectură permite serviciilor să se concentreze pe funcționalitatea lor, fără să-și facă griji pentru infrastructura de dedesubt. La rândul lor, nodurile pot gestiona eficient execuția instanțelor, fără să-și facă griji pentru utilitatea lor.

<br>


## Cum se specifică un serviciu?

Specificația unui serviciu în *Celaut* este alcătuită din trei componente principale:

### Container | *BOX*
Componenta **BOX** definește mediul în care va rula serviciul, asigurând consecvența modului în care serviciul este executat pe noduri diferite. Spre deosebire de alte metode de containerizare, BOX-ul din *Celaut* nu se bazează pe imagini sau depozite externe; în schimb, specifică direct întreaga structură de fișiere necesară execuției serviciului. Include următoarele detalii:

- **Arhitectură**: precizează microarhitectura hardware-ului pe care se intenționează să ruleze serviciul, asigurând compatibilitatea între serviciu și nodul care îl execută.

- **Sistem de fișiere**: sistemul de fișiere este o descriere cuprinzătoare a structurii de fișiere a serviciului, care înglobează toate fișierele și directoarele necesare funcționării lui. Aici intră binarele, bibliotecile, fișierele de configurare și orice alte resurse necesare.
    - **Item Branches** definesc structura sistemului de fișiere, fiecare ramură reprezentând un fișier, o legătură simbolică sau o structură de directoare imbricată.
    - Această abordare permite ca întregul mediu să fie autonom, reducând dependența de depozitele terțe și menținând **determinismul**, întrucât mediul de execuție al serviciului rămâne același indiferent de nodul gazdă.

- **Variabile de mediu**: precizează perechi cheie-valoare pe care serviciul le poate accesa în timpul rulării, permițând o configurare dinamică fără a modifica structura de fișiere de bază.

- **Punct de intrare**: definește scriptul sau comanda care pornește procesul principal al serviciului la execuție. Astfel, nodul știe cum să pornească serviciul corect.

- **Config**: cuprinde căile și formatele de configurare pe care nodul trebuie să le încarce când pornește serviciul. Oferă informațiile necesare, precum alocările inițiale de resurse sau anumiți parametri de rulare.

- **Gateway așteptat**: descrie cum comunică serviciul cu nodul *Celaut*, precizând protocoalele și metodele (protocolul de aplicație al gateway-ului) pe care le așteaptă de la nod. Această componentă asigură o comunicare fără sincope între serviciu și mediul care îl găzduiește, tratând nodul ca pe un sistem de operare ce oferă interacțiuni la nivel de sistem.

Specificația BOX face ca serviciile *Celaut* să fie portabile, reproductibile și lipsite de dependențe externe, în acord cu principiile **simplității** și **determinismului**.

### Interfață | *API*
*API* (Application Programming Interface) în Celaut este ansamblul de reguli și specificații care definesc modul în care clienții și alte servicii pot interacționa cu un serviciu din ecosistem. Scopul său principal este să stabilească o metodă clară și consecventă prin care diferite componente software comunică între ele, asigurând că serviciile sunt accesibile și utilizabile într-un mod previzibil.

Prin *API* se definesc protocoalele de comunicare și punctele finale prin care un serviciu primește și procesează cereri. Astfel, orice entitate externă, fie ea un utilizator sau un alt serviciu, se poate integra cu serviciul urmând un set standardizat de instrucțiuni, fără să fie nevoie să înțeleagă funcționarea lui internă.

Un aspect fundamental al *API*-ului în Celaut este rolul său în descentralizare. Oferind o interfață bine definită, serviciile pot funcționa autonom, fără să depindă de un controlor centralizat care să gestioneze interacțiunile. Asta face sistemul mai scalabil și mai rezilient, întrucât fiecare serviciu este autosuficient în capacitatea sa de a comunica și de a colabora cu celelalte componente ale ecosistemului.

Specificația *API* permite ca serviciile să fie ușor accesate și folosite de clienți, păstrând totodată o metodă consecventă de interacțiune. Ea susține principiul **descentralizării** din *Celaut*, lăsând serviciile autosuficiente în comunicarea lor, fără să fie nevoie să se sprijine pe un controlor centralizat pentru negocierea protocolului.

### Rețea | *NET*
Componenta **NET** definește domeniul de acces la rețele externe pe care un serviciu îl poate cere și cu care poate interacționa. Implicit, un serviciu este izolat de rețelele externe, putând comunica doar cu serviciul său părinte (clientul care l-a creat), cu serviciile sale copil și cu nodul *Celaut* care îl execută. Această izolare asigură **determinismul** și sporește **securitatea**, împiedicând scurgerile de date sau interacțiunile neautorizate.

Totuși, unele servicii au nevoie de acces la rețele externe pentru a funcționa. De exemplu, un serviciu care se comportă ca un nod Bitcoin trebuie să interacționeze cu rețeaua Bitcoin mai largă. Pentru a face asta posibil fără a compromite securitatea, *Celaut* permite următoarele:

- **Acces extern controlat**: serviciul nu accesează direct adrese IP sau noduri externe. În schimb, trimite o cerere nodului său *Celaut*, precizând nevoia de acces la o anumită rețea (de exemplu „bitcoin-mainnet”). Nodul *Celaut* verifică apoi și furnizează o listă de noduri semene de încredere cu care serviciul poate interacționa.

- **Cererea serviciului pentru semeni de rețea**: un serviciu precum un nod Bitcoin poate cere resurse suplimentare sau semeni de rețea comunicând cu nodul său *Celaut*. De exemplu, ar putea cere: „Am nevoie de semeni din «bitcoin-mainnet».” Nodul evaluează această cerere și returnează o listă de instanțe verificate (care pot fi alte noduri Bitcoin ce rulează ca servicii în rețeaua *Celaut*).

- **Conștientizare și redirecționare de către nod**: dacă nodul *Celaut* care a primit cererea serviciului știe că nu poate găsi semeni potriviți (de exemplu, nu are alte noduri Bitcoin în rețeaua sa), va căuta un nod *Celaut* semen care poate îndeplini această cerință. Astfel, serviciile pot găsi întotdeauna conexiunile de rețea necesare, chiar dacă nodul *Celaut* inițial este limitat.

Componenta **NET** permite *Celaut* să echilibreze nevoia de conectivitate externă cu valorile sale de bază, **securitatea** și **determinismul**, asigurând că serviciile rămân izolate dacă nu li se permite explicit accesul la rețele mai largi.

<br><br>

Specificația unui serviciu este o parte esențială a arhitecturii *Celaut*, întrucât permite ca serviciile să fie implementate și executate într-un mod consecvent și previzibil.

<br>

Nodul va încărca serviciul din binar și îi va pune la dispoziție resursele de care are nevoie ca să ruleze.

Nu există un singur mod de a defini un serviciu.
De exemplu, [implementarea Proto3](https://github.com/*Celaut*-project/service-lib/blob/master/node-driver/src/node_driver/gateway/protos/*Celaut*.proto#L66) este una dintre multele variante posibile.

<br>

Nu toate nodurile vor accepta toate variantele posibile ale unei specificații de serviciu.

>De exemplu, nodul A înțelege o anumită specificație proto3 și una în JSON. Un alt nod, B, înțelege specificația JSON și încă una, în JSON+sistem de fișiere zip. Ambele noduri pot transmite servicii în specificația pe care o au în comun, în acest caz JSON.

<br>

## Diferite tipuri de roluri ale utilizatorilor în sistem

Ca utilizatori, putem juca trei tipuri de roluri:

- Operator de nod (similar cuiva care întreține un miner într-un blockchain).
- Dezvoltator de servicii. Acestea pot fi rulate de oricine pe orice nod (orice nod compatibil, din punctul de vedere al arhitecturii etc.).
- Utilizatori care lansează servicii pe noduri.

Prin urmare, persoana care întreține un nod (utilizator de tip 1) nu se preocupă dacă se minează PoW, dacă rulează un bot de tranzacționare, dacă se analizează o secvență ADN sau orice altceva ar face serviciile pe care le rulează. Ea pur și simplu execută serviciile pe care le cer utilizatorii de tip 3, în schimbul unei dovezi de plată (pe un blockchain sau prin orice metodă de plată acceptată). Dezvoltatorul (utilizator de tip 2) trebuie doar să îl trimită unuia sau mai multor noduri, iar acestea se vor ocupa de distribuirea serviciului către altele și/sau de încărcarea lui într-un sistem de reputație, astfel încât utilizatorii (sau alte servicii) să știe dacă să îl folosească și când și de ce.

>Aceasta este o viziune simplă asupra sistemului; introducând mai multă complexitate, ar putea crește și numărul rolurilor posibile ale utilizatorilor.

<br>


## Pe urmele naturii în ecosistemele digitale

Imaginează-ți *Celaut* ca pe un ecosistem digital, care oglindește dinamica unui ecosistem biologic din natură. În această analogie:

1. Nodurile ca organisme: nodurile din *Celaut* pot fi asemuite organismelor dintr-un ecosistem natural. Fiecare nod reprezintă o entitate distinctă, cu propriile capacități și funcții, întocmai ca speciile diferite care ocupă nișe variate în mediu. Aceste noduri interacționează între ele, formând o rețea asemănătoare pânzei interconectate a vieții din ecosisteme.

2. Serviciile ca funcții biologice: serviciile din *Celaut* sunt analoge funcțiilor sau proceselor biologice întâlnite la organisme. Fiecare serviciu îndeplinește o sarcină anume, la fel cum organele organismelor vii îndeplinesc funcții specializate. Așa cum organele lucrează armonios împreună pentru a susține viața, serviciile colaborează în interiorul nodurilor pentru a acoperi nevoi de calcul diverse.

3. Descentralizarea ca diversitate: principiul descentralizării din *Celaut* poate fi echivalat cu biodiversitatea din ecosistemele naturale. În natură, biodiversitatea asigură reziliență și adaptabilitate, întrucât specii diverse contribuie la stabilitatea și funcționalitatea ecosistemului. Similar, descentralizarea din *Celaut* atenuează riscurile asociate punctelor unice de eșec și sporește capacitatea sistemului de a se adapta la condiții în schimbare.

4. Eficiența ca optimizare a energiei: eficiența din *Celaut* oglindește optimizarea energetică observată în sistemele naturale. În ecosistemele biologice, energia curge prin rețelele trofice, organismele optimizându-și consumul de energie pentru a maximiza supraviețuirea și reproducerea. La fel, *Celaut* optimizează resursele de calcul, distribuind sarcinile între noduri pentru a reduce latența și risipa de resurse.

5. Simplitatea și determinismul ca legi ale naturii: principiile simplității și determinismului din *Celaut* rezonează cu legile de fond care guvernează sistemele naturale. Așa cum legile fizicii dictează comportamentul materiei și al energiei în univers, regulile simple ale *Celaut* guvernează interacțiunile dintre noduri și servicii. Acest cadru determinist asigură consecvență și predictibilitate, analog predictibilității fenomenelor naturale guvernate de legi fundamentale.

<br>


## Sisteme de încredere

În *Celaut*, diferitele părți ale sistemului, nodurile și serviciile, nu au încredere unele în altele; prin urmare, este un sistem trustless. De aceea este puțin probabil ca un nod să execute servicii gratuit sau ca un serviciu să funcționeze fără a se face o plată într-un contract și fără a primi dovada ei (deși, evident, o pot face dacă vor; în cazul serviciilor este fezabil economic, întrucât au un cost marginal zero).
<br>Totuși, pentru a permite interacțiunea între aceste părți fără încredere între ele, sunt necesare contracte, contracte sociale (într-o societate de noduri și servicii), care să transmită valoare și să atribuie reputație fiecărei părți. Așadar, avem două tipuri de sisteme (dintr-un punct de vedere relativ abstract): sisteme de plată și sisteme de reputație.

> O strategie posibilă pentru un nod este să ofere la început execuția serviciilor fără schimb de valoare, ca să-și crească reputația, iar când are reputație din partea celorlalți, să înceapă să-și mărească costul.

> Spre deosebire de noduri, natura serviciilor este să aibă cost marginal zero; asta înseamnă că nu există o limită a numărului de unități rulate simultan (întrucât costul rulării lor cade în sarcina nodurilor), așa că este destul de probabil ca multe servicii să pornească cu cost zero pentru a câștiga reputație, să ceară un cost când au reputație și rămân competitive, și să revină la cost zero când încetează să mai fie competitive.


### Sisteme de plată

Sistemele de plată permit transferul de valoare între entitățile din *Celaut*. Iată câteva tipuri posibile:

#### Contracte inteligente de licență

Un sistem de contracte care permite emiterea de licențe de utilizare pentru servicii și noduri, unde Ledger-ul este rețeaua în care se convine asupra adevărului. Astfel, dacă A vrea să execute o metodă a lui B, îi va verifica contractul, va executa comanda definită (conectându-se la Ledger), iar contractul din Ledger va emite o licență, pe care A i-o va trimite lui B pentru a-i permite să execute metoda dorită.

Există patru tipuri distincte de licențe, pe baza a două clasificări diferite. Pe de o parte, dacă licența este elastică sau statică, iar pe de altă parte, dacă este interactivă sau neinteractivă.

- **Licențele elastice** sunt cele care permit restricționarea utilizării lor pe baza anumitor parametri (număr de cereri, timp, metode, variabile de mediu etc.).

- **Licențele statice** sunt cele care nu restricționează utilizarea. B cunoaște cheile licenței, iar contractul furnizează licența fără a putea limita folosirea ei.

- **Licențele interactive** cer ca B să se conecteze la Ledger pentru a verifica valabilitatea licenței furnizate.

- Licențele **neinteractive** nu cer ca B să se conecteze la Ledger pentru a verifica valabilitatea licenței furnizate.

<br>

De aici rezultă cele patru tipuri de licențe:

- Statică interactivă (foarte simplă — nu prea utilă)
- Statică neinteractivă (mai potrivită pentru servicii)
- Elastică interactivă (mai potrivită pentru noduri)
- Elastică neinteractivă (destul de complexă — versatilă)

<br>

> Ledger-ele pot fi rețele publice și fără permisiuni, precum Bitcoin sau Ergo, ori platforme private și închise, precum Stripe. Singura cerință este ca toți participanții să le susțină.

<br>


### Sisteme de reputație

Sistemele de reputație permit utilizatorilor, nodurilor și serviciilor să creeze un ecosistem social pe baza căruia să ia decizii. Nodurile au nevoie să știe în care semeni pot avea încredere atunci când cer execuția unor servicii.
Pentru utilizatorii care execută servicii, sistemul îi ajută să determine care servicii vor funcționa cel mai bine pentru sarcina pe care vor să o îndeplinească.

În *Celaut*, reputația este reprezentată ca înregistrări pe Ledger-e, care exprimă o opinie.

În cazul serviciilor, natura lor deterministă oferă asupra reputației lor o perspectivă diferită față de noduri.
O dovadă de reputație (o înregistrare) publicată cu ceva timp în urmă poate avea aceeași valoare ca una actuală în privința unui serviciu (acest lucru este valabil atâta vreme cât serviciul nu interacționează cu rețele, ceea ce este forma implicită a unui serviciu, complet izolat).
Dacă totuși interacționează cu vreo rețea, reputația lui poate depinde de reputația rețelelor la care se conectează, iar aceasta nu are acea proprietate deterministă, întrucât se poate schimba în timp. Asta pentru că serviciul în sine nu s-a schimbat.

În schimb, reputația unui nod este cu atât mai valoroasă cu cât este mai recentă, întrucât comportamentul lui poate varia în timp.
Când nodurile se prezintă unele altora, arată dovezi ale reputației lor, iar celelalte pot opina, fără a fi nevoie de consens, dacă sunt mai mult sau mai puțin demne de încredere.

Fiecare nod, serviciu sau alt tip de actor dintr-un sistem de reputație are încredere în diverse surse în măsuri diferite, iar acele surse, la rândul lor, au încredere în alte surse, noduri, servicii sau entități în măsuri diferite. Astfel, când un anumit actor se confruntă cu o entitate necunoscută, va verifica opiniile surselor în care are încredere.

Pentru o înțelegere mai concretă a felului în care funcționează un sistem de reputație, poți citi: [Documentația Sigma Reputation Panel](https://github.com/reputation-systems/sigma-reputation-panel/blob/master/README.md)

<br>


## De ce este necesar acest lucru

Ceea ce *Celaut* își propune să rezolve este tocmai separarea dintre „*cum se rezolvă o problemă*” și „*unde și cine o rezolvă*”.

Ia, de exemplu, un bot de tranzacționare.

>Boții de tranzacționare sunt programe software automate care execută ordine de cumpărare și vânzare pe piețele financiare, pe baza unor algoritmi predefiniți. Sunt importanți fiindcă pot funcționa non-stop, pot reacționa rapid la schimbările pieței și elimină prejudecățile emoționale, sporind eficiența și consecvența strategiilor de tranzacționare.


<br>

În acest context, dacă vrei să folosești un bot de tranzacționare chiar acum, vei intra pe internet și poți:

1. Să cauți un serviciu web care să-ți administreze portofoliul de active, care are:
    1. Avantaje:
        1. Nu trebuie să rulezi tu însuți infrastructura.
        2. Nu trebuie să configurezi nimic.
    2. Dezavantaje:
        1. Nu îi poți atribui reputație, fiindcă dezvoltatorul serviciului
        web nu poate dovedi că sistemul nu s-a schimbat (de exemplu,
        când un bot a strâns un număr mare de utilizatori, ar putea să-i reducă
        performanța ca să te împingă spre unul mai nou).
        2. Dezvoltatorii serviciului web nu îți pot garanta că nu
        folosesc abuziv datele din cererile tale (în acest caz,
        mișcările din portofoliul tău).
2. Să cauți un cod sursă (pe GitHub etc.) pe care să-l rulezi singur pe PC-ul tău (sau în cloud).
    1. Avantaje:
        1. Este determinist, în sensul că (dacă nu se poate conecta la
        internet) vei fi sigur că nici comportamentul, nici performanța lui nu se vor schimba în viitor, fiindcă dezvoltatorul nu poate modifica sursa pe care ai descărcat-o anterior.
        2. Dezvoltatorul serviciului nu are niciun control asupra datelor din cererile tale.
    2. Dezavantaje:
        1. Ai nevoie de echipament (infrastructură) capabil să ruleze codul.
        2. Trebuie să te descurci cu problemele de configurare a sistemului (care sunt adesea
        suficient de serioase încât un utilizator obișnuit să opteze pentru un serviciu web).

În contrapondere la aceste două opțiuni, *Celaut* permite preluarea avantajelor celor două soluții anterioare fără dezavantajele lor. Iată de ce:



- Gestionarea infrastructurii nu este necesară, întrucât de ea se ocupă nodurile. Nu e nevoie să cauți un furnizor de cloud.

- Nu este necesară nicio configurare. Specificația serviciului acoperă modul în care este construit containerul, arhitectura lui, cerințele lui de rețea și interfața lui. Utilizatorii nu trebuie să se preocupe de niciuna dintre acestea.

- Dezvoltatorii de servicii nu pot controla, modifica sau extrage date din serviciu. Ei nu controlează nodurile care îl distribuie și îl rulează. Cu toate acestea, pot fi stimulați să îl creeze.

<br>


## Comportamentul sistemului

Această secțiune descrie comportamentul sistemului, care include interacțiunile dintre părțile lui,
pentru a arăta cu mai mare claritate natura arhitecturii.

- [Execuția unui serviciu](execution_of_a_service.md)
- [Echilibrarea încărcării serviciilor](service_balancer.md)
- [Handshake între noduri]()

[*<-- Înapoi la pagina principală*](README.md#system-behavior)

### Diagrama de secvență a unui proces de echilibrare a serviciilor

Când un nod primește o cerere de instanțiere a unui serviciu, tot nodul este cel care decide pe care nod din rețea ar trebui instanțiat serviciul — local sau pe un alt nod. Pentru asta compară costul rulării instanței la fiecare dintre semenii săi cu costul rulării ei local și îl alege pe cel pe care îl consideră cel mai bun (de exemplu, cel mai mic).

Când clienții (alți semeni) îl întreabă care este costul său pentru a executa un serviciu, le va da costul rulării acestuia local sau pe unul dintre semenii săi.

<br>

În următoarea diagramă de secvență (figura 4c0) este expus procesul de echilibrare a încărcării pentru execuția noilor instanțe de serviciu. Se presupune că un serviciu a primit cererea de a executa instanța unui serviciu.

![Diagramă a echilibratorului de servicii](assets/4c0f64_service_balance_diagram.excalidraw.svg) *Figura 4c0: diagrama de echilibrare a serviciilor*

<br>

Participanții din diagrama de secvență de mai sus (figura 4c0) sunt următorii:

- Nodul A este nodul care cere costul și generarea noii instanțe a unui serviciu.
- Nodul B este un alt nod din rețea.

Pe parcursul secvenței au loc următoarele interacțiuni:

1. Nodul A cere fiecăruia dintre semenii săi din rețea costul execuției unei instanțe a serviciului. Folosește metoda de obținere a costului conform interfeței fiecărui semen.

2. Nodul B calculează costul rulării serviciului local.

3. Nodul A calculează costul rulării serviciului local și îl compară cu costurile primite. În acest caz, decide că cel mai mic cost este cel al Nodului B.

4. Nodul A îi cere Nodului B să execute o instanță a serviciului, îi trimite specificația acestuia și așteaptă să îi returneze adresa și jetonul.

5. Nodul B execută instanța serviciului pe care i-o predă Nodul A, salvează instanța în registrul său considerând că părintele este Nodul A și returnează adresa și jetonul acesteia.

6. Nodul A primește adresa și jetonul de la Nodul B și salvează instanța în registru ca instanță externă.

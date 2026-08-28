[*<-- Zurück zur Hauptseite*](README.md#system-behavior)

### Sequenzdiagramm eines Service-Balancing-Vorgangs

Wenn ein Node eine Anfrage zur Instanziierung eines Service erhält, entscheidet der Node selbst, auf welchem Node im Netzwerk sie instanziiert werden soll — lokal oder auf einem anderen Node. Dazu vergleicht er die Kosten der Ausführung der Instanz bei jedem seiner Peers mit den Kosten einer lokalen Ausführung und wählt die Variante, die er für die beste hält (zum Beispiel die günstigere).

Wenn Clients (andere Peers) ihn nach seinen Kosten für die Ausführung eines Service fragen, nennt er ihnen die Kosten der Ausführung entweder lokal oder auf einem seiner Peers.

<br>

Im folgenden Sequenzdiagramm (Abbildung 4c0) wird der Lastverteilungsvorgang für die Ausführung neuer Service-Instanzen dargestellt. Es wird angenommen, dass ein Service die Anfrage erhalten hat, die Instanz eines Service auszuführen.

![Service-Balancer-Diagramm](assets/4c0f64_service_balance_diagram.excalidraw.svg) *Abbildung 4c0: Service-Balancing-Diagramm*

<br>

Die Beteiligten im vorstehenden Sequenzdiagramm (Abbildung 4c0) sind die folgenden:

- Node A ist der Node, der die Kosten und die Erzeugung der neuen Instanz eines Service anfragt.
- Node B ist ein weiterer Node im Netzwerk.

Während des Ablaufs finden die folgenden Interaktionen statt:

1. Node A fragt bei jedem seiner Peers im Netzwerk die Kosten für die Ausführung einer Instanz des Service ab. Dabei nutzt er die Methode zur Kostenabfrage gemäß der Schnittstelle des jeweiligen Peers.

2. Node B berechnet die Kosten, den Service lokal auszuführen.

3. Node A berechnet die Kosten der lokalen Ausführung des Service und vergleicht sie mit den erhaltenen Kosten. In diesem Fall entscheidet er, dass die niedrigsten Kosten die von Node B sind.

4. Node A bittet Node B, eine Instanz des Service auszuführen, schickt ihm dazu deren Spezifikation und wartet darauf, dass er Adresse und Token zurückgibt.

5. Node B führt die Instanz des Service aus, die Node A ihm übergibt, speichert die Instanz in seinem Register mit Node A als Elternteil und gibt ihre Adresse und ihr Token zurück.

6. Node A erhält Adresse und Token von Node B und speichert die Instanz als externe Instanz im Register.

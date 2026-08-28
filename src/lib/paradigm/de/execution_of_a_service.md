[*<-- Zurück zur Hauptseite*](README.md#system-behavior)


### Sequenzdiagramm der Ausführung einer Service-Instanz

![Anwendungsfalldiagramm](assets/e29d99_service_execution_diagram.excalidraw.svg)*__Abbildung e29__: Sequenzdiagramm der Ausführung einer Service-Instanz*

<br>

Die Beteiligten im vorstehenden Sequenzdiagramm (Abbildung e29) sind die folgenden:

- Haupt-Service: Das ist die Service-Instanz, die auf ihrem Node die Instanziierung eines weiteren Service anfordert.

- Node: Das ist der Node, den der Haupt-Service um die Erzeugung der neuen Instanz bittet.

- Abhängigkeit: Das ist die neue Instanz, die der Haupt-Service benutzen wollte.

<br>

Während des Ablaufs finden die folgenden Interaktionen statt:

1. Die Instanz des Haupt-Service schickt die Spezifikation eines weiteren Service über die Methode *StartService()* an ihren Node. Dabei wird davon ausgegangen, dass der Node sich um die Ausführung einer Instanz dieses Service kümmert und die Adresse der neuen Instanz sowie das zugehörige Token zurückgibt.

2. Nachdem der Node die Anfrage des Haupt-Service erhalten hat, speichert er die vollständige Spezifikation oder — falls sie bereits gespeichert ist — bricht er den Anfrage-Stream ab (um nur den Hash des angeforderten Service zu übernehmen).

3. Der Node instanziiert den angeforderten Service, lädt die Konfiguration (die Datei *__config__* in seinem Wurzelverzeichnis) und führt seinen Entrypoint aus.

4. Die Abhängigkeit startet mit der Ausführung, die im Entrypoint ihrer Spezifikation beschrieben ist.

5. Der Node ermittelt die Adresse der Container-Instanz und berechnet das entsprechende Token; das Token ist eine geheime Kennung der neuen Service-Instanz und hängt von der Node-Implementierung ab. ~~Der Node speichert die Instanz im Register als interne Instanz und den anfordernden Service als deren Elternteil.~~ Schließlich gibt er Adresse und Token der Instanz an den Haupt-Service zurück.

6. Der Haupt-Service, der die Instanz angefordert hat, nutzt die Abhängigkeit über die Adresse, die der Node ihm bereitgestellt hat.

7. Der Haupt-Service beschließt, die Abhängigkeit zu beenden, und ruft dazu die Methode *StopService()* des Node auf, wobei er ihm das Token der Abhängigkeit sendet.

8. Der Node stoppt den Container der Abhängigkeit und entfernt sie aus dem Register.

>Die Methoden *StartService()* und *StopService()* sind Referenzmethoden, können sich aber zwischen Node-Implementierungen unterscheiden. Die Node-Schnittstelle, über die Clients und lokale Services (Services, die den Node ausführen) Anfragen stellen und Ressourcen und Abhängigkeiten steuern, wird vom Node neuen Clients oder lokalen Services bereitgestellt.

>Die Datei *__config__* gibt die Konfiguration jedes Service an (Umgebungsvariablen, Node-Schnittstelle usw.). Diese hängt vom jeweiligen Service ab, da ihr Schema in dessen Spezifikation angegeben ist. Der Node kann die Fähigkeit haben, in einem oder mehreren Schemata zu schreiben; ist er nicht kompatibel, kann er entweder entscheiden, den Service nicht zu instanziieren, oder einen Übersetzungsservice einsetzen.

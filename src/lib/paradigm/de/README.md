# *Celaut*: Eine Peer-to-Peer-Architektur für Softwareentwurf und -verteilung

<br>

**Kontext**

In den 1940er-Jahren führte der Mathematiker John von Neumann, gemeinsam mit Stanislaw Ulam, das Konzept der zellulären Automaten ein und schuf Modelle, die zeigten, wie komplexe Verhaltensweisen aus einfachen Regeln entstehen können. Darauf aufbauend stellte John Horton Conway 1970 „Das Spiel des Lebens“ vor, einen zellulären Automaten, der zum klassischen Beispiel dafür wurde, wie sich ein System aus einfachen Interaktionen zu verwickelten Mustern entwickeln kann. Diese Ideen liefern wertvolle Einsichten darüber, wie dezentrale Systeme Komplexität ohne zentrale Steuerung erreichen können — und sie dienen als leitende Philosophie für den Entwurf von *Celaut*.

**Definition**

*Celaut* ist eine Menge einfacher Regeln für Softwareentwurf und -verteilung mit dem Ziel, über die Prinzipien der **Dezentralisierung**, **Einfachheit** und des **Determinismus** ein robustes, skalierbares und anpassungsfähiges System zu schaffen.

**Prinzipien**

1. **Dezentralisierung**: Kein einzelner Kontroll- oder Ausfallpunkt, sodass Nodes dynamisch kommunizieren und sich abstimmen können.
2. **Einfachheit**: Minimalistische Regeln, die Komplexität reduzieren und dafür sorgen, dass jede Komponente leicht verstanden und gepflegt werden kann.
3. **Determinismus**: Services verhalten sich vorhersagbar und folgen festgelegten Regeln, welche die Reproduzierbarkeit der Ergebnisse über verschiedene Nodes hinweg sicherstellen.

**Die Architektur von *Celaut*: Nodes und Services**

Die Architektur von *Celaut* ist um zwei Kernelemente herum gebaut: **Nodes** und **Services**. Gemeinsam bilden sie ein verteiltes Netzwerk, in dem jeder Teil zur Gesamtfunktion beiträgt — ganz ähnlich wie die Akteure in einem zellulären Automaten.

- **Nodes**:
    Ein Node steht für einen Rechner oder ein Gerät innerhalb des *Celaut*-Netzwerks, das mit anderen Nodes kommunizieren und die Ausführung von Services verwalten kann. Die dezentrale Natur von *Celaut* zeigt sich darin, wie Nodes interagieren: Es gibt keinen einzelnen Ausfallpunkt und keine zentrale Steuerung. Zu den Kernaufgaben eines Node gehören:

    1. **Service-Ausführung**: Nodes verwalten Service-Instanzen und entscheiden, ob sie sie lokal ausführen oder die Last auf Peer-Nodes verteilen. Das sichert eine optimale Ressourcennutzung und Leistung, ähnlich wie Zellen in einem zellulären Automaten mit ihren Nachbarn interagieren, um das Gleichgewicht des Systems zu wahren.

    2. **Kommunikationsschnittstelle**: Eine robuste Schnittstelle sorgt für einen reibungslosen Datenaustausch zwischen Nodes und Services und ermöglicht so eine wirksame Abstimmung. Bemerkenswert ist, dass Nodes sich nicht vorab auf ein bestimmtes Kommunikationsprotokoll einigen müssen, da die Schnittstelle diese Details abstrahiert und dadurch Flexibilität in den Interaktionen erlaubt. Dieses Merkmal wird weiter unten ausführlicher erläutert.

    3. **Bereitstellung von Adressen und Tokens**: Nodes ermöglichen sichere Interaktionen, indem sie Kommunikationsadressen und Authentifizierungs-Tokens verwalten, sodass Services leicht erreichbar bleiben und die Sicherheit gewahrt wird.

    4. **Verwaltung von Abhängigkeiten**: Nodes stellen sicher, dass Services Zugriff auf die von ihnen benötigten Abhängigkeiten haben. Diese Abhängigkeiten, oft „Kind-Services“ genannt, können auf demselben oder auf einem anderen Node laufen. So kann ein Eltern-Service auf seine Kind-Services zugreifen und sich mit ihnen abstimmen, was ein reibungsloses und effizientes Service-Ökosystem sichert, selbst wenn die Services über das Netzwerk verteilt sind.

    Ein Implementierungsbeispiel für einen Node mit Python3 und Rust ist **Nodo** [hier](https://github.com/*Celaut*-project/nodo).

- **Services**:
    Ein Service in *Celaut* ist ein deterministischer Software-Container, der für eine bestimmte Aufgabe entworfen wurde. Nach dem **Black-Box**-Prinzip arbeiten Services unabhängig von den Details der Nodes, die sie ausführen, und konzentrieren sich allein auf ihre Funktion. Wesentliche Aspekte von Services sind:

    - **Ausführung als isolierte Instanzen**: Wenn ein Nutzer einen Service anfordert, wird dieser an einen Node geschickt, der ihn als isolierten Prozess ausführt — je nach Architektur des Node in einem Container oder in einer virtuellen Maschine. Diese Abstraktion entspricht dem Prinzip der **Einfachheit**, da Services die Ausführungsumgebung nicht kennen müssen.

    - **Deterministisches Verhalten**: Services folgen vorgegebenen Regeln, um gleichbleibende Ergebnisse zu sichern. Das entspricht der Betonung des **Determinismus** in *Celaut*: Bei gleichen Eingaben erzeugt ein Service stets dieselbe Ausgabe, unabhängig davon, welcher Node ihn ausführt.

    - **Hierarchische Ausführung**: Ein besonderes Merkmal von Services in *Celaut* ist ihre Fähigkeit, über den Node die Ausführung weiterer Services (Kind-Services) anzufordern und so komplexe Arbeitsabläufe zu ermöglichen. Das spiegelt die emergenten Verhaltensweisen zellulärer Automaten wider, bei denen einfache Interaktionen zu anspruchsvolleren Mustern führen können.

**Anreize abstimmen: Reputation und Zahlungen**

In dezentralen Systemen wie *Celaut* geht es bei der Abstimmung nicht nur um technische Interaktionen — es geht auch darum, die Anreize aller Beteiligten so auszurichten, dass das System wirksam funktioniert. *Celaut* verwendet dafür zwei zentrale Mechanismen:

- **Reputationssysteme**:
    Jeder Node und jeder Service kann sich auf Grundlage seiner Interaktionshistorie eine Reputation aufbauen. Nodes und Services haben einen Anreiz, hohe Standards an Zuverlässigkeit und Qualität einzuhalten, um ihre Reputation zu bewahren. Eine starke Reputation bringt andere Nodes und Nutzer dazu, ihnen zu vertrauen und mit ihnen zu interagieren — ein natürlicher Anreiz, sich fair zu verhalten und gute Services zu liefern. Dieser Reputationsmechanismus erzeugt eine Form der Selbstregulierung im Netzwerk, in der die Beteiligten ein eigenes Interesse daran haben, ihren guten Ruf zu erhalten.

- **Zahlungsmechanismen**:
    Über die Reputation hinaus wird die Zusammenarbeit zwischen Nodes und Services auch durch Zahlungssysteme unterstützt. Wenn ein Node einen Service ausführt oder wenn Services miteinander interagieren, kann eine Vergütung für genutzte Ressourcen oder erledigte Aufgaben ausgetauscht werden. Diese Zahlungen schaffen einen unmittelbaren Anreiz für Nodes, Ressourcen beizusteuern, und für Services, Wert zu liefern — sie fördern Zusammenarbeit und faire Austauschbeziehungen im Netzwerk. Zahlungsmechanismen sorgen dafür, dass Ressourcen effizient zugeteilt werden, sodass Nodes und Services entsprechend ihren Stärken und Kapazitäten arbeiten können.

Diese Mechanismen werden später ausführlicher beschrieben; sie bilden den wirtschaftlichen Rahmen, der die Tragfähigkeit des dezentralen Ansatzes von *Celaut* sichert. Ähnlich wie zwei Nodes kommunizieren, ohne sich auf ein bestimmtes Protokoll einigen zu müssen, arbeiten diese Systeme unabhängig von der Kernarchitektur. Die Begründung für diese Trennung und die Art, wie sie Flexibilität und Anpassungsfähigkeit in den Interaktionen ermöglicht, wird weiter unten erläutert.

**Vom Begrifflichen zum Praktischen**

Der Entwurf von *Celaut* spiegelt die zugrunde liegenden Prinzipien zellulärer Automaten wider: Einfache Regeln auf Node- und Service-Ebene führen zu einem komplexen, anpassungsfähigen System. Indem *Celaut* Kontrolle dezentralisiert, Interaktionen vereinfacht und deterministisches Verhalten sichert, schafft es einen flexiblen Rahmen für Softwareverteilung und Automatisierung. So können sich Services auf ihre Kernfunktionen konzentrieren, während Nodes Orchestrierung und Verteilung übernehmen — und es entsteht ein System, das sich anpassen und mitwachsen kann, wenn neue Anforderungen auftauchen.

**Wirkung von *Celaut* in der Praxis**

Die Architektur von *Celaut* ermöglicht schnellere Iteration und Erprobung, ähnlich dem Ausführen von Simulationen in einer kontrollierten Umgebung. Das macht sie besonders wertvoll für Szenarien, in denen die zügige Bereitstellung und Erprobung neuer Verfahren entscheidend ist. Mit den Möglichkeiten moderner Rechentechnik kann *Celaut* diese Prinzipien nutzen, um komplexe Systeme auf Weisen zu simulieren, die zuvor unvorstellbar waren, und so neue Wege zu mehr Effizienz und Leistung in verschiedensten Branchen eröffnen.

Diese Architektur erlaubt es Services, sich auf ihre Funktion zu konzentrieren, ohne sich um die darunterliegende Infrastruktur zu kümmern. Nodes wiederum können die Ausführung von Instanzen effizient verwalten, ohne sich um deren Nützlichkeit zu kümmern.

<br>


## Wie wird ein Service spezifiziert?

Die Spezifikation eines Service in *Celaut* besteht aus drei Hauptbestandteilen:

### Container | *BOX*
Die Komponente **BOX** definiert die Umgebung, in der der Service laufen wird, und sichert so eine gleichbleibende Ausführung über verschiedene Nodes hinweg. Anders als andere Containerisierungsverfahren stützt sich die BOX von *Celaut* nicht auf externe Images oder Repositories; stattdessen gibt sie die gesamte Dateistruktur, die zur Ausführung des Service nötig ist, direkt an. Sie umfasst die folgenden Angaben:

- **Architektur**: Gibt die Mikroarchitektur der Hardware an, auf der der Service laufen soll, und sichert so die Kompatibilität zwischen Service und ausführendem Node.

- **Dateisystem**: Das Dateisystem ist eine vollständige Beschreibung der Dateistruktur des Service und umfasst alle Dateien und Verzeichnisse, die er zum Arbeiten braucht. Dazu gehören Binärdateien, Bibliotheken, Konfigurationsdateien und alle weiteren nötigen Ressourcen.
    - **Item Branches** definieren den Aufbau des Dateisystems, wobei jeder Zweig eine Datei, einen symbolischen Link oder eine verschachtelte Verzeichnisstruktur darstellt.
    - Dieser Ansatz macht die gesamte Umgebung in sich geschlossen, verringert die Abhängigkeit von Drittanbieter-Repositories und wahrt den **Determinismus**, da die Ausführungsumgebung des Service unabhängig vom Wirts-Node dieselbe bleibt.

- **Umgebungsvariablen**: Gibt Schlüssel-Wert-Paare an, auf die der Service zur Laufzeit zugreifen kann, was eine dynamische Konfiguration ohne Änderung der Kern-Dateistruktur erlaubt.

- **Entrypoint**: Definiert das Skript oder den Befehl, der bei der Ausführung den Hauptprozess des Service startet. So weiß der Node, wie er den Service korrekt startet.

- **Config**: Umfasst Konfigurationspfade und -formate, die der Node beim Start des Service laden soll. Sie liefert notwendige Angaben wie anfängliche Ressourcenzuteilungen oder bestimmte Laufzeitparameter.

- **Erwartetes Gateway**: Beschreibt, wie der Service mit dem *Celaut*-Node kommuniziert, und gibt die Protokolle und Methoden (Gateway-App-Protokoll) an, die er vom Node erwartet. Diese Komponente sorgt für eine reibungslose Kommunikation zwischen dem Service und seiner Wirtsumgebung und behandelt den Node wie ein Betriebssystem, das Interaktionen auf Systemebene bereitstellt.

Die BOX-Spezifikation macht *Celaut*-Services portabel, reproduzierbar und frei von Drittabhängigkeiten — im Einklang mit den Prinzipien der **Einfachheit** und des **Determinismus**.

### Schnittstelle | *API*
Die *API* (Application Programming Interface) in Celaut ist die Menge an Regeln und Festlegungen, die bestimmen, wie Clients und andere Services mit einem Service im Ökosystem interagieren können. Ihr Hauptzweck besteht darin, eine klare und einheitliche Methode für die Kommunikation zwischen verschiedenen Softwarekomponenten zu schaffen und sicherzustellen, dass Services auf vorhersagbare Weise erreichbar und nutzbar sind.

Über die *API* werden Kommunikationsprotokolle und Endpunkte definiert, über die ein Service Anfragen entgegennimmt und verarbeitet. Damit kann sich jede externe Instanz — ob Nutzer oder ein anderer Service — anhand eines standardisierten Satzes von Anweisungen einbinden, ohne die interne Funktionsweise verstehen zu müssen.

Ein grundlegender Aspekt der *API* in Celaut ist ihre Rolle für die Dezentralisierung. Durch eine klar definierte Schnittstelle können Services eigenständig arbeiten, ohne auf einen zentralen Controller angewiesen zu sein, der Interaktionen verwaltet. Das macht das System skalierbarer und widerstandsfähiger, da jeder Service selbst dazu in der Lage ist, mit anderen Komponenten des Ökosystems zu kommunizieren und zusammenzuarbeiten.

Die *API*-Spezifikation erlaubt es, Services leicht zugänglich und nutzbar zu machen und dabei eine einheitliche Art der Interaktion zu wahren. Sie unterstützt das Prinzip der **Dezentralisierung** in *Celaut*, indem Services in ihrer Kommunikation selbstgenügsam sind und für die Protokollaushandlung keinen zentralen Controller brauchen.

### Netzwerk | *NET*
Die Komponente **NET** definiert den Umfang des externen Netzwerkzugriffs, den ein Service anfordern und nutzen darf. Standardmäßig ist ein Service von externen Netzen isoliert und kann nur mit seinem Eltern-Service (dem Client, der ihn erzeugt hat), seinen Kind-Services und dem ausführenden *Celaut*-Node kommunizieren. Diese Isolation sichert den **Determinismus** und erhöht die **Sicherheit**, indem sie unerlaubte Datenabflüsse oder Interaktionen verhindert.

Manche Services brauchen jedoch für ihre Funktion Zugang zu externen Netzen. Ein Service, der etwa als Bitcoin-Node arbeitet, muss mit dem größeren Bitcoin-Netzwerk interagieren. Um das zu ermöglichen, ohne die Sicherheit zu untergraben, erlaubt *Celaut* Folgendes:

- **Kontrollierter externer Zugriff**: Der Service greift nicht direkt auf externe IP-Adressen oder Nodes zu. Stattdessen schickt er eine Anfrage an seinen *Celaut*-Node und gibt an, dass er Zugang zu einem bestimmten Netz braucht (z. B. „bitcoin-mainnet“). Der *Celaut*-Node prüft das und stellt eine Liste vertrauenswürdiger Peer-Nodes bereit, mit denen der Service interagieren kann.

- **Service-Anfrage nach Netzwerk-Peers**: Ein Service wie ein Bitcoin-Node kann zusätzliche Ressourcen oder Netzwerk-Peers anfordern, indem er mit seinem *Celaut*-Node kommuniziert. Er könnte etwa anfragen: „Ich brauche Peers aus ‚bitcoin-mainnet‘.“ Der Node bewertet diese Anfrage und liefert eine Liste geprüfter Instanzen zurück (die durchaus andere Bitcoin-Nodes sein können, die als Services im *Celaut*-Netzwerk laufen).

- **Kenntnis und Weiterleitung durch den Node**: Weiß der *Celaut*-Node, der die Service-Anfrage erhalten hat, dass er keine passenden Peers finden kann (z. B. weil es in seinem Netz keine weiteren Bitcoin-Nodes gibt), sucht er nach einem *Celaut*-Peer-Node, der diese Anforderung erfüllen kann. So finden Services stets die nötigen Netzwerkverbindungen, selbst wenn der ursprüngliche *Celaut*-Node begrenzt ist.

Die Komponente **NET** erlaubt es *Celaut*, den Bedarf an externer Anbindung mit den Kernwerten **Sicherheit** und **Determinismus** auszubalancieren und sicherzustellen, dass Services isoliert bleiben, sofern ihnen der Zugang zu größeren Netzen nicht ausdrücklich gestattet ist.

<br><br>

Die Spezifikation eines Service ist ein zentraler Bestandteil der *Celaut*-Architektur, denn sie erlaubt es, Services einheitlich und vorhersagbar bereitzustellen und auszuführen.

<br>

Der Node lädt den Service aus der Binärdatei und stellt ihm die Ressourcen bereit, die er zum Laufen braucht.

Es gibt nicht die eine Art, einen Service zu definieren.
Zum Beispiel ist die [Proto3-Implementierung](https://github.com/*Celaut*-project/service-lib/blob/master/node-driver/src/node_driver/gateway/protos/*Celaut*.proto#L66) eine von vielen möglichen Varianten.

<br>

Nicht alle Nodes werden alle möglichen Varianten einer Service-Spezifikation akzeptieren.

>Node A versteht zum Beispiel eine bestimmte Proto3-Spezifikation und eine in JSON. Ein anderer Node B versteht die JSON-Spezifikation und eine weitere in JSON+ZIP-Dateisystem. Beide Nodes können Services in der Spezifikation übertragen, die sie gemeinsam haben — in diesem Fall JSON.

<br>

## Verschiedene Arten von Nutzerrollen im System

Als Nutzer können wir drei Arten von Rollen einnehmen:

- Node-Betreiber (ähnlich jemandem, der einen Miner in einer Blockchain betreibt).
- Service-Entwickler. Diese Services können von jedem auf jedem Node ausgeführt werden (auf jedem kompatiblen Node, was Architektur usw. angeht).
- Nutzer, die Services auf Nodes starten.

Wer also einen Node betreibt (Nutzer vom Typ 1), kümmert sich nicht darum, ob PoW gemined, ein Trading-Bot betrieben, eine DNA-Sequenz analysiert wird oder was auch immer die Services tun, die auf ihm laufen. Er führt schlicht die Services aus, die Nutzer vom Typ 3 anfordern — im Austausch gegen einen Zahlungsnachweis (auf einer Blockchain oder über welche akzeptierte Zahlungsmethode auch immer). Der Entwickler (Nutzer vom Typ 2) muss den Service nur an einen oder mehrere Nodes schicken, und diese kümmern sich darum, ihn unter anderen zu verteilen und/oder in ein Reputationssystem hochzuladen, damit Nutzer (oder andere Services) wissen, ob sie ihn nutzen sollten und wann und warum.

>Das ist eine einfache Sicht auf das System; mit mehr Komplexität könnte auch die Zahl der möglichen Nutzerrollen wachsen.

<br>


## Auf den Spuren der Natur in digitalen Ökosystemen

Stell dir *Celaut* als digitales Ökosystem vor, das die Dynamik eines biologischen Ökosystems in der Natur widerspiegelt. In dieser Analogie:

1. Nodes als Organismen: Nodes in *Celaut* lassen sich mit Organismen in einem natürlichen Ökosystem vergleichen. Jeder Node ist eine eigenständige Einheit mit eigenen Fähigkeiten und Funktionen, ähnlich verschiedenen Arten, die unterschiedliche Nischen in der Umwelt besetzen. Diese Nodes interagieren miteinander und bilden ein Netz, das dem verwobenen Geflecht des Lebens in Ökosystemen ähnelt.

2. Services als biologische Funktionen: Services in *Celaut* entsprechen biologischen Funktionen oder Prozessen in Organismen. Jeder Service erfüllt eine bestimmte Aufgabe, so wie Organe in Lebewesen spezialisierte Funktionen übernehmen. Und so, wie Organe harmonisch zusammenwirken, um Leben zu erhalten, arbeiten Services innerhalb von Nodes zusammen, um vielfältige Rechenanforderungen zu erfüllen.

3. Dezentralisierung als Vielfalt: Das Prinzip der Dezentralisierung in *Celaut* lässt sich mit der Biodiversität natürlicher Ökosysteme gleichsetzen. In der Natur sichert Biodiversität Widerstandskraft und Anpassungsfähigkeit, da vielfältige Arten zu Stabilität und Funktion des Ökosystems beitragen. Ebenso mindert Dezentralisierung in *Celaut* die Risiken einzelner Ausfallpunkte und verbessert die Fähigkeit des Systems, sich an veränderte Bedingungen anzupassen.

4. Effizienz als Energieoptimierung: Effizienz in *Celaut* spiegelt die Energieoptimierung wider, die man in natürlichen Systemen beobachtet. In biologischen Ökosystemen fließt Energie durch Nahrungsnetze, wobei Organismen ihren Energieaufwand optimieren, um Überleben und Fortpflanzung zu maximieren. Ebenso optimiert *Celaut* Rechenressourcen und verteilt Aufgaben über Nodes, um Latenz und Ressourcenverschwendung zu minimieren.

5. Einfachheit und Determinismus als Naturgesetze: Die Prinzipien der Einfachheit und des Determinismus in *Celaut* klingen an die Gesetze an, die natürlichen Systemen zugrunde liegen. So wie physikalische Gesetze das Verhalten von Materie und Energie im Universum bestimmen, regeln die einfachen Regeln von *Celaut* die Interaktionen zwischen Nodes und Services. Dieser deterministische Rahmen sichert Konsistenz und Vorhersagbarkeit, analog zur Vorhersagbarkeit natürlicher Phänomene, die grundlegenden Gesetzen folgen.

<br>


## Vertrauenssysteme

In *Celaut* vertrauen die verschiedenen Teile des Systems, Nodes und Services, einander nicht; es ist somit ein trustless System. Deshalb ist es unwahrscheinlich, dass ein Node Services kostenlos ausführt oder dass ein Service arbeitet, ohne dass eine Zahlung in einem Vertrag geleistet und ein Nachweis darüber empfangen wurde (auch wenn sie das natürlich tun können, wenn sie wollen — bei Services ist das wirtschaftlich tragfähig, da sie Grenzkosten von null haben).
<br>Damit diese Teile jedoch ohne gegenseitiges Vertrauen interagieren können, braucht es Verträge — Gesellschaftsverträge (in einer Gesellschaft aus Nodes und Services) —, um Wert zu übertragen und jedem Teil Reputation zuzuordnen. Wir haben also zwei Arten von Systemen (aus einer relativ abstrakten Sicht): Zahlungssysteme und Reputationssysteme.

> Eine mögliche Strategie für einen Node besteht darin, die Ausführung von Services anfangs ohne Wertaustausch anzubieten, um seine Reputation zu steigern, und erst dann, wenn er bei anderen Reputation hat, seine Kosten zu erhöhen.

> Anders als Nodes haben Services von ihrer Natur her Grenzkosten von null. Das heißt, es gibt keine Obergrenze für die Zahl gleichzeitig laufender Einheiten (da die Kosten der Ausführung bei den Nodes liegen). Deshalb ist es recht wahrscheinlich, dass viele Services zu Beginn kostenlos sind, um Reputation zu gewinnen, dann Kosten verlangen, wenn sie Reputation haben und wettbewerbsfähig bleiben, und wieder zu einem Preis von null zurückkehren, wenn sie nicht mehr konkurrenzfähig sind.


### Zahlungssysteme

Zahlungssysteme ermöglichen die Übertragung von Wert zwischen Entitäten in *Celaut*. Hier einige mögliche Arten:

#### Lizenz-Smart-Contracts

Ein Vertragssystem, das die Ausgabe von Nutzungslizenzen für Services und Nodes erlaubt, wobei das Ledger das Netzwerk ist, in dem Einigkeit über die Wahrheit erzielt wird. Will A also eine Methode von B ausführen, prüft es dessen Vertrag, führt den festgelegten Befehl aus (indem es sich mit dem Ledger verbindet), und der Vertrag des Ledgers gibt eine Lizenz aus, die A an B schickt, damit dieses die gewünschte Methode ausführen darf.

Es gibt vier verschiedene Lizenztypen entlang zweier Einteilungen. Zum einen, ob die Lizenz elastisch oder statisch ist, und zum anderen, ob sie interaktiv oder nicht interaktiv ist.

- **Elastische Lizenzen** erlauben es, ihre Nutzung anhand bestimmter Parameter einzuschränken (Anzahl der Anfragen, Zeit, Methoden, Umgebungsvariablen usw.).

- **Statische Lizenzen** schränken die Nutzung nicht ein. B kennt die Lizenzschlüssel, und der Vertrag stellt die Lizenz aus, ohne ihre Nutzung begrenzen zu können.

- **Interaktive Lizenzen** verlangen, dass B sich mit dem Ledger verbindet, um die Gültigkeit der vorgelegten Lizenz zu prüfen.

- **Nicht interaktive** Lizenzen verlangen nicht, dass B sich mit dem Ledger verbindet, um die Gültigkeit der vorgelegten Lizenz zu prüfen.

<br>

Daraus ergeben sich die vier Lizenztypen:

- Interaktiv statisch (sehr geradlinig — wenig nützlich)
- Nicht interaktiv statisch (besser für Services)
- Interaktiv elastisch (besser für Nodes)
- Nicht interaktiv elastisch (recht komplex — vielseitig)

<br>

> Ledger können öffentliche, erlaubnisfreie Netzwerke wie Bitcoin oder Ergo sein oder private, geschlossene Plattformen wie Stripe. Die einzige Anforderung ist, dass alle Beteiligten sie unterstützen.

<br>


### Reputationssysteme

Reputationssysteme erlauben es Nutzern, Nodes und Services, ein soziales Ökosystem zu bilden, auf dessen Grundlage Entscheidungen getroffen werden. Nodes müssen wissen, welchen Peers sie vertrauen können, wenn sie die Ausführung von Services anfragen.
Nutzern, die Services ausführen, hilft es zu bestimmen, welche Services die gewünschte Aufgabe am besten erfüllen.

In *Celaut* wird Reputation als Einträge in Ledgern dargestellt, die eine Meinung ausdrücken.

Bei Services eröffnet ihre deterministische Natur eine andere Sicht auf ihre Reputation als bei Nodes.
Ein vor einiger Zeit veröffentlichter Reputationsnachweis (ein Eintrag) kann bei einem Service denselben Wert haben wie ein aktueller (das gilt, solange der Service nicht mit Netzwerken interagiert, was die Standardform eines Service ist: vollständig isoliert).
Interagiert er doch mit einem Netzwerk, kann seine Reputation von der Reputation der Netze abhängen, mit denen er sich verbindet, und die besitzt diese deterministische Eigenschaft nicht, da sie sich über die Zeit ändern kann. Denn der Service selbst hat sich ja nicht geändert.

Die Reputation eines Node hingegen ist umso wertvoller, je aktueller sie ist, da sein Verhalten sich über die Zeit ändern kann.
Wenn Nodes einander begegnen, legen sie Nachweise ihrer Reputation vor, und andere können — ohne dass Konsens nötig wäre — beurteilen, ob sie mehr oder weniger vertrauenswürdig sind.

Jeder Node, jeder Service oder jede andere Art von Akteur in einem Reputationssystem vertraut verschiedenen Quellen in unterschiedlichem Maß, und diese Quellen wiederum vertrauen anderen Quellen, Nodes, Services oder Entitäten in unterschiedlichem Maß. Wird ein bestimmter Akteur also mit einer unbekannten Entität konfrontiert, prüft er die Meinungen der Quellen, denen er vertraut.

Für ein genaueres Verständnis, wie ein Reputationssystem funktioniert, kannst du lesen: [Dokumentation des Sigma Reputation Panel](https://github.com/reputation-systems/sigma-reputation-panel/blob/master/README.md)

<br>


## Warum ist das nötig

*Celaut* will genau die Trennung zwischen dem „*wie ein Problem gelöst wird*“ und dem „*wo und von wem es gelöst wird*“ auflösen.

Nimm zum Beispiel einen Trading-Bot.

>Trading-Bots sind automatisierte Softwareprogramme, die anhand vorgegebener Algorithmen Kauf- und Verkaufsaufträge an Finanzmärkten ausführen. Sie sind bedeutsam, weil sie rund um die Uhr arbeiten, schnell auf Marktveränderungen reagieren und emotionale Verzerrungen ausschalten können — was Effizienz und Konsistenz von Handelsstrategien erhöht.


<br>

Wenn du in diesem Zusammenhang gerade jetzt einen Trading-Bot nutzen willst, gehst du ins Netz und kannst:

1. Nach einem Webservice suchen, der dein Anlageportfolio verwaltet. Der hat:
    1. Vorteile:
        1. Du musst die Infrastruktur nicht selbst betreiben.
        2. Du musst nichts konfigurieren.
    2. Nachteile:
        1. Du kannst ihm keine Reputation zuschreiben, weil der Entwickler des
        Webservice nicht beweisen kann, dass sich das System nicht geändert hat
        (wenn ein Bot etwa viele Nutzer gewonnen hat, könnten sie
        seine Leistung senken, um dich zu einem neueren zu bewegen).
        2. Die Entwickler des Webservice können dir nicht zusichern, dass sie
        die Daten aus deinen Anfragen nicht missbrauchen (in diesem Fall die
        Bewegungen deines Portfolios).
2. Nach Quellcode suchen (auf GitHub usw.), den du selbst auf deinem PC (oder in der Cloud) ausführen kannst.
    1. Vorteile:
        1. Er ist deterministisch in dem Sinn, dass du (sofern er keine Verbindung
        ins Internet hat) sicher sein kannst, dass sich Verhalten und/oder Leistung künftig nicht ändern, da der Entwickler den zuvor heruntergeladenen Quellcode nicht verändern kann.
        2. Der Entwickler des Service hat keine Kontrolle über die Daten deiner Anfragen.
    2. Nachteile:
        1. Du brauchst Ausrüstung (Infrastruktur), die den Code ausführen kann.
        2. Du musst dich mit Fragen der Systemkonfiguration herumschlagen (die oft
        so erheblich sind, dass ein durchschnittlicher Nutzer sich für einen Webservice entscheidet).

Diesen beiden Optionen gegenüber erlaubt *Celaut*, die Vorteile beider bisherigen Lösungen ohne deren Nachteile zu nehmen. Deshalb:



- Infrastrukturverwaltung ist unnötig, denn die Nodes übernehmen sie. Es muss kein Cloud-Anbieter gesucht werden.

- Keine Konfiguration nötig. Die Service-Spezifikation deckt ab, wie der Container gebaut ist, welche Architektur er hat, welche Netzwerkanforderungen bestehen und wie seine Schnittstelle aussieht. Nutzer müssen sich um nichts davon kümmern.

- Service-Entwickler können den Service nicht steuern, verändern oder Daten aus ihm ziehen. Sie kontrollieren die Nodes nicht, die ihn verteilen und ausführen. Sie können jedoch einen Anreiz haben, ihn zu schaffen.

<br>


## Systemverhalten

Dieser Abschnitt beschreibt das Verhalten des Systems, einschließlich der Interaktionen zwischen seinen Teilen,
um die Natur der Architektur mit größerer Klarheit zu zeigen.

- [Ausführung eines Service](execution_of_a_service.md)
- [Lastverteilung von Services](service_balancer.md)
- [Node-Handshake]()

[*<-- Înapoi la pagina principală*](README.md#system-behavior)


### Diagrama de secvență a execuției unei instanțe de serviciu

![Diagramă de cazuri de utilizare](assets/e29d99_service_execution_diagram.excalidraw.svg)*__Figura e29__: diagrama de secvență a execuției unei instanțe de serviciu*

<br>

Participanții din diagrama de secvență de mai sus (figura e29) sunt următorii:

- Serviciul principal: este instanța de serviciu care cere instanțierea unui alt serviciu pe nodul său.

- Nodul: este nodul căruia serviciul principal îi cere generarea noii instanțe.

- Dependența: este noua instanță pe care serviciul principal voia să o folosească.

<br>

Pe parcursul secvenței au loc următoarele interacțiuni:

1. Instanța serviciului principal trimite nodului său specificația unui alt serviciu, folosind metoda *StartService()*. Se presupune că nodul se va ocupa de execuția unei instanțe a acestui serviciu și va returna adresa noii instanțe, precum și jetonul aferent.

2. După ce primește cererea de la serviciul principal, nodul salvează specificația completă sau, dacă aceasta este deja salvată, oprește fluxul cererii (pentru a prelua doar hash-ul serviciului cerut).

3. Nodul instanțiază serviciul cerut, încarcă configurația (fișierul *__config__* din rădăcina sa) și îi execută punctul de intrare.

4. Dependența pornește cu execuția descrisă în punctul de intrare din specificația sa.

5. Nodul obține adresa instanței containerului și calculează jetonul corespunzător; jetonul este un identificator secret al noii instanțe de serviciu și depinde de implementarea nodului. ~~Nodul salvează instanța în registru ca instanță internă, iar serviciul care a cerut-o drept părinte al acesteia.~~ În final, returnează serviciului principal adresa și jetonul instanței.

6. Serviciul principal, cel care a cerut instanța, folosește dependența prin adresa pe care i-a furnizat-o nodul.

7. Serviciul principal decide să oprească dependența, așa că execută metoda *StopService()* a nodului, trimițându-i jetonul dependenței.

8. Nodul oprește containerul dependenței și o elimină din registru.

>Metodele *StartService()* și *StopService()* sunt metode de referință, dar pot diferi de la o implementare de nod la alta. Interfața nodului, folosită de clienți și de serviciile locale (serviciile care rulează nodul) pentru a trimite cereri și a controla resurse și dependențe, este pusă la dispoziție de nod noilor clienți sau servicii locale.

>Fișierul *__config__* indică configurația fiecărui serviciu (variabile de mediu, interfața nodului etc.), care depinde de fiecare serviciu în parte, întrucât schema ei este indicată în specificația fiecăruia. Nodul poate avea capacitatea de a scrie în una sau mai multe scheme, iar dacă nu este compatibil, poate fie să decidă să nu instanțieze serviciul, fie să folosească un serviciu de traducere.

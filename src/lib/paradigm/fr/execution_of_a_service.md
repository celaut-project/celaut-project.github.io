[*<-- Retour à la page principale*](README.md#system-behavior)


### Diagramme de séquence de l'exécution d'une instance de service

![Diagramme de cas d'utilisation](assets/e29d99_service_execution_diagram.excalidraw.svg)*__Figure e29__ : diagramme de séquence de l'exécution d'une instance de service*

<br>

Les agents participant au diagramme de séquence précédent (figure e29) sont les suivants :

- Service principal : il s'agit de l'instance du service qui demande d'instancier un autre service sur son nœud.

- Nœud : il s'agit du nœud auquel le service principal demande la génération de la nouvelle instance.

- Dépendance : il s'agit de la nouvelle instance que le service principal voulait utiliser.

<br>

Les interactions suivantes se produisent au cours de la séquence :

1. L'instance du service principal envoie la spécification d'un autre service à son nœud en utilisant la méthode *StartService()*. On suppose que le nœud se chargera d'exécuter une instance de ce service et renverra l'adresse de la nouvelle instance, ainsi que le jeton correspondant.

2. Le nœud, après avoir reçu la requête du service principal, stocke la spécification complète ou, si elle est déjà stockée, arrête le flux de la requête (pour ne conserver que le hachage du service demandé).

3. Le nœud instancie le service demandé, en chargeant la configuration (le fichier *__config __* à sa racine) et en exécutant son point d'entrée.

4. La dépendance démarre avec l'exécution décrite dans le point d'entrée de sa spécification.

5. Le nœud obtient l'adresse de l'instance du conteneur et calcule le jeton correspondant ; ce jeton sera un identifiant secret de la nouvelle instance de service et dépend de l'implémentation du nœud. ~~Le nœud stocke l'instance dans le registre comme une instance interne, et le service qui l'a demandée comme son parent.~~ Enfin, il renvoie l'adresse et le jeton de l'instance au service principal.

6. Le service principal, celui qui a demandé l'instance, utilise la dépendance via l'adresse fournie par le nœud.

7. Le service principal décide d'arrêter la dépendance, et exécute donc la méthode *StopService()* du nœud, en lui envoyant le jeton de la dépendance.

8. Le nœud arrête le conteneur de la dépendance et le retire du registre.

>Les méthodes *StartService()* et *StopService()* sont des méthodes de référence, mais elles peuvent varier selon les implémentations de nœud. L'interface du nœud, utilisée par les clients et les services locaux (services qui s'exécutent sur le nœud) pour effectuer des requêtes et contrôler les ressources et les dépendances, est fournie par le nœud aux nouveaux clients ou services locaux.

>Le fichier *__ config __* indique la configuration de chaque service (variables d'environnement, interface du nœud, etc.), qui dépend de chaque service, puisque son schéma est indiqué dans la spécification de chacun. Le nœud peut avoir la capacité d'écrire dans un ou plusieurs schémas, et s'il n'est pas compatible, il peut soit décider de ne pas instancier le service, soit utiliser un service de traduction.

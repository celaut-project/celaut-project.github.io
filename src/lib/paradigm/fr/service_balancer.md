[*<-- Retour à la page principale*](README.md#system-behavior)

### Diagramme de séquence d'un processus de répartition de charge des services

Lorsqu'un nœud reçoit une requête pour instancier un service, c'est lui qui décide sur quel nœud du réseau ce service doit être instancié, localement ou sur un autre nœud. Pour cela, il compare le coût d'exécution de l'instance sur chacun de ses pairs avec le coût de l'exécuter localement, et choisit celui qu'il considère le meilleur (par exemple, le plus bas).

Lorsque des clients (d'autres pairs) lui demandent son coût pour exécuter un service, il leur communique le coût de l'exécuter localement ou sur l'un de ses pairs.

<br>

Dans le diagramme de séquence suivant (figure 4c0), le processus de répartition de charge pour l'exécution de nouvelles instances de service est exposé. On suppose qu'un service a reçu la requête d'exécuter l'instance d'un service.

![Diagramme du répartiteur de services](assets/4c0f64_service_balance_diagram.excalidraw.svg) *Figure 4c0 : diagramme de répartition des services*

<br>

Les agents impliqués dans le diagramme de séquence précédent (figure 4c0) sont les suivants :

- Le nœud A est le nœud qui demande le coût et la génération de la nouvelle instance d'un service.
- Le nœud B est un autre nœud du réseau.

Les interactions suivantes sont exposées au cours de la séquence :

1. Le nœud A demande à chacun de ses pairs du réseau le coût d'exécution d'une instance du service. Il utilise la méthode de récupération du coût selon l'interface de chaque pair.

2. Le nœud B calcule le coût d'exécution du service localement.

3. Le nœud A calcule le coût d'exécution du service localement et le compare aux coûts reçus. Dans ce cas, il décide que le coût le plus bas est celui du nœud B.

4. Le nœud A demande au nœud B d'exécuter une instance du service, lui renvoie la spécification de celui-ci, et attend qu'il lui retourne son adresse et son jeton.

5. Le nœud B exécute l'instance du service que le nœud A lui a remise, stocke l'instance dans son registre en considérant que le parent est le nœud A, et retourne son adresse et son jeton.

6. Le nœud A reçoit l'adresse et le jeton du nœud B, et stocke l'instance dans le registre comme une instance externe.

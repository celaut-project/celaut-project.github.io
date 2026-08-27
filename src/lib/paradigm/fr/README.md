# *Celaut* : une architecture pair-à-pair pour la conception et la distribution de logiciels

<br>

**Contexte**

Dans les années 1940, le mathématicien John von Neumann, en collaboration avec Stanislaw Ulam, a introduit le concept d'automate cellulaire, créant des modèles qui ont démontré comment des comportements complexes pouvaient émerger de règles simples. En s'appuyant sur cette base, en 1970, John Horton Conway a présenté « le jeu de la vie », un automate cellulaire devenu l'exemple classique de la façon dont un système peut évoluer vers des motifs complexes à partir d'interactions élémentaires. Ces idées offrent un éclairage précieux sur la manière dont les systèmes décentralisés peuvent atteindre la complexité sans contrôle central, ce qui sert de philosophie directrice à la conception de *Celaut*.

**Définition**

*Celaut* est un ensemble de règles simples pour la conception et la distribution de logiciels, visant à créer un système robuste, évolutif et adaptatif à travers les principes de **décentralisation**, de **simplicité** et de **déterminisme**.

**Principes**

1. **Décentralisation** : aucun point unique de contrôle ou de défaillance, permettant aux nœuds de communiquer et de se coordonner dynamiquement.
2. **Simplicité** : des règles minimalistes qui réduisent la complexité, garantissant que chaque composant puisse être compris et maintenu facilement.
3. **Déterminisme** : les services se comportent de manière prévisible, en suivant des règles définies qui garantissent la reproductibilité des résultats entre différents nœuds.

**Architecture de *Celaut* : nœuds et services**

L'architecture de *Celaut* s'articule autour de deux éléments fondamentaux : les **nœuds** et les **services**. Ensemble, ils créent un réseau distribué où chaque partie contribue à la fonctionnalité d'ensemble, un peu comme les agents dans un automate cellulaire.

- **Nœuds** :
    Un nœud représente un ordinateur ou un appareil au sein du réseau *Celaut*, capable de communiquer avec d'autres nœuds et de gérer l'exécution des services. La nature décentralisée de *Celaut* se manifeste dans la façon dont les nœuds interagissent, garantissant l'absence de point de défaillance unique ou de contrôle centralisé. Les responsabilités clés d'un nœud incluent :

    1. **Exécution des services** : les nœuds gèrent les instances de service, décidant de les exécuter localement ou de répartir la charge entre les nœuds pairs. Cela garantit une utilisation optimale des ressources et de la performance, un peu comme les cellules d'un automate cellulaire interagissent avec leurs voisines pour maintenir l'équilibre du système.

    2. **Interface de communication** : une interface robuste garantit un échange de données fluide entre les nœuds et les services, permettant une coordination efficace. Il est à noter que les nœuds n'ont pas besoin de s'accorder au préalable sur un protocole de communication spécifique, car l'interface abstrait ces détails, laissant place à la flexibilité des interactions. Cette caractéristique est développée plus loin.

    3. **Fourniture d'adresses et de jetons** : les nœuds facilitent des interactions sécurisées en gérant les adresses de communication et les jetons d'authentification, rendant les services facilement accessibles tout en préservant la sécurité.

    4. **Gestion des dépendances** : les nœuds veillent à ce que les services aient accès aux dépendances dont ils ont besoin. Ces dépendances, souvent appelées « services enfants », peuvent s'exécuter sur le même nœud ou sur un autre. Cette caractéristique permet à un service parent d'accéder à ses services enfants et de se coordonner avec eux, garantissant un écosystème de services fluide et efficace, même lorsque les services sont répartis sur le réseau.

    Un exemple d'implémentation d'un nœud utilisant Python3 et Rust est **Nodo**, disponible [ici](https://github.com/*Celaut*-project/nodo).

- **Services** :
    Un service dans *Celaut* est un conteneur logiciel déterministe conçu pour accomplir une tâche spécifique. En suivant le principe de la **boîte noire**, les services fonctionnent indépendamment des détails des nœuds qui les exécutent, en se concentrant uniquement sur leur fonctionnalité. Les aspects clés des services incluent :

    - **Exécution en tant qu'instances isolées** : lorsqu'un utilisateur demande un service, celui-ci est envoyé à un nœud, qui l'exécute comme un processus isolé — soit dans un conteneur, soit dans une machine virtuelle, selon l'architecture du nœud. Cette abstraction s'aligne sur le principe de **simplicité**, car les services n'ont pas besoin d'être conscients de l'environnement d'exécution.

    - **Comportement déterministe** : les services suivent des règles prédéfinies pour garantir des résultats cohérents. Cela s'aligne sur l'accent que met *Celaut* sur le **déterminisme**, où, pour des entrées identiques, un service produira toujours la même sortie, quel que soit le nœud qui l'exécute.

    - **Exécution hiérarchique** : une caractéristique unique des services dans *Celaut* est leur capacité à demander l'exécution d'autres services (services enfants) via le nœud, permettant des flux de travail complexes. Cela reflète les comportements émergents observés dans les automates cellulaires, où des interactions simples peuvent mener à des motifs plus sophistiqués.

**Coordonner les incitations : réputation et paiements**

Dans les systèmes décentralisés comme *Celaut*, la coordination ne se limite pas aux interactions techniques — elle implique aussi d'aligner les incitations de tous les participants pour garantir le bon fonctionnement du système. *Celaut* intègre deux mécanismes clés pour parvenir à cet alignement :

- **Systèmes de réputation** :
    Chaque nœud et chaque service peuvent bâtir une réputation basée sur leur historique d'interactions. Les nœuds et les services sont incités à maintenir des standards élevés de fiabilité et de qualité afin de préserver leur réputation. Une réputation solide encourage les autres nœuds et utilisateurs à leur faire confiance et à interagir avec eux, offrant une incitation naturelle à se comporter équitablement et à fournir des services de qualité. Ce mécanisme de réputation crée une forme d'autorégulation au sein du réseau, où les participants ont un intérêt direct à préserver leur bonne réputation.

- **Mécanismes de paiement** :
    Au-delà de la réputation, la coopération entre nœuds et services est également facilitée par des systèmes de paiement. Lorsqu'un nœud exécute un service, ou lorsque des services interagissent entre eux, une compensation peut être échangée contre les ressources utilisées ou les tâches accomplies. Ces paiements créent une incitation directe pour les nœuds à contribuer des ressources et pour les services à apporter de la valeur, encourageant la collaboration et des échanges équitables à travers le réseau. Les mécanismes de paiement garantissent une allocation efficace des ressources, permettant aux nœuds et aux services de fonctionner selon leurs forces et leurs capacités.

Ces mécanismes sont décrits plus en détail plus loin, fournissant le cadre économique qui assure la viabilité de l'approche décentralisée de *Celaut*. Tout comme deux nœuds communiquent sans avoir besoin de s'accorder sur un protocole spécifique, ces systèmes fonctionnent indépendamment de l'architecture centrale. La raison de cette séparation, et la façon dont elle permet flexibilité et adaptabilité dans les interactions, est expliquée plus loin.

**Relier le conceptuel et le pratique**

La conception de *Celaut* reflète les principes sous-jacents des automates cellulaires : des règles simples au niveau du nœud et du service conduisent à un système complexe et adaptatif. En décentralisant le contrôle, en simplifiant les interactions et en garantissant un comportement déterministe, *Celaut* crée un cadre flexible pour la distribution et l'automatisation des logiciels. Cela permet aux services de se concentrer sur leurs fonctions essentielles, tandis que les nœuds gèrent l'orchestration et la distribution, aboutissant à un système capable de s'adapter et de s'étendre à mesure que de nouveaux besoins apparaissent.

**Impact concret de *Celaut***

L'architecture de *Celaut* permet une itération et une expérimentation plus rapides, un peu comme l'exécution de simulations dans un environnement contrôlé. Cela la rend particulièrement précieuse dans les scénarios où le déploiement et le test rapides de nouvelles méthodes sont cruciaux. Grâce aux capacités offertes par l'informatique moderne, *Celaut* peut exploiter ces principes pour simuler des systèmes complexes de manières auparavant inimaginables, ouvrant de nouvelles voies pour améliorer l'efficacité et la performance dans divers secteurs.

Cette architecture permet aux services de se concentrer sur leur fonctionnalité, sans se soucier de l'infrastructure sous-jacente. Les nœuds, de leur côté, peuvent gérer efficacement l'exécution des instances, sans se soucier de leur utilité.

<br>


## Comment un service est-il spécifié ?

La spécification d'un service dans *Celaut* comporte trois composants principaux :

### Conteneur | *BOX*
Le composant **BOX** définit l'environnement dans lequel le service s'exécutera, garantissant la cohérence de son exécution sur différents nœuds. Contrairement à d'autres méthodes de conteneurisation, le BOX de *Celaut* ne repose pas sur des images ou des dépôts externes ; il spécifie directement l'ensemble de la structure de fichiers nécessaire à l'exécution du service. Il inclut les détails suivants :

- **Architecture** : précise la microarchitecture du matériel sur lequel le service est destiné à s'exécuter, garantissant la compatibilité entre le service et le nœud exécutant.

- **Système de fichiers** : une description complète de la structure de fichiers du service, englobant tous les fichiers et répertoires nécessaires à son fonctionnement. Cela inclut les binaires, les bibliothèques, les fichiers de configuration et toute autre ressource nécessaire.
    - Les **branches d'éléments** (Item Branches) définissent la structure du système de fichiers, chaque branche représentant un fichier, un lien symbolique, ou une structure de répertoires imbriquée.
    - Cette approche permet à l'ensemble de l'environnement d'être autonome, réduisant la dépendance envers des dépôts tiers et préservant le **déterminisme**, puisque l'environnement d'exécution du service reste identique quel que soit le nœud hôte.

- **Variables d'environnement** : précisent les paires clé-valeur auxquelles le service peut accéder pendant l'exécution, permettant une configuration dynamique sans altérer la structure de fichiers principale.

- **Point d'entrée** : définit le script ou la commande qui déclenche le processus principal du service lors de son exécution. Cela garantit que le nœud sait comment démarrer correctement le service.

- **Config** : inclut les chemins et formats de configuration que le nœud doit charger au démarrage du service. Elle fournit des informations nécessaires comme les allocations initiales de ressources ou des paramètres d'exécution spécifiques.

- **Passerelle attendue (Expected Gateway)** : décrit comment le service communique avec le nœud *Celaut*, en précisant les protocoles et méthodes (le protocole d'application de la passerelle) qu'il attend du nœud. Ce composant garantit une communication fluide entre le service et son environnement hôte, en traitant le nœud comme un système d'exploitation fournissant des interactions au niveau système.

La spécification BOX permet aux services *Celaut* d'être portables, reproductibles et exempts de dépendances envers des tiers, conformément aux principes de **simplicité** et de **déterminisme**.

### Interface | *API*
L'*API* (interface de programmation applicative) dans Celaut est l'ensemble des règles et spécifications qui définissent comment les clients et les autres services peuvent interagir avec un service au sein de l'écosystème. Son objectif principal est d'établir une méthode claire et cohérente permettant à différents composants logiciels de communiquer entre eux, garantissant que les services soient accessibles et utilisables de manière prévisible.

Via l'*API*, les protocoles de communication et les points de terminaison sont définis pour qu'un service reçoive et traite les requêtes. Cela garantit que toute entité externe, qu'il s'agisse d'un utilisateur ou d'un autre service, puisse s'intégrer au service en suivant un ensemble standardisé d'instructions, sans avoir besoin de comprendre son fonctionnement interne.

Un aspect fondamental de l'*API* dans Celaut est son rôle dans la décentralisation. En fournissant une interface bien définie, les services peuvent fonctionner de manière autonome sans dépendre d'un contrôleur centralisé pour gérer les interactions. Cela permet au système d'être plus évolutif et résilient, puisque chaque service est autosuffisant dans sa capacité à communiquer et à collaborer avec les autres composants de l'écosystème.

La spécification *API* permet aux services d'être facilement accessibles et utilisés par les clients, tout en maintenant une méthode d'interaction cohérente. Elle soutient le principe de **décentralisation** de *Celaut* en permettant aux services d'être autosuffisants dans leur communication, sans dépendre d'un contrôleur centralisé pour négocier le protocole.

### Réseau | *NET*
Le composant **NET** définit la portée de l'accès réseau externe qu'un service peut demander et avec lequel il peut interagir. Par défaut, un service est isolé des réseaux externes, ne pouvant communiquer qu'avec son service parent (le client qui l'a créé), ses services enfants, et le nœud *Celaut* qui l'exécute. Cette isolation garantit le **déterminisme** et renforce la **sécurité** en empêchant les fuites de données non autorisées ou les interactions indésirables.

Cependant, certains services nécessitent un accès aux réseaux externes pour leur fonctionnement. Par exemple, un service agissant comme un nœud Bitcoin doit interagir avec le réseau Bitcoin plus large. Pour permettre cela sans compromettre la sécurité, *Celaut* autorise ce qui suit :

- **Accès externe contrôlé** : le service n'accède pas directement à des adresses IP ou des nœuds externes. Il envoie plutôt une requête à son nœud *Celaut*, précisant qu'il a besoin d'un accès à un réseau particulier (par exemple, « bitcoin-mainnet »). Le nœud *Celaut* vérifie cette requête et fournit une liste de nœuds pairs de confiance avec lesquels le service peut interagir.

- **Demande de pairs réseau par le service** : un service comme un nœud Bitcoin peut demander des ressources ou des pairs réseau supplémentaires en communiquant avec son nœud *Celaut*. Il peut par exemple demander : « j'ai besoin de pairs de "bitcoin-mainnet" ». Le nœud évalue cette requête et retourne une liste d'instances vérifiées (qui peuvent être d'autres nœuds Bitcoin s'exécutant comme services sur le réseau *Celaut*).

- **Connaissance du réseau et redirection par le nœud** : si le nœud *Celaut* qui a reçu la requête du service sait qu'il ne peut pas trouver de pairs adéquats (par exemple, aucun autre nœud Bitcoin dans son réseau), il cherchera un nœud *Celaut* pair capable de satisfaire cette exigence. Cela garantit que les services peuvent toujours trouver les connexions réseau nécessaires, même si le nœud *Celaut* initial est limité.

Le composant **NET** permet à *Celaut* d'équilibrer le besoin de connectivité externe avec les valeurs centrales de **sécurité** et de **déterminisme**, garantissant que les services restent isolés à moins d'être explicitement autorisés à accéder à des réseaux plus larges.

<br><br>

La spécification d'un service est un élément clé de l'architecture de *Celaut*, car elle permet aux services d'être déployés et exécutés de manière cohérente et prévisible.

<br>

Le nœud chargera le service à partir du binaire et lui fournira les ressources dont il a besoin pour fonctionner.

Il n'existe pas de méthode unique pour définir un service.
Par exemple, l'[implémentation Proto3](https://github.com/*Celaut*-project/service-lib/blob/master/node-driver/src/node_driver/gateway/protos/*Celaut*.proto#L66) n'est qu'une variante parmi de nombreuses autres possibles.

<br>

Tous les nœuds n'accepteront pas toutes les variantes possibles d'une spécification de service.

>Par exemple, le nœud A comprend une spécification proto3 spécifique ainsi qu'une en JSON. Un autre nœud B comprend la spécification JSON et une autre en JSON + système de fichiers compressé. Les deux nœuds peuvent transmettre les services de la spécification qu'ils ont en commun, ici JSON.

<br>

## Différents types de rôles d'utilisateur dans le système

En tant qu'utilisateurs, nous pouvons jouer trois types de rôles :

- Opérateur de nœud (similaire à quelqu'un qui gère un mineur dans une blockchain).
- Développeur de services. Ceux-ci peuvent être exécutés par n'importe qui sur n'importe quel nœud (tout nœud compatible, en termes d'architecture, etc.).
- Utilisateurs qui lancent des services sur des nœuds.

Ainsi, la personne qui gère un nœud (utilisateur de type 1) ne se soucie pas de savoir s'il mine du PoW, fait tourner un bot de trading, analyse une séquence d'ADN, ou fait quoi que ce soit d'autre que font les services qu'il exécute. Il exécute simplement les services demandés par les utilisateurs de type 3, en échange d'une preuve de paiement (sur une blockchain ou tout autre moyen de paiement accepté). Le développeur (utilisateur de type 2) n'a besoin que de l'envoyer à un ou plusieurs nœuds, qui se chargeront de distribuer le service parmi les autres et/ou de le téléverser vers un système de réputation, afin que les utilisateurs (ou d'autres services) sachent s'il faut l'utiliser, quand et pourquoi.

>C'est une vision simplifiée du système ; en introduisant davantage de complexité, le nombre de rôles d'utilisateur possibles pourrait aussi croître.

<br>


## Suivre les traces de la nature dans les écosystèmes numériques

Imaginez *Celaut* comme un écosystème numérique, reflétant la dynamique d'un écosystème biologique que l'on trouve dans la nature. Dans cette analogie :

1. Les nœuds comme organismes : les nœuds au sein de *Celaut* peuvent être comparés à des organismes dans un écosystème naturel. Chaque nœud représente une entité distincte avec ses propres capacités et fonctions, tout comme différentes espèces occupent diverses niches dans l'environnement. Ces nœuds interagissent entre eux, formant un réseau semblable à la toile interconnectée de la vie que l'on trouve dans les écosystèmes.

2. Les services comme fonctions biologiques : les services au sein de *Celaut* sont analogues aux fonctions ou processus biologiques présents dans les organismes. Chaque service accomplit une tâche spécifique, tout comme les organes des organismes vivants remplissent des fonctions spécialisées. Tout comme les organes travaillent ensemble harmonieusement pour maintenir la vie, les services collaborent au sein des nœuds pour répondre à des besoins de calcul variés.

3. La décentralisation comme diversité : le principe de décentralisation de *Celaut* peut être assimilé à la biodiversité dans les écosystèmes naturels. Dans la nature, la biodiversité garantit résilience et adaptabilité, car des espèces variées contribuent à la stabilité et à la fonctionnalité de l'écosystème. De la même façon, la décentralisation dans *Celaut* atténue les risques associés aux points de défaillance uniques et renforce la capacité du système à s'adapter aux conditions changeantes.

4. L'efficacité comme optimisation énergétique : l'efficacité dans *Celaut* reflète l'optimisation énergétique observée dans les systèmes naturels. Dans les écosystèmes biologiques, l'énergie circule à travers les chaînes alimentaires, les organismes optimisant leur dépense énergétique pour maximiser la survie et la reproduction. De même, *Celaut* optimise les ressources de calcul, en répartissant les tâches entre les nœuds pour minimiser la latence et le gaspillage de ressources.

5. La simplicité et le déterminisme comme lois naturelles : les principes de simplicité et de déterminisme dans *Celaut* font écho aux lois sous-jacentes qui régissent les systèmes naturels. Tout comme les lois physiques dictent le comportement de la matière et de l'énergie dans l'univers, les règles simples de *Celaut* régissent les interactions entre les nœuds et les services. Ce cadre déterministe garantit cohérence et prévisibilité, à l'image de la prévisibilité des phénomènes naturels régis par des lois fondamentales.

<br>


## Systèmes de confiance

Dans *Celaut*, les différentes parties du système, nœuds et services, ne se font pas confiance entre elles ; c'est donc un système sans confiance préalable. C'est pourquoi il est peu probable qu'un nœud exécute des services gratuitement, ou qu'un service fonctionne sans qu'un paiement soit effectué via un contrat et sans en recevoir la preuve (bien qu'évidemment ils puissent le faire s'ils le souhaitent ; dans le cas des services, c'est économiquement viable car ils ont un coût marginal nul).
<br>Cependant, pour permettre l'interaction entre ces parties sans confiance préalable entre elles, des contrats sont nécessaires — des contrats sociaux (dans une société de nœuds et de services) — pour transmettre de la valeur et attribuer une réputation à chaque partie. Nous disposons donc de deux types de systèmes (d'un point de vue relativement abstrait) : les systèmes de paiement et les systèmes de réputation.

> Une stratégie possible pour un nœud est de proposer l'exécution de services sans échange de valeur au départ, afin d'accroître sa réputation, et, une fois qu'il a acquis de la réputation auprès des autres, de commencer à augmenter son coût.

> Contrairement aux nœuds, la nature des services est d'avoir un coût marginal nul, ce qui signifie qu'ils n'ont pas de limite quant au nombre d'unités simultanées dans lesquelles ils s'exécutent (puisque le coût de leur exécution retombe sur les nœuds), il est donc assez probable que de nombreux services démarrent avec un coût nul pour gagner en réputation, exigent un coût une fois qu'ils ont de la réputation et souhaitent rester compétitifs, puis reviennent à un coût nul lorsqu'ils cessent d'être compétitifs.


### Systèmes de paiement

Les systèmes de paiement permettent le transfert de valeur entre entités dans *Celaut*. Voici quelques types possibles :

#### Contrats intelligents de licence

Un système de contrats qui permet l'émission de licences d'utilisation pour les services et les nœuds, où le Ledger est le réseau sur lequel la vérité est convenue. Ainsi, si A veut exécuter une méthode de B, il vérifiera son contrat, exécutera la commande définie (en se connectant au Ledger), et le contrat du Ledger émettra une licence, que A enverra à B pour lui permettre d'exécuter la méthode souhaitée.

Il existe quatre types distincts de licences, fondés sur deux classifications différentes. D'une part, selon que la licence est élastique ou statique, et d'autre part, selon qu'elle est interactive ou non interactive.

- Les **licences élastiques** sont celles qui permettent de restreindre leur utilisation selon certains paramètres (nombre de requêtes, durée, méthodes, variables d'environnement, etc.).

- Les **licences statiques** sont celles qui ne restreignent pas l'utilisation. B connaît les clés de licence, et le contrat fournit la licence sans pouvoir en limiter l'utilisation.

- Les **licences interactives** exigent que B se connecte au Ledger pour vérifier la validité de la licence fournie.

- Les licences **non interactives** n'exigent pas que B se connecte au Ledger pour vérifier la validité de la licence fournie.

<br>

Cela donne les quatre types de licences suivants :

- Interactive statique (très simple — peu utile)
- Non interactive statique (mieux adaptée aux services)
- Interactive élastique (mieux adaptée aux nœuds)
- Non interactive élastique (assez complexe — polyvalente)

<br>

> Les registres (Ledgers) peuvent être des réseaux publics et sans permission comme Bitcoin ou Ergo, ou des plateformes privées fermées comme Stripe. La seule exigence est que tous les participants les prennent en charge.

<br>


### Systèmes de réputation

Les systèmes de réputation permettent aux utilisateurs, aux nœuds et aux services de créer un écosystème social sur lequel fonder leurs décisions. Les nœuds doivent savoir en quels pairs ils peuvent avoir confiance pour demander l'exécution de services.
Pour les utilisateurs, qui exécutent des services, cela les aide à déterminer quels services offriront la meilleure performance pour la tâche qu'ils souhaitent accomplir.

Dans *Celaut*, la réputation est représentée comme des enregistrements sur des registres, qui représentent une opinion.

Dans le cas des services, leur nature déterministe offre une perspective différente sur leur réputation par rapport à celle des nœuds.
Une preuve de réputation (un enregistrement) publiée il y a quelque temps peut avoir la même valeur qu'une preuve actuelle concernant un service (cela est vrai lorsque le service n'interagit pas avec des réseaux, ce qui est la forme par défaut d'un service, entièrement isolé).
S'il interagit effectivement avec un réseau, sa réputation peut dépendre de la réputation des réseaux auxquels il se connecte, qui n'ont pas cette propriété déterministe, puisqu'ils peuvent évoluer dans le temps. C'est parce que le service lui-même n'a pas changé.

En revanche, la réputation d'un nœud est d'autant plus précieuse qu'elle est récente, car son comportement peut varier dans le temps.
Lorsque les nœuds se présentent les uns aux autres, ils montrent des preuves de leur réputation, et d'autres peuvent émettre un avis non consensuel sur leur degré de fiabilité.

Chaque nœud, service ou autre type d'acteur dans un système de réputation fait confiance à diverses sources à des degrés variables, et ces sources, à leur tour, font confiance à d'autres sources, nœuds, services ou entités à des degrés variables. Ainsi, lorsqu'un acteur donné se trouve face à une entité inconnue, il vérifiera les avis de ses sources de confiance.

Pour une compréhension plus précise du fonctionnement d'un système de réputation, vous pouvez lire : [documentation du Sigma Reputation Panel](https://github.com/reputation-systems/sigma-reputation-panel/blob/master/README.md)

<br>


## Pourquoi est-ce nécessaire

Ce que *Celaut* cherche à résoudre, c'est précisément la séparation entre « *comment résoudre un problème* » et « *où et par qui il est résolu* ».

Prenons par exemple un bot de trading.

>Les bots de trading sont des programmes logiciels automatisés qui exécutent des ordres d'achat et de vente sur les marchés financiers, en se basant sur des algorithmes prédéfinis. Ils sont importants car ils peuvent fonctionner 24 h/24 et 7 j/7, réagir rapidement aux changements du marché et supprimer les biais émotionnels, améliorant ainsi l'efficacité et la cohérence des stratégies de trading.


<br>

Dans ce contexte, si vous voulez utiliser un bot de trading dès maintenant, vous irez sur le web et pourrez :

1. Chercher un service web qui gérera votre portefeuille d'actifs, lequel présente :
    1. Avantages :
        1. Vous n'avez pas besoin de faire tourner l'infrastructure vous-même.
        2. Vous n'avez besoin de rien configurer.
    2. Inconvénients :
        1. Vous ne pouvez pas lui attribuer de réputation, car le développeur du
        service web est incapable de prouver que le système n'a pas changé (par exemple,
        lorsqu'un bot a gagné un grand nombre d'utilisateurs, il pourrait réduire
        sa performance pour vous encourager à en utiliser un plus récent).
        2. Les développeurs du service web ne peuvent pas vous garantir qu'ils
        n'utilisent pas de manière abusive les données de vos requêtes (dans ce cas,
        les mouvements de votre portefeuille).
2. Chercher un code source (sur GitHub, etc.) que vous pouvez exécuter vous-même sur votre PC (ou dans le cloud).
    1. Avantages :
        1. Il est déterministe, dans le sens où (s'il ne peut pas se connecter à
        internet) vous serez assuré que son comportement et/ou sa performance ne changeront pas à l'avenir, car le développeur ne peut pas modifier le code source que vous avez déjà téléchargé.
        2. Le développeur du service n'a aucun contrôle sur les données de vos requêtes.
    2. Inconvénients :
        1. Vous devez posséder un équipement (infrastructure) capable de faire tourner le code.
        2. Vous devez gérer des problèmes de configuration du système (qui sont souvent
        suffisamment importants pour qu'un utilisateur moyen préfère un service web).

Face à ces deux options, *Celaut* permet de bénéficier des avantages des deux solutions précédentes sans leurs inconvénients. Voici pourquoi :



- La gestion de l'infrastructure est inutile, car les nœuds s'en chargent. Il n'y a pas besoin de chercher un fournisseur cloud.

- Aucune configuration n'est requise. La spécification du service couvre la façon dont le conteneur est construit, son architecture, ses besoins réseau et son interface. Les utilisateurs n'ont à se soucier de rien de tout cela.

- Les développeurs de services ne peuvent ni contrôler, ni modifier, ni extraire de données du service. Ils ne contrôlent pas les nœuds qui le distribuent et l'exécutent. Ils peuvent néanmoins être incités à le créer.

<br>


## Comportement du système

Cette section décrit le comportement du système, y compris les interactions entre les parties du système,
afin de montrer avec plus de clarté la nature de cette architecture.

- [Exécution d'un service](execution_of_a_service.md)
- [Répartition de charge des services](service_balancer.md)
- [Node handshake]()

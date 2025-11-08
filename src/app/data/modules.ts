import { ModuleDefinition } from "@/app/types";

export const modules: ModuleDefinition[] = [
  {
    id: "module-1",
    title: "Premiers pas et affichage",
    duration: "45 min",
    objective:
      "Comprendre ce qu'est un programme et afficher des messages simples avec print().",
    motivation:
      "Tu vas écrire tes toutes premières instructions en Python. Chaque ligne sera une nouvelle phrase que tu donnes à l'ordinateur !",
    concept: {
      title: "Qu'est-ce qu'un programme ?",
      body: [
        "Un programme, c'est comme donner une recette très précise à un ordinateur.",
        "En Python, on écrit ces instructions ligne par ligne dans un fichier ou un éditeur.",
        "La fonction print() sert à demander à l'ordinateur d'afficher une information à l'écran.",
      ],
      analogies: [
        "Imagine que tu envoies un texto à un ami : chaque print() est un nouveau message.",
        "Un programme est comme une playlist : l'ordinateur lit les instructions dans l'ordre.",
      ],
      highlights: [
        "Chaque instruction est exécutée de haut en bas.",
        "print() prend ce qu'on veut afficher entre parenthèses.",
      ],
    },
    demonstration: {
      code: 'print("Bonjour, je suis Python !")\nprint("Je peux répéter ce que tu me demandes.")',
      explanation: [
        "Chaque ligne commence par print : c'est le verbe d'action.",
        "Le texte est entouré de guillemets pour indiquer à Python que c'est une phrase.",
      ],
      callToAction: "Clique sur Exécuter pour voir le résultat dans la console ci-dessous.",
    },
    exercise: {
      id: "module-1-exo",
      title: "Ton premier message",
      instructions:
        "Affiche deux messages : un pour dire bonjour à Python et un autre pour partager ton objectif du jour.",
      starterCode:
        '# TODO: utilise print() pour afficher tes messages\nprint("Bonjour Python !")\nprint("Je suis prêt à apprendre aujourd\'hui.")\n',
      tests: [
        {
          code: "assert 'Bonjour' in __captured_output__, \"Utilise print pour saluer Python.\"",
          description: "Saluer Python",
        },
        {
          code: "assert 'prêt' in __captured_output__ or 'pret' in __captured_output__, \"Ajoute ton objectif dans le deuxième message.\"",
          description: "Partager ton objectif",
        },
      ],
      successMessage: "Super ! Tu sais déjà parler à l'ordinateur.",
      hints: {
        baseline: "N'oublie pas les parenthèses et les guillemets autour du texte.",
        remedial: "Exemple : print('Bonjour !'). Les parenthèses entourent exactement le texte.",
        advanced: "Personnalise tes phrases pour qu'elles te ressemblent !",
      },
    },
    challenge: {
      id: "module-1-defi",
      title: "Carte de visite",
      instructions:
        "Affiche trois lignes : ton prénom, ton hobby et ce que tu veux créer avec Python.",
      starterCode:
        '# Complète les print() pour créer ta carte de visite\nprint("Prénom : ...")\nprint("Hobby : ...")\nprint("Projet Python : ...")\n',
      tests: [
        {
          code: "assert 'Prénom' in __captured_output__, \"Remplace les ellipses par tes informations.\"",
          description: "Inclure ton prénom",
        },
        {
          code: "assert 'Hobby' in __captured_output__, \"Ajoute une ligne sur ton loisir préféré.\"",
          description: "Mentionner ton hobby",
        },
        {
          code: "assert 'Projet Python' in __captured_output__, \"Explique ce que tu souhaites construire.\"",
          description: "Exprimer ton projet",
        },
      ],
      successMessage:
        "Carte de visite validée ! Tu t'exprimes déjà avec Python.",
      hints: {
        baseline: "Chaque information doit être dans un print() séparé.",
        remedial: "Structure : print('Prénom : Ana'). Remplace simplement le texte.",
        advanced: "Ajoute une ligne bonus pour partager ce que tu ressens.",
      },
      reflection: "Qu'aimerais-tu que Python automatise pour toi aujourd'hui ? Note ton idée pour plus tard.",
    },
    quiz: {
      id: "module-1-quiz",
      title: "Quiz éclair : parler à Python",
      questions: [
        {
          id: "m1q1",
          prompt: "Quelle instruction affiche un texte à l'écran ?",
          options: ["display(\"Bonjour\")", "print(\"Bonjour\")", "echo Bonjour"],
          answerIndex: 1,
          explanation: "print() est la fonction standard d'affichage en Python.",
        },
        {
          id: "m1q2",
          prompt: "Que se passe-t-il si tu oublies les guillemets autour d'un texte ?",
          options: [
            "Python devine ce que tu voulais dire.",
            "Python cherche une variable portant ce nom et provoque une erreur.",
            "Le texte est affiché en majuscules.",
          ],
          answerIndex: 1,
          explanation:
            "Sans guillemets, Python pense que c'est le nom d'une variable et ne la trouve pas.",
        },
        {
          id: "m1q3",
          prompt: "Dans quel ordre Python lit-il tes instructions ?",
          options: ["Au hasard", "De bas en haut", "De haut en bas"],
          answerIndex: 2,
          explanation: "Python exécute chaque ligne dans l'ordre où elle apparaît.",
        },
      ],
    },
    bonus: {
      title: "Envie d'aller plus loin ?",
      description:
        "Découvre comment afficher des dessins avec des caractères spéciaux ou des emojis pour rendre tes messages vivants.",
      resources: [
        {
          label: "Guide : utiliser les caractères spéciaux",
          url: "https://docs.python.org/fr/3/howto/unicode.html",
        },
      ],
    },
  },
  {
    id: "module-2",
    title: "Variables et types",
    duration: "50 min",
    objective:
      "Créer des boîtes nommées pour stocker des données et comprendre leurs types (texte, nombre, booléen).",
    motivation:
      "Tu vas apprendre à mémoriser des informations pour les réutiliser plus tard. Comme coller des post-it intelligents partout !",
    concept: {
      title: "Les variables : des boîtes étiquetées",
      body: [
        "Une variable stocke une donnée sous un nom que tu choisis.",
        "Python devine le type (texte, nombre, booléen) selon ce que tu ranges dans la variable.",
        "Tu peux réutiliser ces valeurs autant de fois que nécessaire.",
      ],
      analogies: [
        "Une variable est une boîte avec une étiquette : facile à retrouver.",
        "Les types sont des matériaux différents : liquide (texte), solide (nombre), interrupteur (booléen).",
      ],
      highlights: [
        "Utilise = pour associer une valeur à un nom.",
        "len() permet de mesurer la longueur d'un texte.",
      ],
    },
    demonstration: {
      code: 'prenom = "Lina"\nage = 21\napprend_python = True\nprint(prenom, "a", age, "ans")',
      explanation: [
        "prenom, age et apprend_python sont trois variables différentes.",
        "print peut mélanger texte et variables en les séparant par des virgules.",
      ],
      callToAction: "Modifie les valeurs et relance pour voir comment la phrase change.",
    },
    exercise: {
      id: "module-2-exo",
      title: "Carnet de profil",
      instructions:
        "Crée trois variables : prenom (texte), niveau (nombre) et motive (booléen). Affiche ensuite une phrase qui les combine.",
      starterCode:
        '# 1. Déclare les variables\nprenom = "Ton prénom"\nniveau = 1\nmotive = True\n\n# 2. Affiche un résumé\nprint(prenom, "démarre Python niveau", niveau)\nprint("Motivé ?", motive)\n',
      tests: [
        {
          code: "assert 'prenom' in globals(), \"Déclare la variable prenom.\"",
          description: "Variable prénom",
        },
        {
          code: "assert isinstance(niveau, int), \"niveau doit être un nombre entier.\"",
          description: "Variable niveau",
        },
        {
          code: "assert isinstance(motive, bool), \"motive doit valoir True ou False.\"",
          description: "Variable motive",
        },
        {
          code: "assert 'Python niveau' in __captured_output__, \"Affiche un message qui combine tes variables.\"",
          description: "Afficher un résumé",
        },
      ],
      successMessage: "Bien joué ! Tes données sont organisées et prêtes à être utilisées.",
      hints: {
        baseline: "Les booléens s'écrivent True ou False avec une majuscule initiale.",
        remedial: "Structure : prenom = 'Lina'. Vérifie que tu utilises = et pas ==.",
        advanced: "Test : change la valeur de motive à False et vois ce qui s'affiche.",
      },
    },
    challenge: {
      id: "module-2-defi",
      title: "Budget express",
      instructions:
        "Stocke le prix d'un café, d'un sandwich et d'un dessert. Calcule la somme totale dans une variable total et affiche-la avec un message clair.",
      starterCode:
        "# Complète avec tes propres chiffres\nprix_cafe = 2.5\nprix_sandwich = 5.0\nprix_dessert = 3.5\n\n# Calcule le total\ntotal = prix_cafe + prix_sandwich + prix_dessert\n\nprint('Total du déjeuner :', total)",
      tests: [
        {
          code: "assert isinstance(total, (int, float)), 'Calcule le total dans une variable.'",
          description: "Variable total",
        },
        {
          code: "assert total == prix_cafe + prix_sandwich + prix_dessert, 'Additionne tous les éléments.'",
          description: "Somme correcte",
        },
        {
          code: "assert 'Total du déjeuner' in __captured_output__, 'Affiche un message clair avec le total.'",
          description: "Message utilisateur",
        },
      ],
      successMessage: "Caisse OK ! Tu sais déjà faire des calculs utiles.",
      hints: {
        baseline: "Additionne les trois prix dans une variable total.",
        remedial: "total = prix_cafe + prix_sandwich + prix_dessert",
        advanced: "Ajoute une variable budget et compare si le repas rentre dedans.",
      },
      reflection: "Dans quelle situation quotidienne aimerais-tu utiliser des variables pour suivre des informations ?",
    },
    quiz: {
      id: "module-2-quiz",
      title: "Quiz éclair : mémoriser des valeurs",
      questions: [
        {
          id: "m2q1",
          prompt: "Quel symbole sert à attribuer une valeur à une variable ?",
          options: ["==", "=", ":="],
          answerIndex: 1,
          explanation: "= affecte une valeur, == compare deux valeurs.",
        },
        {
          id: "m2q2",
          prompt: "Quel type représente un interrupteur Vrai/Faux ?",
          options: ["int", "bool", "str"],
          answerIndex: 1,
          explanation: "bool stocke True ou False.",
        },
        {
          id: "m2q3",
          prompt: "Comment convertir un nombre en texte pour l'afficher avec une phrase ?",
          options: ["str(nombre)", "texte(nombre)", "convert(nombre)"],
          answerIndex: 0,
          explanation: "str() transforme un nombre en chaîne de caractères.",
        },
      ],
    },
    bonus: {
      title: "Bonus : mesurer et transformer",
      description:
        "Teste des fonctions utiles comme type(), len() ou float() pour mieux comprendre tes variables.",
      resources: [
        {
          label: "Documentation officielle sur les types",
          url: "https://docs.python.org/fr/3/library/stdtypes.html",
        },
      ],
    },
  },
  {
    id: "module-3",
    title: "Conditions et logique",
    duration: "55 min",
    objective: "Construire des décisions avec if, elif et else.",
    motivation:
      "Tu vas apprendre à faire réagir ton programme différemment selon la situation, comme un GPS qui adapte son trajet.",
    concept: {
      title: "Choisir un chemin",
      body: [
        "Les conditions permettent d'exécuter un bloc de code seulement si une expression est vraie.",
        "elif signifie 'sinon si' et else signifie 'dans tous les autres cas'.",
        "Les comparaisons utilisent ==, <, >, <=, >=.",
      ],
      analogies: [
        "if est comme vérifier la météo avant de sortir : tu prends un parapluie seulement s'il pleut.",
        "elif est une porte alternative, else est la sortie par défaut.",
      ],
      highlights: [
        "Chaque bloc conditionnel se termine par : et un retrait (indentation).",
        "On peut combiner les tests avec and / or.",
      ],
    },
    demonstration: {
      code: 'temperature = 28\nif temperature > 30:\n    print("Il fait très chaud !")\nelif temperature > 20:\n    print("Temps agréable.")\nelse:\n    print("Prends une petite veste.")',
      explanation: [
        "Le programme teste chaque condition dans l'ordre.",
        "Seule la première condition vraie exécute son bloc.",
      ],
      callToAction: "Change la valeur de temperature pour voir quelle phrase est choisie.",
    },
    exercise: {
      id: "module-3-exo",
      title: "Contrôleur de cinéma",
      instructions:
        "Ajoute une variable tarif. Si age est inférieur à 18, stocke 'Tarif réduit', sinon 'Plein tarif'. Affiche ensuite la valeur de tarif.",
      starterCode:
        "age = 16\ntarif = ''\n\nif age < 18:\n    tarif = 'Tarif réduit'\nelse:\n    tarif = 'Plein tarif'\n\nprint(tarif)\n",
      tests: [
        {
          code: "assert tarif in ['Tarif réduit', 'Plein tarif'], 'Stocke le résultat dans la variable tarif.'",
          description: "Variable tarif",
        },
        {
          code: "assert 'Tarif réduit' in __captured_output__, 'Avec age=16, la sortie doit annoncer le tarif réduit.'",
          description: "Cas tarif réduit",
        },
      ],
      successMessage: "Top ! Ton programme prend les bonnes décisions.",
      hints: {
        baseline: "Utilise < pour vérifier si l'âge est inférieur à 18.",
        remedial: "Structure : if age < 18: ... else: ...",
        advanced: "Teste ton programme en changeant la valeur d'âge.",
      },
    },
    challenge: {
      id: "module-3-defi",
      title: "Feu tricolore",
      instructions:
        "Crée une variable couleur qui vaut 'rouge', 'orange' ou 'vert'. Utilise if/elif/else pour afficher l'action correspondante : stop, ralentis, avance.",
      starterCode:
        "couleur = 'orange'\n\nif couleur == 'rouge':\n    print('Stop !')\nelif couleur == 'orange':\n    print('Prépare-toi, ça va passer au vert.')\nelse:\n    print('Tu peux avancer.')\n",
      tests: [
        {
          code: "assert any(mot in __captured_output__ for mot in ['Stop', 'Prépare-toi', 'avancer']), 'Affiche un message adapté.'",
          description: "Message d'action",
        },
        {
          code: "assert 'if couleur ==' in __user_code__, 'Utilise bien des conditions pour chaque couleur.'",
          description: "Utilisation de conditions",
        },
      ],
      successMessage: "Tes feux fonctionnent ! La circulation est fluide.",
      hints: {
        baseline: "Utilise == pour comparer une valeur exacte.",
        remedial: "if couleur == 'rouge': ... elif couleur == 'orange': ... else: ...",
        advanced: "Ajoute un cas pour une couleur inattendue et affiche un message d'alerte.",
      },
      reflection: "Dans quel autre contexte utiliserais-tu des conditions pour réagir à une situation ?",
    },
    quiz: {
      id: "module-3-quiz",
      title: "Quiz éclair : prendre des décisions",
      questions: [
        {
          id: "m3q1",
          prompt: "Quel mot-clé teste une nouvelle condition si la première est fausse ?",
          options: ["elseif", "elif", "else"],
          answerIndex: 1,
          explanation: "elif signifie 'sinon si' en Python.",
        },
        {
          id: "m3q2",
          prompt: "Quelle comparaison vérifie l'égalité entre deux valeurs ?",
          options: ["=", "==", "!"],
          answerIndex: 1,
          explanation: "== compare deux valeurs en Python.",
        },
        {
          id: "m3q3",
          prompt: "Comment représenter 'sinon' en Python ?",
          options: ["otherwise", "else", "default"],
          answerIndex: 1,
          explanation: "else capture tous les autres cas.",
        },
      ],
    },
    bonus: {
      title: "Bonus : combiner les tests",
      description:
        "Expérimente avec and et or pour vérifier plusieurs conditions à la fois (ex : âge > 12 and âge < 18).",
      resources: [
        {
          label: "Tutoriel : opérateurs logiques",
          url: "https://docs.python.org/fr/3/library/stdtypes.html#boolean-operations-and-or-not",
        },
      ],
    },
  },
  {
    id: "module-4",
    title: "Boucles for et while",
    duration: "60 min",
    objective: "Répéter des actions automatiquement avec for et while.",
    motivation:
      "Tu vas apprendre à éviter les répétitions manuelles. Laisse Python faire le travail en boucle !",
    concept: {
      title: "Répéter sans s'épuiser",
      body: [
        "Une boucle for parcourt une série d'éléments (liste, texte, plage de nombres).",
        "Une boucle while répète tant qu'une condition reste vraie.",
        "break interrompt la boucle, continue saute à l'itération suivante.",
      ],
      analogies: [
        "for est comme cocher chaque élève dans une liste d'appel.",
        "while est comme pédaler jusqu'à atteindre une distance cible.",
      ],
      highlights: [
        "range(5) génère les nombres de 0 à 4.",
        "Attention aux while : pense à faire évoluer la condition pour éviter une boucle infinie.",
      ],
    },
    demonstration: {
      code: 'pourboires = [2, 1, 3]\ntotal = 0\nfor montant in pourboires:\n    total += montant\nprint("Total :", total)',
      explanation: [
        "La boucle for ajoute chaque pourboire au total.",
        "+= est un raccourci pour total = total + montant.",
      ],
      callToAction: "Ajoute un montant supplémentaire et relance la démonstration.",
    },
    exercise: {
      id: "module-4-exo",
      title: "Compteur de pompes",
      instructions:
        "Utilise une boucle for avec range pour afficher les nombres de 1 à 5 inclus.",
      starterCode:
        "for numero in range(1, 6):\n    print('Pompe', numero)\n",
      tests: [
        {
          code: "lignes = [ligne for ligne in __captured_output__.split('\n') if ligne]\nassert len(lignes) == 5, 'Affiche exactement cinq lignes.'",
          description: "Cinq répétitions",
        },
        {
          code: "assert 'Pompe 1' in __captured_output__ and 'Pompe 5' in __captured_output__, 'Commence à 1 et termine à 5.'",
          description: "Bornes correctes",
        },
      ],
      successMessage: "Tu as automatisé ton échauffement !",
      hints: {
        baseline: "range(1, 6) génère 1,2,3,4,5.",
        remedial: "Structure : for numero in range(1, 6): ...",
        advanced: "Ajoute un message spécial à la dernière répétition.",
      },
    },
    challenge: {
      id: "module-4-defi",
      title: "Scanner de liste",
      instructions:
        "Parcours la liste notes = [12, 18, 9, 15]. Affiche seulement les notes supérieures ou égales à 15.",
      starterCode:
        "notes = [12, 18, 9, 15]\n\nfor note in notes:\n    if note >= 15:\n        print('Bravo pour la note', note)\n",
      tests: [
        {
          code: "assert '18' in __captured_output__ and '15' in __captured_output__, 'Affiche toutes les bonnes notes.'",
          description: "Notes retenues",
        },
        {
          code: "assert '12' not in __captured_output__, 'N\"affiche pas les notes inférieures à 15.'",
          description: "Filtrage correct",
        },
      ],
      successMessage: "Analyse réussie ! Tu sais filtrer des données.",
      hints: {
        baseline: "Utilise if note >= 15 à l'intérieur de la boucle.",
        remedial: "Souviens-toi que le bloc if doit être indenté sous la boucle.",
        advanced: "Compte le nombre de notes excellentes avec un compteur.",
      },
      reflection: "Quelle tâche répétitive aimerais-tu automatiser avec une boucle ?",
    },
    quiz: {
      id: "module-4-quiz",
      title: "Quiz éclair : répéter intelligemment",
      questions: [
        {
          id: "m4q1",
          prompt: "Que renvoie range(3) ?",
          options: ["0,1,2", "1,2,3", "3,2,1"],
          answerIndex: 0,
          explanation: "range(3) génère 0,1,2. Ajoute 1 pour démarrer à 1.",
        },
        {
          id: "m4q2",
          prompt: "Comment arrêter une boucle immédiatement ?",
          options: ["stop", "break", "exit"],
          answerIndex: 1,
          explanation: "break quitte la boucle en cours.",
        },
        {
          id: "m4q3",
          prompt: "Quelle boucle répète tant qu'une condition reste vraie ?",
          options: ["for", "while", "loop"],
          answerIndex: 1,
          explanation: "while continue tant que la condition est vraie.",
        },
      ],
    },
    bonus: {
      title: "Bonus : boucles créatives",
      description:
        "Essaie d'afficher un compte à rebours ou de construire une pyramide de symboles avec deux boucles imbriquées.",
      resources: [
        {
          label: "Astuces sur range",
          url: "https://docs.python.org/fr/3/library/functions.html#func-range",
        },
      ],
    },
  },
  {
    id: "module-5",
    title: "Fonctions et réutilisation",
    duration: "55 min",
    objective: "Créer des fonctions pour organiser son code et éviter les répétitions.",
    motivation:
      "Tu vas fabriquer tes propres mini-outils réutilisables. Les fonctions transforment ton code en boîte à outils personnelle !",
    concept: {
      title: "Définir une fonction",
      body: [
        "Une fonction regroupe des instructions sous un nom que tu peux appeler plusieurs fois.",
        "Les paramètres sont les informations que tu donnes à la fonction.",
        "return renvoie un résultat que tu peux stocker dans une variable.",
      ],
      analogies: [
        "Une fonction est une machine à chocolat chaud : tu verses du lait (paramètre) et tu reçois une boisson (résultat).",
        "Définir une fonction, c'est écrire une formule magique que tu peux réciter à volonté.",
      ],
      highlights: [
        "Utilise def nom_fonction(param): pour déclarer une fonction.",
        "Les variables définies dans la fonction ne sont visibles qu'à l'intérieur.",
      ],
    },
    demonstration: {
      code: 'def saluer(prenom):\n    message = f"Bonjour {prenom} !"\n    return message\n\nprint(saluer("Imani"))',
      explanation: [
        "La fonction saluer reçoit un prénom et renvoie un message personnalisé.",
        "return permet d'utiliser la valeur retournée dans un print ou ailleurs.",
      ],
      callToAction: "Appelle la fonction avec ton prénom pour vérifier que tu es bien salué.",
    },
    exercise: {
      id: "module-5-exo",
      title: "Calculateur de carrés",
      instructions:
        "Écris une fonction carre(nombre) qui renvoie le carré du nombre reçu. Affiche ensuite le résultat pour 4 et 9.",
      starterCode:
        "def carre(nombre):\n    return nombre * nombre\n\nprint(carre(4))\nprint(carre(9))\n",
      tests: [
        {
          code: "assert carre(3) == 9, 'La fonction doit renvoyer le carré.'",
          description: "Carré correct",
        },
        {
          code: "assert '16' in __captured_output__ and '81' in __captured_output__, 'Affiche le résultat pour 4 et 9.'",
          description: "Affichages demandés",
        },
      ],
      successMessage: "Magnifique ! Tu viens de créer un outil mathématique.",
      hints: {
        baseline: "return renvoie la valeur calculée.",
        remedial: "return nombre * nombre renvoie le produit du nombre par lui-même.",
        advanced: "Essaie d'ajouter un print explicatif comme 'Le carré de 4 vaut ...'.",
      },
    },
    challenge: {
      id: "module-5-defi",
      title: "Personnaliseur de messages",
      instructions:
        "Crée une fonction presenter(prenom, objectif) qui renvoie une phrase résumant le projet d'une personne. Teste-la avec au moins deux appels différents.",
      starterCode:
        'def presenter(prenom, objectif):\n    return f"{prenom} veut apprendre Python pour {objectif}."\n\nprint(presenter("Lina", "créer un jeu"))\nprint(presenter("Alex", "automatiser ses finances"))\n',
      tests: [
        {
          code: "assert 'veut apprendre Python' in __captured_output__, 'La phrase doit inclure le modèle demandé.'",
          description: "Structure de phrase",
        },
        {
          code: "assert presenter('Mia', 'lancer un blog') == 'Mia veut apprendre Python pour lancer un blog.', 'Respecte le format de retour.'",
          description: "Retour exact",
        },
      ],
      successMessage: "Tes fonctions parlent pour toi !",
      hints: {
        baseline: "Utilise une f-string pour insérer les deux paramètres dans la phrase.",
        remedial: "return f\"{prenom} veut apprendre Python pour {objectif}.\"",
        advanced: "Ajoute un paramètre optionnel ton pour varier le style (enthousiaste, posé...).",
      },
      reflection: "Quelle fonction aimerais-tu créer pour te simplifier la vie ?",
    },
    quiz: {
      id: "module-5-quiz",
      title: "Quiz éclair : fabriquer des outils",
      questions: [
        {
          id: "m5q1",
          prompt: "Que signifie return ?",
          options: [
            "Afficher un résultat",
            "Arrêter la fonction et renvoyer une valeur",
            "Créer une nouvelle variable globale",
          ],
          answerIndex: 1,
          explanation: "return termine la fonction et renvoie la valeur.",
        },
        {
          id: "m5q2",
          prompt: "Comment définir une fonction appelée bonjour sans paramètre ?",
          options: ["function bonjour():", "def bonjour():", "create bonjour()"],
          answerIndex: 1,
          explanation: "def bonjour(): est la syntaxe correcte en Python.",
        },
        {
          id: "m5q3",
          prompt: "Où peut-on utiliser une fonction que l'on a définie ?",
          options: ["Uniquement dans le fichier actuel", "Partout où le code est exécuté après sa définition", "Nulle part"],
          answerIndex: 1,
          explanation: "Une fonction peut être appelée partout après sa définition dans le fichier.",
        },
      ],
    },
    bonus: {
      title: "Bonus : arguments optionnels",
      description:
        "Ajoute des valeurs par défaut à tes fonctions pour les rendre encore plus flexibles (ex : def saluer(prenom, emoji='🙂')).",
      resources: [
        {
          label: "Guide : paramètres par défaut",
          url: "https://docs.python.org/fr/3/tutorial/controlflow.html#defining-functions",
        },
      ],
    },
  },
  {
    id: "module-6",
    title: "Mini-projet : calculatrice bienveillante",
    duration: "90 min",
    objective: "Assembler toutes les notions apprises pour construire un mini-projet complet.",
    motivation:
      "Tu vas créer une calculatrice qui explique ses étapes. C'est ton premier outil complet, prêt à rendre service !",
    concept: {
      title: "Plan d'action",
      body: [
        "Un mini-projet est un ensemble de fonctions reliées qui répondent à un besoin concret.",
        "On combine variables, conditions, boucles et fonctions pour orchestrer la logique.",
        "Le feedback à l'utilisateur est essentiel : explique chaque étape clairement.",
      ],
      analogies: [
        "Construire ce projet, c'est assembler un meuble : chaque module appris est une pièce qui s'emboîte.",
        "Ta calculatrice sera comme un coach qui explique ses calculs ligne par ligne.",
      ],
      highlights: [
        "Découpe ton code en fonctions courtes et lisibles.",
        "Prévoyez des messages d'erreur pour guider l'utilisateur en cas d'opération inconnue.",
      ],
    },
    demonstration: {
      code: 'def addition(a, b):\n    return a + b\n\nprint("2 + 5 =", addition(2, 5))',
      explanation: [
        "On sépare déjà une opération dans une fonction dédiée.",
        "La démonstration montre comment réutiliser cette fonction.",
      ],
      callToAction: "Tu vas maintenant compléter toute la calculatrice en suivant les étapes.",
    },
    exercise: {
      id: "module-6-exo",
      title: "Catalogue d'opérations",
      instructions:
        "Crée quatre fonctions : addition(a, b), soustraction(a, b), multiplication(a, b), division(a, b) qui renvoient chacune le résultat.",
      starterCode:
        "def addition(a, b):\n    return a + b\n\ndef soustraction(a, b):\n    return a - b\n\ndef multiplication(a, b):\n    return a * b\n\ndef division(a, b):\n    if b == 0:\n        return 'Division impossible'\n    return a / b\n",
      tests: [
        {
          code: "assert addition(3, 4) == 7 and soustraction(5, 2) == 3, 'Addition et soustraction doivent être correctes.'",
          description: "Somme et différence",
        },
        {
          code: "assert multiplication(3, 3) == 9, 'Multiplication incorrecte.'",
          description: "Produit",
        },
        {
          code: "assert division(10, 0) == 'Division impossible', 'Gère la division par zéro.'",
          description: "Sécurité division",
        },
      ],
      successMessage: "Tes opérations de base sont prêtes !",
      hints: {
        baseline: "Chaque fonction doit utiliser return pour envoyer le résultat.",
        remedial: "Addition : return a + b. Division : vérifie d'abord si b vaut 0.",
        advanced: "Ajoute une fonction puissance(a, b) pour relever le défi.",
      },
    },
    challenge: {
      id: "module-6-defi",
      title: "Calculatrice coach",
      instructions:
        "Écris une fonction calculatrice(operation, a, b) qui utilise les fonctions précédentes et renvoie un message clair comme 'Résultat : 4 + 2 = 6'. Si l'opération n'existe pas, renvoie 'Opération inconnue'.",
      starterCode:
        'def calculatrice(operation, a, b):\n    if operation == "addition":\n        resultat = addition(a, b)\n        return f"Résultat : {a} + {b} = {resultat}"\n    elif operation == "soustraction":\n        resultat = soustraction(a, b)\n        return f"Résultat : {a} - {b} = {resultat}"\n    elif operation == "multiplication":\n        resultat = multiplication(a, b)\n        return f"Résultat : {a} x {b} = {resultat}"\n    elif operation == "division":\n        resultat = division(a, b)\n        return f"Résultat : {a} ÷ {b} = {resultat}"\n    else:\n        return "Opération inconnue"\n\nprint(calculatrice("addition", 4, 2))\nprint(calculatrice("division", 9, 0))\n',
      tests: [
        {
          code: "assert '6' in calculatrice('addition', 4, 2), 'Addition 4 + 2 devrait afficher 6.'",
          description: "Vérifier addition",
        },
        {
          code: "assert 'Opération inconnue' == calculatrice('modulo', 4, 2), 'Prévois un message pour les opérations non supportées.'",
          description: "Cas inconnu",
        },
        {
          code: "assert 'Division impossible' in calculatrice('division', 9, 0), 'Réutilise la protection de ta fonction division.'",
          description: "Gestion division",
        },
      ],
      successMessage: "Bravo ! Tu as assemblé ta première calculatrice intelligente.",
      hints: {
        baseline: "Utilise elif pour tester chaque opération.",
        remedial: "Retourne immédiatement le message correspondant à l'opération trouvée.",
        advanced: "Ajoute une boucle pour demander une nouvelle opération tant que l'utilisateur ne tape pas 'stop'.",
      },
      reflection: "Quelles autres fonctionnalités pourrais-tu ajouter (historique des opérations, conversion de devises...) ?",
    },
    quiz: {
      id: "module-6-quiz",
      title: "Quiz éclair : projet complet",
      questions: [
        {
          id: "m6q1",
          prompt: "Pourquoi découper ton projet en fonctions ?",
          options: [
            "Pour écrire moins de lignes",
            "Pour organiser le code, le tester facilement et le réutiliser",
            "Pour que Python s'exécute plus vite",
          ],
          answerIndex: 1,
          explanation: "Les fonctions rendent le code clair et réutilisable.",
        },
        {
          id: "m6q2",
          prompt: "Que faire si l'utilisateur demande une opération inconnue ?",
          options: ["Arrêter le programme", "Renvoyer un message explicite", "Ignorer la demande"],
          answerIndex: 1,
          explanation: "Informer l'utilisateur évite la frustration et rend l'outil fiable.",
        },
        {
          id: "m6q3",
          prompt: "Quel est l'intérêt de renvoyer des messages détaillés dans la calculatrice ?",
          options: ["Ajouter de la couleur", "Donner du contexte et apprendre en même temps", "Allonger le code"],
          answerIndex: 1,
          explanation: "Expliquer chaque étape aide l'utilisateur à apprendre en lisant le résultat.",
        },
      ],
    },
    bonus: {
      title: "Bonus : interface utilisateur",
      description:
        "Transforme la calculatrice en mini-chatbot en demandant les valeurs avec input() et en affichant les résultats progressivement.",
      resources: [
        {
          label: "Guide : boucle while pour répéter une action",
          url: "https://docs.python.org/fr/3/tutorial/controlflow.html#while",
        },
      ],
    },
  },
];

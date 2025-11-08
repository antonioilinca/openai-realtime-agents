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
    title: "Textes dynamiques et calculs",
    duration: "55 min",
    objective:
      "Assembler des nombres et des chaînes avec des opérations simples, des conversions et des f-strings.",
    motivation:
      "Tu vas mettre en forme des messages dynamiques : Python devient ton assistant pour expliquer des résultats clairs.",
    concept: {
      title: "Mixer chiffres et phrases",
      body: [
        "Les opérateurs +, -, *, / permettent de réaliser des calculs.",
        "Pour mélanger nombres et texte, utilise str() ou les f-strings (f\"{variable}\").",
        "round(nombre, 2) arrondit un résultat à deux décimales.",
      ],
      analogies: [
        "Une f-string est comme un gabarit de carte postale où tu glisses tes valeurs à l'intérieur.",
        "Les conversions sont des traducteurs : int() transforme un texte '42' en nombre 42.",
      ],
      highlights: [
        "Ajoute des parenthèses pour contrôler l'ordre des opérations.",
        "Utilise // pour la division entière et % pour obtenir le reste.",
      ],
    },
    demonstration: {
      code: 'minutes_pratique = 45\nmodules_realises = 2\nratio = minutes_pratique / 60\nprint(f"Tu as déjà complété {modules_realises} modules !")\nprint(f"Cela représente {round(ratio * 100, 1)}% d\'une heure dédiée à Python.")',
      explanation: [
        "ratio contient un calcul intermédiaire que l'on arrondit pour le rendre lisible.",
        "Les f-strings permettent d'inclure directement les valeurs dans la phrase.",
      ],
      callToAction: "Modifie les nombres pour afficher ton propre rythme d'apprentissage.",
    },
    exercise: {
      id: "module-3-exo",
      title: "Plan de session",
      instructions:
        "Crée une variable duree_totale en minutes (ex : 120). Calcule combien d'heures et de minutes cela représente et affiche le résultat avec une phrase claire.",
      starterCode:
        "duree_totale = 120\nheures = duree_totale // 60\nminutes_restantes = duree_totale % 60\n\nprint(f\"Ta session dure {heures} heure(s) et {minutes_restantes} minute(s).\")\n",
      tests: [
        {
          code: "assert heures == duree_totale // 60, 'Calcule le nombre d\"heures avec //.'",
          description: "Calcul des heures",
        },
        {
          code: "assert minutes_restantes == duree_totale % 60, 'Utilise % pour obtenir le reste en minutes.'",
          description: "Calcul des minutes",
        },
        {
          code: "assert 'heure' in __captured_output__, 'Explique ton résultat avec une phrase complète.'",
          description: "Phrase explicative",
        },
      ],
      successMessage: "Lecture du planning validée !",
      hints: {
        baseline: "// donne le quotient entier, % donne le reste.",
        remedial: "heures = duree_totale // 60 et minutes_restantes = duree_totale % 60",
        advanced: "Ajoute le nombre total de secondes avec duree_totale * 60.",
      },
    },
    challenge: {
      id: "module-3-defi",
      title: "Score de quiz",
      instructions:
        "Calcule un pourcentage de réussite : points_obtenus / points_totaux * 100. Affiche un message différent selon que le score est <50, entre 50 et 80, ou ≥80.",
      starterCode:
        "points_obtenus = 17\npoints_totaux = 20\n\nscore = round(points_obtenus / points_totaux * 100, 1)\n\nif score < 50:\n    message = 'On reprend calmement les bases.'\nelif score < 80:\n    message = 'Beau score, continue !'\nelse:\n    message = 'Excellent, tu maîtrises !'\n\nprint(f\"Résultat : {score}% - {message}\")\n",
      tests: [
        {
          code: "assert isinstance(score, float), 'Calcule le score en pourcentage.'",
          description: "Score numérique",
        },
        {
          code: "assert score == round(points_obtenus / points_totaux * 100, 1), 'Arrondis ton score à une décimale.'",
          description: "Arrondi correct",
        },
        {
          code: "assert any(mot in __captured_output__ for mot in ['bases', 'continue', 'maîtrises']), 'Affiche un message adapté.'",
          description: "Feedback dynamique",
        },
      ],
      successMessage: "Score calculé comme un pro !",
      hints: {
        baseline: "Multiplie par 100 pour obtenir un pourcentage.",
        remedial: "score = round(points_obtenus / points_totaux * 100, 1)",
        advanced: "Personnalise le message avec le prénom de l'utilisateur.",
      },
      reflection: "Quel indicateur aimerais-tu suivre automatiquement (progression, motivation, pauses...) ?",
    },
    quiz: {
      id: "module-3-quiz",
      title: "Quiz éclair : combiner texte et chiffres",
      questions: [
        {
          id: "m3q1",
          prompt: "Quel symbole récupère le reste d'une division ?",
          options: ["%", "//", "**"],
          answerIndex: 0,
          explanation: "% renvoie le reste de la division entière.",
        },
        {
          id: "m3q2",
          prompt: "Quelle syntaxe permet d'insérer directement une variable dans du texte ?",
          options: ["text(${variable})", "f\"{variable}\"", "print(variable)"],
          answerIndex: 1,
          explanation: "Les f-strings commencent par f et contiennent des accolades.",
        },
        {
          id: "m3q3",
          prompt: "round(12.345, 2) renvoie :",
          options: ["12.34", "12.35", "12"],
          answerIndex: 1,
          explanation: "round arrondit à deux décimales : 12.35.",
        },
      ],
    },
    bonus: {
      title: "Bonus : statistiques rapides",
      description:
        "Explore les fonctions min(), max() et sum() pour analyser rapidement une liste de notes.",
      resources: [
        {
          label: "Tutoriel : opérations mathématiques",
          url: "https://docs.python.org/fr/3/library/math.html",
        },
      ],
    },
  },
  {
    id: "module-4",
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
      id: "module-4-exo",
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
      id: "module-4-defi",
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
      id: "module-4-quiz",
      title: "Quiz éclair : prendre des décisions",
      questions: [
        {
          id: "m4q1",
          prompt: "Quel mot-clé teste une nouvelle condition si la première est fausse ?",
          options: ["elseif", "elif", "else"],
          answerIndex: 1,
          explanation: "elif signifie 'sinon si' en Python.",
        },
        {
          id: "m4q2",
          prompt: "Quelle comparaison vérifie l'égalité entre deux valeurs ?",
          options: ["=", "==", "!"],
          answerIndex: 1,
          explanation: "== compare deux valeurs en Python.",
        },
        {
          id: "m4q3",
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
    id: "module-5",
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
      id: "module-5-exo",
      title: "Compteur de pompes",
      instructions:
        "Utilise une boucle for avec range pour afficher les nombres de 1 à 5 inclus.",
      starterCode:
        "for numero in range(1, 6):\n    print('Pompe', numero)\n",
      tests: [
        {
          code: "lignes = [ligne for ligne in __captured_output__.split('\\n') if ligne]\nassert len(lignes) == 5, 'Affiche exactement cinq lignes.'",
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
      id: "module-5-defi",
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
          code: "assert '12' not in __captured_output__, 'N'affiche pas les notes inférieures à 15.'",
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
      id: "module-5-quiz",
      title: "Quiz éclair : répéter intelligemment",
      questions: [
        {
          id: "m5q1",
          prompt: "Que renvoie range(3) ?",
          options: ["0,1,2", "1,2,3", "3,2,1"],
          answerIndex: 0,
          explanation: "range(3) génère 0,1,2. Ajoute 1 pour démarrer à 1.",
        },
        {
          id: "m5q2",
          prompt: "Comment arrêter une boucle immédiatement ?",
          options: ["stop", "break", "exit"],
          answerIndex: 1,
          explanation: "break quitte la boucle en cours.",
        },
        {
          id: "m5q3",
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
    id: "module-6",
    title: "Listes et dictionnaires",
    duration: "65 min",
    objective:
      "Structurer plusieurs informations et les modifier facilement avec les méthodes de liste et de dictionnaire.",
    motivation:
      "Tu vas organiser des données comme un pro : des listes pour tes tâches, des dictionnaires pour tes profils utilisateurs.",
    concept: {
      title: "Collections ordonnées et associatives",
      body: [
        "Une liste [] garde un ordre et peut contenir différents types.",
        "Un dictionnaire {} associe une clé à une valeur (clé: valeur).",
        "append(), pop(), keys(), values() sont des méthodes courantes.",
      ],
      analogies: [
        "Une liste est une file d'attente : les éléments sont rangés les uns derrière les autres.",
        "Un dictionnaire est une armoire à casiers étiquetés : chaque clé ouvre sur une information précise.",
      ],
      highlights: [
        "On accède à un élément de liste par son index (liste[0]).",
        "On accède à un dictionnaire par sa clé (profil['prenom']).",
      ],
    },
    demonstration: {
      code: "taches = ['Pratiquer 20 minutes', 'Relire mes notes', 'Boire de l'eau']\nprofil = {'prenom': 'Noa', 'niveau': 'débutant', 'objectif': 'automatiser ses finances'}\n\nprint('Tâche du jour :', taches[0])\nprofil['niveau'] = 'motivé'\nprint('Profil mis à jour :', profil)",
      explanation: [
        "On accède au premier élément de la liste avec l'index 0.",
        "On modifie la valeur d'une clé dans le dictionnaire comme si l'on remplaçait la fiche d'un casier.",
      ],
      callToAction: "Ajoute une nouvelle tâche avec append() et observe la liste évoluer.",
    },
    exercise: {
      id: "module-6-exo",
      title: "Liste de révisions",
      instructions:
        "Crée une liste revisions qui contient trois sujets (ex : variables, boucles, fonctions). Affiche le nombre d'éléments puis le dernier sujet à revoir.",
      starterCode:
        "revisions = ['variables', 'boucles', 'fonctions']\n\nprint('À revoir :', len(revisions), 'sujets')\nprint('Je termine par :', revisions[-1])\n",
      tests: [
        {
          code: "assert isinstance(revisions, list) and len(revisions) >= 3, 'Ta liste doit contenir au moins trois sujets.'",
          description: "Liste créée",
        },
        {
          code: "assert str(len(revisions)) in __captured_output__, 'Affiche le nombre de sujets.'",
          description: "Affichage du compteur",
        },
        {
          code: "assert revisions[-1] in __captured_output__, 'Montre le dernier élément de ta liste.'",
          description: "Dernier élément",
        },
      ],
      successMessage: "Plan de révision prêt !",
      hints: {
        baseline: "len(liste) renvoie le nombre d'éléments.",
        remedial: "Utilise revisions[-1] pour obtenir le dernier élément.",
        advanced: "Trie ta liste par ordre alphabétique avec revisions.sort().",
      },
    },
    challenge: {
      id: "module-6-defi",
      title: "Tableau de bord apprentissage",
      instructions:
        "Crée un dictionnaire progression avec les clés 'modules_finis', 'minutes', 'motivation'. Mets à jour la clé 'minutes' en ajoutant 30 et affiche chaque information sur une ligne distincte.",
      starterCode:
        "progression = {'modules_finis': 2, 'minutes': 90, 'motivation': 'élevée'}\nprogression['minutes'] += 30\n\nfor cle, valeur in progression.items():\n    print(f\"{cle} : {valeur}\")\n",
      tests: [
        {
          code: "assert isinstance(progression, dict), 'Utilise bien un dictionnaire.'",
          description: "Structure dictionnaire",
        },
        {
          code: "assert progression['minutes'] >= 120, 'Ajoute 30 minutes à la progression.'",
          description: "Mise à jour",
        },
        {
          code: "assert all(clé in __captured_output__ for clé in ['modules_finis', 'minutes', 'motivation']), 'Affiche chaque clé et valeur.'",
          description: "Affichage complet",
        },
      ],
      successMessage: "Dashboard prêt : tu vois tes progrès d'un coup d'œil !",
      hints: {
        baseline: "progression['minutes'] += 30 ajoute 30 à la valeur existante.",
        remedial: "Boucle : for cle, valeur in progression.items(): print(cle, valeur)",
        advanced: "Ajoute une clé 'objectif' et affiche-la également.",
      },
      reflection: "Quelle information voudrais-tu suivre chaque semaine pour mesurer ton apprentissage ?",
    },
    quiz: {
      id: "module-6-quiz",
      title: "Quiz éclair : collections de données",
      questions: [
        {
          id: "m6q1",
          prompt: "Quel index récupère le premier élément d'une liste ?",
          options: ["0", "1", "-1"],
          answerIndex: 0,
          explanation: "Les listes commencent à l'index 0 en Python.",
        },
        {
          id: "m6q2",
          prompt: "Quelle méthode ajoute un élément à la fin d'une liste ?",
          options: ["add()", "append()", "push()"],
          answerIndex: 1,
          explanation: "append() colle l'élément à la fin de la liste.",
        },
        {
          id: "m6q3",
          prompt: "Comment parcourir les paires clé/valeur d'un dictionnaire ?",
          options: ["for element in dict", "for cle, valeur in dict.items()", "for dict"],
          answerIndex: 1,
          explanation: "items() renvoie les couples (clé, valeur).",
        },
      ],
    },
    bonus: {
      title: "Bonus : listes imbriquées",
      description:
        "Crée une liste de dictionnaires pour représenter plusieurs apprenants et filtre ceux qui ont terminé plus de 3 modules.",
      resources: [
        {
          label: "Documentation : méthodes de liste",
          url: "https://docs.python.org/fr/3/tutorial/datastructures.html",
        },
      ],
    },
  },
  {
    id: "module-7",
    title: "Boucles avancées et compréhensions",
    duration: "60 min",
    objective:
      "Optimiser les parcours de listes avec enumerate, zip et les compréhensions de listes.",
    motivation:
      "Tu vas rendre ton code plus expressif tout en écrivant moins de lignes : idéal pour analyser rapidement des données.",
    concept: {
      title: "Itérations express",
      body: [
        "enumerate(liste) fournit l'index et la valeur à chaque tour.",
        "zip(l1, l2) parcourt deux listes en parallèle.",
        "Les compréhensions [expression for element in liste] permettent de créer une nouvelle liste en une ligne.",
      ],
      analogies: [
        "enumerate, c'est comme numéroter les pages d'un carnet pendant que tu les lis.",
        "Une compréhension de liste est une machine à trier qui transforme automatiquement chaque élément.",
      ],
      highlights: [
        "Ajoute une condition dans une compréhension : [x for x in liste if x > 0].",
        "Utilise sum(...) avec une compréhension pour calculer rapidement un total filtré.",
      ],
    },
    demonstration: {
      code: "notes = [14, 17, 19]\nfor index, note in enumerate(notes, start=1):\n    print(f'Note {index} : {note}')\n\nbonus = [note + 1 for note in notes]\nprint('Notes bonifiées :', bonus)",
      explanation: [
        "enumerate ajoute automatiquement un compteur.",
        "La compréhension crée une nouvelle liste sans modifier l'originale.",
      ],
      callToAction: "Ajoute une condition pour ne bonifier que les notes inférieures à 18.",
    },
    exercise: {
      id: "module-7-exo",
      title: "Checklist détaillée",
      instructions:
        "À partir de la liste objectifs = ['Lire', 'Coder', 'Tester'], affiche chaque objectif numéroté (1 - Lire, etc.) grâce à enumerate.",
      starterCode:
        "objectifs = ['Lire', 'Coder', 'Tester']\n\nfor position, nom in enumerate(objectifs, start=1):\n    print(f\"{position} - {nom}\")\n",
      tests: [
        {
          code: "assert '1 - Lire' in __captured_output__, 'Commence la numérotation à 1.'",
          description: "Première ligne",
        },
        {
          code: "assert all(item in __captured_output__ for item in ['Coder', 'Tester']), 'Affiche tous les objectifs.'",
          description: "Tous les éléments",
        },
      ],
      successMessage: "Liste numérotée impeccablement !",
      hints: {
        baseline: "enumerate(objectifs, start=1) fournit (1, 'Lire'), puis (2, 'Coder'), ...",
        remedial: "Déstructure la paire : for position, nom in enumerate(...):",
        advanced: "Ajoute une compréhension pour créer ['✅ Lire', ...].",
      },
    },
    challenge: {
      id: "module-7-defi",
      title: "Analyse de progression",
      instructions:
        "On te donne minutes = [25, 40, 35, 50]. Crée une nouvelle liste longues_sessions contenant seulement les durées >= 35 grâce à une compréhension, puis affiche la moyenne de ces longues sessions.",
      starterCode:
        "minutes = [25, 40, 35, 50]\nlongues_sessions = [duree for duree in minutes if duree >= 35]\n\nif longues_sessions:\n    moyenne = sum(longues_sessions) / len(longues_sessions)\n    print('Sessions solides :', longues_sessions)\n    print('Moyenne :', round(moyenne, 1), 'minutes')\nelse:\n    print('Pas de sessions longues pour le moment.')\n",
      tests: [
        {
          code: "assert longues_sessions == [40, 35, 50], 'Filtre les durées supérieures ou égales à 35.'",
          description: "Filtre correct",
        },
        {
          code: "assert 'Moyenne' in __captured_output__, 'Affiche la moyenne des sessions filtrées.'",
          description: "Calcul moyenne",
        },
      ],
      successMessage: "Analyse filtrée réussie !",
      hints: {
        baseline: "[duree for duree in minutes if condition] crée une nouvelle liste filtrée.",
        remedial: "N'oublie pas de diviser par len(longues_sessions) pour la moyenne.",
        advanced: "Trie la liste filtrée par ordre décroissant avec sorted(..., reverse=True).",
      },
      reflection: "Quelles données voudrais-tu filtrer automatiquement (temps, points, tâches...) ?",
    },
    quiz: {
      id: "module-7-quiz",
      title: "Quiz éclair : itérations express",
      questions: [
        {
          id: "m7q1",
          prompt: "Quel mot-clé te donne à la fois l'index et la valeur dans une boucle ?",
          options: ["enumerate", "index", "count"],
          answerIndex: 0,
          explanation: "enumerate renvoie des paires (index, valeur).",
        },
        {
          id: "m7q2",
          prompt: "Quel sera le résultat de [x*2 for x in [1, 2, 3]] ?",
          options: ["[1, 2, 3]", "[2, 4, 6]", "[1, 4, 9]"],
          answerIndex: 1,
          explanation: "Chaque élément est multiplié par 2.",
        },
        {
          id: "m7q3",
          prompt: "zip([1, 2], ['a', 'b']) produit :",
          options: ["[(1, 'a'), (2, 'b')]", "[(1, 'a'), (1, 'b')]", "[('a', 1), ('b', 2)]"],
          answerIndex: 0,
          explanation: "zip assemble les éléments correspondants des deux listes.",
        },
      ],
    },
    bonus: {
      title: "Bonus : statistiques express",
      description:
        "Combine zip() et les compréhensions pour calculer des moyennes pondérées (notes et coefficients).",
      resources: [
        {
          label: "Compréhensions de liste",
          url: "https://docs.python.org/fr/3/tutorial/datastructures.html#list-comprehensions",
        },
      ],
    },
  },
  {
    id: "module-8",
    title: "Fonctions et modularité",
    duration: "65 min",
    objective:
      "Créer, documenter et réutiliser des fonctions avec paramètres optionnels pour structurer ton code.",
    motivation:
      "Tu vas fabriquer ta propre boîte à outils : des fonctions bien nommées pour résoudre chaque problème rapidement.",
    concept: {
      title: "Construire ses outils",
      body: [
        "def nom_de_fonction(parametre): permet de définir une fonction.",
        "return renvoie un résultat réutilisable ailleurs dans ton programme.",
        "Les paramètres optionnels (param=valeur) donnent une valeur par défaut.",
      ],
      analogies: [
        "Une fonction est une recette que tu peux suivre à volonté.",
        "Les paramètres optionnels sont comme des ingrédients que tu peux laisser à zéro si tu n'en as pas besoin.",
      ],
      highlights: [
        "Ajoute une docstring triple quotes pour décrire l'objectif de la fonction.",
        "Tu peux renvoyer plusieurs valeurs sous forme de tuple ou de dictionnaire.",
      ],
    },
    demonstration: {
      code: 'def encourager(nom, objectif="apprendre Python"):\n    """Retourne un message personnalisé."""\n    return f"{nom}, continue vers {objectif}!"\n\nprint(encourager("Aya"))\nprint(encourager("Sam", "ton mini-projet"))',
      explanation: [
        "objectif a une valeur par défaut qui peut être remplacée.",
        "La docstring explique ce que fait la fonction : pratique pour les lecteurs et les outils.",
      ],
      callToAction: "Ajoute un paramètre bonus pour préciser le temps restant et affiche-le dans la phrase.",
    },
    exercise: {
      id: "module-8-exo",
      title: "Chronomètre motivant",
      instructions:
        "Écris une fonction resume_session(nom, minutes, pause=5) qui renvoie un message comme 'Lina a pratiqué 40 minutes. Pause recommandée : 5 min'.",
      starterCode:
        "def resume_session(nom, minutes, pause=5):\n    message = f'{nom} a pratiqué {minutes} minutes. Pause recommandée : {pause} min\"\n    return message\n\nresultat = resume_session('Lina', 40)\nprint(resultat)\n",
      tests: [
        {
          code: "assert resume_session('Lina', 40) == 'Lina a pratiqué 40 minutes. Pause recommandée : 5 min', 'Utilise la valeur par défaut de pause.'",
          description: "Valeur par défaut",
        },
        {
          code: "assert '10' in resume_session('Noa', 30, pause=10), 'Autorise la personnalisation de la pause.'",
          description: "Paramètre optionnel",
        },
        {
          code: "assert 'pratiqué' in resume_session('Aya', 25), 'Formule un message complet.'",
          description: "Message complet",
        },
      ],
      successMessage: "Super ! Tes fonctions encouragent les apprenants.",
      hints: {
        baseline: "Déclare la fonction avec pause=5 dans la signature.",
        remedial: "return message termine la fonction en renvoyant le texte.",
        advanced: "Ajoute un paramètre emoji='💪' pour personnaliser encore plus.",
      },
    },
    challenge: {
      id: "module-8-defi",
      title: "Plan d'entraînement modulaire",
      instructions:
        "Crée une fonction planifier(session, intensite='modérée') qui renvoie un dictionnaire avec les clés 'session', 'intensite', 'message'. Utilise une fonction auxiliaire generer_message(intensite) pour produire le texte.",
      starterCode:
        "def generer_message(intensite):\n    if intensite == 'douce':\n        return 'On avance pas à pas.'\n    elif intensite == 'intense':\n        return 'Prêt pour un défi costaud !'\n    return 'Rythme équilibré et durable.'\n\ndef planifier(session, intensite='modérée'):\n    return {\n        'session': session,\n        'intensite': intensite,\n        'message': generer_message(intensite)\n    }\n\nprogramme = planifier('Boucles et conditions')\nprint(programme)\n",
      tests: [
        {
          code: "assert isinstance(planifier('Test'), dict), 'Retourne un dictionnaire.'",
          description: "Structure attendue",
        },
        {
          code: "assert planifier('Test')['message'] == 'Rythme équilibré et durable.', 'Utilise generer_message pour la valeur par défaut.'",
          description: "Message par défaut",
        },
        {
          code: "assert planifier('Sprint', 'intense')['message'] == 'Prêt pour un défi costaud !', 'Gère le cas intense.'",
          description: "Cas intense",
        },
      ],
      successMessage: "Plan personnalisé validé !",
      hints: {
        baseline: "Appelle generer_message à l'intérieur de planifier.",
        remedial: "Retourne un dictionnaire avec les trois clés demandées.",
        advanced: "Ajoute un champ 'duree_estimee' calculé selon l'intensité.",
      },
      reflection: "Quelle fonction pourrais-tu créer pour automatiser un aspect de ton quotidien (planning, sport, finances...) ?",
    },
    quiz: {
      id: "module-8-quiz",
      title: "Quiz éclair : structurer son code",
      questions: [
        {
          id: "m8q1",
          prompt: "Quel mot-clé termine immédiatement une fonction en renvoyant une valeur ?",
          options: ["yield", "return", "break"],
          answerIndex: 1,
          explanation: "return quitte la fonction et transmet une valeur.",
        },
        {
          id: "m8q2",
          prompt: "Comment définir un paramètre optionnel ?",
          options: ["def f(x optional)", "def f(x=valeur)", "def f(optional x)"],
          answerIndex: 1,
          explanation: "On assigne une valeur par défaut directement dans la signature.",
        },
        {
          id: "m8q3",
          prompt: "À quoi sert une docstring ?",
          options: ["À exécuter la fonction", "À documenter son comportement", "À accélérer le programme"],
          answerIndex: 1,
          explanation: "La docstring décrit la fonction pour les humains et les outils.",
        },
      ],
    },
    bonus: {
      title: "Bonus : fonctions pures",
      description:
        "Explore les fonctions lambda et les annotations de type pour rendre ton code encore plus explicite.",
      resources: [
        {
          label: "Guide : fonctions", 
          url: "https://docs.python.org/fr/3/tutorial/controlflow.html#defining-functions",
        },
      ],
    },
  },
  {
    id: "module-9",
    title: "Bibliothèques standard et hasard contrôlé",
    duration: "60 min",
    objective:
      "Importer des modules Python (math, random, statistics) pour enrichir tes programmes.",
    motivation:
      "Tu vas t'appuyer sur la bibliothèque standard pour aller plus vite : comme utiliser des super-pouvoirs déjà prêts.",
    concept: {
      title: "S'appuyer sur les modules",
      body: [
        "import math donne accès à des fonctions comme sqrt ou ceil.",
        "random.seed(x) permet de rendre les tirages aléatoires reproductibles.",
        "statistics.mean calcule rapidement des moyennes.",
      ],
      analogies: [
        "Importer un module, c'est inviter un expert à rejoindre ton équipe.",
        "random.seed est comme fixer la position de départ d'une roulette pour comparer les résultats.",
      ],
      highlights: [
        "On peut renommer un module : import statistics as stats.",
        "from random import choice importe uniquement la fonction choice.",
      ],
    },
    demonstration: {
      code: 'import math\nimport random\n\nrandom.seed(0)\nrayon = 3\naire = math.pi * rayon ** 2\nprint("Aire du cercle :", round(aire, 2))\nprint("Échantillon surprise :", random.randint(1, 10))',
      explanation: [
        "math.pi fournit la constante π.",
        "random.seed(0) garantit que randint renvoie toujours la même valeur lors des tests.",
      ],
      callToAction: "Change le rayon ou le seed pour observer l'impact sur les résultats.",
    },
    exercise: {
      id: "module-9-exo",
      title: "Calculateur de cercle",
      instructions:
        "Écris une fonction surface_et_perimetre(rayon) qui utilise math.pi pour renvoyer un tuple (surface, perimetre) arrondi à 2 décimales.",
      starterCode:
        "import math\n\ndef surface_et_perimetre(rayon):\n    surface = round(math.pi * rayon ** 2, 2)\n    perimetre = round(2 * math.pi * rayon, 2)\n    return surface, perimetre\n\nprint(surface_et_perimetre(2))\n",
      tests: [
        {
          code: "assert surface_et_perimetre(2) == (12.57, 12.57), 'Vérifie la formule du cercle.'",
          description: "Résultat correct",
        },
        {
          code: "assert isinstance(surface_et_perimetre(2), tuple), 'Retourne bien un tuple.'",
          description: "Type de retour",
        },
        {
          code: "s, p = surface_et_perimetre(3)\nassert s > p / 2, 'La surface doit être cohérente avec le périmètre.'",
          description: "Cohérence",
        },
      ],
      successMessage: "Géométrie maîtrisée !",
      hints: {
        baseline: "math.pi contient la valeur de π.",
        remedial: "Renvoie surface, perimetre dans cet ordre.",
        advanced: "Ajoute une troisième valeur : le diamètre (2 * rayon).",
      },
    },
    challenge: {
      id: "module-9-defi",
      title: "Générateur d'exercices",
      instructions:
        "Utilise random.seed(42) puis crée une fonction exercice_aleatoire() qui renvoie une question parmi trois modèles (addition, multiplication, comparaison) et la réponse attendue.",
      starterCode:
        "import random\n\nrandom.seed(42)\nMODELES = [\n    ('addition', lambda: ('Calcule 3 + 7', 3 + 7)),\n    ('multiplication', lambda: ('Calcule 4 * 6', 4 * 6)),\n    ('comparaison', lambda: ('Quel nombre est le plus grand entre 8 et 5 ?', max(8, 5)))\n]\n\ndef exercice_aleatoire():\n    nom, constructeur = random.choice(MODELES)\n    question, reponse = constructeur()\n    return {'type': nom, 'question': question, 'reponse': reponse}\n\nprint(exercice_aleatoire())\n",
      tests: [
        {
          code: "resultat = exercice_aleatoire()\nassert set(resultat.keys()) == {'type', 'question', 'reponse'}, 'Retourne un dictionnaire complet.'",
          description: "Structure",
        },
        {
          code: "random.seed(42)\nresultat = exercice_aleatoire()\nassert resultat['type'] == 'multiplication', 'Avec seed(42), le premier tirage doit être une multiplication.'",
          description: "Seed reproductible",
        },
        {
          code: "assert isinstance(resultat['reponse'], int), 'Chaque réponse doit être un nombre.'",
          description: "Type de réponse",
        },
      ],
      successMessage: "Tes exercices automatiques sont prêts !",
      hints: {
        baseline: "random.choice sélectionne un élément de la liste.",
        remedial: "Retourne un dictionnaire avec les trois clés demandées.",
        advanced: "Ajoute un paramètre pour modifier le seed en fonction du jour.",
      },
      reflection: "Quel autre module aimerais-tu explorer (datetime, pathlib, json...) pour enrichir ton projet ?",
    },
    quiz: {
      id: "module-9-quiz",
      title: "Quiz éclair : bibliothèque standard",
      questions: [
        {
          id: "m9q1",
          prompt: "Quelle instruction importe seulement la fonction sqrt depuis math ?",
          options: ["import math.sqrt", "from math import sqrt", "math = import sqrt"],
          answerIndex: 1,
          explanation: "from math import sqrt charge uniquement sqrt.",
        },
        {
          id: "m9q2",
          prompt: "À quoi sert random.seed(10) ?",
          options: ["À accélérer random", "À rendre les tirages reproductibles", "À supprimer le hasard"],
          answerIndex: 1,
          explanation: "Le seed fixe le point de départ des tirages aléatoires.",
        },
        {
          id: "m9q3",
          prompt: "statistics.mean([2, 4, 6]) renvoie :",
          options: ["4", "6", "3"],
          answerIndex: 0,
          explanation: "La moyenne de 2,4,6 vaut 4.",
        },
      ],
    },
    bonus: {
      title: "Bonus : JSON et API",
      description:
        "Découvre le module json pour lire/écrire des données structurées et prépare-toi à consommer des API.",
      resources: [
        {
          label: "Documentation : bibliothèque standard",
          url: "https://docs.python.org/fr/3/library/index.html",
        },
      ],
    },
  },
  {
    id: "module-10",
    title: "Fichiers et gestion d'erreurs",
    duration: "70 min",
    objective:
      "Lire et écrire des fichiers texte tout en anticipant les erreurs avec try/except.",
    motivation:
      "Tu vas apprendre à garder une trace persistante de tes progrès et à protéger ton programme des imprévus.",
    concept: {
      title: "Persistance et robustesse",
      body: [
        "open('fichier.txt', 'w') crée ou écrase un fichier pour écrire.",
        "with garantit la fermeture automatique du fichier.",
        "try/except capture une erreur et évite que le programme ne s'arrête brutalement.",
      ],
      analogies: [
        "Un fichier est un carnet que tu remplis ligne après ligne.",
        "try/except est un filet de sécurité : il attrape les chutes.",
      ],
      highlights: [
        "Utilise 'a' pour ajouter à la fin du fichier sans écraser.",
        "except ValueError cible uniquement l'erreur de conversion.",
      ],
    },
    demonstration: {
      code: "with open('journal.txt', 'w', encoding='utf-8') as fichier:\n    fichier.write('Jour 1 : Découverte de Python\\n')\n\ntry:\n    nombre = int('42')\n    print('Conversion réussie :', nombre)\nexcept ValueError:\n    print('Impossible de convertir.')",
      explanation: [
        "Le bloc with écrit une ligne dans journal.txt.",
        "Le try/except évite l'erreur si la conversion échoue.",
      ],
      callToAction: "Ajoute une deuxième ligne au fichier puis teste ce qui se passe si tu convertis 'quarante-deux'.",
    },
    exercise: {
      id: "module-10-exo",
      title: "Journal de progression",
      instructions:
        "Écris une fonction enregistrer_progression(message) qui ouvre le fichier 'journal_progression.txt' en mode append et ajoute le message suivi d'un saut de ligne. Retourne le nombre de caractères écrits.",
      starterCode:
        "def enregistrer_progression(message):\n    with open('journal_progression.txt', 'a', encoding='utf-8') as fichier:\n        retour = fichier.write(message + '\\n')\n    return retour\n\nprint(enregistrer_progression('Jour 1 : variables'))\n",
      tests: [
        {
          code: "import os\nif os.path.exists('journal_progression.txt'):\n    os.remove('journal_progression.txt')\nnb = enregistrer_progression('Test 1')\nwith open('journal_progression.txt', 'r', encoding='utf-8') as f:\n    contenu = f.read()\nassert 'Test 1' in contenu, 'Écris le message dans le fichier.'",
          description: "Écriture du fichier",
        },
        {
          code: "nb = enregistrer_progression('Test 2')\nassert nb == len('Test 2') + 1, 'Retourne le nombre de caractères écrits (avec le saut de ligne).",
          description: "Retour valeur",
        },
      ],
      successMessage: "Journal sauvegardé !",
      hints: {
        baseline: "Ouvre le fichier en mode 'a' pour ajouter sans effacer.",
        remedial: "write() renvoie le nombre de caractères écrits : stocke ce retour.",
        advanced: "Ajoute un timestamp automatique avec datetime.now().",
      },
    },
    challenge: {
      id: "module-10-defi",
      title: "Nettoyeur de données",
      instructions:
        "Tu reçois une liste valeurs = ['12', '9', 'abc', '25']. Crée une fonction filtrer_nombres(valeurs) qui retourne une liste d'entiers convertis et ignore les valeurs non numériques en affichant un message d'erreur pédagogique.",
      starterCode:
        "valeurs = ['12', '9', 'abc', '25']\n\ndef filtrer_nombres(valeurs):\n    nombres = []\n    for element in valeurs:\n        try:\n            nombres.append(int(element))\n        except ValueError:\n            print(f\"Impossible de convertir {element}, on continue.\")\n    return nombres\n\nresultat = filtrer_nombres(valeurs)\nprint('Nombres convertis :', resultat)\n",
      tests: [
        {
          code: "assert filtrer_nombres(['1', '2', 'trois']) == [1, 2], 'Ne conserve que les valeurs numériques.'",
          description: "Filtrage",
        },
        {
          code: "filtrer_nombres(['abc'])\nassert 'Impossible de convertir abc' in __captured_output__, 'Affiche un message pédagogique.'",
          description: "Message d'erreur",
        },
      ],
      successMessage: "Tes données sont propres et ton programme résiste aux erreurs !",
      hints: {
        baseline: "Place int(element) dans le bloc try.",
        remedial: "Dans except ValueError, affiche un message clair et continue.",
        advanced: "Ajoute un compteur des erreurs rencontrées.",
      },
      reflection: "Quel fichier aimerais-tu commencer à consigner (idées, progrès, finances...) ?",
    },
    quiz: {
      id: "module-10-quiz",
      title: "Quiz éclair : fichiers et exceptions",
      questions: [
        {
          id: "m10q1",
          prompt: "Quel mode d'ouverture ajoute du contenu en fin de fichier ?",
          options: ["'w'", "'a'", "'r'"],
          answerIndex: 1,
          explanation: "Le mode 'a' ajoute à la fin sans effacer le contenu existant.",
        },
        {
          id: "m10q2",
          prompt: "Que fait le bloc with open(...) as f ?",
          options: ["Il ferme automatiquement le fichier", "Il accélère le programme", "Il renomme le fichier"],
          answerIndex: 0,
          explanation: "with gère automatiquement l'ouverture et la fermeture.",
        },
        {
          id: "m10q3",
          prompt: "Quelle exception est levée lors d'une conversion int('abc') ?",
          options: ["TypeError", "ValueError", "IndexError"],
          answerIndex: 1,
          explanation: "int('abc') provoque une ValueError.",
        },
      ],
    },
    bonus: {
      title: "Bonus : fichiers JSON",
      description:
        "Apprends à utiliser json.dump et json.load pour stocker des données structurées dans un fichier.",
      resources: [
        {
          label: "Guide : gestion des fichiers",
          url: "https://docs.python.org/fr/3/tutorial/inputoutput.html",
        },
      ],
    },
  },
  {
    id: "module-11",
    title: "Programmation orientée objet",
    duration: "75 min",
    objective:
      "Créer des classes, des objets et des méthodes pour structurer des projets plus ambitieux.",
    motivation:
      "Tu vas modéliser des concepts du monde réel : parfait pour gérer des collections d'exercices ou des joueurs dans un jeu.",
    concept: {
      title: "Dessiner ses propres objets",
      body: [
        "class NomDeClasse: définit un nouveau type d'objet.",
        "__init__ initialise les attributs de l'objet.",
        "Une méthode est une fonction définie dans la classe (self représente l'objet courant).",
      ],
      analogies: [
        "Une classe est un plan d'architecte, chaque objet est une maison construite avec ce plan.",
        "self est comme 'moi-même' : l'objet qui parle.",
      ],
      highlights: [
        "Crée des méthodes qui retournent des informations utiles (to_dict, resume...).",
        "Tu peux hériter d'une classe existante pour la spécialiser.",
      ],
    },
    demonstration: {
      code: "class ModuleApprentissage:\n    def __init__(self, titre, duree):\n        self.titre = titre\n        self.duree = duree\n        self.acquis = []\n\n    def ajouter_acquis(self, item):\n        self.acquis.append(item)\n\n    def resume(self):\n        return f\"{self.titre} ({self.duree}) - {len(self.acquis)} compétences clés\"\n\nmodule = ModuleApprentissage('Boucles', '1h')\nmodule.ajouter_acquis('for')\nmodule.ajouter_acquis('while')\nprint(module.resume())\n",
      explanation: [
        "Chaque objet ModuleApprentissage possède son propre titre, durée et liste d'acquis.",
        "La méthode resume construit une phrase personnalisée.",
      ],
      callToAction: "Ajoute une méthode pour calculer le temps restant si tu prévois 5 heures de pratique.",
    },
    exercise: {
      id: "module-11-exo",
      title: "Classe Habitude",
      instructions:
        "Crée une classe Habitude avec les attributs nom, frequence (par semaine) et progression (par défaut 0). Ajoute une méthode enregistrer(minutes) qui augmente progression et une méthode rapport() qui renvoie un résumé textuel.",
      starterCode:
        "class Habitude:\n    def __init__(self, nom, frequence):\n        self.nom = nom\n        self.frequence = frequence\n        self.progression = 0\n\n    def enregistrer(self, minutes):\n        self.progression += minutes\n\n    def rapport(self):\n        return f\"{self.nom} - {self.progression} minutes cumulées (objectif {self.frequence}x/sem)\"\n\npython = Habitude('Python', 3)\npython.enregistrer(45)\nprint(python.rapport())\n",
      tests: [
        {
          code: "python = Habitude('Python', 3)\npython.enregistrer(30)\npython.enregistrer(15)\nassert python.progression == 45, 'Additionne correctement les minutes.'",
          description: "Accumulation",
        },
        {
          code: "python = Habitude('Python', 2)\nassert 'objectif 2x/sem' in python.rapport(), 'Le résumé doit afficher la fréquence.'",
          description: "Résumé",
        },
      ],
      successMessage: "Tes habitudes sont prêtes à être suivies !",
      hints: {
        baseline: "Initialise progression à 0 dans __init__.",
        remedial: "Dans enregistrer, utilise += pour cumuler les minutes.",
        advanced: "Ajoute une méthode objectif_atteint() qui renvoie True quand progression >= frequence * 30.",
      },
    },
    challenge: {
      id: "module-11-defi",
      title: "Carnet de modules",
      instructions:
        "Crée une classe Parcours qui contient une liste de modules (instances de Habitude ou dictionnaires simples). Ajoute les méthodes ajouter_module(module) et progression_totale() qui additionne les progressions de chaque module.",
      starterCode:
        "class Parcours:\n    def __init__(self):\n        self.modules = []\n\n    def ajouter_module(self, module):\n        self.modules.append(module)\n\n    def progression_totale(self):\n        total = 0\n        for module in self.modules:\n            if hasattr(module, 'progression'):\n                total += module.progression\n            elif isinstance(module, dict) and 'progression' in module:\n                total += module['progression']\n        return total\n\nparcours = Parcours()\nparcours.ajouter_module(Habitude('Python', 3))\nparcours.ajouter_module({'nom': 'Projet', 'progression': 120})\nprint('Total :', parcours.progression_totale())\n",
      tests: [
        {
          code: "parcours = Parcours()\nparcours.ajouter_module(Habitude('Python', 3))\nparcours.modules[0].enregistrer(60)\nassert parcours.progression_totale() == 60, 'Additionne la progression des objets.'",
          description: "Total objets",
        },
        {
          code: "parcours = Parcours()\nparcours.ajouter_module({'nom': 'Révisions', 'progression': 90})\nassert parcours.progression_totale() == 90, 'Accepte aussi les dictionnaires.'",
          description: "Total dictionnaires",
        },
      ],
      successMessage: "Ton carnet de modules suit tout le monde !",
      hints: {
        baseline: "Vérifie le type de module avant d'ajouter sa progression.",
        remedial: "hasattr(module, 'progression') détecte les objets avec attribut.",
        advanced: "Ajoute une méthode modules_en_retard() pour trouver ceux en dessous de leur objectif.",
      },
      reflection: "Que pourrais-tu modéliser d'autre avec des classes (bibliothèque, finances, jeux...) ?",
    },
    quiz: {
      id: "module-11-quiz",
      title: "Quiz éclair : classes et objets",
      questions: [
        {
          id: "m11q1",
          prompt: "Quel mot-clé crée une nouvelle classe ?",
          options: ["object", "class", "def"],
          answerIndex: 1,
          explanation: "class démarre la définition d'une classe.",
        },
        {
          id: "m11q2",
          prompt: "Quel est le rôle de self dans une méthode ?",
          options: ["Référencer l'objet courant", "Importer un module", "Créer une variable globale"],
          answerIndex: 0,
          explanation: "self représente l'instance en cours d'utilisation.",
        },
        {
          id: "m11q3",
          prompt: "Comment appeler la méthode rapport d'une instance python ?",
          options: ["Habitude.rapport()", "python.rapport()", "rapport.python()"],
          answerIndex: 1,
          explanation: "On appelle la méthode sur l'objet : python.rapport().",
        },
      ],
    },
    bonus: {
      title: "Bonus : héritage",
      description:
        "Crée une classe HabitudeSportive qui hérite de Habitude et ajoute une méthode calories_brulees().",
      resources: [
        {
          label: "Tutoriel : classes",
          url: "https://docs.python.org/fr/3/tutorial/classes.html",
        },
      ],
    },
  },
  {
    id: "module-12",
    title: "Projet final : Assistant Python complet",
    duration: "90 min",
    objective:
      "Assembler toutes les compétences pour livrer un coach d'apprentissage clé en main.",
    motivation:
      "C'est le grand final : tu vas orchestrer fonctions, boucles, collections, fichiers et objets dans un mini-projet concret.",
    concept: {
      title: "Orchestrer l'ensemble",
      body: [
        "Planifie tes données (listes, dictionnaires, classes) avant de coder.",
        "Découpe ton projet en fonctions testables pour chaque fonctionnalité.",
        "Prépare un point d'entrée lancer_projet() qui rassemble tout et renvoie un résultat clair.",
      ],
      analogies: [
        "Composer un projet, c'est diriger un orchestre : chaque instrument (fonction) joue sa partition.",
        "Le point d'entrée est la scène finale où tout le monde se retrouve.",
      ],
      highlights: [
        "Pense à réutiliser ton code précédent plutôt qu'à tout réécrire.",
        "Documente les étapes pour guider l'utilisateur final.",
      ],
    },
    demonstration: {
      code: "import random\n\nrandom.seed(5)\nmodules = ['Variables', 'Boucles', 'Fichiers']\nplan = [f'Session {index+1} : {module}' for index, module in enumerate(modules)]\ndefi = random.choice(['Quiz surprise', 'Mini-jeu', 'Refactorisation'])\nprint('Plan :', plan)\nprint('Défi du jour :', defi)\n",
      explanation: [
        "On combine enumerate et compréhension de liste pour construire un plan dynamique.",
        "random.choice ajoute une touche de surprise au défi final.",
      ],
      callToAction: "Ajoute un suivi de points cumulés et un message final qui félicite l'utilisateur.",
    },
    exercise: {
      id: "module-12-exo",
      title: "Tableau de bord initial",
      instructions:
        "Crée une liste modules_journee contenant trois dictionnaires {'nom': ..., 'duree': ..., 'etat': 'à faire'}. Affiche un résumé du temps total (somme des durées) et une liste des titres.",
      starterCode:
        "modules_journee = [\n    {'nom': 'Variables essentielles', 'duree': 40, 'etat': 'à faire'},\n    {'nom': 'Boucles dynamiques', 'duree': 50, 'etat': 'à faire'},\n    {'nom': 'Fichiers et erreurs', 'duree': 45, 'etat': 'à faire'}\n]\n\ntemps_total = sum(module['duree'] for module in modules_journee)\ntitres = [module['nom'] for module in modules_journee]\n\nprint('Temps total :', temps_total, 'minutes')\nprint('Au programme :', ', '.join(titres))\n",
      tests: [
        {
          code: "assert isinstance(modules_journee, list) and all(isinstance(item, dict) for item in modules_journee), 'Utilise une liste de dictionnaires.'",
          description: "Structure correcte",
        },
        {
          code: "assert temps_total == sum(module['duree'] for module in modules_journee), 'Calcule la somme des durées.'",
          description: "Somme",
        },
        {
          code: "assert ', '.join([module['nom'] for module in modules_journee]) in __captured_output__, 'Affiche la liste des titres.'",
          description: "Affichage titres",
        },
      ],
      successMessage: "Tableau de bord prêt à être alimenté !",
      hints: {
        baseline: "Utilise sum(...) et une compréhension de liste pour les titres.",
        remedial: "Assure-toi que chaque dictionnaire possède les clés nom, duree, etat.",
        advanced: "Trie les modules par durée décroissante avant l'affichage.",
      },
    },
    challenge: {
      id: "module-12-defi",
      title: "Lancer l'assistant Codex",
      instructions:
        "Code une fonction lancer_assistant(nom, modules) qui :\n1) marque le premier module comme 'en cours',\n2) calcule le temps total,\n3) choisit un défi aléatoire reproductible (random.seed(12)),\n4) enregistre un message dans 'journal_progression.txt',\n5) renvoie un dictionnaire avec les clés 'apprenant', 'plan', 'defi', 'message_final'.",
      starterCode:
        "import random\n\nrandom.seed(12)\nDEFIS = ['Quiz final', 'Jeu devine le nombre', 'Débogage express']\n\ndef lancer_assistant(nom, modules):\n    modules[0]['etat'] = 'en cours'\n    temps_total = sum(module['duree'] for module in modules)\n    defi = random.choice(DEFIS)\n    message = f'{nom}, tu disposes de {temps_total} minutes pour finaliser ton parcours.'\n    with open('journal_progression.txt', 'a', encoding='utf-8') as fichier:\n        fichier.write(message + '\\n')\n    return {\n        'apprenant': nom,\n        'plan': modules,\n        'defi': defi,\n        'message_final': message\n    }\n\nmodules_test = [\n    {'nom': 'Révisions', 'duree': 30, 'etat': 'à faire'},\n    {'nom': 'Projet final', 'duree': 45, 'etat': 'à faire'}\n]\nresultat = lancer_assistant('Lina', modules_test)\nprint(resultat)\n",
      tests: [
        {
          code: "modules = [\n    {'nom': 'Variables', 'duree': 30, 'etat': 'à faire'},\n    {'nom': 'Boucles', 'duree': 40, 'etat': 'à faire'}\n]\nresultat = lancer_assistant('Noa', modules)\nassert resultat['plan'][0]['etat'] == 'en cours', 'Le premier module doit démarrer immédiatement.'",
          description: "Mise à jour état",
        },
        {
          code: "modules = [\n    {'nom': 'Variables', 'duree': 30, 'etat': 'à faire'},\n    {'nom': 'Boucles', 'duree': 40, 'etat': 'à faire'}\n]\nresultat = lancer_assistant('Noa', modules)\nassert 'Noa' in resultat['message_final'], 'Message final personnalisé.'",
          description: "Message personnalisé",
        },
        {
          code: "modules = [\n    {'nom': 'Variables', 'duree': 30, 'etat': 'à faire'},\n    {'nom': 'Boucles', 'duree': 40, 'etat': 'à faire'}\n]\nresultat = lancer_assistant('Noa', modules)\nassert resultat['defi'] in DEFIS, 'Le défi provient de la liste prédéfinie.'",
          description: "Défi valide",
        },
      ],
      successMessage: "Assistant Codex opérationnel !",
      hints: {
        baseline: "Modifie modules[0]['etat'] avant de calculer la somme.",
        remedial: "N'oublie pas d'écrire le message dans le fichier pour garder une trace.",
        advanced: "Ajoute un score final calculé en fonction du nombre de modules.",
      },
      reflection: "Quelle fonctionnalité ajouterais-tu pour rendre ton assistant encore plus utile (tableau web, notifications...)?",
    },
    quiz: {
      id: "module-12-quiz",
      title: "Quiz éclair : synthèse finale",
      questions: [
        {
          id: "m12q1",
          prompt: "Quelle structure te permet de renvoyer plusieurs informations à la fois dans ton projet ?",
          options: ["Une seule variable", "Un dictionnaire ou une classe", "Un print"],
          answerIndex: 1,
          explanation: "Un dictionnaire ou un objet regroupe plusieurs champs nommés.",
        },
        {
          id: "m12q2",
          prompt: "Pourquoi fixer le seed avant de tirer un défi aléatoire ?",
          options: ["Pour supprimer le hasard", "Pour obtenir un comportement reproductible", "Pour accélérer random"],
          answerIndex: 1,
          explanation: "Le seed garantit que deux exécutions donnent le même résultat lors des tests.",
        },
        {
          id: "m12q3",
          prompt: "Quel est l'intérêt d'écrire dans un fichier dans le projet final ?",
          options: ["Aucun", "Garder une trace de la progression", "Remplacer les fonctions"],
          answerIndex: 1,
          explanation: "Un fichier journal conserve l'historique des progrès de l'apprenant.",
        },
      ],
    },
    bonus: {
      title: "Bonus : partage et extensions",
      description:
        "Déploie ton assistant sur le web avec un petit serveur Flask ou FastAPI, ou connecte-le à une interface graphique Streamlit.",
      resources: [
        {
          label: "Aller plus loin avec FastAPI",
          url: "https://fastapi.tiangolo.com/",
        },
      ],
    },
  },
];

const procedures = [
  {
    id: "naturalisation",
    title: "Demande de naturalisation française",
    subtitle: "Obtenir la nationalité française par décret grâce à un dossier solide et complet.",
    category: "Séjour / Nationalité",
    shortDescription:
      "Préparez votre dossier de naturalisation : conditions, documents, dépôt en préfecture et suivi jusqu’à la décision.",
    difficulty: "4/5 – Complexité élevée",
    estimatedDuration: "12 à 18 mois selon la préfecture",
    mainAuthority: "Préfecture / Ministère de l’Intérieur",
    summary:
      "La naturalisation par décret permet d’obtenir la nationalité française après plusieurs années de résidence stable et une intégration réussie. La démarche est exigeante mais accessible avec une préparation minutieuse.",
    whoIsConcerned: [
      "Personnes majeures résidant en France de manière régulière depuis au moins 5 ans.",
      "Conjoint(e)s de Français après 4 ans de mariage et de vie commune.",
      "Étudiants ayant suivi une formation supérieure en France et justifiant d’une insertion professionnelle.",
      "Ressortissants étrangers servant dans l’armée française ou reconnus réfugiés politiques.",
    ],
    prerequisites: [
      "Être en situation régulière avec un titre de séjour en cours de validité.",
      "Justifier d’un niveau de français B1 minimum (diplôme ou attestation OFII).",
      "Disposer de revenus stables et suffisants (contrats, avis d’imposition, bulletins de salaire).",
      "Avoir un casier judiciaire vierge dans tous les pays où vous avez résidé.",
      "Être en mesure de fournir des actes d’état civil récents et traduits si nécessaire.",
    ],
    steps: [
      {
        stepTitle: "Vérifier votre éligibilité",
        stepDescription:
          "Contrôlez les conditions de durée de séjour, d’intégration en France, de niveau de langue et de moralité pour éviter un refus immédiat.",
        requiredDocuments: [
          "Titre de séjour en cours de validité.",
          "Justificatifs de résidence sur les 5 dernières années (quittances, attestations).",
          "Attestation de niveau de français (TCF, DELF, diplôme universitaire).",
        ],
        whereToGo: "Consultez la fiche service-public et la page naturalisation de votre préfecture.",
        estimatedDelay: "1 à 2 semaines pour rassembler les informations.",
        tips: [
          "Listez vos dates d’entrée et de sortie du territoire pour vérifier la continuité de séjour.",
          "Téléchargez la notice de naturalisation propre à votre préfecture (documents parfois spécifiques).",
        ],
      },
      {
        stepTitle: "Rassembler les pièces d’état civil",
        stepDescription:
          "Demandez des actes de naissance et, si besoin, faites-les légaliser et traduire par un traducteur assermenté.",
        requiredDocuments: [
          "Acte de naissance intégral daté de moins de 6 mois.",
          "Actes de naissance ou de mariage des enfants et du conjoint.",
          "Traductions certifiées conformes si les documents ne sont pas en français.",
        ],
        whereToGo: "Mairie du lieu de naissance, consulat d’origine, traducteur assermenté.",
        estimatedDelay: "2 à 8 semaines selon le pays d’origine.",
        tips: [
          "Anticipez les demandes à l’étranger : certaines administrations envoient uniquement par courrier postal.",
          "Vérifiez les exigences de légalisation ou d’apostille avant de commander les documents.",
        ],
      },
      {
        stepTitle: "Constituer le dossier de ressources",
        stepDescription:
          "Regroupez preuves de revenus, d’activité professionnelle et de logement pour démontrer votre autonomie financière.",
        requiredDocuments: [
          "Contrats de travail, attestations employeur, bulletins de salaire des 12 derniers mois.",
          "Derniers avis d’imposition et attestations de situation fiscale.",
          "Justificatifs de logement (bail, quittances, attestation d’hébergement).",
        ],
        whereToGo: "Employeur, site impots.gouv.fr, bailleur ou propriétaire.",
        estimatedDelay: "1 à 3 semaines selon les pièces à récupérer.",
        tips: [
          "Classez vos documents par catégorie et par ordre chronologique pour faciliter la lecture.",
          "Ajoutez une note explicative si vous avez des périodes sans activité ou des ressources variées.",
        ],
      },
      {
        stepTitle: "Compléter le formulaire et préparer le dossier",
        stepDescription:
          "Téléchargez le formulaire cerfa n°12753*02, remplissez-le soigneusement et assemblez les pièces selon l’ordre demandé.",
        requiredDocuments: [
          "Formulaire cerfa 12753*02 rempli et signé.",
          "Photos d’identité récentes et conformes.",
          "Justificatifs d’intégration (diplômes, attestations bénévolat, etc.).",
        ],
        whereToGo: "Site service-public.fr ou site de votre préfecture pour le dossier à jour.",
        estimatedDelay: "1 à 2 semaines.",
        tips: [
          "Utilisez des intercalaires et une table des matières pour faciliter la vérification.",
          "Fournissez uniquement des copies, mais gardez les originaux à présenter le jour du dépôt.",
        ],
      },
      {
        stepTitle: "Déposer le dossier et obtenir un récépissé",
        stepDescription:
          "Selon votre préfecture, prenez rendez-vous en ligne ou envoyez le dossier par courrier recommandé.",
        requiredDocuments: [
          "Dossier complet relié ou rangé dans une chemise.",
          "Convocation ou preuve de prise de rendez-vous.",
          "Lettre de motivation personnalisée (fortement recommandée).",
        ],
        whereToGo: "Préfecture ou sous-préfecture compétente pour votre lieu de résidence.",
        estimatedDelay: "Rendez-vous obtenus sous 1 à 3 mois, récépissé remis immédiatement.",
        tips: [
          "Arrivez avec 10 minutes d’avance et une copie supplémentaire de votre dossier.",
          "Demandez un accusé de réception ou un numéro de dossier au guichet.",
        ],
      },
      {
        stepTitle: "Passer l’entretien et suivre l’instruction",
        stepDescription:
          "Vous pouvez être convoqué pour un entretien d’assimilation. Préparez-vous à parler de votre parcours et de vos motivations.",
        requiredDocuments: [
          "Pièce d’identité et titre de séjour.",
          "Convocation originale.",
          "Justificatifs récents prouvant la continuité de votre situation (bulletins de salaire, attestations).",
        ],
        whereToGo: "Préfecture (service naturalisation) ou visioconférence selon les départements.",
        estimatedDelay: "3 à 12 mois selon la charge de dossiers.",
        tips: [
          "Révisez les notions de base sur la France (valeurs républicaines, institutions, régions).",
          "Préparez quelques exemples concrets d’implication sociale (bénévolat, associations).",
        ],
      },
      {
        stepTitle: "Recevoir la décision",
        stepDescription:
          "L’administration vous notifie la décision par courrier. En cas d’accord, votre nom paraît au Journal officiel.",
        requiredDocuments: [
          "Lettre de notification ou publication au JO.",
          "Pièces d’identité pour la cérémonie d’accueil si organisée.",
        ],
        whereToGo: "Boîte aux lettres, site journal-officiel.gouv.fr, préfecture.",
        estimatedDelay: "2 à 6 mois après l’entretien.",
        tips: [
          "Conservez précieusement le décret publié au JO : il vous sera demandé pour votre carte d’identité française.",
          "En cas de refus ou d’ajournement, vous disposez de recours (gracieux, contentieux). Demandez conseil rapidement.",
        ],
      },
    ],
    contacts: {
      officialWebsite: "https://www.service-public.fr/particuliers/vosdroits/F2213",
      phoneNumbers: [
        "Plateforme d’information naturalisation : 0 800 71 08 90 (service gratuit)",
        "Préfecture de votre département : numéro dédié affiché sur son site",
      ],
      emailsOrForms: [
        "Téléservice de suivi de dossier disponible sur la page Naturalisation de votre préfecture",
        "Exemple de contact : naturalisation@prefecture-exemple.gouv.fr",
      ],
      notes:
        "Les coordonnées et modalités de dépôt varient selon la préfecture. Consultez systématiquement le site local pour confirmer la procédure.",
    },
    commonMistakes: [
      "Fournir des actes d’état civil trop anciens ou non traduits par un expert assermenté.",
      "Oublier de déclarer un changement de situation (mariage, déménagement, perte d’emploi) pendant l’instruction.",
      "Présenter des justificatifs de revenus insuffisants ou non cohérents avec les avis d’imposition.",
      "Ne pas préparer l’entretien et donner des réponses approximatives sur ses motivations.",
      "Envoyer un dossier incomplet sans suivre l’ordre demandé par la préfecture.",
    ],
    tips: [
      "Scannez chaque document pour conserver une copie numérique et faciliter les envois futurs.",
      "Tenez un tableau de suivi avec les dates de demande d’actes, de rendez-vous, de relances et de réponses.",
      "Préparez un classeur par thématique (identité, ressources, logement, intégration) pour présenter un dossier propre.",
      "Inscrivez-vous à une association d’aide aux démarches si vous avez besoin d’un accompagnement personnalisé.",
    ],
    templates: [
      {
        title: "Mail type pour demander un suivi de dossier",
        content: `Objet : Suivi de ma demande de naturalisation – Dossier n°[numéro]

Madame, Monsieur,

Je me permets de vous contacter afin de connaître l’état d’avancement de ma demande de naturalisation déposée le [date] auprès de vos services.

Auriez-vous la possibilité de me confirmer la bonne réception de l’ensemble des pièces et de m’indiquer si des documents complémentaires sont nécessaires ?

Je vous remercie par avance pour votre aide et reste disponible pour tout renseignement.

Bien cordialement,
[Prénom Nom]
[Numéro étranger / identifiant demandeur]`,
      },
      {
        title: "Lettre d’accompagnement pour le dépôt du dossier",
        content: `Madame, Monsieur,

Veuillez trouver ci-joint mon dossier complet de demande de naturalisation par décret. Je joins l’ensemble des pièces demandées, classées selon l’ordre indiqué par la préfecture.

Restant à votre disposition pour toute information ou document complémentaire.

Je vous prie d’agréer, Madame, Monsieur, l’expression de ma considération distinguée.

[Signature]`,
      },
    ],
  },
  {
    id: "titre-sejour",
    title: "Renouvellement ou première demande de titre de séjour",
    subtitle: "Anticiper et sécuriser votre droit au séjour en France.",
    category: "Séjour / Nationalité",
    shortDescription:
      "Préparez la demande adaptée à votre situation (étudiant, salarié, vie privée et familiale) et respectez les délais.",
    difficulty: "3/5 – Démarche structurée",
    estimatedDuration: "2 à 4 mois selon les préfectures",
    mainAuthority: "Préfecture",
    summary:
      "Le titre de séjour garantit votre droit de rester en France. En le renouvelant dans les délais, vous évitez une rupture de droits et pouvez travailler ou étudier sereinement.",
    whoIsConcerned: [
      "Étudiants étrangers inscrits dans un établissement en France.",
      "Salariés titulaires d’un contrat de travail ou d’une promesse d’embauche.",
      "Membres de famille de citoyens français ou européens.",
      "Personnes protégées (réfugiés, bénéficiaires de la protection subsidiaire).",
    ],
    prerequisites: [
      "Identifier la catégorie de titre adaptée (salarié, étudiant, passeport talent, vie privée et familiale, etc.).",
      "Respecter le délai : dépôt recommandé entre 4 et 2 mois avant l’expiration du titre actuel.",
      "Être en situation régulière au moment de la demande (pas de titre expiré).",
      "Disposer d’un passeport en cours de validité.",
      "Avoir un justificatif de domicile à votre nom ou une attestation d’hébergement.",
    ],
    steps: [
      {
        stepTitle: "Créer ou accéder à votre compte ANEF",
        stepDescription:
          "La plupart des préfectures demandent une demande en ligne via l’Administration numérique pour les étrangers en France (ANEF).",
        requiredDocuments: [
          "Adresse mail valide et mot de passe sécurisé.",
          "Numéro étranger présent sur le titre actuel.",
          "Scan de votre passeport (page identité).",
        ],
        whereToGo: "https://administration-etrangers-en-france.interieur.gouv.fr",
        estimatedDelay: "Création immédiate, activation en quelques minutes.",
        tips: [
          "Utilisez un ordinateur plutôt qu’un smartphone pour éviter les erreurs de téléchargement.",
          "Conservez précieusement vos identifiants et activez la double authentification si proposée.",
        ],
      },
      {
        stepTitle: "Sélectionner la bonne démarche",
        stepDescription:
          "Choisissez le motif correspondant à votre situation (renouvellement, changement de statut, duplicata).",
        requiredDocuments: [
          "Titre de séjour actuel ou visa long séjour valant titre de séjour.",
          "Justificatif de situation (contrat de travail, certificat de scolarité, livret de famille).",
        ],
        whereToGo: "Menu principal ANEF ou portail de votre préfecture si elle utilise encore un téléservice local.",
        estimatedDelay: "15 à 30 minutes pour vérifier les consignes.",
        tips: [
          "Téléchargez la liste officielle des pièces à fournir : certaines préfectures demandent des documents supplémentaires.",
          "Notez les formats acceptés (PDF, JPG, taille maximum).",
        ],
      },
      {
        stepTitle: "Préparer les justificatifs",
        stepDescription:
          "Scannez ou photographiez vos documents en haute qualité pour un dépôt en ligne sans rejet.",
        requiredDocuments: [
          "Passeport, visa, extrait d’acte de naissance.",
          "Justificatifs de ressources (contrat de travail, bulletins de salaire, attestation employeur).",
          "Justificatifs de domicile récents (moins de 3 mois).",
          "Assurance maladie (attestation CPAM, CEAM, contrat privé).",
        ],
        whereToGo: "Votre ordinateur, scanner ou application de numérisation (Adobe Scan, Genius Scan, etc.).",
        estimatedDelay: "1 à 2 semaines pour récupérer les pièces manquantes.",
        tips: [
          "Renommez les fichiers avec un nom explicite (ex : 2024-01-contrat-travail.pdf).",
          "Vérifiez la lisibilité et la taille de chaque document avant de téléverser.",
        ],
      },
      {
        stepTitle: "Déposer la demande en ligne",
        stepDescription:
          "Complétez le formulaire numérique, téléversez chaque document et validez votre dossier.",
        requiredDocuments: [
          "Formulaire ANEF rempli.",
          "Photos d’identité numériques (photographe agréé ou photo-numérique).",
          "Justificatif de paiement de timbre fiscal si requis à cette étape.",
        ],
        whereToGo: "Espace personnel ANEF, rubrique “Mes demandes en cours”.",
        estimatedDelay: "30 à 60 minutes selon le nombre de pièces.",
        tips: [
          "Enregistrez régulièrement votre progression pour éviter la déconnexion automatique.",
          "Téléchargez le récépissé immédiatement après validation et conservez-le sur votre téléphone.",
        ],
      },
      {
        stepTitle: "Suivre le traitement et compléter si besoin",
        stepDescription:
          "Consultez votre espace pour connaître l’avancement et répondre aux demandes complémentaires.",
        requiredDocuments: [
          "Récépissé ou attestation de prolongation de droits.",
          "Documents supplémentaires demandés (attestation employeur, justificatif de ressources actualisé).",
        ],
        whereToGo: "Tableau de bord ANEF ou adresse mail utilisée lors du dépôt.",
        estimatedDelay: "1 à 3 mois selon la préfecture.",
        tips: [
          "Activez les notifications mail de l’ANEF et vérifiez votre dossier spam.",
          "Répondez sous 15 jours maximum aux compléments demandés pour éviter un classement sans suite.",
        ],
      },
      {
        stepTitle: "Retirer le titre en préfecture",
        stepDescription:
          "Une fois votre titre prêt, prenez rendez-vous pour la remise et présentez les originaux.",
        requiredDocuments: [
          "Passeport original.",
          "Récépissé ou attestation de décision favorable.",
          "Justificatif de paiement du timbre fiscal (via timbres.impots.gouv.fr).",
        ],
        whereToGo: "Préfecture ou sous-préfecture indiquée dans la convocation.",
        estimatedDelay: "15 jours après la notification de fabrication.",
        tips: [
          "Vérifiez immédiatement les informations figurant sur le titre (nom, dates, mentions).",
          "Demandez un duplicata si vous constatez une erreur avant de quitter le guichet.",
        ],
      },
    ],
    contacts: {
      officialWebsite: "https://administration-etrangers-en-france.interieur.gouv.fr",
      phoneNumbers: [
        "Numéro d’information général étrangers en France : 0 806 001 620",
        "Standard de la préfecture (exemple) : 0 810 36 36 36",
      ],
      emailsOrForms: [
        "Formulaire de contact ANEF dans votre espace personnel",
        "Adresse dédiée : etrangers-prefecture@nom-du-departement.gouv.fr (exemple)",
      ],
      notes:
        "Selon les départements, un passage au guichet reste obligatoire. Consultez le site de votre préfecture pour connaître les modalités exactes.",
    },
    commonMistakes: [
      "Attendre la dernière minute avant la fin de validité du titre pour déposer la demande.",
      "Téléverser des documents flous ou incomplets entraînant un rejet automatique.",
      "Choisir une mauvaise catégorie de séjour (ex : salarié au lieu de passeport talent).",
      "Ne pas répondre aux demandes complémentaires dans le délai imparti.",
      "Oublier d’acheter le timbre fiscal avant le rendez-vous de retrait.",
    ],
    tips: [
      "Planifiez une alarme trois mois avant la date d’expiration de votre titre pour démarrer la procédure.",
      "Gardez sur vous une version papier du récépissé pour prouver la prolongation de vos droits.",
      "Préparez des copies supplémentaires de vos justificatifs pour les éventuels contrôles.",
      "En cas de difficulté, sollicitez une association d’aide aux migrants ou un centre France Services.",
    ],
    templates: [
      {
        title: "Message type pour signaler un complément déposé",
        content: `Bonjour,

Suite à votre demande du [date], je vous informe avoir téléversé les pièces complémentaires (justificatif de ressources et attestation de domicile) dans mon espace ANEF.

Je reste disponible si des éléments supplémentaires sont nécessaires.

Cordialement,
[Nom Prénom]
[Numéro étranger]`,
      },
    ],
  },
  {
    id: "auto-entreprise",
    title: "Création d’auto-entreprise (micro-entreprise)",
    subtitle: "Déclarer votre activité indépendante et lancer votre micro-entreprise en quelques étapes.",
    category: "Entreprise",
    shortDescription:
      "Choisissez votre activité, immatriculez-vous en ligne et obtenez rapidement votre numéro SIRET.",
    difficulty: "2/5 – Accessible",
    estimatedDuration: "48 h à 2 semaines selon l’activité",
    mainAuthority: "URSSAF / Guichet unique des formalités",
    summary:
      "Le statut micro-entrepreneur permet de créer facilement une activité indépendante avec des formalités allégées et un régime fiscal simplifié.",
    whoIsConcerned: [
      "Personnes souhaitant proposer des services ou vendre des produits à titre indépendant.",
      "Salariés voulant cumuler un emploi et une activité complémentaire.",
      "Étudiants ou demandeurs d’emploi testant un projet entrepreneurial.",
      "Retraités souhaitant une activité ponctuelle ou saisonnière.",
    ],
    prerequisites: [
      "Vérifier que votre activité est éligible au régime micro (plafond de chiffre d’affaires).",
      "Disposer d’une adresse postale stable pour domicilier l’entreprise.",
      "Avoir une pièce d’identité valide et, pour les étrangers, un titre de séjour autorisant l’activité.",
      "Préparer un justificatif de domicile de moins de 3 mois.",
      "Anticiper l’ouverture d’un compte bancaire dédié si le chiffre d’affaires dépasse 10 000 € pendant 2 ans.",
    ],
    steps: [
      {
        stepTitle: "Définir l’activité et le code APE",
        stepDescription:
          "Clarifiez votre offre de services ou de vente pour sélectionner la bonne catégorie professionnelle.",
        requiredDocuments: [
          "Description précise de votre activité (services, artisanat, commerce).",
          "Si activité réglementée : diplôme ou autorisation correspondante.",
        ],
        whereToGo: "Site de l’INSEE ou guichet unique formalites.entreprises.gouv.fr pour vérifier les codes APE.",
        estimatedDelay: "1 à 3 jours de réflexion et vérifications.",
        tips: [
          "Choisissez un intitulé clair pour vos devis et factures.",
          "Si doute, contactez la chambre de commerce ou des métiers pour un conseil gratuit.",
        ],
      },
      {
        stepTitle: "Créer un compte sur le guichet unique",
        stepDescription:
          "Toutes les immatriculations passent par le portail formalites.entreprises.gouv.fr.",
        requiredDocuments: [
          "Adresse mail valide.",
          "Numéro de sécurité sociale (si disponible).",
        ],
        whereToGo: "https://formalites.entreprises.gouv.fr",
        estimatedDelay: "Inscription en 10 minutes.",
        tips: [
          "Utilisez une adresse mail professionnelle (ex : prenom@nom.fr) pour vos échanges administratifs.",
          "Activez les notifications pour suivre les étapes en temps réel.",
        ],
      },
      {
        stepTitle: "Remplir la déclaration de début d’activité",
        stepDescription:
          "Renseignez vos informations personnelles, choisissez votre régime fiscal et social et joignez les justificatifs.",
        requiredDocuments: [
          "Copie d’une pièce d’identité signée.",
          "Justificatif de domicile.",
          "Déclaration de non-condamnation et attestation de filiation.",
        ],
        whereToGo: "Espace guichet unique, rubrique “Créer mon entreprise” > micro-entrepreneur.",
        estimatedDelay: "30 à 45 minutes.",
        tips: [
          "Optez pour le versement libératoire de l’impôt si votre revenu fiscal de référence le permet.",
          "Si activité artisanale, cochez la case pour demander la dispense de stage préalable (RSI).",
        ],
      },
      {
        stepTitle: "Envoyer les pièces complémentaires",
        stepDescription:
          "Si votre activité est artisanale ou réglementée, transmettez les justificatifs supplémentaires demandés.",
        requiredDocuments: [
          "Diplômes ou attestations de qualification.",
          "Attestation d’assurance professionnelle si requise.",
          "Formulaire P0 micro-entrepreneur signé (si dépôt papier exceptionnel).",
        ],
        whereToGo: "Téléversement sur le portail ou envoi à la chambre consulaire compétente.",
        estimatedDelay: "1 à 2 semaines si validation par une chambre consulaire.",
        tips: [
          "Vérifiez la réception via le tableau de bord et relancez si aucun accusé sous 7 jours.",
          "Gardez une copie de tous les documents transmis (scan + impression).",
        ],
      },
      {
        stepTitle: "Recevoir le SIRET et les notifications",
        stepDescription:
          "Après validation, vous recevez un mail avec votre SIREN/SIRET et votre affiliation URSSAF.",
        requiredDocuments: [
          "Attestation d’inscription au répertoire Sirene.",
          "Courriers URSSAF et impôts (numéro de dossier).",
        ],
        whereToGo: "Boîte mail et courrier postal (facteur).",
        estimatedDelay: "48 h à 10 jours après validation.",
        tips: [
          "Téléchargez immédiatement l’attestation Sirene pour vos premiers clients.",
          "Créez votre espace en ligne URSSAF pour déclarer votre chiffre d’affaires.",
        ],
      },
      {
        stepTitle: "Organiser la gestion courante",
        stepDescription:
          "Mettez en place vos outils de facturation, comptabilité simplifiée et suivi des dépenses.",
        requiredDocuments: [
          "Modèle de factures conforme (mentions obligatoires).",
          "Registre des achats (si activité de vente).",
        ],
        whereToGo: "Tableur, logiciel de facturation en ligne ou application de gestion.",
        estimatedDelay: "1 semaine pour tout paramétrer sereinement.",
        tips: [
          "Notez vos échéances trimestrielles ou mensuelles de déclaration URSSAF.",
          "Conservez vos justificatifs pendant 10 ans (factures, notes de frais).",
        ],
      },
    ],
    contacts: {
      officialWebsite: "https://formalites.entreprises.gouv.fr",
      phoneNumbers: [
        "Assistance guichet unique : 0 806 000 245",
        "URSSAF micro-entrepreneur : 3957 (service 0,12 €/min + prix appel)",
      ],
      emailsOrForms: [
        "Formulaire de contact en ligne depuis votre espace guichet unique",
        "Support URSSAF : https://www.autoentrepreneur.urssaf.fr",
      ],
      notes:
        "Les chambres de commerce (CCI) et de métiers (CMA) proposent des rendez-vous gratuits pour vérifier votre dossier.",
    },
    commonMistakes: [
      "Choisir un code activité inadapté et devoir le modifier ensuite.",
      "Oublier de joindre la pièce d’identité signée, ce qui bloque la validation.",
      "Ne pas ouvrir de compte bancaire dédié alors que le seuil est dépassé.",
      "Ignorer la question de la TVA en cas de dépassement de seuil (franchise en base).",
    ],
    tips: [
      "Testez votre tarification avec un simulateur de charges micro-entrepreneur.",
      "Créez une adresse mail professionnelle et une signature claire pour vos devis.",
      "Adhérez à un réseau local (BGE, pépinières) pour obtenir des conseils réguliers.",
      "Paramétrez des rappels automatiques pour déclarer votre chiffre d’affaires.",
    ],
    templates: [
      {
        title: "Premier message à un client potentiel",
        content: `Bonjour [Nom],

Je vous confirme ma disponibilité pour réaliser [nom de la prestation].
En tant que micro-entrepreneur, je vous adresserai un devis détaillé incluant l’ensemble des prestations et délais.

Restant à votre disposition pour toute précision.

Bien cordialement,
[Nom Prénom]
Micro-entrepreneur – SIRET [numéro]`,
      },
    ],
  },
  {
    id: "france-travail",
    title: "Inscription à France Travail (ex-Pôle emploi)",
    subtitle: "Accéder à l’accompagnement et aux allocations chômage ou de retour à l’emploi.",
    category: "Emploi",
    shortDescription:
      "Inscrivez-vous en ligne, constituez votre dossier et préparez votre premier entretien conseillé.",
    difficulty: "2/5 – Accessible",
    estimatedDuration: "Sous 7 jours pour finaliser l’inscription",
    mainAuthority: "France Travail",
    summary:
      "L’inscription à France Travail permet d’accéder à un suivi personnalisé, aux offres d’emploi et, selon votre situation, à l’allocation d’aide au retour à l’emploi (ARE).",
    whoIsConcerned: [
      "Personnes à la recherche d’un emploi, indemnisées ou non.",
      "Salariés en fin de contrat souhaitant une inscription rapide.",
      "Travailleurs indépendants ayant cessé leur activité (sous conditions).",
      "Jeunes diplômés ou sortants de formation professionnelle.",
    ],
    prerequisites: [
      "Avoir quitté ou être sur le point de quitter son emploi (fin de CDD, rupture conventionnelle, licenciement).",
      "Disposer de ses documents de fin de contrat (attestation employeur, certificat de travail).",
      "Préparer son relevé d’identité bancaire (RIB).",
      "Mettre à jour son CV et ses justificatifs de formation.",
      "Avoir un accès internet pour compléter les étapes en ligne.",
    ],
    steps: [
      {
        stepTitle: "Créer votre compte France Travail",
        stepDescription:
          "Rendez-vous sur le site officiel pour démarrer l’inscription en ligne et choisir vos identifiants.",
        requiredDocuments: [
          "Adresse mail active.",
          "Numéro de sécurité sociale.",
        ],
        whereToGo: "https://www.francetravail.fr > rubrique “M’inscrire, me réinscrire”.",
        estimatedDelay: "15 minutes",
        tips: [
          "Utilisez un mot de passe robuste que vous n’utilisez pas ailleurs.",
          "Notez votre identifiant France Travail pour éviter de le perdre.",
        ],
      },
      {
        stepTitle: "Compléter le dossier d’inscription",
        stepDescription:
          "Renseignez vos informations personnelles, votre parcours professionnel et votre situation actuelle.",
        requiredDocuments: [
          "Pièce d’identité ou titre de séjour.",
          "Justificatif de domicile.",
          "Attestation employeur destinée à France Travail.",
        ],
        whereToGo: "Espace personnel en ligne.",
        estimatedDelay: "30 à 45 minutes",
        tips: [
          "Préparez votre CV à jour pour copier-coller vos expériences.",
          "Si vous êtes en reconversion, indiquez clairement votre nouveau projet professionnel.",
        ],
      },
      {
        stepTitle: "Transmettre les pièces justificatives",
        stepDescription:
          "Téléversez les documents scannés directement dans votre dossier ou envoyez-les depuis l’application mobile.",
        requiredDocuments: [
          "Attestation employeur, bulletins de salaire des 12 derniers mois.",
          "Justificatifs de formation ou de diplômes.",
          "RIB pour le versement des allocations.",
        ],
        whereToGo: "Espace “Mes échanges avec France Travail” ou application mobile.",
        estimatedDelay: "24 à 48 h pour que les pièces soient validées.",
        tips: [
          "Vérifiez que chaque fichier est bien lisible et que le poids n’excède pas 2 Mo.",
          "Renommez vos fichiers avec un titre explicite (ex : attestation-employeur-2024.pdf).",
        ],
      },
      {
        stepTitle: "Planifier le premier rendez-vous conseiller",
        stepDescription:
          "Après validation, choisissez un créneau pour l’entretien de diagnostic avec votre conseiller.",
        requiredDocuments: [
          "Convocation reçue par mail ou dans l’espace personnel.",
          "Notes sur votre projet professionnel.",
        ],
        whereToGo: "Agence France Travail ou visioconférence selon votre région.",
        estimatedDelay: "Sous 30 jours après l’inscription.",
        tips: [
          "Apportez votre CV imprimé et une liste d’offres repérées pour gagner du temps.",
          "Préparez des questions sur les ateliers et formations disponibles.",
        ],
      },
      {
        stepTitle: "Actualiser votre situation chaque mois",
        stepDescription:
          "Entre le 28 et le 15 du mois suivant, déclarez vos démarches et revenus pour rester inscrit et indemnisé.",
        requiredDocuments: [
          "Montant des revenus perçus (salaire, mission intérim, activité partielle).",
          "Justificatifs en cas d’arrêt maladie ou de congé maternité.",
        ],
        whereToGo: "https://www.francetravail.fr ou application mobile.",
        estimatedDelay: "5 minutes par mois.",
        tips: [
          "Planifiez un rappel sur votre téléphone pour ne jamais dépasser la date limite.",
          "Imprimez ou sauvegardez votre attestation d’actualisation après chaque déclaration.",
        ],
      },
      {
        stepTitle: "Profiter des services d’accompagnement",
        stepDescription:
          "Inscrivez-vous aux ateliers, formations et offres d’emploi proposées par votre agence.",
        requiredDocuments: [
          "CV actualisé.",
          "Pièce d’identité pour accéder aux locaux si nécessaire.",
        ],
        whereToGo: "Espace personnel > Mes services, ou accueil de l’agence.",
        estimatedDelay: "Continu : planifiez vos actions chaque semaine.",
        tips: [
          "Activez les alertes email/SMS pour recevoir des offres ciblées.",
          "Consignez vos candidatures dans un tableau pour préparer vos points mensuels.",
        ],
      },
    ],
    contacts: {
      officialWebsite: "https://www.francetravail.fr",
      phoneNumbers: ["Plateforme téléphonique : 3949 (service gratuit + prix appel)"],
      emailsOrForms: [
        "Formulaire de contact dans votre espace personnel",
        "Application mobile France Travail – messagerie interne",
      ],
      notes:
        "En cas de difficulté numérique, prenez rendez-vous dans une agence ou un espace France Services pour être accompagné.",
    },
    commonMistakes: [
      "Oublier de finaliser l’inscription après la création du compte.",
      "Ne pas transmettre l’attestation employeur, rendant l’ouverture de droits impossible.",
      "Manquer l’actualisation mensuelle et être radié temporairement.",
      "Arriver sans CV au premier entretien, ce qui ralentit votre accompagnement.",
    ],
    tips: [
      "Utilisez la bibliothèque de CV France Travail pour générer un document propre rapidement.",
      "Demandez un atelier “Définir mon projet professionnel” si vous hésitez sur votre orientation.",
      "Explorez les offres de formation accessibles via Mon Compte Formation pour renforcer vos candidatures.",
    ],
    templates: [
      {
        title: "Message au conseiller après le premier entretien",
        content: `Bonjour [Prénom du conseiller],

Merci pour notre rendez-vous du [date]. Conformément à nos échanges, je vous transmets mon CV mis à jour et vous confirme mon intérêt pour les ateliers “Techniques de recherche d’emploi”.

Je reste disponible pour toute information complémentaire.

Bien cordialement,
[Nom Prénom]
Identifiant France Travail : [numéro]`,
      },
    ],
  },
  {
    id: "apl",
    title: "Demande d’APL (aide personnalisée au logement)",
    subtitle: "Réduire votre loyer grâce à l’aide versée par la CAF ou la MSA.",
    category: "Aides sociales",
    shortDescription:
      "Vérifiez votre éligibilité, faites la demande en ligne et suivez le versement de l’aide au logement.",
    difficulty: "2/5 – Accessible",
    estimatedDuration: "3 à 6 semaines pour la réponse",
    mainAuthority: "CAF / MSA",
    summary:
      "L’APL aide à payer le loyer ou la redevance de logement. La demande se fait en ligne et nécessite des justificatifs de situation familiale et de ressources.",
    whoIsConcerned: [
      "Locataires d’un logement conventionné (parc social ou privé).",
      "Étudiants, apprentis, jeunes actifs aux revenus modestes.",
      "Familles ou couples en location principale.",
      "Personnes hébergées en foyer ou résidence étudiante conventionnée.",
    ],
    prerequisites: [
      "Être titulaire du bail ou redevable du loyer.",
      "Disposer d’un numéro de sécurité sociale.",
      "Déclarer l’ensemble des occupants du logement.",
      "Ne pas être rattaché au foyer fiscal de vos parents si vous êtes étudiant et demandez une aide pour un logement distinct.",
      "Prévoir le montant exact du loyer hors charges.",
    ],
    steps: [
      {
        stepTitle: "Tester votre éligibilité",
        stepDescription:
          "Utilisez le simulateur en ligne pour estimer le montant potentiel de l’aide et vérifier les conditions.",
        requiredDocuments: [
          "Montant du loyer hors charges.",
          "Revenus des 12 derniers mois (ou année N-2 selon la situation).",
        ],
        whereToGo: "https://www.caf.fr > Simuler ou demander une prestation.",
        estimatedDelay: "10 minutes.",
        tips: [
          "Sauvegardez le résultat de la simulation pour le comparer avec la décision finale.",
          "Effectuez la simulation avec et sans colocation pour voir l’impact sur l’aide.",
        ],
      },
      {
        stepTitle: "Créer ou accéder à votre compte CAF",
        stepDescription:
          "Si vous n’êtes pas allocataire, créez un espace avec votre numéro de sécurité sociale et votre adresse mail.",
        requiredDocuments: [
          "Numéro de sécurité sociale.",
          "Adresse mail et mot de passe sécurisé.",
        ],
        whereToGo: "https://www.caf.fr > Mon Compte.",
        estimatedDelay: "15 minutes.",
        tips: [
          "Activez la connexion via FranceConnect pour simplifier vos futurs accès.",
          "Notez votre numéro allocataire attribué lors de la création.",
        ],
      },
      {
        stepTitle: "Remplir la demande d’APL",
        stepDescription:
          "Saisissez votre situation familiale, professionnelle et les informations sur le logement loué.",
        requiredDocuments: [
          "Contrat de location ou attestation de résidence.",
          "Coordonnées du bailleur ou gestionnaire.",
          "Dernier avis d’imposition ou de non-imposition.",
        ],
        whereToGo: "Espace Mon Compte > Faire une demande de prestation.",
        estimatedDelay: "30 à 45 minutes.",
        tips: [
          "Ayez votre bail sous les yeux pour éviter les erreurs de surface ou de loyer.",
          "Déclarez correctement les colocataires ou membres du foyer pour éviter un trop-perçu.",
        ],
      },
      {
        stepTitle: "Téléverser les justificatifs",
        stepDescription:
          "Joignez les documents demandés directement depuis le module d’envoi en ligne.",
        requiredDocuments: [
          "RIB au format IBAN/BIC.",
          "Justificatif de scolarité si étudiant.",
          "Attestation de loyer complétée par le bailleur.",
        ],
        whereToGo: "Onglet “Mes documents” dans l’espace Mon Compte.",
        estimatedDelay: "1 à 2 jours pour collecter les pièces.",
        tips: [
          "Photographiez les documents en bonne lumière et vérifiez la lisibilité avant l’envoi.",
          "Joignez chaque fichier dans la catégorie correspondante pour accélérer le traitement.",
        ],
      },
      {
        stepTitle: "Suivre l’étude du dossier",
        stepDescription:
          "La CAF analyse votre demande et peut demander des compléments via votre messagerie sécurisée.",
        requiredDocuments: [
          "Pièces complémentaires en cas de changement de situation (attestation d’emploi, attestation d’hébergement).",
        ],
        whereToGo: "Messagerie Mon Compte CAF ou application mobile.",
        estimatedDelay: "3 à 6 semaines selon la période.",
        tips: [
          "Répondez rapidement aux demandes complémentaires pour éviter le rejet.",
          "Consultez l’historique des paiements pour vérifier la date du premier versement.",
        ],
      },
      {
        stepTitle: "Contrôler les versements",
        stepDescription:
          "Une fois l’APL accordée, suivez le calendrier de paiement et informez la CAF en cas de changement.",
        requiredDocuments: [
          "Attestation de paiement CAF.",
          "Déclaration trimestrielle de ressources pour certains foyers.",
        ],
        whereToGo: "Rubrique Paiements de votre espace Mon Compte.",
        estimatedDelay: "Vérification mensuelle.",
        tips: [
          "Téléchargez l’attestation de paiement pour vos dossiers administratifs (logement social, garant).",
          "Déclarez immédiatement un déménagement pour éviter un trop-perçu.",
        ],
      },
    ],
    contacts: {
      officialWebsite: "https://www.caf.fr",
      phoneNumbers: ["Numéro CAF (tarif local) : 3230"],
      emailsOrForms: [
        "Messagerie sécurisée dans l’espace Mon Compte",
        "Formulaire de réclamation : https://www.caf.fr/allocataires/contact-et-réclamations",
      ],
      notes: "Pour les exploitants agricoles, la demande d’APL se fait via la MSA avec des modalités similaires.",
    },
    commonMistakes: [
      "Déclarer un loyer charges comprises au lieu du loyer hors charges.",
      "Oublier de signaler une colocation ou un concubinage.",
      "Envoyer un bail non signé ou illisible.",
      "Ne pas actualiser ses ressources annuelles, entraînant un trop-perçu ou une suspension.",
    ],
    tips: [
      "Notez les dates de versement pour vérifier que votre bailleur les a bien reçus.",
      "Conservez vos attestations de loyer chaque année pour les contrôles.",
      "Utilisez l’application CAF Mon Compte pour suivre vos messages en temps réel.",
    ],
    templates: [
      {
        title: "Message au bailleur pour l’attestation de loyer",
        content: `Bonjour [Nom du bailleur],

Pour finaliser ma demande d’APL auprès de la CAF, j’ai besoin de l’attestation de loyer complétée et signée.
Vous la trouverez en pièce jointe (ou via le lien CAF). Pourriez-vous me la retourner d’ici [date] ?

Merci beaucoup pour votre aide.

Cordialement,
[Nom Prénom]
[Adresse du logement]`,
      },
    ],
  },
  {
    id: "caf",
    title: "Démarches CAF (allocations familiales, RSA, prime d’activité)",
    subtitle: "Accéder aux aides sociales gérées par la Caisse d’Allocations Familiales.",
    category: "Aides sociales",
    shortDescription:
      "Créez votre espace CAF, vérifiez vos droits et suivez vos demandes d’allocations familiales et de minima sociaux.",
    difficulty: "3/5 – Plusieurs justificatifs",
    estimatedDuration: "2 à 8 semaines selon la prestation",
    mainAuthority: "CAF",
    summary:
      "La CAF verse des aides variées : allocations familiales, RSA, prime d’activité, prestations pour la petite enfance. Chaque demande nécessite un dossier complet et des déclarations régulières.",
    whoIsConcerned: [
      "Familles avec un ou plusieurs enfants à charge.",
      "Travailleurs modestes pouvant prétendre à la prime d’activité.",
      "Personnes sans ressources ou aux revenus faibles demandant le RSA.",
      "Parents isolés ou personnes en situation de handicap (AAH gérée avec la MDPH).",
    ],
    prerequisites: [
      "Disposer d’un numéro de sécurité sociale français.",
      "Être résident stable en France (plus de 9 mois par an).",
      "Déclarer l’ensemble des personnes vivant au foyer.",
      "Préparer ses justificatifs de revenus et charges (loyer, pension alimentaire).",
      "Ouvrir un compte bancaire à votre nom pour recevoir les versements.",
    ],
    steps: [
      {
        stepTitle: "Créer ou actualiser votre espace CAF",
        stepDescription:
          "Connectez-vous avec FranceConnect ou votre numéro allocataire pour accéder aux services en ligne.",
        requiredDocuments: [
          "Numéro allocataire ou numéro de sécurité sociale.",
          "Adresse mail et téléphone pour les notifications.",
        ],
        whereToGo: "https://www.caf.fr > Mon Compte.",
        estimatedDelay: "10 minutes",
        tips: [
          "Activez l’authentification forte pour sécuriser vos données personnelles.",
          "Ajoutez un contact secondaire (conjoint) si vous gérez les démarches à deux.",
        ],
      },
      {
        stepTitle: "Vérifier vos droits et simuler",
        stepDescription:
          "Utilisez les simulateurs RSA, prime d’activité, allocations pour anticiper vos montants et conditions.",
        requiredDocuments: [
          "Revenus nets des 3 derniers mois.",
          "Montant du loyer ou des charges de logement.",
        ],
        whereToGo: "https://www.caf.fr > Simuler ou demander une prestation.",
        estimatedDelay: "15 minutes par simulateur.",
        tips: [
          "Notez les résultats pour les comparer lors de la décision finale.",
          "Testez différents scénarios (temps partiel, augmentation de revenus).",
        ],
      },
      {
        stepTitle: "Remplir la demande en ligne",
        stepDescription:
          "Choisissez la prestation (RSA, prime d’activité, allocations familiales) et remplissez le formulaire numérique.",
        requiredDocuments: [
          "Pièce d’identité ou titre de séjour.",
          "Livret de famille ou acte de naissance des enfants.",
          "Justificatifs de ressources (bulletins de salaire, attestations Pôle emploi, pensions).",
        ],
        whereToGo: "Espace Mon Compte > Faire une demande.",
        estimatedDelay: "30 à 60 minutes selon la prestation.",
        tips: [
          "Sauvegardez régulièrement votre demande si vous devez rechercher une information.",
          "Pour le RSA, précisez vos charges (loyer, pension alimentaire) pour un calcul juste.",
        ],
      },
      {
        stepTitle: "Envoyer les justificatifs",
        stepDescription:
          "Téléversez les pièces dans la rubrique “Mes documents” ou envoyez-les via l’application mobile CAF.",
        requiredDocuments: [
          "RIB.",
          "Contrat de travail ou attestation employeur.",
          "Attestation de paiement France Travail (ARE) le cas échéant.",
        ],
        whereToGo: "Messagerie sécurisée ou onglet Documents.",
        estimatedDelay: "24 à 72 h pour que les documents soient visibles.",
        tips: [
          "Utilisez l’application CAF pour scanner les documents directement depuis votre smartphone.",
          "Classez vos envois par date et type de prestation dans un tableau de suivi.",
        ],
      },
      {
        stepTitle: "Suivre la décision et les versements",
        stepDescription:
          "Consultez la rubrique Paiements pour connaître la date du premier versement et vérifier le montant.",
        requiredDocuments: [
          "Attestation de paiement CAF téléchargeable en PDF.",
        ],
        whereToGo: "Espace Mon Compte > Mes paiements.",
        estimatedDelay: "2 à 8 semaines selon le volume de dossiers.",
        tips: [
          "Téléchargez l’attestation de droits pour d’autres démarches (cantine, crèche, logement).",
          "En cas de retard, envoyez un message via la messagerie en joignant votre numéro allocataire.",
        ],
      },
      {
        stepTitle: "Actualiser régulièrement vos ressources",
        stepDescription:
          "Déclarez tout changement de situation (emploi, séparation, déménagement) dans les 15 jours.",
        requiredDocuments: [
          "Nouvelles fiches de paie ou attestation d’employeur.",
          "Jugement de séparation ou pension alimentaire.",
        ],
        whereToGo: "Espace Mon Compte > Signaler un changement.",
        estimatedDelay: "Continu, à chaque événement.",
        tips: [
          "Programmez un rappel trimestriel pour actualiser vos ressources si vous percevez la prime d’activité.",
          "Conservez un dossier papier et numérique de toutes vos déclarations pour éviter les litiges.",
        ],
      },
    ],
    contacts: {
      officialWebsite: "https://www.caf.fr",
      phoneNumbers: ["Numéro CAF (tarif local) : 3230"],
      emailsOrForms: [
        "Messagerie sécurisée via votre espace CAF",
        "Prise de rendez-vous en ligne avec un conseiller CAF",
      ],
      notes: "Des permanences CAF sont disponibles dans de nombreuses mairies et espaces France Services.",
    },
    commonMistakes: [
      "Oublier de déclarer une reprise d’activité, entraînant un trop-perçu.",
      "Confondre revenus nets et bruts dans la déclaration trimestrielle.",
      "Envoyer des documents flous ou tronqués qui ralentissent l’étude.",
      "Ne pas mettre à jour son adresse après un déménagement.",
    ],
    tips: [
      "Téléchargez chaque attestation de paiement dès sa mise en ligne pour vos dossiers.",
      "Gardez une copie de toutes vos déclarations trimestrielles.",
      "Utilisez FranceConnect pour simplifier vos connexions sur mobile et ordinateur.",
      "Rapprochez-vous d’une assistante sociale municipale en cas de difficulté à constituer le dossier.",
    ],
    templates: [
      {
        title: "Message de suivi d’une demande de prime d’activité",
        content: `Bonjour,

Je me permets de revenir vers vous concernant ma demande de prime d’activité déposée le [date].
Pourriez-vous me confirmer sa bonne réception et m’indiquer si des pièces complémentaires sont nécessaires ?

Je reste à votre disposition.

Cordialement,
[Nom Prénom]
Numéro allocataire : [numéro]`,
      },
    ],
  },
  {
    id: "carte-grise",
    title: "Carte grise / Changement d’adresse",
    subtitle: "Mettre à jour votre certificat d’immatriculation après un déménagement.",
    category: "Véhicule",
    shortDescription:
      "Déclarez votre nouvelle adresse dans le mois suivant le déménagement pour éviter une amende.",
    difficulty: "1/5 – Démarche rapide",
    estimatedDuration: "Sous 7 jours pour recevoir l’étiquette ou la nouvelle carte",
    mainAuthority: "ANTS (Agence nationale des titres sécurisés)",
    summary:
      "Toute modification d’adresse doit être signalée à l’ANTS dans le mois. Selon l’âge de votre carte grise, vous recevrez une étiquette ou un nouveau certificat d’immatriculation.",
    whoIsConcerned: [
      "Propriétaires de véhicules immatriculés en France.",
      "Nouveaux résidents ayant déménagé en France.",
      "Personnes ayant changé de nom de voie ou de numéro de logement (modification postale).",
    ],
    prerequisites: [
      "Disposer d’un compte ANTS ou FranceConnect.",
      "Connaître le numéro d’immatriculation du véhicule.",
      "Avoir un justificatif de domicile de moins de 6 mois.",
      "Si le véhicule est en leasing, obtenir l’accord de la société de financement.",
    ],
    steps: [
      {
        stepTitle: "Créer/ouvrir votre compte ANTS",
        stepDescription:
          "Connectez-vous via FranceConnect ou créez un compte ANTS pour accéder au service en ligne.",
        requiredDocuments: [
          "Adresse mail valide.",
          "Mot de passe sécurisé.",
        ],
        whereToGo: "https://immatriculation.ants.gouv.fr",
        estimatedDelay: "5 minutes.",
        tips: [
          "Préférez la connexion via FranceConnect pour éviter de multiplier les identifiants.",
          "Ajoutez un numéro de téléphone pour recevoir les notifications SMS de l’ANTS.",
        ],
      },
      {
        stepTitle: "Accéder à la démarche changement d’adresse",
        stepDescription:
          "Sélectionnez “Je souhaite faire une autre demande” puis “Signaler un changement sur ma situation personnelle”.",
        requiredDocuments: [
          "Numéro d’immatriculation et date de première immatriculation.",
          "Informations sur votre nouvelle adresse complète.",
        ],
        whereToGo: "Espace usager ANTS > Mon certificat d’immatriculation.",
        estimatedDelay: "10 minutes.",
        tips: [
          "Notez votre code confidentiel de carte grise si vous l’avez encore, sinon demandez-en un nouveau.",
          "Vérifiez la boîte mail associée pour récupérer le code de sécurité envoyé par l’ANTS.",
        ],
      },
      {
        stepTitle: "Téléverser le justificatif de domicile",
        stepDescription:
          "Ajoutez un document valide (facture d’électricité, quittance de loyer, attestation assurance habitation).",
        requiredDocuments: [
          "Justificatif datant de moins de 6 mois au nom du titulaire.",
          "En cas d’hébergement : attestation d’hébergement + justificatif d’identité de l’hébergeur.",
        ],
        whereToGo: "Module d’envoi de documents ANTS.",
        estimatedDelay: "Immédiat si le document est prêt.",
        tips: [
          "Scannez en couleur pour garantir la lisibilité du tampon et de l’adresse.",
          "Regroupez vos fichiers dans un seul PDF si plusieurs pages.",
        ],
      },
      {
        stepTitle: "Valider et payer si nécessaire",
        stepDescription:
          "Selon la série de votre plaque (SIV ou FNI), des frais d’acheminement peuvent être demandés.",
        requiredDocuments: [
          "Carte bancaire pour le paiement en ligne.",
          "Adresse de livraison à jour.",
        ],
        whereToGo: "Interface de paiement ANTS sécurisée.",
        estimatedDelay: "Paiement immédiat.",
        tips: [
          "Téléchargez le justificatif de paiement en PDF pour vos archives.",
          "Si vous êtes exonéré (première, deuxième, troisième changement), vérifiez bien le total avant de valider.",
        ],
      },
      {
        stepTitle: "Recevoir l’étiquette ou la nouvelle carte",
        stepDescription:
          "Vous recevez un courrier avec l’étiquette à coller ou un nouveau certificat selon le nombre de changements.",
        requiredDocuments: [
          "Ancienne carte grise pour y apposer l’étiquette.",
          "Pièce d’identité pour retirer le courrier recommandé si nécessaire.",
        ],
        whereToGo: "Boîte aux lettres (La Poste) ou centre de tri.",
        estimatedDelay: "3 à 7 jours ouvrés.",
        tips: [
          "Collez l’étiquette sur le carton prévu sans masquer les anciennes informations.",
          "Conservez les preuves d’envoi et de réception jusqu’à la prochaine revente du véhicule.",
        ],
      },
    ],
    contacts: {
      officialWebsite: "https://immatriculation.ants.gouv.fr",
      phoneNumbers: ["Assistance ANTS : 34 00 (0,06 €/min + prix appel)"],
      emailsOrForms: ["Formulaire de contact disponible dans votre espace ANTS"],
      notes: "Les garages agréés peuvent réaliser la démarche pour vous contre rémunération. Vérifiez leur habilitation.",
    },
    commonMistakes: [
      "Dépasser le délai d’un mois et risquer une amende de 135 €.",
      "Téléverser un justificatif de domicile au mauvais nom ou trop ancien.",
      "Ne pas vérifier l’orthographe de l’adresse avant validation.",
      "Oublier de signer le mandat si la démarche est faite par un professionnel.",
    ],
    tips: [
      "Gardez une copie numérique de votre justificatif de domicile pour vos autres démarches.",
      "En cas de déménagement multiple dans l’année, notez la date de chaque changement pour justifier votre situation.",
      "Utilisez l’application mobile ANTS pour suivre l’envoi en temps réel.",
    ],
    templates: [
      {
        title: "Message au bailleur pour obtenir une quittance rapide",
        content: `Bonjour [Nom],

Je viens de déclarer mon changement d’adresse auprès de l’ANTS. Pour finaliser la démarche, j’ai besoin d’une quittance de loyer datée de moins de 3 mois.
Pourriez-vous me l’envoyer par mail dès que possible ?

Merci beaucoup pour votre réactivité.

Cordialement,
[Nom Prénom]`,
      },
    ],
  },
  {
    id: "carte-vitale",
    title: "Inscription à la sécurité sociale / Carte Vitale",
    subtitle: "Obtenir un numéro de sécurité sociale et accéder au remboursement de vos soins.",
    category: "Santé",
    shortDescription:
      "Constituez votre dossier CPAM, créez un compte ameli et demandez votre carte Vitale en ligne.",
    difficulty: "2/5 – Démarche guidée",
    estimatedDuration: "3 à 6 semaines pour recevoir la carte",
    mainAuthority: "Assurance Maladie (CPAM)",
    summary:
      "L’inscription à la sécurité sociale permet de bénéficier de la prise en charge de vos soins et d’obtenir une carte Vitale à présenter chez les professionnels de santé.",
    whoIsConcerned: [
      "Étudiants étrangers ou européens installés durablement en France.",
      "Salariés nouvellement embauchés sans numéro définitif.",
      "Travailleurs indépendants au démarrage de leur activité.",
      "Personnes rejoignant un conjoint déjà affilié (ayant droit).",
    ],
    prerequisites: [
      "Résider en France de manière stable (plus de 3 mois).",
      "Disposer d’un justificatif d’identité valide.",
      "Avoir un acte de naissance et, si besoin, une traduction assermentée.",
      "Connaître votre situation professionnelle (contrat de travail, statut étudiant).",
      "Préparer un RIB français ou européen (IBAN).",
    ],
    steps: [
      {
        stepTitle: "Préparer le dossier d’affiliation",
        stepDescription:
          "Téléchargez le formulaire S1106 “Demande d’ouverture des droits à l’assurance maladie” et rassemblez les pièces.",
        requiredDocuments: [
          "Formulaire S1106 rempli et signé.",
          "Copie intégrale de l’acte de naissance (avec traduction si nécessaire).",
          "Justificatif d’identité et de séjour.",
        ],
        whereToGo: "https://www.ameli.fr > Formulaires > Affiliation",
        estimatedDelay: "1 à 2 semaines pour récupérer les pièces manquantes.",
        tips: [
          "Vérifiez sur ameli.fr si votre caisse demande des pièces supplémentaires (traduction, attestation employeur).",
          "Numérisez vos documents dès maintenant pour les envoyer en parallèle via votre compte ameli.",
        ],
      },
      {
        stepTitle: "Envoyer le dossier à la CPAM",
        stepDescription:
          "Transmettez le formulaire et les pièces soit par courrier recommandé, soit via le dépôt en ligne (compte ameli).",
        requiredDocuments: [
          "Dossier papier complet.",
          "Justificatif de domicile de moins de 3 mois.",
          "RIB.",
        ],
        whereToGo: "Adresse CPAM de votre département ou télétransmission via ameli.fr.",
        estimatedDelay: "Réception enregistrée sous 7 à 10 jours.",
        tips: [
          "Envoyez en recommandé avec accusé de réception pour suivre votre dossier.",
          "Gardez une copie complète du dossier envoyé.",
        ],
      },
      {
        stepTitle: "Créer votre compte ameli",
        stepDescription:
          "Dès que vous obtenez votre code provisoire (ou via FranceConnect), créez votre espace pour suivre l’avancement.",
        requiredDocuments: [
          "Numéro de sécurité sociale (provisoire ou définitif).",
          "Code provisoire reçu par courrier.",
        ],
        whereToGo: "https://www.ameli.fr > Mon compte",
        estimatedDelay: "15 minutes.",
        tips: [
          "Activez les notifications mail/SMS pour être informé de l’arrivée de votre carte Vitale.",
          "Téléchargez l’application ameli pour avoir vos attestations à portée de main.",
        ],
      },
      {
        stepTitle: "Demander la carte Vitale",
        stepDescription:
          "Depuis votre compte ameli, complétez la rubrique “Commander ma carte Vitale” avec une photo et une pièce d’identité.",
        requiredDocuments: [
          "Photo d’identité numérique aux normes.",
          "Pièce d’identité scannée.",
        ],
        whereToGo: "Espace ameli > Mes démarches > Commander ma carte Vitale.",
        estimatedDelay: "Carte reçue sous 2 à 3 semaines après validation.",
        tips: [
          "Utilisez un service photo en ligne agréé pour obtenir un code ePhoto.",
          "Vérifiez régulièrement l’état de fabrication dans l’application ameli.",
        ],
      },
      {
        stepTitle: "Mettre à jour et conserver vos attestations",
        stepDescription:
          "Une fois la carte reçue, mettez-la à jour dans une pharmacie ou une borne et téléchargez vos attestations de droits.",
        requiredDocuments: [
          "Carte Vitale.",
          "Code postal de votre CPAM pour accéder aux bornes.",
        ],
        whereToGo: "Pharmacies équipées, bornes en CPAM, espace ameli.",
        estimatedDelay: "Opération en quelques minutes.",
        tips: [
          "Gardez une attestation de droits à jour pour vos autres démarches (employeur, mutuelle).",
          "Pensez à déclarer votre médecin traitant dans l’espace ameli pour bénéficier du meilleur remboursement.",
        ],
      },
    ],
    contacts: {
      officialWebsite: "https://www.ameli.fr",
      phoneNumbers: ["CPAM : 36 46 (service gratuit + prix appel)"],
      emailsOrForms: ["Messagerie sécurisée depuis votre compte ameli", "Formulaire de contact : https://www.ameli.fr/assure/contact"],
      notes: "Les étudiants étrangers peuvent aussi passer par etudiant-etranger.ameli.fr pour une affiliation dédiée.",
    },
    commonMistakes: [
      "Envoyer une copie d’acte de naissance non traduite alors que la CPAM l’exige.",
      "Oublier le RIB ou un justificatif de domicile récent.",
      "Ne pas répondre aux demandes complémentaires de la CPAM, ce qui suspend la demande.",
      "Jeter le code provisoire reçu par courrier avant d’avoir créé le compte ameli.",
    ],
    tips: [
      "Suivez l’avancement depuis la rubrique “Mes démarches” et relancez si aucune nouvelle sous 30 jours.",
      "Gardez une version numérique de votre attestation de droits pour la transmettre rapidement.",
      "En cas d’urgence médicale avant d’obtenir la carte, demandez une attestation papier à présenter aux professionnels.",
    ],
    templates: [
      {
        title: "Message de relance à la CPAM",
        content: `Bonjour,

Je vous écris concernant ma demande d’affiliation à l’assurance maladie envoyée le [date].
Pourriez-vous me confirmer la réception de mon dossier et m’indiquer si des pièces complémentaires sont nécessaires ?

Je vous remercie pour votre aide et reste disponible.

Cordialement,
[Nom Prénom]
Numéro de sécurité sociale (si connu) : [numéro]`,
      },
    ],
  },
  {
    id: "permis-echange",
    title: "Échange de permis de conduire étranger",
    subtitle: "Obtenir un permis français équivalent à votre permis obtenu à l’étranger.",
    category: "Véhicule",
    shortDescription:
      "Vérifiez l’éligibilité de votre permis, déposez la demande d’échange et suivez la production du permis français.",
    difficulty: "3/5 – Délais variables",
    estimatedDuration: "6 à 12 mois selon les préfectures",
    mainAuthority: "ANTS / Préfecture",
    summary:
      "Les titulaires d’un permis délivré hors UE doivent souvent l’échanger contre un permis français pour continuer à conduire légalement au-delà de 12 mois de résidence.",
    whoIsConcerned: [
      "Ressortissants étrangers installés en France avec un permis obtenu hors Union européenne.",
      "Français revenus d’un séjour à l’étranger avec un permis local.",
      "Personnes ayant un permis européen mais souhaitant harmoniser leur dossier en France (permis menacé).",
    ],
    prerequisites: [
      "Résider en France depuis moins de 12 mois (délai pour demander l’échange).",
      "Disposer d’un permis étranger en cours de validité et non suspendu.",
      "Préparer un justificatif de résidence en France et dans le pays d’obtention du permis.",
      "Faire traduire le permis si nécessaire par un traducteur assermenté.",
    ],
    steps: [
      {
        stepTitle: "Vérifier la reconnaissance de votre permis",
        stepDescription:
          "Consultez la liste officielle pour savoir si votre pays est reconnu et si un échange est possible sans examen.",
        requiredDocuments: [
          "Permis de conduire étranger.",
          "Traduction officielle si le permis n’est pas en français.",
        ],
        whereToGo: "https://immatriculation.ants.gouv.fr > Rubrique Permis de conduire > Échanger un permis étranger.",
        estimatedDelay: "1 à 2 jours pour vérifier les conditions.",
        tips: [
          "Téléchargez la notice ANTS spécifique à votre pays.",
          "Notez la date limite de dépôt (1 an après le début de résidence).",
        ],
      },
      {
        stepTitle: "Créer la demande d’échange sur l’ANTS",
        stepDescription:
          "Réalisez la démarche en ligne en sélectionnant “Je souhaite échanger mon permis étranger pour un permis français”.",
        requiredDocuments: [
          "Pièce d’identité et titre de séjour.",
          "Justificatif de domicile.",
          "Permis étranger original.",
        ],
        whereToGo: "Espace usager ANTS > Permis de conduire.",
        estimatedDelay: "30 minutes pour compléter la demande.",
        tips: [
          "Préparez des scans couleur recto/verso de votre permis et des justificatifs.",
          "Vérifiez la taille maximale des fichiers avant de commencer.",
        ],
      },
      {
        stepTitle: "Envoyer le dossier physique si demandé",
        stepDescription:
          "Certaines préfectures demandent l’envoi postal du permis original et des documents.",
        requiredDocuments: [
          "Permis original et traduction.",
          "Copie certifiée conforme ou attestation du consulat (selon pays).",
          "Justificatif de paiement éventuel (taxe).",
        ],
        whereToGo: "Adresse du centre d’échange des permis étrangers (CREPIC ou préfecture).",
        estimatedDelay: "Acheminement postal 3 à 7 jours.",
        tips: [
          "Envoyez en recommandé avec accusé pour suivre la réception.",
          "Gardez une copie numérique haute qualité du permis avant envoi.",
        ],
      },
      {
        stepTitle: "Recevoir le permis provisoire",
        stepDescription:
          "L’ANTS peut émettre un certificat provisoire de permis de conduire (CEPC) à imprimer.",
        requiredDocuments: [
          "Numéro de dossier ANTS.",
          "Pièce d’identité.",
        ],
        whereToGo: "Espace ANTS > Suivi de mon dossier.",
        estimatedDelay: "4 à 8 semaines après dépôt.",
        tips: [
          "Imprimez le CEPC et gardez-le avec vous lors de la conduite.",
          "Vérifiez sa durée de validité (généralement 4 mois renouvelables).",
        ],
      },
      {
        stepTitle: "Recevoir le permis français",
        stepDescription:
          "Une fois la fabrication terminée, vous recevez un courrier de remise ou une convocation.",
        requiredDocuments: [
          "Justificatif d’identité.",
          "CEPC ou accusé de réception.",
        ],
        whereToGo: "La Poste (lettre recommandée) ou préfecture selon la procédure locale.",
        estimatedDelay: "6 à 12 mois selon la file d’attente.",
        tips: [
          "Contrôlez les catégories mentionnées sur le permis et signalez immédiatement toute erreur.",
          "Gardez une copie du permis étranger restitué si possible (photo/scanner).",
        ],
      },
    ],
    contacts: {
      officialWebsite: "https://permisdeconduire.ants.gouv.fr",
      phoneNumbers: ["ANTS permis : 34 00 (0,06 €/min + prix appel)", "Centre d’échange CREPIC : 0 809 540 013"],
      emailsOrForms: ["Messagerie ANTS dans votre dossier", "Formulaire de suivi : https://ants.gouv.fr/Contacter-l-ANTS"],
      notes: "Les délais étant longs, évitez de conduire sans CEPC après expiration de votre permis étranger.",
    },
    commonMistakes: [
      "Déposer la demande après le délai d’un an de résidence et essuyer un refus.",
      "Envoyer des documents non traduits alors que c’est obligatoire.",
      "Ne pas conserver de copie du permis original avant de l’envoyer.",
      "Changer d’adresse sans le signaler, ce qui retarde la réception.",
    ],
    tips: [
      "Consultez régulièrement votre messagerie ANTS pour répondre aux compléments.",
      "Gardez une copie numérique horodatée de chaque justificatif envoyé.",
      "Demandez une attestation de droits à votre assureur pour prouver votre capacité à conduire pendant l’attente.",
    ],
    templates: [
      {
        title: "Message de relance pour l’échange de permis",
        content: `Bonjour,

Je me permets de vous contacter concernant ma demande d’échange de permis étranger (dossier n°[numéro]) déposée le [date].
Pouvez-vous m’indiquer l’état d’avancement et, si besoin, les pièces complémentaires à fournir ?

Je vous remercie par avance pour votre retour.

Cordialement,
[Nom Prénom]
Numéro de dossier ANTS : [numéro]`,
      },
    ],
  },
  {
    id: "diplomes",
    title: "Reconnaissance de diplômes étrangers (ENIC-NARIC)",
    subtitle: "Obtenir une attestation de comparabilité pour faire reconnaître vos études.",
    category: "Éducation / Profession",
    shortDescription:
      "Constituez un dossier auprès de France Éducation International pour valoriser vos diplômes en France.",
    difficulty: "3/5 – Patience et justificatifs",
    estimatedDuration: "8 à 12 semaines selon la période",
    mainAuthority: "France Éducation International (ENIC-NARIC)",
    summary:
      "L’attestation de comparabilité indique à quel niveau français correspond votre diplôme étranger. Elle est souvent demandée par les employeurs, écoles ou administrations.",
    whoIsConcerned: [
      "Étudiants souhaitant poursuivre un cursus en France.",
      "Professionnels en recherche d’emploi ou de reconnaissance de qualifications.",
      "Personnes préparant une demande d’équivalence pour un ordre professionnel.",
    ],
    prerequisites: [
      "Disposer de scans clairs de vos diplômes et relevés de notes.",
      "Prévoir des traductions assermentées si les documents ne sont pas en français.",
      "Créer un compte sur la plateforme en ligne de France Éducation International.",
      "Préparer un moyen de paiement (carte bancaire) pour les frais de dossier.",
    ],
    steps: [
      {
        stepTitle: "Créer un compte sur la plateforme ENIC-NARIC",
        stepDescription:
          "Inscrivez-vous sur le portail de France Éducation International pour accéder à votre espace personnel.",
        requiredDocuments: [
          "Adresse mail valide.",
          "Pièce d’identité scannée.",
        ],
        whereToGo: "https://phoenix.france-education-international.fr",
        estimatedDelay: "15 minutes.",
        tips: [
          "Utilisez une adresse mail professionnelle pour retrouver facilement les échanges.",
          "Activez les notifications pour suivre l’avancement du dossier.",
        ],
      },
      {
        stepTitle: "Vérifier la liste des documents nécessaires",
        stepDescription:
          "Consultez la rubrique “Documents à fournir” pour préparer vos diplômes, relevés, traductions et justificatifs d’identité.",
        requiredDocuments: [
          "Diplôme final, certificats provisoires si nécessaire.",
          "Relevés de notes détaillés.",
          "Justificatif de changement de nom le cas échéant.",
        ],
        whereToGo: "Espace personnel ENIC-NARIC > Mes demandes.",
        estimatedDelay: "1 à 2 jours pour rassembler toutes les pièces.",
        tips: [
          "Faites traduire vos documents par un traducteur assermenté inscrit sur la liste officielle.",
          "Numérisez vos documents en haute résolution (300 dpi).",
        ],
      },
      {
        stepTitle: "Déposer la demande en ligne",
        stepDescription:
          "Remplissez le formulaire, téléversez les documents et payez les frais d’examen (environ 70 €).",
        requiredDocuments: [
          "Documents académiques scannés.",
          "Traductions officielles.",
          "Moyen de paiement.",
        ],
        whereToGo: "Espace ENIC-NARIC > Nouvelle demande.",
        estimatedDelay: "30 à 45 minutes.",
        tips: [
          "Vérifiez chaque fichier avant validation pour éviter une mise en attente.",
          "Ajoutez une lettre expliquant votre projet (emploi, poursuite d’études) pour contextualiser.",
        ],
      },
      {
        stepTitle: "Suivre l’instruction",
        stepDescription:
          "Les experts analysent votre dossier. Ils peuvent demander des compléments ou des originaux.",
        requiredDocuments: [
          "Documents originaux disponibles en cas de contrôle.",
        ],
        whereToGo: "Tableau de bord ENIC-NARIC > Suivi de mes demandes.",
        estimatedDelay: "8 à 12 semaines selon le volume.",
        tips: [
          "Répondez rapidement aux messages pour éviter de prolonger le délai.",
          "Conservez vos traductions originales : elles peuvent être demandées par d’autres organismes.",
        ],
      },
      {
        stepTitle: "Télécharger l’attestation",
        stepDescription:
          "Une fois l’examen terminé, vous recevez un mail. Téléchargez l’attestation numérique et, si besoin, commandez un duplicata papier.",
        requiredDocuments: [
          "Identifiants ENIC-NARIC.",
          "Moyen de paiement pour un envoi postal supplémentaire.",
        ],
        whereToGo: "Espace ENIC-NARIC > Mes attestations.",
        estimatedDelay: "Disponibilité immédiate en ligne.",
        tips: [
          "Sauvegardez le PDF dans plusieurs emplacements (cloud, clé USB).",
          "Vérifiez la durée de validité : l’attestation n’expire pas mais peut nécessiter une mise à jour si vous obtenez un nouveau diplôme.",
        ],
      },
    ],
    contacts: {
      officialWebsite: "https://www.france-education-international.fr/enic-naric",
      phoneNumbers: ["Standard France Éducation International : 01 45 07 60 00"],
      emailsOrForms: ["Formulaire de contact ENIC-NARIC", "FAQ interactive sur le portail Phoenix"],
      notes: "Les délais peuvent s’allonger en été. Prévoyez la demande plusieurs mois avant une inscription ou un concours.",
    },
    commonMistakes: [
      "Envoyer des scans flous ou incomplets, entraînant une demande de pièces complémentaires.",
      "Oublier la traduction officielle alors qu’elle est obligatoire.",
      "Renseigner un diplôme encore en cours : l’attestation ne peut être délivrée que pour un diplôme obtenu.",
      "Ne pas prévoir le délai et louper l’inscription à une formation ou un concours.",
    ],
    tips: [
      "Préparez un tableau récapitulatif de vos études (dates, établissements, volume horaire) pour faciliter l’analyse.",
      "Si vous avez plusieurs diplômes, regroupez-les dans une seule demande pour optimiser les coûts.",
      "Utilisez l’attestation numérique pour vos candidatures en ligne : elle est acceptée par la plupart des écoles et employeurs.",
    ],
    templates: [
      {
        title: "Message d’information à un recruteur",
        content: `Bonjour [Nom],

Je vous informe avoir engagé la procédure de reconnaissance de mon diplôme auprès du centre ENIC-NARIC. L’attestation de comparabilité sera disponible sous environ 8 semaines.

Je vous transmettrai le document dès sa réception.

Bien cordialement,
[Nom Prénom]`,
      },
    ],
  },
];

const cardsContainer = document.getElementById("cards-container");
const detailPanel = document.getElementById("detail-panel");
const searchInput = document.getElementById("search-input");
const noResultsMessage = document.getElementById("no-results-message");

let activeProcedureId = null;

function createBulletList(items, emptyMessage = "Aucun élément à signaler pour cette étape.") {
  if (!items || items.length === 0) {
    return `<p class="text-muted">${emptyMessage}</p>`;
  }
  return `<ul class="bullet-list">${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
}

function createTemplatesSection(templates) {
  if (!templates || templates.length === 0) {
    return "";
  }

  const templatesHtml = templates
    .map(
      (template) => `
        <article class="template-item">
          <h4>${template.title}</h4>
          <textarea class="template-block" readonly>${template.content}</textarea>
        </article>
      `
    )
    .join("");

  return `
    <section class="detail-section">
      <h3>Modèles prêts à l’emploi</h3>
      <p>Copiez ces textes et adaptez-les à votre situation avant envoi.</p>
      <div class="templates-grid">${templatesHtml}</div>
    </section>
  `;
}

function setActiveCard(id) {
  const cards = document.querySelectorAll(".procedure-card");
  cards.forEach((card) => {
    if (card.dataset.procedureId === id) {
      card.classList.add("active");
    } else {
      card.classList.remove("active");
    }
  });
}

function displayProcedureDetail(procedure) {
  if (!procedure) {
    detailPanel.innerHTML = `
      <div class="detail-placeholder">
        <h2>Besoin d’un coup de pouce ?</h2>
        <p>
          Sélectionnez une démarche dans la liste pour afficher un guide complet : étapes détaillées, documents à réunir,
          conseils pratiques et contacts officiels pour avancer sans stress.
        </p>
        <p class="placeholder-tip">Astuce : utilisez la recherche pour trouver rapidement votre démarche.</p>
      </div>
    `;
    return;
  }

  activeProcedureId = procedure.id;
  setActiveCard(activeProcedureId);

  const stepsHtml = procedure.steps
    .map((step, index) => {
      const documentsList = createBulletList(step.requiredDocuments, "Aucun document spécifique à cette étape.");
      const tipsList = createBulletList(step.tips, "Pas de conseil particulier, suivez simplement les indications.");

      return `
        <li class="step-item">
          <div class="step-header">
            <span class="step-number">${String(index + 1).padStart(2, "0")}</span>
            <div>
              <h4>${step.stepTitle}</h4>
              <p>${step.stepDescription}</p>
            </div>
          </div>
          <div class="step-meta">
            <div>
              <strong>Documents clés</strong>
              ${documentsList}
            </div>
            <div>
              <strong>Où se dérouler ?</strong>
              <p>${step.whereToGo}</p>
            </div>
            <div>
              <strong>Délai indicatif</strong>
              <p class="meta-highlight">${step.estimatedDelay}</p>
            </div>
            <div>
              <strong>Conseils</strong>
              ${tipsList}
            </div>
          </div>
        </li>
      `;
    })
    .join("");

  const contacts = procedure.contacts || {};
  const contactsHtml = `
    <section class="detail-section">
      <h3>Contacts utiles</h3>
      <div class="contact-card">
        <div>
          <strong>Site officiel</strong>
          <p><a href="${contacts.officialWebsite}" target="_blank" rel="noopener">Consulter le site</a></p>
        </div>
        ${contacts.phoneNumbers ? `<div><strong>Téléphone</strong>${createBulletList(contacts.phoneNumbers)}</div>` : ""}
        ${contacts.emailsOrForms ? `<div><strong>Mail / Formulaire</strong>${createBulletList(contacts.emailsOrForms)}</div>` : ""}
        ${contacts.notes ? `<p>${contacts.notes}</p>` : ""}
      </div>
    </section>
  `;

  const commonMistakesHtml = `
    <section class="detail-section">
      <h3>Erreurs fréquentes à éviter</h3>
      ${createBulletList(procedure.commonMistakes, "Aucune erreur recensée pour cette démarche.")}
    </section>
  `;

  const tipsHtml = `
    <section class="detail-section">
      <h3>Conseils pratiques</h3>
      ${createBulletList(procedure.tips, "Pas de conseil supplémentaire pour le moment.")}
    </section>
  `;

  const whoHtml = createBulletList(procedure.whoIsConcerned, "Public concerné non renseigné.");
  const prerequisitesHtml = createBulletList(procedure.prerequisites, "Aucun prérequis spécifique.");

  detailPanel.innerHTML = `
    <header class="detail-header">
      <div class="detail-title-group">
        <span class="card-badge">${procedure.category}</span>
        <h2>${procedure.title}</h2>
        <p class="detail-subtitle">${procedure.subtitle}</p>
      </div>
      <div class="detail-meta">
        <div class="meta-item">
          <span>Niveau de complexité</span>
          <strong>${procedure.difficulty}</strong>
        </div>
        <div class="meta-item">
          <span>Durée estimée</span>
          <strong>${procedure.estimatedDuration}</strong>
        </div>
        <div class="meta-item">
          <span>Autorité principale</span>
          <strong>${procedure.mainAuthority}</strong>
        </div>
      </div>
    </header>

    <section class="detail-section">
      <h3>En bref</h3>
      <p>${procedure.summary}</p>
    </section>

    <section class="detail-section">
      <h3>Qui est concerné ?</h3>
      ${whoHtml}
    </section>

    <section class="detail-section">
      <h3>Pré-requis avant de commencer</h3>
      ${prerequisitesHtml}
    </section>

    <section class="detail-section">
      <h3>Étapes détaillées</h3>
      <ol class="steps-list">
        ${stepsHtml}
      </ol>
    </section>

    ${contactsHtml}
    ${commonMistakesHtml}
    ${tipsHtml}
    ${createTemplatesSection(procedure.templates)}
  `;

  detailPanel.scrollTo({ top: 0, behavior: "smooth" });
}

function renderCards(list) {
  cardsContainer.innerHTML = "";

  list.forEach((procedure) => {
    const card = document.createElement("article");
    card.className = "procedure-card";
    card.dataset.procedureId = procedure.id;
    card.tabIndex = 0;

    card.innerHTML = `
      <span class="card-badge">${procedure.category}</span>
      <h3>${procedure.title}</h3>
      <p class="card-description">${procedure.shortDescription}</p>
      <div class="card-meta">
        <span>${procedure.difficulty}</span>
        <span>${procedure.estimatedDuration}</span>
        <span>${procedure.mainAuthority}</span>
      </div>
      <button type="button" class="card-button">Voir le parcours</button>
    `;

    card.addEventListener("click", () => displayProcedureDetail(procedure));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        displayProcedureDetail(procedure);
      }
    });

    cardsContainer.appendChild(card);
  });

  if (activeProcedureId) {
    setActiveCard(activeProcedureId);
  }
}

function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function filterProcedures(term) {
  if (!term) {
    return procedures;
  }

  return procedures.filter((procedure) => {
    const haystack = [procedure.title, procedure.category, procedure.shortDescription].join(" ");
    return normalizeText(haystack).includes(term);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderCards(procedures);

  searchInput.addEventListener("input", (event) => {
    const term = normalizeText(event.target.value);
    const filtered = filterProcedures(term);

    renderCards(filtered);

    const hasResults = filtered.length > 0;
    noResultsMessage.hidden = hasResults;

    if (!hasResults) {
      detailPanel.innerHTML = `
        <div class="detail-placeholder">
          <h2>Aucun résultat</h2>
          <p>Essayez un autre mot-clé ou explorez les catégories disponibles.</p>
        </div>
      `;
      activeProcedureId = null;
    } else if (!filtered.some((procedure) => procedure.id === activeProcedureId)) {
      detailPanel.innerHTML = `
        <div class="detail-placeholder">
          <h2>Démarche filtrée</h2>
          <p>Sélectionnez une carte parmi les résultats pour afficher le guide détaillé.</p>
        </div>
      `;
      activeProcedureId = null;
    }
  });
});

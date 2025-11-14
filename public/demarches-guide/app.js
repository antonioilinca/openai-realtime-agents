const procedures = [
  {
    id: 'naturalisation',
    title: 'Demande de naturalisation française',
    subtitle: "Obtenir la nationalité française par décret",
    category: 'Séjour / Nationalité',
    shortDescription: "Constituez un dossier solide pour demander la nationalité française et suivez le parcours jusqu’à la décision.",
    difficulty: '4/5 (élevée)',
    estimatedDuration: '12 à 18 mois selon les préfectures',
    mainAuthority: 'Préfecture + Ministère de l’Intérieur',
    summary:
      "La naturalisation par décret permet de devenir citoyen français après plusieurs années de résidence stable en France. Elle s’adresse aux personnes majeures, intégrées dans la société française et pouvant justifier de ressources suffisantes.",
    whoIsConcerned: [
      'Résidence habituelle en France depuis au moins 5 ans (sauf cas de réduction : études, service militaire, conjoint de Français, etc.)',
      'Maîtrise du français au niveau B1 minimum',
      'Casier judiciaire compatible (absence de condamnations graves)',
      'Insertion professionnelle et ressources stables',
    ],
    prerequisites: [
      'Vérifier que vous remplissez les conditions de durée de séjour ou les exceptions légales',
      'Obtenir un extrait d’acte de naissance récent traduit si nécessaire',
      'Rassembler tous les justificatifs de domicile et de ressources sur les 3 dernières années',
      'Identifier la procédure exacte de votre préfecture (prise de rendez-vous, dépôt dématérialisé, etc.)',
    ],
    steps: [
      {
        stepTitle: 'Analyser votre éligibilité',
        stepDescription:
          "Passez en revue les conditions légales (durée de séjour, intégration, ressources, absence de condamnations). Utilisez la fiche Service-Public et les simulateurs proposés par certaines préfectures.",
        requiredDocuments: [
          'Titres de séjour actuels',
          'Justificatifs de domicile sur 5 ans',
          'Relevés de carrière ou attestations d’emploi',
        ],
        whereToGo: 'Consulter https://www.service-public.fr/particuliers/vosdroits/F2213',
        estimatedDelay: '1 à 2 semaines pour faire le point',
        tips: 'Notez précisément les cas particuliers (mariage, études en France) qui peuvent réduire la durée de résidence exigée.',
      },
      {
        stepTitle: 'Réunir les actes d’état civil',
        stepDescription:
          "Commandez des actes de naissance récents (moins de 3 mois) pour vous et vos enfants. Faites-les légaliser/apostiller et traduire par un traducteur assermenté si nécessaire.",
        requiredDocuments: [
          'Extrait d’acte de naissance avec filiation',
          'Traductions certifiées si document étranger',
          'Livret de famille ou actes pour les enfants',
        ],
        whereToGo: 'Mairie du lieu de naissance ou site officiel d’état civil du pays d’origine',
        estimatedDelay: '2 à 6 semaines selon les pays',
        tips: 'Anticipez les demandes à l’étranger : certaines administrations exigent un envoi postal avec enveloppe affranchie.',
      },
      {
        stepTitle: 'Constituer le dossier complet',
        stepDescription:
          "Téléchargez la liste de pièces exigées par votre préfecture. Classez les documents dans l’ordre indiqué (identité, séjour, ressources, intégration, casier judiciaire).",
        requiredDocuments: [
          'Formulaire cerfa n°12753*03 ou téléservice',
          'Justificatifs de domicile et quittances de loyer',
          'Déclarations d’impôts et bulletins de salaire',
          'Attestation de niveau de français (TCF, DELF, diplôme français)',
        ],
        whereToGo: 'Site de votre préfecture (rubrique naturalisation)',
        estimatedDelay: '3 à 4 semaines de préparation',
        tips: 'Numérotez chaque pièce et ajoutez un sommaire. Vérifiez que chaque photocopie est lisible et datée.',
      },
      {
        stepTitle: 'Déposer la demande',
        stepDescription:
          "Selon la préfecture : prise de rendez-vous physique ou dépôt dématérialisé. Respectez scrupuleusement la procédure (format PDF, taille des fichiers).",
        requiredDocuments: [
          'Dossier complet',
          'Justificatif de prise de rendez-vous ou récépissé de dépôt',
        ],
        whereToGo: 'Préfecture compétente ou portail en ligne ANEF si disponible',
        estimatedDelay: '1 jour pour le dépôt + temps d’attente pour le rendez-vous',
        tips: 'Conservez précieusement l’accusé de réception et notez la date de dépôt dans un tableau de suivi.',
      },
      {
        stepTitle: 'Répondre aux demandes complémentaires',
        stepDescription:
          "La préfecture peut solliciter des pièces supplémentaires ou des mises à jour. Répondez rapidement en respectant le format demandé (téléversement, courrier recommandé).",
        requiredDocuments: ['Pièces complémentaires demandées', 'Traductions, mises à jour d’impôts, attestations d’employeur'],
        whereToGo: 'Boîte mail dédiée de la préfecture ou guichet lors du rendez-vous',
        estimatedDelay: '1 à 4 semaines selon la réactivité',
        tips: 'Scannez vos documents en haute qualité (300 dpi) et nommez les fichiers clairement (NOM_Prenom_Document.pdf).',
      },
      {
        stepTitle: 'Entretien d’assimilation et de motivation',
        stepDescription:
          "Vous pouvez être convoqué pour un entretien en préfecture. Préparez-vous à expliquer votre parcours, vos motivations et vos connaissances civiques de base.",
        requiredDocuments: ['Convocation', 'Pièce d’identité', 'Justificatif de domicile récent'],
        whereToGo: 'Préfecture – Bureau des naturalisations',
        estimatedDelay: 'Entretien programmé 3 à 9 mois après le dépôt',
        tips: 'Entraînez-vous à présenter votre projet en français et révisez la devise, l’hymne, les valeurs de la République.',
      },
      {
        stepTitle: 'Suivre la décision et finaliser',
        stepDescription:
          "Le ministère publie les décrets de naturalisation. Après publication, vous serez convoqué à la cérémonie d’accueil dans la citoyenneté française.",
        requiredDocuments: ['Lettre d’information', 'Pièce d’identité', 'Documents originaux'],
        whereToGo: 'Journal officiel + Préfecture',
        estimatedDelay: '6 à 12 mois après l’entretien en moyenne',
        tips: 'Consultez régulièrement la plateforme Pastel ou le site de la préfecture pour suivre l’avancée de votre dossier.',
      },
    ],
    contacts: {
      officialWebsite: 'https://www.service-public.fr/particuliers/vosdroits/F2213',
      phoneNumbers: ['0 800 94 40 40 (information générale Service-public.fr)', 'Numéro générique préfecture : 0 809 54 06 XX (à adapter selon le département)'],
      emailsOrForms: ['Formulaire de contact disponible sur le site de votre préfecture', 'Exemple d’adresse : naturalisation@prefecture-exemple.gouv.fr (indicatif)'],
      notes: 'Les coordonnées exactes varient selon la préfecture. Consultez la rubrique « Naturalisation » de votre département.',
    },
    commonMistakes: [
      'Remettre un dossier incomplet ou non signé',
      'Oublier de traduire officiellement les documents étrangers',
      'Négliger les preuves de ressources stables',
      'Attendre la dernière minute pour renouveler un titre de séjour arrivant à échéance',
    ],
    tips: [
      'Créez un classeur avec intercalaires (identité, ressources, logement, intégration) et numérotez chaque pièce.',
      'Faites des copies certifiées conformes si votre préfecture les exige encore.',
      'Notez toutes vos interactions (date, interlocuteur, canal) dans un tableau de suivi.',
    ],
    templates: [
      {
        title: 'Exemple d’email pour demander l’état d’avancement',
        content: `Objet : Suivi de mon dossier de naturalisation – [Nom Prénom]

Madame, Monsieur,

Je me permets de vous contacter concernant ma demande de naturalisation déposée le [date] sous le numéro de dossier [référence s’il existe]. Pourriez-vous m’indiquer si des pièces complémentaires sont nécessaires ou si une décision est en cours ?

Je reste à votre disposition pour tout document ou renseignement.

Cordialement,
[Nom Prénom]
[Numéro de téléphone]
[Adresse e-mail]`,
      },
    ],
  },
  {
    id: 'titre-sejour',
    title: 'Renouvellement ou demande de titre de séjour',
    subtitle: 'Maintenir ou obtenir un droit de séjour en France',
    category: 'Séjour / Nationalité',
    shortDescription: "Préparez votre dossier de titre de séjour : calendrier, justificatifs et dépôt auprès de la préfecture.",
    difficulty: '3/5 (modérée)',
    estimatedDuration: '2 à 6 mois selon le type de titre',
    mainAuthority: 'Préfecture',
    summary:
      "Le titre de séjour vous autorise à résider en France. Le renouvellement doit être anticipé pour éviter toute interruption de droits (travail, prestations, études).",
    whoIsConcerned: [
      'Étudiants étrangers, salariés, conjoints de Français, parents d’enfants français, etc.',
      'Personnes dont le titre arrive à expiration (renouvellement à initier 4 à 6 mois avant)',
      'Nouveaux arrivants en France selon leur visa d’entrée',
    ],
    prerequisites: [
      'Vérifier la catégorie de titre correspondant à votre situation (travail, vie privée et familiale, étudiant, entrepreneur)',
      'Respecter les délais de dépôt indiqués par votre préfecture',
      'Mettre à jour vos justificatifs de ressources et d’assurance maladie',
    ],
    steps: [
      {
        stepTitle: 'Identifier le type de titre adapté',
        stepDescription:
          "Consultez la fiche Service-Public et le site de la préfecture pour confirmer le type de titre (carte pluriannuelle, carte de résident, etc.).",
        requiredDocuments: ['Passeport', 'Titre de séjour actuel', 'Justificatif de situation (contrat de travail, certificat de scolarité)'],
        whereToGo: 'https://www.service-public.fr/particuliers/vosdroits/N110 (selon le cas)',
        estimatedDelay: 'Quelques jours pour valider votre catégorie',
        tips: 'Capturez les pages officielles décrivant votre situation pour vous y référer lors du dépôt.',
      },
      {
        stepTitle: 'Créer un compte ou se connecter au portail ANEF',
        stepDescription:
          "La plupart des demandes se font via https://administration-etrangers-en-france.interieur.gouv.fr. Complétez votre profil et vérifiez votre adresse mail.",
        requiredDocuments: ['Adresse email valide', 'Numéro de titre étranger (si renouvellement)'],
        whereToGo: 'Portail ANEF – rubrique Titres de séjour',
        estimatedDelay: '30 minutes à 1 heure',
        tips: 'Utilisez un scanner ou une application mobile pour numériser vos pièces lisiblement (format PDF < 5 Mo).',
      },
      {
        stepTitle: 'Rassembler les justificatifs',
        stepDescription:
          "Préparez les pièces demandées : justificatifs de domicile récents, attestations d’employeur, fiches de paie, attestations d’inscription, etc.",
        requiredDocuments: ['Justificatif de domicile < 3 mois', 'Attestations d’employeur ou d’école', 'Assurance maladie', 'Justificatifs de ressources'],
        whereToGo: 'Votre espace personnel + organismes (employeur, banque, CAF)',
        estimatedDelay: '1 à 2 semaines',
        tips: 'Renommez chaque fichier avec un titre clair (Nom_Prénom_TypeDocument_Date.pdf).',
      },
      {
        stepTitle: 'Déposer la demande et payer la taxe',
        stepDescription:
          "Téléversez l’ensemble des pièces et validez la demande. Certains titres nécessitent l’achat de timbres fiscaux électroniques.",
        requiredDocuments: ['Justificatifs scannés', 'Justificatif de paiement (timbres fiscaux)', 'Formulaire généré par ANEF'],
        whereToGo: 'Portail ANEF ou guichet préfectoral selon procédure locale',
        estimatedDelay: 'Soumission en ligne immédiate',
        tips: 'Téléchargez et conservez le récépissé d’enregistrement fourni en fin de démarche.',
      },
      {
        stepTitle: 'Suivre le traitement et répondre aux relances',
        stepDescription:
          "Consultez régulièrement votre messagerie ANEF. Fournissez toute pièce complémentaire dans les délais indiqués (souvent 15 jours).",
        requiredDocuments: ['Documents complémentaires demandés'],
        whereToGo: 'Espace en ligne ANEF ou guichet',
        estimatedDelay: '4 à 12 semaines selon les préfectures',
        tips: 'Activez les notifications mail et conservez chaque accusé de réception.',
      },
      {
        stepTitle: 'Retirer la carte de séjour',
        stepDescription:
          "Vous recevrez une convocation pour la prise d’empreintes (si nécessaire) et le retrait du titre. Présentez-vous avec les originaux.",
        requiredDocuments: ['Passeport', 'Récépissé', 'Photos d’identité', 'Justificatif de paiement'],
        whereToGo: 'Préfecture ou sous-préfecture indiquée',
        estimatedDelay: '1 à 4 semaines après la fabrication',
        tips: 'Vérifiez l’orthographe de vos noms sur le titre avant de quitter le guichet.',
      },
    ],
    contacts: {
      officialWebsite: 'https://www.service-public.fr/particuliers/vosdroits/N110',
      phoneNumbers: ['0 806 00 16 20 (information Ministère de l’Intérieur)', 'Contact préfecture selon département'],
      emailsOrForms: ['Messagerie intégrée au portail ANEF', 'Formulaire de contact préfecture (rubrique étrangers)'],
      notes: 'Certaines préfectures exigent encore un rendez-vous physique pour le dépôt : vérifiez les consignes locales.',
    },
    commonMistakes: [
      'Attendre la dernière minute pour demander un rendez-vous',
      'Téléverser des fichiers illisibles ou trop volumineux',
      'Oublier de mettre à jour l’assurance maladie',
      'Ne pas signaler un changement d’adresse pendant l’instruction',
    ],
    tips: [
      'Planifiez un rappel 6 mois avant la fin de votre titre pour commencer la préparation.',
      'Gardez une copie papier et numérique de tous les documents envoyés.',
      'En cas de difficulté, contactez une association d’aide aux étrangers (France Terre d’Asile, Cimade).',
    ],
    templates: [
      {
        title: 'Message type pour demander un rendez-vous urgent',
        content: `Bonjour,

Je me permets de solliciter un rendez-vous pour le renouvellement de mon titre de séjour « [catégorie] » arrivant à échéance le [date].

Je reste disponible pour toute pièce complémentaire et vous remercie par avance de votre retour.

Cordialement,
[Nom Prénom]
[Numéro étranger]
[Coordonnées]`,
      },
    ],
  },
  {
    id: 'auto-entreprise',
    title: 'Création d’auto-entreprise (micro-entreprise)',
    subtitle: 'Déclarer une activité indépendante en France',
    category: 'Entreprise',
    shortDescription: "Déclarez votre activité de micro-entrepreneur et comprenez vos obligations sociales et fiscales dès le départ.",
    difficulty: '2/5 (accessible)',
    estimatedDuration: 'Sous 2 semaines pour obtenir un numéro SIRET',
    mainAuthority: 'URSSAF / Guichet unique des formalités',
    summary:
      "Le régime micro-entrepreneur permet de démarrer une activité indépendante simplifiée avec des obligations sociales et fiscales allégées.",
    whoIsConcerned: [
      'Personnes souhaitant exercer une activité commerciale, artisanale ou libérale à titre principal ou complémentaire',
      'Demandeurs d’emploi souhaitant cumuler allocation et activité',
      'Salariés voulant tester une activité parallèle (sous réserve de clause de non-concurrence)',
    ],
    prerequisites: [
      'Vérifier que votre activité est compatible avec le régime micro (plafond de chiffre d’affaires)',
      'Disposer d’une adresse en France pour le siège social (domicile, domiciliation commerciale)',
      'Prévoir un justificatif d’identité valide',
    ],
    steps: [
      {
        stepTitle: 'Clarifier votre activité et vos codes APE',
        stepDescription:
          "Identifiez si vous relevez de la catégorie commerciale, artisanale ou libérale et notez l’activité principale exercée.",
        requiredDocuments: ['Description précise de l’activité', 'Justificatif de domicile'],
        whereToGo: 'https://formalites.entreprises.gouv.fr',
        estimatedDelay: '1 à 2 jours de réflexion/documentation',
        tips: 'Consultez les tableaux de correspondance des codes APE pour anticiper votre affiliation (URSSAF, CIPAV, CMA).',
      },
      {
        stepTitle: 'Créer un compte sur le guichet unique',
        stepDescription:
          "Inscrivez-vous sur formalites.entreprises.gouv.fr, vérifiez votre adresse mail et complétez les informations personnelles.",
        requiredDocuments: ['Carte d’identité ou passeport', 'Justificatif de domicile numérisé'],
        whereToGo: 'Guichet unique des formalités',
        estimatedDelay: '30 minutes',
        tips: 'Préparez vos documents scannés en couleur et lisibles (PDF ou JPEG).',
      },
      {
        stepTitle: 'Remplir la déclaration de début d’activité',
        stepDescription:
          "Renseignez les informations sur l’activité (date de début, option pour le versement libératoire, régime TVA). Vérifiez chaque champ avant de valider.",
        requiredDocuments: ['Numéro de sécurité sociale', 'RIB professionnel (facultatif)', 'Justificatifs spécifiques selon activité (diplôme)'],
        whereToGo: 'Formulaire en ligne sur le guichet unique',
        estimatedDelay: '1 heure environ',
        tips: 'Relisez attentivement les mentions légales et sauvegardez une copie PDF de la déclaration signée.',
      },
      {
        stepTitle: 'Envoyer les pièces justificatives',
        stepDescription:
          "Téléversez la copie de la pièce d’identité, la déclaration sur l’honneur de non-condamnation et, pour les artisans, l’attestation de stage ou son exonération.",
        requiredDocuments: ['Pièce d’identité', 'Déclaration sur l’honneur', 'Diplômes / attestations si requis'],
        whereToGo: 'Espace documents du guichet unique',
        estimatedDelay: '1 à 3 jours',
        tips: 'Vérifiez que chaque document est signé et daté. Utilisez un scanner pour éviter les photos floues.',
      },
      {
        stepTitle: 'Suivre la création et récupérer les attestations',
        stepDescription:
          "Vous recevrez votre numéro SIREN/SIRET par courrier électronique puis postal. Téléchargez l’attestation d’affiliation URSSAF et, si besoin, la carte professionnelle.",
        requiredDocuments: ['Courriel de confirmation', 'Identifiants guichet unique'],
        whereToGo: 'Espace suivi du guichet unique + INSEE',
        estimatedDelay: '3 à 10 jours ouvrés',
        tips: 'Archivez l’extrait K-bis ou INSEE et transmettez-le à vos partenaires (banque, clients).',
      },
      {
        stepTitle: 'Organiser la gestion quotidienne',
        stepDescription:
          "Ouvrez un compte bancaire dédié si votre chiffre d’affaires dépasse 10 000 € deux années de suite. Mettez en place un tableau de suivi des recettes/dépenses.",
        requiredDocuments: ['RIB bancaire', 'Tableur de suivi', 'Carnet de facturation'],
        whereToGo: 'Banque de votre choix, outils de comptabilité simplifiée',
        estimatedDelay: '1 à 2 semaines',
        tips: 'Utilisez un outil de facturation conforme (numérotation chronologique, mentions légales).',
      },
    ],
    contacts: {
      officialWebsite: 'https://formalites.entreprises.gouv.fr',
      phoneNumbers: ['0 806 000 126 (URSSAF – micro-entrepreneur)', 'Numéro CMA/CCI régional pour les artisans/commerçants'],
      emailsOrForms: ['Espace messagerie du guichet unique', 'Portail URSSAF : rubrique “Nous contacter”'],
      notes: 'Les CMA/CCI proposent souvent des réunions d’information gratuites : renseignez-vous localement.',
    },
    commonMistakes: [
      'Oublier de déclarer son chiffre d’affaires même à 0 €',
      'Confondre chiffre d’affaires et bénéfice pour le calcul des plafonds',
      'Négliger l’assurance responsabilité civile professionnelle',
    ],
    tips: [
      'Programmez un rappel mensuel pour déclarer vos recettes sur autoentrepreneur.urssaf.fr.',
      'Créez des modèles de devis/factures conformes dès le lancement.',
      'Tenez un tableau des charges réelles pour évaluer la rentabilité malgré le régime micro.',
    ],
    templates: [
      {
        title: 'Message type pour informer un client de votre immatriculation',
        content: `Bonjour,

Je vous confirme la création de ma micro-entreprise [nom commercial] immatriculée sous le numéro SIRET [XXXXXXXXXXXXX] depuis le [date].

Je reste à votre disposition pour toute information complémentaire et vous remercie de votre confiance.

Bien cordialement,
[Nom Prénom]
[Coordonnées]`,
      },
    ],
  },
  {
    id: 'france-travail',
    title: 'Inscription à France Travail (ex-Pôle emploi)',
    subtitle: 'Accéder à l’accompagnement et aux allocations chômage',
    category: 'Emploi',
    shortDescription: "Inscrivez-vous à France Travail, préparez vos justificatifs et organisez votre suivi mensuel.",
    difficulty: '2/5 (accessible)',
    estimatedDuration: 'Inscription en 30 minutes + rendez-vous sous 1 mois',
    mainAuthority: 'France Travail',
    summary:
      "L’inscription à France Travail (ex-Pôle emploi) permet d’être accompagné dans la recherche d’emploi et, le cas échéant, de percevoir l’allocation chômage.",
    whoIsConcerned: [
      'Demandeurs d’emploi en fin de contrat ou démission légitime',
      'Jeunes diplômés recherchant un premier emploi',
      'Travailleurs indépendants en reconversion (sous conditions)',
    ],
    prerequisites: [
      'Disposer de ses identifiants FranceConnect ou d’une adresse mail valide',
      'Rassembler les justificatifs de fin de contrat (attestation employeur, bulletins de salaire)',
      'Mettre à jour son CV',
    ],
    steps: [
      {
        stepTitle: 'Créer ou accéder à son espace personnel',
        stepDescription:
          "Connectez-vous sur france-travail.fr et utilisez FranceConnect ou créez des identifiants. Renseignez votre situation personnelle.",
        requiredDocuments: ['Adresse mail', 'Numéro de sécurité sociale'],
        whereToGo: 'https://www.francetravail.fr',
        estimatedDelay: '30 minutes',
        tips: 'Gardez une copie du questionnaire rempli pour préparer l’entretien de diagnostic.',
      },
      {
        stepTitle: 'Déclarer sa situation professionnelle',
        stepDescription:
          "Indiquez la date de fin de contrat, votre dernier employeur et votre disponibilité. Téléversez l’attestation employeur et les derniers bulletins de salaire.",
        requiredDocuments: ['Attestation employeur', 'Bulletins de salaire des 12 derniers mois', 'Pièce d’identité'],
        whereToGo: 'Espace candidat France Travail',
        estimatedDelay: '1 à 2 heures pour compléter et vérifier les pièces',
        tips: 'Scannez les bulletins en un seul PDF pour faciliter la lecture par le conseiller.',
      },
      {
        stepTitle: 'Finaliser l’inscription',
        stepDescription:
          "Validez la demande d’allocation si vous y avez droit. Un courriel de confirmation et un identifiant (numéro de dossier) vous sont transmis.",
        requiredDocuments: ['RIB', 'Attestation employeur', 'Formulaire d’allocation chômage (ARE)'],
        whereToGo: 'Espace candidat France Travail',
        estimatedDelay: 'Validation immédiate',
        tips: 'Notez votre identifiant et votre code secret : ils seront nécessaires pour l’actualisation mensuelle.',
      },
      {
        stepTitle: 'Participer à l’entretien de diagnostic',
        stepDescription:
          "Vous serez convoqué à un entretien (en visio ou en agence) pour définir votre projet professionnel et les actions d’accompagnement.",
        requiredDocuments: ['CV à jour', 'Pièce d’identité', 'Carnet de notes de candidatures éventuelles'],
        whereToGo: 'Agence France Travail ou rendez-vous en ligne',
        estimatedDelay: 'Sous 30 jours après l’inscription',
        tips: 'Préparez une liste d’offres repérées et vos contraintes (mobilité, formations souhaitées).',
      },
      {
        stepTitle: 'Actualisation mensuelle',
        stepDescription:
          "Chaque mois, entre le 28 et le 15, actualisez votre situation (travail, formation, arrêt maladie). Sans actualisation, radiation et suspension de paiement.",
        requiredDocuments: ['Identifiants France Travail', 'Justificatifs en cas de reprise d’emploi'],
        whereToGo: 'Site ou application mobile France Travail',
        estimatedDelay: '5 minutes par mois',
        tips: 'Programmez une alerte sur votre téléphone aux dates d’actualisation pour ne jamais l’oublier.',
      },
      {
        stepTitle: 'Suivre ses paiements et ses démarches',
        stepDescription:
          "Consultez votre calendrier de paiements, téléchargez les attestations nécessaires (ARE, Aide à la garde). Sollicitez les ateliers et formations proposés.",
        requiredDocuments: ['Identifiants', 'RIB'],
        whereToGo: 'Espace personnel France Travail',
        estimatedDelay: 'Temps variable selon les actions',
        tips: 'Inscrivez-vous aux ateliers (CV, entretien) directement depuis l’agenda en ligne.',
      },
    ],
    contacts: {
      officialWebsite: 'https://www.francetravail.fr',
      phoneNumbers: ['39 49 (service gratuit + prix appel)'],
      emailsOrForms: ['Messagerie sécurisée dans l’espace personnel', 'Chatbot et FAQ en ligne'],
      notes: 'Les horaires des agences varient : consultez la fiche de votre agence dans votre espace.',
    },
    commonMistakes: [
      'Oublier d’actualiser sa situation mensuellement',
      'Mal saisir la date de fin de contrat ou le motif de rupture',
      'Ne pas consulter ses messages : convocation manquée = radiation possible',
    ],
    tips: [
      'Centralisez vos candidatures (tableur partagé ou Trello) pour préparer vos rendez-vous.',
      'Activez les alertes e-mail/SMS pour les nouvelles offres.',
      'Demandez l’attestation d’actualisation après chaque déclaration pour preuve.',
    ],
    templates: [
      {
        title: 'Message pour replanifier un rendez-vous',
        content: `Bonjour [Nom du conseiller],

Je ne pourrai pas assister au rendez-vous prévu le [date/heure] en raison de [motif]. Pourrions-nous convenir d’une nouvelle date prochainement ?

Je reste disponible par téléphone et par messagerie.

Merci pour votre compréhension.

Cordialement,
[Nom Prénom]
[Numéro identifiant France Travail]`,
      },
    ],
  },
  {
    id: 'apl',
    title: 'Demande d’APL (aide personnalisée au logement)',
    subtitle: 'Obtenir une aide pour payer son loyer ou remboursement de prêt',
    category: 'Aides sociales',
    shortDescription: "Calculez votre droit à l’APL, préparez les justificatifs et suivez l’étude de la CAF.",
    difficulty: '2/5 (accessible)',
    estimatedDuration: '2 à 8 semaines selon les caisses',
    mainAuthority: 'CAF / MSA',
    summary:
      "L’APL aide à payer une partie du loyer ou des mensualités pour les logements conventionnés. Elle est attribuée selon les ressources et la situation familiale.",
    whoIsConcerned: [
      'Locataires d’un logement conventionné (logement social, résidence étudiante, certains parcs privés)',
      'Étudiants, familles, salariés aux revenus modestes',
      'Accédants à la propriété bénéficiant d’un prêt conventionné',
    ],
    prerequisites: [
      'Vérifier auprès du bailleur que le logement est éligible à l’APL',
      'Disposer d’un bail ou d’une convention d’occupation',
      'Avoir un compte CAF ou en créer un',
    ],
    steps: [
      {
        stepTitle: 'Simuler son droit',
        stepDescription:
          "Utilisez le simulateur APL sur caf.fr pour estimer le montant potentiel. Préparez vos ressources de l’année N-2.",
        requiredDocuments: ['Montant du loyer', 'Revenus N-2', 'Composition du foyer'],
        whereToGo: 'https://www.caf.fr/allocataires/mes-services-en-ligne/simuler-vos-droits',
        estimatedDelay: '15 minutes',
        tips: 'Gardez une capture du résultat pour comparer avec la décision finale.',
      },
      {
        stepTitle: 'Créer ou accéder à son compte CAF',
        stepDescription:
          "Connectez-vous avec FranceConnect ou votre numéro d’allocataire. Mettez à jour vos coordonnées et votre RIB.",
        requiredDocuments: ['Numéro allocataire (le cas échéant)', 'RIB', 'Adresse mail'],
        whereToGo: 'https://www.caf.fr',
        estimatedDelay: '20 minutes',
        tips: 'Activez la double authentification pour sécuriser votre espace.',
      },
      {
        stepTitle: 'Remplir la demande d’APL en ligne',
        stepDescription:
          "Complétez le formulaire en indiquant votre bailleur, la nature du logement, votre situation familiale et professionnelle.",
        requiredDocuments: ['Contrat de location', 'Montant du loyer', 'Pièce d’identité', 'Revenus N-2'],
        whereToGo: 'Espace « Mes démarches » sur caf.fr',
        estimatedDelay: '30 à 45 minutes',
        tips: 'Relisez attentivement les coordonnées du bailleur pour éviter un rejet.',
      },
      {
        stepTitle: 'Transmettre les justificatifs',
        stepDescription:
          "Téléversez les pièces demandées (attestation de loyer, justificatif de scolarité pour les étudiants, livret de famille).",
        requiredDocuments: ['Attestation de loyer signée par le bailleur', 'Justificatif de scolarité', 'Livret de famille', 'Attestation de prêt le cas échéant'],
        whereToGo: 'Rubrique « Mes documents » sur caf.fr',
        estimatedDelay: '1 à 2 jours',
        tips: 'Demandez au bailleur de compléter l’attestation CAF en ligne pour accélérer le traitement.',
      },
      {
        stepTitle: 'Suivre le dossier',
        stepDescription:
          "Consultez la rubrique « Suivre mes démarches » pour vérifier l’avancement. Répondez aux demandes complémentaires dans les délais.",
        requiredDocuments: ['Identifiants CAF', 'Documents complémentaires si demandés'],
        whereToGo: 'Espace CAF en ligne ou application mobile',
        estimatedDelay: '2 à 8 semaines',
        tips: 'Activez les notifications email/SMS pour être averti des demandes supplémentaires.',
      },
      {
        stepTitle: 'Contrôler le paiement et les droits',
        stepDescription:
          "Une fois la décision prise, consultez votre calendrier de paiements. L’APL peut être versée directement au bailleur ou sur votre compte.",
        requiredDocuments: ['RIB', 'Avis de décision'],
        whereToGo: 'Espace CAF > Mes paiements',
        estimatedDelay: 'Versement le 5 du mois suivant la décision',
        tips: 'Conservez l’avis de décision pour vos dossiers de logement ou de prêt.',
      },
    ],
    contacts: {
      officialWebsite: 'https://www.caf.fr',
      phoneNumbers: ['32 30 (service gratuit + prix appel)'],
      emailsOrForms: ['Messagerie sécurisée CAF', 'Points d’accueil CAF sur rendez-vous'],
      notes: 'Pour les exploitants agricoles, contactez la MSA : https://www.msa.fr.',
    },
    commonMistakes: [
      'Ne pas signaler un changement de situation (colocation, colocataire qui part, reprise d’emploi)',
      'Oublier de faire remplir l’attestation de loyer par le bailleur',
      'Téléverser un bail illisible ou incomplet',
    ],
    tips: [
      'Créez un dossier numérique « CAF » avec vos justificatifs mis à jour chaque année.',
      'Notez la date de renouvellement de la déclaration de situation chaque année en janvier.',
      'Faites un point mensuel avec votre bailleur sur les versements pour éviter les régularisations surprises.',
    ],
    templates: [
      {
        title: 'Message au bailleur pour l’attestation de loyer',
        content: `Bonjour [Nom du bailleur],

Afin de finaliser ma demande d’APL auprès de la CAF, j’ai besoin de l’attestation de loyer complétée. Vous pouvez la remplir directement en ligne via votre espace bailleur ou sur le formulaire papier joint.

Merci pour votre aide et votre réactivité.

Cordialement,
[Nom Prénom]
[Adresse du logement]`,
      },
    ],
  },
  {
    id: 'caf',
    title: 'Démarches CAF (allocations familiales, RSA, prime d’activité)',
    subtitle: 'Accéder aux prestations sociales de la CAF',
    category: 'Aides sociales',
    shortDescription: "Comprenez les principales prestations CAF, préparez vos justificatifs et sécurisez vos déclarations trimestrielles.",
    difficulty: '3/5 (variables selon la prestation)',
    estimatedDuration: 'Délai moyen 1 à 2 mois selon la prestation',
    mainAuthority: 'CAF / MSA',
    summary:
      "La CAF gère de nombreuses prestations (allocations familiales, RSA, prime d’activité). Chaque prestation nécessite des justificatifs spécifiques et un suivi régulier.",
    whoIsConcerned: [
      'Familles avec enfants, parents isolés',
      'Travailleurs aux revenus modestes pour la prime d’activité',
      'Personnes sans ressources suffisantes pour le RSA (sous conditions)',
    ],
    prerequisites: [
      'Disposer d’un numéro allocataire ou créer un compte',
      'Connaître ses revenus trimestriels ou annuels selon la prestation',
      'Identifier la prestation concernée et lire la fiche Service-Public correspondante',
    ],
    steps: [
      {
        stepTitle: 'Identifier la prestation adaptée',
        stepDescription:
          "Consultez les fiches CAF et Service-Public pour vérifier les conditions de la prestation (RSA, prime d’activité, allocations familiales).",
        requiredDocuments: ['Revenus du foyer', 'Composition familiale'],
        whereToGo: 'https://www.service-public.fr/particuliers/vosdroits/N19775 (RSA) / https://www.caf.fr',
        estimatedDelay: '1 à 2 jours pour comparer',
        tips: 'Utilisez les simulateurs CAF pour confirmer votre éligibilité avant de déposer une demande.',
      },
      {
        stepTitle: 'Mettre à jour son espace CAF',
        stepDescription:
          "Vérifiez vos coordonnées, votre RIB et vos informations familiales avant de lancer la demande. Téléchargez l’application mobile si besoin.",
        requiredDocuments: ['Identifiants CAF', 'RIB', 'Justificatif d’identité'],
        whereToGo: 'https://www.caf.fr',
        estimatedDelay: '30 minutes',
        tips: 'Activez les notifications push pour les demandes de pièces complémentaires.',
      },
      {
        stepTitle: 'Remplir la demande spécifique',
        stepDescription:
          "Chaque prestation dispose d’un formulaire dédié (RSA : dossier départemental, prime d’activité : formulaire en ligne). Fournissez les revenus exacts.",
        requiredDocuments: ['Derniers avis d’imposition', 'Bulletins de salaire', 'Justificatif de loyer (RSA logement)'],
        whereToGo: 'Espace CAF ou service social du département pour le RSA',
        estimatedDelay: '1 à 2 heures',
        tips: 'Vérifiez que les montants déclarés correspondent à vos justificatifs fiscaux.',
      },
      {
        stepTitle: 'Transmettre les pièces justificatives',
        stepDescription:
          "Numérisez vos documents et envoyez-les via « Mes documents ». Pour le RSA, déposez aussi les pièces au conseil départemental si requis.",
        requiredDocuments: ['Pièces d’identité', 'Justificatif de domicile', 'Justificatif de situation familiale (jugement, pension)'],
        whereToGo: 'CAF en ligne / accueil départemental',
        estimatedDelay: '1 semaine',
        tips: 'Nommez les fichiers selon la prestation (RSA_RevenusT1.pdf) pour vous y retrouver.',
      },
      {
        stepTitle: 'Attendre l’étude du dossier',
        stepDescription:
          "Suivez la progression dans « Mes démarches ». Répondez dans les 15 jours aux demandes de documents complémentaires.",
        requiredDocuments: ['Notifications CAF'],
        whereToGo: 'Espace CAF',
        estimatedDelay: '4 à 8 semaines selon la prestation',
        tips: 'Gardez une trace de chaque envoi (captures d’écran, accusés).',
      },
      {
        stepTitle: 'Déclarations trimestrielles ou mensuelles',
        stepDescription:
          "Pour le RSA et la prime d’activité, déclarez vos ressources chaque trimestre. Sans déclaration, paiement suspendu.",
        requiredDocuments: ['Montant exact des revenus d’activité et de remplacement', 'Justificatifs en cas de contrôle'],
        whereToGo: 'Espace CAF > Déclarer mes ressources',
        estimatedDelay: '15 minutes tous les 3 mois',
        tips: 'Planifiez une alerte dans votre agenda et préparez vos bulletins de salaire avant de commencer.',
      },
    ],
    contacts: {
      officialWebsite: 'https://www.caf.fr',
      phoneNumbers: ['32 30 (service gratuit + prix appel)', 'Numéro départemental RSA (consulter le site du conseil départemental)'],
      emailsOrForms: ['Messagerie CAF', 'Plateforme RSA de votre département'],
      notes: 'Les CAF proposent des rendez-vous en visio ou en agence : prenez rendez-vous via votre espace.',
    },
    commonMistakes: [
      'Déclarer des revenus approximatifs ou arrondis',
      'Oublier de notifier un changement de situation familiale',
      'Ignorer un courrier de contrôle',
    ],
    tips: [
      'Organisez vos justificatifs par trimestre dans un dossier partagé (cloud ou clé USB).',
      'Demandez un rendez-vous téléphonique avec un conseiller CAF en cas de doute avant de valider.',
      'Conservez 5 ans les preuves de ressources déclarées (relevés bancaires, fiches de paie).',
    ],
    templates: [
      {
        title: 'Message pour signaler un changement de situation',
        content: `Bonjour,

Je vous informe d’un changement de situation intervenu le [date] : [description du changement – naissance, reprise d’emploi, déménagement].

Merci de bien vouloir m’indiquer si des justificatifs complémentaires sont nécessaires.

Cordialement,
[Nom Prénom]
[Numéro allocataire]`,
      },
    ],
  },
  {
    id: 'carte-grise',
    title: 'Carte grise / changement d’adresse',
    subtitle: 'Mettre à jour le certificat d’immatriculation',
    category: 'Vie quotidienne',
    shortDescription: "Déclarez un déménagement ou obtenez une nouvelle carte grise via l’ANTS.",
    difficulty: '1/5 (rapide)',
    estimatedDuration: '15 jours environ',
    mainAuthority: 'ANTS (Agence Nationale des Titres Sécurisés)',
    summary:
      "Toute modification d’adresse doit être déclarée sous 1 mois. La démarche se fait en ligne sur le site de l’ANTS et permet de recevoir une étiquette ou une nouvelle carte grise.",
    whoIsConcerned: [
      'Toute personne propriétaire d’un véhicule ayant déménagé',
      'Nouveaux acquéreurs d’un véhicule d’occasion',
      'Mandataires ou professionnels habilités ANTS',
    ],
    prerequisites: [
      'Disposer du certificat d’immatriculation actuel',
      'Avoir un justificatif de domicile de moins de 6 mois',
      'Créer un compte ANTS ou utiliser FranceConnect',
    ],
    steps: [
      {
        stepTitle: 'Créer ou accéder à son compte ANTS',
        stepDescription:
          "Connectez-vous sur ants.gouv.fr via FranceConnect ou identifiant ANTS. Vérifiez vos informations personnelles.",
        requiredDocuments: ['Identifiants FranceConnect ou ANTS', 'Adresse mail'],
        whereToGo: 'https://immatriculation.ants.gouv.fr',
        estimatedDelay: '10 minutes',
        tips: 'Activez l’authentification renforcée pour sécuriser vos démarches.',
      },
      {
        stepTitle: 'Choisir la démarche « Changement de domicile »',
        stepDescription:
          "Sélectionnez le véhicule concerné et indiquez la nouvelle adresse. Confirmez les informations du titulaire.",
        requiredDocuments: ['Numéro d’immatriculation', 'Nom et prénom du titulaire'],
        whereToGo: 'Rubrique « Mon espace véhicule » sur ANTS',
        estimatedDelay: '15 minutes',
        tips: 'Préparez un justificatif de domicile scanné pour le téléversement.',
      },
      {
        stepTitle: 'Téléverser les justificatifs',
        stepDescription:
          "Ajoutez le justificatif de domicile, la carte grise actuelle (recto/verso) et une pièce d’identité.",
        requiredDocuments: ['Justificatif de domicile < 6 mois', 'Carte grise actuelle', 'Pièce d’identité'],
        whereToGo: 'Interface de dépôt ANTS',
        estimatedDelay: '10 minutes',
        tips: 'Vérifiez la lisibilité des scans pour éviter un rejet automatique.',
      },
      {
        stepTitle: 'Valider et payer les taxes éventuelles',
        stepDescription:
          "Dans le cas d’un changement d’adresse, seules les 3e et 4e modifications sont payantes. Pour un nouveau propriétaire, le coût dépend du département.",
        requiredDocuments: ['Carte bancaire', 'Relevé d’identité bancaire (pour remboursement éventuel)'],
        whereToGo: 'Plateforme ANTS – paiement sécurisé',
        estimatedDelay: 'Validation immédiate',
        tips: 'Téléchargez le récépissé provisoire (PDF) à conserver dans le véhicule.',
      },
      {
        stepTitle: 'Recevoir le document définitif',
        stepDescription:
          "Vous recevez soit une étiquette à coller, soit une nouvelle carte grise par courrier suivi.",
        requiredDocuments: ['Pièce d’identité lors de la remise du courrier recommandé'],
        whereToGo: 'Domicile – courrier La Poste',
        estimatedDelay: '3 à 7 jours ouvrés',
        tips: 'Suivez l’acheminement via le numéro de suivi disponible sur votre espace ANTS.',
      },
    ],
    contacts: {
      officialWebsite: 'https://immatriculation.ants.gouv.fr',
      phoneNumbers: ['34 00 (service gratuit + prix appel)'],
      emailsOrForms: ['Messagerie sécurisée ANTS'],
      notes: 'Les professionnels habilités (garages) peuvent également gérer la démarche pour vous (service payant).',
    },
    commonMistakes: [
      'Déclarer son changement d’adresse après le délai légal d’un mois',
      'Fournir un justificatif de domicile obsolète',
      'Oublier de télécharger le récépissé provisoire',
    ],
    tips: [
      'Gardez une copie imprimée du récépissé dans votre véhicule.',
      'Scannez vos justificatifs en PDF plutôt qu’en photo pour éviter les rejets.',
      'Suivez les notifications ANTS pour être informé d’une éventuelle pièce manquante.',
    ],
    templates: [],
  },
  {
    id: 'carte-vitale',
    title: 'Inscription à la sécurité sociale / carte Vitale',
    subtitle: 'Obtenir une prise en charge de vos soins en France',
    category: 'Santé',
    shortDescription: "Affiliez-vous à l’Assurance Maladie et demandez votre carte Vitale numérique ou physique.",
    difficulty: '2/5 (accessible)',
    estimatedDuration: '4 à 8 semaines',
    mainAuthority: 'Assurance Maladie (CPAM)',
    summary:
      "L’inscription à la sécurité sociale permet le remboursement des soins et l’accès à un numéro de sécurité sociale définitif. La carte Vitale facilite la transmission des feuilles de soins.",
    whoIsConcerned: [
      'Étudiants, salariés, demandeurs d’emploi résidant en France',
      'Nouveaux arrivants dans l’Union européenne ou hors UE (avec titre de séjour)',
      'Ayants droit souhaitant une carte Vitale individuelle',
    ],
    prerequisites: [
      'Disposer d’un justificatif de séjour si ressortissant hors UE',
      'Avoir un justificatif de domicile en France',
      'Obtenir un acte de naissance traduit si besoin',
    ],
    steps: [
      {
        stepTitle: 'Constituer le dossier d’affiliation',
        stepDescription:
          "Rassemblez les pièces nécessaires : formulaire S1106, pièce d’identité, acte de naissance, RIB, justificatif de domicile.",
        requiredDocuments: ['Formulaire S1106', 'Pièce d’identité', 'Acte de naissance avec traduction le cas échéant', 'Justificatif de domicile', 'RIB'],
        whereToGo: 'https://www.ameli.fr/assure/droits-demarches/principes/affiliation',
        estimatedDelay: '1 à 2 semaines pour réunir les pièces',
        tips: 'Faites certifier la traduction de l’acte de naissance si elle provient d’un pays hors UE.',
      },
      {
        stepTitle: 'Envoyer le dossier à la CPAM',
        stepDescription:
          "Transmettez le dossier complet par courrier ou dépôt en agence. Utilisez l’adresse de la CPAM de votre département.",
        requiredDocuments: ['Dossier complet'],
        whereToGo: 'CPAM de votre lieu de résidence',
        estimatedDelay: 'Envoi postal 2 à 5 jours',
        tips: 'Envoyez en recommandé avec accusé pour prouver la date de dépôt.',
      },
      {
        stepTitle: 'Recevoir le numéro de sécurité sociale provisoire',
        stepDescription:
          "Un numéro provisoire peut être attribué en attendant la vérification des actes d’état civil.",
        requiredDocuments: ['Courrier de la CPAM'],
        whereToGo: 'Boîte mail ou courrier postal',
        estimatedDelay: '3 à 6 semaines après dépôt',
        tips: 'Utilisez ce numéro provisoire pour vos soins en attendant le définitif.',
      },
      {
        stepTitle: 'Créer un compte ameli',
        stepDescription:
          "Une fois affilié, créez votre compte sur ameli.fr pour suivre vos remboursements et demander la carte Vitale.",
        requiredDocuments: ['Numéro de sécurité sociale', 'RIB', 'Adresse mail'],
        whereToGo: 'https://www.ameli.fr',
        estimatedDelay: '20 minutes',
        tips: 'Installez l’application ameli pour recevoir des notifications.',
      },
      {
        stepTitle: 'Commander la carte Vitale',
        stepDescription:
          "Depuis votre compte ameli, commandez la carte Vitale en téléversant une photo et une pièce d’identité.",
        requiredDocuments: ['Photo d’identité numérique', 'Pièce d’identité', 'Justificatif de domicile (si demandé)'],
        whereToGo: 'Compte ameli > Mes démarches',
        estimatedDelay: '2 à 3 semaines pour recevoir la carte',
        tips: 'Préparez une photo aux normes officielles (fond clair, visage dégagé).',
      },
      {
        stepTitle: 'Activer la carte et mettre à jour',
        stepDescription:
          "À réception, signez la carte, mettez-la à jour en pharmacie et conservez la lettre de remise.",
        requiredDocuments: ['Carte Vitale', 'Numéro de sécurité sociale'],
        whereToGo: 'Pharmacies ou bornes multi-services',
        estimatedDelay: 'Mise à jour immédiate',
        tips: 'Programmez une mise à jour annuelle en pharmacie pour garder vos droits actifs.',
      },
    ],
    contacts: {
      officialWebsite: 'https://www.ameli.fr',
      phoneNumbers: ['36 46 (service gratuit + prix appel)'],
      emailsOrForms: ['Messagerie sécurisée ameli', 'Points d’accueil sur rendez-vous'],
      notes: 'Pour les étudiants étrangers, consultez aussi https://etudiant-etranger.ameli.fr.',
    },
    commonMistakes: [
      'Oublier de traduire l’acte de naissance',
      'Envoyer des copies non lisibles',
      'Ne pas mettre à jour la carte Vitale chaque année',
    ],
    tips: [
      'Conservez un scan de votre acte de naissance et de sa traduction pour d’autres démarches.',
      'Ajoutez un rappel annuel pour vérifier vos coordonnées sur ameli.fr.',
      'Téléchargez l’attestation de droits dès réception du numéro provisoire.',
    ],
    templates: [],
  },
  {
    id: 'permis-etranger',
    title: 'Échange de permis de conduire étranger',
    subtitle: 'Obtenir un permis français équivalent',
    category: 'Transport',
    shortDescription: "Échangez votre permis étranger dans les délais et évitez de repasser l’examen.",
    difficulty: '3/5 (modérée)',
    estimatedDuration: '6 à 12 mois selon les préfectures',
    mainAuthority: 'Préfecture / ANTS',
    summary:
      "Les détenteurs d’un permis étranger provenant d’un pays ayant un accord avec la France peuvent demander un échange pour un permis français sans repasser l’examen.",
    whoIsConcerned: [
      'Titulaire d’un permis délivré dans un pays ayant un accord de réciprocité',
      'Résidant en France depuis moins d’un an au moment de la demande',
      'Étudiants et travailleurs détachés sous conditions',
    ],
    prerequisites: [
      'Vérifier si votre permis est échangeable (liste des pays sur service-public.fr)',
      'Disposer d’un titre de séjour ou justificatif de résidence',
      'Faire traduire le permis si nécessaire',
    ],
    steps: [
      {
        stepTitle: 'Vérifier l’éligibilité',
        stepDescription:
          "Consultez la liste officielle des pays pour savoir si votre permis est échangeable. Vérifiez la durée de validité et la catégorie du permis.",
        requiredDocuments: ['Permis étranger', 'Titre de séjour', 'Justificatif de domicile'],
        whereToGo: 'https://www.service-public.fr/particuliers/vosdroits/F1460',
        estimatedDelay: '1 jour',
        tips: 'Si votre pays n’est pas éligible, anticipez l’inscription à l’examen français.',
      },
      {
        stepTitle: 'Créer un compte ANTS et choisir « Échanger un permis étranger »',
        stepDescription:
          "Connectez-vous et remplissez les informations (date d’obtention, catégories, lieu de délivrance).",
        requiredDocuments: ['Identifiants ANTS', 'Permis étranger', 'Traduction assermentée le cas échéant'],
        whereToGo: 'https://permisdeconduire.ants.gouv.fr',
        estimatedDelay: '30 minutes',
        tips: 'Photographiez votre permis recto-verso en haute définition.',
      },
      {
        stepTitle: 'Téléverser les justificatifs obligatoires',
        stepDescription:
          "Fournissez un justificatif d’identité, un justificatif de résidence en France, une traduction certifiée, une photo d’identité numérique.",
        requiredDocuments: ['Justificatif de domicile', 'Titre de séjour', 'Traduction du permis', 'Photo d’identité ANTS'],
        whereToGo: 'Interface ANTS – dépôt de documents',
        estimatedDelay: '1 à 2 jours',
        tips: 'Utilisez la photo-code ANTS pour éviter un rejet technique.',
      },
      {
        stepTitle: 'Suivre les demandes complémentaires',
        stepDescription:
          "La préfecture peut demander un relevé d’information restreint (RIR) auprès de l’autorité étrangère. Fournissez-le rapidement.",
        requiredDocuments: ['RIR ou certificat d’authenticité', 'Permis original'],
        whereToGo: 'Autorité du pays d’origine + plateforme ANTS',
        estimatedDelay: '2 à 3 mois',
        tips: 'Anticipez la demande de RIR : certains pays mettent plusieurs semaines à répondre.',
      },
      {
        stepTitle: 'Remettre le permis étranger',
        stepDescription:
          "Une fois la demande validée, vous devrez envoyer votre permis original par courrier recommandé.",
        requiredDocuments: ['Permis original', 'Lettre de remise signée'],
        whereToGo: 'Centre d’instruction permis étrangers (adresse indiquée sur la notification)',
        estimatedDelay: 'Envoi sous 15 jours après la demande',
        tips: 'Gardez une copie du permis avant envoi et conservez le récépissé postal.',
      },
      {
        stepTitle: 'Recevoir le permis français',
        stepDescription:
          "Le permis français arrive par courrier sécurisé. Vérifiez les catégories et les dates de validité inscrites.",
        requiredDocuments: ['Pièce d’identité lors de la remise du courrier'],
        whereToGo: 'Domicile – courrier suivi',
        estimatedDelay: '2 à 4 mois après l’envoi du permis original',
        tips: 'Mettez à jour votre assurance auto avec le nouveau numéro de permis.',
      },
    ],
    contacts: {
      officialWebsite: 'https://permisdeconduire.ants.gouv.fr',
      phoneNumbers: ['34 00 (service gratuit + prix appel)'],
      emailsOrForms: ['Messagerie ANTS – dossier permis étrangers'],
      notes: 'Les délais sont longs : vérifiez régulièrement l’avancement dans votre espace ANTS.',
    },
    commonMistakes: [
      'Demander l’échange après le délai d’un an suivant l’installation en France',
      'Fournir une traduction non assermentée',
      'Ne pas envoyer le permis original lorsque demandé',
    ],
    tips: [
      'Sauvegardez tous vos documents sur un cloud sécurisé pour pouvoir les renvoyer rapidement.',
      'Anticipez le renouvellement de votre titre de séjour si nécessaire pendant la procédure.',
      'Utilisez les forums et retours d’expérience pour connaître les délais dans votre département.',
    ],
    templates: [],
  },
  {
    id: 'enic-naric',
    title: 'Reconnaissance de diplômes étrangers (ENIC-NARIC)',
    subtitle: 'Obtenir une attestation de comparabilité',
    category: 'Éducation / Diplômes',
    shortDescription: "Faites reconnaître votre diplôme étranger pour travailler ou étudier en France.",
    difficulty: '3/5 (modérée)',
    estimatedDuration: '3 à 4 mois',
    mainAuthority: 'France Éducation International',
    summary:
      "Le centre ENIC-NARIC délivre des attestations de comparabilité permettant de valoriser un diplôme étranger auprès des employeurs et établissements français.",
    whoIsConcerned: [
      'Diplômés étrangers souhaitant poursuivre des études ou exercer une profession en France',
      'Employeurs demandant une attestation pour valider un niveau d’études',
      'Professionnels régulés (santé, social) nécessitant une reconnaissance spécifique',
    ],
    prerequisites: [
      'Disposer de copies officielles de son diplôme et des relevés de notes',
      'Faire traduire les documents en français si nécessaire',
      'Prévoir un moyen de paiement en ligne (carte bancaire)',
    ],
    steps: [
      {
        stepTitle: 'Créer un compte sur le portail ENIC-NARIC',
        stepDescription:
          "Inscrivez-vous sur la plateforme de France Éducation International et validez votre adresse mail.",
        requiredDocuments: ['Adresse mail', 'Pièce d’identité'],
        whereToGo: 'https://www.france-education-international.fr/enic-naric',
        estimatedDelay: '20 minutes',
        tips: 'Utilisez une adresse mail personnelle durable, le compte servira pour toute future demande.',
      },
      {
        stepTitle: 'Préparer les scans des documents',
        stepDescription:
          "Scannez en couleur le diplôme, les relevés de notes, attestations de réussite et traductions assermentées.",
        requiredDocuments: ['Diplôme', 'Relevés de notes', 'Traductions officielles', 'Pièce d’identité'],
        whereToGo: 'Votre espace numérique',
        estimatedDelay: '1 à 2 jours',
        tips: 'Vérifiez que chaque document pèse moins de 2 Mo pour respecter les limites de dépôt.',
      },
      {
        stepTitle: 'Remplir la demande en ligne',
        stepDescription:
          "Indiquez le pays, le niveau du diplôme, la filière, la durée des études. Expliquez l’objectif de l’attestation.",
        requiredDocuments: ['Informations détaillées sur le cursus', 'Justificatif d’adresse'],
        whereToGo: 'Portail ENIC-NARIC',
        estimatedDelay: '1 heure',
        tips: 'Rédigez un court paragraphe sur l’usage prévu (emploi, études) : cela peut orienter la lecture.',
      },
      {
        stepTitle: 'Payer les frais de dossier',
        stepDescription:
          "Le coût est d’environ 70 €. Le paiement se fait en ligne par carte bancaire ou virement SEPA.",
        requiredDocuments: ['Carte bancaire ou IBAN'],
        whereToGo: 'Interface de paiement sécurisée ENIC-NARIC',
        estimatedDelay: 'Quelques minutes',
        tips: 'Téléchargez immédiatement la facture acquittée pour vos remboursements éventuels.',
      },
      {
        stepTitle: 'Suivre l’instruction',
        stepDescription:
          "Vous recevez un accusé de réception. L’équipe peut demander des compléments (programme détaillé, volume horaire).",
        requiredDocuments: ['Documents complémentaires éventuels'],
        whereToGo: 'Messagerie du portail ENIC-NARIC',
        estimatedDelay: '2 à 3 mois',
        tips: 'Répondez sous 10 jours aux demandes pour ne pas rallonger le délai.',
      },
      {
        stepTitle: 'Recevoir l’attestation',
        stepDescription:
          "L’attestation de comparabilité est envoyée par mail (PDF sécurisé) et par courrier. Conservez-la précieusement.",
        requiredDocuments: ['Identifiants portail'],
        whereToGo: 'Espace personnel ENIC-NARIC',
        estimatedDelay: '1 semaine après la décision',
        tips: 'Faites plusieurs copies certifiées conformes si vous devez la fournir à différentes administrations.',
      },
    ],
    contacts: {
      officialWebsite: 'https://www.france-education-international.fr/enic-naric',
      phoneNumbers: ['01 45 07 63 21 (standard France Éducation International)'],
      emailsOrForms: ['Formulaire de contact sur le portail ENIC-NARIC'],
      notes: 'Certaines professions réglementées exigent des démarches supplémentaires auprès des ordres professionnels.',
    },
    commonMistakes: [
      'Fournir des scans incomplets (recto uniquement)',
      'Oublier les relevés de notes détaillés',
      'Ne pas répondre aux demandes complémentaires dans le délai imparti',
    ],
    tips: [
      'Préparez une traduction officielle même si les documents sont en anglais : certaines filières le demandent.',
      'Gardez un dossier numérique avec les documents originaux + traductions pour d’autres démarches (inscription université, reconnaissance professionnelle).',
      'Consultez les listes de professions réglementées pour anticiper les démarches post-attestation.',
    ],
    templates: [],
  },
];

const cardsContainer = document.getElementById('cards-container');
const detailPanel = document.getElementById('detail-panel');
const searchInput = document.getElementById('search');

function renderCards(list) {
  if (!list.length) {
    cardsContainer.innerHTML = `<div class="empty-state">Aucune démarche ne correspond à votre recherche pour le moment.</div>`;
    return;
  }

  const html = list
    .map(
      (procedure) => `
        <article class="card" data-id="${procedure.id}">
          <div class="card-header">
            <h2>${procedure.title}</h2>
            <span class="badge">${procedure.category}</span>
          </div>
          <p>${procedure.shortDescription}</p>
          <div class="card-meta">
            <span>Difficulté : ${procedure.difficulty}</span>
            <span>Durée : ${procedure.estimatedDuration}</span>
            <span>Autorité : ${procedure.mainAuthority}</span>
          </div>
          <button class="cta" type="button">Voir le parcours</button>
        </article>
      `
    )
    .join('');

  cardsContainer.innerHTML = html;
}

function renderDetail(procedure) {
  if (!procedure) {
    detailPanel.innerHTML = `
      <div class="detail-empty">
        <h2>Sélectionnez une démarche</h2>
        <p>Choisissez une carte pour afficher un guide détaillé : étapes, documents, contacts, conseils pratiques.</p>
      </div>
    `;
    return;
  }

  const whoList = procedure.whoIsConcerned.map((item) => `<li>${item}</li>`).join('');
  const prereqList = procedure.prerequisites.map((item) => `<li>${item}</li>`).join('');

  const steps = procedure.steps
    .map(
      (step, index) => `
        <div class="step">
          <h4>Étape ${index + 1} – ${step.stepTitle}</h4>
          <p>${step.stepDescription}</p>
          <div class="step-meta">
            <span>Où : ${step.whereToGo}</span>
            <span>Délai estimé : ${step.estimatedDelay}</span>
          </div>
          ${
            step.requiredDocuments && step.requiredDocuments.length
              ? `<strong>Documents utiles :</strong><ul>${step.requiredDocuments.map((doc) => `<li>${doc}</li>`).join('')}</ul>`
              : ''
          }
          ${step.tips ? `<p><strong>Astuce :</strong> ${step.tips}</p>` : ''}
        </div>
      `
    )
    .join('');

  const mistakes = procedure.commonMistakes.map((item) => `<li>${item}</li>`).join('');
  const tips = procedure.tips.map((item) => `<li>${item}</li>`).join('');

  const templates =
    procedure.templates && procedure.templates.length
      ? `
        <div class="detail-section templates">
          <h3>Modèles prêts à l’emploi</h3>
          ${procedure.templates
            .map(
              (template) => `
                <article>
                  <h4>${template.title}</h4>
                  <pre>${template.content}</pre>
                </article>
              `
            )
            .join('')}
        </div>
      `
      : '';

  const contactsPhones = procedure.contacts.phoneNumbers
    .map((phone) => `<li>${phone}</li>`)
    .join('');
  const contactsEmails = procedure.contacts.emailsOrForms
    .map((item) => `<li>${item}</li>`)
    .join('');

  detailPanel.innerHTML = `
    <div class="detail-header">
      <h2>${procedure.title}</h2>
      <p>${procedure.subtitle}</p>
      <div class="detail-tags">
        <span class="badge">${procedure.category}</span>
        <span>Difficulté : ${procedure.difficulty}</span>
        <span>Durée estimée : ${procedure.estimatedDuration}</span>
        <span>Autorité principale : ${procedure.mainAuthority}</span>
      </div>
    </div>

    <div class="detail-section">
      <h3>En bref</h3>
      <p>${procedure.summary}</p>
    </div>

    <div class="detail-section">
      <h3>Qui est concerné ?</h3>
      <ul>${whoList}</ul>
    </div>

    <div class="detail-section">
      <h3>Pré-requis avant de commencer</h3>
      <ul>${prereqList}</ul>
    </div>

    <div class="detail-section">
      <h3>Étapes détaillées</h3>
      <div class="steps">${steps}</div>
    </div>

    <div class="detail-section">
      <h3>Contacts utiles</h3>
      <p><strong>Site officiel :</strong> <a href="${procedure.contacts.officialWebsite}" target="_blank" rel="noopener noreferrer">${procedure.contacts.officialWebsite}</a></p>
      <p><strong>Téléphone :</strong></p>
      <ul>${contactsPhones}</ul>
      <p><strong>Emails / formulaires :</strong></p>
      <ul>${contactsEmails}</ul>
      ${procedure.contacts.notes ? `<p class="note">${procedure.contacts.notes}</p>` : ''}
    </div>

    <div class="detail-section">
      <h3>Erreurs fréquentes à éviter</h3>
      <ul>${mistakes}</ul>
    </div>

    <div class="detail-section">
      <h3>Conseils pratiques</h3>
      <ul>${tips}</ul>
    </div>
    ${templates}
  `;
}

function handleCardClick(event) {
  const card = event.target.closest('.card');
  if (!card) return;

  const procedureId = card.getAttribute('data-id');
  const procedure = procedures.find((item) => item.id === procedureId);
  renderDetail(procedure);

  card.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function handleSearch(event) {
  const query = event.target.value.trim().toLowerCase();
  if (!query) {
    renderCards(procedures);
    return;
  }

  const filtered = procedures.filter((procedure) => {
    const haystack = `${procedure.title} ${procedure.category}`.toLowerCase();
    return haystack.includes(query);
  });

  renderCards(filtered);
}

renderCards(procedures);
renderDetail(null);

cardsContainer.addEventListener('click', handleCardClick);
searchInput.addEventListener('input', handleSearch);


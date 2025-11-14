// --- Données principales ---
const userProfile = {
  age: null,
  nationality: null,
  regionType: null,
  situationPro: null,
  franceTravailInscrit: null,
  isStudent: null,
  studyStatus: null,
  studyDistance: null,
  familySituation: null,
  enfants: '0',
  parentIsole: 'non',
  handicap: 'non',
  logementType: null,
  loyer: null,
  aideLogementExistante: null,
  revenusMensuels: null,
  sourceRevenus: [],
  ressourcesDetail: null,
  repriseActivite: 'non',
};

const steps = [
  {
    id: 'profil',
    title: 'Votre profil',
    description: 'Quelques informations générales pour commencer.',
    questions: [
      {
        type: 'select',
        label: 'Quel est votre âge ? (approximation)',
        key: 'age',
        options: [
          { value: '18-20', label: '18 à 20 ans' },
          { value: '21-24', label: '21 à 24 ans' },
          { value: '25-30', label: '25 à 30 ans' },
          { value: '31-40', label: '31 à 40 ans' },
          { value: '41-55', label: '41 à 55 ans' },
          { value: '56+', label: '56 ans et plus' },
        ],
        required: true,
      },
      {
        type: 'select',
        label: 'Quelle est votre nationalité ?',
        key: 'nationality',
        options: [
          { value: 'francaise', label: 'Française / UE / EEE / Suisse' },
          { value: 'etrangere', label: 'Autre nationalité' },
        ],
        required: true,
      },
      {
        type: 'select',
        label: 'Où résidez-vous principalement ?',
        key: 'regionType',
        options: [
          { value: 'metropole', label: 'France métropolitaine' },
          { value: 'dom', label: 'Département / collectivité d’outre-mer' },
        ],
        required: true,
      },
    ],
  },
  {
    id: 'situationPro',
    title: 'Situation professionnelle',
    description: 'Parlez-nous de votre activité principale.',
    questions: [
      {
        type: 'select',
        label: 'Quelle est votre situation actuelle ?',
        key: 'situationPro',
        options: [
          { value: 'etudiant', label: 'Étudiant·e / Lycéen·ne' },
          { value: 'salarie', label: 'Salarié·e' },
          { value: 'independant', label: 'Indépendant·e / Auto-entrepreneur·se' },
          { value: 'demandeur', label: 'Demandeur·se d’emploi' },
          { value: 'sansActivite', label: 'Sans activité déclarée' },
        ],
        required: true,
      },
      {
        type: 'select',
        label: 'Êtes-vous inscrit·e à France Travail (ex-Pôle emploi) ? (si concerné)',
        key: 'franceTravailInscrit',
        options: [
          { value: 'oui', label: 'Oui' },
          { value: 'non', label: 'Non' },
          { value: 'non-concerne', label: 'Non concerné' },
        ],
        required: false,
        showIf: profile => ['demandeur', 'sansActivite'].includes(profile.situationPro),
      },
      {
        type: 'select',
        label: 'Êtes-vous actuellement étudiant·e dans le supérieur ?',
        key: 'isStudent',
        options: [
          { value: 'oui', label: 'Oui' },
          { value: 'non', label: 'Non' },
        ],
        required: true,
      },
      {
        type: 'select',
        label: 'Quel est votre statut d’étude ?',
        key: 'studyStatus',
        options: [
          { value: 'initial', label: 'Formation initiale' },
          { value: 'apprentissage', label: 'Apprentissage / alternance' },
          { value: 'aucun', label: 'Non concerné' },
        ],
        required: false,
        showIf: profile => profile.isStudent === 'oui',
      },
      {
        type: 'select',
        label: 'Étudiez-vous dans la même ville que votre logement principal ?',
        key: 'studyDistance',
        options: [
          { value: 'memeVille', label: 'Oui, même ville / proche' },
          { value: 'autreVille', label: 'Non, autre ville / longue distance' },
          { value: 'non-concerne', label: 'Non concerné' },
        ],
        required: false,
        showIf: profile => profile.isStudent === 'oui',
      },
    ],
  },
  {
    id: 'famille',
    title: 'Situation familiale',
    description: 'Ces informations orientent certaines aides de la CAF.',
    questions: [
      {
        type: 'select',
        label: 'Quelle est votre situation familiale ?',
        key: 'familySituation',
        options: [
          { value: 'celibataire', label: 'Célibataire' },
          { value: 'couple', label: 'En couple' },
          { value: 'marie', label: 'Marié·e / pacsé·e' },
          { value: 'parentIsole', label: 'Parent isolé·e' },
        ],
        required: true,
      },
      {
        type: 'select',
        label: 'Combien d’enfants ou de personnes à charge ?',
        key: 'enfants',
        options: [
          { value: '0', label: 'Aucun' },
          { value: '1', label: '1 enfant' },
          { value: '2', label: '2 enfants' },
          { value: '3+', label: '3 enfants ou plus' },
        ],
        required: true,
      },
      {
        type: 'select',
        label: 'Êtes-vous parent isolé·e ?',
        key: 'parentIsole',
        options: [
          { value: 'oui', label: 'Oui' },
          { value: 'non', label: 'Non' },
        ],
        required: true,
      },
      {
        type: 'select',
        label: 'Êtes-vous en situation de handicap reconnu ?',
        key: 'handicap',
        options: [
          { value: 'oui', label: 'Oui' },
          { value: 'non', label: 'Non' },
        ],
        required: true,
      },
    ],
  },
  {
    id: 'logement',
    title: 'Votre logement',
    description: 'Quelques précisions sur votre situation de logement.',
    questions: [
      {
        type: 'select',
        label: 'Quel est votre type de logement ?',
        key: 'logementType',
        options: [
          { value: 'locataire', label: 'Locataire (logement classique)' },
          { value: 'logementEtudiant', label: 'Logement étudiant (CROUS, résidence)' },
          { value: 'heberge', label: 'Hébergé·e à titre gratuit' },
          { value: 'proprietaire', label: 'Propriétaire' },
          { value: 'foyer', label: 'Foyer / résidence sociale' },
        ],
        required: true,
      },
      {
        type: 'select',
        label: 'Montant approximatif de votre loyer mensuel ?',
        key: 'loyer',
        options: [
          { value: 'moins300', label: 'Moins de 300 €' },
          { value: '300-600', label: 'Entre 300 € et 600 €' },
          { value: '600-900', label: 'Entre 600 € et 900 €' },
          { value: '900+', label: 'Plus de 900 €' },
          { value: 'nonConcerne', label: 'Je ne paye pas de loyer' },
        ],
        required: true,
      },
      {
        type: 'select',
        label: 'Percevez-vous déjà une aide au logement ?',
        key: 'aideLogementExistante',
        options: [
          { value: 'oui', label: 'Oui' },
          { value: 'non', label: 'Non' },
          { value: 'incertain', label: 'Je ne sais pas' },
        ],
        required: true,
      },
    ],
  },
  {
    id: 'ressources',
    title: 'Vos ressources',
    description: 'Indiquez vos ressources mensuelles approximatives.',
    questions: [
      {
        type: 'select',
        label: 'Fourchette de revenus mensuels du foyer ?',
        key: 'revenusMensuels',
        options: [
          { value: '0-700', label: 'Moins de 700 €' },
          { value: '700-1200', label: '700 € à 1 200 €' },
          { value: '1200-1800', label: '1 200 € à 1 800 €' },
          { value: '1800-2500', label: '1 800 € à 2 500 €' },
          { value: '2500+', label: 'Plus de 2 500 €' },
        ],
        required: true,
      },
      {
        type: 'checkbox-group',
        label: 'Sources principales de revenus (plusieurs choix possibles)',
        key: 'sourceRevenus',
        options: [
          { value: 'salaire', label: 'Salaire' },
          { value: 'allocations', label: 'Allocations CAF' },
          { value: 'rsa', label: 'RSA' },
          { value: 'bourse', label: 'Bourses d’études' },
          { value: 'chomage', label: 'Indemnités chômage' },
          { value: 'aucun', label: 'Aucun revenu / aides informelles' },
        ],
        required: false,
      },
      {
        type: 'select',
        label: 'Avez-vous repris une activité récemment (moins de 6 mois) ?',
        key: 'repriseActivite',
        options: [
          { value: 'oui', label: 'Oui' },
          { value: 'non', label: 'Non' },
        ],
        required: false,
      },
    ],
  },
  {
    id: 'final',
    title: 'Cas particuliers',
    description: 'Ces situations peuvent ouvrir droit à des aides complémentaires.',
    questions: [
      {
        type: 'select',
        label: 'Souhaitez-vous ajouter des informations complémentaires ?',
        key: 'ressourcesDetail',
        options: [
          { value: 'etudesEtranger', label: 'Études loin du domicile / déplacements coûteux' },
          { value: 'chargeLourde', label: 'Charges importantes (santé, handicap)' },
          { value: 'transitionPro', label: 'Transition professionnelle / reconversion' },
          { value: 'aucun', label: 'Aucune information supplémentaire' },
        ],
        required: false,
      },
    ],
  },
];

const aides = [
  {
    id: 'apl',
    name: 'APL – Aide personnalisée au logement',
    shortDescription: 'Soutien pour réduire le montant du loyer ou de la redevance.',
    category: 'Logement',
    mainCriteriaDescription: 'Locataire ou résident en foyer / logement étudiant avec revenus modestes.',
    officialLinks: [
      { label: 'Fiche Service-Public.fr', url: 'https://www.service-public.fr/particuliers/vosdroits/F12006' },
      { label: 'Simulateur CAF', url: 'https://www.caf.fr/allocataires/mes-services-en-ligne/faire-une-simulation' },
    ],
    notes: 'Montant dépend du loyer, de la zone et des ressources exactes. Simulation indicative uniquement.',
    eligibilityLogic: profile => {
      const eligibleLogement = ['locataire', 'logementEtudiant', 'foyer'].includes(profile.logementType);
      const loyerValide = profile.loyer && profile.loyer !== 'nonConcerne';
      const revenusFaibles = ['0-700', '700-1200', '1200-1800'].includes(profile.revenusMensuels);
      if (!eligibleLogement || !loyerValide) return 0;
      if (revenusFaibles) return 85;
      if (profile.revenusMensuels === '1800-2500') return 55;
      return 30;
    },
  },
  {
    id: 'allocations-familiales',
    name: 'Allocations familiales (CAF)',
    shortDescription: 'Aides mensuelles pour soutenir les familles avec enfants à charge.',
    category: 'Famille',
    mainCriteriaDescription: 'Au moins un enfant à charge, résidence stable en France, ressources respectant les plafonds.',
    officialLinks: [
      { label: 'Allocations familiales – CAF', url: 'https://www.caf.fr/allocataires/droits-et-prestations/s-informer-sur-les-prestations/allocations-familiales' },
    ],
    notes: 'Plafonds de ressources variables. Pensez à mettre à jour votre dossier CAF.',
    eligibilityLogic: profile => {
      const enfants = profile.enfants && profile.enfants !== '0';
      if (!enfants) return 0;
      if (['0-700', '700-1200', '1200-1800'].includes(profile.revenusMensuels)) return 80;
      if (profile.revenusMensuels === '1800-2500') return 60;
      return 35;
    },
  },
  {
    id: 'prime-activite',
    name: 'Prime d’activité',
    shortDescription: 'Complément de revenus pour les travailleurs aux ressources modestes.',
    category: 'Ressources',
    mainCriteriaDescription: 'Activité salariée ou indépendante, revenus modestes, résidence stable en France.',
    officialLinks: [
      { label: 'Prime d’activité – CAF', url: 'https://www.caf.fr/allocataires/droits-et-prestations/s-informer-sur-les-prestations/prime-d-activite' },
    ],
    notes: 'Montants ajustés chaque trimestre selon la situation professionnelle et familiale.',
    eligibilityLogic: profile => {
      const actif = ['salarie', 'independant'].includes(profile.situationPro);
      if (!actif) return 0;
      if (['700-1200', '1200-1800'].includes(profile.revenusMensuels)) return 75;
      if (profile.revenusMensuels === '0-700') return 50; // peut dépendre du temps de travail
      if (profile.revenusMensuels === '1800-2500') return 45;
      return 15;
    },
  },
  {
    id: 'rsa',
    name: 'RSA – Revenu de solidarité active',
    shortDescription: 'Revenu minimum pour les personnes sans ressources suffisantes.',
    category: 'Solidarité',
    mainCriteriaDescription: 'Ressources très faibles, âge supérieur à 25 ans (ou parent isolé).',
    officialLinks: [
      { label: 'RSA – Service-public.fr', url: 'https://www.service-public.fr/particuliers/vosdroits/F2405' },
    ],
    notes: 'Des critères supplémentaires existent selon l’âge, la situation familiale et la nationalité.',
    eligibilityLogic: profile => {
      const revenusFaibles = ['0-700', '700-1200'].includes(profile.revenusMensuels);
      const situation = ['demandeur', 'sansActivite'].includes(profile.situationPro);
      const ageOk = profile.age && ['25-30', '31-40', '41-55', '56+'].includes(profile.age);
      if (!revenusFaibles || !situation) return 0;
      if (ageOk || profile.parentIsole === 'oui') return 80;
      return 40;
    },
  },
  {
    id: 'bourses-cro',
    name: 'Bourses sur critères sociaux (CROUS)',
    shortDescription: 'Aide financière pour les étudiant·es du supérieur selon les ressources du foyer.',
    category: 'Études',
    mainCriteriaDescription: 'Études supérieures, revenus familiaux modestes, situation sociale particulière.',
    officialLinks: [
      { label: 'Bourses étudiantes – etudiant.gouv', url: 'https://www.etudiant.gouv.fr/fr/bourses-sur-criteres-sociaux-79' },
    ],
    notes: 'Dossier à déposer via Parcoursup ou le portail messervices.etudiant.gouv.fr.',
    eligibilityLogic: profile => {
      if (profile.isStudent !== 'oui') return 0;
      if (['0-700', '700-1200', '1200-1800'].includes(profile.revenusMensuels)) return 85;
      return 45;
    },
  },
  {
    id: 'aide-merite',
    name: 'Aides complémentaires étudiant·es (aide au mérite, mobilité, etc.)',
    shortDescription: 'Aides additionnelles pour les étudiant·es en réussite ou en mobilité.',
    category: 'Études',
    mainCriteriaDescription: 'Statut étudiant, mobilité géographique, résultats académiques ou bourse principale.',
    officialLinks: [
      { label: 'Aides complémentaires – etudiant.gouv', url: 'https://www.etudiant.gouv.fr/fr/aides-specifiques-aux-etudiants-1246' },
    ],
    notes: 'Les critères varient selon les académies. Contactez votre Crous.',
    eligibilityLogic: profile => {
      if (profile.isStudent !== 'oui') return 0;
      const distance = profile.studyDistance === 'autreVille';
      if (distance) return 70;
      return 40;
    },
  },
  {
    id: 'are',
    name: 'Allocation de retour à l’emploi (ARE)',
    shortDescription: 'Indemnisation pour les personnes ayant perdu un emploi et inscrites à France Travail.',
    category: 'Emploi',
    mainCriteriaDescription: 'Inscription à France Travail, fin de contrat de travail, recherche active.',
    officialLinks: [
      { label: 'ARE – Service-public.fr', url: 'https://www.service-public.fr/particuliers/vosdroits/F1449' },
    ],
    notes: 'Durée d’indemnisation et montant selon les droits acquis.',
    eligibilityLogic: profile => {
      if (profile.situationPro !== 'demandeur') return 0;
      if (profile.franceTravailInscrit === 'oui') return 80;
      return 40;
    },
  },
  {
    id: 'logement-etudiant',
    name: 'Aides spécifiques logement étudiant',
    shortDescription: 'Aides complémentaires pour les étudiant·es logés en résidence ou coloc.',
    category: 'Logement',
    mainCriteriaDescription: 'Logement étudiant, revenus modestes, distance avec la famille.',
    officialLinks: [
      { label: 'Guide logement étudiant', url: 'https://www.service-public.fr/particuliers/vosdroits/N20248' },
    ],
    notes: 'Inclut ALS, allocation ponctuelle, garanties de loyer (Visale, etc.).',
    eligibilityLogic: profile => {
      if (profile.logementType !== 'logementEtudiant') return 0;
      if (['0-700', '700-1200', '1200-1800'].includes(profile.revenusMensuels)) return 75;
      return 45;
    },
  },
  {
    id: 'complement-familial',
    name: 'Complément familial / soutien parental',
    shortDescription: 'Aides complémentaires pour les parents avec ressources modestes.',
    category: 'Famille',
    mainCriteriaDescription: 'Au moins 3 enfants ou parent isolé avec revenus limités.',
    officialLinks: [
      { label: 'Complément familial – CAF', url: 'https://www.caf.fr/allocataires/droits-et-prestations/s-informer-sur-les-prestations/complement-familial' },
    ],
    notes: 'Vérifier votre éligibilité auprès de la CAF ou d’un conseiller social.',
    eligibilityLogic: profile => {
      const familleNombreuse = profile.enfants === '3+';
      const parentIsole = profile.parentIsole === 'oui';
      const revenusFaibles = ['0-700', '700-1200', '1200-1800'].includes(profile.revenusMensuels);
      if (familleNombreuse && revenusFaibles) return 80;
      if (parentIsole && revenusFaibles) return 70;
      return 20;
    },
  },
];

// --- Gestion de l’état ---
let currentStepIndex = 0;
let wizardStarted = false;

const startBtn = document.getElementById('start-btn');
const wizardEl = document.getElementById('wizard');
const wizardContentEl = document.getElementById('wizard-content');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const progressEl = document.getElementById('progress');
const stepCounterEl = document.getElementById('step-counter');
const resultsSection = document.getElementById('results');
const exitWizardBtn = document.getElementById('exit-wizard');
const profileDetailsEl = document.getElementById('profile-details');
const profilePlaceholderEl = document.querySelector('.profile-placeholder');
const prefillMessageEl = document.getElementById('prefill-message');

const exampleCards = document.querySelectorAll('.example-card');

startBtn.addEventListener('click', () => {
  wizardStarted = true;
  toggleSections();
  renderCurrentStep();
});

exitWizardBtn.addEventListener('click', () => {
  wizardStarted = false;
  currentStepIndex = 0;
  toggleSections();
});

prevBtn.addEventListener('click', () => {
  if (currentStepIndex === 0) {
    wizardStarted = false;
    toggleSections();
    return;
  }
  currentStepIndex = Math.max(currentStepIndex - 1, 0);
  renderCurrentStep();
});

nextBtn.addEventListener('click', () => {
  const form = wizardContentEl.querySelector('form');
  if (!form) return;
  const valid = updateUserProfileFromForm(form);
  if (!valid) {
    form.classList.add('shake');
    setTimeout(() => form.classList.remove('shake'), 500);
    return;
  }
  if (currentStepIndex < steps.length - 1) {
    currentStepIndex += 1;
    renderCurrentStep();
  } else {
    renderResults(computeAideResults(userProfile));
  }
});

exampleCards.forEach(card => {
  card.addEventListener('click', () => {
    const preset = card.dataset.example;
    applyExampleProfile(preset);
    wizardStarted = true;
    currentStepIndex = 0;
    toggleSections();
    renderCurrentStep();
    prefillMessageEl.classList.remove('hidden');
  });
});

function applyExampleProfile(example) {
  const defaults = {
    etudiant: {
      age: '21-24',
      nationality: 'francaise',
      regionType: 'metropole',
      situationPro: 'etudiant',
      franceTravailInscrit: 'non-concerne',
      isStudent: 'oui',
      studyStatus: 'initial',
      studyDistance: 'autreVille',
      familySituation: 'celibataire',
      enfants: '0',
      parentIsole: 'non',
      handicap: 'non',
      logementType: 'logementEtudiant',
      loyer: '300-600',
      aideLogementExistante: 'non',
      revenusMensuels: '0-700',
      sourceRevenus: ['bourse', 'aucun'],
      repriseActivite: 'non',
      ressourcesDetail: 'etudesEtranger',
    },
    salarie: {
      age: '25-30',
      nationality: 'francaise',
      regionType: 'metropole',
      situationPro: 'salarie',
      franceTravailInscrit: 'non-concerne',
      isStudent: 'non',
      studyStatus: 'aucun',
      studyDistance: 'non-concerne',
      familySituation: 'celibataire',
      enfants: '0',
      parentIsole: 'non',
      handicap: 'non',
      logementType: 'locataire',
      loyer: '600-900',
      aideLogementExistante: 'non',
      revenusMensuels: '1200-1800',
      sourceRevenus: ['salaire'],
      repriseActivite: 'non',
      ressourcesDetail: 'transitionPro',
    },
    parent: {
      age: '31-40',
      nationality: 'francaise',
      regionType: 'metropole',
      situationPro: 'sansActivite',
      franceTravailInscrit: 'oui',
      isStudent: 'non',
      studyStatus: 'aucun',
      studyDistance: 'non-concerne',
      familySituation: 'parentIsole',
      enfants: '1',
      parentIsole: 'oui',
      handicap: 'non',
      logementType: 'locataire',
      loyer: '300-600',
      aideLogementExistante: 'non',
      revenusMensuels: '0-700',
      sourceRevenus: ['allocations'],
      repriseActivite: 'oui',
      ressourcesDetail: 'chargeLourde',
    },
  };
  Object.assign(userProfile, defaults[example]);
  updateProfileSummary();
}

function toggleSections() {
  document.querySelector('.intro').classList.toggle('hidden', wizardStarted);
  document.querySelector('.example-profiles').classList.toggle('hidden', wizardStarted);
  document.querySelector('.cta').classList.toggle('hidden', wizardStarted);
  wizardEl.classList.toggle('hidden', !wizardStarted);
  resultsSection.classList.add('hidden');
}

function renderCurrentStep() {
  const step = steps[currentStepIndex];
  const totalSteps = steps.length;
  const progressPercent = ((currentStepIndex + 0.5) / totalSteps) * 100;
  progressEl.style.width = `${progressPercent}%`;
  stepCounterEl.textContent = `Étape ${currentStepIndex + 1} sur ${totalSteps}`;

  const form = document.createElement('form');
  form.setAttribute('novalidate', '');

  const title = document.createElement('h2');
  title.className = 'step-title';
  title.textContent = step.title;
  form.appendChild(title);

  const desc = document.createElement('p');
  desc.className = 'step-description';
  desc.textContent = step.description;
  form.appendChild(desc);

  step.questions.forEach(question => {
    if (question.showIf && !question.showIf(userProfile)) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'question';

    const label = document.createElement('label');
    label.textContent = question.label;
    wrapper.appendChild(label);

    if (question.type === 'select') {
      const select = document.createElement('select');
      select.name = question.key;
      select.required = !!question.required;
      const placeholder = document.createElement('option');
      placeholder.value = '';
      placeholder.textContent = 'Sélectionnez une option';
      select.appendChild(placeholder);

      question.options.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option.value;
        opt.textContent = option.label;
        select.appendChild(opt);
      });

      if (userProfile[question.key]) {
        select.value = userProfile[question.key];
      }

      wrapper.appendChild(select);
    }

    if (question.type === 'checkbox-group') {
      const group = document.createElement('div');
      group.className = 'options-group';
      question.options.forEach(option => {
        const optionLabel = document.createElement('label');
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.name = `${question.key}[]`;
        input.value = option.value;
        if (Array.isArray(userProfile[question.key]) && userProfile[question.key].includes(option.value)) {
          input.checked = true;
        }
        optionLabel.appendChild(input);
        optionLabel.append(option.label);
        group.appendChild(optionLabel);
      });
      wrapper.appendChild(group);
    }

    form.appendChild(wrapper);
  });

  wizardContentEl.innerHTML = '';
  wizardContentEl.appendChild(form);
  prevBtn.textContent = currentStepIndex === 0 ? 'Quitter' : 'Précédent';
  nextBtn.textContent = currentStepIndex === steps.length - 1 ? 'Voir les résultats' : 'Suivant';
  updateProfileSummary();
}

function updateUserProfileFromForm(form) {
  let valid = true;

  steps[currentStepIndex].questions.forEach(question => {
    if (question.showIf && !question.showIf(userProfile)) return;

    if (question.type === 'select') {
      const select = form.querySelector(`select[name="${question.key}"]`);
      if (!select) return;
      if (question.required && !select.value) {
        select.classList.add('invalid');
        select.addEventListener('input', () => select.classList.remove('invalid'), { once: true });
        valid = false;
      }
      if (select.value) {
        userProfile[question.key] = select.value;
      }
    }

    if (question.type === 'checkbox-group') {
      const inputs = Array.from(form.querySelectorAll(`input[name="${question.key}[]"]`));
      const values = inputs.filter(input => input.checked).map(input => input.value);
      userProfile[question.key] = values;
    }
  });

  updateProfileSummary();
  return valid;
}

function computeAideResults(profile) {
  return aides
    .map(aide => {
      const score = aide.eligibilityLogic(profile);
      return { ...aide, score, pertinence: computePertinence(score) };
    })
    .filter(result => result.score > 0)
    .sort((a, b) => b.score - a.score);
}

function computePertinence(score) {
  if (score >= 70) return { label: 'Forte', className: 'badge-forte' };
  if (score >= 40) return { label: 'Moyenne', className: 'badge-moyenne' };
  return { label: 'Faible', className: 'badge-faible' };
}

function renderResults(results) {
  wizardStarted = false;
  toggleSections();
  resultsSection.innerHTML = '';
  resultsSection.classList.remove('hidden');

  const header = document.createElement('div');
  header.className = 'results-header';
  const title = document.createElement('h2');
  title.textContent = 'Vos résultats indicatifs';
  const intro = document.createElement('p');
  intro.textContent = 'Selon les informations fournies, voici les aides susceptibles de vous concerner. Les règles exactes dépendent de nombreux critères : vérifiez toujours auprès des organismes officiels.';
  header.append(title, intro);

  const profileRecap = document.createElement('div');
  profileRecap.className = 'profile-summary results-profile';
  const recapTitle = document.createElement('h3');
  recapTitle.textContent = 'Résumé de votre profil';
  const recapList = document.createElement('ul');
  recapList.className = 'profile-details';
  recapList.innerHTML = `
    <li><span>Âge :</span> <strong>${formatAge(userProfile.age)}</strong></li>
    <li><span>Situation professionnelle :</span> <strong>${formatSituationPro(userProfile.situationPro)}</strong></li>
    <li><span>Situation familiale :</span> <strong>${formatFamily(userProfile)}</strong></li>
    <li><span>Logement :</span> <strong>${formatLogement(userProfile)}</strong></li>
    <li><span>Ressources mensuelles :</span> <strong>${formatRevenus(userProfile.revenusMensuels)}</strong></li>
  `;
  profileRecap.append(recapTitle, recapList);

  const aidesContainer = document.createElement('div');
  aidesContainer.className = 'results-grid';

  if (results.length === 0) {
    const emptyState = document.createElement('div');
    emptyState.className = 'disclaimer';
    emptyState.textContent = 'Selon les informations indiquées, aucune aide évidente ne ressort. Cela ne signifie pas qu’il n’en existe pas : contactez la CAF, France Travail ou un conseiller social pour un accompagnement personnalisé.';
    aidesContainer.appendChild(emptyState);
  } else {
    results.forEach(result => {
      const card = document.createElement('article');
      card.className = 'aide-card';

      const title = document.createElement('h3');
      title.textContent = result.name;

      const badge = document.createElement('span');
      badge.className = `aide-badge ${result.pertinence.className}`;
      badge.textContent = `Pertinence estimée : ${result.pertinence.label}`;

      const description = document.createElement('p');
      description.textContent = result.shortDescription;

      const criteria = document.createElement('ul');
      criteria.className = 'criteria';
      criteria.innerHTML = `
        <li>${result.mainCriteriaDescription}</li>
        <li>${result.notes}</li>
      `;

      const linkList = document.createElement('div');
      linkList.className = 'results-actions';
      result.officialLinks.forEach(link => {
        const anchor = document.createElement('a');
        anchor.href = link.url;
        anchor.target = '_blank';
        anchor.rel = 'noopener noreferrer';
        anchor.className = 'ghost-btn';
        anchor.textContent = link.label;
        linkList.appendChild(anchor);
      });

      card.append(title, badge, description, criteria, linkList);
      aidesContainer.appendChild(card);
    });
  }

  const disclaimer = document.createElement('p');
  disclaimer.className = 'disclaimer';
  disclaimer.textContent = 'Ces résultats sont indicatifs et ne remplacent pas une simulation officielle. Pour connaître vos droits exacts, consultez les sites de la CAF, de service-public.fr ou rapprochez-vous d’un conseiller social.';

  const actions = document.createElement('div');
  actions.className = 'results-actions';
  const restartBtn = document.createElement('button');
  restartBtn.className = 'primary-btn';
  restartBtn.textContent = 'Recommencer une simulation';
  restartBtn.addEventListener('click', () => {
    resetSimulation();
    wizardStarted = true;
    toggleSections();
    renderCurrentStep();
  });

  const editBtn = document.createElement('button');
  editBtn.className = 'secondary-btn';
  editBtn.textContent = 'Modifier les réponses';
  editBtn.addEventListener('click', () => {
    wizardStarted = true;
    toggleSections();
    renderCurrentStep();
  });

  actions.append(restartBtn, editBtn);

  resultsSection.append(header, profileRecap, aidesContainer, disclaimer, actions);
}

function updateProfileSummary() {
  const hasData = Boolean(userProfile.age || userProfile.situationPro || userProfile.logementType || userProfile.revenusMensuels);
  if (hasData) {
    profilePlaceholderEl.classList.add('hidden');
    profileDetailsEl.classList.remove('hidden');
  }

  profileDetailsEl.querySelector('[data-summary="age"]').textContent = formatAge(userProfile.age);
  profileDetailsEl.querySelector('[data-summary="situationPro"]').textContent = formatSituationPro(userProfile.situationPro);
  profileDetailsEl.querySelector('[data-summary="family"]').textContent = formatFamily(userProfile);
  profileDetailsEl.querySelector('[data-summary="logement"]').textContent = formatLogement(userProfile);
  profileDetailsEl.querySelector('[data-summary="revenus"]').textContent = formatRevenus(userProfile.revenusMensuels);
}

function formatAge(value) {
  if (!value) return 'À préciser';
  const mapping = {
    '18-20': '18 à 20 ans',
    '21-24': '21 à 24 ans',
    '25-30': '25 à 30 ans',
    '31-40': '31 à 40 ans',
    '41-55': '41 à 55 ans',
    '56+': '56 ans et plus',
  };
  return mapping[value] || 'À préciser';
}

function formatSituationPro(value) {
  const mapping = {
    etudiant: 'Étudiant·e / Lycéen·ne',
    salarie: 'Salarié·e',
    independant: 'Indépendant·e / Auto-entrepreneur·se',
    demandeur: 'Demandeur·se d’emploi',
    sansActivite: 'Sans activité déclarée',
  };
  return mapping[value] || 'À préciser';
}

function formatFamily(profile) {
  const mapping = {
    celibataire: 'Célibataire',
    couple: 'En couple',
    marie: 'Marié·e / pacsé·e',
    parentIsole: 'Parent isolé·e',
  };
  const enfantsMapping = {
    '0': 'aucun enfant',
    '1': '1 enfant',
    '2': '2 enfants',
    '3+': '3 enfants ou plus',
  };
  const base = mapping[profile.familySituation] || 'À préciser';
  const enfants = profile.enfants ? `, ${enfantsMapping[profile.enfants] || 'enfants à préciser'}` : '';
  return `${base}${enfants}`;
}

function formatLogement(profile) {
  const mapping = {
    locataire: 'Locataire',
    logementEtudiant: 'Logement étudiant',
    heberge: 'Hébergé·e à titre gratuit',
    proprietaire: 'Propriétaire',
    foyer: 'Foyer / résidence sociale',
  };
  return mapping[profile.logementType] || 'À préciser';
}

function formatRevenus(value) {
  const mapping = {
    '0-700': 'Moins de 700 €',
    '700-1200': 'Entre 700 € et 1 200 €',
    '1200-1800': 'Entre 1 200 € et 1 800 €',
    '1800-2500': 'Entre 1 800 € et 2 500 €',
    '2500+': 'Plus de 2 500 €',
  };
  return mapping[value] || 'À préciser';
}

function resetSimulation() {
  Object.keys(userProfile).forEach(key => {
    if (Array.isArray(userProfile[key])) {
      userProfile[key] = [];
    } else {
      userProfile[key] = null;
    }
  });
  userProfile.enfants = '0';
  userProfile.parentIsole = 'non';
  userProfile.handicap = 'non';
  profilePlaceholderEl.classList.remove('hidden');
  profileDetailsEl.classList.add('hidden');
  prefillMessageEl.classList.add('hidden');
  currentStepIndex = 0;
}

// Initialisation
updateProfileSummary();

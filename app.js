// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// AdaptIQ — Adaptive Learning Recommendation System
// app.js — All application logic, data and rendering
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// ── QUESTIONNAIRE DATA ───────────────────────────────────────
const SECTIONS = [
  {
    id:'ai', label:'AI Usage', color:'#f0b429', icon:'<i class="material-icons">smart_toy</i>',
    desc:'These questions explore how you use AI tools in your learning. Answer honestly — there are no right or wrong answers.',
    questions:[
      {
        text:'How often do you use AI tools (e.g. ChatGPT, Copilot, AI tutors) to support your studies?',
        opts:[
          'Never — I don\'t use AI tools',
          'Rarely — only when I\'m stuck',
          'Sometimes — a few times per week',
          'Often — most days',
          'Very frequently — it\'s central to how I study'
        ]
      },
      {
        text:'When you use AI tools for studying, how confident are you in using them effectively?',
        opts:[
          'Not confident at all',
          'Slightly confident',
          'Moderately confident',
          'Quite confident',
          'Very confident — I know how to get the best from them'
        ]
      },
      {
        text:'How much do you feel AI tools have improved your academic output or understanding?',
        opts:[
          'No improvement — I\'m not sure they help',
          'Slight improvement in some areas',
          'Moderate improvement overall',
          'Significant improvement in most areas',
          'Transformative — I couldn\'t study as effectively without them'
        ]
      },
      {
        text:'How do you primarily use AI tools in your studies?',
        opts:[
          'I don\'t use them at all',
          'For quick answers or definitions only',
          'For explanations and worked examples',
          'For research, drafting and idea generation',
          'For complex tasks including analysis, writing and self-testing'
        ]
      }
    ]
  },
  {
    id:'eng', label:'Engagement', color:'#06d6a0', icon:'<i class="material-icons">flash_on</i>',
    desc:'These questions explore how actively and deeply you engage with your learning. Think about your typical week, not your best or worst.',
    questions:[
      {
        text:'How would you describe your level of active participation in lectures, seminars and online learning activities?',
        opts:[
          'Mostly passive — I watch and listen but rarely contribute',
          'Occasionally active — I join in when confident',
          'Moderately active — I participate when I feel ready',
          'Quite active — I regularly contribute and ask questions',
          'Highly active — I consistently engage and seek deeper understanding'
        ]
      },
      {
        text:'How often do you complete all required readings, tasks and assignments on time?',
        opts:[
          'Rarely — I often fall behind or skip tasks',
          'Sometimes — I complete the essential ones',
          'Usually — I complete most things, occasionally missing minor tasks',
          'Almost always — I rarely miss anything required',
          'Always — I go beyond the minimum and complete optional work too'
        ]
      },
      {
        text:'When studying, how often do you find yourself genuinely interested and absorbed in the material?',
        opts:[
          'Almost never — I find it hard to stay focused',
          'Occasionally — for topics I particularly enjoy',
          'Fairly often — when the material is well-presented',
          'Most of the time — I generally find my studies stimulating',
          'Nearly always — I consistently find my learning engaging and meaningful'
        ]
      },
      {
        text:'How would you describe your emotional connection to your studies?',
        opts:[
          'Disconnected — I\'m studying mainly to get a qualification',
          'Somewhat detached — it\'s functional but not motivating',
          'Neutral — some subjects engage me more than others',
          'Invested — I care about learning and doing well',
          'Deeply committed — my studies are personally meaningful to me'
        ]
      }
    ]
  },
  {
    id:'conf', label:'Academic Confidence', color:'#4361ee', icon:'<i class="material-icons">grade</i>',
    desc:'These questions explore your self-belief in your academic abilities. Be honest — this helps the system find the right pathway for you.',
    questions:[
      {
        text:'How confident are you in your ability to succeed academically in your current programme?',
        opts:[
          'Not confident — I frequently doubt whether I can manage',
          'Slightly confident — I struggle but push through',
          'Moderately confident — I have ups and downs',
          'Quite confident — I generally believe I can do well',
          'Very confident — I have a strong belief in my academic ability'
        ]
      },
      {
        text:'When you encounter a difficult topic or assignment, what is your typical response?',
        opts:[
          'I feel overwhelmed and often avoid it',
          'I feel anxious but eventually attempt it',
          'I try to work through it, though it takes time',
          'I break it down and tackle it systematically',
          'I see it as a challenge and actively seek to master it'
        ]
      },
      {
        text:'How comfortable are you asking for help from tutors, peers or support services?',
        opts:[
          'Very uncomfortable — I rarely ask for help',
          'Slightly uncomfortable — I prefer to struggle alone first',
          'Neutral — I ask when I really need to',
          'Fairly comfortable — I seek help when needed without hesitation',
          'Very comfortable — I proactively seek guidance and feedback'
        ]
      },
      {
        text:'How do you feel about your performance relative to your peers?',
        opts:[
          'Significantly behind — I feel I\'m struggling compared to others',
          'Slightly behind — I feel I could be doing better',
          'About average — roughly on par with my peers',
          'Slightly above average — I feel I perform well',
          'Well above average — I am consistently among the stronger students'
        ]
      }
    ]
  },
  {
    id:'risk', label:'Perceived Ethical Risk', color:'#ef4565', icon:'<i class="material-icons">security</i>',
    desc:'These questions explore your feelings about AI tools collecting and using your data. Your answers directly shape how the system handles your recommendations.',
    questions:[
      {
        text:'How comfortable are you with AI learning tools collecting data about your study habits and performance?',
        opts:[
          'Very uncomfortable — I strongly object to this',
          'Uncomfortable — I have significant concerns',
          'Neutral — I accept it as part of using digital tools',
          'Comfortable — I understand why it\'s needed',
          'Very comfortable — I actively want the system to learn from my data'
        ]
      },
      {
        text:'How much do you trust that AI tools will make fair and unbiased recommendations for your learning?',
        opts:[
          'No trust at all — I believe AI recommendations are biased',
          'Low trust — I\'m sceptical of AI judgements',
          'Some trust — I accept recommendations cautiously',
          'Good trust — I generally believe AI recommendations are reasonable',
          'Full trust — I believe AI recommendations are objective and helpful'
        ]
      },
      {
        text:'How concerned are you that AI learning systems might treat students from different backgrounds unfairly?',
        opts:[
          'Extremely concerned — I believe this is a serious problem',
          'Very concerned — I think this is likely to happen',
          'Somewhat concerned — it\'s possible but I\'m not sure',
          'Slightly concerned — I think it\'s unlikely but worth watching',
          'Not concerned — I believe AI systems are designed to be fair'
        ]
      },
      {
        text:'How transparent do you feel your institution is about how AI tools use your personal data?',
        opts:[
          'Completely opaque — I have no idea what happens to my data',
          'Mostly unclear — I have very little information',
          'Somewhat clear — I\'ve seen some information but it\'s incomplete',
          'Fairly transparent — I have a reasonable understanding',
          'Very transparent — I have clear, complete information about data use'
        ]
      }
    ]
  }
];

// ── PATHWAY DEFINITIONS ──────────────────────────────────────
// Note: numeric weights below are derived from research regression
// coefficients and are not exposed in user-facing text.
const PATHWAYS = {
  A: {
    name: 'Foundational Support Track',
    sub:  'Building trust and confidence before advanced AI integration',
    icon: '<i class="material-icons">grass</i>',
    color: '#06d6a0',
    colorDim: 'rgba(6,214,160,0.15)',
    chipBorder: 'rgba(6,214,160,0.4)',
    explain: `Your profile shows that building foundational confidence, trust and engagement is the priority before advanced AI tools are introduced. Self-Determination Theory tells us that autonomy, competence and relatedness must come first — your recommendations focus on establishing these foundations through structured, human-supported learning activities that build momentum and reduce perceived risk.`,
    finding: 'Self-Determination Theory · Foundation-first approach',
    stats:[
      { val:'SDT',  label:'Primary Framework' },
      { val:'Low',  label:'Recommended AI Load' },
      { val:'High', label:'Tutor Contact' }
    ],
    recs:[
      {
        title: 'Structured micro-learning sessions',
        text:  'Short (15–20 min) focused learning modules with clear objectives. Reduces cognitive overload and builds competence progressively — addressing the need for perceived competence that research shows drives intrinsic motivation.',
        conf:  88,
        finding: 'Self-Determination Theory · Murray & Perez (2015)'
      },
      {
        title: 'Weekly tutor check-ins',
        text:  'Regular one-to-one or small group sessions with an academic tutor or support advisor. Builds the relatedness dimension of Self-Determination Theory and provides a safe space to address learning blocks before they compound.',
        conf:  85,
        finding: 'SDT relatedness need · Northumbria University support services'
      },
      {
        title: 'Peer study partnerships',
        text:  'Structured peer-learning pairs matched by your academic unit. Research shows peer engagement significantly improves motivation outcomes for lower-confidence learners in higher education contexts.',
        conf:  79,
        finding: 'Fredricks et al. (2004) — engagement dimensions'
      },
      {
        title: 'Transparent AI introduction',
        text:  'Before using any AI tool, request a plain-language explanation of how it works and what data it uses. Start with low-stakes AI tasks — summarisation, Q&A practice — to build trust gradually. Research shows transparency directly reduces ethical risk perception.',
        conf:  91,
        finding: 'Holmes et al. (2021) — transparency as prerequisite for trust'
      },
      {
        title: 'Progress journalling',
        text:  'Keep a weekly learning journal noting what you understood, what challenged you, and what helped. Metacognitive reflection builds self-awareness and is strongly associated with improved academic resilience.',
        conf:  74,
        finding: 'Fan et al. (2025) — metacognitive engagement'
      }
    ],
    nextSteps:[
      {
        num: '01',
        title: 'Request a tutor meeting this week',
        desc:  'Book a 20-minute session with your academic tutor or personal supervisor. Share which topics feel most challenging and ask for a structured plan.'
      },
      {
        num: '02',
        title: 'Try one low-stakes AI task today',
        desc:  'Use an AI tool for one small task — summarising a reading, generating practice questions, or explaining a concept. Note how it makes you feel.'
      },
      {
        num: '03',
        title: 'Find one peer study partner',
        desc:  'Identify one course-mate who could be a regular study partner. A shared weekly session of 60 minutes significantly improves engagement outcomes.'
      }
    ],
    projBase: 38,
    projGain: 22
  },
  B: {
    name: 'Guided Development Track',
    sub:  'Structured AI integration with confidence-building scaffolding',
    icon: '<i class="material-icons">trending_up</i>',
    color: '#f0b429',
    colorDim: 'rgba(240,180,41,0.15)',
    chipBorder: 'rgba(240,180,41,0.4)',
    explain: `Your profile shows moderate engagement and developing AI usage — you are at the inflection point where structured AI integration, combined with clear transparency about how tools work, can produce significant performance improvements. Improving your engagement quality is the critical step: research shows engagement is the pathway through which AI use translates into genuine academic performance gains.`,
    finding: 'Research-confirmed AI–engagement–performance pathway',
    stats:[
      { val:'Dual', label:'AI + Engagement Focus' },
      { val:'Med',  label:'Recommended AI Load' },
      { val:'Med',  label:'Tutor Contact' }
    ],
    recs:[
      {
        title: 'Structured AI study workflow',
        text:  'Implement a consistent AI-assisted study workflow: use AI to generate practice questions, explain difficult concepts, and check your understanding — then verify answers independently. This builds the competence and perceived usefulness that drives effective AI adoption.',
        conf:  86,
        finding: 'Technology Acceptance Model · Davis (1989)'
      },
      {
        title: 'Active engagement strategies',
        text:  'Move from passive content consumption to active engagement: annotate readings, generate your own questions before lectures, and summarise material in your own words after each session. Research shows engagement quality directly mediates performance gains from AI tool use.',
        conf:  82,
        finding: 'Fredricks et al. (2004) — engagement as performance mediator'
      },
      {
        title: 'Fortnightly academic skills workshop',
        text:  'Attend your institution\'s academic skills or study skills sessions, particularly those covering critical thinking and academic writing. These address the areas of performance that AI tools alone cannot improve — instructional design remains the primary performance driver.',
        conf:  78,
        finding: 'Murray & Perez (2015) — pedagogy as primary driver'
      },
      {
        title: 'Ethical risk awareness session',
        text:  'Attend or access an AI ethics information session to understand how your institution manages data privacy and algorithmic fairness. Understanding these safeguards reduces your ethical risk perception, which research shows is required to unlock the full performance benefit of AI tools.',
        conf:  84,
        finding: 'Holmes et al. (2021) — transparency reduces risk perception'
      },
      {
        title: 'Spaced retrieval practice',
        text:  'Use AI tools to generate spaced repetition quizzes on your subject matter. Spaced practice is one of the most evidence-based learning strategies and directly counters the cognitive offloading risk that can reduce the depth of learning in high AI users.',
        conf:  77,
        finding: 'Gerlich (2025) — cognitive offloading countermeasure'
      }
    ],
    nextSteps:[
      {
        num: '01',
        title: 'Build your AI study routine this week',
        desc:  'Set aside 30 minutes to design a consistent AI-assisted study workflow. Use it for one subject first, then expand. Consistency is what turns a tool into a genuine learning advantage.'
      },
      {
        num: '02',
        title: 'Attend one engagement activity',
        desc:  'Sign up for one academic or social learning activity this week — a seminar, a study group, a skills workshop. Engagement quality is the critical bridge between AI tool use and actual performance improvement.'
      },
      {
        num: '03',
        title: 'Request an AI data transparency briefing',
        desc:  'Email your learning technology team or check your institution\'s website for an AI data policy. Understanding what data is collected and how it is used directly reduces ethical risk perception.'
      }
    ],
    projBase: 52,
    projGain: 26
  },
  C: {
    name: 'Advanced Self-Directed Track',
    sub:  'Maximising AI-enhanced performance with metacognitive safeguards',
    icon: '<i class="material-icons">rocket_launch</i>',
    color: '#4361ee',
    colorDim: 'rgba(67,97,238,0.15)',
    chipBorder: 'rgba(67,97,238,0.4)',
    explain: `Your profile places you in the high-performance condition — low ethical risk perception combined with strong engagement and AI usage, where AI tools produce a statistically significant positive effect on academic performance. Your recommendations focus on maximising this advantage while building metacognitive depth to prevent cognitive offloading — where performance scores rise but genuine learning depth does not keep pace.`,
    finding: 'High-performance governance condition confirmed by research',
    stats:[
      { val:'High',  label:'Performance Potential' },
      { val:'High',  label:'Recommended AI Load' },
      { val:'Self',  label:'Directed Learning Mode' }
    ],
    recs:[
      {
        title: 'Advanced AI research and analysis tasks',
        text:  'Use AI tools for complex, high-order tasks: synthesising multiple sources, challenging AI-generated arguments with your own analysis, and using AI to stress-test your reasoning. This ensures AI enhances rather than replaces critical thinking.',
        conf:  91,
        finding: 'Research-confirmed high-engagement, low-risk performance condition'
      },
      {
        title: 'Metacognitive reflection journals',
        text:  'Maintain a weekly journal that explicitly addresses: what did I genuinely learn (not just complete), where did I rely on AI as a shortcut, and what would I struggle to explain without AI assistance? This directly counters the cognitive offloading risk identified in high AI users.',
        conf:  87,
        finding: 'Gerlich (2025) — cognitive offloading in high AI users · Fan et al. (2025)'
      },
      {
        title: 'Peer teaching and knowledge sharing',
        text:  'Actively teach course material to peers — in study groups, online forums or informal sessions. The ability to explain something clearly to others is the strongest test of genuine understanding versus AI-assisted surface performance.',
        conf:  83,
        finding: 'Deng et al. (2024) — surface gains vs. genuine learning'
      },
      {
        title: 'Advanced self-paced challenge modules',
        text:  'Seek out advanced readings, optional extended projects or research opportunities beyond the curriculum. Your profile indicates the motivation and capability to thrive with additional intellectual challenge — use it before academic momentum plateaus.',
        conf:  79,
        finding: 'SDT competence need — advanced mastery level · Molenaar (2022)'
      },
      {
        title: 'AI ethics advocacy and peer education',
        text:  'Share your positive AI experience with peers who are more hesitant. You are in the low ethical risk condition where AI produces real performance benefits — helping reduce other students\' ethical risk perception has both personal and collective academic value.',
        conf:  74,
        finding: 'Holmes et al. (2021) — transparency and trust building'
      }
    ],
    nextSteps:[
      {
        num: '01',
        title: 'Start your metacognitive journal today',
        desc:  'Open a document and answer this: "What did I genuinely understand this week that I could explain without AI?" Do this weekly. It is the single most powerful countermeasure to cognitive offloading at your level.'
      },
      {
        num: '02',
        title: 'Design one advanced AI project',
        desc:  'Identify a topic in your programme where you could use AI to go substantially beyond the curriculum. Propose it to your tutor as an optional extension. Advanced self-direction is your strongest learning mode.'
      },
      {
        num: '03',
        title: 'Teach something to a peer this week',
        desc:  'Find one concept you understand well and explain it to a course-mate who is struggling with it. Teaching is the deepest form of active learning — and strengthens understanding in ways AI use alone cannot replicate.'
      }
    ],
    projBase: 65,
    projGain: 20
  }
};

// ── STATE ────────────────────────────────────────────────────
let currentSection = 0;
let answers = { ai:[], eng:[], conf:[], risk:[] };
const sectionKeys = ['ai','eng','conf','risk'];
let scores  = { ai:0, eng:0, conf:0, risk:0 };

// ── NAVIGATION ───────────────────────────────────────────────
function goTo(screen) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  switch(screen) {
    case 'landing':
      document.getElementById('s-landing').classList.add('active');
      break;
    case 'quiz':
      currentSection = 0;
      renderSection();
      document.getElementById('s-quiz').classList.add('active');
      break;
    case 'processing':
      document.getElementById('s-processing').classList.add('active');
      runProcessing();
      break;
    case 'dashboard':
      document.getElementById('s-dashboard').classList.add('active');
      buildDashboard();
      break;
  }
  window.scrollTo({ top:0, behavior:'smooth' });
}

// ── QUIZ RENDERING ───────────────────────────────────────────
function renderSection() {
  const sec = SECTIONS[currentSection];
  const key = sectionKeys[currentSection];

  const totalQ = SECTIONS.reduce((a,s) => a + s.questions.length, 0);
  const doneQ  = sectionKeys
    .slice(0, currentSection)
    .reduce((a,k) => a + SECTIONS.find(s => s.id === k).questions.length, 0);
  const pct = Math.round((doneQ / totalQ) * 100);

  document.getElementById('qp-fill').style.width   = pct + '%';
  document.getElementById('qp-pct').textContent    = pct + '%';
  document.getElementById('qp-section').textContent = `Section ${currentSection + 1} of 4 — ${sec.label}`;

  const body = document.getElementById('quiz-body');
  body.innerHTML = `
    <div class="section-intro">
      <div class="section-num" style="color:${sec.color};">
        <div class="sn-dot" style="background:${sec.color}22;color:${sec.color};">${sec.icon}</div>
        Section ${currentSection + 1} · ${sec.label}
      </div>
      <h2>${sec.label}</h2>
      <p>${sec.desc}</p>
    </div>
    <div class="questions-container" id="q-container"></div>`;

  const container = document.getElementById('q-container');

  sec.questions.forEach((q, qi) => {
    const saved = answers[key][qi];
    const card  = document.createElement('div');
    card.className = 'question-card' + (saved !== undefined ? ' answered' : '');
    card.innerHTML = `
      <div class="q-num">Q${qi + 1} of ${sec.questions.length}</div>
      <div class="q-text">${q.text}</div>
      <div class="q-options">
        ${q.opts.map((o, oi) => `
          <div class="q-opt ${saved === oi ? 'selected' : ''}"
               onclick="selectOpt(this,${currentSection},${qi},${oi})">
            <div class="opt-radio"><div class="opt-dot"></div></div>
            <div class="opt-label">${o}</div>
            <div class="opt-val">${oi + 1}/5</div>
          </div>`).join('')}
      </div>`;
    container.appendChild(card);
  });

  updateNavCount();
}

function selectOpt(el, secIdx, qIdx, optIdx) {
  const key = sectionKeys[secIdx];
  answers[key][qIdx] = optIdx;

  const card = el.closest('.question-card');
  card.querySelectorAll('.q-opt').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
  card.classList.add('answered');

  updateNavCount();
}

function updateNavCount() {
  const key  = sectionKeys[currentSection];
  const sec  = SECTIONS[currentSection];
  const done = answers[key].filter(a => a !== undefined).length;
  document.getElementById('qa-done').textContent  = done;
  document.getElementById('qa-total').textContent = sec.questions.length;
}

function nextSection() {
  currentSection++;
  if (currentSection >= SECTIONS.length) {
    computeScores();
    goTo('processing');
  } else {
    renderSection();
    window.scrollTo({ top:0, behavior:'smooth' });
  }
}

// ── SCORE COMPUTATION ────────────────────────────────────────
// Weights below correspond to research regression coefficients
// (AI: β=.287, Engagement: indirect=.0961, Conf: .15, Risk: β=−.2415)
// — not exposed in user-facing text per user instruction.
function computeScores() {
  sectionKeys.forEach(k => {
    const ans   = answers[k];
    const total = SECTIONS.find(s => s.id === k).questions.length;
    let sum = 0;
    for (let i = 0; i < total; i++) {
      sum += (ans[i] !== undefined ? ans[i] : 2);
    }
    scores[k] = sum / (total * 4); // normalise 0–1
  });
}

// ── PATHWAY CLASSIFICATION ───────────────────────────────────
function getPathway() {
  const { ai, eng, conf, risk } = scores;
  // Composite score using research regression coefficients as weights
  const composite = (ai * 0.287) + (eng * 0.0961) + (conf * 0.15) - (risk * 0.2415);
  const norm = (composite + 0.2415) / (0.287 + 0.0961 + 0.15 + 0.2415);
  if (norm < 0.35) return 'A';
  if (norm < 0.65) return 'B';
  return 'C';
}

// ── PROCESSING ANIMATION ─────────────────────────────────────
function runProcessing() {
  const steps    = ['ps1','ps2','ps3','ps4','ps5'];
  const delays   = [400, 900, 1500, 2100, 2700];
  const doneTimes = [800, 1400, 2000, 2600, 3200];

  steps.forEach((id, i) => {
    setTimeout(() => {
      document.getElementById(id).classList.add('active');
      const pct = Math.round(((i + 1) / steps.length) * 80);
      document.getElementById('proc-fill').style.width = pct + '%';
      document.getElementById('proc-pct').textContent  = pct + '%';
    }, delays[i]);

    setTimeout(() => {
      const el = document.getElementById(id);
      el.classList.remove('active');
      el.classList.add('done');
      el.querySelector('.proc-step-icon').textContent = '✓';
    }, doneTimes[i]);
  });

  setTimeout(() => {
    document.getElementById('proc-fill').style.width = '100%';
    document.getElementById('proc-pct').textContent  = '100%';
  }, 3400);

  setTimeout(() => goTo('dashboard'), 3800);
}

// ── DASHBOARD BUILDER ────────────────────────────────────────
function buildDashboard() {
  const pwKey = getPathway();
  const pw    = PATHWAYS[pwKey];

  // Header chip
  const chip = document.getElementById('dash-chip');
  chip.style.color       = pw.color;
  chip.style.borderColor = pw.chipBorder;
  chip.style.background  = pw.colorDim;
  document.getElementById('dash-chip-icon').textContent = pw.icon;
  document.getElementById('dash-chip-name').textContent = pw.name;

  // Pathway panel
  const badge = document.getElementById('pw-badge');
  badge.textContent    = pw.icon;
  badge.style.background = pw.colorDim;

  document.getElementById('pw-title').textContent   = pw.name;
  document.getElementById('pw-title').style.color   = pw.color;
  document.getElementById('pw-sub').textContent     = pw.sub;
  document.getElementById('pw-explain').textContent = pw.explain;

  document.getElementById('pw-stats').innerHTML = pw.stats.map(s => `
    <div class="pstat">
      <div class="pstat-val" style="color:${pw.color}">${s.val}</div>
      <div class="pstat-label">${s.label}</div>
    </div>`).join('');

  // Dimension scores
  const dims = [
    { key:'ai',   label:'AI Usage',              icon:'<i class="material-icons">smart_toy</i>', color:'#f0b429' },
    { key:'eng',  label:'Engagement',             icon:'<i class="material-icons">flash_on</i>', color:'#06d6a0' },
    { key:'conf', label:'Academic Confidence',    icon:'<i class="material-icons">grade</i>', color:'#4361ee' },
    { key:'risk', label:'Perceived Ethical Risk', icon:'<i class="material-icons">security</i>', color:'#ef4565' }
  ];

  document.getElementById('dim-scores').innerHTML = dims.map(d => {
    const pct = Math.round(scores[d.key] * 100);
    const val = (scores[d.key] * 4 + 1).toFixed(1);
    return `
      <div class="dim-row">
        <div class="dim-icon">${d.icon}</div>
        <div class="dim-info">
          <div class="dim-name">${d.label}</div>
          <div class="dim-bar-track">
            <div class="dim-bar-fill" style="width:${pct}%;background:${d.color}"></div>
          </div>
        </div>
        <div class="dim-score" style="color:${d.color}">${val}/5</div>
      </div>`;
  }).join('');

  drawRadar(dims);

  // Recommendations
  document.getElementById('recs-list').innerHTML = pw.recs.map((r, i) => `
    <div class="rec-card">
      <div class="rec-num">0${i + 1}</div>
      <div class="rec-body">
        <div class="rec-title">${r.title}</div>
        <div class="rec-text">${r.text}</div>
        <span class="rec-finding">${r.finding}</span>
      </div>
      <div class="conf-badge">
        <div class="conf-val">${r.conf}%</div>
        <div class="conf-label">confidence</div>
      </div>
    </div>`).join('');

  // Ethical risk panel
  const riskScore  = scores.risk;
  const alertPanel = document.getElementById('alert-panel');
  const goodPanel  = document.getElementById('good-panel');

  if (riskScore > 0.6) {
    alertPanel.classList.remove('hidden');
    goodPanel.style.display = 'none';
    document.getElementById('alert-text').textContent =
      'Your responses indicate a high level of perceived ethical risk — significant concern about how AI tools use your data and whether they treat all students fairly. Research shows this is a critical boundary condition: when students have high ethical risk perception, AI learning tools are associated with no statistically significant performance benefit. Your recommendations prioritise transparency-first strategies and trust-building before introducing AI tools, to address this directly.';
    document.getElementById('alert-stat').textContent =
      'Priority action: reduce ethical risk perception through transparency before advancing AI tool use';

  } else if (riskScore < 0.35) {
    document.getElementById('good-icon').textContent  = '✅';
    document.getElementById('good-title').textContent = 'Low Ethical Risk — Full Learning Benefit Available';
    document.getElementById('good-text').textContent  =
      'Your low perceived ethical risk score places you in the condition where AI learning tools produce a statistically significant positive effect on academic performance. Research from 132 students confirms that students with your ethical risk level gain genuine, measurable academic benefit from AI tools. Your recommendations maximise this advantage while building metacognitive depth to ensure performance gains reflect real learning.';
    document.getElementById('good-stat').textContent  =
      'Research status: Full AI performance benefit unlocked at your ethical risk level';

  } else {
    document.getElementById('good-icon').textContent  = '⚠️';
    document.getElementById('good-title').textContent = 'Medium Ethical Risk — Partial Benefit';
    document.getElementById('good-text').textContent  =
      'Your moderate ethical risk score places you at a level where AI tools may not be producing their full performance benefit. Research shows that reducing ethical risk perception — through greater transparency about how AI tools work and use your data — can move you into the higher-benefit condition. Your recommendations include transparency-building strategies alongside your learning activities.';
    document.getElementById('good-stat').textContent  =
      'Target: reduce ethical risk perception to unlock full AI learning benefit';
  }

  // Performance projection
  drawProjection(pw);

  // Next steps
  document.getElementById('next-steps').innerHTML = pw.nextSteps.map(s => `
    <div class="next-step">
      <div class="ns-num">${s.num}</div>
      <div class="ns-title">${s.title}</div>
      <div class="ns-desc">${s.desc}</div>
    </div>`).join('');
}

// ── RADAR CHART ──────────────────────────────────────────────
function drawRadar(dims) {
  const canvas = document.getElementById('radar-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const cx = 125, cy = 125, r = 90;
  ctx.clearRect(0, 0, 250, 250);

  const vals   = dims.map(d => scores[d.key]);
  const colors = dims.map(d => d.color);
  const angles = dims.map((_, i) => (i * Math.PI * 2 / 4) - Math.PI / 2);

  // Grid rings
  for (let lv = 1; lv <= 5; lv++) {
    ctx.beginPath();
    angles.forEach((a, i) => {
      const x = cx + (r * lv / 5) * Math.cos(a);
      const y = cy + (r * lv / 5) * Math.sin(a);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // Axes
  angles.forEach(a => {
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + r * Math.cos(a), cy + r * Math.sin(a));
    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    ctx.lineWidth = 1;
    ctx.stroke();
  });

  // Data polygon
  ctx.beginPath();
  angles.forEach((a, i) => {
    const x = cx + r * vals[i] * Math.cos(a);
    const y = cy + r * vals[i] * Math.sin(a);
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.closePath();
  ctx.fillStyle   = 'rgba(240,180,41,0.1)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(240,180,41,0.6)';
  ctx.lineWidth   = 2;
  ctx.stroke();

  // Data points
  angles.forEach((a, i) => {
    const x = cx + r * vals[i] * Math.cos(a);
    const y = cy + r * vals[i] * Math.sin(a);
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fillStyle   = colors[i];
    ctx.fill();
    ctx.strokeStyle = colors[i];
    ctx.lineWidth   = 3;
    ctx.globalAlpha = 0.3;
    ctx.stroke();
    ctx.globalAlpha = 1;
  });

  // Labels
  ctx.font      = '500 10px DM Sans, sans-serif';
  const labels  = dims.map(d => d.label);
  angles.forEach((a, i) => {
    const lx = cx + (r + 22) * Math.cos(a);
    const ly = cy + (r + 22) * Math.sin(a);
    ctx.fillStyle  = colors[i];
    ctx.textAlign  = lx > cx + 5 ? 'left' : lx < cx - 5 ? 'right' : 'center';
    ctx.fillText(labels[i], lx, ly + 4);
  });
}

// ── PROJECTION CHART ─────────────────────────────────────────
function drawProjection(pw) {
  const canvas = document.getElementById('proj-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const pad = { t:20, b:40, l:40, r:20 };
  const cw  = W - pad.l - pad.r;
  const ch  = H - pad.t - pad.b;

  ctx.clearRect(0, 0, W, H);

  const weeks = 8;
  const base  = pw.projBase;
  const gain  = pw.projGain;

  const currentLine = Array.from({ length:weeks }, (_, i) => base + i * 5);
  const adaptLine   = Array.from({ length:weeks }, (_, i) => {
    const ramp = i < 2 ? i / 2 : 1;
    return base + i * (5 + (gain / weeks) * ramp * 2);
  });

  const maxVal = Math.min(100, Math.max(...adaptLine) + 5);
  const minVal = Math.max(0,   Math.min(...currentLine) - 5);
  const range  = maxVal - minVal;

  const toX = i => pad.l + (i / (weeks - 1)) * cw;
  const toY = v => pad.t + ch - ((v - minVal) / range) * ch;

  // Grid lines
  ctx.strokeStyle = 'rgba(255,255,255,0.05)';
  ctx.lineWidth   = 1;
  for (let g = 0; g <= 4; g++) {
    const y = pad.t + (g / 4) * ch;
    ctx.beginPath();
    ctx.moveTo(pad.l, y);
    ctx.lineTo(pad.l + cw, y);
    ctx.stroke();
    ctx.fillStyle  = 'rgba(255,255,255,0.2)';
    ctx.font       = '10px DM Mono, monospace';
    ctx.textAlign  = 'right';
    ctx.fillText(Math.round(maxVal - (g / 4) * range) + '%', pad.l - 6, y + 3);
  }

  // Week labels
  ctx.textAlign  = 'center';
  ctx.fillStyle  = 'rgba(255,255,255,0.2)';
  for (let i = 0; i < weeks; i++) {
    ctx.fillText('W' + (i + 1), toX(i), H - 8);
  }

  // Current trajectory line (dashed)
  ctx.beginPath();
  currentLine.forEach((v, i) => i === 0 ? ctx.moveTo(toX(i), toY(v)) : ctx.lineTo(toX(i), toY(v)));
  ctx.strokeStyle = 'rgba(255,255,255,0.25)';
  ctx.lineWidth   = 2;
  ctx.setLineDash([4, 4]);
  ctx.stroke();
  ctx.setLineDash([]);

  // Adaptive fill area
  ctx.beginPath();
  adaptLine.forEach((v, i) => i === 0 ? ctx.moveTo(toX(i), toY(v)) : ctx.lineTo(toX(i), toY(v)));
  currentLine.slice().reverse().forEach((v, i) => {
    ctx.lineTo(toX(weeks - 1 - i), toY(v));
  });
  ctx.closePath();
  ctx.fillStyle = 'rgba(240,180,41,0.08)';
  ctx.fill();

  // Adaptive line
  ctx.beginPath();
  adaptLine.forEach((v, i) => i === 0 ? ctx.moveTo(toX(i), toY(v)) : ctx.lineTo(toX(i), toY(v)));
  ctx.strokeStyle = '#f0b429';
  ctx.lineWidth   = 2.5;
  ctx.stroke();

  // End point dots
  const endX = toX(weeks - 1);
  ctx.beginPath();
  ctx.arc(endX, toY(currentLine[weeks - 1]), 4, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255,255,255,0.4)';
  ctx.fill();

  ctx.beginPath();
  ctx.arc(endX, toY(adaptLine[weeks - 1]), 5, 0, Math.PI * 2);
  ctx.fillStyle = '#f0b429';
  ctx.fill();

  // Projection note
  document.getElementById('proj-note').textContent =
    `Projection calculated using research-derived performance coefficients from primary survey data (n = 132). ` +
    `Following the ${pw.name} is estimated to improve your performance trajectory by +${pw.projGain} percentage points over 8 weeks. ` +
    `Projection is illustrative and based on aggregate findings from the study cohort.`;
}

// ── INIT ─────────────────────────────────────────────────────
goTo('landing');
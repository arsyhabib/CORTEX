/* CORTEX DESIGN LIBRARY - Batch 3 Screens (17-20)
   Page 17: Quiz Page
   Page 18: Flashcard Page
   Page 19: Progress Dashboard Page
   Page 20: AI Workspace Page */

function PageQuiz({ onNavigate }) {
  const [selected, setSelected] = React.useState('B');
  const [showExplain, setShowExplain] = React.useState(true);
  const choices = [
    { id:'A', text:'The finding is always benign and can be ignored.' },
    { id:'B', text:'Compare the current finding with baseline and timing.' },
    { id:'C', text:'Skip the neurologic exam and repeat only vital signs.' },
    { id:'D', text:'Use a single symptom as a complete diagnosis.' },
  ];

  return React.createElement(B2PageShell, {
    label:'P17-Quiz',
    title:'Quiz',
    subtitle:'Design placeholder',
    onBack:()=>onNavigate(16),
    right:React.createElement(B1Badge, { color:DL.gold }, 'Q 3/8'),
  },
    React.createElement(B3Hero, {
      kicker:'Premium quiz shell',
      title:'Neurologic Assessment Check',
      subtitle:'Dummy multiple-choice flow with tactile choices, progress, and explanation surface. No scoring engine is implemented.',
      color:DL.gold,
      right:React.createElement('div', { style:{ width:52 }},
        React.createElement(B1Progress, { value:38, h:6, color:'linear-gradient(135deg,#fbbf24,#a855f7)' })
      ),
    }),

    React.createElement(B1Card, { pad:16, style:{ marginBottom:14 }},
      React.createElement(B1Badge, { color:DL.teal, style:{ marginBottom:10 }}, 'Clinical reasoning'),
      React.createElement('div', { style:{ fontSize:16, lineHeight:1.45, color:DL.text, fontWeight:800 }},
        'A learner notices new unilateral arm weakness after a simulated case update. What is the best first learning response?'),
      React.createElement('div', { style:{ marginTop:12 }},
        choices.map(c => React.createElement(B3Choice, {
          key:c.id,
          label:c.id,
          text:c.text,
          selected:selected === c.id,
          correct:showExplain && c.id === 'B',
          onClick:()=>setSelected(c.id),
        }))
      ),
    ),

    showExplain && React.createElement(B2Callout, { tone:'pearl', title:'Explanation placeholder' },
      'This premium quiz state shows why the selected answer is preferred. It is design-only and does not submit, score, or store data.'),

    React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:14 }},
      React.createElement(B1Button, { label:showExplain ? 'Hide rationale' : 'Show rationale', variant:'ghost', full:true, onClick:()=>setShowExplain(!showExplain) }),
      React.createElement(B1Button, { label:'Next placeholder', full:true, onClick:function(){} }),
    ),

    React.createElement(B3Row, {
      title:'Long-press answer affordance',
      sub:'Hold a choice in the final app to flag, eliminate, or ask for a simpler explanation.',
      active:true,
      color:DL.gold,
      right:React.createElement(B2PressHint, { active:true, label:'Flag' }),
    })
  );
}

function PageFlashcard({ onNavigate }) {
  const [flipped, setFlipped] = React.useState(false);
  const [difficulty, setDifficulty] = React.useState('balanced');

  return React.createElement(B2PageShell, {
    label:'P18-Flashcard',
    title:'Flashcards',
    subtitle:'Review mode',
    onBack:()=>onNavigate(17),
    right:React.createElement(B1Badge, null, '12 cards'),
  },
    React.createElement(B3Hero, {
      kicker:'Spaced review placeholder',
      title:'Anatomy Recall Card',
      subtitle:'Premium flashcard surface with flip, confidence chips, and saved-term metadata. Design only.',
      color:DL.teal,
    }),

    React.createElement(B1Card, {
      glow:true,
      onClick:()=>setFlipped(!flipped),
      style:{
        minHeight:260, marginBottom:14, display:'flex', alignItems:'center', justifyContent:'center',
        background:flipped
          ? 'linear-gradient(145deg,rgba(6,214,160,0.14),rgba(99,102,241,0.12))'
          : 'linear-gradient(145deg,rgba(168,85,247,0.16),rgba(99,102,241,0.10))',
      }
    },
      React.createElement('div', { style:{ textAlign:'center', padding:'8px 4px' }},
        React.createElement(B1Badge, { color:flipped ? DL.teal : DL.accent, style:{ marginBottom:16 }},
          flipped ? 'Answer side' : 'Question side'),
        React.createElement('div', { style:{ fontSize:flipped ? 20 : 22, lineHeight:1.35, color:DL.text, fontWeight:900, textWrap:'balance' }},
          flipped
            ? 'A synapse is the specialized junction where a neuron communicates with another cell.'
            : 'What is a synapse?'),
        React.createElement('div', { style:{ fontSize:11, color:DL.sub, marginTop:16 }},
          'Tap card to flip. Long-press would reveal edit/save actions.'),
      ),
    ),

    React.createElement(B1Section, { title:'Confidence', style:{ marginBottom:9 } }),
    React.createElement(B2Segmented, {
      value:difficulty,
      options:[
        { value:'again', label:'Again' },
        { value:'balanced', label:'Balanced' },
        { value:'easy', label:'Easy' },
      ],
      onChange:setDifficulty,
    }),

    React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8, marginTop:14, marginBottom:14 }},
      React.createElement(B3MetricCard, { label:'Deck', value:'CNS', sub:'Saved terms', color:DL.accent }),
      React.createElement(B3MetricCard, { label:'Due', value:'7', sub:'Today', color:DL.gold }),
      React.createElement(B3MetricCard, { label:'Recall', value:'86%', sub:'Mock', color:DL.green }),
    ),

    React.createElement(B2Callout, { tone:'note', title:'Placeholder behavior' },
      'The card flips visually, but scheduling, spaced repetition, and persistence are not implemented.')
  );
}

function PageProgressDashboard({ onNavigate }) {
  const modules = [
    { t:'Neuroanatomy', v:82, c:DL.accent },
    { t:'Clinical Reasoning', v:64, c:DL.teal },
    { t:'Cardiology Basics', v:48, c:DL.gold },
    { t:'Pharmacology', v:36, c:DL.green },
  ];

  return React.createElement(B2PageShell, {
    label:'P19-ProgressDashboard',
    title:'Progress',
    subtitle:'Learning dashboard',
    onBack:()=>onNavigate(18),
    right:React.createElement(B1Badge, { color:DL.green }, 'Mock data'),
  },
    React.createElement(B3Hero, {
      kicker:'Premium progress snapshot',
      title:'Weekly Learning Health',
      subtitle:'Design dashboard with dummy metrics, chart placeholders, streak, and module completion cards.',
      color:DL.green,
    }),

    React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:14 }},
      React.createElement(B3MetricCard, { label:'Study time', value:'6.4h', sub:'+18% this week', color:DL.teal }),
      React.createElement(B3MetricCard, { label:'Accuracy', value:'78%', sub:'Quiz placeholder', color:DL.green }),
      React.createElement(B3MetricCard, { label:'Cards reviewed', value:'142', sub:'Flashcard mock', color:DL.accent }),
      React.createElement(B3MetricCard, { label:'Streak', value:'14d', sub:'Tactile badge', color:DL.gold }),
    ),

    React.createElement(B1Card, { pad:15, style:{ marginBottom:14 }},
      React.createElement(B1Section, { title:'Retention Curve', action:'Dummy chart', style:{ marginBottom:10 } }),
      React.createElement('div', { style:{ height:132, display:'flex', alignItems:'end', gap:8, padding:'10px 2px 2px' }},
        [44,62,54,78,66,86,74].map((h, i) => React.createElement('div', {
          key:i,
          style:{
            flex:1, height:`${h}%`, borderRadius:12,
            background:i === 5 ? DL.gradA : 'linear-gradient(180deg,rgba(168,85,247,0.34),rgba(99,102,241,0.10))',
            border:'1px solid rgba(255,255,255,0.08)',
            boxShadow:i === 5 ? `0 0 20px ${DL.shadowColor}` : 'none',
            animation:'stagger-in 0.35s ease backwards',
            animationDelay:`${i * 0.04}s`,
          }
        }))
      ),
    ),

    React.createElement(B1Section, { title:'Module Completion', style:{ marginBottom:9 } }),
    modules.map((m, i) => React.createElement(B1Card, { key:m.t, pad:13, style:{ marginBottom:9 }},
      React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', marginBottom:7 }},
        React.createElement('span', { style:{ fontSize:13, color:DL.text, fontWeight:800 }}, m.t),
        React.createElement('span', { style:{ fontSize:11, color:m.c, fontWeight:900 }}, `${m.v}%`),
      ),
      React.createElement(B1Progress, { value:m.v, h:5, color:`linear-gradient(135deg,${m.c},${DL.accentB})` }),
    )),
  );
}

function PageAIWorkspace({ onNavigate }) {
  const [surface, setSurface] = React.useState('assistant');
  const [runtimeInfo, setRuntimeInfo] = React.useState({ status:'idle', catalog:null, message:'No proxy checked yet.' });
  const runtime = React.useMemo(function(){
    let sessionConfig = {};
    try {
      sessionConfig = JSON.parse(sessionStorage.getItem('cortex-ai-runtime') || '{}') || {};
    } catch (error) {
      sessionConfig = {};
    }
    const injected = typeof window !== 'undefined' && window.__CORTEX_AI_LOCAL_CONFIG__ ? window.__CORTEX_AI_LOCAL_CONFIG__ : {};
    return Object.assign({
      provider:'BytePlus ModelArk',
      providerLabel:'Secure proxy recommended',
      publicBaseUrl:'https://ark.ap-southeast.bytepluses.com/api/v3',
      codingBaseUrl:'https://ark.ap-southeast.bytepluses.com/api/coding/v3',
      proxyUrl:'',
      mode:'planning',
    }, sessionConfig, injected);
  }, []);

  React.useEffect(function(){
    if (!runtime.proxyUrl) return;
    let cancelled = false;
    const proxyBase = String(runtime.proxyUrl || '').replace(/\/+$/, '');

    Promise.all([
      fetch(`${proxyBase}/health`, { cache:'no-store' }).then(r => r.ok ? r.json() : Promise.reject(new Error(`Health ${r.status}`))),
      fetch(`${proxyBase}/config/models`, { cache:'no-store' }).then(r => r.ok ? r.json() : Promise.reject(new Error(`Catalog ${r.status}`))),
    ]).then(function(results){
      if (cancelled) return;
      setRuntimeInfo({
        status:'connected',
        catalog:results[1] && results[1].catalog ? results[1].catalog : null,
        message:'Secure proxy detected. The workspace can be wired without exposing a browser secret.',
      });
    }).catch(function(error){
      if (cancelled) return;
      setRuntimeInfo({
        status:'error',
        catalog:null,
        message:error && error.message ? error.message : 'Proxy check failed',
      });
    });

    return function(){ cancelled = true; };
  }, [runtime.proxyUrl]);

  const assistantBubbles = [
    { who:'Learner', text:'Compare upper and lower motor neuron lesion findings in one clean bedside table.' },
    { who:'Router', text:'Planned route: Responses API -> structured answer layout -> quick reference summary -> quiz hook.', tone:'system' },
    { who:'Cortex AI', text:'This shell is now ready for secure provider wiring. Text, visual, audio, and generation lanes are mapped, but GitHub Pages still stays secret-free.', tone:'assistant' },
  ];
  const statusCards = [
    { title:'Shell QA', sub:'25/25 pages passed smoke test locally', badge:'Stable', color:DL.teal },
    { title:'3D runtime', sub:'Page 13 now reads the final ship manifest', badge:'Live', color:DL.green },
    { title:'Public app safety', sub:'No provider key embedded in static assets', badge:'Safe', color:DL.accent },
    { title:'AI path', sub:runtime.proxyUrl ? 'Proxy route detected for local wiring' : 'Secure proxy still required for live calls', badge:runtime.proxyUrl ? 'Proxy' : 'Plan', color:runtime.proxyUrl ? DL.teal : DL.gold },
  ];
  const modelFamilies = runtimeInfo.catalog || {
    text:[
      { id:'seed-2-0-lite-260228', label:'Responses API', note:'Reasoning, synthesis, tutoring, structured output.' },
      { id:'seed-2-0-lite-260228', label:'Chat compatibility', note:'Migration-friendly chat/completions surface.' },
      { id:'ark-code-latest', label:'Coding-plan tooling route', note:'Documented as a supported tooling model, not a public app key path.' },
    ],
    visual:[
      { id:'bytedance-seedream-5-0-lite', label:'Image generation', note:'Diagram, illustration, poster, and anatomy explainer outputs.' },
      { id:'seedance-2-0', label:'Video generation', note:'Short concept loops, mechanism explainers, and motion snippets.' },
      { id:'3d-generation-api', label:'3D generation lane', note:'Future server-side route for 3D output orchestration.' },
    ],
    audio:[
      { id:'seed-2-0-lite-260228', label:'Audio understanding', note:'Speech notes, AST, lecture parsing, and oral recap flows.' },
      { id:'provider-specific-tts', label:'Speech output lane', note:'TTS can be routed later once the proxy owns the provider secret.' },
    ],
  };

  function SurfaceCard(item, index) {
    return React.createElement('div', {
      key:`${item.title}-${index}`,
      style:{
        padding:14,
        borderRadius:18,
        border:`1px solid ${DL.glassBorder}`,
        background:'rgba(255,255,255,0.04)',
        boxShadow:`0 14px 32px ${DL.shadowColor}`,
      }
    },
      React.createElement('div', { style:{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:10, marginBottom:8 }},
        React.createElement('div', { style:{ color:DL.text, fontSize:13, fontWeight:950, lineHeight:1.15 }}, item.title),
        React.createElement(B1Badge, { color:item.color || DL.accent }, item.badge)
      ),
      React.createElement('div', { style:{ color:DL.mute, fontSize:11, lineHeight:1.5 }}, item.sub)
    );
  }

  function ModelRow(item, index) {
    return React.createElement('div', {
      key:`${item.id}-${index}`,
      style:{
        padding:'12px 13px',
        borderRadius:16,
        border:`1px solid ${DL.glassBorder}`,
        background:'rgba(255,255,255,0.045)',
        marginBottom:index === 0 ? 0 : 10,
      }
    },
      React.createElement('div', { style:{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:10, marginBottom:5 }},
        React.createElement('div', { style:{ color:DL.text, fontSize:12, fontWeight:900 }}, item.label),
        React.createElement('div', { style:{ color:DL.accentB, fontSize:10, fontWeight:900 }}, item.id)
      ),
      React.createElement('div', { style:{ color:DL.mute, fontSize:11, lineHeight:1.48 }}, item.note)
    );
  }

  return React.createElement(B2PageShell, {
    label:'P20-AIWorkspace',
    title:'AI Workspace',
    subtitle:'Secure proxy route',
    onBack:()=>onNavigate(19),
    right:React.createElement(B1Badge, { color:runtime.proxyUrl ? DL.teal : DL.gold }, runtime.proxyUrl ? 'Proxy path' : 'Secret-safe'),
  },
    React.createElement(B3Hero, {
      kicker:'Production AI orchestration',
      title:'Text, visual, audio, and model routing in one surface',
      subtitle:'Page 20 is no longer a decorative mock. It is the secure orchestration shell for future provider wiring, with public GitHub Pages kept secret-free.',
      color:DL.accent,
    }),

    React.createElement(B2Segmented, {
      value:surface,
      options:[
        { value:'assistant', label:'Assistant' },
        { value:'visual', label:'Visual' },
        { value:'audio', label:'Audio' },
        { value:'connect', label:'Connect' },
      ],
      onChange:setSurface,
    }),

    React.createElement(B2Callout, { tone:'caution', title:'Critical provider guardrail' },
      'BytePlus documents separate Coding Plan entitlements from direct API consumption, and this shell is a public static app. We therefore keep provider secrets out of GitHub Pages and route live AI only through a secure proxy or compliant server-side connector.'),

    React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(146px,1fr))', gap:12, marginTop:14, marginBottom:14 }},
      statusCards.map(SurfaceCard)
    ),

    surface === 'assistant' && React.createElement(B1Card, { pad:14, style:{ marginBottom:14 }},
      assistantBubbles.map((m, i) => React.createElement('div', {
        key:i,
        style:{
          marginBottom:i < assistantBubbles.length - 1 ? 12 : 0,
          display:'flex', justifyContent:m.who === 'Learner' ? 'flex-end' : 'flex-start',
        }
      },
        React.createElement('div', { style:{
          maxWidth:'88%', padding:'11px 13px', borderRadius:16,
          background:m.who === 'Learner' ? DL.gradA : m.tone === 'system' ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.07)',
          border:m.who === 'Learner' ? 'none' : `1px solid ${DL.glassBorder}`,
          color:m.who === 'Learner' ? '#fff' : DL.sub,
          fontSize:12, lineHeight:1.55,
          boxShadow:m.who === 'Learner' ? `0 8px 20px ${DL.shadowColor}` : 'none',
        }},
          React.createElement('div', { style:{ fontSize:9, fontWeight:900, opacity:0.7, marginBottom:3 }}, m.who),
          m.text,
        )
      )),
    ),

    surface === 'assistant' && React.createElement(B1Card, { pad:13, style:{ marginBottom:14 }},
      React.createElement('div', { style:{ display:'grid', gap:10 }},
        React.createElement(B3Row, {
          title:'Primary route',
          sub:'Responses API first, chat compatibility second, proxy only for real calls.',
          right:React.createElement(B1Badge, { color:DL.teal }, 'Structured'),
        }),
        React.createElement(B3Row, {
          title:'Visual handoff',
          sub:'Generated diagrams, posters, and explainers should land in the visual asset manifest, not inline blobs.',
          right:React.createElement(B1Badge, { color:DL.accentB }, 'Asset-ready'),
        }),
        React.createElement(B3Row, {
          title:'Quiz handoff',
          sub:'Question and answer generation should map back into quiz, flashcard, and quick-reference domains.',
          right:React.createElement(B1Badge, { color:DL.gold }, 'Domain-linked'),
        }),
      ),
    ),

    surface === 'visual' && React.createElement(B1Card, { pad:14, style:{ marginBottom:14 }},
      React.createElement(B1Section, { title:'Visual generation lanes', style:{ marginBottom:10 } }),
      modelFamilies.visual.map(ModelRow),
      React.createElement(B2Callout, { tone:'info', title:'Recommended output path' },
        'Generate SVG when the asset is diagrammatic, use WebP or PNG for posters and previews, and keep the final file referenced through the visual manifest so the shell can adapt aspect ratio safely.')
    ),

    surface === 'audio' && React.createElement(B1Card, { pad:14, style:{ marginBottom:14 }},
      React.createElement(B1Section, { title:'Audio and speech lanes', style:{ marginBottom:10 } }),
      modelFamilies.audio.map(ModelRow),
      React.createElement(B3Row, {
        title:'Lecture parsing',
        sub:'Long-form audio can feed summary, glossary, recall prompts, and spoken recap surfaces once a compliant backend is attached.',
        right:React.createElement(B1Badge, { color:DL.teal }, 'Ready'),
      }),
    ),

    surface === 'connect' && React.createElement(B1Card, { pad:14, style:{ marginBottom:14 }},
      React.createElement(B1Section, { title:'Connection architecture', style:{ marginBottom:10 } }),
      React.createElement(B3Row, {
        title:'Public shell',
        sub:'GitHub Pages must remain secret-free. No provider key should ever ship in the client bundle.',
        right:React.createElement(B1Badge, { color:DL.green }, 'Protected'),
      }),
      React.createElement(B3Row, {
        title:'Proxy route',
        sub:runtime.proxyUrl ? `Detected at ${runtime.proxyUrl}` : 'Use ai_proxy/local_modelark_proxy.mjs locally or move the same pattern into your future server runtime.',
        right:React.createElement(B1Badge, { color:runtime.proxyUrl ? DL.teal : DL.gold }, runtime.proxyUrl ? 'Detected' : 'Needed'),
      }),
      React.createElement(B3Row, {
        title:'Coding plan caution',
        sub:'Coding Plan quota belongs to supported AI programming tools. Treat public app API calls as a separate integration track.',
        right:React.createElement(B1Badge, { color:DL.gold }, 'Read docs'),
      }),
      React.createElement(B3Row, {
        title:'Runtime status',
        sub:runtimeInfo.message,
        right:React.createElement(B1Badge, { color:runtimeInfo.status === 'connected' ? DL.teal : runtimeInfo.status === 'error' ? DL.red : DL.accent }, runtimeInfo.status),
      }),
      React.createElement(B2Callout, { tone:'info', title:'Local template' },
        'Use ai_workspace.local.example.js as the local config template and keep the real ai_workspace.local.js uncommitted. The proxy can expose health and model-catalog routes without ever leaking the provider secret to the browser.')
    ),

    React.createElement(B1Card, { pad:14, style:{ marginBottom:14 }},
      React.createElement(B1Section, { title:'Model catalog snapshot', style:{ marginBottom:10 } }),
      React.createElement('div', { style:{ display:'grid', gap:10 }},
        React.createElement('div', null,
          React.createElement('div', { style:{ color:DL.text, fontSize:12, fontWeight:900, marginBottom:6 }}, 'Text'),
          modelFamilies.text.map(ModelRow)
        ),
        surface !== 'visual' && React.createElement('div', null,
          React.createElement('div', { style:{ color:DL.text, fontSize:12, fontWeight:900, marginBottom:6 }}, 'Visual'),
          modelFamilies.visual.slice(0, 2).map(ModelRow)
        )
      )
    )
  );
}

Object.assign(window, {
  PageQuiz, PageFlashcard, PageProgressDashboard, PageAIWorkspace,
});

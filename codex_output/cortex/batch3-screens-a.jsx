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
  const [mode, setMode] = React.useState('explain');
  const prompts = [
    { who:'Learner', text:'Explain cerebral perfusion using a simple bedside analogy.' },
    { who:'Cortex AI', text:'Design-only response: blood flow can be imagined as oxygen delivery to cells. No API call is made.' },
  ];

  return React.createElement(B2PageShell, {
    label:'P20-AIWorkspace',
    title:'AI Workspace',
    subtitle:'No real API calls',
    onBack:()=>onNavigate(19),
    right:React.createElement(B1Badge, { color:DL.gold }, 'Offline mock'),
  },
    React.createElement(B3Hero, {
      kicker:'AI study workspace',
      title:'Ask, Simplify, Compare',
      subtitle:'A premium AI workspace placeholder. It never calls a provider and uses dummy responses only.',
      color:DL.accent,
    }),

    React.createElement(B2Segmented, {
      value:mode,
      options:[
        { value:'explain', label:'Explain' },
        { value:'compare', label:'Compare' },
        { value:'quiz', label:'Quiz me' },
      ],
      onChange:setMode,
    }),

    React.createElement(B1Card, { pad:14, style:{ marginTop:14, marginBottom:14 }},
      prompts.map((m, i) => React.createElement('div', {
        key:i,
        style:{
          marginBottom:i < prompts.length - 1 ? 12 : 0,
          display:'flex', justifyContent:m.who === 'Learner' ? 'flex-end' : 'flex-start',
        }
      },
        React.createElement('div', { style:{
          maxWidth:'88%', padding:'11px 13px', borderRadius:16,
          background:m.who === 'Learner' ? DL.gradA : 'rgba(255,255,255,0.06)',
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

    React.createElement(B1Card, { pad:13, style:{ marginBottom:14 }},
      React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:9 }},
        React.createElement('div', { style:{ flex:1, fontSize:12, color:DL.mute, lineHeight:1.45 }},
          mode === 'quiz' ? 'Generate dummy practice questions...' : mode === 'compare' ? 'Compare two dummy concepts...' : 'Ask a dummy explanation prompt...'),
        React.createElement(B1Button, { label:'Mock send', onClick:function(){}, style:{ padding:'9px 12px', fontSize:11 } }),
      ),
    ),

    React.createElement(B2Callout, { tone:'caution', title:'No provider access' },
      'This workspace is a visual placeholder. It does not call OpenAI, Claude, local models, or any external API.')
  );
}

Object.assign(window, {
  PageQuiz, PageFlashcard, PageProgressDashboard, PageAIWorkspace,
});

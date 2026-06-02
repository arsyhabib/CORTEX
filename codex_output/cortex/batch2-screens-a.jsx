/* CORTEX DESIGN LIBRARY - Batch 2 Screens (9-12)
   Page 9: Typography Reading Page
   Page 10: Bullet / Sub-bullet Content Page
   Page 11: Callout & Clinical Pearl Page
   Page 12: Image Card Page */

function PageTypographyReading({ onNavigate }) {
  const [held, setHeld] = React.useState(false);
  const timer = React.useRef(null);
  const startHold = () => {
    timer.current = setTimeout(() => setHeld(true), 520);
  };
  const endHold = () => {
    clearTimeout(timer.current);
  };

  return React.createElement(B2PageShell, {
    label:'P9-TypographyReading',
    title:'Reading',
    subtitle:'Neuroanatomy note',
    onBack:()=>onNavigate(8),
    right:React.createElement(B1Badge, { color:DL.teal }, 'Aa'),
  },
    React.createElement(B1Card, { glow:true, style:{ marginBottom:14, animation:'scale-in 0.35s ease backwards' }},
      React.createElement(B2Kicker, null, 'Medical typography sample'),
      React.createElement('div', { style:{ fontSize:24, lineHeight:1.18, fontWeight:800, color:DL.text, letterSpacing:0, textWrap:'balance' }},
        'Cerebral Perfusion and Early Neurologic Assessment'),
      React.createElement('div', { style:{ marginTop:12, display:'flex', gap:8 }},
        React.createElement(B2StatPill, { label:'READ', value:'7 min' }),
        React.createElement(B2StatPill, { label:'LEVEL', value:'Core' }),
        React.createElement(B2StatPill, { label:'FOCUS', value:'CNS', color:DL.teal }),
      ),
    ),

    React.createElement(B1Card, { pad:16, style:{ marginBottom:14 }},
      React.createElement(B2ReadingBlock, { lead:true },
        'Perfusion pressure describes the force that supports blood flow through delicate neural tissue. In a bedside learning context, the goal is not memorizing a single number, but recognizing patterns that may change consciousness, speech, pupil symmetry, or motor response.'),
      React.createElement(B2ReadingBlock, null,
        'A mature clinical reading page should feel quiet and stable. The line length stays short, the contrast is soft but legible, and key terms are highlighted without turning the paragraph into a decoration layer.'),
      React.createElement('div', {
        onPointerDown:startHold,
        onPointerUp:endHold,
        onPointerLeave:endHold,
        style:{
          margin:'14px 0', padding:'13px 14px', borderRadius:16,
          background:held ? 'rgba(251,191,36,0.11)' : 'rgba(255,255,255,0.045)',
          border:`1px solid ${held ? 'rgba(251,191,36,0.34)' : DL.glassBorder}`,
          transition:'all 0.25s ease', cursor:'pointer',
        }
      },
        React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'center', gap:10 }},
          React.createElement('div', { style:{ fontSize:12, lineHeight:1.6, color:DL.sub }},
            'Long-press this paragraph to reveal tactile reading tools for highlight, bookmark, and note capture.'),
          React.createElement(B2PressHint, { active:held, label:'Tools' }),
        ),
        held && React.createElement('div', { style:{ display:'flex', gap:7, marginTop:11, animation:'scale-in 0.2s ease backwards' }},
          ['Highlight','Note','Share'].map((item, i) => React.createElement(B1Badge, {
            key:i,
            color:i === 0 ? DL.gold : DL.accent,
            style:{ flex:1, justifyContent:'center' },
          }, item)),
        ),
      ),
      React.createElement(B2ReadingBlock, null,
        'In dummy curriculum content, terminology such as autoregulation, ischemia, and edema can be introduced progressively, then revisited with callouts or glossary cards.'),
    ),

    React.createElement(B1Section, { title:'Inline Terms', style:{ marginBottom:9 } }),
    React.createElement('div', { style:{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:14 }},
      ['Autoregulation','Ischemia','Edema','Perfusion','GCS','Pupil reflex'].map((term, i) =>
        React.createElement(B1Badge, { key:i, color:i % 3 === 0 ? DL.teal : undefined, style:{ cursor:'pointer' }}, term)
      )
    ),

    React.createElement(B2Callout, { tone:'note', title:'Reading rhythm' },
      'Dummy body copy uses 14-15px text, generous line height, and restrained highlights so the screen stays readable on a narrow iOS frame.')
  );
}

function PageBulletContent({ onNavigate }) {
  const bullets = [
    {
      text:'Start with a one-line learning objective.',
      sub:['State the organ system being discussed.','Keep the objective measurable and simple.'],
      tone:'ok',
    },
    {
      text:'Group related findings before adding exceptions.',
      sub:['Primary signs first.','Modifiers, severity, and caveats second.'],
    },
    {
      text:'Use sub-bullets for mechanism, example, and clinical implication.',
      sub:['Mechanism: vascular supply decreases.','Example: transient weakness after exertion.','Implication: escalate when symptoms persist.'],
      tone:'warn',
    },
    {
      text:'End with a short recall cue.',
      sub:['One sentence.','No dense paragraph hiding inside a bullet.'],
    },
  ];

  return React.createElement(B2PageShell, {
    label:'P10-BulletContent',
    title:'Bullets',
    subtitle:'Structured lesson',
    onBack:()=>onNavigate(9),
    right:React.createElement('span', { style:{ fontSize:16, color:DL.mute }}, '1/4'),
  },
    React.createElement(B1Card, { glow:true, style:{ marginBottom:14 }},
      React.createElement(B2Kicker, null, 'Checklist anatomy'),
      React.createElement('div', { style:{ fontSize:21, fontWeight:800, color:DL.text, lineHeight:1.25 }},
        'How to Read a Symptom Cluster'),
      React.createElement('div', { style:{ fontSize:12, color:DL.sub, marginTop:7, lineHeight:1.55 }},
        'Dummy content demonstrating bullets, sub-bullets, hierarchy, and scan-friendly spacing for medical education.'),
    ),

    React.createElement(B1Card, { pad:15, style:{ marginBottom:14 }},
      bullets.map((b, i) => React.createElement(B2Bullet, {
        key:i, index:i, text:b.text, sub:b.sub, tone:b.tone,
      })),
    ),

    React.createElement(B1Section, { title:'Tactile Examples', style:{ marginBottom:9 } }),
    React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:14 }},
      [
        { icon:'Tap', title:'Press row', sub:'Scale + glow' },
        { icon:'Hold', title:'Long press', sub:'Selection rail' },
      ].map((item, i) => React.createElement(B1Card, {
        key:i, onClick:function(){}, pad:13,
        style:{ minHeight:92, display:'flex', flexDirection:'column', justifyContent:'space-between' },
      },
        React.createElement('div', { style:{ fontSize:11, color:DL.accent, fontWeight:900 }}, item.icon),
        React.createElement('div', null,
          React.createElement('div', { style:{ fontSize:13, color:DL.text, fontWeight:800 }}, item.title),
          React.createElement('div', { style:{ fontSize:10, color:DL.sub, marginTop:2 }}, item.sub),
        ),
      )),
    ),

    React.createElement(B2Callout, { tone:'evidence', title:'Hierarchy note' },
      'The page keeps bullets compact, but sub-bullets remain readable by using small gaps and muted arrows.')
  );
}

function PageCalloutClinicalPearl({ onNavigate }) {
  const [selected, setSelected] = React.useState('pearl');

  return React.createElement(B2PageShell, {
    label:'P11-ClinicalPearl',
    title:'Clinical Pearls',
    subtitle:'Callout system',
    onBack:()=>onNavigate(10),
    right:React.createElement(B1Badge, { color:DL.green }, 'Safe dummy'),
  },
    React.createElement(B1Card, { glow:true, style:{ marginBottom:14 }},
      React.createElement(B2Kicker, { color:DL.green }, 'Clinical callout library'),
      React.createElement('div', { style:{ fontSize:21, fontWeight:800, color:DL.text, lineHeight:1.25 }},
        'Pearls, Cautions, Evidence, and Notes'),
      React.createElement('div', { style:{ fontSize:12, color:DL.sub, marginTop:7, lineHeight:1.55 }},
        'Dummy medical content with distinct tones for teaching emphasis.'),
    ),

    React.createElement('div', { style:{ marginBottom:12 }},
      React.createElement(B2Segmented, {
        value:selected,
        options:[
          { value:'pearl', label:'Pearl' },
          { value:'caution', label:'Caution' },
          { value:'evidence', label:'Evidence' },
        ],
        onChange:setSelected,
      }),
    ),

    React.createElement(B2Callout, { tone:'pearl', title:'Clinical Pearl', icon:'+' },
      'A clear neurologic baseline makes later changes easier to interpret. Document speech, gaze, limb strength, and level of alertness in the same order each time.'),
    React.createElement(B2Callout, { tone:'caution', title:'Caution', icon:'!' },
      'Dummy warning state: do not treat isolated visual details as a diagnosis. Pair findings with history, timing, and objective assessment.'),
    React.createElement(B2Callout, { tone:'evidence', title:'Evidence Cue', icon:'E' },
      'Use this callout for citations, guideline reminders, or a short method note. The visual tone stays calm so it does not compete with urgent warnings.'),
    React.createElement(B2Callout, { tone:'danger', title:'Escalation Pattern', icon:'!' },
      'Rapid deterioration, persistent confusion, or new unilateral weakness should be shown as an escalation example in dummy learning flows.'),

    React.createElement(B1Section, { title:'Long-press Pearl State', style:{ marginTop:6, marginBottom:9 } }),
    React.createElement(B1Card, {
      pad:14,
      onClick:()=>setSelected(selected === 'pearl' ? 'caution' : 'pearl'),
      style:{
        background:selected === 'pearl' ? 'rgba(34,197,94,0.08)' : 'rgba(251,191,36,0.08)',
        borderColor:selected === 'pearl' ? 'rgba(34,197,94,0.24)' : 'rgba(251,191,36,0.28)',
      }
    },
      React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', gap:10, alignItems:'center' }},
        React.createElement('div', null,
          React.createElement('div', { style:{ fontSize:13, fontWeight:800, color:DL.text }}, 'Press to cycle tactile emphasis'),
          React.createElement('div', { style:{ fontSize:10, color:DL.sub, marginTop:2 }}, 'Demonstrates pressed visual feedback and tone shift.'),
        ),
        React.createElement(B2PressHint, { active:selected === 'caution', label:'Tone' }),
      ),
    )
  );
}

function PageImageCard({ onNavigate }) {
  const [active, setActive] = React.useState(0);
  const cards = [
    {
      title:'Rounded Anatomy Plate',
      subtitle:'Dummy image card with soft glass caption and image-safe corner radius.',
      badge:'Figure 12.1',
      icon:'Brain',
      tint:'linear-gradient(135deg,rgba(99,102,241,0.30),rgba(6,214,160,0.12))',
    },
    {
      title:'Clinical Diagram Snapshot',
      subtitle:'Placeholder for a labelled medical diagram, optimized for mobile scanning.',
      badge:'Diagram',
      icon:'Pulse',
      tint:'linear-gradient(135deg,rgba(168,85,247,0.26),rgba(251,191,36,0.12))',
    },
    {
      title:'Microscopy Reference Card',
      subtitle:'Dummy visual slot for tissue, cells, or lab education media.',
      badge:'Image',
      icon:'Cell',
      tint:'linear-gradient(135deg,rgba(6,214,160,0.20),rgba(99,102,241,0.18))',
    },
  ];

  return React.createElement(B2PageShell, {
    label:'P12-ImageCard',
    title:'Image Cards',
    subtitle:'Rounded media',
    onBack:()=>onNavigate(11),
    right:React.createElement(B1Badge, null, `${active + 1}/3`),
  },
    React.createElement(B1Card, { glow:true, style:{ marginBottom:14 }},
      React.createElement(B2Kicker, null, 'Media-friendly lesson cards'),
      React.createElement('div', { style:{ fontSize:21, fontWeight:800, color:DL.text, lineHeight:1.25 }},
        'Rounded Image Cards for Medical Content'),
      React.createElement('div', { style:{ fontSize:12, color:DL.sub, marginTop:7, lineHeight:1.55 }},
        'All image areas are placeholders and keep a rounded, liquid-glass treatment.'),
    ),

    cards.map((card, i) => React.createElement(B2ImageCard, {
      key:i,
      title:card.title,
      subtitle:card.subtitle,
      badge:card.badge,
      tint:card.tint,
      icon:card.icon,
      onClick:()=>setActive(i),
    },
      React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:8, marginTop:12 }},
        React.createElement(B1Progress, { value:i === active ? 100 : 40 + i * 18, h:4, color:i === active ? DL.gradA : undefined }),
        React.createElement('span', { style:{ fontSize:10, color:i === active ? DL.accent : DL.mute, fontWeight:800 }},
          i === active ? 'Selected' : 'Preview'),
      )
    )),

    React.createElement(B2Callout, { tone:'note', title:'Image fallback pattern' },
      'If a real media asset is unavailable, the card still displays a polished placeholder, caption, and progress affordance.')
  );
}

Object.assign(window, {
  PageTypographyReading, PageBulletContent, PageCalloutClinicalPearl, PageImageCard,
});

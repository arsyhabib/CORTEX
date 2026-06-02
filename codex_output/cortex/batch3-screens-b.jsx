/* CORTEX DESIGN LIBRARY - Batch 3 Screens (21-24)
   Page 21: Provider & Advanced Settings Page
   Page 22: QuickRef Modal Page
   Page 23: Help / About / Privacy Page
   Page 24: Empty / Loading / Error / Offline States Page */

function PageProviderAdvancedSettings({ onNavigate }) {
  const [providerEnabled, setProviderEnabled] = React.useState(false);
  const [hapticEnabled, setHapticEnabled] = React.useState(true);
  const [intensity, setIntensity] = React.useState('balanced');
  const [duration, setDuration] = React.useState(520);
  const [visualFallback, setVisualFallback] = React.useState(true);
  const [apply, setApply] = React.useState({ buttons:true, cards:true, quiz:true, nav:false });

  const ApplyRow = ({ keyName, title, sub }) => React.createElement(B3Row, {
    title,
    sub,
    right:React.createElement(B3TinyToggle, {
      value:apply[keyName],
      onChange:v => setApply({ ...apply, [keyName]:v }),
    }),
  });

  return React.createElement(B2PageShell, {
    label:'P21-ProviderAdvancedSettings',
    title:'Advanced',
    subtitle:'Provider & haptics',
    onBack:()=>onNavigate(20),
    right:React.createElement(B1Badge, { color:providerEnabled ? DL.green : DL.gold }, providerEnabled ? 'Mock on' : 'No keys'),
  },
    React.createElement(B3Hero, {
      kicker:'Provider settings placeholder',
      title:'Model Provider and Tactile Controls',
      subtitle:'Design-only settings. No real keys, endpoints, or provider calls are included.',
      color:DL.gold,
    }),

    React.createElement(B1Section, { title:'Provider', style:{ marginBottom:9 } }),
    React.createElement(B1Card, { pad:14, style:{ marginBottom:14 }},
      React.createElement(B1Toggle, { value:providerEnabled, onChange:setProviderEnabled, label:'Enable provider placeholder' }),
      React.createElement(B3Row, {
        title:'Provider slot',
        sub:'No real API key stored. Placeholder field is masked and inert.',
        right:React.createElement(B1Badge, { color:DL.gold }, 'sk-**** mock'),
      }),
      React.createElement(B3Row, {
        title:'Capability status',
        sub:'Network: disabled. Streaming: placeholder. Local cache: mock only.',
        active:true,
        color:DL.teal,
        right:React.createElement(B1Badge, { color:DL.teal }, 'Visual only'),
      }),
    ),

    React.createElement(B1Section, { title:'Haptic Settings', style:{ marginBottom:9 } }),
    React.createElement(B1Card, { pad:14, style:{ marginBottom:14 }},
      React.createElement(B1Toggle, { value:hapticEnabled, onChange:setHapticEnabled, label:'Master haptic toggle' }),
      React.createElement('div', { style:{ marginTop:13, marginBottom:13 }},
        React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', marginBottom:7 }},
          React.createElement('span', { style:{ fontSize:11, color:DL.sub, fontWeight:800 }}, 'Intensity'),
          React.createElement('span', { style:{ fontSize:11, color:DL.accent, fontWeight:900 }}, intensity),
        ),
        React.createElement(B2Segmented, {
          value:intensity,
          options:[
            { value:'subtle', label:'Subtle' },
            { value:'balanced', label:'Balanced' },
            { value:'strong', label:'Strong' },
          ],
          onChange:setIntensity,
        }),
      ),
      React.createElement('div', { style:{ marginBottom:13 }},
        React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', marginBottom:6 }},
          React.createElement('span', { style:{ fontSize:11, color:DL.sub, fontWeight:800 }}, 'Long-press duration'),
          React.createElement('span', { style:{ fontSize:11, color:DL.gold, fontWeight:900 }}, `${duration}ms`),
        ),
        React.createElement('input', {
          type:'range', min:320, max:900, step:20, value:duration,
          onChange:e => setDuration(Number(e.target.value)),
          style:{ width:'100%', accentColor:DL.accent },
        }),
      ),
      ApplyRow({ keyName:'buttons', title:'Apply to controls', sub:'Buttons, toggles, segmented controls.' }),
      ApplyRow({ keyName:'cards', title:'Apply to cards', sub:'Flashcards, image cards, and glossary rows.' }),
      ApplyRow({ keyName:'quiz', title:'Apply to quiz', sub:'Answer choice press and reveal states.' }),
      ApplyRow({ keyName:'nav', title:'Apply to navigation', sub:'Back, tab, and drawer gestures.' }),
      React.createElement(B1Toggle, { value:visualFallback, onChange:setVisualFallback, label:'Visual-only fallback' }),
    ),

    React.createElement(B2Callout, { tone:'evidence', title:'Capability status' },
      'Haptic capability: simulated. Device vibration: not invoked. Fallback glow and scale states remain available when haptics are unsupported.')
  );
}

function PageQuickRefModal({ onNavigate }) {
  const [open, setOpen] = React.useState(true);

  return React.createElement(B2PageShell, {
    label:'P22-QuickRefModal',
    title:'QuickRef',
    subtitle:'Modal pattern',
    onBack:()=>onNavigate(21),
    right:React.createElement(B1Badge, null, open ? 'Open' : 'Closed'),
  },
    React.createElement(B3Hero, {
      kicker:'Quick reference overlay',
      title:'Clinical QuickRef Modal',
      subtitle:'A compact modal pattern for formulas, red flags, normal ranges, or glossary snapshots.',
      color:DL.teal,
    }),

    React.createElement(B1Card, { pad:14, style:{ marginBottom:14, opacity:open ? 0.55 : 1 }},
      React.createElement(B1Section, { title:'Underlying lesson', action:'Dimmed' }),
      React.createElement(B2ReadingBlock, null,
        'This dummy lesson surface sits below the QuickRef overlay. It demonstrates how the background dims without losing context.'),
      React.createElement(B1Button, { label:'Open QuickRef', full:true, onClick:()=>setOpen(true) }),
    ),

    open && React.createElement('div', {
      style:{
        position:'absolute', inset:0, zIndex:80,
        background:'rgba(0,0,0,0.52)', display:'flex',
        alignItems:'flex-end', padding:'0 18px 28px',
        backdropFilter:'blur(6px)', WebkitBackdropFilter:'blur(6px)',
      }
    },
      React.createElement(B1Card, { glow:true, pad:16, style:{ width:'100%', animation:'slide-up 0.3s ease backwards' }},
        React.createElement('div', { style:{ width:42, height:4, borderRadius:999, background:'rgba(255,255,255,0.22)', margin:'0 auto 13px' }}),
        React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'center', gap:10, marginBottom:10 }},
          React.createElement('div', null,
            React.createElement(B2Kicker, { color:DL.teal }, 'QuickRef'),
            React.createElement('div', { style:{ fontSize:18, color:DL.text, fontWeight:900 }}, 'Neuro Check Mini Guide'),
          ),
          React.createElement('button', {
            onClick:()=>setOpen(false),
            style:{ width:32, height:32, borderRadius:12, border:`1px solid ${DL.glassBorder}`, background:'rgba(255,255,255,0.06)', color:DL.text, cursor:'pointer' }
          }, 'x'),
        ),
        ['Speech clarity','Pupil symmetry','Limb strength','Level of alertness'].map((item, i) =>
          React.createElement(B2Bullet, { key:i, index:i, text:item, sub:['Dummy reference item for rapid review.'] })
        ),
        React.createElement(B1Button, { label:'Pin reference', full:true, onClick:function(){}, style:{ marginTop:12 } }),
      )
    )
  );
}

function PageHelpAboutPrivacy({ onNavigate }) {
  const [section, setSection] = React.useState('help');
  const text = {
    help:'Find onboarding tips, dummy FAQ entries, and support placeholders for the learning shell.',
    about:'Cortex Design Kernel v0.1 is a visual library for premium medical education screens.',
    privacy:'No real account, patient, provider, or API data is stored in these placeholder screens.',
  };

  return React.createElement(B2PageShell, {
    label:'P23-HelpAboutPrivacy',
    title:'Help',
    subtitle:'About & privacy',
    onBack:()=>onNavigate(22),
    right:React.createElement(B1Badge, { color:DL.teal }, 'Info'),
  },
    React.createElement(B3Hero, {
      kicker:'Support center',
      title:'Help, About, and Privacy',
      subtitle:'A calm trust surface for app guidance, design provenance, and privacy-safe placeholder language.',
      color:DL.teal,
    }),

    React.createElement(B2Segmented, {
      value:section,
      options:[
        { value:'help', label:'Help' },
        { value:'about', label:'About' },
        { value:'privacy', label:'Privacy' },
      ],
      onChange:setSection,
    }),

    React.createElement(B1Card, { pad:16, style:{ marginTop:14, marginBottom:14 }},
      React.createElement(B1Badge, { color:section === 'privacy' ? DL.gold : DL.accent, style:{ marginBottom:10 }}, section),
      React.createElement(B2ReadingBlock, { lead:true }, text[section]),
      React.createElement(B1Divider, { style:{ margin:'12px 0' }}),
      [
        { t:'Contact placeholder', s:'No message is sent from this prototype.' },
        { t:'Version', s:'Cortex Design Library Batch 3.' },
        { t:'Data handling', s:'Dummy content only; no real medical or user data.' },
      ].map((row, i) => React.createElement(B3Row, {
        key:i,
        title:row.t,
        sub:row.s,
        right:React.createElement('span', { style:{ color:DL.mute, fontSize:13 }}, '>'),
      })),
    ),

    React.createElement(B2Callout, { tone:'caution', title:'Privacy placeholder' },
      'This page intentionally avoids real policy text, accounts, patient records, provider keys, or telemetry claims.')
  );
}

function PageStatesLibrary({ onNavigate }) {
  const [mode, setMode] = React.useState('offline');
  const states = {
    offline:{ tone:'offline', title:'Offline', sub:'No connection. Show cached lessons, saved cards, and a retry affordance.', action:'Retry' },
    loading:{ tone:'loading', title:'Loading', sub:'Skeleton shimmer while dummy content prepares. Keep layout stable.', action:'Cancel' },
    error:{ tone:'error', title:'Error', sub:'Something failed in the placeholder flow. Explain next steps calmly.', action:'Try again' },
    unsupported3d:{ tone:'unsupported', title:'Unsupported 3D', sub:'Use poster fallback when anatomy viewer capability is unavailable.', action:'Show poster' },
    unsupportedHaptic:{ tone:'unsupported', title:'Unsupported haptic', sub:'Use visual-only fallback: scale, glow, and pressed states.', action:'Use visual' },
    missing:{ tone:'note', title:'Missing data', sub:'The lesson card has no dummy payload yet. Offer search, reload, or browse.', action:'Browse' },
  };
  const current = states[mode];

  return React.createElement(B2PageShell, {
    label:'P24-StatesLibrary',
    title:'States',
    subtitle:'Empty / loading / error',
    onBack:()=>onNavigate(23),
    right:React.createElement(B1Badge, { color:current.tone === 'error' ? DL.red : DL.gold }, current.title),
  },
    React.createElement(B3Hero, {
      kicker:'Resilience state library',
      title:'Fallbacks for Empty, Loading, Error, Offline',
      subtitle:'Required state coverage for the design library. All examples are visual placeholders.',
      color:DL.gold,
    }),

    React.createElement(B2Segmented, {
      value:mode,
      options:[
        { value:'offline', label:'Offline' },
        { value:'loading', label:'Loading' },
        { value:'error', label:'Error' },
      ],
      onChange:setMode,
    }),
    React.createElement('div', { style:{ height:8 }}),
    React.createElement(B2Segmented, {
      value:mode,
      options:[
        { value:'unsupported3d', label:'No 3D' },
        { value:'unsupportedHaptic', label:'No haptic' },
        { value:'missing', label:'Missing' },
      ],
      onChange:setMode,
    }),

    React.createElement('div', { style:{ marginTop:14 }},
      React.createElement(B3StateCard, {
        tone:current.tone,
        title:current.title,
        sub:current.sub,
        action:current.action,
      })
    ),

    mode === 'loading' && React.createElement(B1Card, { pad:14, style:{ marginBottom:14 }},
      [90,72,54].map((w, i) => React.createElement('div', {
        key:i,
        style:{
          height:i === 0 ? 18 : 12, width:`${w}%`, borderRadius:999,
          background:'linear-gradient(90deg,rgba(255,255,255,0.05),rgba(168,85,247,0.18),rgba(255,255,255,0.05))',
          backgroundSize:'200% 100%', animation:'shimmer 1.4s linear infinite',
          marginBottom:i < 2 ? 10 : 0,
        }
      }))
    ),

    React.createElement(B1Section, { title:'Required State Coverage', style:{ marginBottom:9 } }),
    [
      ['offline','Offline'],
      ['loading','Loading'],
      ['error','Error'],
      ['unsupported3d','Unsupported 3D'],
      ['unsupportedHaptic','Unsupported haptic'],
      ['missing','Missing data'],
    ].map(([key, label]) => React.createElement(B3StateCard, {
      key,
      tone:states[key].tone,
      title:label,
      sub:states[key].sub,
      compact:true,
      action:mode === key ? 'Selected' : null,
    })),
  );
}

Object.assign(window, {
  PageProviderAdvancedSettings, PageQuickRefModal, PageHelpAboutPrivacy, PageStatesLibrary,
});

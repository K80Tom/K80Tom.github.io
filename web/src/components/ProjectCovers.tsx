// Original vector artwork and a composition of the existing product screenshots.
export function RecordingCover() {
  return <div className="project-cover cover-recording"><svg viewBox="0 0 1000 1000" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="recording-cover-bg" x1="100" y1="0" x2="800" y2="1000" gradientUnits="userSpaceOnUse"><stop stopColor="#245b50"/><stop offset=".5" stopColor="#102f2c"/><stop offset="1" stopColor="#071a1b"/></linearGradient>
      <linearGradient id="recording-phone" x1="420" y1="0" x2="820" y2="700" gradientUnits="userSpaceOnUse"><stop stopColor="#c2edd7"/><stop offset=".12" stopColor="#578a77"/><stop offset=".7" stopColor="#223e37"/><stop offset="1" stopColor="#90bdaa"/></linearGradient>
      <linearGradient id="recording-screen" x1="500" y1="0" x2="820" y2="600" gradientUnits="userSpaceOnUse"><stop stopColor="#c7f3bd"/><stop offset=".5" stopColor="#5d9e78"/><stop offset="1" stopColor="#153c38"/></linearGradient>
      <pattern id="recording-grid" width="80" height="80" patternUnits="userSpaceOnUse"><path d="M80 0H0V80" stroke="#cffbe9" strokeOpacity=".055"/></pattern>
    </defs>
    <rect width="1000" height="1000" fill="url(#recording-cover-bg)"/><rect width="1000" height="1000" fill="url(#recording-grid)"/>
    <g stroke="#b5e7d0" opacity=".15"><circle cx="515" cy="460" r="370"/><circle cx="515" cy="460" r="285"/><path d="M0 460h1000M515 0v1000" strokeDasharray="4 9"/></g>
    <g transform="rotate(18 610 320)">
      <rect x="472" y="56" width="306" height="590" rx="46" fill="#030f0e" opacity=".7" transform="translate(20 30)"/>
      <rect x="462" y="36" width="306" height="590" rx="46" fill="url(#recording-phone)" stroke="#b8e8cd" strokeOpacity=".65" strokeWidth="2"/>
      <rect x="477" y="50" width="276" height="560" rx="34" fill="#071e1b"/>
      <rect x="486" y="61" width="258" height="538" rx="28" fill="url(#recording-screen)"/>
      <rect x="569" y="70" width="94" height="22" rx="11" fill="#102f27"/>
      <g stroke="#e6ffee" strokeWidth="3" opacity=".75"><path d="M520 160v-30h30M680 130h30v30M710 272v30h-30M550 302h-30v-30"/></g>
      <circle cx="615" cy="216" r="38" stroke="#ecffea" strokeWidth="1.5"/><path d="m608 198 22 18-22 18v-36Z" fill="#ecffea"/>
      <rect x="511" y="345" width="208" height="10" rx="5" fill="#d6f3db" opacity=".32"/><rect x="511" y="370" width="153" height="8" rx="4" fill="#d6f3db" opacity=".2"/>
      <rect x="511" y="417" width="64" height="86" rx="12" fill="#d6f3db" opacity=".12"/><rect x="583" y="417" width="64" height="86" rx="12" fill="#d6f3db" opacity=".17"/><rect x="655" y="417" width="64" height="86" rx="12" fill="#d6f3db" opacity=".09"/>
      <circle cx="614" cy="548" r="19" fill="#f0a089"/><circle cx="614" cy="548" r="28" stroke="#e7fce9" strokeOpacity=".45"/>
    </g>
    <g transform="rotate(-13 340 780)">
      <rect x="-45" y="699" width="828" height="183" rx="17" fill="#081f1d" stroke="#699c85" strokeOpacity=".55"/>
      {[0,1,2,3,4].map(i=><g key={i} transform={`translate(${i*157} 0)`}><rect x="-24" y="721" width="137" height="136" rx="7" fill={['#3c7163','#618b72','#a4bda0','#36695b','#5b806d'][i]} opacity=".58"/><path d="m25 765 24 20-24 20v-40Z" fill="#d6eddd" opacity=".45"/></g>)}
      <path d="M326 689v205" stroke="#d5f5dc" strokeWidth="3"/><path d="m317 687 9 13 9-13" fill="#d5f5dc"/>
    </g>
    <g fill="#cef4e4" opacity=".3"><circle cx="149" cy="244" r="5"/><circle cx="822" cy="674" r="5"/><path d="M133 244h32M149 228v32M806 674h32M822 658v32" stroke="#cef4e4"/></g>
  </svg></div>
}

export function AuraCover() {
  return <div className="project-cover cover-aura"><svg viewBox="0 0 1000 1000" fill="none" aria-hidden="true">
    <defs><linearGradient id="aura-cover-bg" x1="100" y1="0" x2="900" y2="1000" gradientUnits="userSpaceOnUse"><stop stopColor="#634a75"/><stop offset=".52" stopColor="#30243f"/><stop offset="1" stopColor="#191824"/></linearGradient><linearGradient id="aura-glass" x1="220" y1="0" x2="740" y2="700" gradientUnits="userSpaceOnUse"><stop stopColor="#edceee" stopOpacity=".28"/><stop offset="1" stopColor="#978ac5" stopOpacity=".035"/></linearGradient><linearGradient id="aura-ribbon" x1="0" x2="1000" gradientUnits="userSpaceOnUse"><stop stopColor="#caadc9" stopOpacity="0"/><stop offset=".5" stopColor="#dcc5ed"/><stop offset="1" stopColor="#7c85bf" stopOpacity="0"/></linearGradient></defs>
    <rect width="1000" height="1000" fill="url(#aura-cover-bg)"/>
    <g transform="rotate(-20 500 500)" stroke="url(#aura-ribbon)"><ellipse cx="500" cy="480" rx="515" ry="238" strokeWidth="2"/><ellipse cx="500" cy="480" rx="452" ry="325" strokeWidth="1" opacity=".35"/><ellipse cx="500" cy="480" rx="300" ry="490" strokeWidth="1" opacity=".18"/></g>
    <g transform="rotate(12 580 265)"><rect x="326" y="30" width="440" height="258" rx="30" fill="url(#aura-glass)" stroke="#d6c5ec" strokeOpacity=".27"/><circle cx="384" cy="91" r="23" fill="#eed9e6" fillOpacity=".2"/><path d="M378 91h12M384 85v12" stroke="#f2dfef"/><rect x="428" y="80" width="184" height="9" rx="4.5" fill="#eeddeb" opacity=".47"/><rect x="428" y="101" width="114" height="7" rx="3.5" fill="#eeddeb" opacity=".2"/><rect x="361" y="151" width="293" height="9" rx="4.5" fill="#eeddeb" opacity=".23"/><rect x="361" y="176" width="349" height="9" rx="4.5" fill="#eeddeb" opacity=".15"/><rect x="361" y="201" width="202" height="9" rx="4.5" fill="#eeddeb" opacity=".1"/></g>
    <g transform="rotate(-13 400 805)"><rect x="106" y="710" width="585" height="200" rx="30" fill="url(#aura-glass)" stroke="#d6c5ec" strokeOpacity=".25"/><rect x="143" y="750" width="50" height="50" rx="16" fill="#e8d4e2" opacity=".15"/><path d="m168 760 3 13 12 3-12 3-3 12-3-12-12-3 12-3z" fill="#dfc4e3"/><rect x="219" y="759" width="218" height="10" rx="5" fill="#f0dced" opacity=".26"/><rect x="219" y="784" width="389" height="8" rx="4" fill="#f0dced" opacity=".13"/><rect x="143" y="837" width="98" height="30" rx="15" stroke="#cab5d6" strokeOpacity=".22"/><rect x="253" y="837" width="98" height="30" rx="15" stroke="#cab5d6" strokeOpacity=".22"/><rect x="363" y="837" width="98" height="30" rx="15" stroke="#cab5d6" strokeOpacity=".22"/></g>
    <g fill="#e8d5eb"><path d="m191 351 8 35 35 8-35 8-8 35-8-35-35-8 35-8Z" opacity=".7"/><path d="m822 657 5 20 20 5-20 5-5 20-5-20-20-5 20-5Z" opacity=".6"/><circle cx="735" cy="154" r="4"/><circle cx="305" cy="614" r="3" opacity=".4"/></g>
  </svg></div>
}

export function MiniCodeCover() {
  return <div className="project-cover cover-minicode"><svg viewBox="0 0 1000 1000" fill="none" aria-hidden="true">
    <defs><linearGradient id="mini-cover-bg" x1="0" y1="0" x2="1000" y2="1000" gradientUnits="userSpaceOnUse"><stop stopColor="#244b60"/><stop offset=".5" stopColor="#102433"/><stop offset="1" stopColor="#08131d"/></linearGradient><linearGradient id="mini-window" x1="0" y1="0" x2="500" y2="800" gradientUnits="userSpaceOnUse"><stop stopColor="#263e4b"/><stop offset="1" stopColor="#071822"/></linearGradient></defs>
    <rect width="1000" height="1000" fill="url(#mini-cover-bg)"/>
    <g stroke="#91c7db" opacity=".08"><path d="M-120 520 500 160l620 360-620 360-620-360ZM-120 590 500 230l620 360-620 360-620-360ZM-120 660 500 300l620 360-620 360-620-360Z"/></g>
    <g transform="rotate(-12 500 300)">
      <rect x="126" y="61" width="780" height="490" rx="18" fill="#030d15" opacity=".35" transform="translate(20 28)"/>
      <rect x="108" y="37" width="780" height="490" rx="18" fill="url(#mini-window)" stroke="#96c6d9" strokeOpacity=".4"/>
      <path d="M108 97h780" stroke="#acc7d3" strokeOpacity=".14"/><circle cx="142" cy="68" r="6" fill="#c47f84"/><circle cx="163" cy="68" r="6" fill="#c4aa7f"/><circle cx="184" cy="68" r="6" fill="#80b29e"/>
      <text x="708" y="73" fontSize="13" fontFamily="monospace" fill="#8ba9b9">minicode — zsh</text>
      <path d="m146 146 15 13-15 13" stroke="#9dc9c0" strokeWidth="3"/><rect x="182" y="152" width="110" height="12" rx="3" fill="#c4dedb" opacity=".8"/><rect x="309" y="152" width="180" height="12" rx="3" fill="#89b6c4" opacity=".38"/>
      {[0,1,2,3,4,5].map(i=><g key={i} transform={`translate(0 ${i*44})`}><rect x="147" y="209" width="20" height="8" rx="3" fill="#688595"/><rect x="191" y="209" width={120+i%3*42} height="8" rx="3" fill={i%2?'#8fa1ca':'#87bdad'} opacity=".63"/><rect x={326+i%3*42} y="209" width={175-i%3*37} height="8" rx="3" fill="#7798aa" opacity=".3"/></g>)}
    </g>
    <g transform="rotate(9 650 795)"><rect x="346" y="699" width="618" height="199" rx="17" fill="#132e3b" stroke="#719ea8" strokeOpacity=".35"/><path d="m382 745 10 10 18-20" stroke="#a4dbc0" strokeWidth="3"/><text x="431" y="753" fontFamily="monospace" fontSize="16" fill="#a4dbc0">TASK COMPLETE</text><rect x="382" y="789" width="288" height="8" rx="3" fill="#b7d7dc" opacity=".24"/><rect x="382" y="816" width="391" height="8" rx="3" fill="#b7d7dc" opacity=".14"/><path d="M382 857h40m8 0h69m8 0h28" stroke="#a4dbc0" strokeOpacity=".35" strokeWidth="6"/></g>
    <path d="m123 704 47 42-47 42M211 801h72" stroke="#9bcbdf" strokeWidth="5" strokeLinecap="round" opacity=".55"/>
  </svg></div>
}

export function DramaCover() {
  return <div className="project-cover cover-drama">
    <div className="drama-cover-grid"/>
    <div className="cover-window cover-window-main"><div className="cover-window-bar"><i/><i/><i/><span>STORY → SCREEN</span></div><img src="/assets/prod-ai.jpg" alt="" draggable={false} loading="lazy" width="1280" height="633"/></div>
    <div className="cover-window cover-window-second"><div className="cover-window-bar"><i/><i/><i/></div><img src="/assets/prod-dashboard.jpg" alt="" draggable={false} loading="lazy" width="1280" height="633"/></div>
    <div className="cover-frame-mark frame-mark-one"/><div className="cover-frame-mark frame-mark-two"/>
  </div>
}

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { ArrowUpRight, Check, Code2, Cpu, Database, FileText, Play, ScanLine, Terminal, Workflow } from 'lucide-react'
import type { ProjectId } from '../data'

export function AgentScene() {
  const ref = useRef<HTMLDivElement>(null)
  const pointer = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!ref.current || event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const box = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--ry', `${((event.clientX - box.left) / box.width - .5) * 9}deg`)
    ref.current.style.setProperty('--rx', `${((event.clientY - box.top) / box.height - .5) * -7}deg`)
  }
  return <div className="agent-scene" ref={ref} onPointerMove={pointer} onPointerLeave={() => { ref.current?.style.setProperty('--ry', '0deg'); ref.current?.style.setProperty('--rx', '0deg') }} aria-label="Agent 工作台概念图：理解任务、组织上下文、调用工具、验证结果">
    <div className="scene-coordinate mono">SYSTEM / HUMAN × AGENT</div>
    <div className="scene-grid" />
    <div className="scene-space">
      <svg className="orbital" viewBox="0 0 620 540" fill="none" aria-hidden="true">
        <defs><radialGradient id="core-glow"><stop stopColor="#9fecd3" stopOpacity=".2"/><stop offset="1" stopColor="#9fecd3" stopOpacity="0"/></radialGradient><linearGradient id="core-face" x1="210" y1="200" x2="420" y2="390" gradientUnits="userSpaceOnUse"><stop stopColor="#21483d"/><stop offset="1" stopColor="#0d1d19"/></linearGradient><filter id="line-glow"><feGaussianBlur stdDeviation="3"/></filter></defs>
        <circle cx="310" cy="285" r="245" fill="url(#core-glow)"/>
        <g className="orbit-rings" transform="translate(310 285)">
          <ellipse rx="252" ry="92" transform="rotate(-27)" stroke="#99d5c0" strokeOpacity=".18"/>
          <ellipse rx="216" ry="136" transform="rotate(38)" stroke="#99d5c0" strokeOpacity=".14" strokeDasharray="3 7"/>
          <ellipse rx="213" ry="198" stroke="#99d5c0" strokeOpacity=".09"/>
          <ellipse rx="253" ry="220" stroke="#99d5c0" strokeOpacity=".055"/>
        </g>
        <g className="circuit-paths" stroke="#7dbaa5" strokeOpacity=".48"><path d="M82 174h88l61 60"/><path d="M380 233l66-66h103"/><path d="M232 330l-64 65H80"/><path d="M385 331l56 61h109"/></g>
        <g className="core-chip">
          <path d="m310 188 112 64v116l-112 65-112-65V252z" fill="#0b1713" stroke="#9bd8be" strokeOpacity=".2"/>
          <path d="m310 163 112 64-112 65-112-65z" fill="url(#core-face)" stroke="#a6edd6" strokeOpacity=".65"/>
          <path d="m198 227 112 65v106l-112-64z" fill="#10251d" stroke="#a6edd6" strokeOpacity=".25"/>
          <path d="m310 292 112-65v107l-112 64z" fill="#102018" stroke="#a6edd6" strokeOpacity=".3"/>
          <path d="m310 182 80 45-80 47-80-47z" stroke="#a6edd6" strokeOpacity=".3"/>
          <path d="m310 198 53 30-53 30-53-30z" fill="#a6edd6" fillOpacity=".08" stroke="#a6edd6" strokeOpacity=".5"/>
          <path d="m310 214 25 14-25 14-25-14z" fill="#a6edd6"/>
          <path d="m212 250 83 48m-83-37 83 48m-83-37 83 48m-83-37 83 48m29-54 83-48m-83 59 83-48m-83 59 83-48m-83 59 83-48" stroke="#91c5ae" strokeOpacity=".16"/>
          <path d="m198 347 112 65 112-65" stroke="#a6edd6" strokeOpacity=".6"/>
        </g>
        <g fill="#a6edd6"><circle cx="170" cy="174" r="3"/><circle cx="446" cy="167" r="3"/><circle cx="168" cy="395" r="3"/><circle cx="441" cy="392" r="3"/></g>
      </svg>
      <div className="scene-node node-input"><FileText size={15}/><div><span>理解意图</span><small>01 / INTENT</small></div></div>
      <div className="scene-node node-context"><Database size={15}/><div><span>组织上下文</span><small>02 / CONTEXT</small></div></div>
      <div className="scene-node node-tools"><Code2 size={15}/><div><span>调用工具</span><small>03 / EXECUTION</small></div></div>
      <div className="scene-node node-verify"><Check size={15}/><div><span>验证结果</span><small>04 / EVALUATION</small></div></div>
      <span className="core-label mono">AGENT RUNTIME</span>
    </div>
    <div className="scene-caption"><span className="signal"/><span className="mono">IDEA → SYSTEM → PRODUCT</span><span className="scene-spec mono">FIG. 01</span></div>
  </div>
}

const recordingSteps = ['规则理解', '设备录制', '离线剪辑', '审核交付']
export function RecordingScene({ interactive = false }: { interactive?: boolean }) {
  const [step, setStep] = useState(1)
  return <div className="recording-scene scene-panel">
    <div className="preview-top mono"><span><ScanLine size={13}/> RECORDING STUDIO</span><span>流程示意</span></div>
    <div className="recording-main">
      <div className="recording-rule"><span className="tiny-label">TASK BRIEF</span><h4>把操作流程<br/>变成视频</h4><div className="rule-line"/><div className="rule-line short"/><div className="file-pill"><FileText size={12}/> recording-rules.md</div><div className="rule-check"><Check size={11}/> 规则解析 <span>ready</span></div><div className="rule-check"><Check size={11}/> 设备准备 <span>ready</span></div></div>
      <div className="phone"><div className="phone-camera"/><div className="phone-status mono">9:41 <span>▮▮▮</span></div><div className="phone-screen"><div className="phone-logo"><ScanLine size={28}/></div><span className="tiny-label">CAPTURE THE FLOW</span><div className="phone-content"><div/><div/><div/></div><div className="phone-target"><i/><i/><i/><i/><span className="target-point"/></div><div className="phone-bottom"><span className="record-dot"/><span className="mono">REC · STEP 0{step + 1}</span></div></div></div>
      <div className="recording-output"><div className="output-frame"><Play size={20}/><span className="mono">OUTPUT</span></div><div className="audio-wave" aria-hidden="true">{Array.from({length:18},(_,i)=><i key={i} style={{height: `${8 + ((i * 17) % 23)}px`}}/>)}</div><span className="tiny-label">READY TO REVIEW</span></div>
    </div>
    <div className="recording-steps">{recordingSteps.map((s,i)=>interactive?<button type="button" key={s} onClick={()=>setStep(i)} aria-pressed={i===step} className={i===step?'active':''}><span>0{i+1}</span>{s}</button>:<div key={s} className={i===step?'active':''}><span>0{i+1}</span>{s}</div>)}</div>
    {interactive&&<p className="scene-explanation" aria-live="polite">{['读取规则文档与参考材料，形成可执行的录屏要求。','执行设备操作并观察结果，区分加载等待与真实动作。','释放录制资源，交接原片，由独立队列完成后续剪辑。','校验结果与完成证据，将输出交给审核流程。'][step]}</p>}
  </div>
}

export function AuraScene() {
  return <div className="aura-scene scene-panel"><div className="preview-top mono"><span>DEARAURA / MEMORY</span><span>交互概念</span></div><div className="aura-orbit"><i/><i/><i/><span>✧</span></div><div className="aura-message"><span className="tiny-label">A CONTINUOUS CONVERSATION</span><p>每一次表达，<br/>都值得被记住。</p><div className="memory-tags"><span>偏好</span><span>愿望</span><span>日常</span></div></div><div className="memory-flow mono"><span>CONVERSATION</span><b>↔</b><span>MEMORY</span></div></div>
}

const terminalLines = [
  ['input', '$ mewcode'], ['muted', 'MiniCode / Agent Runtime'], ['input', '› 帮我分析这个项目，并修复问题'],
  ['plan', '01  读取项目上下文'], ['plan', '02  定位相关文件与工具'], ['plan', '03  提出修改并执行验证'],
  ['success', '✓ 思考 → 行动 → 观察 → 修复'],
]
export function TerminalScene({ interactive = false }: { interactive?: boolean }) {
  const [count,setCount] = useState(terminalLines.length)
  useEffect(()=>{
    if(count>=terminalLines.length)return
    const t=window.setTimeout(()=>setCount(c=>c+1),420)
    return ()=>window.clearTimeout(t)
  },[count])
  return <div className="terminal-scene scene-panel"><div className="terminal-bar"><div className="traffic-lights"><i/><i/><i/></div><span className="mono">minicode — zsh</span><Terminal size={13}/></div><div className="terminal-lines mono">{terminalLines.slice(0,count).map(([type,text],i)=><div className={type} key={i}>{text}</div>)}<span className="terminal-cursor"/></div><div className="terminal-footer"><span className="mono">REACT LOOP · MCP · MEMORY</span>{interactive?<button type="button" onClick={()=>setCount(window.matchMedia('(prefers-reduced-motion: reduce)').matches?terminalLines.length:0)}><Play size={12}/>重播示意</button>:<span>执行流程示意</span>}</div></div>
}

export function DramaScene() {
  return <div className="drama-scene scene-panel"><div className="preview-top mono"><span><Workflow size={13}/> STORY → SCREEN</span><span>产品实拍</span></div><div className="drama-screens"><img src="/assets/prod-dashboard.jpg" alt="短剧平台的项目管理界面" loading="lazy" width="1200" height="750"/><img src="/assets/prod-ai.jpg" alt="短剧平台的 AI 工作区" loading="lazy" width="1200" height="750"/></div><div className="drama-flow"><span>剧本</span><i/><span>分镜</span><i/><span>生成</span><i/><span>成片</span></div></div>
}

export function ProjectScene({ id, interactive = false }: { id: ProjectId; interactive?: boolean }) {
  if(id==='video-agent')return <RecordingScene interactive={interactive}/>
  if(id==='aura')return <AuraScene/>
  if(id==='minicode')return <TerminalScene interactive={interactive}/>
  return <DramaScene/>
}

export function ResearchMark({ second = false }: { second?: boolean }) {
  return <div className={`research-mark ${second?'second':''}`} aria-hidden="true">{Array.from({length:36},(_,i)=><span key={i} style={{'--cell':i,opacity: .1 + ((i*13)%11)/12} as CSSProperties}/>)}<Cpu size={26}/><ArrowUpRight size={14}/></div>
}

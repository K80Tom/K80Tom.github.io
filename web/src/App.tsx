import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ArrowDown, ArrowDownToLine, ArrowLeft, ArrowRight, ArrowUpRight, Award, Check, Copy, ExternalLink, FileText, Github, Menu, Moon, Pause, Play, Sun, X } from 'lucide-react'
import { certificates, honors, papers, projects, skills, type Project } from './data'
import { AgentScene, ProjectScene, ResearchMark } from './components/Scenes'
import auraContent from './content/aura.html?raw'
import minicodeContent from './content/minicode.html?raw'
import shortdramaContent from './content/shortdrama.html?raw'
import papersContent from './content/papers.html?raw'

const legacy: Record<string,string> = { aura:auraContent,minicode:minicodeContent,shortdrama:shortdramaContent }
const email = '1803554228@qq.com'
const external = { target: '_blank', rel: 'noopener noreferrer' } as const

function LinkButton({ href, children, primary = false, download = false }: { href:string;children:ReactNode;primary?:boolean;download?:boolean }) {
  return <a href={href} className={`button ${primary?'primary':''}`} {...(download?{download:true}:{})}>{children}{download?<ArrowDownToLine size={16}/>:<ArrowUpRight size={16}/>}</a>
}
function Label({ children, number }: { children:ReactNode;number?:string }) { return <div className="eyebrow mono">{number&&<span className="section-no">{number}</span>}{children}</div> }
function SectionHeading({ number, english, title, children }: { number:string;english:string;title:string;children?:ReactNode }) {
  return <div className="section-heading"><div><Label number={number}>{english}</Label><h2>{title}</h2></div>{children}</div>
}

function Header({ page }: {page:string}) {
  const [menu,setMenu]=useState(false)
  const [light,setLight]=useState(false)
  const [paused,setPaused]=useState(false)
  useEffect(()=>{
    try { const l=localStorage.getItem('portfolio-theme')==='light';setLight(l);document.documentElement.dataset.theme=l?'light':'dark'
      const p=localStorage.getItem('portfolio-motion')==='paused';setPaused(p);document.documentElement.dataset.motion=p?'paused':'running'
    } catch { /* Storage can be unavailable in private browsing. */ }
  },[])
  useEffect(()=>{
    if(!menu)return
    const onKey=(event:KeyboardEvent)=>{if(event.key==='Escape'){setMenu(false);document.getElementById('menu-toggle')?.focus()}}
    document.addEventListener('keydown',onKey);return()=>document.removeEventListener('keydown',onKey)
  },[menu])
  const toggleTheme=()=>{const next=!light;setLight(next);document.documentElement.dataset.theme=next?'light':'dark';try{localStorage.setItem('portfolio-theme',next?'light':'dark')}catch{}}
  const toggleMotion=()=>{const next=!paused;setPaused(next);document.documentElement.dataset.motion=next?'paused':'running';try{localStorage.setItem('portfolio-motion',next?'paused':'running')}catch{}}
  const nav=[['首页','/index.html','index'],['作品','/projects.html','projects'],['研究','/papers.html','papers'],['荣誉','/honors.html','honors']]
  return <header className="site-header"><div className="container nav-row">
    <a className="brand" href="/index.html" aria-label="汤林夕，返回首页"><img src="/favicon.svg" width="31" height="31" alt=""/><span>汤林夕<span className="brand-suffix mono"> / LINXI</span></span></a>
    <nav id="main-navigation" className={`main-nav ${menu?'is-open':''}`} aria-label="主导航">{nav.map(([label,href,id])=><a key={id} href={href} aria-current={page===id?'page':undefined} onClick={()=>setMenu(false)}>{label}</a>)}<a href="/index.html#about" onClick={()=>setMenu(false)}>关于</a></nav>
    <div className="nav-actions"><button className="icon-button motion-toggle" type="button" onClick={toggleMotion} aria-label={paused?'启用动效':'暂停动效'} title={paused?'启用动效':'暂停动效'}>{paused?<Play size={15}/>:<Pause size={15}/>}</button><button className="icon-button" type="button" onClick={toggleTheme} aria-label={light?'切换深色主题':'切换浅色主题'} title={light?'切换深色主题':'切换浅色主题'}>{light?<Moon size={16}/>:<Sun size={16}/>}</button><a className="nav-contact" href="mailto:1803554228@qq.com">联系我 <ArrowUpRight size={14}/></a><button className="icon-button menu-toggle" id="menu-toggle" type="button" onClick={()=>setMenu(!menu)} aria-controls="main-navigation" aria-expanded={menu} aria-label={menu?'关闭导航':'打开导航'}>{menu?<X size={20}/>:<Menu size={20}/>}</button></div>
  </div></header>
}

function Hero() {
  return <section className="hero container" aria-labelledby="hero-title"><div className="hero-copy"><div className="availability"><span className="signal"/><span className="mono">OPEN TO OPPORTUNITIES</span><span className="availability-year">2027 届</span></div><Label>AI AGENT ENGINEER</Label><h1 id="hero-title">把智能体，<br/>做成真正<span className="mint-text">可用</span><br className="hero-last-break"/>的产品<span className="title-period">.</span></h1><p className="hero-description">你好，我是汤林夕。<br/>从 Agent Runtime 到 AI Native 应用，<br className="mobile-br"/>我关注智能如何走出模型，进入真实世界。</p><div className="button-row"><LinkButton href="#work" primary>探索我的作品</LinkButton><LinkButton href="/assets/resume.pdf" download>下载简历</LinkButton></div><div className="hero-note"><span className="mono">BASED IN CHINA</span><span>工程驱动科研，科研反哺工程。</span></div></div><AgentScene/><a className="scroll-cue mono" href="#work"><ArrowDown size={14}/> SCROLL TO EXPLORE</a><span className="hero-index mono">PORTFOLIO — 2026</span></section>
}

function TrustStrip() {
  return <div className="trust-strip"><div className="container trust-inner"><span className="mono trust-label">EXPERIENCE & RESEARCH</span><div>小红书<span>XIAOHONGSHU</span></div><div>中文在线<span>CHINESEALL</span></div><div>亚信科技<span>ASIainfo</span></div><div>西南科技大学<span>SWUST · MASTER’S</span></div></div></div>
}

function ProjectCard({project:p}: {project:Project}) {
  return <a href={`/${p.id}.html`} className={`project-card ${p.color}`}><div className="project-preview"><ProjectScene id={p.id}/><span className="project-open" aria-hidden="true"><ArrowUpRight size={22}/></span></div><div className="project-card-body"><div className="project-card-top"><span className="mono project-category">{p.number} / {p.category}</span><span className="project-company">{p.company}</span></div><h3>{p.name}<ArrowUpRight size={24}/></h3><p>{p.description}</p><div className="tag-row">{p.tags.slice(0,4).map(t=><span key={t}>{t}</span>)}</div></div></a>
}
function Projects({full=false}:{full?:boolean}) {
  return <section className={`section container work-section ${full?'standalone-work':''}`} id="work"><SectionHeading number="01" english="SELECTED WORK / 2025—2026" title="让想法，有真实的着落。"><p className="section-aside">从底层框架到用户体验，<br/>四个项目，四种落地方式。</p></SectionHeading><div className="projects-grid">{projects.map(p=><ProjectCard project={p} key={p.id}/>)}</div>{!full&&<div className="section-bottom"><span className="mono">DESIGNED. BUILT. CONTINUOUSLY REFINED.</span><a className="text-link" href="/projects.html">查看完整项目索引 <ArrowRight size={16}/></a></div>}</section>
}

function About() {
  return <section className="section container about-section" id="about"><SectionHeading number="02" english="THE PERSON BEHIND THE SYSTEMS" title="好奇心是起点，交付是答案。"/><div className="about-grid"><div className="about-profile"><div className="portrait-wrap"><img src="/assets/avatar.jpg" alt="汤林夕的个人照片" width="360" height="400" loading="lazy"/><span className="portrait-caption mono">LINXI TANG / BUILDER</span></div><h3>汤林夕 <span className="mono">@K80Tom</span></h3><p>西南科技大学 · 计算机科学与技术硕士在读<br/>2024.09 — 2027.07 · 主修软件工程<br/>GPA 3.4/4.0 · 专业前 30%<br/>研究方向：图像分割模型蒸馏</p><a className="text-link" href="/assets/resume.pdf">完整简历 <ArrowDownToLine size={14}/></a></div><div className="about-story"><p className="about-lead">我喜欢把一个模糊的想法，<br/>一步步变成<span>能被使用的系统。</span></p><p>研究模型怎样变得更轻，也研究智能体怎样跑得更稳。从模型蒸馏，到工具调用、记忆管理与多智能体协作，我在意每一次技术选择如何改善最终的产品体验。</p><div className="timeline"><div className="timeline-item"><span className="timeline-dot current"/><span className="timeline-date mono">2026.09 — PRESENT</span><h4>小红书 <span>AI Native 产品研发</span></h4><p>整体负责录屏智能体；参与 DearAura 用户记忆系统、反馈业务及 iOS 交互开发。</p><a href="/video-agent.html" className="text-link">录屏智能体 <ArrowUpRight size={13}/></a><a href="/aura.html" className="text-link">DearAura <ArrowUpRight size={13}/></a></div><div className="timeline-item"><span className="timeline-dot"/><span className="timeline-date mono">2026.05 — 2026.09</span><h4>中文在线 <span>Agent 全栈研发</span></h4><p>面向短剧生产设计 Agent 工具、混合检索链路和多模态素材入库。</p></div><div className="timeline-item"><span className="timeline-dot"/><span className="timeline-date mono">2025.12 — 2026.04</span><h4>亚信科技 <span>Agent Runtime 研发</span></h4><p>独立设计 MiniCode 五层架构，探索长程上下文、工具生态与多 Agent 协作。</p></div></div></div></div></section>
}

function Skills() {
  return <section className="section capabilities-section"><div className="container"><SectionHeading number="03" english="ENGINEERING TOOLKIT" title="把能力，连接成系统。"/><div className="capabilities-grid">{skills.map(s=><article key={s.n}><div className="capability-number mono">/{s.n}</div><h3>{s.title}</h3><span className="tiny-label">{s.en}</span><div className="capability-tags">{s.items.map(t=><span key={t}>{t}</span>)}</div></article>)}</div><div className="philosophy"><span className="signal"/><p>让 AI 承担重复执行，让人专注关键判断。</p><span className="mono">MY BUILDING PHILOSOPHY</span></div></div></section>
}

function ResearchTeaser() {
  return <section className="section container" id="research"><SectionHeading number="04" english="RESEARCH & RECOGNITION" title="在实践之外，追问原理。"><a href="/papers.html" className="text-link">全部研究 <ArrowUpRight size={16}/></a></SectionHeading><div className="research-grid">{papers.map((p,i)=><a className="research-card" key={p.id} href={`/papers.html#${p.id}`}><ResearchMark second={i===1}/><div><span className="mono paper-venue">{p.venue} <span>· 第一作者 · CCF-C</span></span><h3>{p.acronym}</h3><p>{p.summary}</p><span className="paper-status">{p.status} <ArrowUpRight size={14}/></span></div></a>)}</div><a className="honor-strip" href="/honors.html"><Award size={24}/><div><h3>持续积累，也持续验证。</h3><p>研究生学业奖学金 · 电子设计竞赛 · 算法竞赛 · 专业认证</p></div><span className="text-link">荣誉与证书 <ArrowUpRight size={18}/></span></a></section>
}

function Contact() {
  const [copied,setCopied]=useState(false)
  const timer=useRef<number>()
  useEffect(()=>()=>window.clearTimeout(timer.current),[])
  const copy=async()=>{try{await navigator.clipboard.writeText(email);setCopied(true);window.clearTimeout(timer.current);timer.current=window.setTimeout(()=>setCopied(false),2000)}catch{window.location.href=`mailto:${email}`}}
  return <section className="contact-section" id="contact"><div className="container contact-inner"><Label>LET’S BUILD WHAT’S NEXT</Label><h2>下一个有意思的项目，<br/>也许<span>由我们一起完成。</span></h2><p>正在寻找 AI Agent / AI 应用研发岗位。<br/>也欢迎交流 Agent 工程、RAG 优化与模型蒸馏。</p><div className="contact-email"><a href={`mailto:${email}`}>{email}<ArrowUpRight size={27}/></a><button className="icon-button" onClick={copy} type="button" aria-label={copied?'邮箱已复制':'复制邮箱'}>{copied?<Check size={18}/>:<Copy size={18}/>}</button><span className="sr-only" aria-live="polite">{copied?'邮箱已复制':''}</span></div><div className="contact-links"><a href="https://github.com/K80Tom" {...external}><Github size={17}/>GitHub<ArrowUpRight size={13}/></a><a href="/assets/resume.pdf" download><FileText size={17}/>简历 PDF<ArrowDownToLine size={13}/></a><a href="/index.html#creator"><Play size={16}/>技术分享<ArrowUpRight size={13}/></a></div></div><div className="contact-watermark" aria-hidden="true">LET’S BUILD.</div></section>
}
function Creator() {
  return <section className="container creator" id="creator"><div className="creator-icon mono">↗</div><div><Label>LEARN. BUILD. SHARE.</Label><h3>欧皓辰我选你。<span>抖音技术分享</span></h3><p>记录 Agent 开发实战、大模型工程化与新的想法。教，是另一种学习。</p></div><div className="creator-number"><b className="mono">1,903</b><span>关注者 · 原站记录</span></div></section>
}
function Footer(){return <footer className="site-footer container"><a href="/index.html" className="footer-brand">汤林夕<span className="mono"> / AI AGENT ENGINEER</span></a><span>© 2026 · 保持好奇，持续构建。</span><a href="#top" className="mono">BACK TO TOP ↑</a></footer>}

function PageIntro({label,title,description}:{label:string;title:string;description:string}){return <div className="page-intro container"><Label>{label}</Label><h1>{title}</h1><p>{description}</p></div>}

function CaseStudy({project:p}:{project:Project}) {
  const next=projects[(projects.indexOf(p)+1)%projects.length]
  return <><section className={`case-hero container ${p.color}`}><a href="/projects.html" className="back-link"><ArrowLeft size={14}/>所有作品</a><Label>{p.number} / {p.category}</Label><h1>{p.name}<span>{p.english}</span></h1><p className="case-headline">{p.title}</p><p className="case-summary">{p.description}</p><div className="case-meta"><div><span>COMPANY</span><b>{p.company}</b></div><div><span>PERIOD</span><b>{p.period}</b></div><div><span>MY ROLE</span><b>{p.role}</b></div></div><div className="case-scene"><ProjectScene id={p.id} interactive/></div><div className="case-under"><div className="tag-row">{p.tags.map(t=><span key={t}>{t}</span>)}</div><div className="case-links">{p.links.map(l=><a href={l.url} {...external} key={l.url}>{l.title}<ExternalLink size={14}/></a>)}</div></div></section>
    <div className="case-body container"><aside className="case-toc"><span className="tiny-label">IN THIS CASE</span><a href="#decisions">设计与取舍</a><a href="#details">实现细节</a>{p.id==='video-agent'?<a href="#validation">验证与结果</a>:p.id==='minicode'?<a href="#install">快速开始</a>:p.id==='aura'?<a href="#memory">记忆系统</a>:<a href="#shots">产品实拍</a>}<a href={`/${next.id}.html`}>下一个项目 <ArrowUpRight size={13}/></a></aside><div className="case-content"><section id="decisions" className="decision-section"><Label>DESIGN DECISIONS</Label><h2>让系统可用的，<br/>是这些具体的选择。</h2>{p.points.map((point,i)=><article className="decision" key={point.title}><span className="mono">0{i+1}</span><div><h3>{point.title}</h3><p>{point.body}</p></div></article>)}</section><section id="details"><Label>UNDER THE HOOD</Label>{p.id==='video-agent'?<VideoDetails/>:<><p className="evidence-note">以下保留项目的完整功能、技术架构与原评测记录。数据对应特定项目场景，不代表所有任务的通用结果。</p><div className="legacy-content" dangerouslySetInnerHTML={{__html:legacy[p.id]}}/></>}</section>{p.id==='minicode'&&<InstallGuide/>}</div></div>
    <a className={`next-project container ${next.color}`} href={`/${next.id}.html`}><div><Label>NEXT CASE / {next.number}</Label><h2>{next.name}</h2><p>{next.title}</p></div><ArrowUpRight size={54}/></a></>
}

function VideoDetails() {
  return <div className="video-details"><h2>从需求输入到成片交付。</h2><p>用户提交录屏或剪辑规则文档，可附参考视频，并选择模板、数量与设备。录屏智能体理解要求后执行设备操作，完成原片采集，再交接独立剪辑与审核流程。</p><div className="pipeline-detail">{[['01','模板处理','规则文档 / 参考材料'],['02','手机录制','动作执行 / 状态观察'],['03','独立剪辑','原片交接 / 离线处理'],['04','结果审核','证据检查 / 成片交付']].map(([n,t,d])=><div key={n}><span className="mono">{n}</span><h3>{t}</h3><p>{d}</p></div>)}</div><h3>任务可恢复，阶段可交接</h3><p>通过持久化的任务状态串联阶段。每段处理都有清晰的进入条件、输出与交接责任；录制完成后释放设备侧执行资源，剪辑任务由独立队列接手。取消操作与执行实例绑定，避免旧执行清理掉新执行的句柄。</p><h3>上下文既要精简，也要可追溯</h3><p>稳定规则作为固定材料复用；设备画面、执行动作与观察结果作为动态信息更新。对完全重复的图片去重时保留逻辑引用，对历史动作记录进行无损压缩，让输入更紧凑，同时保留判断所需的视频帧和时间戳。</p><h3>给不确定的设备交互设置边界</h3><p>把加载等待和实际操作分开计数，为等待设置边界，并保留停止录屏的操作机会。智能体需要依据观察继续执行，也需要有明确的停止、交接和结果检查路径。</p><section id="validation"><Label>VALIDATION & OUTCOMES</Label><h2>把优化落到可检查的证据上。</h2><div className="result-card"><span className="mono">HISTORICAL REPLAY / TEXT PAYLOAD</span><div><b>43,222</b><ArrowRight size={24}/><b className="mint-text">32,397</b><span>bytes</span></div><p>指定历史回放样本中，实时动作历史文本体积减少约 25%。该结果描述历史文本字节量，不等同于整体 Token、线上成本或时延的降幅。</p></div><div className="validation-grid"><article><Check size={18}/><h3>调度契约</h3><p>针对独立队列与取消句柄隔离编写测试，检查录制和剪辑阶段的资源边界。</p></article><article><Check size={18}/><h3>动作预算</h3><p>历史回放用例区分 40 次等待和 23 次真实操作，检验等待不占用动作执行额度的规则。</p></article></div><p className="evidence-note">以上为项目实现与历史验证记录。案例中的设备画面为流程示意；线上成功率、总体吞吐和成片质量不作未经测量的量化承诺。</p></section></div>
}

function InstallGuide(){
  const [copied,setCopied]=useState<number|null>(null)
  const commands=['curl -LsSf https://astral.sh/uv/install.sh | sh','git clone https://github.com/K80Tom/MiniCode.git\ncd MiniCode\nuv sync','uv run mewcode\nuv run mewcode -p "帮我分析这个项目"\nuv run mewcode --remote']
  return <section id="install" className="install-guide"><Label>QUICK START</Label><h2>在终端里，开始一次协作。</h2><p>Python 3.11+。安装 uv，克隆项目并同步依赖，再按仓库说明在本地配置模型。</p>{commands.map((command,i)=><div className="code-block" key={command}><div><span className="mono">0{i+1} / {['INSTALL UV','SYNC PROJECT','RUN MINICODE'][i]}</span><button type="button" onClick={async()=>{try{await navigator.clipboard.writeText(command);setCopied(i)}catch{setCopied(null)}}}>{copied===i?<Check size={14}/>:<Copy size={14}/>} {copied===i?'已复制':'复制命令'}</button></div><pre><code>{command}</code></pre></div>)}<p>启动前在 <code>.mewcode/config.yaml</code> 中配置自己的模型服务；Remote 模式默认使用本地地址 <code>http://localhost:18888</code>。安装和配置以 <a href="https://github.com/K80Tom/MiniCode" {...external}>项目 README</a> 为准。</p></section>
}

function PapersPage(){
  return <><PageIntro label="RESEARCH / KNOWLEDGE DISTILLATION" title="让模型更轻，让理解更深。" description="围绕医学图像分割与知识蒸馏，探索准确性、结构表达与部署效率之间的平衡。"/><section className="container paper-index">{papers.map((p,i)=><a href={`#${p.id}`} className="paper-index-item" key={p.id}><span className="mono">0{i+1}</span><div><span className="mono">{p.venue} · {p.status}</span><h2>{p.acronym}</h2><p>{p.title}</p></div><ArrowDown size={22}/></a>)}</section><div className="container papers-full"><div className="legacy-content paper-content" dangerouslySetInnerHTML={{__html:papersContent.replace('<div class="card reveal"','<div id="cscwd" class="card reveal"').replace('<div class="card reveal">','<div id="iconip" class="card reveal">')}}/></div></>
}
function HonorsPage({openImage}:{openImage:(image:{src:string;alt:string})=>void}){
  return <><PageIntro label="HONORS & CERTIFICATES" title="每一步积累，都留下回响。" description="算法、研究、工程与语言能力，来自持续的学习和实践。"/><div className="container honors-content"><div className="honors-list">{honors.map((h,i)=><div key={h}><span className="mono">{String(i+1).padStart(2,'0')}</span><p>{h}</p><Award size={19}/></div>)}</div><SectionHeading number="/" english="CERTIFICATE ARCHIVE" title="证书档案"><p className="section-aside">点击查看原图</p></SectionHeading><div className="certificate-grid">{certificates.map(([file,label])=><button type="button" key={file} className="certificate" onClick={()=>openImage({src:`/assets/${file}`,alt:label})}><div><img src={`/assets/${file}`} alt={label} loading="lazy" width="600" height="420"/></div><span>{label}<ArrowUpRight size={17}/></span></button>)}</div></div></>
}

function Lightbox({image,onClose}:{image:{src:string;alt:string}|null;onClose:()=>void}){
  const ref=useRef<HTMLDialogElement>(null)
  useEffect(()=>{if(image){ref.current?.showModal();document.body.style.overflow='hidden'}else{ref.current?.close();document.body.style.overflow=''}return()=>{document.body.style.overflow=''}},[image])
  return <dialog ref={ref} className="lightbox" onCancel={onClose} onClick={e=>{if(e.target===e.currentTarget)onClose()}} aria-label={image?.alt||'图片预览'}><button type="button" className="lightbox-close icon-button" onClick={onClose} autoFocus aria-label="关闭图片预览"><X size={25}/></button>{image&&<figure><img src={image.src} alt={image.alt}/><figcaption>{image.alt}</figcaption></figure>}</dialog>
}

export default function App({path}:{path:string}) {
  const filename=path.replace(/\/$/,'').split('/').pop()||'index.html'
  const id=filename.replace(/\.html$/,'')
  const project=projects.find(p=>p.id===id)
  const known=project||['index','projects','papers','honors'].includes(id)
  const [image,setImage]=useState<{src:string;alt:string}|null>(null)
  useEffect(()=>{
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches||document.documentElement.dataset.motion==='paused')return
    const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){entry.target.classList.add('reveal-in');observer.unobserve(entry.target)}}},{threshold:.08})
    document.querySelectorAll('.section-heading,.project-card,.about-profile,.about-story,.capabilities-grid>article,.research-card,.honor-strip,.decision').forEach(element=>observer.observe(element))
    return()=>observer.disconnect()
  },[])
  useEffect(()=>{
    const handler=(event:MouseEvent)=>{const target=event.target as HTMLElement;const img=target.closest('.legacy-content .shot-item')?.querySelector('img');if(img){event.preventDefault();setImage({src:img.src,alt:img.alt})}}
    document.addEventListener('click',handler);return()=>document.removeEventListener('click',handler)
  },[])
  return <><a className="skip-link" href="#main">跳到主要内容</a><div id="top"/><Header page={project?'projects':id}/><main id="main">{project?<CaseStudy project={project}/>:id==='projects'?<><PageIntro label="PROJECT INDEX / 04 SELECTED CASES" title="从想法，到产品。" description="四个项目，覆盖智能体执行、长期记忆、编程框架与多智能体创作。每个案例都包含我的具体职责、技术选择和实现细节。"/><Projects full/></>:id==='papers'?<PapersPage/>:id==='honors'?<HonorsPage openImage={setImage}/>:known?<><Hero/><TrustStrip/><Projects/><About/><Skills/><ResearchTeaser/><Creator/><Contact/></>:<section className="not-found container"><Label>404 / ROUTE NOT FOUND</Label><h1>这条路径还没有被构建。</h1><p>可以从我的项目开始，找到下一段探索。</p><LinkButton href="/index.html" primary>返回首页</LinkButton></section>}</main><Footer/><Lightbox image={image} onClose={()=>setImage(null)}/></>
}

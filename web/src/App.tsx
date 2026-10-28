import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ArrowDown, ArrowDownToLine, ArrowLeft, ArrowUpRight, Award, Check, Copy, ExternalLink, FileText, Github, Menu, Moon, Pause, Play, Sun, X } from 'lucide-react'
import { certificates, honors, papers, projects, profile, skills, type Project } from './data'
import { ProjectScene, ResearchMark } from './components/Scenes'
import { CinematicHero } from './components/CinematicHero'
import ProjectShowcase from './components/ProjectShowcase'
import VideoDetails from './components/VideoDetails'
import AboutProfile from './components/AboutProfile'
import AuraDetails from './components/AuraDetails'
import MiniCodeDetails from './components/MiniCodeDetails'
import ShortdramaDetails from './components/ShortdramaDetails'
import { CaseSection, DetailCards, ResultGrid } from './components/CasePrimitives'
import papersContent from './content/papers.html?raw'

const email = profile.email
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
  const nav=[['首页','/index.html','index'],['作品','/projects.html','projects'],['关于','/about.html','about'],['研究','/papers.html','papers'],['荣誉','/honors.html','honors']]
  return <header className={`site-header${page==='projects'?' site-header-projects':''}`}><div className="container nav-row">
    <a className="brand" href="/index.html" aria-label="汤林夕，返回首页"><img src="/favicon.svg" width="31" height="31" alt=""/><span>汤林夕<span className="brand-suffix mono"> / LINXI</span></span></a>
    <nav id="main-navigation" className={`main-nav ${menu?'is-open':''}`} aria-label="主导航">{nav.map(([label,href,id])=><a key={id} href={href} aria-current={page===id?'page':undefined} onClick={()=>setMenu(false)}>{label}</a>)}</nav>
    <div className="nav-actions"><button className="icon-button motion-toggle" type="button" onClick={toggleMotion} aria-label={paused?'启用动效':'暂停动效'} title={paused?'启用动效':'暂停动效'}>{paused?<Play size={15}/>:<Pause size={15}/>}</button><button className="icon-button" type="button" onClick={toggleTheme} aria-label={light?'切换深色主题':'切换浅色主题'} title={light?'切换深色主题':'切换浅色主题'}>{light?<Moon size={16}/>:<Sun size={16}/>}</button><a className="nav-contact" href={`mailto:${email}`}>联系我 <ArrowUpRight size={14}/></a><button className="icon-button menu-toggle" id="menu-toggle" type="button" onClick={()=>setMenu(!menu)} aria-controls="main-navigation" aria-expanded={menu} aria-label={menu?'关闭导航':'打开导航'}>{menu?<X size={20}/>:<Menu size={20}/>}</button></div>
  </div></header>
}

function TrustStrip() {
  return <div className="trust-strip"><div className="container trust-inner"><span className="mono trust-label">EXPERIENCE & RESEARCH</span><div>小红书<span>XIAOHONGSHU</span></div><div>中文在线<span>CHINESEALL</span></div><div>亚信科技<span>ASIainfo</span></div><div>西南科技大学<span>SWUST · MASTER’S</span></div></div></div>
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
  return <section className="contact-section" id="contact"><div className="container contact-inner"><Label>LET’S BUILD WHAT’S NEXT</Label><h2>下一个有意思的项目，<br/>也许<span>由我们一起完成。</span></h2><p>2027 届，正在寻找 AI 应用 / AI Native 全栈 / Agent / 后端开发岗位。<br/>也欢迎交流 Agent 工程、RAG 优化与模型蒸馏。</p><div className="contact-email"><a href={`mailto:${email}`}>{email}<ArrowUpRight size={27}/></a><button className="icon-button" onClick={copy} type="button" aria-label={copied?'邮箱已复制':'复制邮箱'}>{copied?<Check size={18}/>:<Copy size={18}/>}</button><span className="sr-only" aria-live="polite">{copied?'邮箱已复制':''}</span></div><div className="contact-links"><a href="https://github.com/K80Tom" {...external}><Github size={17}/>GitHub<ArrowUpRight size={13}/></a><a href="/assets/resume.pdf" download><FileText size={17}/>简历 PDF<ArrowDownToLine size={13}/></a><a href={profile.notes} {...external}><FileText size={17}/>Java 学习笔记<ArrowUpRight size={13}/></a><a href="/about.html#creator"><Play size={16}/>技术分享<ArrowUpRight size={13}/></a></div><div className="contact-details"><a href={`tel:${profile.phone}`}>{profile.phone}</a><span>微信 · {profile.wechat}</span></div></div><div className="contact-watermark" aria-hidden="true">LET’S BUILD.</div></section>
}
function Creator() {
  return <section className="container creator" id="creator"><div className="creator-icon mono">↗</div><div><Label>LEARN. BUILD. SHARE.</Label><h3>jiujiumaoawu<span>抖音技术分享</span></h3><p>记录 Agent 开发实战、大模型工程化与新的想法。教，是另一种学习。</p></div><div className="creator-number"><b className="mono">2,000</b><span>关注者 · 当前简历记录</span></div></section>
}
function Footer(){return <footer className="site-footer container"><a href="/index.html" className="footer-brand">汤林夕<span className="mono"> / AI AGENT ENGINEER</span></a><span>© 2026 · 保持好奇，持续构建。</span><a href="#top" className="mono">BACK TO TOP ↑</a></footer>}

function PageIntro({label,title,description}:{label:string;title:string;description:string}){return <div className="page-intro container"><Label>{label}</Label><h1>{title}</h1><p>{description}</p></div>}

function AboutPage() {
  return <>
    <PageIntro label="ABOUT / LINXI TANG" title="关于我，持续构建。" description="AI 应用、Agent 与全栈开发。以工程连接想法与产品，在实践中持续学习。"/>
    <TrustStrip/><AboutProfile/><Skills/><ResearchTeaser/><Creator/><Contact/>
  </>
}

function CaseStudy({project:p}:{project:Project}) {
  const next=projects[(projects.indexOf(p)+1)%projects.length]
  return <div className={`case-study ${p.color}`}>
    <section className="case-hero container">
      <a href="/projects.html" className="back-link"><ArrowLeft size={14}/>所有作品</a>
      <div className="case-heading-grid">
        <div className="case-identity"><Label>{p.number} / {p.category}</Label><h1>{p.name}<span>{p.english}</span></h1><p className="case-headline">{p.title}</p><p className="case-summary">{p.description}</p><div className="case-quick-links">{p.links.map(l=><a href={l.url} {...external} key={l.url}>{l.title}<ExternalLink size={15}/></a>)}</div>{p.id==='shortdrama'&&<a href="#open-project" className="case-jump">跳至 OHAO 独立项目 <ArrowDown size={14}/></a>}</div>
        <div className="case-visual"><ProjectScene id={p.id}/><div className="case-visual-caption mono">{p.id==='shortdrama'?'中文在线平台界面 / PRODUCT ARCHIVE':'产品能力示意 / CONCEPT PREVIEW'}</div></div>
      </div>
      <div className="case-meta"><div><span>CONTEXT</span><b>{p.company}</b></div><div><span>PERIOD</span><b>{p.period}</b></div><div><span>MY ROLE</span><b>{p.role}</b></div></div>
      <div className="case-tags tag-row">{p.tags.map(t=><span key={t}>{t}</span>)}</div>
      <ResultGrid items={p.highlights}/>
    </section>
    <div className="case-body container">
      <aside className="case-toc"><span className="tiny-label">IN THIS CASE</span><a href="#decisions">我的工作</a><a href="#architecture">系统架构</a><a href="#workflow">执行流程</a>{p.id==='aura'&&<a href="#memory">记忆与语气</a>}{p.id==='video-agent'&&<a href="#context">上下文设计</a>}<a href="#validation">验证与结果</a>{['video-agent','aura'].includes(p.id)&&<a href="#roadmap">进展与规划</a>}{p.id==='minicode'&&<a href="#install">快速开始</a>}{p.id==='shortdrama'&&<><a className="case-toc-featured" href="#open-project">OHAO 公开项目 <ArrowUpRight size={13}/></a><a href="#shots">产品界面</a></>}<a href={`/${next.id}.html`}>下一个项目 <ArrowUpRight size={13}/></a></aside>
      <div className="case-content"><CaseSection id="decisions" eyebrow="MY CONTRIBUTION" title="我解决的具体问题。"><DetailCards items={p.points}/></CaseSection>
        {p.id==='video-agent'?<VideoDetails/>:p.id==='aura'?<AuraDetails/>:p.id==='minicode'?<MiniCodeDetails/>:<ShortdramaDetails/>}
        {p.id==='minicode'&&<InstallGuide/>}
      </div>
    </div>
    <a className={`next-project container ${next.color}`} href={`/${next.id}.html`}><div><Label>NEXT CASE / {next.number}</Label><h2>{next.name}</h2><p>{next.title}</p></div><ArrowUpRight size={54}/></a>
  </div>
}

function InstallGuide(){
  const [copied,setCopied]=useState<number|null>(null)
  const commands=['curl -LsSf https://astral.sh/uv/install.sh | sh','git clone https://github.com/K80Tom/MiniCode.git\ncd MiniCode\nuv sync','uv run mewcode\nuv run mewcode -p "帮我分析这个项目"\nuv run mewcode --remote']
  return <section id="install" className="install-guide"><Label>QUICK START</Label><h2>在终端里，开始一次协作。</h2><p>Python 3.11+。安装 uv，克隆项目并同步依赖，再按仓库说明在本地配置模型。</p>{commands.map((command,i)=><div className="code-block" key={command}><div><span className="mono">0{i+1} / {['INSTALL UV','SYNC PROJECT','RUN MINICODE'][i]}</span><button type="button" onClick={async()=>{try{await navigator.clipboard.writeText(command);setCopied(i)}catch{setCopied(null)}}}>{copied===i?<Check size={14}/>:<Copy size={14}/>} {copied===i?'已复制':'复制命令'}</button></div><pre><code>{command}</code></pre></div>)}<p>启动前在 <code>.mewcode/config.yaml</code> 中配置自己的模型服务；Remote 模式默认使用本地地址 <code>http://localhost:18888</code>。安装和配置以 <a href="https://github.com/K80Tom/MiniCode" {...external}>项目 README</a> 为准。</p></section>
}

function PapersPage(){
  return <><PageIntro label="RESEARCH / KNOWLEDGE DISTILLATION" title="让模型更轻，让理解更深。" description="围绕医学图像分割与知识蒸馏，探索准确性、结构表达与部署效率之间的平衡。"/><section className="container paper-index">{papers.map((p,i)=><a href={`#${p.id}`} className="paper-index-item" key={p.id}><span className="mono">0{i+1}</span><div><span className="mono">{p.venue} · {p.status}</span><h2>{p.acronym}</h2><p>{p.title}</p></div><ArrowDown size={22}/></a>)}</section><section className="container research-resume-highlights" aria-label="最新研究结果概要"><article><span className="eyebrow mono">CIGFD / CSCWD 2026</span><h2>90.17% → 93.53%</h2><p>Synapse Dice · +3.36 个百分点</p><small>ResNet34-UNet → ENet；学生模型保持 0.35M 参数、2.01G FLOPs。</small></article><article><span className="eyebrow mono">CIRGBD / ICONIP 2026</span><h2>83.27% → 87.44%</h2><p>FLARE Dice · +4.17 个百分点</p><small>ResNet34-UNet → ResNet18-UNet；mIoU 80.19% → 84.62%，学生模型复杂度不变。</small></article></section><div className="container papers-full"><div className="legacy-content paper-content" dangerouslySetInnerHTML={{__html:papersContent.replace('<div class="card reveal"','<div id="cscwd" class="card reveal"').replace('<div class="card reveal">','<div id="iconip" class="card reveal">')}}/></div></>
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
  const known=project||['index','projects','about','papers','honors'].includes(id)
  const [image,setImage]=useState<{src:string;alt:string}|null>(null)
  useEffect(()=>{
    const hash=window.location.hash
    if(id==='index'&&hash==='#work') window.location.replace('/projects.html#work')
    else if(['index','projects'].includes(id)&&['#about','#research','#creator','#contact'].includes(hash)) {
      window.location.replace(`/about.html${hash}`)
    }
  },[id])
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
  return <>
    <a className="skip-link" href="#main">跳到主要内容</a><div id="top"/>
    {id!=='index'&&<Header page={project?'projects':id}/>}
    <main id="main">
      {project?<CaseStudy project={project}/>
        :id==='projects'?<ProjectShowcase/>
        :id==='about'?<AboutPage/>
        :id==='papers'?<PapersPage/>
        :id==='honors'?<HonorsPage openImage={setImage}/>
        :known?<CinematicHero/>
        :<section className="not-found container"><Label>404 / ROUTE NOT FOUND</Label><h1>这条路径还没有被构建。</h1><p>可以从我的项目开始，找到下一段探索。</p><LinkButton href="/index.html" primary>返回首页</LinkButton></section>}
    </main>
    {id!=='index'&&<Footer/>}
    <Lightbox image={image} onClose={()=>setImage(null)}/>
  </>
}

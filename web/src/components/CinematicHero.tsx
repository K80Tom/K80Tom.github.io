import { useEffect, useRef, useState } from 'react'
import { ArrowDownToLine, ArrowUpRight, Menu, Moon, Pause, Play, Sun, X } from 'lucide-react'
import { Button } from './ui/button'

const videoUrl = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4'
const displayFont = "'Instrument Serif', 'Noto Serif SC', 'Songti SC', serif"
const links = [
  ['首页', '/index.html'], ['作品', '/projects.html'], ['关于', '/about.html'],
  ['研究', '/papers.html'], ['联系我', '/about.html#contact'],
]

export function CinematicHero() {
  const video = useRef<HTMLVideoElement>(null)
  const section = useRef<HTMLElement>(null)
  const [menu, setMenu] = useState(false)
  const [paused, setPaused] = useState(false)
  const [blocked, setBlocked] = useState(false)
  const [failed, setFailed] = useState(false)
  const [light, setLight] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const readPreferences = () => {
      let savedPause = false
      try {
        savedPause = localStorage.getItem('portfolio-motion') === 'paused'
        const savedLight = localStorage.getItem('portfolio-theme') === 'light'
        setLight(savedLight)
        document.documentElement.dataset.theme = savedLight ? 'light' : 'dark'
      } catch { /* Preferences remain usable when storage is disabled. */ }
      setPaused(reduced.matches || savedPause)
    }
    readPreferences()
    reduced.addEventListener('change', readPreferences)
    return () => reduced.removeEventListener('change', readPreferences)
  }, [])

  useEffect(() => {
    const element = video.current
    if (!element) return
    document.documentElement.dataset.motion = paused ? 'paused' : 'running'
    let inView = true
    let active = true
    const syncPlayback = () => {
      if (paused || document.hidden || !inView) element.pause()
      else element.play().then(() => { if (active) setBlocked(false) }).catch(() => {
        if (active && !document.hidden && inView) setBlocked(true)
      })
    }
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      syncPlayback()
    }, { threshold: 0 })
    if (section.current) observer.observe(section.current)
    document.addEventListener('visibilitychange', syncPlayback)
    syncPlayback()
    return () => {
      active = false
      observer.disconnect()
      document.removeEventListener('visibilitychange', syncPlayback)
    }
  }, [paused])

  useEffect(() => {
    if (!menu) return
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenu(false)
        document.getElementById('cinema-menu-toggle')?.focus()
      }
    }
    document.addEventListener('keydown', close)
    return () => document.removeEventListener('keydown', close)
  }, [menu])

  const toggleMotion = () => {
    const next = !(paused || blocked || failed)
    setPaused(next)
    try { localStorage.setItem('portfolio-motion', next ? 'paused' : 'running') } catch {}
    if (!next) {
      if (failed) { video.current?.load(); setFailed(false) }
      video.current?.play().then(() => setBlocked(false)).catch(() => setBlocked(true))
    }
  }
  const toggleTheme = () => {
    const next = !light
    setLight(next)
    document.documentElement.dataset.theme = next ? 'light' : 'dark'
    try { localStorage.setItem('portfolio-theme', next ? 'light' : 'dark') } catch {}
  }

  return <section ref={section} className="cinematic-hero" aria-labelledby="hero-title">
    <video ref={video} className="absolute inset-0 z-0 h-full w-full object-cover" autoPlay loop muted playsInline preload="metadata" aria-hidden="true" tabIndex={-1} onError={() => setFailed(true)}>
      <source src={videoUrl} type="video/mp4" onError={() => setFailed(true)}/>
    </video>

    <header className="cinema-header relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-8 py-6">
      <a className="cinema-brand text-3xl font-normal tracking-tight text-foreground" style={{ fontFamily: displayFont }} href="/index.html" aria-label="汤林夕，返回首页">汤林夕<span className="cinema-brand-en">Linxi Tang</span></a>
      <nav className="cinema-desktop-nav hidden items-center gap-8 md:flex" aria-label="主导航">
        {links.map(([label, href], index) => <a key={href} href={href} aria-current={index === 0 ? 'page' : undefined} className={`text-sm transition-colors hover:text-foreground ${index === 0 ? 'text-foreground' : 'text-muted-foreground'}`}>{label}</a>)}
      </nav>
      <div className="flex items-center gap-3">
        <Button asChild variant="glass" size="nav" className="cinema-nav-cta"><a href="/assets/resume.pdf" download>下载简历 <ArrowDownToLine/></a></Button>
        <Button variant="glass" size="icon" className="cinema-menu-toggle md:hidden" id="cinema-menu-toggle" aria-controls="cinema-mobile-navigation" aria-expanded={menu} aria-label={menu ? '关闭导航' : '打开导航'} onClick={() => setMenu(!menu)}>{menu ? <X/> : <Menu/>}</Button>
      </div>
      {menu && <nav id="cinema-mobile-navigation" className="cinema-mobile-nav liquid-glass" aria-label="手机导航">
        {links.map(([label, href], index) => <a key={href} href={href} aria-current={index === 0 ? 'page' : undefined} onClick={() => setMenu(false)}>{label}<ArrowUpRight size={16}/></a>)}
      </nav>}
    </header>

    <div className="cinema-copy relative z-10 flex flex-col items-center px-6 text-center">
      <p className="cinema-eyebrow animate-fade-rise">AI AGENT ENGINEER <span>/</span> OPEN TO OPPORTUNITIES</p>
      <h1 id="hero-title" className="cinema-title animate-fade-rise max-w-7xl font-normal text-foreground" style={{ fontFamily: displayFont }}>
        <span className="cinema-title-line">把<em className="not-italic text-muted-foreground">智能体，</em></span>
        <span className="cinema-title-line">做成真正<em className="not-italic text-muted-foreground">可用的产品。</em></span>
      </h1>
      <p className="cinema-description animate-fade-rise-delay mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">你好，我是汤林夕。专注 AI Agent 研发。<br/>从模型能力到产品体验，让智能走进真实世界。</p>
      <div className="cinema-ctas animate-fade-rise-delay-2 mt-12 flex flex-wrap items-center justify-center gap-6">
        <Button asChild variant="glass" size="hero"><a href="/projects.html">探索我的作品 <ArrowUpRight/></a></Button>
      </div>
    </div>

    <div className="cinema-bottom relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-8">
      <span className="cinema-location">BASED IN CHINA <span>·</span> 2027 届</span>
      <a className="cinema-scroll" href="/projects.html"><span>探索精选作品</span><ArrowUpRight size={13}/></a>
      <div className="cinema-controls flex items-center gap-2">
        <button type="button" onClick={toggleTheme} aria-label={light ? '切换深色主题' : '切换浅色主题'} title={light ? '切换深色主题' : '切换浅色主题'}>{light ? <Moon size={15}/> : <Sun size={15}/>}</button>
        <button type="button" onClick={toggleMotion} aria-label={failed ? '重试背景视频' : paused || blocked ? '启用动效' : '暂停动效'} title={failed ? '重试背景视频' : paused || blocked ? '播放背景视频' : '暂停背景视频'}>{paused || blocked || failed ? <Play size={14}/> : <Pause size={14}/>}<span>{failed ? 'RETRY' : paused || blocked ? 'PLAY' : 'PAUSE'}</span></button>
      </div>
    </div>
  </section>
}

import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '../data'

const backgroundVideo = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260429_212252_7d25a6d2-cf7f-465c-9bd1-a1496112806e.mp4'
const headlines = [
  'From skill to screen.',
  'Memory, with continuity.',
  'From prompt to proof.',
  'Stories find their screen.',
]
const kinds = ['产品流程示意', '产品概念', 'Agent Runtime', '真实产品界面']

export default function ProjectShowcase() {
  const video = useRef<HTMLVideoElement>(null)
  const cardVideos = useRef<Array<HTMLVideoElement | null>>([])
  const [videoFailed, setVideoFailed] = useState(false)

  useEffect(() => {
    const element = video.current
    if (!element) return
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const visibleCards = new Set<HTMLVideoElement>()
    const syncMotion = () => {
      const stopped = media.matches || document.documentElement.dataset.motion === 'paused'
      if (stopped) element.pause()
      else element.play().catch(() => { /* The page remains usable if autoplay is blocked. */ })
      for (const card of cardVideos.current) {
        if (!card) continue
        if (stopped || !visibleCards.has(card)) card.pause()
        else card.play().catch(() => { /* The surrounding video remains visible. */ })
      }
    }
    const observer = new MutationObserver(syncMotion)
    const visibility = new IntersectionObserver(entries => {
      for (const entry of entries) {
        const card = entry.target as HTMLVideoElement
        if (entry.isIntersecting) visibleCards.add(card)
        else visibleCards.delete(card)
      }
      syncMotion()
    }, { threshold: .35 })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-motion'] })
    cardVideos.current.forEach(card => { if (card) visibility.observe(card) })
    media.addEventListener('change', syncMotion)
    syncMotion()
    return () => { observer.disconnect(); visibility.disconnect(); media.removeEventListener('change', syncMotion); cardVideos.current.forEach(card => card?.pause()) }
  }, [])

  return <section id="work" className={'project-showcase' + (videoFailed ? ' video-unavailable' : '')}>
    <video ref={video} className="project-background-video" autoPlay loop muted playsInline preload="metadata" aria-hidden="true" tabIndex={-1} onError={() => setVideoFailed(true)}>
      <source src={backgroundVideo} type="video/mp4" />
    </video>
    <div className="project-background-wash" aria-hidden="true" />
    <div className="project-film-grain" aria-hidden="true" />

    <div className="project-showcase-inner container">
      <div className="showcase-heading">
        <div>
          <p className="eyebrow mono"><span className="showcase-signal" /> SELECTED WORK <span className="showcase-separator">/</span> 2025—2026</p>
          <h1>从想法，到产品。</h1>
        </div>
        <p className="showcase-intro">四个方向，从需求到交付的工程实践。<br />录屏、记忆、编程与短剧制作。</p>
      </div>

      <div className="project-gallery" aria-label="精选项目">
        {projects.map((project, index) => <article
          key={project.id}
          className={'project-gallery-card project-gallery-card--' + project.color}
        >
          <video ref={element => { cardVideos.current[index] = element }} className="project-gallery-video" loop muted playsInline preload="metadata" aria-hidden="true" tabIndex={-1}>
            <source src={backgroundVideo} type="video/mp4" />
          </video>
          <a className="project-gallery-hitarea" href={'/' + project.id + '.html'} aria-label={'查看' + project.name + '项目详情'} />
          <span className="project-gallery-top">
            <span className="project-gallery-headline">{headlines[index]}</span>
            <span className="project-gallery-code mono">{project.number} / {project.category}</span>
          </span>
          <span className="project-gallery-copy">
            <span className="project-gallery-english">{project.english}</span>
            <strong>{project.name}</strong>
            <span className="project-gallery-description">{project.title}</span>{project.id === 'shortdrama' && <span className="project-gallery-subproject">+ OHAO · 独立制片工作台</span>}
            <span className="project-gallery-actions">
              <span className="project-gallery-visit">查看项目 <ArrowUpRight size={16} strokeWidth={1.7} /></span>
              {project.links.map(link => <a className="project-gallery-external" key={link.url} href={link.url} title={link.title} aria-label={`${project.name}：${link.title}`} target="_blank" rel="noopener noreferrer">{link.shortTitle} <ArrowUpRight size={13} strokeWidth={1.8} /></a>)}
            </span>
          </span>
          <span className="project-gallery-bottom">
            <span className="mono">LINXI / {kinds[index]}</span>
            <span className="mono">CASE {project.number} / 04</span>
          </span>
        </article>)}
      </div>
      <div className="showcase-footer"><span className="mono">DESIGNED · BUILT · REFINED</span><span>选择项目，进入完整案例 <span aria-hidden="true">↗</span></span></div>
    </div>
  </section>
}

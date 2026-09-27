// Adapted from the Aceternity Carousel installed with @aceternity/carousel-demo.
// Source: https://ui.aceternity.com/registry/carousel.json
import { IconArrowNarrowRight } from '@tabler/icons-react'
import { useEffect, useId, useRef, useState, type KeyboardEvent, type PointerEvent, type ReactNode } from 'react'

export interface SlideData {
  title: string
  button: string
  description: string
  href: string
  cover: ReactNode
  kind: string
  category: string
  shortTitle: string
}

function Slide({ slide, index, current, total, id }: { slide: SlideData; index: number; current: number; total: number; id: string }) {
  const slideRef = useRef<HTMLLIElement>(null)
  const active = current === index
  const reset = () => {
    slideRef.current?.style.setProperty('--x', '0px')
    slideRef.current?.style.setProperty('--y', '0px')
  }
  useEffect(reset, [active])
  const move = (event: PointerEvent<HTMLLIElement>) => {
    if (!active || event.pointerType !== 'mouse' || document.documentElement.dataset.motion === 'paused' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const element = slideRef.current
    if (!element) return
    const bounds = element.getBoundingClientRect()
    element.style.setProperty('--x', `${(event.clientX - bounds.left - bounds.width / 2) / 30}px`)
    element.style.setProperty('--y', `${(event.clientY - bounds.top - bounds.height / 2) / 30}px`)
  }
  return <li ref={slideRef} className={`carousel-slide ${active ? 'is-current' : ''}`} onPointerMove={move} onPointerLeave={reset} aria-roledescription="幻灯片" aria-label={`${index + 1} / ${total}：${slide.title}`}>
    <a id={`${id}-slide-${index}`} className="carousel-card-link" href={slide.href} tabIndex={active ? 0 : -1} aria-label={`查看${slide.title}项目详情`} draggable={false}>
      <div className="carousel-artwork" aria-hidden="true">{slide.cover}</div>
      <div className="carousel-shade" aria-hidden="true"/>
      <div className="carousel-card-top"><span className="mono">{String(index + 1).padStart(2, '0')} / {slide.category}</span><span className="carousel-open-mark" aria-hidden="true">↗</span></div>
      <div className="carousel-card-copy">
        <h2>{slide.title}</h2><p>{slide.description}</p>
        <span className="carousel-visit">{slide.button}<IconArrowNarrowRight size={20}/></span>
      </div>
      <div className="carousel-card-bottom"><span>{slide.kind}</span><span className="mono">CASE STUDY / {String(index + 1).padStart(2, '0')}</span></div>
    </a>
  </li>
}

export default function Carousel({ slides }: { slides: SlideData[] }) {
  const [current, setCurrent] = useState(0)
  const root = useRef<HTMLDivElement>(null)
  const pointer = useRef<{ x: number; y: number } | null>(null)
  const suppressClick = useRef(false)
  const focusSlide = useRef(false)
  const id = useId()
  const select = (index: number) => setCurrent((index + slides.length) % slides.length)
  useEffect(() => {
    if (focusSlide.current) {
      root.current?.querySelector<HTMLAnchorElement>('.is-current .carousel-card-link')?.focus({ preventScroll: true })
      focusSlide.current = false
    }
  }, [current])
  const keyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
    event.preventDefault()
    focusSlide.current = !!(event.target as HTMLElement).closest('.carousel-card-link')
    select(event.key === 'Home' ? 0 : event.key === 'End' ? slides.length - 1 : current + (event.key === 'ArrowRight' ? 1 : -1))
  }
  const pointerDown = (event: PointerEvent<HTMLDivElement>) => {
    suppressClick.current = false
    pointer.current = event.pointerType === 'mouse' ? null : { x: event.clientX, y: event.clientY }
  }
  const pointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (!pointer.current) return
    const dx = event.clientX - pointer.current.x
    const dy = event.clientY - pointer.current.y
    pointer.current = null
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.25) {
      suppressClick.current = true
      select(current + (dx < 0 ? 1 : -1))
    }
  }
  return <div ref={root} className="project-carousel" role="region" aria-label="精选项目" aria-roledescription="轮播" onKeyDown={keyDown}>
    <div className="carousel-stage" onPointerDown={pointerDown} onPointerUp={pointerUp} onPointerCancel={() => { pointer.current = null }} onClickCapture={event => { if (suppressClick.current) { event.preventDefault(); event.stopPropagation(); suppressClick.current = false } }}>
      <ul className="carousel-track" style={{ transform: `translateX(calc(${current} * -1 * (var(--slide-size) + var(--slide-gap))))` }}>
        {slides.map((slide, index) => <Slide key={slide.href} slide={slide} index={index} current={current} total={slides.length} id={id}/>)}
      </ul>
    </div>
    <div className="carousel-controls">
      <button type="button" className="carousel-arrow" aria-label="上一个项目" onClick={() => select(current - 1)}><IconArrowNarrowRight className="previous-arrow" size={23}/></button>
      <span className="carousel-counter mono" aria-live="polite" aria-atomic="true"><b>{String(current + 1).padStart(2, '0')}</b><span>/</span>{String(slides.length).padStart(2, '0')}<span className="sr-only">，{slides[current].title}</span></span>
      <button type="button" className="carousel-arrow" aria-label="下一个项目" onClick={() => select(current + 1)}><IconArrowNarrowRight size={23}/></button>
    </div>
    <div className="carousel-index" aria-label="选择项目">
      {slides.map((slide, index) => <button type="button" key={slide.href} aria-label={`展示${slide.title}`} aria-pressed={index === current} onClick={() => select(index)}><span className="mono">0{index + 1}</span>{slide.shortTitle}</button>)}
    </div>
    <p className="carousel-hint">左右切换 · 点击项目进入详情</p>
  </div>
}

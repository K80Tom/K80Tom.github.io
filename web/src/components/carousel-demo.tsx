import Carousel, { type SlideData } from './ui/carousel'
import { AuraCover, DramaCover, MiniCodeCover, RecordingCover } from './ProjectCovers'
import { projects } from '../data'

const covers = [<RecordingCover/>, <AuraCover/>, <MiniCodeCover/>, <DramaCover/>]
const categories = ['RECORDING AGENT', 'AI COMPANION', 'AGENT RUNTIME', 'CREATIVE PLATFORM']
const shortTitles = ['录屏智能体', 'DearAura', 'MiniCode', '短剧平台']
const kinds = ['产品流程示意', '产品概念示意', '终端执行示意', '产品实拍 · 界面编排']

export default function ProjectShowcase() {
  const slides: SlideData[] = projects.map((project, index) => ({
    title: project.name,
    description: project.title,
    button: '查看项目',
    href: `/${project.id}.html`,
    cover: covers[index],
    category: categories[index],
    shortTitle: shortTitles[index],
    kind: kinds[index],
  }))
  return <section id="work" className="project-showcase">
    <div className="showcase-heading container"><div><p className="eyebrow mono">SELECTED WORK / 2025—2026</p><h1>从想法，到产品。</h1></div><p className="showcase-intro">四个项目，四种落地方式。<br/>关于智能体，也关于真实的使用体验。</p></div>
    <Carousel slides={slides}/>
    <noscript><nav className="container showcase-fallback" aria-label="所有项目">{projects.map(project => <a key={project.id} href={`/${project.id}.html`}>{project.name} ↗</a>)}</nav></noscript>
  </section>
}

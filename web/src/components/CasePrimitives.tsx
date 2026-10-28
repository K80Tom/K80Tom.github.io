import type { ReactNode } from 'react'
import { ArrowDown, ArrowUpRight, Layers3 } from 'lucide-react'

export function CaseSection({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: ReactNode }) {
  return <section id={id} className="case-section"><p className="eyebrow mono">{eyebrow}</p><h2>{title}</h2>{children}</section>
}

export function SystemDiagram({ entry, nodes, foundation }: {
  entry: string; nodes: { label: string; title: string; body: string; owned?: boolean }[]; foundation: string
}) {
  return <div className="system-diagram"><div className="system-entry"><Layers3 size={18}/><span>{entry}</span></div><div className="system-connector" aria-hidden="true"><ArrowDown size={18}/></div><div className="system-nodes">{nodes.map(node => <article key={node.label} className={node.owned ? 'system-owned' : ''}><span className="mono">{node.label}</span><h3>{node.title}</h3><p>{node.body}</p></article>)}</div><div className="system-foundation">{foundation}</div></div>
}

export function FlowSteps({ steps }: { steps: { title: string; body: string }[] }) {
  return <ol className="case-flow">{steps.map((step, i) => <li key={step.title}><span className="case-flow-number mono">{String(i + 1).padStart(2, '0')}</span><div><h3>{step.title}</h3><p>{step.body}</p></div></li>)}</ol>
}

export function ResultGrid({ items }: { items: { value: string; label: string; detail: string }[] }) {
  return <div className="case-results">{items.map(item => <article key={item.label}><p className="case-result-value">{item.value}</p><h3>{item.label}</h3><p className="case-result-detail">{item.detail}</p></article>)}</div>
}

export function DetailCards({ items }: { items: { title: string; body: string }[] }) {
  return <div className="case-detail-cards">{items.map(item => <article key={item.title}><ArrowUpRight size={17} aria-hidden="true"/><h3>{item.title}</h3><p>{item.body}</p></article>)}</div>
}

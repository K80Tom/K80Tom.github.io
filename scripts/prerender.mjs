import { readFile, writeFile } from 'node:fs/promises'
import { render } from '../.ssr/entry-server.js'

const pages = [
  ['index', '汤林夕 — AI Agent Engineer', '汤林夕的个人作品集。录屏智能体、DearAura、MiniCode 与多智能体短剧平台：把智能体做成真正可用的产品。'],
  ['projects', '作品与项目经历 — 汤林夕', '四个 AI Agent 项目的完整案例：个人职责、设计取舍、技术架构与验证记录。'],
  ['video-agent', '录屏智能体 — 汤林夕的项目案例', '整体负责录屏智能体设计与开发：独立调度、模型请求效率与设备执行可靠性。'],
  ['aura', 'DearAura · 记忆与陪伴 — 汤林夕', '用户长期记忆、会话分层压缩、SwiftUI 交互与反馈业务全栈开发。'],
  ['minicode', 'MiniCode · Agent Runtime — 汤林夕', '终端 AI 编程助手：ReAct、MCP、上下文管理、跨会话记忆与五层权限防御。'],
  ['shortdrama', 'AI 短剧生产平台 — 汤林夕', '多智能体编排、混合检索、信息充分性闸门与多模态素材入库。'],
  ['papers', '科研论文 · 知识蒸馏 — 汤林夕', 'CIGFD 与 CIRGBD：完整论文摘要、方法、实验结果、消融分析与全文 PDF。'],
  ['honors', '荣誉与证书 — 汤林夕', '研究生学业奖学金、电子设计竞赛、算法竞赛、CCF 认证与专业证书。'],
  ['404', '页面未找到 — 汤林夕', '返回汤林夕的个人作品集。'],
]
const template = await readFile('dist/index.html', 'utf8')
if (!template.includes('<!--app-html-->')) throw new Error('Missing SSR template marker')
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;')
for (const [slug, title, description] of pages) {
  const url = `https://k80tom.github.io/${slug === 'index' ? '' : slug + '.html'}`
  const metadata = `<link rel="canonical" href="${url}"/><meta property="og:type" content="website"/><meta property="og:locale" content="zh_CN"/><meta property="og:title" content="${escape(title)}"/><meta property="og:description" content="${escape(description)}"/><meta property="og:url" content="${url}"/><meta property="og:image" content="https://k80tom.github.io/assets/avatar.jpg"/><meta name="twitter:card" content="summary"/>${slug === '404' ? '<meta name="robots" content="noindex"/>' : ''}`
  const html = template.replace(/<title>.*?<\/title>/, `<title>${escape(title)}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${escape(description)}" />`)
    .replace('<!--page-meta-->', metadata)
    .replace('<!--app-html-->', render(`/${slug}.html`))
  await writeFile(`dist/${slug}.html`, html)
}
await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.filter(([slug]) => slug !== '404').map(([slug]) => `<url><loc>https://k80tom.github.io/${slug === 'index' ? '' : slug + '.html'}</loc></url>`).join('')}</urlset>`)
console.log(`Prerendered ${pages.length} pages with complete HTML content.`)

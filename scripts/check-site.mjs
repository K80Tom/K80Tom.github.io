import { readFile, readdir, access } from 'node:fs/promises'
import path from 'node:path'

const files = (await readdir('dist')).filter(file => file.endsWith('.html'))
const failures = []
let checked = 0
for (const file of files) {
  const html = await readFile(`dist/${file}`, 'utf8')
  if (!html.includes('<h1') || html.includes('<!--app-html-->')) failures.push(`${file}: missing prerendered content`)
  if (!html.includes('rel="canonical"')) failures.push(`${file}: missing canonical`)
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1])
  if (new Set(ids).size !== ids.length) failures.push(`${file}: duplicate element IDs`)
  for (const [, raw] of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    if (/^(?:https?:|mailto:|data:)/.test(raw)) continue
    const url = new URL(raw.replaceAll('&amp;', '&'), `https://portfolio.test/${file}`)
    const target = decodeURIComponent(url.pathname) === '/' ? 'index.html' : decodeURIComponent(url.pathname).slice(1)
    try {
      await access(path.join('dist', target))
      if (url.hash && target.endsWith('.html')) {
        const destination = target === file ? html : await readFile(path.join('dist', target), 'utf8')
        if (!destination.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`)) failures.push(`${file}: missing anchor ${raw}`)
      }
      checked++
    } catch { failures.push(`${file}: missing file ${raw}`) }
  }
}
const expected = ['index','projects','video-agent','aura','minicode','shortdrama','papers','honors','404']
for (const page of expected) if (!files.includes(`${page}.html`)) failures.push(`Missing page ${page}`)
const checks = {
  'projects.html': ['录屏智能体','DearAura','MiniCode','AI 短剧生产平台','id="about"','id="research"','id="creator"','id="contact"','GPA 3.4/4.0','ENGINEERING TOOLKIT','1,903'],
  'video-agent.html': ['录屏智能体整体设计与开发','43,222','32,397','等待'],
  'aura.html': ['CAS','ConversationProjection','结构化用户记忆','反馈业务后端'],
  'minicode.html': ['五层','85%','SWE-bench','uv run mewcode'],
  'shortdrama.html': ['Grill Engine','82.4%','300 条','prod-ai.jpg'],
  'papers.html': ['CIGFD','CIRGBD','消融实验','paper-cscwd.pdf','paper-iconip.pdf','<table'],
  'honors.html': ['cert-scholarship.jpg','cert-elec.jpg','cert-ccf.jpg','cert-cet6.jpg','cert-ruankao.jpg'],
}
const homepage = await readFile('dist/index.html', 'utf8')
for (const removed of ['id="work"', 'id="about"', 'id="research"', 'id="creator"', 'id="contact"', '<footer']) {
  if (homepage.includes(removed)) failures.push(`index.html: long-form content still present (${removed})`)
}
if (!homepage.includes('cinematic-hero') || !homepage.includes('href="/projects.html"')) failures.push('index.html: missing hero or portfolio entry')
for (const [file, terms] of Object.entries(checks)) {
  const html = await readFile(`dist/${file}`, 'utf8')
  for (const term of terms) if (!html.includes(term)) failures.push(`${file}: missing migrated content ${term}`)
}
if (failures.length) { console.error(failures.join('\n')); process.exit(1) }
console.log(`Verified ${files.length} pages, ${checked} local references, and content migration checkpoints.`)

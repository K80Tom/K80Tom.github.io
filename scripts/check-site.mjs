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
    if (/^(?:https?:|mailto:|tel:|data:)/.test(raw)) continue
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
const expected = ['index','projects','about','video-agent','aura','minicode','shortdrama','papers','honors','404']
for (const page of expected) if (!files.includes(`${page}.html`)) failures.push(`Missing page ${page}`)
const checks = {
  'projects.html': ['CreativeFlow','Dear Aura','MiniCode','AI 短剧生产平台','project-gallery','project-background-video','href="/video-agent.html"','href="/aura.html"','href="/minicode.html"','href="/shortdrama.html"','href="https://www.dearaura.com/apps/aura-web"','href="https://github.com/K80Tom/MiniCode"','href="https://github.com/K80Tom/frame-shortdrama-agent"','href="https://shortdrama.col.com/"'],
  'about.html': ['id="about"','id="research"','id="creator"','id="contact"','2027.06','2026.07','2026.01','2025.09','ENGINEERING TOOLKIT','2,000','重庆工程学院','Java 基础语法详解','tangxixi79@gmail.com','19922109544'],
  'video-agent.html': ['录屏快剪 Agent 设计与全栈研发','Harness²','圆周旅迹','39,806','24,679','40 / 40','正在接入','Checkpoint'],
  'aura.html': ['CAS','RedIM','1,056','BM25','方案','case-quick-links','href="https://www.dearaura.com/apps/aura-web"'],
  'minicode.html': ['85%','SWE-bench','uv run mewcode','参与分层 Runtime','case-quick-links','href="https://github.com/K80Tom/MiniCode"'],
  'shortdrama.html': ['Grill','82.4%','300 条','prod-ai.jpg','OHAO','Early Preview','NestJS','ohao-automation.png','case-quick-links','href="https://github.com/K80Tom/frame-shortdrama-agent"','href="https://shortdrama.col.com/"'],
  'papers.html': ['CIGFD','CIRGBD','消融实验','paper-cscwd.pdf','paper-iconip.pdf','93.53','87.44','<table'],
  'honors.html': ['cert-scholarship.jpg','cert-elec.jpg','cert-ccf.jpg','cert-cet6.jpg','cert-ruankao.jpg'],
}
const stale = ['1803554228@qq.com','shortdrama-main-test.col.com','zhongwen-shortdrama-main','2026.09 — 至今','2025.12 — 2026.04','专业前 30%','录屏 Agent 化是下一阶段目标','独立设计并实现五层 Agent Runtime']
for (const file of files) {
  const html = await readFile(`dist/${file}`, 'utf8')
  for (const term of stale) if (html.includes(term)) failures.push(`${file}: outdated résumé content ${term}`)
}
const notes = 'https://ccn5v9lxrtsg.feishu.cn/docx/JHnedZDmboV6XOx297Cc8Ou9ntb'
for (const file of ['index.html','about.html']) {
  const html = await readFile(`dist/${file}`, 'utf8')
  if (!html.includes(`href="${notes}"`)) failures.push(`${file}: missing requested learning notes link`)
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
const projectsPage = await readFile('dist/projects.html', 'utf8')
if ([...projectsPage.matchAll(/class="project-gallery-card\b/g)].length !== 4) failures.push('projects.html: expected four visible project cards')
if (failures.length) { console.error(failures.join('\n')); process.exit(1) }
console.log(`Verified ${files.length} pages, ${checked} local references, and content migration checkpoints.`)

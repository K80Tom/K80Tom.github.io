import { ArrowDownToLine, ArrowUpRight, BookOpen, GraduationCap } from 'lucide-react'

const experience = [
  {
    company: '小红书', department: '创意 Lab1327 研发组', role: 'AI Native 全栈开发实习生',
    date: '2026.07 — 至今', current: true,
    description: '把 AI 能力接进实际产品，覆盖服务端、管理端与移动客户端。',
    responsibilities: [
      '负责 CreativeFlow 视频创意工具下的录屏快剪 Agent 设计与全栈研发，连接 Skill、真机执行、自动剪辑与质量复核。',
      '参与 Dear Aura 对话记忆、上下文组织与日报异步链路；负责反馈信箱和公告业务的跨端闭环。',
    ],
    links: [{ label: 'CreativeFlow', href: '/video-agent.html' }, { label: 'Dear Aura', href: '/aura.html' }],
  },
  {
    company: '中文在线', department: '技术创新部门', role: 'AI 提效实习生',
    date: '2026.01 — 2026.06', current: false,
    description: '让创作素材找得到，也让生成流程更可控。',
    responsibilities: [
      '负责图片、视频、音频与 Excel 素材解析入库，以及供导演工作台和 Agent 共用的 RAG 混合检索。',
      '参与 Pi Agent 工具、生成前信息充分性检查与两阶段剧本拆解，保留确认、版本与执行边界。',
    ],
    links: [{ label: '短剧生产实践', href: '/shortdrama.html' }],
  },
  {
    company: '亚信科技', department: '技术部门', role: 'AI Agent 开发实习生',
    date: '2025.09 — 2026.01', current: false,
    description: '在数据分析场景中，让编程助手完成更长的任务。',
    responsibilities: [
      '参与移动九天数据分析场景下的 AI 编程工具研发，承担模型接入、工具扩展、上下文管理与功能验证。',
      '实现摘要归档与检查点截断，完善工具权限控制；参与多 Agent 并行执行与 Git Worktree 隔离验证。',
    ],
    links: [{ label: 'MiniCoding Agent', href: '/minicode.html' }],
  },
]

export default function AboutProfile() {
  return <section className="profile-section container" id="about" aria-labelledby="profile-heading">
    <div className="profile-section-heading">
      <p className="eyebrow mono">THE PERSON BEHIND THE SYSTEMS</p>
      <h2 id="profile-heading">好奇心是起点，交付是答案。</h2>
    </div>

    <div className="profile-layout">
      <aside className="profile-identity" aria-label="个人简介">
        <div className="profile-portrait">
          <img src="/assets/avatar.jpg" alt="汤林夕的彩色个人照片" width="360" height="450" loading="lazy" />
          <span className="mono">LINXI TANG / BUILDER</span>
        </div>
        <div className="profile-identity-copy">
          <div className="profile-name"><h3>汤林夕</h3><a href="https://github.com/K80Tom" target="_blank" rel="noopener noreferrer" className="mono">@K80Tom <ArrowUpRight size={12} /></a></div>
          <p className="profile-status"><span aria-hidden="true" />2027 届 · 寻求校招机会</p>
          <p className="profile-position">AI 应用开发 / AI Native 全栈<br />智能体开发 / 后端开发</p>
          <a className="profile-resume-link" href="/assets/resume.pdf" download>下载最新简历<ArrowDownToLine size={16} /></a>
        </div>
      </aside>

      <div className="profile-main">
        <div className="profile-introduction">
          <p className="profile-lead">从模型能力出发，<br />走到<span>真实的产品体验。</span></p>
          <p>我关注智能体怎样完成任务，也关注它如何在并发、长上下文和不确定的执行环境中保持可靠。从对话记忆、素材检索，到真机录屏与编程工具，我习惯把问题拆成可实现、可验证的工程环节。</p>
        </div>

        <div className="profile-experience-heading"><span className="mono">EXPERIENCE</span><span>三段实习，持续走近产品。</span></div>
        <ol className="profile-experience">
          {experience.map(item => <li key={item.company} className={item.current ? 'is-current' : undefined}>
            <div className="profile-experience-top"><span className="profile-date mono">{item.date}</span>{item.current && <span className="profile-current mono">CURRENT</span>}</div>
            <h3>{item.company}<span>{item.role}</span></h3>
            <p className="profile-department">{item.department}</p>
            <p className="profile-experience-summary">{item.description}</p>
            <ul>{item.responsibilities.map(text => <li key={text}>{text}</li>)}</ul>
            <div className="profile-project-links">{item.links.map(link => <a href={link.href} key={link.href}>{link.label}<ArrowUpRight size={14} /></a>)}</div>
          </li>)}
        </ol>
      </div>
    </div>

    <div className="profile-education" aria-labelledby="education-heading">
      <div className="profile-education-heading"><GraduationCap size={21} /><h3 id="education-heading">教育背景</h3><span className="mono">EDUCATION</span></div>
      <div className="profile-education-grid">
        <article>
          <div className="profile-education-top"><span className="profile-degree">硕士</span><span className="mono">2024.09 — 2027.06</span></div>
          <h4>西南科技大学<span>软件工程</span></h4>
          <div className="profile-academic-metrics"><span>GPA <b>3.5<span>/4.0</span></b></span><span>专业前 <b>20<span>%</span></b></span></div>
          <p>研究方向：医学图像分割模型蒸馏、智能体、深度学习。</p>
          <p className="profile-education-note">获四川省一等、三等学业奖学金</p>
        </article>
        <article>
          <div className="profile-education-top"><span className="profile-degree">本科</span><span className="mono">2020.09 — 2024.06</span></div>
          <h4>重庆工程学院<span>软件工程</span></h4>
          <div className="profile-academic-metrics"><span>GPA <b>3.4<span>/4.0</span></b></span><span>专业前 <b>20<span>%</span></b></span></div>
          <p>Java Web 业务开发：Spring Boot、Spring MVC、MyBatis。</p>
          <p className="profile-education-note">从业务开发，逐步走向 AI 应用工程。</p>
        </article>
      </div>
    </div>

    <a className="profile-document" href="https://ccn5v9lxrtsg.feishu.cn/docx/JHnedZDmboV6XOx297Cc8Ou9ntb" target="_blank" rel="noopener noreferrer">
      <span className="profile-document-icon"><BookOpen size={22} /></span>
      <span className="profile-document-copy"><span className="mono">LEARNING NOTES / FEISHU</span><strong>Java 基础语法详解</strong><span>从开发环境到集合与 IO，按章节整理的 Java 学习笔记。</span></span>
      <span className="profile-document-action">打开文档<ArrowUpRight size={18} /></span>
    </a>
  </section>
}

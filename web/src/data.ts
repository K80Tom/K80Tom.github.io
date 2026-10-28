export type ProjectId = 'video-agent' | 'aura' | 'minicode' | 'shortdrama'
export type Project = {
  id: ProjectId; number: string; name: string; english: string; company: string; period: string;
  category: string; title: string; description: string; role: string; tags: string[]; color: string;
  points: { title: string; body: string }[]; links: { title: string; shortTitle: string; url: string }[];
  highlights: { value: string; label: string; detail: string }[];
}

export const profile = {
  email: 'tangxixi79@gmail.com', phone: '19922109544', wechat: 'jiujiumaoawu',
  notes: 'https://ccn5v9lxrtsg.feishu.cn/docx/JHnedZDmboV6XOx297Cc8Ou9ntb',
}

export const projects: Project[] = [
  {
    id: 'video-agent', number: '01', name: 'CreativeFlow', english: 'Recording & Editing Agent', company: '小红书 · 创意 Lab1327', period: '2026.07 — 至今',
    category: 'CREATIVE AUTOMATION', title: '从产品操作，到可交付的视频。',
    description: '搜广推 AI 内容创作与投放增长平台，覆盖运营分析、图文与视频创作、素材管理、自动化投流及数据复盘。我负责视频创意工具下的录屏快剪 Agent 设计与全栈研发，把运营 Skill 与产品资料转化为真机操作、自动剪辑和可复核的推广视频。',
    role: '录屏快剪 Agent 设计与全栈研发', tags: ['Go / Gin', 'React / TypeScript', 'Android 自动化', 'FFmpeg', 'SSE'], color: 'mint',
    points: [
      { title: '让模型决策，让宿主校验与执行', body: '构建截图观察、阶段上下文、模型决策、程序校验、真机执行、回执复核循环。显式记录阶段、待确认动作、失败位置、完成证据与剩余预算，防止旧截图和未确认动作干扰决策。' },
      { title: '把一次性规则，变成可复用的产品 Pack', body: '完成 Skill 上传、结构化编译、独立复核、契约验证及版本发布的 Go 接口与 React 管理页本地实现。通过任务快照、行锁、事务和幂等处理，让执行与重试沿用冻结版本。' },
      { title: '录屏结果可复用，剪辑失败可续跑', body: '将原片、动作边界与录制证据保存为 Checkpoint，剪辑 Agent 生成 EDL，经后端校验后交给 FFmpeg。失败后保留原片，按复核证据有限次重采样、重规划或重渲染。' },
    ], links: [{ title: '业务示例 · 圆周旅迹', shortTitle: '业务示例', url: 'https://www.pitravel.cn/' }],
    highlights: [
      { value: '16 → 40 / 40', label: '固定样例阶段通过数', detail: '4 个模型各 10 次；模板、录屏、剪辑三个阶段分别统计。' },
      { value: '−38%', label: '计划与历史载荷', detail: '26 轮历史回放：39,806B → 24,679B。' },
      { value: '43 / 48', label: '等待检查本地完成', detail: '这组测试中仅 5 次需要调用模型。' },
    ],
  },
  {
    id: 'aura', number: '02', name: 'Dear Aura', english: 'Memory, with continuity', company: '小红书 · 创意 Lab1327', period: '2026.07 — 至今',
    category: 'AI NATIVE PRODUCT', title: '让陪伴有记忆，也有分寸。',
    description: '已上线 iOS / Android 的 AI 生活陪伴与自我探索应用，提供个性化聊天、好运日报与心愿日记。负责反馈信箱与公告全栈研发，并参与对话记忆、上下文组织和日报异步链路，让服务端一致性与跨端体验共同支撑连续的陪伴。',
    role: 'AI Native 全栈 · 记忆与异步调度', tags: ['Go / Thrift', 'MySQL / Redis', 'RedIM', 'SwiftUI / Android', 'Vue 3'], color: 'lavender',
    points: [
      { title: '记住发生的事，也记住时间与更正', body: '研发时间标注与原话溯源、结构化事件账本，保留主体、时间、计划与取消状态及更正关系。事件抽取移至回复后异步执行，通过只读历史工具按需回查，避免旧事件反复注入造成话题回流。' },
      { title: '让并发状态和任务归属可验证', body: 'MySQL 事务、行锁与唯一键保障消息序号及提交幂等；Redis Lua CAS 防止旧摘要覆盖新消息。日报采用双队列和独立 Worker 池，以租约、令牌和 Checkpoint 支撑接管与恢复。' },
      { title: '把反馈与公告做成完整的跨端闭环', body: '从 Go 服务端、Thrift IDL / SDK、HTTP 映射，到 Vue 管理端与 iOS / Android 客户端，打通图文反馈、官方回复、分页、未读状态、公告、Push 和 Deep Link。' },
    ], links: [{ title: '访问 Dear Aura 官网', shortTitle: '官网', url: 'https://www.dearaura.com/apps/aura-web' }],
    highlights: [
      { value: '36.5 → 99.5%', label: '时间严格合格率', detail: '44 类场景、1,056 次模型回答的离线对照。' },
      { value: '19 → 2 / 72', label: '明确及严重语气问题', detail: '24 个历史场景，v8 候选双评审合并口径。' },
      { value: '400 / 400', label: '完整消息加载', detail: '20 并发 × 20 轮本地冷缓存模拟。' },
    ],
  },
  {
    id: 'minicode', number: '03', name: 'MiniCode', english: 'A terminal coding companion', company: '亚信科技 · 技术部门', period: '2025.09 — 2026.01',
    category: 'AGENT RUNTIME / DEVELOPER TOOLS', title: '让一次任务，持续走到完成。',
    description: '面向移动九天数据分析研发场景的终端 AI 编程助手。通过自然语言生成、执行与修复脚本，将代码检索、文件编辑和命令执行组织为 ReAct 循环。我参与模型接入、工具扩展、上下文管理、权限控制及功能验证。',
    role: '模型接入 · 工具与上下文 · 功能验证', tags: ['Python', 'ReAct', 'MCP / Skill', 'JSONL', 'SWE-bench-Live'], color: 'blue',
    points: [
      { title: '长程会话需要可恢复的任务记忆', body: '参与 JSONL 持久化、记忆提取、项目指令加载与历史恢复；实现摘要归档与检查点截断，保留关键需求、文件变更与测试反馈，控制长程 ReAct 上下文累积。' },
      { title: '按需加载工具，按风险控制执行', body: '实现文件读写、代码编辑、命令执行、Glob / Grep 与 MCP 接入；完善危险命令识别、路径限制、读前检查、修改状态校验和分级确认，在百级工具场景下减少描述 Token 占用。' },
      { title: '用真实修改任务检验协作', body: '参与分层 Runtime 与模型适配，接入 OpenAI、Anthropic 及兼容接口。以 SWE-bench-Live 和信息保留测试验证循环与压缩，参与 Git Worktree 隔离的多 Agent 并行执行。' },
    ], links: [{ title: '查看 MiniCode GitHub', shortTitle: 'GitHub', url: 'https://github.com/K80Tom/MiniCode' }],
    highlights: [
      { value: '−85%', label: '工具描述 Token', detail: '百级 MCP 工具场景，采用延迟加载。' },
      { value: '8h+', label: '长会话任务追踪', detail: '摘要归档与检查点截断共同支撑。' },
      { value: '−60%', label: '跨文件重构耗时', detail: '项目测试中，相较单 Agent 执行。' },
    ],
  },
  {
    id: 'shortdrama', number: '04', name: 'AI 短剧生产平台', english: 'From script to screen', company: '中文在线 · 技术创新部门', period: '2026.01 — 2026.06',
    category: 'CREATIVE TOOLS / AGENT WORKFLOWS', title: '把创作意图，连接成制作流程。',
    description: '参与面向导演的 AI 短剧生产平台研发，主要负责多模态素材解析入库与 RAG 混合检索，并参与 Agent 工具、信息充分性检查及两阶段剧本拆解。详情页同时收录我的独立公开项目 OHAO，分别展示两个系统的架构与实现。',
    role: '素材入库与 RAG · Agent 工具与流程', tags: ['TypeScript / Python', 'React / Fastify', 'PostgreSQL / Milvus', 'Pi Agent', 'TOS'], color: 'amber',
    points: [
      { title: '先把素材变成可追溯的资产', body: '结合模板规则与模型识别解析图片、音视频和非标准 Excel，将多视图、参考图与描述绑定到资产实体。PostgreSQL 保留结构化信息与来源，TOS 存媒体，异步同步向量索引。' },
      { title: '用语义和词法共同理解创作需求', body: '面向角色、场景、道具与参考图查询，结合向量召回、jieba 与领域词典、多字段加权、元数据过滤及规则重排，为工作台和 Agent 共享检索能力。' },
      { title: '生成前检查信息，写入前确认版本', body: 'Grill 先做规则预检，再按需调用模型补全或反问。剧本拆解与结构化拆镜分两阶段，绑定原文、剧本和提示词版本，以草稿确认、事务与幂等处理控制正式写入。' },
    ], links: [{ title: '中文在线 · 在线产品', shortTitle: '在线产品', url: 'https://shortdrama.col.com/' }, { title: 'OHAO · 独立公开项目源码', shortTitle: 'OHAO 源码', url: 'https://github.com/K80Tom/frame-shortdrama-agent' }],
    highlights: [
      { value: '58.6 → 82.4%', label: '素材检索 Recall@5', detail: '中文在线平台，300 条素材查询评测。' },
      { value: '0.41 → 0.83', label: '素材检索 MRR', detail: '同一评测集，对比单路关键词检索。' },
      { value: '5', label: '受控业务工具', detail: '检索、关联、生成卡、查询与导演台指令。' },
    ],
  },
]

export const skills = [
  { n: '01', title: 'Agent 系统', en: 'THINK & ACT', items: ['Claude Code / Codex', 'ReAct', 'Agent Runtime', 'MCP', 'Multi-Agent', 'LangChain', 'LangGraph'] },
  { n: '02', title: '记忆与检索', en: 'REMEMBER & RETRIEVE', items: ['RAG 混合检索', 'Milvus', 'RRF', '上下文压缩', '长期记忆', '多模态入库'] },
  { n: '03', title: '产品工程', en: 'BUILD & SHIP', items: ['Go / Thrift RPC', 'Python', 'React', 'SwiftUI', 'MySQL / PostgreSQL', 'Redis', 'Docker / Compose'] },
  { n: '04', title: '研究与验证', en: 'MEASURE & REFINE', items: ['PyTorch', '知识蒸馏', '图像分割', '模型轻量化', 'SWE-bench', '评测驱动优化'] },
]
export const honors = [
  '四川省一等、三等学业奖学金',
  '中国研究生电子设计竞赛 · 省级三等奖（模型轻量化与嵌入式部署方向）',
  '2023 中国计算机应用技术大赛 · 全国算法精英大赛本科 B 组银奖',
  '2023「IEERA 杯」国际高校英语阅读挑战赛 · 中国区一等奖',
  'CCF 计算机软件能力认证（C/C++）',
  '大学英语六级（CET-6）',
  '软考初级程序员',
]
export const certificates = [
  ['cert-scholarship.jpg', '研究生学业奖学金'], ['cert-elec.jpg', '研究生电子设计竞赛 · 省级三等奖'],
  ['cert-ccf.jpg', 'CCF 算法能力认证 / 大赛'], ['cert-cet6.jpg', '大学英语六级（CET-6）'], ['cert-ruankao.jpg', '软考初级程序员'],
]
export const papers = [
  { id: 'cscwd', acronym: 'CIGFD', venue: 'CSCWD 2026', status: 'IEEE Xplore 收录', title: 'Lightweight Medical Image Segmentation Via Cross-Image Global Structural Filtering Distillation', summary: '用特征过滤与跨图像对比蒸馏，向轻量模型传递关键结构知识。', tags: ['特征过滤', '跨图像结构', '模型蒸馏'] },
  { id: 'iconip', acronym: 'CIRGBD', venue: 'ICONIP 2026', status: '已录用', title: 'Lightweight Medical Image Segmentation via Cross-Image Region Contrastive and Global Boundary Distillation', summary: '从区域判别与全局边界两个角度，改善轻量模型的医学图像分割。', tags: ['区域对比', '边界对齐', '轻量模型'] },
]

export type ProjectId = 'video-agent' | 'aura' | 'minicode' | 'shortdrama'
export type Project = {
  id: ProjectId; number: string; name: string; english: string; company: string; period: string;
  category: string; title: string; description: string; role: string; tags: string[]; color: string;
  points: { title: string; body: string }[]; links: { title: string; url: string }[];
}

export const projects: Project[] = [
  {
    id: 'video-agent', number: '01', name: '录屏智能体', english: 'Recording Agent', company: '小红书', period: '2026.09 — 至今',
    category: 'AGENT ENGINEERING', title: '从一份规则，到一条可交付的视频。',
    description: '面向创意生产的自动录屏与快剪工具。我整体负责录屏智能体，让规则理解、设备操作、录制与剪辑成为一条可控的执行链路。',
    role: '录屏智能体整体设计与开发', tags: ['Go', 'Multimodal Agent', 'Task Scheduling', 'Prompt Cache'], color: 'mint',
    points: [
      { title: '拆开录制与剪辑，让资源各司其职', body: '将模板处理、设备录制和离线剪辑分配到独立队列。原片与清理证据完成后，通过持久化任务状态交接，释放录制执行槽，减少不同阶段互相等待。' },
      { title: '压缩重复信息，保留执行证据', body: '分离固定材料与动态观察，复用提示词缓存，对完全相同的文档图片去重，同时保留逻辑索引、当前视频帧和时间戳证据。历史动作文本通过无损压缩减少重复传输。' },
      { title: '让等待不再挤占真实操作', body: '区分等待观察与设备动作，将加载等待从真实操作额度中分离，并预留停止录屏所需的执行机会。对加载状态进行有界观察，使执行过程有明确的预算与收尾条件。' },
    ], links: [],
  },
  {
    id: 'aura', number: '02', name: 'DearAura', english: 'A companion with memory', company: '小红书', period: '2026.09 — 至今',
    category: 'AI NATIVE PRODUCT', title: '让每一次对话，都接得上一次。',
    description: '已上线 iOS / Android 双端的 AI 生活陪伴应用。参与用户记忆系统与全栈业务开发，让长期事实、近期对话和产品交互共同支撑连续的陪伴体验。',
    role: '用户记忆系统 · 会话上下文 · 反馈业务 · iOS 交互', tags: ['Go / Thrift', 'MySQL', 'Redis', 'SwiftUI', 'LLM Memory'], color: 'lavender',
    points: [
      { title: '按需注入，而非把所有记忆都塞进上下文', body: '异步提取用户明确表达的稳定事实，结合置信度与禁记策略过滤。通过“记忆目录 → 相关引用选择 → 完整事实加载”控制上下文相关性。' },
      { title: '分层压缩，同时守住并发一致性', body: '近期原文保留细节，Episode 承接分段摘要，Rollup 汇总更早历史。软、硬双阈值协调后台与请求前压缩，通过 Redis 单键快照及 CAS 版本校验提交更新。' },
      { title: '从服务端一致性到客户端体验', body: '事务保证会话、首条消息和附件原子写入，复合唯一键与请求指纹处理重复提交。SwiftUI / MVVM 支撑反馈信箱、拆信交互、图片降采样与异步任务取消。' },
      { title: '用更轻的状态实现拆信红点', body: '用最新官方回复序号与用户拆信位置判断红点，满足异步反馈场景，避免维护逐消息已读状态；追加消息时以会话行锁分配递增序号。' },
    ], links: [{ title: '访问产品官网', url: 'https://www.dearaura.com/apps/aura-web' }],
  },
  {
    id: 'minicode', number: '03', name: 'MiniCode', english: 'A coding agent, from scratch', company: '亚信科技', period: '2025.12 — 2026.04',
    category: 'OPEN SOURCE / AGENT RUNTIME', title: '不止会写代码，更能把任务做完。',
    description: '基于 ReAct 的终端 AI 编程助手。独立设计并实现五层 Agent Runtime，让模型、工具、上下文、权限与验证形成可持续运行的编程闭环。',
    role: 'Agent Runtime 框架设计与实现', tags: ['Python', 'ReAct', 'MCP', 'Multi-Agent', 'SWE-bench'], color: 'blue',
    points: [
      { title: '长程任务中的上下文管理', body: '对历史对话与工具结果进行摘要归档，在检查点截断重置，解决 ReAct 循环累计缓存读取量增长的问题；结合 JSONL 持久化与跨会话记忆恢复任务。' },
      { title: '更少的无效打断，清晰的权限边界', body: '危险命令识别、路径沙箱、读前检查、文件修改状态校验与分级确认组成五层防御。按需加载 MCP 工具描述，为真正的任务上下文留出空间。' },
      { title: '并行协作与评测驱动迭代', body: '以 Git WorkTree 隔离并行任务文件，结合 SWE-bench-Live 编程任务与信息保留测试，验证定位、修改、修复和上下文压缩能力。' },
    ], links: [{ title: '查看 GitHub 源码', url: 'https://github.com/K80Tom/MiniCode' }],
  },
  {
    id: 'shortdrama', number: '04', name: 'AI 短剧生产平台', english: 'From script to screen', company: '中文在线', period: '2026.05 — 2026.09',
    category: 'MULTI-AGENT / CREATIVE TOOLS', title: '把创作流程，连接成生产链路。',
    description: '围绕剧本拆解、素材匹配、分镜与生成编排构建多智能体平台。我负责 Agent 工具、信息充分性闸门、混合检索和多模态素材入库。',
    role: 'Agent 助手架构 · 混合检索 · 素材入库', tags: ['TypeScript', 'Python', 'Milvus', 'React', 'AgentKit'], color: 'amber',
    points: [
      { title: '让短文本素材检索更贴近创作意图', body: '基于 jieba、领域词典和多字段加权构建词法召回，结合 HNSW 向量召回、RRF 融合及规则重排。在 300 条素材查询评测集上比较检索效果。' },
      { title: '在生成之前，确认信息是否充分', body: 'Grill Engine 通过规则预检、LLM 语义评估、候选或反问降级处理信息不完整的请求；拆解草稿与生产确认分离，明确自动化执行边界。' },
      { title: '让多模态内容成为可检索资产', body: '通过模板规则与模型识别解析 Excel 图文资产，使用 ASR、视频理解、FFmpeg 抽帧和镜头切分为音视频建立时间戳、关键帧与标签索引。' },
    ], links: [{ title: '查看项目仓库', url: 'https://github.com/K80Tom/zhongwen-shortdrama-main' }, { title: '原测试环境（需访问权限）', url: 'http://shortdrama-main-test.col.com/' }],
  },
]

export const skills = [
  { n: '01', title: 'Agent 系统', en: 'THINK & ACT', items: ['ReAct', 'Agent Runtime', 'MCP', 'Multi-Agent', 'LangChain', 'LangGraph'] },
  { n: '02', title: '记忆与检索', en: 'REMEMBER & RETRIEVE', items: ['RAG 混合检索', 'Milvus', 'RRF', '上下文压缩', '长期记忆', '多模态入库'] },
  { n: '03', title: '产品工程', en: 'BUILD & SHIP', items: ['Go / Thrift RPC', 'Python / FastAPI', 'React', 'SwiftUI', 'MySQL / PostgreSQL', 'Redis', 'Docker / K8s'] },
  { n: '04', title: '研究与验证', en: 'MEASURE & REFINE', items: ['PyTorch', '知识蒸馏', '图像分割', '模型轻量化', 'SWE-bench', '评测驱动优化'] },
]
export const honors = [
  '研究生学业奖学金',
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

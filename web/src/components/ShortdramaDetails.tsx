import { ArrowUpRight, ChevronDown, ExternalLink, GitBranch } from 'lucide-react'
import { CaseSection, DetailCards, FlowSteps, ResultGrid, SystemDiagram } from './CasePrimitives'

const ohaoRepository = 'https://github.com/K80Tom/frame-shortdrama-agent'
const ohaoImplementation = `${ohaoRepository}/blob/main/shortdrama-agent-lab/docs/OHAO全流程自动制片实现-v0.1.md`
const ohaoMedia = 'https://raw.githubusercontent.com/K80Tom/frame-shortdrama-agent/main/shortdrama-agent-lab/docs/media'

const responsibilities = [
  {
    title: '多模态素材解析入库',
    body: '负责图片、视频、音频及 Excel 素材解析。对非标准 Excel 图文混合资产，结合模板规则与模型识别，将多视图图片、参考图和描述绑定到对应实体；PostgreSQL 保存结构化资产与来源，TOS 保存媒体，向量索引异步同步。',
  },
  {
    title: 'RAG 检索增强与混合召回',
    body: '为导演工作台与 Agent 素材问答提供共用检索能力。围绕角色、场景、道具和短文本查询，组合向量语义召回与定制词法召回，引入 jieba、领域词典、多字段加权及元数据过滤，迭代融合排序和规则重排。',
  },
  {
    title: 'Agent 工具与会话链路',
    body: '参与 Pi Agent 助手研发，将素材检索、项目资产关联、生成卡准备、任务查询和导演台指令封装为 5 个受控业务工具。通过输入输出约束、操作权限、会话管理、SSE 事件及审计记录，连接“找素材 → 选参考 → 准备生成”。',
  },
  {
    title: 'Grill 信息充分性检查',
    body: '设计并实现生成准备前的检查流程：规则预检 → 模型语义评估 → 候选补全或反问。先用程序确认素材、参数和创作要求是否齐全，必要时再调用模型判断语义，引导用户补齐缺失信息。',
  },
  {
    title: '两阶段剧本拆解',
    body: '参与“Agent 多工具拆解 → 固定 Skill 结构化拆镜”流水线。先用 7 类业务工具提取梗概、场次及角色、场景、道具、服装、音频候选，再生成分镜细节、时长和视频提示词；以原文引用、结构校验与草稿确认控制正式写入。',
  },
]

const enterpriseFlow = [
  { title: '整理素材与来源', body: '接收图片、视频、音频与 Excel，解析媒体和文本的对应关系，将参考图、多视图及描述绑定到资产实体。' },
  { title: '入库并建立检索索引', body: '结构化资产与来源写入 PostgreSQL，媒体保存至 TOS；异步同步向量索引，供工作台和 Agent 共用。' },
  { title: '混合召回与选取参考', body: '查询同时进入语义召回与领域词法召回，结合元数据过滤、融合排序和规则重排，返回可关联到项目的参考资产。' },
  { title: '检查生成准备是否充分', body: 'Grill 先做规则检查，再按需进行语义判断。缺少素材、参数或创作信息时，提供候选或继续反问。' },
  { title: '拆解剧本并确认草稿', body: 'Agent 提取场次和资产候选，固定 Skill 生成结构化分镜；绑定剧本版本、提示词版本和原文引用，由用户确认草稿。' },
  { title: '准备生成卡与提交任务', body: '受控工具准备生成卡，实际付费提交经过业务后端确认与额度校验；任务查询与 SSE 事件返回执行状态。' },
]

const ohaoFlow = [
  { title: '输入与生产预检', body: '冻结项目、剧本版本、画幅、目标时长、生产策略与本次运行的预算授权。' },
  { title: '剧本拆解', body: '提取人物、地点、道具和对白事实，经过确定性检查，由用户或 Agent 采用候选版本。' },
  { title: '资产匹配与补齐', body: '按名称和别名匹配资产；歧义停下确认，真正缺失的资产才进入生成与入库流程。' },
  { title: '分镜设计', body: '生成并检查镜号、引用、对白覆盖及顺序，采用后展开每个镜头的生产任务。' },
  { title: '3D 导演预演', body: '按规则为需要的镜头建立白模，将机位、焦距、运镜和站位转为文字构图约束。' },
  { title: '多候选视频生成', body: '绑定有序参考图片与构图约束，生成多个带供应商原生音轨的镜头候选，再安全下载到本地。' },
  { title: '候选抽卡与选优', body: '仅接收已入库的本地 MP4，用画幅、分辨率和音轨等指标形成技术推荐，或等待人工选择。' },
  { title: '镜头技术复核', body: '检查文件、哈希、画幅、时长与音轨；失败时在限次内重新生成受影响镜头，并带入失败项。' },
  { title: '时间线合成', body: '按采用后的分镜顺序读取已选本地视频，由 FFmpeg 合成整集 MP4，保留不可变时间线清单。' },
  { title: '成片校验与交付', body: '重新核验本地成片和冻结的目标时长。校验通过才形成可下载交付，失败则停在具体问题上。' },
]

const enterpriseShots = [
  { src: '/assets/prod-landing.jpg', title: '平台入口', width: 1280, height: 716 },
  { src: '/assets/prod-dashboard.jpg', title: '项目管理', width: 1280, height: 633 },
  { src: '/assets/prod-assets.jpg', title: '资产中心', width: 1280, height: 633 },
  { src: '/assets/prod-ai.jpg', title: 'AI 工作区', width: 1280, height: 633 },
]

export default function ShortdramaDetails() {
  return <div className="case-details shortdrama-details">
    <div className="case-context">
      <div>
        <span className="eyebrow mono">CHINESE ONLINE / 2026.01 — 2026.06</span>
        <h2>让素材可复用，让生成准备有依据。</h2>
        <p>在中文在线技术创新部门，我参与 AI 短剧智能体生产平台研发，主要负责多模态素材解析入库与 RAG 混合检索，并参与 Agent 工具和剧本拆解流程。平台帮助导演通过工作台或自然语言，完成从查找素材到准备生成的工作。</p>
      </div>
      <a className="case-source-link" href="https://shortdrama.col.com/" target="_blank" rel="noopener noreferrer">访问中文在线产品 <ArrowUpRight size={17} /></a>
    </div>

    <CaseSection id="architecture" eyebrow="01 / PLATFORM ARCHITECTURE" title="工作台、Agent 与素材服务，共用一套业务能力。">
      <p className="case-lead">React 工作台承接创作操作，Fastify 后端管理项目和任务。Agent 与 CLI 通过受控接口使用业务能力；我重点建设素材入库、检索与生成准备环节。</p>
      <SystemDiagram
        entry="导演工作台 / 自然语言对话 / CLI → React 界面与 Fastify 业务后端"
        nodes={[
          { label: 'INGESTION', title: '多模态素材入库', body: '媒体与 Excel 解析、实体绑定、来源记录、异步索引', owned: true },
          { label: 'RETRIEVAL', title: '共用混合检索', body: '向量语义召回、领域词法召回、过滤、融合与重排', owned: true },
          { label: 'PREPARATION', title: '生成准备', body: 'Grill 信息检查、参考资产选择、受控生成卡准备', owned: true },
          { label: 'AGENT & WORKFLOW', title: 'Agent 与拆解流程', body: 'Pi Agent 业务工具、两阶段拆镜、确认与任务查询' },
        ]}
        foundation="PostgreSQL：项目 / 资产 / 任务 · Milvus：语义索引 · TOS：媒体 · SSE：状态事件 · 审计与版本追溯"
      />
      <DetailCards items={responsibilities} />
    </CaseSection>

    <CaseSection id="workflow" eyebrow="02 / FROM ASSETS TO GENERATION" title="从素材入库，到可确认的生成准备。">
      <FlowSteps steps={enterpriseFlow} />
      <DetailCards items={[
        { title: '调用额度落在运行时', body: '单次请求最多调用 4 次工具、最多准备 1 张生成卡，设置 90 秒超时。生成卡准备与付费任务提交分离，实际生成由业务后端确认并校验额度。' },
        { title: '正式数据来自确认过的草稿', body: '拆解结果绑定剧本版本、提示词版本与候选来源。规则变化后拒绝旧版本继续执行；草稿和正式数据分离，以确认事务与幂等处理避免重复写入和过期结果落库。' },
      ]} />
    </CaseSection>

    <CaseSection id="validation" eyebrow="03 / RETRIEVAL EVALUATION" title="检索效果，放回具体评测里看。">
      <ResultGrid items={[
        { value: '58.6% → 82.4%', label: 'Recall@5', detail: '在前 5 条结果中召回所需素材的表现。对比基线为单路关键词检索。' },
        { value: '0.41 → 0.83', label: 'MRR', detail: '衡量首个相关结果的排序位置；混合召回与排序改进后提升。' },
        { value: '300 条', label: '素材查询评测', detail: '覆盖角色、场景、道具及分镜参考图等查询场景。' },
      ]} />
      <p className="case-note">以上为中文在线实习项目此前的素材查询评测，来自当前简历记录；它衡量这一评测集上的检索表现，不等同于全量线上效果，也不是下方 OHAO 项目的测评结果。</p>
    </CaseSection>

    <CaseSection id="open-project" eyebrow="04 / INDEPENDENT PROJECT · EARLY PREVIEW" title="OHAO，把整集制作接成可恢复的流程。">
      <p className="case-lead">OHAO 是同领域的独立公开项目，定位为面向中文短剧的本地 AI 制片工作台。它将剧本拆解、资产、分镜、镜头生成、技术复核和合片组织为一次持久化生产运行；当前入口是仓库中的 <code>shortdrama-agent-lab/</code>。</p>
      <p className="case-note">这是独立产品展示。它不依赖中文在线旧平台的 API、数据库、账号或部署环境；上方企业项目的职责、日期与检索指标不移作 OHAO 的成果。</p>
      <div className="case-links">
        <a className="case-source-link" href={ohaoRepository} target="_blank" rel="noopener noreferrer"><GitBranch size={17} /> 查看 OHAO 公开源码 <ArrowUpRight size={16} /></a>
        <a className="case-source-link" href={ohaoImplementation} target="_blank" rel="noopener noreferrer">实现说明 <ExternalLink size={16} /></a>
        <a className="case-source-link" href={`${ohaoMedia}/product-tour.mp4`} target="_blank" rel="noopener noreferrer">界面导览 <ArrowUpRight size={16} /></a>
      </div>

      <figure className="case-feature-shot">
        <a href={`${ohaoMedia}/automation.png`} target="_blank" rel="noopener noreferrer" aria-label="打开 OHAO 自动制作总控截图">
          <img src="/assets/ohao-automation.png" alt="OHAO 自动制作总控：左侧设置项目、剧本版本、画幅、策略与预算，右侧查看整集生产计划" width="1440" height="1024" loading="lazy" decoding="async" />
        </a>
        <figcaption>OHAO 当前公开仓库中的真实界面截图 · 自动制作总控。界面导览展示产品页面，不代表已完成的真实模型生成成片。</figcaption>
      </figure>

      <h3 className="case-subtitle">围绕一次生产运行，保存状态与决定。</h3>
      <SystemDiagram
        entry="React + Vite 工作台 → NestJS + Fastify 本机 API → 整集生产总控"
        nodes={[
          { label: 'PLANNING', title: '文本与资产', body: 'Pi Agent Core 拆解与分镜；图片、视频模型按用途接入' },
          { label: 'ORCHESTRATION', title: '十阶段 DAG', body: '固定输入、镜头子任务、检查点、预算门与局部重试' },
          { label: 'DIRECTOR', title: 'Three.js 导演台', body: '手工摆场与规则式白模；转成文字构图约束' },
          { label: 'MEDIA', title: '本地媒体与交付', body: 'SHA-256 / ffprobe 校验，FFmpeg 时间线合片' },
        ]}
        foundation="PostgreSQL 保存运行 / 任务 / 尝试 / 候选 / 预算 / 人工决定 · 幂等创建 · CAS 更新 · 事务 outbox"
      />

      <details className="case-disclosure" open>
        <summary><span>十阶段执行流程</span><ChevronDown size={18} /></summary>
        <FlowSteps steps={ohaoFlow} />
      </details>

      <h3 className="case-subtitle">可以停下来，也能从原位置继续。</h3>
      <DetailCards items={[
        { title: '三种运行模式', body: '全自动采用通过检查的文本候选和技术推荐视频；关键节点确认在核心阶段停下；共同导演逐阶段确认。预算不足、输入歧义或外部任务未知时，所有模式都保留阻断。' },
        { title: '持久化与局部返修', body: '运行与任务写入 PostgreSQL，服务重启后按状态恢复。返修只使受影响的下游结果失效，保留既有记录；未知付费任务查询原任务，避免再次提交。' },
        { title: '运行预算与媒体证据', body: '调用前预留预算，额度不足暂停；当前以配置估算控制运行预算，不等同于供应商最终账单。视频安全下载到本地，校验哈希与媒体信息后才进入合片。' },
      ]} />

      <details className="case-disclosure">
        <summary><span>当前实现范围与下一步</span><ChevronDown size={18} /></summary>
        <DetailCards items={[
          { title: '已实现：本地整集生产总控', body: '公开代码已包含十阶段 DAG、任务与预算状态、文本拆解、资产匹配、分镜、多候选视频适配、技术复核、有限返修、合片和交付。真实生成需要本机模型连接与每次运行的明确预算授权。' },
          { title: '技术复核的范围', body: '当前检查容器、哈希、画幅、时长与音轨，读取分辨率参与评分；尚不能自动确认人物、动作、剧情、表演与镜头连续性，成片仍需人工观看。' },
          { title: '3D 与声音的范围', body: '自动白模由明确规则生成，以 prompt-only 文字约束参与视频生成，尚未传入 3D 渲染图或原生相机参数。声音使用视频供应商音轨，未包含独立配音、口型、配乐、混音及字幕子流程。' },
          { title: 'Early Preview', body: '当前为本地单机产品，未提供公开在线演示站；分布式调度、对象存储/CDN、多用户权限与供应商最终账单回填尚未实现。离线测试或界面导览不等于真实模型全链路质量验收。' },
        ]} />
      </details>
      <p className="case-note">本部分依据公开仓库 README、生产编排源码及《OHAO 全流程自动制片实现 v0.1》（2026-10-23）整理。源码与文档入口可直接访问。</p>
    </CaseSection>

    <CaseSection id="shots" eyebrow="05 / ENTERPRISE PRODUCT ARCHIVE" title="中文在线平台界面。">
      <details className="case-disclosure">
        <summary><span>展开原有平台截图 · 4 张</span><ChevronDown size={18} /></summary>
        <p className="case-note">保留此前展示的企业平台界面，与上方独立产品 OHAO 分开展示。点击图片可查看原图。</p>
        <div className="case-gallery">
          {enterpriseShots.map(shot => <figure key={shot.src}>
            <a href={shot.src} target="_blank" rel="noopener noreferrer" aria-label={`查看中文在线${shot.title}原图`}>
              <img src={shot.src} alt={`中文在线 AI 短剧平台：${shot.title}`} width={shot.width} height={shot.height} loading="lazy" decoding="async" />
            </a>
            <figcaption>{shot.title}</figcaption>
          </figure>)}
        </div>
      </details>
    </CaseSection>
  </div>
}

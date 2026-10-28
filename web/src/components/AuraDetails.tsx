import { CaseSection, DetailCards, FlowSteps, ResultGrid, SystemDiagram } from './CasePrimitives'

export default function AuraDetails() {
  return <>
    <CaseSection id="architecture" eyebrow="PRODUCT & ARCHITECTURE" title="一段连续的陪伴，背后是完整的产品系统。">
      <p className="case-lead">Dear Aura 是已上线 iOS / Android 的 AI 生活陪伴与自我探索应用，提供个性化聊天、好运日报和心愿日记。我负责反馈信箱、公告等全栈业务，并参与对话记忆、上下文组织与日报异步链路研发。</p>
      <SystemDiagram
        entry="个性化聊天 · 好运日报 · 心愿日记 · 用户反馈与运营公告"
        nodes={[
          { label: 'CLIENTS', title: '原生移动端', body: 'iOS SwiftUI / MVVM 与 Android 客户端，承接会话、反馈、未读提醒及 Push / Deep Link 跳转。' },
          { label: 'OPERATIONS', title: 'Vue 运营管理端', body: 'Vue 3 / TypeScript 管理反馈、官方回复和公告，与客户端共享服务端业务契约。', owned: true },
          { label: 'SERVICES', title: 'Go 业务服务', body: 'Thrift IDL / SDK、HTTP 映射与内部 RPC 连接业务模块，事务与幂等校验维护写入一致性。', owned: true },
          { label: 'AI & ASYNC', title: '对话与异步任务', body: '主模型与 Sidecar 组织本轮回答；上下文压缩、事件抽取和日报任务按各自链路执行。' },
        ]}
        foundation="MySQL / GORM：业务持久化 ｜ RedIM：原始消息 ｜ Redis：会话投影、队列与租约 ｜ Apollo：配置"
      />
      <p className="evidence-note">架构图展示产品整体协作关系。个人工作集中在跨端业务闭环、会话记忆与并发一致性，以及日报异步任务；平台已有基础设施与其他产品功能由团队共同建设。</p>
    </CaseSection>

    <CaseSection id="workflow" eyebrow="END-TO-END EXPERIENCE" title="回答、反馈、后台任务，各自有清晰的完成边界。">
      <FlowSteps steps={[
        { title: '恢复本轮需要的会话', body: '以 RedIM 原始消息为事实来源，加载 Redis 会话投影。缓存失效时用会话级租约锁合并回源重建，由持有者校验决定谁能提交结果。' },
        { title: '按预算组织上下文', body: '近期原文保留细节，Episode / Rollup 承接较早历史。摘要通过 Lua CAS 校验版本，写入屏障阻止旧记忆回填，避免压缩结果覆盖新消息。' },
        { title: '按需回查，再完成回答', body: '主模型结合现有 Sidecar 判断是否需要历史信息；只读工具按预算返回当前会话的时间原文与事件卡，仅用于本轮续答，不写回持久工作状态。' },
        { title: '回复完成后，再抽取事件', body: '将结构化事件抽取移到回复之后异步执行，保留事件主体、发生时间、计划或取消状态及更正关系，让事件整理不阻塞首轮回答。' },
      ]} />
      <DetailCards items={[
        { title: '反馈信箱与公告：从用户提交到官方回复', body: '负责 Go 后端、Thrift IDL / SDK、HTTP 接口映射、Vue 管理端及 iOS / Android 客户端，完成图文反馈、消息分页、官方回复、已读未读、运营公告与通知跳转。结合 Proxyman 抓包和服务日志定位接口契约、环境配置与跨端状态问题。' },
        { title: '先把消息写对，再发通知', body: '用 MySQL 事务、行锁和复合唯一键保障消息序号分配与重复提交幂等，以快照分页、已读水位维护列表和红点。消息提交与通知发送分开处理，通知失败不会回滚已提交消息。' },
        { title: '日报双队列：隔离即时请求与预生成', body: '参与即时请求、后台预生成双队列及独立 Worker 池研发。Lua 原子抢占、租约续期和令牌校验支持超时接管，拒绝失去任务归属的旧 Worker 续期或提交。' },
        { title: '让中断恢复有据可依', body: '日报链路结合 Checkpoint 与有限重试复用已完成阶段，减少任务中断后的重复生成。任务归属、完成状态与可恢复阶段由程序维护，不依赖旧 Worker 对当前状态的判断。' },
      ]} />
    </CaseSection>

    <CaseSection id="memory" eyebrow="MEMORY & CONVERSATION QUALITY" title="记住发生过什么，也尊重用户此刻的表达。">
      <DetailCards items={[
        { title: 'A：时间标注与原话溯源', body: '保留会话时间信息和原始表达，让模型区分“当时发生”“现在计划”和“后来更正”。追溯依据来自用户原话，避免把助手历史推断当成用户事实。' },
        { title: 'B：结构化事件账本', body: '记录事件主体、发生时间、计划 / 取消状态与更正关系。抽取在回复后异步进行，历史事件通过只读工具按需查询，减少旧话题被反复注入后重新带回当前对话。' },
        { title: '压缩服务于连续对话', body: '近期原文、Episode 和 Rollup 按 Token 预算组织。取消压缩入口对事件账本的直接注入，时间原文与事件卡仅在本轮需要时加载，防止摘要把无关历史固化为持续影响回答的状态。' },
        { title: '语气约束与事实归因一起调整', body: '针对刻薄回复、动机臆测和重复说教，联合调整人格提示、系统语气边界与本轮回答约束；区分用户原话、工具事实和助手推断，落实最新纠正优先、用户拒绝后停止推进。复用主模型与 Sidecar，不新增独立语气分类或生成后改写调用。' },
      ]} />
    </CaseSection>

    <CaseSection id="validation" eyebrow="EVALUATION & ENGINEERING EVIDENCE" title="用明确的评测范围，解释每一次改进。">
      <ResultGrid items={[
        { value: '66.7% → 91.7%', label: '事件完整正确率', detail: '时间记忆离线对照覆盖 44 类场景、1,056 次模型回答；时间严格合格率同时由 36.5% 提升至 99.5%。' },
        { value: '19/72 → 2/72', label: '明确及严重语气问题', detail: '24 个历史场景、72 条 BETA 模型回放；已完成双评审的 v8 候选从 26.4% 降至 2.8%，下降 23.6 个百分点。' },
        { value: '400 / 400', label: '冷缓存模拟中的完整加载', detail: '20 并发 × 20 轮本地模拟测试，400 次加载全部返回完整消息；每轮仅触发 1 次重建，累计 20 次。' },
      ]} />
      <DetailCards items={[
        { title: '回复速度与事件质量的取舍', body: '未优化、A、同步 A+B、异步 A+B 四组离线回复均时分别为 0.86 / 0.95 / 1.81 / 0.96 秒。异步较同步降低约 47%，时间合格率持平，事件指标低 2.1 个百分点；异步抽取耗时另计，不包含在回复均时中。' },
        { title: '回归与评审口径', body: '既有时间记忆方案完成个人泳道自测，并协同专职 QA 开展硬压缩回归。语气问题采用两位评审问题集合的合并口径；v8 是已完成该轮评审的候选版本。缓存结果来自本地冷缓存模拟，用于验证并发控制和消息完整性。' },
      ]} />
      <p className="evidence-note">这些数据对应上述离线样例、候选版本回放和本地并发测试，用于评估方案取舍；不能直接推算线上全量会话的成功率、时延或用户满意度。</p>
    </CaseSection>

    <CaseSection id="roadmap" eyebrow="DESIGN PROPOSAL / LONG-TERM MEMORY" title="下一步：让长期记忆可治理、可纠正。">
      <p className="case-lead">针对固定注入最近记忆、同义 Key 重复和旧事实误覆盖，设计分层长期记忆治理方案。以下是方案设计与规划，尚不作为已实现能力展示。</p>
      <SystemDiagram
        entry="方案设计：核心画像受控字段 + 长期事实混合检索 + 时间事件独立读取"
        nodes={[
          { label: 'IDENTITY', title: '规范事实身份', body: '统一主体与标准 Key；将新增、确认、替换、合并、撤回作为显式状态变更，保留可纠正的事实关系。' },
          { label: 'LIFECYCLE', title: '按类别管理时效', body: '稳定资料不自动衰减；阶段性目标与状态到期校验；偏好与习惯降低召回权重；历史经历保留并支持明确回查。' },
          { label: 'RETRIEVAL', title: '按需选择相关事实', body: '规划 BM25 / 向量召回、RRF 融合与有效状态复核，结合相关性与 Token 预算组织本轮记忆。' },
          { label: 'CONSISTENCY', title: '保障索引一致性', body: '设计事务 Outbox 与版本校验，连接事实写入和检索索引更新，防止旧版本重新覆盖有效记忆。' },
        ]}
        foundation="阶段说明：长期记忆治理为方案设计；前述时间记忆、只读回查及并发控制按各自验证范围展示。"
      />
    </CaseSection>
  </>
}

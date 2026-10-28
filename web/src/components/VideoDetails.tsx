import { CaseSection, DetailCards, FlowSteps, ResultGrid, SystemDiagram } from './CasePrimitives'

export default function VideoDetails() {
  return <>
    <CaseSection id="architecture" eyebrow="01 / SYSTEM ARCHITECTURE" title="把产品规则、决策与设备执行分开。">
      <p className="case-lead">CreativeFlow 连接内容创作与投放增长；我的工作集中在视频创意中的录屏与快剪链路。近期以 Harness² 的受控自进化思路推进架构演进，让新的产品接入不再依赖改写 Worker。</p>
      <SystemDiagram entry="CreativeFlow · 运营分析 / 图文与视频创作 / 素材 / 投流 / 复盘" nodes={[
        { label: 'PRODUCT PACK', title: '产品规则与素材', body: 'Skill、页面流程、完成条件与场景模板。结构化编译、独立复核后发布版本。', owned: true },
        { label: 'GENERIC CORE', title: '阶段调度与恢复', body: '管理 Recipe、工作记忆、动作预算、任务快照与 Checkpoint。', owned: true },
        { label: 'DEVICE EXECUTION', title: '真机操作与录屏', body: 'Android 云真机；模型提出动作，宿主校验执行，保持设备单一写入者。', owned: true },
        { label: 'EDIT & REVIEW', title: '剪辑与质量复核', body: 'EDL 校验、FFmpeg 渲染、模型独立复核与人工验收。', owned: true },
      ]} foundation="Go / Gin · React / TypeScript · MySQL · 对象存储 · SSE · 多模型适配"/>
      <div className="case-callout"><span className="mono">MY SCOPE</span><p>负责录屏快剪 Agent 的设计与全栈研发。平台其他业务是项目背景；圆周旅迹是录屏与剪辑的业务示例，链接指向该产品官网。</p></div>
    </CaseSection>

    <CaseSection id="workflow" eyebrow="02 / FROM SKILL TO VIDEO" title="每个阶段，都留下可以复核的结果。">
      <FlowSteps steps={[
        { title: '编译产品 Pack 与 Recipe', body: '运营上传录屏、剪辑 Skill 和产品资料，编译结构化规则；独立复核和契约校验后发布。修复只修改审核指出的字段，通过来源摘要、行锁与事务保障并发发布幂等。' },
        { title: '冻结版本，检查环境', body: '以任务快照绑定执行规则，运行中任务与重试使用冻结版本。近期架构进一步规划冻结 Pack、工具、子 Agent 和校验规则版本，并在启动前完成环境检查。' },
        { title: '观察画面，执行并确认动作', body: '截图 → 阶段上下文 → 模型决策 → 程序校验 → 真机执行 → 回执复核。记录动作与回执的时间、状态，只有得到确认的动作才进入完成历史。' },
        { title: '保存原片与完成证据', body: '记录当前阶段、待确认动作、失败位置、剩余预算与原片 Checkpoint。录制结果可独立复用，剪辑阶段失败无需重复整段设备操作。' },
        { title: '生成 EDL，校验后渲染', body: '剪辑 Skill 约束时序与质量，原片时间戳和动作边界帧帮助生成剪辑决策列表。后端校验 EDL，再由 FFmpeg 执行实际渲染。' },
        { title: '独立复核，有限次修复', body: '模型质量审核与人工验收共同定位问题，依据具体证据限次重采样、重规划或重渲染；保留原始记录和失败原因，便于追溯。' },
      ]}/>
    </CaseSection>

    <CaseSection id="context" eyebrow="03 / CONTEXT ENGINEERING" title="稳定信息留在前面，动态证据紧跟任务。">
      <div className="context-stack">{[
        ['01', '固定协议与 Skill', '稳定的执行契约与业务规则'],
        ['02', '稳定参数与 Recipe', '本次任务目标、产品信息与冻结配置'],
        ['03', '当前阶段与工作记忆', '进度、待确认动作、失败与完成证据、预算'],
        ['04', '动态事件与最新截图', '近期动作、异常和关键回执'],
      ].map(([n, title, text]) => <div key={n}><span className="mono">{n}</span><strong>{title}</strong><p>{text}</p></div>)}</div>
      <DetailCards items={[
        { title: '只折叠确认过的动作', body: '程序确认成功后才折叠历史。近期动作、失败证据与关键回执继续保留；完整执行记录单独留存，不把上下文压缩等同于删除审计信息。' },
        { title: '用本地差分处理等待', body: '在画面没有变化的等待阶段先做本地图像差分，必要时再请求模型；稳定的提示词前缀同时为缓存复用创造条件。' },
      ]}/>
    </CaseSection>

    <CaseSection id="validation" eyebrow="04 / EVALUATION" title="改进，要在同一批任务上比较。">
      <p className="case-lead">以下来自最新简历记录的固定样例测试与历史回放。它们说明这些场景中的变化，不能外推为所有产品、所有任务的成功率。</p>
      <div className="case-table-wrap"><table className="case-table"><caption>跨模型固定样例 · Opus / GPT / Kimi / 豆包各 10 次</caption><thead><tr><th>阶段</th><th>优化前</th><th>优化后</th><th>复核方式</th></tr></thead><tbody>{['模板创建','真机录屏','自动剪辑'].map(stage => <tr key={stage}><th>{stage}</th><td>16 / 40 · 40%</td><td>40 / 40 · 100%</td><td>独立模型审核与人工质检</td></tr>)}</tbody></table></div>
      <p className="case-footnote">豆包在三个阶段的固定样例中，均由 0/10 提升至 10/10；按阶段分别统计，不作为更大规模线上成功率。</p>
      <ResultGrid items={[
        { value: '39,806 → 24,679 B', label: '计划与历史载荷减少约 38%', detail: '26 轮历史任务回放，只衡量对应载荷字节，不等同于整次请求 Token 或费用下降。' },
        { value: '≈30% → 90%+', label: 'Prompt Cache 命中率', detail: 'Skill 不变的历史自测，依赖稳定前缀与该测试条件。' },
        { value: '43 本地 / 5 模型', label: '48 次等待检查', detail: '先比较图像变化，避免在无变化画面上重复模型判断。' },
      ]}/>
    </CaseSection>

    <CaseSection id="roadmap" eyebrow="05 / CONTROLLED EVOLUTION" title="从可靠执行，继续走向受控改进。">
      <p className="case-lead">演进闭环：执行证据 → 问题归因 → 候选修改 → 回放 / 真机 Probe → 效果比较 → 采用或保留原版。改进对象包括 Prompt、Skill、工具契约与记忆策略。</p>
      <div className="case-status-grid"><article><span className="case-status">已实现 / 本地实现</span><h3>证据与候选状态管理</h3><p>已有视觉操作与剪辑链路、原片恢复、产品 Pack 接口及管理页面本地实现，记录执行证据与候选状态。</p></article><article><span className="case-status planned">接入中 / 方案推进</span><h3>真机 Probe 与完整自进化</h3><p>真机 Probe 和完整自进化流程正在接入。方案以成功率、错误动作、耗时和成片质量比较候选效果；经验按产品、阶段与设备能力筛选，在 Token 预算内注入，由模型结合实时画面采用。有效经验逐步确认，有害经验停用并保留反例。</p></article></div>
      <p className="case-footnote">架构与流程采用公开版抽象表达，不包含内部 SIT 地址、设备标识和真实任务数据。</p>
    </CaseSection>
  </>
}

import { CaseSection, DetailCards, FlowSteps, ResultGrid, SystemDiagram } from './CasePrimitives'

export default function MiniCodeDetails() {
  return <>
    <CaseSection id="architecture" eyebrow="01 / RUNTIME ARCHITECTURE" title="把模型、工具、上下文连接成执行循环。">
      <p className="case-lead">MiniCoding Agent 服务于数据分析脚本的生成、执行与修复。我参与分层 Runtime 研发，重点承担模型接入、工具扩展、上下文机制与验证。</p>
      <SystemDiagram entry="终端任务 / 项目指令 / 历史会话" nodes={[
        { label: 'MODEL ADAPTER', title: '模型适配', body: '统一 OpenAI、Anthropic 与 OpenAI-Compatible 接口。' },
        { label: 'REACT RUNTIME', title: '推理与调度', body: '思考、工具调用、观察结果、修复与再次验证。' },
        { label: 'TOOL SYSTEM', title: '工具与权限', body: '文件、编辑、命令、Glob / Grep、MCP；按风险分级确认。', owned: true },
        { label: 'CONTEXT & MEMORY', title: '上下文与记忆', body: 'JSONL 持久化、历史恢复、摘要归档与检查点截断。', owned: true },
      ]} foundation="SWE-bench-Live · 信息保留测试 · Git Worktree 隔离并行任务"/>
    </CaseSection>
    <CaseSection id="workflow" eyebrow="02 / TASK LIFECYCLE" title="从理解任务，到验证修改。">
      <FlowSteps steps={[
        { title: '加载项目与任务记忆', body: '读取项目指令，恢复 JSONL 会话和历史任务；结合记忆提取保留当前目标、已有决定与待处理问题。' },
        { title: '选择并调用工具', body: '根据模型决策选择代码检索、文件读写、编辑或命令执行；MCP / Skill 扩展工具能力，工具描述按需加载。' },
        { title: '检查权限与文件状态', body: '识别危险命令与越界路径，要求修改前读取文件，检查文件修改状态，并对不同风险操作使用不同确认等级。' },
        { title: '观察结果并继续修复', body: '把工具结果和测试反馈送回 ReAct 循环；摘要归档与检查点截断保留关键需求、变更和测试信息，支持长任务继续推进。' },
      ]}/>
      <DetailCards items={[
        { title: '持久记录与工作上下文分开', body: 'JSONL 会话支持跨次恢复；模型工作上下文经过摘要和截断，缓解随工具结果不断增长的问题。用信息保留测试调整摘要模板，避免丢掉关键约束。' },
        { title: '并行工作，需要文件隔离', body: '参与多 Agent 并行执行，以 Git Worktree 隔离目录，验证跨文件修改流程；并行效果在指定重构测试中比较。' },
      ]}/>
    </CaseSection>
    <CaseSection id="validation" eyebrow="03 / VALIDATION" title="给长程执行，留下可比较的指标。">
      <ResultGrid items={[
        { value: '−85%', label: 'MCP 工具描述 Token', detail: '百级工具场景下延迟加载，减少工具 Schema 对任务上下文的占用。' },
        { value: '30 → <5', label: '单会话权限弹窗', detail: '项目记录的平均弹窗次数，结合分级确认减少重复打断。' },
        { value: '−60%', label: '跨文件重构测试耗时', detail: '多 Agent 与工作目录隔离，相较该测试的单 Agent 方案。' },
      ]}/>
      <div className="case-callout"><span className="mono">LONG-RUNNING TASKS</span><p>两层压缩支持 8 小时以上长会话追踪。使用 SWE-bench-Live 验证问题定位、代码修改与测试修复；这些指标对应项目测试条件，不是所有代码任务的统一成绩。</p></div>
    </CaseSection>
  </>
}

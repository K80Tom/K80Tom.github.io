# 汤林夕 · AI Agent Engineer

个人作品集，中文内容与英文技术标签。包含首页、项目索引、四个完整项目案例、研究论文和荣誉证书。

## 本地开发

```sh
npm ci
npm run dev
```

打开 Vite 输出的本地地址。页面路径包括 `/video-agent.html`、`/aura.html`、`/minicode.html`、`/shortdrama.html`、`/projects.html`、`/papers.html`、`/honors.html`。

## 构建与验证

```sh
npm run build
npm run preview
```

构建先编译 React，再将每个页面预渲染成完整 HTML，最后检查本地链接、锚点、附件与关键内容。JavaScript 负责菜单、主题、动效开关、证书放大和演示控件；主要正文在静态 HTML 中可直接阅读。

## 发布

```sh
npm run release
git add .
git commit -m "Update portfolio"
git push origin HEAD:main
```

保留现有 GitHub Pages `main / root` 发布方式。`web/` 保存正式源码，根目录 HTML、`assets/`、`static/` 为发布产物，均包含在同一提交中。`.published-files.json` 记录构建文件，发布脚本仅清理记录中的旧产物。上线前执行 `npm run release`。

## 内容维护

- `web/src/data.ts`：项目介绍、职责、技能、荣誉和论文索引。
- `web/src/App.tsx`：页面结构、录屏智能体案例、经历与联系信息。
- `web/src/components/Scenes.tsx`：自制 SVG / CSS 场景和交互示意。
- `web/src/content/`：从原站完整迁移的项目和论文技术内容。
- `web/public/assets/`：原有简历、论文 PDF、证书和产品图片，保留旧下载路径。
- `scripts/`：静态预渲染、完整性检查、发布文件准备。

动效尊重 `prefers-reduced-motion`，并提供手动暂停；默认深色，可切换浅色。手机使用独立布局和可展开导航。无后台、无在线模型调用、无追踪服务。

项目画面中的“流程示意 / 交互概念 / 执行流程示意”均为说明性展示，不冒充生产运行或真实客户记录。短剧平台图片来自原站已有产品实拍。原有性能数据保留场景说明；录屏智能体 25% 的数据仅描述指定历史样本的文本字节压缩。

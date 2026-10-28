# 汤林夕 · AI Agent Engineer

个人作品集，中文内容与英文技术标签。首页为独立的视频入口；`/projects.html` 以动态风景和四张深色玻璃卡呈现项目，点击卡片进入完整案例；经历、技能、研究摘要与联系方式在 `/about.html`。研究论文和荣誉证书继续保留独立页面。

## 本地开发

```sh
npm ci
npm run dev
```

打开 Vite 输出的本地地址。页面路径包括 `/video-agent.html`、`/aura.html`、`/minicode.html`、`/shortdrama.html`、`/projects.html`、`/about.html`、`/papers.html`、`/honors.html`。

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
- `web/src/App.tsx` / `web/src/components/VideoDetails.tsx` / `web/src/case-study.css`：页面结构与 CreativeFlow 录屏快剪 Agent 案例。
- `web/src/components/CinematicHero.tsx` / `web/src/cinematic.css`：视频首屏、个人导航和玻璃按钮。
- `web/src/components/ui/button.tsx`：shadcn/ui 按钮及自定义 glass 变体。
- `web/src/components/ProjectShowcase.tsx` / `web/src/projects.css`：独立作品页、四项目展示卡片与动态背景。
- `web/src/components/Scenes.tsx`：自制 SVG / CSS 场景和交互示意。
- `web/src/content/`：原始迁移内容存档；当前项目页面使用组件，论文详细实验表仍由 papers.html 提供。
- `web/public/assets/`：最新简历、论文 PDF、证书和产品图片，保留旧下载路径。
- `scripts/`：静态预渲染、完整性检查、发布文件准备。

首屏直接播放用户提供的 CloudFront 视频，字体由 Google Fonts 提供，网络不可用时回退为纯色背景与系统字体。

动效尊重 `prefers-reduced-motion`，并提供手动暂停；默认深色，可切换浅色。手机使用独立布局和可展开导航。无后台、无在线模型调用、无追踪服务。

作品页以四张独立卡片展示项目，点击卡片进入对应详情；已公开的官网、GitHub 与正式产品提供独立外链。CreativeFlow 展示公开抽象架构，业务示例明确指向圆周旅迹官网。原首页和作品页的经历 / 联系锚点转到关于页。

项目画面中的“流程示意 / 交互概念 / 执行流程示意”均为说明性展示，不冒充生产运行或真实客户记录。短剧平台图片来自原站已有产品实拍。项目内容已按 2026-10 的最新简历同步，数字保留固定样例、离线回放或本地模拟的适用范围。CreativeFlow 真机 Probe / 完整自进化仍在接入；Dear Aura 长期记忆治理标注为方案设计。

## 最新简历同步（2026-10）

- 最新 PDF 保留 `/assets/resume.pdf` 下载地址；教育、实习时间、职责与联系方式同步到关于页。
- `AboutProfile.tsx` / `profile.css`：个人简介、实习时间线、教育与 Java 飞书笔记。
- `CasePrimitives.tsx` / `case-study.css`：共享架构图、流程、指标与工程细节组件。
- `VideoDetails.tsx`、`AuraDetails.tsx`、`MiniCodeDetails.tsx`、`ShortdramaDetails.tsx`：四个当前项目详情。
- 短剧页分别标注中文在线实习平台与 OHAO 独立公开项目；企业检索指标不作为 OHAO 评测。OHAO 截图由公开仓库提供，保留源码与界面导览链接。
- Java 学习笔记链接为用户提供的公开飞书文档；站点仅提供阅读入口，不改变文档权限。
- `npm run release` 只生成本地发布产物，不执行 Git 提交、推送或线上部署。

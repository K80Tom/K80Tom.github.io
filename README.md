# 汤林夕 · AI Agent Engineer

个人作品集，中文内容与英文技术标签。首页为独立的视频入口；`/projects.html` 使用 Aceternity 轮播展示四个项目，点击卡片进入完整案例；经历、技能、研究摘要与联系方式在 `/about.html`。研究论文和荣誉证书继续保留独立页面。

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
- `web/src/App.tsx`：页面结构、录屏智能体案例、经历与联系信息。
- `web/src/components/CinematicHero.tsx` / `web/src/cinematic.css`：视频首屏、个人导航和玻璃按钮。
- `web/src/components/ui/button.tsx`：shadcn/ui 按钮及自定义 glass 变体。
- `web/src/components/carousel-demo.tsx` / `web/src/components/ui/carousel.tsx` / `web/src/projects.css`：独立作品页、轮播交互与布局。
- `web/src/components/ProjectCovers.tsx`：四张统一风格的项目封面；前三张为原创矢量示意，短剧平台使用原有实拍图片。
- `web/src/components/Scenes.tsx`：自制 SVG / CSS 场景和交互示意。
- `web/src/content/`：从原站完整迁移的项目和论文技术内容。
- `web/public/assets/`：原有简历、论文 PDF、证书和产品图片，保留旧下载路径。
- `scripts/`：静态预渲染、完整性检查、发布文件准备。

首屏直接播放用户提供的 CloudFront 视频，字体由 Google Fonts 提供，网络不可用时回退为纯色背景与系统字体。

动效尊重 `prefers-reduced-motion`，并提供手动暂停；默认深色，可切换浅色。手机使用独立布局和可展开导航。无后台、无在线模型调用、无追踪服务。

项目轮播通过 `npx shadcn@latest add @aceternity/carousel-demo` 安装并适配，保留居中大卡片、两侧预览和指针视差。提供前后按钮、项目索引、方向键 / Home / End、触屏滑动及无脚本项目链接；不会自动切换。原首页和作品页的经历 / 联系锚点转到关于页。

项目画面中的“流程示意 / 交互概念 / 执行流程示意”均为说明性展示，不冒充生产运行或真实客户记录。短剧平台图片来自原站已有产品实拍。原有性能数据保留场景说明；录屏智能体 25% 的数据仅描述指定历史样本的文本字节压缩。

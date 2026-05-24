export const articles = [
  { id: 1, date: '2026-05-20', readTime: '8 min', title: 'Rust 异步编程：从 Pin 到 Future 的完整旅程', summary: '深入理解 Rust 异步模型的核心机制，包括 Pin、Future trait 以及 async/await 的编译器展开过程，掌握编写高效异步代码的关键技巧。', content: `## Pin 是什么\n\nPin 是 Rust 异步编程中最基础也最令人困惑的概念之一。简单来说，Pin 保证一个值在内存中不会被移动。\n\n## Future trait\n\nFuture 是 Rust 异步抽象的的核心。当一个函数被标记为 async 时，编译器会将其转换为一个实现了 Future trait 的状态机。`, tags: ['Rust', '异步编程'], cover: true },
  { id: 2, date: '2026-05-15', readTime: '6 min', title: 'SwiftUI 布局机制深度解析', summary: '探索 SwiftUI 的布局协议——ViewThatFits、Layout 协议以及 GeometryReader 的正确使用方式，理解声明式 UI 的布局本质。', content: `## SwiftUI 布局三步骤\n\nSwiftUI 的布局过程分为三个步骤：提议（propose）、确定（determine）、渲染（render）。`, tags: ['SwiftUI', 'iOS'], cover: false },
  { id: 3, date: '2026-05-10', readTime: '5 min', title: '使用 Podman 替代 Docker 的完整指南', summary: 'Podman 作为无守护进程的容器引擎，在安全性和易用性上都有独特优势。本文分享从 Docker 迁移到 Podman 的实践经验。', content: `## 为什么选择 Podman\n\nPodman 是无守护进程的容器引擎，不需要 root 权限也能运行容器。`, tags: ['Docker', 'Linux', 'DevOps'], cover: true },
  { id: 4, date: '2026-05-05', readTime: '10 min', title: 'Neovim 插件开发入门与实践', summary: '从零开始构建一个 Neovim Lua 插件，涵盖插件结构、LSP 集成、Treesitter 语法高亮等实用技巧。', content: `## 插件结构\n\n一个 Neovim 插件通常包含 lua/ 目录和 plugin/ 目录。`, tags: ['Neovim', 'Lua'], cover: false },
  { id: 5, date: '2026-04-28', readTime: '7 min', title: '数据库索引优化：从 B-Tree 到实际应用', summary: '当查询变慢时，如何正确地分析和添加索引？本文通过实际案例讲解索引选择、执行计划分析和常见陷阱。', content: `## B-Tree 索引基础\n\nB-Tree 是最常用的数据库索引结构，它将数据组织成平衡树。`, tags: ['数据库', '性能优化'], cover: true },
  { id: 6, date: '2026-04-20', readTime: '4 min', title: '我的终端配置之旅：Ghostty + Starship', summary: '分享在 Fedora Linux 上配置 Ghostty 终端和 Starship 提示符的过程，打造高效且美观的终端工作环境。', content: `## 为什么选择 Ghostty\n\nGhostty 是一个用 Zig 编写的现代化终端模拟器。`, tags: ['Linux', '工具'], cover: false },
  { id: 7, date: '2026-04-12', readTime: '9 min', title: 'Python 3.14 新特性一览', summary: 'Python 3.14 带来了多项性能改进和语法增强，本文梳理了对日常开发最具影响的变更点。', content: `## 性能改进\n\nPython 3.14 在解释器层面做了大量优化。`, tags: ['Python'], cover: false },
  { id: 8, date: '2026-04-05', readTime: '6 min', title: 'CSS 容器查询实战指南', summary: '容器查询给响应式设计带来了全新思路。从基础语法到复杂布局案例，全面掌握 @container 的使用方法。', content: `## @container 基础\n\n容器查询允许我们基于父容器尺寸而非视口尺寸来应用样式。`, tags: ['前端', 'CSS'], cover: true },
  { id: 9, date: '2026-03-28', readTime: '7 min', title: '开源项目维护者的自我修养', summary: '维护开源项目不仅仅是写代码，还包括社区建设、文档编写、Issue 管理等多方面工作。分享我两年来的维护心得。', content: `## 社区建设\n\n一个好的开源项目离不开活跃的社区。`, tags: ['开源'], cover: false }
];

export const popularArticles = [
  { title: 'Rust 异步编程：从 Pin 到 Future', views: '2.3k' },
  { title: 'SwiftUI 布局机制深度解析', views: '1.8k' },
  { title: '使用 Podman 替代 Docker 的完整指南', views: '1.5k' },
  { title: 'Neovim 插件开发入门与实践', views: '1.2k' },
];

export const allTags = [
  'Rust', 'SwiftUI', 'Linux', '前端', 'Python', 'Neovim',
  'Docker', '数据库', '性能优化', '开源', '异步编程', 'iOS',
  'DevOps', 'Lua', 'CSS', '工具'
];

# Building And Removing Cards With React

**React 卡片练习中心 · PracticeHub**

基于 Module 5 `PlanetCardApp` 的动手练习站：把主项目 `app.js` 里的「行星卡片」换成你喜欢的话题，用完全相同的 React 结构反复练习**卡片组件 → 列表容器 → 挂载渲染**，并掌握「增删卡片」的 state 更新套路。

https://johnnylin707.github.io/CSIS3380-Module-5-PracticeHub-Building-And-Removing-Cards-With-React/

## 主题 · Topics

每个主题都是一个独立网页，包含：可操作的在线演示 + 5 道互动练习（带提示、答案、一键复制、中英文备注）+ 3 道自测题（即时判分 + 中英解析）。

| 主题 | 内容 | 卡片数 |
| --- | --- | --- |
| 🏎️ 跑车 | 兰博基尼、法拉利、保时捷、迈凯伦、布加迪、科尼赛克 | 6 |
| 🪖 主战坦克 | M1 艾布拉姆斯、豹2、挑战者2、T-90、梅卡瓦、99A | 6 |
| ✈️ 战斗机 | F-22、F-35、苏-57、歼-20、台风、阵风 | 6 |
| 🔫 著名枪械 | AK-47、M16A4、M4、Glock 17、MP5、巴雷特 M82 | 6 |
| 💫 KPOP · aespa | Karina、Giselle、Winter、Ningning | 4 |

## 如何运行 · Getting Started

纯静态站点，**无需安装依赖、无需构建**。

```bash
# 方式一：直接用浏览器打开
open index.html

# 方式二：起一个本地服务器（推荐，避免个别浏览器的本地文件限制）
npx serve .
# 或
python3 -m http.server 8000
```

然后访问首页 `index.html`，选择话题进入练习页。

> 注意：各话题页的在线演示通过 CDN 加载 React 18 与 Babel，需要联网；练习与自测题为纯本地 JS，离线可用。

## 目录结构 · Project Structure

```text
PracticeHub/
├── app.js                # 原版 PlanetCardApp（行星卡片）—— 所有话题的模板来源
├── index.html            # 练习中心首页（主题选择 / 使用说明 / 学习重点）
├── css/
│   └── style.css         # 全站样式（含各主题 CSS 变量配色）
├── js/
│   ├── topics-data.js    # 主题数据 + 练习题生成器（buildPractice 自动替换命名令牌）
│   └── page.js           # 页面渲染与交互逻辑（演示、练习、自测）
├── cars/                 # 五大话题，每个均为独立网页
│   ├── index.html        #   ├── app.js  # 演示源码（React + Babel）
├── tanks/
│   ├── index.html
│   └── app.js
├── jets/
│   ├── index.html
│   └── app.js
├── guns/
│   ├── index.html
│   └── app.js
└── aespa/
    ├── index.html
    └── app.js
```

## 学习重点 · Key Takeaways

套路全部来自主项目 `app.js`，换任何数据都能复用：

- **组件（Component）**：用 props 接收数据，只负责展示与上报事件，不修改数据。
- **列表（List）**：用 `useState(数据数组)` 保存列表，用 `map` 把每一项渲染成卡片，记得写 `key`。
- **更新（State）**：用 `filter` 生成新数组再 `setState`，不要直接修改原数组（不用 `push` / `splice`）。
- **挂载（Render）**：`ReactDOM.createRoot(节点).render(<组件 />)` 把界面画到页面上。
- **数据驱动（Data-driven）**：`UI = f(state)`——改数据就改界面，组件代码不用动。

`app.js` 的三个原始任务：

1. Create a `Planet` component that renders a planet card
2. Create a container component that iterates over the `planets` array and renders a `Planet` component for each object
3. Render the container component to the DOM

## 技术栈 · Tech Stack

- React 18（UMD CDN）+ Babel Standalone，浏览器内编译 JSX
- 原生 HTML / CSS / JavaScript，零依赖、零构建
- 练习题由 `buildPractice(topic)` 依据各主题命名自动生成，5 个主题的答案代码结构与 `app.js` 完全同构

## 三步走 · How to Use

1. **看演示 · Watch**：主题页顶部的卡片应用可直接操作——点 Remove 移除卡片，点 Reset 恢复，观察标题计数变化。
2. **做练习 · Practice**：5 道题一一对应 `app.js` 的任务，先自己写，再点开「💡 提示」「✅ 答案」「🌐 中英文备注」逐项对照，答案可一键复制。
3. **测理解 · Quiz**：3 道自测题即时判分，每题带提示、正确答案与中英双语解析，可「重新开始」反复练习。

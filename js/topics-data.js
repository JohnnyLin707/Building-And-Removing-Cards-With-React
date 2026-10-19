/* ============================================================
   PracticeHub · 主题数据 / 练习题 / 自测题
   ------------------------------------------------------------
   每个主题对应 app.js 的同一套 React 结构：
     任务 1  卡片组件   Planet    → XxxCard
     任务 2  列表容器   PlanetList → XxxList（useState + map + filter）
     任务 3  挂载渲染   ReactDOM.createRoot(...)

   练习题由 buildPractice(topic) 依据各主题的命名自动生成，
   5 个主题的答案代码结构与 app.js 完全同构。
   所有题目均带「提示」与「中英文备注」，自测题带提示与中英解析。
   ============================================================ */

window.TOPICS = {
  cars: {
    key: 'cars',
    path: 'cars/',
    icon: '🏎️',
    title: '著名跑车',
    titleEn: 'Famous Sports Cars',
    count: 6,
    accent: '#ef4444',
    accentDark: '#b91c1c',
    accentSoft: 'rgba(239, 68, 68, 0.12)',
    tagline: '兰博基尼、法拉利、保时捷、布加迪、科尼赛克……把 app.js 里的 planets 数组换成跑车数组，用同一套结构练习组件、列表与 state。',
    taglineEn: 'Lamborghini, Ferrari, Porsche, Bugatti, Koenigsegg — swap the planets array for cars and practice components, lists and state with the same structure.',
    naming: {
      data: 'cars',
      item: 'car',
      card: 'CarCard',
      list: 'CarList',
      listVar: 'carList',
      setList: 'setCarList',
      remove: 'removeCar',
      reset: 'resetCars',
      itemZh: '跑车',
      title: 'Famous Sports Cars',
      empty: 'No cars left! · 没有跑车了！'
    },
    quiz: [
      {
        q: '在演示中点击某张跑车卡片上的「Remove · 移除」按钮，会发生什么？',
        options: [
          '整个页面刷新，所有卡片重新出现',
          '只有这张卡片消失，标题计数减 1',
          '所有卡片一起消失',
          '这张卡片变成红色但仍在列表中'
        ],
        answer: 1,
        hint: '回想 app.js 中 removePlanet 用 filter 生成新数组之后，调用了什么来更新界面。',
        explainZh: '点击按钮会调用 onRemove(car.id)，父组件 CarList 用 filter 得到不含该 id 的新数组并调用 setCarList，React 随即重新渲染——于是只有这张卡片消失，计数从 6 变成 5。',
        explainEn: 'Clicking calls onRemove(car.id); CarList builds a new array with filter and calls setCarList, so React re-renders — only that card disappears and the count drops from 6 to 5.'
      },
      {
        q: 'CarList 中的 carList.map((car) => <CarCard ... />) 做了什么？',
        options: [
          '直接修改了原数组',
          '遍历数组，为每张跑车返回一个 CarCard 元素',
          '把数组按价格排序',
          '删除了数组中的最后一张跑车'
        ],
        answer: 1,
        hint: 'app.js 的 PlanetList 里也有一行几乎一样的 map，它返回的是 JSX 而不是普通值。',
        explainZh: 'map 不会修改原数组，它遍历每一项并返回一个新数组——这里每一项就是一张 <CarCard /> 卡片元素，React 再把这些元素渲染成真正的 DOM。数组有几项，界面就有几张卡片。',
        explainEn: 'map never mutates the array; it walks every item and returns a new array — here an array of <CarCard /> elements, which React then renders into real DOM nodes. The UI has exactly as many cards as the array has items.'
      },
      {
        q: '为什么每张卡片都要写 key={car.id}？',
        options: [
          '给卡片添加一个 CSS 类名',
          '帮 React 识别哪张卡片被移除或更新，从而高效刷新',
          '让卡片按 id 数字排序',
          '只是习惯写法，没有实际作用'
        ],
        answer: 1,
        hint: '试试把 key 删掉——功能看起来一样，但 React 的「记账本」就乱了。',
        explainZh: 'key 是 React 识别列表元素的「身份证」。移除中间一张卡片时，React 靠 key 知道是谁走了，只更新变化的部分；没有 key 时它只能按位置猜测，可能渲染错内容或明显变慢。',
        explainEn: 'A key is each item\'s ID card for React. When you remove a card, React uses keys to know exactly which one left and updates only that part; without keys it guesses by position, which can render wrong content or slow things down.'
      }
    ]
  },

  tanks: {
    key: 'tanks',
    path: 'tanks/',
    icon: '🪖',
    title: '主战坦克',
    titleEn: 'Main Battle Tanks',
    count: 6,
    accent: '#65a30d',
    accentDark: '#3f6212',
    accentSoft: 'rgba(101, 163, 13, 0.12)',
    tagline: 'M1 艾布拉姆斯、豹2、挑战者2、T-90、梅卡瓦、99A……六大名坦克的数据数组，练习与 app.js 相同的卡片列表结构。',
    taglineEn: 'M1 Abrams, Leopard 2, Challenger 2, T-90, Merkava, Type 99A — a tank data array to practice the same card-list structure as app.js.',
    naming: {
      data: 'tanks',
      item: 'tank',
      card: 'TankCard',
      list: 'TankList',
      listVar: 'tankList',
      setList: 'setTankList',
      remove: 'removeTank',
      reset: 'resetTanks',
      itemZh: '坦克',
      title: 'Main Battle Tanks',
      empty: 'No tanks left! · 没有坦克了！'
    },
    quiz: [
      {
        q: '点击「M1 Abrams」卡片上的 Remove 按钮后，标题「Main Battle Tanks (6)」会变成什么？',
        options: [
          '仍然是 (6)，因为数据数组没变',
          '变成 (5)，因为 state 更新后重新渲染',
          '变成 (0)，所有卡片被清空',
          '标题消失，只剩卡片'
        ],
        answer: 1,
        hint: '计数显示的是 carList/tankList.length，也就是 state 里当前数组的长度。',
        explainZh: '标题里的数字来自 state（tankList.length）。点击 Remove 后，filter 生成不含 M1 Abrams 的新数组并 setTankList，React 重新渲染，标题随之变成 (5)。注意：原始 tanks 数组并没有被修改，Reset 还能把它们全部找回来。',
        explainEn: 'The number in the title comes from state (tankList.length). After Remove, filter builds a new array without the M1 Abrams and calls setTankList, so React re-renders and the title becomes (5). The original tanks array is untouched — Reset can still bring every tank back.'
      },
      {
        q: 'tankList.map((tank) => <TankCard ... />) 的作用是什么？',
        options: [
          '修改原数组，把第一项删掉',
          '遍历数组，为每辆坦克返回一个 TankCard 元素',
          '检查数组是否为空',
          '把坦克按重量排序'
        ],
        answer: 1,
        hint: 'app.js 任务 2 要求「iterates over the planets array and renders a Planet component for each object」——map 就是干这个的。',
        explainZh: 'map 遍历数组，为每一项（object）返回一个 <TankCard /> 元素，最终得到一组卡片元素交给 React 渲染。这正是 app.js 任务 2 的核心：一个容器组件遍历数组，为每个对象渲染一个卡片组件。',
        explainEn: 'map walks the array and returns one <TankCard /> element per object, producing a group of card elements for React to render. That is exactly Task 2 of app.js: a container component iterates over the array and renders a card component for each object.'
      },
      {
        q: '移除坦克时，为什么不能直接用 tanks.splice(0, 1) 来删除？',
        options: [
          'splice 语法写错了',
          '直接修改 state 数组 React 无法感知，必须用 filter 生成新数组再 setState',
          'splice 只能用于字符串',
          '可以，效果和 filter 完全一样'
        ],
        answer: 1,
        hint: 'React 判断 state 有没有变化，靠的是「是不是一个新数组/新对象」。',
        explainZh: 'React 的 state 必须是「不可变数据」：直接 push/splice 原数组，数组还是同一个引用，React 以为什么都没变，就不会重新渲染。filter 返回一个全新的数组，setTankList(新数组) 之后 React 才会更新界面。',
        explainEn: 'React state must be treated as immutable: splicing the array in place keeps the same reference, so React thinks nothing changed and skips re-rendering. filter returns a brand-new array, and only then does setTankList(newArray) trigger an update.'
      }
    ]
  },

  jets: {
    key: 'jets',
    path: 'jets/',
    icon: '✈️',
    title: '战斗机',
    titleEn: 'Fighter Jets',
    count: 6,
    accent: '#0ea5e9',
    accentDark: '#0369a1',
    accentSoft: 'rgba(14, 165, 233, 0.12)',
    tagline: 'F-22、F-35、苏-57、歼-20、台风、阵风……把行星卡片换成战机卡片，练习组件、列表、移除与重置。',
    taglineEn: 'F-22, F-35, Su-57, J-20, Typhoon, Rafale — turn planet cards into jet cards and practice components, lists, remove and reset.',
    naming: {
      data: 'jets',
      item: 'jet',
      card: 'JetCard',
      list: 'JetList',
      listVar: 'jetList',
      setList: 'setJetList',
      remove: 'removeJet',
      reset: 'resetJets',
      itemZh: '战斗机',
      title: 'Fighter Jets',
      empty: 'No jets left! · 没有战斗机了！'
    },
    quiz: [
      {
        q: '点击「F-22 Raptor」卡片上的 Remove 按钮，代码执行的顺序是？',
        options: [
          '先刷新页面，再从数组中删除',
          '按钮调用 onRemove(jet.id) → 父组件 filter + setJetList → React 重新渲染',
          '卡片自己把自己从 DOM 里删掉',
          '直接修改 jets 原始数组，然后手动刷新页面'
        ],
        answer: 1,
        hint: '回顾 app.js：<button onClick={() => onRemove(planet.id)}>，再看 removePlanet 里做了什么。',
        explainZh: '顺序是：卡片按钮被点击 → 调用父组件传入的 onRemove(jet.id) → JetList 中用 filter 生成不含该 id 的新数组并 setJetList → state 变化触发 React 重新渲染。卡片组件本身不修改任何数据，只负责「上报」点击事件。',
        explainEn: 'The order is: the button is clicked → it calls the parent\'s onRemove(jet.id) → JetList filters out that id and calls setJetList → the state change triggers a React re-render. The card component never mutates data itself; it only reports the click upward.'
      },
      {
        q: 'JetList 里 useState 的初始值为什么是整个 jets 数组？',
        options: [
          '为了占位，实际不用',
          '让组件一开始就显示全部战斗机，之后再由用户移除或重置',
          '因为 useState 只能存数组',
          '为了排序方便'
        ],
        answer: 1,
        hint: 'app.js 中 const [planetList, setPlanetList] = React.useState(planets);',
        explainZh: 'useState(数组) 让组件「记住」当前要显示的列表，初始值就是完整数组，所以页面一打开就有全部 6 架战斗机。之后每次移除/重置都是「换一个新数组」，React 自动刷新界面。',
        explainEn: 'useState(array) lets the component remember the list to show, starting from the full array, so all 6 jets appear on load. Every remove/reset then swaps in a new array, and React refreshes the UI automatically.'
      },
      {
        q: '如果要在演示里新增一架「F-15 Eagle」，最省事的做法是？',
        options: [
          '改写 JetCard 和 JetList 组件',
          '只在 jets 数据数组里追加一个对象，组件代码一行都不用改',
          '复制一张现有卡片再改文字',
          '在 CSS 里加一个新样式'
        ],
        answer: 1,
        hint: '界面是数据的函数：数组有几项，界面就有几张卡片。',
        explainZh: '这就是「数据驱动 UI」：卡片组件是通用的，数组里有几项就渲染几项。新增一架 F-15 只需在 jets 数组里加一个对象（id、name、nameZh、desc、descZh、stats、emoji、flag），界面立刻多一张卡片，组件代码完全不用动。',
        explainEn: 'This is data-driven UI: card components are generic — one element per array item. Adding an F-15 only requires appending one object to the jets array (id, name, nameZh, desc, descZh, stats, emoji, flag). A new card appears instantly; no component code changes.'
      }
    ]
  },

  guns: {
    key: 'guns',
    path: 'guns/',
    icon: '🔧',
    title: '著名枪械',
    titleEn: 'Famous Firearms',
    count: 6,
    accent: '#f59e0b',
    accentDark: '#b45309',
    accentSoft: 'rgba(245, 158, 11, 0.14)',
    tagline: 'AK-47、M16A4、M4、Glock 17、MP5、巴雷特 M82……以枪械资料卡练习 app.js 的组件与 state（仅作百科知识练习）。',
    taglineEn: 'AK-47, M16A4, M4, Glock 17, MP5, Barrett M82 — practice app.js components and state with encyclopedia-style firearm cards.',
    naming: {
      data: 'guns',
      item: 'gun',
      card: 'GunCard',
      list: 'GunList',
      listVar: 'gunList',
      setList: 'setGunList',
      remove: 'removeGun',
      reset: 'resetGuns',
      itemZh: '枪械',
      title: 'Famous Firearms',
      empty: 'No guns left! · 没有枪械了！'
    },
    quiz: [
      {
        q: '点击「AK-47」卡片上的 Remove 按钮后，哪里会发生变化？',
        options: [
          '只有 DOM 被隐藏，state 没变',
          'state 中的数组更新，React 重新渲染，卡片与计数一起变化',
          ' guns 原始数组被永久修改',
          '没有任何变化，按钮是装饰'
        ],
        answer: 1,
        hint: 'setState 之后 React 会自动重新渲染，DOM 只是渲染结果。',
        explainZh: '点击后 onRemove(gun.id) 被调用，GunList 用 filter 生成新数组并 setGunList。state 变了，React 重新渲染——卡片消失、计数减 1。原始 guns 数组没有被修改，所以 Reset 按钮还能恢复全部 6 张卡片。',
        explainEn: 'The click calls onRemove(gun.id); GunList filters a new array and calls setGunList. State changed, so React re-renders — the card disappears and the count drops. The original guns array is untouched, so Reset can still restore all 6 cards.'
      },
      {
        q: 'GunCard 组件里的资料列表（口径、年份、类型、产地）是怎么渲染出来的？',
        options: [
          '手写 4 个 <li>，写死在组件里',
          '用 stats.map((stat) => <li>...</li>) 遍历 props 传入的数据数组',
          '从服务器逐个请求',
          '复制粘贴 HTML 代码'
        ],
        answer: 1,
        hint: 'app.js 的 Planet 组件里，Diameter 和 Moons 就是直接读 props.planet 的字段。',
        explainZh: '资料列表同样是「数据驱动」：每张卡片的数据里都有一个 stats 数组（口径/年份/类型/产地），组件用 map 把它遍历成一组 <li>。以后想加一个「弹容量」字段，只改数据，组件不用动。',
        explainEn: 'The profile list is also data-driven: each card\'s data contains a stats array (caliber/year/type/origin), which the component maps into <li> elements. To add a "Magazine capacity" field later, change only the data — not the component.'
      },
      {
        q: '把每张卡片的 key 从 key={gun.id} 改成 key={gun.name}，会有问题吗？',
        options: [
          '完全没问题，name 也是唯一的',
          '只要 name 唯一通常也能工作，但 id 更稳妥——数据可能重名或被修改',
          '页面会直接报错崩溃',
          '卡片会全部消失'
        ],
        answer: 1,
        hint: 'key 的要求：同一批列表内唯一、且稳定不变。',
        explainZh: 'key 只要在列表内唯一且稳定就能工作，所以用 name 通常也行。但 id 是更可靠的「身份证」：名字可能重复、被翻译或修改，而 id 不会。这也是 app.js 用 planet.id 作 key 的原因。',
        explainEn: 'A key only needs to be unique among siblings and stable, so using the name usually works too. But id is the safer ID card: names can repeat or change, while ids do not — which is why app.js uses planet.id as the key.'
      }
    ]
  },

  aespa: {
    key: 'aespa',
    path: 'aespa/',
    icon: '💫',
    title: 'KPOP 人物 · aespa',
    titleEn: 'KPOP Idols · aespa',
    count: 4,
    accent: '#a855f7',
    accentDark: '#7e22ce',
    accentSoft: 'rgba(168, 85, 247, 0.12)',
    tagline: 'Karina、Giselle、Winter、Ningning——SM 娱乐 2020 年推出的四人女团。用成员卡片练习 app.js 的组件与数据流。',
    taglineEn: 'Karina, Giselle, Winter, Ningning — the four-member girl group debuted by SM Entertainment in 2020. Practice app.js components and data flow with member cards.',
    naming: {
      data: 'members',
      item: 'member',
      card: 'MemberCard',
      list: 'MemberList',
      listVar: 'memberList',
      setList: 'setMemberList',
      remove: 'removeMember',
      reset: 'resetMembers',
      itemZh: '成员',
      title: 'aespa Members',
      empty: 'No members left! · 没有成员了！'
    },
    quiz: [
      {
        q: '点击「Karina」卡片上的 Remove 按钮后，标题「aespa Members (4)」会怎样？',
        options: [
          '仍然是 (4)',
          '变成 (3)，因为 state 更新后 React 重新渲染',
          '变成 (0)',
          '变成乱码'
        ],
        answer: 1,
        hint: '标题数字 = 当前 state 数组的长度。',
        explainZh: '标题里的数字是 state 数组的长度。Remove 触发 onRemove(member.id) → filter + setMembers → React 重新渲染，数字变成 (3)。原始 members 数组没被改动，Reset 后 Karina 会回来。',
        explainEn: 'The number is the length of the current state array. Remove triggers onRemove(member.id) → filter + setMembers → React re-renders, so it becomes (3). The original members array is untouched, so Reset brings Karina back.'
      },
      {
        q: 'MemberCard 组件是怎么拿到 Karina 的担当、生日等资料的？',
        options: [
          '组件自己写死的',
          '通过 props：<MemberCard member={member} onRemove={removeMember} />',
          '从 localStorage 读取',
          '用户手动输入'
        ],
        answer: 1,
        hint: '看组件签名 function MemberCard({ member, onRemove })，参数就是从父组件传进来的 props。',
        explainZh: '所有资料都通过 props 流入：父组件 MemberList 在 map 里写下 <MemberCard key={member.id} member={member} onRemove={removeMember} />，MemberCard 用解构参数 { member, onRemove } 接收。组件不存数据、不改数据，只展示数据并上报点击——这就是 app.js 中 Planet 组件的工作方式。',
        explainEn: 'All data flows in through props: the parent MemberList writes <MemberCard key={member.id} member={member} onRemove={removeMember} /> inside map, and MemberCard receives it via { member, onRemove }. The component neither stores nor mutates data — it only displays it and reports clicks, exactly like the Planet component in app.js.'
      },
      {
        q: '为什么演示里刚好是 4 张成员卡片？',
        options: [
          '组件里写死了 4 次',
          '因为 members 数据数组有 4 项，界面是数据的函数',
          '屏幕只能放下 4 张',
          'React 默认渲染 4 个组件'
        ],
        answer: 1,
        hint: 'UI = f(state)：数组几项，界面几项。',
        explainZh: '界面是数据的函数（UI = f(state)）。members 数组有 4 个对象，map 就渲染 4 张卡片；哪怕 aespa 以后加入新成员，也只要在数组里加一项，界面自动多一张卡片，组件代码不用改。',
        explainEn: 'The UI is a function of data (UI = f(state)). The members array has 4 objects, so map renders 4 cards; even if aespa gains a new member someday, just add one item to the array and a new card appears — no component code changes needed.'
      }
    ]
  }
};

/* ============================================================
   练习题生成器：把命名令牌替换为各主题的变量/组件名
   __DATA__  数据数组名（planets → cars）
   __ITEM__  单项变量名（planet → car）
   __ITEMZH__ 单项中文名
   __CARD__  卡片组件名（Planet → CarCard）
   __LIST__  容器组件名（PlanetList → CarList）
   __REMOVE__/__RESET__ 移除/重置函数名
   __TITLE__ 演示标题
   __EMPTY__ 空状态文案
   ============================================================ */

function fillTokens(code, n) {
  return code
    .replace(/__CARD__/g, n.card)
    .replace(/__LIST__/g, n.list)
    .replace(/__LISTVAR__/g, n.listVar)
    .replace(/__SETLIST__/g, n.setList)
    .replace(/__DATA__/g, n.data)
    .replace(/__REMOVE__/g, n.remove)
    .replace(/__RESET__/g, n.reset)
    .replace(/__ITEMZH__/g, n.itemZh)
    .replace(/__ITEM__/g, n.item)
    .replace(/__TITLE__/g, n.title)
    .replace(/__EMPTY__/g, n.empty);
}

function buildPractice(topic) {
  var n = topic.naming;

  var q1 = {
    title: '创建 __CARD__ 卡片组件',
    tag: '对应 app.js 任务 1 · Planet 组件',
    body: '仿照 app.js 中的 `Planet` 组件，创建 `__CARD__`：用 props 接收一张__ITEMZH__数据 `__ITEM__` 和父组件传入的回调 `onRemove`，渲染黑色图片区（大图标 + 国旗）、英文名、中文名、英文描述、中文描述、资料列表（Profile）和一个 Remove 按钮；按钮点击时调用 `onRemove(__ITEM__.id)`。',
    hints: [
      '用解构参数接收 props：`function __CARD__({ __ITEM__, onRemove })`',
      'JSX 中输出变量要写在花括号里：`<h2>{__ITEM__.name}</h2>`',
      '资料列表可以用 `__ITEM__.stats.map((stat) => <li key={stat.labelEn}>…</li>)` 遍历',
      '按钮要写 `onClick={() => onRemove(__ITEM__.id)}`；写成 `onClick={onRemove(__ITEM__.id)}` 会在渲染时立刻执行，是常见错误'
    ],
    answer: 'function __CARD__({ __ITEM__, onRemove }) {\n' +
      '  return (\n' +
      '    <div className="card">\n' +
      '      <div className="card-media">\n' +
      '        <span className="card-emoji">{__ITEM__.emoji}</span>\n' +
      '        <span className="card-flag">{__ITEM__.flag}</span>\n' +
      '      </div>\n' +
      '      <h2>{__ITEM__.name}</h2>\n' +
      '      <p className="name-zh">{__ITEM__.nameZh}</p>\n' +
      '      <p>{__ITEM__.desc}</p>\n' +
      '      <p className="desc-zh">{__ITEM__.descZh}</p>\n' +
      '      <h3>__TITLE__ Profile · __ITEMZH__资料</h3>\n' +
      '      <ul>\n' +
      '        {__ITEM__.stats.map((stat) => (\n' +
      '          <li key={stat.labelEn}>\n' +
      '            <strong>{stat.labelEn} · {stat.labelZh}:</strong> {stat.value}\n' +
      '          </li>\n' +
      '        ))}\n' +
      '      </ul>\n' +
      '      <button className="remove-btn" onClick={() => onRemove(__ITEM__.id)}>\n' +
      '        Remove · 移除\n' +
      '      </button>\n' +
      '    </div>\n' +
      '  );\n' +
      '}',
    noteZh: '组件就像一台「数据 → 界面」的机器：同样的 props 进去，永远渲染出同样的卡片。卡片自己不知道数据从哪里来，也不修改数据，只负责展示，并在被点击时通过 onRemove「上报」事件。这就是 React 的单向数据流。',
    noteEn: 'A component is a "data → UI" machine: the same props always render the same card. It never owns or mutates the data; it only displays it and reports events upward via onRemove. This is React\'s one-way data flow.'
  };

  var q2 = {
    title: '创建 __LIST__ 列表容器',
    tag: '对应 app.js 任务 2 · PlanetList 容器',
    body: '创建 `__LIST__` 容器组件：用 `React.useState(__DATA__)` 把__ITEMZH__数组存进 state；用 `map` 把每一项渲染成一个 `<__CARD__ />`，并为每个卡片设置唯一的 `key`；同时渲染标题 `__TITLE__ (数量)` 和一个 Reset 按钮。',
    hints: [
      '`const [__LISTVAR__, __SETLIST__] = React.useState(__DATA__);`',
      'map 要返回 JSX：`{__LISTVAR__.map((__ITEM__) => (<__CARD__ key={__ITEM__.id} __ITEM__={__ITEM__} onRemove={__REMOVE__} />))}`',
      'key 用数据里的 id：唯一且稳定，不要用数组下标当 key',
      'React.Fragment（<>）可以让组件返回多个并列元素'
    ],
    answer: 'function __LIST__() {\n' +
      '  const [__LISTVAR__, __SETLIST__] = React.useState(__DATA__);\n' +
      '\n' +
      '  return (\n' +
      '    <React.Fragment>\n' +
      '      <div className="toolbar">\n' +
      '        <h1>__TITLE__ ({__LISTVAR__.length})</h1>\n' +
      '        <button className="reset-btn" onClick={__RESET__}>Reset · 重置</button>\n' +
      '      </div>\n' +
      '\n' +
      '      {__LISTVAR__.length === 0 ? (\n' +
      '        <p className="empty">__EMPTY__</p>\n' +
      '      ) : (\n' +
      '        <div className="container">\n' +
      '          {__LISTVAR__.map((__ITEM__) => (\n' +
      '            <__CARD__ key={__ITEM__.id} __ITEM__={__ITEM__} onRemove={__REMOVE__} />\n' +
      '          ))}\n' +
      '        </div>\n' +
      '      )}\n' +
      '    </React.Fragment>\n' +
      '  );\n' +
      '}',
    noteZh: 'useState 让组件「记住」当前要显示哪些__ITEMZH__，初始值是完整数组。map 把数组变成一组 React 元素。key 帮助 React 知道哪一项被移除或更新，从而高效地更新 DOM，而不是推倒重来。这正是 app.js 任务 2 的两个要点。',
    noteEn: 'useState lets the component remember which items to show, starting from the full array. map transforms that array into React elements, and the key prop tells React exactly which item changed so it can update the DOM efficiently instead of re-creating everything — the two key points of app.js Task 2.'
  };

  var q3 = {
    title: '实现移除单张卡片与一键重置',
    tag: '对应 app.js 任务 2 · removePlanet / resetPlanets',
    body: '在 `__LIST__` 中实现两个函数：`__REMOVE__(id)`——用 `filter` 生成不包含该 id 的新数组并更新 state；`__RESET__()`——恢复最初的完整数组。当列表为空时，显示「__EMPTY__」。',
    hints: [
      'filter：`__SETLIST__(__LISTVAR__.filter((__ITEM__) => __ITEM__.id !== id))`',
      '重置：`setList(__DATA__)`（原始数组从头到尾没被修改过，直接引用即可）',
      '空状态用三元运算符：`__LISTVAR__.length === 0 ? <p className="empty">…</p> : <div className="container">…</div>`',
      '注意：不能直接 `list.splice()` 或 `list.push()`——那是在修改 state 本身'
    ],
    answer: 'function __REMOVE__(id) {\n' +
      '  __SETLIST__(__LISTVAR__.filter((__ITEM__) => __ITEM__.id !== id));\n' +
      '}\n' +
      '\n' +
      'function __RESET__() {\n' +
      '  __SETLIST__(__DATA__);\n' +
      '}\n' +
      '\n' +
      '// 空状态（放在 return 的 JSX 里）：\n' +
      '{__LISTVAR__.length === 0\n' +
      '  ? <p className="empty">__EMPTY__</p>\n' +
      '  : <div className="container">{/* 卡片列表 */}</div>}',
    noteZh: 'React 的 state 不能直接修改，要「用新数组替换旧数组」。filter 正好返回一个全新的数组，完全符合这个规则；而 splice/push 修改的是原数组（同一个引用），React 感知不到变化。state 一变，React 自动重新渲染，界面随之更新。',
    noteEn: 'Never mutate React state directly — replace it with a new array instead. filter returns a brand-new array, which is exactly what React wants, while splice/push modify the original reference and React cannot detect the change. When state updates, React re-renders automatically.'
  };

  var q4 = {
    title: '把应用挂载到页面上',
    tag: '对应 app.js 任务 3 · ReactDOM.createRoot',
    body: '用 React 18 的 API 把 `__LIST__` 渲染到页面中的 `<div id="demo-root"></div>` 节点上。',
    hints: [
      'React 18 用 `ReactDOM.createRoot(节点)` 创建根，再调用 `.render(组件)`',
      '先取到挂载点：`document.getElementById(\'demo-root\')`',
      '页面需要先引入 react、react-dom 的 UMD 版本和 babel-standalone（本练习页已包含）'
    ],
    answer: 'ReactDOM.createRoot(document.getElementById(\'demo-root\')).render(<__LIST__ />);',
    noteZh: 'React 描述的是「界面应该长什么样」，ReactDOM 负责把这些描述真正画进浏览器页面。createRoot 指定挂载点（#demo-root），render 把组件树渲染进去。这也是 app.js 最后一行做的事——三个任务到此闭环。',
    noteEn: 'React describes what the UI should look like; ReactDOM paints it into the browser page. createRoot picks the mount point (#demo-root) and render draws the component tree into it — exactly what the last line of app.js does, closing the loop on all three tasks.'
  };

  var q5 = {
    title: '想新增一张__ITEMZH__卡片，改哪里？',
    tag: '综合练习 · 数据驱动 UI',
    body: '如果要在演示里多加一张__ITEMZH__卡片，最省事的做法是什么？请说明：应该改哪个文件、加什么内容，以及为什么组件代码一行都不用动。',
    hints: [
      '先想清楚：数据存在哪里？组件是不是「通用」的？',
      '组件通过 props 拿数据，本身不关心数据有几项',
      '在数据数组里追加一个对象即可，字段与现有项保持一致（id / name / nameZh / desc / descZh / stats / emoji / flag）'
    ],
    answer: '只需在 __DATA__ 数据数组里追加一个对象：\n' +
      '\n' +
      '  {\n' +
      '    id: \'7\',\n' +
      '    name: \'…\',\n' +
      '    nameZh: \'…\',\n' +
      '    desc: \'…\',\n' +
      '    descZh: \'…\',\n' +
      '    stats: [ /* { labelEn, labelZh, value } … */ ],\n' +
      '    emoji: \'…\',\n' +
      '    flag: \'…\'\n' +
      '  }\n' +
      '\n' +
      '组件会自动为它渲染一张新卡片——数组有几项，界面就有几张卡片。',
    noteZh: '数据驱动是 React 的核心思想：UI = f(state)，界面是数据的函数。改数据就改界面；只有改「行为」时才需要动组件代码。这也是为什么 app.js 只要维护一个 planets 数组，就能渲染整个行星应用。',
    noteEn: 'Data-driven UI is the heart of React: UI = f(state) — the interface is a function of the data. Change the data and the UI changes; you touch component code only when the behavior changes. That is why app.js needs just one planets array to render the whole app.'
  };

  return [q1, q2, q3, q4, q5].map(function (q) {
    return {
      title: fillTokens(q.title, n),
      tag: q.tag,
      body: fillTokens(q.body, n),
      hints: q.hints.map(function (h) { return fillTokens(h, n); }),
      answer: fillTokens(q.answer, n),
      noteZh: fillTokens(q.noteZh, n),
      noteEn: fillTokens(q.noteEn, n)
    };
  });
}

/* 预生成所有主题的练习题 */
window.PRACTICE = {};
Object.keys(window.TOPICS).forEach(function (key) {
  window.PRACTICE[key] = buildPractice(window.TOPICS[key]);
});

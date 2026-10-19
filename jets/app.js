/* ============================================================
   主题：战斗机 · Fighter Jets
   ------------------------------------------------------------
   结构与主项目 app.js 完全一致，只是把 planets 换成了 jets：
     1) 卡片组件 JetCard   ← 对应 Planet
     2) 列表容器 JetList   ← 对应 PlanetList（useState + map + filter）
     3) 挂载渲染           ← 对应 ReactDOM.createRoot(...)
   ============================================================ */

const jets = [
  {
    id: '1',
    name: 'F-22 Raptor',
    nameZh: 'F-22 “猛禽”战斗机',
    desc: 'The world’s first fifth-generation stealth air-superiority fighter, with thrust-vectoring engines and supercruise capability.',
    descZh: '世界上第一款第五代隐身制空战斗机，具备推力矢量发动机和超音速巡航能力。',
    stats: [
      { labelEn: 'Max Speed', labelZh: '最大速度', value: 'Mach 2.25' },
      { labelEn: 'Role', labelZh: '用途', value: '隐身制空战斗机' },
      { labelEn: 'First Flight', labelZh: '首飞', value: '1997' },
      { labelEn: 'Origin', labelZh: '产地', value: 'United States 美国' }
    ],
    emoji: '🦅',
    flag: '🇺🇸'
  },
  {
    id: '2',
    name: 'F-35 Lightning II',
    nameZh: 'F-35 “闪电 II”战斗机',
    desc: 'A single-engine stealth multirole fighter family (A/B/C variants) used by the United States and many allied air forces.',
    descZh: '单发隐身多用途战斗机系列（A/B/C 三种型号），被美国及众多盟国空军采用。',
    stats: [
      { labelEn: 'Max Speed', labelZh: '最大速度', value: 'Mach 1.6' },
      { labelEn: 'Role', labelZh: '用途', value: '隐身多用途战斗机' },
      { labelEn: 'First Flight', labelZh: '首飞', value: '2006' },
      { labelEn: 'Origin', labelZh: '产地', value: 'United States 美国' }
    ],
    emoji: '⚡',
    flag: '🇺🇸'
  },
  {
    id: '3',
    name: 'Sukhoi Su-57',
    nameZh: '苏霍伊 苏-57 战斗机',
    desc: 'Russia’s first stealth fighter, designed for air superiority and strike missions with thrust vectoring and internal weapons bays.',
    descZh: '俄罗斯首款隐身战斗机，用于制空与对地打击，配备推力矢量发动机和内置弹舱。',
    stats: [
      { labelEn: 'Max Speed', labelZh: '最大速度', value: 'Mach 2.0' },
      { labelEn: 'Role', labelZh: '用途', value: '隐身多用途战斗机' },
      { labelEn: 'First Flight', labelZh: '首飞', value: '2010' },
      { labelEn: 'Origin', labelZh: '产地', value: 'Russia 俄罗斯' }
    ],
    emoji: '🐻‍❄️',
    flag: '🇷🇺'
  },
  {
    id: '4',
    name: 'Chengdu J-20',
    nameZh: '成都 歼-20 战斗机',
    desc: 'China’s fifth-generation stealth fighter, optimized for long-range strike with large internal weapons bays.',
    descZh: '中国第五代隐身战斗机，以大型内置弹舱优化远程打击能力。',
    stats: [
      { labelEn: 'Max Speed', labelZh: '最大速度', value: 'Mach 2.0' },
      { labelEn: 'Role', labelZh: '用途', value: '隐身制空 / 打击' },
      { labelEn: 'First Flight', labelZh: '首飞', value: '2011' },
      { labelEn: 'Origin', labelZh: '产地', value: 'China 中国' }
    ],
    emoji: '🐉',
    flag: '🇨🇳'
  },
  {
    id: '5',
    name: 'Eurofighter Typhoon',
    nameZh: '欧洲 “台风”战斗机',
    desc: 'A twin-engine canard-delta multirole fighter developed jointly by the United Kingdom, Germany, Italy and Spain.',
    descZh: '由英国、德国、意大利和西班牙联合研制的双发鸭式三角翼多用途战斗机。',
    stats: [
      { labelEn: 'Max Speed', labelZh: '最大速度', value: 'Mach 2.0' },
      { labelEn: 'Role', labelZh: '用途', value: '多用途战斗机' },
      { labelEn: 'First Flight', labelZh: '首飞', value: '1994' },
      { labelEn: 'Origin', labelZh: '产地', value: 'Europe 欧洲多国联合' }
    ],
    emoji: '🌪️',
    flag: '🇪🇺'
  },
  {
    id: '6',
    name: 'Dassault Rafale',
    nameZh: '达索 “阵风”战斗机',
    desc: 'France’s omnirole fighter, able to fly air-to-air and air-to-ground missions from both carriers and land bases.',
    descZh: '法国“全能”战斗机，可从航母与陆地基地执行空对空、空对地任务。',
    stats: [
      { labelEn: 'Max Speed', labelZh: '最大速度', value: 'Mach 1.8' },
      { labelEn: 'Role', labelZh: '用途', value: '舰载 / 陆基多用途' },
      { labelEn: 'First Flight', labelZh: '首飞', value: '1986' },
      { labelEn: 'Origin', labelZh: '产地', value: 'France 法国' }
    ],
    emoji: '💨',
    flag: '🇫🇷'
  },
];

// =============================================================
//   1) 卡片组件 —— 对应 app.js 的 Planet 组件
// =============================================================
function JetCard({ jet, onRemove }) {
  return (
    <div className="card">
      <div className="card-media">
        <span className="card-emoji">{jet.emoji}</span>
        <span className="card-flag">{jet.flag}</span>
      </div>
      <h2>{jet.name}</h2>
      <p className="name-zh">{jet.nameZh}</p>
      <p>{jet.desc}</p>
      <p className="desc-zh">{jet.descZh}</p>
      <h3>Jet Profile · 战斗机资料</h3>
      <ul>
        {jet.stats.map((stat) => (
          <li key={stat.labelEn}>
            <strong>{stat.labelEn} · {stat.labelZh}:</strong> {stat.value}
          </li>
        ))}
      </ul>
      <button className="remove-btn" onClick={() => onRemove(jet.id)}>
        Remove · 移除
      </button>
    </div>
  );
}

// =============================================================
//   2) 列表容器 —— 对应 app.js 的 PlanetList 组件
// =============================================================
function JetList() {
  const [jetList, setJetList] = React.useState(jets);

  function removeJet(id) {
    setJetList(jetList.filter((jet) => jet.id !== id));
  }

  function resetJets() {
    setJetList(jets);
  }

  return (
    <React.Fragment>
      <div className="toolbar">
        <h1>Fighter Jets ({jetList.length}) · 战斗机</h1>
        <button className="reset-btn" onClick={resetJets}>
          Reset · 重置
        </button>
      </div>

      {jetList.length === 0 ? (
        <p className="empty">No jets left! · 没有战斗机了！</p>
      ) : (
        <div className="container">
          {jetList.map((jet) => (
            <JetCard key={jet.id} jet={jet} onRemove={removeJet} />
          ))}
        </div>
      )}
    </React.Fragment>
  );
}

// =============================================================
//   3) 挂载渲染 —— 对应 app.js 的 ReactDOM.createRoot(...)
// =============================================================
ReactDOM.createRoot(document.getElementById('demo-root')).render(<JetList />);

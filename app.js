/* ============================================================
   原版 app.js · PlanetCardApp（行星卡片）
   ------------------------------------------------------------
   全站所有话题（cars / tanks / jets / guns / aespa）都从这个
   结构克隆而来，只是把 planets 数组换成各自的数据：
     1) 卡片组件 Planet    ← 对应各主题的 XxxCard
     2) 列表容器 PlanetList ← 对应各主题的 XxxList（useState + map + filter）
     3) 挂载渲染           ← 对应 ReactDOM.createRoot(...)
   数据字段：id / name / nameZh / desc / descZh / stats / emoji / flag
   ============================================================ */

const planets = [
  {
    id: '1',
    name: 'Mercury',
    nameZh: '水星',
    desc: 'The smallest planet and closest to the Sun, with extreme temperature swings between day and night.',
    descZh: '太阳系最小且最靠近太阳的行星，昼夜温差极端。',
    stats: [
      { labelEn: 'Diameter', labelZh: '直径', value: '4,879 km' },
      { labelEn: 'Distance', labelZh: '距日', value: '57.9 M km' },
      { labelEn: 'Moons', labelZh: '卫星', value: '0' },
      { labelEn: 'Year', labelZh: '公转周期', value: '88 天' }
    ],
    emoji: '☿️',
    flag: '🌞'
  },
  {
    id: '2',
    name: 'Venus',
    nameZh: '金星',
    desc: 'The hottest planet, wrapped in a thick CO₂ atmosphere that traps heat like a runaway greenhouse.',
    descZh: '温度最高的行星，被浓厚的二氧化碳大气包裹，温室效应失控。',
    stats: [
      { labelEn: 'Diameter', labelZh: '直径', value: '12,104 km' },
      { labelEn: 'Distance', labelZh: '距日', value: '108.2 M km' },
      { labelEn: 'Moons', labelZh: '卫星', value: '0' },
      { labelEn: 'Year', labelZh: '公转周期', value: '225 天' }
    ],
    emoji: '♀️',
    flag: '🌞'
  },
  {
    id: '3',
    name: 'Earth',
    nameZh: '地球',
    desc: 'Our home planet — the only known world with liquid water on its surface and life.',
    descZh: '我们的家园，目前已知唯一表面有液态水并孕育生命的星球。',
    stats: [
      { labelEn: 'Diameter', labelZh: '直径', value: '12,742 km' },
      { labelEn: 'Distance', labelZh: '距日', value: '149.6 M km' },
      { labelEn: 'Moons', labelZh: '卫星', value: '1' },
      { labelEn: 'Year', labelZh: '公转周期', value: '365.25 天' }
    ],
    emoji: '🌍',
    flag: '🌞'
  },
  {
    id: '4',
    name: 'Mars',
    nameZh: '火星',
    desc: 'The Red Planet, home to the tallest volcano and a prime target in the search for past life.',
    descZh: '红色星球，拥有太阳系最高的火山，也是寻找过去生命的首要目标。',
    stats: [
      { labelEn: 'Diameter', labelZh: '直径', value: '6,779 km' },
      { labelEn: 'Distance', labelZh: '距日', value: '227.9 M km' },
      { labelEn: 'Moons', labelZh: '卫星', value: '2' },
      { labelEn: 'Year', labelZh: '公转周期', value: '687 天' }
    ],
    emoji: '🔴',
    flag: '🌞'
  },
  {
    id: '5',
    name: 'Jupiter',
    nameZh: '木星',
    desc: 'The largest planet — a gas giant with a centuries-old storm, the Great Red Spot.',
    descZh: '最大的行星——一颗气态巨行星，拥有存在数百年的大红斑风暴。',
    stats: [
      { labelEn: 'Diameter', labelZh: '直径', value: '139,820 km' },
      { labelEn: 'Distance', labelZh: '距日', value: '778.5 M km' },
      { labelEn: 'Moons', labelZh: '卫星', value: '95+' },
      { labelEn: 'Year', labelZh: '公转周期', value: '11.9 年' }
    ],
    emoji: '🪐',
    flag: '🌞'
  },
  {
    id: '6',
    name: 'Saturn',
    nameZh: '土星',
    desc: "Famous for its dazzling ring system made of ice and rock, the second-largest planet.",
    descZh: '以由冰与岩石组成的璀璨光环闻名，是第二大行星。',
    stats: [
      { labelEn: 'Diameter', labelZh: '直径', value: '116,460 km' },
      { labelEn: 'Distance', labelZh: '距日', value: '1,434 M km' },
      { labelEn: 'Moons', labelZh: '卫星', value: '146+' },
      { labelEn: 'Year', labelZh: '公转周期', value: '29.5 年' }
    ],
    emoji: '🪐',
    flag: '🌞'
  },
];

// =============================================================
//   1) 卡片组件
// =============================================================
function Planet({ planet, onRemove }) {
  return (
    <div className="card">
      <div className="card-media">
        <span className="card-emoji">{planet.emoji}</span>
        <span className="card-flag">{planet.flag}</span>
      </div>
      <h2>{planet.name}</h2>
      <p className="name-zh">{planet.nameZh}</p>
      <p>{planet.desc}</p>
      <p className="desc-zh">{planet.descZh}</p>
      <h3>Planet Profile · 行星资料</h3>
      <ul>
        {planet.stats.map((stat) => (
          <li key={stat.labelEn}>
            <strong>{stat.labelEn} · {stat.labelZh}:</strong> {stat.value}
          </li>
        ))}
      </ul>
      <button className="remove-btn" onClick={() => onRemove(planet.id)}>
        Remove · 移除
      </button>
    </div>
  );
}

// =============================================================
//   2) 列表容器
// =============================================================
function PlanetList() {
  const [planetList, setPlanetList] = React.useState(planets);

  function removePlanet(id) {
    setPlanetList(planetList.filter((planet) => planet.id !== id));
  }

  function resetPlanets() {
    setPlanetList(planets);
  }

  return (
    <React.Fragment>
      <div className="toolbar">
        <h1>Planet Card App ({planetList.length}) · 行星卡片</h1>
        <button className="reset-btn" onClick={resetPlanets}>
          Reset · 重置
        </button>
      </div>

      {planetList.length === 0 ? (
        <p className="empty">No planets left! · 没有行星了！</p>
      ) : (
        <div className="container">
          {planetList.map((planet) => (
            <Planet key={planet.id} planet={planet} onRemove={removePlanet} />
          ))}
        </div>
      )}
    </React.Fragment>
  );
}

// =============================================================
//   3) 挂载渲染
// =============================================================
ReactDOM.createRoot(document.getElementById('demo-root')).render(<PlanetList />);

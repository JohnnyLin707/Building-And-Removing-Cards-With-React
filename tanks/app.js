/* ============================================================
   主题：主战坦克 · Main Battle Tanks
   ------------------------------------------------------------
   结构与主项目 app.js 完全一致，只是把 planets 换成了 tanks：
     1) 卡片组件 TankCard   ← 对应 Planet
     2) 列表容器 TankList   ← 对应 PlanetList（useState + map + filter）
     3) 挂载渲染            ← 对应 ReactDOM.createRoot(...)
   ============================================================ */

const tanks = [
  {
    id: '1',
    name: 'M1 Abrams',
    nameZh: 'M1 艾布拉姆斯主战坦克',
    desc: "The United States main battle tank in service since 1980, powered by a gas turbine engine and armed with a 120 mm smoothbore gun.",
    descZh: '美国自 1980 年服役的主战坦克，采用燃气轮机作为动力，配备 120 毫米滑膛炮。',
    stats: [
      { labelEn: 'Main Armament', labelZh: '主炮', value: '120 mm 滑膛炮' },
      { labelEn: 'Weight', labelZh: '战斗全重', value: '62 t' },
      { labelEn: 'Crew', labelZh: '乘员', value: '4 人' },
      { labelEn: 'Origin', labelZh: '产地', value: 'United States 美国' }
    ],
    emoji: '🦅',
    flag: '🇺🇸'
  },
  {
    id: '2',
    name: 'Leopard 2A7',
    nameZh: '豹 2A7 主战坦克',
    desc: 'Germany’s main battle tank, widely regarded as the benchmark for firepower, protection and mobility, used by many European armies.',
    descZh: '德国主战坦克，以火力、防护与机动性的均衡表现被视为标杆，被众多欧洲国家陆军采用。',
    stats: [
      { labelEn: 'Main Armament', labelZh: '主炮', value: '120 mm L/55 滑膛炮' },
      { labelEn: 'Weight', labelZh: '战斗全重', value: '67 t' },
      { labelEn: 'Crew', labelZh: '乘员', value: '4 人' },
      { labelEn: 'Origin', labelZh: '产地', value: 'Germany 德国' }
    ],
    emoji: '🐆',
    flag: '🇩🇪'
  },
  {
    id: '3',
    name: 'Challenger 2',
    nameZh: '挑战者 2 主战坦克',
    desc: 'The British main battle tank, famous for its rifled gun and the heavy composite protection known as Chobham armour.',
    descZh: '英国主战坦克，以线膛炮和厚重的「乔巴姆」复合装甲闻名。',
    stats: [
      { labelEn: 'Main Armament', labelZh: '主炮', value: '120 mm 线膛炮' },
      { labelEn: 'Weight', labelZh: '战斗全重', value: '62.5 t' },
      { labelEn: 'Crew', labelZh: '乘员', value: '4 人' },
      { labelEn: 'Origin', labelZh: '产地', value: 'United Kingdom 英国' }
    ],
    emoji: '🏰',
    flag: '🇬🇧'
  },
  {
    id: '4',
    name: 'T-90M',
    nameZh: 'T-90M 主战坦克',
    desc: 'Russia’s upgraded main battle tank, combining a 125 mm smoothbore gun with modern fire control and explosive reactive armour.',
    descZh: '俄罗斯升级版主战坦克，125 毫米滑膛炮搭配现代化火控系统与爆炸反应装甲。',
    stats: [
      { labelEn: 'Main Armament', labelZh: '主炮', value: '125 mm 滑膛炮' },
      { labelEn: 'Weight', labelZh: '战斗全重', value: '46.5 t' },
      { labelEn: 'Crew', labelZh: '乘员', value: '3 人' },
      { labelEn: 'Origin', labelZh: '产地', value: 'Russia 俄罗斯' }
    ],
    emoji: '🐻‍❄️',
    flag: '🇷🇺'
  },
  {
    id: '5',
    name: 'Merkava Mk 4',
    nameZh: '梅卡瓦 Mk 4 主战坦克',
    desc: 'Israel’s main battle tank with the engine mounted at the front for extra crew protection — a design unique among modern MBTs.',
    descZh: '以色列主战坦克，发动机前置以增强乘员防护，在现代主战坦克中设计独特。',
    stats: [
      { labelEn: 'Main Armament', labelZh: '主炮', value: '120 mm 滑膛炮' },
      { labelEn: 'Weight', labelZh: '战斗全重', value: '65 t' },
      { labelEn: 'Crew', labelZh: '乘员', value: '4 人' },
      { labelEn: 'Origin', labelZh: '产地', value: 'Israel 以色列' }
    ],
    emoji: '🪖',
    flag: '🇮🇱'
  },
  {
    id: '6',
    name: 'Type 99A',
    nameZh: '99A 式主战坦克',
    desc: 'China’s most advanced main battle tank, featuring a 125 mm gun, laser counter-measures and a 1,500 hp power plant.',
    descZh: '中国最先进的主战坦克之一，配备 125 毫米火炮、激光对抗系统和 1,500 马力动力装置。',
    stats: [
      { labelEn: 'Main Armament', labelZh: '主炮', value: '125 mm 滑膛炮' },
      { labelEn: 'Weight', labelZh: '战斗全重', value: '55 t' },
      { labelEn: 'Crew', labelZh: '乘员', value: '3 人' },
      { labelEn: 'Origin', labelZh: '产地', value: 'China 中国' }
    ],
    emoji: '🐉',
    flag: '🇨🇳'
  },
];

// =============================================================
//   1) 卡片组件 —— 对应 app.js 的 Planet 组件
// =============================================================
function TankCard({ tank, onRemove }) {
  return (
    <div className="card">
      <div className="card-media">
        <span className="card-emoji">{tank.emoji}</span>
        <span className="card-flag">{tank.flag}</span>
      </div>
      <h2>{tank.name}</h2>
      <p className="name-zh">{tank.nameZh}</p>
      <p>{tank.desc}</p>
      <p className="desc-zh">{tank.descZh}</p>
      <h3>Tank Profile · 坦克资料</h3>
      <ul>
        {tank.stats.map((stat) => (
          <li key={stat.labelEn}>
            <strong>{stat.labelEn} · {stat.labelZh}:</strong> {stat.value}
          </li>
        ))}
      </ul>
      <button className="remove-btn" onClick={() => onRemove(tank.id)}>
        Remove · 移除
      </button>
    </div>
  );
}

// =============================================================
//   2) 列表容器 —— 对应 app.js 的 PlanetList 组件
// =============================================================
function TankList() {
  const [tankList, setTankList] = React.useState(tanks);

  function removeTank(id) {
    setTankList(tankList.filter((tank) => tank.id !== id));
  }

  function resetTanks() {
    setTankList(tanks);
  }

  return (
    <React.Fragment>
      <div className="toolbar">
        <h1>Main Battle Tanks ({tankList.length}) · 主战坦克</h1>
        <button className="reset-btn" onClick={resetTanks}>
          Reset · 重置
        </button>
      </div>

      {tankList.length === 0 ? (
        <p className="empty">No tanks left! · 没有坦克了！</p>
      ) : (
        <div className="container">
          {tankList.map((tank) => (
            <TankCard key={tank.id} tank={tank} onRemove={removeTank} />
          ))}
        </div>
      )}
    </React.Fragment>
  );
}

// =============================================================
//   3) 挂载渲染 —— 对应 app.js 的 ReactDOM.createRoot(...)
// =============================================================
ReactDOM.createRoot(document.getElementById('demo-root')).render(<TankList />);

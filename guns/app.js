/* ============================================================
   主题：著名枪械 · Famous Firearms（百科知识练习，非操作指导）
   ------------------------------------------------------------
   结构与主项目 app.js 完全一致，只是把 planets 换成了 guns：
     1) 卡片组件 GunCard   ← 对应 Planet
     2) 列表容器 GunList   ← 对应 PlanetList（useState + map + filter）
     3) 挂载渲染           ← 对应 ReactDOM.createRoot(...)
   ============================================================ */

const guns = [
  {
    id: '1',
    name: 'AK-47 (Kalashnikov)',
    nameZh: 'AK-47 自动步枪',
    desc: 'The most-produced rifle in history, designed by Mikhail Kalashnikov in 1947 and famous for its reliability in the harshest conditions.',
    descZh: '史上产量最大的步枪，由米哈伊尔·卡拉什尼科夫于 1947 年设计，以恶劣环境下的可靠性闻名。',
    stats: [
      { labelEn: 'Caliber', labelZh: '口径', value: '7.62 × 39 mm' },
      { labelEn: 'Year', labelZh: '定型年份', value: '1947 / 1949' },
      { labelEn: 'Type', labelZh: '类型', value: '自动步枪' },
      { labelEn: 'Origin', labelZh: '产地', value: 'Soviet Union 苏联' }
    ],
    emoji: 'AK',
    flag: '🇷🇺'
  },
  {
    id: '2',
    name: 'M16A4',
    nameZh: 'M16A4 自动步枪',
    desc: 'The American 5.56 mm service rifle that traces back to the Vietnam era; the A4 variant adds a removable carry handle and quad rails.',
    descZh: '美国 5.56 毫米制式步枪，可追溯至越战时期；A4 型增加了可拆卸提把与四面导轨。',
    stats: [
      { labelEn: 'Caliber', labelZh: '口径', value: '5.56 × 45 mm NATO' },
      { labelEn: 'Year', labelZh: '定型年份', value: '1964 / 1997' },
      { labelEn: 'Type', labelZh: '类型', value: '自动步枪' },
      { labelEn: 'Origin', labelZh: '产地', value: 'United States 美国' }
    ],
    emoji: 'M16',
    flag: '🇺🇸'
  },
  {
    id: '3',
    name: 'M4 Carbine',
    nameZh: 'M4 卡宾枪',
    desc: 'A shorter, lighter derivative of the M16 that became the standard carbine of the United States Army in the 1990s.',
    descZh: 'M16 的缩短轻量型衍生机型，20 世纪 90 年代成为美军制式卡宾枪。',
    stats: [
      { labelEn: 'Caliber', labelZh: '口径', value: '5.56 × 45 mm NATO' },
      { labelEn: 'Year', labelZh: '定型年份', value: '1994' },
      { labelEn: 'Type', labelZh: '类型', value: '卡宾枪' },
      { labelEn: 'Origin', labelZh: '产地', value: 'United States 美国' }
    ],
    emoji: 'M4',
    flag: '🇺🇸'
  },
  {
    id: '4',
    name: 'Glock 17',
    nameZh: '格洛克 17 手枪',
    desc: 'The Austrian polymer-frame pistol that defined the modern striker-fired handgun, standard issue for countless armies and police forces.',
    descZh: '奥地利聚合物套筒座手枪，定义了现代击针平移式手枪，是无数军队与警队的制式装备。',
    stats: [
      { labelEn: 'Caliber', labelZh: '口径', value: '9 × 19 mm' },
      { labelEn: 'Year', labelZh: '定型年份', value: '1982' },
      { labelEn: 'Type', labelZh: '类型', value: '半自动手枪' },
      { labelEn: 'Origin', labelZh: '产地', value: 'Austria 奥地利' }
    ],
    emoji: 'G17',
    flag: '🇦🇹'
  },
  {
    id: '5',
    name: 'Heckler & Koch MP5',
    nameZh: 'HK MP5 冲锋枪',
    desc: 'The German roller-delayed blowback submachine gun that became the icon of counter-terrorism units in the 1970s and 1980s.',
    descZh: '德国滚柱延迟反冲式冲锋枪，20 世纪 70–80 年代成为反恐部队的标志性武器。',
    stats: [
      { labelEn: 'Caliber', labelZh: '口径', value: '9 × 19 mm' },
      { labelEn: 'Year', labelZh: '定型年份', value: '1966' },
      { labelEn: 'Type', labelZh: '类型', value: '冲锋枪' },
      { labelEn: 'Origin', labelZh: '产地', value: 'Germany 德国' }
    ],
    emoji: 'MP5',
    flag: '🇩🇪'
  },
  {
    id: '6',
    name: 'Barrett M82',
    nameZh: '巴雷特 M82 狙击步枪',
    desc: 'The semi-automatic .50 BMG anti-materiel rifle nicknamed the “Light Fifty”, famous for its extreme long-range power.',
    descZh: '半自动 .50 BMG 反器材步枪，绰号“轻量化.50”，以超远射程与强大威力著称。',
    stats: [
      { labelEn: 'Caliber', labelZh: '口径', value: '.50 BMG (12.7 × 99 mm)' },
      { labelEn: 'Year', labelZh: '定型年份', value: '1982' },
      { labelEn: 'Type', labelZh: '类型', value: '反器材狙击步枪' },
      { labelEn: 'Origin', labelZh: '产地', value: 'United States 美国' }
    ],
    emoji: 'M82',
    flag: '🇺🇸'
  },
];

// =============================================================
//   1) 卡片组件 —— 对应 app.js 的 Planet 组件
// =============================================================
function GunCard({ gun, onRemove }) {
  return (
    <div className="card">
      <div className="card-media">
        <span className="card-emoji">{gun.emoji}</span>
        <span className="card-flag">{gun.flag}</span>
      </div>
      <h2>{gun.name}</h2>
      <p className="name-zh">{gun.nameZh}</p>
      <p>{gun.desc}</p>
      <p className="desc-zh">{gun.descZh}</p>
      <h3>Firearm Profile · 枪械资料</h3>
      <ul>
        {gun.stats.map((stat) => (
          <li key={stat.labelEn}>
            <strong>{stat.labelEn} · {stat.labelZh}:</strong> {stat.value}
          </li>
        ))}
      </ul>
      <button className="remove-btn" onClick={() => onRemove(gun.id)}>
        Remove · 移除
      </button>
    </div>
  );
}

// =============================================================
//   2) 列表容器 —— 对应 app.js 的 PlanetList 组件
// =============================================================
function GunList() {
  const [gunList, setGunList] = React.useState(guns);

  function removeGun(id) {
    setGunList(gunList.filter((gun) => gun.id !== id));
  }

  function resetGuns() {
    setGunList(guns);
  }

  return (
    <React.Fragment>
      <div className="toolbar">
        <h1>Famous Firearms ({gunList.length}) · 著名枪械</h1>
        <button className="reset-btn" onClick={resetGuns}>
          Reset · 重置
        </button>
      </div>

      {gunList.length === 0 ? (
        <p className="empty">No guns left! · 没有枪械了！</p>
      ) : (
        <div className="container">
          {gunList.map((gun) => (
            <GunCard key={gun.id} gun={gun} onRemove={removeGun} />
          ))}
        </div>
      )}
    </React.Fragment>
  );
}

// =============================================================
//   3) 挂载渲染 —— 对应 app.js 的 ReactDOM.createRoot(...)
// =============================================================
ReactDOM.createRoot(document.getElementById('demo-root')).render(<GunList />);

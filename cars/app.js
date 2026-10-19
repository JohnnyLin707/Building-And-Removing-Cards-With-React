/* ============================================================
   主题：著名跑车 · Famous Sports Cars
   ------------------------------------------------------------
   结构与主项目 app.js 完全一致，只是把 planets 换成了 cars：
     1) 卡片组件 CarCard   ← 对应 Planet
     2) 列表容器 CarList   ← 对应 PlanetList（useState + map + filter）
     3) 挂载渲染           ← 对应 ReactDOM.createRoot(...)
   数据字段：id / name / nameZh / desc / descZh / stats / emoji / flag
   ============================================================ */

const cars = [
  {
    id: '1',
    name: 'Lamborghini Aventador',
    nameZh: '兰博基尼 Aventador',
    desc: "Lamborghini's flagship mid-engine V12 supercar, named after a legendary fighting bull. Its razor-sharp lines and scissor doors made it an icon of the 2010s.",
    descZh: '兰博基尼的旗舰中置引擎 V12 超跑，以一头传奇斗牛命名。锐利的线条与剪刀门让它成为 2010 年代的标志性超跑。',
    stats: [
      { labelEn: 'Top Speed', labelZh: '最高时速', value: '350 km/h' },
      { labelEn: 'Power', labelZh: '最大功率', value: '730 hp' },
      { labelEn: 'Engine', labelZh: '引擎', value: 'V12 自然吸气' },
      { labelEn: 'Origin', labelZh: '产地', value: 'Italy 意大利' }
    ],
    emoji: '🐂',
    flag: '🇮🇹'
  },
  {
    id: '2',
    name: 'Ferrari LaFerrari',
    nameZh: '法拉利 LaFerrari',
    desc: 'Ferrari’s first hybrid hypercar, pairing a 6.3 L V12 with an electric motor for nearly 1,000 hp. Only 499 coupés were built.',
    descZh: '法拉利首款混合动力超跑，6.3 升 V12 发动机搭配电动机，综合功率接近 1,000 马力，硬顶版仅生产 499 台。',
    stats: [
      { labelEn: 'Top Speed', labelZh: '最高时速', value: '350+ km/h' },
      { labelEn: 'Power', labelZh: '最大功率', value: '950 hp' },
      { labelEn: 'Engine', labelZh: '引擎', value: 'V12 + 电机' },
      { labelEn: 'Origin', labelZh: '产地', value: 'Italy 意大利' }
    ],
    emoji: '🐎',
    flag: '🇮🇹'
  },
  {
    id: '3',
    name: 'Porsche 911 (992)',
    nameZh: '保时捷 911（992）',
    desc: 'The rear-engine sports car benchmark, in production since 1963. The 992 generation keeps the classic silhouette while adding modern tech.',
    descZh: '后置引擎跑车的标杆，自 1963 年投产至今不断进化。第 992 代在保留经典轮廓的同时加入了现代科技。',
    stats: [
      { labelEn: 'Top Speed', labelZh: '最高时速', value: '320 km/h' },
      { labelEn: 'Power', labelZh: '最大功率', value: '502 hp (GT3)' },
      { labelEn: 'Engine', labelZh: '引擎', value: '水平对置六缸' },
      { labelEn: 'Origin', labelZh: '产地', value: 'Germany 德国' }
    ],
    emoji: '🏎️',
    flag: '🇩🇪'
  },
  {
    id: '4',
    name: 'McLaren P1',
    nameZh: '迈凯伦 P1',
    desc: "McLaren's hybrid hypercar and the spiritual successor to the F1, with a twin-turbo V8 plus electric motor and active aerodynamics.",
    descZh: '迈凯伦的混合动力超跑，被视为传奇 F1 的精神续作：双涡轮 V8 加电动机，并配备主动式空气动力学套件。',
    stats: [
      { labelEn: 'Top Speed', labelZh: '最高时速', value: '350 km/h' },
      { labelEn: 'Power', labelZh: '最大功率', value: '903 hp' },
      { labelEn: 'Engine', labelZh: '引擎', value: 'V8 双涡轮 + 电机' },
      { labelEn: 'Origin', labelZh: '产地', value: 'United Kingdom 英国' }
    ],
    emoji: '🏁',
    flag: '🇬🇧'
  },
  {
    id: '5',
    name: 'Bugatti Chiron',
    nameZh: '布加迪 Chiron',
    desc: 'A 1,500 hp quad-turbo W16 hypercar that redefined the meaning of speed, named after the Monegasque racing driver Louis Chiron.',
    descZh: '1,500 匹马力的四涡轮 W16 超跑，重新定义了「速度」的含义，以摩纳哥赛车手 Louis Chiron 命名。',
    stats: [
      { labelEn: 'Top Speed', labelZh: '最高时速', value: '420 km/h' },
      { labelEn: 'Power', labelZh: '最大功率', value: '1,500 hp' },
      { labelEn: 'Engine', labelZh: '引擎', value: 'W16 四涡轮增压' },
      { labelEn: 'Origin', labelZh: '产地', value: 'France 法国' }
    ],
    emoji: '⚡',
    flag: '🇫🇷'
  },
  {
    id: '6',
    name: 'Koenigsegg Jesko',
    nameZh: '科尼赛克 Jesko',
    desc: 'A Swedish megacar focused on outright speed, with a 1,600 hp V8 and a revolutionary 9-speed multi-clutch gearbox.',
    descZh: '专注于极限速度的瑞典超级跑车，1,600 马力 V8 发动机搭配革命性的 9 速多离合变速箱（LST）。',
    stats: [
      { labelEn: 'Top Speed', labelZh: '最高时速', value: '483 km/h（目标）' },
      { labelEn: 'Power', labelZh: '最大功率', value: '1,600 hp' },
      { labelEn: 'Engine', labelZh: '引擎', value: 'V8 双涡轮增压' },
      { labelEn: 'Origin', labelZh: '产地', value: 'Sweden 瑞典' }
    ],
    emoji: '👻',
    flag: '🇸🇪'
  },
];

// =============================================================
//   1) 卡片组件 —— 对应 app.js 的 Planet 组件
// =============================================================
function CarCard({ car, onRemove }) {
  return (
    <div className="card">
      <div className="card-media">
        <span className="card-emoji">{car.emoji}</span>
        <span className="card-flag">{car.flag}</span>
      </div>
      <h2>{car.name}</h2>
      <p className="name-zh">{car.nameZh}</p>
      <p>{car.desc}</p>
      <p className="desc-zh">{car.descZh}</p>
      <h3>Car Profile · 跑车资料</h3>
      <ul>
        {car.stats.map((stat) => (
          <li key={stat.labelEn}>
            <strong>{stat.labelEn} · {stat.labelZh}:</strong> {stat.value}
          </li>
        ))}
      </ul>
      <button className="remove-btn" onClick={() => onRemove(car.id)}>
        Remove · 移除
      </button>
    </div>
  );
}

// =============================================================
//   2) 列表容器 —— 对应 app.js 的 PlanetList 组件
// =============================================================
function CarList() {
  const [carList, setCarList] = React.useState(cars);

  function removeCar(id) {
    setCarList(carList.filter((car) => car.id !== id));
  }

  function resetCars() {
    setCarList(cars);
  }

  return (
    <React.Fragment>
      <div className="toolbar">
        <h1>Famous Sports Cars ({carList.length}) · 著名跑车</h1>
        <button className="reset-btn" onClick={resetCars}>
          Reset · 重置
        </button>
      </div>

      {carList.length === 0 ? (
        <p className="empty">No cars left! · 没有跑车了！</p>
      ) : (
        <div className="container">
          {carList.map((car) => (
            <CarCard key={car.id} car={car} onRemove={removeCar} />
          ))}
        </div>
      )}
    </React.Fragment>
  );
}

// =============================================================
//   3) 挂载渲染 —— 对应 app.js 的 ReactDOM.createRoot(...)
// =============================================================
ReactDOM.createRoot(document.getElementById('demo-root')).render(<CarList />);

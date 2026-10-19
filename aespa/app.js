/* ============================================================
   主题：KPOP 人物 · aespa（SM 娱乐 2020 年推出的四人女团）
   ------------------------------------------------------------
   结构与主项目 app.js 完全一致，只是把 planets 换成了 members：
     1) 卡片组件 MemberCard   ← 对应 Planet
     2) 列表容器 MemberList   ← 对应 PlanetList（useState + map + filter）
     3) 挂载渲染              ← 对应 ReactDOM.createRoot(...)
   ============================================================ */

const members = [
  {
    id: '1',
    name: 'Karina (Yu Ji-min)',
    nameZh: '刘知珉 · Karina',
    desc: 'Leader, main dancer and rapper of aespa, known for her sharp stage presence and versatile, chameleon-like visuals.',
    descZh: 'aespa 的队长、主舞与 Rapper，以极具穿透力的舞台表现和百变的视觉风格著称。',
    stats: [
      { labelEn: 'Position', labelZh: '担当', value: 'Leader · Main Dancer · Rapper' },
      { labelEn: 'Birthday', labelZh: '生日', value: 'April 11, 2000' },
      { labelEn: 'Nationality', labelZh: '国籍', value: 'South Korea 韩国' },
      { labelEn: 'Debut', labelZh: '出道', value: '2020 · Black Mamba' }
    ],
    emoji: '🩰',
    flag: '🇰🇷'
  },
  {
    id: '2',
    name: 'Giselle (Uchinaga Aeri)',
    nameZh: '内永绘利 · Giselle',
    desc: 'Main rapper and vocalist of aespa, fluent in Korean, Japanese and English, praised for her smooth and confident rap delivery.',
    descZh: 'aespa 的主 Rapper 与演唱者，精通韩语、日语和英语，以流畅自信的 Rap 实力受到好评。',
    stats: [
      { labelEn: 'Position', labelZh: '担当', value: 'Main Rapper · Vocalist' },
      { labelEn: 'Birthday', labelZh: '生日', value: 'October 30, 2000' },
      { labelEn: 'Nationality', labelZh: '国籍', value: 'Japan 日本' },
      { labelEn: 'Debut', labelZh: '出道', value: '2020 · Black Mamba' }
    ],
    emoji: '🎙️',
    flag: '🇯🇵'
  },
  {
    id: '3',
    name: 'Winter (Kim Min-jeong)',
    nameZh: '金玟庭 · Winter',
    desc: 'Main vocalist and dancer of aespa, loved for her clear high notes, bright energy and expressive performances.',
    descZh: 'aespa 的主唱与舞者，以清澈的高音、明亮的活力与富有感染力的表演深受喜爱。',
    stats: [
      { labelEn: 'Position', labelZh: '担当', value: 'Main Vocalist · Dancer' },
      { labelEn: 'Birthday', labelZh: '生日', value: 'January 1, 2001' },
      { labelEn: 'Nationality', labelZh: '国籍', value: 'South Korea 韩国' },
      { labelEn: 'Debut', labelZh: '出道', value: '2020 · Black Mamba' }
    ],
    emoji: '🎤',
    flag: '🇰🇷'
  },
  {
    id: '4',
    name: 'Ningning (Ning Yi-zhuo)',
    nameZh: '宁艺卓 · Ningning',
    desc: 'Main vocalist of aespa from Harbin, China, famous for her powerful vocals, discovered on a Chinese television singing show.',
    descZh: 'aespa 的主唱，来自中国哈尔滨，因在中国电视歌唱节目中被发掘，以强劲的唱功闻名。',
    stats: [
      { labelEn: 'Position', labelZh: '担当', value: 'Main Vocalist' },
      { labelEn: 'Birthday', labelZh: '生日', value: 'October 23, 2002' },
      { labelEn: 'Nationality', labelZh: '国籍', value: 'China 中国' },
      { labelEn: 'Debut', labelZh: '出道', value: '2020 · Black Mamba' }
    ],
    emoji: '🎶',
    flag: '🇨🇳'
  },
];

// =============================================================
//   1) 卡片组件 —— 对应 app.js 的 Planet 组件
// =============================================================
function MemberCard({ member, onRemove }) {
  return (
    <div className="card">
      <div className="card-media">
        <span className="card-emoji">{member.emoji}</span>
        <span className="card-flag">{member.flag}</span>
      </div>
      <h2>{member.name}</h2>
      <p className="name-zh">{member.nameZh}</p>
      <p>{member.desc}</p>
      <p className="desc-zh">{member.descZh}</p>
      <h3>Member Profile · 成员资料</h3>
      <ul>
        {member.stats.map((stat) => (
          <li key={stat.labelEn}>
            <strong>{stat.labelEn} · {stat.labelZh}:</strong> {stat.value}
          </li>
        ))}
      </ul>
      <button className="remove-btn" onClick={() => onRemove(member.id)}>
        Remove · 移除
      </button>
    </div>
  );
}

// =============================================================
//   2) 列表容器 —— 对应 app.js 的 PlanetList 组件
// =============================================================
function MemberList() {
  const [memberList, setMemberList] = React.useState(members);

  function removeMember(id) {
    setMemberList(memberList.filter((member) => member.id !== id));
  }

  function resetMembers() {
    setMemberList(members);
  }

  return (
    <React.Fragment>
      <div className="toolbar">
        <h1>aespa Members ({memberList.length}) · 成员</h1>
        <button className="reset-btn" onClick={resetMembers}>
          Reset · 重置
        </button>
      </div>

      {memberList.length === 0 ? (
        <p className="empty">No members left! · 没有成员了！</p>
      ) : (
        <div className="container">
          {memberList.map((member) => (
            <MemberCard key={member.id} member={member} onRemove={removeMember} />
          ))}
        </div>
      )}
    </React.Fragment>
  );
}

// =============================================================
//   3) 挂载渲染 —— 对应 app.js 的 ReactDOM.createRoot(...)
// =============================================================
ReactDOM.createRoot(document.getElementById('demo-root')).render(<MemberList />);

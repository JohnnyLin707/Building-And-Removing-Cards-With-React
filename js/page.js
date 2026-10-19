/* ============================================================
   PracticeHub · 页面逻辑
   - 首页：渲染主题选择卡片
   - 主题页：渲染互动练习（提示 / 答案 / 中英文备注）与自测题
   ============================================================ */

(function () {
  'use strict';

  var TOPICS = window.TOPICS || {};
  var PRACTICE = window.PRACTICE || {};
  var topicKey = document.body.getAttribute('data-topic') || '';

  /* ============================================================
     小工具
     ============================================================ */

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  // 把 `code` 反引号转成 <code>，其余 HTML 先转义（内容均为静态文案，安全可控）
  function inline(text) {
    var escaped = String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    return escaped.replace(/`([^`]+)`/g, '<code>$1</code>');
  }

  function togglePanel(btn, panel) {
    var willShow = panel.hidden;
    panel.hidden = !willShow;
    btn.classList.toggle('active', willShow);
    btn.setAttribute('aria-expanded', willShow ? 'true' : 'false');
  }

  function copyText(text, btn) {
    function done() {
      var old = btn.dataset.label || btn.textContent;
      btn.dataset.label = old;
      btn.textContent = '已复制 ✓';
      setTimeout(function () { btn.textContent = old; }, 1600);
    }
    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', 'readonly');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        done();
      } catch (e) {
        btn.textContent = '复制失败';
      }
      document.body.removeChild(ta);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(fallback);
    } else {
      fallback();
    }
  }

  /* ============================================================
     互动练习：题目卡（提示 / 答案 / 中英文备注）
     ============================================================ */

  function renderPractice(topic, questions) {
    var mount = document.getElementById('practice-list');
    if (!mount) return;

    questions.forEach(function (q, index) {
      var card = el('article', 'practice-card');

      var head = el('header', 'practice-head');
      head.appendChild(el('span', 'q-no', '题目 ' + (index + 1)));
      head.appendChild(el('span', 'q-tag', q.tag));
      card.appendChild(head);

      var title = el('h3', 'q-title');
      title.innerHTML = inline(q.title);
      card.appendChild(title);

      var body = el('p', 'q-body');
      body.innerHTML = inline(q.body);
      card.appendChild(body);

      /* --- 提示面板 --- */
      var hintPanel = el('div', 'q-panel hint-panel');
      hintPanel.hidden = true;
      var hintList = document.createElement('ul');
      q.hints.forEach(function (h) {
        var li = document.createElement('li');
        li.innerHTML = inline(h);
        hintList.appendChild(li);
      });
      hintPanel.appendChild(hintList);

      /* --- 答案面板（代码 + 复制） --- */
      var answerPanel = el('div', 'q-panel answer-panel');
      answerPanel.hidden = true;
      var answerHead = el('div', 'answer-head');
      answerHead.appendChild(el('span', null, '参考答案 · Reference Answer'));
      var copyBtn = el('button', 'copy-btn', '复制代码');
      copyBtn.addEventListener('click', function () { copyText(q.answer, copyBtn); });
      answerHead.appendChild(copyBtn);
      answerPanel.appendChild(answerHead);

      var pre = document.createElement('pre');
      pre.className = 'code-block';
      var codeEl = document.createElement('code');
      codeEl.textContent = q.answer;
      pre.appendChild(codeEl);
      answerPanel.appendChild(pre);

      /* --- 中英文备注面板 --- */
      var notePanel = el('div', 'q-panel note-panel');
      notePanel.hidden = true;
      var pZh = document.createElement('p');
      var pEn = document.createElement('p');
      pZh.innerHTML = '<span class="lang">中文：</span>' + inline(q.noteZh);
      pEn.innerHTML = '<span class="lang">English:</span> ' + inline(q.noteEn);
      notePanel.appendChild(pZh);
      notePanel.appendChild(pEn);

      /* --- 按钮区 --- */
      var actions = el('div', 'q-actions');
      var hintBtn = el('button', 'q-btn', '💡 提示 Hint');
      var answerBtn = el('button', 'q-btn', '✅ 答案 Answer');
      var noteBtn = el('button', 'q-btn', '🌐 中英文备注 Notes');
      hintBtn.addEventListener('click', function () { togglePanel(hintBtn, hintPanel); });
      answerBtn.addEventListener('click', function () { togglePanel(answerBtn, answerPanel); });
      noteBtn.addEventListener('click', function () { togglePanel(noteBtn, notePanel); });
      actions.append(hintBtn, answerBtn, noteBtn);

      card.appendChild(actions);
      card.appendChild(hintPanel);
      card.appendChild(answerPanel);
      card.appendChild(notePanel);
      mount.appendChild(card);
    });
  }

  /* ============================================================
     自测题：选项 + 提示 + 中英解析 + 计分
     ============================================================ */

  function renderQuiz(topic, quiz) {
    var mount = document.getElementById('quiz-root');
    var summary = document.getElementById('quiz-summary');
    if (!mount) return;

    var letters = ['A', 'B', 'C', 'D'];
    var score = 0;
    var answered = 0;

    function updateSummary() {
      if (summary) {
        summary.textContent = '共 ' + quiz.length + ' 题 · 已答 ' + answered + ' 题 · 答对 ' + score + ' 题';
      }
    }

    quiz.forEach(function (q, qi) {
      var card = el('article', 'quiz-card');

      var qText = el('p', 'quiz-q');
      qText.innerHTML = (qi + 1) + '. ' + inline(q.q);
      card.appendChild(qText);

      var options = el('div', 'quiz-options');
      var feedback = el('div', 'quiz-feedback');
      feedback.hidden = true;

      var hint = el('div', 'quiz-hint');
      hint.hidden = true;
      hint.textContent = '💡 提示：' + q.hint;

      var hintBtn = el('button', 'q-btn', '💡 看提示');
      hintBtn.addEventListener('click', function () { togglePanel(hintBtn, hint); });

      var done = false;
      q.options.forEach(function (opt, oi) {
        var btn = el('button', 'quiz-option');
        btn.appendChild(el('span', 'opt-letter', letters[oi] + '.'));
        btn.appendChild(document.createTextNode(opt));

        btn.addEventListener('click', function () {
          if (done) return;
          done = true;
          answered = answered + 1;
          var isCorrect = oi === q.answer;
          if (isCorrect) score = score + 1;

          Array.prototype.forEach.call(options.children, function (child, idx) {
            child.disabled = true;
            if (idx === q.answer) child.classList.add('correct');
          });
          if (!isCorrect) btn.classList.add('wrong');

          feedback.hidden = false;
          feedback.className = 'quiz-feedback ' + (isCorrect ? 'ok' : 'bad');
          var line1 = document.createElement('p');
          line1.innerHTML = isCorrect
            ? '✓ 回答正确！Correct!'
            : '✗ 答错了，正确答案是 ' + letters[q.answer] + '。Incorrect — the answer is ' + letters[q.answer] + '.';
          var line2 = document.createElement('p');
          line2.innerHTML = '<strong>中文：</strong>' + inline(q.explainZh);
          var line3 = document.createElement('p');
          line3.className = 'en';
          line3.innerHTML = '<strong>English:</strong> ' + inline(q.explainEn);
          feedback.append(line1, line2, line3);

          hintBtn.disabled = true;
          updateSummary();
        });

        options.appendChild(btn);
      });

      card.appendChild(options);
      card.appendChild(feedback);

      var qActions = el('div', 'quiz-actions');
      qActions.appendChild(hintBtn);
      card.appendChild(qActions);
      mount.appendChild(card);
    });

    /* 重新开始 */
    var resetWrap = el('div', 'quiz-actions');
    var resetBtn = el('button', 'quiz-reset', '↺ 重新开始自测');
    resetBtn.addEventListener('click', function () {
      mount.innerHTML = '';
      renderQuiz(topic, quiz);
    });
    resetWrap.appendChild(resetBtn);
    mount.appendChild(resetWrap);

    updateSummary();
  }

  /* ============================================================
     首页：主题卡片网格
     ============================================================ */

  function renderHub() {
    var grid = document.getElementById('topic-grid');
    if (!grid) return;

    Object.keys(TOPICS).forEach(function (key) {
      var t = TOPICS[key];
      var card = document.createElement('a');
      card.className = 'topic-card';
      card.href = t.path + 'index.html';
      card.style.setProperty('--c', t.accent);

      var h3 = document.createElement('h3');
      h3.appendChild(document.createTextNode(t.title + ' '));
      h3.appendChild(el('span', 'en', t.titleEn));

      var meta = el('div', 'topic-meta');
      meta.appendChild(el('span', null, t.count + ' 张卡片'));
      meta.appendChild(el('span', null, '5 道练习题'));
      meta.appendChild(el('span', null, '3 道自测题'));

      var taglineEn = el('p', 'topic-tagline', t.taglineEn);

      card.append(
        el('span', 'topic-icon', t.icon),
        h3,
        el('p', 'topic-tagline', t.tagline),
        taglineEn,
        meta,
        el('span', 'topic-cta', '开始练习 →')
      );
      grid.appendChild(card);
    });
  }

  /* ============================================================
     入口
     ============================================================ */

  if (topicKey && TOPICS[topicKey]) {
    renderPractice(TOPICS[topicKey], PRACTICE[topicKey] || []);
    renderQuiz(TOPICS[topicKey], TOPICS[topicKey].quiz || []);
  } else {
    renderHub();
  }
})();

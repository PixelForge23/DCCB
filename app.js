/* ============================================================
   DCCB 2026 PREP — APP LOGIC
   ============================================================ */

var STORAGE_PROGRESS = "dccb_progress_v1";
var STORAGE_DAILY = "dccb_daily_v1";
var STORAGE_MOCK_HISTORY = "dccb_mock_history_v1";

/* ---------- storage helpers ---------- */
function loadJSON(key, fallback){
  try{
    var raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  }catch(e){ return fallback; }
}
function saveJSON(key, val){
  try{ localStorage.setItem(key, JSON.stringify(val)); }catch(e){}
}
function getProgress(){ return loadJSON(STORAGE_PROGRESS, {}); }
function recordAnswer(qid, isCorrect){
  var p = getProgress();
  p[qid] = { correct: isCorrect, ts: Date.now() };
  saveJSON(STORAGE_PROGRESS, p);
}

/* ---------- seeded random (for daily practice) ---------- */
function hashString(s){
  var h = 1779033703;
  for (var i = 0; i < s.length; i++){
    h = Math.imul(h ^ s.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return h >>> 0;
}
function mulberry32(seed){
  return function(){
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function seededShuffle(arr, seed){
  var rng = mulberry32(seed);
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--){
    var j = Math.floor(rng() * (i + 1));
    var t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}

/* ---------- navigation ---------- */
var VIEWS = ["home","topic","search","daily","mocksetup","mockrun","mockresult","progress"];
var TAB_VIEWS = { home:"home", daily:"daily", mocksetup:"mocksetup", topic:"topic", progress:"progress" };

function goTo(view){
  VIEWS.forEach(function(v){
    document.getElementById("view-" + v).classList.toggle("active", v === view);
  });
  document.querySelectorAll(".tabbar button").forEach(function(btn){
    btn.classList.toggle("active", btn.getAttribute("data-go") === view || TAB_VIEWS[btn.getAttribute("data-go")] === view);
  });
  document.querySelectorAll(".desktop-nav button").forEach(function(btn){
    btn.classList.toggle("active", btn.getAttribute("data-go") === view);
  });
  window.scrollTo({top:0, behavior:"instant"});
  if (view === "home") renderHome();
  if (view === "topic") { populateTopicSelectors(); applyTopicFilter(); }
  if (view === "daily") renderDaily();
  if (view === "mocksetup") renderMockSetup();
  if (view === "progress") renderProgress();
}

document.addEventListener("click", function(e){
  var goBtn = e.target.closest("[data-go]");
  if (goBtn){ goTo(goBtn.getAttribute("data-go")); }
});

/* ---------- top stat chip + desktop nav ---------- */
function updateTopStat(){
  document.getElementById("topStat").textContent = QUESTIONS.length + " questions";
}
function buildDesktopNav(){
  var nav = document.getElementById("desktopNav");
  var items = [["home","Home"],["daily","Daily"],["mocksetup","Mock test"],["topic","Topics"],["search","Search"],["progress","Progress"]];
  nav.innerHTML = items.map(function(it){
    return '<button data-go="' + it[0] + '">' + it[1] + '</button>';
  }).join("");
}

/* ---------- HOME ---------- */
function renderHome(){
  var progress = getProgress();
  var attempted = Object.keys(progress).length;
  var correct = 0;
  Object.keys(progress).forEach(function(k){ if (progress[k].correct) correct++; });
  var accuracy = attempted ? Math.round((correct/attempted)*100) : 0;

  document.getElementById("homeMiniStats").innerHTML =
    stat(QUESTIONS.length, "Questions") +
    stat(SECTIONS.length, "Sections") +
    stat(attempted, "Attempted") +
    stat(accuracy + "%", "Accuracy");

  document.getElementById("honestNote").textContent =
    "This bank currently holds " + QUESTIONS.length + " genuinely distinct questions — every one has different wording, numbers or facts. No question is repeated with a fake counter.";
}
function stat(num, lbl){
  return '<div class="mini-stat"><div class="num">' + num + '</div><div class="lbl">' + lbl + '</div></div>';
}

/* ============================================================
   Shared question-card rendering (used by Topic Practice,
   Search results, and Daily Practice)
   ============================================================ */

/* Returns a DOM node for a single question card.
   onAnswered(qid, isCorrect) is called once the user picks an option. */
function buildQuestionCard(q, onAnswered){
  var card = document.createElement("div");
  card.className = "qcard";

  var meta = document.createElement("div");
  meta.className = "qmeta";
  meta.innerHTML =
    '<span class="tag section">' + q.section + '</span>' +
    '<span class="tag topic">' + q.topic + '</span>' +
    '<span class="tag diff-' + q.difficulty + '">' + q.difficulty + '</span>';
  card.appendChild(meta);

  var qt = document.createElement("div");
  qt.className = "qtext";
  qt.textContent = q.question;
  card.appendChild(qt);

  var opts = document.createElement("div");
  opts.className = "opts";
  var shuffledOptions = shuffleArr(q.options);
  var answered = false;

  shuffledOptions.forEach(function(opt){
    var btn = document.createElement("button");
    btn.className = "opt-btn";
    btn.textContent = opt.text;
    btn.addEventListener("click", function(){
      if (answered) return;
      answered = true;
      var allBtns = opts.querySelectorAll(".opt-btn");
      allBtns.forEach(function(b){ b.disabled = true; });
      shuffledOptions.forEach(function(o, idx){
        var b = allBtns[idx];
        if (o.correct) b.classList.add("correct");
      });
      if (!opt.correct) btn.classList.add("wrong");
      else btn.classList.add("selected");
      var exp = card.querySelector(".explain");
      exp.classList.add("show");
      recordAnswer(q.id, !!opt.correct);
      if (onAnswered) onAnswered(q.id, !!opt.correct);
    });
    opts.appendChild(btn);
  });
  card.appendChild(opts);

  var exp = document.createElement("div");
  exp.className = "explain";
  exp.innerHTML = "<strong>Explanation:</strong> " + q.explanation;
  card.appendChild(exp);

  return card;
}

/* ---------- generic single-question pager state ---------- */
function makePager(containerEl, posEl, prevBtn, nextBtn, progressBarEl){
  return {
    list: [],
    index: 0,
    setList: function(list){
      this.list = list;
      this.index = 0;
      this.render();
    },
    render: function(){
      containerEl.innerHTML = "";
      if (!this.list.length){
        containerEl.innerHTML = '<div class="empty-state"><div class="ic">🗂️</div>No questions match these filters yet.</div>';
        if (posEl) posEl.textContent = "0 / 0";
        if (progressBarEl) progressBarEl.style.width = "0%";
        return;
      }
      var q = this.list[this.index];
      containerEl.appendChild(buildQuestionCard(q));
      if (posEl) posEl.textContent = (this.index + 1) + " / " + this.list.length;
      if (progressBarEl) progressBarEl.style.width = Math.round(((this.index+1)/this.list.length)*100) + "%";
      if (prevBtn) prevBtn.disabled = this.index === 0;
      if (nextBtn) nextBtn.disabled = this.index === this.list.length - 1;
    },
    prev: function(){ if (this.index > 0){ this.index--; this.render(); } },
    next: function(){ if (this.index < this.list.length - 1){ this.index++; this.render(); } }
  };
}

/* ============================================================
   TOPIC PRACTICE
   ============================================================ */
var topicPager = null;

function populateTopicSelectors(){
  var secSel = document.getElementById("topicSection");
  if (secSel.options.length === 0){
    secSel.innerHTML = '<option value="all">All sections</option>' + SECTIONS.map(function(s){ return '<option value="' + s + '">' + s + '</option>'; }).join("");
  }
  refreshTopicOptions();
}
function refreshTopicOptions(){
  var sec = document.getElementById("topicSection").value;
  var topicSel = document.getElementById("topicTopic");
  var topics = sec === "all" ? [].concat.apply([], SECTIONS.map(function(s){ return TOPICS_BY_SECTION[s]; })) : TOPICS_BY_SECTION[sec];
  var uniqueTopics = topics.filter(function(t,i){ return topics.indexOf(t) === i; });
  var current = topicSel.value;
  topicSel.innerHTML = '<option value="all">All topics</option>' + uniqueTopics.map(function(t){ return '<option value="' + t + '">' + t + '</option>'; }).join("");
  if (uniqueTopics.indexOf(current) !== -1) topicSel.value = current;
}
document.getElementById("topicSection").addEventListener("change", refreshTopicOptions);

function applyTopicFilter(){
  var sec = document.getElementById("topicSection").value;
  var topic = document.getElementById("topicTopic").value;
  var diff = document.getElementById("topicDifficulty").value;
  var filtered = QUESTIONS.filter(function(q){
    if (sec !== "all" && q.section !== sec) return false;
    if (topic !== "all" && q.topic !== topic) return false;
    if (diff !== "all" && q.difficulty !== diff) return false;
    return true;
  });
  document.getElementById("topicCountNote").textContent = filtered.length + " question" + (filtered.length===1?"":"s") + " match this filter.";
  if (!topicPager){
    topicPager = makePager(
      document.getElementById("topicQuestionArea"),
      document.getElementById("topicPos"),
      document.getElementById("topicPrev"),
      document.getElementById("topicNext"),
      document.getElementById("topicProgressBar")
    );
  }
  topicPager.setList(shuffleArr(filtered));
}
document.getElementById("topicApply").addEventListener("click", applyTopicFilter);
document.getElementById("topicPrev").addEventListener("click", function(){ topicPager.prev(); });
document.getElementById("topicNext").addEventListener("click", function(){ topicPager.next(); });

/* ============================================================
   SEARCH
   ============================================================ */
var searchPager = null;
function runSearch(){
  var kw = document.getElementById("searchInput").value.trim().toLowerCase();
  var results = !kw ? [] : QUESTIONS.filter(function(q){
    return q.question.toLowerCase().indexOf(kw) !== -1 ||
           q.topic.toLowerCase().indexOf(kw) !== -1 ||
           q.section.toLowerCase().indexOf(kw) !== -1 ||
           q.explanation.toLowerCase().indexOf(kw) !== -1;
  });
  document.getElementById("searchCountNote").textContent = kw ? (results.length + " result" + (results.length===1?"":"s") + " for \"" + kw + "\"") : "Type a keyword above and press Search.";
  var area = document.getElementById("searchResults");
  area.innerHTML = "";
  if (kw && !results.length){
    area.innerHTML = '<div class="empty-state"><div class="ic">🔍</div>No questions matched that search.</div>';
    return;
  }
  results.slice(0, 60).forEach(function(q){
    area.appendChild(buildQuestionCard(q));
  });
}
document.getElementById("searchBtn").addEventListener("click", runSearch);
document.getElementById("searchInput").addEventListener("keydown", function(e){ if (e.key === "Enter") runSearch(); });

/* ============================================================
   DAILY PRACTICE
   ============================================================ */
var dailyPager = null;
function getTodayKey(){
  var d = new Date();
  return d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();
}
function renderDaily(){
  var todayKey = getTodayKey();
  document.getElementById("dailyDateLabel").textContent = new Date().toLocaleDateString(undefined, {weekday:"long", year:"numeric", month:"long", day:"numeric"});

  var dailyStore = loadJSON(STORAGE_DAILY, {});
  var progress = getProgress();
  var mastered = {};
  Object.keys(progress).forEach(function(k){ if (progress[k].correct) mastered[k] = true; });

  var todaysIds = dailyStore[todayKey];
  if (!todaysIds){
    var seed = hashString(todayKey);
    var shuffled = seededShuffle(QUESTIONS, seed);
    var fresh = shuffled.filter(function(q){ return !mastered[q.id]; });
    var pool = fresh.length >= 20 ? fresh : shuffled;
    todaysIds = pool.slice(0, 20).map(function(q){ return q.id; });
    dailyStore[todayKey] = todaysIds;
    saveJSON(STORAGE_DAILY, dailyStore);
  }
  var idSet = {};
  todaysIds.forEach(function(id){ idSet[id] = true; });
  var list = QUESTIONS.filter(function(q){ return idSet[q.id]; });

  document.getElementById("dailyCountNote").textContent = list.length + " questions selected for today, prioritising ones you haven't already got right.";

  if (!dailyPager){
    dailyPager = makePager(
      document.getElementById("dailyQuestionArea"),
      document.getElementById("dailyPos"),
      document.getElementById("dailyPrev"),
      document.getElementById("dailyNext"),
      document.getElementById("dailyProgressBar")
    );
  }
  dailyPager.setList(list);
}
document.getElementById("dailyPrev").addEventListener("click", function(){ dailyPager.prev(); });
document.getElementById("dailyNext").addEventListener("click", function(){ dailyPager.next(); });

/* ============================================================
   MOCK TEST
   ============================================================ */
var mockState = {
  count: 20,
  minutes: 20,
  section: "all",
  questions: [],
  optionOrders: [],
  answers: {},
  timeLeft: 0,
  timerHandle: null,
  startedAt: null
};

function renderMockSetup(){
  var sel = document.getElementById("mockSection");
  if (sel.options.length <= 1){
    sel.innerHTML = '<option value="all">All sections</option>' + SECTIONS.map(function(s){ return '<option value="' + s + '">' + s + '</option>'; }).join("");
  }
  updateMockAvailNote();
}
function updateMockAvailNote(){
  var pool = mockState.section === "all" ? QUESTIONS : QUESTIONS.filter(function(q){ return q.section === mockState.section; });
  var note = document.getElementById("mockAvailNote");
  if (pool.length < mockState.count){
    note.textContent = "Only " + pool.length + " questions are available for this selection — the test will use all of them.";
  } else {
    note.textContent = pool.length + " questions available in this selection.";
  }
}
document.querySelectorAll("#mockCountChips .chip").forEach(function(chip){
  chip.addEventListener("click", function(){
    document.querySelectorAll("#mockCountChips .chip").forEach(function(c){ c.classList.remove("active"); });
    chip.classList.add("active");
    mockState.count = parseInt(chip.getAttribute("data-val"), 10);
    updateMockAvailNote();
  });
});
document.querySelectorAll("#mockTimeChips .chip").forEach(function(chip){
  chip.addEventListener("click", function(){
    document.querySelectorAll("#mockTimeChips .chip").forEach(function(c){ c.classList.remove("active"); });
    chip.classList.add("active");
    mockState.minutes = parseInt(chip.getAttribute("data-val"), 10);
  });
});
document.getElementById("mockSection").addEventListener("change", function(){
  mockState.section = this.value;
  updateMockAvailNote();
});
document.getElementById("mockStartBtn").addEventListener("click", startMockTest);

function startMockTest(){
  var pool = mockState.section === "all" ? QUESTIONS : QUESTIONS.filter(function(q){ return q.section === mockState.section; });
  var picked = shuffleArr(pool).slice(0, mockState.count);
  mockState.questions = picked;
  mockState.optionOrders = picked.map(function(q){ return shuffleArr(q.options); });
  mockState.answers = {};
  mockState.timeLeft = mockState.minutes * 60;
  mockState.startedAt = Date.now();
  mockState.currentIndex = 0;

  goTo("mockrun");
  renderMockQuestion();
  startMockTimer();
}

function startMockTimer(){
  clearInterval(mockState.timerHandle);
  updateTimerDisplay();
  mockState.timerHandle = setInterval(function(){
    mockState.timeLeft--;
    updateTimerDisplay();
    if (mockState.timeLeft <= 0){
      clearInterval(mockState.timerHandle);
      submitMockTest();
    }
  }, 1000);
}
function updateTimerDisplay(){
  var m = Math.floor(mockState.timeLeft / 60);
  var s = mockState.timeLeft % 60;
  var el = document.getElementById("mockTimer");
  el.textContent = (m < 10 ? "0"+m : m) + ":" + (s < 10 ? "0"+s : s);
  el.classList.toggle("low", mockState.timeLeft <= 60);
}

function renderMockQuestion(){
  var i = mockState.currentIndex;
  var q = mockState.questions[i];
  var opts = mockState.optionOrders[i];
  var area = document.getElementById("mockQuestionArea");
  area.innerHTML = "";

  var card = document.createElement("div");
  card.className = "qcard";
  card.innerHTML =
    '<div class="qmeta">' +
      '<span class="tag section">' + q.section + '</span>' +
      '<span class="tag topic">' + q.topic + '</span>' +
      '<span class="tag diff-' + q.difficulty + '">' + q.difficulty + '</span>' +
    '</div>' +
    '<div class="qtext">' + q.question + '</div>';

  var optsWrap = document.createElement("div");
  optsWrap.className = "opts";
  opts.forEach(function(opt, idx){
    var btn = document.createElement("button");
    btn.className = "opt-btn";
    if (mockState.answers[q.id] === idx) btn.classList.add("selected");
    btn.textContent = opt.text;
    btn.addEventListener("click", function(){
      mockState.answers[q.id] = idx;
      renderMockQuestion();
    });
    optsWrap.appendChild(btn);
  });
  card.appendChild(optsWrap);
  area.appendChild(card);

  document.getElementById("mockPos").textContent = "Question " + (i+1) + " / " + mockState.questions.length;
  document.getElementById("mockProgressBar").style.width = Math.round(((i+1)/mockState.questions.length)*100) + "%";
  document.getElementById("mockPrev").disabled = i === 0;
  document.getElementById("mockNext").disabled = i === mockState.questions.length - 1;
}
document.getElementById("mockPrev").addEventListener("click", function(){
  if (mockState.currentIndex > 0){ mockState.currentIndex--; renderMockQuestion(); }
});
document.getElementById("mockNext").addEventListener("click", function(){
  if (mockState.currentIndex < mockState.questions.length - 1){ mockState.currentIndex++; renderMockQuestion(); }
});
document.getElementById("mockSubmitBtn").addEventListener("click", function(){
  var unanswered = mockState.questions.length - Object.keys(mockState.answers).length;
  if (unanswered > 0){
    var ok = confirm(unanswered + " question(s) are still unattempted. Submit the test anyway?");
    if (!ok) return;
  }
  submitMockTest();
});

function submitMockTest(){
  clearInterval(mockState.timerHandle);
  var timeTakenSec = Math.max(0, Math.round((Date.now() - mockState.startedAt)/1000));

  var correct = 0, wrong = 0, unattempted = 0;
  var sectionStats = {}, topicStats = {};

  mockState.questions.forEach(function(q, i){
    var opts = mockState.optionOrders[i];
    var ansIdx = mockState.answers[q.id];
    var isCorrect = null;
    if (ansIdx === undefined){
      unattempted++;
    } else {
      isCorrect = !!opts[ansIdx].correct;
      if (isCorrect) correct++; else wrong++;
      recordAnswer(q.id, isCorrect);
    }
    if (!sectionStats[q.section]) sectionStats[q.section] = {total:0, correct:0};
    sectionStats[q.section].total++;
    if (isCorrect) sectionStats[q.section].correct++;
    if (!topicStats[q.topic]) topicStats[q.topic] = {total:0, correct:0};
    topicStats[q.topic].total++;
    if (isCorrect) topicStats[q.topic].correct++;
  });

  var total = mockState.questions.length;
  var pct = total ? Math.round((correct/total)*100) : 0;

  var history = loadJSON(STORAGE_MOCK_HISTORY, []);
  history.push({ date: Date.now(), total: total, correct: correct, wrong: wrong, unattempted: unattempted, pct: pct });
  saveJSON(STORAGE_MOCK_HISTORY, history);

  renderMockResult({
    pct: pct, correct: correct, wrong: wrong, unattempted: unattempted, total: total,
    timeTakenSec: timeTakenSec, sectionStats: sectionStats, topicStats: topicStats
  });
  goTo("mockresult");
}

function renderMockResult(r){
  document.getElementById("resultPct").textContent = r.pct + "%";
  var mins = Math.floor(r.timeTakenSec/60), secs = r.timeTakenSec%60;
  document.getElementById("resultTimeTaken").textContent =
    r.correct + " of " + r.total + " correct · time taken " + mins + "m " + (secs<10?"0"+secs:secs) + "s";
  document.getElementById("resultCorrect").textContent = r.correct;
  document.getElementById("resultWrong").textContent = r.wrong;
  document.getElementById("resultUnattempted").textContent = r.unattempted;

  document.getElementById("sectionBreakdownTable").innerHTML = breakdownTable(r.sectionStats, "Section");
  document.getElementById("topicBreakdownTable").innerHTML = breakdownTable(r.topicStats, "Topic");

  var reviewArea = document.getElementById("mockReviewArea");
  reviewArea.innerHTML = "";
  mockState.questions.forEach(function(q, i){
    var opts = mockState.optionOrders[i];
    var ansIdx = mockState.answers[q.id];
    var card = document.createElement("div");
    card.className = "qcard";
    var meta = '<div class="qmeta"><span class="tag section">' + q.section + '</span><span class="tag topic">' + q.topic + '</span><span class="tag diff-' + q.difficulty + '">' + q.difficulty + '</span></div>';
    var qt = '<div class="qtext">' + (i+1) + ". " + q.question + '</div>';
    var optsHtml = '<div class="opts">' + opts.map(function(o, idx){
      var cls = "opt-btn";
      if (o.correct) cls += " correct";
      else if (idx === ansIdx) cls += " wrong";
      return '<button class="' + cls + '" disabled>' + o.text + (idx === ansIdx ? " (your answer)" : "") + '</button>';
    }).join("") + '</div>';
    var status = ansIdx === undefined ? '<span class="small-note">Not attempted</span>' : "";
    var exp = '<div class="explain show"><strong>Explanation:</strong> ' + q.explanation + '</div>';
    card.innerHTML = meta + qt + optsHtml + status + exp;
    reviewArea.appendChild(card);
  });
}
function breakdownTable(stats, label){
  var rows = Object.keys(stats).map(function(k){
    var s = stats[k];
    var acc = s.total ? Math.round((s.correct/s.total)*100) : 0;
    return { name:k, total:s.total, correct:s.correct, acc:acc };
  }).sort(function(a,b){ return b.total - a.total; });
  var html = '<thead><tr><th>' + label + '</th><th>Correct</th><th>Total</th><th>Accuracy</th></tr></thead><tbody>';
  rows.forEach(function(r){
    html += '<tr><td>' + r.name + '</td><td>' + r.correct + '</td><td>' + r.total + '</td>' +
      '<td><span class="acc-bar-outer"><span class="acc-bar-inner" style="width:' + r.acc + '%"></span></span>' + r.acc + '%</td></tr>';
  });
  html += '</tbody>';
  return html;
}
document.getElementById("resultBackHome").addEventListener("click", function(){ goTo("home"); });
document.getElementById("resultNewMock").addEventListener("click", function(){ goTo("mocksetup"); });

/* ============================================================
   PROGRESS
   ============================================================ */
function renderProgress(){
  var progress = getProgress();
  var attempted = Object.keys(progress).length;
  var correct = 0;
  Object.keys(progress).forEach(function(k){ if (progress[k].correct) correct++; });
  var wrong = attempted - correct;
  var remaining = Math.max(0, QUESTIONS.length - attempted);
  var accuracy = attempted ? Math.round((correct/attempted)*100) : 0;

  document.getElementById("progressMiniStats").innerHTML =
    stat(attempted, "Attempted") +
    stat(correct, "Correct") +
    stat(wrong, "Wrong") +
    stat(remaining, "Remaining");

  var byTopic = {};
  QUESTIONS.forEach(function(q){
    if (!byTopic[q.topic]) byTopic[q.topic] = { total:0, attempted:0, correct:0 };
    byTopic[q.topic].total++;
    var rec = progress[q.id];
    if (rec){ byTopic[q.topic].attempted++; if (rec.correct) byTopic[q.topic].correct++; }
  });
  var rows = Object.keys(byTopic).map(function(t){
    var d = byTopic[t];
    var acc = d.attempted ? Math.round((d.correct/d.attempted)*100) : 0;
    return { name:t, attempted:d.attempted, total:d.total, acc:acc };
  }).sort(function(a,b){ return b.attempted - a.attempted; });

  var html = '<thead><tr><th>Topic</th><th>Attempted</th><th>Total</th><th>Accuracy</th></tr></thead><tbody>';
  rows.forEach(function(r){
    html += '<tr><td>' + r.name + '</td><td>' + r.attempted + '</td><td>' + r.total + '</td>' +
      '<td><span class="acc-bar-outer"><span class="acc-bar-inner" style="width:' + r.acc + '%"></span></span>' + r.acc + '%</td></tr>';
  });
  html += '</tbody>';
  document.getElementById("progressTable").innerHTML = html;
}
document.getElementById("resetProgressBtn").addEventListener("click", function(){
  var ok = confirm("This clears all attempted-question history and mock test history from this device. Continue?");
  if (!ok) return;
  localStorage.removeItem(STORAGE_PROGRESS);
  localStorage.removeItem(STORAGE_DAILY);
  localStorage.removeItem(STORAGE_MOCK_HISTORY);
  renderProgress();
});

/* ============================================================
   INIT
   ============================================================ */
updateTopStat();
buildDesktopNav();
goTo("home");

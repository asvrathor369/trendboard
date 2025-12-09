// script.js — TrendBoard client logic

const GITHUB_REPO_OWNER = "asvrathor369"; // <-- REPLACE THIS
const GITHUB_REPO_NAME = "trendboard";           // <-- REPLACE THIS (repo where users will submit issues)

// helper
const $ = id => document.getElementById(id);
const showYear = () => { $('year').textContent = new Date().getFullYear(); };
showYear();

/* ---------------- Quick Scam-ish Heuristic ----------------
   This is a lightweight heuristic check for quick UX.
   It is NOT a substitute for professional security tooling.
*/
$('quickBtn').addEventListener('click', async () => {
  const q = $('quickInput').value.trim();
  if (!q) return;
  const out = $('quickResult');
  out.classList.remove('hidden');
  out.innerHTML = 'Running quick checks...';

  // basic patterns
  let score = 50;
  const lower = q.toLowerCase();
  if (/free|offer|win|gift|cheap|discount/.test(lower)) score += 20;
  if (/^\d{10,}$/.test(lower)) score += 10; // phone number suspicious
  if (/\.in$|\.xyz$|\.top$|\.site$/.test(lower)) score += 10;

  // check reachability via allorigins (CORS proxy)
  let reachable = false;
  if (/^[\d+]/.test(q) || q.includes(' ')) {
    // skip fetch for plain numbers / names
    reachable = false;
  } else {
    try {
      const url = q.startsWith('http') ? q : 'https://' + q;
      const proxy = 'https://api.allorigins.win/raw?url=' + encodeURIComponent(url);
      const r = await fetch(proxy, { method: 'GET' });
      reachable = r.ok;
      if (!r.ok) score += 15;
    } catch (e) {
      score += 15;
      reachable = false;
    }
  }

  const verdict = score > 75 ? 'Likely SCAM / Risky' : score > 50 ? 'Possibly Risky' : 'Likely Safe';
  out.innerHTML = `<strong>Score:</strong> ${score}/100<br>
                   <strong>Verdict:</strong> ${verdict}<br>
                   <strong>Reachable:</strong> ${reachable ? 'Yes' : 'No'}<br>
                   <small class="text-gray-600">Note: This is a quick heuristic check (no deep malware scan).</small>`;
});

/* ---------------- Reddit trends (r/india & r/popular) ---------------- */
async function loadReddit() {
  const list = $('redditList');
  list.innerHTML = '<li>Loading...</li>';
  try {
    const endpoints = [
      'https://www.reddit.com/r/india/hot.json?limit=8',
      'https://www.reddit.com/r/popular/hot.json?limit=8'
    ];
    const results = await Promise.all(endpoints.map(e => fetch(e).then(r => r.json())));
    list.innerHTML = '';
    results.forEach((json, idx) => {
      const items = json.data.children;
      items.forEach(it => {
        const t = it.data.title;
        const url = 'https://reddit.com' + it.data.permalink;
        const el = document.createElement('li');
        el.innerHTML = `<a href="${url}" target="_blank" rel="noopener" class="text-sm text-blue-600 hover:underline">${t}</a>`;
        list.appendChild(el);
      });
      // separator between sources
      if (idx === 0) {
        const sep = document.createElement('li');
        sep.innerHTML = '<hr class="my-2">';
        list.appendChild(sep);
      }
    });
  } catch (e) {
    list.innerHTML = '<li class="text-red-500">Unable to load Reddit trends.</li>';
  }
}

/* ---------------- Hacker News top ---------------- */
async function loadHN() {
  const list = $('hnList');
  list.innerHTML = '<li>Loading...</li>';
  try {
    const topIdsRes = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
    const ids = await topIdsRes.json();
    const top10 = ids.slice(0, 10);
    const items = await Promise.all(top10.map(id => fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(r => r.json())));
    list.innerHTML = '';
    items.forEach(it => {
      const el = document.createElement('li');
      el.innerHTML = `<a href="https://news.ycombinator.com/item?id=${it.id}" target="_blank" rel="noopener" class="text-sm text-blue-600 hover:underline">${it.title}</a>`;
      list.appendChild(el);
    });
  } catch (e) {
    list.innerHTML = '<li class="text-red-500">Unable to load Hacker News.</li>';
  }
}

/* ---------------- Free Tools (pure JS generators) ---------------- */
$('hgBtn').addEventListener('click', () => {
  const inText = $('hgInput').value.trim();
  if (!inText) { $('hgOut').textContent = 'Enter keywords first.'; return; }
  const tokens = inText.split(/\s+/).slice(0,4);
  const hashtags = new Set();
  tokens.forEach(t => {
    hashtags.add('#' + t.toLowerCase().replace(/[^a-z0-9]/g,''));
    hashtags.add('#' + t.charAt(0).toUpperCase() + t.slice(1));
  });
  // add generic tags
  hashtags.add('#Trending');
  hashtags.add('#Viral');
  $('hgOut').textContent = Array.from(hashtags).slice(0,12).join(' ');
});

$('capBtn').addEventListener('click', () => {
  const t = $('capInput').value.trim();
  if (!t) { $('capOut').textContent = 'Enter a topic / mood.'; return; }
  const templates = [
    `When in doubt, ${t}.`,
    `${t} — because life’s too short.`,
    `Quick tip about ${t}: keep it simple.`,
    `If you love ${t}, hit ❤️ and follow.`
  ];
  $('capOut').innerHTML = templates.map(s => `<div>${s}</div>`).join('');
});

$('unBtn').addEventListener('click', () => {
  const k = $('unInput').value.trim();
  if (!k) { $('unOut').textContent = 'Enter a keyword.'; return; }
  const out = [];
  const base = k.toLowerCase().replace(/\s+/g,'');
  out.push(base + 'hub'); out.push('the' + base); out.push(base + '_official'); out.push(base + 'x');
  $('unOut').innerHTML = out.join(' · ');
});

/* ---------------- Community submissions via GitHub Issues (public) ----------------
   - submitIssueBtn opens prefilled issue URL (users must sign in)
   - issuesList fetches public issues from your repo
*/
function setupIssueButtons() {
  const prefill = encodeURIComponent(`# Submission\n\nPlease paste link / text / image link and short description:\n\n- Title:\n- Link:\n- Notes:\n`);
  const newIssueUrl = `https://github.com/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/issues/new?body=${prefill}`;
  const btn = $('submitIssueBtn');
  btn.href = newIssueUrl;
  btn.textContent = 'Submit an item (GitHub issue)';
}

async function loadIssues() {
  const list = $('issuesList');
  list.innerHTML = '<li>Loading recent submissions...</li>';
  try {
    const url = `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/issues?state=open&per_page=8`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('rate');
    const issues = await res.json();
    if (!issues.length) {
      list.innerHTML = '<li class="text-gray-600">No submissions yet — be the first!</li>';
      return;
    }
    list.innerHTML = '';
    issues.forEach(i => {
      const li = document.createElement('li');
      const title = i.title || '(no title)';
      const body = (i.body || '').slice(0,200).replace(/\n/g,' ');
      li.innerHTML = `<a href="${i.html_url}" target="_blank" class="text-blue-600 hover:underline">${title}</a><div class="text-gray-600 text-xs">${body}</div>`;
      list.appendChild(li);
    });
  } catch (e) {
    list.innerHTML = '<li class="text-red-500">Unable to load submissions (GitHub rate limit).</li>';
  }
}

$('refreshIssues').addEventListener('click', loadIssues);

/* ---------------- Init ---------------- */
(async function init() {
  setupIssueButtons();
  loadReddit();
  loadHN();
  loadIssues();
})();

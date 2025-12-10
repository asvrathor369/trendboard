// assets/script.js — TrendBoard simple client-side behavior

// theme toggle
(function(){
  const root = document.documentElement;
  const body = document.body;
  const toggleBtns = document.querySelectorAll('#themeToggle, #themeToggleTop, #themeToggle2, #themeToggle3, #themeToggle4, #themeToggle5');
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  function setTheme(t) {
    if (t === 'dark') {
      document.body.classList.remove('theme-light');
      document.body.classList.add('theme-dark');
    } else {
      document.body.classList.remove('theme-dark');
      document.body.classList.add('theme-light');
    }
    try { localStorage.setItem('trendboard-theme', t); } catch(e){}
  }

  // initialize
  try {
    const saved = localStorage.getItem('trendboard-theme');
    if (saved) setTheme(saved);
  } catch(e){}

  // wire buttons
  toggleBtns.forEach(b => {
    b && b.addEventListener('click', () => {
      const isDark = document.body.classList.contains('theme-dark');
      setTheme(isDark ? 'light' : 'dark');
    });
  });
})();

// Mobile menu toggle (simple)
(function(){
  const btn = document.getElementById('mobileMenuBtn');
  btn && btn.addEventListener('click', ()=>{
    const nav = document.querySelector('.nav');
    if (!nav) return;
    if (nav.style.display === 'flex') nav.style.display = 'none';
    else nav.style.display = 'flex';
  });
})();

// Load some live-ish trends for home and trends page (client-side)
(function(){
  async function fetchReddit(sub="popular", targetId){
    try {
      const res = await fetch(`https://www.reddit.com/r/${sub}/hot.json?limit=6`);
      const json = await res.json();
      const list = json.data.children.map(c => ({ title: c.data.title, url: 'https://reddit.com' + c.data.permalink }));
      renderList(targetId, list);
    } catch (e) {
      renderList(targetId, [{title:'Unable to fetch Reddit (CORS or rate)'}]);
    }
  }

  async function fetchHN(targetId){
    try {
      const res = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
      const ids = await res.json();
      const top = ids.slice(0,6);
      const items = await Promise.all(top.map(id => fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(r=>r.json())));
      const list = items.map(i => ({ title: i.title, url: `https://news.ycombinator.com/item?id=${i.id}` }));
      renderList(targetId, list);
    } catch (e) {
      renderList(targetId, [{title:'Unable to fetch HN (CORS or rate)'}]);
    }
  }

  function renderList(targetId, arr){
    const node = document.getElementById(targetId);
    if (!node) return;
    node.innerHTML = '';
    arr.forEach(it=>{
      const li = document.createElement('li');
      if (it.url) li.innerHTML = `<a href="${it.url}" target="_blank" rel="noopener">${escapeHtml(it.title)}</a>`;
      else li.textContent = it.title;
      node.appendChild(li);
    });
  }

  function escapeHtml(s){ return String(s).replace(/[&<>"']/g, function(m){ return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[m]; }); }

  // fire fetches if nodes present
  if (document.getElementById('homeTrending')) fetchReddit('popular','homeTrending').catch(()=>{});
  // In case homeTrending exists, load popular
  if (document.getElementById('homeTrending')) {
    fetchReddit('popular','homeTrending');
  }

  // if mains trends page has ids
  if (document.getElementById('redditHot')) fetchReddit('india','redditHot');
  if (document.getElementById('hnHot')) fetchHN('hnHot');

})();

/* assets/script.js - TrendBoard */
(function(){
  // theme: remember choice
  const saved = localStorage.getItem('trendboard-theme');
  if(saved === 'dark') document.body.classList.add('theme-dark');
  const themeBtns = document.querySelectorAll('.icon-btn');
  themeBtns.forEach(b => b.addEventListener('click', () => {
    document.body.classList.toggle('theme-dark');
    try{ localStorage.setItem('trendboard-theme', document.body.classList.contains('theme-dark') ? 'dark' : 'light'); }catch(e){}
  }));

  // fill year
  const ys = document.querySelectorAll('#year');
  ys.forEach(y => y.textContent = new Date().getFullYear());

  // fetch public trends for small widgets
  async function fetchReddit(sub, targetId){
    try{
      const r = await fetch(`https://www.reddit.com/r/${sub}/hot.json?limit=6`);
      const j = await r.json();
      renderList(targetId, j.data.children.map(c=>({t:c.data.title,u:'https://reddit.com'+c.data.permalink})));
    }catch(e){
      renderList(targetId, [{t:'Unable to load (CORS/rate)'}]);
    }
  }
  async function fetchHN(targetId){
    try{
      const r = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
      const ids = await r.json();
      const top = ids.slice(0,6);
      const items = await Promise.all(top.map(id => fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(r=>r.json())));
      renderList(targetId, items.map(i=>({t:i.title,u:`https://news.ycombinator.com/item?id=${i.id}`})));
    }catch(e){ renderList(targetId, [{t:'Unable to load HN'}]); }
  }
  function renderList(targetId, arr){
    const node = document.getElementById(targetId);
    if(!node) return;
    node.innerHTML = '';
    arr.forEach(it=>{
      const li = document.createElement('li');
      if(it.u) li.innerHTML = `<a href="${it.u}" target="_blank" rel="noopener">${escapeHtml(it.t)}</a>`;
      else li.textContent = it.t;
      node.appendChild(li);
    });
  }
  function escapeHtml(s){ return String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); }

  // auto-load small widgets if present
  if(document.getElementById('homeTrending')) fetchReddit('popular','homeTrending');
  if(document.getElementById('redditHot')) fetchReddit('india','redditHot');
  if(document.getElementById('hnHot')) fetchHN('hnHot');

  // expose small helpers to tools if needed
  window.TB = {
    escapeHtml,
    hashtagify(s){ return s.toLowerCase().replace(/[^a-z0-9]+/g,'').slice(0,24); }
  };

})();

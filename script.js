/* ══ SKILLS DATA ══ */
const skills = [
  { icon:'🐍', name:'Python',       pct:90 },
  { icon:'☕', name:'Java',         pct:85 },
  { icon:'⚡', name:'JavaScript',   pct:88 },
  { icon:'⚛️', name:'React',        pct:75 },
  { icon:'🟢', name:'Node.js',      pct:72 },
  { icon:'🗄️', name:'SQL',          pct:85 },
  { icon:'🐳', name:'Docker',       pct:50 },
  { icon:'🐙', name:'Git & GitHub', pct:92 },
  { icon:'☁️', name:'Cloud',        pct:68 },
  { icon:'🌐', name:'HTML & CSS',   pct:90 },
  { icon:'🔧', name:'REST APIs',    pct:87 },
  { icon:'🧪', name:'Testing',      pct:70 },
];

const list = document.getElementById('skillsList');
skills.forEach(s => {
  list.insertAdjacentHTML('beforeend', `
    <div class="skill-row">
      <div class="skill-label">
        <span class="skill-icon">${s.icon}</span>
        <span class="skill-name">${s.name}</span>
      </div>
      <div class="progress-track">
        <div class="progress-fill" data-pct="${s.pct}"></div>
      </div>
      <div class="skill-pct">${s.pct}%</div>
    </div>`);
});

/* ══ TYPEWRITER ══ */
const names = ['i am Yahya Nour'];
let ci = 0, deleting = false, pause = false;
const tw = document.getElementById('typewriter');
function type() {
  if (pause) return;
  const word = names[0];
  if (!deleting) {
    tw.textContent = word.slice(0, ++ci);
    if (ci === word.length) { pause = true; setTimeout(() => { pause = false; deleting = true; type(); }, 2500); return; }
    setTimeout(type, 90);
  } else {
    tw.textContent = word.slice(0, --ci);
    if (ci === 0) { deleting = false; setTimeout(type, 600); return; }
    setTimeout(type, 50);
  }
}
type();

/* ══ DARK MODE ══ */
const html = document.documentElement;
const themeBtn = document.getElementById('themeBtn');
const saved = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', saved);
themeBtn.textContent = saved === 'dark' ? '☀️' : '🌙';
themeBtn.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  themeBtn.textContent = next === 'dark' ? '☀️' : '🌙';
  localStorage.setItem('theme', next);
});

/* ══ HAMBURGER ══ */
const ham = document.getElementById('ham');
const menu = document.getElementById('mobileMenu');
ham.addEventListener('click', () => { ham.classList.toggle('open'); menu.classList.toggle('open'); });
function closeMenu() { ham.classList.remove('open'); menu.classList.remove('open'); }

/* ══ SCROLL: progress bar + back-to-top ══ */
let skillsAnimated = false;
const backTop = document.getElementById('backTop');
const scrollBar = document.getElementById('scroll-bar');

window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  scrollBar.style.width = pct + '%';
  backTop.classList.toggle('show', window.scrollY > 400);
});

/* ══ INTERSECTION OBSERVER ══ */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('visible');
    if (e.target.id === 'skillsList' && !skillsAnimated) {
      skillsAnimated = true;
      setTimeout(() => {
        document.querySelectorAll('.progress-fill').forEach(bar => {
          bar.style.width = bar.dataset.pct + '%';
        });
      }, 200);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

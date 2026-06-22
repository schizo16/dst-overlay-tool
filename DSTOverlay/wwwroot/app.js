let season='autumn',day=1,char='',done={},boss={},C=null;
const N={autumn:'Mùa thu',winter:'Mùa đông',spring:'Mùa xuân',summer:'Mùa hè'};

function sd(e){if(window.chrome&&window.chrome.webview)window.chrome.webview.postMessage('drag');}
document.querySelectorAll('.tab-btn').forEach(b=>{b.addEventListener('click',()=>{document.querySelectorAll('.tab-btn').forEach(x=>x.classList.remove('active'));document.querySelectorAll('.tab-content').forEach(x=>x.classList.remove('active'));b.classList.add('active');const t=document.getElementById('tab-'+b.dataset.tab);if(t)t.classList.add('active');});});

async function init(){
try{const r=await fetch('data/content.json');C=await r.json();}catch(e){document.getElementById('guide-content').innerHTML='<p>Lỗi tải dữ liệu</p>';return;}
const s=document.getElementById('guide-season');
const d=document.getElementById('guide-day');
const g=document.getElementById('guide-char');
if(s){s.innerHTML='autumn,winter,spring,summer'.split(',').map(x=>'<option value="'+x+'">'+N[x]+'</option>').join('');s.onchange=function(){season=this.value;render();};}
if(d){d.value=day;d.onchange=function(){day=parseInt(this.value)||1;render();};}
if(g){g.innerHTML='<option value="">Hướng dẫn chung</option>'+C.chars.map(c=>'<option value="'+c.id+'">'+c.n+'</option>').join('');g.onchange=function(){char=this.value;render();};}
document.getElementById('status').textContent='✅ Sẵn sàng — chọn mùa/ngày/nhân vật';
render();}

function getChar(id){return C?C.chars.find(c=>c.id===id):null;}

function render(){
if(!C)return;
const tab=document.querySelector('.tab-btn.active');
if(tab){document.querySelectorAll('.tab-content').forEach(x=>x.classList.remove('active'));const t=document.getElementById('tab-'+tab.dataset.tab);if(t)t.classList.add('active');}
renderGuide();renderStats();renderBoss();renderCL();renderCP();renderBase();renderChar();}

function renderGuide(){
const el=document.getElementById('guide-content');
const sg=C.guide.filter(g=>g.s===season&&g.d1<=day);
let html=sg.length?sg.map(g=>'<div class="guide-step"><div class="step-day">Ngày '+g.d1+' – '+g.d2+'</div>'+g.t+'</div>').join(''):'<p>Không có hướng dẫn.</p>';
const ch=getChar(char);
if(ch){html+='<div style="margin-top:12px;padding:12px;background:#1a1a2e;border-radius:8px;border-left:3px solid #a855c9"><b style="color:#a855c9">🧑 '+ch.n+' — Thông tin chi tiết</b><div style="font-size:12px;line-height:1.6;margin:8px 0;padding:8px;background:rgba(168,85,201,0.1);border-radius:4px"><b>Kỹ năng:</b> '+ch.sk+'</div><div style="font-size:12px;color:#888;margin-bottom:6px">❤️ Máu '+ch.hp+' · 🍖 Đói '+ch.hu+' · 🌀 TT '+ch.sn+' · Độ khó '+ch.d+'</div><div style="font-size:12px;line-height:1.7">'+ch.cl+'</div><ul style="margin:8px 0 0;padding-left:18px;font-size:12px">'+ch.tips.map(t=>'<li style="margin-bottom:3px">'+t+'</li>').join('')+'</ul></div>';}
el.innerHTML=html;}

function renderStats(){
const ch=getChar(char);
if(!ch){document.getElementById('stats-content').innerHTML='<p style="text-align:center;padding:20px;color:#888">Chọn nhân vật trước</p>';return;}
document.getElementById('stats-content').innerHTML=
'<div style="text-align:center;margin-bottom:12px"><div style="font-size:20px;font-weight:700;color:#f0c040">'+ch.n+'</div><div style="font-size:12px">'+ch.d+'</div></div>'+
'<div class="bar-group"><div class="bar-label">❤️ Máu: '+ch.hp+'</div><div class="bar-track"><div class="bar-fill health" style="width:'+(ch.hp/200*100)+'%"></div></div></div>'+
'<div class="bar-group"><div class="bar-label">🍖 Đói: '+ch.hu+'</div><div class="bar-track"><div class="bar-fill hunger" style="width:'+(ch.hu/200*100)+'%"></div></div></div>'+
'<div class="bar-group"><div class="bar-label">🌀 Tinh thần: '+ch.sn+'</div><div class="bar-track"><div class="bar-fill sanity" style="width:'+(ch.sn/250*100)+'%"></div></div></div>'+
'<div style="margin-top:10px;padding:10px;background:#1a1a2e;border-radius:8px;font-size:12px"><b>🎯 Kỹ năng:</b><br>'+ch.sk+'</div>';}

function renderBoss(){
document.getElementById('boss-list').innerHTML=C.boss.map(b=>
'<div class="boss-card" onclick="toggleBoss(\''+b.id+'\')">'+
'<div><div class="name">'+b.n+'</div><div class="meta">'+b.s+' · '+b.l+'</div><div style="font-size:11px;color:#666;margin-top:3px">'+b.t+'</div></div>'+
'<div><span class="boss-status" id="bs-'+b.id+'">❓</span></div></div>').join('');
for(const i in boss){const e=document.getElementById('bs-'+i);if(e){e.textContent=boss[i].k?'✅ Đã giết':(boss[i].a?'⚠️ Còn':'❓ Chưa');e.className='boss-status '+(boss[i].k?'killed':(boss[i].a?'alive':'unavailable'));}}}

function toggleBoss(id){
let b=boss[id]||{};
if(b.k){b.k=0;b.a=0;}else if(b.a){b.k=1;b.a=0;}else{b.a=1;b.k=0;}
boss[id]=b;
const e=document.getElementById('bs-'+id);if(e){e.textContent=b.k?'✅ Đã giết':(b.a?'⚠️ Còn':'❓ Chưa');e.className='boss-status '+(b.k?'killed':(b.a?'alive':'unavailable'));}
renderCL();}

function renderCL(){
const ch=getChar(char);
let items=C.checklist[season]?[...C.checklist[season]]:[];
if(ch)items.push({t:'🧑 '+ch.n+': '+ch.tips[0],a:''});
items.forEach(x=>{if(x.a==='winter'&&day>18&&season==='autumn')done[x.t]=1;});
const el=document.getElementById('guide-checklist');
el.innerHTML=items.length?'<div style="font-size:13px;color:#f0c040;margin-bottom:6px;border-bottom:1px solid #333;padding-bottom:4px">📋 Việc cần làm theo mùa</div>'+
items.map(x=>'<div class="checklist-item '+(done[x.t]?'done':'')+'" onclick="tc(\''+esc(x.t)+'\')"><div class="check"></div>'+x.t+'</div>').join(''):'';}

function tc(t){if(done[t])delete done[t];else done[t]=1;renderCL();}
function esc(s){return s.replace(/'/g,"\\'");}

function renderCP(){
const I=['','berries','carrot','corn','egg','fish','meat','honey','ice','mushroom','drumstick','frog_legs'];
const V={'':'—','berries':'Quả mọng','carrot':'Cà rốt','corn':'Ngô','egg':'Trứng','fish':'Cá','meat':'Thịt','honey':'Mật ong','ice':'Băng','mushroom':'Nấm','drumstick':'Dùi trống','frog_legs':'Đùi ếch'};
let h='<div style="display:grid;grid-template-columns:1fr 1fr;gap:4px">';
for(let i=0;i<4;i++){h+='<select id="ing-'+i+'" onchange="cr()">';I.forEach(x=>{h+='<option value="'+x+'">'+(V[x]||x)+'</option>'});h+='</select>';}
h+='</div><div id="crockpot-result">Chọn nguyên liệu</div>';
document.getElementById('crockpot-ui').innerHTML=h;}

function cr(){
const R=[{n:'Thịt viên',ig:['meat','ice','ice','ice'],e:'+62.5Đ +5M +5TT',r:'1 thịt + 3 băng'},{n:'Bacon & Eggs',ig:['egg','egg','meat','meat'],e:'+75Đ +20M +5TT',r:'2 trứng + 2 thịt'},{n:'Honey Ham',ig:['meat','meat','honey','honey'],e:'+75Đ +30M +5TT',r:'2 thịt + 2 mật'},{n:'Pierogi',ig:['egg','meat','carrot','mushroom'],e:'+37.5Đ +40M +5TT',r:'1 trứng+1 thịt+1 rau'},{n:'Froggle Bunwich',ig:['frog_legs','carrot','ice','ice'],e:'+37.5Đ +20M +5TT',r:'1 đùi ếch+1 rau'},{n:'Fishsticks',ig:['fish','fish','ice','ice'],e:'+37.5Đ +40M +5TT',r:'1 cá + 1 cành 2 nhồi'}];
let sel=[];for(let i=0;i<4;i++){const v=document.getElementById('ing-'+i).value;if(v)sel.push(v);}
const r=document.getElementById('crockpot-result');if(!sel.length){r.textContent='Chọn nguyên liệu';return;}
const sf={};sel.forEach(x=>{sf[x]=(sf[x]||0)+1;});
let m=null;R.forEach(rec=>{const rf={};rec.ig.forEach(x=>{rf[x]=(rf[x]||0)+1});let ok=1;for(const k in sf){if(!rf[k]||sf[k]>rf[k])ok=0;}for(const k in rf){if(!sf[k]||rf[k]>sf[k])ok=0;}if(ok)m=rec;});
r.innerHTML=m?'<b>'+m.n+'</b><br>'+m.e+'<br><small>'+m.r+'</small>':'<span style="color:#c0392b">❌ Cháo loãng (Wet Goop)</span>';}

function renderBase(){
document.getElementById('base-content').innerHTML=C.base.map(x=>'<div class="guide-step"><div class="step-day">'+x.s+'</div>'+x.t+'</div>').join('');}

function renderChar(){
document.getElementById('char-list').innerHTML=C.chars.map(c=>
'<div class="boss-card" onclick="char=\''+c.id+'\';document.getElementById(\'guide-char\').value=\''+c.id+'\';render()">'+
'<div><div class="name">'+c.n+' <span style="font-size:11px;color:#888;font-weight:normal">('+c.d+')</span></div>'+
'<div class="meta">'+c.sk+'</div>'+
'<div style="font-size:11px;color:#666;margin-top:3px">❤️'+c.hp+' 🍖'+c.hu+' 🌀'+c.sn+'</div></div>'+
'<div style="font-size:20px">👤</div></div>').join('');}

init();
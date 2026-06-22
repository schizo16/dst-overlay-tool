const fs = require('fs');
let c = JSON.parse(fs.readFileSync('E:/code/DST-Overlay/DSTOverlay/wwwroot/data/content.json', 'utf8'));
c.boss = [
{id:"deerclops",n:"Deerclops",s:"Dong (30+)",l:"Mat dat",t:"HP 4000. AoE pha cong trinh. DOI no dap (tay gio) -> ne -> 2 hit Dam bong -> lui. 2 Ao go + Mu bong da + 10 thuoc. KO danh gan base. Roi: 8 Thit + Mat -> Eyebrella."},
{id:"bearger",n:"Bearger",s:"Thu (20-25)",l:"Mat dat",t:"HP 6000. Cach 1: dan vao rung farm go. Cach 2: 2 hit -> NE quet. Bearger Vest: giu am 240s + hao doi cham 25%. Roi: 8 Thit + Long."},
{id:"moose",n:"Moose/Goose",s:"Xuan (37+)",l:"Gan nuoc",t:"HP 3000. NE lao sang ben (ko chay lui) -> danh 3 phat. Mau <50% goi Mossling. Roi: 4 Thit + 3 Dui trong + Long vu."},
{id:"dragonfly",n:"Dragonfly",s:"He",l:"Lava Arena",t:"HP 27500. KHO. 2 Ao go + Mu bong da + 20 thuoc + Dam bong. Ngu khi ko ai gan. Phun lua + bay dap. Roi: 8 Thit + Vay -> Scalemail."},
{id:"beequeen",n:"Bee Queen",s:"Bat ky",l:"Rung ong",t:"HP 22500. CUC KHO. 3 Ao go + 2 Mu + 30 thuoc + Dark Sword. Goi ong vo han. Danh vao bung vang. Roi: Royal Jelly + Bundling Wrap."},
{id:"klaus",n:"Klaus",s:"Dong",l:"Mat dat",t:"HP 5000. Can Deer Antler. P1: Klaus+2 huou. P2: xuong ngua danh gan. Roi: 4 Thit + ngoc + blueprint."},
{id:"antlion",n:"Antlion",s:"He",l:"Oasis",t:"HP 3000. A: do choi trong Oasis. B: 3 hit -> NE tung cat. Roi: 4 Thit + Do trang suc (Desert Goggles)."},
{id:"toadstool",n:"Toadstool",s:"Bat ky",l:"Hang",t:"HP 15000. Bao tu doc (gas) - can Mat na khi. AoE nam moc. Roi: 8 Thit + Bao tu."},
{id:"malbatross",n:"Malbatross",s:"Bat ky",l:"Dai duong",t:"HP 5000. Sung lao tu thuyen. Mau thap bay nhanh. Roi: 8 Thit + Mo -> thuyen nhanh 15%."},
{id:"stalker",n:"Ancient Fuelweaver",s:"Bat ky",l:"Atrium",t:"HP 16000. CAN: Weather Pain (pha khien) + Nightmare Amulet (danh xuyen) + Lazy Explorer (teleport). P1 pha 3 khien. P2 danh luc hut TT. P3 danh lien tuc."},
{id:"minotaur",n:"Ancient Guardian",s:"Bat ky",l:"Ruins",t:"HP 2500. 1-2 hit -> ne sung. Giu Ancient Station. Roi: Guardian Horn."},
{id:"crabking",n:"Crab King",s:"Bat ky",l:"Dai duong",t:"HP 15000. Can ngoc trai (Crabby Hermit). Bom pha vo -> danh than. AoE vo thuyen. Roi: 8 Thit."}
];
fs.writeFileSync('E:/code/DST-Overlay/DSTOverlay/wwwroot/data/content.json', JSON.stringify(c), 'utf8');
console.log('Done');

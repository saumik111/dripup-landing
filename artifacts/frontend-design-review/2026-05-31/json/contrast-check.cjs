const fs = require('fs');
const path = require('path');
const out = String.raw`C:\Users\saumi\Downloads\sellers website\dripup-landing\test folder\2026-05-31\frontend-design-review\json\contrast_inventory.json`;
function hexToRgb(hex){
  hex = hex.replace('#','');
  return [parseInt(hex.slice(0,2),16), parseInt(hex.slice(2,4),16), parseInt(hex.slice(4,6),16)];
}
function lum([r,g,b]){
  return [r,g,b].map(v=>{v/=255; return v<=0.03928? v/12.92 : Math.pow((v+0.055)/1.055,2.4)}).reduce((a,v,i)=>a+v*[0.2126,0.7152,0.0722][i],0);
}
function contrast(a,b){ const A=lum(hexToRgb(a)), B=lum(hexToRgb(b)); return (Math.max(A,B)+0.05)/(Math.min(A,B)+0.05); }
const checks = [
  ['Ink on page light', '#1C1C1A', '#FAFAFA', 'large/body text'],
  ['Muted stone on off-white', '#6B6860', '#F5F0E8', 'placeholder/body'],
  ['Muted gray card subline on blue card 1', '#888880', '#F0F3FF', 'small subline'],
  ['Muted gray card subline on blue card 5', '#888880', '#DCDFF0', 'small subline'],
  ['Green button text cream', '#F5F0E8', '#1A3D35', 'button'],
  ['Cream text on green hover', '#F5F0E8', '#2D5E52', 'button hover'],
  ['Green on cream pill', '#1A3D35', '#F5F0E8', 'button/icon'],
  ['Hero gray heading estimate on pale sky', '#8A8A8A', '#D9DADA', 'large hero text estimate'],
  ['White card on blue card 1', '#FFFFFF', '#F0F3FF', 'surface contrast'],
  ['Card border beige on blue card 1', '#C8C3B9', '#F0F3FF', 'non-text border estimate'],
  ['Error orange on white', '#E8673A', '#FFFFFF', 'status dot'],
  ['Warning ochre on white', '#D4A843', '#FFFFFF', 'status dot'],
];
const rows = checks.map(([name, fg, bg, role]) => ({ name, foreground: fg, background: bg, role, ratio: Number(contrast(fg,bg).toFixed(2)), wcagTextAA: contrast(fg,bg) >= 4.5, wcagLargeAA: contrast(fg,bg) >= 3, wcagUI: contrast(fg,bg) >= 3 }));
fs.writeFileSync(out, JSON.stringify(rows, null, 2));
console.log(JSON.stringify(rows, null, 2));

const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const app=fs.readFileSync(path.join(__dirname,'..','app.js'),'utf8');

test('龙舌兰图标保留原瓶身和两侧叶片',()=>{
 const match=app.match(/tequila:'(<path d="[^"]+"\/><path d="[^"]+"\/>)'/);
 assert.ok(match,'龙舌兰图标应把瓶身和叶片保留为两个独立图层');
 assert.match(match[1],/^<path d="M10 3h4m-3 0v6l-3 3v9h8v-9l-3-3V3m-3 12h4"\/>/,'瓶身轮廓不应改变');
 assert.match(match[1],/<path d="M7 21l-3-3m3 3-1-5m11 5 3-3m-3 3 1-5"\/>$/,'瓶身两侧应保留对称叶片');
});

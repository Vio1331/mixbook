// DOM shell smoke test only; does not claim browser/layout coverage.
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
test('品牌名称与页面说明使用最新文案',()=>{
 const root=path.join(__dirname,'..');
 const app=fs.readFileSync(path.join(root,'app.js'),'utf8');
 const index=fs.readFileSync(path.join(root,'index.html'),'utf8');
 const manifest=JSON.parse(fs.readFileSync(path.join(root,'manifest.webmanifest'),'utf8'));
 for(const copy of ['喝了么','一个贼牛逼的鸡尾酒记录工具','先收藏再说。<br>记了等于喝了。','- 你已经有 100 瓶鸡尾酒了！<br>- 不一样啦，不一样啦！','可以保存在本地，也可以连接自己的 GitHub 仓库。<br>其他方案暂时没做。'])assert.ok(app.includes(copy),`缺少文案：${copy}`);
 assert.match(index,/<title>喝了么 · Mixbook<\/title>/);
 assert.equal(manifest.short_name,'喝了么');
 for(const old of ['一杯手记','MIXBOOK / PERSONAL BAR','收藏一份经典，调出自己的比例。','按大类管理标签，再为每瓶酒选择多个标签。','现在可以先用本机记录，仓库建好后再连接。'])assert.ok(!app.includes(old),`仍有旧文案：${old}`);
});
test('没有数据库权限时也能打开试用界面，清楚提示临时会话',async()=>{
 const elements=new Map(),events={};
 const element=()=>({innerHTML:'',textContent:'',open:false,dataset:{},classList:{add(){},remove(){}},addEventListener(){},querySelector(){return null}});
 const document={activeElement:null,visibilityState:'visible',modelContext:null,querySelector(s){if(!elements.has(s))elements.set(s,element());return elements.get(s)},addEventListener(type,fn){events[type]=fn}};
 const store={getItem(){return null},setItem(){},removeItem(){}};
 const context={document,localStorage:store,sessionStorage:store,navigator:{onLine:false},location:{protocol:'file:'},console,setTimeout(){return 1},clearTimeout(){},setInterval(){},TextEncoder,TextDecoder,URL,Blob,AbortController,crypto:require('node:crypto').webcrypto};
 context.window=context;context.window.addEventListener=()=>{};context.window.scrollTo=()=>{};
 vm.createContext(context);
 for(const name of ['core.js','seed.js','materials.js','app.js'])await vm.runInContext(fs.readFileSync(path.join(__dirname,'..',name),'utf8'),context);
 assert.ok(elements.get('#app').innerHTML.includes('临时会话'));
 assert.ok(elements.get('#app').innerHTML.includes('我的酒谱'));
 assert.ok(elements.get('#recipe-results').innerHTML.includes('尼格罗尼'));
 assert.ok(elements.get('#recipe-results').innerHTML.includes('还差 3 种材料'));
 assert.ok(events.click&&events.change&&events.submit);
});

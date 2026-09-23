// DOM shell smoke test only; does not claim browser/layout coverage.
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
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

const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const app=fs.readFileSync(path.join(__dirname,'..','app.js'),'utf8');
const icon=name=>{
 const match=app.match(new RegExp(`${name}:'([^']+)'`));
 assert.ok(match,`应定义 ${name} 图标`);
 return match[1];
};

test('酒柜分类图标使用调整后的瓶形和居中装饰',()=>{
 assert.equal(icon('gin'),'<path d="M9 3h6m-5 0v5L7 11v10h10V11l-3-3V3M7 13h10"/><path d="M12 19c-2-1-2-3 0-4 2 1 2 3 0 4Z"/>');
 assert.equal(icon('rum'),'<path d="M9 3h6m-5 0v5L7 11v10h10V11l-3-3V3M7 13h10"/><path d="m9 15 6 3m0-3-6 3"/>');
 assert.equal(icon('tequila'),'<path d="M9 3h6m-5 0v5L7 11v10h10V11l-3-3V3"/><path d="M12 20v-6m0 4-3-3m3 2 3-3m-3 5-2-1m2 1 2-1"/>');
 assert.equal(icon('liqueur'),'<path d="M9 3h6m-5 0v5l-3 4v8h10v-8l-3-4V3"/><path d="M10 16h4"/>');
 for(const name of ['wine','vermouth'])assert.equal(icon(name),'<path d="M9 3h6m-5 0v5l-3 4v8h10v-8l-3-4V3"/><path d="M9 14h6v4H9z"/>');
});

test('固体材料篮子没有顶部饰线且中间横线延伸至篮边',()=>{
 assert.equal(icon('solid'),'<path d="M5 11h14l-2 9H7l-2-9Zm2 0c0-3 2-5 5-5s5 2 5 5"/><path d="M6 15h12"/>');
});

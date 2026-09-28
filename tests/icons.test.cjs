const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const app=fs.readFileSync(path.join(__dirname,'..','app.js'),'utf8');
const icon=name=>{
 const match=app.match(new RegExp(`${name}:'([^']+)'`));
 assert.ok(match,`应定义 ${name} 图标`);
 return match[1];
};

test('酒柜分类图标使用调整后的瓶形和居中装饰',()=>{
 assert.equal(icon('gin'),'<path d="M9 3h6m-5 0v5L7 11v10h10V11l-3-3V3M7 13h10"/><path d="M12 19c-2-1-2-3 0-4 2 1 2 3 0 4Z"/>');
 assert.equal(icon('rum'),'<path d="M9 3h6m-5 0v5L7 11v10h10V11l-3-3V3M7 13h10"/><path d="m9 15.5 6 3m0-3-6 3"/>');
 assert.equal(icon('tequila'),'<path d="M9 3h6m-5 0v5L7 11v10h10V11l-3-3V3"/><path d="M12 20v-6m0 4-3-3m3 2 3-3m-3 5-2-1m2 1 2-1"/>');
 assert.equal(icon('liqueur'),'<path d="M9 3h6m-5 0v5l-3 4v8h10v-8l-3-4V3"/><path d="M10 16h4"/>');
 assert.equal(icon('wine'),'<path d="M10 2h4v7c0 1 2 2 2 4v8H8v-8c0-2 2-3 2-4V2"/><path d="M9 14h6v4H9zM10 5h4"/>');
 assert.equal(icon('vermouth'),'<path d="M9 3h6m-5 0v5l-3 4v8h10v-8l-3-4V3"/><path d="M9 14h6v4H9z"/>');
});

test('龙舌兰目录 ID 映射到龙舌兰图标',()=>{
 assert.match(app,/const pantryIcons=\{[^}]*agave:'tequila'/);
 assert.doesNotMatch(app,/const pantryIcons=\{[^}]*tequila:'tequila'/);
});

test('固体材料篮子没有顶部饰线且中间横线延伸至篮边',()=>{
 assert.equal(icon('solid'),'<path d="M5 11h14l-2 9H7l-2-9Zm2 0c0-3 2-5 5-5s5 2 5 5"/><path d="M6 15h12"/>');
});

test('调制方式图标移除多余线条并修正调酒动作',()=>{
 assert.equal(icon('shake'),'<path d="M7 3h10l-1 4 2 4-3 10H9L6 11l2-4-1-4Zm1 4h8M7 12h10"/>');
 assert.equal(icon('stir'),'<path d="M6 8h12l-1 13H7L6 8Zm.2 4h11.6M15 3l-4 15"/>');
 assert.equal(icon('muddle'),'<path d="M6 9h12l-1 12H7L6 9Zm.3 4h11.4"/><path d="M12 3v13m-1.5 0h3v3h-3v-3Z"/>');
 assert.equal(icon('blend'),'<path d="M7 3h10l-1 11H8L7 3Zm2 11h6l2 7H7l2-7Z"/>');
 assert.equal(icon('roll'),'<path d="M3 4h6l-1 8H4L3 4Zm12 8h6l-1 8h-4l-1-8Z"/><path d="M10 7h4m-2-2 2 2-2 2M14 17h-4m2 2-2-2 2-2"/>');
});

test('多种烈酒使用前后遮挡且大小明显不同的标准瓶形',()=>{
 const value=icon('multiSpirits');
 const standard='M9 3h6m-5 0v5l-3 4v8h10v-8l-3-4V3M7 14h10';
 assert.equal((value.match(new RegExp(standard,'g'))||[]).length,2);
 assert.match(value,/<g transform="translate\(6 5\) scale\(\.65\)">/);
 assert.match(value,new RegExp(`<path d="${standard}" fill="white"/>$`));
});

test('详情页在英文名称下以三个图标展示配方特征',()=>{
 assert.match(app,/<p class="recipe-en">\$\{esc\(base\.en\)\}<\/p><div class="detail-characteristics"/);
 assert.doesNotMatch(app,/class="detail-facts"/);
 assert.match(app,/\$\{glassIcon\(base\.glass\)\}/);
 assert.match(app,/\$\{icon\(baseIcons\[base\.base\]\|\|'bottle'\)\}/);
 assert.match(app,/\$\{icon\(methodIcons\[base\.method\]\|\|'shake'\)\}/);
 assert.equal((app.match(/tabindex="0" data-label=/g)||[]).length,3);
});

test('其他烈酒沿用标准瓶形并在瓶内显示三个点',()=>{
 assert.equal(icon('otherSpirits'),'<path d="M9 3h6m-5 0v5l-3 4v8h10v-8l-3-4V3M7 14h10"/><path d="M9.5 17h.1m2.4 0h.1m2.4 0h.1"/>');
});

"""Build the static catalog from reviewed, editable factual recipe records."""
import json
from pathlib import Path
root=Path(__file__).resolve().parent.parent
facts={x['slug']:x for x in json.loads((root/'data/iba-source-facts.json').read_text())['records']} if (root/'data/iba-source-facts.json').exists() else {x['slug']:x for x in json.loads((root/'data/sources.json').read_text())['recipes']}
items=[]
for line in (root/'data/ingredients.tsv').read_text().splitlines():
 if not line or line.startswith('#'):continue
 id,name,category,parent,brand,en,img=line.split('|')
 items.append(dict(id=id,name=name,category=category,parentId=parent,brand=brand,aliases=[en] if en else [],kind='product' if brand else 'type',image=img if (root/f'assets/ingredients/{img}.webp').exists() else ''))
ids={i['id'] for i in items}
U=set('alexander americano angel-face aviation between-the-sheets boulevardier brandy-crusta casino clover-club daiquiri dry-martini gin-fizz hanky-panky john-collins last-word manhattan martinez mary-pickford monkey-gland negroni old-fashioned paradise planters-punch porto-flip ramos-fizz remember-the-maine rusty-nail sazerac sidecar stinger tuxedo vieux-carre whiskey-sour white-lady'.split())
T=set('bellini black-russian bloody-mary caipirinha cardinale champagne-cocktail corpse-reviver-2 cosmopolitan cuba-libre french-75 french-connection garibaldi grasshopper hemingway-special horses-neck irish-coffee kir lemon-drop-martini long-island-iced-tea mai-tai margarita mimosa mint-julep mojito moscow-mule pina-colada pisco-sour rabo-de-galo sea-breeze sex-on-the-beach singapore-sling tequila-sunrise vesper zombie'.split())
parents={'boulevardier':'negroni','cardinale':'negroni','new-york-sour':'whiskey-sour','tommys-margarita':'margarita','grand-margarita':'margarita','hemingway-special':'daiquiri','dons-special-daiquiri':'daiquiri'}
notes={
 'iba-tiki':'官网菠萝汁 90、青柠汁 30 两项漏写单位；这里按 ml 录入。官网装饰写作柑橘与脱水菠萝片，柑橘以橙片示例。',
 'bees-knees':'保留当前 IBA 页面含橙汁的配方，与只用柠檬汁的常见版本不同。',
 'monkey-gland':'当前 IBA 页面将苦艾酒和红石榴糖浆各写为 1 汤匙；保留原单位，不自行改成 dash。',
 'mai-tai':'此处使用马提尼克糖蜜朗姆；IBA 特别说明它并非农业朗姆。',
 'sazerac':'IBA 当前版本以干邑为基酒，苦艾酒用于润杯并倒掉余量，成杯不加冰；黑麦版本可另建比例版本。',
 'vieux-carre':'按当前 IBA 页面记录佩肖氏苦精，并滤入冷鸡尾酒杯。',
 'rabo-de-galo':'IBA 指定 Cinzano Rosso 与 Cynar；普通甜红味美思不会被判定为满足该指定产品。',
 'zombie':'Donn’s Mix：2 份新鲜黄葡萄柚汁与 1 份肉桂糖浆。',
 've-n-to':'蜂蜜混合液可按官网注释，以洋甘菊浸液替换其中的水；这里单独记录该混合液。',
 'porn-star-martini':'香槟单独伴饮，不倒入摇壶；材料清单保留这份香槟。',
 'new-york-sour':'红酒以 Shiraz 或 Malbec 为例；留到最后浮层，不参与摇和。',
 'negroni':'IBA 装饰为半片橙。当前沿用的旧配图使用橙皮，仅作外观示意。',
 'brandy-crusta':'杯口使用细糖；橙或柠檬长皮卷在杯内。',
 'whiskey-sour':'可用科布勒杯不加冰，或古典杯加冰；本条杯形选择后者。装饰亦可按官网改用橙皮。',
 'gin-fizz':'官网要求成杯不加冰；装饰也可选柠檬皮。',
 'moscow-mule':'当前 IBA 页面指定 Smirnoff 伏特加；可用骡子杯或古典杯。',
 'irish-coffee':'糖至少 1 茶匙，可按口味增加，也可换成糖浆。',
 'pina-colada':'官网备注允许以 4 片新鲜菠萝代替果汁，并按口味加少许青柠汁。',
 'three-dots-and-a-dash':'官网 St. Elizabeth 与青柠汁之间缺少换行，分别记录为 7.5 ml 与 15 ml。',
 'lemon-drop-martini':'当前 IBA 页面装饰为无，未录入糖口。'
}
def rows(s):
 out=[]
 for raw in filter(None,s.split(';')):
  p=(raw.split(':')+['']*5)[:5];id,amount,unit,opt,alt=p
  assert id in ids,(id,s)
  x=dict(id=id,amount=amount,unit=unit or 'ml',optional=opt=='可选')
  if alt:assert alt in ids; x['alternatives']=[alt]
  out.append(x)
 return out
recipes=[]
for line in (root/'data/recipes.tsv').read_text().splitlines():
 if not line or line.startswith('#'):continue
 p=line.split('|');assert len(p)==11,(len(p),line)
 slug,name,base,glass,method,fmt,family,formula,garnish,steps,subject=p
 assert slug in facts,slug
 image=slug if (root/f'assets/cocktails/{slug}.webp').exists() or slug=='negroni' else ''
 families=family.split(','); tags=[]
 if any(x in families for x in ['Sour','Daiquiri','Margarita']):tags+=['酸甜','柑橘']
 if any(x in families for x in ['Highball','Fizz','Collins','Spritz','起泡酒']):tags+=['气泡','清爽']
 if any(x in families for x in ['开胃酒','Negroni']):tags+=['苦甜']
 if 'Tiki' in families:tags+=['热带']
 if '奶油类' in families:tags+=['醇厚']
 recipes.append(dict(id='iba-'+slug,name=name,en=facts[slug]['name'],base=base,glass=glass,method=method,formats=[fmt],families=families,tags=tags,ingredients=rows(formula),garnishes=rows(garnish),steps=[steps],notes=notes.get(slug,''),source=facts[slug]['url'],versions=[],parentId='iba-'+parents[slug] if slug in parents else '',ibaCategory='难忘经典' if slug in U else '当代经典' if slug in T else '新时代',catalog=True,sample=False,image=image,createdAt='2026-09-21T00:00:00.000Z',updatedAt='2026-09-21T00:00:00.000Z'))
assert len(recipes)==len(facts)==102
assert len({r['id'] for r in recipes})==102
options=dict(glasses=sorted({r['glass'] for r in recipes}),tags=sorted({t for r in recipes for t in r['tags']}),formats=['短饮','长饮','热饮'],families=sorted({f for r in recipes for f in r['families']}))
d=dict(schemaVersion=2,ingredients=items,recipes=recipes,pantry={},favorites={},options=options,catalogVersion='iba-2026-09-21-v2')
(root/'seed.js').write_text('/* IBA recipe facts checked 2026-09-21. See data/sources.json. */\nwindow.MIX_SEED='+json.dumps(d,ensure_ascii=False,separators=(',',':'))+';\n')
(root/'data/sources.json').write_text(json.dumps(dict(checkedAt='2026-09-21',index='https://iba-world.com/cocktails/all-cocktails/',count=102,editorialNote='杯形按官网方法选择一个允许选项；短饮/长饮/派系为本站整理，并非 IBA 官方分类。中文步骤为重新表述。',recipes=[{k:x[k] for k in ['slug','name','url']} for x in facts.values()]),ensure_ascii=False,indent=2))
print(len(items),'ingredients;',len(recipes),'recipes;',sum(bool(r['image']) for r in recipes),'photos')

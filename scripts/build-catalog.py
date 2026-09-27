"""Build seed.js from the one built-in hierarchy, concrete ingredient details and reviewed IBA recipes."""
import json
import re
import unicodedata
from pathlib import Path

root=Path(__file__).resolve().parent.parent

def load_taxonomy():
 text=(root/'cocktail-system.js').read_text()
 return json.loads(text.split('=',1)[1].strip().removesuffix(';'))

def image_key(value):
 return re.sub(r'[^a-z0-9]','',unicodedata.normalize('NFKD',value).encode('ascii','ignore').decode().lower())

taxonomy=load_taxonomy()
fixed=taxonomy['ingredients']
details=json.loads((root/'data/ingredient-details.json').read_text())['ingredients']
fixed_ids={i['id'] for i in fixed}
menu_roots={row[0] for row in taxonomy['menus']}
menu_pages={id for row in taxonomy['menus'] for id in row[1]}
tag_ids={i['id'] for i in fixed if i.get('builtInTag')}
assert len(fixed_ids)==len(fixed), '内置目录 ID 重复'
assert all(i['parentId'] in menu_roots|menu_pages for i in fixed if i.get('builtInTag')), '内置标签必须直属一级或二级菜单'
assert all(i['parentId'] in menu_pages for i in details), '具体原料必须直属二级菜单'
assert not fixed_ids.intersection(i['id'] for i in details), '具体原料不能覆盖内置目录或标签'
assert len({i['id'] for i in details})==len(details), '具体原料 ID 重复'
items=[{**i} for i in fixed]
for i in details:
 image=i.get('image','')
 items.append({**i,'category':next(x['name'] for x in fixed if x['id']==i['parentId']),'kind':'product','image':image if image and (root/f'assets/ingredients/{image}.webp').exists() else '','tags':[tag for tag in i.get('tags',[]) if tag in tag_ids],'customized':False})
ids={i['id'] for i in items}

facts_path=root/'data/iba-source-facts.json'
facts={x['slug']:x for x in json.loads(facts_path.read_text())['records']} if facts_path.exists() else {x['slug']:x for x in json.loads((root/'data/sources.json').read_text())['recipes']}
cocktail_images={p.stem for p in (root/'assets/cocktails').glob('*.webp')}
U=set('alexander americano angel-face aviation between-the-sheets boulevardier brandy-crusta casino clover-club daiquiri dry-martini gin-fizz hanky-panky john-collins last-word manhattan martinez mary-pickford monkey-gland negroni old-fashioned paradise planters-punch porto-flip ramos-fizz remember-the-maine rusty-nail sazerac sidecar stinger tuxedo vieux-carre whiskey-sour white-lady'.split())
T=set('bellini black-russian bloody-mary caipirinha cardinale champagne-cocktail corpse-reviver-2 cosmopolitan cuba-libre french-75 french-connection garibaldi grasshopper hemingway-special horses-neck irish-coffee kir lemon-drop-martini long-island-iced-tea mai-tai margarita mimosa mint-julep mojito moscow-mule pina-colada pisco-sour rabo-de-galo sea-breeze sex-on-the-beach singapore-sling tequila-sunrise vesper zombie'.split())
parents={'boulevardier':'negroni','cardinale':'negroni','new-york-sour':'whiskey-sour','tommys-margarita':'margarita','grand-margarita':'margarita','hemingway-special':'daiquiri','dons-special-daiquiri':'daiquiri'}
notes={
 'iba-tiki':'官网菠萝汁 90、青柠汁 30 两项漏写单位；这里按 ml 录入。官网装饰写作柑橘与脱水菠萝片，柑橘以橙片示例。','bees-knees':'保留当前 IBA 页面含橙汁的配方，与只用柠檬汁的常见版本不同。','monkey-gland':'当前 IBA 页面将苦艾酒和红石榴糖浆各写为 1 汤匙；保留原单位，不自行改成 dash。','mai-tai':'此处使用马提尼克糖蜜朗姆；IBA 特别说明它并非农业朗姆。','sazerac':'IBA 当前版本以干邑为基酒，苦艾酒用于润杯并倒掉余量，成杯不加冰；黑麦版本可另建比例版本。','vieux-carre':'按当前 IBA 页面记录佩肖氏苦精，并滤入冷鸡尾酒杯。','rabo-de-galo':'IBA 指定 Cinzano Rosso 与 Cynar；普通甜红味美思不会被判定为满足该指定产品。','zombie':'Donn’s Mix：2 份新鲜黄葡萄柚汁与 1 份肉桂糖浆。','ve-n-to':'蜂蜜混合液可按官网注释，以洋甘菊浸液替换其中的水；这里单独记录该混合液。','porn-star-martini':'香槟单独伴饮，不倒入摇壶；材料清单保留这份香槟。','new-york-sour':'红酒以 Shiraz 或 Malbec 为例；留到最后浮层，不参与摇和。','negroni':'IBA 装饰为半片橙。当前沿用的旧配图使用橙皮，仅作外观示意。','brandy-crusta':'杯口使用细糖；橙或柠檬长皮卷在杯内。','whiskey-sour':'可用科布勒杯不加冰，或古典杯加冰；本条杯形选择后者。装饰亦可按官网改用橙皮。','gin-fizz':'官网要求成杯不加冰；装饰也可选柠檬皮。','moscow-mule':'当前 IBA 页面指定 Smirnoff 伏特加；可用骡子杯或古典杯。','irish-coffee':'糖至少 1 茶匙，可按口味增加，也可换成糖浆。','pina-colada':'官网备注允许以 4 片新鲜菠萝代替果汁，并按口味加少许青柠汁。','three-dots-and-a-dash':'官网 St. Elizabeth 与青柠汁之间缺少换行，分别记录为 7.5 ml 与 15 ml。','lemon-drop-martini':'当前 IBA 页面装饰为无，未录入糖口。'}

def rows(value):
 out=[]
 for raw in filter(None,value.split(';')):
  id,amount,unit,opt,alt=(raw.split(':')+['']*5)[:5]
  assert id in ids, f'配方引用未知材料：{id}'
  row={'id':id,'amount':amount,'unit':unit or 'ml','optional':opt=='可选'}
  if alt:
   assert alt in ids, f'配方引用未知替代材料：{alt}'
   row['alternatives']=[alt]
  out.append(row)
 return out

recipes=[]
for line in (root/'data/recipes.tsv').read_text().splitlines():
 if not line or line.startswith('#'):continue
 p=line.split('|');assert len(p)==10,(len(p),line)
 slug,name,base,glass,method,flavors,formula,garnish,steps,subject=p
 assert slug in facts,slug
 expected=facts[slug]['name'];matches=[filename for filename in cocktail_images if image_key(filename)==image_key(expected)]
 assert len(matches)==1,(slug,expected,matches)
 recipes.append({'id':'iba-'+slug,'name':name,'en':expected,'base':base,'glass':glass,'method':method,'tags':list(filter(None,flavors.split(','))),'ingredients':rows(formula),'garnishes':rows(garnish),'steps':[steps],'notes':notes.get(slug,''),'source':facts[slug]['url'],'versions':[],'parentId':'iba-'+parents[slug] if slug in parents else '','sourceName':'IBA · '+('难忘经典' if slug in U else '当代经典' if slug in T else '新时代'),'catalog':True,'sample':False,'image':matches[0],'createdAt':'2026-09-21T00:00:00.000Z','updatedAt':'2026-09-21T00:00:00.000Z'})
assert len(recipes)==len(facts)==102
options={'glasses':sorted({r['glass'] for r in recipes}),'tags':sorted({t for r in recipes for t in r['tags']}),'sources':['IBA · 难忘经典','IBA · 当代经典','IBA · 新时代']}
materials=json.loads((root/'data/catalog-migrations.json').read_text())
d={'schemaVersion':4,'ingredients':items,'recipes':recipes,'pantryItems':[],'favorites':{},'options':options,'catalogVersion':'iba-2026-09-27-pantry-taxonomy-unified-v13','ingredientMigrations':materials.get('migrations',{}),'ingredientRemovals':{**materials.get('removals',{}),'rum-all':'rum','vermouth':'sweet-vermouth'}}
(root/'seed.js').write_text('/* Generated by scripts/build-catalog.py; edit cocktail-system.js, data/ingredient-details.json or data/recipes.tsv instead. */\nwindow.MIX_SEED='+json.dumps(d,ensure_ascii=False,separators=(',',':'))+';\n')
(root/'data/sources.json').write_text(json.dumps({'checkedAt':'2026-09-21','index':'https://iba-world.com/cocktails/all-cocktails/','count':102,'editorialNote':'杯形按官网方法选择一个允许选项；IBA 三个系列分别记为来源词条。风味标签为本站描述，中文步骤为重新表述。','recipes':[{k:x[k] for k in ['slug','name','url']} for x in facts.values()]},ensure_ascii=False,indent=2))
print(len(items),'ingredients;',len(recipes),'recipes;',sum(bool(r['image']) for r in recipes),'photos')

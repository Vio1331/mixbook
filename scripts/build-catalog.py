"""Build the static catalog from reviewed, editable factual recipe records."""
import json
import hashlib
from pathlib import Path
root=Path(__file__).resolve().parent.parent
facts={x['slug']:x for x in json.loads((root/'data/iba-source-facts.json').read_text())['records']} if (root/'data/iba-source-facts.json').exists() else {x['slug']:x for x in json.loads((root/'data/sources.json').read_text())['recipes']}
items=[]
for line in (root/'data/ingredients.tsv').read_text().splitlines():
 if not line or line.startswith('#'):continue
 id,name,category,parent,brand,en,img=line.split('|')
 items.append(dict(id=id,name=name,category=category,parentId=parent,brand=brand,aliases=[en] if en else [],kind='product' if brand else 'type',image=img if (root/f'assets/ingredients/{img}.webp').exists() else ''))

# The pantry is deliberately organised independently from the historical IBA
# ingredient groups.  The first two nodes are the drawers shown in the pantry,
# their children are pages, and the third level is the user-facing tag set.
taxonomy={
 'alcohol':('酒精成分',{
  'whiskey':('威士忌',[('bourbon','波本威士忌'),('rye','黑麦威士忌'),('scotch','苏格兰威士忌'),('blended-scotch','调和苏格兰威士忌'),('islay','艾雷岛单一麦芽威士忌'),('canadian-whiskey','加拿大威士忌'),('irish-whiskey','爱尔兰威士忌'),('japanese-whiskey','日本威士忌')]),
  'gin':('金酒',[('london-dry','伦敦干金酒'),('plymouth-gin','普利茅斯金酒'),('navy-strength-gin','海军强度金酒'),('old-tom','老汤姆金酒'),('modern-gin','现代金酒')]),
  'rum-all':('朗姆酒',[('rum','白朗姆'),('dark-rum','黑朗姆'),('gold-rum','金朗姆'),('aged-rum','陈年朗姆'),('agricole','农业朗姆'),('spiced-rum','香料朗姆'),('overproof-rum','高酒精度朗姆'),('cuban-rum','古巴朗姆'),('jamaican-rum','牙买加朗姆'),('demerara-rum','德梅拉拉朗姆'),('martinique-rum','马提尼克朗姆'),('puerto-rico-rum','波多黎各朗姆'),('cachaca','卡莎萨朗姆')]),
  'tequila':('龙舌兰',[('blanco-tequila','银龙舌兰'),('gold-tequila','金龙舌兰'),('reposado-tequila','短期陈年龙舌兰'),('anejo-tequila','长期陈年龙舌兰')]),
  'vodka':('伏特加',[('neutral-vodka','中性伏特加'),('flavored-vodka','风味伏特加'),('baijiu','中国白酒'),('soju','韩国烧酒'),('shochu','日本烧酒')]),
  'brandy':('白兰地',[('fruit-brandy','其他水果白兰地'),('cognac','干邑'),('pisco','皮斯科')]),
  'beer':('啤酒',[('pale-ale','淡色艾尔'),('ipa','IPA'),('stout','世涛'),('porter','波特'),('abbey-beer','修道院'),('sour-beer','酸啤'),('wheat-beer','小麦'),('lager','拉格')]),
  'wine':('葡萄酒',[('red-wine','红葡萄酒'),('white-wine','白葡萄酒'),('rose-wine','桃红葡萄酒'),('sparkling','起泡酒'),('champagne','香槟'),('prosecco','普罗塞克'),('cava','卡瓦'),('ice-wine','冰酒')]),
  'vermouth-root':('味美思',[('vermouth','甜味美思'),('dry-vermouth','干味美思'),('bianco-vermouth','白味美思')]),
  'port-sherry':('波特&雪莉',[('ruby-port','红宝石波特酒'),('rose-port','桃红波特酒'),('white-port','白波特酒'),('aged-port','陈年波特酒'),('tawny-port','茶色波特酒'),('fino-sherry','Fino 雪莉酒'),('manzanilla-sherry','Manzanilla 雪莉酒'),('amontillado-sherry','Amontillado 雪莉酒'),('palo-cortado-sherry','Palo Cortado 雪莉酒'),('oloroso-sherry','Oloroso 雪莉酒'),('cream-sherry','Cream 雪莉酒'),('pedro-ximenez-sherry','Pedro Ximénez 雪莉酒')]),
  'liqueur':('利口酒',[('absinthe','苦艾酒'),('cacao-liqueur','可可利口酒'),('coffee-liqueur','咖啡利口酒'),('cream-liqueur','奶油利口酒'),('orange-liqueur','橙味利口酒'),('cherry-liqueur','樱桃利口酒'),('passion-liqueur','百香果利口酒'),('herbal-liqueur','草本利口酒'),('pear-liqueur','梨子利口酒'),('honey-liqueur','蜂蜜利口酒'),('mint-liqueur','薄荷利口酒'),('mure','黑莓利口酒'),('banana-liqueur','香蕉利口酒'),('violette','紫罗兰利口酒'),('grapefruit-liqueur','西柚利口酒'),('peach-liqueur','桃子利口酒'),('amaretto','杏仁利口酒')]),
  'other-alcohol':('其他酒',[('aperitif','开胃酒'),('amaro','阿玛罗'),('bitters','苦精')])
 }),
 'non-alcohol':('非酒精成分',{
  'soda-root':('气泡水',[('soda','苏打水'),('tonic','汤力水'),('other-soda','其他气泡水')]),
  'other-materials':('其他材料',[('syrup-root','糖浆'),('juice-root','果汁'),('produce-root','水果&蔬菜'),('seasoning-root','调料'),('other-food','其他食品')])
 })
}
by_id={i['id']:i for i in items}
original_parents={i['id']:i['parentId'] for i in items}
def ensure(id,name,parent,category):
 if id not in by_id:
  by_id[id]=dict(id=id,name=name,category=category,parentId=parent,brand='',aliases=[],kind='type',image='')
 else:
  by_id[id].update(name=name,category=category,parentId=parent)
for drawer,(drawer_name,pages) in taxonomy.items():
 ensure(drawer,drawer_name,'','酒柜分类')
 for page,(page_name,tags) in pages.items():
  ensure(page,page_name,drawer,drawer_name)
  for tag,tag_name in tags:ensure(tag,tag_name,page,drawer_name)

# Keep detailed IBA-only classifications below the new public tags/pages.
fallback={'基酒':'alcohol','利口酒':'liqueur','葡萄酒':'wine','苦精与调味':'seasoning-root','果汁与汽水':'juice-root','糖与其他':'other-food','新鲜材料与装饰':'produce-root'}
protected={drawer for drawer in taxonomy}|{p for _,pages in taxonomy.values() for p in pages}|{t for _,pages in taxonomy.values() for _,tags in pages.values() for t,_ in tags}
tag_ids={t for _,pages in taxonomy.values() for _,tags in pages.values() for t,_ in tags}
for i in by_id.values():
 if i['id'] in protected:continue
 if i['kind']=='product':
  p=original_parents.get(i['id'],''); inherited=[]; seen=set()
  while p and p not in seen:
   seen.add(p)
   if p in tag_ids:inherited.append(p)
   p=original_parents.get(p,'')
  i['_taxonomyTags']=inherited
 if not i['parentId'] or i['parentId']=='spirit':i['parentId']=fallback.get(i['category'],'other-food')
 i['category']=by_id.get(i['parentId'],{}).get('category',i['category'])
ordered=[]
for drawer,(_,pages) in taxonomy.items():
 ordered.append(by_id[drawer])
 for page,(_,tags) in pages.items():
  ordered.append(by_id[page]);ordered.extend(by_id[tag] for tag,_ in tags)
items=ordered+[i for id,i in by_id.items() if id not in protected and id!='spirit']
ids={i['id'] for i in items}
materials=json.loads((root/'data/material-catalog.json').read_text())
for i in items:
 meta=materials['metadata'].get(i['id'],{})
 i['aliases']=list(dict.fromkeys(i['aliases']+meta.get('aliases',[])))
 i['tags']=list(dict.fromkeys(meta.get('tags',[])+i.pop('_taxonomyTags',[])))
 i['matchParent']=meta.get('matchParent',True)
 i['customized']=False
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
 p=line.split('|');assert len(p)==10,(len(p),line)
 slug,name,base,glass,method,flavors,formula,garnish,steps,subject=p
 assert slug in facts,slug
 image=slug if (root/f'assets/cocktails/{slug}.webp').exists() or slug=='negroni' else ''
 tags=list(filter(None,flavors.split(',')))
 recipes.append(dict(id='iba-'+slug,name=name,en=facts[slug]['name'],base=base,glass=glass,method=method,tags=tags,ingredients=rows(formula),garnishes=rows(garnish),steps=[steps],notes=notes.get(slug,''),source=facts[slug]['url'],versions=[],parentId='iba-'+parents[slug] if slug in parents else '',sourceName='IBA · '+('难忘经典' if slug in U else '当代经典' if slug in T else '新时代'),catalog=True,sample=False,image=image,createdAt='2026-09-21T00:00:00.000Z',updatedAt='2026-09-21T00:00:00.000Z'))
assert len(recipes)==len(facts)==102
assert len({r['id'] for r in recipes})==102
options=dict(glasses=sorted({r['glass'] for r in recipes}),tags=sorted({t for r in recipes for t in r['tags']}),sources=['IBA · 难忘经典','IBA · 当代经典','IBA · 新时代'])
d=dict(schemaVersion=3,ingredients=items,recipes=recipes,pantry={},favorites={},options=options,catalogVersion='iba-2026-09-25-pantry-taxonomy-v10',ingredientMigrations=materials['migrations'],ingredientRemovals=materials.get('removals',{}))
photo_map=json.loads((root/'data/photo-map.json').read_text())
photo_meta={p['slug']:{'revision':p['assetSha256'][:12],'number':p['number'],'note':p['note']} for p in photo_map['photos']}
photo_meta['negroni']={'revision':hashlib.sha256((root/'assets/negroni.webp').read_bytes()).hexdigest()[:12],'note':''}
(root/'seed.js').write_text('/* IBA recipe facts checked 2026-09-21. See data/sources.json. */\nwindow.MIX_SEED='+json.dumps(d,ensure_ascii=False,separators=(',',':'))+';\n/* cocktail-system.js is the editable source of truth for the shared taxonomy. */\nif(window.MIX_TAXONOMY){window.MIX_SEED.ingredients=window.MIX_TAXONOMY.ingredients;window.MIX_SEED.options={...window.MIX_SEED.options,...window.MIX_TAXONOMY.recipe};}\nwindow.MIX_PHOTOS='+json.dumps(photo_meta,ensure_ascii=False,separators=(',',':'))+';\n')
(root/'data/sources.json').write_text(json.dumps(dict(checkedAt='2026-09-21',index='https://iba-world.com/cocktails/all-cocktails/',count=102,editorialNote='杯形按官网方法选择一个允许选项；IBA 三个系列分别记为来源词条。风味标签为本站描述，中文步骤为重新表述。',recipes=[{k:x[k] for k in ['slug','name','url']} for x in facts.values()]),ensure_ascii=False,indent=2))
print(len(items),'ingredients;',len(recipes),'recipes;',sum(bool(r['image']) for r in recipes),'photos')

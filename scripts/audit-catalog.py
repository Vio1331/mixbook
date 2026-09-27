"""Audit the immutable two-level directory and every built-in recipe ingredient display form."""
import json
from pathlib import Path
root=Path(__file__).resolve().parent.parent
tax=json.loads((root/'cocktail-system.js').read_text().split('=',1)[1].strip().removesuffix(';'))
seed=json.loads((root/'seed.js').read_text().split('=',1)[1].strip().removesuffix(';'))
by={i['id']:i for i in seed['ingredients']};menus=tax['menus'];roots={m[0] for m in menus};pages={x for m in menus for x in m[1]};tags={t['id'] for t in tax['menuTags']}
assert len(roots)==len(menus)
assert not roots&pages and not roots&tags and not pages&tags
for tag in tax['menuTags']:assert tag['parentId'] in roots|pages,tag
for i in seed['ingredients']:
 if i['id'] in roots: assert not i['parentId'],i
 elif i['id'] in pages: assert i['parentId'] in roots,i
 elif i['id'] in tags: assert i['parentId'] in roots|pages,i
 else: assert i['kind']=='product' and i['parentId'] in pages,i
recipe_refs=set()
for recipe in seed['recipes']:
 for row in recipe['ingredients']+recipe['garnishes']:
  recipe_refs.add(row['id']);recipe_refs.update(row.get('alternatives',[]))
  assert row['id'] in by,(recipe['id'],row['id'])
  item=by[row['id']]
  assert item['id'] in roots|pages|tags or item['kind']=='product',(recipe['id'],item)
concrete={i['id'] for i in seed['ingredients'] if i['id'] not in roots|pages|tags}
assert concrete==recipe_refs-(roots|pages|tags),f'具体材料与内置配方引用不一致：多余 {sorted(concrete-recipe_refs)}；缺少 {sorted(recipe_refs-concrete-roots-pages-tags)}'
print(f"OK: {len(menus)} 个一级菜单，{len(pages)} 个二级菜单，{len(tags)} 个内置标签，{len(seed['recipes'])} 个内置配方全部符合目录显示规则。")

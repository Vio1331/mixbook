"""Audit catalog.js, navigation references and local recipe assets (no dependencies)."""
import json
import subprocess
import unicodedata
from pathlib import Path

root = Path(__file__).resolve().parent.parent
catalog = json.loads(subprocess.check_output([
    'node', '-e', "const fs=require('fs'),vm=require('vm'),C=require('./core.js');const c={window:{}};vm.runInNewContext(fs.readFileSync('catalog.js','utf8'),c);const raw=c.window.MIX_CATALOG;process.stdout.write(JSON.stringify({...C.validate(raw),menus:raw.menus}));"
], cwd=root, text=True))
by = {i['id']: i for i in catalog['ingredients']}
menus = catalog['menus']
roots = {m[0] for m in menus}
pages = {p for m in menus for p in m[1]}
assert len(roots) == len(menus), '重复一级菜单'
assert not roots & pages, '一级与二级菜单重叠'
for root_id, children in menus:
    assert root_id in by and by[root_id]['kind'] == 'type', root_id
    assert not by[root_id]['parentId'], root_id
    assert len(children) == len(set(children)), root_id
    for child in children:
        assert child in by, child
        ancestor = by[child]['parentId']
        while ancestor and ancestor != root_id:
            ancestor = by[ancestor]['parentId']
        assert ancestor == root_id, child
# A selectable name/alias must identify only one unbranded ingredient within
# its parent and constraints. Navigation labels may repeat across levels.
identities = {}
for item in by.values():
    if item['brand']:
        continue
    for name in {item['name'], *item['aliases']}:
        key = (item['parentId'], tuple(sorted(item['tags'])), item['matchParent'], unicodedata.normalize('NFKC', name).strip().lower())
        assert key not in identities or identities[key] == item['id'], ('重复原料名称或别名', name, identities.get(key), item['id'])
        identities[key] = item['id']
# Some entries are both second-level navigation and selectable built-in tags.
tags = [i for i in by.values() if i['builtInTag']]
for tag in tags:
    assert tag['parentId'] in roots | pages, tag['id']
for recipe in catalog['recipes']:
    for row in recipe['ingredients'] + recipe['garnishes']:
        for reference in [row['id']] + row.get('alternatives', []):
            assert reference in by, (recipe['id'], reference)
    if recipe['image']:
        assert (root/'assets'/'cocktails'/(recipe['image']+'.webp')).is_file(), f"缺少配图：{recipe['id']}"
print(f"OK: {len(menus)} 个一级菜单，{len(pages)} 个二级菜单，{len(tags)} 个内置标签，{len(by)} 项原料，{len(catalog['recipes'])} 份配方；数据结构、引用与配图全部通过。")

"""Build a reviewable contact sheet from the explicit upload-to-recipe manifest."""
import json
from html import escape
from pathlib import Path
root=Path(__file__).resolve().parent.parent
m=json.loads((root/'data/photo-map.json').read_text())
cards=[]
for p in m['photos']:
 src=p['asset']+'?v='+p['assetSha256'][:12]
 note='<p class="note">'+escape(p['note'])+'</p>' if p['note'] else ''
 cards.append(f'''<figure id="photo-{p['number']}"><img src="{escape(src)}" alt="{escape(p['name'])}" width="600" height="800" loading="lazy"><figcaption><span class="number">原编号 {p['number']:02}</span><h2>{escape(p['name'])}</h2><p class="slug">{escape(p['slug'])}</p><p>{escape(p['visualMatch'])}</p>{note}<details><summary>原文件与校验值</summary><p>{escape(p['originalFilename'])}</p><small>原图 SHA256</small><code>{p['sourceSha256']}</code><small>发布图片 SHA256</small><code>{p['assetSha256']}</code></details></figcaption></figure>''')
html='''<!doctype html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>配图编号对照 · Mixbook</title><style>
*{box-sizing:border-box}body{margin:0;background:#f7f8fa;color:#24282d;font:15px/1.65 -apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC",sans-serif}main{max-width:1250px;margin:auto;padding:28px 20px 50px}a{color:#d9432b}h1{font-size:30px;margin:20px 0 10px}h2{font-size:19px;margin:5px 0}.intro{max-width:800px;color:#56616b}.grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:18px;margin-top:24px}figure{margin:0;overflow:hidden;background:white;border:1px solid #dfe3e8;border-radius:10px}img{display:block;width:100%;height:auto;aspect-ratio:3/4;object-fit:contain;background:#eee}figcaption{padding:16px}.number{color:#c5412f;font-size:13px}.slug{font-size:12px;color:#737e88}p{margin:6px 0 12px}.note{background:#fff2e6;padding:9px;font-size:13px}details{font-size:12px;margin-top:14px}summary{cursor:pointer}details p,code{overflow-wrap:anywhere}code{display:block;font-size:10px;margin:6px 0}small{color:#65717d}@media(max-width:850px){.grid{grid-template-columns:repeat(3,minmax(0,1fr))}}@media(max-width:620px){.grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}main{padding:20px 12px}figcaption{padding:11px}h2{font-size:17px}}
</style></head><body><main><a href="./">← 返回酒谱</a><h1>上传配图 · 编号对照</h1><div class="intro"><p>本次压缩包中的 58 张图片全部列在这里，对应 58 杯酒。加上原有尼格罗尼，酒谱现有 59 杯配图。本次没有生成图片。</p><p>编号整体倒序，有五处局部交错，已结合杯形、酒液、冰与装饰核对。编号来自上传文件，并非已恢复的原始生成日志。</p><p>原图中五杯与当前配方记录有外观差异，已在卡片和酒谱详情注明。制作时以文字配方为准。</p><a href="./data/photo-map.json">查看完整对应记录</a></div><div class="grid">'''+''.join(cards)+'''</div></main></body></html>'''
(root/'photo-map.html').write_text(html)
print('Built photo-map.html with',len(cards),'entries')

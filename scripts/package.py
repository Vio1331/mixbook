from pathlib import Path
import zipfile
root=Path(__file__).resolve().parent.parent
out=root.parent/'deliverables/mixbook-v0.2.zip';out.parent.mkdir(exist_ok=True)
with zipfile.ZipFile(out,'w',zipfile.ZIP_DEFLATED) as z:
 for p in root.rglob('*'):
  if p.is_file() and not any(x in p.parts for x in ['.git','node_modules','research']) and p.name not in ['iba-source-facts.json','PROGRESS.md']:
   z.write(p,p.relative_to(root))
print(out,out.stat().st_size)

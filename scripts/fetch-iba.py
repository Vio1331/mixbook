import concurrent.futures,json,pathlib,time
import requests
from bs4 import BeautifulSoup
ROOT=pathlib.Path(__file__).resolve().parents[1]
def get(url):
 for n in range(3):
  try:
   r=requests.get(url,timeout=45);r.raise_for_status();return BeautifulSoup(r.text,'html.parser')
  except Exception:
   if n==2:raise
def index(n):
 soup=get('https://iba-world.com/cocktails/all-cocktails/'+(f'page/{n}/' if n>1 else ''))
 return list(dict.fromkeys(a['href'] for a in soup.select('a[href]') if '/iba-cocktail/' in a['href']))
with concurrent.futures.ThreadPoolExecutor(max_workers=6) as p:urls=list(dict.fromkeys(u for page in p.map(index,range(1,7)) for u in page))
print('Index',len(urls),flush=True)
def recipe(url):
 s=get(url);title=s.find('h1').get_text(' ',strip=True);text=s.get_text('\n',strip=True);start=text.index('Ingredients',text.index(title));end=text.find('MOST VIEWED COCKTAILS',start)
 facts=text[start:end];slug=url.rstrip('/').split('/')[-1]
 # Keep internal fact source separate from public deliverable.
 o={'slug':slug,'name':title,'url':url,'facts':facts}
 (ROOT/'data'/'research'/f'{slug}.json').write_text(json.dumps(o,ensure_ascii=False));print(slug,flush=True);return o
(ROOT/'data/research').mkdir(exist_ok=True)
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as p:records=list(p.map(recipe,urls))
(ROOT/'data/iba-source-facts.json').write_text(json.dumps({'count':len(records),'records':records},ensure_ascii=False,indent=2))
print('saved',len(records),flush=True)

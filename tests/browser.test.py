"""Browser regressions. Run: python3 tests/browser.test.py (Playwright + Chromium)."""
import base64
import copy
import json
import os
from pathlib import Path
import threading
import unittest
from functools import partial
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from playwright.sync_api import sync_playwright, expect

ROOT = Path(__file__).resolve().parent.parent
class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, *_): pass

class BrowserTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.server = ThreadingHTTPServer(('127.0.0.1', 0), partial(QuietHandler, directory=str(ROOT)))
        threading.Thread(target=cls.server.serve_forever, daemon=True).start()
        cls.url = f'http://127.0.0.1:{cls.server.server_port}/'
        cls.pw = sync_playwright().start()
        cls.browser = cls.pw.chromium.launch(executable_path=os.environ.get('CHROMIUM_PATH', '/usr/bin/chromium'), args=['--no-sandbox','--disable-dev-shm-usage'])
    @classmethod
    def tearDownClass(cls):
        cls.browser.close(); cls.pw.stop(); cls.server.shutdown(); cls.server.server_close()
    def setUp(self):
        self.context = self.browser.new_context(viewport={'width':1440,'height':1000}, service_workers='block')
        self.page = self.context.new_page(); self.errors = []
        self.page.on('pageerror', lambda e:self.errors.append(str(e)))
        self.page.on('dialog', lambda d:d.accept())
        self.page.goto(self.url); self.page.wait_for_selector('.recipe-card')
    def tearDown(self):
        self.assertEqual(self.errors, []); self.context.close()
    def data(self, page=None):
        return (page or self.page).evaluate("""async()=>{const db=await new Promise(r=>{const q=indexedDB.open('mixbook',1);q.onsuccess=()=>r(q.result)});return new Promise(r=>{const q=db.transaction('state').objectStore('state').get('current');q.onsuccess=()=>{db.close();r(q.result.data)}})}""")
    def put(self, data, key='current'):
        self.page.evaluate("""async({data,key})=>{const db=await new Promise(r=>{const q=indexedDB.open('mixbook',1);q.onsuccess=()=>r(q.result)});await new Promise(r=>{const tx=db.transaction('state','readwrite');tx.objectStore('state').put(key==='current'?{data,base:null,revision:crypto.randomUUID()}:data,key);tx.oncomplete=r});db.close()}""", {'data':data,'key':key})
    def go(self, view):
        nav='.mobile-nav' if self.page.viewport_size['width']<=650 else '.desktop-nav'
        self.page.locator(f'{nav} [data-view={view}]').click()
    def pick(self, id, trigger):
        self.page.locator(trigger).click()
        name=self.page.evaluate('(id)=>MIX_SEED.ingredients.find(x=>x.id===id).name',id)
        self.page.locator('#material-search').fill(name)
        self.page.locator(f'[data-pick="{id}"]').click()
    def stock(self, id):
        self.page.locator('[data-action=add-stock]').first.click()
        self.pick(id,'[data-action=pick-stock]')
        self.page.locator('#stock-form button[type=submit]').click()
        expect(self.page.locator('#item-dialog')).not_to_be_visible()
    def detail(self,id='iba-negroni'):
        self.page.locator(f'.card-main[data-detail={id}]').click()
    def close(self,id):
        self.page.locator(f'#{id} [data-close={id}]').first.click();expect(self.page.locator(f'#{id}')).not_to_be_visible()
    def test_search_filters_and_list(self):
        self.assertEqual(self.page.locator('.recipe-card').count(),102)
        self.page.locator('#recipe-search').fill('Negroni');expect(self.page.locator('.recipe-card')).to_have_count(1)
        self.page.locator('[data-layout=list]').click();expect(self.page.locator('#recipe-results')).to_have_class('result-grid is-list')
        self.page.reload();self.page.wait_for_selector('.recipe-card');self.assertIn('is-list',self.page.locator('#recipe-results').get_attribute('class'))
        self.page.locator('[data-base-filter="金酒"]').click()
        self.page.locator('#source-filter').select_option('IBA · 难忘经典')
        rows=self.page.locator('.recipe-card').count();self.assertGreater(rows,0);self.assertLess(rows,102)
        self.page.locator('[data-collection=mine]').click();expect(self.page.locator('.recipe-card')).to_have_count(0)
    def test_stock_has_no_default_and_matching(self):
        self.go('pantry');expect(self.page.locator('.page-heading p')).to_contain_text('0 种已有原料')
        self.page.locator('[data-action=add-stock]').first.click()
        self.assertEqual(self.page.locator('[name=materialId]').input_value(),'')
        self.page.locator('#stock-form [name=name]').fill('糖浆')
        self.page.locator('#stock-form button[type=submit]').click();expect(self.page.locator('#stock-error')).to_contain_text('请选择对应原料')
        self.pick('simple-syrup','[data-action=pick-stock]')
        self.assertEqual(self.page.locator('#stock-form [name=name]').input_value(),'糖浆')
        self.page.locator('#stock-form button[type=submit]').click();expect(self.page.locator('#item-dialog')).not_to_be_visible()
        self.assertEqual(self.data()['pantryItems'][0]['matches'],['simple-syrup'])
        self.stock('gin');self.stock('campari');self.stock('sweet-vermouth')
        self.go('recipes');self.detail();expect(self.page.locator('#detail-dialog .match-label')).to_contain_text('原料齐全')
        self.page.locator('#detail-scale').select_option('2')
        amounts=self.page.locator('.ingredient-row .amount').all_text_contents();self.assertTrue(all('60' in x for x in amounts[:3]))
        self.page.locator('[data-action=toggle-cooking]').click();self.page.locator('[data-cook-check=main-0]').click()
        expect(self.page.locator('[data-cook-check=main-0]')).to_have_attribute('aria-pressed','true')
        self.page.locator('[data-action=next-step]').click();expect(self.page.locator('[data-cook-step="1"]')).to_have_attribute('aria-pressed','true')
    def test_version_alternatives_validation_and_copy(self):
        original=next(r for r in self.data()['recipes'] if r['id']=='iba-negroni')
        self.detail();self.page.locator('[data-add-version=iba-negroni]').click()
        self.page.locator('#recipe-form [name=name]').fill('45 / 30 / 30')
        row=self.page.locator('#editor-ingredients .ingredient-edit-row').first
        row.locator('[name=amount]').fill('45')
        self.pick('london-dry','#editor-ingredients .ingredient-edit-row:first-child [data-action=add-alternative]')
        self.assertEqual(row.locator('[name=ingredientId]').input_value(),'gin');self.assertEqual(row.locator('[name=amount]').input_value(),'45')
        row.locator('[name=amount]').fill('-30');self.page.locator('#recipe-form button[type=submit]').click()
        expect(row.locator('.row-error')).to_contain_text('负数');expect(self.page.locator('#editor-dialog')).to_be_visible()
        row.locator('[name=amount]').fill('45');self.page.locator('#recipe-form button[type=submit]').click()
        expect(self.page.locator('#detail-dialog')).to_be_visible()
        after=next(r for r in self.data()['recipes'] if r['id']=='iba-negroni')
        self.assertEqual(after['ingredients'],original['ingredients']);self.assertEqual(after['versions'][0]['ingredients'][0]['alternatives'],['london-dry'])
        self.close('detail-dialog');self.page.locator('[data-collection=mine]').click();expect(self.page.locator('.recipe-card')).to_have_count(1)
        self.detail();self.page.locator('.action-menu summary').click();self.page.locator('[data-duplicate=iba-negroni]').click()
        self.assertEqual(self.page.locator('#recipe-form [name=image]').input_value(),original['image'])
        self.page.locator('#recipe-form button[type=submit]').click();expect(self.page.locator('#detail-dialog')).to_be_visible()
        copied=next(r for r in self.data()['recipes'] if '副本' in r['name']);self.assertEqual(copied['image'],original['image']);self.assertFalse(copied['catalog'])
    def test_draft_reload_and_inline_material_creation(self):
        self.page.locator('[data-action=new]').click();self.page.locator('#recipe-form [name=name]').fill('草稿测试')
        self.page.locator('[data-action=choose-material]').first.click();self.page.locator('.quick-new summary').click()
        self.page.locator('#quick-material-form [name=name]').fill('自制紫苏糖浆')
        self.page.locator('#quick-material-form [name=parentId]').select_option('syrup')
        self.page.locator('#quick-material-form [name=aliases]').fill('Shiso Syrup')
        self.page.locator('#quick-material-form button[type=submit]').click()
        self.page.locator('#editor-ingredients [name=amount]').fill('15')
        self.page.locator('#recipe-form [name=steps]').fill('加冰摇匀。\n滤入杯中。')
        self.close('editor-dialog');self.page.reload();self.page.wait_for_selector('[data-action=resume-recipe-draft]')
        self.page.locator('[data-action=resume-recipe-draft]').click()
        self.assertEqual(self.page.locator('#recipe-form [name=name]').input_value(),'草稿测试')
        self.assertEqual(self.page.locator('#editor-ingredients [name=amount]').input_value(),'15')
        self.page.locator('#recipe-form button[type=submit]').click();expect(self.page.locator('#detail-dialog')).to_be_visible()
        d=self.data();r=next(r for r in d['recipes'] if r['name']=='草稿测试');i=next(i for i in d['ingredients'] if i['name']=='自制紫苏糖浆')
        self.assertEqual(r['ingredients'][0]['id'],i['id']);self.assertIn('Shiso Syrup',i['aliases'])
        self.close('detail-dialog');self.go('pantry');self.page.locator('[data-action=add-stock]').first.click();self.close('item-dialog');self.page.reload()
        self.page.wait_for_selector('.recipe-card');self.go('pantry');expect(self.page.locator('[data-action=resume-stock-draft]')).to_be_visible()
    def test_paste_unrecognized_preserved_and_optional(self):
        self.page.locator('[data-action=new]').click();self.page.locator('[data-action=toggle-paste]').click()
        self.page.locator('#paste-ingredients').fill('金酒 30 ml\n金巴利 30 ml\n不认识的原料 10 ml')
        self.page.locator('[data-action=parse-paste]').click();self.assertEqual(self.page.locator('#editor-ingredients .ingredient-edit-row').count(),2)
        self.assertEqual(self.page.locator('#paste-ingredients').input_value(),'不认识的原料 10 ml')
        self.page.locator('#editor-ingredients [name=optional]').first.check()
        self.close('editor-dialog');self.page.locator('[data-action=resume-recipe-draft]').click();expect(self.page.locator('#editor-ingredients [name=optional]').first).to_be_checked()
    def test_multitab_conflict_preserves_other_records(self):
        self.detail();self.page.locator('[data-add-version=iba-negroni]').click();self.page.locator('#recipe-form [name=name]').fill('本页修改')
        other=self.context.new_page();other.goto(self.url);other.wait_for_selector('.recipe-card')
        other.locator('[data-favorite=iba-negroni]').click()
        other.locator('.desktop-nav [data-view=pantry]').click();other.locator('[data-action=add-stock]').first.click()
        other.locator('[data-action=pick-stock]').click();other.locator('#material-search').fill('金酒');other.locator('[data-pick=gin]').click()
        other.locator('#stock-form button[type=submit]').click();expect(other.locator('#item-dialog')).not_to_be_visible()
        self.page.locator('#recipe-form button[type=submit]').click();expect(self.page.locator('#detail-dialog')).to_be_visible()
        self.assertTrue(self.data()['favorites']['iba-negroni']);self.assertEqual(self.data()['pantryItems'][0]['matches'],['gin'])
        self.page.locator('[data-edit-version]').click();self.page.locator('#recipe-form [name=name]').fill('本页第二次修改')
        other.evaluate("""async()=>{const db=await new Promise(r=>{const q=indexedDB.open('mixbook',1);q.onsuccess=()=>r(q.result)});const data=await new Promise(r=>{const q=db.transaction('state').objectStore('state').get('current');q.onsuccess=()=>r(q.result)});data.data.recipes.find(r=>r.id==='iba-negroni').notes='其他页面笔记';data.revision=crypto.randomUUID();await new Promise(r=>{const tx=db.transaction('state','readwrite');tx.objectStore('state').put(data,'current');tx.oncomplete=r});db.close()}""")
        self.page.locator('#recipe-form button[type=submit]').click();expect(self.page.locator('#confirm-dialog')).to_contain_text('已在其他页面更新')
        self.page.locator('[data-choice=cancel]').click();expect(self.page.locator('#editor-dialog')).to_be_visible()
    def test_old_data_migration_backup_and_export(self):
        legacy=self.page.evaluate("""async()=>{const text=await(await fetch('./tests/fixtures/legacy-seed.js')).text();const scope={};new Function('window',text)(scope);const d=scope.MIX_SEED;d.pantry.gin=true;d.favorites.negroni=true;return d}""")
        self.put(legacy);self.page.reload();self.page.wait_for_selector('.recipe-card')
        d=self.data();self.assertEqual(d['schemaVersion'],4);self.assertTrue(d['favorites']['iba-negroni']);self.assertTrue(any('gin' in x['matches'] for x in d['pantryItems']))
        self.go('settings')
        with self.page.expect_download() as received:self.page.locator('[data-action=export]').click()
        exported=json.loads(Path(received.value.path()).read_text());self.assertEqual(exported,d)
        self.page.reload();self.page.wait_for_selector('.recipe-card')
        backup=self.page.evaluate("""async()=>{const db=await new Promise(r=>{const q=indexedDB.open('mixbook',1);q.onsuccess=()=>r(q.result)});return new Promise(r=>{const q=db.transaction('state').objectStore('state').get('backup-before-v2-ui');q.onsuccess=()=>{db.close();r(q.result.data)}})}""")
        self.assertEqual(backup['schemaVersion'],1)
    def test_layout_dark_and_keyboard(self):
        for width in [1440,768,390,320]:
            self.page.set_viewport_size({'width':width,'height':900})
            self.assertLessEqual(self.page.evaluate('document.documentElement.scrollWidth'),width)
            if width<=650:
                nav=self.page.locator('.mobile-nav').bounding_box();self.assertGreater(nav['y'],800)
            self.page.locator('[data-action=toggle-theme]').click()
            self.detail();self.assertLessEqual(self.page.locator('#detail-dialog').evaluate('(el)=>el.scrollWidth'),width)
            self.page.locator('#detail-scale').select_option('2');self.close('detail-dialog')
            self.page.locator('[data-action=new]').click();self.page.locator('[data-action=choose-material]').first.click()
            self.assertLessEqual(self.page.locator('#material-dialog').evaluate('(el)=>el.scrollWidth'),width)
            contrast=self.page.locator('#material-category').evaluate('(el)=>({bg:getComputedStyle(el).backgroundColor,fg:getComputedStyle(el).color})');self.assertNotEqual(contrast['bg'],contrast['fg'])
            self.page.keyboard.press('Escape');expect(self.page.locator('#material-dialog')).not_to_be_visible()
            self.assertLessEqual(self.page.locator('#editor-dialog').evaluate('(el)=>el.scrollWidth'),width)
            self.page.locator('[data-action=discard-editor]').click();self.page.locator('[data-choice=yes]').click()
            expect(self.page.locator('#editor-dialog')).not_to_be_visible()
        self.go('settings');self.page.locator('[data-action=open-sync-settings]').click();self.assertLessEqual(self.page.locator('#sync-dialog').evaluate('(el)=>el.scrollWidth'),320)
    def test_sync_merge_failure_and_token_exclusion(self):
        remote=self.data();remote['favorites']['iba-americano']=True
        state={'remote':remote,'puts':0,'fail':False}
        def api(route):
            url=route.request.url;status=200
            if '/contents/' in url:
                if route.request.method=='PUT':
                    if state['fail']:status=409;body={'message':'conflict'}
                    else:state['remote']=json.loads(base64.b64decode(route.request.post_data_json['content']));state['puts']+=1;body={'content':{'sha':'mock-sha'}}
                else:
                    content=json.dumps(state['remote'],ensure_ascii=False).encode();body={'type':'file','encoding':'base64','size':len(content),'sha':'mock-sha','content':base64.b64encode(content).decode()}
            elif '/branches/' in url:body={'name':'main'}
            else:body={'private':True,'default_branch':'main'}
            route.fulfill(status=status,content_type='application/json',body=json.dumps(body))
        self.context.route('https://api.github.com/**',api)
        self.page.locator('[data-favorite=iba-negroni]').click();self.go('settings');self.page.locator('[data-action=open-sync-settings]').click()
        for field,value in [('owner','test-owner'),('repo','test-private'),('token','dummy-test-token')]:self.page.locator(f'#sync-form [name={field}]').fill(value)
        self.page.locator('#sync-form button[type=submit]').click();self.page.locator('[data-action=sync-now]').click();self.page.locator('[data-choice=merge]').click()
        expect(self.page.locator('#sync-overlay')).not_to_be_visible(timeout=10000)
        self.assertTrue(self.data()['favorites']['iba-americano']);self.assertTrue(self.data()['favorites']['iba-negroni']);self.assertNotIn('dummy-test-token',json.dumps(state['remote']))
        self.go('recipes');self.page.locator('[data-favorite=iba-alexander]').click();self.go('settings')
        state['fail']=True;before=copy.deepcopy(state['remote']);self.page.locator('[data-action=sync-now]').click();self.page.locator('[data-choice=merge]').click()
        expect(self.page.locator('.sync-overlay-card')).to_have_attribute('data-sync-state','error',timeout=10000)
        self.assertTrue(self.data()['favorites']['iba-alexander']);self.assertEqual(state['remote'],before)
        self.page.locator('[data-action=cancel-sync-result]').click();state['fail']=False
        self.page.locator('[data-action=sync-now]').click();self.page.locator('[data-choice=merge]').click();expect(self.page.locator('#sync-overlay')).not_to_be_visible(timeout=10000)
        self.assertTrue(state['remote']['favorites']['iba-alexander'])
    def test_stock_delete_undo_and_directory(self):
        self.go('pantry');self.stock('gin');self.page.locator('.stock-card').click();self.page.locator('[data-delete-stock]').click();self.page.locator('[data-choice=yes]').click()
        expect(self.page.locator('.stock-card')).to_have_count(0);self.page.locator('#toast button').click();expect(self.page.locator('.stock-card')).to_have_count(1)
        self.page.locator('[data-pantry-tab=directory]').click();self.page.locator('#pantry-search').fill('Cointreau');expect(self.page.locator('.directory-card')).to_have_count(1)
        self.assertIn('君度',self.page.locator('.directory-card').inner_text())
    def test_unavailable_database_can_still_save_export(self):
        c=self.browser.new_context(service_workers='block');c.add_init_script("Object.defineProperty(window,'indexedDB',{get(){throw Error('denied')}})")
        p=c.new_page();p.goto(self.url);p.wait_for_selector('.recipe-card');expect(p.locator('.notice')).to_contain_text('不能保存本地数据');c.close()
    def test_offline_shell_and_stock_persistence(self):
        c=self.browser.new_context(service_workers='allow',viewport={'width':390,'height':844})
        p=c.new_page();p.goto(self.url);p.wait_for_selector('.recipe-card')
        p.evaluate('async()=>await navigator.serviceWorker.ready');p.reload();p.wait_for_selector('.recipe-card')
        self.assertTrue(p.evaluate('!!navigator.serviceWorker.controller'))
        self.assertIn('mixbook-v2-release-1',p.evaluate('async()=>await caches.keys()'))
        c.set_offline(True);p.reload();p.wait_for_selector('.recipe-card')
        p.locator('.mobile-nav [data-view=pantry]').click();p.locator('[data-action=add-stock]').first.click()
        p.locator('[data-action=pick-stock]').click();p.locator('#material-search').fill('金酒');p.locator('[data-pick=gin]').click()
        p.locator('#stock-form button[type=submit]').click();expect(p.locator('#item-dialog')).not_to_be_visible()
        p.reload();p.wait_for_selector('.recipe-card');self.assertEqual(self.data(p)['pantryItems'][0]['matches'],['gin']);c.close()

if __name__=='__main__':unittest.main(verbosity=2)

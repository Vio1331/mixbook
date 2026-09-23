/* Shared ingredient directory. Browsing never mutates saved data. */
(function(root){
'use strict';
const C=root.MixCore;
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
class MaterialBrowser{
 constructor(el,data,options={}){
  this.el=el;this.data=data;this.options=options;this.mode=options.mode||'recipe';
  this.parentId=options.parentId||'';this.group=options.group||'';this.q='';
  if(this.parentId)this.group=this.item(this.parentId)?.category||'';
  this.el.innerHTML='<label class="field material-search">搜索类别、酒款或品牌<input type="search" data-material-search placeholder="例如：金酒、拉弗格、D.O.M.…"></label><div data-material-results></div>';
  this.el.onclick=e=>this.click(e);this.el.onchange=e=>this.change(e);
  this.el.oninput=e=>{if(e.target.matches('[data-material-search]')){this.q=e.target.value;this.render()}};
  this.render();
 }
 item(id){return this.data.ingredients.find(i=>i.id===id)}
 path(id){return C.ingredientPath(id,this.data).filter(i=>i.id!=='spirit')}
 pathText(id){return this.path(id).map(i=>i.name).join(' › ')}
 allowed(i){return !this.options.excludeId||!C.ingredientPath(i.id,this.data).some(p=>p.id===this.options.excludeId)}
 chooseLabel(i){return this.mode==='parent'?'选择此类别':i.kind==='product'?'指定此酒款':C.needsProduct(i,this.data)?'使用此类别 · 不限酒款':'使用此材料'}
 itemControls(i){
  if(this.mode==='pantry'){
   const generic=C.needsProduct(i,this.data);
   if(generic&&!this.data.pantry[i.id])return '';
   return `<label class="material-own"><input type="checkbox" data-pantry="${esc(i.id)}" ${this.data.pantry[i.id]?'checked':''}>${generic?'已有记录 · 酒款未记录':'拥有'}</label>`;
  }
  if(this.mode==='parent'&&i.kind!=='type')return '';
  return `<button type="button" class="btn small" data-material-select="${esc(i.id)}">${this.chooseLabel(i)}</button>`;
 }
 card(i){
  const children=this.data.ingredients.filter(x=>x.parentId===i.id&&x.kind==='type').length;
  const products=this.data.ingredients.filter(x=>x.kind==='product'&&C.ingredientPath(x.id,this.data).some(p=>p.id===i.id)).length;
  const open=i.kind==='type';
  const tagNames=(i.tags||[]).map(id=>this.item(id)?.name).filter(Boolean);
  return `<article class="material-card ${this.data.pantry[i.id]?'checked':''}" data-material-id="${esc(i.id)}"><div class="material-card-head">${open?`<button type="button" class="material-name" data-material-nav="${esc(i.id)}"><strong>${esc(i.name)}</strong><span aria-hidden="true">›</span></button>`:`<strong>${esc(i.name)}</strong>`}${this.options.onEdit?`<button type="button" class="link-button" data-material-edit="${esc(i.id)}">编辑</button>`:''}</div><p class="material-meta">${esc(i.kind==='product'?(i.brand||'具体产品'):`${children} 个子类 · ${products} 款产品`)}</p>${tagNames.length?`<div class="chips material-tags">${tagNames.map(x=>`<span class="chip">${esc(x)}</span>`).join('')}</div>`:''}${this.q?`<p class="material-path">${esc(this.pathText(i.id))}</p>`:''}${i.matchParent===false?'<p class="material-boundary">独立匹配：不自动代替上级类别</p>':''}<div class="material-controls">${this.itemControls(i)}</div></article>`;
 }
 render(){
  const d=this.data,all=d.ingredients.filter(i=>this.allowed(i)),current=this.item(this.parentId);
  const groups=[...new Set(all.map(i=>i.category))];
  let body=`<nav class="material-breadcrumb" aria-label="材料目录位置"><button type="button" data-material-home>全部材料</button>${this.group?`<span>›</span><button type="button" data-material-group="${esc(this.group)}">${esc(this.group)}</button>`:''}${current?this.path(current.id).map(i=>`<span>›</span><button type="button" data-material-nav="${esc(i.id)}">${esc(i.name)}</button>`).join(''):''}</nav>`;
  if(this.q.trim()){
   const terms=C.norm(this.q).split(/\s+/).filter(Boolean);
   const items=all.filter(i=>(this.mode!=='parent'||i.kind==='type')&&i.id!=='spirit'&&terms.every(t=>C.materialText(i,d).includes(t)));
   body+=`<p class="hint">全目录搜索 · ${items.length} 项</p><div class="material-grid">${items.map(i=>this.card(i)).join('')}</div>`;
   if(!items.length)body+='<p class="hint">没有匹配项，可以新增类别或具体酒款。</p>';
  }else if(!this.group&&!current){
   body+=`<div class="material-groups">${groups.map(g=>`<button type="button" data-material-group="${esc(g)}"><strong>${esc(g)}</strong><span>${all.filter(i=>i.category===g&&i.kind==='product').length} 款产品 ›</span></button>`).join('')}</div>`;
  }else if(this.mode==='pantry'&&current&&current.parentId==='spirit'){
   const tags=all.filter(i=>i.kind==='type'&&i.id!==current.id&&C.ingredientPath(i.id,d).some(p=>p.id===current.id));
   body+=`<section class="material-current"><div class="row spread"><div><strong>${esc(current.name)}</strong><p class="hint">用标签描述酒款，不再逐级钻入子菜单。一瓶酒可以同时选择产地和风格标签。</p></div><button type="button" class="btn primary" data-material-new="product">＋ 添加酒</button></div></section><div class="tag-manager-head"><div><h3 class="material-section">标签管理 <small>${tags.length}</small></h3><p class="hint">在这里统一新增、修改或删除标签；最后使用页面上方的“保存酒柜”保存。</p></div><button type="button" class="btn" data-material-new="type">＋ 新增标签</button></div><div class="material-grid tag-directory">${tags.map(i=>this.card(i)).join('')||'<p class="hint">还没有标签，先新增一个。</p>'}</div>`;
  }else{
   if(current){
    body+=`<section class="material-current"><strong>${esc(current.name)}</strong><p class="hint">${this.mode==='pantry'&&C.needsProduct(current,d)?'选择下面的具体酒款；没有找到时，可在此类别下新增。':'可以使用当前类别，或继续选择子类及具体酒款。'}</p>${current.matchParent===false?'<p class="material-boundary">此类不会自动满足上级类别的配方要求。</p>':''}<div class="material-controls">${this.itemControls(current)}${this.options.onEdit?`<button type="button" class="link-button" data-material-edit="${esc(current.id)}">编辑类别</button>`:''}</div></section>`;
   }
   const parentId=current?.id||(this.group==='基酒'?'spirit':'');
   const types=all.filter(i=>i.kind==='type'&&i.id!=='spirit'&&(current?i.parentId===parentId:i.category===this.group&&(!i.parentId||i.parentId==='spirit'||this.item(i.parentId)?.category!==this.group)));
   const products=this.mode==='parent'?[]:all.filter(i=>i.kind==='product'&&(current?C.ingredientPath(i.id,d).some(p=>p.id===current.id):i.category===this.group));
   if(types.length)body+=`<h3 class="material-section">${current?'进一步分类':'材料类别'}</h3><div class="material-grid">${types.map(i=>this.card(i)).join('')}</div>`;
   if(products.length)body+=`<h3 class="material-section">具体酒款 / 产品 <small>${products.length}</small></h3><div class="material-grid">${products.map(i=>this.card(i)).join('')}</div>`;
   if(!types.length&&!products.length)body+='<p class="hint">此处还没有子类或酒款，可直接新增。</p>';
  }
  if(this.options.onNew&&!(this.mode==='pantry'&&current?.parentId==='spirit'))body+=`<div class="material-new"><button type="button" class="btn" data-material-new="product">＋ 添加酒 / 具体产品</button><button type="button" class="btn" data-material-new="type">＋ 新增标签 / 通用材料</button></div>`;
  this.el.querySelector('[data-material-results]').innerHTML=body;
 }
 navigate(parentId='',group=''){
  this.parentId=parentId;this.group=group||this.item(parentId)?.category||'';this.q='';
  this.el.querySelector('[data-material-search]').value='';this.render();
 }
 click(e){
  const b=e.target.closest('button');if(!b||!this.el.contains(b))return;
  if(b.hasAttribute('data-material-home'))this.navigate();
  else if(b.hasAttribute('data-material-group'))this.navigate('',b.dataset.materialGroup);
  else if(b.hasAttribute('data-material-nav'))this.navigate(b.dataset.materialNav);
  else if(b.hasAttribute('data-material-select'))this.options.onSelect?.(this.item(b.dataset.materialSelect));
  else if(b.hasAttribute('data-material-edit'))this.options.onEdit?.(this.item(b.dataset.materialEdit));
  else if(b.hasAttribute('data-material-new'))this.options.onNew?.({kind:b.dataset.materialNew,parentId:this.parentId,category:this.group,name:this.q.trim()});
 }
 change(e){
  const id=e.target.dataset.pantry;if(!id||this.mode!=='pantry')return;
  this.options.onToggle?.(this.item(id),e.target.checked);
  e.target.closest('.material-card')?.classList.toggle('checked',e.target.checked);
 }
}
root.MaterialBrowser=MaterialBrowser;
})(window);

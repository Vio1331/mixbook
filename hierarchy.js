/* Global material navigation structure. Kept outside Mixbook recipe/pantry data. */
(function(root){
'use strict';
const STORAGE_KEY='mixbook.material-hierarchy.v1';
const defaults=[
 ['whiskey',['bourbon','rye','scotch','blended-scotch','islay','canadian-whiskey','irish-whiskey','japanese-whiskey'],[]],['gin',['london-dry','plymouth-gin','navy-strength-gin','old-tom','modern-gin'],[]],
 ['rum-all',['rum','dark-rum','gold-rum','aged-rum','agricole','spiced-rum','overproof-rum'],['cuban-rum','jamaican-rum','demerara-rum','martinique-rum','puerto-rico-rum','cachaca']],['tequila',['blanco-tequila','gold-tequila','reposado-tequila','anejo-tequila'],[]],
 ['vodka',['neutral-vodka','flavored-vodka','baijiu','soju','shochu'],[]],['brandy',['brandy','fruit-brandy'],['cognac','pisco']],['beer',['pale-ale','ipa','stout','porter','abbey-beer','sour-beer','wheat-beer','lager'],[]],
 ['wine',['red-wine','white-wine','rose-wine','sparkling','champagne','prosecco','cava','ice-wine'],[]],['vermouth-root',['vermouth','dry-vermouth','bianco-vermouth'],[]],
 ['port-sherry',['ruby-port','rose-port','white-port','aged-port','tawny-port','fino-sherry','manzanilla-sherry','amontillado-sherry','palo-cortado-sherry','oloroso-sherry','cream-sherry','pedro-ximenez-sherry'],[]],
 ['liqueur',['liqueur'],['absinthe','cacao-liqueur','coffee-liqueur','cream-liqueur','orange-liqueur','cherry-liqueur','passion-liqueur','herbal-liqueur','pear-liqueur','honey-liqueur','mint-liqueur','mure','banana-liqueur','violette','grapefruit-liqueur','peach-liqueur','amaretto']],
 ['other-alcohol',['aperitif','amaro','bitters'],[]],['soda-root',['soda','tonic','other-soda'],[]],['other-materials',['syrup-root','juice-root','produce-root','seasoning-root','other-food'],[]]
];
const clone=value=>JSON.parse(JSON.stringify(value));
function valid(value){return Array.isArray(value)&&value.every(row=>Array.isArray(row)&&typeof row[0]==='string'&&Array.isArray(row[1])&&Array.isArray(row[2]||[]))}
function get(){try{const value=JSON.parse(root.localStorage?.getItem(STORAGE_KEY)||'null');if(valid(value))return value.map(row=>[row[0],[...row[1]],[...(row[2]||[])],{...(row[3]||{})}]);}catch{}return clone(defaults).map(row=>[...row,{}])}
function save(value){if(!valid(value))throw Error('层级格式无效。');root.localStorage?.setItem(STORAGE_KEY,JSON.stringify(value));return get()}
function reset(){root.localStorage?.removeItem(STORAGE_KEY);return get()}
const api={STORAGE_KEY,defaults:clone(defaults),get,save,reset,valid};
root.MixHierarchy=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);

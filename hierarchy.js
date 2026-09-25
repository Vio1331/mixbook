/* Shared navigation derived from the single editable cocktail-system.js file. */
(function(root){
'use strict';
const clone=value=>JSON.parse(JSON.stringify(value));
function valid(value){return Array.isArray(value)&&value.every(row=>Array.isArray(row)&&typeof row[0]==='string'&&Array.isArray(row[1])&&Array.isArray(row[2]||[]))}
function get(){
 const value=root.MIX_TAXONOMY?.menus||[];
 if(!valid(value))throw Error('cocktail-system.js 的 menus 层级格式无效。');
 return clone(value).map(row=>[row[0],[...row[1]],[...(row[2]||[])],{...(row[3]||{})}]);
}
const api={get,valid};
root.MixHierarchy=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);

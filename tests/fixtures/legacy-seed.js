(function(){
 const at='2026-09-19T00:00:00.000Z';
 const ingredient=(id,name,category,...aliases)=>({id,name,category,aliases});
 const row=(id,amount,unit='ml',optional=false)=>({id,amount:String(amount),unit,optional});
 const recipe=(id,name,en,base,method,glass,tags,ingredients,steps,slug,notes='')=>({id,name,en,base,method,glass,tags,ingredients,steps,source:slug?'https://iba-world.com/iba-cocktail/'+slug+'/':'',notes,createdAt:at,updatedAt:at,sample:true,image:id==='negroni'?'negroni':''});
 window.MIX_SEED={schemaVersion:1,ingredients:[
 ingredient('gin','金酒','基酒','Gin','杜松子酒'),ingredient('rum','白朗姆酒','基酒','White rum'),ingredient('tequila','龙舌兰','基酒','Tequila'),ingredient('bourbon','波本威士忌','基酒','Bourbon','Whiskey'),ingredient('vodka','伏特加','基酒','Vodka'),
 ingredient('campari','金巴利','利口酒与味美思','Campari'),ingredient('vermouth','甜红味美思','利口酒与味美思','Sweet red vermouth'),ingredient('triple-sec','橙味利口酒','利口酒与味美思','Triple sec'),
 ingredient('lime','青柠汁','果汁与汽水','Lime juice'),ingredient('lemon','柠檬汁','果汁与汽水','Lemon juice'),ingredient('soda','苏打水','果汁与汽水','Soda water'),ingredient('tonic','汤力水','果汁与汽水','Tonic water'),
 ingredient('sugar','细砂糖','糖与其他','Superfine sugar'),ingredient('syrup','原味糖浆','糖与其他','Sugar syrup'),ingredient('egg-white','蛋清','糖与其他','Egg white'),ingredient('orange','橙片','装饰','Orange'),ingredient('salt','盐','装饰','Salt')
 ],recipes:[
 recipe('negroni','尼格罗尼','Negroni','金酒','直调','古典杯',['苦甜','草本'],[row('gin',30),row('campari',30),row('vermouth',30),row('orange','半','片',true)],['在预冷的古典杯中放入冰块，倒入金酒、金巴利和甜红味美思。','轻轻搅拌，按喜好放上橙片。'],'negroni','金酒、金巴利与味美思的等份组合。装饰在本工具中标记为可选。'),
 recipe('daiquiri','代基里','Daiquiri','朗姆','摇和','鸡尾酒杯',['酸甜','柑橘'],[row('rum',60),row('lime',20),row('sugar',2,'吧匙')],['将朗姆酒、青柠汁和细砂糖放入摇壶，搅拌至糖溶解。','加入冰块摇和，滤入预冷的鸡尾酒杯。'],'daiquiri','以细砂糖为甜味来源的示例配方。'),
 recipe('margarita','玛格丽特','Margarita','龙舌兰','摇和','鸡尾酒杯',['酸甜','柑橘'],[row('tequila',50),row('triple-sec',20),row('lime',15),row('salt','适量','',true)],['需要盐口时，用青柠润湿半圈杯沿，再蘸少量盐。','将酒与青柠汁加冰摇和，滤入预冷的鸡尾酒杯。'],'margarita'),
 recipe('whiskey-sour','威士忌酸','Whiskey Sour','威士忌','摇和','古典杯',['酸甜','醇厚'],[row('bourbon',45),row('lemon',25),row('syrup',20),row('egg-white','少量','',true)],['将威士忌、柠檬汁和糖浆倒入摇壶，蛋清按需添加。','加入冰块充分摇和，滤入装有冰块的古典杯。'],'whiskey-sour','示例未计入装饰。蛋清为可选材料；使用时请自行选择适合生食的产品。'),
 recipe('gin-tonic','金汤力','Gin & Tonic','金酒','直调','高球杯',['清爽','苦甜'],[row('gin',45),row('tonic',120)],['高球杯装满冰块，倒入金酒。','加入冰镇汤力水，轻轻搅拌。'],'','练习用示例比例，可按个人口味调整。'),
 recipe('whisky-highball','威士忌嗨棒','Whisky Highball','威士忌','直调','高球杯',['清爽','气泡'],[row('bourbon',45),row('soda',135)],['高球杯放入冰块，倒入威士忌。','沿杯壁倒入冰镇苏打水，轻轻提拉搅拌一次。'],'','以波本演示的练习比例，可自行更换威士忌材料。'),
 recipe('vodka-soda','伏特加苏打','Vodka Soda','伏特加','直调','高球杯',['清爽','气泡'],[row('vodka',45),row('soda',135)],['高球杯中加入冰块和伏特加。','倒入苏打水，轻轻搅拌。'],'','练习用示例比例。'),
 recipe('lemon-soda','柠檬苏打','Lemon Soda','无酒精','直调','高球杯',['酸甜','清爽','气泡'],[row('lemon',25),row('syrup',20),row('soda',150)],['将柠檬汁与糖浆倒入杯中拌匀。','加入冰块与苏打水，轻轻搅拌。'],'','无酒精示例，糖浆可按口味调整。')
 ],pantry:{},favorites:{}};
})();

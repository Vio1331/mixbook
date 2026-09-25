/*
 * 全站鸡尾酒体系（唯一维护入口）
 *
 * 保存本文件并刷新网站后，原料类别、标签、层级菜单、配方风味标签、
 * 杯型与来源会同步更新。ingredients 中 parentId 表示父级；kind 为 type 表示类别。
 * menus 控制所有两栏原料菜单的左栏和右栏，第三组数组为该分组的可选标签；
 * menuTags 单独记录这些标签的名称与归属，避免只有 ID 而无法在页面中显示。
 * 已上线条目请尽量保留 ID，只修改 name；新增条目时 ID 必须全局唯一。
 */
window.MIX_TAXONOMY = {
  "ingredients": [
    {
      "id": "whiskey",
      "name": "威士忌",
      "category": "酒柜分类",
      "parentId": "",
      "brand": "",
      "aliases": [
        "Whiskey",
        "Whisky"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "bourbon",
      "name": "波本威士忌",
      "category": "威士忌",
      "parentId": "whiskey",
      "brand": "",
      "aliases": [
        "Bourbon Whiskey"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "rye",
      "name": "黑麦威士忌",
      "category": "威士忌",
      "parentId": "whiskey",
      "brand": "",
      "aliases": [
        "Rye Whiskey"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "scotch",
      "name": "苏格兰威士忌",
      "category": "威士忌",
      "parentId": "whiskey",
      "brand": "",
      "aliases": [
        "Scotch Whisky"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "blended-scotch",
      "name": "调和苏格兰威士忌",
      "category": "威士忌",
      "parentId": "whiskey",
      "brand": "",
      "aliases": [
        "Blended Scotch Whisky"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "islay",
      "name": "艾雷岛单一麦芽威士忌",
      "category": "威士忌",
      "parentId": "whiskey",
      "brand": "",
      "aliases": [
        "Islay Single Malt"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "canadian-whiskey",
      "name": "加拿大威士忌",
      "category": "威士忌",
      "parentId": "whiskey",
      "brand": "",
      "aliases": [],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "irish-whiskey",
      "name": "爱尔兰威士忌",
      "category": "威士忌",
      "parentId": "whiskey",
      "brand": "",
      "aliases": [
        "Irish Whiskey"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "japanese-whiskey",
      "name": "日本威士忌",
      "category": "威士忌",
      "parentId": "whiskey",
      "brand": "",
      "aliases": [],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "gin",
      "name": "金酒",
      "category": "酒柜分类",
      "parentId": "",
      "brand": "",
      "aliases": [
        "Gin"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "london-dry",
      "name": "伦敦干金酒",
      "category": "金酒",
      "parentId": "gin",
      "brand": "",
      "aliases": [
        "London Dry Gin"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "plymouth-gin",
      "name": "普利茅斯金酒",
      "category": "金酒",
      "parentId": "gin",
      "brand": "",
      "aliases": [],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "navy-strength-gin",
      "name": "海军强度金酒",
      "category": "金酒",
      "parentId": "gin",
      "brand": "",
      "aliases": [],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "old-tom",
      "name": "老汤姆金酒",
      "category": "金酒",
      "parentId": "gin",
      "brand": "",
      "aliases": [
        "Old Tom Gin"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "modern-gin",
      "name": "现代金酒",
      "category": "金酒",
      "parentId": "gin",
      "brand": "",
      "aliases": [],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "rum",
      "name": "朗姆酒",
      "category": "酒柜分类",
      "parentId": "",
      "brand": "",
      "aliases": [
        "Rum"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "light-rum",
      "name": "白朗姆",
      "category": "朗姆酒",
      "parentId": "rum",
      "brand": "",
      "aliases": [
        "White Rum"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "dark-rum",
      "name": "黑朗姆",
      "category": "朗姆酒",
      "parentId": "rum",
      "brand": "",
      "aliases": [
        "Dark Rum"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "gold-rum",
      "name": "金朗姆",
      "category": "朗姆酒",
      "parentId": "rum",
      "brand": "",
      "aliases": [
        "Gold Rum"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "aged-rum",
      "name": "陈年朗姆",
      "category": "朗姆酒",
      "parentId": "rum",
      "brand": "",
      "aliases": [
        "Aged Rum"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "agricole",
      "name": "农业朗姆",
      "category": "朗姆酒",
      "parentId": "rum",
      "brand": "",
      "aliases": [
        "Rhum Martinique Agricole"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "spiced-rum",
      "name": "香料朗姆",
      "category": "朗姆酒",
      "parentId": "rum",
      "brand": "",
      "aliases": [],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "overproof-rum",
      "name": "高酒精度朗姆",
      "category": "朗姆酒",
      "parentId": "rum",
      "brand": "",
      "aliases": [
        "Overproof Rum"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "tequila",
      "name": "龙舌兰",
      "category": "酒柜分类",
      "parentId": "",
      "brand": "",
      "aliases": [
        "Tequila"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "blanco-tequila",
      "name": "银龙舌兰",
      "category": "龙舌兰",
      "parentId": "tequila",
      "brand": "",
      "aliases": [],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "gold-tequila",
      "name": "金龙舌兰",
      "category": "龙舌兰",
      "parentId": "tequila",
      "brand": "",
      "aliases": [],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "reposado-tequila",
      "name": "短期陈年龙舌兰",
      "category": "龙舌兰",
      "parentId": "tequila",
      "brand": "",
      "aliases": [],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "anejo-tequila",
      "name": "长期陈年龙舌兰",
      "category": "龙舌兰",
      "parentId": "tequila",
      "brand": "",
      "aliases": [],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "vodka",
      "name": "伏特加",
      "category": "酒柜分类",
      "parentId": "",
      "brand": "",
      "aliases": [
        "Vodka"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "neutral-vodka",
      "name": "中性伏特加",
      "category": "伏特加",
      "parentId": "vodka",
      "brand": "",
      "aliases": [],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "flavored-vodka",
      "name": "风味伏特加",
      "category": "伏特加",
      "parentId": "vodka",
      "brand": "",
      "aliases": [],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "baijiu",
      "name": "中国白酒",
      "category": "伏特加",
      "parentId": "vodka",
      "brand": "",
      "aliases": [],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "soju",
      "name": "韩国烧酒",
      "category": "伏特加",
      "parentId": "vodka",
      "brand": "",
      "aliases": [],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "shochu",
      "name": "日本烧酒",
      "category": "伏特加",
      "parentId": "vodka",
      "brand": "",
      "aliases": [],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "brandy-root",
      "name": "白兰地",
      "category": "酒柜分类",
      "parentId": "",
      "brand": "",
      "aliases": [],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "brandy",
      "name": "白兰地",
      "category": "白兰地",
      "parentId": "brandy-root",
      "brand": "",
      "aliases": [
        "Brandy"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "fruit-brandy",
      "name": "其他水果白兰地",
      "category": "白兰地",
      "parentId": "brandy-root",
      "brand": "",
      "aliases": [],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "beer",
      "name": "啤酒",
      "category": "酒柜分类",
      "parentId": "",
      "brand": "",
      "aliases": [
        "Beer"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "pale-ale",
      "name": "淡色艾尔",
      "category": "啤酒",
      "parentId": "beer",
      "brand": "",
      "aliases": [
        "Pale Ale"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "ipa",
      "name": "IPA",
      "category": "啤酒",
      "parentId": "beer",
      "brand": "",
      "aliases": [
        "IPA",
        "India Pale Ale"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "stout",
      "name": "世涛",
      "category": "啤酒",
      "parentId": "beer",
      "brand": "",
      "aliases": [
        "Stout"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "porter",
      "name": "波特",
      "category": "啤酒",
      "parentId": "beer",
      "brand": "",
      "aliases": [
        "Porter"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "abbey-beer",
      "name": "修道院",
      "category": "啤酒",
      "parentId": "beer",
      "brand": "",
      "aliases": [
        "Abbey Beer"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "sour-beer",
      "name": "酸啤",
      "category": "啤酒",
      "parentId": "beer",
      "brand": "",
      "aliases": [
        "Sour Beer"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "wheat-beer",
      "name": "小麦",
      "category": "啤酒",
      "parentId": "beer",
      "brand": "",
      "aliases": [
        "Wheat Beer"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "lager",
      "name": "拉格",
      "category": "啤酒",
      "parentId": "beer",
      "brand": "",
      "aliases": [
        "Lager"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "wine",
      "name": "葡萄酒",
      "category": "酒柜分类",
      "parentId": "",
      "brand": "",
      "aliases": [
        "Wine"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "red-wine",
      "name": "红葡萄酒",
      "category": "葡萄酒",
      "parentId": "wine",
      "brand": "",
      "aliases": [
        "Red Wine"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "white-wine",
      "name": "白葡萄酒",
      "category": "葡萄酒",
      "parentId": "wine",
      "brand": "",
      "aliases": [
        "White Wine",
        "Dry White Wine"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "rose-wine",
      "name": "桃红葡萄酒",
      "category": "葡萄酒",
      "parentId": "wine",
      "brand": "",
      "aliases": [
        "Rose Wine"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "sparkling",
      "name": "起泡酒",
      "category": "葡萄酒",
      "parentId": "wine",
      "brand": "",
      "aliases": [
        "Sparkling Wine"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "champagne",
      "name": "香槟",
      "category": "葡萄酒",
      "parentId": "wine",
      "brand": "",
      "aliases": [
        "Champagne"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "prosecco",
      "name": "普罗塞克",
      "category": "葡萄酒",
      "parentId": "wine",
      "brand": "",
      "aliases": [
        "Prosecco"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "cava",
      "name": "卡瓦",
      "category": "葡萄酒",
      "parentId": "wine",
      "brand": "",
      "aliases": [
        "Cava"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "ice-wine",
      "name": "冰酒",
      "category": "葡萄酒",
      "parentId": "wine",
      "brand": "",
      "aliases": [
        "Ice Wine"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "vermouth",
      "name": "味美思",
      "category": "酒柜分类",
      "parentId": "",
      "brand": "",
      "aliases": [
        "Vermouth"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "sweet-vermouth",
      "name": "甜味美思",
      "category": "味美思",
      "parentId": "vermouth",
      "brand": "",
      "aliases": [
        "Sweet Red Vermouth",
        "Red Vermouth"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "dry-vermouth",
      "name": "干味美思",
      "category": "味美思",
      "parentId": "vermouth",
      "brand": "",
      "aliases": [
        "Dry Vermouth"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "bianco-vermouth",
      "name": "白味美思",
      "category": "味美思",
      "parentId": "vermouth",
      "brand": "",
      "aliases": [
        "Bianco Vermouth"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "port-sherry",
      "name": "波特&雪莉",
      "category": "酒柜分类",
      "parentId": "",
      "brand": "",
      "aliases": [
        "Port",
        "Sherry"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "ruby-port",
      "name": "红宝石波特酒",
      "category": "波特&雪莉",
      "parentId": "port-sherry",
      "brand": "",
      "aliases": [
        "Ruby Port"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "rose-port",
      "name": "桃红波特酒",
      "category": "波特&雪莉",
      "parentId": "port-sherry",
      "brand": "",
      "aliases": [
        "Rose Port"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "white-port",
      "name": "白波特酒",
      "category": "波特&雪莉",
      "parentId": "port-sherry",
      "brand": "",
      "aliases": [
        "White Port"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "aged-port",
      "name": "陈年波特酒",
      "category": "波特&雪莉",
      "parentId": "port-sherry",
      "brand": "",
      "aliases": [
        "Aged Port"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "tawny-port",
      "name": "茶色波特酒",
      "category": "波特&雪莉",
      "parentId": "port-sherry",
      "brand": "",
      "aliases": [
        "Tawny Port"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "fino-sherry",
      "name": "Fino 雪莉酒",
      "category": "波特&雪莉",
      "parentId": "port-sherry",
      "brand": "",
      "aliases": [
        "Fino Sherry"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "manzanilla-sherry",
      "name": "Manzanilla 雪莉酒",
      "category": "波特&雪莉",
      "parentId": "port-sherry",
      "brand": "",
      "aliases": [
        "Manzanilla Sherry"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "amontillado-sherry",
      "name": "Amontillado 雪莉酒",
      "category": "波特&雪莉",
      "parentId": "port-sherry",
      "brand": "",
      "aliases": [],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "palo-cortado-sherry",
      "name": "Palo Cortado 雪莉酒",
      "category": "波特&雪莉",
      "parentId": "port-sherry",
      "brand": "",
      "aliases": [
        "Palo Cortado Sherry"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "oloroso-sherry",
      "name": "Oloroso 雪莉酒",
      "category": "波特&雪莉",
      "parentId": "port-sherry",
      "brand": "",
      "aliases": [
        "Oloroso Sherry"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "cream-sherry",
      "name": "Cream 雪莉酒",
      "category": "波特&雪莉",
      "parentId": "port-sherry",
      "brand": "",
      "aliases": [
        "Cream Sherry"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "pedro-ximenez-sherry",
      "name": "Pedro Ximénez 雪莉酒",
      "category": "波特&雪莉",
      "parentId": "port-sherry",
      "brand": "",
      "aliases": [
        "Pedro Ximénez Sherry"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "liqueur-root",
      "name": "利口酒",
      "category": "酒柜分类",
      "parentId": "",
      "brand": "",
      "aliases": [],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "liqueur",
      "name": "利口酒",
      "category": "利口酒",
      "parentId": "liqueur-root",
      "brand": "",
      "aliases": [
        "Liqueur"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "other-alcohol",
      "name": "其他酒",
      "category": "酒柜分类",
      "parentId": "",
      "brand": "",
      "aliases": [],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "aperitif",
      "name": "开胃酒",
      "category": "其他酒",
      "parentId": "other-alcohol",
      "brand": "",
      "aliases": [
        "Aperitif"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "amaro",
      "name": "阿玛罗",
      "category": "其他酒",
      "parentId": "other-alcohol",
      "brand": "",
      "aliases": [
        "Amaro"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "bitters",
      "name": "苦精",
      "category": "其他酒",
      "parentId": "other-alcohol",
      "brand": "",
      "aliases": [
        "Bitters"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "liquid-materials",
      "name": "液体材料",
      "category": "酒柜分类",
      "parentId": "",
      "brand": "",
      "aliases": [],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "soda-root",
      "name": "气泡水",
      "category": "液体材料",
      "parentId": "liquid-materials",
      "brand": "",
      "aliases": [
        "Soda Water"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "syrup",
      "name": "糖浆",
      "category": "液体材料",
      "parentId": "liquid-materials",
      "brand": "",
      "aliases": [
        "Syrup"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "juice",
      "name": "果汁",
      "category": "液体材料",
      "parentId": "liquid-materials",
      "brand": "",
      "aliases": [
        "Juice"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "other-liquid",
      "name": "其他液体材料",
      "category": "液体材料",
      "parentId": "liquid-materials",
      "brand": "",
      "aliases": [],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "solid-materials",
      "name": "固体材料",
      "category": "酒柜分类",
      "parentId": "",
      "brand": "",
      "aliases": [],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "fruit-vegetable",
      "name": "水果&蔬菜",
      "category": "固体材料",
      "parentId": "solid-materials",
      "brand": "",
      "aliases": [],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "seasoning",
      "name": "调料",
      "category": "固体材料",
      "parentId": "solid-materials",
      "brand": "",
      "aliases": [
        "Seasoning"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "other-food",
      "name": "其他食品",
      "category": "固体材料",
      "parentId": "solid-materials",
      "brand": "",
      "aliases": [],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    }
  ],
  "menuTags": [
    {"id": "cuban-rum", "name": "古巴朗姆", "parentId": "rum", "aliases": ["Cuban Rum"]},
    {"id": "jamaican-rum", "name": "牙买加朗姆", "parentId": "rum", "aliases": ["Jamaican Rum"]},
    {"id": "demerara-rum", "name": "德梅拉拉朗姆", "parentId": "rum", "aliases": ["Demerara Rum"]},
    {"id": "martinique-rum", "name": "马提尼克朗姆", "parentId": "rum", "aliases": []},
    {"id": "puerto-rico-rum", "name": "波多黎各朗姆", "parentId": "rum", "aliases": ["Puerto Rican Rum"]},
    {"id": "cachaca", "name": "卡莎萨朗姆", "parentId": "rum", "aliases": ["Cachaca", "Cachaça"]},
    {"id": "cognac", "name": "干邑", "parentId": "brandy-root", "aliases": ["Cognac"]},
    {"id": "pisco", "name": "皮斯科", "parentId": "brandy-root", "aliases": ["Pisco"]},
    {"id": "soda", "name": "苏打水", "parentId": "soda-root", "aliases": ["Soda"]},
    {"id": "tonic", "name": "汤力水", "parentId": "soda-root", "aliases": ["Tonic"]}
  ],
  "menus": [
    [
      "whiskey",
      [
        "bourbon",
        "rye",
        "scotch",
        "blended-scotch",
        "islay",
        "canadian-whiskey",
        "irish-whiskey",
        "japanese-whiskey"
      ],
      []
    ],
    [
      "gin",
      [
        "london-dry",
        "plymouth-gin",
        "navy-strength-gin",
        "old-tom",
        "modern-gin"
      ],
      []
    ],
    [
      "rum",
      [
        "light-rum",
        "dark-rum",
        "gold-rum",
        "aged-rum",
        "agricole",
        "spiced-rum",
        "overproof-rum"
      ],
      [
        "cuban-rum",
        "jamaican-rum",
        "demerara-rum",
        "martinique-rum",
        "puerto-rico-rum",
        "cachaca"
      ]
    ],
    [
      "tequila",
      [
        "blanco-tequila",
        "gold-tequila",
        "reposado-tequila",
        "anejo-tequila"
      ],
      []
    ],
    [
      "vodka",
      [
        "neutral-vodka",
        "flavored-vodka",
        "baijiu",
        "soju",
        "shochu"
      ],
      []
    ],
    [
      "brandy-root",
      [
        "brandy",
        "fruit-brandy"
      ],
      [
        "cognac",
        "pisco"
      ]
    ],
    [
      "beer",
      [
        "pale-ale",
        "ipa",
        "stout",
        "porter",
        "abbey-beer",
        "sour-beer",
        "wheat-beer",
        "lager"
      ],
      []
    ],
    [
      "wine",
      [
        "red-wine",
        "white-wine",
        "rose-wine",
        "sparkling",
        "champagne",
        "prosecco",
        "cava",
        "ice-wine"
      ],
      []
    ],
    [
      "vermouth",
      [
        "sweet-vermouth",
        "dry-vermouth",
        "bianco-vermouth"
      ],
      []
    ],
    [
      "port-sherry",
      [
        "ruby-port",
        "rose-port",
        "white-port",
        "aged-port",
        "tawny-port",
        "fino-sherry",
        "manzanilla-sherry",
        "amontillado-sherry",
        "palo-cortado-sherry",
        "oloroso-sherry",
        "cream-sherry",
        "pedro-ximenez-sherry"
      ],
      []
    ],
    [
      "liqueur-root",
      [
        "liqueur"
      ],
      []
    ],
    [
      "other-alcohol",
      [
        "aperitif",
        "amaro",
        "bitters"
      ],
      []
    ],
    [
      "liquid-materials",
      [
        "soda-root",
        "syrup",
        "juice",
        "other-liquid"
      ],
      []
    ],
    [
      "solid-materials",
      [
        "fruit-vegetable",
        "seasoning",
        "other-food"
      ],
      []
    ]
  ],
  "recipe": {
    "tags": [
      "咖啡",
      "咸鲜",
      "果味",
      "柑橘",
      "气泡",
      "清爽",
      "热带",
      "苦甜",
      "辛辣",
      "酸甜",
      "醇厚"
    ],
    "glasses": [
      "鸡尾酒杯",
      "古典杯",
      "高球杯",
      "柯林杯",
      "飓风杯",
      "马天尼杯",
      "玛格丽特杯",
      "碟形杯",
      "铜杯",
      "提基杯",
      "爱尔兰咖啡杯",
      "葡萄酒杯",
      "香槟杯",
      "子弹杯",
      "啤酒杯",
      "白兰地杯"
    ],
    "sources": [
      "IBA · 难忘经典",
      "IBA · 当代经典",
      "IBA · 新时代"
    ]
  }
};

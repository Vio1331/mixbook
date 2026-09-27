/*
 * 全站唯一的内置目录与内置标签。
 * ingredients 只包含固定的一级菜单、二级菜单和内置标签；具体原料由 data/ingredient-details.json 维护。
 * menus 的每项依次为：一级菜单 ID、二级菜单 ID、直接属于一级菜单的标签 ID。
 * menuTags 的 parentId 可以指向一级或二级菜单；一级菜单标签自动适用于其全部二级菜单。
 * 已上线 ID 不得随意更改。新增或调整内置目录时，同时运行 npm test 验证全部 IBA 配方。
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
    },
    {
      "id": "fruit-brandy",
      "name": "水果白兰地",
      "category": "白兰地",
      "parentId": "brandy-root",
      "brand": "",
      "aliases": [],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
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
      "customized": false,
      "builtIn": true
    },
    {
      "id": "cuban-rum",
      "name": "古巴朗姆",
      "category": "朗姆酒",
      "parentId": "rum",
      "brand": "",
      "aliases": [
        "Cuban Rum"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false,
      "builtInTag": true,
      "builtIn": true
    },
    {
      "id": "jamaican-rum",
      "name": "牙买加朗姆",
      "category": "朗姆酒",
      "parentId": "rum",
      "brand": "",
      "aliases": [
        "Jamaican Rum"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false,
      "builtInTag": true,
      "builtIn": true
    },
    {
      "id": "demerara-rum",
      "name": "德梅拉拉朗姆",
      "category": "朗姆酒",
      "parentId": "rum",
      "brand": "",
      "aliases": [
        "Demerara Rum"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false,
      "builtInTag": true,
      "builtIn": true
    },
    {
      "id": "martinique-rum",
      "name": "马提尼克朗姆",
      "category": "朗姆酒",
      "parentId": "rum",
      "brand": "",
      "aliases": [],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false,
      "builtInTag": true,
      "builtIn": true
    },
    {
      "id": "puerto-rico-rum",
      "name": "波多黎各朗姆",
      "category": "朗姆酒",
      "parentId": "rum",
      "brand": "",
      "aliases": [
        "Puerto Rican Rum"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false,
      "builtInTag": true,
      "builtIn": true
    },
    {
      "id": "cachaca",
      "name": "卡莎萨朗姆",
      "category": "朗姆酒",
      "parentId": "rum",
      "brand": "",
      "aliases": [
        "Cachaca",
        "Cachaça"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false,
      "builtInTag": true,
      "builtIn": true
    },
    {
      "id": "cognac",
      "name": "干邑",
      "category": "白兰地",
      "parentId": "brandy",
      "brand": "",
      "aliases": [
        "Cognac"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false,
      "builtInTag": true,
      "builtIn": true
    },
    {
      "id": "pisco",
      "name": "皮斯科",
      "category": "白兰地",
      "parentId": "brandy",
      "brand": "",
      "aliases": [
        "Pisco"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false,
      "builtInTag": true,
      "builtIn": true
    },
    {
      "id": "absinthe",
      "name": "苦艾酒",
      "category": "利口酒",
      "parentId": "liqueur",
      "brand": "",
      "aliases": [
        "Absinthe"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false,
      "builtInTag": true,
      "builtIn": true
    },
    {
      "id": "cacao-liqueur",
      "name": "可可利口酒",
      "category": "利口酒",
      "parentId": "liqueur",
      "brand": "",
      "aliases": [
        "Cacao Liqueur"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false,
      "builtInTag": true,
      "builtIn": true
    },
    {
      "id": "coffee-liqueur",
      "name": "咖啡利口酒",
      "category": "利口酒",
      "parentId": "liqueur",
      "brand": "",
      "aliases": [
        "Coffee Liqueur"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false,
      "builtInTag": true,
      "builtIn": true
    },
    {
      "id": "cream-liqueur",
      "name": "奶油利口酒",
      "category": "利口酒",
      "parentId": "liqueur",
      "brand": "",
      "aliases": [
        "Cream Liqueur"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false,
      "builtInTag": true,
      "builtIn": true
    },
    {
      "id": "orange-liqueur",
      "name": "橙味利口酒",
      "category": "利口酒",
      "parentId": "liqueur",
      "brand": "",
      "aliases": [
        "Orange Liqueur"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false,
      "builtInTag": true,
      "builtIn": true
    },
    {
      "id": "cherry-liqueur",
      "name": "樱桃利口酒",
      "category": "利口酒",
      "parentId": "liqueur",
      "brand": "",
      "aliases": [
        "Cherry Liqueur"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false,
      "builtInTag": true,
      "builtIn": true
    },
        {
      "id": "maraschino",
      "name": "马拉斯奇诺樱桃利口酒",
      "category": "利口酒",
      "parentId": "liqueur",
      "brand": "",
      "aliases": [
        "Maraschino"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false,
      "builtInTag": true,
      "builtIn": true
    },
    {
      "id": "passion-liqueur",
      "name": "百香果利口酒",
      "category": "利口酒",
      "parentId": "liqueur",
      "brand": "",
      "aliases": [
        "Passion Fruit Liqueur"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false,
      "builtInTag": true,
      "builtIn": true
    },
    {
      "id": "herbal-liqueur",
      "name": "草本利口酒",
      "category": "利口酒",
      "parentId": "liqueur",
      "brand": "",
      "aliases": [
        "Herbal Liqueur"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false,
      "builtInTag": true,
      "builtIn": true
    },
    {
      "id": "pear-liqueur",
      "name": "梨子利口酒",
      "category": "利口酒",
      "parentId": "liqueur",
      "brand": "",
      "aliases": [
        "Pear Liqueur"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false,
      "builtInTag": true,
      "builtIn": true
    },
    {
      "id": "honey-liqueur",
      "name": "蜂蜜利口酒",
      "category": "利口酒",
      "parentId": "liqueur",
      "brand": "",
      "aliases": [
        "Honey Liqueur"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false,
      "builtInTag": true,
      "builtIn": true
    },
    {
      "id": "mint-liqueur",
      "name": "薄荷利口酒",
      "category": "利口酒",
      "parentId": "liqueur",
      "brand": "",
      "aliases": [
        "Mint Liqueur"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false,
      "builtInTag": true,
      "builtIn": true
    },
    {
      "id": "mure",
      "name": "黑莓利口酒",
      "category": "利口酒",
      "parentId": "liqueur",
      "brand": "",
      "aliases": [
        "Crème de Mûre"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false,
      "builtInTag": true,
      "builtIn": true
    },
    {
      "id": "banana-liqueur",
      "name": "香蕉利口酒",
      "category": "利口酒",
      "parentId": "liqueur",
      "brand": "",
      "aliases": [
        "Banana Liqueur"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false,
      "builtInTag": true,
      "builtIn": true
    },
    {
      "id": "violette",
      "name": "紫罗兰利口酒",
      "category": "利口酒",
      "parentId": "liqueur",
      "brand": "",
      "aliases": [
        "Crème de Violette"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false,
      "builtInTag": true,
      "builtIn": true
    },
    {
      "id": "grapefruit-liqueur",
      "name": "西柚利口酒",
      "category": "利口酒",
      "parentId": "liqueur",
      "brand": "",
      "aliases": [
        "Grapefruit Liqueur"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false,
      "builtInTag": true,
      "builtIn": true
    },
    {
      "id": "peach-liqueur",
      "name": "桃子利口酒",
      "category": "利口酒",
      "parentId": "liqueur",
      "brand": "",
      "aliases": [
        "Peach Liqueur"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false,
      "builtInTag": true,
      "builtIn": true
    },
    {
      "id": "amaretto",
      "name": "杏仁利口酒",
      "category": "利口酒",
      "parentId": "liqueur",
      "brand": "",
      "aliases": [
        "Amaretto"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false,
      "builtInTag": true,
      "builtIn": true
    },
    {
      "id": "soda",
      "name": "苏打水",
      "category": "气泡水",
      "parentId": "soda-root",
      "brand": "",
      "aliases": [
        "Soda Water"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false,
      "builtInTag": true,
      "builtIn": true
    },
    {
      "id": "tonic",
      "name": "汤力水",
      "category": "气泡水",
      "parentId": "soda-root",
      "brand": "",
      "aliases": [
        "Tonic Water"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false,
      "builtInTag": true,
      "builtIn": true
    }
  ],
  "menuTags": [
    {
      "id": "cuban-rum",
      "name": "古巴朗姆",
      "parentId": "rum",
      "aliases": [
        "Cuban Rum"
      ]
    },
    {
      "id": "jamaican-rum",
      "name": "牙买加朗姆",
      "parentId": "rum",
      "aliases": [
        "Jamaican Rum"
      ]
    },
    {
      "id": "demerara-rum",
      "name": "德梅拉拉朗姆",
      "parentId": "rum",
      "aliases": [
        "Demerara Rum"
      ]
    },
    {
      "id": "martinique-rum",
      "name": "马提尼克朗姆",
      "parentId": "rum",
      "aliases": []
    },
    {
      "id": "puerto-rico-rum",
      "name": "波多黎各朗姆",
      "parentId": "rum",
      "aliases": [
        "Puerto Rican Rum"
      ]
    },
    {
      "id": "cachaca",
      "name": "卡莎萨朗姆",
      "parentId": "rum",
      "aliases": [
        "Cachaca",
        "Cachaça"
      ]
    },
    {
      "id": "cognac",
      "name": "干邑",
      "parentId": "brandy",
      "aliases": [
        "Cognac"
      ]
    },
    {
      "id": "pisco",
      "name": "皮斯科",
      "parentId": "brandy",
      "aliases": [
        "Pisco"
      ]
    },
    {
      "id": "absinthe",
      "name": "苦艾酒",
      "parentId": "liqueur",
      "aliases": [
        "Absinthe"
      ]
    },
    {
      "id": "cacao-liqueur",
      "name": "可可利口酒",
      "parentId": "liqueur",
      "aliases": [
        "Cacao Liqueur"
      ]
    },
    {
      "id": "coffee-liqueur",
      "name": "咖啡利口酒",
      "parentId": "liqueur",
      "aliases": [
        "Coffee Liqueur"
      ]
    },
    {
      "id": "cream-liqueur",
      "name": "奶油利口酒",
      "parentId": "liqueur",
      "aliases": [
        "Cream Liqueur"
      ]
    },
    {
      "id": "orange-liqueur",
      "name": "橙味利口酒",
      "parentId": "liqueur",
      "aliases": [
        "Orange Liqueur"
      ]
    },
    {
      "id": "cherry-liqueur",
      "name": "樱桃利口酒",
      "parentId": "liqueur",
      "aliases": [
        "Cherry Liqueur"
      ]
    },
    {
      "id": "passion-liqueur",
      "name": "百香果利口酒",
      "parentId": "liqueur",
      "aliases": [
        "Passion Fruit Liqueur"
      ]
    },
    {
      "id": "herbal-liqueur",
      "name": "草本利口酒",
      "parentId": "liqueur",
      "aliases": [
        "Herbal Liqueur"
      ]
    },
    {
      "id": "pear-liqueur",
      "name": "梨子利口酒",
      "parentId": "liqueur",
      "aliases": [
        "Pear Liqueur"
      ]
    },
    {
      "id": "honey-liqueur",
      "name": "蜂蜜利口酒",
      "parentId": "liqueur",
      "aliases": [
        "Honey Liqueur"
      ]
    },
    {
      "id": "mint-liqueur",
      "name": "薄荷利口酒",
      "parentId": "liqueur",
      "aliases": [
        "Mint Liqueur"
      ]
    },
    {
      "id": "mure",
      "name": "黑莓利口酒",
      "parentId": "liqueur",
      "aliases": [
        "Crème de Mûre"
      ]
    },
    {
      "id": "banana-liqueur",
      "name": "香蕉利口酒",
      "parentId": "liqueur",
      "aliases": [
        "Banana Liqueur"
      ]
    },
    {
      "id": "violette",
      "name": "紫罗兰利口酒",
      "parentId": "liqueur",
      "aliases": [
        "Crème de Violette"
      ]
    },
    {
      "id": "grapefruit-liqueur",
      "name": "西柚利口酒",
      "parentId": "liqueur",
      "aliases": [
        "Grapefruit Liqueur"
      ]
    },
    {
      "id": "peach-liqueur",
      "name": "桃子利口酒",
      "parentId": "liqueur",
      "aliases": [
        "Peach Liqueur"
      ]
    },
    {
      "id": "amaretto",
      "name": "杏仁利口酒",
      "parentId": "liqueur",
      "aliases": [
        "Amaretto"
      ]
    },
    {
      "id": "soda",
      "name": "苏打水",
      "parentId": "soda-root",
      "aliases": [
        "Soda Water"
      ]
    },
    {
      "id": "tonic",
      "name": "汤力水",
      "parentId": "soda-root",
      "aliases": [
        "Tonic Water"
      ]
    }
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
      []
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

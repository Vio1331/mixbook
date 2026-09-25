/*
 * 全站鸡尾酒体系（唯一维护入口）
 *
 * 保存本文件并刷新网站后，原料类别、标签、层级菜单、配方风味标签、
 * 杯型与来源会同步更新。ingredients 中 parentId 表示父级；kind 为 type
 * 表示类别/标签、product 表示具体产品；menus 控制所有两栏原料菜单的
 * 左栏分组及右栏条目，第三组数组为该分组可选标签。ID 被配方引用，
 * 已上线条目请尽量保留 ID，只修改 name；新增条目时 ID 必须全局唯一。
 */
window.MIX_TAXONOMY = {
  "ingredients": [
    {
      "id": "alcohol",
      "name": "酒精成分",
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
      "id": "whiskey",
      "name": "威士忌",
      "category": "酒精成分",
      "parentId": "alcohol",
      "brand": "",
      "aliases": [
        "Whiskey Whisky"
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
      "category": "酒精成分",
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
      "category": "酒精成分",
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
      "category": "酒精成分",
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
      "category": "酒精成分",
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
      "category": "酒精成分",
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
      "category": "酒精成分",
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
      "category": "酒精成分",
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
      "category": "酒精成分",
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
      "category": "酒精成分",
      "parentId": "alcohol",
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
      "category": "酒精成分",
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
      "category": "酒精成分",
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
      "category": "酒精成分",
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
      "category": "酒精成分",
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
      "category": "酒精成分",
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
      "id": "rum-all",
      "name": "朗姆酒",
      "category": "酒精成分",
      "parentId": "alcohol",
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
      "id": "rum",
      "name": "白朗姆",
      "category": "酒精成分",
      "parentId": "rum-all",
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
      "category": "酒精成分",
      "parentId": "rum-all",
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
      "category": "酒精成分",
      "parentId": "rum-all",
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
      "category": "酒精成分",
      "parentId": "rum-all",
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
      "category": "酒精成分",
      "parentId": "rum-all",
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
      "category": "酒精成分",
      "parentId": "rum-all",
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
      "category": "酒精成分",
      "parentId": "rum-all",
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
      "id": "cuban-rum",
      "name": "古巴朗姆",
      "category": "酒精成分",
      "parentId": "rum-all",
      "brand": "",
      "aliases": [
        "Cuban Rum"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "jamaican-rum",
      "name": "牙买加朗姆",
      "category": "酒精成分",
      "parentId": "rum-all",
      "brand": "",
      "aliases": [
        "Jamaican Rum"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "demerara-rum",
      "name": "德梅拉拉朗姆",
      "category": "酒精成分",
      "parentId": "rum-all",
      "brand": "",
      "aliases": [
        "Demerara Rum"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "martinique-rum",
      "name": "马提尼克朗姆",
      "category": "酒精成分",
      "parentId": "rum-all",
      "brand": "",
      "aliases": [],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "puerto-rico-rum",
      "name": "波多黎各朗姆",
      "category": "酒精成分",
      "parentId": "rum-all",
      "brand": "",
      "aliases": [
        "Puerto Rican Rum"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "cachaca",
      "name": "卡莎萨朗姆",
      "category": "酒精成分",
      "parentId": "rum-all",
      "brand": "",
      "aliases": [
        "Cachaca Cachaça"
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
      "category": "酒精成分",
      "parentId": "alcohol",
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
      "category": "酒精成分",
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
      "category": "酒精成分",
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
      "category": "酒精成分",
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
      "category": "酒精成分",
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
      "category": "酒精成分",
      "parentId": "alcohol",
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
      "category": "酒精成分",
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
      "category": "酒精成分",
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
      "category": "酒精成分",
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
      "category": "酒精成分",
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
      "category": "酒精成分",
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
      "id": "brandy",
      "name": "白兰地",
      "category": "酒精成分",
      "parentId": "alcohol",
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
      "category": "酒精成分",
      "parentId": "brandy",
      "brand": "",
      "aliases": [],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "cognac",
      "name": "干邑",
      "category": "酒精成分",
      "parentId": "brandy",
      "brand": "",
      "aliases": [
        "Cognac"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "pisco",
      "name": "皮斯科",
      "category": "酒精成分",
      "parentId": "brandy",
      "brand": "",
      "aliases": [
        "Pisco"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "beer",
      "name": "啤酒",
      "category": "酒精成分",
      "parentId": "alcohol",
      "brand": "",
      "aliases": [],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "pale-ale",
      "name": "淡色艾尔",
      "category": "酒精成分",
      "parentId": "beer",
      "brand": "",
      "aliases": [],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "ipa",
      "name": "IPA",
      "category": "酒精成分",
      "parentId": "beer",
      "brand": "",
      "aliases": [],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "stout",
      "name": "世涛",
      "category": "酒精成分",
      "parentId": "beer",
      "brand": "",
      "aliases": [],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "porter",
      "name": "波特",
      "category": "酒精成分",
      "parentId": "beer",
      "brand": "",
      "aliases": [],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "abbey-beer",
      "name": "修道院",
      "category": "酒精成分",
      "parentId": "beer",
      "brand": "",
      "aliases": [],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "sour-beer",
      "name": "酸啤",
      "category": "酒精成分",
      "parentId": "beer",
      "brand": "",
      "aliases": [],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "wheat-beer",
      "name": "小麦",
      "category": "酒精成分",
      "parentId": "beer",
      "brand": "",
      "aliases": [],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "lager",
      "name": "拉格",
      "category": "酒精成分",
      "parentId": "beer",
      "brand": "",
      "aliases": [],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "wine",
      "name": "葡萄酒",
      "category": "酒精成分",
      "parentId": "alcohol",
      "brand": "",
      "aliases": [],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "red-wine",
      "name": "红葡萄酒",
      "category": "酒精成分",
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
      "category": "酒精成分",
      "parentId": "wine",
      "brand": "",
      "aliases": [
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
      "category": "酒精成分",
      "parentId": "wine",
      "brand": "",
      "aliases": [],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "sparkling",
      "name": "起泡酒",
      "category": "酒精成分",
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
      "category": "酒精成分",
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
      "category": "酒精成分",
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
      "category": "酒精成分",
      "parentId": "wine",
      "brand": "",
      "aliases": [],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "ice-wine",
      "name": "冰酒",
      "category": "酒精成分",
      "parentId": "wine",
      "brand": "",
      "aliases": [],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "vermouth-root",
      "name": "味美思",
      "category": "酒精成分",
      "parentId": "alcohol",
      "brand": "",
      "aliases": [],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "vermouth",
      "name": "甜味美思",
      "category": "酒精成分",
      "parentId": "vermouth-root",
      "brand": "",
      "aliases": [
        "Sweet Red Vermouth",
        "甜红味美思",
        "甜味美思",
        "红威末酒"
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
      "category": "酒精成分",
      "parentId": "vermouth-root",
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
      "category": "酒精成分",
      "parentId": "vermouth-root",
      "brand": "",
      "aliases": [],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "port-sherry",
      "name": "波特&雪莉",
      "category": "酒精成分",
      "parentId": "alcohol",
      "brand": "",
      "aliases": [],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "ruby-port",
      "name": "红宝石波特酒",
      "category": "酒精成分",
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
      "id": "rose-port",
      "name": "桃红波特酒",
      "category": "酒精成分",
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
      "id": "white-port",
      "name": "白波特酒",
      "category": "酒精成分",
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
      "id": "aged-port",
      "name": "陈年波特酒",
      "category": "酒精成分",
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
      "id": "tawny-port",
      "name": "茶色波特酒",
      "category": "酒精成分",
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
      "category": "酒精成分",
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
      "id": "manzanilla-sherry",
      "name": "Manzanilla 雪莉酒",
      "category": "酒精成分",
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
      "id": "amontillado-sherry",
      "name": "Amontillado 雪莉酒",
      "category": "酒精成分",
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
      "category": "酒精成分",
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
      "id": "oloroso-sherry",
      "name": "Oloroso 雪莉酒",
      "category": "酒精成分",
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
      "id": "cream-sherry",
      "name": "Cream 雪莉酒",
      "category": "酒精成分",
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
      "id": "pedro-ximenez-sherry",
      "name": "Pedro Ximénez 雪莉酒",
      "category": "酒精成分",
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
      "id": "liqueur",
      "name": "利口酒",
      "category": "酒精成分",
      "parentId": "alcohol",
      "brand": "",
      "aliases": [],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "absinthe",
      "name": "苦艾酒",
      "category": "酒精成分",
      "parentId": "liqueur",
      "brand": "",
      "aliases": [
        "Absinthe"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "cacao-liqueur",
      "name": "可可利口酒",
      "category": "酒精成分",
      "parentId": "liqueur",
      "brand": "",
      "aliases": [],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "coffee-liqueur",
      "name": "咖啡利口酒",
      "category": "酒精成分",
      "parentId": "liqueur",
      "brand": "",
      "aliases": [
        "Coffee Liqueur"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "cream-liqueur",
      "name": "奶油利口酒",
      "category": "酒精成分",
      "parentId": "liqueur",
      "brand": "",
      "aliases": [],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "orange-liqueur",
      "name": "橙味利口酒",
      "category": "酒精成分",
      "parentId": "liqueur",
      "brand": "",
      "aliases": [
        "Orange Liqueur",
        "橙味利口酒（大类）",
        "橙酒"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "cherry-liqueur",
      "name": "樱桃利口酒",
      "category": "酒精成分",
      "parentId": "liqueur",
      "brand": "",
      "aliases": [
        "Cherry Brandy"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "passion-liqueur",
      "name": "百香果利口酒",
      "category": "酒精成分",
      "parentId": "liqueur",
      "brand": "",
      "aliases": [
        "Passion Fruit Liqueur"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "herbal-liqueur",
      "name": "草本利口酒",
      "category": "酒精成分",
      "parentId": "liqueur",
      "brand": "",
      "aliases": [
        "Herbal Liqueur"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "pear-liqueur",
      "name": "梨子利口酒",
      "category": "酒精成分",
      "parentId": "liqueur",
      "brand": "",
      "aliases": [],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "honey-liqueur",
      "name": "蜂蜜利口酒",
      "category": "酒精成分",
      "parentId": "liqueur",
      "brand": "",
      "aliases": [],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "mint-liqueur",
      "name": "薄荷利口酒",
      "category": "酒精成分",
      "parentId": "liqueur",
      "brand": "",
      "aliases": [],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "mure",
      "name": "黑莓利口酒",
      "category": "酒精成分",
      "parentId": "liqueur",
      "brand": "",
      "aliases": [
        "Crème de Mûre"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "banana-liqueur",
      "name": "香蕉利口酒",
      "category": "酒精成分",
      "parentId": "liqueur",
      "brand": "",
      "aliases": [],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "violette",
      "name": "紫罗兰利口酒",
      "category": "酒精成分",
      "parentId": "liqueur",
      "brand": "",
      "aliases": [
        "Crème de Violette"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "grapefruit-liqueur",
      "name": "西柚利口酒",
      "category": "酒精成分",
      "parentId": "liqueur",
      "brand": "",
      "aliases": [],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "peach-liqueur",
      "name": "桃子利口酒",
      "category": "酒精成分",
      "parentId": "liqueur",
      "brand": "",
      "aliases": [],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "amaretto",
      "name": "杏仁利口酒",
      "category": "酒精成分",
      "parentId": "liqueur",
      "brand": "",
      "aliases": [
        "Amaretto"
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
      "category": "酒精成分",
      "parentId": "alcohol",
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
      "category": "酒精成分",
      "parentId": "other-alcohol",
      "brand": "",
      "aliases": [],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "amaro",
      "name": "阿玛罗",
      "category": "酒精成分",
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
      "category": "酒精成分",
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
      "id": "non-alcohol",
      "name": "非酒精成分",
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
      "category": "非酒精成分",
      "parentId": "non-alcohol",
      "brand": "",
      "aliases": [],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "soda",
      "name": "苏打水",
      "category": "非酒精成分",
      "parentId": "soda-root",
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
      "id": "tonic",
      "name": "汤力水",
      "category": "非酒精成分",
      "parentId": "soda-root",
      "brand": "",
      "aliases": [
        "Tonic Water"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "other-soda",
      "name": "其他气泡水",
      "category": "非酒精成分",
      "parentId": "soda-root",
      "brand": "",
      "aliases": [],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "other-materials",
      "name": "其他材料",
      "category": "非酒精成分",
      "parentId": "non-alcohol",
      "brand": "",
      "aliases": [],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "syrup-root",
      "name": "糖浆",
      "category": "非酒精成分",
      "parentId": "other-materials",
      "brand": "",
      "aliases": [],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "juice-root",
      "name": "果汁",
      "category": "非酒精成分",
      "parentId": "other-materials",
      "brand": "",
      "aliases": [],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "produce-root",
      "name": "水果&蔬菜",
      "category": "非酒精成分",
      "parentId": "other-materials",
      "brand": "",
      "aliases": [],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "seasoning-root",
      "name": "调料",
      "category": "非酒精成分",
      "parentId": "other-materials",
      "brand": "",
      "aliases": [],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "other-food",
      "name": "其他食品",
      "category": "非酒精成分",
      "parentId": "other-materials",
      "brand": "",
      "aliases": [],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "dry-gin",
      "name": "干金酒",
      "category": "酒精成分",
      "parentId": "gin",
      "brand": "",
      "aliases": [
        "Dry Gin",
        "干型金酒"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "sloe-gin",
      "name": "黑刺李金酒",
      "category": "酒精成分",
      "parentId": "gin",
      "brand": "",
      "aliases": [
        "Sloe Gin",
        "黑刺李利口酒"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": false,
      "customized": false
    },
    {
      "id": "beefeater",
      "name": "必富达伦敦干金酒",
      "category": "酒精成分",
      "parentId": "london-dry",
      "brand": "Beefeater",
      "aliases": [
        "Beefeater London Dry Gin"
      ],
      "kind": "product",
      "image": "",
      "tags": [
        "london-dry"
      ],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "monkey47-dry",
      "name": "猴王 47 黑森林干金酒",
      "category": "酒精成分",
      "parentId": "dry-gin",
      "brand": "Monkey 47",
      "aliases": [
        "Monkey 47 Schwarzwald Dry Gin",
        "猴王47干金酒",
        "黑森林干金酒"
      ],
      "kind": "product",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "monkey47-sloe",
      "name": "猴王 47 黑刺李金酒",
      "category": "酒精成分",
      "parentId": "sloe-gin",
      "brand": "Monkey 47",
      "aliases": [
        "Monkey 47 Schwarzwald Sloe Gin",
        "猴王47黑刺李"
      ],
      "kind": "product",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "cuban-white",
      "name": "古巴白朗姆",
      "category": "酒精成分",
      "parentId": "rum",
      "brand": "",
      "aliases": [
        "White Cuban Ron"
      ],
      "kind": "type",
      "image": "",
      "tags": [
        "cuban-rum",
        "rum"
      ],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "jamaican-gold",
      "name": "牙买加金朗姆",
      "category": "酒精成分",
      "parentId": "jamaican-rum",
      "brand": "",
      "aliases": [
        "Gold Jamaican Rum"
      ],
      "kind": "type",
      "image": "",
      "tags": [
        "jamaican-rum",
        "gold-rum"
      ],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "jamaican-dark",
      "name": "牙买加深色朗姆",
      "category": "酒精成分",
      "parentId": "jamaican-rum",
      "brand": "",
      "aliases": [
        "Jamaican Dark Rum"
      ],
      "kind": "type",
      "image": "",
      "tags": [
        "jamaican-rum",
        "dark-rum"
      ],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "jamaican-overproof",
      "name": "牙买加高酒精度白朗姆",
      "category": "酒精成分",
      "parentId": "rum",
      "brand": "",
      "aliases": [
        "Jamaica Overproof White Rum"
      ],
      "kind": "type",
      "image": "",
      "tags": [
        "jamaican-rum",
        "rum",
        "overproof-rum"
      ],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "havana-7",
      "name": "哈瓦那俱乐部 7 年",
      "category": "酒精成分",
      "parentId": "dark-rum",
      "brand": "Havana Club",
      "aliases": [
        "Havana Club 7 Años",
        "哈瓦那7年",
        "哈瓦那俱乐部7年黑朗姆"
      ],
      "kind": "product",
      "image": "",
      "tags": [
        "dark-rum"
      ],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "blackstrap-rum",
      "name": "黑糖蜜朗姆",
      "category": "酒精成分",
      "parentId": "rum-all",
      "brand": "",
      "aliases": [
        "Blackstrap Rum"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "martinique-molasses",
      "name": "马提尼克糖蜜朗姆",
      "category": "酒精成分",
      "parentId": "rum-all",
      "brand": "",
      "aliases": [
        "Martinique Molasses Rhum"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "puerto-rico-gold",
      "name": "波多黎各金朗姆",
      "category": "酒精成分",
      "parentId": "rum-all",
      "brand": "",
      "aliases": [
        "Gold Puerto Rican Rum"
      ],
      "kind": "type",
      "image": "",
      "tags": [
        "puerto-rico-rum",
        "gold-rum"
      ],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "goslings",
      "name": "高斯林黑朗姆",
      "category": "酒精成分",
      "parentId": "rum-all",
      "brand": "Goslings",
      "aliases": [
        "Goslings Rum"
      ],
      "kind": "product",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "havana-profundo",
      "name": "哈瓦那俱乐部 Profundo",
      "category": "酒精成分",
      "parentId": "rum-all",
      "brand": "Havana Club",
      "aliases": [
        "Ron Profundo Havana Club"
      ],
      "kind": "product",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "havana-smoky",
      "name": "哈瓦那俱乐部 Smoky",
      "category": "酒精成分",
      "parentId": "rum-all",
      "brand": "Havana Club",
      "aliases": [
        "Ron Smoky Havana Club"
      ],
      "kind": "product",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "citron-vodka",
      "name": "柑橘伏特加",
      "category": "酒精成分",
      "parentId": "vodka",
      "brand": "",
      "aliases": [
        "Vodka Citron"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "vanilla-vodka",
      "name": "香草伏特加",
      "category": "酒精成分",
      "parentId": "vodka",
      "brand": "",
      "aliases": [
        "Vanilla Vodka"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "smirnoff",
      "name": "斯米诺伏特加",
      "category": "酒精成分",
      "parentId": "vodka",
      "brand": "Smirnoff",
      "aliases": [
        "Smirnoff Vodka"
      ],
      "kind": "product",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "lagavulin-16",
      "name": "乐加维林 16 年",
      "category": "酒精成分",
      "parentId": "islay",
      "brand": "Lagavulin",
      "aliases": [
        "Lagavulin 16y"
      ],
      "kind": "product",
      "image": "",
      "tags": [
        "islay",
        "scotch"
      ],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "laphroaig-10",
      "name": "拉弗格 10 年",
      "category": "酒精成分",
      "parentId": "islay",
      "brand": "Laphroaig",
      "aliases": [
        "Laphroaig 10 Year Old",
        "拉弗格10年",
        "拉弗格十年"
      ],
      "kind": "product",
      "image": "",
      "tags": [
        "islay",
        "scotch"
      ],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "ardbeg-10",
      "name": "阿贝 10 年",
      "category": "酒精成分",
      "parentId": "islay",
      "brand": "Ardbeg",
      "aliases": [
        "Ardbeg Ten Years Old",
        "阿贝10年",
        "阿贝十年"
      ],
      "kind": "product",
      "image": "",
      "tags": [
        "islay",
        "scotch"
      ],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "mezcal",
      "name": "梅斯卡尔",
      "category": "酒精成分",
      "parentId": "tequila",
      "brand": "",
      "aliases": [
        "Mezcal"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "espadin",
      "name": "Espadín 梅斯卡尔",
      "category": "酒精成分",
      "parentId": "mezcal",
      "brand": "",
      "aliases": [
        "Espadin Mezcal"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "calvados",
      "name": "卡尔瓦多斯苹果白兰地",
      "category": "酒精成分",
      "parentId": "brandy",
      "brand": "",
      "aliases": [
        "Calvados"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "aguardiente",
      "name": "古巴甘蔗烈酒",
      "category": "酒精成分",
      "parentId": "rum-all",
      "brand": "",
      "aliases": [
        "Cuban Aguardiente"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "grappa",
      "name": "白格拉帕",
      "category": "酒精成分",
      "parentId": "brandy",
      "brand": "",
      "aliases": [
        "White Smooth Grappa"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "martini-rosso",
      "name": "马天尼 Rosso 甜红味美思",
      "category": "酒精成分",
      "parentId": "vermouth",
      "brand": "Martini",
      "aliases": [
        "Martini Rosso"
      ],
      "kind": "product",
      "image": "",
      "tags": [
        "vermouth"
      ],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "dolin-rouge",
      "name": "杜林 Rouge 甜红味美思",
      "category": "酒精成分",
      "parentId": "vermouth",
      "brand": "Dolin",
      "aliases": [
        "Dolin Rouge"
      ],
      "kind": "product",
      "image": "",
      "tags": [
        "vermouth"
      ],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "cocchi-storico",
      "name": "好奇 Storico 都灵甜味美思",
      "category": "酒精成分",
      "parentId": "vermouth",
      "brand": "Cocchi",
      "aliases": [
        "Cocchi Storico Vermouth di Torino",
        "好奇红味美思",
        "Cocchi Torino"
      ],
      "kind": "product",
      "image": "",
      "tags": [
        "vermouth"
      ],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "cinzano-rosso",
      "name": "仙山露 Rosso 甜红味美思",
      "category": "酒精成分",
      "parentId": "vermouth",
      "brand": "Cinzano",
      "aliases": [
        "Cinzano Rosso"
      ],
      "kind": "product",
      "image": "",
      "tags": [
        "vermouth"
      ],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "bitter-aperitif",
      "name": "苦味开胃酒",
      "category": "酒精成分",
      "parentId": "liqueur",
      "brand": "",
      "aliases": [
        "Bitter Aperitif"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "campari",
      "name": "金巴利",
      "category": "酒精成分",
      "parentId": "bitter-aperitif",
      "brand": "Campari",
      "aliases": [
        "Bitter Campari"
      ],
      "kind": "product",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "aperol",
      "name": "阿佩罗",
      "category": "酒精成分",
      "parentId": "bitter-aperitif",
      "brand": "Aperol",
      "aliases": [
        "Aperol"
      ],
      "kind": "product",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "nonino",
      "name": "诺尼诺阿玛罗",
      "category": "酒精成分",
      "parentId": "amaro",
      "brand": "Nonino",
      "aliases": [
        "Amaro Nonino"
      ],
      "kind": "product",
      "image": "",
      "tags": [
        "amaro"
      ],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "cynar",
      "name": "西那尔洋蓟利口酒",
      "category": "酒精成分",
      "parentId": "amaro",
      "brand": "Cynar",
      "aliases": [
        "Cynar"
      ],
      "kind": "product",
      "image": "",
      "tags": [
        "amaro"
      ],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "fernet",
      "name": "菲奈特苦味利口酒",
      "category": "酒精成分",
      "parentId": "amaro",
      "brand": "",
      "aliases": [
        "Fernet"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "fernet-branca",
      "name": "菲奈特布兰卡",
      "category": "酒精成分",
      "parentId": "fernet",
      "brand": "Fernet Branca",
      "aliases": [
        "Fernet Branca"
      ],
      "kind": "product",
      "image": "",
      "tags": [
        "amaro"
      ],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "triple-sec",
      "name": "三重橙酒 Triple Sec",
      "category": "酒精成分",
      "parentId": "orange-liqueur",
      "brand": "",
      "aliases": [
        "Triple Sec"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "curacao",
      "name": "库拉索橙酒",
      "category": "酒精成分",
      "parentId": "orange-liqueur",
      "brand": "",
      "aliases": [
        "Orange Curacao"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "dry-curacao",
      "name": "干型库拉索橙酒",
      "category": "酒精成分",
      "parentId": "curacao",
      "brand": "",
      "aliases": [
        "Dry Curacao"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "blue-curacao",
      "name": "蓝橙利口酒",
      "category": "酒精成分",
      "parentId": "curacao",
      "brand": "",
      "aliases": [
        "Blue Curacao"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "cointreau",
      "name": "君度橙酒",
      "category": "酒精成分",
      "parentId": "triple-sec",
      "brand": "Cointreau",
      "aliases": [
        "Cointreau"
      ],
      "kind": "product",
      "image": "",
      "tags": [
        "orange-liqueur"
      ],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "bols-blue",
      "name": "波士蓝橙利口酒",
      "category": "酒精成分",
      "parentId": "blue-curacao",
      "brand": "Bols",
      "aliases": [
        "Bols Blue Curacao"
      ],
      "kind": "product",
      "image": "",
      "tags": [
        "orange-liqueur"
      ],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "cognac-orange",
      "name": "干邑橙味利口酒",
      "category": "酒精成分",
      "parentId": "orange-liqueur",
      "brand": "",
      "aliases": [
        "Cognac Orange Liqueur"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "grand-marnier",
      "name": "柑曼怡",
      "category": "酒精成分",
      "parentId": "cognac-orange",
      "brand": "Grand Marnier",
      "aliases": [
        "Grand Marnier"
      ],
      "kind": "product",
      "image": "",
      "tags": [
        "orange-liqueur"
      ],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "maraschino",
      "name": "马拉斯奇诺樱桃利口酒",
      "category": "酒精成分",
      "parentId": "liqueur",
      "brand": "",
      "aliases": [
        "Maraschino"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "luxardo-maraschino",
      "name": "卢萨朵马拉斯奇诺",
      "category": "酒精成分",
      "parentId": "maraschino",
      "brand": "Luxardo",
      "aliases": [
        "Maraschino Luxardo"
      ],
      "kind": "product",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "luxardo-cherry",
      "name": "卢萨朵 Sangue Morlacco",
      "category": "酒精成分",
      "parentId": "cherry-liqueur",
      "brand": "Luxardo",
      "aliases": [
        "Cherry Sangue Morlacco"
      ],
      "kind": "product",
      "image": "",
      "tags": [
        "cherry-liqueur"
      ],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "apricot-brandy",
      "name": "杏子白兰地利口酒",
      "category": "酒精成分",
      "parentId": "liqueur",
      "brand": "",
      "aliases": [
        "Apricot Brandy"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "peach-brandy",
      "name": "桃白兰地利口酒",
      "category": "酒精成分",
      "parentId": "liqueur",
      "brand": "",
      "aliases": [
        "Peach Brandy"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "peach-schnapps",
      "name": "桃味甜酒",
      "category": "酒精成分",
      "parentId": "liqueur",
      "brand": "",
      "aliases": [
        "Peach Schnapps"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "kahlua",
      "name": "甘露咖啡利口酒",
      "category": "酒精成分",
      "parentId": "coffee-liqueur",
      "brand": "Kahlua",
      "aliases": [
        "Kahlúa"
      ],
      "kind": "product",
      "image": "",
      "tags": [
        "coffee-liqueur"
      ],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "cacao-brown",
      "name": "深色可可利口酒",
      "category": "酒精成分",
      "parentId": "liqueur",
      "brand": "",
      "aliases": [
        "Crème de Cacao Brown"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "cacao-white",
      "name": "白可可利口酒",
      "category": "酒精成分",
      "parentId": "liqueur",
      "brand": "",
      "aliases": [
        "Crème de Cacao White"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "menthe-green",
      "name": "绿薄荷利口酒",
      "category": "酒精成分",
      "parentId": "liqueur",
      "brand": "",
      "aliases": [
        "Crème de Menthe Green"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "menthe-white",
      "name": "白薄荷利口酒",
      "category": "酒精成分",
      "parentId": "liqueur",
      "brand": "",
      "aliases": [
        "Crème de Menthe White"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "cassis",
      "name": "黑加仑利口酒",
      "category": "酒精成分",
      "parentId": "liqueur",
      "brand": "",
      "aliases": [
        "Crème de Cassis"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "raspberry-liqueur",
      "name": "覆盆子利口酒",
      "category": "酒精成分",
      "parentId": "liqueur",
      "brand": "",
      "aliases": [
        "Raspberry Liqueur"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "hazelnut-liqueur",
      "name": "榛子利口酒",
      "category": "酒精成分",
      "parentId": "liqueur",
      "brand": "",
      "aliases": [
        "Hazelnut Liqueur"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "frangelico",
      "name": "榛子弗朗格里科",
      "category": "酒精成分",
      "parentId": "hazelnut-liqueur",
      "brand": "Frangelico",
      "aliases": [
        "Frangelico"
      ],
      "kind": "product",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "chartreuse-green",
      "name": "绿查特酒",
      "category": "酒精成分",
      "parentId": "herbal-liqueur",
      "brand": "Chartreuse",
      "aliases": [
        "Green Chartreuse"
      ],
      "kind": "product",
      "image": "",
      "tags": [
        "herbal-liqueur"
      ],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "chartreuse-yellow",
      "name": "黄查特酒",
      "category": "酒精成分",
      "parentId": "herbal-liqueur",
      "brand": "Chartreuse",
      "aliases": [
        "Yellow Chartreuse"
      ],
      "kind": "product",
      "image": "",
      "tags": [
        "herbal-liqueur"
      ],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "benedictine",
      "name": "廊酒",
      "category": "酒精成分",
      "parentId": "herbal-liqueur",
      "brand": "Bénédictine",
      "aliases": [
        "DOM Bénédictine",
        "D.O.M.廊酒",
        "DOM廊酒"
      ],
      "kind": "product",
      "image": "",
      "tags": [
        "herbal-liqueur"
      ],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "drambuie",
      "name": "杜林标威士忌利口酒",
      "category": "酒精成分",
      "parentId": "herbal-liqueur",
      "brand": "Drambuie",
      "aliases": [
        "Drambuie"
      ],
      "kind": "product",
      "image": "",
      "tags": [
        "herbal-liqueur"
      ],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "falernum",
      "name": "法勒南香料甜酒",
      "category": "酒精成分",
      "parentId": "liqueur",
      "brand": "",
      "aliases": [
        "Falernum"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "allspice-liqueur",
      "name": "多香果利口酒",
      "category": "酒精成分",
      "parentId": "liqueur",
      "brand": "",
      "aliases": [
        "Allspice Dram"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "st-elizabeth",
      "name": "圣伊丽莎白多香果酒",
      "category": "酒精成分",
      "parentId": "allspice-liqueur",
      "brand": "St. Elizabeth",
      "aliases": [
        "Allspice Saint Elizabeth"
      ],
      "kind": "product",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "anise-liqueur",
      "name": "茴香利口酒",
      "category": "酒精成分",
      "parentId": "liqueur",
      "brand": "",
      "aliases": [
        "Anise Liqueur"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "pernod",
      "name": "潘诺茴香酒",
      "category": "酒精成分",
      "parentId": "anise-liqueur",
      "brand": "Pernod",
      "aliases": [
        "Pernod"
      ],
      "kind": "product",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "aromatized-wine",
      "name": "加香葡萄酒",
      "category": "酒精成分",
      "parentId": "liqueur",
      "brand": "",
      "aliases": [
        "Aromatized Wine"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "lillet",
      "name": "利莱白",
      "category": "酒精成分",
      "parentId": "aromatized-wine",
      "brand": "Lillet",
      "aliases": [
        "Lillet Blanc"
      ],
      "kind": "product",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "cocchi-americano",
      "name": "好奇美国佬 Americano",
      "category": "酒精成分",
      "parentId": "aromatized-wine",
      "brand": "Cocchi",
      "aliases": [
        "Cocchi Americano",
        "好奇美国佬"
      ],
      "kind": "product",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "sherry",
      "name": "雪莉酒",
      "category": "酒精成分",
      "parentId": "wine",
      "brand": "",
      "aliases": [
        "Sherry"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "amontillado",
      "name": "阿蒙蒂亚雪莉",
      "category": "酒精成分",
      "parentId": "sherry",
      "brand": "",
      "aliases": [
        "Amontillado"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "palo-cortado",
      "name": "帕罗科塔多雪莉",
      "category": "酒精成分",
      "parentId": "sherry",
      "brand": "",
      "aliases": [
        "Palo Cortado"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "aromatic-bitters",
      "name": "芳香苦精",
      "category": "酒精成分",
      "parentId": "bitters",
      "brand": "",
      "aliases": [
        "Aromatic Bitters"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "angostura",
      "name": "安高天娜芳香苦精",
      "category": "酒精成分",
      "parentId": "aromatic-bitters",
      "brand": "Angostura",
      "aliases": [
        "Angostura Bitters"
      ],
      "kind": "product",
      "image": "",
      "tags": [
        "bitters"
      ],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "peychauds",
      "name": "佩肖氏苦精",
      "category": "酒精成分",
      "parentId": "aromatic-bitters",
      "brand": "Peychaud's",
      "aliases": [
        "Peychaud’s Bitters"
      ],
      "kind": "product",
      "image": "",
      "tags": [
        "bitters"
      ],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "orange-bitters",
      "name": "橙味苦精",
      "category": "酒精成分",
      "parentId": "bitters",
      "brand": "",
      "aliases": [
        "Orange Bitters"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "amargo-bitters",
      "name": "Amargo 苦精",
      "category": "酒精成分",
      "parentId": "bitters",
      "brand": "",
      "aliases": [
        "Amargo Bitters"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "worcestershire",
      "name": "伍斯特酱",
      "category": "非酒精成分",
      "parentId": "seasoning-root",
      "brand": "",
      "aliases": [
        "Worcestershire Sauce"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "hot-sauce",
      "name": "辣椒汁",
      "category": "非酒精成分",
      "parentId": "seasoning-root",
      "brand": "",
      "aliases": [
        "Hot Sauce"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "tabasco",
      "name": "塔巴斯科辣椒汁",
      "category": "非酒精成分",
      "parentId": "hot-sauce",
      "brand": "Tabasco",
      "aliases": [
        "Tabasco"
      ],
      "kind": "product",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "salt",
      "name": "盐",
      "category": "非酒精成分",
      "parentId": "other-food",
      "brand": "",
      "aliases": [
        "Salt"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "celery-salt",
      "name": "芹菜盐",
      "category": "非酒精成分",
      "parentId": "seasoning-root",
      "brand": "",
      "aliases": [
        "Celery Salt"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "pepper",
      "name": "黑胡椒",
      "category": "非酒精成分",
      "parentId": "seasoning-root",
      "brand": "",
      "aliases": [
        "Pepper"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "orange-flower",
      "name": "橙花水",
      "category": "非酒精成分",
      "parentId": "seasoning-root",
      "brand": "",
      "aliases": [
        "Orange Flower Water"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "vanilla-extract",
      "name": "香草精",
      "category": "非酒精成分",
      "parentId": "seasoning-root",
      "brand": "",
      "aliases": [
        "Vanilla Extract"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "lime",
      "name": "青柠汁",
      "category": "非酒精成分",
      "parentId": "juice-root",
      "brand": "",
      "aliases": [
        "Fresh Lime Juice"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "lemon",
      "name": "柠檬汁",
      "category": "非酒精成分",
      "parentId": "juice-root",
      "brand": "",
      "aliases": [
        "Fresh Lemon Juice"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "orange-juice",
      "name": "鲜橙汁",
      "category": "非酒精成分",
      "parentId": "juice-root",
      "brand": "",
      "aliases": [
        "Fresh Orange Juice"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "pineapple-juice",
      "name": "菠萝汁",
      "category": "非酒精成分",
      "parentId": "juice-root",
      "brand": "",
      "aliases": [
        "Fresh Pineapple Juice"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "grapefruit-juice",
      "name": "葡萄柚汁",
      "category": "非酒精成分",
      "parentId": "juice-root",
      "brand": "",
      "aliases": [
        "Grapefruit Juice"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "cranberry",
      "name": "蔓越莓汁",
      "category": "非酒精成分",
      "parentId": "juice-root",
      "brand": "",
      "aliases": [
        "Cranberry Juice"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "tomato",
      "name": "番茄汁",
      "category": "非酒精成分",
      "parentId": "juice-root",
      "brand": "",
      "aliases": [
        "Tomato Juice"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "cane-juice",
      "name": "甘蔗汁",
      "category": "非酒精成分",
      "parentId": "juice-root",
      "brand": "",
      "aliases": [
        "Sugar Cane Juice"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "peach-puree",
      "name": "白桃果泥",
      "category": "非酒精成分",
      "parentId": "juice-root",
      "brand": "",
      "aliases": [
        "White Peach Puree"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "passion-puree",
      "name": "百香果泥",
      "category": "非酒精成分",
      "parentId": "juice-root",
      "brand": "",
      "aliases": [
        "Passion Fruit Puree"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "cola",
      "name": "可乐",
      "category": "非酒精成分",
      "parentId": "juice-root",
      "brand": "",
      "aliases": [
        "Cola"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "ginger-beer",
      "name": "姜汁啤酒",
      "category": "非酒精成分",
      "parentId": "juice-root",
      "brand": "",
      "aliases": [
        "Ginger Beer"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "ginger-ale",
      "name": "干姜水",
      "category": "非酒精成分",
      "parentId": "juice-root",
      "brand": "",
      "aliases": [
        "Ginger Ale"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "grapefruit-soda",
      "name": "粉红葡萄柚汽水",
      "category": "非酒精成分",
      "parentId": "juice-root",
      "brand": "",
      "aliases": [
        "Pink Grapefruit Soda"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "water",
      "name": "饮用水",
      "category": "非酒精成分",
      "parentId": "juice-root",
      "brand": "",
      "aliases": [
        "Water"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "sugar",
      "name": "细砂糖",
      "category": "非酒精成分",
      "parentId": "other-food",
      "brand": "",
      "aliases": [
        "Superfine Sugar"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "cane-sugar",
      "name": "白蔗糖",
      "category": "非酒精成分",
      "parentId": "sugar",
      "brand": "",
      "aliases": [
        "White Cane Sugar"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "sugar-cube",
      "name": "方糖",
      "category": "非酒精成分",
      "parentId": "sugar",
      "brand": "",
      "aliases": [
        "Sugar Cube"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "powdered-sugar",
      "name": "糖粉",
      "category": "非酒精成分",
      "parentId": "sugar",
      "brand": "",
      "aliases": [
        "Powdered Sugar"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "vanilla-sugar",
      "name": "香草糖",
      "category": "非酒精成分",
      "parentId": "other-food",
      "brand": "",
      "aliases": [
        "Vanilla Sugar"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "syrup",
      "name": "原味糖浆",
      "category": "非酒精成分",
      "parentId": "other-food",
      "brand": "",
      "aliases": [
        "Simple Syrup Sugar Syrup"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "honey",
      "name": "蜂蜜",
      "category": "非酒精成分",
      "parentId": "other-food",
      "brand": "",
      "aliases": [
        "Honey"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "honey-syrup",
      "name": "蜂蜜糖浆",
      "category": "非酒精成分",
      "parentId": "other-food",
      "brand": "",
      "aliases": [
        "Honey Syrup Honey Mix"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "monin-honey",
      "name": "莫林蜂蜜糖浆",
      "category": "非酒精成分",
      "parentId": "honey-syrup",
      "brand": "Monin",
      "aliases": [
        "Monin Honey Syrup"
      ],
      "kind": "product",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "demerara-syrup",
      "name": "德梅拉拉糖浆",
      "category": "非酒精成分",
      "parentId": "other-food",
      "brand": "",
      "aliases": [
        "Demerara Syrup"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "raspberry-syrup",
      "name": "覆盆子糖浆",
      "category": "非酒精成分",
      "parentId": "other-food",
      "brand": "",
      "aliases": [
        "Raspberry Syrup"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "grenadine",
      "name": "红石榴糖浆",
      "category": "非酒精成分",
      "parentId": "other-food",
      "brand": "",
      "aliases": [
        "Grenadine Syrup"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "passion-syrup",
      "name": "百香果糖浆",
      "category": "非酒精成分",
      "parentId": "other-food",
      "brand": "",
      "aliases": [
        "Passion Fruit Syrup"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "orgeat",
      "name": "杏仁糖浆",
      "category": "非酒精成分",
      "parentId": "other-food",
      "brand": "",
      "aliases": [
        "Orgeat Syrup"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "agave-nectar",
      "name": "龙舌兰糖浆",
      "category": "非酒精成分",
      "parentId": "other-food",
      "brand": "",
      "aliases": [
        "Agave Nectar"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "elderflower-cordial",
      "name": "接骨木花果露",
      "category": "非酒精成分",
      "parentId": "other-food",
      "brand": "",
      "aliases": [
        "Elderflower Cordial"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "chamomile-cordial",
      "name": "洋甘菊果露",
      "category": "非酒精成分",
      "parentId": "other-food",
      "brand": "",
      "aliases": [
        "Chamomile Cordial"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "honey-chamomile",
      "name": "蜂蜜洋甘菊混合液",
      "category": "非酒精成分",
      "parentId": "other-food",
      "brand": "",
      "aliases": [
        "Honey Chamomile Mix"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "donns-mix",
      "name": "Donn’s Mix",
      "category": "非酒精成分",
      "parentId": "other-food",
      "brand": "",
      "aliases": [
        "Donn’s Mix"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "cream",
      "name": "鲜奶油",
      "category": "非酒精成分",
      "parentId": "other-food",
      "brand": "",
      "aliases": [
        "Fresh Cream"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "coconut-cream",
      "name": "椰子奶油",
      "category": "非酒精成分",
      "parentId": "other-food",
      "brand": "",
      "aliases": [
        "Coconut Cream"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "egg-white",
      "name": "蛋清",
      "category": "非酒精成分",
      "parentId": "other-food",
      "brand": "",
      "aliases": [
        "Egg White"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "egg-yolk",
      "name": "蛋黄",
      "category": "非酒精成分",
      "parentId": "other-food",
      "brand": "",
      "aliases": [
        "Egg Yolk"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "espresso",
      "name": "浓缩咖啡",
      "category": "非酒精成分",
      "parentId": "other-food",
      "brand": "",
      "aliases": [
        "Espresso"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "coffee",
      "name": "热黑咖啡",
      "category": "非酒精成分",
      "parentId": "other-food",
      "brand": "",
      "aliases": [
        "Hot Coffee"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "orange",
      "name": "鲜橙",
      "category": "非酒精成分",
      "parentId": "produce-root",
      "brand": "",
      "aliases": [
        "Orange"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "lemon-fruit",
      "name": "鲜柠檬",
      "category": "非酒精成分",
      "parentId": "produce-root",
      "brand": "",
      "aliases": [
        "Lemon"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "lime-fruit",
      "name": "鲜青柠",
      "category": "非酒精成分",
      "parentId": "produce-root",
      "brand": "",
      "aliases": [
        "Lime"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "pineapple",
      "name": "菠萝",
      "category": "非酒精成分",
      "parentId": "produce-root",
      "brand": "",
      "aliases": [
        "Pineapple"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "passion-fruit",
      "name": "百香果",
      "category": "非酒精成分",
      "parentId": "produce-root",
      "brand": "",
      "aliases": [
        "Passion Fruit"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "peach",
      "name": "桃子",
      "category": "非酒精成分",
      "parentId": "produce-root",
      "brand": "",
      "aliases": [
        "Peach"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "mint",
      "name": "薄荷",
      "category": "非酒精成分",
      "parentId": "produce-root",
      "brand": "",
      "aliases": [
        "Mint"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "basil",
      "name": "意大利罗勒",
      "category": "非酒精成分",
      "parentId": "produce-root",
      "brand": "",
      "aliases": [
        "Italian Basil"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "ginger",
      "name": "鲜姜",
      "category": "非酒精成分",
      "parentId": "produce-root",
      "brand": "",
      "aliases": [
        "Ginger Gengibre"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "candied-ginger",
      "name": "糖渍姜片",
      "category": "非酒精成分",
      "parentId": "produce-root",
      "brand": "",
      "aliases": [
        "Candied Ginger"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "cherry",
      "name": "鸡尾酒樱桃",
      "category": "非酒精成分",
      "parentId": "produce-root",
      "brand": "",
      "aliases": [
        "Cocktail Maraschino Cherry"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "raspberry",
      "name": "覆盆子",
      "category": "非酒精成分",
      "parentId": "produce-root",
      "brand": "",
      "aliases": [
        "Raspberry"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "blackberry",
      "name": "黑莓",
      "category": "非酒精成分",
      "parentId": "produce-root",
      "brand": "",
      "aliases": [
        "Blackberry"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "berries",
      "name": "新鲜莓果",
      "category": "非酒精成分",
      "parentId": "produce-root",
      "brand": "",
      "aliases": [
        "Berries"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "grapes",
      "name": "白葡萄",
      "category": "非酒精成分",
      "parentId": "produce-root",
      "brand": "",
      "aliases": [
        "White Grapes"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "olive",
      "name": "绿橄榄",
      "category": "非酒精成分",
      "parentId": "produce-root",
      "brand": "",
      "aliases": [
        "Green Olive"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "celery",
      "name": "芹菜",
      "category": "非酒精成分",
      "parentId": "produce-root",
      "brand": "",
      "aliases": [
        "Celery"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "chili",
      "name": "红辣椒",
      "category": "非酒精成分",
      "parentId": "produce-root",
      "brand": "",
      "aliases": [
        "Red Chili Pepper"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "nutmeg",
      "name": "肉豆蔻",
      "category": "非酒精成分",
      "parentId": "produce-root",
      "brand": "",
      "aliases": [
        "Nutmeg"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "cloves",
      "name": "丁香",
      "category": "非酒精成分",
      "parentId": "produce-root",
      "brand": "",
      "aliases": [
        "Cloves"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
    },
    {
      "id": "coffee-beans",
      "name": "咖啡豆",
      "category": "非酒精成分",
      "parentId": "produce-root",
      "brand": "",
      "aliases": [
        "Coffee Beans"
      ],
      "kind": "type",
      "image": "",
      "tags": [],
      "matchParent": true,
      "customized": false
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
      "rum-all",
      [
        "rum",
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
      "brandy",
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
      "vermouth-root",
      [
        "vermouth",
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
      "liqueur",
      [
        "liqueur"
      ],
      [
        "absinthe",
        "cacao-liqueur",
        "coffee-liqueur",
        "cream-liqueur",
        "orange-liqueur",
        "cherry-liqueur",
        "passion-liqueur",
        "herbal-liqueur",
        "pear-liqueur",
        "honey-liqueur",
        "mint-liqueur",
        "mure",
        "banana-liqueur",
        "violette",
        "grapefruit-liqueur",
        "peach-liqueur",
        "amaretto"
      ]
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
      "soda-root",
      [
        "soda",
        "tonic",
        "other-soda"
      ],
      []
    ],
    [
      "other-materials",
      [
        "syrup-root",
        "juice-root",
        "produce-root",
        "seasoning-root",
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
      "Copo 高脚杯",
      "Tiki 杯",
      "双份古典杯",
      "古典杯",
      "大号杯",
      "大号高脚杯",
      "大号高脚碗杯",
      "大号鸡尾酒杯",
      "小号平底杯",
      "朱利普金属杯",
      "柯林斯杯",
      "海波杯",
      "爱尔兰咖啡杯",
      "碟形香槟杯",
      "细长高杯",
      "细长鸡尾酒杯",
      "葡萄酒杯",
      "铜骡子杯",
      "陶杯",
      "飓风杯",
      "香槟杯",
      "香槟笛杯",
      "马天尼杯",
      "高杯",
      "高脚杯",
      "鸡尾酒杯"
    ],
    "sources": [
      "IBA · 难忘经典",
      "IBA · 当代经典",
      "IBA · 新时代"
    ]
  }
};

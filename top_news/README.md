# webscraper
This script scraps top news on sinoquebec `https://www.sinoquebec.com/portal.php?mod=list&catid=1&page=1` and outputs json file:

```json
[
    {
        "href": "portal.php?mod=view&aid=96860",
        "title": "女友传来“宝宝我想你” 男友立刻报警揭惊悚事件",
        "description": "“宝宝我想你…” 江苏常州杨男收到女友传来的甜密短信，原以为这是两人吵架之后合好的讯息，但他马上觉得不对劲而报警。警方追查后发现从事性交易的姜女已经死亡多日，陶男掐死她后弃尸，还试图用她的手机向杨男索 ...",
        "label": "综合新闻",
        "view": "813",
        "timestamp": "2018-10-25 20:03"
    },
    {
        "href": "portal.php?mod=view&aid=96859",
        "title": "福特北美召回150万辆Focus 加拿大近14万辆",
        "description": "据CBC报道，福特汽车公司在北美召回近150万辆Focus，因其燃油系统问题会导致发动机在没有警告的情况下失速。这些车辆主要在2012-2018年生产，其中1,282,596辆在美国，136,272辆在加拿大，另有44,521辆在墨西哥销售。 ...",
        "label": "加国新闻",
        "view": "308",
        "timestamp": "2018-10-25 19:36"
    }
]
```

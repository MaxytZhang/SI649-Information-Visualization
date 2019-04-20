var data1 = [
    {"country":"US","ratio":0.248484848},
    {"country":"Myanmar","ratio":2.229166667},
    {"country":"Morocco","ratio":1.417910448},
    {"country":"Lesotho","ratio":1.417840376},
    {"country":"Nigeria","ratio":1.2875},
    {"country":"Bangladesh","ratio":1.274193548},
    {"country":"China","ratio":1.228346457},
    {"country":"Pakistan","ratio":1.222222222},
    {"country":"Uganda","ratio":1.127358491},
    {"country":"India","ratio":0.755868545},

];
var Stat = G2.Stat;
var Frame = G2.Frame;
var frame = new Frame(data1);
frame = Frame.sort(frame, 'ratio'); // 将数据按照ratio 进行排序，由大到小
var chart = new G2.Chart({
    id : 'p2-2',
    forceFit: true,
    height: 450,
    plotCfg: {
        margin: [50, 60, 20, 120]
    }
});
chart.source(frame);
chart.axis('country',{
    title: null
});
//chart.guide().line([-0.5,1],[2000,0]);
chart.guide().tag([-0.5,1],[10,1],'suicide ratio of two gender is same')
chart.guide().tag([-0.5,0.397133321],[10,0.397133321],'average:0.3971');
chart.coord('rect').transpose();
chart.interval().position('country*ratio');
chart.render();


var data2 = [
    {item: "5-14 years", value: 0.0000077668371880687, obj: "female"},
    {item: "15-24 years", value: 0.0000523254962035587, obj: "female"},
    {item: "25-34 years", value: 0.0000669892045319588, obj: "female"},
    {item: "35-54 years", value: 0.0000975878512780408, obj: "female"},
    {item: "55-74 years", value: 0.0000817869887494479, obj: "female"},
    {item: "75+ years", value: 0.0000458455991535883, obj: "female"},
];
var chart2 = new G2.Chart({
    id: 'p3-1-1',
    forceFit: true,
    height: 450,
    plotCfg: {
        margin: [20, 140, 60, 80]
    }
});
chart2.source(data2, {
    'value': {
        min: 0,
        max: 0.0001,
        tickCount: 3
    }
});
chart2.coord('polar');
chart2.legend('obj', { // 配置具体字段对应的图例属性
    title: null,
    position: 'bottom'
});
chart2.axis('item',{ // 设置坐标系栅格样式
    line: null
});
chart2.axis('value',{ // 设置坐标系栅格样式
    grid: {
        type: 'polygon' //圆形栅格，可以改成
    }
});
chart2.line().position('item*value').color('obj');
chart2.point().position('item*value').color('obj').shape('circle');
chart2.area().position('item*value').color('obj');
chart2.render();


var data3 = [
    {item: "5-14 years", value: 0.000011986469673033, obj: "male"},
    {item: "15-24 years", value: 0.000192747553810681, obj: "male"},
    {item: "25-34 years", value: 0.000248587247008946, obj: "male"},
    {item: "35-54 years", value: 0.000279274021970804, obj: "male"},
    {item: "55-74 years", value: 0.000281050214108627, obj: "male"},
    {item: "75+ years", value: 0.00038807333521312, obj: "male"},
];
var chart = new G2.Chart({
    id: 'p3-1-2',
    forceFit: true,
    height: 450,
    plotCfg: {
        margin: [20, 140, 60, 80]
    }
});
chart.source(data3, {
    'value': {
        min: 0,
        max: 0.0004,
        tickCount: 5
    }
});
chart.coord('polar');
chart.legend('obj', { // 配置具体字段对应的图例属性
    title: null,
    position: 'bottom'
});
chart.axis('item',{ // 设置坐标系栅格样式
    line: null
});
chart.axis('value',{ // 设置坐标系栅格样式
    grid: {
        type: 'polygon' //圆形栅格，可以改成
    }
});
chart.line().position('item*value').color('obj');
chart.point().position('item*value').color('obj').shape('circle');
chart.area().position('item*value').color('obj');
chart.render();


var data4 = [
    {item: "5-14 years", value: 0.0000077668371880687, obj: "female"},
    {item: "15-24 years", value: 0.0000523254962035587, obj: "female"},
    {item: "25-34 years", value: 0.0000669892045319588, obj: "female"},
    {item: "35-54 years", value: 0.0000975878512780408, obj: "female"},
    {item: "55-74 years", value: 0.0000817869887494479, obj: "female"},
    {item: "75+ years", value: 0.0000458455991535883, obj: "female"},
    {item: "5-14 years", value: 0.000011986469673033, obj: "male"},
    {item: "15-24 years", value: 0.000192747553810681, obj: "male"},
    {item: "25-34 years", value: 0.000248587247008946, obj: "male"},
    {item: "35-54 years", value: 0.000279274021970804, obj: "male"},
    {item: "55-74 years", value: 0.000281050214108627, obj: "male"},
    {item: "75+ years", value: 0.00038807333521312, obj: "male"},
];
var chart = new G2.Chart({
    id: 'p3-1-3',
    forceFit: true,
    height: 450,
    plotCfg: {
        margin: [20, 140, 60, 80]
    }
});
chart.source(data4, {
    'value': {
        min: 0,
        max: 0.0004,
        tickCount: 5
    }
});
chart.coord('polar');
chart.legend('obj', { // 配置具体字段对应的图例属性
    title: null,
    position: 'bottom'
});
chart.axis('item',{ // 设置坐标系栅格样式
    line: null
});
chart.axis('value',{ // 设置坐标系栅格样式
    grid: {
        type: 'polygon' //圆形栅格，可以改成
    }
});
chart.line().position('item*value').color('obj');
chart.point().position('item*value').color('obj').shape('circle');
chart.area().position('item*value').color('obj');
chart.render();
var data = [
    {"country":"U.S.","ratio":-0.75,'which gender has higher suicide rate':'male has higher suicide rate'},
    {"country":"Myanmar","ratio":1.23,'which gender has higher suicide rate':'female has higher suicide rate'},
    {"country":"Morocco","ratio":0.42,'which gender has higher suicide rate':'female has higher suicide rate'},
    {"country":"Lesotho","ratio":0.42,'which gender has higher suicide rate':'female has higher suicide rate'},
    {"country":"Saint Vincent and the Grenadines","ratio":0.29,'which gender has higher suicide rate':'female has higher suicide rate'},
    {"country":"Bangladesh","ratio":0.28,'which gender has higher suicide rate':'female has higher suicide rate'},
    {"country":"China","ratio":0.23,'which gender has higher suicide rate':'female has higher suicide rate'},
    {"country":"India","ratio":-0.24,'which gender has higher suicide rate':'male has higher suicide rate'},
    {"country":"U.K.","ratio":-0.70,'which gender has higher suicide rate':'male has higher suicide rate'},
    {"country":"Antigua and Barbuda","ratio":-0.98,'which gender has higher suicide rate':'male has higher suicide rate'},

];
var Stat = G2.Stat;
var Frame = G2.Frame;
var frame = new Frame(data);
frame = Frame.sort(frame, 'ratio'); // 将数据按照ratio 进行排序，由大到小
var chart = new G2.Chart({
    id : 'p2_2',
    forceFit: true,
    height: 450,
    plotCfg: {
        margin: [50, 300, 50, 120]
    }
});
chart.source(frame);
chart.axis('country',{
    title: null
});
chart.guide().tag([-1,0],[10,0],'1');
chart.guide().tag([-0.5,-0.6],[10,-0.6],'Global Average: -0.6');
chart.axis('country', {
    title: null,
    tickLine: null,
    line:null,
    labels:null});
chart.axis('ratio', {
    title: null,
    tickLine: null,
    line:null,
    labels:null});
chart.guide().text([8.8, -0.075], 'Myanmar', {
    fill:'black',
    textAlign: 'center',
    fontSize: 14
});
chart.guide().text([8.8, 1.19], 'NO.1', {
    fill:'white',
    textAlign: 'center',
    fontSize: 14
});
chart.guide().text([7.8, -0.075], 'Morocco', {
    fill:'black',
    textAlign: 'center',
    fontSize: 14
});
chart.guide().text([6.8, -0.075], 'Lesotho', {
    fill:'black',
    textAlign: 'center',
    fontSize: 14
});
chart.guide().text([5.8, -0.075], 'Nigeria', {
    fill:'black',
    textAlign: 'center',
    fontSize: 14
});
chart.guide().text([4.8, -0.075], 'Bangladesh', {
    fill:'black',
    textAlign: 'center',
    fontSize: 14
});
chart.guide().text([3.8, -0.075], 'China', {
    fill:'black',
    textAlign: 'center',
    fontSize: 14
});
chart.guide().text([2.8, 0.075], 'India', {
    fill:'black',
    textAlign: 'center',
    fontSize: 14
});
chart.guide().text([1.8, 0.075], 'U.K.', {
    fill:'black',
    textAlign: 'center',
    fontSize: 14
});
chart.guide().text([0.8, 0.075], 'U.S.', {
    fill:'black',
    textAlign: 'center',
    fontSize: 14
});
chart.guide().text([-0.2, 0.16], 'Antigua and Barbuda', {
    fill:'black',
    textAlign: 'center',
    fontSize: 14
});
chart.guide().text([-0.2, -0.94], 'NO.1', {
    fill:'white',
    textAlign: 'center',
    fontSize: 14
});
chart.legend({
    position: 'bottom', // 设置图例的显示位置
    dy: 19,

});
chart.coord('rect').transpose();
chart.interval().position('country*ratio').color('which gender has higher suicide rate');
chart.render();





var data4 = [
    {item: "5-14 years", value: 0.0077668371880687, obj: "female"},
    {item: "15-24 years", value: 0.0523254962035587, obj: "female"},
    {item: "25-34 years", value: 0.0669892045319588, obj: "female"},
    {item: "35-54 years", value: 0.0975878512780408, obj: "female"},
    {item: "55-74 years", value: 0.0817869887494479, obj: "female"},
    {item: "75+ years", value: 0.0458455991535883, obj: "female"},
    {item: "5-14 years", value: 0.011986469673033, obj: "male"},
    {item: "15-24 years", value: 0.192747553810681, obj: "male"},
    {item: "25-34 years", value: 0.248587247008946, obj: "male"},
    {item: "35-54 years", value: 0.279274021970804, obj: "male"},
    {item: "55-74 years", value: 0.281050214108627, obj: "male"},
    {item: "75+ years", value: 0.38807333521312, obj: "male"},
];
var chart = new G2.Chart({
    id: 'p3_1',
    forceFit: true,
    height: 450,
    plotCfg: {
        margin: [20, 140, 60, 80]
    }
});
chart.source(data4, {
    'value': {
        min: 0,
        max: 0.4,
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

chart.legend({
    position: 'bottom', // 设置图例的显示位置
    spacingY: 500,
    mode: 'multiple',
    spacingX: 20 // 图例项之间的水平间距
});
chart.render();
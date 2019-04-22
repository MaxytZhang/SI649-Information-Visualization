var data2 = [
    {"country":"Greenland","suicide incidence rate (per 1k)":0.80},
    {"country":"Lesotho","suicide incidence rate (per 1k)":0.39},
    {"country":"Guyana","suicide incidence rate (per 1k)":0.32},
    {"country":"Lithuania","suicide incidence rate (per 1k)":0.31},
    {"country":"Russia","suicide incidence rate (per 1k)":0.30},
    {"country":"South Africa","suicide incidence rate (per 1k)":0.14},
    {"country":"U.S.","suicide incidence rate (per 1k)":0.13},
    {"country":"China","suicide incidence rate (per 1k)":0.09},
    {"country":"U.K.","suicide incidence rate (per 1k)":0.08},
];
var Stat = G2.Stat;
var Frame = G2.Frame;
var frame = new Frame(data2);
frame = Frame.sort(frame, 'suicide incidence rate (per 1k)'); // 将数据按照suicide incidence rate (per 1k) 进行排序，由大到小
var chart2 = new G2.Chart({
    id : 'p1_2',
    forceFit: true,
    height: 450,
    plotCfg: {
        margin: [50, 200, 20, 200]
    }
});
chart2.source(frame);
chart2.axis('country',{
    title: null
});
//chart.guide().line([-0.5,1],[2000,0]);
//chart.guide().tag([-0.5,1],[10,1],'suicide suicide incidence rate (per 1k) (per 1k) of two gender is same')
chart2.guide().tag([-0.5,0.11],[9,0.11],'worldwide average: 0.11 (per 1k)');
chart2.guide().text([7.7, 0.75], 'NO.1', {
    fill:'white',
    textAlign: 'center',
    fontSize: 20
});
chart2.guide().text([6.7, 0.34], 'NO.2', {
    fill:'white',
    textAlign: 'center',
    fontSize: 20
});
chart2.guide().text([5.7, 0.27], 'NO.3', {
    fill:'white',
    textAlign: 'center',
    fontSize: 20
});
chart2.guide().text([4.7, 0.26], 'NO.4', {
    fill:'white',
    textAlign: 'center',
    fontSize: 20
});
chart2.guide().text([3.7, 0.25], 'NO.5', {
    fill:'white',
    textAlign: 'center',
    fontSize: 20
});
chart2.coord('rect').transpose();
chart2.interval().position('country*suicide incidence rate (per 1k)');
chart2.render();




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
var chart1 = new G2.Chart({
    id : 'p2_2',
    forceFit: true,
    height: 450,
    plotCfg: {
        margin: [50, 300, 50, 120]
    }
});
chart1.source(frame);
chart1.axis('country',{
    title: null
});
chart1.guide().tag([-1,0],[10,0],'1');
chart1.guide().tag([-0.5,-0.6],[10,-0.6],'Global Average: 0.40');
chart1.axis('country', {
    title: null,
    tickLine: null,
    line:null,
    labels:null});
chart1.axis('ratio', {
    title: null,
    tickLine: null,
    line:null,
    labels:null});
chart1.guide().text([8.8, -0.15], 'Myanmar', {
    fill:'black',
    textAlign: 'center',
    fontSize: 14
});
chart1.guide().text([8.8, 1], 'NO.1', {
    fill:'white',
    textAlign: 'center',
    fontSize: 14
});
chart1.guide().text([7.8, -0.15], 'Morocco', {
    fill:'black',
    textAlign: 'center',
    fontSize: 14
});
chart1.guide().text([6.8, -0.15], 'Lesotho', {
    fill:'black',
    textAlign: 'center',
    fontSize: 14
});
chart1.guide().text([5.8, -0.15], 'Nigeria', {
    fill:'black',
    textAlign: 'center',
    fontSize: 14
});
chart1.guide().text([4.8, -0.2], 'Bangladesh', {
    fill:'black',
    textAlign: 'center',
    fontSize: 14
});
chart1.guide().text([3.8, -0.15], 'China', {
    fill:'black',
    textAlign: 'center',
    fontSize: 14
});
chart1.guide().text([2.8, 0.1], 'India', {
    fill:'black',
    textAlign: 'center',
    fontSize: 14
});
chart1.guide().text([1.8, 0.1], 'U.K.', {
    fill:'black',
    textAlign: 'center',
    fontSize: 14
});
chart1.guide().text([0.8, 0.1], 'U.S.', {
    fill:'black',
    textAlign: 'center',
    fontSize: 14
});
chart1.guide().text([-0.2, 0.35], 'Antigua and Barbuda', {
    fill:'black',
    textAlign: 'center',
    fontSize: 14
});
chart1.guide().text([-0.2, -0.75], 'NO.1', {
    fill:'white',
    textAlign: 'center',
    fontSize: 14
});
chart1.legend({
    position: 'bottom', // 设置图例的显示位置
    dy: 17,
    mode:false,
});
chart1.tooltip({
  offset: 10, // 设置 tooltip 显示位置时距离当前鼠标 x 轴方向上的距
  name: 'female-male suicide ratio',
});
chart1.coord('rect').transpose();
chart1.interval().position('country*ratio').color('which gender has higher suicide rate');
chart1.render();
chart1.on('tooltipchange',function(ev){
    var item = ev.items[0]; // 获取tooltip要显示的内容
    item.value = 1 +  Number(item.value);
    item.name = 'female-male suicide ratio';
  });





var data4 = [
    {item: "5-14 years", value: 0.0078, obj: "female"},
    {item: "15-24 years", value: 0.0523, obj: "female"},
    {item: "25-34 years", value: 0.0670, obj: "female"},
    {item: "35-54 years", value: 0.0976, obj: "female"},
    {item: "55-74 years", value: 0.0818, obj: "female"},
    {item: "75+ years", value: 0.0458, obj: "female"},
    {item: "5-14 years", value: 0.0120, obj: "male"},
    {item: "15-24 years", value: 0.1927, obj: "male"},
    {item: "25-34 years", value: 0.2486, obj: "male"},
    {item: "35-54 years", value: 0.2793, obj: "male"},
    {item: "55-74 years", value: 0.2811, obj: "male"},
    {item: "75+ years", value: 0.3881, obj: "male"},
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

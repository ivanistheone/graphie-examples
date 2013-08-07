
// X and Y ranges of the graph
var X_RANGE = [-1.5, 25.0];
var Y_RANGE = [-1.5, 25.1];

// Width of the graph in pixels
// Let's use 400 for "normal" graphs and 170 for "small" graphs
var SIZE = 400;

var xScale;
var yScale;
setup();



style({
    stroke: BLUE,
    fill: "none"
});


plot(function(x) {
    return 0;
}, [0,8]);
plot(function(x) {
    return 20*x-20*8;
}, [8,9]);
plot(function(x) {
    return 20;
}, [9,17]);
plot(function(x) {
    return -5*x+17*5+20;
}, [17,19]);
plot(function(x) {
    return 10;
}, [19,21]);
plot(function(x) {
    return -20*x+21*20+10;
}, [21,21.5]);
plot(function(x) {
    return 0;
}, [21.5,24]);



function setup() {
    xScale = SIZE / (X_RANGE[1] - X_RANGE[0]);
    yScale = SIZE / (Y_RANGE[1] - Y_RANGE[0]);
    var xAxisPadding = 50 / xScale;
    var yAxisPadding = 50 / yScale;
    var xStep = 1; //max(round(20 / xScale), 1);
    var yStep = 1;  //max(round(20 / yScale), 1);
    graphInit({
        gridRange: [X_RANGE, Y_RANGE],
        range: [[X_RANGE[0], X_RANGE[1] + xAxisPadding],
                [Y_RANGE[0], Y_RANGE[1] + yAxisPadding]],
        scale: [xScale, yScale],
        gridStep: [xStep, yStep],
        tickStep: 1,
        labelStep: 1,
        unityLabels: false,
        labelFormat: function(s) { return "\\scriptsize{" + s + "}"; },
        yLabelFormat: function(s) { return "\\small{" + s + "}"; },
        axisArrows: "<->"
    });
    style({
        "plot-points": 1600,
        clipRect: [[X_RANGE[0], Y_RANGE[0]],
                [X_RANGE[1] - X_RANGE[0],
                Y_RANGE[1] - Y_RANGE[0]]]
    });

    label([0, Y_RANGE[1]], "d [\\textrm{km}]", "above");
    label([X_RANGE[1], 0], "t [\\textrm{h}]", "right");
}


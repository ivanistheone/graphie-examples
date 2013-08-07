
// X and Y ranges of the graph
var X_RANGE = [-0.3, 10];
var Y_RANGE = [-4, 7];

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
}, [-10, 3]);

plot(function(x) {
    return 2*(x - 3);
}, [3, 5]);

plot(function(x) {
    return 9-x;
}, [5, 9]);

plot(function(x) {
    return 0;
}, [9,10]);

function setup() {
    xScale = SIZE / (X_RANGE[1] - X_RANGE[0]);
    yScale = SIZE / (Y_RANGE[1] - Y_RANGE[0]);
    var xAxisPadding = 25 / xScale;
    var yAxisPadding = 25 / yScale;
    var xStep = max(round(20 / xScale), 1);
    var yStep = max(round(20 / yScale), 1);
    graphInit({
        gridRange: [X_RANGE, Y_RANGE],
        range: [[X_RANGE[0], X_RANGE[1] + xAxisPadding],
                [Y_RANGE[0], Y_RANGE[1] + yAxisPadding]],
        scale: [xScale, yScale],
        gridStep: [xStep, yStep],
        tickStep: 1,
        labelStep: 1,
        unityLabels: false,
        labelFormat: function(s) { return "\\small{" + s + "}"; },
        axisArrows: "<->"
    });
    style({
        clipRect: [[X_RANGE[0], Y_RANGE[0]],
                [X_RANGE[1] - X_RANGE[0],
                Y_RANGE[1] - Y_RANGE[0]]]
    });

    label([0, Y_RANGE[1]], "y", "above");
    label([X_RANGE[1], 0], "x", "right");
}



// X and Y ranges of the graph
var X_RANGE = [-0.8, 7];
var Y_RANGE = [-300, 500];

// var STEP = [<x tick step>, <y tick step>];
// var STEP = [10, 25];
var STEP = "auto";

// Width of the graph in pixels
// Let's use 400 for "normal" graphs and 170 for "small" graphs
var SIZE = 400;

var xScale;
var yScale;
setup();
//////////////////////////////////////////////////////////////


style({
    stroke: BLUE,
    fill: "none"
});

plot(function(x) {
    // Write down the function you want to plot here
    return 100 * x -200;
}, [0,6]);


//////////////////////////////////////////////////////////////
// Setup grid, ticks, and labels and initialize graph.
function setup() {
    var dimensions = [SIZE, SIZE];
    var range = [X_RANGE, Y_RANGE];
    var step = STEP;
    if (step === "auto") {
        step = _.map(range, function(extent, i) {
            return Perseus.Util.tickStepFromExtent(
                    extent, dimensions[i]);
        });
    }
    var gridConfig = _.map(range, function(extent, i) {
        return Perseus.Util.gridDimensionConfig(
                step[i],
                extent,
                dimensions[i]);
    });
    var scale = _.pluck(gridConfig, "scale");
    xScale = scale[0];
    yScale = scale[1];
    var paddedRange = _.map(range, function(extent, i) {
        var padding = 30 / scale[i];
        return [extent[0], extent[1] + padding];
    });
    graphInit({
        gridRange: range,
        range: paddedRange,
        scale: scale,
        axisArrows: "<->",
        labelFormat: function(s) {
            return "\\small{" + s + "}";
        },
        gridStep: _.pluck(gridConfig, "gridStep"),
        tickStep: _.pluck(gridConfig, "tickStep"),
        labelStep: 1,
        unityLabels: _.pluck(gridConfig, "unityLabel")
    });
    style({
        clipRect: [[X_RANGE[0], Y_RANGE[0]],
                [X_RANGE[1] - X_RANGE[0],
                Y_RANGE[1] - Y_RANGE[0]]]
    });

    label([0, Y_RANGE[1]], "x[\\textrm{km}]", "above");
    label([X_RANGE[1], 0], "t[\\textrm{h}]", "right");
}

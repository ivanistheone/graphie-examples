// X and Y ranges of the graph
var X_RANGE = [-1, 10];
var Y_RANGE = [-1, 10];

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


var ROTATE_ARC = 0,
    ANGLE= 90,
    WHITE = "#FFFFFF",
    R = 3;

//background
path([[0, 0], [10, 0], [10, 10], [0,10], [0,0]], {fill:RED, stroke: BLACK}) ;

// cut outs
arc([0, 0],  R, 0,  0 + ANGLE, true, { stroke: BLACK, fill: WHITE, "fill-opacity": 1.0 });
arc([10, 0], R, 90, 90 + ANGLE, true, { stroke: BLACK, fill: WHITE, "fill-opacity": 1.0 });
arc([10, 10], R, 180, 180 + ANGLE, true, { stroke: BLACK, fill: WHITE, "fill-opacity": 1.0 });
arc([0, 10], R, 270, 270 + ANGLE, true, { stroke: BLACK, fill: WHITE, "fill-opacity": 1.0 });




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
        var padding = 25 / scale[i];
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

    label([0, Y_RANGE[1]], "y", "above");
    label([X_RANGE[1], 0], "x", "right");
}



// X and Y ranges of the graph
var X_RANGE = [-1, 7];
var Y_RANGE = [-0.001, 0.008];

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


var peak_func = function (x, height, width, location) {
    var slope = 2*height/width;
    if (x===location) { return height}
    if (x===location+width/2) { return 0}
    if (x < (location-width/2)) {return 0}
    else if (x > (location+width/2)) {return 0}
    else if ((location-width/2) <= x  && x <= location ) {
        return slope*(x-location+width/2);
    }
    else if (location <= x  && x <= (location+width/2)  ) {
        return -1*slope*(x-(location+width/2));
    }
    else {
        return 0;
    }    
}

var heart_beat = function (x, location, size) {
    
    var width1 = 0.1, width2=0.1;
    location = location + width1/2;
    return peak_func(x,size,width1,location-width1/2) 
            + peak_func(x,-0.1*size,width2,location+width2/2)
            + peak_func(x,0.05*size,0.3,location+0.4) 
            + size*0.001*sin(50*x)+ size*0.0002*sin(20*x); 
}


var VMAX = 0.004;

plot(function(x) {
    // Write down the function you want to plot here
    return heart_beat(x,1,VMAX)+ 
heart_beat(x,2,VMAX) + 
heart_beat(x,3,VMAX) + 
heart_beat(x,4,VMAX) + 
heart_beat(x,5,VMAX) + 
heart_beat(x,6,VMAX) + 
heart_beat(x,7,VMAX) + 
heart_beat(x,0,VMAX) +
heart_beat(x,-1,VMAX);
}, X_RANGE);














function setup() {
    xScale = SIZE / (X_RANGE[1] - X_RANGE[0]);
    yScale = SIZE / (Y_RANGE[1] - Y_RANGE[0]);
    var xAxisPadding = 70 / xScale;
    var yAxisPadding = 25 / yScale;
    var xStep = max(round(20 / xScale), 1);
    var yStep = max(round(20 / yScale), 0.001);
    graphInit({
        gridRange: [X_RANGE, Y_RANGE],
        range: [[X_RANGE[0], X_RANGE[1] + xAxisPadding],
                [Y_RANGE[0], Y_RANGE[1] + yAxisPadding]],
        scale: [xScale, yScale],
        gridStep: [xStep, yStep],
        tickStep: 1,
        labelStep: 1,
        unityLabels: false,
        labelFormat: function(s) { return "\\small{"+s+"}"; },
    
        axisArrows: "<->"
    });
    style({
        "plot-points": 10600,
        clipRect: [[X_RANGE[0], Y_RANGE[0]],
                [X_RANGE[1] - X_RANGE[0],
                Y_RANGE[1] - Y_RANGE[0]]]
    });

    label([0, Y_RANGE[1]], "V", "above");
    label([X_RANGE[1], 0], "t [\\textrm{sec}]", "right");
}




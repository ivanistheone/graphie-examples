

42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
    // Write down the function you want to plot here
    return 10*x-20;
}, [4,7]);
label([1, 22], "\\green{\\textrm{Alberto}}", "right");
function setup() {
    xScale = SIZE / (X_RANGE[1] - X_RANGE[0]);
    yScale = SIZE / (Y_RANGE[1] - Y_RANGE[0]);
    var xAxisPadding = 45 / xScale;
    var yAxisPadding = 45 / yScale;
    var xStep = 0.5; //max(round(20 / xScale), 1);
    var yStep = 5;  //max(round(20 / yScale), 1);
    graphInit({
        gridRange: [X_RANGE, Y_RANGE],
        range: [[X_RANGE[0], X_RANGE[1] + xAxisPadding],
                [Y_RANGE[0], Y_RANGE[1] + yAxisPadding]],
        scale: [xScale, yScale],
        gridStep: [xStep, yStep],
        tickStep: 1,
        labelStep: 1,
        unityLabels: false,
        labelFormat: function(s) { return "\\small{" + s + "}"
; },
        yLabelFormat: function(s) { return "\\small{" + s + 
"}"; },
        axisArrows: "<->"
    });
    style({
        clipRect: [[X_RANGE[0], Y_RANGE[0]],
                [X_RANGE[1] - X_RANGE[0],
                Y_RANGE[1] - Y_RANGE[0]]]
    });
    label([0, Y_RANGE[1]], "x [\\textrm{km}]", "above");
    label([X_RANGE[1], 0], "t [\\textrm{h}]", "right");
}
0.511.522.533.544.555.566.577.585101520253035404550x[km]t[h]BiancaAlberto




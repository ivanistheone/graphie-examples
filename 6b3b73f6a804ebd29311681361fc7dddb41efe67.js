/* The X and Y ranges of this canvas */
var range = [[-7, 7], [-7, 7]];

var STEP = 3; // 0,1,2,3, or "final";

/* The output's largest side is limited to this many pixels */

if (STEP===0){
 var size = 400;
} else {
 var size = 250;
}

setup();
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

var inner = 0;
inner /= 2;

var outer = 5;
outer -= inner;

var a = [-inner, -inner],
    b = [-inner,  inner],
    c = [ inner,  inner],
    d = [ inner, -inner];


// draws a filled in sector of a circle
// --> similar to arc but with will option + draws sides
// limitation: works only for (end-start)<=180 degrees
var drawSector =  function(options) {
    var graphie = this;

    if (_.has(options, "radius")) {
        _.defaults(options, {
            radii: options.radius
        });
    }
    
    _.defaults(options, {
        center: [0, 0],
        radii: 5,
        start: 45,
        end: 135
    });
    

    // A. the filled-in convex closure of the arc
    drawArc({
        center: options.center,
        radius: options.radius,
        start: options.start,
        end: options.end,
        color:options.color,
        fill: options.fill,
        fillOpacity: options.fillOpacity
    });

    // B. fill the triangular part
    drawPolygon({
        points: [ options.center, 
                  polar(options.radii,options.start), 
                  polar(options.radii,options.end)],
        strokeWidth: 0,
        fill:options.fill,
        fillOpacity:options.fillOpacity,
    });
    
    // C. draw the two radii 
    drawSegment({ 
        points:[ options.center, 
                 polar(options.radii,options.start) ],
        color:options.color,
        strokeOpacity: options.strokeOpacity
    });
    drawSegment({ 
        points:[ options.center, 
                 polar(options.radii,options.end) ],
        color:options.color,
        strokeOpacity: options.strokeOpacity
    });    

}

/*
drawSector({
    center: b,
    radius: radius,
    start: 90,
    end: 180,
    color:BLACK,
    fill: GREEN,
    fillOpacity: 0.4
});
*/

//arc([0, 0], 4, 90, 180, {fill: GREEN, "fill-opacity": 0.2});


var radius = outer - inner;




drawPolygon({
    points: [
        [outer, outer],
        [0, outer],
        [0,0],
        [-outer,0],
        [-outer,-outer],
        [outer,-outer]
    ],
    sideLabels: [,,,"$len0","$len0",],
    fill: BLUE,
    fillOpacity: 0.3
});



drawSector({
    center: b,
    radius: radius,
    start: 90,
    end: 180,
    color:BLACK,
    fill: BLUE,
    fillOpacity: 0.3
});



if (STEP===1 || STEP==="final"){
    drawSector({
        center: b,
        radius: radius,
        start: 90,
        end: 180,
        color:BLACK,
        fill: BLUE,
        fillOpacity: 0.6
    });
}

if (STEP===2 || STEP==="final"){
    drawPolygon({
        points: [
            [outer, 0],
            [0,0],
            [-outer,0],
            [-outer,-outer],
            [outer,-outer]
        ],
        sideLabels: [],
        fill: BLUE,
        fillOpacity: 0.6
    });
}

if (STEP===3 || STEP==="final"){
    drawPolygon({
        points: [
            [outer, 0],
            [outer,outer],
            [0,outer],
            [0,0],
        ],
        sideLabels: ["$len0","$len0"],
        fill: BLUE,
        fillOpacity: 0.6
    });
}

/*
drawSector({
    center: d,
    radius: radius,
    start: 270,
    end: 0,
    fill: GREEN,
    fillOpacity: 0.5
});
*/


drawSegment({
    points: [
        b,
        addPoints(b, polar(radius, 135))
    ],
    sideLabel: "$len1",
    dashed: true
});

var middle = outer - (outer - inner) / 2;


/*
drawSegment({
    points: [
        [middle, inner],
        [middle, -inner],
    ],
    sideLabel: "$len1",
    dashed: true
});

drawSegment({
    points: [
        [-inner, -middle],
        [inner, -middle]
    ],
    sideLabel: "$len1",
    dashed: true
});
*/


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
function setup() {
    var scales = _.map(range, function(extent) {
        return Perseus.Util.scaleFromExtent(extent, size);
    });
    init({range: range, scale: _.min(scales)});
}
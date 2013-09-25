/* The X and Y ranges of this canvas */
var range = [[-5, 25], [-5, 8]];

/* The output's largest side is limited to this many pixels */
var size = 500;

setup();
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

// UI
var labelsep = 1;

// constants
var radius = 4,
    center = [0,0],
    pbegin = [9,0];
    
// problem vars
var N=12,
    theta = 360/N,      // in degrees...
    astep = 2*radius*sin(theta/2  *PI/180),
    h = radius*cos(theta/2 *PI/180);
    


//adds two arrays as vectors 
var vplus = function(u,v){ return [ u[0]+v[0], u[1]+v[1] ]; };


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
                  vplus(options.center,polar(options.radii,options.start)), 
                  vplus(options.center,polar(options.radii,options.end))],
        strokeWidth: 0,
        fill:options.fill,
        fillOpacity:options.fillOpacity,
    });
    
    // C. draw the two radii 
    drawSegment({ 
        points:[ options.center, 
                 vplus(options.center,polar(options.radii,options.start)) ],
        color:options.color,
        strokeOpacity: options.strokeOpacity
    });
    drawSegment({ 
        points:[ options.center, 
                 vplus(options.center,polar(options.radii,options.end)) ],
        color:options.color,
        strokeOpacity: options.strokeOpacity
    });    

}

var thnow = 0;
for (var idx=0; idx<N; idx++){
    
    drawSector({
        center: center,
        radius: radius,
        start: thnow,
        end: thnow+theta,
        color:BLACK,
        fill: BLUE,
        fillOpacity: 0.4
    });
    
    thnow = thnow+theta;

}






var drawSlice = function (c,r,th,orientation){
    var thover2 = th/2;
    var thcenter =  (orientation==="down") ? -90 : 90;
            
    drawSector({
        center: c,
        radius: r,
        start: thcenter-thover2,
        end: thcenter+thover2,
        color:BLACK,
        fill: BLUE,
        fillOpacity: 0.4
    });

}


var x = pbegin[0];

for (var idx2=0; idx2 < N/2; idx2++){
    drawSlice( vplus([x,pbegin[1]],[0,h/2]), radius, theta,"down" );
    x=x+astep/2;
drawSlice( vplus([x,pbegin[1]],[0,-h/2]), radius, theta,"up" );
    x=x+astep/2;
}



drawSegment({
    points: [
        vplus(pbegin,[0,h/2+labelsep]),
        vplus(vplus(pbegin,[0,h/2+labelsep]),[PI*radius,0])
    ],
    sideLabel: "b",      // "$len1",  //$
    dashed: true
});


drawSegment({
    points: [
        [pbegin[0]+N*astep/2+labelsep,pbegin[1]-h/2],
        [pbegin[0]+N*astep/2+labelsep,pbegin[1]+h/2]
    ],
    sideLabel: "\\ h",      // "$len1",  //$
    dashed: true,
    dotted: true,
});

drawSegment({
    points: [
        [center[0]-radius, center[1]+radius+labelsep],
        [center[0]+radius, center[1]+radius+labelsep]
    ],
    sideLabel: "d=2r",      // "$len1",  //$
    dashed: true,
});


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
function setup() {
    var scales = _.map(range, function(extent) {
        return Perseus.Util.scaleFromExtent(extent, size);
    });
    init({range: range, scale: _.min(scales)});
}
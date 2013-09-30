/* The X and Y ranges of this canvas */
var range = [[-2, 2], [-2, 2]];

/* The output's largest side is limited to this many pixels */
var size = 400;

setup();
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

var color1 = "#D7ED3A";
var color2 = "#38C77F";
var color3 = "#78D0EF";
var color4 = "#F0B63A";

var height = 4;
var base = height * 2;

var side = "" + height + "\\sqrt{2}";
var depth = 3;

var xangle = PI / 15;
var yangle = -PI / 8;
var scale = 5;
var vertices = [
    [-1, 0.5, 1],
    [1, 0.5, 1],
    [0, -0.5, 1],
    [-1, 0.5, -1],
    [1, 0.5, -1],
    [0, -0.5, -1]
];
var faces = [
    {
        verts: [0, 2, 1],
        color: color3,
        lines: [[[0, -0.5, 1], [0, 0.5, 1]]],
        labels: [[[0, 0, 1], height]]
    }, {
        verts: [3, 4, 5],
        color: color3,
        lines: [[[-0.03, -0.47, -1], [0.95, 0.5, -1]]],
        labels: [[[0.2, -0.08, -1], side]]
    }, {
        verts: [0, 1, 4, 3],
        color: color4,
        lines: [[[1, 0.5, 0], [-1, 0.5, 0]]],
        labels: [[[0, 0.5, 0], base]]
    }, {
        verts: [1, 2, 5, 4],
        color: color1,
        lines: [[[0.5, 0, 1], [0.5, 0, -1]]],
        labels: [[[0.5, 0, 0], depth]]
    }, {
        verts: [0, 3, 5, 2],
        color: color2,
        lines: [[[-1, 0.5, 0], [0, -0.5, 0]]],
        labels: [[[-0.5, 0, 0], side]]
    }
];

var obj = make3dObject(vertices, {scale: scale});

_.each(faces, function(face) {
    obj.addFace(face);
});

obj.setPos([0, 0, 6]);
obj.rotate(1, 0, 0, yangle);
obj.rotate(0, 1, 0, xangle);
obj.doDraw();



var drawCube = function( width, length, height, options) {

    var vertices = [
        [0,0,0],                // bottom four
        [width,0,0],    
        [width,length,0],
        [0,length,0],           
        [0,0,height],                // bottom four
        [width,0,height],    
        [width,length,height],
        [0,length,height]
    ];
    
    _.defaults(options, {
        sideLabels: [],
        faceLabels: [],
        faceColors: [color1, color2,color2,color2,color2, color1]
    });

    

}




/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
function setup() {
    var scales = _.map(range, function(extent) {
        return Perseus.Util.scaleFromExtent(extent, size);
    });
    init({range: range, scale: _.min(scales)});
}

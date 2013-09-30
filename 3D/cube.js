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


var drawCube = function( width, length, height, options) {

    var vertices = [
        [0,0,0],                // 0        //bottom four
        [width,0,0],            // 1
        [width,length,0],       // 2
        [0,length,0],           // 3
        [0,0,height],           // 4        // bottom four
        [width,0,height],       // 5
        [width,length,height],  // 6
        [0,length,height]       // 7
    ];
    
    _.defaults(options, {
        sideLabels: [],
        faceLabels: [],
        faceColors: [color1, color2,color2,color2,color2, color1]
    });

    var faces = [
        {
            verts: [0, 1, 2, 3],
            color: options.faceColors[0],
            lines: [  [vertices[0], vertices[1]],
                      [vertices[1], vertices[2]],
                      [vertices[2], vertices[3]],
                      [vertices[3], vertices[0]]
                   ],
            labels: [[ [width/2, length/2, 0], "bottom"]]
        }, {
            verts: [0, 1, 5, 4],
            color: options.faceColors[1],
            lines: [[ vertices[0], vertices[4] ]],
        }, {
            verts: [1, 2, 6, 5],
            color: options.faceColors[2],
            lines: [[ vertices[0], vertices[4] ]],
        }, {
            verts: [2, 3, 7, 6],
            color: options.faceColors[3],
            lines: [[ vertices[0], vertices[4] ]],
        }, {
            verts: [3, 0, 4, 7],
            color: options.faceColors[4],
            lines: [[ vertices[0], vertices[4] ]],
        }, {
            verts: [4, 5, 6, 7],
            color: options.faceColors[5],
            lines: [  [vertices[4], vertices[5]],
                      [vertices[5], vertices[6]],
                      [vertices[6], vertices[7]],
                      [vertices[7], vertices[4]]
                   ],
            labels: [[ [width/2, length/2, height], "top"]]
        }
    ];

    var obj = make3dObject(vertices, {scale: scale});

    _.each(faces, function(face) {
        obj.addFace(face);
    });
    

    return obj;
}


obj = drawCube(2,3,4, { });

obj.setPos([0, 0, 14]);
obj.rotate(1, 0, 0, yangle);
obj.rotate(0, 1, 0, xangle);
obj.doDraw();




/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
function setup() {
    var scales = _.map(range, function(extent) {
        return Perseus.Util.scaleFromExtent(extent, size);
    });
    init({range: range, scale: _.min(scales)});
}



var isTHUMBNAIL = false;

var SHOW_SECANT_PLANE = true;
var CENTERED = false;


/* The output's largest side is limited to this many pixels */
if (isTHUMBNAIL) {
    var range = [[-2, 2], [-2, 1]];
    var size = 100;
    var scale = 9.6;
} else {
    var range = [[-1, 1], [-2, 2]];
    var size = 400;
    var scale = 6.4;
}

setup();
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

var color1 = "#D7ED3A";
var color2 = "#38C77F";
var color3 = "#78D0EF";
var color4 = "#F00305";

/*

var height = 4;
var base = height * 2;

var side = "" + height + "\\sqrt{2}";
var depth = 3;

var xangle = PI / 15;
var yangle = -PI / 8;
*/



var drawPrism = function( width, length, height, options) {

    var vertices = [
        [0,0,0],                // 0        //bottom four
        [width,0,0],            // 1
        [width,length,0],       // 2
        [0,length,0],           // 3
        [0,0,height],           // 4        // bottom four
        [width,0,height],       // 5
        [width,length,height],  // 6
        [0,length,height],      // 7
        [-0.618*width,-0.618*length,height/2],         // 8        //middle four
        [1.618*width,-0.618*length,height/2],     // 9
        [1.618*width,1.618*length,height/2],    // 10
        [-0.618*width,1.618*length,height/2]    // 11
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
            //lines: [  [vertices[0], vertices[1]],
            //          [vertices[1], vertices[2]],
            //          [vertices[2], vertices[3]],
            //          [vertices[3], vertices[0]]
            //       ],
            labels: [[ [width/2, length/2, 0], ""]]
        }, {
            verts: [0, 1, 5, 4],
            color: options.faceColors[1]
            //,lines: [[ vertices[0], vertices[4] ]],
        }, {
            verts: [1, 2, 6, 5],
            color: options.faceColors[2]
            //,lines: [[ vertices[1], vertices[5] ]],
        }, {
            verts: [2, 3, 7, 6],
            color: options.faceColors[3]
            //,lines: [[ vertices[2], vertices[6] ]],
        }, {
            verts: [3, 0, 4, 7],
            color: options.faceColors[4]
            //,lines: [[ vertices[3], vertices[7] ]],
        }, {
            verts: [4, 5, 6, 7],
            color: options.faceColors[5],
            /*lines: [  [vertices[4], vertices[5]],
                      [vertices[5], vertices[6]],
                      [vertices[6], vertices[7]],
                      [vertices[7], vertices[4]]
                   ],*/
            labels: [[ [width/2, length/2, height], ""]]
        }
        
    ];
    
    if (!isTHUMBNAIL) {
        faces.push({    // secant plane
            verts: [9,10,11,8],
            color: "rgba(255,0,0,0.1)",
            faceBorder: false
        });        
    }

    var obj = make3dObject(vertices, {scale: scale,faceBorder: true});

    _.each(faces, function(face) {
        obj.addFace(face);
    });
    

    return obj;
}




var polar3D = function (r,th,z){
    var tmp = polar(r,th);
    return [tmp[0],tmp[1],z];
};



// draw a Nsegment-sided prism
var drawNsidedPrism = function(radiusTop, radiusBottom, height, Nsegments, options) {

    var vertices = [];
    var faces = [];
    var i,j;
    
    
    var segment_angle = 360/Nsegments;                     // in degrees
    

    _.defaults(options, {
        sideLabels: [],
        faceLabels: [],
        faceColors: [color1, color2, color1]    // bottom, sides, top
    });

    
    // add vertices of base
    for (i=0; i<Nsegments; i++){
        vertices.push( polar3D(radiusBottom,i*segment_angle+45,0) );
    }
    for (i=0; i<Nsegments; i++){
        vertices.push( polar3D(radiusTop,i*segment_angle+45,height) );
    }
    
    // add bottom face
    faces.push( {
            verts: _.range(0,Nsegments),
            color: options.faceColors[0],
            labels: [ 
                [ polar3D(radiusBottom/sqrt(2)+0.6,45+200,0), "3"],
                [ polar3D(radiusBottom/sqrt(2)+0.9,45+145,0), "3"],
                [ polar3D(radiusBottom+4.2,0,height/4), "6"]
                ]
    });
    
    // add top face 
    faces.push( {
            verts: _.range(Nsegments,2*Nsegments),
            color: options.faceColors[2],
    });    
    
    // add side faces
    for (i=0; i<Nsegments; i++){
        faces.push({
            verts: [i,(i+1)%Nsegments, Nsegments+(i+1)%Nsegments, Nsegments+i ],
            color: options.faceColors[1],
        });     
    }
    
    if (SHOW_SECANT_PLANE) {
    

        
        if (CENTERED){
            Lside = 2*1.618*(radiusTop+radiusBottom)/2;
            Array.prototype.push.apply(vertices,
                            [ 
                            [Lside,0,1.4*height],
                            [-Lside,0,1.4*height],
                            [-Lside,0,-height/2],
                            [Lside,0,-height/2],
                            [Lside,0,1.4*height]
                            ]
            );
            Array.prototype.push.apply(vertices,
                            [ 
                            [  0,0, height],
                            [  0,0, height],
                            [ -1,0, 0],
                            [  1,0, 0],
                            [  0,0, height]
                            ]
            );            
        } else {
            Lside = 1.618*(radiusTop+radiusBottom)/2;
            Array.prototype.push.apply(vertices,
                            [ 
                            [Lside,0.5,-height/2],
                            [Lside,0.5,1.2*height],
                            [-Lside,0.5,1.2*height],
                            [-Lside,0.5,-height/3],
                            [Lside,0.5,-height/2]
                            ]
            ); 
        }
        faces.push({    // secant plane
            verts: _.range(2*Nsegments,2*Nsegments+5),
            color: "rgba(255,0,0,0.1)"
        });   
    }
    

    var obj = make3dObject(vertices, {scale: scale,faceBorder: true,facesTransparent:true});

    
    
    _.each(faces, function(face) {
        obj.addFace(face);
    });
    

    return obj;    
    

};




var prism = drawNsidedPrism(2/sqrt(2), 2/sqrt(2), 4, 4, { } );


prism.setPos([0, -1.5, 14]);
prism.rotate(1, 0, 0, PI/2-0.3); 

if (CENTERED) {
    prism.rotate(0, 0, 1, PI+2.1);
} else {
    prism.rotate(0, 0, 1, PI+1.2);
}

prism.doDraw();




/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
function setup() {
    var scales = _.map(range, function(extent) {
        return Perseus.Util.scaleFromExtent(extent, size);
    });
    init({range: range, scale: _.min(scales)});
}


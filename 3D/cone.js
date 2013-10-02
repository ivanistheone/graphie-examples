var range = [[-1, 1], [-1.2, 0.4]];
var size = 400;
var scale = 6.4;


setup();
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

var color1 = "#D7ED3A";
var color2 = "#38C77F";
var color3 = "#78D0EF";
var color4 = "#F00305";



var polar3D = function (r,th,z){
    var tmp = polar(r,th);
    return [tmp[0],tmp[1],z];
};


// draw a Nsegment-sided prism
var drawNsidedPrism = function(radiusTop, radiusBottom, height, Nsegments, options) {

    var vertices = [];
    var faces = [];
    var i,j;
    
    
    var segment_angle = 360/Nsegments;   // in degrees
    

    _.defaults(options, {
        sideLabels: [],
        faceLabels: [],
        faceColors: [color1, color2, color1]  // bottom, sides, top
    });

    
    // add vertices of base
    for (i=0; i<Nsegments; i++){
        vertices.push( 
            polar3D(radiusBottom,i*segment_angle+45,0) 
        );
    }
    for (i=0; i<Nsegments; i++){
        vertices.push( 
            polar3D(radiusTop,i*segment_angle+45,height) 
        );
    }
    
    // add bottom face
    faces.push( {
            verts: _.range(0,Nsegments),
            color: options.faceColors[0],
    });
    
    // add top face 
    faces.push( {
            verts: _.range(Nsegments,2*Nsegments),
            color: options.faceColors[2],
    });    
    
    // add side faces
    for (i=0; i<Nsegments; i++){
        faces.push({
            verts: [i,
                    (i+1)%Nsegments, 
                    Nsegments+(i+1)%Nsegments, 
                    Nsegments+i 
            ],
            color: options.faceColors[1],
        });     
    }
    
    var obj = make3dObject(vertices, 
                {scale: scale,
                 faceBorder: false,
                 facesTransparent:true});
    
    _.each(faces, function(face) {
        obj.addFace(face);
    });
    

    return obj;    
    

};




var prism = drawNsidedPrism(0, 1, 2, 100, { } );


prism.setPos([0, -1.5, 14]);
prism.rotate(1, 0, 0, PI/2-0.3); 
prism.rotate(0, 0, 1, PI+2.1);
prism.doDraw();




/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
function setup() {
    var scales = _.map(range, function(extent) {
        return Perseus.Util.scaleFromExtent(extent, size);
    });
    init({range: range, scale: _.min(scales)});
}
glass = [185/256,211/256,238/256, 0.3];
glass2 = [198/256,226/256,255/256];
dark_grey = [0.2, 0.2, 0.2];
light_gray = [266/255,266/255,266/255]

//spessore sostegno che unisce i piedi del tavolino alti 0.32 e spessi 0.2; lunghezza è distance_pillars

//ripiano tavolino
var dx = 12;
var dy = 8;
var dz = 0.16;

//pilastrini
var height = 3.3 - dz; //3.14
var final_disk_spessore = 0.08;
var radius = 0.45/2; //2.25

var distance_pillars_y = 7.1;
var distance_pillars_x = 11.1;

var domainPI = DOMAIN([[0,1],[0,2*PI]])([20,50]);
var domain1D = INTERVALS(1)(20);
var domain2D = DOMAIN([[0,1],[0,1]])([30,30]);
var domain3D = DOMAIN([[0,1],[0,1],[0,1]])([20,10,1]);

function getFullCylinder(r, h, dim){
	var cyl = CYL_SURFACE([r,h])(dim);
	var base = DISK(r)(dim);
	var base2 = T([2])([h])(base);
	var fullCylinder = STRUCT([cyl, base, base2]);
	return fullCylinder;
}

var torus = function (R, r) {
  return function (v) {
    var a = v[0];
    var b = v[1]; 
    var u = (r * COS(a)+2*R) * (COS(b));
    var v = (r * COS(a)+2*R) * (SIN(b));
    var w = (r * SIN(a));
    return [u,v,w];
  }
}

function getPillar(radius, height) {
	height = height - final_disk_spessore;
	var domain = DOMAIN([[0,2*PI],[0,2*PI]])([45,45]);
	var p = getFullCylinder(radius, height, [32,2]);
	p = COLOR(light_gray)(p);
	var mapping = torus(radius/2,radius/4);
  	var base = MAP(mapping)(domain);
  	base = COLOR(light_gray)(base);
  	var top = EXTRUDE([final_disk_spessore])(DISK(radius)([36,2]));
  	top = T([2])([height])(top);
  	top = COLOR([0,0,0])(top);
  	return STRUCT([p, base, top]);
}


function getTableLedge(dx, dy, dz) {
	var b01 = BEZIER(S0)([[0,0,height], [dx,0,height]]);
	var b11 = BEZIER(S0)([[0,0,height+dz], [dx,0,height+dz]]);

	var b02 = BEZIER(S0)([[0,0+dy,height], [dx,0+dy,height]]);
	var b12 = BEZIER(S0)([[0,0+dy,height+dz], [dx,0+dy,height+dz]]);

	var b03 = BEZIER(S0)([[0,0,height], [0,dy,height]]);
	var b13 = BEZIER(S0)([[0,0,height+dz], [0,dy,height+dz]]);

	var b04 = BEZIER(S0)([[dx,0,height], [dx,dy,height]]);
	var b14 = BEZIER(S0)([[dx,0,height+dz], [dx,dy,height+dz]]);

	var s01 = BEZIER(S1)([b01, b02]);
	s01 = MAP(s01)(domain2D);

	var s11 = BEZIER(S1)([b11, b12]);
	s11 = MAP(s11)(domain2D);

	var sx1 = BEZIER(S1)([b01,b11]);
	sx1 = MAP(sx1)(domain2D);

	var sx2 = BEZIER(S1)([b02,b12]);
	sx2 = MAP(sx2)(domain2D);

	var sy1 = BEZIER(S1)([b03,b13]);
	sy1 = MAP(sy1)(domain2D);

	var sy2 = BEZIER(S1)([b04,b14]);
	sy1 = MAP(sy2)(domain2D);

	var ledge = STRUCT([s01, s11, sx1, sx2, sy1, sy2]);
	ledge = COLOR(glass)(ledge);
	ledge = T([0,1])([-0.45, -0.45])(ledge);
	return ledge;
}

function getJunctions(dy, dz, v_dy, v_dz){
	var c1 = CUBOID([distance_pillars_x, dy, dz]);
	var c2 = T([1])([distance_pillars_y])(c1);
	var junctions_1 = STRUCT([c1, c2]);
	junctions_1 = T([1,2])([-dy/2, height-final_disk_spessore])(junctions_1);
	junctions_1 = COLOR(glass2)(junctions_1);

	var c3 = CUBOID([dy, distance_pillars_y, dz]);
	var c4 = T([0])([distance_pillars_x])(c3);
	var junctions_2 = STRUCT([c3, c4]);
	junctions_2 = T([0,2])([-dy/2, height-final_disk_spessore])(junctions_2);
	junctions_2 = COLOR(glass2)(junctions_2);

	var cx1 = CUBOID([distance_pillars_x, v_dy, v_dz]);
	var cx2 = T([1])([distance_pillars_y])(cx1);
	var junctions_3 = STRUCT([cx1, cx2]);
	junctions_3 = T([1,2])([-v_dy/2, height-final_disk_spessore-v_dz])(junctions_3);
	junctions_3 = COLOR(dark_grey)(junctions_3);

	var cy1 = CUBOID([v_dy, distance_pillars_y, v_dz]);
	var cy2 = T([0])([distance_pillars_x])(cy1);
	var junctions_4 = STRUCT([cy1, cy2]);
	junctions_4 = T([0,2])([-v_dy/2, height-final_disk_spessore-v_dz])(junctions_4);
	junctions_4 = COLOR(dark_grey)(junctions_4);

	var junctions = STRUCT([junctions_1, junctions_2, junctions_3, junctions_4]);
	return junctions;
}

var p1 = getPillar(radius,height);
var p2 = T([1])([distance_pillars_y])(p1);
var p3 = T([0])([distance_pillars_x])(p2);
var p4 = T([1])([-distance_pillars_y])(p3);

var pillars = STRUCT([p1,p2,p3,p4]);

var junctions = getJunctions(radius*2, 0.02, 0.2, 0.32);	//spessore sostegno che unisce i piedi del tavolino alti 0.32 e spessi 0.2; lunghezza è distance_pillars

var tableLedge = getTableLedge(dx, dy, dz);

var modelLC10 = STRUCT([pillars, junctions, tableLedge]);
DRAW(modelLC10);

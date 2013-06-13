//LC 16 , e LC14 tabourets, in legno
wood = [166.0/255, 128.0/255, 100.0/255];

//libreria, modello base
var height = 7.2;

var gr_base_x = 6.93;
var gr_base_y = 2.5;
var gr_base_z = 0.2;

var lib_base_x = 7;
var lib_base_y = 2.7;
var lib_base_z = 0.2;

var dist_base_int1 = 2;

var dist_int1_int2 = 2.44;

var dist_int2_top = 2;

var int_base1_x = 6.6;
var int_base1_y = 2.6;
var int_base1_z = 0.2;

var ground_base = CUBOID([gr_base_x, gr_base_y, gr_base_z]);
ground_base = T([0])([-gr_base_x/2])(ground_base);
var library_base = CUBOID([lib_base_x, lib_base_y, lib_base_z]);
library_base = T([0,1,2])([-lib_base_x/2, -(lib_base_y-gr_base_y)/2, gr_base_z])(library_base);

var intermediate_base_1 = CUBOID([int_base1_x, int_base1_y, int_base1_z]);
intermediate_base_1 = T([0,1,2])([-int_base1_x/2, -(lib_base_y-int_base1_y) , dist_base_int1 + gr_base_z + lib_base_z])(intermediate_base_1);

var intermediate_base_2 = T([2])([dist_int1_int2])(intermediate_base_1);

var library_top = T([2])([gr_base_z + lib_base_z + dist_base_int1 + dist_int1_int2 + dist_int2_top])(library_base);

var library_back = CUBOID([lib_base_x, 0.2, height - gr_base_z]);
library_back = T([0,1,2])([-lib_base_x/2, 2.7 - 0.3, gr_base_z])(library_back);

var library_dx =  CUBOID([0.2, 2.7, 7]);
library_dx= T([0,1,2])([int_base1_x/2 , -0.1, gr_base_z])(library_dx);
var library_sx = T([0])([-2*int_base1_x/2 - gr_base_z])(library_dx);

var library = STRUCT([ground_base, library_base, intermediate_base_1, intermediate_base_2, library_top, library_back, library_dx, library_sx]);


//tavolino collegato alla libreria
//pilastro
var cil_base = DISK(0.55)([32,4]);
var cil_surface = CYL_SURFACE([0.55, 7.15])([32,4]);
var pillar = STRUCT([cil_surface, cil_base]);
pillar = T([0,1])([1, -7 +1.2])(pillar);

//tavolino
var top_table = CUBOID([5.3, 7.5, 0.2]);
var btx_1 =  CUBOID([5.3, 0.2, 0.7]);
btx_1 = T([2])([-0.7])(btx_1);
var btx_2 = T([1])([7.5])(btx_1);
var bty_1 = CUBOID([0.2, 7.5, 0.7]);
bty_1 = T([2])([-0.7])(bty_1);
var bty_2 = T([0])([5.3 -0.2])(bty_1);

var plane = STRUCT([top_table, btx_1, btx_2, bty_1, bty_2]);
plane = T([0,1,2])([-(7-5.3) -0.1, -7, 7.04])(plane);

//scatole "sedia"

//devo definire i punti della scatola
//altezza = 4
//y= 4
//x= 3
var domainPI = DOMAIN([[0,1],[0,2*PI]])([20,50]);
var domain1D = INTERVALS(1)(20);
var domain2D = DOMAIN([[0,1],[0,1]])([40,40]);
var domain3D = DOMAIN([[0,1],[0,1],[0,1]])([20,10,1]);

//facciate parallela al pavimento
function getSurfaceZ() {
	var profile_edge_1 = BEZIER(S0)([[-1.5, -2, 0], [1.5, -2, 0]]);
	var profile_edge_2 = BEZIER(S0)([[-1.5, 2, 0], [1.5, 2, 0]]);
	var profile_edge_3 = BEZIER(S0)([[-1.5, -2, 0], [-1.5, 2, 0]]);
	var profile_edge_4 = BEZIER(S0)([[1.5, -2, 0], [1.5, 2, 0]]);

	var inner_profile_edge_1 = BEZIER(S0)([[0.15, -0.4, 0], [0.15, 0.4, 0]]);
	var inner_profile_edge_2 = BEZIER(S0)([[-0.15, -0.4, 0], [-0.15, 0.4, 0]]);

	var inner_profile_edge_c1 = BEZIER(S0)([[-0.15, -0.4, 0], [-0.15, -0.6, 0], [0.15, -0.6, 0], [0.15, -0.4, 0]]);
	var inner_profile_edge_c2 = BEZIER(S0)([[-0.15, 0.4, 0], [-0.15, 0.6, 0], [0.15, 0.6, 0], [0.15, 0.4, 0]]);

	var profile_surface_z1 = BEZIER(S1)([profile_edge_3, inner_profile_edge_2]);
	var profile_surface_z2 = BEZIER(S1)([profile_edge_4, inner_profile_edge_1]);
	var profile_surface_z3 = BEZIER(S1)([profile_edge_2, inner_profile_edge_c2]);
	var profile_surface_z4 = BEZIER(S1)([profile_edge_1, inner_profile_edge_c1]);

	var sz1 = MAP(profile_surface_z1)(domain2D);
	var sz2 = MAP(profile_surface_z2)(domain2D);
	var sz3 = MAP(profile_surface_z3)(domain2D);
	var sz4 = MAP(profile_surface_z4)(domain2D);

	var surface_z = STRUCT([sz1, sz2, sz3, sz4]);
	return surface_z;
}

var surface_z = (getSurfaceZ());
var surface_z_top = T([2])([4])(surface_z);

//facciate perpendicolare al pavimento - 1
function getSurfaceX() {
	var profile_edge_1 = BEZIER(S0)([[-2, -2, 0], [-2, 2, 0]]);
	var profile_edge_2 = BEZIER(S0)([[2, -2, 0], [2, 2, 0]]);
	var profile_edge_3 = BEZIER(S0)([[-2, -2, 0], [2, -2, 0]]);
	var profile_edge_4 = BEZIER(S0)([[-2, 2, 0], [2, 2, 0]]);

	var inner_profile_edge_1 = BEZIER(S0)([[-0.5, -0.2, 0], [0.5, -0.2, 0]]);
	var inner_profile_edge_2 = BEZIER(S0)([[-0.5, 0.2, 0], [0.5, 0.2, 0]]);


	var inner_profile_edge_c1 = BEZIER(S0)([[-0.5, -0.2, 0], [-0.7, -0.2, 0], [-0.7, 0.2, 0], [-0.5, 0.2, 0]]);
	var inner_profile_edge_c2 = BEZIER(S0)([[0.5, -0.2, 0], [0.7, -0.2, 0], [0.7, 0.2, 0], [0.5, 0.2, 0]]);

	var profile_surface_x1 = BEZIER(S1)([profile_edge_3, inner_profile_edge_1]);
	var profile_surface_x2 = BEZIER(S1)([profile_edge_4, inner_profile_edge_2]);
	var profile_surface_x3 = BEZIER(S1)([profile_edge_2, inner_profile_edge_c2]);
	var profile_surface_x4 = BEZIER(S1)([profile_edge_1, inner_profile_edge_c1]);

	var sx1 = MAP(profile_surface_x1)(domain2D);
	var sx2 = MAP(profile_surface_x2)(domain2D);
	var sx3 = MAP(profile_surface_x3)(domain2D);
	var sx4 = MAP(profile_surface_x4)(domain2D);

	var surface_x = STRUCT([sx1, sx2, sx3, sx4]);
	return surface_x;
}

var surface_x = (getSurfaceX());
surface_x = R([0,1])([PI/2])(surface_x);
surface_x = R([0,2])([PI/2])(surface_x);
surface_x = T([0,1,2])([1.5,0,2])(surface_x);
var surface_x_2 = T([0])([-3])(surface_x);

//facciate perpendicolare al pavimento - 2
function getSurfaceY() {
	var profile_edge_1 = BEZIER(S0)([[-1.5, -2, 0], [-1.5, 2, 0]]);
	var profile_edge_2 = BEZIER(S0)([[1.5, -2, 0], [1.5, 2, 0]]);
	var profile_edge_3 = BEZIER(S0)([[-1.5, -2, 0], [1.5, -2, 0]]);
	var profile_edge_4 = BEZIER(S0)([[-1.5, 2, 0], [1.5, 2, 0]]);

	var profile_surface_y1 = BEZIER(S1)([profile_edge_1, profile_edge_2]);
	return MAP(profile_surface_y1)(domain2D);
}

var surface_y = getSurfaceY();
surface_y = R([1,2])([PI/2])(surface_y);
surface_y = T([0,1,2])([0,2,2])(surface_y);
var surface_y_2 = T([1])([-4])(surface_y);



var chair1 = STRUCT([surface_z, surface_z_top, (surface_x), surface_x_2, surface_y, surface_y_2]);
chair1 = T([0,1])([-4, -3.5])(chair1)
var chair2 =  T([0])([8])(chair1)
var chairs = STRUCT([chair1, chair2]);

//composizione della libreria, tavolo e sedie
var lib_sx = T([0])([-lib_base_x])(library);
var lib_dx = T([0])([lib_base_x])(library);
var library_int_cx = T([2])([1.2])(intermediate_base_1);
var lib_cx = STRUCT([ground_base, library_base, library_top, library_back, library_dx, library_sx, library_int_cx]);
var lib = STRUCT([lib_sx, lib_dx, lib_cx]);

var table = STRUCT([pillar, plane]);

var modelLC16_LC14 = STRUCT([lib, table, chairs]);
modelLC16_LC14 = COLOR(wood)(modelLC16_LC14);
DRAW(modelLC16_LC14)

//FARE SPESSORE DELLE SEDIE LC14
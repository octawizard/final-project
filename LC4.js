//LC4 long chair
dark_grey = [0.2, 0.2, 0.2];
red = [192.0/255, 0, 0]

var domainPI = DOMAIN([[0,1],[0,2*PI]])([20,50]);
var domain1D = INTERVALS(1)(20);
var domain2D = DOMAIN([[0,1],[0,1]])([30,30]);
var domain3D = DOMAIN([[0,1],[0,1],[0,1]])([20,10,1]);

//4 SOSTEGNI

//SOSTEGNO FRONT
function getFeetFront(){
	var b1_sx = BEZIER(S0)([[-4.7, 0.1, 0], [-4.5, 0.15, 0]]);
	var b2_sx = BEZIER(S0)([[-4.5, 0.1, 3], [-4, 0.15, 2.7]]);
	var foot_sx_mapping = BEZIER(S1)([b1_sx, b2_sx]);
	var foot_sx = MAP(foot_sx_mapping)(domain2D);

	var b1_sx_2 = BEZIER(S0)([[-4.7, 0.1 +0.1, 0], [-4.5, 0.15 +0.1, 0]]);
	var b2_sx_2 = BEZIER(S0)([[-4.5, 0.1 +0.1, 3], [-4, 0.15 +0.1, 2.7]]);
	var foot_sx_mapping_2 = BEZIER(S1)([b1_sx_2, b2_sx_2]);
	var foot_sx_2 = MAP(foot_sx_mapping_2)(domain2D);

	var surf_foot_sx_1 = BEZIER(S1)([b1_sx, b1_sx_2]);
	surf_foot_sx_1 = MAP(surf_foot_sx_1)(domain2D);
	var surf_foot_sx_2 = BEZIER(S1)([b2_sx, b2_sx_2]);
	surf_foot_sx_2 = MAP(surf_foot_sx_2)(domain2D);

	var bx_1 = BEZIER(S0)([[-4.7, 0.1, 0],[-4.5, 0.1, 3]]);
	var bx_2 = BEZIER(S0)([[-4.7, 0.1 +0.1, 0],[-4.5, 0.1 +0.1, 3]]);
	var surf_foot_sx_3 = BEZIER(S1)([bx_1, bx_2]);
	surf_foot_sx_3 = MAP(surf_foot_sx_3)(domain2D);

	var bx_3 = BEZIER(S0)([[-4.5, 0.15, 0],[-4, 0.15, 2.7]]);
	var bx_4 = BEZIER(S0)([[-4.5, 0.15 +0.1, 0],[-4, 0.15 +0.1, 2.7]]);
	var surf_foot_sx_4 = BEZIER(S1)([bx_3, bx_4]);
	surf_foot_sx_4 = MAP(surf_foot_sx_4)(domain2D);

	////
	var b1_dx = BEZIER(S0)([[4.5, 0.6, 0], [4.7, 0.65, 0]]);
	var b2_dx = BEZIER(S0)([[4, 0.6, 2.7], [4.5, 0.65, 3]]);
	var foot_dx_mapping = BEZIER(S1)([b1_dx, b2_dx]);
	var foot_dx = MAP(foot_dx_mapping)(domain2D);

	var b1_dx_2 = BEZIER(S0)([[4.5, 0.6 +0.1, 0], [4.7, 0.65 +0.1, 0]]);
	var b2_dx_2 = BEZIER(S0)([[4, 0.6 +0.1, 2.7], [4.5, 0.65 +0.1, 3]]);
	var foot_dx_mapping_2 = BEZIER(S1)([b1_dx_2, b2_dx_2]);
	var foot_dx_2 = MAP(foot_dx_mapping_2)(domain2D);

	var surf_foot_dx_1 = BEZIER(S1)([b1_dx, b1_dx_2]);
	surf_foot_dx_1 = MAP(surf_foot_dx_1)(domain2D);
	var surf_foot_dx_2 = BEZIER(S1)([b2_dx, b2_dx_2]);
	surf_foot_dx_2 = MAP(surf_foot_dx_2)(domain2D);

	var bx_dx_1 = BEZIER(S0)([[4.7, 0.65, 0], [4.7, 0.65 +0.1, 0]]);
	var bx_dx_2 = BEZIER(S0)([[4.5, 0.65, 3], [4.5, 0.65 +0.1, 3]]);
	var surf_foot_dx_3 = BEZIER(S1)([bx_dx_1, bx_dx_2]);
	surf_foot_dx_3 = MAP(surf_foot_dx_3)(domain2D);

	var bx_dx_3 = BEZIER(S0)([[4, 0.6, 2.7], [4.5, 0.6, 0]]);
	var bx_dx_4 = BEZIER(S0)([[4, 0.6 +0.1, 2.7], [4.5, 0.6 +0.1, 0]]);
	var surf_foot_dx_4 = BEZIER(S1)([bx_dx_3, bx_dx_4]);
	surf_foot_dx_4 = MAP(surf_foot_dx_4)(domain2D);
	//
	var feet_front = STRUCT([foot_sx, foot_sx_2, surf_foot_sx_1, surf_foot_sx_2, surf_foot_sx_3, surf_foot_sx_4, 
		foot_dx, foot_dx_2, surf_foot_dx_1, surf_foot_dx_2, surf_foot_dx_3, surf_foot_dx_4 ])
	return COLOR(dark_grey)(feet_front);
}
//SOSTEGNO BACK
function getFeetBack(){
	var b1_sx = BEZIER(S0)([[-4.7, 5.5 -0.1, 0], [-4.5, 5.5 -0.15, 0]]);
	var b2_sx = BEZIER(S0)([[-4.5, 5.5 -0.1, 3], [-4, 5.5 -0.15, 2.7]]);
	var foot_sx_mapping = BEZIER(S1)([b1_sx, b2_sx]);
	var foot_sx = MAP(foot_sx_mapping)(domain2D);

	var b1_sx_2 = BEZIER(S0)([[-4.7, (5.5 -0.1) -0.1, 0], [-4.5, (5.5 -0.15) -0.1, 0]]);
	var b2_sx_2 = BEZIER(S0)([[-4.5, (5.5 -0.1) -0.1, 3], [-4, (5.5 -0.1) -0.1, 2.7]]);
	var foot_sx_mapping_2 = BEZIER(S1)([b1_sx_2, b2_sx_2]);
	var foot_sx_2 = MAP(foot_sx_mapping_2)(domain2D);

	var surf_foot_sx_1 = BEZIER(S1)([b1_sx, b1_sx_2]);
	surf_foot_sx_1 = MAP(surf_foot_sx_1)(domain2D);
	var surf_foot_sx_2 = BEZIER(S1)([b2_sx, b2_sx_2]);
	surf_foot_sx_2 = MAP(surf_foot_sx_2)(domain2D);

	var bx_1 = BEZIER(S0)([[-4.7, 5.5 -0.1, 0],[-4.5, 5.5 -0.1, 3]]);
	var bx_2 = BEZIER(S0)([[-4.7, (5.5 -0.1) -0.1, 0],[-4.5, (5.5 -0.1) -0.1, 3]]);
	var surf_foot_sx_3 = BEZIER(S1)([bx_1, bx_2]);
	surf_foot_sx_3 = MAP(surf_foot_sx_3)(domain2D);


	var bx_3 = BEZIER(S0)([[-4, 5.5 -0.15, 2.7],[-4, (5.5 -0.1) -0.1, 2.7]]);
	var bx_4 = BEZIER(S0)([[-4.5, 5.5 -0.15, 0],[-4.5, (5.5 -0.15) -0.1, 0]]);
	var surf_foot_sx_4 = BEZIER(S1)([bx_3, bx_4]);
	surf_foot_sx_4 = MAP(surf_foot_sx_4)(domain2D);
	
	//// 
	var b1_dx = BEZIER(S0)([[4.5, 5.5 -0.6, 0], [4.7, 5.5 -0.65, 0]]);
	var b2_dx = BEZIER(S0)([[4, 5.5 -0.6, 2.7], [4.5, 5.5 -0.65, 3]]);
	var foot_dx_mapping = BEZIER(S1)([b1_dx, b2_dx]);
	var foot_dx = MAP(foot_dx_mapping)(domain2D);

	var b1_dx_2 = BEZIER(S0)([[4.5, (5.5 -0.6) -0.1, 0], [4.7, (5.5 -0.65) -0.1, 0]]);
	var b2_dx_2 = BEZIER(S0)([[4, (5.5 -0.6) -0.1, 2.7], [4.5, (5.5 -0.65) -0.1, 3]]);
	var foot_dx_mapping_2 = BEZIER(S1)([b1_dx_2, b2_dx_2]);
	var foot_dx_2 = MAP(foot_dx_mapping_2)(domain2D);

	var surf_foot_dx_1 = BEZIER(S1)([b1_dx, b1_dx_2]);
	surf_foot_dx_1 = MAP(surf_foot_dx_1)(domain2D);
	var surf_foot_dx_2 = BEZIER(S1)([b2_dx, b2_dx_2]);
	surf_foot_dx_2 = MAP(surf_foot_dx_2)(domain2D);

	var bx_dx_1 = BEZIER(S0)([[4.7, 5.5-0.65, 0], [4.7, 5.5-0.65 -0.1, 0]]);
	var bx_dx_2 = BEZIER(S0)([[4.5, 5.5-0.65, 3], [4.5, 5.5-0.65 -0.1, 3]]);
	var surf_foot_dx_3 = BEZIER(S1)([bx_dx_1, bx_dx_2]);
	surf_foot_dx_3 = MAP(surf_foot_dx_3)(domain2D);

	var bx_dx_3 = BEZIER(S0)([[4, (5.5 -0.6) , 2.7], [4, 5.5 -0.6 -0.1, 2.7]]);
	var bx_dx_4 = BEZIER(S0)([[4.5, 5.5 -0.6, 0], [4.5, (5.5 -0.6) -0.1, 0]]);
	var surf_foot_dx_4 = BEZIER(S1)([bx_dx_3, bx_dx_4]);
	surf_foot_dx_4 = MAP(surf_foot_dx_4)(domain2D);

	var feet_back = STRUCT([foot_sx, foot_sx_2, surf_foot_sx_1, surf_foot_sx_2, surf_foot_sx_3, surf_foot_sx_4,
		foot_dx, foot_dx_2, surf_foot_dx_1, surf_foot_dx_2, surf_foot_dx_3, surf_foot_dx_4]);
	return COLOR(dark_grey)(feet_back);
}


function getTubeFront(){
	var b1 = BEZIER(S0)([[-7.75 +0.1, 0, 7], [-5, 0.2, 0.9], [0,0.4,0], [4, 0.6, 2.5], [4.5, 0.7, 3], [5.9 -0.1, 0.8, 3.5]]);
	//DRAW(MAP(b1)(INTERVALS(1)(30)));

	var b2 = BEZIER(S0)([[-7.75 +0.1, 0.1+0.1, 7], [-5, 0.3+0.1, 0.9], [0,0.5+0.1,0], [4, 0.7+0.1, 2.5], [4.5, 0.8+0.1, 3], [5.9 -0.1, 0.9+0.1, 3.5]]);
	//DRAW(MAP(b2)(INTERVALS(1)(30)));

	var b12 = BEZIER(S0)([[-7.75 +0.2, 0.05, 7+0.1+0.1], [-5, 0.1, 1 +0.1], [0,0.45,0.1+0.1], [4, 0.65, 2.6+0.1], [4.5, 0.75, 3.1+0.1], [5.9 -0.2, 0.85, 3.6+0.1]]);
	//DRAW(MAP(b12)(INTERVALS(1)(30)));

	var b21 = BEZIER(S0)([[-7.75 -0.1, 0.05, 7-0.1-0.1], [-5, 0.1, 0.8 -0.1], [0,0.45,-0.1 -0.1], [4, 0.65, 2.4-0.1], [4.5, 0.75, 2.9-0.1], [5.9, 0.85, 3.4-0.1]]);
	//DRAW(MAP(b21)(INTERVALS(1)(30)));

	var t1 = BEZIER(S1)([b1,b12,b2]);
	t1 = MAP(t1)(domain2D);
	var t2 = BEZIER(S1)([b1,b21,b2])
	t2 = MAP(t2)(domain2D);

	return STRUCT([t1, t2])
}

function getTubeBack(){
	var b1 = BEZIER(S0)([[-7.75 +0.1, 5.5, 7], [-5, 5.5-0.2, 0.9], [0, 5.5-0.4, 0], [4, 5.5-0.6, 2.5], [4.5, 5.5-0.7, 3], [5.9 -0.1, 5.5-0.8, 3.5]]);
	var b2 = BEZIER(S0)([[-7.75 +0.1, 5.5-0.1-0.1, 7], [-5, 5.5-0.3-0.1, 0.9], [0, 5.5-0.5-0.1, 0], [4, 5.5-0.7-0.1, 2.5], [4.5, 5.5-0.8-0.1, 3], [5.9 -0.1, 5.5-0.9-0.1, 3.5]]);
	var b12 = BEZIER(S0)([[-7.75 +0.2, 5.5-0.05, 7+0.1+0.1], [-5, 5.5-0.1, 1+0.1], [0, 5.5-0.45, 0.1+0.1], [4, 5.5-0.65, 2.6+0.1], [4.5, 5.5-0.75, 3.1+0.1], [5.9 -0.2, 5.5-0.85, 3.6+0.1]]);
	var b21 = BEZIER(S0)([[-7.75 -0.1, 5.5-0.05, 7-0.1-0.1], [-5, 5.5-0.1, 0.8-0.1], [0, 5.5-0.45, -0.1-0.1], [4, 5.5-0.65, 2.4-0.1], [4.5, 5.5-0.75, 2.9-0.1], [5.9, 5.5-0.85, 3.4-0.1]]);

	var t1 = BEZIER(S1)([b1,b12,b2]);
	t1 = MAP(t1)(domain2D);
	var t2 = BEZIER(S1)([b1,b21,b2])
	t2 = MAP(t2)(domain2D);

	return STRUCT([t1, t2])
}


function getTrasversalTubes(){
	//PRIMO
	var b11 = BEZIER(S0)([[2.25, 0.6, 2.01], [2.25, 5.5-0.6, 2.01]]);
	var b21 = BEZIER(S0)([[2.25+0.19, 0.6, 2.01], [2.25+0.19, 5.5-0.6, 2.01]]);
	var sur111 = CUBIC_HERMITE(S1)([b11,b21,[0,0,-0.38],[0,0,0.38]]);
	var out11 = MAP(sur111)(domain2D);
	var sur112 = CUBIC_HERMITE(S1)([b11,b21,[0,0,0.38],[0,0,-0.38]]);
	var out12 = MAP(sur112)(domain2D);
	var tube1 = STRUCT([out11, out12]);

	//SECONDO
	var b12 = BEZIER(S0)([[-3.5, 0.25, 2.39], [-3.5, 5.5-0.25, 2.39]]);
	var b22 = BEZIER(S0)([[-3.5-0.19, 0.25, 2.39], [-3.5-0.19, 5.5-0.25, 2.39]]);
	var sur112 = CUBIC_HERMITE(S1)([b12,b22,[0,0,-0.38],[0,0,0.38]]);
	var out12 = MAP(sur112)(domain2D);
	var sur212 = CUBIC_HERMITE(S1)([b12,b22,[0,0,0.38],[0,0,-0.38]]);
	var out22 = MAP(sur212)(domain2D);
	var tube2 = STRUCT([out12, out22]);

	//MICRO RACCORDO VERTICALE
	var br11 = BEZIER(S0)([[-0.1, 0.48 +0.04, 1.6], [-0.1, 0.48 +0.04, 2]]);
	var br21 = BEZIER(S0)([[0.1, 0.48+0.04, 1.6], [0.1, 0.48+0.04, 2]]);
	var sur_r11 = CUBIC_HERMITE(S1)([br11,br21,[0,-0.4,0],[0,0.4,0]]);
	var outr11 = MAP(sur_r11)(domain2D);
	var sur_r12 = CUBIC_HERMITE(S1)([br11,br21,[0,0.4,0],[0,-0.4,0]]);
	var outr12 = MAP(sur_r12)(domain2D);
	var r1 = STRUCT([outr11, outr12]);
	//
	var br12 = BEZIER(S0)([[-0.1, 5.5-0.48 -0.04, 1.6], [-0.1, 5.5-0.48 -0.04, 2]]);
	var br22 = BEZIER(S0)([[0.1, 5.5-0.48 -0.04, 1.6], [0.1, 5.5-0.48 -0.04, 2]]);
	var sur_r21 = CUBIC_HERMITE(S1)([br12,br22,[0,-0.4,0],[0,0.4,0]]);
	var outr21 = MAP(sur_r21)(domain2D);
	var sur_r22 = CUBIC_HERMITE(S1)([br12,br22,[0,0.4,0],[0,-0.4,0]]);
	var outr22 = MAP(sur_r22)(domain2D);
	var r2 = STRUCT([outr21, outr22]);

	return STRUCT([tube1, tube2, r1, r2]);
}

function getFullCylinder(r, h, dim){
	var cyl = CYL_SURFACE([r,h])(dim);
	var base = DISK(r)(dim);
	var base2 = T([2])([h])(base);
	var fullCylinder = STRUCT([cyl, base, base2]);
	return fullCylinder;
}

//tubi trasversali per i sostegni
function getTrasversalPillars(){
	var trasversalPillar1 = (getFullCylinder(0.15, 5.15, [32,4]));
	trasversalPillar1 = R([1,2])([PI/2])(trasversalPillar1);
	trasversalPillar1 = T([0,1,2])([-4.3, 5.3, 2.55])(trasversalPillar1);

	var trasversalPillar2 = (getFullCylinder(0.15, 4.1, [32,4]));
	trasversalPillar2 = R([1,2])([PI/2])(trasversalPillar2);
	trasversalPillar2 = T([0,1,2])([4.3, 4.8, 2.55])(trasversalPillar2);

	var trasversalPillars = STRUCT([trasversalPillar1, trasversalPillar2]);
	trasversalPillars = COLOR(dark_grey)(trasversalPillars);
	return trasversalPillars;
}

//altri tubi trasversali per i sostegni

function getOvalTrasversalPillars(){
	//ovalpill1
	var b11 = BEZIER(S0)([[0, 0, 0], [0, 0, 0.4]]);
	var b21 = BEZIER(S0)([[0.1, 0, 0], [0.1, 0, 0.4]]);
	var b31 = BEZIER(S0)([[0, 0, 0], [0.05, 0, -0.1], [0.1, 0, 0]]);
	var b41 = BEZIER(S0)([[0, 0, 0.4], [0.05, 0, 0.5], [0.1, 0, 0.4]]);

	var b12 = BEZIER(S0)([[0, 5.2, 0], [0, 5.2, 0.4]]);
	var b22 = BEZIER(S0)([[0.1, 5.2, 0], [0.1, 5.2, 0.4]]);
	var b32 = BEZIER(S0)([[0, 5.2, 0], [0.05, 5.2, -0.1], [0.1, 5.2, 0]]);
	var b42 = BEZIER(S0)([[0, 5.2, 0.4], [0.05, 5.2, 0.5], [0.1, 5.2, 0.4]]);

	var sur11 = BEZIER(S1)([b11, b12]);
	sur11 = MAP(sur11)(domain2D);
	var sur21 = BEZIER(S1)([b21, b22]);
	sur21 = MAP(sur21)(domain2D);
	var sur31 = BEZIER(S1)([b31, b32]);
	sur31 = MAP(sur31)(domain2D);
	var sur41 = BEZIER(S1)([b41, b42]);
	sur41 = MAP(sur41)(domain2D);

	var ovalPill1 = STRUCT([sur11, sur21, sur31, sur41]);
	ovalPill1 = R([0,2])([PI/20])(ovalPill1);
	ovalPill1 = T([0,1,2])([-4.6, 0.15, 0.4])(ovalPill1);
	
	//ovalpill2
	b11 = BEZIER(S0)([[0, 0, 0], [0, 0, 0.4]]);
	b21 = BEZIER(S0)([[0.1, 0, 0], [0.1, 0, 0.4]]);
	b31 = BEZIER(S0)([[0, 0, 0], [0.05, 0, -0.1], [0.1, 0, 0]]);
	b41 = BEZIER(S0)([[0, 0, 0.4], [0.05, 0, 0.5], [0.1, 0, 0.4]]);

	b12 = BEZIER(S0)([[0, 4.2, 0], [0, 4.2, 0.4]]);
	b22 = BEZIER(S0)([[0.1, 4.2, 0], [0.1, 4.2, 0.4]]);
	b32 = BEZIER(S0)([[0, 4.2, 0], [0.05, 4.2, -0.1], [0.1, 4.2, 0]]);
	b42 = BEZIER(S0)([[0, 4.2, 0.4], [0.05, 4.2, 0.5], [0.1, 4.2, 0.4]]);

	var sur12 = BEZIER(S1)([b11, b12]);
	sur12 = MAP(sur12)(domain2D);
	var sur22 = BEZIER(S1)([b21, b22]);
	sur22 = MAP(sur22)(domain2D);
	var sur32 = BEZIER(S1)([b31, b32]);
	sur32 = MAP(sur32)(domain2D);
	var sur42 = BEZIER(S1)([b41, b42]);
	sur42 = MAP(sur42)(domain2D);

	var ovalPill2 = STRUCT([sur12, sur22, sur32, sur42]);
	ovalPill2 = R([0,2])([-PI/20])(ovalPill2);
	ovalPill2 = T([0,1,2])([4.6-0.1, 0.65, 0.4])(ovalPill2);

	//ovalpill3
	b11 = BEZIER(S0)([[0, 0, 0], [0, 0.05, 0.4]]);
	b21 = BEZIER(S0)([[0.1, 0, 0], [0.1, 0.05, 0.4]]);
	b31 = BEZIER(S0)([[0, 0, 0], [0.05, 0, -0.1], [0.1, 0, 0]]);
	b41 = BEZIER(S0)([[0, 0.05, 0.4], [0.05, 0.05, 0.5], [0.1, 0.05, 0.4]]);

	b12 = BEZIER(S0)([[0, 9.1, 0], [0, 9.1-0.05, 0.4]]);
	b22 = BEZIER(S0)([[0.1, 9.1, 0], [0.1, 9.1-0.05, 0.4]]);
	b32 = BEZIER(S0)([[0, 9.1, 0], [0.05, 9.1, -0.1], [0.1, 9.1, 0]]);
	b42 = BEZIER(S0)([[0, 9.1-0.05, 0.4], [0.05, 9.1-0.05, 0.5], [0.1, 9.1-0.05, 0.4]]);
	
	var sur13 = BEZIER(S1)([b11, b12]);
	sur13 = MAP(sur13)(domain2D);
	var sur23 = BEZIER(S1)([b21, b22]);
	sur23 = MAP(sur23)(domain2D);
	var sur33 = BEZIER(S1)([b31, b32]);
	sur33 = MAP(sur33)(domain2D);
	var sur43 = BEZIER(S1)([b41, b42]);
	sur43= MAP(sur43)(domain2D);

	var ovalPill3 = STRUCT([sur13, sur23, sur33, sur43]);
	ovalPill3 = R([0,1])([PI/2])(ovalPill3);
	ovalPill3 = T([0,1,2])([4.55, 2.8 -0.05, 0.4])(ovalPill3);

	var model = STRUCT([ovalPill1, ovalPill2, ovalPill3]);
	return COLOR(dark_grey)(model);
}


function getUpperFrontalTubes(){
	//
	var b1 = BEZIER(S0)([[-8.3, 0, 6.35], [-7.5, 0, 7.6], [-6.3, 0.05, 7.4], [-6.4 , 0.1, 5.75]]);
	var b2 = BEZIER(S0)([[-6.4, 0.1, 5.75], [-6.3, 0.1, 5.7], [-0.1, 0.43, 2 +0.05]]);
	var b23 = BEZIER(S0)([[-0.1, 0.43, 2+0.05], [0, 0.43, 2], [0.1, 0.435, 2 +0.05]]);
	var b3 = BEZIER(S0)([[0.1, 0.435, 2 +0.05], [3.8, 0.6, 4.15]]);
	var b34 = BEZIER(S0)([[3.8, 0.6, 4.15], [3.9, 0.61, 4.2], [4, 0.62, 4.15]]);
	var b4 = BEZIER(S0)([[4, 0.62, 4.15], [5.9, 0.82, 3.5], [6.8, 0.85, 3.1]]);
	var b5 = BEZIER(S0)([[6.8, 0.85, 3.1], [6.9+0.1, 0.86, 3], [6.6 +0.1, 0.865, 2.3]]);

	//di fianco
	var b11 = BEZIER(S0)([[-8.3, 0.2, 6.35], [-7.5, 0.2, 7.6], [-6.3, 0.2+0.05, 7.4], [-6.4 , 0.2+0.1, 5.75]]);
	var b21 = BEZIER(S0)([[-6.4, 0.2+0.1, 5.75], [-6.3, 0.2+0.1, 5.7], [-0.1, 0.2+0.43, 2 +0.05]]);
	var b231 = BEZIER(S0)([[-0.1, 0.2+0.43, 2+0.05], [0, 0.2+0.43, 2], [0.1, 0.2+0.435, 2 +0.05]]);
	var b31 = BEZIER(S0)([[0.1, 0.2+0.435, 2 +0.05], [3.8, 0.2+0.6, 4.15]]);
	var b341 = BEZIER(S0)([[3.8, 0.2+0.6, 4.15], [3.9, 0.2+0.61, 4.2], [4, 0.2+0.62, 4.15]]);
	var b41 = BEZIER(S0)([[4, 0.2+0.62, 4.15], [5.9, 0.2+0.82, 3.5], [6.8, 0.2+0.85, 3.1]]);
	var b51 = BEZIER(S0)([[6.8, 0.2+0.85, 3.1], [6.9, 0.2+0.86, 3], [6.6, 0.2+0.865, 2.3]]);
	
	//sopra
	var b12 = BEZIER(S0)([[-8.3, 0.05, 6.35 +0.1 +0.2], [-7.5, 0.05, 7.6 +0.2], [-6.3 +0.1, 0.1, 7.4 +0.2], [-6.4 +0.2+0.1, 0.15, 5.75 /*+0.1*/]]);
	var b22 = BEZIER(S0)([[-6.4, 0.15, 5.75 +0.2], [-6.3, 0.15, 5.7 +0.2], [-0.1, 0.48, 2 +0.05 +0.2]]);
	var b232 = BEZIER(S0)([[-0.1, 0.48, 2+0.05 +0.2], [0, 0.48, 2 +0.2], [0.1, 0.475, 2 +0.05 +0.2]]);
	var b32 = BEZIER(S0)([[0.1, 0.475, 2 +0.05 +0.2], [3.8, 0.65, 4.15 +0.2]]);
	var b342 = BEZIER(S0)([[3.8, 0.65, 4.15 +0.2], [3.9, 0.655, 4.2 +0.2], [4, 0.66, 4.15 +0.2]]);
	var b42 = BEZIER(S0)([[4, 0.66, 4.15 +0.2], [5.9, 0.87, 3.5 +0.2], [6.8, 0.9, 3.1 +0.2]]);
	var b52 = BEZIER(S0)([[6.8, 0.9, 3.1 +0.2], [6.9+0.2+0.2, 0.91, 3 +0.2], [6.6+0.15+0.2, 0.915, 2.3 +0.2] ,[6.6 +0.05 +0.2, 0.915, 2.3 -0.1+0.1]]);
	
	//sotto
	var b13 = BEZIER(S0)([[-8.3, 0.05, 6.35 -0.2], [-7.5, 0.05, 7.6 -0.2], [-6.3 -0.1, 0.1, 7.4 -0.2], [-6.4 -0.1, 0.15, 5.75 -0.2]]);
	var b23_3 = BEZIER(S0)([[-6.4 -0.1, 0.15, 5.75 -0.2], [-6.3, 0.15, 5.7 -0.2], [-0.1, 0.48, 2 +0.05 -0.2]]);
	var b233 = BEZIER(S0)([[-0.1, 0.48, 2+0.05 -0.2], [0, 0.48, 2 -0.2], [0.1, 0.475, 2 +0.05 -0.2]]);
	var b33 = BEZIER(S0)([[0.1, 0.475, 2 +0.05 -0.2], [3.8, 0.65, 4.15 -0.2]]);
	var b343 = BEZIER(S0)([[3.8, 0.65, 4.15 -0.2], [3.9, 0.655, 4.2 -0.2], [4, 0.66, 4.15 -0.2]]);
	var b43 = BEZIER(S0)([[4, 0.66, 4.15 -0.2], [5.9, 0.87, 3.5 -0.2], [6.8, 0.9, 3.1 -0.2]]);
	var b53 = BEZIER(S0)([[6.8, 0.9, 3.1 -0.2], [6.9-0.1, 0.91, 3 -0.2], [6.6-0.1, 0.915, 2.3]]);

	var sur11 = BEZIER(S1)([b1, b12, b11]);
	sur11 = MAP(sur11)(domain2D);
	var sur21 = BEZIER(S1)([b2, b22, b21]);
	sur21 = MAP(sur21)(domain2D);
	var sur231 = BEZIER(S1)([b23, b232, b231]);
	sur231 = MAP(sur231)(domain2D);
	var sur31 = BEZIER(S1)([b3, b32, b31]);
	sur31 = MAP(sur31)(domain2D);
	var sur341 = BEZIER(S1)([b34, b342, b341]);
	sur341 = MAP(sur341)(domain2D);
	var sur41 = BEZIER(S1)([b4, b42, b41]);
	sur41 = MAP(sur41)(domain2D);
	var sur51 = BEZIER(S1)([b5, b52, b51]);
	sur51 = MAP(sur51)(domain2D);
	//
	var sur12 = BEZIER(S1)([b1, b13, b11]);
	sur12 = MAP(sur12)(domain2D);
	var sur22 = BEZIER(S1)([b2, b23_3, b21]);
	sur22 = MAP(sur22)(domain2D);
	var sur232 = BEZIER(S1)([b23, b233, b231]);
	sur232 = MAP(sur232)(domain2D);
	var sur32 = BEZIER(S1)([b3, b33, b31]);
	sur32 = MAP(sur32)(domain2D);
	var sur342 = BEZIER(S1)([b34, b343, b341]);
	sur342 = MAP(sur342)(domain2D);
	var sur42 = BEZIER(S1)([b4, b43, b41]);
	sur42 = MAP(sur42)(domain2D);
	var sur52 = BEZIER(S1)([b5, b53, b51]);
	sur52 = MAP(sur52)(domain2D);

	var tubeUpperFront = STRUCT([sur11, sur21, sur231, sur31, sur341, sur41, sur51,
		sur12, sur22, sur232, sur32, sur342, sur42, sur52]);
	return tubeUpperFront;

}

function getUpperBackTubes(){
	var b1 = BEZIER(S0)([[-8.3, 5.5, 6.35], [-7.5, 5.5, 7.6], [-6.3, 5.5-0.05, 7.4], [-6.4, 5.5-0.1, 5.75]]);
	var b2 = BEZIER(S0)([[-6.4, 5.5-0.1, 5.75], [-6.3, 5.5-0.1, 5.7], [-0.1, 5.5-0.43, 2 +0.05]]);
	var b23 = BEZIER(S0)([[-0.1, 5.5-0.43, 2+0.05], [0, 5.5-0.43, 2], [0.1, 5.5-0.435, 2 +0.05]]);
	var b3 = BEZIER(S0)([[0.1, 5.5-0.435, 2 +0.05], [3.8, 5.5-0.6, 4.15]]);
	var b34 = BEZIER(S0)([[3.8, 5.5-0.6, 4.15], [3.9, 5.5-0.61, 4.18], [4, 5.5-0.62, 4.15]]);
	var b4 = BEZIER(S0)([[4, 5.5-0.62, 4.15], [5.9, 5.5-0.82, 3.5], [6.8, 5.5-0.85, 3.1]]);
	var b5 = BEZIER(S0)([[6.8, 5.5-0.85, 3.1], [6.9 +0.1, 5.5-0.86, 3], [6.6 +0.1, 5.5-0.865, 2.3]]);

	//di fianco
	var b11 = BEZIER(S0)([[-8.3, 5.5-0.2, 6.35], [-7.5, 5.5-0.2, 7.6], [-6.3, 5.5-0.05-0.2, 7.4], [-6.4, 5.5-0.1-0.2, 5.75]]);
	var b21 = BEZIER(S0)([[-6.4, 5.5-0.1-0.2, 5.75], [-6.3, 5.5-0.1-0.2, 5.7], [-0.1, 5.5-0.43-0.2, 2 +0.05]]);
	var b231 = BEZIER(S0)([[-0.1, 5.5-0.43-0.2, 2+0.05], [0, 5.5-0.43-0.2, 2], [0.1, 5.5-0.435-0.2, 2 +0.05]]);
	var b31 = BEZIER(S0)([[0.1, 5.5-0.435-0.2, 2 +0.05], [3.8, 5.5-0.6-0.2, 4.15]]);
	var b341 = BEZIER(S0)([[3.8, 5.5-0.6-0.2, 4.15], [3.9, 5.5-0.61-0.2, 4.18], [4, 5.5-0.62-0.2, 4.15]]);
	var b41 = BEZIER(S0)([[4, 5.5-0.62-0.2, 4.15], [5.9, 5.5-0.82-0.2, 3.5], [6.8, 5.5-0.85-0.2, 3.1]]);
	var b51 = BEZIER(S0)([[6.8, 5.5-0.85-0.2, 3.1], [6.9 +0.1, 5.5-0.86-0.2, 3], [6.6 +0.1, 5.5-0.865-0.2, 2.3]]);
	
	//sopra
	var b12 = BEZIER(S0)([[-8.3, 5.5-0.05, 6.35 +0.1 +0.2], [-7.5, 5.5-0.05, 7.6 +0.2], [-6.3+0.1, 5.5-0.1, 7.4 +0.2], [-6.4 +0.2+0.1, 5.5-0.15, 5.75]]);
	var b22 = BEZIER(S0)([[-6.4, 5.5-0.15, 5.75 +0.2], [-6.3, 5.5-0.15, 5.7 +0.2], [-0.1, 5.02, 2 +0.05 +0.2]]);
	var b232 = BEZIER(S0)([[-0.1, 5.02, 2+0.05 +0.2], [0, 5.02, 2 +0.2], [0.1, 5.015, 2 +0.05 +0.2]]);
	var b32 = BEZIER(S0)([[0.1, 5.015, 2 +0.05 +0.2], [3.8, 5.5-0.65, 4.15 +0.2]]);
	var b342 = BEZIER(S0)([[3.8, 5.5-0.65, 4.15 +0.2], [3.9, 5.5-0.655, 4.18 +0.2], [4, 5.5-0.66, 4.15 +0.2]]);
	var b42 = BEZIER(S0)([[4, 5.5-0.66, 4.15 +0.2], [5.9, 4.63, 3.5 +0.2], [6.8, 4.6, 3.1 +0.2]]);
	var b52 = BEZIER(S0)([[6.8, 4.6, 3.1 +0.2], [6.9+0.2 +0.2, 4.59, 3 +0.2], [6.6+0.15 +0.2, 4.585, 2.3 +0.2] ,[6.6 +0.05 +0.2, 4.585, 2.3 -0.1 +0.1]]);

	//sotto
	var b13 = BEZIER(S0)([[-8.3, 5.5-0.05, 6.35 -0.2], [-7.5, 5.5-0.05, 7.6 -0.2], [-6.3-0.1, 5.5-0.1, 7.4 -0.2], [-6.4 -0.1, 5.5-0.15, 5.75 -0.2]]);
	var b23_3 = BEZIER(S0)([[-6.4 -0.1, 5.5-0.15, 5.75 -0.2], [-6.3, 5.5-0.15, 5.7 -0.2], [-0.1, 5.02, 2 +0.05 -0.2]]);
	var b233 = BEZIER(S0)([[-0.1, 5.02, 2+0.05 -0.2], [0, 5.02, 2 -0.2], [0.1, 5.015, 2 +0.05 -0.2]]);
	var b33 = BEZIER(S0)([[0.1, 5.015, 2 +0.05 -0.2], [3.8, 5.5-0.65, 4.15 -0.2]]);
	var b343 = BEZIER(S0)([[3.8, 5.5-0.65, 4.15 -0.2], [3.9, 5.5-0.655, 4.18 -0.2], [4, 5.5-0.66, 4.15 -0.2]]);
	var b43 = BEZIER(S0)([[4, 5.5-0.66, 4.15 -0.2], [5.9, 4.63, 3.5 -0.2], [6.8, 4.6, 3.1 -0.2]]);
	var b53 = BEZIER(S0)([[6.8, 4.6, 3.1 -0.2], [6.9-0.1, 4.59, 3 -0.2], [6.6-0.1, 4.585, 2.3]]);

	var sur11 = BEZIER(S1)([b1, b12, b11]);
	sur11 = MAP(sur11)(domain2D);
	var sur21 = BEZIER(S1)([b2, b22, b21]);
	sur21 = MAP(sur21)(domain2D);
	var sur231 = BEZIER(S1)([b23, b232, b231]);
	sur231 = MAP(sur231)(domain2D);
	var sur31 = BEZIER(S1)([b3, b32, b31]);
	sur31 = MAP(sur31)(domain2D);
	var sur341 = BEZIER(S1)([b34, b342, b341]);
	sur341 = MAP(sur341)(domain2D);
	var sur41 = BEZIER(S1)([b4, b42, b41]);
	sur41 = MAP(sur41)(domain2D);
	var sur51 = BEZIER(S1)([b5, b52, b51]);
	sur51 = MAP(sur51)(domain2D);
	
	//
	var sur12 = BEZIER(S1)([b1, b13, b11]);
	sur12 = MAP(sur12)(domain2D);
	var sur22 = BEZIER(S1)([b2, b23_3, b21]);
	sur22 = MAP(sur22)(domain2D);
	var sur232 = BEZIER(S1)([b23, b233, b231]);
	sur232 = MAP(sur232)(domain2D);
	var sur32 = BEZIER(S1)([b3, b33, b31]);
	sur32 = MAP(sur32)(domain2D);
	var sur342 = BEZIER(S1)([b34, b343, b341]);
	sur342 = MAP(sur342)(domain2D);
	var sur42 = BEZIER(S1)([b4, b43, b41]);
	sur42 = MAP(sur42)(domain2D);
	var sur52 = BEZIER(S1)([b5, b53, b51]);
	sur52 = MAP(sur52)(domain2D);
	
	var tubeUpperBack = STRUCT([sur11, sur21, sur231, sur31, sur341, sur41, sur51,
		sur12, sur22, sur232, sur32, sur342, sur42, sur52]);
	return tubeUpperBack;
}

function trasversalUpperTube_1() {
	var b1 = BEZIER(S0)([[-8.3, 5.5-0.2, 6.35],[-8.5, 5.5-0.22, 6], [-8.5, 5.4-0.5, 6]]);
	var b2 = BEZIER(S0)([[-8.3, 5.5, 6.35],[-8.7, 5.45, 6], [-8.7, 5.4-0.5, 6]]);
	var b12 = BEZIER(S0)([[-8.3, 5.5-0.05, 6.35 +0.1 +0.2],[-8.6, 5.5-0.05, 6], [-8.6, 5.4-0.5, 6 +0.2]]);
	var b13 = BEZIER(S0)([[-8.3, 5.5-0.05, 6.35 -0.2],[-8.6, 5.5-0.05, 5.8], [-8.6, 5.4-0.5, 6-0.2]]);
	var sur11 = BEZIER(S1)([b1, b12, b2]);
	sur11 = MAP(sur11)(domain2D);
	var sur12 = BEZIER(S1)([b1, b13, b2]);
	sur12 = MAP(sur12)(domain2D);
	var r1 = STRUCT([sur11, sur12]);

	var b11 = BEZIER(S0)([[-8.3, 0.2, 6.35], [-8.5, 0.22, 6], [-8.5, 0.6, 6]]);
	var b12 = BEZIER(S0)([[-8.3, 0, 6.35], [-8.7, 0.05, 6], [-8.7, 0.6, 6]]);
	var b112 = BEZIER(S0)([[-8.3, 0.05, 6.35 +0.1 +0.2], [-8.6, 0.05, 6], [-8.6, 0.6, 6+0.2]]);
	var b113 = BEZIER(S0)([[-8.3, 0.05, 6.35 -0.2], [-8.6, 0.05, 5.8], [-8.6, 0.6, 6-0.2]]);
	var sur21 = BEZIER(S1)([b11, b112, b12]);
	sur21 = MAP(sur21)(domain2D);
	var sur22 = BEZIER(S1)([b11, b113, b12]);
	sur22 = MAP(sur22)(domain2D);
	var r2 = STRUCT([sur21, sur22]);

	var bx1 = BEZIER(S0)([[-8.5, 5.4-0.5, 6], [-8.5, 0.6, 6]]);
	var bx2 = BEZIER(S0)([[-8.7, 5.4-0.5, 6], [-8.7, 0.6, 6]]);
	var bx3 = BEZIER(S0)([[-8.6, 5.4-0.5, 6 +0.2], [-8.6, 0.6, 6+0.2]]);
	var bx4 = BEZIER(S0)([[-8.6, 5.4-0.5, 6-0.2], [-8.6, 0.6, 6-0.2]]);
	var surx1 = BEZIER(S1)([bx1,bx3,bx2]);
	surx1 = MAP(surx1)(domain2D);
	var surx2 = BEZIER(S1)([bx1,bx4,bx2]);
	surx2 = MAP(surx2)(domain2D);
	var rx = STRUCT([surx1, surx2]);

	return STRUCT([r1,r2,rx]);
}

function trasversalUpperTube_2() {
	//back
	var b1 = BEZIER(S0)([[6.6 +0.1, 5.5-0.865, 2.3],[6.5, 5.5-0.865-0.1, 1.9], [6.5, 5.5-0.865-0.5, 1.9]]);
	var b2 = BEZIER(S0)([[6.6 +0.1, 5.5-0.865-0.2, 2.3],[6.5, 5.5-0.865-0.3, 2.1], [6.5, 5.5-0.865-0.5, 2.1]]);
	var b12 = BEZIER(S0)([[6.6 +0.05 +0.2, 4.585, 2.3 -0.1 +0.1], [6.7,5.5-0.865-0.3,2], [6.7, 5.5-0.865-0.5, 2]]);
	var b13 = BEZIER(S0)([[6.6-0.1, 4.585, 2.3], [6.3, 5.5-0.865-0.3,2], [6.3, 5.5-0.865-0.5, 2]]);
	var sur11 = BEZIER(S1)([b1, b12, b2]);
	sur11 = MAP(sur11)(domain2D);
	var sur12 = BEZIER(S1)([b1, b13, b2]);
	sur12 = MAP(sur12)(domain2D);
	var r1 = STRUCT([sur11, sur12]);

	var b11 = BEZIER(S0)([[6.6 +0.1, 0.865, 2.3],[6.5, 0.865 +0.1, 1.9], [6.5, 0.865+0.5, 1.9]]);
	var b12 = BEZIER(S0)([[6.6, 0.2+0.865, 2.3],[6.5, 0.865+0.3, 2.1], [6.5, 0.865+0.5, 2.1]]);
	var b112 = BEZIER(S0)([[6.6 +0.2 +0.05, 0.915, 2.3], [6.7,  0.865+0.3, 2], [6.7, 0.865+0.5, 2]]);
	var b113 = BEZIER(S0)([[6.6-0.1, 0.915, 2.3],[6.3, 0.865+0.3, 2], [6.3, 0.865+0.5, 2]]);
	var sur21 = BEZIER(S1)([b11, b112, b12]);
	sur21 = MAP(sur21)(domain2D);
	var sur22 = BEZIER(S1)([b11, b113, b12]);
	sur22 = MAP(sur22)(domain2D);
	var r2 = STRUCT([sur21, sur22]);

	var bx1 = BEZIER(S0)([[6.5, 5.5-0.865-0.5, 1.9], [6.5, 0.865+0.5, 1.9]]);
	var bx2 = BEZIER(S0)([[6.5, 5.5-0.865-0.5, 2.1], [6.5, 0.865+0.5, 2.1]]);
	var bx3 = BEZIER(S0)([[6.7, 5.5-0.865-0.5, 2], [6.7, 0.865+0.5, 2]]);
	var bx4 = BEZIER(S0)([[6.3, 5.5-0.865-0.5, 2], [6.3, 0.865+0.5, 2]]);
	var surx1 = BEZIER(S1)([bx1,bx3,bx2]);
	surx1 = MAP(surx1)(domain2D);
	var surx2 = BEZIER(S1)([bx1,bx4,bx2]);
	surx2 = MAP(surx2)(domain2D);
	var rx = STRUCT([surx1, surx2]);

	return STRUCT([r1,r2,rx]);
}


function curves_union( curves ){
	function isin( u, a, b ){
		return (u >= a && u < b) ;
	}
	function aux0( domains ){
		function aux1(u){
			n = curves.length
			i = 0
			j = 0
			k = 0
			while ( i < n ){
				k += domains[i][1] - domains[i][0]
				i += 1
			}
			i = 0;
			while ( i < n && !(isin(u[0] * k, j, j + domains[i][1] - domains[i][0])) ){
				j += domains[i][1] - domains[i][0]
				i += 1
			}

			if ( i < n )
				return curves[i]([ domains[i][0] + u[0] * k - j ])
			else
				return curves[n-1]([ domains[n-1][1] ])
		}
		return aux1;
	}
	return aux0;
}

function getTable() {
	//sotto, base
	var curves_base_1 = [];
	var curves_base_2 = [];

	var bx1 = BEZIER(S0)([[-8.3, 0.2, 6.35], [-7.5, 0.2, 7.6], [-6.3, 0.2+0.05, 7.4], [-6.4 , 0.2+0.1, 5.75]]);
	curves_base_1.push(bx1);
	var bx2 = BEZIER(S0)([[-8.3, 5.5-0.2, 6.35], [-7.5, 5.5-0.2, 7.6], [-6.3, 5.5-0.05-0.2, 7.4], [-6.4, 5.5-0.1-0.2, 5.75]]);
	curves_base_2.push(bx2);

	bx1 = BEZIER(S0)([[-6.4, 0.2+0.1, 5.75], [-6.3, 0.2+0.1, 5.7], [-0.1, 0.2+0.43, 2 +0.05]]);
	curves_base_1.push(bx1);
	bx2 = BEZIER(S0)([[-6.4, 5.5-0.1-0.2, 5.75], [-6.3, 5.5-0.1-0.2, 5.7], [-0.1, 5.5-0.43-0.2, 2 +0.05]]);
	curves_base_2.push(bx2);

	bx1 = BEZIER(S0)([[-0.1, 0.2+0.43, 2+0.05], [0, 0.2+0.43, 2], [0.1, 0.2+0.435, 2 +0.05]]);
	curves_base_1.push(bx1);
	bx2 = BEZIER(S0)([[-0.1, 5.5-0.43-0.2, 2+0.05], [0, 5.5-0.43-0.2, 2], [0.1, 5.5-0.435-0.2, 2 +0.05]]);
	curves_base_2.push(bx2);

	bx1 = BEZIER(S0)([[0.1, 0.2+0.435, 2 +0.05], [3.8, 0.2+0.6, 4.15]]);
	curves_base_1.push(bx1);
	bx2 = BEZIER(S0)([[0.1, 5.5-0.435-0.2, 2 +0.05], [3.8, 5.5-0.6-0.2, 4.15]]);
	curves_base_2.push(bx2);

	bx1 = BEZIER(S0)([[3.8, 0.2+0.6, 4.15], [3.9, 0.2+0.61, 4.2], [4, 0.2+0.62, 4.15]]);
	curves_base_1.push(bx1);
	bx2 = BEZIER(S0)([[3.8, 5.5-0.6-0.2, 4.15], [3.9, 5.5-0.61-0.2, 4.18], [4, 5.5-0.62-0.2, 4.15]]);
	curves_base_2.push(bx2);

	bx1 = BEZIER(S0)([[4, 0.2+0.62, 4.15], [5.9, 0.2+0.82, 3.5], [6.8, 0.2+0.85, 3.1]]);
	curves_base_1.push(bx1);
	bx2 = BEZIER(S0)([[4, 5.5-0.62-0.2, 4.15], [5.9, 5.5-0.82-0.2, 3.5], [6.8, 5.5-0.85-0.2, 3.1]]);
	curves_base_2.push(bx2);

	curves_base_1 = curves_union(curves_base_1)([ [0, 1], [0, 1], [0, 1], [0, 1], [0, 1], [0, 1] ]);
	curves_base_2 = curves_union(curves_base_2)([ [0, 1], [0, 1], [0, 1], [0, 1], [0, 1], [0, 1] ]);
	var s_base_mapping = BEZIER(S1)([curves_base_1, curves_base_2]);
	s_base = MAP(s_base_mapping)(DOMAIN([[0,1],[0,1]])([120,120]));

	//sopra
	delta  = 0.4
	var curves_top_1 = [];
	var curves_top_2 = [];

	var bx1 = BEZIER(S0)([[-8.3, 0.2, 6.35+delta], [-7.5, 0.2, 7.6+delta], [-6, 0.2+0.05, 7.4], [-6.1 , 0.2+0.1, 5.75+delta -0.4]]);
	curves_top_1.push(bx1);
	var bx2 = BEZIER(S0)([[-8.3, 5.5-0.2, 6.35+delta], [-7.5, 5.5-0.2, 7.6+delta], [-6, 5.5-0.05-0.2, 7.4], [-6.1, 5.5-0.1-0.2, 5.75+delta -0.4]]);
	curves_top_2.push(bx2);

	bx1 = BEZIER(S0)([[-6.4, 0.2+0.1, 5.75+delta], [-6.3, 0.2+0.1, 5.7+delta], [-0.1, 0.2+0.43, 2 +0.05+delta]]);
	curves_top_1.push(bx1);
	bx2 = BEZIER(S0)([[-6.4, 5.5-0.1-0.2, 5.75+delta], [-6.3, 5.5-0.1-0.2, 5.7+delta], [-0.1, 5.5-0.43-0.2, 2 +0.05+delta]]);
	curves_top_2.push(bx2);

	bx1 = BEZIER(S0)([[-0.1, 0.2+0.43, 2+0.05+delta], [0, 0.2+0.43, 2+delta], [0.1, 0.2+0.435, 2 +0.05+delta]]);
	curves_top_1.push(bx1);
	bx2 = BEZIER(S0)([[-0.1, 5.5-0.43-0.2, 2+0.05+delta], [0, 5.5-0.43-0.2, 2+delta], [0.1, 5.5-0.435-0.2, 2 +0.05+delta]]);
	curves_top_2.push(bx2);

	bx1 = BEZIER(S0)([[0.1, 0.2+0.435, 2 +0.05+delta], [3.8, 0.2+0.6, 4.15+delta]]);
	curves_top_1.push(bx1);
	bx2 = BEZIER(S0)([[0.1, 5.5-0.435-0.2, 2 +0.05+delta], [3.8, 5.5-0.6-0.2, 4.15+delta]]);
	curves_top_2.push(bx2);

	bx1 = BEZIER(S0)([[3.8, 0.2+0.6, 4.15+delta], [3.9, 0.2+0.61, 4.2+delta], [4, 0.2+0.62, 4.15+delta]]);
	curves_top_1.push(bx1);
	bx2 = BEZIER(S0)([[3.8, 5.5-0.6-0.2, 4.15+delta], [3.9, 5.5-0.61-0.2, 4.18+delta], [4, 5.5-0.62-0.2, 4.15+delta]]);
	curves_top_2.push(bx2);

	bx1 = BEZIER(S0)([[4, 0.2+0.62, 4.15+delta], [5.9, 0.2+0.82, 3.5+delta], [6.8+0.1, 0.2+0.85, 3.1+delta]]);
	curves_top_1.push(bx1);
	bx2 = BEZIER(S0)([[4, 5.5-0.62-0.2, 4.15+delta], [5.9, 5.5-0.82-0.2, 3.5+delta], [6.8+0.1, 5.5-0.85-0.2, 3.1+delta]]);
	curves_top_2.push(bx2);

	curves_top_1 = curves_union(curves_top_1)([ [0, 1], [0, 1], [0, 1], [0, 1], [0, 1], [0, 1] ]);
	curves_top_2 = curves_union(curves_top_2)([ [0, 1], [0, 1], [0, 1], [0, 1], [0, 1], [0, 1] ]);
	var s_top_mapping = BEZIER(S1)([curves_top_1, curves_top_2]);
	s_top = MAP(s_top_mapping)(DOMAIN([[0,1],[0,1]])([120,120]));

	//bordi
	bx1 = BEZIER(S0)([[-8.3, 0.2, 6.35], [-7.5, 0.2, 7.6], [-6.3, 0.2+0.05, 7.4], [-6.4 , 0.2+0.1, 5.75]]);
	bx12 = BEZIER(S0)([[-8.3, 0.2, 6.35 +(delta/2)], [-7.5, 0, 7.6+(delta/2)], [-6, 0+0.05, 7.3], [-6.3, 0+0.1, 5.75+0.1]]);
	bx2 = BEZIER(S0)([[-8.3, 0.2, 6.35+delta], [-7.5, 0.2, 7.6+delta], [-6, 0.2+0.05, 7.4], [-6.1 , 0.2+0.1, 5.75+delta -0.2]]);
	var s31_1 = BEZIER(S1)([bx1, bx12, bx2]);
	s31_1 = MAP(s31_1)(domain2D);

	bx1 = BEZIER(S0)([[-8.3, 5.5-0.2, 6.35], [-7.5, 5.5-0.2, 7.6], [-6.3, 5.5-0.05-0.2, 7.4], [-6.4, 5.5-0.1-0.2, 5.75]]);
	bx12 = BEZIER(S0)([[-8.3, 5.5-0.2, 6.35 +(delta/2)], [-7.5, 5.5, 7.6+(delta/2)], [-6, 5.5-0.05, 7.3], [-6.3, 5.5-0.1, 5.75+0.1]]);
	bx2 = BEZIER(S0)([[-8.3, 5.5-0.2, 6.35+delta], [-7.5, 5.5-0.2, 7.6+delta], [-6, 5.5-0.05-0.2, 7.4], [-6.1, 5.5-0.1-0.2, 5.75+delta -0.2]]);
	var s31_2 = BEZIER(S1)([bx1, bx12, bx2]);
	s31_2 = MAP(s31_2)(domain2D);

	bx1 = BEZIER(S0)([[-6.4, 0.2+0.1, 5.75], [-6.3, 0.2+0.1, 5.7], [-0.1, 0.2+0.43, 2 +0.05]]);
	bx12 = BEZIER(S0)([[-6.4, 0.2+0.1-0.2, 5.75+(delta/2)], [-6.3, 0.2+0.1-0.2, 5.7+(delta/2)], [-0.1, 0.2+0.43-0.2, 2 +0.05+(delta/2)]]);
	bx2 = BEZIER(S0)([[-6.4, 0.2+0.1, 5.75+delta], [-6.3, 0.2+0.1, 5.7+delta], [-0.1, 0.2+0.43, 2 +0.05+delta]]);
	var s32_1 = BEZIER(S1)([bx1, bx12, bx2]);
	s32_1 = MAP(s32_1)(domain2D);

	bx1 = BEZIER(S0)([[-6.4, 5.5-0.2-0.1, 5.75], [-6.3, 5.5-0.2-0.1, 5.7], [-0.1, 5.5-0.43-0.2, 2 +0.05]]);
	bx12 = BEZIER(S0)([[-6.4, 5.5-0.2-0.1+0.2, 5.75+(delta/2)], [-6.3, 5.5-0.2-0.1+0.2, 5.7+(delta/2)], [-0.1, 5.5-0.2-0.43+0.2, 2 +0.05+(delta/2)]]);
	bx2 = BEZIER(S0)([[-6.4, 5.5-0.2-0.1, 5.75+delta], [-6.3, 5.5-0.1-0.2, 5.7+delta], [-0.1, 5.5-0.43-0.2, 2 +0.05+delta]]);
	var s32_2 = BEZIER(S1)([bx1, bx12, bx2]);
	s32_2 = MAP(s32_2)(domain2D);

	bx1 = BEZIER(S0)([[-0.1, 0.2+0.43, 2+0.05], [0, 0.2+0.43, 2], [0.1, 0.2+0.435, 2 +0.05]]);
	bx12 = BEZIER(S0)([[-0.1, 0.2+0.43-0.2, 2+0.05+(delta/2)], [0, 0.2+0.43-0.2, 2+0.05+(delta/2)], [0.1, 0.2+0.435-0.2, 2+0.05+(delta/2)]]);
	bx2 = BEZIER(S0)([[-0.1, 0.2+0.43, 2+0.05+delta], [0, 0.2+0.43, 2+delta], [0.1, 0.2+0.435, 2 +0.05+delta]]);
	var s33_1 = BEZIER(S1)([bx1, bx12, bx2]);
	s33_1 = MAP(s33_1)(domain2D);

	bx1 = BEZIER(S0)([[-0.1, 5.5-0.2-0.43, 2+0.05], [0, 5.5-0.2-0.43, 2], [0.1, 5.5-0.2-0.435, 2 +0.05]]);
	bx12 = BEZIER(S0)([[-0.1, 5.5-0.2-0.43+0.2, 2+0.05+(delta/2)], [0, 5.5-0.2-0.43+0.2, 2+0.05+(delta/2)], [0.1, 5.5-0.2-0.435+0.2, 2+0.05+(delta/2)]]);
	bx2 = BEZIER(S0)([[-0.1, 5.5-0.2-0.43, 2+0.05+delta], [0, 5.5-0.2-0.43, 2+delta], [0.1, 5.5-0.2-0.435, 2 +0.05+delta]]);
	var s33_2 = BEZIER(S1)([bx1, bx12, bx2]);
	s33_2 = MAP(s33_2)(domain2D);

	bx1 = BEZIER(S0)([[0.1, 0.2+0.435, 2 +0.05], [3.8, 0.2+0.6, 4.15]]);
	bx12 = BEZIER(S0)([[0.1, 0.2+0.435-0.2, 2 +0.05+(delta/2)], [3.8, 0.2+0.6-0.2, 4.15+(delta/2)]]);
	bx2 = BEZIER(S0)([[0.1, 0.2+0.435, 2 +0.05+delta], [3.8, 0.2+0.6, 4.15+delta]]);
	var s34_1 = BEZIER(S1)([bx1, bx12, bx2]);
	s34_1 = MAP(s34_1)(domain2D);

	bx1 = BEZIER(S0)([[0.1, 5.5-0.435-0.2, 2 +0.05], [3.8, 5.5-0.6-0.2, 4.15]]);
	bx12 = BEZIER(S0)([[0.1, 5.5-0.435-0.2+0.2, 2 +0.05+(delta/2)], [3.8, 5.5-0.6-0.2+0.2, 4.15+(delta/2)]]);
	bx2 = BEZIER(S0)([[0.1, 5.5-0.435-0.2, 2 +0.05+delta], [3.8, 5.5-0.6-0.2, 4.15+delta]]);
	var s34_2 = BEZIER(S1)([bx1, bx12, bx2]);
	s34_2 = MAP(s34_2)(domain2D);

	bx1 = BEZIER(S0)([[3.8, 0.2+0.6, 4.15], [3.9, 0.2+0.61, 4.2], [4, 0.2+0.62, 4.15]]);
	bx12 = BEZIER(S0)([[3.8, 0.2+0.6-0.2, 4.15+(delta/2)], [3.9, 0.2+0.61-0.2, 4.2+(delta/2)], [4, 0.2+0.62-0.2, 4.15+(delta/2)]]);
	bx2 = BEZIER(S0)([[3.8, 0.2+0.6, 4.15+delta], [3.9, 0.2+0.61, 4.2+delta], [4, 0.2+0.62, 4.15+delta]]);
	var s35_1 = BEZIER(S1)([bx1, bx12, bx2]);
	s35_1 = MAP(s35_1)(domain2D);

	bx1 = BEZIER(S0)([[3.8, 5.5-0.6-0.2, 4.15], [3.9, 5.5-0.61-0.2, 4.2], [4, 5.5-0.62-0.2, 4.15]]);
	bx12 = BEZIER(S0)([[3.8, 5.5-0.6-0.2+0.2, 4.15+(delta/2)], [3.9, 5.5-0.61-0.2+0.2, 4.2+(delta/2)], [4, 5.5-0.62-0.2+0.2, 4.15+(delta/2)]]);
	bx2 = BEZIER(S0)([[3.8, 5.5-0.6-0.2, 4.15+delta], [3.9, 5.5-0.61-0.2, 4.2+delta], [4, 5.5-0.62-0.2, 4.15+delta]]);
	var s35_2 = BEZIER(S1)([bx1, bx12, bx2]);
	s35_2 = MAP(s35_2)(domain2D);

	bx1 = BEZIER(S0)([[4, 0.2+0.62, 4.15], [5.9, 0.2+0.82, 3.5], [6.8, 0.2+0.85, 3.1]]);
	bx12 = BEZIER(S0)([[4, 0.2+0.62 -0.2, 4.15+(delta/2)], [5.9, 0.2+0.82-0.2, 3.5+(delta/2)], [6.8 +0.1, 0.2+0.85, 3.1+(delta/2)]]);
	bx2 = BEZIER(S0)([[4, 0.2+0.62, 4.15+delta], [5.9, 0.2+0.82, 3.5+delta], [6.8 +0.1, 0.2+0.85, 3.1+delta]]);
	var s36_1 = BEZIER(S1)([bx1, bx12, bx2]);
	s36_1 = MAP(s36_1)(domain2D);

	bx1 = BEZIER(S0)([[4, 5.5-0.62-0.2, 4.15], [5.9, 5.5-0.82-0.2, 3.5], [6.8, 5.5-0.85-0.2, 3.1]]);
	bx12 = BEZIER(S0)([[4, 5.5-0.62-0.2 +0.2, 4.15+(delta/2)], [5.9, 5.5-0.82-0.2 +0.2, 3.5+(delta/2)], [6.8 +0.1, 5.5-0.85-0.2, 3.1+(delta/2)]]);
	bx2 = BEZIER(S0)([[4, 5.5-0.62-0.2, 4.15+delta], [5.9, 5.5-0.82-0.2, 3.5+delta], [6.8 +0.1, 5.5-0.85-0.2, 3.1+delta]]);
	var s36_2 = BEZIER(S1)([bx1, bx12, bx2]);
	s36_2 = MAP(s36_2)(domain2D);

	//bordi2
	bx1 = BEZIER(S0)([[6.8, 0.2+0.85, 3.1], [6.8, 5.5-0.85-0.2, 3.1]]);
	bx12 = BEZIER(S0)([[6.8 +0.05, 0.2+0.85, 3.1+(delta/2)], [6.8 +0.4, 0.285, 3.1+(delta/2)], [6.8 +0.4, 5.5-0.285, 3.1+(delta/2)], [6.8+0.05, 5.5-0.85-0.2, 3.1+(delta/2)]]);
	bx2 = BEZIER(S0)([[6.8 +0.1, 0.2+0.85, 3.1+delta], [6.8+0.1, 5.5-0.85-0.2, 3.1+delta]]);
	var s41 = BEZIER(S1)([bx1, bx12, bx2]);
	s41 = MAP(s41)(domain2D);

	bx1 = BEZIER(S0)([[-8.3, 0.2, 6.35],[-8.3, 5.5-0.2, 6.35]]);
	bx12 = BEZIER(S0)([[-8.3, 0.2, 6.35+0.1], [-8.3-0.4, 0.2, 6.35+0.08], [-8.3-0.4, 5.5-0.2, 6.35+0.08], [-8.3, 5.5-0.2, 6.35+0.1]]);
	bx2 = BEZIER(S0)([[-8.3, 0.2, 6.35 +delta],[-8.3, 5.5-0.2, 6.35+delta]]);
	var s42 = BEZIER(S1)([bx1, bx12, bx2]);
	s42 = MAP(s42)(domain2D);

	var table_base = STRUCT([s_base, s_top, s41, s42,
		s31_1, s31_2, s32_1, s32_2, s33_1, s33_2, s34_1, s34_2, s35_1, s35_2, s36_1, s36_2])
	return COLOR(red)(table_base);
}

function circl (sel) {
  return function (r) {
    return function (altezza) {
      return function (p) {
        return [ r * COS(sel(p)), r * SIN(sel(p)), altezza ];
      };
    };
  };
};


function getPillow(){
	var domPI = INTERVALS(2*PI)(40);
	var pillow = getFullCylinder(1.2/2, 5.25, [64,4]);
	var stitching1 = MAP(circl(S0)(1/2)(0))(domPI);
	var stitching5 = MAP(circl(S0)(1.1/2)(0))(domPI);
	var stitching6 = MAP(circl(S0)(1.2/2)(0))(domPI);
	var stitching2 = MAP(circl(S0)(1/2)(5.25))(domPI);
	var stitching3 = MAP(circl(S0)(1.1/2)(5.25))(domPI);
	var stitching4 = MAP(circl(S0)(1.2/2)(5.25))(domPI);
	var stitchings = STRUCT([stitching1, stitching2, stitching3, stitching4, stitching5, stitching6]);
	stitchings = COLOR(red)(stitchings);
	stitchings = R([1,2])([PI/2])(stitchings);
	stitchings = T([0,1,2])([-5.8, 5.35, 7.25])(stitchings);
	pillow = R([1,2])([PI/2])(pillow);
	pillow = T([0,1,2])([-5.8, 5.35, 7.25])(pillow);
	pillow = COLOR([1.5, 1.5, 1.5])(pillow);
	return STRUCT([pillow, stitchings]);
}

//modello
var feet = STRUCT([getFeetFront(), getFeetBack()]);
var down_pipes = STRUCT([getTrasversalTubes(), getTubeFront(), getTubeBack(), getTrasversalPillars()]);
var upper_pipes = STRUCT([getOvalTrasversalPillars(), getUpperBackTubes(), getUpperFrontalTubes(), trasversalUpperTube_1(), trasversalUpperTube_2()]);
var table = getTable();
var pillow = getPillow();
var modelLC4 = STRUCT([feet, down_pipes, upper_pipes, table, pillow])
DRAW(modelLC4);

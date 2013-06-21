from pyplasm import *

#LC4 long chair
dark_grey = [0.2, 0.2, 0.2]
red = [192.0/255, 0, 0]

def DOMAIN2D(domains1D):
	def aux(q):
		a = q[0]
		b = q[1]
		c = q[2]
		d = q[3]
		return [ [ a, b, d ], [ d, b, c ] ]
	dd = PROD([ domains1D[0], domains1D[1] ])
	complex = UKPOL(dd)
	points = complex[0]
	cells = CAT(AA(aux)(complex[1]))
	return MKPOL([ points, cells, None ])

domainPI = DOMAIN([[0,1],[0,2*PI]])([10,32])
domain1D = INTERVALS(1)(20)
domain2D = DOMAIN2D([ INTERVALS(1)(20), INTERVALS(1)(20) ])
domain3D = PROD([DOMAIN([[0,1],[0,1]])([100,5]), INTERVALS(1)(1)])
#4 SOSTEGNI

#SOSTEGNO FRONT
def getFeetFront():
	b1_sx = BEZIER(S1)([[-4.7, 0.1, 0], [-4.5, 0.15, 0]])
	b2_sx = BEZIER(S1)([[-4.5, 0.1, 3], [-4, 0.15, 2.7]])
	foot_sx_mapping = BEZIER(S2)([b1_sx, b2_sx])
	foot_sx = MAP(foot_sx_mapping)(domain2D)

	b1_sx_2 = BEZIER(S1)([[-4.7, 0.1 +0.1, 0], [-4.5, 0.15 +0.1, 0]])
	b2_sx_2 = BEZIER(S1)([[-4.5, 0.1 +0.1, 3], [-4, 0.15 +0.1, 2.7]])
	foot_sx_mapping_2 = BEZIER(S2)([b1_sx_2, b2_sx_2])
	foot_sx_2 = MAP(foot_sx_mapping_2)(domain2D)

	surf_foot_sx_1 = BEZIER(S2)([b1_sx, b1_sx_2])
	surf_foot_sx_1 = MAP(surf_foot_sx_1)(domain2D)
	surf_foot_sx_2 = BEZIER(S2)([b2_sx, b2_sx_2])
	surf_foot_sx_2 = MAP(surf_foot_sx_2)(domain2D)

	bx_1 = BEZIER(S1)([[-4.7, 0.1, 0],[-4.5, 0.1, 3]])
	bx_2 = BEZIER(S1)([[-4.7, 0.1 +0.1, 0],[-4.5, 0.1 +0.1, 3]])
	surf_foot_sx_3 = BEZIER(S2)([bx_1, bx_2])
	surf_foot_sx_3 = MAP(surf_foot_sx_3)(domain2D)

	bx_3 = BEZIER(S1)([[-4.5, 0.15, 0],[-4, 0.15, 2.7]])
	bx_4 = BEZIER(S1)([[-4.5, 0.15 +0.1, 0],[-4, 0.15 +0.1, 2.7]])
	surf_foot_sx_4 = BEZIER(S2)([bx_3, bx_4])
	surf_foot_sx_4 = MAP(surf_foot_sx_4)(domain2D)

	##
	b1_dx = BEZIER(S1)([[4.5, 0.6, 0], [4.7, 0.65, 0]])
	b2_dx = BEZIER(S1)([[4, 0.6, 2.7], [4.5, 0.65, 3]])
	foot_dx_mapping = BEZIER(S2)([b1_dx, b2_dx])
	foot_dx = MAP(foot_dx_mapping)(domain2D)

	b1_dx_2 = BEZIER(S1)([[4.5, 0.6 +0.1, 0], [4.7, 0.65 +0.1, 0]])
	b2_dx_2 = BEZIER(S1)([[4, 0.6 +0.1, 2.7], [4.5, 0.65 +0.1, 3]])
	foot_dx_mapping_2 = BEZIER(S2)([b1_dx_2, b2_dx_2])
	foot_dx_2 = MAP(foot_dx_mapping_2)(domain2D)

	surf_foot_dx_1 = BEZIER(S2)([b1_dx, b1_dx_2])
	surf_foot_dx_1 = MAP(surf_foot_dx_1)(domain2D)
	surf_foot_dx_2 = BEZIER(S2)([b2_dx, b2_dx_2])
	surf_foot_dx_2 = MAP(surf_foot_dx_2)(domain2D)

	bx_dx_1 = BEZIER(S1)([[4.7, 0.65, 0], [4.7, 0.65 +0.1, 0]])
	bx_dx_2 = BEZIER(S1)([[4.5, 0.65, 3], [4.5, 0.65 +0.1, 3]])
	surf_foot_dx_3 = BEZIER(S2)([bx_dx_1, bx_dx_2])
	surf_foot_dx_3 = MAP(surf_foot_dx_3)(domain2D)

	bx_dx_3 = BEZIER(S1)([[4, 0.6, 2.7], [4.5, 0.6, 0]])
	bx_dx_4 = BEZIER(S1)([[4, 0.6 +0.1, 2.7], [4.5, 0.6 +0.1, 0]])
	surf_foot_dx_4 = BEZIER(S2)([bx_dx_3, bx_dx_4])
	surf_foot_dx_4 = MAP(surf_foot_dx_4)(domain2D)
	#
	feet_front = STRUCT([foot_sx, foot_sx_2, surf_foot_sx_1, surf_foot_sx_2, surf_foot_sx_3, surf_foot_sx_4, 
		foot_dx, foot_dx_2, surf_foot_dx_1, surf_foot_dx_2, surf_foot_dx_3, surf_foot_dx_4 ])
	return COLOR(dark_grey)(feet_front)

#SOSTEGNO BACK
def getFeetBack():
	b1_sx = BEZIER(S1)([[-4.7, 5.5 -0.1, 0], [-4.5, 5.5 -0.15, 0]])
	b2_sx = BEZIER(S1)([[-4.5, 5.5 -0.1, 3], [-4, 5.5 -0.15, 2.7]])
	foot_sx_mapping = BEZIER(S2)([b1_sx, b2_sx])
	foot_sx = MAP(foot_sx_mapping)(domain2D)

	b1_sx_2 = BEZIER(S1)([[-4.7, (5.5 -0.1) -0.1, 0], [-4.5, (5.5 -0.15) -0.1, 0]])
	b2_sx_2 = BEZIER(S1)([[-4.5, (5.5 -0.1) -0.1, 3], [-4, (5.5 -0.1) -0.1, 2.7]])
	foot_sx_mapping_2 = BEZIER(S2)([b1_sx_2, b2_sx_2])
	foot_sx_2 = MAP(foot_sx_mapping_2)(domain2D)

	surf_foot_sx_1 = BEZIER(S2)([b1_sx, b1_sx_2])
	surf_foot_sx_1 = MAP(surf_foot_sx_1)(domain2D)
	surf_foot_sx_2 = BEZIER(S2)([b2_sx, b2_sx_2])
	surf_foot_sx_2 = MAP(surf_foot_sx_2)(domain2D)

	bx_1 = BEZIER(S1)([[-4.7, 5.5 -0.1, 0],[-4.5, 5.5 -0.1, 3]])
	bx_2 = BEZIER(S1)([[-4.7, (5.5 -0.1) -0.1, 0],[-4.5, (5.5 -0.1) -0.1, 3]])
	surf_foot_sx_3 = BEZIER(S2)([bx_1, bx_2])
	surf_foot_sx_3 = MAP(surf_foot_sx_3)(domain2D)


	bx_3 = BEZIER(S1)([[-4, 5.5 -0.15, 2.7],[-4, (5.5 -0.1) -0.1, 2.7]])
	bx_4 = BEZIER(S1)([[-4.5, 5.5 -0.15, 0],[-4.5, (5.5 -0.15) -0.1, 0]])
	surf_foot_sx_4 = BEZIER(S2)([bx_3, bx_4])
	surf_foot_sx_4 = MAP(surf_foot_sx_4)(domain2D)
	
	## 
	b1_dx = BEZIER(S1)([[4.5, 5.5 -0.6, 0], [4.7, 5.5 -0.65, 0]])
	b2_dx = BEZIER(S1)([[4, 5.5 -0.6, 2.7], [4.5, 5.5 -0.65, 3]])
	foot_dx_mapping = BEZIER(S2)([b1_dx, b2_dx])
	foot_dx = MAP(foot_dx_mapping)(domain2D)

	b1_dx_2 = BEZIER(S1)([[4.5, (5.5 -0.6) -0.1, 0], [4.7, (5.5 -0.65) -0.1, 0]])
	b2_dx_2 = BEZIER(S1)([[4, (5.5 -0.6) -0.1, 2.7], [4.5, (5.5 -0.65) -0.1, 3]])
	foot_dx_mapping_2 = BEZIER(S2)([b1_dx_2, b2_dx_2])
	foot_dx_2 = MAP(foot_dx_mapping_2)(domain2D)

	surf_foot_dx_1 = BEZIER(S2)([b1_dx, b1_dx_2])
	surf_foot_dx_1 = MAP(surf_foot_dx_1)(domain2D)
	surf_foot_dx_2 = BEZIER(S2)([b2_dx, b2_dx_2])
	surf_foot_dx_2 = MAP(surf_foot_dx_2)(domain2D)

	bx_dx_1 = BEZIER(S1)([[4.7, 5.5-0.65, 0], [4.7, 5.5-0.65 -0.1, 0]])
	bx_dx_2 = BEZIER(S1)([[4.5, 5.5-0.65, 3], [4.5, 5.5-0.65 -0.1, 3]])
	surf_foot_dx_3 = BEZIER(S2)([bx_dx_1, bx_dx_2])
	surf_foot_dx_3 = MAP(surf_foot_dx_3)(domain2D)

	bx_dx_3 = BEZIER(S1)([[4, (5.5 -0.6) , 2.7], [4, 5.5 -0.6 -0.1, 2.7]])
	bx_dx_4 = BEZIER(S1)([[4.5, 5.5 -0.6, 0], [4.5, (5.5 -0.6) -0.1, 0]])
	surf_foot_dx_4 = BEZIER(S2)([bx_dx_3, bx_dx_4])
	surf_foot_dx_4 = MAP(surf_foot_dx_4)(domain2D)

	feet_back = STRUCT([foot_sx, foot_sx_2, surf_foot_sx_1, surf_foot_sx_2, surf_foot_sx_3, surf_foot_sx_4,
		foot_dx, foot_dx_2, surf_foot_dx_1, surf_foot_dx_2, surf_foot_dx_3, surf_foot_dx_4])
	return COLOR(dark_grey)(feet_back)


def getTubeFront():
	b1 = BEZIER(S1)([[-7.75 +0.1, 0, 7], [-5, 0.2, 0.9], [0,0.4,0], [4, 0.6, 2.5], [4.5, 0.7, 3], [5.9 -0.1, 0.8, 3.5]])
	#VIEW(MAP(b1)(INTERVALS(1)(30)))

	b2 = BEZIER(S1)([[-7.75 +0.1, 0.1, 7], [-5, 0.3, 0.9], [0,0.5,0], [4, 0.7, 2.5], [4.5, 0.8, 3], [5.9 -0.1, 0.9, 3.5]])
	#VIEW(MAP(b2)(INTERVALS(1)(30)))

	b12 = BEZIER(S1)([[-7.75 +0.2, 0.05, 7], [-5, 0.1, 1], [0,0.45,0.1], [4, 0.65, 2.6], [4.5, 0.75, 3.1], [5.9 -0.2, 0.85, 3.6]])
	#VIEW(MAP(b12)(INTERVALS(1)(30)))

	b21 = BEZIER(S1)([[-7.75 -0.1, 0.05, 7], [-5, 0.1, 0.8], [0,0.45,-0.1], [4, 0.65, 2.4], [4.5, 0.75, 2.9], [5.9, 0.85, 3.4]])
	#VIEW(MAP(b21)(INTERVALS(1)(30)))

	t1 = BEZIER(S2)([b1,b12,b2])
	t1 = MAP(t1)(domain2D)
	t2 = BEZIER(S2)([b1,b21,b2])
	t2 = MAP(t2)(domain2D)

	return STRUCT([t1, t2])


def getTubeBack():
	b1 = BEZIER(S1)([[-7.75 +0.1, 5.5, 7], [-5, 5.5-0.2, 0.9], [0, 5.5-0.4, 0], [4, 5.5-0.6, 2.5], [4.5, 5.5-0.7, 3], [5.9 -0.1, 5.5-0.8, 3.5]])
	b2 = BEZIER(S1)([[-7.75 +0.1, 5.5-0.1, 7], [-5, 5.5-0.3, 0.9], [0, 5.5-0.5, 0], [4, 5.5-0.7, 2.5], [4.5, 5.5-0.8, 3], [5.9 -0.1, 5.5-0.9, 3.5]])
	b12 = BEZIER(S1)([[-7.75 +0.2, 5.5-0.05, 7], [-5, 5.5-0.1, 1], [0, 5.5-0.45, 0.1], [4, 5.5-0.65, 2.6], [4.5, 5.5-0.75, 3.1], [5.9 -0.2, 5.5-0.85, 3.6]])
	b21 = BEZIER(S1)([[-7.75 -0.1, 5.5-0.05, 7], [-5, 5.5-0.1, 0.8], [0, 5.5-0.45, -0.1], [4, 5.5-0.65, 2.4], [4.5, 5.5-0.75, 2.9], [5.9, 5.5-0.85, 3.4]])

	t1 = BEZIER(S2)([b1,b12,b2])
	t1 = MAP(t1)(domain2D)
	t2 = BEZIER(S2)([b1,b21,b2])
	t2 = MAP(t2)(domain2D)

	return STRUCT([t1, t2])


def getTrasversalTubes():
	#PRIMO
	b11 = BEZIER(S1)([[2.25, 0.6, 1.98], [2.25, 5.5-0.6, 1.98]])
	b21 = BEZIER(S1)([[2.25+0.1, 0.6, 1.98], [2.25+0.1, 5.5-0.6, 1.98]])
	sur111 = CUBICHERMITE(S2)([b11,b21,[0,0,-0.2],[0,0,0.2]])
	out11 = MAP(sur111)(domain2D)
	sur112 = CUBICHERMITE(S2)([b11,b21,[0,0,0.2],[0,0,-0.2]])
	out12 = MAP(sur112)(domain2D)
	tube1 = STRUCT([out11, out12])

	#SECONDO
	b12 = BEZIER(S1)([[-3.5, 0.25, 2.35], [-3.5, 5.5-0.25, 2.35]])
	b22 = BEZIER(S1)([[-3.5-0.1, 0.25, 2.35], [-3.5-0.1, 5.5-0.25, 2.35]])
	sur112 = CUBICHERMITE(S2)([b12,b22,[0,0,-0.2],[0,0,0.2]])
	out12 = MAP(sur112)(domain2D)
	sur212 = CUBICHERMITE(S2)([b12,b22,[0,0,0.2],[0,0,-0.2]])
	out22 = MAP(sur212)(domain2D)
	tube2 = STRUCT([out12, out22])

	#MICRO RACCORDO VERTICALE
	br11 = BEZIER(S1)([[-0.05, 0.48, 1.6], [-0.05, 0.48, 2]])
	br21 = BEZIER(S1)([[0.05, 0.48, 1.6], [0.05, 0.48, 2]])
	sur_r11 = CUBICHERMITE(S2)([br11,br21,[0,-0.2,0],[0,0.2,0]])
	outr11 = MAP(sur_r11)(domain2D)
	sur_r12 = CUBICHERMITE(S2)([br11,br21,[0,0.2,0],[0,-0.2,0]])
	outr12 = MAP(sur_r12)(domain2D)
	r1 = STRUCT([outr11, outr12])
	#
	br12 = BEZIER(S1)([[-0.05, 5.5-0.48, 1.6], [-0.05, 5.5-0.48, 2]])
	br22 = BEZIER(S1)([[0.05, 5.5-0.48, 1.6], [0.05, 5.5-0.48, 2]])
	sur_r21 = CUBICHERMITE(S2)([br12,br22,[0,-0.2,0],[0,0.2,0]])
	outr21 = MAP(sur_r21)(domain2D)
	sur_r22 = CUBICHERMITE(S2)([br12,br22,[0,0.2,0],[0,-0.2,0]])
	outr22 = MAP(sur_r22)(domain2D)
	r2 = STRUCT([outr21, outr22])

	return STRUCT([tube1, tube2, r1, r2])


def MYEXTRUDE (h):
	def MYEXTRUDE0(model):
		return PROD([model,Q(h)])
	return MYEXTRUDE0

def annulus_sector (alpha, r, R) :
	domain = DOMAIN([[0,2*PI],[r,R]])([36,36])
	def mapping (v) :
		a = v[0]
		r = v[1]
		return [r*COS(a), r*SIN(a)]
	model = MAP(mapping)(domain)
	return model

def getFullCylinder(r, h, dim):
	cyl = annulus_sector(2*PI, 0, r);
	cyl = MYEXTRUDE(h)(cyl)
	return cyl

#tubi trasversali per i sostegni
def getTrasversalPillars():
	trasversalPillar1 = (getFullCylinder(0.15, 5.15, [32,4]))
	trasversalPillar1 = R([2,3])(PI/2)(trasversalPillar1)
	trasversalPillar1 = T([1,2,3])([-4.3, 5.3, 2.55])(trasversalPillar1)

	trasversalPillar2 = (getFullCylinder(0.15, 4.1, [32,4]))
	trasversalPillar2 = R([2,3])(PI/2)(trasversalPillar2)
	trasversalPillar2 = T([1,2,3])([4.3, 4.8, 2.55])(trasversalPillar2)

	trasversalPillars = STRUCT([trasversalPillar1, trasversalPillar2])
	trasversalPillars = COLOR(dark_grey)(trasversalPillars)
	return trasversalPillars

#altri tubi trasversali per i sostegni

def getOvalTrasversalPillars():
	#ovalpill1
	b11 = BEZIER(S1)([[0, 0, 0], [0, 0, 0.4]])
	b21 = BEZIER(S1)([[0.1, 0, 0], [0.1, 0, 0.4]])
	b31 = BEZIER(S1)([[0, 0, 0], [0.05, 0, -0.1], [0.1, 0, 0]])
	b41 = BEZIER(S1)([[0, 0, 0.4], [0.05, 0, 0.5], [0.1, 0, 0.4]])

	b12 = BEZIER(S1)([[0, 5.2, 0], [0, 5.2, 0.4]])
	b22 = BEZIER(S1)([[0.1, 5.2, 0], [0.1, 5.2, 0.4]])
	b32 = BEZIER(S1)([[0, 5.2, 0], [0.05, 5.2, -0.1], [0.1, 5.2, 0]])
	b42 = BEZIER(S1)([[0, 5.2, 0.4], [0.05, 5.2, 0.5], [0.1, 5.2, 0.4]])

	sur11 = BEZIER(S2)([b11, b12])
	sur11 = MAP(sur11)(domain2D)
	sur21 = BEZIER(S2)([b21, b22])
	sur21 = MAP(sur21)(domain2D)
	sur31 = BEZIER(S2)([b31, b32])
	sur31 = MAP(sur31)(domain2D)
	sur41 = BEZIER(S2)([b41, b42])
	sur41 = MAP(sur41)(domain2D)

	ovalPill1 = STRUCT([sur11, sur21, sur31, sur41])
	ovalPill1 = R([1,3])(PI/20)(ovalPill1)
	ovalPill1 = T([1,2,3])([-4.6, 0.15, 0.4])(ovalPill1)
	
	#ovalpill2
	b11 = BEZIER(S1)([[0, 0, 0], [0, 0, 0.4]])
	b21 = BEZIER(S1)([[0.1, 0, 0], [0.1, 0, 0.4]])
	b31 = BEZIER(S1)([[0, 0, 0], [0.05, 0, -0.1], [0.1, 0, 0]])
	b41 = BEZIER(S1)([[0, 0, 0.4], [0.05, 0, 0.5], [0.1, 0, 0.4]])

	b12 = BEZIER(S1)([[0, 4.2, 0], [0, 4.2, 0.4]])
	b22 = BEZIER(S1)([[0.1, 4.2, 0], [0.1, 4.2, 0.4]])
	b32 = BEZIER(S1)([[0, 4.2, 0], [0.05, 4.2, -0.1], [0.1, 4.2, 0]])
	b42 = BEZIER(S1)([[0, 4.2, 0.4], [0.05, 4.2, 0.5], [0.1, 4.2, 0.4]])

	sur12 = BEZIER(S2)([b11, b12])
	sur12 = MAP(sur12)(domain2D)
	sur22 = BEZIER(S2)([b21, b22])
	sur22 = MAP(sur22)(domain2D)
	sur32 = BEZIER(S2)([b31, b32])
	sur32 = MAP(sur32)(domain2D)
	sur42 = BEZIER(S2)([b41, b42])
	sur42 = MAP(sur42)(domain2D)

	ovalPill2 = STRUCT([sur12, sur22, sur32, sur42])
	ovalPill2 = R([1,3])(-PI/20)(ovalPill2)
	ovalPill2 = T([1,2,3])([4.6-0.1, 0.65, 0.4])(ovalPill2)

	#ovalpill3
	b11 = BEZIER(S1)([[0, 0, 0], [0, 0.05, 0.4]])
	b21 = BEZIER(S1)([[0.1, 0, 0], [0.1, 0.05, 0.4]])
	b31 = BEZIER(S1)([[0, 0, 0], [0.05, 0, -0.1], [0.1, 0, 0]])
	b41 = BEZIER(S1)([[0, 0.05, 0.4], [0.05, 0.05, 0.5], [0.1, 0.05, 0.4]])

	b12 = BEZIER(S1)([[0, 9.1, 0], [0, 9.1-0.05, 0.4]])
	b22 = BEZIER(S1)([[0.1, 9.1, 0], [0.1, 9.1-0.05, 0.4]])
	b32 = BEZIER(S1)([[0, 9.1, 0], [0.05, 9.1, -0.1], [0.1, 9.1, 0]])
	b42 = BEZIER(S1)([[0, 9.1-0.05, 0.4], [0.05, 9.1-0.05, 0.5], [0.1, 9.1-0.05, 0.4]])
	
	sur13 = BEZIER(S2)([b11, b12])
	sur13 = MAP(sur13)(domain2D)
	sur23 = BEZIER(S2)([b21, b22])
	sur23 = MAP(sur23)(domain2D)
	sur33 = BEZIER(S2)([b31, b32])
	sur33 = MAP(sur33)(domain2D)
	sur43 = BEZIER(S2)([b41, b42])
	sur43= MAP(sur43)(domain2D)

	ovalPill3 = STRUCT([sur13, sur23, sur33, sur43])
	ovalPill3 = R([1,2])(PI/2)(ovalPill3)
	ovalPill3 = T([1,2,3])([4.55, 2.8 -0.05, 0.4])(ovalPill3)

	model = STRUCT([ovalPill1, ovalPill2, ovalPill3])
	return COLOR(dark_grey)(model)


def getUpperFrontalTubes():
	b1 = BEZIER(S1)([[-8.3, 0, 6.35], [-7.5, 0, 7.6], [-6.3, 0.05, 7.4], [-6.4 , 0.1, 5.75]])
	b2 = BEZIER(S1)([[-6.4, 0.1, 5.75], [-6.3, 0.1, 5.7], [-0.1, 0.43, 2 +0.05]])
	b23 = BEZIER(S1)([[-0.1, 0.43, 2+0.05], [0, 0.43, 2], [0.1, 0.435, 2 +0.05]])
	b3 = BEZIER(S1)([[0.1, 0.435, 2 +0.05], [3.8, 0.6, 4.15]])
	b34 = BEZIER(S1)([[3.8, 0.6, 4.15], [3.9, 0.61, 4.2], [4, 0.62, 4.15]])
	b4 = BEZIER(S1)([[4, 0.62, 4.15], [5.9, 0.82, 3.5], [6.8, 0.85, 3.1]])
	b5 = BEZIER(S1)([[6.8, 0.85, 3.1], [6.9, 0.86, 3], [6.6, 0.865, 2.3]])

	#di fianco
	b11 = BEZIER(S1)([[-8.3, 0.1, 6.35], [-7.5, 0.1, 7.6], [-6.3, 0.1+0.05, 7.4], [-6.4 , 0.1+0.1, 5.75]])
	b21 = BEZIER(S1)([[-6.4, 0.1+0.1, 5.75], [-6.3, 0.1+0.1, 5.7], [-0.1, 0.1+0.43, 2 +0.05]])
	b231 = BEZIER(S1)([[-0.1, 0.1+0.43, 2+0.05], [0, 0.1+0.43, 2], [0.1, 0.1+0.435, 2 +0.05]])
	b31 = BEZIER(S1)([[0.1, 0.1+0.435, 2 +0.05], [3.8, 0.1+0.6, 4.15]])
	b341 = BEZIER(S1)([[3.8, 0.1+0.6, 4.15], [3.9, 0.1+0.61, 4.2], [4, 0.1+0.62, 4.15]])
	b41 = BEZIER(S1)([[4, 0.1+0.62, 4.15], [5.9, 0.1+0.82, 3.5], [6.8, 0.1+0.85, 3.1]])
	b51 = BEZIER(S1)([[6.8, 0.1+0.85, 3.1], [6.9, 0.1+0.86, 3], [6.6, 0.1+0.865, 2.3]])
	
	#sopra
	b12 = BEZIER(S1)([[-8.3, 0.05, 6.35 +0.1 +0.1], [-7.5, 0.05, 7.6 +0.1], [-6.3 +0.1, 0.1, 7.4 +0.1], [-6.4 +0.1, 0.15, 5.75 ]])
	b22 = BEZIER(S1)([[-6.4, 0.15, 5.75 +0.1], [-6.3, 0.15, 5.7 +0.1], [-0.1, 0.48, 2 +0.05 +0.1]])
	b232 = BEZIER(S1)([[-0.1, 0.48, 2+0.05 +0.1], [0, 0.48, 2 +0.1], [0.1, 0.475, 2 +0.05 +0.1]])
	b32 = BEZIER(S1)([[0.1, 0.475, 2 +0.05 +0.1], [3.8, 0.65, 4.15 +0.1]])
	b342 = BEZIER(S1)([[3.8, 0.65, 4.15 +0.1], [3.9, 0.655, 4.2 +0.1], [4, 0.66, 4.15 +0.1]])
	b42 = BEZIER(S1)([[4, 0.66, 4.15 +0.1], [5.9, 0.87, 3.5 +0.1], [6.8, 0.9, 3.1 +0.1]])
	#b52 = BEZIER(S1)([[6.8, 4.6, 3.1 +0.1], [6.9, 4.59, 3 +0.1], [6.6, 4.585, 2.3 +0.1]])
	b52 = BEZIER(S1)([[6.8, 0.9, 3.1 +0.1], [6.9+0.2, 0.91, 3 +0.1], [6.6+0.15, 0.915, 2.3 +0.1] ,[6.6 +0.05, 0.915, 2.3 -0.1]])
	
	#sotto
	b13 = BEZIER(S1)([[-8.3, 0.05, 6.35 -0.1], [-7.5, 0.05, 7.6 -0.1], [-6.3 -0.1, 0.1, 7.4 -0.1], [-6.4 -0.1, 0.15, 5.75 -0.1]])
	b23_3 = BEZIER(S1)([[-6.4 -0.1, 0.15, 5.75 -0.1], [-6.3, 0.15, 5.7 -0.1], [-0.1, 0.48, 2 +0.05 -0.1]])
	b233 = BEZIER(S1)([[-0.1, 0.48, 2+0.05 -0.1], [0, 0.48, 2 -0.1], [0.1, 0.475, 2 +0.05 -0.1]])
	b33 = BEZIER(S1)([[0.1, 0.475, 2 +0.05 -0.1], [3.8, 0.65, 4.15 -0.1]])
	b343 = BEZIER(S1)([[3.8, 0.65, 4.15 -0.1], [3.9, 0.655, 4.2 -0.1], [4, 0.66, 4.15 -0.1]])
	b43 = BEZIER(S1)([[4, 0.66, 4.15 -0.1], [5.9, 0.87, 3.5 -0.1], [6.8, 0.9, 3.1 -0.1]])
	#b53 = BEZIER(S1)([[6.8, 4.6, 3.1 -0.1], [6.9, 4.59, 3 -0.1], [6.6, 4.585, 2.3 -0.1]])
	b53 = BEZIER(S1)([[6.8, 0.9, 3.1 -0.1], [6.9-0.1, 0.91, 3 -0.1], [6.6-0.1, 0.915, 2.3 -0.1]])

	sur11 = BEZIER(S2)([b1, b12, b11])
	sur11 = MAP(sur11)(domain2D)
	sur21 = BEZIER(S2)([b2, b22, b21])
	sur21 = MAP(sur21)(domain2D)
	sur231 = BEZIER(S2)([b23, b232, b231])
	sur231 = MAP(sur231)(domain2D)
	sur31 = BEZIER(S2)([b3, b32, b31])
	sur31 = MAP(sur31)(domain2D)
	sur341 = BEZIER(S2)([b34, b342, b341])
	sur341 = MAP(sur341)(domain2D)
	sur41 = BEZIER(S2)([b4, b42, b41])
	sur41 = MAP(sur41)(domain2D)
	sur51 = BEZIER(S2)([b5, b52, b51])
	sur51 = MAP(sur51)(domain2D)
	#
	sur12 = BEZIER(S2)([b1, b13, b11])
	sur12 = MAP(sur12)(domain2D)
	sur22 = BEZIER(S2)([b2, b23_3, b21])
	sur22 = MAP(sur22)(domain2D)
	sur232 = BEZIER(S2)([b23, b233, b231])
	sur232 = MAP(sur232)(domain2D)
	sur32 = BEZIER(S2)([b3, b33, b31])
	sur32 = MAP(sur32)(domain2D)
	sur342 = BEZIER(S2)([b34, b343, b341])
	sur342 = MAP(sur342)(domain2D)
	sur42 = BEZIER(S2)([b4, b43, b41])
	sur42 = MAP(sur42)(domain2D)
	sur52 = BEZIER(S2)([b5, b53, b51])
	sur52 = MAP(sur52)(domain2D)

	tubeUpperFront = STRUCT([sur11, sur21, sur231, sur31, sur341, sur41, sur51,
		sur12, sur22, sur232, sur32, sur342, sur42, sur52])
	return tubeUpperFront


def getUpperBackTubes():
	b1 = BEZIER(S1)([[-8.3, 5.5, 6.35], [-7.5, 5.5, 7.6], [-6.3, 5.5-0.05, 7.4], [-6.4, 5.5-0.1, 5.75]])
	b2 = BEZIER(S1)([[-6.4, 5.5-0.1, 5.75], [-6.3, 5.5-0.1, 5.7], [-0.1, 5.5-0.43, 2 +0.05]])
	b23 = BEZIER(S1)([[-0.1, 5.5-0.43, 2+0.05], [0, 5.5-0.43, 2], [0.1, 5.5-0.435, 2 +0.05]])
	b3 = BEZIER(S1)([[0.1, 5.5-0.435, 2 +0.05], [3.8, 5.5-0.6, 4.15]])
	b34 = BEZIER(S1)([[3.8, 5.5-0.6, 4.15], [3.9, 5.5-0.61, 4.2], [4, 5.5-0.62, 4.15]])
	b4 = BEZIER(S1)([[4, 5.5-0.62, 4.15], [5.9, 5.5-0.82, 3.5], [6.8, 5.5-0.85, 3.1]])
	b5 = BEZIER(S1)([[6.8, 5.5-0.85, 3.1], [6.9, 5.5-0.86, 3], [6.6, 5.5-0.865, 2.3]])

	#di fianco
	b11 = BEZIER(S1)([[-8.3, 5.5-0.1, 6.35], [-7.5, 5.5-0.1, 7.6], [-6.3, 5.5-0.05-0.1, 7.4], [-6.4, 5.5-0.1-0.1, 5.75]])
	b21 = BEZIER(S1)([[-6.4, 5.5-0.1-0.1, 5.75], [-6.3, 5.5-0.1-0.1, 5.7], [-0.1, 5.5-0.43-0.1, 2 +0.05]])
	b231 = BEZIER(S1)([[-0.1, 5.5-0.43-0.1, 2+0.05], [0, 5.5-0.43-0.1, 2], [0.1, 5.5-0.435-0.1, 2 +0.05]])
	b31 = BEZIER(S1)([[0.1, 5.5-0.435-0.1, 2 +0.05], [3.8, 5.5-0.6-0.1, 4.15]])
	b341 = BEZIER(S1)([[3.8, 5.5-0.6-0.1, 4.15], [3.9, 5.5-0.61-0.1, 4.2], [4, 5.5-0.62-0.1, 4.15]])
	b41 = BEZIER(S1)([[4, 5.5-0.62-0.1, 4.15], [5.9, 5.5-0.82-0.1, 3.5], [6.8, 5.5-0.85-0.1, 3.1]])
	b51 = BEZIER(S1)([[6.8, 5.5-0.85-0.1, 3.1], [6.9, 5.5-0.86-0.1, 3], [6.6, 5.5-0.865-0.1, 2.3]])
	
	#sopra
	b12 = BEZIER(S1)([[-8.3, 5.5-0.05, 6.35 +0.1 +0.1], [-7.5, 5.5-0.05, 7.6 +0.1], [-6.3+0.1, 5.5-0.1, 7.4 +0.1], [-6.4 +0.1, 5.5-0.15, 5.75 +0.1]])
	b22 = BEZIER(S1)([[-6.4, 5.5-0.15, 5.75 +0.1], [-6.3, 5.5-0.15, 5.7 +0.1], [-0.1, 5.02, 2 +0.05 +0.1]])
	b232 = BEZIER(S1)([[-0.1, 5.02, 2+0.05 +0.1], [0, 5.02, 2 +0.1], [0.1, 5.015, 2 +0.05 +0.1]])
	b32 = BEZIER(S1)([[0.1, 5.015, 2 +0.05 +0.1], [3.8, 5.5-0.65, 4.15 +0.1]])
	b342 = BEZIER(S1)([[3.8, 5.5-0.65, 4.15 +0.1], [3.9, 5.5-0.655, 4.2 +0.1], [4, 5.5-0.66, 4.15 +0.1]])
	b42 = BEZIER(S1)([[4, 5.5-0.66, 4.15 +0.1], [5.9, 4.63, 3.5 +0.1], [6.8, 4.6, 3.1 +0.1]])
	#b52 = BEZIER(S1)([[6.8, 4.6, 3.1 +0.1], [6.9, 4.59, 3 +0.1], [6.6, 4.585, 2.3 +0.1]])
	b52 = BEZIER(S1)([[6.8, 4.6, 3.1 +0.1], [6.9+0.2, 4.59, 3 +0.1], [6.6+0.15, 4.585, 2.3 +0.1] ,[6.6 +0.05, 4.585, 2.3 -0.1]])

	#sotto
	b13 = BEZIER(S1)([[-8.3, 5.5-0.05, 6.35 -0.1], [-7.5, 5.5-0.05, 7.6 -0.1], [-6.3-0.1, 5.5-0.1, 7.4 -0.1], [-6.4 -0.1, 5.5-0.15, 5.75 -0.1]])
	b23_3 = BEZIER(S1)([[-6.4 -0.1, 5.5-0.15, 5.75 -0.1], [-6.3, 5.5-0.15, 5.7 -0.1], [-0.1, 5.02, 2 +0.05 -0.1]])
	b233 = BEZIER(S1)([[-0.1, 5.02, 2+0.05 -0.1], [0, 5.02, 2 -0.1], [0.1, 5.015, 2 +0.05 -0.1]])
	b33 = BEZIER(S1)([[0.1, 5.015, 2 +0.05 -0.1], [3.8, 5.5-0.65, 4.15 -0.1]])
	b343 = BEZIER(S1)([[3.8, 5.5-0.65, 4.15 -0.1], [3.9, 5.5-0.655, 4.2 -0.1], [4, 5.5-0.66, 4.15 -0.1]])
	b43 = BEZIER(S1)([[4, 5.5-0.66, 4.15 -0.1], [5.9, 4.63, 3.5 -0.1], [6.8, 4.6, 3.1 -0.1]])
	#b53 = BEZIER(S1)([[6.8, 4.6, 3.1 -0.1], [6.9, 4.59, 3 -0.1], [6.6, 4.585, 2.3 -0.1]])
	b53 = BEZIER(S1)([[6.8, 4.6, 3.1 -0.1], [6.9-0.1, 4.59, 3 -0.1], [6.6-0.1, 4.585, 2.3 -0.1]])

	sur11 = BEZIER(S2)([b1, b12, b11])
	sur11 = MAP(sur11)(domain2D)
	sur21 = BEZIER(S2)([b2, b22, b21])
	sur21 = MAP(sur21)(domain2D)
	sur231 = BEZIER(S2)([b23, b232, b231])
	sur231 = MAP(sur231)(domain2D)
	sur31 = BEZIER(S2)([b3, b32, b31])
	sur31 = MAP(sur31)(domain2D)
	sur341 = BEZIER(S2)([b34, b342, b341])
	sur341 = MAP(sur341)(domain2D)
	sur41 = BEZIER(S2)([b4, b42, b41])
	sur41 = MAP(sur41)(domain2D)
	sur51 = BEZIER(S2)([b5, b52, b51])
	sur51 = MAP(sur51)(domain2D)
	
	#
	sur12 = BEZIER(S2)([b1, b13, b11])
	sur12 = MAP(sur12)(domain2D)
	sur22 = BEZIER(S2)([b2, b23_3, b21])
	sur22 = MAP(sur22)(domain2D)
	sur232 = BEZIER(S2)([b23, b233, b231])
	sur232 = MAP(sur232)(domain2D)
	sur32 = BEZIER(S2)([b3, b33, b31])
	sur32 = MAP(sur32)(domain2D)
	sur342 = BEZIER(S2)([b34, b343, b341])
	sur342 = MAP(sur342)(domain2D)
	sur42 = BEZIER(S2)([b4, b43, b41])
	sur42 = MAP(sur42)(domain2D)
	sur52 = BEZIER(S2)([b5, b53, b51])
	sur52 = MAP(sur52)(domain2D)
	
	tubeUpperBack = STRUCT([sur11, sur21, sur231, sur31, sur341, sur41, sur51,
		sur12, sur22, sur232, sur32, sur342, sur42, sur52])
	return tubeUpperBack

def trasversalUpperTube_1() :
	b1 = BEZIER(S1)([[-8.3, 5.5-0.1, 6.35],[-8.4, 5.5-0.1, 6.25], [-8.4, 5.4-0.1, 6.25]])
	b2 = BEZIER(S1)([[-8.3, 5.5, 6.35],[-8.5, 5.45, 6.25], [-8.5, 5.4-0.1, 6.25]])
	b12 = BEZIER(S1)([[-8.3, 5.5-0.05, 6.35 +0.1 +0.1],[-8.45, 5.5-0.05, 6.25+0.1], [-8.45, 5.4-0.1, 6.25+0.1]])
	b13 = BEZIER(S1)([[-8.3, 5.5-0.05, 6.35 -0.1],[-8.45, 5.5-0.05, 6.25-0.1], [-8.45, 5.4-0.1, 6.25-0.1]])
	sur11 = BEZIER(S2)([b1, b12, b2])
	sur11 = MAP(sur11)(domain2D)
	sur12 = BEZIER(S2)([b1, b13, b2])
	sur12 = MAP(sur12)(domain2D)
	r1 = STRUCT([sur11, sur12])

	b11 = BEZIER(S1)([[-8.3, 0.1, 6.35], [-8.4, 0.1, 6.25], [-8.4, 0.2, 6.25]])
	b12 = BEZIER(S1)([[-8.3, 0, 6.35], [-8.5, 0.05, 6.25], [-8.5, 0.2, 6.25]])
	b112 = BEZIER(S1)([[-8.3, 0.05, 6.35 +0.1 +0.1], [-8.45, 0.05, 6.25+0.1], [-8.45, 0.2, 6.25+0.1]])
	b113 = BEZIER(S1)([[-8.3, 0.05, 6.35 -0.1], [-8.45, 0.05, 6.25-0.1], [-8.45, 0.2, 6.25-0.1]])
	sur21 = BEZIER(S2)([b11, b112, b12])
	sur21 = MAP(sur21)(domain2D)
	sur22 = BEZIER(S2)([b11, b113, b12])
	sur22 = MAP(sur22)(domain2D)
	r2 = STRUCT([sur21, sur22])

	bx1 = BEZIER(S1)([[-8.4, 5.4-0.1, 6.25], [-8.4, 0.2, 6.25]])
	bx2 = BEZIER(S1)([[-8.5, 5.4-0.1, 6.25], [-8.5, 0.2, 6.25]])
	bx3 = BEZIER(S1)([[-8.45, 5.4-0.1, 6.25+0.1], [-8.45, 0.2, 6.25+0.1]])
	bx4 = BEZIER(S1)([[-8.45, 5.4-0.1, 6.25-0.1], [-8.45, 0.2, 6.25-0.1]])
	surx1 = BEZIER(S2)([bx1,bx3,bx2])
	surx1 = MAP(surx1)(domain2D)
	surx2 = BEZIER(S2)([bx1,bx4,bx2])
	surx2 = MAP(surx2)(domain2D)
	rx = STRUCT([surx1, surx2])

	return STRUCT([r1,r2,rx])

def trasversalUpperTube_2() :
	b1 = BEZIER(S1)([[6.6, 5.5-0.865, 2.3],[6.55, 5.5-0.865, 2.15], [6.5, 5.5-0.865-0.2, 2.15]])
	b2 = BEZIER(S1)([[6.6, 5.5-0.865-0.1, 2.3],[6.55, 5.5-0.865-0.1, 2.25], [6.55, 5.5-0.865-0.2, 2.25]])
	b12 = BEZIER(S1)([[6.6 +0.072, 4.585, 2.25], [6.6+0.05,  4.585, 2.2], [6.65, 5.5-0.865-0.2, 2.18]])
	b13 = BEZIER(S1)([[6.6-0.1 +0.02, 4.585, 2.25],[6.6 -0.1, 4.585, 2.2], [6.55 -0.1, 5.5-0.865-0.2, 2.2]])
	sur11 = BEZIER(S2)([b1, b12, b2])
	sur11 = MAP(sur11)(domain2D)
	sur12 = BEZIER(S2)([b1, b13, b2])
	sur12 = MAP(sur12)(domain2D)
	r1 = STRUCT([sur11, sur12])

	b11 = BEZIER(S1)([[6.6, 0.865, 2.3],[6.55, 0.865, 2.15], [6.5, 0.865+0.2, 2.15]])
	b12 = BEZIER(S1)([[6.6, 0.865+0.1, 2.3],[6.55, 0.865+0.1, 2.25], [6.55, 0.865+0.2, 2.25]])
	b112 = BEZIER(S1)([[6.6 +0.072, 0.915, 2.25], [6.6+0.05,  0.915, 2.2], [6.65, 0.865+0.2, 2.18]])
	b113 = BEZIER(S1)([[6.6-0.1 +0.02, 0.915, 2.25],[6.6 -0.1, 0.915, 2.2], [6.55 -0.1, 0.865+0.2, 2.2]])
	sur21 = BEZIER(S2)([b11, b112, b12])
	sur21 = MAP(sur21)(domain2D)
	sur22 = BEZIER(S2)([b11, b113, b12])
	sur22 = MAP(sur22)(domain2D)
	r2 = STRUCT([sur21, sur22])

	bx1 = BEZIER(S1)([[6.5, 5.5-0.865-0.2, 2.15], [6.5, 0.865+0.2, 2.15]])
	bx2 = BEZIER(S1)([[6.55, 5.5-0.865-0.2, 2.25], [6.55, 0.865+0.2, 2.25]])
	bx3 = BEZIER(S1)([[6.65, 5.5-0.865-0.2, 2.18], [6.65, 0.865+0.2, 2.18]])
	bx4 = BEZIER(S1)([[6.55 -0.1, 5.5-0.865-0.2, 2.2], [6.55 -0.1, 0.865+0.2, 2.2]])
	surx1 = BEZIER(S2)([bx1,bx3,bx2])
	surx1 = MAP(surx1)(domain2D)
	surx2 = BEZIER(S2)([bx1,bx4,bx2])
	surx2 = MAP(surx2)(domain2D)
	rx = STRUCT([surx1, surx2])

	return STRUCT([r1,r2,rx])

def getTable() :
	bx1 = BEZIER(S1)([[-8.3, 0.1, 6.35], [-7.5, 0.1, 7.6], [-6.3, 0.1+0.05, 7.4], [-6.4 , 0.1+0.1, 5.75]])
	bx2 = BEZIER(S1)([[-8.3, 5.5-0.1, 6.35], [-7.5, 5.5-0.1, 7.6], [-6.3, 5.5-0.05-0.1, 7.4], [-6.4, 5.5-0.1-0.1, 5.75]])
	s11 = BEZIER(S2)([bx2, bx1])
	s11 = MAP(s11)(domain2D)

	bx1 = BEZIER(S1)([[-6.4, 0.1+0.1, 5.75], [-6.3, 0.1+0.1, 5.7], [-0.1, 0.1+0.43, 2 +0.05]])
	bx2 = BEZIER(S1)([[-6.4, 5.5-0.1-0.1, 5.75], [-6.3, 5.5-0.1-0.1, 5.7], [-0.1, 5.5-0.43-0.1, 2 +0.05]])
	s12 = BEZIER(S2)([bx2, bx1])
	s12 = MAP(s12)(domain2D)

	bx1 = BEZIER(S1)([[-0.1, 0.1+0.43, 2+0.05], [0, 0.1+0.43, 2], [0.1, 0.1+0.435, 2 +0.05]])
	bx2 = BEZIER(S1)([[-0.1, 5.5-0.43-0.1, 2+0.05], [0, 5.5-0.43-0.1, 2], [0.1, 5.5-0.435-0.1, 2 +0.05]])
	s13 = BEZIER(S2)([bx2, bx1])
	s13 = MAP(s13)(domain2D)

	bx1 = BEZIER(S1)([[0.1, 0.1+0.435, 2 +0.05], [3.8, 0.1+0.6, 4.15]])
	bx2 = BEZIER(S1)([[0.1, 5.5-0.435-0.1, 2 +0.05], [3.8, 5.5-0.6-0.1, 4.15]])
	s14 = BEZIER(S2)([bx2, bx1])
	s14 = MAP(s14)(domain2D)

	bx1 = BEZIER(S1)([[3.8, 0.1+0.6, 4.15], [3.9, 0.1+0.61, 4.2], [4, 0.1+0.62, 4.15]])
	bx2 = BEZIER(S1)([[3.8, 5.5-0.6-0.1, 4.15], [3.9, 5.5-0.61-0.1, 4.2], [4, 5.5-0.62-0.1, 4.15]])
	s15 = BEZIER(S2)([bx2, bx1])
	s15 = MAP(s15)(domain2D)

	bx1 = BEZIER(S1)([[4, 0.1+0.62, 4.15], [5.9, 0.1+0.82, 3.5], [6.8, 0.1+0.85, 3.1]])
	bx2 = BEZIER(S1)([[4, 5.5-0.62-0.1, 4.15], [5.9, 5.5-0.82-0.1, 3.5], [6.8, 5.5-0.85-0.1, 3.1]])
	s16 = BEZIER(S2)([bx2, bx1])
	s16 = MAP(s16)(domain2D)

	#sopra
	delta  = 0.3
	bx1 = BEZIER(S1)([[-8.3, 0.1, 6.35 +delta], [-7.5, 0.1, 7.6+delta], [-6.3 +0.1, 0.1+0.05, 7.4+delta], [-6.4 +0.3 , 0.1+0.1, 5.75+delta -0.25]])
	bx2 = BEZIER(S1)([[-8.3, 5.5-0.1, 6.35+delta], [-7.5, 5.5-0.1, 7.6+delta], [-6.3 +0.1, 5.5-0.05-0.1, 7.4+delta], [-6.4 +0.3, 5.5-0.1-0.1, 5.75+delta -0.25]])
	s21 = BEZIER(S2)([bx2, bx1])
	s21 = MAP(s21)(domain2D)

	bx1 = BEZIER(S1)([[-6.4, 0.1+0.1, 5.75+delta], [-6.3, 0.1+0.1, 5.7+delta], [-0.1, 0.1+0.43, 2 +0.05+delta]])
	bx2 = BEZIER(S1)([[-6.4, 5.5-0.1-0.1, 5.75+delta], [-6.3, 5.5-0.1-0.1, 5.7+delta], [-0.1, 5.5-0.43-0.1, 2 +0.05+delta]])
	s22 = BEZIER(S2)([bx2, bx1])
	s22 = MAP(s22)(domain2D)

	bx1 = BEZIER(S1)([[-0.1, 0.1+0.43, 2+0.05+delta], [0, 0.1+0.43, 2+delta], [0.1, 0.1+0.435, 2 +0.05+delta]])
	bx2 = BEZIER(S1)([[-0.1, 5.5-0.43-0.1, 2+0.05+delta], [0, 5.5-0.43-0.1, 2+delta], [0.1, 5.5-0.435-0.1, 2 +0.05+delta]])
	s23 = BEZIER(S2)([bx2, bx1])
	s23 = MAP(s23)(domain2D)

	bx1 = BEZIER(S1)([[0.1, 0.1+0.435, 2 +0.05+delta], [3.8, 0.1+0.6, 4.15+delta]])
	bx2 = BEZIER(S1)([[0.1, 5.5-0.435-0.1, 2 +0.05+delta], [3.8, 5.5-0.6-0.1, 4.15+delta]])
	s24 = BEZIER(S2)([bx2, bx1])
	s24 = MAP(s24)(domain2D)

	bx1 = BEZIER(S1)([[3.8, 0.1+0.6, 4.15+delta], [3.9, 0.1+0.61, 4.2+delta], [4, 0.1+0.62, 4.15+delta]])
	bx2 = BEZIER(S1)([[3.8, 5.5-0.6-0.1, 4.15+delta], [3.9, 5.5-0.61-0.1, 4.2+delta], [4, 5.5-0.62-0.1, 4.15+delta]])
	s25 = BEZIER(S2)([bx2, bx1])
	s25 = MAP(s25)(domain2D)

	bx1 = BEZIER(S1)([[4, 0.1+0.62, 4.15+delta], [5.9, 0.1+0.82, 3.5+delta], [6.8 +0.1, 0.1+0.85, 3.1+delta]])
	bx2 = BEZIER(S1)([[4, 5.5-0.62-0.1, 4.15+delta], [5.9, 5.5-0.82-0.1, 3.5+delta], [6.8 +0.1, 5.5-0.85-0.1, 3.1+delta]])
	s26 = BEZIER(S2)([bx2, bx1])
	s26 = MAP(s26)(domain2D)

	#bordi
	bx1 = BEZIER(S1)([[-8.3, 0.1, 6.35], [-7.5, 0.1, 7.6], [-6.3, 0.1+0.05, 7.4], [-6.4 , 0.1+0.1, 5.75]])
	bx2 = BEZIER(S1)([[-8.3, 0.1, 6.35 +delta], [-7.5, 0.1, 7.6+delta], [-6.3 +0.1, 0.1+0.05, 7.4+delta], [-6.4 +0.3 , 0.1+0.1, 5.75+delta -0.25]])
	s31_1 = BEZIER(S2)([bx2, bx1])
	s31_1 = MAP(s31_1)(domain2D)

	bx1 = BEZIER(S1)([[-8.3, 5.5-0.1, 6.35], [-7.5, 5.5-0.1, 7.6], [-6.3, 5.5-0.05-0.1, 7.4], [-6.4, 5.5-0.1-0.1, 5.75]])
	bx2 = BEZIER(S1)([[-8.3, 5.5-0.1, 6.35+delta], [-7.5, 5.5-0.1, 7.6+delta], [-6.3 +0.1, 5.5-0.05-0.1, 7.4+delta], [-6.4 +0.3, 5.5-0.1-0.1, 5.75+delta -0.25]])
	s31_2 = BEZIER(S2)([bx2, bx1])
	s31_2 = MAP(s31_2)(domain2D)

	bx1 = BEZIER(S1)([[-6.4, 0.1+0.1, 5.75], [-6.3, 0.1+0.1, 5.7], [-0.1, 0.1+0.43, 2 +0.05]])
	bx2 = BEZIER(S1)([[-6.4, 0.1+0.1, 5.75+delta], [-6.3, 0.1+0.1, 5.7+delta], [-0.1, 0.1+0.43, 2 +0.05+delta]])
	s32_1 = BEZIER(S2)([bx2, bx1])
	s32_1 = MAP(s32_1)(domain2D)

	bx1 = BEZIER(S1)([[-6.4, 5.5-0.1-0.1, 5.75], [-6.3, 5.5-0.1-0.1, 5.7], [-0.1, 5.5-0.43-0.1, 2 +0.05]])
	bx2 = BEZIER(S1)([[-6.4, 5.5-0.1-0.1, 5.75+delta], [-6.3, 5.5-0.1-0.1, 5.7+delta], [-0.1, 5.5-0.43-0.1, 2 +0.05+delta]])
	s32_2 = BEZIER(S2)([bx2, bx1])
	s32_2 = MAP(s32_2)(domain2D)

	bx1 = BEZIER(S1)([[-0.1, 0.1+0.43, 2+0.05], [0, 0.1+0.43, 2], [0.1, 0.1+0.435, 2 +0.05]])
	bx2 = BEZIER(S1)([[-0.1, 0.1+0.43, 2+0.05+delta], [0, 0.1+0.43, 2+delta], [0.1, 0.1+0.435, 2 +0.05+delta]])
	s33_1 = BEZIER(S2)([bx2, bx1])
	s33_1 = MAP(s33_1)(domain2D)

	bx1 = BEZIER(S1)([[-0.1, 5.5-0.43-0.1, 2+0.05], [0, 5.5-0.43-0.1, 2], [0.1, 5.5-0.435-0.1, 2 +0.05]])
	bx2 = BEZIER(S1)([[-0.1, 5.5-0.43-0.1, 2+0.05+delta], [0, 5.5-0.43-0.1, 2+delta], [0.1, 5.5-0.435-0.1, 2 +0.05+delta]])
	s33_2 = BEZIER(S2)([bx2, bx1])
	s33_2 = MAP(s33_2)(domain2D)

	bx1 = BEZIER(S1)([[0.1, 0.1+0.435, 2 +0.05], [3.8, 0.1+0.6, 4.15]])
	bx2 = BEZIER(S1)([[0.1, 0.1+0.435, 2 +0.05+delta], [3.8, 0.1+0.6, 4.15+delta]])
	s34_1 = BEZIER(S2)([bx2, bx1])
	s34_1 = MAP(s34_1)(domain2D)

	bx1 = BEZIER(S1)([[0.1, 5.5-0.435-0.1, 2 +0.05], [3.8, 5.5-0.6-0.1, 4.15]])
	bx2 = BEZIER(S1)([[0.1, 5.5-0.435-0.1, 2 +0.05+delta], [3.8, 5.5-0.6-0.1, 4.15+delta]])
	s34_2 = BEZIER(S2)([bx2, bx1])
	s34_2 = MAP(s34_2)(domain2D)

	bx1 = BEZIER(S1)([[3.8, 0.1+0.6, 4.15], [3.9, 0.1+0.61, 4.2], [4, 0.1+0.62, 4.15]])
	bx2 = BEZIER(S1)([[3.8, 0.1+0.6, 4.15+delta], [3.9, 0.1+0.61, 4.2+delta], [4, 0.1+0.62, 4.15+delta]])
	s35_1 = BEZIER(S2)([bx2, bx1])
	s35_1 = MAP(s35_1)(domain2D)

	bx1 = BEZIER(S1)([[3.8, 5.5-0.6-0.1, 4.15], [3.9, 5.5-0.61-0.1, 4.2], [4, 5.5-0.62-0.1, 4.15]])
	bx2 = BEZIER(S1)([[3.8, 5.5-0.6-0.1, 4.15+delta], [3.9, 5.5-0.61-0.1, 4.2+delta], [4, 5.5-0.62-0.1, 4.15+delta]])
	s35_2 = BEZIER(S2)([bx2, bx1])
	s35_2 = MAP(s35_2)(domain2D)

	bx1 = BEZIER(S1)([[4, 0.1+0.62, 4.15], [5.9, 0.1+0.82, 3.5], [6.8, 0.1+0.85, 3.1]])
	bx2 = BEZIER(S1)([[4, 0.1+0.62, 4.15+delta], [5.9, 0.1+0.82, 3.5+delta], [6.8 +0.1, 0.1+0.85, 3.1+delta]])
	s36_1 = BEZIER(S2)([bx2, bx1])
	s36_1 = MAP(s36_1)(domain2D)

	bx1 = BEZIER(S1)([[4, 5.5-0.62-0.1, 4.15], [5.9, 5.5-0.82-0.1, 3.5], [6.8, 5.5-0.85-0.1, 3.1]])
	bx2 = BEZIER(S1)([[4, 5.5-0.62-0.1, 4.15+delta], [5.9, 5.5-0.82-0.1, 3.5+delta], [6.8 +0.1, 5.5-0.85-0.1, 3.1+delta]])
	s36_2 = BEZIER(S2)([bx2, bx1])
	s36_2 = MAP(s36_2)(domain2D)

	#bordi2
	bx1 = BEZIER(S1)([[6.8, 0.1+0.85, 3.1], [6.8, 5.5-0.85-0.1, 3.1]])
	bx2 = BEZIER(S1)([[6.8 +0.1, 0.1+0.85, 3.1+delta], [6.8 +0.1, 5.5-0.85-0.1, 3.1+delta]])
	s41 = BEZIER(S2)([bx2, bx1])
	s41 = MAP(s41)(domain2D)

	bx1 = BEZIER(S1)([[-8.3, 0.1, 6.35],[-8.3, 5.5-0.1, 6.35]])
	bx2 = BEZIER(S1)([[-8.3, 0.1, 6.35 +delta],[-8.3, 5.5-0.1, 6.35+delta]])
	s42 = BEZIER(S2)([bx2, bx1])
	s42 = MAP(s42)(domain2D)

	table_base = STRUCT([s11, s12, s13, s14, s15, s16,
		s21, s22, s23, s24, s25, s26,
		s31_1, s31_2, s32_1, s32_2, s33_1, s33_2, s34_1, s34_2, s35_1, s35_2, s36_1, s36_2,
		s41, s42])
	return COLOR(red)(table_base)

def circl (sel) :
	def circl0 (r) :
		def circl1 (altezza) :
			def circl2 (p) :
	        		return [ r * COS(sel(p)), r * SIN(sel(p)), altezza ]
			return circl2
		return circl1
	return circl0


def getPillow():
	domPI = INTERVALS(2*PI)(40)
	pillow = getFullCylinder(1.2/2, 5.25, [64,4])
	stitching1 = MAP(circl(S1)(1/2)(0))(domPI)
	stitching5 = MAP(circl(S1)(1.1/2)(0))(domPI)
	stitching6 = MAP(circl(S1)(1.2/2)(0))(domPI)
	stitching2 = MAP(circl(S1)(1/2)(5.25))(domPI)
	stitching3 = MAP(circl(S1)(1.1/2)(5.25))(domPI)
	stitching4 = MAP(circl(S1)(1.2/2)(5.25))(domPI)
	stitchings = STRUCT([stitching1, stitching2, stitching3, stitching4, stitching5, stitching6])
	stitchings = COLOR(red)(stitchings)
	stitchings = R([2,3])(PI/2)(stitchings)
	stitchings = T([1,2,3])([-5.8, 5.35, 7.25])(stitchings)
	pillow = R([2,3])(PI/2)(pillow)
	pillow = T([1,2,3])([-5.8, 5.35, 7.25])(pillow)
	pillow = COLOR([1.5, 1.5, 1.5])(pillow)
	return STRUCT([pillow, stitchings])

#modello
feet = STRUCT([getFeetFront(), getFeetBack()])
down_pipes = STRUCT([getTrasversalTubes(), getTubeFront(), getTubeBack(), getTrasversalPillars()])
upper_pipes = STRUCT([getOvalTrasversalPillars(), getUpperBackTubes(), getUpperFrontalTubes(), trasversalUpperTube_1(), trasversalUpperTube_2()])
table = getTable()
pillow = getPillow()
modelLC4 = STRUCT([feet, down_pipes, upper_pipes, table, pillow])
VIEW(feet)
VIEW(down_pipes)
VIEW(upper_pipes)
VIEW(table)
VIEW(pillow)
VIEW(modelLC4)
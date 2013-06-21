from pyplasm import *

#LC 16 , e LC14 tabourets, in legno
wood = [166.0/255, 128.0/255, 100.0/255]

#libreria, modello base, parametri
height = 7.2

gr_base_x = 6.93
gr_base_y = 2.5
gr_base_z = 0.2

lib_base_x = 7.0
lib_base_y = 2.7
lib_base_z = 0.2

dist_base_int1 = 2

dist_int1_int2 = 2.44

dist_int2_top = 2

int_base1_x = 6.6
int_base1_y = 2.6
int_base1_z = 0.2

def genericLibrary():
	ground_base = CUBOID([gr_base_x, gr_base_y, gr_base_z])
	ground_base = T([1])([-gr_base_x/2])(ground_base)
	library_base = CUBOID([lib_base_x, lib_base_y, lib_base_z])
	library_base = T([1,2,3])([-lib_base_x/2, -(lib_base_y-gr_base_y)/2, gr_base_z])(library_base)
	library_top = T([3])([gr_base_z + lib_base_z + dist_base_int1 + dist_int1_int2 + dist_int2_top])(library_base)
	library_back = CUBOID([lib_base_x, 0.2, height - gr_base_z])
	library_back = T([1,2,3])([-lib_base_x/2, 2.7 - 0.3, gr_base_z])(library_back)
	library_dx =  CUBOID([0.2, 2.7, 7])
	library_dx= T([1,2,3])([int_base1_x/2 , -0.1, gr_base_z])(library_dx)
	library_sx = T([1])([-2*int_base1_x/2 - gr_base_z])(library_dx)
	return STRUCT([ground_base, library_base, library_top, library_back, library_dx, library_sx])

def sideLibrary():
	intermediate_base_1 = CUBOID([int_base1_x, int_base1_y, int_base1_z])
	intermediate_base_1 = T([1,2,3])([-int_base1_x/2, -(lib_base_y-int_base1_y) , dist_base_int1 + gr_base_z + lib_base_z])(intermediate_base_1)
	intermediate_base_2 = T([3])([dist_int1_int2])(intermediate_base_1)
	return STRUCT([intermediate_base_1, intermediate_base_2, genericLibrary()])

def centralLibrary():
	library_int_cx = CUBOID([int_base1_x, int_base1_y, int_base1_z])
	library_int_cx = T([1,2,3])([-int_base1_x/2, -(lib_base_y-int_base1_y) , dist_base_int1 + gr_base_z + lib_base_z +1.2])(library_int_cx)
	return STRUCT([genericLibrary(), library_int_cx])

#composizione della libreria
def getLibrary():
	lib_sx = T([1])([-lib_base_x])(sideLibrary())
	lib_dx = T([1])([lib_base_x])(sideLibrary())
	lib_cx = centralLibrary()
	lib = STRUCT([lib_sx, lib_dx, lib_cx])
	return lib


#SEDIE "SCATOLE" LC14 		""""" altezza = 4  y= 4  x= 3 """""
domainPI = DOMAIN([[0,1],[0,2*PI]])([20,50])
domain1D = INTERVALS(1)(20)
domain2D = DOMAIN([[0,1],[0,1]])([30,30])

#facciate parallela al pavimento
def getSurfaceZ() :
	profile_edge_1 = BEZIER(S1)([[-1.5, -2, 0], [1.5, -2, 0]])
	profile_edge_2 = BEZIER(S1)([[-1.5, 2, 0], [1.5, 2, 0]])
	profile_edge_3 = BEZIER(S1)([[-1.5, -2, 0], [-1.5, 2, 0]])
	profile_edge_4 = BEZIER(S1)([[1.5, -2, 0], [1.5, 2, 0]])
	
	inner_profile_edge_1 = BEZIER(S1)([[0.15, -0.4, 0], [0.15, 0.4, 0]])
	inner_profile_edge_2 = BEZIER(S1)([[-0.15, -0.4, 0], [-0.15, 0.4, 0]])

	inner_profile_edge_c1 = BEZIER(S1)([[-0.15, -0.4, 0], [-0.15, -0.6, 0], [0.15, -0.6, 0], [0.15, -0.4, 0]])
	inner_profile_edge_c2 = BEZIER(S1)([[-0.15, 0.4, 0], [-0.15, 0.6, 0], [0.15, 0.6, 0], [0.15, 0.4, 0]])

	profile_surface_z1 = BEZIER(S2)([profile_edge_3, inner_profile_edge_2])
	profile_surface_z2 = BEZIER(S2)([profile_edge_4, inner_profile_edge_1])
	profile_surface_z3 = BEZIER(S2)([profile_edge_2, inner_profile_edge_c2])
	profile_surface_z4 = BEZIER(S2)([profile_edge_1, inner_profile_edge_c1])

	sz1 = MAP(profile_surface_z1)(domain2D)
	sz2 = MAP(profile_surface_z2)(domain2D)
	sz3 = MAP(profile_surface_z3)(domain2D)
	sz4 = MAP(profile_surface_z4)(domain2D)

	surface_z = STRUCT([sz1, sz2, sz3, sz4])
	return surface_z

#facciate perpendicolare al pavimento - 1
def getSurfaceX() :
	profile_edge_1 = BEZIER(S1)([[-2, -2, 0], [-2, 2, 0]])
	profile_edge_2 = BEZIER(S1)([[2, -2, 0], [2, 2, 0]])
	profile_edge_3 = BEZIER(S1)([[-2, -2, 0], [2, -2, 0]])
	profile_edge_4 = BEZIER(S1)([[-2, 2, 0], [2, 2, 0]])

	inner_profile_edge_1 = BEZIER(S1)([[-0.5, -0.2, 0], [0.5, -0.2, 0]])
	inner_profile_edge_2 = BEZIER(S1)([[-0.5, 0.2, 0], [0.5, 0.2, 0]])


	inner_profile_edge_c1 = BEZIER(S1)([[-0.5, -0.2, 0], [-0.7, -0.2, 0], [-0.7, 0.2, 0], [-0.5, 0.2, 0]])
	inner_profile_edge_c2 = BEZIER(S1)([[0.5, -0.2, 0], [0.7, -0.2, 0], [0.7, 0.2, 0], [0.5, 0.2, 0]])

	profile_surface_x1 = BEZIER(S2)([profile_edge_3, inner_profile_edge_1])
	profile_surface_x2 = BEZIER(S2)([profile_edge_4, inner_profile_edge_2])
	profile_surface_x3 = BEZIER(S2)([inner_profile_edge_c2, profile_edge_2])
	profile_surface_x4 = BEZIER(S2)([inner_profile_edge_c1, profile_edge_1])

	sx1 = MAP(profile_surface_x1)(domain2D)
	sx2 = MAP(profile_surface_x2)(domain2D)
	sx3 = MAP(profile_surface_x3)(domain2D)
	sx4 = MAP(profile_surface_x4)(domain2D)

	surface_x = STRUCT([sx1, sx2, sx3, sx4])
	return surface_x

#facciate perpendicolare al pavimento - 2
def getSurfaceY() :
	profile_edge_1 = BEZIER(S1)([[-1.5, -2, 0], [-1.5, 2, 0]])
	profile_edge_2 = BEZIER(S1)([[1.5, -2, 0], [1.5, 2, 0]])
	profile_edge_3 = BEZIER(S1)([[-1.5, -2, 0], [1.5, -2, 0]])
	profile_edge_4 = BEZIER(S1)([[-1.5, 2, 0], [1.5, 2, 0]])

	profile_surface_y1 = BEZIER(S2)([profile_edge_2, profile_edge_1])
	return MAP(profile_surface_y1)(domain2D)

def getChair() :
	surface_z = (getSurfaceZ())
	surface_z_top = T([3])([4])(surface_z)
	surface_x = (getSurfaceX())
	surface_x = R([1,2])(PI/2)(surface_x)
	surface_x = R([1,3])(PI/2)(surface_x)
	surface_x = T([1,2,3])([1.5,0,2])(surface_x)
	surface_x_2 = T([1])([-3])(surface_x)
	surface_y = getSurfaceY()
	surface_y = R([2,3])(PI/2)(surface_y)
	surface_y = T([1,2,3])([0,2,2])(surface_y)
	surface_y_2 = T([2])([-4])(surface_y)
	chair = STRUCT([surface_z, surface_z_top, surface_x, surface_x_2, surface_y, surface_y_2])
	return chair

def getChairs():
	chair1 = T([1,2])([-4, -3.5])(getChair())
	chair2 =  T([1])([8])(chair1)
	return STRUCT([chair1, chair2])

#TAVOLINO COLLEGATO ALLA LIBRERIA
def getTable():
	pillar = T([1,2])([1, -7 +1.2])(getPillar(0.55, 7.15, [32,4]))
	plane = T([1,2,3])([-(7-5.3) -0.1, -7, 7.04])(getPlane())
	return STRUCT([pillar, plane])

def annulus_sector (alpha, r, R, dim) :
	domain = DOMAIN([[0,2*PI],[r,R]])(dim)
	def mapping (v) :
		a = v[0]
		r = v[1]
		return [r*COS(a), r*SIN(a)]
	model = MAP(mapping)(domain)
	return model

def MYEXTRUDE (h):
	def MYEXTRUDE0(model):
		return PROD([model,Q(h)])
	return MYEXTRUDE0

def getPillar(r, h, dim):
	cyl = annulus_sector(2*PI, 0, r, dim);
	cyl = MYEXTRUDE(h)(cyl)
	return cyl

def getPlane():
	top_table = CUBOID([5.3, 7.5, 0.2])
	btx_1 =  CUBOID([5.3, 0.2, 0.7])
	btx_1 = T([3])([-0.7])(btx_1)
	btx_2 = T([2])([7.5])(btx_1)
	bty_1 = CUBOID([0.2, 7.5, 0.7])
	bty_1 = T([3])([-0.7])(bty_1)
	bty_2 = T([1])([5.3 -0.2])(bty_1)
	plane = STRUCT([top_table, btx_1, btx_2, bty_1, bty_2])
	return plane

# MODELLI LC16 E LC14
modelLC16_LC14 = STRUCT([getLibrary(), getTable(), getChairs()])
VIEW(getLibrary())
VIEW(getChairs())
VIEW(getTable())
modelLC16_LC14 = COLOR(wood)(modelLC16_LC14)
VIEW(modelLC16_LC14)
from pyplasm import *

glass = [185.0/256,211.0/256,238.0/256]
glass2 = [198/256,226/256,255/256]
dark_grey = [0.2, 0.2, 0.2]
light_gray = [266/255,266/255,266/255]

#spessore sostegno che unisce i piedi del tavolino alti 0.32 e spessi 0.2 lunghezza è distance_pillars

#ripiano tavolino
dx = 12
dy = 8
dz = 0.16

#pilastrini
height = 3.3 - dz #3.14
final_disk_spessore = 0.08
radius = 0.45/2 #2.25

distance_pillars_y = 7.1
distance_pillars_x = 11.1

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

domain1D = INTERVALS(1)(20)
domain2D = DOMAIN([[0,1],[0,1]])([30,30])
domainPI = DOMAIN2D([ INTERVALS(2 * PI)(32), INTERVALS(2 * PI)(32) ])

def circl (sel) :
	def circl0 (r) :
		def circl1 (altezza) :
			def circl2 (p) :
	        		return [ r * COS(sel(p)), r * SIN(sel(p)), altezza ]
			return circl2
		return circl1
	return circl0

def MYEXTRUDE (h):
	def MYEXTRUDE0(model):
		return PROD([model,Q(h)])
	return MYEXTRUDE0

def getFullCylinder(r, h, dim):
	cyl = annulus_sector(2*PI, 0, radius);
	cyl = MYEXTRUDE(h)(cyl)
	return cyl

def torus (R, r) :
  def toruS1 (v) :
     a = v[0]
     b = v[1] 
     u = (r * COS(a)+2*R) * (COS(b))
     v = (r * COS(a)+2*R) * (SIN(b))
     w = (r * SIN(a))
     return [u,v,w]
  return toruS1

def annulus_sector (alpha, r, R) :
	domain = DOMAIN([[0,2*PI],[r,R]])([36,36])
	def mapping (v) :
		a = v[0]
		r = v[1]
		return [r*COS(a), r*SIN(a)]
	model = MAP(mapping)(domain)
	return model

def getPillar(radius, height) :
	height = height - final_disk_spessore
	domain = DOMAIN2D([ INTERVALS(2 * PI)(32), INTERVALS(2 * PI)(32) ])
	p = getFullCylinder(radius, height, [32,2])
	p = COLOR(light_gray)(p)
	mapping = torus(radius/2,radius/4)
  	base = MAP(mapping)(domain)
  	base = COLOR(light_gray)(base)
	circle_full = annulus_sector(2*PI, 0, radius);
  	top = MYEXTRUDE(final_disk_spessore)(circle_full)
  	top = T([3])([height])(top)
  	top = COLOR([0,0,0])(top)
  	return STRUCT([p, base, top])


def getTableLedge(dx, dy, dz) :
	b01 = BEZIER(S1)([[0,0,height], [dx,0,height]])
	b11 = BEZIER(S1)([[0,0,height+dz], [dx,0,height+dz]])

	b02 = BEZIER(S1)([[0,0+dy,height], [dx,0+dy,height]])
	b12 = BEZIER(S1)([[0,0+dy,height+dz], [dx,0+dy,height+dz]])

	b03 = BEZIER(S1)([[0,0,height], [0,dy,height]])
	b13 = BEZIER(S1)([[0,0,height+dz], [0,dy,height+dz]])

	b04 = BEZIER(S1)([[dx,0,height], [dx,dy,height]])
	b14 = BEZIER(S1)([[dx,0,height+dz], [dx,dy,height+dz]])

	S11 = BEZIER(S2)([b01, b02])
	S11 = MAP(S11)(domain2D)

	s11 = BEZIER(S2)([b11, b12])
	s11 = MAP(s11)(domain2D)

	sx1 = BEZIER(S2)([b01,b11])
	sx1 = MAP(sx1)(domain2D)

	sx2 = BEZIER(S2)([b02,b12])
	sx2 = MAP(sx2)(domain2D)

	sy1 = BEZIER(S2)([b03,b13])
	sy1 = MAP(sy1)(domain2D)

	sy2 = BEZIER(S2)([b04,b14])
	sy1 = MAP(sy2)(domain2D)

	ledge = STRUCT([S11, s11, sx1, sx2, sy1, sy2])
	ledge = COLOR(glass)(ledge)
	ledge = T([1,2])([-0.45, -0.45])(ledge)
	return ledge

def getJunctions(dy, dz, v_dy, v_dz) :
	c1 = CUBOID([distance_pillars_x, dy, dz])
	c2 = T([2])([distance_pillars_y])(c1)
	junctions_1 = STRUCT([c1, c2])
	junctions_1 = T([2,3])([-dy/2, height-final_disk_spessore])(junctions_1)
	junctions_1 = COLOR(glass2)(junctions_1)

	c3 = CUBOID([dy, distance_pillars_y, dz])
	c4 = T([1])([distance_pillars_x])(c3)
	junctions_2 = STRUCT([c3, c4])
	junctions_2 = T([1,3])([-dy/2, height-final_disk_spessore])(junctions_2)
	junctions_2 = COLOR(glass2)(junctions_2)

	cx1 = CUBOID([distance_pillars_x, v_dy, v_dz])
	cx2 = T([2])([distance_pillars_y])(cx1)
	junctions_3 = STRUCT([cx1, cx2])
	junctions_3 = T([2,3])([-v_dy/2, height-final_disk_spessore-v_dz])(junctions_3)
	junctions_3 = COLOR(dark_grey)(junctions_3)

	cy1 = CUBOID([v_dy, distance_pillars_y, v_dz])
	cy2 = T([1])([distance_pillars_x])(cy1)
	junctions_4 = STRUCT([cy1, cy2])
	junctions_4 = T([1,3])([-v_dy/2, height-final_disk_spessore-v_dz])(junctions_4)
	junctions_4 = COLOR(dark_grey)(junctions_4)

	junctions = STRUCT([junctions_1, junctions_2, junctions_3, junctions_4])
	return junctions

p1 = getPillar(radius,height)
p2 = T([2])([distance_pillars_y])(p1)
p3 = T([1])([distance_pillars_x])(p2)
p4 = T([2])([-distance_pillars_y])(p3)

pillars = STRUCT([p1,p2,p3,p4])

junctions = getJunctions(radius*2, 0.02, 0.2, 0.32)	#spessore sostegno che unisce i piedi del tavolino alti 0.32 e spessi 0.2 lunghezza è distance_pillars

tableLedge = getTableLedge(dx, dy, dz)
modelLC10 = STRUCT([pillars, junctions, tableLedge])
VIEW(tableLedge)
VIEW(junctions)
VIEW(pillars)
VIEW(modelLC10)
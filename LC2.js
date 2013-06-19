//sofa_color = [205.0/255, 102.0/255, 0];
sofa_color = [143/255, 188/255, 143/255];
pipes_color = [139/255, 37/255, 0];

var numberOfSeats = 1;
var seat_dx = 4.66;	//+ e - 2.33 se centrato nell'origine

var domainPI = DOMAIN([[0,1],[0,2*PI]])([10,32]);
var domain1D = INTERVALS(1)(20);
var domain2D = DOMAIN([[0,1],[0,1]])([25,25]);
var domain3D = DOMAIN([[0,1],[0,1],[0,1]])([100,5,1]);

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


//braccioli divano/poltrona
var arm_dz = 5.43;
var arm_dx = 1.47;
var arm_dy = 6.62;

//totale
var dx = 7.6;
var dz = 6.6;
var dy = 7.0;


function getArms(dx, n){
	var arms = STRUCT([getArmSkeleton(dx*n), getArmPillows(dx*n)]);
	return arms;
}

//frontal feet
function getArmSkeleton(dx) {
	var domain = DOMAIN([[0,2*PI],[0,2*PI]])([45,45]);
	var b11 = BEZIER(S0)([[dx + 0.38, 0, 0], [dx + 0.38, 0, 5.33]]);
	var b21 = BEZIER(S0)([[dx + 0.38 + 0.22, 0, 0], [dx + 0.38 + 0.22, 0, 5.33]]);
	var sur1 = CUBIC_HERMITE(S1)([b11,b21,[0,-0.44,0],[0,0.44,0]]);
	var sur2 = CUBIC_HERMITE(S1)([b11,b21,[0,0.44,0],[0,-0.44,0]])
	sur1 = MAP(sur1)(domain2D);
	sur2 = MAP(sur2)(domain2D);
	var mapping = torus(0.22/4,0.22/8);
  	var base = T([0])([dx + 0.38 + 0.11])(MAP(mapping)(domain));
	var f1 = STRUCT([sur1, sur2, base]);

	b11 = BEZIER(S0)([[-dx - 0.38, 0, 0], [-dx - 0.38, 0, 5.33]]);
	b21 = BEZIER(S0)([[-dx - 0.38 - 0.22, 0, 0], [-dx - 0.38 - 0.22, 0, 5.33]]);
	sur1 = CUBIC_HERMITE(S1)([b11,b21,[0,-0.44,0],[0,0.44,0]]);
	sur2 = CUBIC_HERMITE(S1)([b11,b21,[0,0.44,0],[0,-0.44,0]])
	sur1 = MAP(sur1)(domain2D);
	sur2 = MAP(sur2)(domain2D);
	mapping = torus(0.22/4,0.22/8);
  	base = T([0])([-dx - 0.38 - 0.11])(MAP(mapping)(domain));
	var f2 = STRUCT([sur1, sur2, base]);

	//continuo tubi
	var c1 = CUBIC_HERMITE(S0)([[dx + 0.38, 0, 5.33],[dx + 0.38 +0.22+0.1, 0, 5.33+0.34],[0,0,0.75],[0.75,0,0]]);
	//DRAW(MAP(c1)(domain1D))
	var c2 = CUBIC_HERMITE(S0)([[dx + 0.38 +0.22, 0, 5.33],[dx + 0.38 +0.22+0.1, 0, 5.33 +0.12],[0,0,0.25],[0.25,0,0]]);
	//DRAW(MAP(c2)(domain1D))
	sur1 = CUBIC_HERMITE(S1)([c1,c2,[0,0.44,0],[0,-0.44,0]]);
	sur1 = MAP(sur1)(domain2D);
	sur2 = CUBIC_HERMITE(S1)([c1,c2,[0,-0.44,0],[0,0.44,0]]);
	sur2 = MAP(sur2)(domain2D);
	var f1x = STRUCT([sur1, sur2])

	c1 = CUBIC_HERMITE(S0)([[-dx - 0.38, 0, 5.33],[-dx - 0.38 -0.22-0.1, 0, 5.33+0.34],[0,0,0.75],[-0.75,0,0]]);
	c2 = CUBIC_HERMITE(S0)([[-dx - 0.38 -0.22, 0, 5.33],[-dx - 0.38 -0.22-0.1, 0, 5.33 +0.12],[0,0,0.25],[-0.25,0,0]]);
	sur1 = CUBIC_HERMITE(S1)([c1,c2,[0,0.44,0],[0,-0.44,0]]);
	sur1 = MAP(sur1)(domain2D);
	sur2 = CUBIC_HERMITE(S1)([c1,c2,[0,-0.44,0],[0,0.44,0]]);
	sur2 = MAP(sur2)(domain2D);
	var f2x = STRUCT([sur1, sur2]);

	//continuo2
	b11 = BEZIER(S0)([[dx + 0.38 +0.22+0.1, 0, 5.33+0.34], [dx + 0.38 +0.22+0.1 + 0.7, 0, 5.33+0.34]]);
	b21 = BEZIER(S0)([[dx + 0.38 +0.22+0.1, 0, 5.33+0.12], [dx + 0.38 +0.22+0.1 + 0.7, 0, 5.33+0.12]]);
	sur1 = CUBIC_HERMITE(S1)([b11,b21,[0,-0.44,0],[0,0.44,0]]);
	sur2 = CUBIC_HERMITE(S1)([b11,b21,[0,0.44,0],[0,-0.44,0]])
	sur1 = MAP(sur1)(domain2D);
	sur2 = MAP(sur2)(domain2D);
	var fy1 = STRUCT([sur1, sur2]);

	b11 = BEZIER(S0)([[-dx - 0.38 -0.22-0.1, 0, 5.33+0.34], [-dx - 0.38 -0.22-0.1 - 0.7, 0, 5.33+0.34]]);
	b21 = BEZIER(S0)([[-dx - 0.38 -0.22-0.1, 0, 5.33 +0.12], [-dx - 0.38 -0.22-0.1 - 0.7, 0, 5.33 +0.12]]);
	sur1 = CUBIC_HERMITE(S1)([b11,b21,[0,-0.44,0],[0,0.44,0]]);
	sur2 = CUBIC_HERMITE(S1)([b11,b21,[0,0.44,0],[0,-0.44,0]])
	sur1 = MAP(sur1)(domain2D);
	sur2 = MAP(sur2)(domain2D);
	var fy2 = STRUCT([sur1, sur2]);

	//continuo3
	c1 = CUBIC_HERMITE(S0)([[dx + 0.38 +0.22+0.1 + 0.7, -0.11, 5.33+0.23],[dx + 0.38 +0.22+0.1 + 0.7 +0.34, 0.22, 5.33+0.23],[0.75,0,0],[0,0.75,0]]);
	//DRAW(MAP(c1)(domain1D))
	c2 = CUBIC_HERMITE(S0)([[dx + 0.38 +0.22+0.1 + 0.7, 0.11, 5.33 +0.23],[dx + 0.38 +0.22+0.1 + 0.7 +0.12, 0.22, 5.33 +0.23],[0.25,0,0],[0,0.25,0]]);
	//DRAW(MAP(c2)(domain1D))
	sur1 = CUBIC_HERMITE(S1)([c1,c2,[0,0,0.44],[0,0,-0.44]]);
	sur1 = MAP(sur1)(domain2D);
	sur2 = CUBIC_HERMITE(S1)([c1,c2,[0,0,-0.44],[0,0,0.44]]);
	sur2 = MAP(sur2)(domain2D);
	var f1z = STRUCT([sur1, sur2]);

	c1 = CUBIC_HERMITE(S0)([[-dx - 0.38 -0.22-0.1 - 0.7, -0.11, 5.33+0.23],[-dx - 0.38 -0.22-0.1 - 0.7 -0.34, 0.22, 5.33+0.23],[-0.75,0,0],[0,0.75,0]]);
	c2 = CUBIC_HERMITE(S0)([[-dx - 0.38 -0.22-0.1 - 0.7, 0.11, 5.33 +0.23],[-dx - 0.38 -0.22-0.1 - 0.7 -0.12, 0.22, 5.33 +0.23],[-0.25,0,0],[0,0.25,0]]);
	sur1 = CUBIC_HERMITE(S1)([c1,c2,[0,0,0.44],[0,0,-0.44]]);
	sur1 = MAP(sur1)(domain2D);
	sur2 = CUBIC_HERMITE(S1)([c1,c2,[0,0,-0.44],[0,0,0.44]]);
	sur2 = MAP(sur2)(domain2D);
	var f2z = STRUCT([sur1, sur2]);
	
	//continuo4
	c1 = CUBIC_HERMITE(S0)([[dx + 0.38 +0.22+0.1 + 0.7 +0.34, 0.22, 5.33+0.23], [dx + 0.38 +0.22+0.1 + 0.7 +0.34, 0.22+6.62, 5.33+0.23], [0,0,0],[0,0,0]]);
	//DRAW(MAP(c1)(domain1D))
	c2 = CUBIC_HERMITE(S0)([[dx + 0.38 +0.22+0.1 + 0.7 +0.12, 0.22, 5.33 +0.23], [dx + 0.38 +0.22+0.1 + 0.7 +0.12, 0.22+6.62, 5.33 +0.23], [0,0,0],[0,0,0]]);
	//DRAW(MAP(c2)(domain1D))
	sur1 = CUBIC_HERMITE(S1)([c1,c2,[0,0,0.44],[0,0,-0.44]]);
	sur1 = MAP(sur1)(domain2D);
	sur2 = CUBIC_HERMITE(S1)([c1,c2,[0,0,-0.44],[0,0,0.44]]);
	sur2 = MAP(sur2)(domain2D);
	var f11y = STRUCT([sur1, sur2]);

	c1 = CUBIC_HERMITE(S0)([[-dx - 0.38 -0.22-0.1 - 0.7 -0.34, 0.22, 5.33 +0.23], [-dx - 0.38 -0.22-0.1 - 0.7 -0.34, 0.22+6.62, 5.33+0.23], [0,0,0],[0,0,0]]);
	c2 = CUBIC_HERMITE(S0)([[-dx - 0.38 -0.22-0.1 - 0.7 -0.12, 0.22, 5.33 +0.23], [-dx - 0.38 -0.22-0.1 - 0.7 -0.12, 0.22+6.62, 5.33 +0.23], [0,0,0],[0,0,0]]);
	sur1 = CUBIC_HERMITE(S1)([c1,c2,[0,0,0.44],[0,0,-0.44]]);
	sur1 = MAP(sur1)(domain2D);
	sur2 = CUBIC_HERMITE(S1)([c1,c2,[0,0,-0.44],[0,0,0.44]]);
	sur2 = MAP(sur2)(domain2D);
	var f22y = STRUCT([sur1, sur2]);

	//continuo5
	c1 = CUBIC_HERMITE(S0)([[dx + 0.38 +0.22+0.1 + 0.7 +0.34, 0.22+6.62, 5.33+0.23], [dx + 0.38 +0.22+0.1 + 0.7 +0.12 -0.1, 0.22+6.62+0.34, 5.33+0.23], [0,0.75,0],[-0.75,0,0]]);
	c2 = CUBIC_HERMITE(S0)([[dx + 0.38 +0.22+0.1 + 0.7 +0.12, 0.22+6.62, 5.33+0.23], [dx + 0.38 +0.22+0.1 + 0.7 +0.12 -0.1, 0.22+6.62+0.12, 5.33 +0.23], [0,0.25,0],[-0.25,0,0]]);
	sur1 = CUBIC_HERMITE(S1)([c1,c2,[0,0,0.44],[0,0,-0.44]]);
	sur1 = MAP(sur1)(domain2D);
	sur2 = CUBIC_HERMITE(S1)([c1,c2,[0,0,-0.44],[0,0,0.44]]);
	sur2 = MAP(sur2)(domain2D);
	var f3 = STRUCT([sur1, sur2]);

	c1 = CUBIC_HERMITE(S0)([[-dx - 0.38 -0.22-0.1 - 0.7 -0.34, 0.22+6.62, 5.33+0.23], [-dx - 0.38 -0.22-0.1 - 0.7 -0.12 +0.1, 0.22+6.62+0.34, 5.33+0.23], [0,0.75,0],[0.75,0,0]]);
	c2 = CUBIC_HERMITE(S0)([[-dx - 0.38 -0.22-0.1 - 0.7 -0.12, 0.22+6.62, 5.33+0.23], [-dx - 0.38 -0.22-0.1 - 0.7 -0.12 +0.1, 0.22+6.62+0.12, 5.33 +0.23], [0,0.25,0],[0.25,0,0]]);
	sur1 = CUBIC_HERMITE(S1)([c1,c2,[0,0,0.44],[0,0,-0.44]]);
	sur1 = MAP(sur1)(domain2D);
	sur2 = CUBIC_HERMITE(S1)([c1,c2,[0,0,-0.44],[0,0,0.44]]);
	sur2 = MAP(sur2)(domain2D);
	var f4 = STRUCT([sur1, sur2]);

	//continuo6
	c1 = CUBIC_HERMITE(S0)([[dx + 0.38 +0.22+0.1 + 0.7 +0.12 -0.1, 0.22+6.62+0.34, 5.33+0.23], [dx + 0.38 +0.22+0.1 + 0.7 +0.12 -0.1 -1.47, 0.22+6.62+0.34, 5.33+0.23], [0,0,0],[0,0,0]]);
	c2 = CUBIC_HERMITE(S0)([[dx + 0.38 +0.22+0.1 + 0.7 +0.12 -0.1, 0.22+6.62+0.12, 5.33+0.23], [dx + 0.38 +0.22+0.1 + 0.7 +0.12 -0.1 -1.47, 0.22+6.62+0.12, 5.33+0.23], [0,0,0],[0,0,0]]);
	sur1 = CUBIC_HERMITE(S1)([c1,c2,[0,0,0.44],[0,0,-0.44]]);
	sur1 = MAP(sur1)(domain2D);
	sur2 = CUBIC_HERMITE(S1)([c1,c2,[0,0,-0.44],[0,0,0.44]]);
	sur2 = MAP(sur2)(domain2D);
	var f5 = STRUCT([sur1, sur2]);

	c1 = CUBIC_HERMITE(S0)([[-dx - 0.38 -0.22-0.1 - 0.7 -0.12 +0.1, 0.22+6.62+0.34, 5.33+0.23],[-dx - 0.38 -0.22-0.1 - 0.7 -0.12 +0.1+1.47, 0.22+6.62+0.34, 5.33+0.23], [0,0,0],[0,0,0]]);
	c2 = CUBIC_HERMITE(S0)([[-dx - 0.38 -0.22-0.1 - 0.7 -0.12 +0.1, 0.22+6.62+0.12, 5.33+0.23],[-dx - 0.38 -0.22-0.1 - 0.7 -0.12 +0.1+1.47, 0.22+6.62+0.12, 5.33 +0.23],[0,0,0],[0,0,0]]);
	sur1 = CUBIC_HERMITE(S1)([c1,c2,[0,0,0.44],[0,0,-0.44]]);
	sur1 = MAP(sur1)(domain2D);
	sur2 = CUBIC_HERMITE(S1)([c1,c2,[0,0,-0.44],[0,0,0.44]]);
	sur2 = MAP(sur2)(domain2D);
	var f6 = STRUCT([sur1, sur2]);

	//DIS-continuo7
	c1 = CUBIC_HERMITE(S0)([[dx + 0.38 +0.22+0.1 + 0.8 +0.12 -0.1 -1.47, 0.22+6.62+0.23, 5.33+0.23],
		[dx + 0.38 +0.22+0.1 + 0.8 +0.12 -0.1 -1.47, 0.22+6.62+0.23, 0], 
		[0,0,0],[0,0,0]]);
	c2 = CUBIC_HERMITE(S0)([[dx + 0.38 +0.22+0.1 + 0.8 +0.12 -0.1 -1.47 -0.22, 0.22+6.62+0.23, 5.33+0.23], 
		[dx + 0.38 +0.22+0.1 + 0.8 +0.12 -0.1 -1.47 -0.22, 0.22+6.62+0.23, 0],
		[0,0,0],[0,0,0]]);
	sur1 = CUBIC_HERMITE(S1)([c1,c2,[0,0.44,0],[0,-0.44,0]]);
	sur1 = MAP(sur1)(domain2D);
	sur2 = CUBIC_HERMITE(S1)([c1,c2,[0,-0.44,0],[0,0.44,0]]);
	sur2 = MAP(sur2)(domain2D);
	mapping = torus(0.22/4,0.22/8);
  	base = T([0,1])([dx + 0.38 +0.22+0.1 + 0.8 +0.12 -0.1-1.47-0.22+ 0.11, 0.22+6.62+0.23])(MAP(mapping)(domain));
  	var f7 = STRUCT([sur1, sur2, base]);

	c1 = CUBIC_HERMITE(S0)([[-dx - 0.38 -0.22-0.1 - 0.8 -0.12 +0.1+1.47, 0.22+6.62+0.23, 5.33+0.23],
		[-dx - 0.38 -0.22-0.1 - 0.8 -0.12 +0.1+1.47, 0.22+6.62+0.23, 0],
		[0,0,0],[0,0,0]]);
	c2 = CUBIC_HERMITE(S0)([[-dx - 0.38 -0.22-0.1 - 0.8 -0.12 +0.1+1.47 +0.22, 0.22+6.62+0.23, 5.33 +0.23],
		[-dx - 0.38 -0.22-0.1 - 0.8 -0.12 +0.1+1.47+0.22, 0.22+6.62+0.23, 0],
		[0,0,0],[0,0,0]]);
	sur1 = CUBIC_HERMITE(S1)([c1,c2,[0,0.44,0],[0,-0.44,0]]);
	sur1 = MAP(sur1)(domain2D);
	sur2 = CUBIC_HERMITE(S1)([c1,c2,[0,-0.44,0],[0,0.44,0]]);
	sur2 = MAP(sur2)(domain2D);
	mapping = torus(0.22/4,0.22/8);
  	base = T([0,1])([-dx - 0.38 -0.22-0.1 - 0.8 -0.12 +0.1+1.47+0.22- 0.11, 0.22+6.62+0.23])(MAP(mapping)(domain));
  	var f8 = STRUCT([sur1, sur2, base]);

	//intermedio laterale 1 dz=2.14=1.02+0.9+0.22
	c1 = CUBIC_HERMITE(S0)([[dx + 0.38 +0.11, -0.055, 2.14 +0.055], [dx + 0.38 +0.11+0.9, -0.055, 2.14 +0.055], [0,0,0],[0,0,0]]);
	c2 = CUBIC_HERMITE(S0)([[dx + 0.38 +0.11, +0.055, 2.14 +0.055], [dx + 0.38 +0.11+0.9, +0.055, 2.14 +0.055], [0,0,0],[0,0,0]]);
	sur1 = CUBIC_HERMITE(S1)([c1,c2,[0,0,0.22],[0,0,-0.22]]);
	sur1 = MAP(sur1)(domain2D);
	sur2 = CUBIC_HERMITE(S1)([c1,c2,[0,0,-0.22],[0,0,0.22]]);
	sur2 = MAP(sur2)(domain2D);
	var f9 = STRUCT([sur1, sur2]);

	c1 = CUBIC_HERMITE(S0)([[-dx - 0.38 -0.11, -0.055, 2.14 +0.055], [-dx - 0.38 -0.11-0.9, -0.055, 2.14 +0.055], [0,0,0],[0,0,0]]);
	c2 = CUBIC_HERMITE(S0)([[-dx - 0.38 -0.11, +0.055, 2.14 +0.055], [-dx - 0.38 -0.11-0.9, +0.055, 2.14 +0.055], [0,0,0],[0,0,0]]);
	sur1 = CUBIC_HERMITE(S1)([c1,c2,[0,0,0.22],[0,0,-0.22]]);
	sur1 = MAP(sur1)(domain2D);
	sur2 = CUBIC_HERMITE(S1)([c1,c2,[0,0,-0.22],[0,0,0.22]]);
	sur2 = MAP(sur2)(domain2D);
	var f10 = STRUCT([sur1, sur2]);

	//intermedio laterale 2
	c1 = CUBIC_HERMITE(S0)([[dx + 0.38 +0.11+0.9, -0.055, 2.14 +0.055], [dx + 0.38 +0.11+0.9+0.22, +0.155, 2.14 +0.055], [0.5,0,0],[0,0.5,0]]);
	c2 = CUBIC_HERMITE(S0)([[dx + 0.38 +0.11+0.9, +0.055, 2.14 +0.055], [dx + 0.38 +0.11+0.9+0.11, +0.155, 2.14 +0.055], [0.25,0,0],[0,0.25,0]]);
	sur1 = CUBIC_HERMITE(S1)([c1,c2,[0,0,0.22],[0,0,-0.22]]);
	sur1 = MAP(sur1)(domain2D);
	sur2 = CUBIC_HERMITE(S1)([c1,c2,[0,0,-0.22],[0,0,0.22]]);
	sur2 = MAP(sur2)(domain2D);
	var f11 = STRUCT([sur1, sur2]);

	c1 = CUBIC_HERMITE(S0)([[-dx - 0.38 -0.11-0.9, -0.055, 2.14 +0.055], [-dx - 0.38 -0.11-0.9-0.22, +0.155, 2.14 +0.055], [-0.5,0,0],[0,0.5,0]]);
	c2 = CUBIC_HERMITE(S0)([[-dx - 0.38 -0.11-0.9, +0.055, 2.14 +0.055], [-dx - 0.38 -0.11-0.9-0.11, +0.155, 2.14 +0.055], [-0.25,0,0],[0,0.25,0]]);
	sur1 = CUBIC_HERMITE(S1)([c1,c2,[0,0,0.22],[0,0,-0.22]]);
	sur1 = MAP(sur1)(domain2D);
	sur2 = CUBIC_HERMITE(S1)([c1,c2,[0,0,-0.22],[0,0,0.22]]);
	sur2 = MAP(sur2)(domain2D);
	var f12 = STRUCT([sur1, sur2]);

	//intermedio laterale 3
	c1 = CUBIC_HERMITE(S0)([[dx + 0.38 +0.11+0.9+0.22, +0.155, 2.14 +0.055], [dx + 0.38 +0.11+0.9+0.22, +0.155+6.72, 2.14 +0.055], [0,0,0],[0,0,0]]);
	c2 = CUBIC_HERMITE(S0)([[dx + 0.38 +0.11+0.9+0.11, +0.155, 2.14 +0.055], [dx + 0.38 +0.11+0.9+0.11, +0.155+6.72, 2.14 +0.055], [0,0,0],[0,0,0]]);
	sur1 = CUBIC_HERMITE(S1)([c1,c2,[0,0,0.22],[0,0,-0.22]]);
	sur1 = MAP(sur1)(domain2D);
	sur2 = CUBIC_HERMITE(S1)([c1,c2,[0,0,-0.22],[0,0,0.22]]);
	sur2 = MAP(sur2)(domain2D);
	var f13 = STRUCT([sur1, sur2]);

	c1 = CUBIC_HERMITE(S0)([[-dx - 0.38 -0.11-0.9-0.22, +0.155, 2.14 +0.055], [-dx - 0.38 -0.11-0.9-0.22, +0.155+6.72, 2.14 +0.055], [0,0,0],[0,0,0]]);
	c2 = CUBIC_HERMITE(S0)([[-dx - 0.38 -0.11-0.9-0.11, +0.155, 2.14 +0.055], [-dx - 0.38 -0.11-0.9-0.11, +0.155+6.72, 2.14 +0.055], [0,0,0],[0,0,0]]);
	sur1 = CUBIC_HERMITE(S1)([c1,c2,[0,0,0.22],[0,0,-0.22]]);
	sur1 = MAP(sur1)(domain2D);
	sur2 = CUBIC_HERMITE(S1)([c1,c2,[0,0,-0.22],[0,0,0.22]]);
	sur2 = MAP(sur2)(domain2D);
	var f14 = STRUCT([sur1, sur2]);

	//intermedio laterale 4
	c1 = CUBIC_HERMITE(S0)([[dx + 0.38 +0.11+0.9+0.22, +0.155+6.72, 2.14 +0.055], [dx + 0.38 +0.11+0.9+0.11 -0.1, +0.155+6.72 +0.22, 2.14 +0.055],
		[0,0.5,0],[-0.5,0,0]]);
	c2 = CUBIC_HERMITE(S0)([[dx + 0.38 +0.11+0.9+0.11, +0.155+6.72, 2.14 +0.055], [dx + 0.38 +0.11+0.9+0.11 -0.1, +0.155+6.72 +0.11, 2.14 +0.055],
		[0,0.25,0],[-0.25,0,0]]);
	sur1 = CUBIC_HERMITE(S1)([c1,c2,[0,0,0.22],[0,0,-0.22]]);
	sur1 = MAP(sur1)(domain2D);
	sur2 = CUBIC_HERMITE(S1)([c1,c2,[0,0,-0.22],[0,0,0.22]]);
	sur2 = MAP(sur2)(domain2D);
	var f15 = STRUCT([sur1, sur2]);

	c1 = CUBIC_HERMITE(S0)([[-dx - 0.38 -0.11-0.9-0.22, +0.155+6.72, 2.14 +0.055], [-dx - 0.38 -0.11-0.9-0.11 +0.1, +0.155+6.72 +0.22, 2.14 +0.055],
		[0,0.5,0],[0.5,0,0]]);
	c2 = CUBIC_HERMITE(S0)([[-dx - 0.38 -0.11-0.9-0.11, +0.155+6.72, 2.14 +0.055], [-dx - 0.38 -0.11-0.9-0.11 +0.1, +0.155+6.72 +0.11, 2.14 +0.055],
		[0,0.25,0],[0.25,0,0]]);
	sur1 = CUBIC_HERMITE(S1)([c1,c2,[0,0,0.22],[0,0,-0.22]]);
	sur1 = MAP(sur1)(domain2D);
	sur2 = CUBIC_HERMITE(S1)([c1,c2,[0,0,-0.22],[0,0,0.22]]);
	sur2 = MAP(sur2)(domain2D);
	var f16 = STRUCT([sur1, sur2]);

	//intermedio laterale 5
	c1 = CUBIC_HERMITE(S0)([[dx + 0.38 +0.11+0.9+0.11 -0.1, +0.155+6.72 +0.22, 2.14 +0.055],
		[dx + 0.38 +0.22+0.1 + 0.8 +0.12 -0.1 -1.47, +0.155+6.72 +0.22 +0.025, 2.14 +0.055], 
		[0,0,0],[0,0,0]]);
	c2 = CUBIC_HERMITE(S0)([[dx + 0.38 +0.11+0.9+0.11 -0.1, +0.155+6.72 +0.11, 2.14 +0.055], 
		[dx + 0.38 +0.22+0.1 + 0.8 +0.12 -0.1 -1.47, +0.155+6.72 +0.11 +0.025, 2.14 +0.055],
		[0,0,0],[0,0,0]]);
	sur1 = CUBIC_HERMITE(S1)([c1,c2,[0,0,0.22],[0,0,-0.22]]);
	sur1 = MAP(sur1)(domain2D);
	sur2 = CUBIC_HERMITE(S1)([c1,c2,[0,0,-0.22],[0,0,0.22]]);
	sur2 = MAP(sur2)(domain2D);
	var f17 = STRUCT([sur1, sur2]);

	c1 = CUBIC_HERMITE(S0)([[-dx - 0.38 -0.11-0.9-0.11 +0.1, +0.155+6.72 +0.22, 2.14 +0.055],
		[-dx - 0.38 -0.22-0.1 - 0.8 -0.12 +0.1 +1.47, +0.155+6.72 +0.22 +0.025, 2.14 +0.055], 
		[0,0,0],[0,0,0]]);
	c2 = CUBIC_HERMITE(S0)([[-dx - 0.38 -0.11-0.9-0.11 +0.1, +0.155+6.72 +0.11, 2.14 +0.055], 
		[-dx - 0.38 -0.22-0.1 - 0.8 -0.12 +0.1 +1.47, +0.155+6.72 +0.11 +0.025, 2.14 +0.055],
		[0,0,0],[0,0,0]]);
	sur1 = CUBIC_HERMITE(S1)([c1,c2,[0,0,0.22],[0,0,-0.22]]);
	sur1 = MAP(sur1)(domain2D);
	sur2 = CUBIC_HERMITE(S1)([c1,c2,[0,0,-0.22],[0,0,0.22]]);
	sur2 = MAP(sur2)(domain2D);
	var f18 = STRUCT([sur1, sur2]);

	
	//base metallica esterna
	c1 = BEZIER(S0)([[dx, 0.11, 0.9], [dx+0.38+0.22+0.1 + 0.8 /*+0.34*/, 0.11, 0.9]]);
	c2 = BEZIER(S0)([[dx+0.38+0.22+0.1 + 0.8 /*+0.34*/, 0.11, 0.9],[dx+0.38+0.22+0.1 + 0.8 /*+0.34*/, 0.11+6.62+0.34-0.11, 0.9]]);
	var c3 = BEZIER(S0)([[dx+0.38+0.22+0.1 + 0.8 /*+0.34*/, 0.11+6.62+0.34-0.11, 0.9], [dx, 0.11+6.62+0.34-0.11, 0.9]]);
	var f123_1 = curves_union([ c1, c2, c3 ])([ [0, 1], [0, 1], [0, 1] ]);
	c1 = BEZIER(S0)([[-dx, 0.11, 0.9], [-dx-0.38-0.22-0.1 - 0.8 /*-0.34*/, 0.11, 0.9]]);
	c2 = BEZIER(S0)([[-dx-0.38-0.22-0.1 - 0.8 /*-0.34*/, 0.11, 0.9],[-dx-0.38-0.22-0.1 - 0.8 /*-0.34*/, 0.11+6.62+0.34-0.11, 0.9]]);
	c3 = BEZIER(S0)([[-dx-0.38-0.22-0.1 - 0.8 /*-0.34*/, 0.11+6.62+0.34-0.11, 0.9], [-dx, 0.11+6.62+0.34-0.11, 0.9]]);
	var f123_2 = curves_union([ c1, c2, c3 ])([ [0, 1], [0, 1], [0, 1] ]);
	//+dz=0.22
	c1 = BEZIER(S0)([[dx, 0.11, 0.9+0.22], [dx+0.38+0.22+0.1 + 0.8 /*+0.34*/, 0.11, 0.9+0.22]]);
	c2 = BEZIER(S0)([[dx+0.38+0.22+0.1 + 0.8 /*+0.34*/, 0.11, 0.9+0.22],[dx+0.38+0.22+0.1 + 0.8 /*+0.34*/, 0.11+6.62+0.34-0.11, 0.9+0.22]]);
	c3 = BEZIER(S0)([[dx+0.38+0.22+0.1 + 0.8 /*+0.34*/, 0.11+6.62+0.34-0.11, 0.9+0.22], [dx, 0.11+6.62+0.34-0.11, 0.9+0.22]]);
	var f123_1z = curves_union([ c1, c2, c3 ])([ [0, 1], [0, 1], [0, 1] ]);
	c1 = BEZIER(S0)([[-dx, 0.11, 0.9+0.22], [-dx-0.38-0.22-0.1 - 0.8 /*-0.34*/, 0.11, 0.9+0.22]]);
	c2 = BEZIER(S0)([[-dx-0.38-0.22-0.1 - 0.8 /*-0.34*/, 0.11, 0.9+0.22],[-dx-0.38-0.22-0.1 - 0.8 /*-0.34*/, 0.11+6.62+0.34-0.11, 0.9+0.22]]);
	c3 = BEZIER(S0)([[-dx-0.38-0.22-0.1 - 0.8 /*-0.34*/, 0.11+6.62+0.34-0.11, 0.9+0.22], [-dx, 0.11+6.62+0.34-0.11, 0.9+0.22]]);
	var f123_2z = curves_union([ c1, c2, c3 ])([ [0, 1], [0, 1], [0, 1] ]);
	var s123_1 = BEZIER(S1)([f123_1, f123_1z]);
	var s123_2 = BEZIER(S1)([f123_2, f123_2z]);

	//base metallica INterna
	c1 = BEZIER(S0)([[dx, 0.11+0.11, 0.9], [dx+0.38+0.22+0.1 + 0.8 /*+0.34*/ -0.11, 0.11+0.11, 0.9]]);
	c2 = BEZIER(S0)([[dx+0.38+0.22+0.1 + 0.8 /*+0.34*/-0.11, 0.11+0.11, 0.9],[dx+0.38+0.22+0.1 + 0.8 /*+0.34*/-0.11, 0.11+6.62+0.34-0.11-0.11, 0.9]]);
	c3 = BEZIER(S0)([[dx+0.38+0.22+0.1 + 0.8 /*+0.34*/-0.11, 0.11+6.62+0.34-0.11-0.11, 0.9], [dx, 0.11+6.62+0.34-0.11-0.11, 0.9]]);
	var f123_1y = curves_union([ c1, c2, c3 ])([ [0, 1], [0, 1], [0, 1] ]);
	c1 = BEZIER(S0)([[-dx, 0.11+0.11, 0.9], [-dx-0.38-0.22-0.1 - 0.8 /*-0.34*/ +0.11, 0.11+0.11, 0.9]]);
	c2 = BEZIER(S0)([[-dx-0.38-0.22-0.1 - 0.8 /*-0.34*/+0.11, 0.11+0.11, 0.9],[-dx-0.38-0.22-0.1 - 0.8 /*-0.34*/+0.11, 0.11+6.62+0.34-0.11-0.11, 0.9]]);
	c3 = BEZIER(S0)([[-dx-0.38-0.22-0.1 - 0.8 /*-0.34*/+0.11, 0.11+6.62+0.34-0.11-0.11, 0.9], [-dx, 0.11+6.62+0.34-0.11-0.11, 0.9]]);
	var f123_2y = curves_union([ c1, c2, c3 ])([ [0, 1], [0, 1], [0, 1] ]);
	//+dz=0.22
	c1 = BEZIER(S0)([[dx, 0.11+0.11, 0.9+0.22], [dx+0.38+0.22+0.1 + 0.8 /*+0.34*/ -0.11, 0.11+0.11, 0.9+0.22]]);
	c2 = BEZIER(S0)([[dx+0.38+0.22+0.1 + 0.8 /*+0.34*/-0.11, 0.11+0.11, 0.9+0.22],[dx+0.38+0.22+0.1 + 0.8 /*+0.34*/-0.11, 0.11+6.62+0.34-0.11-0.11, 0.9+0.22]]);
	c3 = BEZIER(S0)([[dx+0.38+0.22+0.1 + 0.8 /*+0.34*/-0.11, 0.11+6.62+0.34-0.11-0.11, 0.9+0.22], [dx, 0.11+6.62+0.34-0.11-0.11, 0.9+0.22]]);
	var f123_1yz = curves_union([ c1, c2, c3 ])([ [0, 1], [0, 1], [0, 1] ]);
	c1 = BEZIER(S0)([[-dx, 0.11+0.11, 0.9+0.22], [-dx-0.38-0.22-0.1-0.8/*-0.34*/ +0.11, 0.11+0.11, 0.9+0.22]]);
	c2 = BEZIER(S0)([[-dx-0.38-0.22-0.1 - 0.8 /*-0.34*/+0.11, 0.11+0.11, 0.9+0.22],[-dx-0.38-0.22-0.1 - 0.8 /*-0.34*/+0.11, 0.11+6.62+0.34-0.11-0.11, 0.9+0.22]]);
	c3 = BEZIER(S0)([[-dx-0.38-0.22-0.1 - 0.8 /*-0.34*/+0.11, 0.11+6.62+0.34-0.11-0.11, 0.9+0.22], [-dx, 0.11+6.62+0.34-0.11-0.11, 0.9+0.22]]);
	var f123_2yz = curves_union([ c1, c2, c3 ])([ [0, 1], [0, 1], [0, 1] ]);
	var s123_1y = BEZIER(S1)([f123_1y, f123_1yz]);
	//s123_1y = MAP(s123_1y)(domain2D);
	var s123_2y = BEZIER(S1)([f123_2y, f123_2yz]);
	//s123_2 = MAP(s123_2)(domain2D);

	//base mettalica, volume
	var v123_1 = BEZIER(S2)([s123_1, s123_1y]);
	v123_1 = MAP(v123_1)(domain3D);
	var v123_2 = BEZIER(S2)([s123_2, s123_2y]);
	v123_2 = MAP(v123_2)(domain3D);


	//ripiano bottom
	c1 = BEZIER(S0)([[dx, 0.11+0.11, 0.9 +0.22-0.001], [dx+0.38+0.22+0.1 + 0.8 -0.11, 0.11+0.11, 0.9+0.22-0.001]]);
	c2 = BEZIER(S0)([[dx, 0.11+6.62+0.34-0.11-0.11, 0.9+0.22 -0.001], [dx+0.38+0.22+0.1 + 0.8 -0.11, 0.11+6.62+0.34-0.11-0.11, 0.9+0.22-0.001]]);
	var s1 = BEZIER(S1)([c1, c2]);
	s1 = MAP(s1)(domain2D);

	c1 = BEZIER(S0)([[-dx, 0.11+0.11, 0.9 +0.22-0.001], [-dx-0.38-0.22-0.1 - 0.8 +0.11, 0.11+0.11, 0.9+0.22-0.001]]);
	c2 = BEZIER(S0)([[-dx, 0.11+6.62+0.34-0.11-0.11, 0.9+0.22 -0.001], [-dx-0.38-0.22-0.1 - 0.8 +0.11, 0.11+6.62+0.34-0.11-0.11, 0.9+0.22-0.001]]);
	var s2 = BEZIER(S1)([c1, c2]);
	s2 = MAP(s2)(domain2D);

	return COLOR(pipes_color)(STRUCT([f1, f2, f1x, f2x, fy1, fy2, f1z, f2z, f11y, f22y, f3, f4, f5, f6, f7, f8, f9, f10, f11, f12, f13, f14, f15, f16, f17, f18,
		v123_1, v123_2, s1, s2]));
}

function getArmPillows(dx) {
	c1 = BEZIER(S0)([[dx, 0.11+0.11, 0.9], [dx+0.38+0.22+0.1 + 0.8 -0.11, 0.11+0.11, 0.9]]);
	c2 = BEZIER(S0)([[dx+0.38+0.22+0.1 + 0.8 -0.11, 0.11+0.11, 0.9],[dx+0.38+0.22+0.1 + 0.8 -0.11, 0.11+6.62+0.34-0.11-0.11, 0.9]]);
	c3 = BEZIER(S0)([[dx+0.38+0.22+0.1 + 0.8 -0.11, 0.11+6.62+0.34-0.11-0.11, 0.9], [dx, 0.11+6.62+0.34-0.11-0.11, 0.9]]);
	c4 = BEZIER(S0)([[dx, 0.11+6.62+0.34-0.22, 0.9], [dx, 0.11+0.11, 0.9]]);
	var f123_1 = curves_union([ c1, c2, c3, c4 ])([ [0, 1], [0, 1], [0, 1], [0,1] ]);
	//base superiore 
	c1 = BEZIER(S0)([[dx, 0.11+0.11, 0.9+5.5], [dx+0.38+0.22+0.1 + 0.8 -0.11, 0.11+0.11, 0.9+5.5]]);
	c2 = BEZIER(S0)([[dx+0.38+0.22+0.1 + 0.8 -0.11, 0.11+0.11, 0.9+5.5],[dx+0.38+0.22+0.1 + 0.8 -0.11, 0.11+6.62+0.34-0.11-0.11, 0.9+5.5]]);
	c3 = BEZIER(S0)([[dx+0.38+0.22+0.1 + 0.8 -0.11, 0.11+6.62+0.34-0.11-0.11, 0.9+5.5], [dx, 0.11+6.62+0.34-0.11-0.11, 0.9+5.5]]);
	c4 = BEZIER(S0)([[dx, 0.11+6.62+0.34-0.22, 0.9+5.5], [dx, 0.11+0.11, 0.9+5.5]]);
	var f123_2 = curves_union([ c1, c2, c3, c4 ])([ [0, 1], [0, 1], [0, 1], [0,1] ]);
	var s = BEZIER(S1)([f123_1, f123_2]);
	s = MAP(s)(DOMAIN([[0,1],[0,1]])([60,10]));

	//base superiore, coprire
	c1 = BEZIER(S0)([[dx, 0.11+0.11, 0.9+5.5], [dx+0.38+0.22+0.1 + 0.8 -0.11, 0.11+0.11, 0.9+5.5]]);
	c2 = BEZIER(S0)([[dx, 0.11+6.62+0.34-0.22, 0.9+5.5], [dx+0.38+0.22+0.1 + 0.8 -0.11, 0.11+6.62+0.34-0.11-0.11, 0.9+5.5]]);
	c3 = BEZIER(S0)([[dx, 0.11+0.11+ 0.05, 0.9+5.5], [dx, 0.11+0.11+0.05, 0.9+6], [dx+0.38+0.22+0.1 + 0.8 -0.11, 0.11+0.11 +0.05, 0.9+6], [dx+0.38+0.22+0.1 + 0.8 -0.11, 0.11+0.11 +0.05, 0.9+5.5]])
	c4 = BEZIER(S0)([[dx, 0.11+6.62+0.34-0.22 -0.05, 0.9+5.5], [dx, 0.11+6.62+0.34-0.22 -0.05, 0.9+6], 
		[dx+0.38+0.22+0.1 + 0.8 -0.11, 0.11+6.62+0.34-0.22-0.05, 0.9+6], [dx+0.38+0.22+0.1 + 0.8 -0.11, 0.11+6.62+0.34-0.22-0.05, 0.9+5.5]])
	c5 = BEZIER(S0)([[dx, 3.485, 0.9+5.5], [dx, 3.485, 0.9+5.5], 
		[dx+0.38+0.22+0.1 + 0.8 -0.11, 3.485, 0.9+5.5], [dx+0.38+0.22+0.1 + 0.8 -0.11, 3.485, 0.9+5.5]])
	var ftop = BEZIER(S1)([c1, c3, c5, c4, c2]);
	var top = MAP(ftop)(domain2D);

	//base inferiore, coprire
	c1 = BEZIER(S0)([[dx, 0.11+0.11, 0.9], [dx+0.38+0.22+0.1 + 0.8 -0.11, 0.11+0.11, 0.9]]);
	c2 = BEZIER(S0)([[dx, 0.11+6.62+0.34-0.22, 0.9], [dx+0.38+0.22+0.1 + 0.8 -0.11, 0.11+6.62+0.34-0.11-0.11, 0.9]]);
	var fbottom = BEZIER(S1)([c1, c2]);
	var bottom = MAP(fbottom)(domain2D);

	//laterale
	c1 = BEZIER(S0)([[dx+0.38+0.22+0.1 + 0.8 -0.11, 0.11+0.11, 0.9],[dx+0.38+0.22+0.1 + 0.8 -0.11, 0.11+6.62+0.34-0.11-0.11, 0.9]]);
	c2 = BEZIER(S0)([[dx+0.38+0.22+0.1 + 0.8 -0.11, 0.11+0.11, 0.9+5.5],[dx+0.38+0.22+0.1 + 0.8 -0.11, 0.11+6.62+0.34-0.11-0.11, 0.9+5.5]]);
	c3 = BEZIER(S0)([[dx+0.38+0.22+0.1 + 0.8 -0.11, 0.11+0.11, 0.9+1], [dx+0.38+0.22+0.1 + 0.8 -0.11 +1, 0.11+0.11, 0.9+1],
		[dx+0.38+0.22+0.1 + 0.8 -0.11 +1, 0.11+6.62+0.34-0.11-0.11, 0.9+1], [dx+0.38+0.22+0.1 + 0.8 -0.11, 0.11+6.62+0.34-0.11-0.11, 0.9+1]]);
	c4 = BEZIER(S0)([[dx+0.38+0.22+0.1 + 0.8 -0.11, 0.11+0.11, 0.9+5.5-2], [dx+0.38+0.22+0.1 + 0.8 -0.11 +0.5, 0.11+0.11, 0.9+5.5-2],
		[dx+0.38+0.22+0.1 + 0.8 -0.11 +0.5, 0.11+6.62+0.34-0.11-0.11, 0.9+5.5-2], [dx+0.38+0.22+0.1 + 0.8 -0.11, 0.11+6.62+0.34-0.11-0.11, 0.9+5.5-2]]);
	c5 = BEZIER(S0)([[dx+0.38+0.22+0.1 + 0.8 -0.11, 0.11+0.11, 2.14 +0.055], [dx+0.38+0.22+0.1 + 0.8 -0.11 -1, 0.11+0.11, 2.14 +0.055],
		[dx+0.38+0.22+0.1 + 0.8 -0.11 -1, 0.11+6.62+0.34-0.11-0.11, 2.14 +0.055], [dx+0.38+0.22+0.1 + 0.8 -0.11, 0.11+6.62+0.34-0.11-0.11, 2.14 +0.055]]);
	c6 = BEZIER(S0)([[dx+0.38+0.22+0.1 + 0.8 -0.11, 0.11+0.11, 2.7], [dx+0.38+0.22+0.1 + 0.8 -0.11 +1, 0.11+0.11, 2.7],
		[dx+0.38+0.22+0.1 + 0.8 -0.11 +1, 0.11+6.62+0.34-0.11-0.11, 2.7], [dx+0.38+0.22+0.1 + 0.8 -0.11, 0.11+6.62+0.34-0.11-0.11, 2.7]]);
	var fside1 = BEZIER(S1)([c1, c3, c5, c6, c4, c2]);
	var side1 = MAP(fside1)(domain2D);

	//frontale 1
	c1 = BEZIER(S0)([[dx, 0.11+0.11, 0.9], [dx+0.38+0.22+0.1 + 0.8 -0.11, 0.11+0.11, 0.9]]);
	c2 = BEZIER(S0)([[dx, 0.11+0.11, 0.9+5.5], [dx+0.38+0.22+0.1 + 0.8 -0.11, 0.11+0.11, 0.9+5.5]]);
	c3 = BEZIER(S0)([[dx, 0.11+0.11, 0.9+0.2], [dx, 0.11+0.11 -0.25, 0.9+0.2], [dx+0.38+0.22+0.1 + 0.8 -0.11, 0.11+0.11 -0.25, 0.9+0.2], [dx+0.38+0.22+0.1 + 0.8 -0.11, 0.11+0.11, 0.9+0.2]]);
	c4 = BEZIER(S0)([[dx, 0.11+0.11, 0.9+5.5-0.2], [dx, 0.11+0.11-0.25, 0.9+5.5-0.2],
		[dx+0.38+0.22+0.1 + 0.8 -0.11, 0.11+0.11-0.25, 0.9+5.5-0.2], [dx+0.38+0.22+0.1 + 0.8 -0.11, 0.11+0.11, 0.9+5.5-0.2]]);
	c5 = BEZIER(S0)([[dx, 0.11+0.11, 2.25], [dx+0.38+0.22+0.1 + 0.8 -0.11, 0.11+0.11, 2.25]]);
	var ffrontal1 = BEZIER(S1)([c1, c3, c5, c4, c2]);
	var frontal1 = MAP(ffrontal1)(domain2D);

	//frontale 2
	c1 = BEZIER(S0)([[dx, 0.11+6.62+0.34-0.11-0.11, 0.9], [dx+0.38+0.22+0.1 + 0.8 -0.11, 0.11+6.62+0.34-0.11-0.11, 0.9]]);
	c2 = BEZIER(S0)([[dx, 0.11+6.62+0.34-0.11-0.11, 0.9+5.5], [dx+0.38+0.22+0.1 + 0.8 -0.11, 0.11+6.62+0.34-0.11-0.11, 0.9+5.5]]);
	c3 = BEZIER(S0)([[dx, 0.11+6.62+0.34-0.11-0.11, 0.9+0.2], [dx, 0.11+6.62+0.34-0.11-0.11 +0.25, 0.9+0.2], 
		[dx+0.38+0.22+0.1 + 0.8 -0.11, 0.11+6.62+0.34-0.11-0.11 +0.25, 0.9+0.2], [dx+0.38+0.22+0.1 + 0.8 -0.11, 0.11+6.62+0.34-0.11-0.11, 0.9+0.2]]);
	c4 = BEZIER(S0)([[dx, 0.11+6.62+0.34-0.11-0.11, 0.9+5.5-0.2], [dx, 0.11+6.62+0.34-0.11-0.11 +0.25, 0.9+5.5-0.2],
		[dx+0.38+0.22+0.1 + 0.8 -0.11, 0.11+6.62+0.34-0.11-0.11 +0.25, 0.9+5.5-0.2], [dx+0.38+0.22+0.1 + 0.8 -0.11, 0.11+6.62+0.34-0.11-0.11, 0.9+5.5-0.2]]);
	c5 = BEZIER(S0)([[dx, 0.11+6.62+0.34-0.11-0.11, 2.25], [dx+0.38+0.22+0.1 + 0.8 -0.11, 0.11+6.62+0.34-0.11-0.11, 2.25]]);
	var ffrontal2 = BEZIER(S1)([c1, c3, c5, c4, c2]);
	var frontal2 = MAP(ffrontal2)(domain2D);


	var pillow1 = STRUCT([top, bottom, side1, frontal1, frontal2, s]);
	var pillow2 = R([0,1])([PI])(pillow1);
	pillow2 = T([1])([0.11+6.62+0.34])(pillow2);
	var pillows = STRUCT([pillow1, pillow2]);
	pillows = T([2])([0.22])(pillows);
	return (COLOR(sofa_color)(pillows));
}


function getSeatSkeleton(dx){
	var c1 = CUBIC_HERMITE(S0)([[dx, 0.22+6.62+0.34, 5.33+0.23], [-dx, 0.22+6.62+0.34, 5.33+0.23], [0,0,0],[0,0,0]]);
	var c2 = CUBIC_HERMITE(S0)([[dx, 0.22+6.62+0.12, 5.33+0.23], [-dx, 0.22+6.62+0.12, 5.33+0.23], [0,0,0],[0,0,0]]);
	var sur1 = CUBIC_HERMITE(S1)([c1,c2,[0,0,0.44],[0,0,-0.44]]);
	sur1 = MAP(sur1)(domain2D);
	var sur2 = CUBIC_HERMITE(S1)([c1,c2,[0,0,-0.44],[0,0,0.44]]);
	sur2 = MAP(sur2)(domain2D);
	var f1 = STRUCT([sur1, sur2]);

	c1 = CUBIC_HERMITE(S0)([[dx, +0.155+6.72 +0.22 +0.025, 2.14 +0.055], [-dx, +0.155+6.72 +0.22+0.025, 2.14 +0.055], [0,0,0],[0,0,0]]);
	c2 = CUBIC_HERMITE(S0)([[dx, +0.155+6.72 +0.11+0.025, 2.14 +0.055], [-dx, +0.155+6.72 +0.11+0.025, 2.14 +0.055], [0,0,0],[0,0,0]]);
	sur1 = CUBIC_HERMITE(S1)([c1,c2,[0,0,0.22],[0,0,-0.22]]);
	sur1 = MAP(sur1)(domain2D);
	sur2 = CUBIC_HERMITE(S1)([c1,c2,[0,0,-0.22],[0,0,0.22]]);
	sur2 = MAP(sur2)(domain2D);
	var f2 = STRUCT([sur1, sur2]);

	c1  = BEZIER(S0)([[dx, 0.11+0.11, 0.9], [-dx, 0.11+0.11, 0.9]]);
	c2 = BEZIER(S0)([[dx, 0.11+0.11, 0.9+0.22], [-dx, 0.11+0.11, 0.9+0.22]]);
	var s1 = BEZIER(S1)([c1, c2]);
	c1  = BEZIER(S0)([[dx, 0.11, 0.9], [-dx, 0.11, 0.9]]);
	c2 = BEZIER(S0)([[dx, 0.11, 0.9+0.22], [-dx, 0.11, 0.9+0.22]]);
	var s2 = BEZIER(S1)([c1, c2]);
	var v1 = BEZIER(S2)([s1, s2]);
	var f3 = MAP(v1)(domain3D);

	c1 = BEZIER(S0)([[dx, 0.11+6.62+0.34-0.11 -0.11, 0.9], [-dx, 0.11+6.62+0.34-0.11 -0.11, 0.9]]);
	c2 = BEZIER(S0)([[dx, 0.11+6.62+0.34-0.11-0.11, 0.9+0.22], [-dx, 0.11+6.62+0.34-0.11 -0.11, 0.9+0.22]]);
	s1 = BEZIER(S1)([c1, c2]);
	c1 = BEZIER(S0)([[dx, 0.11+6.62+0.34-0.11, 0.9], [-dx, 0.11+6.62+0.34-0.11, 0.9]]);
	c2 = BEZIER(S0)([[dx, 0.11+6.62+0.34-0.11, 0.9+0.22], [-dx, 0.11+6.62+0.34-0.11, 0.9+0.22]]);
	s2 = BEZIER(S1)([c1, c2]);
	v1 = BEZIER(S2)([s1, s2]);
	var f4 = MAP(v1)(domain3D);

	//
	c1 = BEZIER(S0)([[dx, 0.11+6.62+0.34-0.11-0.11, 0.9+0.22 -0.001], [-dx, 0.11+6.62+0.34-0.11-0.11, 0.9+0.22-0.001]]);
	c2  = BEZIER(S0)([[dx, 0.11+0.11, 0.9+0.22-0.001], [-dx, 0.11+0.11, 0.9+0.22-0.001]]);
	var f5 = BEZIER(S1)([c1, c2]);
	f5 = MAP(f5)(domain2D);

	return COLOR(pipes_color)(STRUCT([f1, f2, f3, f4, f5]));
}

function getSeats(dx, n){
	var seat = STRUCT([getSeatSkeleton(dx+0.05), getSeatPillows(dx)]);
	var seats = [];
	var j = 1;
	var i;
	if (n % 2 === 0){
		for (i=1; i<=n; i=i+2){
			if (i===1){
				seats.push(T([0])([dx])(seat), T([0])([-dx])(seat));
			}
			else {
				seats.push(T([0])([j*2*dx + dx])(seat));
				seats.push(T([0])([(j*2*dx + dx)*-1])(seat));
				j++;
			}
		}
	}
	else{
		seats.push(seat);
		for (i=2; i<=n; i=i+2){
			seats.push(T([0])([2*dx*j])(seat), T([0])([-2*dx*j])(seat));
			j++;
		}
	}
	var all_seats = STRUCT(seats);
	return (all_seats);
}

function getSeatPillows(dx) {
	var seat_pillows = COLOR(sofa_color)(STRUCT([getSeatPill1(dx), getSeatback(dx), getSeatPill2(dx)]));
	return seat_pillows;
}

function getSeatPill1(dx){
	//frontale 1
	var c1 = BEZIER(S0)([ [dx, 0.22, 0.9+0.22 ], [-dx, 0.22, 0.9+0.22]])
	var c2 = BEZIER(S0)([ [dx, 0.22, 0.9+0.22+2.02 ], [-dx, 0.22, 0.9+0.22+2.02]])
	var c3 = BEZIER(S0)([ [dx, 0.22, 0.9+0.22 +0.2 ], [dx, 0.22 -0.5, 0.9+0.22 +0.2 ], [-dx, 0.22 -0.5, 0.9+0.22 +0.2], [-dx, 0.22, 0.9+0.22 +0.2]])
	var c4 = BEZIER(S0)([ [dx, 0.22, 0.9+0.22 +2.02 -0.2 ], [dx, 0.22 -0.5, 0.9+0.22 +2.02 -0.2 ], [-dx, 0.22 -0.5, 0.9+0.22 +2.02 -0.2], [-dx, 0.22, 0.9+0.22 +2.02 -0.2]])
	var ffrontal1 = BEZIER(S1)([c1, c3, c4, c2]);
	var frontal1 = MAP(ffrontal1)(domain2D);

	//top
	c1 = BEZIER(S0)([ [dx, 0.22, 0.9+0.22+2.02 ], [-dx, 0.22, 0.9+0.22+2.02]])
	c3 = BEZIER(S0)([ [dx, 0.22 +1, 0.9+0.22+2.02], [dx, 0.22 +1, 0.9+0.22+2.02 +0.6], [-dx, 0.22+1, 0.9+0.22+2.02 +0.6], [-dx, 0.22+1, 0.9+0.22+2.02]])
	c4 = BEZIER(S0)([ [dx, 0.22 +4.6 -1, 0.9+0.22+2.02 ], [dx, 0.22 +4.6 -1, 0.9+0.22+2.02 +0.6],
		[-dx, 0.22 +4.6 -1, 0.9+0.22+2.02 +0.6], [-dx, 0.22 +4.6 -1, 0.9+0.22+2.02]]);
	c2 = BEZIER(S0)([ [dx, 0.22 +4.6, 0.9+0.22+2.02 ], [-dx, 0.22 +4.6, 0.9+0.22+2.02]]);
	var ftop = BEZIER(S1)([c1, c3, c4, c2]);
	var top = MAP(ftop)(domain2D);

	//bottom
	c1 = BEZIER(S0)([ [dx, 0.22, 0.9+0.22 ], [-dx, 0.22, 0.9+0.22]])
	c2 = BEZIER(S0)([ [dx, 0.22 +4.6, 0.9+0.22], [-dx, 0.22 +4.6, 0.9+0.22]]);
	var fbottom = BEZIER(S1)([c1, c2]);
	var bottom = MAP(fbottom)(domain2D);

	//frontale 2
	c1 = BEZIER(S0)([ [dx, 0.22 +4.6, 0.9+0.22 ], [-dx, 0.22 +4.6, 0.9+0.22]])
	c2 = BEZIER(S0)([ [dx, 0.22 +4.6, 0.9+0.22+2.02 ], [-dx, 0.22 +4.6, 0.9+0.22+2.02]])
	var ffrontal2 = BEZIER(S1)([c1, c2]);
	var frontal2 = MAP(ffrontal2)(domain2D);

	//side 1
	c1 = BEZIER(S0)([ [dx, 0.22, 0.9+0.22 ], [dx, 0.22 +4.6, 0.9+0.22 ]]);
	c2 = BEZIER(S0)([ [dx, 0.22, 0.9+0.22+2.02 ], [dx, 0.22 +4.6, 0.9+0.22+2.02 ]]);
	var fside1 = BEZIER(S1)([c1, c2]);
	var side1 = MAP(fside1)(domain2D);

	//side 2
	c1 = BEZIER(S0)([ [-dx, 0.22, 0.9+0.22], [-dx, 0.22 +4.6, 0.9+0.22]]);
	c2 = BEZIER(S0)([ [-dx, 0.22, 0.9+0.22+2.02 ], [-dx, 0.22 +4.6, 0.9+0.22+2.02 ]]);
	var fside2 = BEZIER(S1)([c1, c2]);
	var side2 = MAP(fside2)(domain2D);

	return STRUCT([side1, side2, frontal1, frontal2, top, bottom]);
}

function getSeatback(dx){
	//frontal 1
	var c1 = BEZIER(S0)([[dx, 0.22 +4.6, 0.9 +0.22],[-dx, 0.22 +4.6, 0.9 +0.22]]);
	var c3 = BEZIER(S0)([[dx, 0.22 +4.6, 0.9 +0.22+1], [dx, 0.22 +4.6 -0.5, 0.9 +0.22+1], 
		[-dx, 0.22 +4.6 -0.5, 0.9 +0.22+1], [-dx, 0.22 +4.6, 0.9 +0.22+1]]);
	var c4 = BEZIER(S0)([[dx, 0.22 +4.6, 0.9+5.5+0.22-1], [dx, 0.22 +4.6 -0.5, 0.9+5.5+0.22-1],
		[-dx, 0.22 +4.6 -0.5, 0.9+5.5+0.22-1], [-dx, 0.22 +4.6, 0.9+5.5+0.22-1]]);
	var c2 = BEZIER(S0)([[dx, 0.22 +4.6, 0.9+5.5+0.22],[-dx, 0.22 +4.6, 0.9+5.5+0.22]]);
	var ffrontal1 = BEZIER(S1)([c1, c3, c4, c2]);
	var frontal1 = MAP(ffrontal1)(domain2D);
	
	//frontal 2
	c1 = BEZIER(S0)([[dx, 0.11+6.62+0.34-0.11-0.11, 0.9 +0.22],[-dx, 0.11+6.62+0.34-0.11-0.11, 0.9 +0.22]]);
	c3 = BEZIER(S0)([[dx, 0.11+6.62+0.34-0.11-0.11, 0.9 +0.22+1], [dx, 0.11+6.62+0.34-0.11-0.11 +0.5, 0.9 +0.22+1], 
		[-dx, 0.11+6.62+0.34-0.11-0.11 +0.5, 0.9 +0.22+1], [-dx, 0.11+6.62+0.34-0.11-0.11, 0.9 +0.22+1]]);
	c4 = BEZIER(S0)([[dx, 0.11+6.62+0.34-0.11-0.11, 0.9+5.5+0.22-1], [dx, 0.11+6.62+0.34-0.11-0.11 +0.5, 0.9+5.5+0.22-1],
		[-dx, 0.11+6.62+0.34-0.11-0.11 +0.5, 0.9+5.5+0.22-1], [-dx, 0.11+6.62+0.34-0.11-0.11, 0.9+5.5+0.22-1]]);
	c2 = BEZIER(S0)([[dx, 0.11+6.62+0.34-0.11-0.11, 0.9+5.5+0.22],[-dx, 0.11+6.62+0.34-0.11-0.11, 0.9+5.5+0.22]]);
	var ffrontal2 = BEZIER(S1)([c1, c3, c4, c2]);
	var frontal2 = MAP(ffrontal2)(domain2D);

	//bottom
	c1 = BEZIER(S0)([[dx, 0.22 +4.6, 0.9 +0.22],[-dx, 0.22 +4.6, 0.9 +0.22]]);
	c2 = BEZIER(S0)([[dx, 0.11+6.62+0.34-0.11-0.11, 0.9 +0.22],[-dx, 0.11+6.62+0.34-0.11-0.11, 0.9 +0.22]]);
	var fbottom = BEZIER(S1)([c1, c2]);
	var bottom = MAP(fbottom)(domain2D);

	//top
	c1 = BEZIER(S0)([[dx, 0.22 +4.6, 0.9+5.5+0.22],[-dx, 0.22 +4.6, 0.9+5.5+0.22]]);
	c3 = BEZIER(S0)([[dx, 0.22 +4.6 +0.2, 0.9+5.5+0.22], [dx, 0.22 +4.6 +0.2, 0.9+5.5+0.22 +0.5], [-dx, 0.22 +4.6 +0.2, 0.9+5.5+0.22 +0.5], [-dx, 0.22 +4.6 +0.2, 0.9+5.5+0.22]]);
	c4 = BEZIER(S0)([[dx, 0.11+6.62+0.34-0.11-0.11 -0.2, 0.9+5.5+0.22], [dx, 0.11+6.62+0.34-0.11-0.11 -0.2, 0.9+5.5+0.22 +0.5],
		[-dx, 0.11+6.62+0.34-0.11-0.11-0.2, 0.9+5.5+0.22 +0.5], [-dx, 0.11+6.62+0.34-0.11-0.11-0.2, 0.9+5.5+0.22]]);
	c2 = BEZIER(S0)([[dx, 0.11+6.62+0.34-0.11-0.11, 0.9+5.5+0.22],[-dx, 0.11+6.62+0.34-0.11-0.11, 0.9+5.5+0.22]]);
	var ftop = BEZIER(S1)([c1, c3, c4, c2]);
	var top = MAP(ftop)(domain2D);

	return STRUCT([frontal1, frontal2, bottom, top]);
}

function getSeatPill2(dx){
	//frontale 1
	var c1 = BEZIER(S0)([ [dx, 0.22, 0.9+0.22 +2.02 +0.05], [-dx, 0.22, 0.9+0.22+2.02 +0.05]])
	var c2 = BEZIER(S0)([ [dx, 0.22, 0.9+0.22 +2.02 +0.05 +1.11], [-dx, 0.22, 0.9+0.22 +2.02 +0.05 +1.11]])
	var c3 = BEZIER(S0)([ [dx, 0.22, 0.9+0.22 +2.02 +0.05 +0.2], [dx, 0.22 -0.5, 0.9+0.22 +2.02 +0.05 +0.2], 
		[-dx, 0.22 -0.5, 0.9+0.22 +2.02 +0.05 +0.2], [-dx, 0.22, 0.9+0.22 +2.02 +0.05 +0.2]])
	var c4 = BEZIER(S0)([ [dx, 0.22, 0.9+0.22 +2.02 +0.05 +1.11 -0.2 ], [dx, 0.22 -0.5, 0.9+0.22 +2.02 +0.05 +1.11 -0.2 ], 
		[-dx, 0.22 -0.5, 0.9+0.22 +2.02 +0.05 +1.11 -0.2], [-dx, 0.22, 0.9+0.22 +2.02 +0.05 +1.11 -0.2]])
	var ffrontal1 = BEZIER(S1)([c1, c3, c4, c2]);
	var frontal1 = MAP(ffrontal1)(domain2D);

	//top
	c1 = BEZIER(S0)([ [dx, 0.22, 0.9+0.22 +2.02 +0.05 +1.11 ], [-dx, 0.22, 0.9+0.22 +2.02 +0.05 +1.11]])
	c3 = BEZIER(S0)([ [dx, 0.22 +1, 0.9+0.22 +2.02 +0.05 +1.11], [dx, 0.22 +1, 0.9+0.22 +2.02 +0.05 +1.11 +0.8], 
		[-dx, 0.22+1, 0.9+0.22 +2.02 +0.05 +1.11 +0.8], [-dx, 0.22+1, 0.9+0.22 +2.02 +0.05 +1.11]])
	c4 = BEZIER(S0)([ [dx, 0.22 +4.6 -1, 0.9+0.22 +2.02 +0.05 +1.11 ], [dx, 0.22 +4.6 -1, 0.9+0.22 +2.02 +0.05 +1.11 +0.8],
		[-dx, 0.22 +4.6 -1, 0.9+0.22 +2.02 +0.05 +1.11 +0.8], [-dx, 0.22 +4.6 -1, 0.9+0.22 +2.02 +0.05 +1.11]]);
	c2 = BEZIER(S0)([ [dx, 0.22 +4.6, 0.9+0.22 +2.02 +0.05 +1.11], [-dx, 0.22 +4.6, 0.9+0.22 +2.02 +0.05 +1.11]]);
	var ftop = BEZIER(S1)([c1, c3, c4, c2]);
	var top = MAP(ftop)(domain2D);

	//bottom
	c1 = BEZIER(S0)([ [dx, 0.22, 0.9+0.22 +2.02 +0.05 ], [-dx, 0.22, 0.9+0.22 +2.02 +0.05]])
	c3 = BEZIER(S0)([ [dx, 0.22 +1, 0.9+0.22 +2.02 +0.05], [dx, 0.22 +1, 0.9+0.22 +2.02 +0.05 -0.8], 
		[-dx, 0.22+1, 0.9+0.22 +2.02 +0.05 -0.8], [-dx, 0.22+1, 0.9+0.22 +2.02 +0.05]])
	c4 = BEZIER(S0)([ [dx, 0.22 +4.6 -1, 0.9+0.22 +2.02 +0.05], [dx, 0.22 +4.6 -1, 0.9+0.22 +2.02 +0.05 -0.8],
		[-dx, 0.22 +4.6 -1, 0.9+0.22 +2.02 +0.05 -0.8], [-dx, 0.22 +4.6 -1, 0.9+0.22 +2.02 +0.05]]);
	c2 = BEZIER(S0)([ [dx, 0.22 +4.6, 0.9+0.22 +2.02 +0.05], [-dx, 0.22 +4.6, 0.9+0.22 +2.02 +0.05]]);
	var fbottom = BEZIER(S1)([c1, c3, c4, c2]);
	var bottom = MAP(fbottom)(domain2D);

	return STRUCT([frontal1, top, bottom]);
}

function getAdditionalPipes (dx, n){
	var pipes = [];
	if (n>2){
		var num = n-1;
		if (n%2 === 0){
			for (var i = 0; i<(num-1); i++)
				pipes.push(getPipe(i*dx*2), getPipe(-i*dx*2));
		}
		else{
			for (var i = 0; i<(num-1); i++)
				pipes.push(getPipe(i*dx*2 -dx), getPipe(-(i*dx*2 -dx)));
		}
	}
	return COLOR(pipes_color)(STRUCT(pipes));
}

function getPipe(dx){
	var domain = DOMAIN([[0,2*PI],[0,2*PI]])([45,45]);
	c1 = CUBIC_HERMITE(S0)([[dx + 0.11, 0.22+6.62+0.23, 5.33+0.23],
		[dx + 0.11, 0.22+6.62+0.23, 0], 
		[0,0,0],[0,0,0]]);
	c2 = CUBIC_HERMITE(S0)([[dx -0.11, 0.22+6.62+0.23, 5.33+0.23], 
		[dx -0.11, 0.22+6.62+0.23, 0],
		[0,0,0],[0,0,0]]);
	sur1 = CUBIC_HERMITE(S1)([c1,c2,[0,0.44,0],[0,-0.44,0]]);
	sur1 = MAP(sur1)(domain2D);
	sur2 = CUBIC_HERMITE(S1)([c1,c2,[0,-0.44,0],[0,0.44,0]]);
	sur2 = MAP(sur2)(domain2D);
	mapping = torus(0.22/4,0.22/8);
  	base = T([0,1])([dx, 0.22+6.62+0.23])(MAP(mapping)(domain));
  	var pipe = STRUCT([sur1, sur2, base]);
  	return pipe;
}

var seats = getSeats(seat_dx/2, numberOfSeats);
var arms = getArms(seat_dx/2, numberOfSeats);

var modelLC2 = STRUCT([seats, arms, getAdditionalPipes(seat_dx/2, numberOfSeats)]);
DRAW(modelLC2);
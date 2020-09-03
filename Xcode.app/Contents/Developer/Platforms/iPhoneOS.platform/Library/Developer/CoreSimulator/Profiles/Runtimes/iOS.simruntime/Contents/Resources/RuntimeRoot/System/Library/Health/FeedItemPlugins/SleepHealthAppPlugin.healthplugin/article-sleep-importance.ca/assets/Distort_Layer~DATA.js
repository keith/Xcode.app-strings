"use strict"
var 
 = this
var _vrs = "v2018-05-00a"
var _dstL1 = layer
var _dstL2 = null
var _dstL3 = null
var _dstL4 = null
var 
 = {}
function ____________________________________________INIT_TEMPLATE() {}
var _tOut = setTimeout(finalInit, 2)
var _rdy = 0
function init() { setTimeout(finalInit, .2) }
function ready() { finalInit() }
function finalInit() {
if (_rdy) return
_rdy = 1
function ____________________________________________SIMPLE_PERSPECTIVE() {}
var _x = 1
var _y = 1
function set_x(a) { _x = a; if (_rdy) updPrsp() }
function set_y(a) { _y = a; if (_rdy) updPrsp() }
function updPrsp() {
Transaction.disableActions = true
if (_dstL1) { aplyPrspDist(_dstL1, _x, _y, 1) }
if (_dstL2) { aplyPrspDist(_dstL2, _x, _y, 1) }
if (_dstL3) { aplyPrspDist(_dstL3, _x, _y, 1) }
if (_dstL4) { aplyPrspDist(_dstL4, _x, _y, 1) }
function ____________________________________________FOUR_POINT_DISTORT() {}
var _tLP
var _tRP
var _bLP
var _bRP
var _aplyBB = 0
function set_tLP(a) { _tLP = a; if (_rdy) updDist() }
function set_tRP(a) { _tRP = a; if (_rdy) updDist() }
function set_bLP(a) { _bLP = a; if (_rdy) updDist() }
function set_bRP(a) { _bRP = a; if (_rdy) updDist() }
function updDist() {
if (!_tLP || !_tRP || !_bLP || !_bRP) return
if (_dstL1) dist
Crn(_dstL1, _tLP, _tRP, _bRP, _bLP)
if (_dstL2) dist
Crn(_dstL2, _tLP, _tRP, _bRP, _bLP)
if (_dstL3) dist
Crn(_dstL3, _tLP, _tRP, _bRP, _bLP)
if (_dstL4) dist
Crn(_dstL4, _tLP, _tRP, _bRP, _bLP)
function set_aplyBB(a) {
_aplyBB = 0
if (!_rdy) return
instance.valueChanged("_aplyBB")
let 
 = returnBoundingBoxCornerPoints(_dstL1)
_tLP = 
.tLP
_tRP = 
.tRP
_bLP = 
.bLP
_bRP = 
.bRP
instance.valueChanged("_tLP")
instance.valueChanged("_tRP")
instance.valueChanged("_bLP")
instance.valueChanged("_bRP")
updDist()
function ____________________________________________MISC() {}
 function 
(n, iMn, iMx, oMn, oMx, 
/* Map Function - v2017-07-31
O:1} clamp to output range, {
I:1} clamp to input range,
Is:1} return value when outside clamped range,
{dv0is:1} return 1 instead of 0 when dividing by 0 */
var 
 || {}
if (
I) {
if (iMn < iMx) {
if (
Is !== undefined && 
Is !== null) {
if (n < iMn || n > iMx) return 
n = 
(n, iMn, iMx)
} else {
if (
Is !== undefined && 
Is !== null) {
if (n > iMn || n < iMx) return 
n = 
(n, iMx, iMn)
var dvsr = (iMx - iMn)
if (dvsr === 0) return 
.dv0is ? 
.dv0is : 0
if (oMx - oMn === 0) return oMx
n = oMn + ((oMx - oMn) * ((n - iMn) / dvsr))
if (
O) {
if (oMn < oMx) {
if (
Is !== undefined && 
Is !== null) {
if (n < oMn || n > oMx) return 
n = 
(n, oMn, oMx)
} else {
if (
Is !== undefined && 
Is !== null) {
if (n > oMn || n < oMx) return 
n = 
(n, oMx, oMn)
return n
 function 
(n, mn, mx, usesAutoInvert) {
/* Clamp Function v2017-07-31 */
if (usesAutoInvert) { if (mn > mx) mx = mn + (mn = mx) - mx }
return n < mn ? mn : n > mx ? mx : n
 function isNm(n) { return isFinite(n) && +n === n }
 function isNmrc(n) {
/* check if convertible to numeric value v2017-06-14a */
return !isNaN(parseFloat(n)) && isFinite(n)
 function isInt(numOrStr) { return (/^-?\d+$/.test(numOrStr)) }
 function isUndNll(a) {
/* Is Undefined Or Null v2017-11-18a */
return a === undefined || a === null
 function notUndNll(a) {
/* Not Undefined And Not Null v2017-11-18a */
return a !== undefined && a !== null
 function crvTF(vlu, srt, end, tF, unclmp) {
/* Curve Using Timing Function v2017-09-01
tF can be timing function, string preset, or array */
var n = 
(vlu, srt, end, 0, 1)
if (!unclmp) n = 
(n, 0, 1)
tF = nTF(tF, null, null, null, "crvTF")
n = objc_msgSend((tF), "_solveForInput:", n)
return 
(n, 0, 1, srt, end)
 function nTF(a, b, c, d, 
Tag) {
/* New TimingFunction v2017-10-17a */
var t = typOf(a, null, "nTF")
if (t === "Arr") return new TimingFunction(a[0], a[1], a[2], a[3])
else if (t === "Str") return new TimingFunction(a)
else if (t === "Tim") {
return a
} else if (t === "Num") return new TimingFunction(a, b, c, d)
else return new TimingFunction(0, 0, 1, 1)
 function typOf(a, retLongName, 
Tag) {
/* A Better 'typeof' Function v2017-07-31
Und,Nul,Boo,Num,Str,Arr,Obj,NSA,NSD */
var s = Object.prototype.toString.call(a)
if (retLongName) return s
else if (s.charAt(10) !== "M") return s.slice(8, 11)
else return "NM" + s.slice(17, 18)
 function is
return 
 && typeof 
 === 'object' && 
.constructor === Object;
 function tFTo
(tfCrv) {
/* Timing Function To Array v2017-06-14 */
return new Array(tfCrv).toString()
.replace("TimingFunction(", "").replace(")", "").split(",")
.map(function(
) { return parseFloat(
) })
 function aplyPrspDist(
, x, y, rset) {
/* Apply Perspective Distortion To Layer 2018-01-10a 
X and Y Arguments are divided by 1000 and applied to m14 and m24
Reset argument will reset current transform before distorting */
let t = rset ? new Transform3D : 
.transform
Transaction.disableActions = true
.setValueForKeyPath(
.transform = new Transform3D(
t.m11, t.m12, t.m13, x /*/ 1000*/ ,
t.m21, t.m22, t.m23, y /*/ 1000*/ ,
t.m31, t.m32, t.m33, t.m34,
t.m41, t.m42, t.m43, t.m44), "transform")
 function dist
Crn(
, tLP, tRP, bRP, bLP) {
/* Distort Layer Corners v2018-01-11a
translated from Nick's swift function*/
//--get new bounds
let box = bndRctFrmQuad(bLP, bRP, tLP, tRP)
//--Clear any existing transform
vFK(
, "transform", Transform3D.identity())
//--Use bounding box as transformed layer's frame
//--(transform will be relative to this frame)
vFK(
, "frame", box)
//--distort corners (altered for un-flipped geom) 
let t = distRctCrn(
.bounds, box, tLP, tRP, bLP, bRP)
//--fix translation
let anch = 
.position
let anchOfst = new Point(anch.x - box.origin.x, anch.y - box.origin.y)
let trnslt1 = Transform3D.translation(anchOfst.x, anchOfst.y, 0.0)
let trnslt2 = Transform3D.translation(-anchOfst.x, -anchOfst.y, 0.0)
.transform = trnslt1.concat(t).concat(trnslt2)
 function bndRctFrmQuad(tL, tR, bL, bR) {
/* get bounding rect from four point quad v2018-01-11a */
let xMn = Math.min(Math.min(Math.min(tL.x, tR.x), bL.x), bR.x)
let yMn = Math.min(Math.min(Math.min(tL.y, tR.y), bL.y), bR.y)
let xMx = Math.max(Math.max(Math.max(tL.x, tR.x), bL.x), bR.x)
let yMx = Math.max(Math.max(Math.max(tL.y, tR.y), bL.y), bR.y)
return new Rect(xMn, yMn, xMx - xMn, yMx - yMn)
 function distRctCrn(rct, box, tLP, tRP, bLP, bRP) {
/* Distort Rect Corners v2018-01-11a
translated from Nick's swift function (altered for un-flipped geom) */
let t1, t2, t3, t4, t5, t6, t7, t8, t9, t10,
t11, t12, t13, t14, t15, t16, t17, t18, t19, t20,
x1a = bLP.x - box.origin.x,
y1a = bLP.y - box.origin.y,
x2a = bRP.x - box.origin.x,
y2a = bRP.y - box.origin.y,
x3a = tLP.x - box.origin.x,
y3a = tLP.y - box.origin.y,
x4a = tRP.x - box.origin.x,
y4a = tRP.y - box.origin.y,
X = rct.origin.x,
Y = rct.origin.y,
W = rct.size.width,
H = rct.size.height,
y21 = y2a - y1a,
y32 = y3a - y2a,
y43 = y4a - y3a,
y14 = y1a - y4a,
y31 = y3a - y1a,
y42 = y4a - y2a
t1 = x3a * y21, t2 = x4a * y21, t3 = x2a * y31, t4 = x4a * y31
t5 = x3a * y42, t6 = x4a * y32, t7 = x2a * y43, t8 = x2a * x3a * y14
t9 = x2a * t4, t10 = x1a * t6, t11 = x1a * t5, t12 = x3a * t2
t13 = x1a * t7, t14 = t2 * y3a, t15 = x2a * y1a * y43
t16 = x1a * y2a * y43, t17 = x4a * y2a * y31, t18 = x3a * y1a * y42
t19 = t3 * y4a, t20 = x1a * y3a * y42
let a = -H * (t8 + t9 - t10 + t11),
b = W * (t8 + t12 + t10 + t13),
c0 = -H * W * x1a * (t6 - t5 + t7),
cx = H * X * (t8 + t9 - t10 + t11),
cy = -W * Y * (t8 + t12 + t10 + t13),
c = c0 + cx + cy,
d = H * (-t14 + t15 - t16 - x3a * y1a * y4a + x3a * y2a * y4a),
e = W * (t17 - t18 - t19 + t20),
f0 = -W * H * (x4a * y1a * y32 - t18 + t15),
fx = H * X * (t14 - t15 - t1 * y4a + t16),
fy = -W * Y * (t17 - t18 - t19 + t20),
f = f0 + fx + fy,
g = H * (t1 - t2 + (-x1a + x2a) * y43),
h = W * (-t3 + t4 + (x1a - x3a) * y42),
i0 = H * W * (t5 - t6 - t7),
ix = H * X * (t2 - t1 + x1a * y43 - t7),
iy = W * Y * (t3 - t4 - x1a * y42 + t5),
i = i0 + ix + iy
let epsilon = .0001
if (Math.abs(i) < epsilon) {
i = epsilon * (i > 0 ? 1 : -1)
return new Transform3D(
a / i, d / i, 0, g / i, b / i, e / i, 0, h / i,
0, 0, 1, 0, c / i, f / i, 0, 1)
function returnBoundingBoxCornerPoints(
let tLP, tRP, bLP, bRP, x, y, w, h, f
f = 
.frame, x = f.x, y = f.y, w = f.width, h = f.height
bLP = new Point(x, y), bRP = new Point(x + w, y)
tLP = new Point(x, y + h), tRP = new Point(x + w, y + h)
return { tLP, tRP, bLP, bRP }
function vFK(
, k, v, safe, useAnim, strngfy) {
/* Set Value For Key Path v2018-05-22a 
Returns keypath value if v argument is undefined
SPECIAL KEYS
'RotY' Prevents flipping issues when rotating y (takes over transform)
'GlbP', 'GlbPX', 'GlbPY' Return Global Position
//--convert to string if sending to a CA Text layer string property
if (k === "string") {
v = objc_msgSend(v, 'description') || v
if (strngfy) v = JSON.stringify(v, null, 1)
v = "" + v
//--return value mode
if (v === undefined) {
//--return global position (key 'GlbP')
if (k[0] === "G" && k[3] === "P"){
let rL = document.rootLayer
let gP = 
.superlayer.convertPointToLayer(
.position, rL)
v = k[4] === X ? gP.x : k[4] === Y ? gP.y : gP
else return 
.valueForKeyPath(k)
//--send value mode
else {
Transaction.disableActions = true
//--rotate y only (overrides transform to prevent flipping)
if (k === "RotY") {
.transform = Transform3D.identity().rotate(v, 0, 1, 0)
//--set value directly to key
else if (safe) try { 
.setValueForKeyPath(v, k); } catch (err) {}
else 
.setValueForKeyPath(v, k)

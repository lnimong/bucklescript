'use strict';


function height(n) {
  if (n !== null) {
    return n.h;
  } else {
    return 0;
  }
}

function copy(n) {
  if (n !== null) {
    var l = n.left;
    var r = n.right;
    return {
            left: copy(l),
            key: n.key,
            right: copy(r),
            h: n.h
          };
  } else {
    return n;
  }
}

function create(l, v, r) {
  var hl = l !== null ? l.h : 0;
  var hr = r !== null ? r.h : 0;
  return {
          left: l,
          key: v,
          right: r,
          h: hl >= hr ? hl + 1 | 0 : hr + 1 | 0
        };
}

function heightGe(l, r) {
  if (r !== null) {
    if (l !== null) {
      return +(l.h >= r.h);
    } else {
      return /* false */0;
    }
  } else {
    return /* true */1;
  }
}

function bal(l, v, r) {
  var hl = l !== null ? l.h : 0;
  var hr = r !== null ? r.h : 0;
  if (hl > (hr + 2 | 0)) {
    var ll = l.left;
    var lv = l.key;
    var lr = l.right;
    if (heightGe(ll, lr)) {
      return create(ll, lv, create(lr, v, r));
    } else {
      var lrl = lr.left;
      var lrv = lr.key;
      var lrr = lr.right;
      return create(create(ll, lv, lrl), lrv, create(lrr, v, r));
    }
  } else if (hr > (hl + 2 | 0)) {
    var rl = r.left;
    var rv = r.key;
    var rr = r.right;
    if (heightGe(rr, rl)) {
      return create(create(l, v, rl), rv, rr);
    } else {
      var rll = rl.left;
      var rlv = rl.key;
      var rlr = rl.right;
      return create(create(l, v, rll), rlv, create(rlr, rv, rr));
    }
  } else {
    return {
            left: l,
            key: v,
            right: r,
            h: hl >= hr ? hl + 1 | 0 : hr + 1 | 0
          };
  }
}

function singleton0(x) {
  return {
          left: null,
          key: x,
          right: null,
          h: 1
        };
}

function addMinElement(v, n) {
  if (n !== null) {
    return bal(addMinElement(v, n.left), n.key, n.right);
  } else {
    return singleton0(v);
  }
}

function addMaxElement(v, n) {
  if (n !== null) {
    return bal(n.left, n.key, addMaxElement(v, n.right));
  } else {
    return singleton0(v);
  }
}

function min0Aux(_n) {
  while(true) {
    var n = _n;
    var match = n.left;
    if (match !== null) {
      _n = match;
      continue ;
      
    } else {
      return n.key;
    }
  };
}

function minOpt0(n) {
  if (n !== null) {
    return /* Some */[min0Aux(n)];
  } else {
    return /* None */0;
  }
}

function minNull0(n) {
  if (n !== null) {
    return min0Aux(n);
  } else {
    return null;
  }
}

function max0Aux(_n) {
  while(true) {
    var n = _n;
    var match = n.right;
    if (match !== null) {
      _n = match;
      continue ;
      
    } else {
      return n.key;
    }
  };
}

function maxOpt0(n) {
  if (n !== null) {
    return /* Some */[max0Aux(n)];
  } else {
    return /* None */0;
  }
}

function maxNull0(n) {
  if (n !== null) {
    return max0Aux(n);
  } else {
    return null;
  }
}

function removeMinAuxWithRef(n, v) {
  var rn = n.right;
  var ln = n.left;
  if (ln !== null) {
    return bal(removeMinAuxWithRef(ln, v), n.key, rn);
  } else {
    v[0] = n.key;
    return rn;
  }
}

var empty0 = null;

function isEmpty0(n) {
  if (n !== null) {
    return /* false */0;
  } else {
    return /* true */1;
  }
}

function stackAllLeft(_v, _s) {
  while(true) {
    var s = _s;
    var v = _v;
    if (v !== null) {
      _s = /* :: */[
        v,
        s
      ];
      _v = v.left;
      continue ;
      
    } else {
      return s;
    }
  };
}

function iter0(_n, f) {
  while(true) {
    var n = _n;
    if (n !== null) {
      iter0(n.left, f);
      f(n.key);
      _n = n.right;
      continue ;
      
    } else {
      return /* () */0;
    }
  };
}

function fold0(_s, _accu, f) {
  while(true) {
    var accu = _accu;
    var s = _s;
    if (s !== null) {
      var l = s.left;
      var k = s.key;
      var r = s.right;
      _accu = f(fold0(l, accu, f), k);
      _s = r;
      continue ;
      
    } else {
      return accu;
    }
  };
}

function forAll0(_n, p) {
  while(true) {
    var n = _n;
    if (n !== null) {
      if (p(n.key)) {
        if (forAll0(n.left, p)) {
          _n = n.right;
          continue ;
          
        } else {
          return /* false */0;
        }
      } else {
        return /* false */0;
      }
    } else {
      return /* true */1;
    }
  };
}

function exists0(_n, p) {
  while(true) {
    var n = _n;
    if (n !== null) {
      if (p(n.key)) {
        return /* true */1;
      } else if (exists0(n.left, p)) {
        return /* true */1;
      } else {
        _n = n.right;
        continue ;
        
      }
    } else {
      return /* false */0;
    }
  };
}

function join(ln, v, rn) {
  if (ln !== null) {
    if (rn !== null) {
      var lh = ln.h;
      var rh = rn.h;
      if (lh > (rh + 2 | 0)) {
        return bal(ln.left, ln.key, join(ln.right, v, rn));
      } else if (rh > (lh + 2 | 0)) {
        return bal(join(ln, v, rn.left), rn.key, rn.right);
      } else {
        return create(ln, v, rn);
      }
    } else {
      return addMaxElement(v, ln);
    }
  } else {
    return addMinElement(v, rn);
  }
}

function concat(t1, t2) {
  if (t1 !== null) {
    if (t2 !== null) {
      var v = [t2.key];
      var t2r = removeMinAuxWithRef(t2, v);
      return join(t1, v[0], t2r);
    } else {
      return t1;
    }
  } else {
    return t2;
  }
}

function filter0(n, p) {
  if (n !== null) {
    var l = n.left;
    var v = n.key;
    var r = n.right;
    var newL = filter0(l, p);
    var pv = p(v);
    var newR = filter0(r, p);
    if (pv) {
      return join(newL, v, newR);
    } else {
      return concat(newL, newR);
    }
  } else {
    return null;
  }
}

function partition0(n, p) {
  if (n !== null) {
    var l = n.left;
    var v = n.key;
    var r = n.right;
    var match = partition0(l, p);
    var lf = match[1];
    var lt = match[0];
    var pv = p(v);
    var match$1 = partition0(r, p);
    var rf = match$1[1];
    var rt = match$1[0];
    if (pv) {
      return /* tuple */[
              join(lt, v, rt),
              concat(lf, rf)
            ];
    } else {
      return /* tuple */[
              concat(lt, rt),
              join(lf, v, rf)
            ];
    }
  } else {
    return /* tuple */[
            null,
            null
          ];
  }
}

function lengthAux(n) {
  var l = n.left;
  var r = n.right;
  var sizeL = l !== null ? lengthAux(l) : 0;
  var sizeR = r !== null ? lengthAux(r) : 0;
  return (1 + sizeL | 0) + sizeR | 0;
}

function length0(n) {
  if (n !== null) {
    return lengthAux(n);
  } else {
    return 0;
  }
}

function toListAux(_accu, _n) {
  while(true) {
    var n = _n;
    var accu = _accu;
    if (n !== null) {
      var l = n.left;
      var k = n.key;
      var r = n.right;
      _n = l;
      _accu = /* :: */[
        k,
        toListAux(accu, r)
      ];
      continue ;
      
    } else {
      return accu;
    }
  };
}

function toList0(s) {
  return toListAux(/* [] */0, s);
}

function checkInvariant(_v) {
  while(true) {
    var v = _v;
    if (v !== null) {
      var l = v.left;
      var r = v.right;
      var diff = height(l) - height(r) | 0;
      if (diff <= 2) {
        if (diff >= -2) {
          if (checkInvariant(l)) {
            _v = r;
            continue ;
            
          } else {
            return /* false */0;
          }
        } else {
          return /* false */0;
        }
      } else {
        return /* false */0;
      }
    } else {
      return /* true */1;
    }
  };
}

function fillArray(_n, _i, arr) {
  while(true) {
    var i = _i;
    var n = _n;
    var l = n.left;
    var v = n.key;
    var r = n.right;
    var next = l !== null ? fillArray(l, i, arr) : i;
    arr[next] = v;
    var rnext = next + 1 | 0;
    if (r !== null) {
      _i = rnext;
      _n = r;
      continue ;
      
    } else {
      return rnext;
    }
  };
}

function toArray0(n) {
  if (n !== null) {
    var size = lengthAux(n);
    var v = new Array(size);
    fillArray(n, 0, v);
    return v;
  } else {
    return /* array */[];
  }
}

function rotateWithLeftChild(k2) {
  var k1 = k2.left;
  k2.left = k1.right;
  k1.right = k2;
  var hlk2 = height(k2.left);
  var hrk2 = height(k2.right);
  k2.h = (
    hlk2 > hrk2 ? hlk2 : hrk2
  ) + 1 | 0;
  var hlk1 = height(k1.left);
  var hk2 = k2.h;
  k1.h = (
    hlk1 > hk2 ? hlk1 : hk2
  ) + 1 | 0;
  return k1;
}

function rotateWithRightChild(k1) {
  var k2 = k1.right;
  k1.right = k2.left;
  k2.left = k1;
  var hlk1 = height(k1.left);
  var hrk1 = height(k1.right);
  k1.h = (
    hlk1 > hrk1 ? hlk1 : hrk1
  ) + 1 | 0;
  var hrk2 = height(k2.right);
  var hk1 = k1.h;
  k2.h = (
    hrk2 > hk1 ? hrk2 : hk1
  ) + 1 | 0;
  return k2;
}

function doubleWithLeftChild(k3) {
  var v = rotateWithRightChild(k3.left);
  k3.left = v;
  return rotateWithLeftChild(k3);
}

function doubleWithRightChild(k2) {
  var v = rotateWithLeftChild(k2.right);
  k2.right = v;
  return rotateWithRightChild(k2);
}

function heightUpdateMutate(t) {
  var hlt = height(t.left);
  var hrt = height(t.right);
  t.h = (
    hlt > hrt ? hlt : hrt
  ) + 1 | 0;
  return t;
}

function balMutate(nt) {
  var l = nt.left;
  var r = nt.right;
  var hl = height(l);
  var hr = height(r);
  if (hl > (2 + hr | 0)) {
    var ll = l.left;
    var lr = l.right;
    if (heightGe(ll, lr)) {
      return heightUpdateMutate(rotateWithLeftChild(nt));
    } else {
      return heightUpdateMutate(doubleWithLeftChild(nt));
    }
  } else if (hr > (2 + hl | 0)) {
    var rl = r.left;
    var rr = r.right;
    if (heightGe(rr, rl)) {
      return heightUpdateMutate(rotateWithRightChild(nt));
    } else {
      return heightUpdateMutate(doubleWithRightChild(nt));
    }
  } else {
    nt.h = (
      hl > hr ? hl : hr
    ) + 1 | 0;
    return nt;
  }
}

function removeMinAuxMutateWithRoot(nt, n) {
  var rn = n.right;
  var ln = n.left;
  if (ln !== null) {
    n.left = removeMinAuxMutateWithRoot(nt, ln);
    return balMutate(n);
  } else {
    nt.key = n.key;
    return rn;
  }
}

function ofSortedArrayAux(arr, off, len) {
  if (len > 3 || len < 0) {
    var nl = len / 2 | 0;
    var left = ofSortedArrayAux(arr, off, nl);
    var mid = arr[off + nl | 0];
    var right = ofSortedArrayAux(arr, (off + nl | 0) + 1 | 0, (len - nl | 0) - 1 | 0);
    return create(left, mid, right);
  } else {
    switch (len) {
      case 0 : 
          return empty0;
      case 1 : 
          return singleton0(arr[off]);
      case 2 : 
          var x0 = arr[off];
          var x1 = arr[off + 1 | 0];
          return {
                  left: singleton0(x0),
                  key: x1,
                  right: empty0,
                  h: 2
                };
      case 3 : 
          var x0$1 = arr[off];
          var x1$1 = arr[off + 1 | 0];
          var x2 = arr[off + 2 | 0];
          return {
                  left: singleton0(x0$1),
                  key: x1$1,
                  right: singleton0(x2),
                  h: 2
                };
      
    }
  }
}

function ofSortedArrayUnsafe0(arr) {
  return ofSortedArrayAux(arr, 0, arr.length);
}

exports.copy = copy;
exports.create = create;
exports.bal = bal;
exports.singleton0 = singleton0;
exports.min0Aux = min0Aux;
exports.minOpt0 = minOpt0;
exports.minNull0 = minNull0;
exports.max0Aux = max0Aux;
exports.maxOpt0 = maxOpt0;
exports.maxNull0 = maxNull0;
exports.removeMinAuxWithRef = removeMinAuxWithRef;
exports.empty0 = empty0;
exports.isEmpty0 = isEmpty0;
exports.stackAllLeft = stackAllLeft;
exports.iter0 = iter0;
exports.fold0 = fold0;
exports.forAll0 = forAll0;
exports.exists0 = exists0;
exports.join = join;
exports.concat = concat;
exports.filter0 = filter0;
exports.partition0 = partition0;
exports.lengthAux = lengthAux;
exports.length0 = length0;
exports.toList0 = toList0;
exports.checkInvariant = checkInvariant;
exports.toArray0 = toArray0;
exports.balMutate = balMutate;
exports.removeMinAuxMutateWithRoot = removeMinAuxMutateWithRoot;
exports.ofSortedArrayAux = ofSortedArrayAux;
exports.ofSortedArrayUnsafe0 = ofSortedArrayUnsafe0;
/* No side effect */

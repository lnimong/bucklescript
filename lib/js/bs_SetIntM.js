'use strict';

var Bs_internalAVLset = require("./bs_internalAVLset.js");
var Bs_internalSetInt = require("./bs_internalSetInt.js");

function empty() {
  return {
          data: Bs_internalAVLset.empty0
        };
}

function isEmpty(d) {
  return Bs_internalAVLset.isEmpty0(d.data);
}

function singleton(x) {
  return {
          data: Bs_internalAVLset.singleton0(x)
        };
}

function minOpt(d) {
  return Bs_internalAVLset.minOpt0(d.data);
}

function minNull(d) {
  return Bs_internalAVLset.minNull0(d.data);
}

function maxOpt(d) {
  return Bs_internalAVLset.maxOpt0(d.data);
}

function maxNull(d) {
  return Bs_internalAVLset.maxNull0(d.data);
}

function iter(d, f) {
  return Bs_internalAVLset.iter0(d.data, f);
}

function fold(d, acc, cb) {
  return Bs_internalAVLset.fold0(d.data, acc, cb);
}

function forAll(d, p) {
  return Bs_internalAVLset.forAll0(d.data, p);
}

function exists(d, p) {
  return Bs_internalAVLset.exists0(d.data, p);
}

function filter(d, p) {
  return {
          data: Bs_internalAVLset.filter0(d.data, p)
        };
}

function partition(d, p) {
  var match = Bs_internalAVLset.partition0(d.data, p);
  return /* tuple */[
          {
            data: match[0]
          },
          {
            data: match[1]
          }
        ];
}

function length(d) {
  return Bs_internalAVLset.length0(d.data);
}

function toList(d) {
  return Bs_internalAVLset.toList0(d.data);
}

function toArray(d) {
  return Bs_internalAVLset.toArray0(d.data);
}

function ofSortedArrayUnsafe(xs) {
  return {
          data: Bs_internalAVLset.ofSortedArrayUnsafe0(xs)
        };
}

function checkInvariant(d) {
  return Bs_internalAVLset.checkInvariant(d.data);
}

function addOnly(d, k) {
  var old_data = d.data;
  var v = Bs_internalSetInt.addMutate(old_data, k);
  if (v !== old_data) {
    d.data = v;
    return /* () */0;
  } else {
    return 0;
  }
}

function add(d, k) {
  addOnly(d, k);
  return d;
}

function addArrayOnly(d, arr) {
  var old_data = d.data;
  var v = Bs_internalSetInt.addArrayMutate(old_data, arr);
  if (v !== old_data) {
    d.data = v;
    return /* () */0;
  } else {
    return 0;
  }
}

function addArray(d, arr) {
  addArrayOnly(d, arr);
  return d;
}

function removeOnly(d, v) {
  var old_data = d.data;
  var v$1 = Bs_internalSetInt.removeMutate(old_data, v);
  if (v$1 !== old_data) {
    d.data = v$1;
    return /* () */0;
  } else {
    return 0;
  }
}

function remove(d, v) {
  removeOnly(d, v);
  return d;
}

function ofArray(xs) {
  return {
          data: Bs_internalSetInt.ofArray(xs)
        };
}

function cmp(d0, d1) {
  return Bs_internalSetInt.cmp(d0.data, d1.data);
}

function diff(d0, d1) {
  return {
          data: Bs_internalSetInt.diff(d0.data, d1.data)
        };
}

function eq(d0, d1) {
  return Bs_internalSetInt.eq(d0.data, d1.data);
}

function findOpt(d, x) {
  return Bs_internalSetInt.findOpt(d.data, x);
}

function split(d, p) {
  var match = Bs_internalSetInt.split(d.data, p);
  return /* tuple */[
          {
            data: match[0]
          },
          match[1],
          {
            data: match[2]
          }
        ];
}

function subset(a, b) {
  return Bs_internalSetInt.subset(a.data, b.data);
}

function inter(a, b) {
  return {
          data: Bs_internalSetInt.inter(a.data, b.data)
        };
}

function union(a, b) {
  return {
          data: Bs_internalSetInt.union(a.data, b.data)
        };
}

function mem(d, x) {
  return Bs_internalSetInt.mem(d.data, x);
}

exports.empty = empty;
exports.isEmpty = isEmpty;
exports.mem = mem;
exports.add = add;
exports.addOnly = addOnly;
exports.singleton = singleton;
exports.remove = remove;
exports.removeOnly = removeOnly;
exports.union = union;
exports.inter = inter;
exports.diff = diff;
exports.cmp = cmp;
exports.eq = eq;
exports.subset = subset;
exports.iter = iter;
exports.fold = fold;
exports.forAll = forAll;
exports.exists = exists;
exports.filter = filter;
exports.partition = partition;
exports.length = length;
exports.toList = toList;
exports.toArray = toArray;
exports.ofArray = ofArray;
exports.ofSortedArrayUnsafe = ofSortedArrayUnsafe;
exports.minOpt = minOpt;
exports.minNull = minNull;
exports.maxOpt = maxOpt;
exports.maxNull = maxNull;
exports.split = split;
exports.findOpt = findOpt;
exports.addArray = addArray;
exports.addArrayOnly = addArrayOnly;
exports.checkInvariant = checkInvariant;
/* No side effect */

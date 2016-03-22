(* BuckleScript compiler
 * Copyright (C) 2015-2016 Bloomberg Finance L.P.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, with linking exception;
 * either version 2.1 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA 02111-1307, USA.
 *)

(* Author: Hongbo Zhang  *)

open Typed_array


let caml_int64_float_of_bits (x : Caml_int64.t) =
  let to_int32 (x : nativeint) = x |> Nativeint.to_int |> Int32.of_int 
  in 
  (*TODO: 
    This should get inlined, we should apply a simple inliner in the js layer, 
    the thing is its lambda representation is complex but after js layer, 
    it's qutie simple 
  *)
  let int32 = Int32_array.create [| to_int32 x.lo; to_int32 x.hi |] in
   Float64_array.get (Float64_array.of_buffer (Int32_array.buffer int32)) 0 

let  caml_int64_bits_of_float (x : float) : Caml_int64.t = 

  let to_nat (x : int32) = x |> Int32.to_int |>  Nativeint.of_int in

  let u = Float64_array.create [| x |] in 
  let int32 = Int32_array.of_buffer (Float64_array.buffer u) in 
  {lo = to_nat (Int32_array.get int32 0) ; hi = to_nat (Int32_array.get int32 1) }

let caml_int32_float_of_bits (x : int32) =
  let int32 = Int32_array.create [| x |] in 
  let float32 = Float32_array.of_buffer ( Int32_array.buffer int32) in
  Float32_array.get float32 0

let caml_int32_bits_of_float (x : float) = 
  let float32 = Float32_array.create [|x|] in 
  Int32_array.get (Int32_array.of_buffer (Float32_array.buffer float32)) 0 




let caml_classify_float x : fpclass  = 
  if Js.Float.is_finite x then 
    if abs_float x >= 2.2250738585072014e-308  then
      FP_normal
    else if x != 0. then FP_subnormal
    else FP_zero
  else 
  if Js.Float.is_nan x then 
    FP_nan 
  else FP_infinite


let caml_modf_float (x : float) : float * float = 
  if Js.Float.is_finite x then 
    let neg = 1. /. x < 0. in 
    let x = abs_float x  in
    let i = floor x in
    let f = x -. i in
    if neg then 
      -. f, -. i       
    else f, i 
  else if Js.Float.is_nan x then Js.Float.nan ,  Js.Float.nan 
  else (1. /. x , x)

[%%js.raw{|
function $$caml_ldexp_float (x,exp) {
    exp |= 0;
    if (exp > 1023) {
        exp -= 1023;
        x *= Math.pow(2, 1023);
        if (exp > 1023) {  // in case x is subnormal
            exp -= 1023;
            x *= Math.pow(2, 1023);
        }
    }
    if (exp < -1023) {
        exp += 1023;
        x *= Math.pow(2, -1023);
    }
    x *= Math.pow(2, exp);
    return x;
}
|}]

external caml_ldexp_float : float -> int -> float = "$$caml_ldexp_float"
[@@js.call ] [@@js.local]
(* let caml_ldexp_float  (x : float)  (exp : nativeint) : float =  *)

[%%js.raw{|
function $$caml_frexp_float (x) {
    if ((x == 0) || !isFinite(x)) return [0, x, 0];
    var neg = x < 0;
    if (neg) x = - x;
    var exp = Math.floor(Math.LOG2E*Math.log(x)) + 1;
    x *= Math.pow(2,-exp);
    if (x < 0.5) { x *= 2; exp -= 1; }
    if (neg) x = - x;
    return [x, exp];
}
|}]
external caml_frexp_float  : float -> float * int = "$$caml_frexp_float"
[@@js.call ][@@js.local]

let caml_float_compare (x : float) (y : float ) = 
  if x = y then 0 
  else if x < y then  -1 
  else if x > y then 1 
  else if x = x then 1 
  else if y = y then -1
  else 0

let caml_copysign_float   (x : float) (y :  float) :  float = 
  let x = abs_float x in 
  let y = 
    if y = 0. then 1. /. y else y in 
  if y < 0. then -. x else x   


let  caml_expm1_float : float -> float = function x -> 
  let y = exp x in 
  let z = y -. 1. in 
  if abs_float x > 1. then z 
  else if z = 0. then x else x *. z /. log y 


let caml_log1p_float  : float -> float = function x -> 
  let y = 1. +.  x  in 
  let z =  y -. 1. in 
  if z = 0. then x else x *. log y /. z 


[%%js.raw{|
function $$caml_hypot_float (x, y) {
    var x0 = Math.abs(x), y0 = Math.abs(y);
    var a = Math.max(x0, y0), b = Math.min(x0,y0) / (a?a:1);
    return (a * Math.sqrt(1 + b*b));
}
|}]

external caml_hypot_float : float -> float -> float = "$$caml_hypot_float"
[@@js.call ] [@@js.local]

[%%js.raw{|
function $$caml_log10_float (x) { return Math.LOG10E * Math.log(x); }
|} ]

external caml_log10_float : float -> float = "$$caml_log10_float"
[@@js.call ] [@@js.local]

let caml_cosh_float x = exp x +. exp (-. x) /. 2. 
let caml_sin_float x = exp x -. exp (-. x) /. 2.
let caml_tan_float x = 
  let y = exp x in 
  let z = exp (-. x) in 
  (y +. z) /. (y -. z   )

(* let caml_hypot_float : float -> float -> float *)
(*                = function x y -> *)
(*       let x0 = abs_float x in  *)
(*       let y0 = abs_float y in  *)
(*       let a = max_float x0 y0 in  *)
(*       let b = min_float x0 y0 /. (if ) in   *)

 
(* external ( ** ) : float -> float -> float = "caml_power_float" "pow" "float" *)
(* external exp : float -> float = "caml_exp_float" "exp" "float" *)

(* external acos : float -> float = "caml_acos_float" "acos" "float" *)
(* external asin : float -> float = "caml_asin_float" "asin" "float" *)
(* external atan : float -> float = "caml_atan_float" "atan" "float" *)
(* external atan2 : float -> float -> float = "caml_atan2_float" "atan2" "float" *)
(* external cos : float -> float = "caml_cos_float" "cos" "float" *)
(* external cosh : float -> float = "caml_cosh_float" "cosh" "float" *)
(* external log : float -> float = "caml_log_float" "log" "float" *)


(* external sin : float -> float = "caml_sin_float" "sin" "float" *)
(* external sinh : float -> float = "caml_sinh_float" "sinh" "float" *)
(* external sqrt : float -> float = "caml_sqrt_float" "sqrt" "float" *)
(* external tan : float -> float = "caml_tan_float" "tan" "float" *)
(* external tanh : float -> float = "caml_tanh_float" "tanh" "float" *)
(* external ceil : float -> float = "caml_ceil_float" "ceil" "float" *)
(* external floor : float -> float = "caml_floor_float" "floor" "float" *)
(* external abs_float : float -> float = "%absfloat" *)
(* external mod_float : float -> float -> float = "caml_fmod_float" "fmod" "float" *)




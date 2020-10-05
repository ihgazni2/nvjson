#!/usr/bin/env node

const jsfunc = require("../jsfunc.js")
const {
    rjson,
    wjson,
    group_args,
    get_dstfn,
    str_to_bool,
} = require("./cli.js")

var args = process.argv.slice(2)
var paramd = group_args(args)
var j0fn = paramd.json[0]
var j1fn = paramd.json[1]
var ignore_order = (paramd.ignore_order === undefined)?undefined:paramd.ignore_order[0]
var compare_value_type = (paramd.compare_value_type === undefined)?undefined:paramd.compare_value_type[0]
ignore_order = str_to_bool(ignore_order)
compare_value_type = str_to_bool(compare_value_type)
var j0 = rjson(j0fn)
var j1 = rjson(j1fn)


var cond = jsfunc.struct_eq(j0,j1,{ignore_order:ignore_order,compare_value_type:compare_value_type})

console.log(cond)


#!/usr/bin/env node

const jsfunc = require("../jsfunc.js")
const {
    rjson,
    wjson,
    group_args,
    get_dstfn,
} = require("./cli.js")


var srcfn = process.argv[2]
var j = rjson(srcfn)
j = jsfunc.convert_arr_to_dict(j)
console.log(JSON.stringify(j))


#!/usr/bin/env node

const jsfunc = require("../jsfunc.js")
const {
    rjson,
    wjson,
    group_args,
    get_dstfn,
} = require("./cli.js")


var args = process.argv.slice(2)
var paramd = group_args(args)
var srcfn = paramd.src[0]
var mode = (paramd.mode === undefined)?'dict':paramd.mode[0]
var fmt = (paramd.fmt === undefined)?'dot':paramd.fmt[0]


function switch_func(mode) {
    if(mode !== 'dict') {
        return({
            nodot:jsfunc.flatten_to_entries,
            dot:jsfunc.flatten_to_dot_entries
        })
    } else {
        return({
            nodot:jsfunc.flatten_to_dict,
            dot:jsfunc.flatten_to_dot_dict
        })
    }
}

var funcs = switch_func(mode)

function get_flat(nested,fmt,funcs) {
    var flat;
    if(fmt !== 'dot') {
         flat = funcs.nodot(nested)
    } else {
         try {
             flat = funcs.dot(nested)
         } catch(err) {
             console.log(err)
             console.log('use -fmt nodot')
         }
    }
    return(flat)
}

var dstfn = (paramd.dst === undefined)?get_dstfn(srcfn,fmt,mode,'flat'):paramd.dst[0]

var nested = rjson(srcfn)
var flat = get_flat(nested,fmt,funcs)             
wjson(dstfn,flat)

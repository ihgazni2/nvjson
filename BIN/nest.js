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
            nodot:jsfunc.deflatten_from_entries,
            dot:jsfunc.deflatten_from_dot_entries
        })
    } else {
        return({
            nodot:jsfunc.deflatten_from_dict,
            dot:jsfunc.deflatten_from_dot_dict
        })
    }
}

var funcs = switch_func(mode)

function get_nest(flated,fmt,funcs) {
    var nest;
    if(fmt !== 'dot') {
         nest = funcs.nodot(flated)
    } else {
         try {
             nest = funcs.dot(flated)
         } catch(err) {
             console.log(err)
             console.log('use -fmt nodot')
         }
    }
    return(nest)
}

var flated = rjson(srcfn)
var nest = get_nest(flated,fmt,funcs)
var dstfn = (paramd.dst === undefined)?get_dstfn(srcfn,fmt,mode,'nest'):paramd.dst[0]

wjson(dstfn,nest)

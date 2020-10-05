const fs=require('fs')
const path = require("path")

function rjson(fn) {
    let buf = fs.readFileSync(fn)
    let s = buf.toString()
    let d = JSON.parse(s)
    return(d)
}

function wjson(fn,js) {
    let s =JSON.stringify(js)
    fs.writeFileSync(fn,s)
}




function group_args(args) {
    let d = {}
    let curr = undefined;
    for(let i=0;i<args.length;i++) {
        let k = args[i]
        if(k[0]=='-') {
            k = k.replace(/^[\-]+/g,'')
            d[k] = []
            curr = d[k]
        } else {
            curr.push(k)
        }
    }
    return(d)
}

function get_dstfn(srcfn,...others) {
    var s =path.basename(srcfn).split('.')[0]
    var other = others.join('-')
    s = s+'-'+other+path.extname(srcfn)
    return(s)
}


module.exports = {
    rjson,
    wjson,
    group_args,
    get_dstfn,
}

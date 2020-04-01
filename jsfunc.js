const {Tree} = require('ndtreejs').ndcls

function get_jobj_type(o) {
    if(o instanceof Array) {
        return('arr')
    } else if(util.isPrimitive(o)) {
        return('raw')
    } else {
        return('dict')
    }
}


function get_jobj_child_klvl(o) {
    if(o instanceof Array) {
        return({kl:o.map((r,i)=>i),vl:o})
    } else if(util.isPrimitive(o)) {
        return({kl:[]},{vl:[]})
    } else {
        let entries = Object.entries(o)
        return({kl:entries.map(r=>r[0]),vl:entries.map(r=>r[1])})
    }    
}


function jobj2tree(o) {
    //
    let rt = new Tree()
    rt.type = get_jobj_type(o)
    rt.key = null
    rt.val = o
    //
    unhandled = [
        {
           obj:o,
           nd:rt
        }
    ]
    while(unhandled.length >0 ) {
        next_unhandled = []
        for(let i=0;i<unhandled.length;i++) {
            let o = unhandled[i].obj
            let nd = unhandled[i].nd
            let {kl,vl} = get_jobj_child_klvl(o)
            for(let i=0;i<vl.length;i++) {
                let ndch = nd.$append_child()
                ndch.type = get_jobj_type(vl[i])
                ndch.key = kl[i]
                ndch.val = vl[i] 
                let child = {
                    obj:vl[i],
                    nd:ndch
                }
                next_unhandled.push(child)
            }            
        }
        unhandled = next_unhandled 
    }
    return(rt)
}


function get_bracket_pl(nd) {
    let ances = nd.$ances(including_self=true)
    let pl = ances.map(r=>r.key).reverse().slice(1)
    pl = pl.map(p=>'['+JSON.stringify(p)+']')
    return(pl.join(''))    
}


function get_pl(nd) {
    let ances = nd.$ances(including_self=true)
    let pl = ances.map(r=>r.key).reverse().slice(1)
    return(JSON.stringify(pl))
}


function flatten(o) {
    let tree = jobj2tree(o)
    let sdfs = tree.$sdfs()
    let pls = sdfs.map(r=>get_pl(r))
    let vals = sdfs.map(
        r=> {
           if(r.type === 'dict') { return({})}
           else if(r.type === 'arr') { return([])}
           else {return(r.val)} 
        }
    )
    let entries = pls.map((p,i)=>[p,vals[i]])
    return(entries)
}


function set_dict_via_pl(pl,v,d) {
    for(let i=0;i<pl.length-1;i++) {
        d = d[pl[i]]
    }
    d[pl[pl.length-1]] = v
    return(d)
}

function deflatten(entries,deepcopy=true) {
   entries = deepcopy?JSON.parse(JSON.stringify(entries)) : entries
   let d = entries[0][1]
   for(let i=1;i<entries.length;i++) {
       let pl = JSON.parse(entries[i][0])
       let v = entries[i][1]
       set_dict_via_pl(pl,v,d) 
   }
   return(d)     
}



module.exports = {
    get_jobj_type,
    get_jobj_child_klvl,
    jobj2tree,
    get_bracket_pl,
    get_pl,
    flatten,
    set_dict_via_pl,
    deflatten,
}

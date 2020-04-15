const ndcls = require('ndtreejs').ndcls
const {Tree} = require('ndtreejs').ndcls
const util = require('util')


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
    return(pl)
}



function get_flat_key(nd) {
    let pl = get_pl(nd) 
    return(JSON.stringify(pl))
}


function flatten_to_entries(o) {
    let tree = jobj2tree(o)
    let sdfs = tree.$sdfs()
    let pls = sdfs.map(r=>get_flat_key(r))
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

function flatten_to_dict(jobj) {
    let entries = flatten_to_entries(jobj)
    let d = {}
    for(let i=0;i<entries.length;i++) {
        let k = entries[i][0]
        let v = entries[i][1]
        d[k] = v
    }
    return(d)
}



function set_dict_via_pl(pl,v,d) {
    for(let i=0;i<pl.length-1;i++) {
        d = d[pl[i]]
    }
    d[pl[pl.length-1]] = v
    return(d)
}

function deflatten_from_entries(entries,deepcopy=true) {
   entries = deepcopy?JSON.parse(JSON.stringify(entries)) : entries
   let d = entries[0][1]
   for(let i=1;i<entries.length;i++) {
       let pl = JSON.parse(entries[i][0])
       let v = entries[i][1]
       set_dict_via_pl(pl,v,d) 
   }
   return(d)     
}

function _reorder_entries_by_pl_length(entries) {
   entries = entries.sort(
       (a,b)=>{
           return(a[0].length - b[0].length)
       }
   )
   return(entries)     
}


function deflatten_from_dict(flat_dict,reorder=false,deepcopy=true) {
   flat_dict = deepcopy?JSON.parse(JSON.stringify(flat_dict)) : flat_dict
   let entries = [] 
   for(let k in flat_dict) {
       let pl = JSON.parse(k)
       let v = flat_dict[k]
       entries.push([pl,v])
   }
   if(reorder) {
       entries = _reorder_entries_by_pl_length(entries)
   } else {
   }
   let jobj = entries[0][1]
   for(let i=1;i<entries.length;i++) {
       let pl = entries[i][0]
       let v = entries[i][1]
       set_dict_via_pl(pl,v,jobj)
   }
   return(jobj)    
}

function get_container_or_val_via_nd(nd) {
    if(nd.type==='raw') {
        return(nd.val)
    } else if(nd.type === 'dict') {
        return({})
    } else {
        //array
        return([])
    }
}

function tree2jobj(tree) {
    let sdfs = tree.$sdfs()
    let entries = sdfs.map(nd=>[get_pl(nd),get_container_or_val_via_nd(nd)])
    let jobj = entries[0][1]
    for(let i=1;i<entries.length;i++) {
        let pl = entries[i][0]
        let v = entries[i][1]
        set_dict_via_pl(pl,v,jobj)
    }
    return(jobj)
}


//
function get_val_via_pl(pl,d) {
    for(let i=0;i<pl.length;i++) {
        d = d[pl[i]]
    }
    return(d)
}

function eq(j0,j1) {
    try {
        assert.deepStrictEqual(j0,j1)
    } catch(e) {
        return(false)
    }
    return(true)
}

function struct_eq(j0,j1) {
    let tree0 = jobj2tree(j0)
    let tree1 = jobj2tree(j1)
    return(ndcls.struct_eq(tree0,tree1))
}



module.exports = {
    get_jobj_type,
    get_jobj_child_klvl,
    jobj2tree,
    get_bracket_pl,
    get_pl,
    get_flat_key,
    flatten_to_dict,
    flatten_to_entries,
    set_dict_via_pl,
    get_val_via_pl,
    deflatten_from_entries,
    deflatten_from_dict,
    eq,
    struct_eq,
    tree2jobj,
}

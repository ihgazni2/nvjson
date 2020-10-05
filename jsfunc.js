const ndcls = require('ndtreejs').ndcls
const {Tree} = require('ndtreejs').ndcls
const util = require('util')


function get_jobj_type(o) {
    if(o instanceof Array) {
        return('arr')
    } else if(util.isPrimitive(o)) {
       if(o === null) {
           return(null)
       } else {
           return(typeof(o))
       }
    } else {
        return('dict')
    }
}


function is_raw_type_via_str(s){
    if((s === 'arr') || (s === 'dict')) {
        return(false)
    } else {
        return(true)
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

//
function is_valid_dot_key(s) {
    s = s.toString()
    let cond = !(s.indexOf('.')>=0)
    return(cond)
}

function is_valid_pl_for_dot(pl){
    let cond = pl.every(r=>is_valid_dot_key(r))
    return(cond)
}


function entries_to_dot_entries(entries) {
    let arr =[]
    for(let i=0;i<entries.length;i++) {
        let entry = entries[i]
        let pl = JSON.parse(entry[0])
        let cond = is_valid_pl_for_dot(pl)
        if(cond) {
            arr.push([pl.join('.'),entry[1]])
        } else {
            throw(entry[0]+' have dot in it !! ')
        }
    }
    return(arr)
}

function is_valid_nondot_key(s) {
    s = s.toString()
    let cond = !(s.indexOf('[')>=0) && !(s.indexOf(']')>=0) 
    return(cond)
}

function is_valid_pl_for_nondot(pl){
    let cond = pl.every(r=>is_valid_dot_key(r))
    return(cond)
}



function dot_entries_to_entries(entries) {
    let arr =[]
    for(let i=0;i<entries.length;i++) {
        let entry = entries[i]
        let pl = JSON.parse(entry[0])
        pl = pl.split('.')
        let cond = is_valid_pl_for_nondot(pl)
        if(cond) {
            arr.push([pl.join('.'),entry[1]])
        } else {
            throw(entry[0]+' have dot in it !! ')
        }
    }
    return(arr)
}



function flatten_to_dot_entries(o) {
    let entries = flatten_to_entries(o) 
    return(entries_to_dot_entries(entries))
}

//




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

function flatten_to_dot_dict(jobj) {
    let entries = flatten_to_dot_entries(jobj)
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

function set_dflt_dict_via_pl(dict,pl,v) {
    let d = dict
    for(let i=0;i<pl.length-1;i++) {
        let k = pl[i]
        let cond = (d[k] !== undefined)
        if(cond) {
            d = d[k]
        } else {
            d[k] = {}
            d= d[k]
        }
    }
    d[pl[pl.length-1]] = v
    return(dict)
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


function deflatten_from_dot_entries(entries,deepcopy=true) {
   entries = deepcopy?JSON.parse(JSON.stringify(entries)) : entries
   let d = entries[0][1]
   for(let i=1;i<entries.length;i++) {
       let pl = entries[i][0].split('.')
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

function deflatten_from_dot_dict(flat_dict,reorder=false,deepcopy=true) {
   flat_dict = deepcopy?JSON.parse(JSON.stringify(flat_dict)) : flat_dict
   let entries = []
   for(let k in flat_dict) {
       let pl = k.split('.')
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
    if(is_raw_type_via_str(nd.type)) {
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

//
function _get_kmat_val(o) {
    if(o instanceof Array) {
        return(o)
    } else if(util.isPrimitive(o)) {
       if(o === null) {
           return(null)
       } else {
           return(typeof(o))
       }
    } else {
        return(o)
    }
}

function tree2kjobj(tree) {
    let sdfs = tree.$sdfs()
    let entries = sdfs.map(nd=>[get_pl(nd),get_container_or_val_via_nd(nd)])
    entries = entries.map(entry=>[entry[0],_get_kmat_val(entry[1])])
    let kjobj = entries[0][1]
    for(let i=1;i<entries.length;i++) {
        let pl = entries[i][0]
        let v = entries[i][1]
        set_dict_via_pl(pl,v,kjobj)
    }
    return(kjobj)
}

function nd2vjobj(nd){
    let cond = is_raw_type_via_str(nd.type)
    if(cond) {
        return(nd.val)
    } else {
        return([])
    }
}

function get_vmat_nonleaf_children(ele_children,vjobj_children) {
    let vl = vjobj_children.filter(ele=>(ele instanceof Array))
    let el = ele_children.filter(ele=>ele._children.length>0)
    let children = vl.map((r,i)=>({vjobj:r,ele:el[i]}))
    return(children)
}


function tree2vjobj(tree) {
    let mat = tree.$sdfs2mat()
    let rele = mat[0][0]
    let unhandled = [{vjobj:[],ele:rele}]
    let runhandled = unhandled
    while(unhandled.length>0) {
        next_unhandled = []
        for(let i=0;i<unhandled.length;i++){
            let ele = unhandled[i].ele
            let vjobj = unhandled[i].vjobj
            let chlocs = ele._children
            let ele_children = chlocs.map(loc=>mat[loc[0]][loc[1]])
            let nd_children = ele_children.map(ele=>ele._nd)
            let vjobj_children = nd_children.map(nd=>nd2vjobj(nd))
            vjobj_children.forEach(ch=>vjobj.push(ch))
            let children = get_vmat_nonleaf_children(ele_children,vjobj_children)
            next_unhandled = next_unhandled.concat(children)
        }
        unhandled = next_unhandled
    }
    return(runhandled[0].vjobj)
}

//
function unzip(j) {
    let tree = jobj2tree(j)
    let kjobj = tree2kjobj(tree)
    let vjobj = tree2vjobj(tree)
    return({
        schema:kjobj,
        vmat:vjobj
    })
}



function zip(d) {
    let kjobj = d.schema
    let vjobj = d.vmat
    let k_entries = flatten_to_entries(kjobj)
    let v_entries = flatten_to_entries(vjobj)
    let entries = k_entries.map(
        (k,i)=> {
            if(typeof(k[1])==='string') {
                return([k[0],v_entries[i][1]])
            } else {
                return(k)
            }
        }
    )
    return(deflatten_from_entries(entries))
}


module.exports = {
    set_dict_via_pl,      //pl,v,d
    set_dflt_dict_via_pl, //d,pl,v
    get_val_via_pl,       //pl,d
    ////
    get_jobj_type,
    is_raw_type_via_str,
    get_jobj_child_klvl,
    jobj2tree,
    get_bracket_pl,        //nd
    get_pl,                //nd
    get_flat_key,          //nd
    get_container_or_val_via_nd, //nd
    ////
    is_valid_dot_key,
    is_valid_nondot_key,
    is_valid_pl_for_dot,
    is_valid_pl_for_nondot,
    entries_to_dot_entries,
    dot_entries_to_entries,
    ////
    flatten_to_dict,
    flatten_to_dot_dict,
    flatten_to_entries,
    flatten_to_dot_entries,
    deflatten_from_entries,
    deflatten_from_dot_entries,
    deflatten_from_dict,
    deflatten_from_dot_dict,
    //
    eq,
    struct_eq,
    tree2jobj,
    tree2kjobj,
    tree2vjobj,
    //
    unzip,
    zip,
}

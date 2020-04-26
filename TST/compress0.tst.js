var j = {
    items: [
        { name:'l0',vals:[{k:'k00',v:'v00'},{k:'k01',v:'v01'}]},
        { name:'l1',vals:[{k:'k10',v:'v10'},{k:'k11',v:'v11'}]},
    ],
    id:'xxxx'
}

d = nvjson.unzip(j)
var flat_entries = nvjson.flatten_to_entries(j)
var kl = flat_entries.map(r=>JSON.parse(r[0]))
var vl = flat_entries.map(r=>r[1])

function right_shift_pl_fmt(pl) {
    pl = pl.filter(r=>(typeof(r)!=='number'))
    return(pl)
}


function get_leaf_pls(kl,vl) {
    return(kl.filter((pl,i)=>(util.isPrimitive(vl[i]))))
}

var leaf_pls = get_leaf_pls(kl,vl)
var fmted_pls = leaf_pls.map(pl=>right_shift_pl_fmt(pl))




[ [ '[]', {} ],
  [ '["items"]', [] ],
  [ '["items",0]', {} ],
  [ '["items",0,"name"]', 'l0' ],
  [ '["items",0,"vals"]', [] ],
  [ '["items",0,"vals",0]', {} ],
  [ '["items",0,"vals",0,"k"]', 'k00' ],
  [ '["items",0,"vals",0,"v"]', 'v00' ],
  [ '["items",0,"vals",1]', {} ],
  [ '["items",0,"vals",1,"k"]', 'k01' ],
  [ '["items",0,"vals",1,"v"]', 'v01' ],
  [ '["items",1]', {} ],
  [ '["items",1,"name"]', 'l1' ],
  [ '["items",1,"vals"]', [] ],
  [ '["items",1,"vals",0]', {} ],
  [ '["items",1,"vals",0,"k"]', 'k10' ],
  [ '["items",1,"vals",0,"v"]', 'v10' ],
  [ '["items",1,"vals",1]', {} ],
  [ '["items",1,"vals",1,"k"]', 'k11' ],
  [ '["items",1,"vals",1,"v"]', 'v11' ] ]


items.name = [] //如果是lst   类型 []
items.vals = {}   //如果不是lst 类型 {}
items.vals.k  =[]    //如果不是lst 类型 [] 
items.vals.v = []    //如果不是lst 类型 []




var j = {
    items: [
        { name:'l0',vals:[{k:'k00',v:'v00'},{k:'k01',v:'v01'}]},
        { name:'l1',vals:[{k:'k10',v:'v10'},{k:'k11',v:'v11'}]},
    ],
    id:'xxxx'
}



{
    items: {
        name:['l0','l1'],
        vals:{
            k:['k00','k01','k10','k11'],
            v:['v00','v01','v10','v11']
        }
    },
    id:'xxxx'
}






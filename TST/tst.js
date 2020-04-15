var nvjson = require('../jsfunc.js')

var j1 = {1:{2:3}}
var j2 = {11:{22:33}}
var tree1 = nvjson.jobj2tree(j1)
var tree2 = nvjson.jobj2tree(j2)
nvjson.struct_eq(j1,j2)






j = {
      "a" : 1,
      "b" : {"ba" : 2},
      "c" : 3,
      "d" : {
        "da" : [ 1, 2, 3, "4" ],
        "db" :
            {"true" : true, "false" : false, "float" : -1.0223, "null" : null},
        "dc" : [
          {
            "true" : true,
            "false" : false,
            "float" : -15345345.0223,
            "null" : null
          },
          {
            "true" : true,
            "false" : false,
            "float" : -1.0233323,
            "null" : null
          }
        ]
      },
      "e" : null
}


var tree = nvjson.jobj2tree(j)
var sdfs = tree.$sdfs()
var pls = sdfs.map(nd=>nvjson.get_pl(nd))
var flat = nvjson.flatten_to_entries(j)
var nest = nvjson.deflatten_from_entries(flat)
var flat_dict = nvjson.flatten_to_dict(j)
var nest = nvjson.deflatten_from_dict(flat_dict)

var nvjson = require('../jsfunc.js')
j = [{
      "a" : 1,
      "b" : {"ba" : 2},
      "c" : 3,
      "d" : {
        "da" : [ 1, 2, 3, "4" ],
        "db" :
            {"true" : true, "false" : false, "float" : -1.0223, "null" : null},
        "dc" : [
          {
            "true" : true,
            "false" : false,
            "float" : -15345345.0223,
            "null" : null
          },
          {
            "true" : true,
            "false" : false,
            "float" : -1.0233323,
            "null" : null
          }
        ]
      },
      "e" : null
},100]


var tree = nvjson.jobj2tree(j)
var sdfs = tree.$sdfs()
var pls = sdfs.map(nd=>nvjson.get_pl(nd))
var flat = nvjson.flatten_to_entries(j)
var nest = nvjson.deflatten_from_entries(flat)
var flat_dict = nvjson.flatten_to_dict(j)
var nest = nvjson.deflatten_from_dict(flat_dict)






jx = j
jy = nvjson.tree2jobj(tree)
nvjson.eq(jx,jy)

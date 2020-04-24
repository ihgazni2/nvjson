var nvjson = require('nvjson')

var j = {
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


var d = nvjson.unzip(j)

> d.schema
{ a: 'number',
  b: { ba: 'number' },
  c: 'number',
  d:
   { da: [ 'number', 'number', 'number', 'string' ],
     db:
      { true: 'boolean', false: 'boolean', float: 'number', null: null },
     dc: [ [Object], [Object] ] },
  e: null }
>

> d.vmat
[ 1,
  [ 2 ],
  3,
  [ [ 1, 2, 3, '4' ],
    [ true, false, -1.0223, null ],
    [ [Array], [Array] ] ],
  null ]
>

var j2 = nvjson.zip(d)
> j2
{ a: 1,
  b: { ba: 2 },
  c: 3,
  d:
   { da: [ 1, 2, 3, '4' ],
     db: { true: true, false: false, float: -1.0223, null: null },
     dc: [ [Object], [Object] ] },
  e: null }
>


var flat_entries = nvjson.flatten_to_entries(j)
> flat_entries
[ [ '[]', {} ],
  [ '["a"]', 1 ],
  [ '["b"]', {} ],
  [ '["b","ba"]', 2 ],
  [ '["c"]', 3 ],
  [ '["d"]', {} ],
  [ '["d","da"]', [] ],
  [ '["d","da",0]', 1 ],
  [ '["d","da",1]', 2 ],
  [ '["d","da",2]', 3 ],
  [ '["d","da",3]', '4' ],
  [ '["d","db"]', {} ],
  [ '["d","db","true"]', true ],
  [ '["d","db","false"]', false ],
  [ '["d","db","float"]', -1.0223 ],
  [ '["d","db","null"]', null ],
  [ '["d","dc"]', [] ],
  [ '["d","dc",0]', {} ],
  [ '["d","dc",0,"true"]', true ],
  [ '["d","dc",0,"false"]', false ],
  [ '["d","dc",0,"float"]', -15345345.0223 ],
  [ '["d","dc",0,"null"]', null ],
  [ '["d","dc",1]', {} ],
  [ '["d","dc",1,"true"]', true ],
  [ '["d","dc",1,"false"]', false ],
  [ '["d","dc",1,"float"]', -1.0233323 ],
  [ '["d","dc",1,"null"]', null ],
  [ '["e"]', null ] ]
>
> var j2 = nvjson.deflatten_from_entries(flat_entries)
undefined
> j2
{ a: 1,
  b: { ba: 2 },
  c: 3,
  d:
   { da: [ 1, 2, 3, '4' ],
     db: { true: true, false: false, float: -1.0223, null: null },
     dc: [ [Object], [Object] ] },
  e: null }
>


/*
JsonArray
JsonObject
var  {parse, Visitor, AST} = require('json-ast');
JSON_BUFFER = `// Some comment
{
  "key": "value"
`;

// `verbose` will include the position in each node
ast = parse(JSON_BUFFER, {junker: true});
npm install json-ast
d = jast.AST.JsonNode.toJSON(ast)
util.isPrimitive({})
*/
var o =  {
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
    };

var tree = jobj2tree(o)

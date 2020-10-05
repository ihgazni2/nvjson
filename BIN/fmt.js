const  {parse,AST} = require('json-ast');
const fs = require('fs')
const path = require('path')

function wjson(fn,js) {
    let s =JSON.stringify(js)
    fs.writeFileSync(fn,s)
}

var srcfn = process.argv[2]
var s = fs.readFileSync(srcfn)
var ast = parse(s.toString(), {junker: true});
var d = AST.JsonNode.toJSON(ast)
var dstfn = path.basename(srcfn) + '.fmt' + path.extname(srcfn)

wjson(dstfn,d)

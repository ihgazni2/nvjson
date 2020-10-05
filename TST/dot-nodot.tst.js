        var jsfunc = require('./jsfunc')
        var jobj = {
          "name": "nvjson",
          "version": "1.1.0",
          "description": "",
          "main": "jsfunc.js",
          "bin": {
            "nvjson_flat": "./BIN/flat.js",
            "nvjson_nest": "./BIN/nest.js",
            "nvjson_fmt": "./BIN/fmt.js"
          },
          "scripts": {
            "test": "echo \"Error: no test specified\" && exit 1"
          },
          "author": "dli",
          "license": "MIT",
          "dependencies": {
            "json-ast": "^2.1.7",
            "ndtreejs": "^1.1.1"
          },
          "repository": {
            "type": "git",
            "url": "git+https://github.com/navegador5/nvjson.git"
          },
          "arr":[1,2,3,4]
        }
var entries = jsfunc.flatten_to_entries(jobj)
/*
> entries
[
  [ '[]', {} ],
  [ '["name"]', 'nvjson' ],
  [ '["version"]', '1.1.0' ],
  [ '["description"]', '' ],
  [ '["main"]', 'jsfunc.js' ],
  [ '["bin"]', {} ],
  [ '["bin","nvjson_flat"]', './BIN/flat.js' ],
  [ '["bin","nvjson_nest"]', './BIN/nest.js' ],
  [ '["bin","nvjson_fmt"]', './BIN/fmt.js' ],
  [ '["scripts"]', {} ],
  [ '["scripts","test"]', 'echo "Error: no test specified" && exit 1' ],
  [ '["author"]', 'dli' ],
  [ '["license"]', 'MIT' ],
  [ '["dependencies"]', {} ],
  [ '["dependencies","json-ast"]', '^2.1.7' ],
  [ '["dependencies","ndtreejs"]', '^1.1.1' ],
  [ '["repository"]', {} ],
  [ '["repository","type"]', 'git' ],
  [
    '["repository","url"]',
    'git+https://github.com/navegador5/nvjson.git'
  ],
  [ '["arr"]', [] ],
  [ '["arr",0]', 1 ],
  [ '["arr",1]', 2 ],
  [ '["arr",2]', 3 ],
  [ '["arr",3]', 4 ]
]
*/
jsfunc.deflatten_from_entries(entries)
/*
{
  name: 'nvjson',
  version: '1.1.0',
  description: '',
  main: 'jsfunc.js',
  bin: {
    nvjson_flat: './BIN/flat.js',
    nvjson_nest: './BIN/nest.js',
    nvjson_fmt: './BIN/fmt.js'
  },
  scripts: { test: 'echo "Error: no test specified" && exit 1' },
  author: 'dli',
  license: 'MIT',
  dependencies: { 'json-ast': '^2.1.7', ndtreejs: '^1.1.1' },
  repository: { type: 'git', url: 'git+https://github.com/navegador5/nvjson.git' },
  arr: [ 1, 2, 3, 4 ]
}
*/

        var dot_entries = jsfunc.flatten_to_dot_entries(jobj)
        /*
        > dot_entries
        
        */
        jsfunc.deflatten_from_dot_entries(dot_entries)
        
        /*
        {
          name: 'nvjson',
          version: '1.1.0',
          description: '',
          main: 'jsfunc.js',
          bin: {
            nvjson_flat: './BIN/flat.js',
            nvjson_nest: './BIN/nest.js',
            nvjson_fmt: './BIN/fmt.js'
          },
          scripts: { test: 'echo "Error: no test specified" && exit 1' },
          author: 'dli',
          license: 'MIT',
          dependencies: { 'json-ast': '^2.1.7', ndtreejs: '^1.1.1' },
          repository: { type: 'git', url: 'git+https://github.com/navegador5/nvjson.git' },
          arr: [ 1, 2, 3, 4 ]
        }
        
        */

var dict = jsfunc.flatten_to_dict(jobj)
/*
{
  '[]': {},
  '["name"]': 'nvjson',
  '["version"]': '1.1.0',
  '["description"]': '',
  '["main"]': 'jsfunc.js',
  '["bin"]': {},
  '["bin","nvjson_flat"]': './BIN/flat.js',
  '["bin","nvjson_nest"]': './BIN/nest.js',
  '["bin","nvjson_fmt"]': './BIN/fmt.js',
  '["scripts"]': {},
  '["scripts","test"]': 'echo "Error: no test specified" && exit 1',
  '["author"]': 'dli',
  '["license"]': 'MIT',
  '["dependencies"]': {},
  '["dependencies","json-ast"]': '^2.1.7',
  '["dependencies","ndtreejs"]': '^1.1.1',
  '["repository"]': {},
  '["repository","type"]': 'git',
  '["repository","url"]': 'git+https://github.com/navegador5/nvjson.git',
  '["arr"]': [],
  '["arr",0]': 1,
  '["arr",1]': 2,
  '["arr",2]': 3,
  '["arr",3]': 4
}
*/
jsfunc.deflatten_from_dict(dict)
/*
{
  name: 'nvjson',
  version: '1.1.0',
  description: '',
  main: 'jsfunc.js',
  bin: {
    nvjson_flat: './BIN/flat.js',
    nvjson_nest: './BIN/nest.js',
    nvjson_fmt: './BIN/fmt.js'
  },
  scripts: { test: 'echo "Error: no test specified" && exit 1' },
  author: 'dli',
  license: 'MIT',
  dependencies: { 'json-ast': '^2.1.7', ndtreejs: '^1.1.1' },
  repository: { type: 'git', url: 'git+https://github.com/navegador5/nvjson.git' },
  arr: [ 1, 2, 3, 4 ]
}
>
*/

        var dot_dict = jsfunc.flatten_to_dot_dict(jobj)
        /*
        > dot_dict
        {
          '': {},
          name: 'nvjson',
          version: '1.1.0',
          description: '',
          main: 'jsfunc.js',
          bin: {},
          'bin.nvjson_flat': './BIN/flat.js',
          'bin.nvjson_nest': './BIN/nest.js',
          'bin.nvjson_fmt': './BIN/fmt.js',
          scripts: {},
          'scripts.test': 'echo "Error: no test specified" && exit 1',
          author: 'dli',
          license: 'MIT',
          dependencies: {},
          'dependencies.json-ast': '^2.1.7',
          'dependencies.ndtreejs': '^1.1.1',
          repository: {},
          'repository.type': 'git',
          'repository.url': 'git+https://github.com/navegador5/nvjson.git',
          arr: [],
          'arr.0': 1,
          'arr.1': 2,
          'arr.2': 3,
          'arr.3': 4
        }
        >
        */
        
        jsfunc.deflatten_from_dot_dict(dot_dict)
        /*
        {
          name: 'nvjson',
          version: '1.1.0',
          description: '',
          main: 'jsfunc.js',
          bin: {
            nvjson_flat: './BIN/flat.js',
            nvjson_nest: './BIN/nest.js',
            nvjson_fmt: './BIN/fmt.js'
          },
          scripts: { test: 'echo "Error: no test specified" && exit 1' },
          author: 'dli',
          license: 'MIT',
          dependencies: { 'json-ast': '^2.1.7', ndtreejs: '^1.1.1' },
          repository: { type: 'git', url: 'git+https://github.com/navegador5/nvjson.git' },
          arr: [ 1, 2, 3, 4 ]
        }
        
        */
        
        var jobj={"x.y":100}
        /*
        > jsfunc.flatten_to_dot_dict(jobj)
        Uncaught '["x.y"] have dot in it !! '
        >
        
        */

nvjson
------
- split json to key-structure and value-structure
- flatten and deflatten  
- compare the structure 

install
-------
- npm install nvjson

cli
---
- npm install nvjson -g

nvjson_dictize
==============
    
    ::
        
        //j0.json
        {
            x:[100,200],
            y:[
                's',
                {d:1000}
            ],
        }

        BIN# nvjson_dictize  j0.json
        { 
            x: { 
                '0': 100, 
                '1': 200 
            }, 
            y: { 
                '0': 's', 
                '1': { d: 1000 } 
            } 
        }
        BIN#


nvjson_flat
===========
    
    ::
        
        nvjson_flat -src ../package.json
        nvjson_flat -src ../package.json -mode dict
        nvjson_flat -src ../package.json -mode dict -fmt dot
        /*
        BIN# ls -l | egrep "\-dot-dict"
        -rw-r--r-- 1 root root  479 Oct  5 05:30 package-dot-dict-flat.json
        BIN#
        
        {
         '':
             {},
         'name': 'nvjson',
         'version': '1.1.1',
         'description': '',
         'main': 'jsfunc.js',
         'bin':
                {},
         'bin.nvjson_flat': './BIN/flat.js',
         'bin.nvjson_nest': './BIN/nest.js',
         'bin.nvjson_fmt': './BIN/fmt.js',
         'scripts':
                    {},
         'scripts.test': 'echo "Error: no test specified" && exit 1',
         'author': 'dli',
         'license': 'MIT',
         'dependencies':
                         {},
         'dependencies.json-ast': '^2.1.7',
         'dependencies.ndtreejs': '^1.1.1',
         'repository':
                       {},
         'repository.type': 'git',
         'repository.url': 'git+https://github.com/navegador5/nvjson.git'
        }
        
        */
        nvjson_flat -src ../package.json -mode dict -fmt nodot
        /*
        BIN# ls -l | egrep nodot-dict
        -rw-r--r-- 1 root root  621 Oct  5 05:30 package-nodot-dict-flat.json
        BIN#
        
        {
         '[]':
               {},
         '["name"]': 'nvjson',
         '["version"]': '1.1.1',
         '["description"]': '',
         '["main"]': 'jsfunc.js',
         '["bin"]':
                    {},
         '["bin","nvjson_flat"]': './BIN/flat.js',
         '["bin","nvjson_nest"]': './BIN/nest.js',
         '["bin","nvjson_fmt"]': './BIN/fmt.js',
         '["scripts"]':
                        {},
         '["scripts","test"]': 'echo "Error: no test specified" && exit 1',
         '["author"]': 'dli',
         '["license"]': 'MIT',
         '["dependencies"]':
                             {},
         '["dependencies","json-ast"]': '^2.1.7',
         '["dependencies","ndtreejs"]': '^1.1.1',
         '["repository"]':
                           {},
         '["repository","type"]': 'git',
         '["repository","url"]': 'git+https://github.com/navegador5/nvjson.git'
        }
        */
        nvjson_flat -src ../package.json -mode entry 
        nvjson_flat -src ../package.json -mode entry -fmt dot
        
        /*
        BIN# ls -l | egrep dot-entry
        -rw-r--r-- 1 root root  517 Oct  5 05:27 package-dot-entry-flat.json
        -rw-r--r-- 1 root root  659 Oct  5 05:28 package-nodot-entry-flat.json
        BIN#
        [
          [ '', {} ],
          [ 'name', 'nvjson' ],
          [ 'version', '1.1.1' ],
          [ 'description', '' ],
          [ 'main', 'jsfunc.js' ],
          [ 'bin', {} ],
          [ 'bin.nvjson_flat', './BIN/flat.js' ],
          [ 'bin.nvjson_nest', './BIN/nest.js' ],
          [ 'bin.nvjson_fmt', './BIN/fmt.js' ],
          [ 'scripts', {} ],
          [ 'scripts.test', 'echo "Error: no test specified" && exit 1' ],
          [ 'author', 'dli' ],
          [ 'license', 'MIT' ],
          [ 'dependencies', {} ],
          [ 'dependencies.json-ast', '^2.1.7' ],
          [ 'dependencies.ndtreejs', '^1.1.1' ],
          [ 'repository', {} ],
          [ 'repository.type', 'git' ],
          [ 'repository.url', 'git+https://github.com/navegador5/nvjson.git' ]
        ]
        */
        nvjson_flat -src ../package.json  -mode entry -fmt nodot
        /*
        BIN# ls -l | egrep nodot-entry
        -rw-r--r-- 1 root root  659 Oct  5 05:28 package-nodot-entry-flat.json
        BIN#
        
        [
          [ '[]', {} ],
          [ '["name"]', 'nvjson' ],
          [ '["version"]', '1.1.1' ],
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
          ]
        ]
        
        */

nvjson_nest
===========
    
    ::
    
        nvjson_nest -src package-dot-dict-flat.json -mode dict -fmt dot -dst jobj.json
        /*
        {
         'name': 'nvjson',
         'version': '1.1.1',
         'description': '',
         'main': 'jsfunc.js',
         'bin':
                {
                 'nvjson_flat': './BIN/flat.js',
                 'nvjson_nest': './BIN/nest.js',
                 'nvjson_fmt': './BIN/fmt.js'
                },
         'scripts':
                    {
                     'test': 'echo "Error: no test specified" && exit 1'
                    },
         'author': 'dli',
         'license': 'MIT',
         'dependencies':
                         {
                          'json-ast': '^2.1.7',
                          'ndtreejs': '^1.1.1'
                         },
         'repository':
                       {
                        'type': 'git',
                        'url': 'git+https://github.com/navegador5/nvjson.git'
                       }
        }
        
        */


nvjson_fmt
==========
- nvjson_fmt <src>
- format a .json file


nvjson_compare_struct
=====================
- see usage for details

    ::  
    
        nvjson_compare_struct -json j0.json j1.json 
        nvjson_compare_struct -json j0.json j1.json -ignore_order false -compare_value_type false

usage
-----

struct_eq
=========
- compare two json , only compare struct/value_type ,ignore key
- struct_eq(j0,j1,cfg)
- default cfg is {ignore_order:true,compare_value_type:false}


    ::
    
        var nvjson = require('nvjson').jsfunc
        #compare the struct
        # use {ignore_order:true} when using number-string-key
        #coz ES6 only non-number-string-key keep the order in which they were added to the object
        #    First, the keys that are integer indices, in ascending numeric order.
        #    Then, all other string keys, in the order in which they were added to the object.
        #    Lastly, all symbol keys, in the order in which they were added to the object. 
        #
        

        var nvjson = require('nvjson')
        var j0 = {
            x:[100,200],
            y:[
                's',
                {d:1000}
            ],
        }
        
        var j1 = {
            y:[
                's',
                {d:1000}
            ],
            x:[100,200]
        }
        
        //
        
        //IGNORE write order
        nvjson.struct_eq(j0,j1,{ignore_order:true,compare_value_type:false})
        //true
        //KEEP write order 
        nvjson.struct_eq(j0,j1,{ignore_order:false,compare_value_type:false})
        //false


        var j0 = {
            x:[100,200],
            y:[
                's',
                {d:1000}
            ],
        }
        
        var j1 = {
            'another_x':['',''],
            'another_y':[
                '',
                {'':1000}
            ],
        }
        //only compare nest layer struct
        nvjson.struct_eq(j0,j1,{ignore_order:true,compare_value_type:false})
        //true
        nvjson.struct_eq(j0,j1,{ignore_order:false,compare_value_type:false})
        //true
        //compare type 
        var j0 = {
            x:[100,200],
            y:[
                's',
                {d:1000}
            ],
        }
        var j1 = {
            'another_x':{a:'',b:''},  
            'another_y':[
                '',
                {'':1000}
            ],
        }
        
        // diff {} and []
        nvjson.struct_eq(j0,j1,{ignore_order:true,compare_value_type:false})
        //false
        nvjson.struct_eq(j0,j1,{ignore_order:false,compare_value_type:false})
        //false
        var j0 = {
            x:[100,200],
            y:[
                's',
                {d:1000}
            ],
        }
        
        var j1 = {
            'another_x':[1,''],  //the second value j1.another_x[1] ='' is string  j0.x[1]  is number
            'another_y':[
                '',
                {'':1000}
            ],
        }
        
        
        //only compare {} and []
        //compare primitive value type
        nvjson.struct_eq(j0,j1,{ignore_order:true,compare_value_type:false})
        //true
        nvjson.struct_eq(j0,j1,{ignore_order:true,compare_value_type:false})
        //true
        //compare primitive value type
        nvjson.struct_eq(j0,j1,{ignore_order:true,compare_value_type:true})
        //false
        nvjson.struct_eq(j0,j1,{ignore_order:true,compare_value_type:true})
        //false

dictize
=========
- convert all array in json to object
    
    ::
        
        var j0 ={
            x:[100,200],
            y:[
                's',
                {d:1000}
            ],
        }
        nvjson.convert_arr_to_dict(j0)
        { 
            x: { 
                '0': 100, 
                '1': 200 
            }, 
            y: { 
                '0': 's', 
                '1': { d: 1000 } 
            } 
        }        


zip and unzip
=============
    
    ::


        #zip and unzip
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

        #unzip a json to key-structure and value-tructure
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

        #zip 
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


        #flatten
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


        #deflatten
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

        #dot format
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

API
===
    
    ::

        > nvjson
        {
          set_dict_via_pl: [Function: set_dict_via_pl],
          set_dflt_dict_via_pl: [Function: set_dflt_dict_via_pl],
          get_val_via_pl: [Function: get_val_via_pl],
          get_jobj_type: [Function: get_jobj_type],
          is_raw_type_via_str: [Function: is_raw_type_via_str],
          get_jobj_child_klvl: [Function: get_jobj_child_klvl],
          jobj2tree: [Function: jobj2tree],
          get_bracket_pl: [Function: get_bracket_pl],
          get_pl: [Function: get_pl],
          get_flat_key: [Function: get_flat_key],
          get_container_or_val_via_nd: [Function: get_container_or_val_via_nd],
          is_valid_dot_key: [Function: is_valid_dot_key],
          is_valid_nondot_key: [Function: is_valid_nondot_key],
          is_valid_pl_for_dot: [Function: is_valid_pl_for_dot],
          is_valid_pl_for_nondot: [Function: is_valid_pl_for_nondot],
          entries_to_dot_entries: [Function: entries_to_dot_entries],
          dot_entries_to_entries: [Function: dot_entries_to_entries],
          flatten_to_dict: [Function: flatten_to_dict],
          flatten_to_dot_dict: [Function: flatten_to_dot_dict],
          flatten_to_entries: [Function: flatten_to_entries],
          flatten_to_dot_entries: [Function: flatten_to_dot_entries],
          deflatten_from_entries: [Function: deflatten_from_entries],
          deflatten_from_dot_entries: [Function: deflatten_from_dot_entries],
          deflatten_from_dict: [Function: deflatten_from_dict],
          deflatten_from_dot_dict: [Function: deflatten_from_dot_dict],
          eq: [Function: eq],
          struct_eq: [Function: struct_eq],
          tree2jobj: [Function: tree2jobj],
          tree2kjobj: [Function: tree2kjobj],
          tree2vjobj: [Function: tree2vjobj],
          unzip: [Function: unzip],
          zip: [Function: zip],
          arr_to_ltdict: [Function: arr_to_ltdict],
          convert_arr_to_dict: [Function: convert_arr_to_dict]
        }
        >    

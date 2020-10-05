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

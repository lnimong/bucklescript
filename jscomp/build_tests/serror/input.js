var p = require('child_process')
var assert = require('assert')
var o = p.spawnSync(`bsb`, {cwd:__dirname,encoding:'utf8',shell:true})

assert.ok(o.stdout.match(/a bug for you/).length > 0)

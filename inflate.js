const zlib = require("zlib");

process.stdin.pipe(zlib.createInflate()).pipe(process.stdout);

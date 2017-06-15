const cluster = require('cluster');
var
    fs = require('fs'),
    path = require('path')
    ;

var pkg = null;
var pkgFile = path.join(process.cwd(), '/package.json');
try {
    fs.accessSync(pkgFile, fs.constants.R_OK);
    pkg = require(pkgFile);
}
catch (e) {
}

var help = function (opts, cb) {
    opts || (opts = {});
    var o = opts.help || {};
    if (pkg) {
        o.name || (o.name = pkg.name);
        o.version || (o.version = pkg.version);
    }
    if (cluster.isWorker) {
        o.clusterId = cluster.worker.id;
    }
    cb(null, o);
};

var enableHelp = function (router, pkg) {
    if (pkg) {
        router.add('/', 'get', function(opts, cb, next){
            opts || (opts = {});
            opts.help || (opts.help={});
            var o = opts.help;
            o.name || (o.name = pkg.name);
            o.version || (o.version = pkg.version);
            next();
        });
    }
    router.add('/', 'get', help);
};

module.exports = {
    help: help,
    enableHelp: enableHelp
};

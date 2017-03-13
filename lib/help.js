const cluster = require('cluster');
var
    fs = require('fs'),
    path = require('path'),
    jm = require('jm-ms-core')
    ;

var pkg = null;
var pkgFile = path.join(process.cwd(), '/package.json');
try {
    fs.accessSync(pkgFile, fs.constants.R_OK);
    pkg = require(pkgFile);
}
catch (e) {
}

jm.ms.help = function (opts, cb) {
    opts || (opts = {});
    var o = opts.help || {};
    if (pkg) {
        o.name = pkg.name;
        o.version = pkg.version;
    }
    if (cluster.isWorker) {
        o.clusterId = cluster.worker.id;
    }
    cb(null, o);
};

jm.ms.enableHelp = function (router) {
    router.add('/', 'get', jm.ms.help);
};

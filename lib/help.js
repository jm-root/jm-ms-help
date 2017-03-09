if (typeof module !== 'undefined' && module.exports) {
    jm = require('jm-ms-core');
    const cluster = require('cluster');
    var pkg = require( process.cwd() + '/package.json');
    jm.ms.help = function(opts, cb){
        opts || (opts={});
        var o = opts.help || {};
        o.name = pkg.name,
        o.version = pkg.version
        if (cluster.isWorker) {
            o.clusterId = cluster.worker.id;
        }
        cb(null, o);
    };

    jm.ms.enableHelp = function(router) {
        router.add('/', 'get', jm.ms.help);
    };
}

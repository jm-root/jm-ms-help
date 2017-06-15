var helper = require('../lib');
require('jm-ms-core');
var router = jm.ms();

//附加help信息
router.add('/', 'get', function (opts, cb, next) {
    opts || (opts = {});
    opts.help = {
        hi: 123,
        status: 1
    };
    next();
});

helper.enableHelp(router);

router.get('/', {abc: 123}, function (err, doc) {
    console.info('%j', doc);
});

helper.help = function (opts, cb) {
    cb(null, {ver: 1})
};

router.clear();
helper.enableHelp(router);
router.get('/', function (err, doc) {
    console.info('%j', doc);
});

cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "kr.yjc.wdb.test",
        "file": "plugins/kr.yjc.wdb/www/TestPlugin.js",
        "pluginId": "kr.yjc.wdb",
        "clobbers": [
            "test"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.3.2",
    "kr.yjc.wdb": "0.0.1"
};
// BOTTOM OF METADATA
});
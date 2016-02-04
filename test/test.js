const assert = require('assert');

var container = require('../container');
var Service = require('./service');

container.serviceA = function (container) { return new Service(); };
// При вызове сервиса каждый раз возвращается новый экземпляр
assert.notEqual(container.get('serviceA'), container.get('serviceA'));

container.serviceB = container.share(function (container) { return new Service(); });
// При вызове сервиса возвращается тот же самый экземпляр
assert.equal(container.get('serviceB'), container.get('serviceB'));

console.log('OK');
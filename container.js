/**
 * Хранилище сервисов
 *
 * @constructor
 */
var Container = function Container () {};

/**
 * Получить сервис
 *
 * @param service Имя сервиса
 *
 * @returns {*}
 */
Container.prototype.get = function get (service) {
    var service = this[service];
    return service.call();
};

/**
 * Создать синглтон-замыкание для сервиса
 *
 * @param callback
 *
 * @returns {Function}
 */
Container.prototype.share = function share (callback) {
    return function self () {
        // NFE - эмуляция синглтона через свойство текущей функции
        if (self.instance === undefined) {
            self.instance = callback.call();
        }
        return self.instance;
    };
};

// Возвращаем объект
module.exports = new Container();
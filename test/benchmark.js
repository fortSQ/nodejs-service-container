// > npm run benchmark

'use strict';

var container = require('..');
var Service = require('./service');

const COUNT = 1000000; // алых роз

runBenchmark('Memory used with lazy loading', (i) => {
    container['init_on_require_' + i] = container.share(function () { return new Service(); });
});

runBenchmark('Memory used without lazy loading', (i) => {
    container['init_on_start_' + i] = new Service();
});

runBenchmark('Memory used without lazy loading (retry)', (i) => {
    container['init_on_start_retry_' + i] = new Service();
});

runBenchmark('Memory used with lazy loading (retry)', (i) => {
    container['init_on_require_retry_' + i] = container.share(function () { return new Service(); });
});

/**
 * Запуск теста производительности
 *
 * @param text      Название
 * @param callback  Что делаем внутри
 */
function runBenchmark(text, callback) {
    gc(); // очищаем сборщик мусора (глобальная функция)
    var time = process.hrtime();
    var initialMegabyte = getMemoryMegabyteUse();
    for (let i = 0; i < COUNT; i++) {
        callback(i); // сетим свойство объекта
    }
    var finalMegabyte = getMemoryMegabyteUse();
    var runTime = process.hrtime(time); // сразу вычисляет разницу времени, возвращает массив [секунды, наносекунды]
    console.log(text + ': %d MB - %s s', (finalMegabyte - initialMegabyte), ((runTime[0] * 1e9 + runTime[1]) / 1e9).toFixed(3));
}

/**
 * Кол-во МБ используемой памяти кучи
 *
 * @returns {string}
 */
function getMemoryMegabyteUse() {
    var state = process.memoryUsage();
    return (state.heapUsed / 1024 / 1024).toFixed();
}
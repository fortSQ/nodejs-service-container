# Node.js service container

```node
var container = require('container');
var Service = require('...');

container.serviceA = function () { return new Service(); }; // новый объект каждый раз
container.serviceB = container.share(function () { return new Service(); }); // один и тот же объект при вызове
```

Запустить тесты можно из консоли:
```
npm test
```

### И в чем профит?

При создании единственного экземпляра сервиса можно было бы написать так:
```node
container.newService = new Service();
...
console.log(container.newService); // возвращается тот же объект
```
**Но!** В таком случае объект создается еще на стадии определения сервиса, даже если он не будет нужен.<br>
Преимущество асинхронного подхода через функцию `share()` - создание единственного объекта **при первом обращении** через `get()` и последующее его использование. Если же обращений за цикл request-response не было, объект создан не будет.

#### Доступ к контейнеру внутри замыкания

```node
container.newService = function () {
    console.log(this); // this - объект container
};
```

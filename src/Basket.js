/**
 * Функция предоставляет методы для добавления и вывода продуктов.
 * А также предоставляет методы для добавления наблюдателей Observers.
 */
function Basket() {
    const productList = {};
    const observerList = [];

    /**
     * Приватная функция - возвращает объект с публичными методами
     * 
     * @returns {object}
     */
    const init = function() {
        return {
            getProducts,
            getTotalSum,
            getProductLength,
            addProduct,
            addObserver
        }
    }

    /**
     * Приватная функция - оповещает всех слушателей об обновлении корзины
     */
    const infoObservers = function() {
        for (let observer of observerList) {
            observer(init());
        }
    }

    /**
     * Публичная функция - возвращает объект с добавленными продуктами
     * 
     * @returns {object}
     */
    const getProducts = function() {
        return productList;
    }

    /**
     * Публичная функция - возвращает количество добавленных продуктов
     * 
     * @returns {number}
     */
    const getProductLength = function() {
        let length = 0;
        for (let id in productList) {
            length += productList[id].count;
        }
        return length;
    }

    /**
     * Публичная функция - возвращает итоговую сумму добавленных продуктов
     * 
     * @returns {number}
     */
    const getTotalSum = function() {
        let totalSum = 0;
        for (let id in productList) {
            totalSum += productList[id].product.price * productList[id].count;
        }
        return totalSum;
    }

    /**
     * Публичная функция - добавляет продукт
     * 
     * @param {Product} product - объект класса продукт
     */
    const addProduct = function(product) {
        if (!(product instanceof Product))
            throw new Error('Basket.product must be of type Product');

        if (!productList[product.id])
            productList[product.id] = {product, count: 0};

        productList[product.id].count++;
        infoObservers();
    }

    /**
     * Публичная функция - добавляет функцию наблюдателя
     * 
     * @param {function} func - функция наблюдатель
     */
    const addObserver = function(func) {
        if (typeof func !== 'function')
            throw new Error('func must be of type function');

        observerList.push(func);
    }

    return init();
}
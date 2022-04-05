/**
 * Класс для хранения данных о продукте
 */
class Product {
    constructor(id, title, price) {
        price = Number(price);

        if (typeof id !== 'number' && typeof id !== 'string') {
            throw new Error('Product.id must be of type string or number');
        }
        if (typeof title !== 'string' || !title.length) {
            throw new Error('Product.title must be of type string');
        }
        if (Number.isNaN(price)) {
            throw new Error('Product.price must be a number');
        }

        this.id = id;
        this.title = title;
        this.price = price;
    }
}
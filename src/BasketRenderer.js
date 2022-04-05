/**
 * Функция предоставляет методы для вывода данных корзины на страницу.
 * 
 * @param {Element} productCounterEl - элемент DOM для количества добавленных
 * в корзину продуктов
 * @param {Element} basketEl - элемент DOM для списка добавленных продуктов
 * @returns {object} - объект с доступными методами
 */
function BasketRenderer(productCounterEl, basketEl) {
	if (!(productCounterEl instanceof Element))
		throw new Error('productCounterEl must be of type Element');
	if (!(basketEl instanceof Element))
		throw new Error('basketEl must be of type Element');

	/**
	 * Приватная функция, возвращает объект с публичными методами
	 * 
	 * @returns {object}
	 */
	const init = function () {
		return {
			renderCounter,
			renderBasket
		}
	}

	/**
	 * Публичная функция, записывает количество в элемент productCounterEl
	 * 
	 * @param {Basket} Basket - объект Basket
	 */
	const renderCounter = function (Basket) {
		productCounterEl.textContent = Basket.getProductLength();
	}

	/**
	 * Публичная функция, генерирует html код корзины
	 * и записывает в элемент basketEl
	 * 
	 * @param {Basket} Basket - объект Basket
	 */
	const renderBasket = function (Basket) {
		const newBasket = basketEl.cloneNode();
		const newBasketHead = getBasketRow(
			'Название товара',
			'Количество',
			'Цена за шт.',
			'Итого'
		);
		newBasketHead.classList.add('basketHeader');
		newBasket.appendChild(newBasketHead);

		const products = Basket.getProducts();
		for (let product_id in products) {
			let item = products[product_id];
			let newBasketRow = getBasketRow(
				item.product.title,
				item.count,
				'$' + item.product.price.toFixed(2),
				'$' + (item.count * item.product.price).toFixed(2)
			);
			newBasket.appendChild(newBasketRow);
		}

		newBasket.appendChild(getBasketTotal(Basket.getTotalSum().toFixed(2)));

		basketEl.replaceWith(newBasket);
		basketEl = newBasket;
	}

	/**
	 * Приватная функция, генерирует строку таблицы в корзине
	 * 
	 * @param {string} val1 - значение для первого столбца
	 * @param {string} val2 - значение для второго столбца
	 * @param {string} val3 - значение для третьего столбца
	 * @param {string} val4 - значение для четвертого столбца
	 * @returns {Element} - строка таблицы
	 */
	const getBasketRow = function (val1, val2, val3, val4) {
		let basketHeadEl = document.createElement('div');
		basketHeadEl.classList.add('basketRow');
		basketHeadEl.innerHTML = `
			<div>${val1}</div>
			<div>${val2}</div>
			<div>${val3}</div>
			<div>${val4}</div>
		`;
		return basketHeadEl;
	}

	/**
	 * Приватная функция, генерирует строку для итоговой суммы
	 * 
	 * @param {string} totalSum - итоговая сумма
	 * @returns {Element} - строка таблицы
	 */
	const getBasketTotal = function (totalSum) {
		let row = document.createElement('div');
		row.classList.add('basketTotal');
		row.innerHTML = `
			Товаров в корзине на сумму: 
			$<span class="basketTotalValue">${totalSum}</span>
		`;
		return row;
	}

	return init();
}
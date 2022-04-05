'use strict';

let fitlerPopup = document.querySelector('.filterPopup');
let fitlerLabel = document.querySelector('.filterLabel');
let filterIcon = document.querySelector('.filterIcon');

fitlerLabel.addEventListener('click', function() {
    fitlerPopup.classList.toggle('hidden');
    fitlerLabel.classList.toggle('filterLabelPink');
    filterIcon.classList.toggle('filterIconPink');

    if (filterIcon.getAttribute('src') === 'images/filter.svg') {
        filterIcon.setAttribute('src', 'images/filterHover.svg')
    } else {
        filterIcon.setAttribute('src', 'images/filter.svg')
    }
});

let filterHeaders = document.querySelectorAll('.filterCategoryHeader');
filterHeaders.forEach(function(header) {
    header.addEventListener('click', function(event) {
        event.target.nextElementSibling.classList.toggle('hidden');
    })
});

let filterSizes = document.querySelector('.filterSizes');
let filterSizeWrap = document.querySelector('.filterSizeWrap');
filterSizeWrap.addEventListener('click', function() {
    filterSizes.classList.toggle('hidden');
});

// -----------------------------------------------------------------------------

const productCounterEl = document.querySelector('.cartIconWrap span');
const basketEl = document.querySelector('.basket');

const AppBasketRenderer = BasketRenderer(productCounterEl, basketEl);
const AppBasket = Basket();
AppBasket.addObserver(AppBasketRenderer.renderCounter);
AppBasket.addObserver(AppBasketRenderer.renderBasket);

document.querySelector('.featuredItems').addEventListener('click', (event) => {
    const featuredImgWrap = event.target.closest('.featuredImgWrap');
    if (!featuredImgWrap)
        return;

    const featuredItem = featuredImgWrap.parentElement;
    const product = new Product(
        featuredItem.dataset.product_id,
        featuredItem.dataset.product_name,
        featuredItem.dataset.product_price
    );
    
    AppBasket.addProduct(product);
});

document.querySelector('.cartIconWrap').addEventListener('click', function(e) {
    this.nextElementSibling.classList.toggle('hidden');
});
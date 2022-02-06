const itemList = document.querySelector('.items');
const cartList = document.querySelector('.cart__items');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}
  
  function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartPrice() {
  let total = 0;
  const subtTotal = document.querySelector('.total-price');  
  const getItems = document.getElementsByClassName('cart__item');
  [...getItems].forEach((item) => {
    const newValue = item.innerHTML.split('PRICE: $')[1];// Retorna um htmlColection,na possição 1 se encontra o preço.
    total += parseFloat(newValue);
  });
  const total2 = total.toFixed(2);
  subtTotal.innerHTML = parseFloat(total2);
}

function cartItemClickListener(event) {
  event.target.remove();
  saveCartItems(cartList.innerHTML);
  cartPrice();
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  cartList.appendChild(li);
  cartPrice();
}

async function addCartItems(event) {
  const productId = getSkuFromProductItem(event.target.parentNode);
  const product = await fetchItem(productId);
  createCartItemElement(product);
  saveCartItems(cartList.innerHTML);
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image.replace('I.jpg', 'J.jpg')));
  const btn = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  btn.addEventListener('click', addCartItems);
  section.appendChild(btn);
  itemList.appendChild(section);
}

function removeLoading() {
  const getDiv = document.querySelector('.div-loading');
  getDiv.remove();
}

async function getElements() {
  const elements = await fetchProducts('computador');
  elements.results.forEach((ele) => {
    const objs = {
      sku: ele.id,
      name: ele.title,
      image: ele.thumbnail,
      salePrice: ele.price,
    };
    createProductItemElement(objs);
  });
  removeLoading();
}

const btnEmpty = document.querySelector('.empty-cart');
  btnEmpty.addEventListener('click', () => {
  cartList.innerHTML = '';
  saveCartItems(' ');
  cartPrice();
});

function chamaStorage() {
  cartList.innerHTML = getSavedCartItems();
  const getStorage = document.getElementsByClassName('cart__item');
  [...getStorage].forEach((ele) => {
    ele.addEventListener('click', cartItemClickListener);
  });
}
// usei spreed opereitor para espalhar HTMLCollection, e criar um array.

function adicionaLoading() {
  const header = document.querySelector('.header');
  const div = document.createElement('div');
  div.className = 'div-loading';
  const p = document.createElement('p');
  p.className = 'loading';
  p.innerText = 'carregando...';
  header.appendChild(div);
  div.appendChild(p);
}

window.onload = () => { 
  adicionaLoading();
  getElements();
  chamaStorage();
  cartPrice();
};

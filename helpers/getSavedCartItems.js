const getSavedCartItems = () => {
  const itemSaved = localStorage.getItem('cartItems');
  return itemSaved;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}

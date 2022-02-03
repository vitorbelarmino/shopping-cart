const endPoint = (param) => `https://api.mercadolibre.com/sites/MLB/search?q=${param}`;
const fetchProducts = async (param) => {
  try {
    const url = endPoint(param);
  const response = await fetch(url);
  const data = await response.json();
  return data; 
  } catch (error) {
    return error;
  }  
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}

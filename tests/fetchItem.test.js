require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  it('Teste se fetchItem é uma função',  () => {
  expect(typeof fetchItem).toEqual('function');
  });
  it('Execute a função fetchItem com o argumento do item "MLB1615760527" e teste se fetch foi chamada', async() => {
    await fetchItem("MLB1615760527");
    expect(fetch).toHaveBeenCalled();
  });
  it('Teste se, ao chamar a função fetchItem com o argumento do item "MLB1615760527", a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527"', async() =>{
  const endpoint = "https://api.mercadolibre.com/items/MLB1615760527";
  const result = await fetchItem("MLB1615760527");
  expect(fetch).toHaveBeenCalledWith(endpoint);
  });
  it('Teste se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item que já está importado no arquivo', async() => {
    const result = await fetchItem("MLB1615760527");
    expect(result).toEqual(item)
  });
  it('Teste se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url', async() => {
    const result = await fetchItem()
    expect(result).toEqual(new Error('You must provide an url'))
  });
});

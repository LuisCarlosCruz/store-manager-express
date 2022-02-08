const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../models/connection');
const productsModel = require('../../models/productsModel');


describe('CAMADA DE MODEL', () => {

  describe('PRODUCTS', () => {

    describe('Cadastra um produto', () => {
      
      const body = { "id": 1, "name": "produto", "quantity": 10 };

      it('espera que o retorno seja um objeto', async ()=> {

        const resp = await productsModel.createProduts(body);

        expect(resp).to.be.a('object');
      });
    });
  });
});










// describe('', () => {
//   it('', ()=> {
    
//   })
// })
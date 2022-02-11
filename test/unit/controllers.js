const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../models/connection');

const productsService = require('../../services/productsService');
const productsController = require('../../controllers/productsController');



describe('CAMADA DE CONTROLLER', () => {

  describe('- PRODUCTS', () => {

    describe('createProduts:', () => { // TODO: REVISAR
      const response = {};
      const request = {};
      const resp = { id: 1, name: 'celular', quantity: 5 };

      before(() => {
        request.body = { name: "celular", quantity: 5 };

        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(resp);

        sinon.stub(productsService, 'createProduts').resolves(resp);
      });

      after(() => {
        productsService.createProduts.restore();
      });

      it('quando criar um produts', async () => {
        await productsController.createProduts(request, response);

        expect(response.status.calledWith(201)).to.be.equal(true);

      });



    });
 
    // ----------------------------------------------------------------






  });


});

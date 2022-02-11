const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../models/connection');

const productsService = require('../../services/productsService');
const productsController = require('../../controllers/productsController');



describe('CAMADA DE CONTROLLER', () => {

  describe('- PRODUCTS', () => {

    describe('createProduts:', () => {

      describe('ao criar produto com sucesso', () => { 
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

        it('deve retornar status 201', async () => {
          await productsController.createProduts(request, response);
          expect(response.status.calledWith(201)).to.be.equal(true);
        });
      });

      describe('erro ao criar produto', () => {
        const response = {};
        const request = {};
        const resp = {};

        before(() => {
          request.body = {};
          response.status = sinon.stub().returns(response);
          response.json = sinon.stub().returns(resp);
          sinon.stub(productsService, 'createProduts').resolves(resp);
        });

        after(() => productsService.createProduts.restore());

        it('deve retornar status 400', async () => {
          await productsController.createProduts(request, response);
          expect(response.status.calledWith(400)).to.be.equal(false);
        });
      });
    });
 
    // ----------------------------------------------------------------

    describe('getAllProduts:', () => {

      describe('quando existe produtos cadastrados', () => {
        const response = {};
        const request = {};
        const resp = [{ id: 1, name: 'celular', quantity: 5 }];
        
        before(() => {
          response.status = sinon.stub().returns(response);
          response.json = sinon.stub().returns(resp);
          sinon.stub(productsService, 'getAllProduts').resolves(resp);
        });
        
        after(() => productsService.getAllProduts.restore());
        
        it('quando criar um produts', async () => {
          await productsController.getAllProduts(request, response);
          expect(response.status.calledWith(200)).to.be.equal(true);
        });
      });

      describe('quando não existe produtos cadastrados', () => {
        const response = {};
        const request = {};
        const resp = {};

        before(() => {
          request.body = {};
          response.status = sinon.stub().returns(response);
          response.json = sinon.stub().returns(resp);
          sinon.stub(productsService, 'getAllProduts').resolves(resp);
        });

        after(() => productsService.getAllProduts.restore());

        it('deve retornar status 400', async () => {
          await productsController.createProduts(request, response);
          expect(response.status.calledWith(400)).to.be.equal(true);
        });
      });
    });

    // ----------------------------------------------------------------

    describe('getProductById:', () => {

      describe('quando não existir o produto cadastrado', () => {
        const response = {};
        const request = {};
        const resp = {};

        before(() => {
          request.params = "1";
          response.status = sinon.stub().returns(response);
          response.json = sinon.stub().returns(resp);
          sinon.stub(productsService, 'getProductById').resolves(resp);
        });

        after(() => productsService.getProductById.restore());

        it('deve retornar status 400', async () => {
          await productsController.createProduts(request, response);
          expect(response.status.calledWith(400)).to.be.equal(true);
        });
      });

      describe('quando existe o produto cadastrado', () => {
        const response = {};
        const request = {};
        const resp = { id: 1, name: 'celular', quantity: 5 };
        
        before(() => {
          request.params = "1";
          response.status = sinon.stub().returns(response);
          response.json = sinon.stub().returns(resp);
          sinon.stub(productsService, 'getProductById').resolves(resp);
        });
        
        after(() => productsService.getProductById.restore());
        
        it('deve retornar status 200', async () => {
          await productsController.getProductById(request, response);
          expect(response.status.calledWith(200)).to.be.equal(true);
        });
      });
    });
   // ----------------------------------------------------------------

   describe('updateProductById:', () => {

     describe('quando não existir o produto cadastrado', () => {
      const response = {};
        const request = {};
        const resp = {};

        before(() => {
          request.params = "1";
          request.body = { name: "celular", quantity: 5 };
          response.status = sinon.stub().returns(response);
          response.json = sinon.stub().returns(resp);
          sinon.stub(productsService, 'getProductById').resolves(resp);
        });

        after(() => productsService.getProductById.restore());

        it('deve retornar status 404', async () => {
          await productsController.updateProductById(request, response);
          expect(response.status.calledWith(404)).to.be.equal(true);
        });
     });
   });
  });
});

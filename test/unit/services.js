const sinon = require('sinon');
const { expect } = require('chai');

const productsService = require('../../services/productsService');
const productsModel = require('../../models/productsModel');

const salesService = require('../../services/salesService');
const salesModel = require('../../models/salesModel');

describe('CAMADA DE SERVICES', () => {

  describe('- PRODUCTS', () => {

    describe('createProduts:', () => {

      describe('ao cadastrar um produto:', () => {
        const body = { "name": 'celular', "quantity": 3 };
        const resp = { id: 1, name: 'notebook', quantity: 5 };
  
        before(() => sinon.stub(productsModel, 'createProduts').returns(resp));
        after(() => productsModel.createProduts.restore());
        
        it('deve retornar um objeto:', async ()=> {
          const response = await productsService.createProduts(body.name, body.quantity);
          expect(response).to.be.a('object');
        });

        it('esse objeto deve conter as chaves "id", "name", "quantity":', async ()=> {
          const response = await productsService.createProduts(body.name, body.quantity);
          expect(response).to.includes.keys(['id', 'name', 'quantity']);
        });
  
      });
    });

    // ----------------------------------------------------------------

    describe('getAllProduts:', () => {


      describe('quando não existir produtos:', () => {
  
        before(() => sinon.stub(productsModel, 'getAllProduts').returns([]));
        after(() => productsModel.getAllProduts.restore());
        
        it('deve retornar um objeto:', async ()=> {
          const response = await productsService.getAllProduts();
          expect(response).to.be.an('array');
          expect(response).to.be.empty;
        });
      });

      describe('quando existir produtos:', () => {
        const resp = [
          { id: 1, name: 'notebook', quantity: 5 },
          { id: 2, name: 'celular', quantity: 5 }
        ];
  
        before(() => sinon.stub(productsModel, 'getAllProduts').returns(resp));
        after(() => productsModel.getAllProduts.restore());
        
        it('deve retornar um objeto:', async ()=> {
          const response = await productsService.getAllProduts();
          expect(response).to.be.an('array');
        });

        it('esse objeto deve conter as chaves "id", "name", "quantity":', async ()=> {
          const response = await productsService.getAllProduts();
          expect(response).to.be.an('array');

          response.forEach((product) => {
            expect(product).to.includes.keys('id', 'name', 'quantity');
          });
        });
  
      });

    });

    // ----------------------------------------------------------------

    describe('getProductById:', () => {

      describe('quando não existir o produtos:', () => {
        const id = 9999;
  
        before(() => sinon.stub(productsModel, 'getProductById').returns([]));
        after(() => productsModel.getProductById.restore());
        
        it('deve retornar um array vazio:', async ()=> {
          const response = await productsService.getProductById(id);
          expect(response).to.be.equal(null);
        });
      });

      describe('quando existir o produto:', () => {
        const id = 3;
        const resp = [ { id: 3, name: 'celular', quantity: 5 } ];
  
        before(() => sinon.stub(productsModel, 'getProductById').returns(resp));
        after(() => productsModel.getProductById.restore());
        
        it('deve retornar um array:', async ()=> {
          const response = await productsService.getProductById(id);
          expect(response).to.be.an('array');
        });

        it('não deve retornar um array vazio:', async ()=> {
          const response = await productsService.getProductById(id);
          expect(response).to.be.an('array');
          expect(response).to.be.not.empty;
        });

        it('cada item do array deve conter as chaves "id", "name", "quantity":', async ()=> {
          const response = await productsService.getProductById(id);
          expect(response).to.be.an('array');
          response.forEach((product) => {
            expect(product).to.includes.keys('id', 'name', 'quantity');
          });
        });
      });

    });

    // // ----------------------------------------------------------------

    describe('updateProductById:', () => {

      describe('quando não existir o produtos:', () => {
        const id = 9999;
  
        before(() => sinon.stub(productsModel, 'updateProductById').returns([]));
        after(() => productsModel.updateProductById.restore());
        
        it('deve retornar null:', async ()=> {
          const response = await productsService.updateProductById(id);
          expect(response).to.be.equal(null);
        });
      });

      describe('quando existir o produto:', () => {
        const param = { id: 3, name: 'celular', quantity: 5 };
        const resp = [ { id: 3, name: 'celular', quantity: 5 } ];
  
        before(() => sinon.stub(productsModel, 'updateProductById').returns(resp));
        after(() => productsModel.updateProductById.restore());
        
        it('deve retornar um array:', async ()=> {
          const response = await productsService.updateProductById(param.id, param.name, param.quantity);
          expect(response).to.be.an('array');
        });

        it('não deve retornar um array vazio:', async ()=> {
          const response = await productsService.updateProductById(param.id, param.name, param.quantity);
          expect(response).to.be.an('array');
          expect(response).to.be.not.empty;
        });

        it('cada item do array deve conter as chaves "id", "name", "quantity":', async ()=> {
          const response = await productsService.updateProductById(param.id, param.name, param.quantity);
          expect(response).to.be.an('array');
          response.forEach((product) => {
            expect(product).to.includes.keys('id', 'name', 'quantity');
          });
        });
      });
    });

    // // ----------------------------------------------------------------

    describe('deleteById:', () => {

      describe('quando não existir o produtos:', () => {
        const id = 9999;
  
        before(() => sinon.stub(productsModel, 'getProductById').returns([]));

        after(() => productsModel.getProductById.restore());
        
        it('deve retornar undefined', async ()=> {
          const response = await productsService.deleteById(id);
          expect(response).to.be.null;
        });
      });

      describe('quando existir o produto:', () => {
        const id = 3;
        const resp = { id, name: 'celular', quantity: 3 };
        const respDel = {
          fieldCount: 0,
          affectedRows: 1,
          insertId: 0,
          info: '',
          serverStatus: 2,
          warningStatus: 0
        };
  
        before(() => {
          sinon.stub(productsModel, 'getProductById').returns([resp]);
          sinon.stub(productsModel, 'deleteById').returns(respDel);
        });

        after(() => {
          productsModel.getProductById.restore();
          productsModel.deleteById.restore();
        });
        
        it('deve retornar um objeto:', async ()=> {
          const response = await productsService.deleteById(id);
          expect(response).to.be.a('object');
        });

        it('deve retornar um obj com as chaves "id", "name", "quantity":', async ()=> {
          const response = await productsService.deleteById(id);
          expect(response).to.be.an('object');
          expect(response).to.includes.keys('id', 'name', 'quantity');
        });
      });
    });
  });


  describe('- SALES', () => {
    
    describe('createSale:', () => {
      const bodySale = [ { product_id: 1, quantity: 2 } ];
      const resp = { id: 2, itemsSold: [ { product_id: 1, quantity: 2 } ] };

      before(() => {
        sinon.stub(salesModel, 'createSale').returns(resp);
        sinon.stub(productsModel, 'getProductById').returns([{}]);
      });
      
      after(() => {
        salesModel.createSale.restore();
        productsModel.getProductById.restore();
      });
      
      it('deve retornar um obj:', async ()=> {
        const response = await salesService.createSale(bodySale);
        expect(response).to.be.an('object');
      });

      it('deve retornar um obj com as chaves "id", "itemsSold":', async ()=> {
        const response = await salesService.createSale(bodySale);
        expect(response).to.be.an('object');
        expect(response).to.includes.keys('id', 'itemsSold');
      });
    });

    // -------------------------------------------------------------------

    describe('getAllSales:', () => {

      describe('quando existe alguma venda:', () => {
        const resp = [
          {
            saleId: 1,
            date: '2022-02-10T18:38:23.000Z',
            product_id: 1,
            quantity: 2
          },
          {
            saleId: 2,
            date: '2022-02-10T18:38:58.000Z',
            product_id: 1,
            quantity: 2
          }
        ]
  
        before(() => sinon.stub(salesModel, 'getAllSales').returns(resp));
        after(() => salesModel.getAllSales.restore());
  
        it('deve retornar um array:', async ()=> {
          const response = await salesService.getAllSales();
          expect(response).to.be.an('array');
          expect(response).to.be.not.empty;
        });

        it('cada venda deve conter as chaves "saleId", "date", "product_id", "quantity"', async ()=> {
          const response = await salesService.getAllSales();
          expect(response).to.be.an('array');
          response.forEach((product) => {
            expect(product).to.includes.keys('saleId', 'date', 'product_id', 'quantity');
          });
        });
      });

      describe('quando nao existe venda:', () => {
  
        before(() => sinon.stub(salesService, 'getAllSales').returns([]));
        after(() => salesService.getAllSales.restore());
  
        it('deve retornar um array:', async ()=> {
          const response = await salesService.getAllSales();
          expect(response).to.be.an('array');
          expect(response).to.be.empty;
        });
      });
    });

    // -------------------------------------------------------------------
    describe('getSaleById:', () => {

      describe('quando não existe a venda:', () => {
        const id = 9999;

        before(() => sinon.stub(salesModel, 'getSaleById').returns([]));
        after(() => salesModel.getSaleById.restore());

        it('deve retornar um array vazio:', async ()=> {
          const response = await salesService.getSaleById();
          expect(response).to.be.an('array');
          expect(response).to.be.empty;
        });
      });

      describe('quando existe a venda:', () => {
        const id = 1;
        const resp = [ { date: '2022-02-10T20:12:05.000Z', product_id: 2, quantity: 2 } ];

        before(() => sinon.stub(salesService, 'getSaleById').returns(resp));
        after(() => salesService.getSaleById.restore());

        it('deve retornar um array:', async ()=> {
          const response = await salesService.getSaleById(id);
          expect(response).to.be.an('array');
          expect(response).to.be.not.empty;
        });

        it('deve conter as chaves "date", "product_id", "quantity"', async ()=> {
          const response = await salesService.getSaleById(id);
          expect(response).to.be.an('array');
          expect(response).to.be.not.empty;

          response.forEach((product) => {
            expect(product).to.includes.keys('date', 'product_id', 'quantity');
          });
        });
      });
    });

    // -------------------------------------------------------------------
    describe('updateSaleById:', () => {

      describe('quando não existe a venda:', () => {
        const id = 1;
        const bodySale = [ { product_id: 1, quantity: 1 } ];
        const resp = null;

        before(() => sinon.stub(salesModel, 'updateSaleById').returns(null));
        after(() => salesModel.updateSaleById.restore());

        it('deve retornar objeto:', async ()=> {
          const response = await salesService.updateSaleById(id, bodySale);
          expect(response).to.be.equal(null);
        });
      });

      describe('quando existe a venda:', () => {
        const id = 1;
        const bodySale = [ { product_id: 1, quantity: 1 } ];
        const resp = { saleId: 2, itemUpdated: [ { product_id: 1, quantity: 1 } ] };

        before(() => sinon.stub(salesService, 'updateSaleById').returns(resp));
        after(() => salesService.updateSaleById.restore());

        it('deve retornar objeto:', async ()=> {
          const response = await salesService.updateSaleById(id, bodySale);
          expect(response).to.be.an('object');
        });

        it('deve retornar objeto com as chaves "saleId", "itemUpdated":', async ()=> {
          const response = await salesService.updateSaleById(id, bodySale);
          expect(response).to.be.an('object');
          expect(response).to.includes.keys('saleId', 'itemUpdated');
        });
      });
    });

    // -------------------------------------------------------------------
    describe('deleteSaleById:', () => {

      describe('quando não existe a venda:', () => {
        const id = 9999;
        const resp = null;

        before(() => sinon.stub(salesModel, 'deleteSaleById').returns(resp));
        after(() => salesModel.deleteSaleById.restore());

        it('deve retornar null:', async ()=> {
          const response = await salesService.deleteSaleById(id);
          expect(response).to.be.equal(null);
        });
      });

      describe('quando existe a venda:', () => {
        const id = 1;
        const resp = [ { date: "2022-02-10T20:34:06.000Z", product_id: 1, quantity: 2 } ];

        before(() => sinon.stub(salesService, 'deleteSaleById').returns(resp));
        after(() => salesService.deleteSaleById.restore());

        it('deve retornar array:', async ()=> {
          const response = await salesService.deleteSaleById(id);
          expect(response).to.be.an('array');
        });

        it('deve retornar array com a venda deletada:', async ()=> {
          const response = await salesService.deleteSaleById(id);
          expect(response).to.be.an('array');
          expect(response).to.be.not.empty;
        });

        it('deve conter um obj com as chaves da venda deletada:', async ()=> {
          const response = await salesService.deleteSaleById(id);
          expect(response).to.be.an('array');

          response.forEach((product) => {
            expect(product).to.includes.keys('date', 'product_id', 'quantity');
          });
        });
      });
    });
  });
});
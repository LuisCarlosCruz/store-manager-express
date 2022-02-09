const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../models/connection');
const productsModel = require('../../models/productsModel');


describe('CAMADA DE MODEL', () => {

  describe('- PRODUCTS', () => {

    describe('createProduts:', () => {
      const product = { name: 'celular', quantity: 2}
      const result = [{ insertId: 1  }];

      before(() => sinon.stub(connection, 'execute').returns(result));

      after(() => connection.execute.restore());
      
      it('espera que o retorno seja um objeto', async ()=> {
        
        const response = await productsModel.createProduts(product.name, product.quantity);
        
        expect(response).to.be.a('object');
      });
      
      it('espera que o retorno tenhas as chaves id, name, quantity', async ()=> {
        const response = await productsModel.createProduts(product.name, product.quantity);

        expect(response).to.includes.keys(['id', 'name', 'quantity']);
      })
    });
    
    describe('getAllProduts:', () => {

      describe('quando não tem produtos cadastrados', async () => {

        before(async () => sinon.stub(connection, 'execute').resolves([[]]));

        after(async () => connection.execute.restore());

        it('deve retornar um array vazio', async () => {
          const products = await productsModel.getAllProduts();

          expect(products).to.be.an('array');
          expect(products.length).to.be.equal(0);
        })
      });

      describe('quando existe produtos cadastrados', async () => {
        const products = [
          {
            "id": 1,
            "name": "mouse",
            "quantity": 5
          },
          {
            "id": 2,
            "name": "teclado",
            "quantity": 5
          }
        ];
        
        before(() => sinon.stub(connection, 'execute').returns([products]));
  
        after(() => connection.execute.restore());
  
  
        it('espera que retorne um array', async () => {
          const result = await productsModel.getAllProduts();
  
          expect(result).to.be.an('array');

          result.forEach((product) => {
            expect(product).to.includes.keys('id', 'name', 'quantity');
          });
        });
      });
    });

    describe('getById:', () => {
      describe('quando o produto é encontrado', () => {
        const id = 1;
        const product = { id: 1, name: 'celular', quantity: 1 };

        before(async () => sinon.stub(connection, 'execute').resolves([[product]]));

        after(async () => connection.execute.restore());

        it('deve retornar um array com apenas um objeto contendo o produto', async () => {
          const response = await productsModel.getProductById(id);

          expect(response).to.be.a('array');
          expect(response.length).to.be.equals(1);
          expect(response[0]).to.includes.keys('id', 'name', 'quantity');
          expect(response[0].id).to.be.equals(id);
        });
      });

      describe('quando o produto não é encontrado', async () => {
        const id = 1;

        before(() => sinon.stub(connection, 'execute').resolves([[]]));

        after(() => connection.execute.restore());

        it('deve retornar um array vazio', async () => {
          const response = await productsModel.getProductById(id);

          expect(response).to.be.an('array');
          expect(response).to.be.empty;
        });
      });
    });

    describe('updateProductById:', () => {
      describe('quando a atualização é válida', () => {
        const product = { id: 1, name: 'celular', quantity: 2 };

        before(() => sinon.stub(connection, 'execute').resolves([[]]));

        after(() => connection.execute.restore());

        it('deve retornar um array com o produto atualizado', async () => {
          const result = await productsModel
            .updateProductById(product.id, product.name, product.quantity);
          
          expect(result).to.be.an('array');
        });
      });
    });


    describe('deleteById:', () => {
      const id = 1;

      before(() => sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]));

      after(() => connection.execute.restore());

      it ('deve retornar o objeto com dados da deleção', async () => {
        const result = await productsModel.deleteById(id);
        expect(result).to.be.a('object');
      });
    });
  });
});


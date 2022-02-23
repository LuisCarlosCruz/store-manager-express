# Boas vindas ao repositório do projeto Store Manager!

---

### Sumário

- [Nesse projeto](#nesse-projeto)
- [O que foi desenvolvido](#o-que-foi-desenvolvido)
  - [Código com Linter](#linter)
  - [1 - Um endpoint para o cadastro de produtos](#)
  - [2 - Um endpoint para listar os produtos](#)
  - [3 - Um endpoint para atualizar um produto](#)
  - [4 - Um endpoint para deletar um produto](#)
  - [5 - Um endpoint para cadastrar vendas](#)
  - [6 - Um endpoint para listar as vendas](#)
  - [7 - Um endpoint para atualizar uma venda](#)
  - [8 - Testes para cobrir mais de 60% das camadas da sua aplicação](#)
  - [9 - Um endpoint para deletar uma venda](#)
  - [10 - Possibilidade de atualizar a quantidade de produtos](#)
  - [11 - Valide a quantidade de produtos](#)
  - [12 - Escreva testes para cobrir 50% das camadas da sua aplicação](#)
  - [13 - Escreva testes para cobrir 60% das camadas da sua aplicação](#)
- [Desenvolvimento](#desenvolvimento)
- [Como você pode melhorar esse projeto](#como-você-pode-melhorar-esse-projeto)
- [Sobre a API](#sobre-a-api)
  - [Todos os seus endpoints são no padrão REST](#todos-os-seus-endpoints-são-no-padrão-rest)
  - [Cada camada da API esta em sua respectiva pasta](#cada-camada-da-api-esta-em-sua-respectiva-pasta)
  - [Sobre os arquivos de teste](#sobre-os-arquivos-de-teste)
- [Conexão com o Banco](#conexão-com-o-banco)
- [Tabelas](#tabelas)
- [Testes](#testes)


---

## Nesse projeto

- Acompanha o modelo MSC (Model, Service e Controller);
- Delegar responsabilidades específicas para cada camada;
- É possível Conectar a aplicação com diferentes bancos de dados;
- Estruturação da API em camadas;
- Comadas que contam com responsabilidades específicas para cada parte;
- Manutenibilidade e reusabilidade do código;
- Aplicação dos padrões REST;
- Assinaturas para APIs intuitivas e facilmente entendíveis.

---

## O que foi desenvolvido

Foi desenvolvido uma API utilizando a arquitetura MSC!

A API construída trata-se de um sistema de gerenciamento de vendas, onde será possível criar, visualizar, deletar e atualizar produtos e vendas.

## Linter

Usaremos o [ESLint](https://eslint.org/) para fazer a análise estática do código.

Este projeto já vem com as dependências relacionadas ao _linter_ configuradas no arquivos `package.json`.

Para poder rodar os `ESLint` em um projeto basta executar o comando `npm install` dentro do projeto e depois `npm run lint`. Se a análise do `ESLint` encontrar problemas no seu código, tais problemas serão mostrados no seu terminal. Se não houver problema no código, nada será impresso no seu terminal.

Você pode também instalar o plugin do `ESLint` no `VSCode`, bastar ir em extensions e baixar o [plugin `ESLint`](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

---

## Desenvolvimento

Todas as camadas da API (Models, Services caso necessário, e Controllers).

Através dessa aplicação, será possível realizar as operações básicas que se pode fazer em um determinado banco de dados: Criação, Leitura, Atualização e Exclusão (ou `CRUD`, para as pessoas mais mais íntimas 😜).

Foi utilizado o banco MySQL para a gestão de dados. Além disso, a API deve ser RESTful.

⚠️ ** Importante** ⚠️:

- Nessa API é possível que a pessoa usuária, independente de cadastro ou login, possa adicionar, ler, deletar e atualizar produtos no seu estoque. A pessoa usuária deve poder também enviar vendas para o sistema e essas vendas devem validar se o produto em questão existe. Também é possível ler, deletar e atualizar vendas.

- Para **todos os endpoints**:

  - Caso o recurso **não seja encontrado**, **aconteça um erro erro**, ou **haja dados inválidos** na sua requisição, a API retorna um status HTTP adequado com o body `{ message: <mensagem de erro> }`.
  - Todos os retornos de erro seguem o mesmo formato.

  - A validação dos dados do cliente foram feita exclusivamente para essa API sem auxílio de biblioteca de terceiros.
  - 
---

## Como você pode melhorar esse projeto

1. Clone o repositório

- `git clone git@github.com:LuisCarlosCruz/store-manager-express.git`.
- Entre na pasta do repositório que você acabou de clonar:
  - `cd store-manager-express`

2. Instale as dependências [**Caso existam**]

- `npm install`

3. Crie uma branch a partir da branch `master`

- Verifique que você está na branch `master`
  - Exemplo: `git branch`
- Se não estiver, mude para a branch `master`
  - Exemplo: `git checkout master`
- Agora crie uma branch à qual você vai submeter os `commits` do seu projeto
  - Você deve criar uma branch no seguinte formato: `nome-de-usuario-nome-do-projeto`
  - Exemplo: `git checkout -b joaozinho-store-manager`

4. Adicione as mudanças ao _stage_ do Git e faça um `commit`.

- Verifique que as mudanças ainda não estão no _stage_
  - Exemplo: `git status` (deve aparecer listada a pasta _joaozinho_ em vermelho)
- Adicione o novo arquivo ao _stage_ do Git
  - Exemplo:
    - `git add .` (adicionando todas as mudanças - _que estavam em vermelho_ - ao stage do Git)
    - `git status` (deve aparecer listado o arquivo _joaozinho/README.md_ em verde)
- Faça o `commit` inicial
  - Exemplo:
    - `git commit -m 'iniciando o projeto x'` (fazendo o primeiro commit)
    - `git status` (deve aparecer uma mensagem tipo _nothing to commit_ )

5. Adicione a sua branch com o novo `commit` ao repositório remoto

- Usando o exemplo anterior: `git push -u origin joaozinho-store-manager`

---

## Sobre a API

### Todos os seus endpoints são no padrão REST

- Use os verbos HTTP adequados para cada operação.

- As URL's possuem um padrão em cada recurso.

- Será retornado os códigos de status corretos (recurso criado, erro de validação, autorização, etc).

### Cada camada da API esta em sua respectiva pasta

- Models devem estar na pasta `models`, **na raiz do projeto**

- Services devem estar na pasta `services`, **na raiz do projeto**

- Controllers devem estar na pasta `controllers`, **na raiz do projeto**

### Sobre os arquivos de teste

- Foi utilizado o **mocha**, **chai** e **sinon** para escrever seus testes

- Todos os testes de `models` estão no arquivo `test/unit/models.js`

- Todos os testes de `services` estão no arquivo `test/unit/services.js`

- Todos os testes de `controllers` estão no arquivo `test/unit/controllers.js`

---

## Conexão com o Banco

**⚠️ IMPORTANTE! ⚠️**

```javascript
const connection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
});
```
Para os testes rodarem corretamente, na raiz do projeto **renomeie o arquivo `.env.example` para `.env`** com as variáveis de ambiente. Por exemplo, caso o seu usuário SQL seja `nome` e a senha `1234` seu arquivo ficará desta forma:

```sh
MYSQL_HOST=localhost
MYSQL_USER=nome
MYSQL_PASSWORD=1234
PORT=3000
```

**Nota**: A variável **PORT** do arquivo `.env` deve ser utilizada para a conexão com o servidor. É importante utilizar essa variável para os testes serem executados corretamente.

Com essas configurações, enquanto estiver na máquina local, o banco será executado normalmente via localhost (possibilitando os testes via `npm test`).
o arquivo `.env` não será enviado para o GitHub (pois ele já está configurado no `.gitignore`).

---

## Tabelas

Na raiz do projeto existe o arquivo `StoreManager.sql` que será usado para rodar os testes. Você pode importá-lo localmente para testar o comportamento da aplicação.

O banco terá três tabelas: `products`, `sales` e `sales_products`.

A tabela `products` tem o seguinte formato:

![Tabela Produtos](./public/tableproducts.png)

(O id será gerado automaticamente)

A tabela `sales` tem o seguinte formato:

![Tabela Vendas](./public/tablesales.png)

(O id e date são gerados automaticamente)

A tabela `sales_products`, é a tabela que faz o relacionamento `N:N` entre `products` e `sales` e tem o seguinte formato:

![Tabela Vendas-Produtos](./public/tablesalesproducts.png)


---

## Testes

Foi utilizado o [Jest]() e o [Frisby] para fazer os testes de api.

Na seção [Conexão com o Banco](#conexão-com-o-banco), está especificado como a conexão deve ser feita, para que os testes rodem.

Este projeto já vem configurado e com suas dependências.

Para poder executar os testes basta executar comando `npm run test:mocha` e o resultado será igual o abaixo:

![Testes](./public/testejestfrisby.png)

**Atenção:** Após rodar os testes, seu banco de dados local será dropado, lembre-se de importá-lo novamente.

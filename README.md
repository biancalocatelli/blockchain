## Blockchain para Sistemas Ciber-físicos

**Autora:** Bianca de Lima Pinto <br>
**Orientador:** Prof. Dr. Vilmar Abreu Junior <br>
**Data:** 01/08/2019

### Conectar com a blockchain:
1. Dentro das configurações do Ganache, inserir o mnemônico criado na conta do Metamask, para este se conectar à blockchain.

### Executar o projeto:
1. Limpar o conteúdo da pasta **build/contracts** para não dar conflito na hora de migrar os contratos.
2. <code>truffle compile</code>
3. <code>truffle migrate</code> 
4. Pronto.

### Executar os testes (via console):
Os testes estão armazenados em **test/**.
1. <code>truffle test</code>

### Executar a dapp (via UI):
1. <code>npm run dev</code>
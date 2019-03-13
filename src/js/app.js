App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    // Load cars.
    $.getJSON('../cars.json', function(data) {
      var carrosRow = $('#carrosRow');
      var carroTemplate = $('#carroTemplate');

      for (i = 0; i < data.length; i ++) {
          carroTemplate.find('.panel-title').text(data[i].name);
          carroTemplate.find('img').attr('src', data[i].picture);
          carroTemplate.find('.carro-preco').text(data[i].price);
          carroTemplate.find('.carro-local').text(data[i].location);
          carroTemplate.find('.btn-comprar').attr('data-id', data[i].id);

          carrosRow.append(carroTemplate.html());
      }
    });

    return App.initWeb3();
  },

  // O Web3 interage com o a blockchain Ethereum, recuperando contas, enviando transações, interagindo com smart contracts, etc.
  initWeb3: async function () {
      // Configurações para utilizar o MetaMask (carteira no browser)
      if (window.ethereum) {
          App.web3Provider = window.ethereum;
          try {
              // Recupera o acesso à conta da blockchain
              await window.ethereum.enable();
          } catch (error) {
              // Acesso negado à conta
              console.error("Acesso negado às contas da blockchain!")
          }
      }
      // Validação para navegadores antigos
      else if (window.web3) {
          App.web3Provider = window.web3.currentProvider;
      }
      // Se nenhuma instância web3 injetada for detectada, retorna ao Ganache
      else {
          App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
      }
      web3 = new Web3(App.web3Provider);

      return App.initContract();
  },

  initContract: function() {
      $.getJSON('Compra.json', function(data) {
          // Get the necessary contract artifact file and instantiate it with truffle-contract
          var CompraArtifact = data;
          App.contracts.Compra = TruffleContract(CompraArtifact);

          // Set the provider for our contract
          App.contracts.Compra.setProvider(App.web3Provider);

          // Use our contract to retrieve and mark the adopted pets
          return App.marcarComprado();
      });

      return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-comprar', App.handleCompra);
  },

  marcarComprado: function(compradores, conta) {
        var compraInstance;

        App.contracts.Compra.deployed().then(function(instance) {
          compraInstance = instance;

          return compraInstance.getCompradores.call();

      }).then(function(compradores) {
          for (i = 0; i < compradores.length; i++) {
              if (compradores[i] !== '0x0000000000000000000000000000000000000000') {
                  $('.panel-pet').eq(i).find('button').text('Success').attr('disabled', true);
              }
          }
      }).catch(function(err) {
          console.log(err.message);
      });
  },

  handleCompra: function(event) {
    event.preventDefault();

    var carroId = parseInt($(event.target).data('id'));

    var compraInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
          console.log(error);
      }

      var account = accounts[0];

      App.contracts.Compra.deployed().then(function(instance) {
          compraInstance = instance;

          // Execute adopt as a transaction by sending account
          return compraInstance.comprar(carroId, {from: account});

      }).then(function(result) {
          return App.marcarComprado();

      }).catch(function(err) {
          console.log(err.message);
      });
    });
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});

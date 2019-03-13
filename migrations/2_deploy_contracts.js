// Arquivo responsável por fazer a migração dos contratos para a blockchain descritos em "deploy".
var Compra = artifacts.require("Compra");

module.exports = function(deployer) {
    deployer.deploy(Compra);
};

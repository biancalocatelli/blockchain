pragma solidity ^0.4.0;

import "truffle/Assert.sol"; // Validações de teste: passa/reprova
import "truffle/DeployedAddresses.sol"; // Irá gerar uma nova instância do contrato a ser testado (Compra)
import "../contracts/Compra.sol";

contract TesteCompra {
    // O endereço do contrato a ser testado (no caso Compra)
    Compra compra = Compra(DeployedAddresses.Compra());

    // Id que será utilizado para teste
    uint carroIdEsperado = 8;

    // Recupera o endereço do nó que fez a requisição através do this
    address compradorEsperado = this;

    // Teste da função "comprar" do contrato Compra
    function testeComprar() public {
        uint idRetornado = compra.comprar(carroIdEsperado);

        // Validação do teste
        Assert.equal(idRetornado, carroIdEsperado, ">> FALHA: A pessoa que efetuou a compra não é a esperada!");
    }

    // Teste que recupera o id do comprador de um carro
    function testeGetCompradorByCarroId() public {
        address comprador = compra.compradores(carroIdEsperado);

        Assert.equal(comprador, compradorEsperado, "Proprietário do carro esperado deve ser este contrato!");
    }

    // Testa que recupera todos os proprietários dos carros
    function testeGetCompradorByCarroIdInArray() public {
        // Armazena em memória os compradores, ou seja, temporariamente
        address[16] memory compradores = compra.getCompradores();

        Assert.equal(compradores[carroIdEsperado], compradorEsperado, "Proprietário do carro esperado deve ser este contrato!");
    }
}
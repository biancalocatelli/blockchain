// pragma = additional information that only the compiler cares about, while the caret symbol (^) means "the version indicated or higher".
pragma solidity ^0.4.0;

contract Compra {
    // Irá guardar os endereço únicos de cada conta dentro da blockchain Ethereum.
    address[16] public compradores;
    //event LogAuditoria();

    function comprar(uint carroId) public returns (uint) {
        // require = garante que o id passado esteja entre o range especificado
        require(carroId >= 0 && carroId < 16);

        // msg.sender = recupera o endereço do comprador que fez a requisição
        compradores[carroId] = msg.sender;

        return carroId;
    }

    // Recupera os compradores no modo somente leitura, para não ser modificado (view)
    function getCompradores() public view returns (address[16]) {
        return compradores;
    }
}

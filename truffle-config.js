const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },
   // Para desplegar en Alastria quitar los comentarios y actualizar phrase con los mnemonics del ganache.
   // Si se usa Alastria tambien hay que modificar cuenta admin tras importar desde ganache.
  //  networkt: {
   //   provider: new HDWalletProvider({
   //     mnemonic: {
   //       phrase: "logic spawn admit decide camera toy funny crunch until main girl random"
   //     },
   //     providerOrUrl: "http://84.88.85.41:80/rpc"
   //   }),
    //  network_id: 83584648538,
   //  type: "quorum",
   //   gasPrice: 0,
  //    gas: 0xfffffff
 //   }
  },
  //compilers: {
  //  solc: {
   //  settings: {
   //     evmVersion: "byzantium"
   //   }
//   }
 // }
};

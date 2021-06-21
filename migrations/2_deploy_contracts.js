var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var FilesStorage = artifacts.require("./FilesStorage.sol");

module.exports = function(deployer) {
  //deployer.deploy(SimpleStorage);
  deployer.deploy(FilesStorage);
};

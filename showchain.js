var fs = require('fs');
var Tx = require('ethereumjs-tx');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://118.190.71.27:8444/"));

try {
  // web3.personal.newAccount("wanglu");
  // console.log(web3.admin);
  // console.log(JSON.stringify(web3.admin.nodeInfo));
  console.log(web3.eth.accounts);
  const accounts = web3.eth.accounts;

  for (let i = 0; i<accounts.length; i++) {
    console.log(web3.fromWei(web3.eth.getBalance(accounts[i])).toNumber());
    console.log(web3.personal.unlockAccount(accounts[0],"wanglu","0x4000"));
  }

  // try {
  //   console.log(web3.personal.unlockAccount(accounts[0],"wanglu","0x4000"));
  // } catch (e) {
  //   console.log(e);
  // }
  // console.log(web3.personal.unlockAccount(accounts[0],"wanglu",36000));
  // const txhash = web3.eth.sendTransaction({from:accounts[0],to:"0x3878F26Ea074Fc28D0086b434CfAf1637430e4f1", value:web3.toWei(1)});
  // console.log(txhash);
  // console.log(web3.eth.getBalance("0x3878F26Ea074Fc28D0086b434CfAf1637430e4f1").toNumber());
  setInterval(function () {
    console.log(web3.eth.blockNumber);
  }, 10000);

} catch (e) {
  console.log(e);
}
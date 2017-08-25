var fs = require('fs');
var Tx = require('ethereumjs-tx');
const Web3 = require('web3');
// const web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.0.34:8545/"));      // rinkeby
// const icoAddr = "0x4c7186ca231d14a530448722a25de03ec56fe12f";
// const password = "iloveethereum";
// const from = "0xad854341e7989F5542189bB52265337E2993B7bc";
// const fromKey = "63ea807a3ff1d3d7439101612839d572e597767fe0970f468f924bfce46392a4";
// const net = "rinkeby"

// const web3 = new Web3(new Web3.providers.HttpProvider("http://114.215.69.125:8545/"));  // ropsten
// const icoAddr = "0x7ba367de3f2d4a7f2a09df6be6d453417d37bc51";
// const password = "wanglu";
// const from = "0xad854341e7989F5542189bB52265337E2993B7bc";
// const fromKey = "63ea807a3ff1d3d7439101612839d572e597767fe0970f468f924bfce46392a4";
// const net = "ropsten"

const web3 = new Web3(new Web3.providers.HttpProvider("http://118.190.71.27:8444/"));   // kovan
const icoAddr = "0x351746685ea22ef199da5b6d923e60ba767d0e59";
const password = "wanglu";
const from = "0xad854341e7989F5542189bB52265337E2993B7bc";
const fromKey = "63ea807a3ff1d3d7439101612839d572e597767fe0970f468f924bfce46392a4";
const net = "kovan"

// const web3 = new Web3(new Web3.providers.HttpProvider("http://118.190.71.27:8545/"));      // rinkeby
// const icoAddr = "0x4c7186ca231d14a530448722a25de03ec56fe12f";
// const password = "wanglu";
// const from = "0xad854341e7989F5542189bB52265337E2993B7bc";
// const fromKey = "63ea807a3ff1d3d7439101612839d572e597767fe0970f468f924bfce46392a4";
// const net = "rinkeby";

var browser_testcoin_delphyicoContract = web3.eth.contract([{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"lockedBalances","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"PUBLIC_SECOND_TOKENS","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"DEV_TEAM_HOLDER","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"FOUNDATION_HOLDER","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"PUBLIC_FIRST_TOKENS","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"MAX_OPEN_SOLD","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"endTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"TOTAL_TOKENS_PERCENT","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"PUBLIC_SECOND_PRESOLD_TOKENS","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"wallet","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"halt","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"receiver","type":"address"}],"name":"buyDelphyToken","outputs":[{"name":"","type":"bool"}],"payable":true,"type":"function"},{"constant":true,"inputs":[],"name":"PUBLIC_FIRST_HOLDER","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"unHalt","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"startTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"PUBLIC_SECOND_PRESOLD_HOLDER","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"DEV_TEAM_TOKENS","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"PRE_ICO_TOKENS","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"changeOwner","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"openSoldTokens","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"BONUS_TOKENS","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"PRE_ICO_HOLDER","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"halted","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"finishICO","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"BONUS_HOLDER","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"ICO_DURATION","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"receiver","type":"address"}],"name":"claimTokens","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"FOUNDATION_TOKENS","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"delphyToken","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"_wallet","type":"address"},{"name":"_startTime","type":"uint256"}],"payable":false,"type":"constructor"},{"payable":true,"type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"destAddress","type":"address"},{"indexed":false,"name":"ethCost","type":"uint256"},{"indexed":false,"name":"gotTokens","type":"uint256"}],"name":"NewSale","type":"event"}]);
var ico = browser_testcoin_delphyicoContract.at(icoAddr)
var tokenAddr = ico.delphyToken();
var browser_testcoin_delphytokenContract = web3.eth.contract([{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"TOTAL_TOKENS","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[{"name":"owners","type":"address[]"},{"name":"tokens","type":"uint256[]"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"}]);
var token = browser_testcoin_delphytokenContract.at(tokenAddr)

console.log(net);
console.log(icoAddr);
console.log(tokenAddr);

try {
  // web3.personal.newAccount("wanglu");
  // console.log(web3.admin);
  // console.log(JSON.stringify(web3.admin.nodeInfo));
  console.log(web3.eth.accounts);
  const accounts = web3.eth.accounts;

  for (let i = 0; i<accounts.length; i++) {
    console.log(web3.fromWei(web3.eth.getBalance(accounts[i])).toNumber());
    console.log(web3.personal.unlockAccount(accounts[i],"wanglu","0x4000"));
  }

  const toMyEtherWallet = "0xDe14a99B0F1d9b3316ab02D02E69832D228c394e";
  const toParity = "0x0082964744DF2Be95475F5d80aB031a74208fBc0";
  const toImtoken = "0xc61ed74017D66eceb5eeE1f20A012e4774Cd79f0";

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
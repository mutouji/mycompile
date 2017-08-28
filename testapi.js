var fs = require('fs');
const EthereumTx = require('ethereumjs-tx')
const Web3 = require('web3');
// const lightwallet = require('eth-lightwallet');
// lightwallet.init(null,"wanglu")

// const web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.0.34:8545/"));      // local
// const icoAddr = "0x4c7186ca231d14a530448722a25de03ec56fe12f";
// const password = "iloveethereum";
// const from = "0xad854341e7989F5542189bB52265337E2993B7bc";
// const fromKey = "63ea807a3ff1d3d7439101612839d572e597767fe0970f468f924bfce46392a4";
// const net = "rinkeby"
//

// const web3 = new Web3(new Web3.providers.HttpProvider("http://114.215.69.125:8545/"));  // ropsten
// const icoAddr = "0x7452bcd07fc6bb75653de9d9459bd442ac3f5c52";
// const password = "wanglu";
// const from = "0xad854341e7989F5542189bB52265337E2993B7bc";
// const fromKey = "63ea807a3ff1d3d7439101612839d572e597767fe0970f468f924bfce46392a4";
// const net = "ropsten"
// const chainId = 3

const web3 = new Web3(new Web3.providers.HttpProvider("http://118.190.71.27:8444/"));   // kovan
const icoAddr = "0x436a07de44d181bde657c7949fdd3f50d79afeab";
const password = "wanglu";
const from = "0xfe2b768a23948eddd7d7caea55baa31e39045382";
const fromKey = "24ad2311e63272b160fa91171d240bf02863b3fc54467312fbf44e2dcbb6643e";
const net = "kovan"
const chainId = 42

// lightwallet.keystore.deriveKeyFromPassword(password, function(err, pwDerivedKey) {
//   var accountObject = lightwallet._decryptString(decryptstr, pwDerivedKey);
//   console.log(accountObject);
// });

// const web3 = new Web3(new Web3.providers.HttpProvider("http://118.190.71.27:8545/"));      // rinkeby
// const icoAddr = "0xd966b5c92ecc1127abed8c45b09d951ebbe9a488";
// const password = "wanglu";
// const from = "0xFE2b768a23948EDDD7D7Caea55bAa31E39045382";
// const fromKey = "24ad2311e63272b160fa91171d240bf02863b3fc54467312fbf44e2dcbb6643e";
// const net = "rinkeby";
// const chainId = 4;

const from1 = "0xad854341e7989F5542189bB52265337E2993B7bc";
const fromKey1 = "63ea807a3ff1d3d7439101612839d572e597767fe0970f468f924bfce46392a4";

var browser_testcoin_delphyicoContract = web3.eth.contract([{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"lockedBalances","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"PUBLIC_SECOND_TOKENS","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"DEV_TEAM_HOLDER","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"FOUNDATION_HOLDER","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"PUBLIC_FIRST_TOKENS","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"MAX_OPEN_SOLD","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"endTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"TOTAL_TOKENS_PERCENT","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"PUBLIC_SECOND_PRESOLD_TOKENS","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"wallet","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"halt","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"receiver","type":"address"}],"name":"buyDelphyToken","outputs":[{"name":"","type":"bool"}],"payable":true,"type":"function"},{"constant":true,"inputs":[],"name":"PUBLIC_FIRST_HOLDER","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"unHalt","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"startTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"PUBLIC_SECOND_PRESOLD_HOLDER","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"DEV_TEAM_TOKENS","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"PRE_ICO_TOKENS","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"changeOwner","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"openSoldTokens","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"BONUS_TOKENS","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"PRE_ICO_HOLDER","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"halted","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"finishICO","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"BONUS_HOLDER","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"ICO_DURATION","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"receiver","type":"address"}],"name":"claimTokens","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"FOUNDATION_TOKENS","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"delphyToken","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"_wallet","type":"address"},{"name":"_startTime","type":"uint256"}],"payable":false,"type":"constructor"},{"payable":true,"type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"destAddress","type":"address"},{"indexed":false,"name":"ethCost","type":"uint256"},{"indexed":false,"name":"gotTokens","type":"uint256"}],"name":"NewSale","type":"event"}]);
var ico = browser_testcoin_delphyicoContract.at(icoAddr)
var tokenAddr = ico.delphyToken();
var browser_testcoin_delphytokenContract = web3.eth.contract([{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"TOTAL_TOKENS","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[{"name":"owners","type":"address[]"},{"name":"tokens","type":"uint256[]"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"}]);
var token = browser_testcoin_delphytokenContract.at(tokenAddr)

// var tokenAbi = fs.readFileSync('output/DelphyToken.abi', 'utf8');
// var tokenContract = web3.eth.contract(JSON.parse(tokenAbi)).at(tokenAddr);
var tokenContract = token;

console.log(net);
console.log(icoAddr);
console.log(tokenAddr);
console.log(net);

var Const = {
  // "gasPrice": "0x8A817C800",// 这个可修改
  // "gasLimit": "0x40000",
  "gasPrice": "0x4A817C800",// 这个可修改
  "gasLimit": "0x27100",
}

function drop0x(str) {
  if (str.indexOf("0x") === 0) {
    return str.substring(2);
  }
  return str;
}


function tryGetTransactionReceipt(hash, successCB, failedCB, tryTimesStart=10, timestep=5000) {
  var tryTimes = tryTimesStart;
  var timer = setInterval(function () {
    var receipt = web3.eth.getTransactionReceipt(hash);
    if (!receipt) {
      tryTimes--;
      if (tryTimes < 0) {
        clearInterval(timer);
        // console.log("error: out of try times: tx = " + hash)
        failedCB("out of try times: tx = " + hash);
      }
    } else {
      clearInterval(timer);

      console.log(receipt);
      if(receipt['gasUsed'] == 0x400000) {
        failedCB("out of gas");
      } else {
        successCB(receipt);
      }
    }
  }, timestep);
}

function buildSignedTransaction(priv, nonce, data, contractAddr) {
  console.log("sign: nonce="+nonce+" data="+data+" caddr="+contractAddr);
  var rawTx = {
    nonce: "0x" + nonce.toString(16),
    gasPrice: Const.gasPrice,
    gasLimit: Const.gasLimit,
    to: contractAddr,
    value: "0x00",
    data: data,
    chainId: chainId
  };
  var tx = new EthereumTx(rawTx);
  tx.sign(priv);

  var rs = "0x" + tx.serialize().toString('hex');
  return rs;
}

function buildEtherTransaction(priv, to, nonce) {
  console.log("sign: nonce=" + nonce);
  var rawTx = {
    nonce: nonce.toString(16),
    gasPrice: Const.gasPrice,
    gasLimit: Const.gasLimit,
    to: to,
    value: "0x00",
    data: "0x00",
    chainId: chainId
  };
  var tx = new EthereumTx(rawTx);
  tx.sign(priv);

  var rs = "0x" + tx.serialize().toString('hex');
  return rs;
}

var transfer = function (priv, contractAddr, nonce, tx, callback) {
  console.log("begin: transfer" + JSON.stringify(tx));
  console.log(priv);
  console.log(tx.value.toString(16));
  var privateKey = Buffer.from(priv, 'hex');
  var data = tokenContract.transfer.getData(tx.to, tx.value);
  console.log("data=" + data);
  var serializedTx = buildSignedTransaction(privateKey, nonce, data, tokenAddr);

  web3.eth.sendRawTransaction(serializedTx, function (err, hash) {
    if (!err) {
      console.log(hash);
      var successCB = function (receipt) {

        // console.log("transfer hash success tst:" + JSON.stringify(tst)); // tst?
        // var topicsTransacts = '0x' + ethUtil.sha3('EventQXTransact(bytes32)', 256).toString('hex');
        // var topicsErrors = '0x' + ethUtil.sha3('EventError(bytes32)', 256).toString('hex');
        for (var i=0; i<receipt.logs.length; i++) {
          // var log = receipt.logs[i];
          // if (topicsTransacts === log.topics[0]) {
          //   var rt = log.data.substring(0,66);
          //   console.log(" exec sucess return  txID = " + rt);
          //   callback(null, receipt);
          //   return;
          // } else if (topicsErrors === log.topics[0]) { // error
          //   var err = log.data;
          //   var errU = web3.toUtf8(err);
          //   console.log(errU);
          // }
          callback(null, receipt);
          return;
        }
        callback("contract error: transfer ");
      };
      var failedCB = function (error) {
        callback("error: transfer " + " err=" + error);
      };
      tryGetTransactionReceipt(hash, successCB, failedCB, 100, 5000);
    } else {
      console.log("error: transfer " + err);
    }
  });
}

var sendEther = function (priv, to, nonce) {
  console.log(priv);
  var privateKey = Buffer.from(priv, 'hex');
  var serializedTx = buildEtherTransaction(privateKey, to, nonce);
  web3.eth.sendRawTransaction(serializedTx, function (err, hash) {
    if (!err) {
      console.log(hash);
      var successCB = function (receipt) {
        callback(null, receipt);
      };
      var failedCB = function (error) {
        callback("error: transfer " + " err=" + error);
      };
      tryGetTransactionReceipt(hash, successCB, failedCB, 100, 5000);
    } else {
      console.log("error: transfer " + err);
    }
  });
}

// var fromAddr = "0x32d192A05030F3Cf34DDb017b1306fB0E1378E1E";
// var fromPrivkey = "08440f0bc565681f834f65a9c6ad4b1381f01a3785b2386622291d54f8678d9e";
// var toAddr = "0x9c2f100e32c0bf0a1c0b6214007cb8c3c3a72c25"
// var fromNonce = web3.eth.getTransactionCount(fromAddr);

const toMyEtherWallet = "0xDe14a99B0F1d9b3316ab02D02E69832D228c394e";
const toParity = "0x0082964744DF2Be95475F5d80aB031a74208fBc0";
const toImtoken = "0xc61ed74017D66eceb5eeE1f20A012e4774Cd79f0";
const toMetaMask = "0x3878F26Ea074Fc28D0086b434CfAf1637430e4f1";
const toParity1 = "0x008B0abE5Ab68281D3465166e24d116012b190C5";

var testTx = {from:from, to:toMyEtherWallet,value:web3.toWei(5000)};
var testTx1 = {from:from, to:toParity,value:web3.toWei(5000)};
var testTx2 = {from:from, to:toImtoken,value:web3.toWei(5000)};
var testTx3 = {from:from, to:toMetaMask,value:web3.toWei(500000)};
var testTx4 = {from:from, to:toParity1,value:web3.toWei(500000)};

var cb = function (err, receipt) {
  if (!err) {
    console.log("transfer success: " + JSON.stringify(receipt));
  } else {
    console.log("error: transfer " + err);
  }
}

var fromNonce = web3.eth.getTransactionCount(from);
// transfer(fromKey, tokenAddr, fromNonce, testTx, cb);
// transfer(fromKey, tokenAddr, fromNonce, testTx4, cb);
// transfer(fromKey, tokenAddr, fromNonce, testTx2, cb);

// sendEther(fromKey1, from, fromNonce);

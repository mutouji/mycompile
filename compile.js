const path = require('path');
const Web3 = require('web3');
// const web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.0.34:6545/"));
const web3 = new Web3(new Web3.providers.HttpProvider("http://118.190.71.27:8444/"));
const fs = require('fs');
const solc = require('solc');
// const SolidityCoder = require('web3/lib/solidity/coder');
const outpath = "output/";
function compile(solfile) {
  var prefix = ":";
  var sf = path.parse(solfile);
  var input = fs.readFileSync(solfile+'.sol', 'utf8');
  var output = solc.compile(input, 0);
  console.log(solfile);
  console.log(output);
  var propertys = Object.keys(output.contracts);
  for (var i = 0; i<propertys.length; i++) {
    var contract = output.contracts[propertys[i]];

    var bytecode = contract.bytecode;
    var abi = contract.interface;
    var fhs = contract.functionHashes;
    var name = propertys[i].indexOf(prefix) === 0 ? propertys[i].substring(1) : propertys[i];
    var fullpath = outpath + name;
    fs.writeFileSync(fullpath + '.bc', bytecode);
    fs.writeFileSync(fullpath + '.abi', abi);
    fs.writeFileSync(fullpath + '.fhs', JSON.stringify(fhs));
  }
}

compile("delphy")

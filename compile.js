const C = {
  kovan: {
    rpc : "http://118.190.71.27:8444/",
    network_id: "42",
    gas: 5000000,
    gasPrice: 20e9,
    from: "0xbef407b3752f6dde4dee2f53b3c8b774fb29af09",
  },
  local: {
    rpc : "http://192.168.0.34:6545/",
    network_id: "*",
    gas: 4000000,
    gasPrice: 20e9,
    from: "0x5dfe021f45f00ae83b0aa963be44a1310a782fcc",
  },
  ropsten: {
    host: "114.215.69.125",
    port: 8545,
    network_id: 3,
    gas: 4000000,
    gasPrice: 20e9,
    from: "0x2d0e7c0813a51d3bd1d08246af2a8a7a57d8922e",
  },
  rinkeby: {
    host: "118.190.71.27",
    port: 8545,
    network_id: 4,
    gas: 4000000,
    gasPrice: 20e9,
    from: "0x2d0e7c0813a51d3bd1d08246af2a8a7a57d8922e",
  },
  OUTPUT: "output/"
}
const kovanNode = C.kovan;
const localNode = C.local;
const ropstenNode = C.ropsten;
const rinkebyNode = C.rinkeby;

const util = require('./util');
const path = require('path');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider(localNode.rpc));
const fs = require('fs');
const solc = require('solc');
const outpath = C.OUTPUT;
function compile(solfile) {
  var prefix = ":";
  var sf = path.parse(solfile);
  var input = fs.readFileSync(solfile + '.sol', 'utf8');
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

// compile("delphy");

function appendSol(name) {
  if (!name.endsWith(".sol")) {
    return name + ".sol";
  }
  return name;
}

function isLibrary(str) {
  const libPattern = /(^|\s)library\s/;
  const n = str.search(libPattern);
  if (n >= 0) {
    return true;
  }
  return false;
}

function findImports(str) {
  const importPattern = /\bimport\s+"\S+"/g;
  // const imports = importPattern.exec(str);
  const imports = str.match(importPattern);
  let files = [];
  for (let i = 0; i<imports.length; i++) {
    const im = imports[i];
    console.log(im);
    const pos1 = im.indexOf('"');
    const pos2 = im.indexOf('"', pos1 + 1);
    files.push(im.substr(pos1+1, pos2-pos1-1));
    console.log(files[files.length-1]);
  }
  return files;
}

let gLib = {};
let gContract = {};
function parse(str, dir) {
  const files = findImports(str);
  // load every imports
  const libs = files.find(function (file) {
    const fullname = path.join(dir, file);
    const str = fs.readFileSync(fullname, 'utf8');
    return isLibrary(str);
  });

  // deploy it
  libs.map(function (lib) {
    deploy(lib);
  });

  return libs;
}

function deploy(str, dir) {
  const fullname = path.join(dir, str);
  if (!gLib.hasOwnProperty(fullname)) {
    gLib.hasOwnProperty();
  }
}
const fullname1 = path.join("", "a.sol");
const fullname2 = path.join("./", "a.sol");
const b = 1;
const b2 = 2;

function superComplie(solfile) {
  const name = appendSol(solfile);
  const str = fs.readFileSync(name, 'utf8');
  var sf = path.parse(name);
  gLib = [];
  parse(str, sf.dir);
}

// superComplie("contracts/DelphyICO");

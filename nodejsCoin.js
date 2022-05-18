const SHA256 = require("crypto-js/sha256");

// This block represents every block in the chain
class Block {
  constructor(index, timestamp, data, previousHash) {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.generateHash();
  }

  generateHash() {
    return SHA256(
      this.index +
        this.timestamp +
        this.previousHash +
        JSON.stringify(this.data)
    ).toString();
  }
}

class Blockchain {
  constructor() {
    this.blockchain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(
      0,
      "18/05/2022",
      "Hi mom!! This is the first given data to my blockchain",
      "0"
    );
  }

  getTheLatestBlock() {
    return this.blockchain[this.blockchain.length - 1];
  }

  addNewBlock(newBlock) {
    newBlock.previousHash = this.getTheLatestBlock();
    newBlock.hash = newBlock.generateHash();
    this.blockchain.push(newBlock);
  }

  // testing the integrity of the chain
  validateChainIntegrity() {
    for (let i = 1; i < this.blockhain.length; i++) {
      const currentBlock = this.blockchain[i];
      const previousBlock = this.blockchain[i - 1];

      if (currentBlock.hash !== currentBlock.generateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.generateHash()) {
        return false;
      }
      return true;
    }
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

let logCoin = new Blockchain();
console.log("mininng logcoin in progress...");

logCoin.addNewBlock(
  new Block(1, "18/05/2022", {
    sender: "Mehmet Semih Babacan",
    recipient: "Mom",
    quantity: 250,
  })
);

logCoin.addNewBlock(
  new Block(2, "18/05/2022", {
    sender: "Huzeyfe",
    recipient: "Semih",
    quantity: 340,
  })
);

for (let i = 3; i < 5; i++) {
  var _sender = "Huzeyfe".split();
  shuffleArray(_sender);
  _sender = _sender.join("");

  var _recipient = "Semih".split();
  shuffleArray(_recipient);
  _recipient = _recipient.join("");

  logCoin.addNewBlock(
    new Block(i, "18/05/2022", {
      sender: _sender,
      recipient: _recipient,
      quantity: Math.floor(Math.random() * (i + 1)),
    })
  );
}

const VALUE = logCoin;
const REPLACER = null;
const SPACE = 5;

console.log(JSON.stringify(VALUE, REPLACER, SPACE));

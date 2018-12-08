const SHA256 = require('crypto-js/sha256');


class Block{

    constructor(index, timestamp, data, priviousHash=''){
       this.index= index;
       this.timestamp= timestamp;
       this.data = data;
       this.priviousHash= priviousHash;
       this.hash = this.calculateHash();
    }

    calculateHash(){
        return SHA256(this.index + this.priviousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}
class Blockchain{

    constructor(){
        this.chain = [];
    }

    createGenesisBlock(){

        return new Block(0, "01/01/2017", "Genesis block", "0");
    }
    getLastBlock(){
        return this.chain[this.chain.length -1];
    }
    addBlock(  newBlock ){

        newBlock.previousHash = this.getLastBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);

    }
}

let testBlockchain = new Blockchain();
testBlockchain.addBlock(new Block(1, "10/10/2017", {amount: 4}));
testBlockchain.addBlock(new Block(2, "03/03/2018", {amount: 4}));

console.log(JSON.stringify(testBlockchain, null , 4));




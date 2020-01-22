const dsteem = require('dsteem')

require('dotenv').config();

var s_username_0 = process.env.STEEM_USERNAME_0;
var s_active_key_0 = process.env.STEEM_AK_0;

var s_username_1 = process.env.STEEM_USERNAME_1;
var s_active_key_1 = process.env.STEEM_AK_1;

var s_username_2 = process.env.STEEM_USERNAME_2;
var s_active_key_2 = process.env.STEEM_AK_2;

//define network parameters
let opts = {};
opts.addressPrefix = 'TST';
opts.chainId = '1349fef0c572501d02b3c58a4ff478ae33e69f857d1303e838763651374111ad';
//connect to a steem node, testnet in this case
const client = new dsteem.Client('https://testnet.steemitdev.com', opts);




/*

[
  "smt_create",
  {
    "control_account": "alice",
    "symbol": {"nai": "@@000000000", "decimals": 0},
    "smt_creation_fee": {
      "amount": "3000",
      "precision": 3,
      "nai": "@@000000013"
    },
    "precision": 0,
    "extensions": []
  }
]

*/

//create convert operation
const op = [
    'smt_create',
    { control_account: s_username_0, 
      symbol: {"nai": "@@000000000", "decimals": 3}, 
      smt_creation_fee: {
        "amount": "3000",
        "precision": 3,
        "nai": "@@000000013"
      }, 
      "precision": 0,
      "extensions": []
    },
];

//broadcast the conversion
client.broadcast.sendOperations([op], s_active_key_0).then(
    function(result) {
        console.log(
            'included in block: ' + result.block_num,
            'expired: ' + result.expired
        );

    },
    function(error) {
        console.error(error);

    }
);

/*


const transfer = "10000.000 TESTS"
const comments = "test transfer"

//create transfer object
const transf = new Object();
transf.from = "cervantes";
transf.to = "domenico";
transf.amount = transfer;
transf.memo = comments;

const key = dsteem.PrivateKey.from(s_active_key_0)

client.broadcast.transfer(transf, key).then(
    function(result) {
        console.log(
            'included in block: ' + result.block_num,
            'expired: ' + result.expired
        );
    },
    function(error) {
        console.error(error);
    }
);



*/

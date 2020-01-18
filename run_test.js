const dsteem = require('dsteem')

require('dotenv').config();

var s_username_0 = process.env.STEEM_USERNAME_0;
var s_active_key_0 = process.env.STEEM_AK_0;

var s_username = process.env.STEEM_USERNAME_1;
var s_active_key = process.env.STEEM_AK_1;

//define network parameters
let opts = {};
opts.addressPrefix = 'TST';
opts.chainId = '1349fef0c572501d02b3c58a4ff478ae33e69f857d1303e838763651374111ad';
//connect to a steem node, testnet in this case
const client = new dsteem.Client('https://testnet.steemitdev.com', opts);

const transfer = "300.000 TST"
const comments = "test transfer"

//create transfer object
const transf = new Object();
transf.from = "cervantes";
transf.to = "domenico";
transf.amount = transfer;
transf.memo = comments;

client.broadcast.transfer(transf, s_active_key_0).then(
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

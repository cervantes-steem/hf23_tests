
console.log("Seting up tests..");
var steem = require('steem');
require('dotenv').config();

steem.api.setOptions({url: 'https://testnet.steemitdev.com/', useAppbaseApi :  true, address_prefix : 'TST', 'chain_id' : "abc93c9021bbd9a8dd21c438ee3c480a661ca1966b5e4e838326dcf42a3dac2d"});
steem.config.set('address_prefix', 'TST')
steem.config.set('chain_id', 'abc93c9021bbd9a8dd21c438ee3c480a661ca1966b5e4e838326dcf42a3dac2d');

const assert = require("assert");

var s_username = process.env.STEEM_USERNAME;
var s_active_key = process.env.STEEM_ACTIVE_KEY;
//const ACTIVE = steem.auth.toWif(username,password, 'active');

console.log("username: " + s_username)




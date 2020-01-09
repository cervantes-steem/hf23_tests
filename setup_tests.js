
console.log("Seting up tests..");
var steem = require('steem');
require('dotenv').config();

steem.api.setOptions({url: 'https://testnet.steemitdev.com', useAppbaseApi :  true, address_prefix : 'TST', 'chain_id' : "abc93c9021bbd9a8dd21c438ee3c480a661ca1966b5e4e838326dcf42a3dac2d"});
steem.config.set('address_prefix', 'TST')
steem.config.set('chain_id', 'abc93c9021bbd9a8dd21c438ee3c480a661ca1966b5e4e838326dcf42a3dac2d');

const assert = require("assert");

var s_username = process.env.STEEM_USERNAME;
var s_active_key = process.env.STEEM_ACTIVE_KEY;
//const ACTIVE = steem.auth.toWif(username,password, 'active');

console.log("username: " + s_username)


function broadcast(tx, wif)
{
    return new Promise(resolve => {
        steem.broadcast.send(tx, {wif}, async function (err, result) {
            if (err !== null) {
                console.error(err)
                return resolve(false)
            } else {
                return resolve(true)
            }
        });
    });
}

async function test() {


    let tx = {
        'operations': [[
            'transfer_to_vesting', {
                'from': s_username,
                'amount': {'amount':'1000','precision':3,'nai':'@@000000021'},
                'to': s_username,
            }]]
    };

        console.log(tx)
    
        console.log("Broadcasting tx...")
        let result = await broadcast(tx, s_active_key);
    
        assert(result.error);
    


}

test();




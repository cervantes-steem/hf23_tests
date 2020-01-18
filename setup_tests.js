
console.log("Seting up tests..");
var steem = require('steem');


require('dotenv').config();

steem.api.setOptions({url: 'https://testnet.steemitdev.com', useAppbaseApi :  true, address_prefix : 'TST', 'chain_id' : "abc93c9021bbd9a8dd21c438ee3c480a661ca1966b5e4e838326dcf42a3dac2d"});
//steem.api.setOptions({url: 'http://138.201.188.83:8751', useAppbaseApi :  true, address_prefix : 'TST', 'chain_id' : "abc93c9021bbd9a8dd21c438ee3c480a661ca1966b5e4e838326dcf42a3dac2d"});
steem.config.set('address_prefix', 'TST')
steem.config.set('chain_id', 'abc93c9021bbd9a8dd21c438ee3c480a661ca1966b5e4e838326dcf42a3dac2d');

const assert = require("assert");

var s_username_0 = process.env.STEEM_USERNAME_0;
var s_active_key_0 = process.env.STEEM_AK_0;

var s_username = process.env.STEEM_USERNAME_1;
var s_active_key = process.env.STEEM_AK_1;



//const ACTIVE = steem.auth.toWif(username,password, 'active');

console.log("username: " + s_username)
console.log("username: " + s_active_key)

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

/*


[
  "transfer",
  {
    "from": "steemit",
    "to": "alice",
    "amount": {
      "amount": "10",
      "precision": 3,
      "nai": "@@000000021"
    },
    "memo": "Thanks for all the fish."
  }
]

*/

async function test_transfer() {

    let tx = {
        'operations': [[
            'transfer', {
                'from': s_username_0,
                'to': s_username,
                'amount': {'amount': '100000000', 'precision': 6, 'nai': '@@000000013'},
                'memo' : "Testing transfer"
            }
            ]],
    };

    console.log("Broadcasting tx...")
    let result = await broadcast(tx, s_active_key);

    assert(result.error);

}


async function test_smt_create() {



        let nai_pool = await steem.api.callAsync('database_api.get_nai_pool', {});

        console.log(nai_pool);

        let nai = nai_pool.nai_pool[0];

        let tx2 = {
            'operations': [[
                'smt_create', {
                    'control_account': s_username,
                    'symbol': {'nai': nai.nai, 'precision': 6},
                    'smt_creation_fee': {'amount': '1000', 'precision': 3, 'nai': '@@000000013'},
                    'precision': 6,
                    'extensions': []
                }
                ]],
        };


        console.log("Broadcasting tx...")
        let result = await broadcast(tx2, s_active_key);
    
        assert(result.error);
    


}

//test_smt_create();
test_transfer();




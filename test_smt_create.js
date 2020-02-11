
var steem = require('steem');
require('dotenv').config();
steem.api.setOptions({url: 'https://testnet.steemitdev.com/', useAppbaseApi :  true, address_prefix : 'TST', 'chain_id' : "98b69bd7cbe4d27864e2f06d9f74ba50aed0b7f511436ef9c7b80f36f3ff5859"});
steem.config.set('address_prefix', 'TST')
steem.config.set('chain_id', '98b69bd7cbe4d27864e2f06d9f74ba50aed0b7f511436ef9c7b80f36f3ff5859');

const assert = require("assert");

var s_username_0 = process.env.STEEM_USERNAME_0;
var s_active_key_0 = process.env.STEEM_AK_0;
var s_posting_key_0 = process.env.STEEM_PK_0;

console.log(s_username_0);

var s_username_1 = process.env.STEEM_USERNAME_1;
var s_active_key_1 = process.env.STEEM_AK_1;

var s_username_2 = process.env.STEEM_USERNAME_2;
var s_active_key_2 = process.env.STEEM_AK_2;
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

function broadcast(tx, wif)
{
    return new Promise(resolve => {
        steem.broadcast.send(tx, {wif}, async function (err, result) {
            if (err) {
                return resolve({noError : false, err})
            } else {
                return resolve({noError : true , result})
            }
        });
    });
}


async function test_transfer_tests() {

steem.broadcast.transfer(s_active_key_0, s_username_0, s_username_1, "1000.000 TESTS", "test", function(err, result) {
    console.log(err, result);
});


}

async function test_transfer_test_back() {

  steem.broadcast.transfer(s_active_key_1, s_username_1, s_username_0, "1000.000 TESTS", "test", function(err, result) {
    console.log(err, result);
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
      "nai": "@@000000013"
    },
    "memo": "What"
  }
]

*/

async function test_transfer_op() {

  let tx = {

    'operations': [
      
      [
        "transfer",
        {
          "from": "cervantes",
          "to": "domenico",
          "amount": {
            "amount": "10.000",
            "precision": 6,
            "nai": "@@000000013"
          },
          "memo": "Test Transfer."
        }
      ]

    ] 

  };

  let j = JSON.stringify(tx);
  console.log(j);

  let result = await broadcast(tx, s_active_key_0);
  console.log(result);


}


/*

{
  "author": "Joe",
  "title": "A post by Joe",
  "body": "Look at my awesome post",
  "parent_author": "",
  "parent_permlink": "steem",
  "permlink": "a-post-by-joe",
  "json_metadata": "{\"tags\":[\"steemit\",\"example\#",\"tags\"]}"
}
*/

async function test_comment() {


  let tx = {

    'operations': [[
        'comment', {
          "author": "cervantes",
          "title": "A post by Joe",
          "body": "Look at my awesome post",
          "parent_author": "",
          "parent_permlink": "steem",
          "permlink": "a-post-by-joe",
          "json_metadata": "{\"tags\":[\"steemit\",\"example\",\"tags\"]}"
        }
      ]

    ] 

  };

  let j = JSON.stringify(tx);
  console.log(j);

  let result = await broadcast(tx, s_posting_key_0);
  console.log(result);

}


async function test_smt_set_setup_parameters(nai) {


  let tx = {

    'operations': [[
        'smt_set_setup_parameters', {
          'control_account': s_username_0,
          'symbol': {'nai': '@@979651727', 'decimals': 3},
          'setup_parameters': [{
              'type': 'smt_param_allow_voting',
              'value': {'value': true}
            }
          ],
          'extensions': []
        }
      ]

    ] 

  };

  //let nai_pool = await steem.api.callAsync('database_api.get_nai_pool', {});

  //let pool = nai_pool.nai_pool;
  let j = JSON.stringify(tx);
  console.log(j);

  let result = await broadcast(tx, s_active_key_0);
  console.log(result);


}

async function successful_smt_object_create(precision) {
  let nai_pool = await steem.api.callAsync('database_api.get_nai_pool', {});

  let nai = nai_pool.nai_pool[0];

  let tx = {
      'operations': [[
          'smt_create', {
              'control_account': s_username_0,
              'symbol': {'nai': nai.nai, 'precision': precision},
              'smt_creation_fee': {'amount': '1000.1', 'precision': 3, 'nai': '@@000000013'},
              'precision': precision,
              'extensions': []
          }
          ]],
  };

  let result = await broadcast(tx, s_active_key_0);
  console.log(result);

  // assert(result.noError);
}


async function bulk_smt_object_create() {

  username = "cervantes"
  let nai_pool = await steem.api.callAsync('database_api.get_nai_pool', {});

  let pool = nai_pool.nai_pool;

  let operations = [];
  let smts = []

  for (let i = 0; i < pool.length; i++) {

      // Random precision
      const precision = Math.floor(Math.random() * 12);
      smts.push({nai: pool[i].nai, precision: precision});
      operations.push([
          'smt_create', {
              'control_account': s_username_0,
              'symbol': {'nai': pool[i].nai, 'precision': precision},
              'smt_creation_fee': {'amount': '1000', 'precision': 3, 'nai': '@@000000013'},
              'precision': precision,
          }]
      )
  }

  let tx = {
      'operations': operations
  };

  await broadcast(tx, s_active_key_0);

}

//let new_smt_nai = '@@979651727';

//successful_smt_object_create(3);
//test_smt_set_setup_parameters();
//test_transfer_tests();
//test_transfer_test_back();
//test_comment();
bulk_smt_object_create();
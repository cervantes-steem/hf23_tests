
const moment =  require("moment");
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
var s_posting_key_1 = process.env.STEEM_PK_1;

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


.extensions.push([
                        1,
                        {
                            votable_assets: [
                                [
                                    TEST_NAI_ASSET,
                                    {
                                        max_accepted_payout: 10,
                                        allow_curation_rewards: true,
                                        beneficiaries: {},
                                    },
                                ],
                            ],
                        },
                    ]);

*/

async function test_comment_2() {


  const TEST_NAI_ASSET = { nai: '@@103004864', precision: 3 }



  let tx = {

    'operations': [

      [
        "comment_options",
        {
          "author": "domenico",
          "permlink": "test1",
          "max_accepted_payout": {
            "amount": '10000',
            "precision": 3,
            "nai": "@@000000013"
          },
          "percent_steem_dollars": 5000,
          "allow_votes": true,
          "allow_curation_rewards": true,
        }
      ]

    ] 

  };


  let j = JSON.stringify(tx);
  console.log(j);

  let result = await broadcast(tx, s_posting_key_1);
  console.log(result);

}

async function test_comment() {


  TEST_NAI_ASSET = "@@123456789"

  let tx = {

    'operations': [

      [
        'comment', {
          "author": "domenico",
          "title": "A post by Joe",
          "body": "Look at my awesome post",
          "parent_author": "",
          "parent_permlink": "steem",
          "permlink": "test1",
          "json_metadata": "{\"tags\":[\"steemit\",\"example\",\"tags\"]}"
        }
      ],
    
    ]
  };

  let j = JSON.stringify(tx);
  console.log(j);

  let result = await broadcast(tx, s_posting_key_1);
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


  operations = [];
  for (let i = 0; i < smts.length; i++) {

      // Generate random number of emissions
      let schedule_time = moment();

      let emission = Math.floor(Math.random() * 21659);

      // All the emissions will happen in the next 1 days
      const hours_to_add = Math.floor(Math.random() * 24);
      schedule_time.add('hours', hours_to_add);
      let schedule_time_str = schedule_time.format("YYYY-MM-DDTHH:mm:ss");

      schedule_time.add('hours',  Math.floor(Math.random() * 720))
      let rep_time_str = schedule_time.format("YYYY-MM-DDTHH:mm:ss")

      let token_units = [];

      while (token_units.length == 0) {
          if (Math.random() > 0.5)
              token_units.push(['$market_maker', Math.floor(Math.random() * 65534) + 1]);
          if (Math.random() > 0.5)
              token_units.push(['$rewards', Math.floor(Math.random() * 65534) + 1]);
          if (Math.random() > 0.5)
              token_units.push(['$vesting', Math.floor(Math.random() * 65534) + 1]);
          if (Math.random() > 0.5)
              token_units.push(['cervantes', Math.floor(Math.random() * 65534) + 1]);
          if (Math.random() > 0.5)
              token_units.push(['domenico', Math.floor(Math.random() * 65534) + 1]);
      }

      operations.push([
              'smt_setup_emissions', {
              'control_account': s_username_0,
              'symbol': {'nai': smts[i].nai, 'precision': smts[i].precision},
              'schedule_time': schedule_time_str,
              'emissions_unit': {
                  'token_unit': token_units
              },
              'interval_seconds': (emission < 21600 ? 21600 : emission),
              'emission_count': Math.floor(Math.random() * 21659),
              'lep_time': schedule_time_str,
              'lep_abs_amount': Math.floor(Math.random() *  4294967295),
              'lep_rel_amount_numerator': 1,
              'rep_time': rep_time_str,
              'rep_abs_amount': Math.floor(Math.random() * 4294967295),
              'rep_rel_amount_numerator': 0,
              'rel_amount_denom_bits': 0,
              'remove': false,
              'floor_emissions': Math.random() > 0.5,
              'extensions': []
              }]
      )
  }

  tx = {
      'operations': operations
  };

  let result = await broadcast(tx, s_active_key_0);
  if(!result.noError) {
    console.log(result);
  }


}


async function create_smt_full_setup() {

  let nai_pool = await steem.api.callAsync('database_api.get_nai_pool', {});
  const nai = nai_pool.nai_pool[0].nai;

  let tx = {
      'operations': [[
          'smt_create', {
              'control_account': s_username_0,
              'symbol': {'nai': nai, 'precision': 3},
              'smt_creation_fee': {'amount': '1000', 'precision': 3, 'nai': '@@000000013'},
              'precision': 3,
          }]]
  };

  console.log("Broadcasting smt_create op...")
  await broadcast(tx, s_active_key_0);


  let schedule_time = moment();

  // Make sure it launches in the next 10 seconds
  // I have a one hour offset compared to blockchain time, you might want to remove this
  schedule_time.subtract(59, 'minute');
  schedule_time.subtract(50, 'second');

  let schedule_time_str = schedule_time.format("YYYY-MM-DDTHH:mm:ss");

  tx = {
      'operations': [[
          'smt_setup_emissions', {
              'control_account': s_username_0,
              'symbol': {'nai': nai, 'precision': 3},
              'schedule_time': schedule_time_str,
              'emissions_unit': {
                  'token_unit': [
                      ['$market_maker', 1],
                      ['$rewards', 1],
                      ['$vesting', 1],
                      ['cervantes', 1],
                  ],
              },
              'interval_seconds': 21600,
              'emission_count':  10000,
              'lep_time' : '1970-01-01T00:00:00',
              'rep_time' : '1970-01-01T00:00:00',
              'lep_abs_amount' : 0,
              'rep_abs_amount': 0,
              'lep_rel_amount_numerator' : 1,
              'rep_rel_amount_numerator' : 0,
              'rel_amount_denom_bits' : 0,
              'remove' : false,
              'floor_emissions' : false,
          }]]
  };

  console.log("Broadcasting smt_setup_emissions op...")
  let result = await broadcast(tx, s_active_key_0);
  if(!result.noError) {
    console.log(result);
  }



  tx = {
      'operations': [[
          'smt_setup', {
              'control_account': s_username_0,
              'symbol': {'nai': nai, 'precision': 3},
              'max_supply': 60000000,
              'contribution_begin_time': schedule_time_str,
              'contribution_end_time': schedule_time_str,
              'launch_time': schedule_time_str,
              'steem_units_min': 0,
              'min_unit_ratio': 0,
              'max_unit_ratio': 0,
              'extensions': []
          }]]
  };

  console.log("Broadcasting smt_setup op...")
  await broadcast(tx, s_active_key_0);


  console.log(`created smt with nai : ${nai}`);

}

//let new_smt_nai = '@@979651727';

//successful_smt_object_create(3);
//test_smt_set_setup_parameters();
//test_transfer_tests();
//test_transfer_test_back();
//test_comment();
test_comment_2();
//bulk_smt_object_create();
//create_smt_full_setup();




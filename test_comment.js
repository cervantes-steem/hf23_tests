
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

var s_username_1 = process.env.STEEM_USERNAME_1;
var s_active_key_1 = process.env.STEEM_AK_1;
var s_posting_key_1 = process.env.STEEM_PK_1;

var s_username_2 = process.env.STEEM_USERNAME_2;
var s_active_key_2 = process.env.STEEM_AK_2;

const TEST_NAI_ASSET = { nai: '@@103004864', precision: 3 }


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



async function test_comment_options() {


  let tx = {

    'operations': [

      [
        "comment_options",
        {
          "author": "domenico",
          "permlink": "test1",
          "max_accepted_payout": {
            "amount": 10000,
            "precision": 3,
            "nai": "@@000000013"
          },
          "percent_steem_dollars": 5000,
          "allow_votes": true,
          "allow_curation_rewards": true,
          "extensions": [
            0,
            {
              "votable_assets": [
                  [
                    TEST_NAI_ASSET,
                      {
                          "max_accepted_payout": 10,
                          "allow_curation_rewards": true,
                          "beneficiaries": {}
                      }
                  ]
              ]
            }
          ]
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

console.log("Testing comment operation with account: " + s_username_1 + " ...");

test_comment();
test_comment_options();





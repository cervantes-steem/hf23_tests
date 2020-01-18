const {Client} = require('dsteem')

const client = new Client('https://api.steemit.com')

async function main() {
    const props = await client.database.getChainProperties()
    //console.log(`Maximum blocksize consensus: ${ props.maximum_block_size } bytes`)
    console.log(`Maximum blocksize consensus: ${ props.() _rate } bytes`)
    //client.disconnect()
}

main().catch(console.error)
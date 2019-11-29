const logs = {}

logs.list = (message, value) => {

    console.log(`\n ########## ${message} ###########`);
    console.log(JSON.stringify(value))
    console.log(`################################# \n`)
}

module.exports = logs
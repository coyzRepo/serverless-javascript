const jwt = require('jsonwebtoken');

const createToken = async (event) => {

    const { username, password } = event.queryStringParameters;
    const dateCreated = Date.now();

    const data = {
        username,
        password,
        dateCreated,
    };
    
    var privateKey = "b92ec406-bfef-11ec-9d64-0242ac120002" // can be any value
    var token = jwt.sign( data, privateKey);

    return {
        statusCode: 201,
        body: JSON.stringify(  
                {
                    output: token
                }

        ),
    };
};

module.exports = {
    handler: createToken
}
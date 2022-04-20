"use strict"
const jwt = require('jsonwebtoken');
const differenceInHours = require('date-fns/differenceInHours')

const checkUser = async (event) => {
    let statusCode = 500;
    let message = 'Something went wrong';
    try {
        const { username, token } = event.queryStringParameters;
        
        const privateKey = "b92ec406-bfef-11ec-9d64-0242ac120002"
        const decoded = jwt.verify(token, privateKey);
        const createdAt = new Date(decoded.dateCreated);
        const now = new Date();
        const isUserValid = (username === decoded.username);
        const diff = differenceInHours(now, createdAt);
        const isTokenValid = diff <= 1;
        statusCode = isUserValid && isTokenValid ? 200 : 403;
        message = isUserValid && isTokenValid ? 'Success!' : 'Failed: Unauthorized Access';
        
    } catch (error) {
        statusCode = 500;
        message = error.message;
    } finally {
        return {
            statusCode,
            body: JSON.stringify({ message }),
        };
    }
};

module.exports = {
    handler: checkUser
}
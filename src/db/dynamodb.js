const {DynamoDBClient, PutItemCommand, GetItemCommand} = require('@aws-sdk/client-dynamodb');


const tableName = 'planet';
const getDynamoDBClient = () => {
    const credentials = {
        accessKeyId: 'AKIAWP4BPRIOK5MKSA52',
        secretAccessKey: '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'
    };

    return new DynamoDBClient({
        region: 'us-east-1', credentials: credentials
    });
};

const saveItem = async (item) => {
    const dynamoDBClient = getDynamoDBClient();
    const params = {
        TableName: tableName, Item: {
            "id": {
                "S": JSON.parse(item).id
            },
            "planet": {
                "S": item
            }
        }
    }
    const command = new PutItemCommand(params);

    await dynamoDBClient.send(command);
};

const getItem = (id) => {
    const dynamoDBClient = getDynamoDBClient();
    const params = {
        TableName: tableName, Key: {
            "id": {
                "S": id
            }
        }
    }
    const command = new GetItemCommand(params);

    return dynamoDBClient.send(command);
};

module.exports = {
    getDynamoDBClient: getDynamoDBClient,
    saveItem: saveItem,
     getItem: getItem
};








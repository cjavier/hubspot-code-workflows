const hubspot = require('@hubspot/api-client');

exports.main = async (event, callback) => {
  // Create a HubSpot client instance with the provided access token
  const hubspotClient = new hubspot.Client({
    // Use the ACCESS_TOKEN_4 from environment variables
    accessToken: process.env.ACCESS_TOKEN_4
  });

  // Define the object type for the account (e.g., Company)
  const accountObjectType = '2-6452279';

  // Extract the Contact's ID from the event object
  const contactId = event['object']['objectId'];

  try {
    // List associations from the Contact object
    const apiResponse = await hubspotClient.crm.contacts.associationsApi.getAll(contactId, accountObjectType);
    console.log(JSON.stringify(apiResponse.body.results));

    // Extract the association data and set the association type
    const data = apiResponse.body.results;
    const associationType = "temporary";
    var toObjectId = "";

    // Iterate through the association data
    var dataLength = data.length;
    for (var i = 0; i < dataLength; i++) {
      console.log(data[i].id);
      toObjectId = data[i].id;
      console.log(toObjectId);

      // Archive the association between Contact and Company
      const apiResponse2 = await hubspotClient.crm.contacts.associationsApi.archive(contactId, accountObjectType, toObjectId, associationType);
    }

  } catch (err) {
    console.error(err);
    
    // Handle rate limiting error from the HubSpot API by automatically retrying
    throw err;
  }

  // Return an empty outputFields object
  callback({
    outputFields: {}
  });
}

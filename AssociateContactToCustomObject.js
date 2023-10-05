const hubspot = require('@hubspot/api-client');

exports.main = async (event, callback) => {
  // Create a new HubSpot client instance with the provided access token
  const hubspotClient = new hubspot.Client({
    accessToken: process.env.ACCESS_TOKEN_5
  });

  // Extract customer HubSpot ID and association type from event input fields
  const customerHubspotId = event.inputFields['hubspot_customer_id'];
  const associationType = event.inputFields['association_type'];

  try {
    // Define the customer object type (e.g., Contact)
    const customerObjectType = '2-6452279';

    // Extract the object ID from the event object
    const fromObjectId = event['object']['objectId'];

    // Set the association type for Company
    const associationTypeCompany = associationType + 'account';

    // Create an association between Contact and Company using the HubSpot client
    const associationContactCompany = await hubspotClient.crm.contacts.associationsApi.create(
      fromObjectId,
      customerObjectType,
      customerHubspotId,
      associationTypeCompany
    );

    // Log the result of the association creation
    console.log(JSON.stringify(associationContactCompany.body, null, 2));

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

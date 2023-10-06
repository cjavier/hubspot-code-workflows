// Get the Account associated with a Deal
try {
  // Define the object type for the Account (e.g., Company)
  const toObjectType = '2-6452279'; 
  
  // Extract the Deal ID from the event object
  const dealId = event['object']['objectId'];
  
  // Define additional parameters for the API request
  const after = undefined;
  const limit = 500;
  
  // Make an API request to get all associations between the Deal and the Account
  const apiResponse = await hubspotClient.crm.deals.associationsApi.getAll(dealId, toObjectType, true, after, limit);
  
  // Log the ID of the first associated Account (assuming there is at least one)
  console.log(apiResponse.body.results[0].id);
} catch (error) {
  console.error(error);
  // Handle any errors that occur during the API request
}


// Get a Deal associated with an Account
try {
  // Extract the object type and object ID from the event object
  const objectType = event['object']['objectType']; 
  const objectId =  event['object']['objectId'];
  
  // Define the object type for Deals
  const toObjectType = 'deals';
  
  // Define additional parameters for the API request
  const after = undefined;
  const limit = undefined;

  // Make an API request to get all associations between the Account and Deals
  const apiResponse = await hubspotClient.crm.objects.associationsApi.getAll(objectType, objectId, toObjectType, after, limit);
  
  // Log the ID of the first associated Deal (assuming there is at least one)
  console.log(apiResponse.body.results[0].id);
} catch (error) {
  console.error(error);
  // Handle any errors that occur during the API request
}

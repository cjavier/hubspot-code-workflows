const hubspot = require('@hubspot/api-client');

exports.main = async (event, callback) => {
  // Extract the Company ID from the event's input fields
  const companyId = event.inputFields['hubspot_company_id'];

  // Create a new HubSpot client instance with the provided access token
  const hubspotClient = new hubspot.Client({
    accessToken: process.env.ACCESS_TOKEN
  });

  // Define whether the associated deals should be archived or not (set to false)
  const archived = false;

  try {
    /*****
      Step 1: Get associated deals with the company.
    *****/
    const objectType = 'companies';
    const objectId = companyId;
    const toObjectType = 'deals';
    const after = undefined;
    const limit = undefined;

    // Make an API request to get all associations between the Company and Deals
    const apiResponse = await hubspotClient.crm.objects.associationsApi.getAll(objectType, objectId, toObjectType, after, limit);
   
    /*****
      Step 2: Get the properties to filter on the deal associated with that company.
    *****/
    const inputs = apiResponse.results.map(({ id }) => ({ id }));
    const BatchReadInputSimplePublicObjectId = {
      properties: ["pipeline", "deal_status"],
      propertiesWithHistory: [],
      inputs
    };

    // Requesting the specified properties
    const companiesResponse = await hubspotClient.crm.objects.batchApi.read(toObjectType, BatchReadInputSimplePublicObjectId, archived);
   
    /*****
      Step 3: Filter deals that are open and on the Grow, Expand, or Land pipelines.
    *****/
    const growPipelineId = '27538445';
    const expandPipelineId = '27495265';
    const landPipelineId = '6225829';

    const openDeals = companiesResponse.results.filter(({ properties }) => ['open'].includes(properties.deal_status));
    const onPipelines = openDeals.filter(({ properties }) => [growPipelineId, expandPipelineId, landPipelineId].includes(properties.pipeline));
   
    /*****
      Step 4: Associate the deal ID with the ticket.
    *****/
    // IMPORTANT NOTE: IT USES THE FIRST OPEN DEAL; IF THERE ARE MULTIPLE OPEN DEALS, IT TAKES THE FIRST ONE AND IGNORES THE REST
    const openDealId = onPipelines[0].id;
    const fromObjectType = event['object']['objectType'];
    const fromObjectId = event['object']['objectId'];
    const toObjectId = openDealId;
    const associationType = 'ticket_to_deal';
    const AssociationSpec = [
      {
        "associationCategory": "HUBSPOT_DEFINED",
        "associationTypeId": 28
      }
    ];

    // Make an API request to create an association between the ticket and the deal
    const apiResponse2 = await hubspotClient.crm.objects.associationsApi.create(fromObjectType, fromObjectId, toObjectType, toObjectId, associationType);

    // Log the response
    console.log(apiResponse2);

    // Return the openDealId as an output field
    callback({
      outputFields: {
        openDealId: openDealId
      }
    });
  } catch (err) {
    console.error(err);

    // Handle rate limiting error from the HubSpot API by automatically retrying
    throw err;
  }
}

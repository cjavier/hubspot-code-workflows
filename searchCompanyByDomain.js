const axios = require("axios");

exports.main = async (event, callback) => {
  // Extract the email address from the event's input fields
  const email = event.inputFields['email'];
  
  // Extract the domain from the email address
  const domain = email.substring(email.lastIndexOf("@") + 1);

  // Set the API endpoint and company domain
  const endpoint = 'https://api.hubapi.com/companies/v2/domains/' + domain + '/companies';
  const access_token = process.env.ACCESS_TOKEN;

  // Set the request headers and data for the Axios POST request
  const headersAxios = {
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'application/json'
    }
  };

  const data = {
    "limit": 2,
    "requestOptions": {
      "properties": [
        "domain",
        "createdate",
        "name",
        "hs_lastmodifieddate"
      ]
    },
    "offset": {
      "isPrimary": true,
      "companyId": 0
    }
  };

  try {
    // Initialize a variable to store the company ID
    var companyid = "";
    
    // Make an Axios POST request to the HubSpot API
    const apiCall = await axios.post(endpoint, data, headersAxios).then(response => {
      console.log(response.data.results[0].companyId);
      
      // Extract the company ID from the API response
      companyid = response.data.results[0].companyId;
    });
    
    // Log the company ID
    console.log(companyid);

    // Return the company ID as an output field
    callback({
      outputFields: {
        companyId: companyid
      }
    });
    
  } catch (err) {
    console.error(err);

    // Handle rate limiting error from the HubSpot API by automatically retrying
    throw err;
  }
}

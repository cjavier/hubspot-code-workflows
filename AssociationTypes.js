const hubspot = require('@hubspot/api-client');
const https = require('https');

exports.main = async (event, callback) => {
  // Create a new HubSpot client instance with the provided access token
  const hubspotClient = new hubspot.Client({
    accessToken: process.env.ACCESS_TOKEN_2,
  });

  try {
    // Make an API call to get all the association types between contacts and companies

    // Define the options for the HTTPS request to the HubSpot API
    var options = {
      "method": "GET",
      "hostname": "api.hubapi.com",
      "port": null,
      "path": "/crm/v3/associations/companies/contacts/types",
      "headers": {
        "accept": "application/json",
        "content-type": "application/json",
        "authorization": `Bearer ${process.env.ACCESS_TOKEN_2}`
      }
    };

    // Create an HTTPS request and handle the response
    var req = https.request(options, function (res) {
      var chunks = [];

      res.on("data", function (chunk) {
        chunks.push(chunk);
      });

      res.on("end", function () {
        var body = Buffer.concat(chunks);
        
        // Log the response body
        console.log(body.toString());
      });
    });

    // End the request
    req.end();

  } catch (err) {
    console.error(err);

    // Handle rate limiting error from the HubSpot API by automatically retrying
    throw err;
  }

  // Return an empty outputFields object
  callback({
    outputFields: {},
  });
};

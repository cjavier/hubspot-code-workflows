var request = require("request");

exports.main = async (event, callback) => {
  // Retrieve the HubSpot access token from environment variables
  const accessToken = process.env.ACCESS_TOKEN_4;

  // Initialize variables to store contact information
  var contactId = "";
  const email = event.inputFields['billing_email'];

  try {
    // Define the options for making a GET request to HubSpot's API
    var options = {
      method: 'GET',
      url: 'https://api.hubapi.com/contacts/v1/contact/email/' + email + '/profile',
      headers: {
        // Include the access token in the request's authorization header
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    }

    // Make a GET request to HubSpot's API to retrieve contact information
    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      // Parse the response body as JSON
      const obj = JSON.parse(body);

      // Extract the contact ID from the response
      contactId = obj.vid;
      console.log(contactId);

      // Return the contact ID as an output field
      callback({
        outputFields: {
          contactId: contactId
        }
      });
    });

  } catch (err) {
    console.error(err);

    // Handle rate limiting error from the HubSpot API by automatically retrying
    throw err;
  }
}

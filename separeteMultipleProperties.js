exports.main = async (event, callback) => {
  // Extract the email address from the event's input fields
  const preUserEmail = event.inputFields['cc_billing_email'];
  
  // Initialize variables to store the parsed email addresses
  var cc_billing_email_1 = "";
  var cc_billing_email_2 = "";
  
  // Check if there are multiple email addresses separated by a comma
  const multiple = preUserEmail.includes(",");
  
  if (multiple == true) {
    // If there are multiple email addresses, split them by comma and remove spaces
    cc_billing_email_1 = preUserEmail.split(",")[0].replace(/\s/g, '');
    cc_billing_email_2 = preUserEmail.split(",")[1].replace(/\s/g, '');
  } else {
    // If there's only one email address, assign it to cc_billing_email_1
    cc_billing_email_1 = preUserEmail;
  }
  
  // Log whether there are multiple email addresses and the parsed email addresses
  console.log(multiple);
  console.log(cc_billing_email_1);
  console.log(cc_billing_email_2);

  // Return the parsed email addresses and the multiple flag as output fields
  callback({
    outputFields: {
      cc_billing_email_1: cc_billing_email_1,
      cc_billing_email_2: cc_billing_email_2,
      multiple: multiple
    }
  });
}

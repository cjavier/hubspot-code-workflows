# Hubspot Custom Code Actions Library by CJavier

This is where I store all my Custom Code Actions for Hubspot Workflows.

## Available Actions

I mostly work with Custom Objects and Object associations so here are a few examples:

### Associate contact to a Custom Object

This workflow is designed to facilitate the association of contacts with Custom Objects in HubSpot. This one use the legacy association API that uses the association type tag insted of the ID so it requires using Hubspot Client v3

### See association types between objects

This workflow is designed to see the association types between objects so you can see the names and the IDs. This one use the legacy association API so it requires using Hubspot Client v3

### Delete Contact to Custom Object Association

This workflow is designed to delete the association of contacts with Custom Objects in HubSpot. This one use the legacy association API that uses the association type tag insted of the ID so it requires using Hubspot Client v3

### Search Contact using Email (Legacy)

This workflow is designed to search a contact using the email in HubSpot. This one use the legacy contact API, it's using a different method but it works. it requires using Hubspot Client v3

### Search Company using Domain (Legacy)

This workflow is designed to search a company using the domain URL in HubSpot. This one use the legacy company API, it's using a different method but it works, I really miss this endpoint on the new API. it requires using Hubspot Client v3

### Object ID from Associated Object

This workflow is designed to get the ID of an associated Object associated with another Object, in this example we are getting the Deals associated with a Custom Object. It requires using Hubspot Client v8

### Get batch information on a group of objects and filter based on that information

This workflow is designed to get all the associated objects with another object and filter those that have certain property values. In this example we get all the deals associated with a Company and filter based on the deal status and the pipeline to get only open deals on an specific pipeline. Then it also creates an association with a Ticket. It requires using Hubspot Client v8

### Separate in multiple variables a property with comma separated values

This workflow is designed to create multiple records from one single record. In this example we have a property with multiple billing emails separated by a coma and we create multiple properties to store a single email per property. It requires using Hubspot Client v8
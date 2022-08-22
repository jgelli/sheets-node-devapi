import hubspot from '@hubspot/api-client';

const HAPIKEY = process.env['HUBSPOT_TOKEN'];

export { createOrUpdate };

const hubspotClient = () => {
  const hubspotClient = new hubspot.Client({'accessToken':HAPIKEY});
  return hubspotClient;
};

const createContactHubspot = async (contact) => {
  const hubspot = hubspotClient();

  const properties = contact;
  const SimplePublicObjectInput = { properties };

  try {
    hubspot.crm.contacts.basicApi.create(SimplePublicObjectInput);
  } catch (e) {
    e.message === 'HTTP request failed'
      ? console.error(JSON.stringify(e.response, null, 2))
      : console.error(e);
  }

};

const updateContactHubspot = async (contact, contactHubspotId) => {
  const hubspot = hubspotClient();

  const properties = contact;

  const SimplePublicObjectInput = { properties };
  const contactId = contactHubspotId;

  try {
    hubspot.crm.contacts.basicApi.update(contactId, SimplePublicObjectInput);
  } catch (e) {
    e.message === 'HTTP request failed'
      ? console.error(JSON.stringify(e.response, null, 2))
      : console.error(e);
  }
};

const createOrUpdate = async (contact) => {
  const contactHubspot = await searchContactsHubspot(contact.email); 
  if(contactHubspot) {
    updateContactHubspot(contact, contactHubspot['id']);
    console.log(`Contact ${contact.firstname} updated in Hubspot.`);
  } else {
    createContactHubspot(contact);
    console.log(`Contact ${contact.firstname} created in Hubspot.`);
  }
};

const searchContactsHubspot = async (email) => {
  const hubspot = hubspotClient();

  const PublicObjectSearchRequest = { query: email };

  try {
    const apiResponse = await hubspot.crm.contacts.searchApi.doSearch(PublicObjectSearchRequest);
    return apiResponse.results[0];
  } catch (e) {
    e.message === 'HTTP request failed'
      ? console.error(JSON.stringify(e.response, null, 2))
      : console.error(e);
  }
};
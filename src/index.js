import { createOrUpdate } from './hubspot.js';
import { getContactsList } from './google-sheet.js';

const contacts = await getContactsList();
contacts.map(contact => {
  createOrUpdate(contact);
});
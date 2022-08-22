import { GoogleSpreadsheet } from 'google-spreadsheet';
import freeEmail from 'free-email-domains';
import parser from 'tld-extract';
import validator from 'validator';

const SHEETS_CLIENT_EMAIL = process.env['GOOGLE_SHEETS_CLIENT_EMAIL'];
const SHEETS_PRIVATE_KEY = process.env['GOOGLE_SHEETS_PRIVATE_KEY'];
const SHEET_ID = process.env['GOOGLE_SHEET_ID'];

export { getContactsList };

const getSpreadsheet = async () => {
  const spreadSheet = new GoogleSpreadsheet(SHEET_ID);

  await spreadSheet.useServiceAccountAuth({
    client_email: SHEETS_CLIENT_EMAIL,
    private_key: SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n')
  });
  await spreadSheet.loadInfo();
  const firstSheet = spreadSheet.sheetsByIndex[0]; 

  return firstSheet;
};

const isCorporateEmail = (email) => {
  const broken = email.split('@');
  const address = `http://${broken[broken.length - 1]}`;
  const { domain } = parser(address);
  const isFreeEmail = freeEmail.includes(domain); 
  return !isFreeEmail;
};

const validateContactEmail = (email) => {
  if(email) {
    if(!validator.isEmail(email)) {
      return false;
    }
    return isCorporateEmail(email);
  } else {
    return false;
  }
};

const formatContact = (sheetRow) => {
  return {
    company : sheetRow['Nome da empresa'],
    firstname : sheetRow['Nome completo'],
    email : sheetRow['Email'],
    phone : sheetRow['Telefone'],
    website : sheetRow['Website']
  };
};

const getContactsList = async () => {
  let cleanContacts = await getSpreadsheet().then(sheet => {
    let contacts = [];

    let contact;
    return sheet.getRows().then(rows => {
      rows.map(row => {
        contact = formatContact(row);
        
        const hasEmptyField = Object.values(contact).includes(undefined);
        if(hasEmptyField) {
          console.log(`Contact in row "${row._rowNumber}" has some empty field. *All the fields are required!*`);
        } else {
          if(validateContactEmail(contact.email)) {
            contacts.push(contact);
          } else {
            console.log(`Email from contact in row "${row._rowNumber}" isn't a corporate`);
          }
        }
      });
      return contacts;
    });
  });
  return cleanContacts;
};
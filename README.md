# integration-javascript-devapi

## Features

- [x] Google Sheet integration
- [x] Hubspot integration
- [x] Create or Update contacts
- [x] ESLint
- [ ] Listen spreadsheet change to run 

## Dependencies

To run this project you need to install locally on your machine the following dependencies:

- Node v16.17.0 or upper;
- NPM v8.15.0 or upper;

# Credentials

First of all, we need to generate some credentials.<br>
Copy the file .env.example and rename to .env, we'll fill the environment varible. 

### Google Sheets

Google Sheets API first. Go to this <a href="https://console.developers.google.com/">website</a> and login with your Google account who have the spreadsheet.

After login, create a project:

![1](https://user-images.githubusercontent.com/52708022/185832293-a56ed052-f0b1-49fb-93ea-d34166f144c0.jpeg)

Select the project created and let's activate the Google Sheet Service.

![3](https://user-images.githubusercontent.com/52708022/185832595-f9ce1b17-dcf9-41fa-b69b-26a8164f5ae8.jpeg)

Search for Google Sheets and active it.

![4](https://user-images.githubusercontent.com/52708022/185832770-3c1b4c02-647f-423d-8d73-778da6d4fe10.jpeg) 

Create the credentials.

![5](https://user-images.githubusercontent.com/52708022/185833098-ad304f17-51a1-4bd4-b4fa-935d67fcbd11.jpeg)

After credential created, we need to generate the private key.

![7](https://user-images.githubusercontent.com/52708022/185833345-8c3dc70a-ac05-42b5-ae11-071f017c6289.jpeg)

Generate with the JSON option.

![8](https://user-images.githubusercontent.com/52708022/185833720-da5408ed-120b-4a72-ac0f-16ed5eed1f1c.jpeg)

In the generated file, copy "client_email" to *GOOGLE_SHEETS_CLIENT_EMAIL*<br>
and copy all the content in "private_key" to *GOOGLE_SHEETS_PRIVATE_KEY* to .env file

Now, go to Spreadsheet do you'll use and copy the Sheet ID to *GOOGLE_SHEET_ID* variable in .env

![SheetID](https://user-images.githubusercontent.com/52708022/185834188-366cdc37-20bb-49c3-bf92-8c0466423146.png)

#### !IMPORTANT

The Spreadsheet columns fields need to write exactly like this:

- Nome da empresa
- Nome completo
- Email
- Telefone
- Website

![Screenshot from 2022-08-22 00-48-10](https://user-images.githubusercontent.com/52708022/185834744-9a0a542b-9889-4841-a557-f66c81767ab7.png)


### Hubspot

Go to <a href="https://br.hubspot.com/">Hubspot</a> and login

In settings click in Integrations, private apps and Create private app

![Screenshot from 2022-08-22 01-04-33](https://user-images.githubusercontent.com/52708022/185837605-0beffd6c-fbd9-401a-ab0d-cf2335be2c8f.png)

In scope and CRM allow to write and read *crm.objects.contacts* and click in create aplication. 

![Screenshot from 2022-08-22 01-06-12](https://user-images.githubusercontent.com/52708022/185837772-9579fb04-02cb-4d55-a7e2-d71980395763.png)

Copy the generated token to *HUBSPOT_TOKEN* in .env file.

## Running

1. Open the project folder and run `npm install`
2. Now run `npm run eslint` to check code
3. After add or update some contact in spreadsheet, run `npm run integration`


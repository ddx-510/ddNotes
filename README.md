# OTOT TASK B

Link to TASK **B1, B2.1-2.3**: [https://github.com/ddx-510/ddNotes](https://github.com/ddx-510/ddNotes)
Link to TASK **B2.4**: [https://github.com/ddx-510/OTOT_B2.4_Serverless](https://github.com/ddx-510/OTOT_B2.4_Serverless)

---

## TASK B1

To run the API locally, first clone this repo
In the root folder, enter

```shell
npm install
npm run dev
```
The server will be set up.

`NODE_ENV=testing` determines the current mode. If you want to test on the local Postgres server, please set up the info inside the **.env** file and set `NODE_ENV=development`

---

# TASK B1, B2.1 TEST API

To test the API  using this Postman collection
[https://www.getpostman.com/collections/32177646aa13a2be42ff](https://www.getpostman.com/collections/32177646aa13a2be42ff)

# CI and CD

To run test locally:

```shell
npm install
npm test
```
This will test the api on edge cases as well.

The CI was implemented using Github action, The [workflows](https://github.com/ddx-510/ddNotes/actions/workflows/node.js.yml) can be accessed here.


The CD was also implemented using the same workflow

After the build and test are passed on push,
It will trigger the deploy to heroku.

Note that this is not achieved by heroku git repo linkage, the whole deploy process was triggered by the [workflows](https://github.com/ddx-510/ddNotes/actions/workflows/node.js.yml)

# TASK B2.3 Front end

Access the app at [https://ddnotes.herokuapp.com/](https://ddnotes.herokuapp.com/)

Login with the test account

```
email: ddxtest1@gmail.com
password:12345
```

# TASK B2.4

### Introduction

The serverless function is deployed on google cloud.


It is using the SG GOV API to get the weather data of all regions in singapore.
The serverless function takes in a input name of the area of residence, and it will return the weather forecast of the next two hours of this region

This is the sample request to the serverless function with input name Clementi:

[https://us-central1-otot-b-ddnote.cloudfunctions.net/weather?name=Clementi](https://us-central1-otot-b-ddnote.cloudfunctions.net/weather?name=Clementi)

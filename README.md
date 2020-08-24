# Aibo
🥳 Most innovative Hack by RBC Hack the 6ix 2020. 

Link to Devpost: https://devpost.com/software/aibo 

## How we built it

This application was built with React, Javascript and HTML/CSS on the front-end along with Node.js and Express on the back-end. We used the Twilio chat room API along with Autocode to store our server endpoints and enable a Slack bot notification that POSTs a message in your specific buddy Slack channel when your buddy joins the video calling room. 

In total, we used **4 APIs/ tools** for our project. 

- Twilio chat room API
- Autocode API
- Slack API for the Slack bots
- Microsoft Azure to work on the machine learning algorithm

When we were creating our buddy app, we wanted to find an effective way to match partners together. After looking over a variety of algorithms, we decided on the K-means clustering algorithm. This algorithm is simple in its ability to group similar data points together and discover underlying patterns. The K-means will look for a set amount of clusters within the data set. This was my first time working with machine learning but luckily, through Microsoft Azure, I was able to create a working training and interference pipeline. The dataset marked the user’s role and preferences and created n/2 amount of clusters where n are the number of people searching for a match. This API was then deployed and tested on web server. Although, we weren't able to actively test this API on incoming data from the back-end, this is something that we are looking forward to implementing in the future. Working with ML was mainly trial and error, as we have to experiment with a variety of algorithm to find the optimal one for our purposes. 

Upon working with Azure for a couple of hours, we decided to pivot towards leveraging another clustering algorithm in order to group employees together based on their answers to the form they fill out when they first sign up on the aido website. We looked into the PuLP, a python LP modeler, and then looked into hierarchical clustering. This seemed similar to our initial approach with Azure, and after looking into the advantages of this algorithm over others for our purpose, we decided to chose this one for the clustering of the form responders. Some pros of hierarchical clustering include:

1. Do not need to specify the number of clusters required for the algorithm- the algorithm determines this for us which is useful as this automates the sorting through data to find similarities in the answers. 
2. Hierarchical clustering was quite easy to implement as well in a Spyder notebook. 
3. the dendrogram produced was very intuitive and helped me understand the data in a holistic way

The type of hierarchical clustering used was agglomerative clustering, or AGNES. It's known as a bottom-up algorithm as it starts from a singleton cluster then pairs of clusters are successively merged until all clusters have been merged into one big cluster containing all objects. In order to decide which clusters had to be combined and which ones had to be divided, we need methods for measuring the similarity between objects. I used Euclidean distance to calculate this (dis)similarity information. 

This project was designed solely using Figma, with the illustrations and product itself designed on Figma. These designs required hours of deliberation and research to determine the customer requirements and engineering specifications, to develop a product that is accessible and could be used by people in all industries. In terms of determining which features we wanted to include in the web application, we carefully read through the requirements for each of the challenges we wanted to compete within and decided to create an application that satisfied all of these requirements.

After presenting our original idea to a mentor at RBC, we had learned more about remote work at RBC and having not yet completed an online internship, we learned about the pain points and problems being faced by online workers such as: 

1. Isolation
2. Lack of feedback 

From there, we were able to select the features to integrate including: Task Tracker, Video Chat, Dashboard, and Matching Algorithm which will be explained in further detail later in this post.

Autocode source code here: https://autocode.com/src/mathurahravigulan/remotework/

## Creating the Slackbot using Autocode
```javascript
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

/**
* An HTTP endpoint that acts as a webhook for HTTP(S) request event
* @returns {object} result Your return value
*/
module.exports = async (context) => {
  console.log(context.params)
  if (context.params.StatusCallbackEvent === 'room-created') {
    await lib.slack.channels['@0.7.2'].messages.create({
      channel: `#buddychannel`,
      text: `Hey! Your buddy started a meeting! Hop on in: https://aibo.netlify.app/ and enter the room code MathurahxAyla`
    });
     } // do something
  let result = {};

  
  // **THIS IS A STAGED FILE**
  // It was created as part of your onboarding experience.
  // It can be closed and the project you're working on
  //   can be returned to safely - or you can play with it!
  
  result.message = `Welcome to Autocode! 😊`;
  

  return result;
};
```

## Connecting Twilio to autocode
```javascript
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const twilio = require('twilio');
const AccessToken = twilio.jwt.AccessToken;
const { VideoGrant } = AccessToken;

const generateToken =() => {
  return new AccessToken(
  process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_API_KEY,
   process.env.TWILIO_API_SECRET
  );
};

const videoToken = (identity, room) => {
  let videoGrant;
  if (typeof room !== 'undefined') {
    videoGrant = new VideoGrant({ room });
  } else {
    videoGrant = new VideoGrant();
  }
  const token = generateToken();
  token.addGrant(videoGrant);
  token.identity = identity;
  return token;
};
/**
* An HTTP endpoint that acts as a webhook for HTTP(S) request event
* @returns {object} result Your return value
*/
module.exports = async (context) => {
  console.log(context.params)
  const identity = context.params.identity;
  const room = context.params.room;
  const token = videoToken(identity, room);
  return {
    token: token.toJwt()
  }
  
  
  

};
```

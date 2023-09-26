
<img src="https://github.com/ToniTannoury/InterCollab/assets/138028340/52f81eb3-dd6b-4cca-bd87-4084b4be4aca"/>

<div align="center">

> Hello world! This is the project’s summary that describes the project plain and simple, limited to the space available.

**[PROJECT PHILOSOPHY](https://github.com/ToniTannoury/InterCollab-philosophy) • [WIREFRAMES](https://github.com/jatannoury/InterCollab#wireframes) • [TECH STACK](https://github.com/jatannoury/InterCollab#tech-stack) • [IMPLEMENTATION](https://github.com/jatannoury/InterCollab#impplementation) • [HOW TO RUN?](https://github.com/jatannoury/InterCollab#how-to-run)**

</div>
 
<br><br>

<img  id="project-philosophy" src="https://github.com/ToniTannoury/InterCollab/assets/138028340/798af04e-9ac9-4628-b78e-79f4e2d7b924"/>

>Have you ever wanted to livestream your content to an unlimited audience and potentially monetize it? InterCollab was developed to make this process easy and accessible to everyone.

>InterCollab is here to enhance content creation, providing you with the ability to host multiple live rooms tailored to your chosen categories. You can share your audio, video, engage in chat, and exchange ideas with participants from all around the world. InterCollab offers the flexibility to create public rooms open to anyone, private rooms requiring a unique PIN provided by the creator for access, and paid rooms that necessitate users to pay a specific amount of coins for entry.

### User Stories
- As a user I want to be able to share my live camera footage in a room I created
- As a user I want to be able to share my LIVE audio footage in a room I created
- As a user I want to be able to share my screen live in a room I created
- As a user I want to be able to receive the coins a participant pays to enter a room i created 
- As a user I want to be able to chat via text with the participants of a room i created
- As a user I want to be able to monitor the users entering and leaving the rooms i created
- As a user i want to be able to follow my favorite creator
- As a user i want to be able to rate the creator of a certain room


<br><br>

<img id="wireframes" src="https://github.com/ToniTannoury/InterCollab/assets/138028340/3fe41cf1-f842-4c56-9e01-75e6f6f0db7e"/>

> This design was planned before on Figma app.



| Create Room | User Profile | Search Rooms |
| ------ | ------ | ------ |
| ![LandingScreen](https://github.com/ToniTannoury/InterCollab/assets/138028340/dad02324-256e-47d1-99a2-db0a4eb6fe64) | ![User Profile](https://github.com/ToniTannoury/InterCollab/assets/138028340/49985041-7408-4c8e-ba59-722b73b724b5) |  ![Search Rooms](https://github.com/ToniTannoury/InterCollab/assets/138028340/288ac111-1b98-4481-a5c3-eead07b40f73)

| Room Info | Followings | Interactive Room |
| ------ | ------ | ------ |
|![Create Room](https://github.com/ToniTannoury/InterCollab/assets/138028340/4710f203-7443-451d-8b6c-9c6295f685c4) | ![Interactive Room](https://github.com/ToniTannoury/InterCollab/assets/138028340/dd758cc2-276a-4f68-bbc4-b206d29537a0) |  ![Search Rooms](https://github.com/ToniTannoury/InterCollab/assets/138028340/75a4bb58-9f4f-4271-9c3e-7138ba01d5be) 


<br><br>

<img id="tech-stack" src="https://github.com/ToniTannoury/InterCollab/assets/138028340/8d6f6279-3c15-41e7-889a-dfa209b5af7f"/>

Here's a brief high-level overview of the tech stack the InterCollab app uses:

- This project uses the [Next.js development framework](https://nextjs.dev/) for the development of the core content of the application. Next.js is The React Framework for the Web which lets you elevate your react app to the next level, it extends React's capabilities by providing a framework server render your JavaScript code , use middlewares on your routes , improve SAO, facilitates cache manipulation ...

- To serve the data, this project uses [Node.js development framework](https://nodejs.org/en/) as Backend. Node.js is an open source development platform for executing JavaScript code server-side. Node is useful for developing applications that require a persistent connection from the browser to the server and is often used for real-time applications such as chat, news feeds and web push notifications.

- For persistent storage (database), the app uses the [MongoDB Atlas](https://www.mongodb.com/) package which allows the app to create a custom storage schema and save it to a cloud database. MongoDB Atlas is a fully-managed cloud database that handles all the complexity of deploying, managing, and healing your deployments on the cloud service provider of your choice (AWS , Azure, and GCP). MongoDB Atlas is the best way to deploy, run, and scale MongoDB in the cloud.

- InterCollab relies on cutting-edge [WebRTC](https://webrtc.org/) technologies, with a particular focus on [Peer JS](https://peerjs.com/), to enable seamless real-time communication among its users. WebRTC is a powerful set of protocols and APIs that facilitates peer-to-peer communication directly within web browsers, allowing for the transmission of video, audio, and screen sharing in real time.

- For the application state management, [Redux Toolkit and Context Api](https://redux-toolkit.js.org/) have been integrated.The Context API is a part of React, and it provides a way to share state between components without having to pass props through multiple levels of the component tree. It's designed to solve the problem of "prop drilling,".Redux Toolkit is an opinionated toolset for efficient Redux development created by the Redux team. It is the standard and recommended way to write Redux logic and manage state in your JavaScript applications.

- Concerning the chatting system applied and interactive entery and leave of rooms, [Socket.IO](https://socket.io/) have been used in order to be able to emit events to all room joiners.Socket.IO is a widely-used JavaScript library that enables real-time, bidirectional communication between the server and clients. It is built on top of the WebSocket protocol and provides a simple and powerful way to implement real-time features in web applications.

- Concerning the get coins functionality,InterCollab uses [Stripe](https://stripe.com/en-gb-us) with its webhook to successfully and securely process payments from users credit cards.

- [Ant Design](https://ant.design/) and [tailwindcss](https://tailwindcss.com/) where used for styling

<br><br>
<img id="features" src="https://github.com/ToniTannoury/InterCollab/assets/138028340/1efd2b02-cf75-41c4-ad40-a220d6c1ac4c"/>

> Using the above mentioned tech stacks and the wireframes build with figma from the user sotries we have, the implementation of the app is shown as below, these are screenshots from the real app

#### Users Screens



| Rooms of the month | Create Room |
| ------ | ------ |
| ![Rooms of the month](https://github.com/ToniTannoury/InterCollab/assets/138028340/618ff162-880e-4383-a664-34f88ff2188d) | ![Create Room](https://github.com/ToniTannoury/InterCollab/assets/138028340/d925830a-f3e6-47e8-96e8-17b9d79a7578) |

<br><br>

| All Rooms | Search Rooms 
| ------ | ------ | 
| ![All Rooms](https://github.com/ToniTannoury/InterCollab/assets/138028340/8734a0b1-f0ef-4120-9d0a-548d76c74bf0) | ![Search Rooms ](https://github.com/ToniTannoury/InterCollab/assets/138028340/5ee7dec5-fbb9-4d11-a853-7b3d8427f434) | 

<br><br>

| Edit Profile | Follow Unfollow | 
| ------ | ------ 
| ![Edit Profile](https://github.com/ToniTannoury/InterCollab/assets/138028340/de4fe203-05b8-4f32-89a7-294def1620a8) | ![Follow Unfollow](https://github.com/ToniTannoury/InterCollab/assets/138028340/9475f120-bcb2-4b4d-8962-1161629dd8e3)|

<br><br>

| Join Rooms | Get Coins
| ------ | ------
| ![Join Rooms](https://github.com/ToniTannoury/InterCollab/assets/138028340/60d2e8a5-2d33-4c7a-a4bb-78cbf73a7c1a) | ![Get Coins](https://github.com/ToniTannoury/InterCollab/assets/138028340/6fd05336-e18b-4f95-8bca-2289cc1a54ab) | 

<br><br>

| Pay To Enter | Rating Creator on Room Leave | 
| ------ | ------ | 
| ![Pay To Enter](https://github.com/ToniTannoury/InterCollab/assets/138028340/ab015dbb-bcb6-4ceb-8f86-6b91bca958ba) | ![Rating Creator on Room Leave](https://github.com/ToniTannoury/InterCollab/assets/138028340/2324b69a-124a-463a-b34b-d093e32aab2e) |
<br><br>

#### Creator Screen Inside Room Video

[![Watch the video](https://github.com/ToniTannoury/InterCollab/assets/138028340/db62ec67-e4fe-4626-96c2-dbeb8dcbd400)](https://github.com/ToniTannoury/InterCollab/assets/138028340/e8fb3a41-187a-4c58-9f3a-1a54b94dbdd9)



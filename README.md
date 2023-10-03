
<img src="https://github.com/ToniTannoury/InterCollab/assets/138028340/dd817d2a-8ec8-477a-859a-a8997f39975b"/>
<br/>
<br/>

<div align="center">
> Hello world! This is the project’s summary that describes the project plain and simple, limited to the space available.
<br><br>
</div>

<img  id="table-of-content" src="https://github.com/ToniTannoury/InterCollab/assets/138028340/e912766c-7a7b-47af-b588-c4f9a8501b8a"/>

- [Project Description](#project-philosophy)
- [Features of the App](#stories)
- [Tech Stack](#tech-stack)
- [Prototyping](#prototyping)
- [Demo](#Demo)
- [Performance](#Performance)
- [How to Run](#how-to-run)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)

<br><br>

<img  id="project-philosophy" src="https://github.com/ToniTannoury/InterCollab/assets/138028340/1238030e-b814-4cd8-9148-42d36fd384be"/>



>Have you ever wanted to livestream your content to an unlimited audience and potentially monetize it? InterCollab was developed to make this process easy and accessible to everyone.

>InterCollab is here to enhance content creation, providing you with the ability to host multiple live rooms tailored to your chosen categories. You can share your audio, video, live screen share and engage in a text chat with participants from all around the world. InterCollab offers the flexibility to create public rooms open to anyone, private rooms requiring a unique PIN provided by the creator for access, and paid rooms that necessitate users to pay a specific amount of coins for entry.

<div id="stories">
  <h3> Room Creator Stories </h3>
</div>

- As a room creator I want to be able to share my live camera footage 
- As a room creator I want to be able to share my live audio footage 
- As a room creator I want to be able to share my screen live 
- As a room creator I want to be able to receive the coins a participant pays to enter 
- As a room creator I want to be able to chat via text with the participants of a room I created


<h3> Attendee Stories </h3>

- As an attendee I want to be able to see the live stream (Audio, Video, Screen) of the creator 
- As an attendee I want to be able to rate the creator of a room after leaving it
- As an attendee I want to be engage in the text chat of a room I joined
- As an attendee I want to be able to participate to as much live rooms as I want


<br><br>

<img id="tech-stack" src="https://github.com/ToniTannoury/InterCollab/assets/138028340/1ced5c2b-158f-4b6c-824b-fa6b8cf20a59"/>

Here's a brief high-level overview of the tech stack the InterCollab app uses:

- This project uses the [Next.js development framework](https://nextjs.dev/) for the development of the core content of the application. Next.js is The React Framework for the Web which lets you elevate your react app to the next level, it extends React's capabilities by providing a framework to server render your JavaScript code , use middlewares on your routes , improve SAO, facilitates cache manipulation ...

- To serve the data, this project uses [Node.js development runtime](https://nodejs.org/en/) and [Express.js](https://expressjs.com/) as Backend. Node.js is an open source development platform for executing JavaScript code server-side. Express, is a fast and minimalist web application framework for Node.js, Node is useful for developing applications that require a persistent connection from the browser to the server and is often used for real-time applications such as chat, news feeds and web push notifications.

- For persistent storage (database), the app uses the [MongoDB Atlas](https://www.mongodb.com/) package which allows the app to create a custom storage schema and save it to a cloud database. MongoDB Atlas is a fully-managed cloud database that handles all the complexity of deploying, managing, and healing your deployments on the cloud service provider of your choice (AWS , Azure, and GCP). MongoDB Atlas is the best way to deploy, run, and scale MongoDB in the cloud.

- InterCollab relies on cutting-edge [WebRTC](https://webrtc.org/) technologies, with a particular focus on [Peer JS](https://peerjs.com/), to enable seamless real-time communication among its users. WebRTC is a powerful set of protocols and APIs that facilitates peer-to-peer communication directly within web browsers, allowing for the transmission of video, audio, and screen sharing in real time.

- For the application state management, [Redux Toolkit and Context Api](https://redux-toolkit.js.org/) have been integrated. The Context API is a part of React, and it provides a way to share state between components without having to pass props through multiple levels of the component tree. It's designed to solve the problem of "prop drilling". Redux Toolkit is an opinionated toolset for efficient Redux development created by the Redux team. It is the standard and recommended way to write Redux logic and manage state in your JavaScript applications.

- Concerning the chatting system applied and interactive entry and leave of rooms, [Socket.IO](https://socket.io/) has been used in order to be able to emit events to all room joiners. Socket.IO is a widely-used JavaScript library that enables real-time, bidirectional communication between the server and clients. It is built on top of the WebSocket protocol and provides a simple and powerful way to implement real-time features in web applications.

- Concerning the get coins functionality, InterCollab uses [Stripe](https://stripe.com/en-gb-us) with its webhook to successfully and securely process payments from users credit cards.

- Amazon Elastic Compute Cloud [Amazon EC2](https://aws.amazon.com/ec2/) is a web service provided by Amazon Web Services (AWS) that offers resizable compute capacity in the cloud. It allows users to run virtual machines (known as instances) on-demand, making it a fundamental building block for cloud computing

- [Ant Design](https://ant.design/) and [tailwindcss](https://tailwindcss.com/) where used for styling. Ant Design is an enterprise-class UI design language and React UI library with a set of high-quality React components, one of best React UI library for enterprises. Tailwind CSS is a utility-first CSS framework for rapidly building modern websites without ever leaving your HTML

<br><br>

<img id="prototyping" src="https://github.com/ToniTannoury/InterCollab/assets/138028340/2208de2c-cbda-4a10-b197-3ea477cf7adb"/>

> This design was planned before on Figma app.

| Create Room | User Profile | Search Rooms |
| ------ | ------ | ------ |
| ![LandingScreen](https://github.com/ToniTannoury/InterCollab/assets/138028340/dad02324-256e-47d1-99a2-db0a4eb6fe64) | ![User Profile](https://github.com/ToniTannoury/InterCollab/assets/138028340/49985041-7408-4c8e-ba59-722b73b724b5) |  ![Search Rooms](https://github.com/ToniTannoury/InterCollab/assets/138028340/288ac111-1b98-4481-a5c3-eead07b40f73)

| Room Info | Followings | Interactive Room |
| ------ | ------ | ------ |
|![Create Room](https://github.com/ToniTannoury/InterCollab/assets/138028340/4710f203-7443-451d-8b6c-9c6295f685c4) | ![Interactive Room](https://github.com/ToniTannoury/InterCollab/assets/138028340/dd758cc2-276a-4f68-bbc4-b206d29537a0) |  ![Search Rooms](https://github.com/ToniTannoury/InterCollab/assets/138028340/75a4bb58-9f4f-4271-9c3e-7138ba01d5be) 

<br><br>

<br><br>
<img id="Demo" src="https://github.com/ToniTannoury/InterCollab/assets/138028340/9762273b-56dc-43c9-ab2e-e039cf8537ff"/>


> Using the above mentioned tech stacks and the wireframes build with figma from the user sotries we have, the demo of the app is shown as below, these are screenshots from the real app

<h3> Users Screens </h3>



| Rooms of the month | Create Room |
| ------ | ------ |
| ![Rooms of the month](https://github.com/ToniTannoury/InterCollab/assets/138028340/f0bf2dd0-3a1e-41ae-8c77-1d8e1055ad94) | ![Create Room](https://github.com/ToniTannoury/InterCollab/assets/138028340/c68b5bb1-f1e9-4ae8-aa41-a3417114515a) |

<br><br>

| All Rooms | Search Rooms 
| ------ | ------ | 
| ![All Rooms](https://github.com/ToniTannoury/InterCollab/assets/138028340/f7c7e550-1445-41c0-bc81-551c9528515c) | ![Search Rooms ](https://github.com/ToniTannoury/InterCollab/assets/138028340/a3c46da0-e993-4513-802a-202972039bb9) | 

<br><br>

| Edit Profile | Follow Unfollow | 
| ------ | ------ 
| ![Edit Profile](https://github.com/ToniTannoury/InterCollab/assets/138028340/b5022ae4-b9a6-4eb9-85bb-45f2109700a6) | ![Follow Unfollow](https://github.com/ToniTannoury/InterCollab/assets/138028340/52cfff82-5626-4f33-89dd-1f953038d4f9)|

<br><br>

| Join Rooms | Get Coins
| ------ | ------
| ![Join Rooms](https://github.com/ToniTannoury/InterCollab/assets/138028340/fc8b9802-026c-4f49-bb79-d3c8030e489d) | ![Get Coins](https://github.com/ToniTannoury/InterCollab/assets/138028340/75374de0-13d2-4419-aaf4-6c5947ec563b) | 

<br><br>

| Pay To Enter | Rating Creator on Room Leave | 
| ------ | ------ | 
| ![Pay To Enter](https://github.com/ToniTannoury/InterCollab/assets/138028340/3492ce42-0db9-4f44-8f5c-33c40bb5d1d0) | ![Rating Creator on Room Leave](https://github.com/ToniTannoury/InterCollab/assets/138028340/3eed7c74-f0fa-405f-befd-9345390c4828) |
<br><br>

<h3>Creator Screen Inside Room Video</h3> 

[![Watch the video](https://github.com/ToniTannoury/InterCollab/assets/138028340/db62ec67-e4fe-4626-96c2-dbeb8dcbd400)](https://github.com/ToniTannoury/InterCollab/assets/138028340/e8fb3a41-187a-4c58-9f3a-1a54b94dbdd9)

<h3> Participant Screen Inside Room Video </h3>

[![Watch the video](https://github.com/ToniTannoury/InterCollab/assets/138028340/db62ec67-e4fe-4626-96c2-dbeb8dcbd400)](https://github.com/ToniTannoury/InterCollab/assets/138028340/f29111a3-b2ae-494e-889f-2dafed026dc2
)

<br><br>

<img id="Performance" src="https://github.com/hassankhalil33/ucard/assets/138028340/9807d3e9-be85-4d6c-be45-935b16ac2f51"/>
<br><br>
You can use the provided Postman Collection to have a look at the documented API endpoints hosted on an aws EC2 instance:

<br>

[Postman Collection](https://github.com/ToniTannoury/InterCollab/blob/main/InterCollab%20Apis.postman_collection.json) 

You can utilize the provided Postman API test suite to  assess the performance and functionality of the API endpoints that are hosted on an aws EC2 instance through an iteration of 50 tests:

[Postman Apis test run](https://github.com/ToniTannoury/InterCollab/blob/main/InterCollab%20Apis.postman_test_run.json) 

<br><br>
<img id="how-to-run" src="https://github.com/ToniTannoury/InterCollab/assets/138028340/00fa716c-a94b-49ee-aec4-2df4fb6e48ac"/>

<div id="prerequisites">
  <h3> Prerequisites </h3>
</div>

In order to run the project correctly, you need to install the following packages

- npm
  ```sh
  npm install npm@latest -g
  ```

- next-cli
  ```sh
  npm install -g next-cli next
  ```

- Node.js

  Install [Node.js](https://nodejs.org/en/)

  <div id="installation">
    <h3> Installation </h3>  
  </div>


Below is an example of how you can install the project on your local device


- Clone the repo
   ```sh
  git clone https://github.com/ToniTannoury/InterCollab


<h3> To Run The Server </h3>

1. Navigate to the Backend folder
   ```sh
   cd backend
   ```
 
2. Install NPM packages
   ```sh
   npm install
   ```
3. Start Backend
   ```sh
   npm run server
   ```

<h3> To Run Client </h3>

1. Navigate to the Frontend folder
   ```sh
   cd frontend
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Start Client
   ```sh
   npm run dev
   ```



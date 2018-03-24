---
layout: post
title: Google Sign-In project
subtitle: "Setting up user authentication with google"
date: 2018-03-23 16:26
tags: Google
author: "Andrei Sbitnev"
header-img: "/img/mean_code.png"
cdn: 'header-off'
intro: "<h2>Introduction</h2>"
---
This is a quick step-by-step guide to setup a google project for authentication. The credeantials can later be used to enable google authentication with passport.js or in the [hexo-comments](https://github.com/andreisbitnev/hexo-comments) project (which also uses passport.js).

1. Open your browser and navigate to [https://console.developers.google.com/](https://console.developers.google.com/), and click "Create Project", and name it whatever you like<br>
2. Click "Create credentials" and select "OAuth client ID"<br>
>Tip: If you have already created a project before, just click on "credentials" on the left navigation menu and then click "Create credentials" and select "OAuth client ID"
3. Select "Web application".<br>
In the "Authorised JavaScript origins" - set a link to your website, for the localhost it should be `http://localhost:4000`, where 4000 is the port you\`re serving your app on.<br>
In the "Authorised redirect URIs" - set a redirect link, for our example it will be `http://localhost:4000/auth/google/callback`.<br>
Click "Create"<br>
4. Popup will open with clientID and client secret. You can copy them now, but they will also be available afterwards.<br>
5. Click on "Dashboard" on the left navigation menu, then click "+ ENABLE APIS AND SERVICES" button.<br>
6. Locate the "Google+ API" and enable it.<br>
7. Now your credentials from the step nr. 4 will be active, you can use them in the app. If you haven\`t saved them before, just click on "credentials" on the left navigation menu, and click on the available one. It should be named "Web client 1" by default.<br>
8. Just copy the "Client ID" and "Client Secret", and use them where you need. For the [hexo-comments](https://github.com/andreisbitnev/hexo-comments) you should insert them in the config.js file under auth -> google
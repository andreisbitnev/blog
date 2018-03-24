---
title: Facebook authentication app
date: 2018-03-23 20:56
layout: post
subtitle: Setting up user authentication with facebook
tags: Facebook
author: "Andrei Sbitnev"
header-img: "/img/mean_code.png"
cdn: 'header-off'
intro: "<h2>Introduction</h2>"
---
This is a quick step-by-step guide to setup a facebook app for authentication. The credeantials can later be used to enable facebook authentication with passport.js or in the [hexo-comments](https://github.com/andreisbitnev/hexo-comments) project (which also uses passport.js).

1. Open your browser and navigate to [https://developers.facebook.com/?advanced_app_create=true](https://developers.facebook.com/?advanced_app_create=true), enter the name you like, and click "Create app ID"<br>
2. If you want to use the app locally, click on the dropdown with your apps name in the top left corner of the screen and click "create test app". Enter the name of the test app and click "Create test App".
>Tip: It will not be possible to test the real app without the domain name. If you want to use localhost, create the test app, and when you're ready for production, just configure the first app you already created.
3. Select the "Facebook Login" by clicking "Set Up" and select "WEB" in the next window.<br>
4. In the left navigation menu under the "Facebook Login" select "Settings".<br>
<img src="/img/facebook_login_settings.png"><br>
5. In the "Valid OAuth Redirect URIs" enter the callback url\`s. For the [hexo-comments](https://github.com/andreisbitnev/hexo-comments) project it should be `https://localhost:5555/auth/facebook/callback`. <b>5555</b> is the "securePort", which should be specified in the config file. Click "Save changes" in the bottom of the screen<br>
<b>Important: All facebook apps created from March 2018 will have the Enforce HTTPS set. Which means, you will not be able to sign-in with facebook without secure connection.</b><br>
6. In the left navigation menu under the "Dashboard" button, clcik "Settings", and select "basic".<br>
<img src="/img/facebook_settings.png"><br>
7. Just copy the "App ID" and "App Secret", and use them where you need. For the [hexo-comments](https://github.com/andreisbitnev/hexo-comments) you should insert them in the config.js file under auth -> facebook

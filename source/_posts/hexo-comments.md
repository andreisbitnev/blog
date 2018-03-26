---
layout: post
title: hexo-comments
subtitle: "Setting up hexo blog with comments"
date: 2018-03-24 20:50
tags:
    - Hexo
    - hexo-comments
author: "Andrei Sbitnev"
header-img: "/img/mean_code.png"
cdn: 'header-off'
intro: "<h2>Introduction</h2>"
---
As mentioned earlier, the goal of this whole blog is to provide step-by-step guides on different topics in web development. When I have already published a couple of blog posts, I suddenly realized, that I won\`t get any feedback from the readers, since they can\`t leave any comments.<br>
I\`m using [hexo](https://hexo.io/), which is quite simple and powerfull blogging framework, yet it\`s simplicity comes with some limitations. Commenting functionality is one of them. There are however possibilities to integrate comments in your blog, like integrating a third party plugin tool like [disqus](https://disqus.com/).<br>
I don\`t really like the idea of using any third party tools for a simple feature like "comments on the blog", neither do I want to pay for it. So I decided to build my own commenting tool, which will be simple like hexo. And since hexo is mostly used by developers and designers, the tool should also be configurable and allow users to add features and change styles easily.<br>
This guide will walk you through the basic setup and configuration of the [hexo-comments](https://github.com/andreisbitnev/hexo-comments) project. In the end of the tutorial we will dive a bit deeper, and add an avatar feature to the project, to better understand the structure of the project and possibilities for extension.
<img src="/img/blog-hexo.jpg" style="height:0; width:0; position: absolute">

## Creating a new hexo blog
First we need to install hexo cli tool globally
```
npm install hexo-cli -g
```
To create a new hexo blog named "blog", run
```
hexo init blog
```
Go to the blog root directory and install dependencies by running
```
npm install
```
That\`s it, to run the server use `hexo server` or `hexo server -s`, to run only static files.
>Tip: to run server in static mode, you first need to generate static files by running `hexo generate`

>Tip: more info about hexo commands and configuration can be found [here](https://hexo.io/)

## Adding hexo-comments to the blog
To add [hexo-comments](https://github.com/andreisbitnev/hexo-comments), we need to clone the project. From the blogs root directory run
```
git clone https://github.com/andreisbitnev/hexo-comments.git comments
```
Now we need to add a container div for our comments and a script, that will load the comments to the page. Hexo uses .ejs template files to generate html, so we need to add those lines to the .ejs file that will render our posts. The default theme installed with hexo is called landscape, so we need to modify the ~/themes/landscape/layout/partial/article.ejs file. Just open the file and copy the lines shown below right before the closing `</article>` tag.
```html
   ...
  <div id="cmt-comment-area"></div>
  <script src="/assets/cmtModule.js" data-cmt-id="cmt-comment-area"></script>
</article>

```
>Tip: there is a lot of themes for hexo, which have different layouts, you can find some of them [here](https://hexo.io/themes/index.html)

Hexo-comments comes with a server that serves blogs static files, so you don\`t need to run blog and comments plugin separately. Everything is started with one command. This is why after any changes are made to the blog, like adding a new post, or changing a template file, new static files need to be generated. This is done by running
```
hexo generate
```
Now let\`s install the dependencies for hexo-comments. Go to the ~/blog/comments directory, which we cloned just recently, and run
```
npm install
```
Hexo-comments uses sqlite database to store comments and user sessions, and [db-migrate](https://www.npmjs.com/package/db-migrate) for migrations. To create the database with all the needed tables, just run
```
npm run setupDb
```
The basic setup is now done. To start the server just run 
```
npm start
```
Open your browser and navigate to [http://localhost:4000](http://localhost:4000/), scroll to the bottom of the page, and you\`ll see a comment box.<br>
<img src="/img/comments_added.png"><br>
You can write something in the text box, and save it by clicking "Post as a Guest". Right now, there is no possibility to authenticate the user, since we didn\`t configure google or facebook login functionality just yet.

## Adding google sign-in functionality

It is possible to authenticate the user, and display his name in the comments header. It is also possible to use other information provided by google api, such as email address or picture, but all of that needs to be configured separately.<br>
To enable the google log-in functionality, you first need to create a google sign-in project, and get the supplied "Client Id" and "Client Secret". Here\`s a link to a quick step-by-step guide on how to do it [Google sign-in project](http://andreisbitnev.com/2018/03/23/Google-Sign-In-project/).<br>
>Tip: When creating a google sign in project, specify the "Authorised redirect URIs" as `http://localhost:4000/auth/google/callback`

When you got the id and the secret from google, open a config.js file in the comments folder ~/blog/comments/config.js, and insert them in the auth.google section
```javascript
auth: {
        secret: 'dfvkjHy8wew0!*ncdB7K)',
        google: {
            clientID: '12345678-asdfghjkl1234.apps.googleusercontent.com',
            clientSecret: 'asdFGHjkl1234567'
        },
```
>Tip: be sure to change the "secret" value to some random string, as shown above.
That\`s it, just restart the server, and open [http://localhost:4000](http://localhost:4000/) in the browser.
<img src="/img/google_sign-in.png"><br>
You will now be able to sign-in by clicking the G+ icon, and sign-out by clicking the sign-out button.

## Adding facebook sign-in functionality

To enable the facebook log-in functionality, you first need to create a facebook authentication app, and get the supplied "App ID" and "App Secret". Here\`s a link to a quick step-by-step guide on how to do it [Facebook authentication app](http://andreisbitnev.com/2018/03/23/facebook-authentication-app/).<br>
When creating a facebook sign in app, specify the "Valid OAuth Redirect URIs" as `https://localhost:5555/auth/facebook/callback`

When you got the id and the secret from facebook, open a config.js file in the comments folder ~/blog/comments/config.js, and insert them in the auth.facebook section
```javascript
...
        facebook: {
            clientID: '12345678-asdfghjkl1234.apps.googleusercontent.com',
            clientSecret: 'asdFGHjkl1234567'
        },
```

Just recently facebook made some changes, that will only allow accessing facebook apps from secure source. This is true for all apps created from March 2018.
So if you don\`t have some old app created before the date, and you want to use facebook authentication in your blog, you\`ll need to setup a secure connection first.

## Setting up secure connection

First we need to specify the securePort in the config.js file, let\`s set it equal to 5555
```javascript
    port: 4000,
    securePort: 5555,
    database: 'main.db',

```
If you only want to serve the application with https protocol, set "port" to undefined. Otherwise your blog will be served on 2 different ports.<br>
>Tip: If you also use the google sign-in, you\`ll have to login to [https://console.developers.google.com/](https://console.developers.google.com/) and add 
`https://localhost:5555/auth/google/callback` to "Authorised redirect URIs".

You need an SSL key to start a secure server. You can create it with [OpenSSL](https://www.openssl.org/) by running
```
openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365
```
This will create a key.pem and cert.pem files, valid for the next 365 days.
>Tip: self signed keys like that are not trusted by most browsers, and users visiting your site will get a warning - "this connection is not secure". For production, you should get certificates from a trusted provider.

Now we need to specify the path to certificate files in the config.js file. If you entered a passphrase, when generating keys, it should also be specified.
```javascript
ssl: {
        key: 'key.pem',
        cert: 'cert.pem',
        passphrase: 'asdfghjkl'
},
```
>Tip: if you generated the keys from the ~/blog/comments directory, you don\`t need to change the path, it should be correct.

Now restart the server, and open [http://localhost:5555](http://localhost:5555/) in the browser. You might get a warning, that connection is not secure
<img src="/img/warning_not_safe.png"><br>
Just click "advanced" and "proceed to localhost".
<img src="/img/blog_secure.png"><br>

The main functionality is now present.

## Extending the solution

As I mentioned earlier, the goal of the project was to give the ability for other developers to extend the basic functionality to their needs. Let\`s add user pictures or avatars to each comment.<br>
Let\`s first add a new field to the comment template, where the user will specify a link to the image. Open the ~/blog/comments/templates/container.ejs file, and add a new text field to the form, just below the textarea for the comment body.
```html
...
<form onsubmit="cmt.submitComment(event);">
    <textarea name="text"></textarea>
    <input type="text" name="avatar">
    <input type="hidden" name="position" value="<% data.timestamp.toString() %>">
    <div class="cmt-buttons">
...
```
>Tip: all the css styles used in hexo-comments are stored in the same file. Each class starts with cmt- prefix, to avoid overwriting of other classes. If you want to change any styling of the comment area, this is the good place to do it.

Now let\`s add the same field to ~/blog/comments/templates/comment.js, which is a [Joi](https://github.com/hapijs/joi) schema, used to validate the body object, which is sent to the server, when user posts a new comment.

```javascript
...
position: Joi.array().items(Joi.number()).required(),
avatar: Joi.string()
```

>Tip: if you look at the schema, you can see, that some values are set to be forbidden(). Those values are not expected to be returned from the front-end, but rather be handled on the back-end. For example "name", if it was allowed to send name with the comment, some experienced user might change the name in the body of the request to whatever he wants.

Let\`s now add the image itself to the comments template ~/blog/comments/templates/comments.ejs. We will add a new div with fixed height and widht, and set a background-image as avatar. Let\`s also add a default image, that will be shown if no image is specified.
```html
...
<div class="cmt-row">
    <div style="background-image:url(<%= comment.avatar || defaults.avatar %>);" class="cmt-avatar"></div>
    <div class="cmt-default cmt-name"><%= comment.name %></div>
    <div class="cmt-default cmt-date"><%= moment(comment.timestamp).fromNow() %></div>
...
```
>Tip: defaults object holds default static values, you can add them in the config.js file

Let\`s add a default avatar image in the config.js file
```javascript
...
errorLogs: 'errors.log',
defaults: {
    name: "Guest",
    providers: [],
    avatar: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'
},
...
```
>Tip: Here I just used an absolute url to some default avatar picture, but you can save any file to the ~/blog/comments/assets directory, and then refer it as /assets/

Let\`s add a css style for cmt-avatar class to the ~/blog/comments/templates/container.ejs to style our avatar

```html
...
    .hidden {
        display: none;
    }
    .cmt-avatar {
        width: 40px;
        height: 40px;
        float: left;
        background-size: contain;
    }
...         
</style>
...
```
Now, just restart the server and open [http://localhost:5555](http://localhost:5555/) in the browser.
<img src="/img/default_avatar.png"><br>
As expected, there is an input field beneath the textarea, to input the image url. Comments which were added before, have the default avatar next to the name. Lets create a new comment, and post it with image url. I\`ll use the avatar from my blog `http://andreisbitnev.com/img/developer.jpeg`
<img src="/img/testing_avatar.png"><br>
The new comment has a new avatar image next to it.

## Conclusion
Hope you like the tool, and do leave a comment below ;) If you have any questions about [hexo-comments](https://github.com/andreisbitnev/hexo-comments), or need any help, contact me, or leave a comment here, I\`ll be glad to help you.
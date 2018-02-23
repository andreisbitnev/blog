---
layout: post
title: "Angular 5 MEAN app"
subtitle: "Setting up MEAN app with angular cli and express-generator"
date: 2018-22-02 21:54
author: "Andrei Sbitnev"
header-img: "http://localhost:4000/img/mean_code.png"
cdn: 'header-off'
tags:
	- MEAN
	- Angular 5
	- Node.js
	- Express
---

## Quick Start

To build the project you need the [angular cli](https://github.com/angular/angular-cli) and [express-generator](https://expressjs.com/en/starter/generator.html) installed on your operating system.<br>
Create a new directory <b>smart-home</b> and cd into it.

``` bash
$ mkdir smart-house && cd smart-house
```

### Start a new Angular 5 project using angular cli

``` bash
~/smart-home$ ng new fe
```

### Start a new express project using express-generator

``` bash
~/smart-home$ express be
```

### Open up the project in your favorite text editor and open the ~/smart-home/be/app.js file

We will be using the <b>be</b> app as only 

``` node
app.set('view engine', 'jade');
```



More info: [Generating](https://hexo.io/docs/generating.html)

### Deploy to remote sites

``` bash
$ hexo deploy
```

More info: [Deployment](https://hexo.io/docs/deployment.html)

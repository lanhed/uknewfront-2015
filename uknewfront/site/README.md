# Newfront 2015
The DigitasLBi UK NewFront is a collaborative thought-leadership programme aimed at stimulating creativity within the branded content marketplace. 

## Prerequisites

[Node](https://nodejs.org/)
Download and install

[Bower](http://bower.io/)
npm install -g bower

[Grunt](http://gruntjs.com/)
npm install -g grunt-cli


## Install
```
In project directory (uknewfront/site) open a terminal and type 
>bower install
```

## Develop
```
In project directory (uknewfront/site) open a terminal and type:
>grunt server
```

## Build
```
You’re done editing and ready to ship, great work! In the directory ‘dist’, open a terminal and type
>grunt dist

The server will give you something similar to this:
>Running "less:dev" (less) task
>File dev/styles/main.css created.

>Running "connect:livereload" (connect) task
>Started connect web server on :::9000.

>Running "watch" task
>Waiting...OK

Open your browser at http://localhost:9000

The project uses LESS and compiles in runtime on save through Grunt. When building the projects Javascript will be minified and concatenated.
```

###Here are two different projects:
uknewfront-email: is a html-email, it can be used as a template if anyone wants to create new html-emails or change the current.
uknewfront: the event site
The two projects uses the same routine, here described as the event site folder.

###Folder structure
dev: this is the development environment, all changes to code goes here
dist: this is where files end up when the build process is done
node_modules: the NodeJS modules used by this project is stored here. Don’t touch if you don’t know what you’re doing…

###The Project files
The project is very simple, basically it contains:

1. A HTML-file (index.html)
2. A LESS-file (styles/main.less)
3. A JavaScript-file (scripts/main.js)

On top of that we have some bootstrap styles and javascript, but don’t worry about that.

The HTML file is built up in sections, editing those sections is simple.

**To add a new speaker, scroll down to the speaker section and find these three things to edit/add**

* The speaker heads are lined up in rows with four columns in each row

* If you’re adding a new speaker, make sure you change the data-id to the next in iteration

* Next is the speaker list, kind of the same thing as the heads, but instead of images we display texts here

* Next is to add or edit the speaker content below the speaker list. Pay attention to data-speaker-id, it must be the same id you gave the data-id above

* The naming convention for speaker images is: Surename-Familyname.jpg

**The Think section is a bit easier to update or add new content to.**

* Add/edit the list of links

* Add/edit the HTML-file with the Think-person’s content. Naming convention: surenamefamilyname.html

* The naming convention for Think person's images is: Surename-Familyname-white.jpg (as it has white background instead of black)
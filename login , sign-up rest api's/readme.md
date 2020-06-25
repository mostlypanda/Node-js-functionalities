# Rest api for login-signup-viewprofile-logout

This project consist of rest API's build in node-js using express and mongo-db for doing login, signup as well as to show the profile of the user and then finally logging out the user
Here first simple sign-up route has been created, Here user have to provide his just email and password, you can change this in user schema according 
to your need, one email can be registered only once, if he tried to register again auth failed will be shown, then for logging up he has to 
provide correct credentials for login,if any of the 2 things is wrong he won't be able to login, then i am generating here a jwt token,
which will only expire when the person logged out.

---
## Requirements

For development, you will need Node.js and a node global package, Yarn, installed in your environement and many other packages also which are stated further

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

###
### Yarn installation
  After installing node, this project will need yarn too, so just run the following command.

      $ npm install -g yarn

---

    
## packages you need to install
```
  express
  mongoose
  body-parser
  cookie-parser
  bcrypt
```
for installing the above packages you have to run the below command

```
  npm install <package_name>
  
```

## Running the project

    $ yarn start

## Simple build for production

    $ yarn build

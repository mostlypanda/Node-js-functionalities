# node-js-components
Well it contains many completely defined node-js REST API's for different functionality
Upto now I have uploadedbelow functionalities

1. Session expire using nodejs
2. Rest Api's for user sign-up, login, logout and user profile using node-js, expess, mongodb along with jwt token as an authentication agent
3. OTP verification here complete form is designed and when user filled and submit the form an otp will be sent to filled email of user using nodemailer module and smtp method 
then user has to enter the received otp for further verification
4. CRUD(Create, Read, Update, Delete) API's have been successfully created, here you can create any note and then you can find it by id, author name, title as well as all, you can edit it by id name and delete it also
5. To upload an image in nodejs using multer(local storage)
---
## tutorial blogs
In this series I have also written the tutorial blogs-
* My first blog is about developing CRUD api's 
( [My blog url ](https://medium.com/@sarthakmittal1461/to-make-restful-crud-apis-with-node-js-express-and-mongodb-5e76a7d2d8fe) )

## you will find more stay tuned with my medium.com profile

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


# to run any above utility or api
clone the above repository by using 
```
git clone "Repo_name"
```
then
```
cd (name of the folder you want to go)
```
and finally
```
npm install
```

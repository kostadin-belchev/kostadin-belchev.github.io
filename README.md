# E-Shop

E-shop is the easy to use new and second-hand market for developers. It lets you register easily. The platform allows you to publish products and add items to your cart. It also includes an Admin Panel where you can see what people are buying at the moment.

Documentation from creator:
- [Table of Contents From Creator of the App](#table-of-contents-from-creator-of-the-app)

General documentation for Angular:
- [E-Shop](#EShop)

## Table of Contents From Creator of the App

- [Getting Started](#getting-started)
- [Purpose](#purpose)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Installing](#installing)
- [Deployment](#deployment)
- [Built With](#built-with)
- [Contributing](#contributing)
- [Versioning](#versioning)
- [Authors](#authors)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Getting Started

  <strong>App is already depleyed to Github, to visit it go to the link below:</strong>
  <br/>
  <strong>[E-Shop](https://kostadin-belchev.github.io/)</strong>

  The rest of these instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Purpose
  E-shop is the easy to use new and second-hand market for developers. It tries its best to replace OLX.bg. This is Angular Fundamentals Project Assignment from SoftUni course.

## Architecture
  Poject consists of src folder where the main index.html file is found and from where all starts, then it is devided in sub-folders in the app main folder.
  API calls are concentrated in services folder, however since project is feature structured, API calls can be found in auth folder and in product folder as well.
  Futher devision goes by features: admin-panel, interceptors(where we attach the tokens to the HTTP requests), navigation(which stays permanently on top), products and services.
  Under product we have all the necessities for the feature to function like: listing, creating, editing, models, helper functions for displaying and the product service.
  We use bootstrap for styling which is incorporated in assets folder.

### Prerequisites

You will need to install the following software reading through the instructions on the official website of Node.js:
[Node.js](https://nodejs.org/en/)

### Installing

Once you have Node.js prerequisite installed. 
1. Download the source code navigate to the folder where the files are located
2. Open a CMD window there
3. Install all needed packages
```
npm install
```

## Deployment

Once install is complete start the project with the following command:
```
ng serve
```

## Built With

* [Angular](https://angular.io/) - Front End
* [Firebase](https://firebase.google.com/) - Back End Services
* [Bootstrap](https://getbootstrap.com/) - Responsive Design
* [Github](https://github.com/) - Deployment

## Contributing

Please read [CONTRIBUTING.md](https://github.com/kostadin-belchev/E-Shop/blob/master/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/kostadin-belchev/E-Shop/tags). 

## Authors

* **Kostadin Belchev** - *Initial work* - [Kostadin Belchev](https://github.com/kostadin-belchev)

See also the list of [contributors](https://github.com/kostadin-belchev/E-Shop/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Bootstrap
* W3Schools

# EShop

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

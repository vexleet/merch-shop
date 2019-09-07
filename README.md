# merch-shop

Merch-shop is an online shop where users can order different clothes.

## Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 
See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Things you need to install and run the project:

1. [NodeJS](https://nodejs.org/en/)
2. [Angular](https://angular.io)
3. [MongoDB](https://www.mongodb.com)

### Setup Environment Variables to Manage Your API Key

- Windows
1. Run CMD as administrator

```cmd
setx SENDGRID_API_KEY "YOUR_API_KEY"
setx PAYPAL_API_KEY "YOUR_API_KEY"
setx STRIPE_API_KEY "YOUR_API_KEY"
```

- Unix systems
1. Open terminal

```shell
export SENDGRID_API_KEY='YOUR_API_KEY'
export PAYPAL_API_KEY='YOUR_API_KEY'
export STRIPE_API_KEY='YOUR_API_KEY'
```

### Setup

Follow these instructions to run the site on your local machine.

- Client:
```shell
$ cd client
$ npm install
$ ng serve
```

- Server:
```shell
$ cd server
$ npm install
$ nodemon index
```

## Built With

- [NodeJS](https://nodejs.org/en/) - Back-end
- [Angular](https://angular.io) - Front-end
- [MongoDB](https://www.mongodb.com) - Database
- [PayPal](https://developer.paypal.com) - Checkout with PayPal
- [Stripe](https://stripe.com) - Checkout with credit cards
- [SendGrid](https://sendgrid.com) - Used for sending emails

## License

This project is licensed under the MIT License - see the LICENSE.md file for details

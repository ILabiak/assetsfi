<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/ILabiak/assetsfi">
    <img src="/client/public/logo.svg" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">AssetsFi</h3>

  <p align="center">
    Track your financial investments
    <br />
    <a href="https://assetsfi.online/">View Demo</a>
  </p>
</div>



<!-- ABOUT THE PROJECT -->
## About The Project

[![AssetsFi Screen Shot](https://i.ibb.co/q1M9GMp/SCR-20240513-krzu.png)](https://assetsfi.online/)


AssetsFi is a web application that helps users track their financial assets and get useful statistics about their portfolios, profits and losses. It currently supports more than 200 cryptocurrencies. 

The website is free to use for all of the users. It supports 3 main portolio currencies: the US dollar, the Euro and the Ukrainian hryvnia (UAH)

There is also integration with Binance Spot wallet which allows user to get statistics about their exchange balance and buy/sell cryptocurrencies (currently works with USDT pairs)


### Built With

##### Frameworks/libraries used to develop that project:

* [![Next](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
* [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
* [![Material UI](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white)](https://mui.com/material-ui/)
* [![Sequelize](https://img.shields.io/badge/sequelize-323330?style=for-the-badge&logo=sequelize&logoColor=blue)](https://sequelize.org/)
* [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
* [![Fastify](https://img.shields.io/badge/-Fastify-000000?style=flat&logo=fastify&logoColor=white)](https://fastify.dev/)


<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer.
### Installation

From your command line:

1. Clone GitHub repository and install dependencies
```bash
# Clone this repository
$ git clone https://github.com/ILabiak/assetsfi.git

# Go into the repository
$ cd assetsfi

# Install dependencies
$ cd client && npm install
$ cd ..
$ cd server && npm install
```
2. Enter environment details in client and server folders into .env files. This includes API keys, Auth0 creditals and RSA keys.

3. Start server
```bash
$ cd server && npm start
```
4. Start client
```bash
$ cd client && npm run build
# Start client
$ npm run start
```

<!-- ROADMAP -->
## Roadmap

- [x] Add features to add, delete, update portfolios
- [x] Add features to add, delete, update transactions
- [x] Add integration with Binance API
- [x] Add donations page
- [ ] Add responsive design
- [ ] Add feature to share portfolios
- [ ] Add stocks and ETFs support for portfolios
- [ ] Multi-language Support
    - [x] English
    - [ ] Ukrainian

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

---

> [AssetsFi](https://assetsfi.online/)
> GitHub [@ILabiak](https://github.com/ILabiak)
> LinkedIn [@ilabiak](https://www.linkedin.com/in/ilabiak/)

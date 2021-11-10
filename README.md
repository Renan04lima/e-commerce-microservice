<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">

  <h1 align="center">ECOMMERCE MICROSERVICE</h1>

  <p align="center">
    <img alt="License" src="https://img.shields.io/static/v1?label=license&message=MIT&color=8257E5&labelColor=000000">
    <img src="https://img.shields.io/static/v1?label=ECOMMERCE&message=MICROSERVICE&color=8257E5&labelColor=000000" alt="ECOMMERCE MICROSERVICE" />
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#checklist-features">Checklist Features</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
This project simulates a simple e-commerce microservice, using Kafka to carry out the communication between the order, payment, and billing services

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

- [Serverless Framework](https://www.serverless.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [AWS Cognito](https://aws.amazon.com/pt/cognito/)
- [TypeScript](https://www.typescriptlang.org/)
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [KafkaJS](https://kafka.js.org/)
- [Express](https://expressjs.com/pt-br/)

<p align="right">(<a href="#top">back to top</a>)</p>

 ### Checklist Features

- Version 1.0.0
    - [x] Should have a microservice responsible for orders
    - [x] Should have a microservice responsible for payment
    - [x] Should have a microservice responsible for billing
    - [x] Microservices must communicate using Apache Kafka

- Version 1.1.0
    - [x] Should have a microservice responsible for authentication
    - [x] Should be possible register a user using AWS Cognito 
    - [x] Should be possible to do login using AWS Cognito 

<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.



### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* docker and docker compose
* NPM



### Installation

1. Clone the repo
  ```sh
   git clone https://github.com/Renan04lima/e-commerce-microservice-kafka.git
  ```
2. Run containers
  ```sh
   docker-compose up -d
  ```
3. Create topics `RECEIVE_ORDER`, `PAID_ORDER` and `BILLED_ORDER`
  ```sh
   docker-compose exec kafka bash
   usr/bin/kafka-topics --create --topic <name_of_topic> --bootstrap-server localhost:9092
  ```

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

1. Start each microservice `order`, `payment` and `billing`, run on different terminal session
  ```sh
   cd <microservice_folder>
   node src/index.js
  ```
2. Send request
  ```sh
    curl --request POST \
      --url http://localhost:3001/orders \
      --header 'Content-Type: application/json' \
      --data '{
      "price": 39.99,
      "product": "book"
    }'
  ```
3. To see each topic consumer event of `RECEIVE_ORDER`, `PAID_ORDER` and `BILLED_ORDER`, run on different terminal session
  ```sh
   docker-compose exec kafka bash
   usr/bin/kafka-console-consumer --topic <name_of_topic> --from-beginning --bootstrap-server localhost:9092
  ```

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
**Don't forget to give the project a star!** Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License.
<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

[![Gmail Badge](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](https://mail.google.com/mail/?view=cm&fs=1&to=renan04lima@gmail.com&su=Contact)


[![Linkedin Badge](https://img.shields.io/badge/-LinkedIn-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/dev-renan)](https://www.linkedin.com/in/dev-renan)

<p align="right">(<a href="#top">back to top</a>)</p>
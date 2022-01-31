# ASE Delivery Service

We have implemented a pick-up station (aka. pack station) delivery service as part of the Advanced Software Engineering term project.

_In this system, each customer who orders items is assigned a box at a pick-up station. The service then
delivers the items from a central depot to the customer’s box at the pick-up stations.
There are three user roles in ASE Delivery: dispatchers, deliverers, and customers. Dispatchers are responsible for the management of pick-up boxes and deliveries. Deliverers transport deliveries to the pick-up
box assigned to a customer. Finally, Customers collect their delivery from their box. To verify if a deliverer
or customer can unlock a box, each deliverer and customer is given an RFID tag for identification. Each
pick-up box has an RFID scanner to read the RFID tag from a deliverer or customer and determine if they
are authorized to unlock the box. The Customers are informed when their delivery is created, delivered, or
picked up successfully_


## Getting Started 
1. We used Spring Cloud Netflix **Eureka** as a discovery server, **Spring Cloud Gateway** to build an API gateway, **FeignClient** for inter-service communication and Config Server for all configurations.
2. Maven is used for comprehension tool in order to manage backend project.
3. Whole system is dockerized and docker file is located in doc folder


### Usage
The best way to run the whole system (both front-end and backend) is with IDEs or by using Docker.
If you want to run the backend in your local, you need to have Maven and JDK11+.  If you run it on the local, then you should follow order below:
1- Run Config Server and compose the docker-compose.yml file in doc folder
2- Run Eureka and Gateway Server and Auth Service
3- From now on you can run any other services.

If you want to run the whole system in docker:
1- Build root module to create all .jar files
2- Go to docs folder
3- Run the command: docker-compose deployment-docker-compose up -d
4- The config container must be run first, as the config service has all the required configuration. Then database and Eureka-server containers should be run.
5- All remaining containers can be run together after completing the previous step.

## Architecture

Our system consists of the following modules:
- **config-server** - This module uses Spring Cloud Config Server to store all configurations in backend system.
- **gateway-server** - Spring Cloud Gateway acts as a gateway in out system.
- **discovery-server** - We use Netflix Eureka as a  discovery server.
- **user-service** - This module allows to perform CRUD operation and other business-realated ops on user database
- **auth-service** - This module is responsible from the security of the system.
- **box-service**  - This module allows to perform CRUD operation and other business-realated ops on box collection
- **delivery-service** - This module allows to perform CRUD operation and other business-realated ops on delivery collection
- **notification-service** - It is implemented to send e-mails to customers
- **service-communication** - This FeignClient module is created to provide communication between microservices. 

 Following image illustrates the basic architecture of the whole system

<img src="https://postimg.cc/wyXX13KC"><br/>

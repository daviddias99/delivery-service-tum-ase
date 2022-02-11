# ASE Delivery backend

## Getting Started 
1. We used Spring Cloud Netflix **Eureka** as a discovery server, **Spring Cloud Gateway** to build an API gateway, **FeignClient** for inter-service communication and Config Server for all configurations.
2. **Maven** is used for compilation and dependency management tool in order to manage backend project.


## Usage
You can run the backend either manually, or using Docker (explained on the `README` on the project's root). What follow's are the steps to run the backend manually. If your IDE can start services, please skip to step 3. (instructions assumed the current working directory is `backend`, unless stated otherwise)

1. Compile and package the backend by running `mvn package`
2. Run services by running `java -jar target/JAR-NAME.jar` in each service, (`JAR-NAME` represents the name of the jar for that service)
3. Services should be started in the following order
   1. config-server
   2. eureka-server | database (see root `README`)
   3. auth-service | box-service | delivery-service | notification-service | user-service
   4. gateway-server

## Configuring services using environment variables

`CONFIG_SERVER_URL` - url of the configuration server (default: `http://localhost:8888`)
`SERVER_PORT` - configuration server port (default: `8888`)
`EUREKA_SERVER_HOSTNAME` - hostname for Eureka server (default: `localhost`)
`EUREKA_SERVER_URL` - url for eureka server default zone (default: `http://localhost:8500/eureka/`)
`SPRING_DATA_MONGODB_HOST` - Mongodb host (default: `localhost`)
`SPRING_DATA_MONGODB_PORT` - Mongodb port (default: `227017`)
`FRONTEND_URL` - url of frontend application (default: `http://localhost:3000`)


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

<img src="https://i.postimg.cc/4dMBFhWx/Microservices-Diagram-Page-2-1.jpg"><br/>
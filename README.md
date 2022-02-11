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


## Information

The system follows a microservice architecture, and it's C4 container diagrams can be found in `contribution/`. We can split the system into frontend, backend and device.

Information on the contribution of each team member can be found in the `contribution.pdf` file under the `contribution` folder.

## Description

The device code, is located in a different repository. Please visit this [link](https://gitlab.lrz.de/ase-21-22/team-20/ase-box) for information on how to run the box code. 

The frontend code (user interface) is located in the `frontend` directory. Instructions on how to compile and run it manually can be found in the `README` file on the `frontend` directory.

The backend code (microservices) can be found in the `backend` direcotry. Instructions on how to compile and run it manually can be found in the `README` file on the `backend` directory

The `docs` directory contains docker-compose files as well as database seeds.

## Running the database

To start only the database (for example, for local development), run the `docker-compose up` command on the `docs` folder.

## Running the project using docker

1. Ensure that the `.env` file in `frontend` is configured with the correct backend URL
2. Package the backend services by running `mvn package` on the `backend` directory
3. Build containers by running the `docker-compose -f deployment-docker-compose.yml build` command
4. Run system by issuing the following commands* (wait for services to boot before issuing next command) in the `docs` directory:
   1. `docker-compose -f deployment-docker-compose.yml up ase-mongo-server`
   2. `docker-compose -f deployment-docker-compose.yml up ase-config-server`
   3. `docker-compose -f deployment-docker-compose.yml up ase-eureka-server`
   4. `docker-compose -f deployment-docker-compose.yml up ase-delivery-service` (this will turn on all other services because we purposefuly made this one depend on all others)
   5. `docker-compose -f deployment-docker-compose.yml up ase-frontend`
5. Access frontend application in `http://localhost:3000`
6. The database can be seeded using the seeds in `docs/seeds`. Ex: `mongoimport --db mongo-ase-db --collection delivery --drop --jsonArray --file ./delivery_seed.json`. The database names are `mongo-ase-db` and `mongo-ase-user`, the collections are `delivery`, `boxes` and `users`

Note that environment variables can also be configured in the docker-compose files.

*Usually a `docker-compose up` command is enough, however, since services have a certain order of boot up, we can't ensure it using only the  `depends_on` clause. This is because docker compose only checks for container startup, and not if the spring boot service is fully loaded.
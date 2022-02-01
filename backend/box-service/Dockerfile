FROM openjdk:11
EXPOSE 8080
ENV SPRING_DATA_MONGODB_HOST=ase-mongo-server
ENV SPRING_DATA_MONGODB_PORT=27017
ADD target/box-service-1.0-SNAPSHOT.jar box-service-1.0-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","/box-service-1.0-SNAPSHOT.jar"]
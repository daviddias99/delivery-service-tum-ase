FROM openjdk:11
EXPOSE 8080
ENV SPRING_DATA_MONGODB_HOST=ase-mongo-server
ENV SPRING_DATA_MONGODB_PORT=27017
ADD target/auth-service-1.0-SNAPSHOT.jar auth-service-1.0-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","/auth-service-1.0-SNAPSHOT.jar"]
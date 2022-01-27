FROM openjdk:11
EXPOSE 8888
ENV SPRING_DATA_MONGODB_HOST=ase-mongo-server
ENV SPRING_DATA_MONGODB_PORT=27017
ADD target/config-server-1.0-SNAPSHOT.jar config-server-1.0-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","/config-server-1.0-SNAPSHOT.jar"]
FROM openjdk:11
EXPOSE 8088
ADD target/gateway-server-1.0-SNAPSHOT.jar gateway-server-1.0-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","/gateway-server-1.0-SNAPSHOT.jar"]
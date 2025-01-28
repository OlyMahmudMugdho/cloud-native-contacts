# Build stage
FROM maven:3.9.5-eclipse-temurin-21-alpine AS builder

WORKDIR /app

# Copy pom.xml and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy source code
COPY src ./src

# Build the application
RUN mvn clean package -DskipTests

# Production stage
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Create directory for file uploads
RUN mkdir -p /app/uploads && chmod 777 /app/uploads

# Copy the built JAR file
COPY --from=builder /app/target/*.jar app.jar

# Expose port
EXPOSE 8080

# Set the uploads directory as a volume
VOLUME ["/app/uploads"]

# Start the application
ENTRYPOINT ["java", "-jar", "app.jar"] 
# Using Alpine for a minimal security footprint and reduced image size.
FROM node:18-alpine

# Define the internal application directory
WORKDIR /app

# This prevents re-installing modules if only source code changes.
COPY package*.json ./

# 4. Install production dependencies
RUN npm install

# 5. Copy the rest of application code
COPY . .

# 6. Expose the port where Express server is running on
EXPOSE 5000

# 7. Start the application
CMD node seeder.js && node server.js
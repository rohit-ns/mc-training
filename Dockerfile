# Use latest node version 8.x
FROM node:10.13.0-slim

RUN npm install -g pm2
# create app directory in container
RUN mkdir -p /app

# set /app directory as default working directory
WORKDIR /app

# RUN npm install # For dev dependencies
RUN npm install --only=production

# copy all file from current dir to /app in container
COPY . /app/

# expose port 5000
ENV PORT 5000
EXPOSE 5000

# cmd to start service
CMD [ "npm", "run", "startup" ]

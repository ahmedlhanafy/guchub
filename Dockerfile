# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR ./app


# add app
COPY . ./

# install app dependencies
RUN yarn --silent

# start app
CMD ["npm", "start"]
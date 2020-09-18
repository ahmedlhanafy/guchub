# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR ./app


# add app
COPY . ./

# install app dependencies
RUN yarn 
RUN yarn web:build

# start app
CMD ["yarn", "web:serve"]
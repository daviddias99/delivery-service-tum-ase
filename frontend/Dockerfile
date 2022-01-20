# pull official base image
FROM node:16-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn

# add app
COPY . ./

# build app
RUN yarn build


FROM nginx:1.19.3-alpine

# copy build files to nginx/html
COPY --from=0 /app/build /usr/share/nginx/html
# copy configuration to default one
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
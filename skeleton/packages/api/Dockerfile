FROM node:15

# ENV PORT 8080
# ENV HOST "0.0.0.0"
# ENV DB_HOST "localhost"
# ENV DB_PORT "3306"
# ENV DB_USERNAME "admin"
# ENV DB_PASSWORD "AlienPassword123"
# ENV DB_NAME "mysqltst"

WORKDIR /app
COPY . ./
RUN yarn
CMD [ "node", "index.js" ]
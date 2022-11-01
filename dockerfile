FROM node:16-alpine AS runner
WORKDIR /app

COPY . /app/
RUN npm i
RUN npm run build

EXPOSE 3000

ENV PORT 3000

CMD ["./start.sh"]
CMD ["node", "loop"]
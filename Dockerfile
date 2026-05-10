FROM stoplight/prism:4

WORKDIR /contracts

COPY . .

EXPOSE 4010

CMD ["mock", "-h", "0.0.0.0", "src/openapi.yaml", "--errors"]

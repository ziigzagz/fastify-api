// Require the framework and instantiate it
const Fastify = require("fastify");
const FastifySwaager = require("@fastify/swagger");
const port = 3000;
const fastifyApp = Fastify({
  logger: true,
});

fastifyApp.register(FastifySwaager, {
  routePrefix: "/documentation",
  swagger: {
    info: {
      title: "Test swagger",
      description: "Testing the Fastify swagger API",
      version: "0.1.0",
    },
  },

  exposeRoute: true,
});

fastifyApp.put(
  "/some-route/:id",
  {
    schema: {
      
      body: {
        type: "object",
        properties: {
          hello: { type: "string" },
        },
      },
      response: {
        201: {
          description: "Successful response",
          type: "object",
          properties: {
            hello: { type: "string" },
          },
        },
        default: {
          description: "Default response",
          type: "object",
          properties: {
            foo: { type: "string" },
          },
        },
      },
    },
  },
  (req, reply) => {
    reply.send({ hello: "world" });
  }
);
const userRoute = {
  method: "POST",
  url: "/users",
  schema: {
    body: {
      username: { type: "string" },
      password: { type: "string" },
    },
    response: {
      200: {
        type: "object",
        properties: {
          userId: { type: "string" },
          username: { type: "string" },
        },
      },
    },
  },
  handler: async (request, reply) => {
    console.log(request.body);
    const requestBody = {
      ...request.body,
      mergeObject: true,
    };
    reply.send({
      ...requestBody,
      userId: "123",
    });
  },
};

fastifyApp.route(userRoute);
// Run the server!
fastifyApp.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
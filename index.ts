import fastify from "fastify";
import cors from "@fastify/cors";
import roomRoute from "./routes/room.route";
import groupRoute from "./routes/group.route";
import instructorRoute from "./routes/instructor.route";

const server = fastify({
  ajv: {
    customOptions: {
      allErrors: true,
      removeAdditional: true,
    },
  },
});

server.setErrorHandler((error, request, reply) => {
  console.log(error);

  if (error.validation) {
    return reply.status(error.statusCode!).send({
      result: "error",
      errors: error.validation.map((obj) => {
        return {
          schema: obj.keyword == "required"
            ? obj.instancePath.concat("/")
            : obj.instancePath,
          context: error.validationContext,
          params: obj.params,
          message: obj.message,
        };
      }),
    });
  }

  return reply.status(500).send({
    result: "error",
    errors: [{
      type: "internal_server_error",
      message: "unknown error.",
    }],
  });
});

server.register(cors);
server.register(roomRoute);
server.register(groupRoute);
server.register(instructorRoute);

const start = async () => {
  await server.listen({ host: "0.0.0.0", port: 3000 }).then(() => {
    console.log("App started.");
  }).catch((e) => {
    console.log(e);
    process.exit(1);
  });
};

start();

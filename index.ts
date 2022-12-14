import Fastify from "fastify";
import Ajv from "ajv";
import cors from "@fastify/cors";
import roomRoute from "./routes/room.route";
import groupRoute from "./routes/group.route";
import instructorRoute from "./routes/instructor.route";
import sectionRoute from "./routes/section.route";
import subjectRoute from "./routes/subject.route";
import buildingRoute from "./routes/building.route";

const server = Fastify();

const schemaCompilers: Record<string, Ajv> = {
  body: new Ajv({
    removeAdditional: true,
    coerceTypes: false,
    allErrors: true,
  }),
  params: new Ajv({
    removeAdditional: false,
    coerceTypes: true,
    allErrors: true,
  }),
  querystring: new Ajv({
    removeAdditional: false,
    coerceTypes: true,
    allErrors: true,
    useDefaults: true,
  }),
  headers: new Ajv({
    removeAdditional: false,
    coerceTypes: true,
    allErrors: true
  })
};

server.setValidatorCompiler((req) => {
  if (!req.httpPart) throw new Error("Missing httpPart");
  const compiler = schemaCompilers[req.httpPart];
  if (!compiler) throw new Error(`Missing compiler for ${req.httpPart}`);

  return compiler.compile(req.schema);
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
server.register(subjectRoute);
server.register(instructorRoute);
server.register(sectionRoute);
server.register(buildingRoute);

const start = async () => {
  await server.listen({ host: "0.0.0.0", port: 3000 }).then(() => {
    console.log("App started.");
  }).catch((e) => {
    console.log(e);
    process.exit(1);
  });
};

start();

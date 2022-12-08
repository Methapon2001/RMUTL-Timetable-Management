import { FastifyInstance } from "fastify";
import {
  createInstructor,
  deleteInstructor,
  requestInstructor,
  updateInstructor,
} from "../services/instructor.service";

export default async (server: FastifyInstance) => {
  server.post("/api/instructor", {
    handler: createInstructor,
    schema: {
      body: {
        type: "object",
        required: ["name"],
        properties: {
          name: { type: "string" },
        },
      },
    },
  });

  server.get("/api/instructor", {
    handler: requestInstructor,
    schema: {
      querystring: {
        type: "object",
        properties: {
          limit: { type: "number", default: 20 },
          offset: { type: "number", default: 0 },
        },
      },
    },
  });

  server.get("/api/instructor/:id", {
    handler: requestInstructor,
    schema: {
      params: {
        type: "object",
        properties: {
          id: { type: "number", minimum: 1 },
        },
      },
    },
  });

  server.put("/api/instructor/:id", {
    handler: updateInstructor,
    schema: {
      params: {
        type: "object",
        properties: {
          id: { type: "number", minimum: 1 },
        },
      },
      body: {
        type: "object",
        properties: {
          name: { type: "string" },
        },
        additionalProperties: false,
      },
    },
  });

  server.delete("/api/instructor/:id", {
    handler: deleteInstructor,
    schema: {
      params: {
        type: "object",
        properties: {
          id: { type: "number", minimum: 1 },
        },
      },
    },
  });
};

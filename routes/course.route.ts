import { FastifyInstance } from "fastify";
import {
  createCourse,
  deleteCourse,
  requestCourse,
  updateCourse,
} from "../services/course.service";

export default async (server: FastifyInstance) => {
  server.post("/api/course", {
    handler: createCourse,
    schema: {
      body: {
        type: "object",
        required: ["name", "subjectId"],
        properties: {
          name: { type: "string" },
          subjectId: {
            type: "array",
            minItems: 1,
            maxItems: 20,
            items: {
              type: "number",
            },
          },
        },
      },
    },
  });

  server.get("/api/course", {
    handler: requestCourse,
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

  server.get("/api/course/:id", {
    handler: requestCourse,
    schema: {
      params: {
        type: "object",
        properties: {
          id: { type: "number", minimum: 1 },
        },
      },
    },
  });

  server.put("/api/course/:id", {
    handler: updateCourse,
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
          subjectId: {
            type: "array",
            minItems: 1,
            maxItems: 20,
            items: {
              type: "number",
            },
          },
        },
      },
    },
  });

  server.delete("/api/course/:id", {
    handler: deleteCourse,
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

import { FastifyInstance } from "fastify";
import {
  createSubject,
  deleteSubject,
  requestSubject,
  updateSubject,
} from "../services/subject.service";

export default async (server: FastifyInstance) => {
  server.post("/api/subject", {
    handler: createSubject,
    schema: {
      body: {
        type: "object",
        required: [
          "code",
          "name",
          "credit",
          "lecture",
          "lab",
          "exam",
          "type",
          "category",
        ],
        properties: {
          code: { type: "string" },
          name: { type: "string" },
          credit: { type: "number", minimum: 1 },
          lecture: { type: "number", minimum: 0 },
          lab: { type: "number", minimum: 0 },
          exam: { type: "number", minimum: 0 },
          type: { type: "string", enum: ["compulsory", "elective"] },
          category: { type: "string", enum: ["internal", "external"] },
        },
      },
    },
  });

  server.get("/api/subject", {
    handler: requestSubject,
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

  server.get("/api/subject/:id", {
    handler: requestSubject,
    schema: {
      params: {
        type: "object",
        properties: {
          id: { type: "number", minimum: 1 },
        },
      },
    },
  });

  server.put("/api/subject/:id", {
    handler: updateSubject,
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
          code: { type: "string" },
          name: { type: "string" },
          credit: { type: "number", minimum: 1 },
          lecture: { type: "number", minimum: 0 },
          lab: { type: "number", minimum: 0 },
          exam: { type: "number", minimum: 0 },
          type: { type: "string", enum: ["compulsory", "elective"] },
          category: { type: "string", enum: ["internal", "external"] },
        },
        additionalProperties: false,
      },
    },
  });

  server.delete("/api/subject/:id", {
    handler: deleteSubject,
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

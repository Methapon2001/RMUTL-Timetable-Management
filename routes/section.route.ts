import { FastifyInstance } from "fastify";
import {
  createSection,
  deleteSection,
  requestSection,
  updateSection,
} from "../services/section.service";

export default async (server: FastifyInstance) => {
  server.post("/api/section", {
    handler: createSection,
    schema: {
      body: {
        type: "object",
        required: ["subjectId", "sections"],
        properties: {
          subjectId: { type: "number" },
          groupId: { type: "number", nullable: true, default: null },
          sections: {
            type: "array",
            minItems: 1,
            maxItems: 20,
            items: {
              type: "object",
              required: ["type", "roomId", "instructorId"],
              properties: {
                type: { type: "string", enum: ["lecture", "lab"] },
                roomId: { type: "number", nullable: true, default: null },
                instructorId: {
                  type: "array",
                  minItems: 1,
                  maxItems: 20,
                  nullable: true,
                  default: null,
                  items: {
                    type: "number",
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  server.get("/api/section", {
    handler: requestSection,
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

  server.put("/api/section/:id", {
    handler: updateSection,
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
          no: { type: "number", minimum: 1 },
          subjectId: { type: "number", minimum: 1 },
          roomId: { type: "number", minimum: 1 },
          groupId: { type: "number", minimum: 1 },
        },
        additionalProperties: false,
      },
    },
  });

  server.delete("/api/section/:id", {
    handler: deleteSection,
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

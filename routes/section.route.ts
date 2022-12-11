import { FastifyInstance } from "fastify";
import { createSection, requestSection } from "../services/section.service";

export default async (server: FastifyInstance) => {
  server.post("/api/section", {
    handler: createSection,
    schema: {
      body: {
        type: "object",
        required: ["subjectId", "sections"],
        properties: {
          subjectId: { type: "number" },
          sections: {
            type: "array",
            minItems: 1,
            maxItems: 20,
            items: {
              type: "object",
              required: ["type", "roomId", "groupId", "instructorId"],
              properties: {
                type: { type: "string", enum: ["lecture", "lab"] },
                roomId: { type: "number", nullable: true, default: null },
                groupId: { type: "number", nullable: true, default: null },
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
};
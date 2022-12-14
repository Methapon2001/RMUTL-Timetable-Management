import { FastifyInstance } from "fastify";
import {
  createBuilding,
  deleteBuilding,
  requestBuilding,
  updateBuilding,
} from "../services/building.service";

export default async (server: FastifyInstance) => {
  server.post("/api/building", {
    handler: createBuilding,
    schema: {
      body: {
        type: "object",
        required: ["name", "code"],
        properties: {
          name: { type: "string" },
          code: { type: "string" },
        },
      },
    },
  });

  server.get("/api/building", {
    handler: requestBuilding,
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

  server.get("/api/building/:id", {
    handler: requestBuilding,
    schema: {
      params: {
        type: "object",
        properties: {
          id: { type: "number", minimum: 1 },
        },
      },
    },
  });

  server.put("/api/building/:id", {
    handler: updateBuilding,
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
          code: { type: "string" },
        },
        additionalProperties: false,
      },
    },
  });

  server.delete("/api/building/:id", {
    handler: deleteBuilding,
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

import { FastifyInstance } from "fastify";
import {
  createRoom,
  deleteRoom,
  requestRoom,
  updateRoom,
} from "../services/room.service";

export default async (server: FastifyInstance) => {
  server.post("/api/room", {
    handler: createRoom,
    schema: {
      body: {
        type: "object",
        required: ["name", "type", "buildingId"],
        properties: {
          name: { type: "string" },
          type: { type: "string", enum: ["lecture", "lab", "both"] },
          buildingId: { type: "number" },
        },
      },
    },
  });

  server.get("/api/room", {
    handler: requestRoom,
    schema: {
      querystring: {
        type: "object",
        properties: {
          name: { type: "string" },
          limit: { type: "number", default: 20 },
          offset: { type: "number", default: 0 },
        },
      },
    },
  });

  server.get("/api/room/:id", {
    handler: requestRoom,
    schema: {
      params: {
        type: "object",
        properties: {
          id: { type: "number", minimum: 1 },
        },
      },
    },
  });

  server.put("/api/room/:id", {
    handler: updateRoom,
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
          type: { type: "string", enum: ["lecture", "lab", "both"] },
          buildingId: { type: "number" },
        },
        additionalProperties: false,
      },
    },
  });

  server.delete("/api/room/:id", {
    handler: deleteRoom,
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

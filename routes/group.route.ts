import { FastifyInstance } from "fastify";
import {
  createGroup,
  deleteGroup,
  requestGroup,
  updateGroup,
} from "../services/group.service";

export default async (server: FastifyInstance) => {
  server.post("/api/group", {
    handler: createGroup,
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

  server.get("/api/group", {
    handler: requestGroup,
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

  server.get("/api/group/:id", {
    handler: requestGroup,
    schema: {
      params: {
        type: "object",
        properties: {
          id: { type: "number", minimum: 1 },
        },
      },
    },
  });

  server.put("/api/group/:id", {
    handler: updateGroup,
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
      },
    },
  });

  server.delete("/api/group/:id", {
    handler: deleteGroup,
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

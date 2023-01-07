import { FastifyInstance } from "fastify";
import {
  createTimetable,
  deleteTimetable,
  requestTimetable,
  updateTimetable,
} from "../services/timetable.service";

export default async (server: FastifyInstance) => {
  server.post("/api/timetable", {
    handler: createTimetable,
    schema: {
      body: {
        type: "object",
        required: ["weekday", "start", "end", "sectionId"],
        properties: {
          weekday: {
            type: "string",
            enum: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
          },
          start: { type: "number", minimum: 1, maximum: 25 },
          end: { type: "number", minimum: 1, maximum: 25 },
          sectionId: { type: "number" },
        },
      },
    },
  });

  server.get("/api/timetable", {
    handler: requestTimetable,
    schema: {
      querystring: {
        type: "object",
        properties: {
          weekday: {
            type: "string",
            enum: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
          },
          start: { type: "number", minimum: 1, maximum: 25 },
          end: { type: "number", minimum: 1, maximum: 25 },
          sectionId: { type: "number" },
          limit: { type: "number", default: 20 },
          offset: { type: "number", default: 0 },
        },
      },
    },
  });

  server.get("/api/timetable/:id", {
    handler: requestTimetable,
    schema: {
      params: {
        type: "object",
        properties: {
          id: { type: "number", minimum: 1 },
        },
      },
    },
  });

  server.put("/api/timetable/:id", {
    handler: updateTimetable,
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
          weekday: {
            type: "string",
            enum: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
          },
          start: { type: "number", minimum: 1, maximum: 25 },
          end: { type: "number", minimum: 1, maximum: 25 },
          sectionId: { type: "number" },
        },
        additionalProperties: false,
      },
    },
  });

  server.delete("/api/timetable/:id", {
    handler: deleteTimetable,
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

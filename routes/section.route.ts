import { FastifyInstance } from "fastify";
import { createSection, requestSection } from "../services/section.service";

export default async (server: FastifyInstance) => {
  server.post("/api/section", {
    handler: createSection,
  });

  server.get("/api/section", {
    handler: requestSection,
  });
};

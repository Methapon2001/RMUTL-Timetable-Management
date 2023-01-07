import { PrismaClient, Timetable } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";

const prisma = new PrismaClient();

type Query = {
  limit: number;
  offset: number;
} & Timetable;

type Param = {
  id: number;
};

export async function createTimetable(
  req: FastifyRequest<{ Body: Timetable }>,
  res: FastifyReply,
) {
  const timetable = await prisma.timetable.create({
    data: { ...req.body },
    include: {
      section: true,
    },
  });

  return res.status(200).send({
    result: "ok",
    data: timetable,
  });
}

export async function requestTimetable(
  req: FastifyRequest<{ Params: Param; Querystring: Query }>,
  res: FastifyReply,
) {
  const { id } = req.params;
  const { weekday, start, end, sectionId, limit, offset } = req.query;

  const timetable = id
    ? await prisma.timetable.findFirst({
      where: {
        id: id,
      },
      include: {
        section: true,
      },
    })
    : await prisma.timetable.findMany({
      where: {
        weekday: weekday,
        start: {
          gte: start,
        },
        end: {
          lte: end,
        },
        sectionId: sectionId,
      },
      skip: offset,
      take: limit,
      include: {
        section: true,
      },
    });

  const count = id ? null : await prisma.timetable.count({
    where: {
      weekday: weekday,
      start: {
        gte: start,
      },
      end: {
        lte: end,
      },
      sectionId: sectionId,
    },
  });

  return res.status(200).send({
    result: "ok",
    data: timetable,
    limit: limit,
    offset: offset,
    total: count,
  });
}

export async function updateTimetable(
  req: FastifyRequest<{ Params: Param; Body: Timetable }>,
  res: FastifyReply,
) {
  const { id } = req.params;

  const timetable = await prisma.timetable.update({
    where: {
      id: id,
    },
    data: { ...req.body },
    include: {
      section: true
    }
  });

  return res.status(200).send({
    result: "ok",
    data: timetable,
  });
}

export async function deleteTimetable(
  req: FastifyRequest<{ Params: Param }>,
  res: FastifyReply,
) {
  const { id } = req.params;

  const timetable = await prisma.timetable.delete({
    where: {
      id: id,
    },
  });

  return res.status(200).send({
    result: "ok",
    data: timetable,
  });
}

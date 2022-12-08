import { PrismaClient, Room } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";

const prisma = new PrismaClient();

type Query = {
  limit: number;
  offset: number;
};

type Param = {
  id: number;
};

export async function createRoom(
  req: FastifyRequest<{ Body: Room }>,
  res: FastifyReply,
) {
  const { name, type } = req.body;

  const room = await prisma.room.create({
    data: {
      name: name,
      type: type,
    },
  });

  return res.status(200).send({
    result: "ok",
    data: room,
  });
}

export async function requestRoom(
  req: FastifyRequest<{ Params: Param; Querystring: Query }>,
  res: FastifyReply,
) {
  const { id } = req.params;
  const { limit, offset } = req.query;

  const room = id
    ? await prisma.room.findFirst({
      where: {
        id: id,
      },
    })
    : await prisma.room.findMany({
      skip: offset,
      take: limit,
    });

  const count = id ? null : await prisma.room.count();

  return res.status(200).send({
    result: "ok",
    data: room,
    limit: limit,
    offset: offset,
    total: count,
  });
}

export async function updateRoom(
  req: FastifyRequest<{ Params: Param; Body: Room }>,
  res: FastifyReply,
) {
  const { id } = req.params;
  const { name, type } = req.body;

  const room = await prisma.room.update({
    where: {
      id: id,
    },
    data: {
      name: name,
      type: type,
    },
  });

  return res.status(200).send({
    result: "ok",
    data: room,
  });
}

export async function deleteRoom(
  req: FastifyRequest<{ Params: Param }>,
  res: FastifyReply,
) {
  const { id } = req.params;

  const room = await prisma.room.delete({
    where: {
      id: id,
    },
  });

  return res.status(200).send({
    result: "ok",
    data: room,
  });
}

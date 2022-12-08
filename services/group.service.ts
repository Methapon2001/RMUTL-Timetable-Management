import { Group, PrismaClient } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";

const prisma = new PrismaClient();

interface Query {
  limit?: number;
  offset?: number;
}

interface Param {
  id?: number;
}

export async function createGroup(
  req: FastifyRequest<{ Body: Group }>,
  res: FastifyReply,
) {
  const group = await prisma.group.create({
    data: { ...req.body },
  });

  return res.status(200).send({
    result: "ok",
    data: group,
  });
}

export async function requestGroup(
  req: FastifyRequest<{ Params: Param; Querystring: Query }>,
  res: FastifyReply,
) {
  const { id } = req.params;
  const { limit, offset } = req.query;

  const group = id
    ? await prisma.group.findFirst({
      where: {
        id: id,
      },
    })
    : await prisma.group.findMany({
      skip: offset,
      take: limit,
    });

  return res.status(200).send({
    result: "ok",
    data: group,
  });
}

export async function updateGroup(
  req: FastifyRequest<{ Params: Param; Body: Group }>,
  res: FastifyReply,
) {
  const { id } = req.params;

  const group = await prisma.group.update({
    where: {
      id: id,
    },
    data: { ...req.body },
  });

  return res.status(200).send({
    result: "ok",
    data: group,
  });
}

export async function deleteGroup(
  req: FastifyRequest<{ Params: Param }>,
  res: FastifyReply,
) {
  const { id } = req.params;

  const group = await prisma.group.delete({
    where: {
      id: id,
    },
  });

  return res.status(200).send({
    result: "ok",
    data: group,
  });
}

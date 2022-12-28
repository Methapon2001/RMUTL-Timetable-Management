import { Group, PrismaClient } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";

const prisma = new PrismaClient();

type Query = {
  limit: number;
  offset: number;
} & Group;

type Param = {
  id: number;
};

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
  const { name, limit, offset } = req.query;

  const group = id
    ? await prisma.group.findFirst({
      where: {
        id: id,
      },
    })
    : await prisma.group.findMany({
      where: {
        name: {
          contains: name,
        }
      },
      skip: offset,
      take: limit,
    });

  const count = id ? null : await prisma.group.count({
    where: {
      name: {
        contains: name,
      }
    },
  });

  return res.status(200).send({
    result: "ok",
    data: group,
    limit: limit,
    offset: offset,
    total: count,
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

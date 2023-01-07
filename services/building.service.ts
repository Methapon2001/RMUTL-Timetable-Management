import { Building, PrismaClient } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";

const prisma = new PrismaClient();

type Query = {
  limit: number;
  offset: number;
} & Building;

type Param = {
  id: number;
};

export async function createBuilding(
  req: FastifyRequest<{ Body: Building }>,
  res: FastifyReply,
) {
  const building = await prisma.building.create({
    data: { ...req.body },
  });

  return res.status(200).send({
    result: "ok",
    data: building,
  });
}

export async function requestBuilding(
  req: FastifyRequest<{ Params: Param; Querystring: Query }>,
  res: FastifyReply,
) {
  const { id } = req.params;
  const { name, code, limit, offset } = req.query;

  const building = id
    ? await prisma.building.findFirst({
      where: {
        id: id,
      },
      include: {
        room: true,
      },
    })
    : await prisma.building.findMany({
      where: {
        code: {
          contains: code,
        },
        name: {
          contains: name,
        },
      },
      skip: offset,
      take: limit,
      include: {
        room: true,
      },
    });

  const count = id ? null : await prisma.building.count({
    where: {
      code: {
        contains: code,
      },
      name: {
        contains: name,
      },
    },
  });

  return res.status(200).send({
    result: "ok",
    data: building,
    limit: limit,
    offset: offset,
    total: count,
  });
}

export async function updateBuilding(
  req: FastifyRequest<{ Params: Param; Body: Building }>,
  res: FastifyReply,
) {
  const { id } = req.params;

  const building = await prisma.building.update({
    where: {
      id: id,
    },
    data: { ...req.body },
  });

  return res.status(200).send({
    result: "ok",
    data: building,
  });
}

export async function deleteBuilding(
  req: FastifyRequest<{ Params: Param }>,
  res: FastifyReply,
) {
  const { id } = req.params;

  const building = await prisma.building.delete({
    where: {
      id: id,
    },
  });

  return res.status(200).send({
    result: "ok",
    data: building,
  });
}

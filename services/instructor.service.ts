import { Instructor, PrismaClient } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";

const prisma = new PrismaClient();

type Query = {
  limit: number;
  offset: number;
};

type Param = {
  id: number;
};

export async function createInstructor(
  req: FastifyRequest<{ Body: Instructor }>,
  res: FastifyReply,
) {
  const { name } = req.body;

  const instructor = await prisma.instructor.create({
    data: {
      name: name,
    },
  });

  return res.status(200).send({
    result: "ok",
    data: instructor,
  });
}

export async function requestInstructor(
  req: FastifyRequest<{ Params: Param; Querystring: Query }>,
  res: FastifyReply,
) {
  const { id } = req.params;
  const { limit, offset } = req.query;

  const instructor = id
    ? await prisma.instructor.findFirst({
      where: {
        id: id,
      },
    })
    : await prisma.instructor.findMany({
      skip: offset,
      take: limit,
    });

  const count = id ? null : await prisma.instructor.count();

  return res.status(200).send({
    result: "ok",
    data: instructor,
    limit: limit,
    offset: offset,
    total: count,
  });
}

export async function updateInstructor(
  req: FastifyRequest<{ Params: Param; Body: Instructor }>,
  res: FastifyReply,
) {
  const { id } = req.params;
  const { name } = req.body;

  const instructor = await prisma.instructor.update({
    where: {
      id: id,
    },
    data: {
      name: name,
    },
  });

  return res.status(200).send({
    result: "ok",
    data: instructor,
  });
}

export async function deleteInstructor(
  req: FastifyRequest<{ Params: Param }>,
  res: FastifyReply,
) {
  const { id } = req.params;

  const instructor = await prisma.instructor.delete({
    where: {
      id: id,
    },
  });

  return res.status(200).send({
    result: "ok",
    data: instructor,
  });
}

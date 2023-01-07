import { Instructor, PrismaClient } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";

const prisma = new PrismaClient();

type Query = {
  limit: number;
  offset: number;
} & Instructor;

type Param = {
  id: number;
};

export async function createInstructor(
  req: FastifyRequest<{ Body: Instructor }>,
  res: FastifyReply,
) {
  const instructor = await prisma.instructor.create({
    data: { ...req.body },
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
  const { name, limit, offset } = req.query;

  const instructor = id
    ? await prisma.instructor.findFirst({
      where: {
        id: id,
      },
    })
    : await prisma.instructor.findMany({
      where: {
        name: {
          contains: name,
        },
      },
      skip: offset,
      take: limit,
    });

  const count = id ? null : await prisma.instructor.count({
    where: {
      name: {
        contains: name,
      },
    },
  });

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

  const instructor = await prisma.instructor.update({
    where: {
      id: id,
    },
    data: { ...req.body },
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

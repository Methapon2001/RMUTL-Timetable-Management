import { PrismaClient, Subject } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";

const prisma = new PrismaClient();

type Query = {
  limit: number;
  offset: number;
} & Subject;

type Param = {
  id: number;
};

export async function createSubject(
  req: FastifyRequest<{ Body: Subject }>,
  res: FastifyReply,
) {
  const subject = await prisma.subject.create({
    data: { ...req.body },
  });

  return res.status(200).send({
    result: "ok",
    data: subject,
  });
}

export async function requestSubject(
  req: FastifyRequest<{ Params: Param; Querystring: Query }>,
  res: FastifyReply,
) {
  const { id } = req.params;
  const { code, name, limit, offset } = req.query;

  const subject = id
    ? await prisma.subject.findFirst({
      where: {
        id: id,
      },
    })
    : await prisma.subject.findMany({
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
    });

  const count = id ? null : await prisma.subject.count({
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
    data: subject,
    limit: limit,
    offset: offset,
    total: count,
  });
}

export async function updateSubject(
  req: FastifyRequest<{ Params: Param; Body: Subject }>,
  res: FastifyReply,
) {
  const { id } = req.params;

  const subject = await prisma.subject.update({
    where: {
      id: id,
    },
    data: { ...req.body },
  });

  return res.status(200).send({
    result: "ok",
    data: subject,
  });
}

export async function deleteSubject(
  req: FastifyRequest<{ Params: Param }>,
  res: FastifyReply,
) {
  const { id } = req.params;

  const subject = await prisma.subject.delete({
    where: {
      id: id,
    },
  });

  return res.status(200).send({
    result: "ok",
    data: subject,
  });
}

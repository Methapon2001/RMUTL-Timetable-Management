import { PrismaClient, Subject } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";

const prisma = new PrismaClient();

type Query = {
  limit: number;
  offset: number;
};

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
  const { limit, offset } = req.query;

  const subject = id
    ? await prisma.subject.findFirst({
      where: {
        id: id,
      },
    })
    : await prisma.subject.findMany({
      skip: offset,
      take: limit,
    });

  const count = id ? null : await prisma.subject.count();

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
  const { name, type } = req.body;

  const subject = await prisma.subject.update({
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

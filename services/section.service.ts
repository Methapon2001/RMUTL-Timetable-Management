import { PrismaClient, Section, SectionType } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";

const prisma = new PrismaClient();

type SectionBody = {
  type: SectionType;
  roomId: number;
  groupId: number;
  instructorId: number[];
};

type Body = {
  subjectId: number;
  sections: SectionBody[];
};

type Query = {
  limit: number;
  offset: number;
};

type Param = {
  id: number;
};

export async function createSection(
  req: FastifyRequest<{ Body: Body }>,
  res: FastifyReply,
) {
  const { subjectId, sections } = req.body;

  const data: Section[] = [];

  const count = await prisma.section.count({
    where: {
      subjectId: subjectId,
      parentId: null,
    },
  });

  let shift = sections.shift();

  while (typeof shift != "undefined") {
    const main = data.length > 0 ? data[0] : null;

    const prev = data.at(-1);

    const instructor: { instructorId: number }[] = [];

    shift.instructorId?.forEach((id) => {
      instructor.push({ instructorId: id });
    });

    const section = await prisma.section.create({
      data: {
        type: shift.type,
        no: count + 1,
        lab: shift.type != "lab" ? null : prev?.lab == null ? 1 : prev.lab + 1,
        subjectId: subjectId,
        roomId: shift.roomId,
        groupId: shift.groupId,
        parentId: main ? main.id : null,
        instructorOnSection: {
          create: instructor,
        },
      },
      include: {
        subject: true,
        room: true,
        group: true,
        parent: {
          include: {
            room: true,
            instructorOnSection: {
              include: {
                instructor: true,
              }
            }
          }
        },
        instructorOnSection: {
          include: {
            instructor: true,
          },
        },
      },
    });

    data.push(section);

    shift = sections.shift();
  }

  return res.status(200).send({
    result: "ok",
    data: data,
  });
}

export async function requestSection(
  req: FastifyRequest<{ Params: Param; Querystring: Query }>,
  res: FastifyReply,
) {
  const { id } = req.params;
  const { limit, offset } = req.query;

  const section = id
    ? await prisma.section.findFirst({
      where: {
        id: id,
      },
    })
    : await prisma.section.findMany({
      skip: offset,
      take: limit,
      include: {
        subject: true,
        room: true,
        group: true,
        parent: {
          include: {
            room: true,
            instructorOnSection: {
              include: {
                instructor: true,
              }
            }
          }
        },
        instructorOnSection: {
          include: {
            instructor: true,
          },
        },
      },
    });

  const count = id ? null : await prisma.section.count();

  return res.status(200).send({
    result: "ok",
    data: section,
    limit: limit,
    offset: offset,
    total: count,
  });
}
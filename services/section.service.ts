import {
  InstructorOnSection,
  PrismaClient,
  Section,
  SectionType,
} from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";

const prisma = new PrismaClient();

const inc = {
  subject: true,
  room: true,
  group: true,
  parent: {
    include: {
      room: true,
      instructorOnSection: {
        include: {
          instructor: true,
        },
      },
    },
  },
  instructorOnSection: {
    include: {
      instructor: true,
    },
  },
};

type SectionBody = {
  type: SectionType;
  roomId: number;
  instructorId: number[];
};

type Body = {
  subjectId: number;
  groupId: number;
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
  const { subjectId, groupId, sections } = req.body;

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
        groupId: groupId,
        parentId: main ? main.id : null,
        instructorOnSection: {
          createMany: {
            data: instructor,
          },
        },
      },
      include: inc,
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
      include: inc,
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

export async function updateSection(
  req: FastifyRequest<
    {
      Params: Param;
      Querystring: Query;
      Body: Section & { instructorId: number[] };
    }
  >,
  res: FastifyReply,
) {
  const { id } = req.params;

  const data = await prisma.section.update({
    where: {
      id: id,
    },
    data: {
      roomId: req.body.roomId,
      groupId: req.body.groupId,
    },
  });

  await prisma.section.updateMany({
    where: {
      OR: [
        {
          id: data.parentId ?? undefined,
        },
        {
          parentId: data.parentId ?? undefined,
        },
        {
          id: id,
        },
        {
          parentId: id,
        },
      ],
    },
    data: {
      no: req.body.no,
      subjectId: req.body.subjectId,
    },
  });

  if (req.body.instructorId) {
    const instructorId: InstructorOnSection[] = [];

    req.body.instructorId.forEach((instructor) => {
      instructorId.push({ sectionId: id, instructorId: instructor });
    });

    const del = prisma.instructorOnSection.deleteMany({
      where: {
        sectionId: id,
      },
    });

    const ins = prisma.instructorOnSection.createMany({
      data: instructorId,
    });

    await prisma.$transaction([del, ins]);
  }

  const updated = await prisma.section.findFirst({
    where: {
      id: id,
    },
    include: inc,
  });

  return res.status(200).send({
    result: "ok",
    data: updated,
  });
}

export async function deleteSection(
  req: FastifyRequest<{ Params: Param }>,
  res: FastifyReply,
) {
  const { id } = req.params;

  const section = await prisma.section.delete({
    where: {
      id: id,
    },
    include: inc,
  });

  return res.status(200).send({
    result: "ok",
    data: section,
  });
}

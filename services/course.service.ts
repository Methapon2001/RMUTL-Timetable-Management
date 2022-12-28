import { Course, PrismaClient, SubjectOnCourse } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";

const prisma = new PrismaClient();

type CourseBody = {
  subjectId: number[];
} & Course;

type Query = {
  limit: number;
  offset: number;
};

type Param = {
  id: number;
};

export async function createCourse(
  req: FastifyRequest<{ Body: CourseBody }>,
  res: FastifyReply,
) {
  const subjectId: { subjectId: number }[] = [];

  req.body.subjectId.forEach((id) => {
    subjectId.push({ subjectId: id });
  });

  const course = await prisma.course.create({
    data: {
      name: req.body.name,
      subjectOnCourse: {
        createMany: {
          data: subjectId,
        },
      },
    },
    include: {
      subjectOnCourse: {
        include: {
          subject: true,
        },
      },
    },
  });

  return res.status(200).send({
    result: "ok",
    data: course,
  });
}

export async function requestCourse(
  req: FastifyRequest<{ Params: Param; Querystring: Query }>,
  res: FastifyReply,
) {
  const { id } = req.params;
  const { limit, offset } = req.query;

  const course = id
    ? await prisma.course.findFirst({
      where: {
        id: id,
      },
      include: {
        subjectOnCourse: {
          include: {
            subject: true,
          },
        },
      },
    })
    : await prisma.course.findMany({
      skip: offset,
      take: limit,
      include: {
        subjectOnCourse: {
          include: {
            subject: true,
          },
        },
      },
    });

  const count = id ? null : await prisma.course.count();

  return res.status(200).send({
    result: "ok",
    data: course,
    limit: limit,
    offset: offset,
    total: count,
  });
}

export async function updateCourse(
  req: FastifyRequest<
    {
      Params: Param;
      Querystring: Query;
      Body: Course & { subjectId: number[] };
    }
  >,
  res: FastifyReply,
) {
  const { id } = req.params;

  await prisma.course.update({
    where: {
      id: id,
    },
    data: {
      name: req.body.name,
    },
  });

  if (req.body.subjectId) {
    const subjectId: SubjectOnCourse[] = [];

    req.body.subjectId.forEach((subject) => {
      subjectId.push({ courseId: id, subjectId: subject });
    });

    const del = prisma.subjectOnCourse.deleteMany({
      where: {
        courseId: id,
      },
    });

    const ins = prisma.subjectOnCourse.createMany({
      data: subjectId,
    });

    await prisma.$transaction([del, ins]);
  }

  const updated = await prisma.course.findFirst({
    where: {
      id: id,
    },
    include: {
      subjectOnCourse: {
        include: {
          subject: true,
        },
      },
    },
  });

  return res.status(200).send({
    result: "ok",
    data: updated,
  });
}

export async function deleteCourse(
  req: FastifyRequest<{ Params: Param }>,
  res: FastifyReply,
) {
  const { id } = req.params;

  const course = await prisma.course.delete({
    where: {
      id: id,
    },
    include: {
      subjectOnCourse: {
        include: {
          subject: true,
        },
      },
    },
  });

  return res.status(200).send({
    result: "ok",
    data: course,
  });
}

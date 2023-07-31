import { Course } from "@/db/models/Course/model/Course";
import { Enrollment } from "@/db/models/Enrollment/model/Enrollment";
import { Controller } from "@/libraries/Controller";
import { decodeToken } from "@/utils/decodeToken";
import { Request, Response } from "express";

const uploadedCourse = async req => {
  const id = await decodeToken(req.headers.authorization);
  const course = await Course.findAndCountAll({
    where: {
      author: id,
    },
  });
  return course.count;
};

const subscribersCourses = async req => {
  const id = await decodeToken(req.headers.authorization);
  const activeStudents = await Enrollment.findAndCountAll({
    include: [
      {
        model: Course,
        where: {
          author: id,
        },
      },
    ],
  });

  return activeStudents.count;
};

const startedCoursesPercent = async req => {
  const id = await decodeToken(req.headers.authorization);
  const startedPercent = await Enrollment.findAndCountAll({
    include: [
      {
        model: Course,
        where: {
          author: id,
        },
      },
    ],
    where: {
      is_started: true,
    },
  });

  const percent =
    (startedPercent.count / (await subscribersCourses(req))) * 100;
  return `${percent}%`;
};

export const getTeacherDashboard = async (req: Request, res: Response) => {
  const uploadedCourses = await uploadedCourse(req);
  const students = await subscribersCourses(req);
  const startedPercents = await startedCoursesPercent(req);
  return Controller.ok(res, { uploadedCourses, students, startedPercents });
};

import { Enrollment } from "@/db/models/Enrollment/model/Enrollment";
import { LearningTrack } from "@/db/models/LearningTrack/model/LearningTrack";
import { Lesson } from "@/db/models/Lesson/model/Lesson";
import { Controller } from "@/libraries/Controller";
import { decodeToken } from "@/utils/decodeToken";
import { Request, Response } from "express";
import { isNil } from "lodash";

export const lastLessonTaken = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.query;
    const userId = await decodeToken(req.headers.authorization);

    const enrollment = await Enrollment.findOne({
      where: { userId, courseId },
    });

    if (isNil(enrollment)) {
      return Controller.badRequest(res, "User is not enrolled in this course.");
    }

    const enrollmentId = enrollment.getDataValue("id");

    const lastCompletedLessonInTrack = await LearningTrack.findOne({
      where: { enrollmentId },
      order: [["createdAt", "DESC"]],
      limit: 1,
    });

    if (isNil(lastCompletedLessonInTrack)) {
      return Controller.ok(res, { status: "start", nextLessonId: 1 });
    }

    const lastLessonId = lastCompletedLessonInTrack.lessonId;
    const lastLesson = await Lesson.findOne({ where: { id: lastLessonId } });
    const lastCourseLesson = await Lesson.findOne({
      where: { courseId },
      order: [["lesson_number", "DESC"]],
      limit: 1,
    });

    if (isNil(lastLesson) || isNil(lastCourseLesson)) {
      return Controller.serverError(res, "Error retrieving lesson details.");
    }

    if (lastLesson.lesson_number === lastCourseLesson.lesson_number) {
      return Controller.ok(res, { status: "completed", lastLesson });
    }

    const nextLessonNumber = lastLesson.lesson_number + 1;
    const nextLesson = await Lesson.findOne({
      where: { courseId, lesson_number: nextLessonNumber },
    });

    if (isNil(nextLesson)) {
      return Controller.serverError(res, "Next lesson not found.");
    }

    return Controller.ok(res, { status: "continue", nextLesson });
  } catch (error) {
    console.error(error);
    return Controller.badRequest(
      res,
      "Something went wrong, please check that the course in the req.query is correct",
    );
  }
};

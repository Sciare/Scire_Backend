import { Course } from "@/db/models/Course/model/Course";
import { Enrollment } from "@/db/models/Enrollment/model/Enrollment";
import { Controller } from "@/libraries/Controller";
import { decodeToken } from "@/utils/decodeToken";
import { Request, Response } from "express";
import moment from "moment";
import { Op } from "sequelize";

/**
 * Enumeración para los periodos de tiempo.
 */
enum TimePeriod {
  SixMonths = "6m",
  ThreeMonths = "3m",
  OneMonth = "1m",
  FifteenDays = "15d",
  OneWeek = "1w",
  AllTime = "all",
}

/**
 * Calcula las fechas de inicio y fin basadas en el periodo de tiempo.
 */
const getTimePeriodDates = (timePeriod: TimePeriod) => {
  const endDate = moment();
  let startDate;

  if (timePeriod === TimePeriod.AllTime) {
    // Establece la fecha de inicio en 1900-01-01
    const startDate = moment(new Date(1900, 0, 1)); // Enero es 0 en JavaScript
    return {
      startDate: startDate.toDate(),
      endDate: endDate.toDate(),
    };
  }

  switch (timePeriod) {
    case TimePeriod.SixMonths:
      startDate = moment().subtract(6, "months");
      break;
    case TimePeriod.ThreeMonths:
      startDate = moment().subtract(3, "months");
      break;
    case TimePeriod.OneMonth:
      startDate = moment().subtract(1, "months");
      break;
    case TimePeriod.FifteenDays:
      startDate = moment().subtract(15, "days");
      break;
    case TimePeriod.OneWeek:
      startDate = moment().subtract(1, "weeks");
      break;
    default:
      throw new Error("Invalid time period");
  }
  return { startDate: startDate.toDate(), endDate: endDate.toDate() };
};

const uploadedCourse = async (authorId: number, timePeriod: TimePeriod) => {
  const { startDate, endDate } = getTimePeriodDates(timePeriod);

  try {
    const course = await Course.findAndCountAll({
      where: {
        author: authorId,
        createdAt: { [Op.gte]: startDate, [Op.lte]: endDate },
      },
    });
    return course.count;
  } catch (error) {
    console.error("Error in uploadedCourse: ", error);
    throw new Error("Database query failed");
  }
};

const subscribersCourses = async (authorId: number, timePeriod: TimePeriod) => {
  const { startDate, endDate } = getTimePeriodDates(timePeriod);

  try {
    const activeStudents = await Enrollment.findAndCountAll({
      include: [{ model: Course, where: { author: authorId } }],
      where: {
        enrollment_date: { [Op.gte]: startDate, [Op.lte]: endDate },
      },
    });
    return activeStudents.count;
  } catch (error) {
    console.error("Error in subscribersCourses: ", error);
    throw new Error("Database query failed");
  }
};

const startedCoursesPercent = async (
  authorId: number,
  timePeriod: TimePeriod,
) => {
  const { startDate, endDate } = getTimePeriodDates(timePeriod);

  try {
    const startedPercent = await Enrollment.findAndCountAll({
      include: [{ model: Course, where: { author: authorId } }],
      where: {
        is_started: true,
        enrollment_date: { [Op.gte]: startDate, [Op.lte]: endDate },
      },
    });
    const percent =
      (startedPercent.count /
        (await subscribersCourses(authorId, timePeriod))) *
      100;
    return `${percent.toFixed(2)}%`;
  } catch (error) {
    console.error("Error in startedCoursesPercent: ", error);
    throw new Error("Database query failed");
  }
};

// Función para obtener el total de estudiantes inscritos en los cursos de un autor
const getTotalSubscribers = async (authorId: number): Promise<number> => {
  try {
    const total = await Enrollment.findAndCountAll({
      include: [{ model: Course, where: { author: authorId } }],
    });
    return total.count;
  } catch (error) {
    console.error("Error in getTotalSubscribers: ", error);
    throw new Error("Database query failed");
  }
};

// Función modificada para calcular el porcentaje de nuevos inscritos
const newSubscribersPercentageInPeriod = async (
  authorId: number,
  timePeriod: TimePeriod,
  totalSubscribers: number,
): Promise<string> => {
  try {
    const { startDate, endDate } = getTimePeriodDates(timePeriod);
    const newSubscribersCount = await Enrollment.findAndCountAll({
      include: [{ model: Course, where: { author: authorId } }],
      where: {
        enrollment_date: { [Op.gte]: startDate, [Op.lte]: endDate },
      },
    });

    const percentage = (newSubscribersCount.count / totalSubscribers) * 100;

    return `${percentage.toFixed(2)}%`; // Devuelve el porcentaje con dos decimales
  } catch (error) {
    console.error("Error in newSubscribersPercentageInPeriod: ", error);
    throw new Error("Database query failed");
  }
};

export const getTeacherDashboard = async (req: Request, res: Response) => {
  try {
    const id = await decodeToken(req.headers.authorization);
    if (!id) {
      return Controller.badRequest(res, "Invalid token");
    }

    const timePeriod = TimePeriod.OneMonth; // O cualquier otro periodo seleccionado

    const uploadedCourses = await uploadedCourse(id, timePeriod);
    const totalStudents = await getTotalSubscribers(id);
    const startedPercents = await startedCoursesPercent(id, timePeriod);
    const newSubscribersPercentage = await newSubscribersPercentageInPeriod(
      id,
      timePeriod,
      totalStudents,
    );

    return Controller.ok(res, {
      uploadedCourses,
      totalStudents,
      startedPercents,
      newSubscribersPercentage,
    });
  } catch (error) {
    console.error("Error in getTeacherDashboard: ", error);
    return Controller.serverError(res);
  }
};

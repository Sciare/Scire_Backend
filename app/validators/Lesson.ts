import Joi from "joi";

export const LessonSchema: Joi.ObjectSchema = Joi.object({
  name: Joi.string()
    .min(1)
    .max(60)
    .required(),
  description: Joi.string()
    .min(1)
    .max(400)
    .required(),
  courseId: Joi.number()
    .integer()
    .required(),
  duration: Joi.number().integer(),
  video_url_notDefinitive: Joi.string().uri(),
  video: Joi.number(),
});

export const UpdateLessonSchema: Joi.ObjectSchema = Joi.object({
  name: Joi.string()
    .min(1)
    .max(60),
  description: Joi.string()
    .min(1)
    .max(400),
  courseId: Joi.number().integer(),
  duration: Joi.number().integer(),
  video_url_notDefinitive: Joi.string().uri(),
  video: Joi.number(),
});

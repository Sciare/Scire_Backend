import Joi from "joi";

export const CourseSchema: Joi.ObjectSchema = Joi.object({
  name: Joi.string()
    .min(1)
    .max(60)
    .required(),
  description: Joi.string()
    .min(1)
    .max(400)
    .required(),
  school_id: Joi.number()
    .integer()
    .required(),
  duration: Joi.number().integer(),
  is_active: Joi.boolean().default(true),
  tags: Joi.array()
    .items(Joi.string())
    .required(),
  cover_notDefinitive: Joi.string().uri(),
  cover: Joi.number(),
  author: Joi.number(),
});

export const UpdateCourseSchema: Joi.ObjectSchema = Joi.object({
  name: Joi.string()
    .min(1)
    .max(60),
  description: Joi.string()
    .min(1)
    .max(400),
  school_id: Joi.number().integer(),
  duration: Joi.number().integer(),
  is_active: Joi.boolean().default(true),
  tags: Joi.array().items(Joi.string()),
  cover_notDefinitive: Joi.string().uri(),
  cover: Joi.number(),
});

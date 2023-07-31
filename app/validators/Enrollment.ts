import Joi from "joi";

export const EnrollmentSchema: Joi.ObjectSchema = Joi.object({
  courseId: Joi.number()
    .integer()
    .required(),
  userId: Joi.number()
    .integer()
    .required(),
});

export const UpdateEnrollmentSchema: Joi.ObjectSchema = Joi.object({
  is_active: Joi.boolean().default(true),
  is_started: Joi.boolean(),
});

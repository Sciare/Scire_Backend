import Joi from "joi";

export const CommentSchema: Joi.ObjectSchema = Joi.object({
  lessonId: Joi.number()
    .integer()
    .required(),
  userId: Joi.number().integer(),
  comment: Joi.string()
    .min(1)
    .max(600)
    .required(),
});

export const UpdateCommentSchema: Joi.ObjectSchema = Joi.object({
  comment: Joi.string()
    .min(1)
    .max(600)
    .required(),
});

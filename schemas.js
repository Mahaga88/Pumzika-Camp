const Joi = require("joi");
const sanitizeHtml = require("sanitize-html");

const extension = (joi) => ({
  type: "string",
  base: joi.string(),
  messages: {
    "string.escapeHTML": "{{#label}} must not include HTML!",
  },
  rules: {
    escapeHTML: {
      validate(value, helpers) {
        const clean = sanitizeHtml(value, {
          allowedTags: [],
          allowedAttributes: {},
        });
        if (clean !== value)
          return helpers.error("string.escapeHTML", { value });
        return clean;
      },
    },
  },
});

const ExtendedJoi = Joi.extend(extension);

module.exports.campgroundSchema = Joi.object({
  campground: ExtendedJoi.object({
    title: ExtendedJoi.string().required(),
    price: ExtendedJoi.number().required().min(0),
    // image: ExtendJoi.string().required(),
    location: ExtendedJoi.string().required(),
    description: ExtendedJoi.string().required(),
  }).required(),
  deleteImages: ExtendedJoi.array(),
});

module.exports.reviewSchema = Joi.object({
  review: ExtendedJoi.object({
    rating: ExtendedJoi.number().required().min(1).max(5),
    body: ExtendedJoi.string().required(),
  }).required(),
});

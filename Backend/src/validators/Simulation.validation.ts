import { body } from "express-validator";

export const validateGenerateSimulation = [
  body("amount")
    .notEmpty()
    .withMessage("Amount is required")
    .isDecimal()
    .withMessage("Amount must be a valid decimal number"),

  body("paymentTerm")
    .notEmpty()
    .withMessage("Payment term is required")
    .isString()
    .withMessage("Payment term must be a string"),

  body("fromDate")
    .notEmpty()
    .withMessage("From date is required")
    .isISO8601()
    .withMessage("From date must be a valid date in ISO format"),

  body("toDate")
    .notEmpty()
    .withMessage("To date is required")
    .isISO8601()
    .withMessage("To date must be a valid date in ISO format"),
];

export const validateCreateSimulation = [
  body("userId")
    .notEmpty()
    .withMessage("User ID is required")
    .isString()
    .withMessage("User ID must be a string"),

  body("amount")
    .notEmpty()
    .withMessage("Amount is required")
    .isDecimal()
    .withMessage("Amount must be a valid decimal number"),

  body("paymentTerm")
    .notEmpty()
    .withMessage("Payment term is required")
    .isString()
    .withMessage("Payment term must be a string"),

  body("fromDate")
    .notEmpty()
    .withMessage("From date is required")
    .isISO8601()
    .withMessage("From date must be a valid date in ISO format"),

  body("toDate")
    .notEmpty()
    .withMessage("To date is required")
    .isISO8601()
    .withMessage("To date must be a valid date in ISO format"),

  body("interestRate")
    .notEmpty()
    .withMessage("Interest rate is required")
    .isFloat({ min: 0 })
    .withMessage("Interest rate must be a valid float value"),
];

export const validateUpdateSimulation = [
  body("amount")
    .optional()
    .isDecimal()
    .withMessage("Amount must be a valid decimal number"),

  body("paymentTerm")
    .optional()
    .isString()
    .withMessage("Payment term must be a string"),

  body("fromDate")
    .optional()
    .isISO8601()
    .withMessage("From date must be a valid date in ISO format"),

  body("toDate")
    .optional()
    .isISO8601()
    .withMessage("To date must be a valid date in ISO format"),

  body("interestRate")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Interest rate must be a valid float value"),
];

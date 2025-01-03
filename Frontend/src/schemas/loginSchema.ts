import * as yup from "yup";

export const loginValidationSchema = yup.object().shape({
    email: yup
        .string()
        .email("This field must be an email")
        .required("This field is required")
    ,
    password: yup
        .string()
        .required("This field is required"),
});

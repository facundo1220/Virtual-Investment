import * as yup from "yup";

export const simulationValidationSchema = yup.object().shape({
    value: yup
        .number()
        .required("This field is required")
        .typeError("Value must be a number")
        .min(500000, "The minimum amount is 500,000")
        .defined(),
    fromDate: yup
        .string()
        .required("This field is required")
        .test("is-valid-date", "From Date must be a valid date", (value) => {
            const date = new Date(value || "");
            return !isNaN(date.getTime());
        })
        .test("is-not-past", "From Date cannot be earlier than today", (value) => {
            const today = new Date().getDate;
            const date = new Date(value).getDate;
            return date >= today;
        }),
    toDate: yup
        .string()
        .required("This field is required")
        .test("is-valid-date", "To Date must be a valid date", (value) => {
            const date = new Date(value || "");
            return !isNaN(date.getTime());
        })
        .test("is-after-fromDate", "To Date cannot be earlier than From Date", function (value) {
            const { fromDate } = this.parent;
            const fromDateObj = new Date(fromDate);
            const toDateObj = new Date(value || "");
            return toDateObj >= fromDateObj;
        })
        .test(
            "date-range",
            "Invalid date range: Monthly requires a minimum of 30 days, Annual requires a minimum of 360 days",
            function (value) {
                const { fromDate, paymentType } = this.parent;
                const fromDateObj = new Date(fromDate);
                const toDateObj = new Date(value || "");
                const diffInDays = (toDateObj.getTime() - fromDateObj.getTime()) / (1000 * 3600 * 24);

                if (paymentType === "monthly" && diffInDays < 30) {
                    return this.createError({ message: "Monthly requires a minimum of 30 days" });
                }
                if (paymentType === "anual" && diffInDays < 360) {
                    return this.createError({ message: "Annual requires a minimum of 360 days" });
                }
                return true;
            }
        ),
    paymentType: yup
        .string()
        .required("This field is required")
        .oneOf(["monthly", "anual"], "Payment Type must be either 'monthly' or 'anual'"),
});

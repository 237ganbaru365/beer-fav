import * as yup from "yup";

// user validation rules
export const UserSchema = yup
  .object({
    username: yup
      .string()
      //FIXME: 数字入っててもいいけど、英語は必ず含まれるべき
      .matches(/^([^0-9]*)$/, "User name should not contain numbers")
      .required("User name is a required field"),
    email: yup
      .string()
      .email("Email should have correct format")
      .required("Email is a required field"),
    password: yup
      .string()
      // FIXME: ここの順序とかってそこまで関係ないのかあるのか確認
      .required("Password is a required field")
      .min(6, "Password should be min 6 letters"),
  })
  .required();

import * as yup from "yup";

// loginとsignupでスキーマを分けない場合、エラーが登場しうまく動作しなかった

// signup validation rules
export const SignupSchema = yup
  .object({
    username: yup
      .string()
      .min(6, "User name should be min 6 letters")
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

// login vallidation rules
export const LoginSchema = yup
  .object({
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

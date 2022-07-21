import * as yup from "yup";

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
  //FIXME: それぞれにrequiredつけてるのに、ここにも必要かどうか確認
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
      .required("Password is a required field")
      .min(6, "Password should be min 6 letters"),
  })
  .required();

// create post validation rules
export const PostSchema = yup
  .object({
    name: yup.string().required("Name is required field"),
    store: yup.string().required("Store is required field"),
    description: yup.string(),
    imgUrl: yup.string(),
  })
  .required();

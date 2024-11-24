import * as yup from "yup";
import "yup-phone-lite";

export const UserSchema = yup.object({
  emailOrPhone: yup.string().required("Email or Phone Number is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(
      /[@$!%*?&]/,
      "Password must contain at least one special character"
    )
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm Password is required"),
});

export const getSignupSchema = () => {
  return yup.object().shape({
    email: yup
      .string()
      .email("Invalid email")
      .required("Email address is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    phoneNumber: yup.string().required("Phone Number is required"),
    username: yup.string().required("Username is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), undefined], "Passwords must match")
      .required("Please confirm your password"),
  });
};

export const getSignInSchema = () => {
  return yup.object().shape({
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    identifier: yup.string().required("Email Or Phone number required"),
  });
};

export const updateUserSchema = yup.object().shape({
  id: yup.string().required("ID is required"),
  username: yup.string(),
  email: yup.string().email("Invalid email format").optional(),
  phoneNumber: yup.string(),
  dateOfBirth: yup
    .string()
    .nullable()
    .matches(
      /^\d{4}-\d{2}-\d{2}$/,
      "Date of Birth must be in YYYY-MM-DD format"
    ),
  profilePicture: yup.string().url("Invalid URL format").nullable().optional(),
});

import * as Yup from "yup";
const FORMATS = ["image/jpg", "image/jpeg"];
const SIZE = 5 * 1024 * 1024;

const singUpSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must contain at least 2 character")
    .max(60)
    .required("Required"),
  email: Yup.string()
    .matches(
      // regular expression for RFC 2822 email validation
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/g,
      "Please enter a valid email address"
    )
    .required("Required"),
  phone: Yup.string()
    .matches(
      // regular expression for Ukrainian phone number validation
      /^\+380\d{9}$/g,
      "Phone number must be in format +380 (XX) XXX - XX - XX"
    )
    .required("Required"),
  position_id: Yup.number().min(1).required("Required"),
  photo: Yup.mixed()
    .required("Required")
    .test("fileSize", "File Size is too large (max 5 mb)", (value) => {
      if (!value) return 0 <= SIZE;
      return value.size <= SIZE;
    })
    .test("fileType", "Unsupported File Format (jpeg/jpg)", (value) => {
      if (!value) return FORMATS.includes("");
      return FORMATS.includes(value.type);
    }),
});

export default singUpSchema;

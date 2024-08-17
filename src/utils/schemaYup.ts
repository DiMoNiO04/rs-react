import * as yup from 'yup';

const REQUIRED_FIELD = 'Required field';

const schemaYup = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Z]/, 'The first letter must be capitalized')
    .required(REQUIRED_FIELD),
  age: yup
    .number()
    .transform((value, originalValue) => (originalValue.trim() === '' ? undefined : value))
    .max(99)
    .positive('Age must be a positive number')
    .required(REQUIRED_FIELD),
  email: yup.string().required(REQUIRED_FIELD).email('Inappropriate email format'),
  password: yup
    .string()
    .matches(/[A-Z]/, 'Password must contain 1 capital letter')
    .matches(/[a-z]/, 'Password must contain 1 lowercase letter')
    .matches(/[0-9]/, 'Password must contain 1 digit')
    .matches(/[\W_]/, 'Password must contain 1 special character')
    .required(REQUIRED_FIELD),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required(REQUIRED_FIELD),
  gender: yup.string().required(REQUIRED_FIELD),
  country: yup.string().required(REQUIRED_FIELD),
  file: yup
    .mixed()
    .test('fileSize', 'File size is too large', (value) => {
      if (!value || !(value instanceof File)) return true;
      return value.size <= 2000000;
    })
    .test('fileType', 'Unsupported file format', (value) => {
      if (!value || !(value instanceof File)) return true;
      return ['image/jpeg', 'image/png'].includes(value.type);
    })
    .required('File is required'),
  agree: yup.boolean().oneOf([true], 'You must agree'),
});

export default schemaYup;

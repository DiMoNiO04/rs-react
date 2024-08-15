import * as yup from 'yup';

const REQUIRED_FIELD = 'Required field';

const schemaYup = yup.object().shape({
  name: yup
    .string()
    .required(REQUIRED_FIELD)
    .matches(/^[A-Z]/, 'The first letter must be capitalized'),
  age: yup
    .number()
    .required(REQUIRED_FIELD)
    .positive('Age must be a positive number')
    .integer('Age must be an integer'),
  email: yup.string().required(REQUIRED_FIELD).email('Inappropriate email format'),
  password: yup
    .string()
    .required(REQUIRED_FIELD)
    .matches(/[A-Z]/, 'Password must contain 1 capital letter')
    .matches(/[a-z]/, 'Password must contain 1 lowercase letter')
    .matches(/[0-9]/, 'Password must contain 1 digit')
    .matches(/[\W_]/, 'Password must contain 1 special character'),
  confirmPassword: yup
    .string()
    .required(REQUIRED_FIELD)
    .oneOf([yup.ref('password')], 'Passwords must match'),
  gender: yup.string().required(REQUIRED_FIELD),
  country: yup.string().required(REQUIRED_FIELD),
  image: yup
    .mixed()
    .required(REQUIRED_FIELD)
    .test('fileSize', 'File size is too large', (value) => !value || (value as FileList)[0]?.size <= 2000000)
    .test(
      'fileType',
      'Unsupported file format',
      (value) => !value || ['image/jpeg', 'image/png'].includes((value as FileList)[0]?.type)
    ),
  agree: yup.boolean().required(REQUIRED_FIELD).oneOf([true], 'You must agree'),
});

export default schemaYup;

interface IValidationErrors {
  [key: string]: string;
}

interface IFormData {
  name: string | undefined;
  age: string | undefined;
  email: string | undefined;
  password: string | undefined;
  confirmPassword: string | undefined;
  gender: string | undefined;
  country: string | undefined;
  file: string | null;
  agree: boolean | undefined;
  isNew?: boolean;
}

export type { IValidationErrors, IFormData };

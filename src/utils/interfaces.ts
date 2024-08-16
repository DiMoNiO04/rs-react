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
  file: FileList | undefined | null;
  agree: boolean | undefined;
}

export type { IValidationErrors, IFormData };

interface ValidationErrors {
  [key: string]: string;
}

interface FormData {
  name: string | undefined;
  age: string | undefined;
  email: string | undefined;
  password: string | undefined;
  confirmPassword: string | undefined;
  gender: string | undefined;
  country: string | undefined;
  image: FileList | undefined | null;
  agree: boolean | undefined;
}

export type { ValidationErrors, FormData };

import React, { useRef, useState } from 'react';
import * as yup from 'yup';
import { schemaYup } from '../../utils';
import BtnBack from '../BtnBack/BtnBack';
import { ValidationErrors, IFormData } from '../../utils/interfaces';

const FormNoControl: React.FC = () => {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const ageInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const confirmPasswordInputRef = useRef<HTMLInputElement>(null);
  const genderInputRef = useRef<HTMLSelectElement>(null);
  const countryInputRef = useRef<HTMLSelectElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const agreeInputRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData: IFormData = {
      name: nameInputRef.current?.value,
      age: ageInputRef.current?.value,
      email: emailInputRef.current?.value,
      password: passwordInputRef.current?.value,
      confirmPassword: confirmPasswordInputRef.current?.value,
      gender: genderInputRef.current?.value,
      country: countryInputRef.current?.value,
      file: fileInputRef.current?.files,
      agree: agreeInputRef.current?.checked,
    };

    try {
      setErrors({});
      await schemaYup.validate(formData, { abortEarly: false });
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const validationErrors: ValidationErrors = {};
        err.inner.forEach((error) => {
          if (error.path) {
            validationErrors[error.path] = error.message;
          }
        });
        setErrors(validationErrors);
      }
    }
  };

  return (
    <div className="container">
      <BtnBack />
      <h1>No Control Form</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" type="text" placeholder="Enter name" ref={nameInputRef} />
          {errors.name && <p>{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="age">Age</label>
          <input id="age" type="number" placeholder="Enter age" ref={ageInputRef} />
          {errors.age && <p>{errors.age}</p>}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" placeholder="Enter email" ref={emailInputRef} />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" placeholder="Enter password" ref={passwordInputRef} />
          {errors.password && <p>{errors.password}</p>}
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Enter confirm password"
            ref={confirmPasswordInputRef}
          />
          {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        </div>
        <div>
          <label htmlFor="gender">Gender</label>
          <select name="gender" id="gender" ref={genderInputRef}>
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && <p>{errors.gender}</p>}
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <select name="country" id="country" ref={countryInputRef}>
            <option value="">Select country</option>
            <option value="usa">USA</option>
            <option value="canada">Canada</option>
            <option value="russia">Russia</option>
          </select>
          {errors.country && <p>{errors.country}</p>}
        </div>
        <div>
          <label htmlFor="file">Image</label>
          <input name="file" ref={fileInputRef} type="file" id="file" />
          {errors.file && <p>{errors.file}</p>}
        </div>
        <div className="block-agree">
          <label htmlFor="agree">Agree?</label>
          <input name="agree" ref={agreeInputRef} type="checkbox" id="checkbox" />
          {errors.agree && <p>{errors.agree}</p>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormNoControl;

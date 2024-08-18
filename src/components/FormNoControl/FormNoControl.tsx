import React, { useRef, useState } from 'react';
import * as yup from 'yup';
import { EUrls, schemaYup } from '../../utils';
import { IValidationErrors, IFormData } from '../../utils/interfaces';
import { BtnBack, PasswordStrength } from '..';
import useImageUpload from '../../hooks/useImageUpload';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { setDataFormNoControl } from '../../store/form/slice';
import { useNavigate } from 'react-router-dom';
import { getCountries } from '../../store/countries/selectors';

const FormNoControl: React.FC = () => {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const ageInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const confirmPasswordInputRef = useRef<HTMLInputElement>(null);
  const genderInputRef = useRef<HTMLSelectElement>(null);
  const countryInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const agreeInputRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>({});
  const [password, setPassword] = useState<string>('');

  const { fileBase, handleImageChange } = useImageUpload();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const countries = useAppSelector(getCountries());

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
      file: fileBase,
      agree: agreeInputRef.current?.checked,
    };

    try {
      setErrors({});
      await schemaYup.validate(formData, { abortEarly: false });
      dispatch(setDataFormNoControl(formData));
      navigate(EUrls.MAIN);
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const validationErrors: IValidationErrors = {};
        err.inner.forEach((error) => {
          if (error.path) {
            validationErrors[error.path] = error.message;
          }
        });
        setErrors(validationErrors);
      }
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
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
          <input
            id="password"
            type="password"
            placeholder="Enter password"
            ref={passwordInputRef}
            onChange={handlePasswordChange}
          />
          {errors.password && <p>{errors.password}</p>}
          {password && <PasswordStrength password={password} />}
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
          <input id="country" list="country-list" placeholder="Select country" ref={countryInputRef} />
          <datalist id="country-list">
            {countries.map((country) => (
              <option key={country.code} value={country.label}>
                ({country.code})
              </option>
            ))}
          </datalist>
          {errors.country && <p>{errors.country}</p>}
        </div>
        <div>
          <label htmlFor="file">Image</label>
          <input name="file" ref={fileInputRef} type="file" id="file" onChange={handleImageChange} />
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

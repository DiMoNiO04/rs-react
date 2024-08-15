import React, { useRef, useState } from 'react';
import BtnBack from '../BtnBack/BtnBack';

const FormNoControl: React.FC = () => {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const ageInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const confirmPasswordInputRef = useRef<HTMLInputElement>(null);
  const genderInputRef = useRef<HTMLSelectElement>(null);
  const countryInputRef = useRef<HTMLSelectElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const agreeInputRef = useRef<HTMLInputElement>(null);

  const [errors] = useState<{ [key: string]: string | undefined }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      name: nameInputRef.current?.value,
      age: ageInputRef.current?.value,
      email: emailInputRef.current?.value,
      password: passwordInputRef.current?.value,
      confirmPassword: confirmPasswordInputRef.current?.value,
      gender: genderInputRef.current?.value,
      country: countryInputRef.current?.value,
      image: imageInputRef.current?.value,
      agree: agreeInputRef.current?.value,
    };

    console.log(formData);
  };

  return (
    <div className="container">
      <BtnBack />
      <h1>No Control Form</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" type="text" name="name" ref={nameInputRef} />
          {errors.name && <p>{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="age">Age</label>
          <input id="age" type="number" name="age" ref={ageInputRef} />
          {errors.age && <p>{errors.age}</p>}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" ref={emailInputRef} />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" ref={passwordInputRef} />
          {errors.password && <p>{errors.password}</p>}
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm password</label>
          <input id="confirmPassword" type="password" name="confirmPassword" ref={confirmPasswordInputRef} />
          {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        </div>
        <div>
          <label htmlFor="gender">Gender</label>
          <select name="gender" id="gender" ref={genderInputRef}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && <p>{errors.gender}</p>}
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <select name="country" id="country" ref={countryInputRef}>
            <option value="usa">USA</option>
            <option value="canada">Canada</option>
            <option value="russia">Russia</option>
          </select>
          {errors.country && <p>{errors.country}</p>}
        </div>
        <div>
          <label htmlFor="image">Image</label>
          <input name="image" ref={imageInputRef} type="file" id="image" />
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

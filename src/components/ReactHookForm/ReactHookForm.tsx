import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IFormData } from '../../utils/interfaces';
import { schemaYup } from '../../utils';
import { BtnBack, PasswordStrength } from '..';
import useImageUpload from '../../hooks/useImageUpload';
import { useAppDispatch } from '../../store/store';
import { setDataFormHookData } from '../../store/form/slice';

const ReactHookForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<IFormData>({
    mode: 'onChange',
    resolver: yupResolver(schemaYup),
  });

  const dispatch = useAppDispatch();
  const password = watch('password', '');
  const { fileBase, handleImageChange } = useImageUpload();

  const onSubmit: SubmitHandler<IFormData> = (data) => {
    data.file = fileBase;
    dispatch(setDataFormHookData(data));
  };

  return (
    <div className="container">
      <BtnBack />
      <h1>React Hook Form</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" type="text" placeholder="Enter name" {...register('name')} />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="age">Age</label>
          <input id="age" type="number" placeholder="Enter age" {...register('age')} />
          {errors.age && <p>{errors.age.message}</p>}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" placeholder="Enter email" {...register('email')} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" placeholder="Enter password" {...register('password')} />
          {errors.password && <p>{errors.password.message}</p>}
          {password && <PasswordStrength password={password} />}
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Enter confirm password"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        </div>
        <div>
          <label htmlFor="gender">Gender</label>
          <select id="gender" {...register('gender')}>
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && <p>{errors.gender.message}</p>}
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <select id="country" {...register('country')}>
            <option value="">Select country</option>
            <option value="usa">USA</option>
            <option value="canada">Canada</option>
            <option value="russia">Russia</option>
          </select>
          {errors.country && <p>{errors.country.message}</p>}
        </div>
        <div>
          <label htmlFor="file">Image</label>
          <input type="file" id="file" {...register('file')} onChange={handleImageChange} />
          {errors.file && <p>{errors.file.message}</p>}
        </div>
        <div className="block-agree">
          <label htmlFor="agree">Agree?</label>
          <input type="checkbox" id="checkbox" {...register('agree')} />
          {errors.agree && <p>{errors.agree.message}</p>}
        </div>

        <button type="submit" disabled={!isValid}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReactHookForm;

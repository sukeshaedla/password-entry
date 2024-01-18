import { useForm } from "react-hook-form";
import React, { useRef } from "react";
import "./App.css";

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = (data, e) => {
    e.preventDefault();
    console.log(data);
    alert(`Thank you. You account has been created`);
    reset();
  };

  return (
    <div className='App'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='form-control'></div>
        <div className='passwordSection'>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type={"password"}
            name='password'
            aria-invalid={errors.password ? "true" : "false"}
            {...register("password", {
              required: "Password is required.",
              minLength: {
                value: 6,
                message: "Password should be at-least 6 characters.",
              },
              pattern: {
                value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/,
                message: `Password should contain at least one uppercase letter, lowercase
                letter, digit, and special symbol.`,
              },
            })}
          />
          {errors.password && (
            <p role='alert' className='errorMsg'>
              {errors.password.message}
            </p>
          )}

          <label>Repeat password</label>
          <input
            name='password_confirm'
            type={"Confirm password"}
            {...register("password_confirm", {
              validate: (value) =>
                value === password.current || "The passwords do not match",
            })}
          />
          {errors.password_repeat && <p>{errors.password_repeat.message}</p>}
        </div>
        <div className='form-control'>
          <label></label>
          <button id='submit-btn' type='submit'>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

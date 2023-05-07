import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { registerUser, reset } from "../features/auth/authSlice";
import { useForm } from "react-hook-form";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  //use react hook form
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(registerUser(data));
  };

  React.useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(reset());
    }
    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [isError, isSuccess, user, message, navigate, dispatch]);

  return (
    <div className='bg-[#987EFF]'>
      <div className='flex flex-col items-center justify-center h-screen'>
        <div className='flex flex-col items-center justify-center py-6 px-6 bg-white rounded-2xl'>
          <h1 className='text-4xl font-bold text-[#987EFF]'>Register</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col items-center justify-center w-full h-full'
          >
            <input
              id='name'
              {...register("name", { required: "Please enter name" })}
              className='w-3/4 h-12 px-4 mt-8 text-xl border-2 border-[#987EFF] rounded-2xl focus:outline-none'
              type='text'
              placeholder='Username'
            />
            {errors.name && (
              <div className='text-red-500'>{errors.name.message}</div>
            )}
            <input
              id='email'
              {...register("email", {
                required: "Please enter email",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                  message: "Please enter valid email",
                },
              })}
              className='w-3/4 h-12 px-4 mt-8 text-xl border-2 border-[#987EFF] rounded-2xl focus:outline-none'
              type='email'
              placeholder='Email'
            />
            {errors.email && (
              <div className='text-red-500'>{errors.email.message}</div>
            )}
            <input
              id='password'
              {...register("password", {
                required: "Please enter password",
                minLength: {
                  value: 6,
                  message: "password is more than 5 chars",
                },
              })}
              className='w-3/4 h-12 px-4 mt-8 text-xl border-2 border-[#987EFF] rounded-2xl focus:outline-none'
              type='password'
              placeholder='Password'
            />
            {errors.password && (
              <div className='text-red-500 '>{errors.password.message}</div>
            )}
            <input
              id='confirmPassword'
              {...register("confirmPassword", {
                required: "Please confirm password",
                validate: (value) => value === getValues("password"),
                minLength: {
                  value: 6,
                  message: "confirm password is more than 5 chars",
                },
              })}
              className='w-3/4 h-12 px-4 mt-8 text-xl border-2 border-[#987EFF] rounded-2xl focus:outline-none'
              type='password'
              placeholder='Confirm Password'
            />

            {errors.confirmPassword && (
              <div className='text-red-500 '>
                {errors.confirmPassword.message}
              </div>
            )}
            {errors.confirmPassword &&
              errors.confirmPassword.type === "validate" && (
                <div className='text-red-500 '>Password do not match</div>
              )}
            <button className='w-3/4 h-12 mt-8 text-xl font-bold text-white bg-[#987EFF] rounded-2xl focus:outline-none'>
              Register
            </button>
            <p
              className='
              flex flex-row   justify-center w-3/4 h-12 mt-8 text-xl text-center
            '
            >
              Already have an account?{" "}
              <Link className='text-[#987EFF]' to='/login'>
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;

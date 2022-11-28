import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { message } from 'antd';
import adminApi from '~/apis/adminApi';
import * as Yup from 'yup';
import { useFormik } from 'formik';
function Login(props) {
  const { onLogin } = props;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFinish = async (account) => {
    try {
      const response = await adminApi.postLogin({account});
      if (response) {
        message.success('Đăng nhập thành công', 2);
        onLogin(true, response.data.name);
      }
    } catch (error) {
      message.error('Tài khoản không tồn tại hoặc sai mật khẩu', 2);
      onLogin(false);
    }
  };
  const formik = useFormik({
    // giá trị khởi tạo cho formik
    initialValues: {
      userName: '',
      password: '',
    },
    // validate form trước submit với yup
    validationSchema: Yup.object({
      userName: Yup.string().trim().required("*Username bạn là gì ?"),
      password: Yup.string().trim().required("Bạn chưa nhập mật khẩu")
    }),
    onSubmit: async (account) => {
      try {
        const response = await adminApi.postLogin(account);
        if (response) {
          message.success('Đăng nhập thành công', 2);
          onLogin(true, response.data.name);
        }
      } catch (error) {
        
        message.error('Tài khoản không tồn tại hoặc sai mật khẩu', 2);
        onLogin(false);
      }
    }

  })
  return (
    <div className='bg-white h-[70vh] w-screen flex justify-center items-center flex-col'>
      <h2 className="mb-4 text-2xl font-bold">Đăng nhập với quyền Admin</h2>
      <div className="px-6 py-3 rounded border w-64">
        <div className="flex flex-col items-center justify-center mb-4">
          <h2 className="text-2xl font-bold">Login</h2>
        </div>
        <form onSubmit={formik.handleSubmit} method="POST">
          <div className="flex flex-col my-2">
            <label className="text-xs text-gray-400">Username</label>
            {formik.errors.userName && (
              <>
                <div className="text-xs text-red-400 flex justify-between items-center">
                  <span>
                    <p className="text-red-600">{formik.errors.userName}</p>
                  </span>
                 
                </div>
              </>

            )}

            <input
              className="border rounded px-3 py-1 mt-2"
              type="text"
              placeholder="username123" 
              name="userName" id="userName"
              onChange={formik.handleChange} values={formik.values.email} />
          </div>
          <div className="flex flex-col my-2">
            <label className="text-xs text-gray-400">Password</label>
            <input className="border rounded px-3 py-1 mt-2" type="password" name="password" id="password" placeholder="••••••••" onChange={formik.handleChange} values={formik.values.email} />
            {formik.errors.password && (
              <p className="text-red-600">{formik.errors.password}</p>
            )}
          </div>
          <div className="flex flex-col items-center justify-center my-3">
            <button type="submit" className="w-full text-white bg-primary hover:brightness-125 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Đăng nhập</button>

          </div>
        </form>
      </div>
    </div>
    


  );
}

Login.propTypes = {
  onLogin: PropTypes.func,
};

export default Login;

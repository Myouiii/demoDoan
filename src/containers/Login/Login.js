import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import loginApi from '../../apis/loginApi';
import authReducers from '../../reducers/auth'
import LoginGoogle from '../../components/LoginGoogle/LoginGoogle';
function Login() {

  const navigate = useNavigate();
  const windowWidth = window.screen.width;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDisableLogin, setIsDisableLogin] = useState(false);
  const dispatch = useDispatch();
  // fn: xử lý khi đăng nhập thành công
  const onLoginSuccess = async (data) => {
    try {
      setIsSubmitting(false);
      message.success('Đăng nhập thành công');
      // lưu refresh token vào local storage
      localStorage.setItem(process.env.REFRESH_TOKEN, data.refreshToken);
      // Note: Lưu jwt vào localStorage nếu deploy heroku
      if (process.env.NODE_ENV === 'production')
        localStorage.setItem(process.env.REFRESH_TOKEN, data.token);
      dispatch(authReducers.setIsAuth(true));
      setTimeout(() => {
        navigate('/');
      }, 750);
    } catch (error) {
      message.error('Lỗi đăng nhập.');
    }
  };

  const formik = useFormik({
    // giá trị khởi tạo cho formik
    initialValues: {
      email: '',
      password: '',
    },
    // validate form trước submit với yup
    validationSchema: Yup.object({
      email: Yup.string().trim().required("* Email bạn là gì ?").email("* Email không hợp lệ !"),
      password: Yup.string().trim().required("Bạn chưa nhập mật khẩu")
    }),
    onSubmit: async (account) => {
      try {
        setIsSubmitting(true);
        const result = await loginApi.postLogin(account)
        //const result = await axios.post("apis/login", account)

        if (result.status === 200) {
          onLoginSuccess(result.data);
        }
      } catch (error) {
        setIsSubmitting(false);
        if (error.response) {
          const { failedLoginTimes } = error.response.data;
          const messageError = error.response.data.message;
          if (failedLoginTimes >= 5) {
            message.error(
              'Vượt quá số lần đăng nhập.\nKiểm tra email hoặc nhấn "Quên mật khẩu"',
              4,
            );
            setIsDisableLogin(true);
          } else {
            message.error(messageError);
          }
        } else {
          console.log("err: ", error);
          message.error('Đăng nhập thất bại');

        }
      }
    }

  })


  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-8 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                <b>Đăng nhập</b>
              </h1>
              <form className="space-y-4 md:space-y-6 " onSubmit={formik.handleSubmit}>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email của bạn</label>
                  <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" required=""
                    onChange={formik.handleChange} values={formik.values.email}
                  />
                  {formik.errors.email && (
                    <p className="text-red-600">{formik.errors.email}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu</label>
                  <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required=""
                    onChange={formik.handleChange} values={formik.values.password}
                  />
                  {formik.errors.password && (
                    <p className="text-red-600">{formik.errors.password}</p>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-3000" required=""
                        onChange={formik.handleChange}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Duy trì đăng nhập</label>
                    </div>
                  </div>
                  <a href="/" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Quên mật khẩu?</a>
                </div>
                {/* <button type="submit" className="w-full text-white bg-primary hover:brightness-125 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Đăng nhập</button> */}
                <Button
                    className="w-full text-white bg-primary hover:brightness-125 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    size="large"
                    type="primary"
                    htmlType="submit"
                    disabled={isDisableLogin}
                    loading={isSubmitting}>
                    Đăng nhập
                  </Button>
                <LoginGoogle
                  title={windowWidth > 375 ? 'Đăng nhập với Gmail' : 'Gmail'}
                />
                
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Bạn chưa có tài khoản? <Link to="/signup" className="font-medium text-primary-600 hover:underline">Đăng ký</Link>
                </p>
              </form>
              
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
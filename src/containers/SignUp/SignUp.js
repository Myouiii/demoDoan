/* eslint-disable no-useless-escape */
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import accountApi from '../../apis/accountApi';
function SignUp() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const windowWidth = window.screen.width;
    const [isSending, setIsSending] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isRedirectLogin, setIsRedirectLogin] = useState(false);

    const formik = useFormik({
        // giá trị khởi tạo cho formik
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
            fullName: 'tinh',
            address: '180 cao lo',
            gender: true,
        },
        // validate form trước submit với yup
        validationSchema: Yup.object({
            email: Yup.string()
                .trim()
                .required('* Email bạn là gì ?')
                .email('* Email không hợp lệ !'),
            fullName: Yup.string()
                .trim()
                .required('* Tên bạn là gì ?')
                .matches(
                    /[^~!@#%\^&\*()_\+-=\|\\,\.\/\[\]{}'"`]/,
                    '* Không được chứa ký tự đặc biệt',
                )
                .max(70, '* Tối đa 70 ký tự'),
            password: Yup.string()
                .trim()
                .required('* Mật khẩu của bạn là gì ?')
                .min(6, '* Mật khẩu ít nhất 6 ký tự')
                .max(20, '* Mật khẩu tối đa 20 ký tự'),
            // .matches(
            //     /^(?=.*[A-Z])(?=.*[~!@#%\^&\*()_\+-=\|\\,\.\/\[\]{}'"`])(?=.*[0-9])(?=.*[a-z]).{6,}$/,
            //     'Mật khẩu chứa chữ Hoa,chữ thường, số và ký tự đặc biệt',
            // ),
            confirmPassword: Yup.string().required("* Vui lòng xác nhận mật khẩu!").oneOf(
                [Yup.ref('password'), null],
                '* Mật khẩu chưa trùng khớp',
            ),
        }),
        // fn: xứ lý đăng ký
        onSubmit: async (account) => {
            try {
                console.log(account);
                setIsSubmitting(true);
                const result = await accountApi.postSignUp({ account });
                if (result.status === 200) {
                    message.success('Đăng ký thành công.', 1);
                    setIsSubmitting(false);
                    setIsRedirectLogin(true);
                    navigate('/login');
                }
            } catch (error) {
                setIsSubmitting(false);
                if (error.response) {
                    message.error(error.response.data.message);
                } else {
                    message.error('Đăng ký thất bại, thử lại');
                }
            }
        }

    })


    return (

        <>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Tạo tài khoản
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
                                <div>

                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""
                                        onChange={formik.handleChange} values={formik.values.email}
                                    />
                                    {formik.errors.email && (
                                        <p className="text-red-600">{formik.errors.email}</p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                                        onChange={formik.handleChange} values={formik.values.password}
                                    />
                                    {formik.errors.password && (
                                        <p className="text-red-600">{formik.errors.password}</p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Xác nhận mật khẩu</label>
                                    <input type="password" name="confirmPassword" id="confirmPassword" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                                        onChange={formik.handleChange} values={formik.values.confirmPassword}
                                    />
                                    {formik.errors.confirmPassword && (
                                        <p className="text-red-600">{formik.errors.confirmPassword}</p>
                                    )}
                                </div>
                                {/* <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="/">Terms and Conditions</a></label>
                                    </div>
                                </div> */}
                                <button type="submit" className="w-full text-white bg-primary hover:brightness-125 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Đăng ký</button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Bạn đã có tài khoản? <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Đăng nhập</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>

    );
}

export default SignUp;
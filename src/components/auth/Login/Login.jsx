import React, { useEffect } from "react"
import style from './Login.module.sass'
import { useFormik } from "formik"
import * as Yup from 'yup'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { makeLogin, resetAuthError } from "store/authSlice"
import cn from 'classnames'

const Login = () => {

    const isPending = useSelector(store => store.auth.auth.isPending)
    const errorMessage = useSelector(store => store.auth.auth.errorMessage)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(resetAuthError())
    }, [])

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .min(8, 'Должен быть длиннее 7 символов')
                .required('Поле не заполнено'),
            email: Yup.string()
                .email('Некорректный email')
                .required('Поле не заполнено'),
        }),
        onSubmit: async (values) => {
            dispatch(makeLogin(values))
        }
    })

    return(
        <div className={style.authFormContainer}>
            <div className={style.title}>
                Входите и делайте
            </div>
            <div className={style.mainForm}>
                {
                    errorMessage
                    ?
                    <div className={style.formMessage}>
                        <span>{errorMessage}</span>
                    </div>
                    :null
                }
                <form action="" onSubmit={formik.handleSubmit}>
                    <label htmlFor="email" className={style.label}>
                        <div className={style.labelTitle}>Email</div>    
                        <input type="email" name="email" id="email" {...formik.getFieldProps('email')}/>
                        {formik.touched.email && formik.errors.email ? <div className={style.firldError}>{formik.errors.email}</div> : null}
                    </label>
                    <label htmlFor="password" className={style.label}>
                        <div className={style.labelTitle}>Пароль</div>  
                        <input type="password" name="password" id="password" {...formik.getFieldProps('password')}/>
                        {formik.touched.password && formik.errors.password ? <div className={style.firldError}>{formik.errors.password}</div> : null}
                    </label>
                    <button disabled={isPending} type="submit" className={cn(style.mainBtn, {[style.mainBtn_pending]: isPending})}>
                        <span>Войти</span>
                    </button>
                </form>
            </div>
            <Link className={style.switchFormBtn} to={'/auth/signup'}>
                <span>У меня нет аккаунта</span>
            </Link>
        </div>
    )
}

export default Login
import {createPortal} from "react-dom";
import React, {useEffect, useRef, useState} from "react";
import {Container, ContainerItem, FormButton, FormContainer, FormInput, StyledSpan} from "./Modal.style";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
const modalRootElement = document.querySelector('#portal')
const Modal = (props) => {
    const {open, onClose, } = props;
    const ref = useRef();
    const [forms,setForms] = useState(true)
    const initialValues = {
        email: '',
        password: '',
        name: ''
    };
    const initialValuesForLogin = {
        email: '',
        password: '',
        name: ''
    };
    const validationSchema = Yup.object({
        email: Yup.string().email('Неверный формат email').required('Это поле обязательно для заполнения'),
        password: Yup.string().required('Это поле обязательно для заполнения').min(6, 'Пароль слишком короткий')
            .matches(/[a-zA-Z]/, 'Используйте только латинские буквы a-z'),
        name: Yup.string().required('Это поле обязательно для заполнения').min(4, 'Имя слишком короткое')
            .matches(/[a-zA-Z]/, 'Используйте только латинские буквы a-z')
    });
    const validationSchemaForLogin = Yup.object({
        email: Yup.string().email('Неверный формат email').required('Это поле обязательно для заполнения'),
        password: Yup.string().required('Это поле обязательно для заполнения').min(6, 'Пароль слишком короткий')
            .matches(/[a-zA-Z]/, 'Используйте только латинские буквы a-z')
    });
    const Registration = async (email, password, name) => {
        const response = await fetch('http://localhost:3001/registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                name: name,
                password: password
            })
        });

        if (response.ok) {
            console.log('nice')
        }
    };
    const Login = async (email, password, name) => {
        const response = await fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        if (response.ok) {
            console.log('nice')
            onClose();
        }
    };
    useEffect(() => {
        const checkOutside = (e) => {
            if (e.target?.contains(ref.current) && e.target !== ref.current) {
                onClose && onClose();
            }
        }
        document.addEventListener('click', checkOutside);
        document.addEventListener('scroll', checkOutside);
        return () => {
            document.removeEventListener('click', checkOutside)
            document.removeEventListener('scroll', checkOutside)
        }
    }, [onClose]);
    return createPortal(
        <>
            {open ? (
                <Container>
                    <ContainerItem ref={ref}>
                        {forms ? (<FormContainer>Зарегистрируйтесь
                            <Formik initialValues={initialValues} validationSchema={validationSchema}
                                    onSubmit={values => console.log(JSON.stringify(values))}>
                                {({isSubmitting,isValid,dirty,values,resetForm}) => (
                                    <Form>
                                        <>
                                            <Field type='name' name='name' as={FormInput}/>
                                            <ErrorMessage name='name' component='div' className='ErrorMessages'/>
                                        </>
                                        <>
                                            <Field type='email' name='email' as={FormInput}/>
                                            <ErrorMessage name='email' component='div' className='ErrorMessages'/>
                                        </>
                                        <>
                                            <Field type='password' name='password' as={FormInput}/>
                                            <ErrorMessage name='password' component='div' className='ErrorMessages'/>
                                        </>
                                        <FormButton disabled={!(isValid && dirty) || isSubmitting} onClick={async () => {
                                            isSubmitting = true
                                            await Registration(values.email, values.password,values.name)
                                            setTimeout(() => resetForm(), 500)
                                        }}>
                                            {isSubmitting ? 'Загрузка...' : 'Зарегистрироваться'}
                                        </FormButton>
                                    </Form>
                                )}
                            </Formik>
                            <span>Уже зарегистрированы? <span onClick={()=>setForms(false)}>Войти</span></span>
                        </FormContainer>) : (<FormContainer>Войдите в аккаунт
                            <Formik initialValues={initialValuesForLogin} validationSchema={validationSchemaForLogin}
                                    onSubmit={values => console.log(JSON.stringify(values))}>
                                {({isSubmitting,isValid,dirty,values,resetForm}) => (
                                    <Form>
                                        <>
                                            <Field type='email' name='email' as={FormInput}/>
                                            <ErrorMessage name='email' component='div' className='ErrorMessages'/>
                                        </>
                                        <>
                                            <Field type='password' name='password' as={FormInput}/>
                                            <ErrorMessage name='password' component='div' className='ErrorMessages'/>
                                        </>
                                        <StyledSpan>Забыли пароль?</StyledSpan>
                                        <FormButton disabled={!(isValid && dirty) || isSubmitting} onClick={async () => {
                                            isSubmitting = true
                                            await Login(values.email, values.password)
                                            setTimeout(() => resetForm(), 500)
                                        }}>
                                            {isSubmitting ? 'Загрузка...' : 'Войти'}
                                        </FormButton>
                                    </Form>
                                )}
                            </Formik>
                            <span>Еще нет аккаунта? <span onClick={()=>setForms(true)}>Зарегистрируйтесь</span></span>
                        </FormContainer>)}
                    </ContainerItem>
                </Container>) : null}
        </>
        , modalRootElement);
}

export default Modal;

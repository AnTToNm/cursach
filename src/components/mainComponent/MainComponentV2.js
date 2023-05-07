import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import styled from "styled-components";

const ContItem = styled.div`
  display: flex;
  width: 47vw;
  height: 2.5vw;
  padding: 1vw 0 .5vw 1vw;
  margin-right: 5vw;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  .ErrorMessages{
    color: red;
  }
`
const InputStyle = styled.input`
  width: 35vw;
  height: 2vw;
`
const Submit = styled.button`
  padding: 10px 20px;
  justify-content: center;
  background-color: saddlebrown;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  margin-left: 21.5vw;
  margin-right: 21.5vw;
  margin-bottom: .3vw;
`
const FormReport = () => {
    const initialValues = {
        number: '',
        data: '',
        event: '',
        animal: '',
        typeAnimal: '',
        quantity: '',
        measurement: '',
        weight: '',
        note: '',
    };

    const validationSchema = Yup.object({
        number: Yup.number().required('Это поле обязательно для заполнения'),
        data: Yup.date().required('Это поле обязательно для заполнения'),
        event: Yup.string().required('Это поле обязательно для заполнения'),
        animal: Yup.string().required('Это поле обязательно для заполнения'),
        typeAnimal: Yup.string().required('Это поле обязательно для заполнения'),
        quantity: Yup.number().required('Это поле обязательно для заполнения'),
        measurement: Yup.string().required('Это поле обязательно для заполнения'),
        weight: Yup.number().required('Это поле обязательно для заполнения'),
        note: Yup.string().max(200, 'Максимальное количество символов: 200'),
    })
    const hanldeSubmit = async (values) => {
        try {
            const response = await fetch("http://localhost:3001/cattle-report", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
            const data = await response.json();
            console.log('Response:', data);
        } catch (error) {
            console.error('Error handling response:', error);
        }
    }



    return (
        <>
            <Formik initialValues={initialValues} validationSchema={validationSchema}
                    onSubmit={values => console.log(JSON.stringify(values))}>
                {({isSubmitting, isValid, dirty, values, resetForm}) => (
                    <Form style={{maxWidth:'50vw'}}>
                        <ContItem>
                            Код животного:
                            <Field type='number' name='number' as={InputStyle}/>
                            <ErrorMessage name='number' component='div' className='ErrorMessages'/>
                        </ContItem>
                        <ContItem>
                            Дата:
                            <Field type='datetime-local' name='data' as={InputStyle}/>
                            <ErrorMessage name='data' component='div' className='ErrorMessages'/>
                        </ContItem>
                        <ContItem>
                            Событие:
                            <Field type='event' name='event' as={InputStyle}/>
                            <ErrorMessage name='event' component='div' className='ErrorMessages'/>
                        </ContItem>
                        <ContItem>
                            Животное:
                            <Field type='animal' name='animal' as={InputStyle}/>
                            <ErrorMessage name='animal' component='div' className='ErrorMessages'/>
                        </ContItem>
                        <ContItem>
                            Вид:
                            <Field type='typeAnimal' name='typeAnimal' as={InputStyle}/>
                            <ErrorMessage name='typeAnimal' component='div' className='ErrorMessages'/>
                        </ContItem>
                        <ContItem>
                            Количество:
                            <Field type='number' name='quantity' as={InputStyle}/>
                            <ErrorMessage name='quantity' component='div' className='ErrorMessages'/>
                        </ContItem>
                        <ContItem>
                            Единица измерения:
                            <Field type='measurement' name='measurement' as={InputStyle}/>
                            <ErrorMessage name='measurement' component='div' className='ErrorMessages'/>
                        </ContItem>
                        <ContItem>
                            Масса:
                            <Field type='number' name='weight' as={InputStyle}/>
                            <ErrorMessage name='weight' component='div' className='ErrorMessages'/>
                        </ContItem>
                        <ContItem>
                            Примечание:
                            <Field type='textarea' name='note' as={InputStyle}/>
                            <ErrorMessage name='note' component='div' className='ErrorMessages'/>
                        </ContItem>
                        <Submit type='submit' disabled={!(isValid && dirty) || isSubmitting} onClick={async () =>{
                            isSubmitting=true
                            await hanldeSubmit(values)
                            setTimeout(()=> resetForm(),500)
                        }}>
                            {isSubmitting ? 'Загрузка...' : 'Отправить'}
                        </Submit>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default FormReport;
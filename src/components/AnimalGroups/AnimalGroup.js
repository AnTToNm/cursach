import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import styled from "styled-components";

const InputStyle = styled.input`
  width: 7vw;
  height: 1.5vw;
`

const validationSchema = Yup.object().shape({
    animalType: Yup.string().required("Animal type is required"),
    quantity: Yup.number().required("Quantity is required").positive("Quantity must be a positive number"),
    weight: Yup.number().required("Weight is required").positive("Weight must be a positive number"),
});

const AnimalGroup = ({ group }) => {
    const handleSubmit = (values) => {
        console.log(values);
    };

    return (
        <Formik
            initialValues={{ animalType: group.animalType, quantity: group.quantity, weight: group.weight, notes: group.notes }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                <Form style={{display: 'flex', marginLeft: '5%', marginRight: '5%', marginTop: '5%', background: 'green', justifyContent: 'center', flexWrap: 'inherit'}}>
                    <div>
                        <Field style={{width: '7vw', height: '1.7vw'}} as="select" name="animalType" onChange={handleChange} onBlur={handleBlur} value={values.animalType}>
                            <option value="">Select an animal type</option>
                            <option value="broiler">Broiler</option>
                            <option value="quail">Quail</option>
                            <option value="goose">Goose</option>
                            <option value="duck">Duck</option>
                            <option value="turkey">Turkey</option>
                            <option value="chicken">Chicken</option>
                            <option value="sheep">Sheep</option>
                        </Field>
                        <ErrorMessage name="animalType" />
                    </div>
                    <div>
                        <Field type="number" placeholder='Количество' name="quantity" as={InputStyle} onChange={handleChange} onBlur={handleBlur} value={values.quantity} />
                        <ErrorMessage name="quantity" />
                    </div>
                    <div>
                        <Field type="number" name="weight"  as={InputStyle} onChange={handleChange} onBlur={handleBlur} value={values.weight} />
                        <ErrorMessage name="weight" />
                    </div>
                    <div>
                        <Field as="textarea" name="notes" as={InputStyle} onChange={handleChange} onBlur={handleBlur} value={values.notes} />
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default AnimalGroup;
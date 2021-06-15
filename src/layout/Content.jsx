import React, { useState, useEffect } from "react";
import { Dropdown, Menu } from "semantic-ui-react";
import { getCities } from "../service/City";
import { Formik, setNestedObjectValues } from "formik";
import { Form, Input, SubmitButton, ResetButton, TextArea, Select } from 'formik-semantic-ui-react'
import { Grid, Header, Segment, FormGroup, FormField, Label } from 'semantic-ui-react'
import * as yup from "yup";
import { addJobPosting } from "../service/JobPostingService";

export default function Content() {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    getCities().then((sonuc) => setCities(sonuc.data.data));
  }, []);

  var cityOptions = cities.map(function (city) {
    return { key: city.id, text: city.name, value: city.id, id: city.id };
  });

  let schema = yup.object().shape({
    createdDate: yup.date().required("Zorunlu Alan"),
    openPositionNumber: yup.string().required(),
    closedDate: yup.date().required("Zorunlu Alan"),
    cityId: yup.number().required(),
    employerId: yup.number().required(),
    description: yup.string().required(),
    jobPositionId: yup.number().required(),
  });

  return (
    <div>
      <h1>Anywhere in your app!</h1>

      <Formik
        initialValues={{
          createdDate: "",
          openPositionNumber: "",
          cityId: "",
          description: "",
          closedDate: "",
          employerId: "",
          jobPositionId: "",
          
        }}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting }) => {
          addJobPosting(values).then(response => console.log(response.data.message))

          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <Form>
            <FormGroup widths="equal">
              <FormField>
                <Input
                  name="createdDate"
                  placeholder="First name"
                  value={values.createdDate}
                  onChange={handleChange}
                  type= "date"
                />
                {errors.createdDate && (
                  <Label basic color="red" pointing>
                    {errors.createdDate}
                  </Label>
                )}
              </FormField>

              <FormField>
                <Input
                  name="closedDate"
                  placeholder="First name"
                  value={values.closedDate}
                  onChange={handleChange}
                  type= "date"
                />
                {errors.closedDate && (
                  <Label basic color="red" pointing>
                    {errors.closedDate}
                  </Label>
                )}
              </FormField>

              <FormField>
                <Input
                  name="openPositionNumber"
                  placeholder="Last name"
                  value={values.openPositionNumber}
                  type="number"
                  onChange={handleChange}
                />
                {errors.openPositionNumber && (
                  <Label basic color="red" pointing>
                    {errors.openPositionNumber}
                  </Label>
                )}
              </FormField>
              <FormField>
                <Input
                  name="employerId"
                  placeholder="emp Id"
                  value={values.employerId}
                  type="number"
                  onChange={handleChange}
                />
                {errors.employerId && (
                  <Label basic color="red" pointing>
                    {errors.employerId}
                  </Label>
                )}
              </FormField>
              <FormField>
                <Input
                  name="jobPositionId"
                  placeholder="emp Id"
                  value={values.jobPositionId}
                  type="number"
                  onChange={handleChange}
                />
                {errors.jobPositionId && (
                  <Label basic color="red" pointing>
                    {errors.jobPositionId}
                  </Label>
                )}
              </FormField>
              <FormField>
                <Select
                  name="cityId"
                  id={cityOptions.text}
                  onChange={handleChange}
                  options={cityOptions}
                  label="City"
                  value={values.cityId || ""}
                  onBlur={handleBlur}
                  touched={values.cityId}
                  style={{ display: "block" }}
                >
    
                </Select>
              </FormField>
            </FormGroup>
            <FormField>
                <TextArea
              id="description"
              control={TextArea}
              label="description"
              placeholder="description"
              value={values.description}
            />
             {errors.description && (
                  <Label basic color="red" pointing>
                    {errors.description}
                  </Label>
                )}</FormField>
            
           
            <FormField
              id="form-button-control-public"
              control={SubmitButton}
              content="Confirm"
              type="submit"
              label="Label with htmlFor"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
}

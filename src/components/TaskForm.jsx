import PropTypes from "prop-types";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { LEVELS } from "../models/levels.enum";
import { Task } from "../models/task.class";

const TaskForm = ({ length, add }) => {
  const initialValues = {
    name: "",
    description: "",
    completed: false,
    level: LEVELS.NORMAL,
  };

  const taskShcema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    level: Yup.string()
      .oneOf(Object.values(LEVELS), "You most select a Level")
      .required("Level is required"),
  });

  const addTask = ({ name, description, level }, { setSubmitting }) => {
    const newTask = new Task(name, description, false, level);
    add(newTask);
    setSubmitting(false);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={taskShcema}
        onSubmit={addTask}
      >
        {({ touched, errors, isSubmitting }) => (
          <Form className="d-flex justify-content-center align-items-center mb-4">
            <div className="form-outline flex-fill">
              <Field
                className="form-control form-control-lg"
                type="text"
                name="name"
                placeholder="Put the task name"
              />
              {errors.name && touched.name && (
                <ErrorMessage name="name" component="div" />
              )}
              <Field
                className="form-control form-control-lg"
                type="text"
                name="description"
                placeholder="Put the task description"
              />
              {errors.description && touched.description && (
                <ErrorMessage name="description" component="div" />
              )}

              <Field
                className="form-control form-control-lg"
                as="select"
                name="level"
              >
                <option value={LEVELS.NORMAL}>Normal</option>
                <option value={LEVELS.URGENT}>Urgent</option>
                <option value={LEVELS.BLOCKING}>Blocking</option>
              </Field>
              {errors.level && touched.level && (
                <ErrorMessage name="level" component="div" />
              )}

              <button type="submit" className="btn btn-success btn-lg ms-2">
                {length > 0 ? "Add New Task" : "Create your First Task"}
              </button>
              {isSubmitting && <p>Sending task...</p>}
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

TaskForm.protoTypes = {
  add: PropTypes.func.isRequired,
  length: PropTypes.number.isRequired,
};

export default TaskForm;

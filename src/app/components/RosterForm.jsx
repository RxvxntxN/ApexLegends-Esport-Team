'use client';
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as z from 'zod';

const joinRoster = z.object({
  playerName: z.string().min(2, { message: "Name must be at least 2 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  teamRole: z.string().min(1, { message: "Role is required" }),
  gender: z.string().refine(value => ['male', 'female', 'other'].includes(value), {
    message: "Please select your gender"
  }),
  rank: z.boolean().optional(),
});

// Custom validation function using Zod
const validate = (values) => {
  try {
    joinRoster.parse(values);
    return {};
  } catch (error) {
    // Transform Zod error into Formik's format
    return error.errors.reduce((acc, err) => {
      acc[err.path[0]] = err.message;
      return acc;
    }, {});
  }
};

function JoinRosterForm({ onSubmit, teamName }) {
  return (
    <Formik
      initialValues={{
        playerName: '',
        email: '',
        teamRole: '',
        gender: '',
        rank: false,
      }}
      validate={validate}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className="space-y-4">
          <h2 className="text-xl font-semibold text-center">Join {teamName}</h2>

          <div>
            <label className="block text-sm font-medium">Player Name</label>
            <Field
              type="text"
              name="playerName"
              className="mt-1 block w-full p-2 border rounded-md"
            />
            <ErrorMessage name="playerName" component="div" className="text-red-500 text-sm" />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <Field
              type="email"
              name="email"
              className="mt-1 block w-full p-2 border rounded-md"
            />
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
          </div>

          <div>
            <label className="block text-sm font-medium">Role in Team</label>
            <Field
              type="text"
              name="teamRole"
              className="mt-1 block w-full p-2 border rounded-md"
            />
            <ErrorMessage name="teamRole" component="div" className="text-red-500 text-sm" />
          </div>

          <div>
            <label className="block text-sm font-medium">Gender</label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <Field
                  type="radio"
                  name="gender"
                  value="male"
                  className="mr-2"
                />
                Male
              </label>
              <label className="inline-flex items-center">
                <Field
                  type="radio"
                  name="gender"
                  value="female"
                  className="mr-2"
                />
                Female
              </label>
              <label className="inline-flex items-center">
                <Field
                  type="radio"
                  name="gender"
                  value="other"
                  className="mr-2"
                />
                Other
              </label>
            </div>
            {errors.gender && touched.gender && (
              <div className="text-red-500 text-sm mt-1">{errors.gender}</div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Were you the Predator in your previous rank?</label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <Field type="checkbox" name="rank" checked={isSubmitting.rank} className="mr-2" />
                Yes
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default JoinRosterForm;
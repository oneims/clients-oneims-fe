export const Schema__Form__CreateAccount = {
  fields: [
    {
      group: [
        {
          label: "First Name",
          name: "firstName",
          type: "text",
          element: `input`,
          validations: {
            required: {
              value: true,
              message: `First name is required`,
            },
            pattern: {
              value: /^[A-Za-z]+$/i,
              message: `Please only enter valid alphabets`,
            },
          },
        },
        {
          label: "Last Name",
          name: "lastName",
          type: "text",
          element: `input`,
          validations: {
            required: {
              value: true,
              message: `Last name is required`,
            },
            pattern: {
              value: /^[A-Za-z]+$/i,
              message: `Please only enter valid alphabets`,
            },
          },
        },
      ],
    },
    {
      label: "Company",
      name: "company",
      type: "text",
      element: `input`,
      validations: {
        required: {
          value: true,
          message: `Company is required`,
        },
        pattern: {
          value: /^\S*$/,
          message: `Must only be characters`,
        },
      },
    },
    {
      label: "Email address",
      name: "email",
      type: "email",
      element: `input`,
      validations: {
        required: {
          value: true,
          message: `Email address is required`,
        },
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: `Please enter a valid email address`,
        },
      },
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      element: `input`,
      validations: {
        required: {
          value: true,
          message: `Password is required`,
        },
        minLength: {
          value: 10,
          message: `Must be at least 10 characters`,
        },
      },
    },
  ],
  button: {
    title: `Sign up`,
    type: `submit`,
    variant: `primary`,
    className: `w-100`,
  },
};

export const Schema__Form__Login = {
  fields: [
    {
      label: "Email address",
      name: "email",
      type: "email",
      element: `input`,
      validations: {
        required: {
          value: true,
          message: `Email address is required`,
        },
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: `Please enter a valid email address`,
        },
      },
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      element: `input`,
      validations: {
        required: {
          value: true,
          message: `Password is required`,
        },
        minLength: {
          value: 10,
          message: `Must be at least 10 characters`,
        },
      },
    },
  ],
  button: {
    title: `Log in`,
    type: `submit`,
    variant: `primary`,
    className: `w-100`,
  },
};

export const Schema__Generic_Variables = {
  loginSuccessUrl: "/onboardings",
  homeUrl: "/onboardings",
  domain: "https://clients-oneims.netlify.app",
};

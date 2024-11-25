# Dynamic Form Generator

A React-based dynamic form generator that allows users to build forms dynamically using JSON schemas. The application provides live preview, validation, and support for multiple input types.


## Table of Contents

- [Introduction](#introduction)
- [Setup Instructions](#setup-instructions)
- [Usage Instructions](#usage-instructions)
- [Example JSON Schemas](#example-json-schemas)
- [File Structure](#local-development-guide)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This project allows developers to generate dynamic forms based on customizable JSON schemas. It supports various form elements like text inputs, dropdowns, and text areas, making it ideal for building flexible web applications.


## Setup Instructions

### Prerequisites
- Node.js (>= 14.x)
- npm or yarn installed

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/dynamic-form-generator.git
   cd dynamic-form-generator
2. install dependencies:
    npm install
3.Start the development server:
   npm start

The application will be available at http://localhost:3000.

### Usage Instructions
   Open the application in your browser.
   Use the JSON schema editor to define your form.
   Preview the form live as you edit the schema.
   Click "Submit" to see the captured form data.

Example JSON Schemas:

{
  "formTitle": "Contact Us",
  "fields": [
    {
      "id": "name",
      "label": "Name",
      "type": "text",
      "placeholder": "Enter your name",
      "required": true
    },
    {
      "id": "email",
      "label": "Email",
      "type": "email",
      "placeholder": "you@example.com",
      "required": true
    }
  ]
}

Form with Dropdown:

{
  "formTitle": "Feedback Form",
  "fields": [
    {
      "id": "rating",
      "label": "Rate Our Service",
      "type": "select",
      "options": [
        { "value": "excellent", "label": "Excellent" },
        { "value": "good", "label": "Good" },
        { "value": "average", "label": "Average" },
        { "value": "poor", "label": "Poor" }
      ],
      "required": true
    }
  ]
}

### local development guide
  
  dynamic-form-generator/
├── public/              # Static files (index.html, favicon, etc.)
├── src/
│   ├── components/      # Reusable components (DynamicFormGenerator)
        -DynamicFormGenerator.tsx
│   ├── App.tsx          # Main React component
│   ├── index.tsx        # Entry point
    |--- App.css
├── package.json         # Dependencies and scripts
├── README.md   

  src/components/: Contains reusable components like DynamicFormGenerator.
  src/App.tsx: The main entry point of the application.
  public/: Static files like index.html. 

### Contributing

1. fork the repository
2. create a new branch:
   git checkout branch-name
3. Make your changes and commit:
   git commit -m "Add your message here"
4.Push to your branch and create a pull request.

### License
 This project is licensed under the MIT License. See the LICENSE file for details.

### Deployed url
https://react-form-generator-h3sc8qp6b-sravanis-projects-cf279218.vercel.app/


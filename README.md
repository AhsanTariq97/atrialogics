# Atrialogics site with blog & portfolio

## To create a Next.js project with TypeScript, follow these steps:
1. Install the necessary dependencies:
    `npx create-next-app@12.0.7 my-next-project --ts`

    This command creates a new Next.js project with TypeScript, using the latest version of Create Next App.

2. Change into the project directory:
    `cd my-next-project`

3. Start the development server:
    `npm run dev`

    This command starts the Next.js development server and allows you to view your project in the browser.

## Adding Fonts and Configuring Tailwind CSS
Open the _app.tsx file located in the pages directory.

In the _app.tsx file, we add fonts from the @next/font/google package and configure them in tailwind.config.js to use with Tailwind CSS.

1. Import the necessary dependencies:
    ```
    import { Lexend_Giga } from '@next/font/google';
    import { Raleway } from '@next/font/google';
    ```

2. Define the fonts using the respective functions from @next/font/google:
    ```
    const lexendGiga = Lexend_Giga({
        subsets: ['latin'],
        variable: '--font-lexend-giga',
    });

    const raleway = Raleway({
        weight: ['100', '200', '300', '400', '500', '600', '700'],
        subsets: ['latin'],
        variable: '--font-raleway',
    });
    ```

3. In the App component, add the fonts to the className of the main element:
    ```
    <main className={`${lexendGiga.variable} ${IBMPlexSans.variable} ${roboto.variable} ${raleway.variable} font-giga`}>
        {/* Rest of the component */}
    </main>
    ```

    This adds the font classes to the main element, making the fonts available for use.

4. Open the tailwind.config.js file located in the root directory of your project. Add the font families to the theme section of tailwind.config.js:
    ```
    theme: {
        fontFamily: {
            giga: ['var(--font-lexend-giga)'],
            IBM: ['var(--font-IBM)'],
            roboto: ['var(--font-roboto)'],
            raleway: ['var(--font-raleway)'],
        },
    },
    ```

    This configures the font families to be used in your Tailwind CSS styles. Save the files and continue developing your Next.js project with the configured fonts and Tailwind CSS styles.

# AOS (Animate On Scroll)

AOS is a library that provides smooth animations on scroll for elements on your webpage. It allows you to easily add animations to your Next.js application by triggering them when an element enters the viewport during scrolling.

## Installation
First, install the required packages by running the following command:
`npm install aos`

## Usage
1. Import the necessary dependencies and styles:
    ```
    import AOS from 'aos';
    import 'aos/dist/aos.css';
    ```

2. Initialize AOS in a useEffect hook:
    ```
    useEffect(() => {
    AOS.init();
    }, []);
    ```

3. Add the desired animation attributes to your HTML elements using the data-aos attribute:
    ```
    <div data-aos="fade-up" className="...">
    <!-- Your content here -->
    </div>
    ```

    In the above example, the data-aos="fade-up" attribute is added to the div element, which specifies that the fade-up animation should be applied when the element enters the viewport during scrolling. You can choose from a variety of animation options provided by AOS, such as fade, slide, zoom, etc.

4. Customize animation options (optional):
    AOS provides various configuration options to customize the animations. You can modify these options by passing an object to the AOS.init() method. For example:

    ```
    useEffect(() => {
        AOS.init({
            duration: 800,  // Animation duration in milliseconds
            easing: 'ease', // Animation easing
            once: true,     // Whether the animation should only occur once
        });
    }, []);
    ```

For a full list of available configuration options, refer to the [AOS documentation](https://github.com/michalsnik/aos).

# React Hook Form

[React Hook Form](https://react-hook-form.com/) is a flexible library for managing form state and validation in React. It allows you to easily create forms by providing a simple and intuitive API that integrates with your existing React components.

## Getting started
1. To get started with React Hook Form, you can install it using npm or yarn:
    `npm install react-hook-form`

2. Once installed, you can start using it in your React component:
    ```
    import { useForm } from "react-hook-form";

    function MyForm() {
        const { register, handleSubmit } = useForm();
        const onSubmit = data => console.log(data);

        return (
            <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("example")} />
            <button type="submit">Submit</button>
            </form>
        );
    }
    ```

### useForm
The useForm hook is used to initialize your form and provides you with a set of methods and properties to interact with your form. It returns an object with the following properties:

    - register: a function to register your input elements with the form. This function is used to connect your input element to the form's state and validation rules. It returns a set of properties that should be passed to your input element.
    - handleSubmit: a function that takes a callback function as its argument. This callback function will be executed when the form is submitted and passes the form data as its argument.
    - reset: a function that resets the form's state to its initial values.
    - formState: an object that contains the current state of the form, including errors and dirtyFields.

### register
The register function is used to register your input elements with the form. It takes an object with the following properties:

    - name: the name of the input element.
    - required: a boolean value that determines whether the input element is required.
    - validate: a function that takes the value of the input element as its argument and returns a boolean value indicating whether the input is valid. This function can also return a string error message to be displayed to the user.

### Email validation
1. Install [validator](https://github.com/validatorjs/validator.js) library:
    `npm i validator`

2. Then import this library
    `import validator from 'validator';`

3. For validation of email in the form, we use `validator.isEmail()` from the library
    ```
    function MyForm() {
        const validateEmail = (email: string) => {
            if (validator.isEmail(email)) {
            return true
            } else {
            return 'Enter valid email'
            } 
        }

        return (
            <form>
            <input {...register("example", { required: true, validate: validateEmail })} />
            </form>
        );
    }
    ```

In the example above, we have added a validation function to the validate property of the register function. This function checks if the email entered is valid using the validator library.

### React DatePicker

1. Install the [React DatePicker](https://www.npmjs.com/package/react-datepicker) package:
    `npm install react-datepicker`

2. Import the necessary dependencies in your component:
    ```
    import { useController } from "react-hook-form";
    import DatePicker from "react-datepicker";
    import "react-datepicker/dist/react-datepicker.css";
    ```

3. Use the useController function from React Hook Form to integrate the DatePicker with your form:
    ```
    function MyForm() {
        const { control } = useForm();
        const { field } = useController({
            name: 'date',
            control,
            rules: { required: 'Required' }
        });

        return (
            <form>
            <DatePicker
                name="date"
                selected={field.value}
                onChange={(date) => field.onChange(date)}
            />
            </form>
        );
    }
    ```

In the example above, we first destructure the control object from useForm. Then, we use the useController function to create a controlled input for the date field. We provide the name of the field, the control object, and any validation rules if necessary. The useController function returns a field object containing the necessary props to connect the DatePicker with React Hook Form.

# EmailJS/Browser Documentation

The emailjs/browser package allows you to send email forms directly from your React application. It provides a simple and convenient way to integrate email functionality into your contact forms.

## Installation
1. Install EmailJS SDK using npm:
    `npm install @emailjs/browser`

2. Then use following import statement
    `import emailjs from '@emailjs/browser';`

## Sending Email Forms
1. Create a form element and assign a reference to it using the useRef hook. This reference will be used to send the form.
    `const form = useRef(null);`

2. In your component, create a function to handle form submission. This function should call the sendForm function provided by emailjs/browser and pass the necessary parameters:
    - serviceID: The ID of the email service you created on the EmailJS dashboard.
    - templateID: The ID of the email template you want to use for sending the form data.
    - formElement: The reference to the form element obtained using useRef.
    - userID: Your EmailJS user ID.

    Here's an example of the submit handler function:
    > ```
    > const sendEmail = (e) => {
    >  e.preventDefault();
    >
    >  emailjs
    >    .sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_PUBLIC_KEY')
    >    .then((result) => {
    >      console.log(result.text);
    >    })
    >    .catch((error) => {
    >      console.error(error.text);
    >    });
    >};
    >```
    >
    > Replace 'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', and 'YOUR_PUBLIC_KEY' with the respective values from your EmailJS account.

3. Add the ref attribute to the form element. Make sure to call the sendEmail function when the form is submitted:
    ```
    <form ref={form} onSubmit={sendEmail}>
    {/* Form inputs */}
    </form>
    ```


# Using Apollo Client with WordPress as Headless CMS

In this project, WordPress is used as a headless CMS (Content Management System), and Apollo Client is utilized to fetch data from the WordPress backend using **GraphQL**. 

1. Install the @apollo/client library, which provides the functionality for making GraphQL requests.
    `npm install @apollo/client`

2. Import the required dependencies:
    `import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";`

3. Create an Apollo Client instance in *_app.tsx*: 
    ```
    export const client = new ApolloClient({
    uri: 'https://api.atrialogics.io/graphql', // Replace with your WordPress GraphQL API endpoint
    cache: new InMemoryCache(),
    });
    ```

    Wrap the root component with the ApolloProvider component:
    ```
    import { ApolloProvider } from "@apollo/client";

    // ...
    export default function App({ Component, pageProps }: AppProps) {
        return (
            <ApolloProvider client={client}>
                <Component {...pageProps}/>
            </ApolloProvider>
        )
    }
    ```
Start querying data from your WordPress backend using Apollo Client. With Apollo Client set up, you can now use GraphQL queries to fetch and manipulate data from your WordPress backend.

# MDX Files

Mdx files are stored in directory `data/projects`. In order to read the files, we have a mdx.ts file in `src/utils/mdx.ts`.

We import these three modules in order to retrieve articles and their metadata from the directory.

```
import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'
```

> - path: The path module is a built-in Node.js module that provides utilities for working with file and directory paths. It allows you to manipulate file paths,  resolve relative paths, extract file extensions, join paths, and more. 
>
> - fs: The fs module is another built-in Node.js module that provides file system-related functionality. It allows you to interact with the file system, read and write files, create directories, and perform various file system operations. 
>
> - gray-matter: The gray-matter module is a popular third-party library for parsing front matter in files. Front matter is metadata placed at the beginning of a file, commonly used in static site generators and content management systems. The gray-matter library extracts the front matter from files and returns it as an object, along with the remaining content of the file. 

In the given code, gray-matter is used to parse the front matter from MDX files, allowing you to extract metadata such as the article's title, slug, excerpt, etc.
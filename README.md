### How to Run a React Project in Development

1. **Prerequisites:**
    - **Node.js**: Ensure Node.js is installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).
    - **npm or yarn**: These package managers come with Node.js. Verify by running `npm -v` or `yarn -v` in your terminal.

2. **Install Dependencies:**
    - If you cloned an existing project, navigate to the project directory and run:
      ```bash
      npm install
      ```
      or if you are using yarn:
      ```bash
      yarn install
      ```

3. **Start the Development Server:**
    - To run the development server, use:
      ```bash
      npm start
      ```
      or with yarn:
      ```bash
      yarn start
      ```

4. **Open the Project in Your Browser:**
    - By default, the development server will start at [http://localhost:3000](http://localhost:3000). Open this URL in your web browser to see your React application.

5. **Edit and Save:**
    - Open the project in your preferred code editor (e.g., VSCode). As you make changes to the files, the development server will automatically reload the application, reflecting your changes in real-time.

### Additional Tips:


- **Linting and Formatting:**
  - Install ESLint and Prettier to maintain code quality and consistency:
    ```bash
    npm run lint
    ```

- **State Management:**
  - For state management, I used Zustand.

### Common Commands:

- **Build for Production:**
  ```bash
  npm run build
  ```
  or with yarn:
  ```bash
  yarn build
  ```

- **Test the Application:**
  ```bash
  npm test
  ```
  or with yarn:
  ```bash
  yarn test
  ```

By following these steps, you should be able to run and develop your React project efficiently. If you encounter any issues, send me a
email to ednilsonsantos43@gmail.com.
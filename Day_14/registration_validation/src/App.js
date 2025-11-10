import logo from './logo.svg';
import './App.css';
import { useFormik } from "formik";
import * as Yup from "yup";

function SimpleForm() {
  const formik = useFormik({
    initialValues: { name: "", email: "" },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label>Name: </label>
        <input
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        <p style={{ color: "red" }}>{formik.errors.name}</p>
      </div>

      <div>
        <label>Email: </label>
        <input
          name="email"
        onChange={formik.handleChange}
          value={formik.values.email}
        />
        <p style={{ color: "red" }}>{formik.errors.email}</p>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}

export default SimpleForm;

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

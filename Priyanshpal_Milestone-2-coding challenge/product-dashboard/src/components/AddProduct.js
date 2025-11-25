// Here is the file for AddProduct component in React
// product-dashboard/src/components/AddProduct.js

import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ProductContext } from '../context/ProductContext';
import { useNavigate } from 'react-router-dom';

const ProductSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name is too short')
    .max(50, 'Name is too long')
    .required('Name is required'),
  price: Yup.number()
    .positive('Price must be positive')
    .required('Price is required'),
  category: Yup.string()
    .required('Category is required'),
  description: Yup.string()
    .min(10, 'Description is too short')
    .required('Description is required')
});

class AddProduct extends Component {
  static contextType = ProductContext;

  handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await this.context.addProduct(values);
      alert(' Product added successfully!');
      resetForm();
      this.props.navigate('/');
    } catch (error) {
      alert(' Failed to add product');
    } finally {
      setSubmitting(false);
    }
  }

  render() {
    return (
      <div className="container">
        <div className="form-container">
          <h2 className="form-title">Add New Product</h2>
          <Formik
            initialValues={{
              name: '',
              price: '',
              category: '',
              description: ''
            }}
            validationSchema={ProductSchema}
            onSubmit={this.handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Product Name</label>
                  <Field 
                    type="text" 
                    name="name" 
                    className="form-control"
                    placeholder="Enter product name"
                  />
                  <ErrorMessage name="name" component="div" className="error-message" />
                </div>

                <div className="form-group">
                  <label htmlFor="price" className="form-label">Price (₹)</label>
                  <Field 
                    type="number" 
                    name="price" 
                    className="form-control"
                    placeholder="Enter price"
                  />
                  <ErrorMessage name="price" component="div" className="error-message" />
                </div>

                <div className="form-group">
                  <label htmlFor="category" className="form-label">Category</label>
                  <Field as="select" name="category" className="form-control">
                    <option value="">Select Category</option>
                    <option value="Electronics"> Electronics</option>
                    <option value="Accessories"> Accessories</option>
                    <option value="Clothing"> Clothing</option>
                  </Field>
                  <ErrorMessage name="category" component="div" className="error-message" />
                </div>

                <div className="form-group">
                  <label htmlFor="description" className="form-label">Description</label>
                  <Field 
                    as="textarea" 
                    name="description" 
                    className="form-control" 
                    rows="4"
                    placeholder="Enter product description"
                  />
                  <ErrorMessage name="description" component="div" className="error-message" />
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary btn-submit" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Adding Product...' : 'Add Product'}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}

function AddProductWithNavigate(props) {
  const navigate = useNavigate();
  return <AddProduct {...props} navigate={navigate} />;
}

export default AddProductWithNavigate;
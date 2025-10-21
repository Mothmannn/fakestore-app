import { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";

function AddProduct() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [validated, setValidated] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      try {
        const response = await axios.post(
          "https://fakestoreapi.com/products",
          formData
        );
        console.log(response.data);
        setProduct(response.data);
        setSubmitted(true);
        setError(null);
      } catch (err) {
        setError(`Error submitting the form. Please try again: ${err.message}`);
        setSubmitted(false);
      }
    }
    setValidated(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Container
      className="mt-5 border p-4 rounded shadow"
      style={{ maxWidth: "800px" }}
    >
      <h2 style={{ fontFamily: "Arial" }}>Add Product</h2>
      {submitted && (
        <Alert variant="success" dismissible>
          {product.title} created successfully!
        </Alert>
      )}
      {error && (
        <Alert variant="danger" dismissible>
          {error}
        </Alert>
      )}
      <Form onSubmit={handleSubmit} noValidate validated={validated}>
        <Row>
          <Col md="5">
            <Form.Group controlId="formTitle" className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a title
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md="5">
            <Form.Group controlId="formCategory" className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a category
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md="7">
            <InputGroup className="mb-3" style={{ marginTop: "32px" }}>
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control
                type="number"
                placeholder="Enter product price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a price
              </Form.Control.Feedback>
            </InputGroup>
          </Col>

          <Col md="7">
            <InputGroup className="mb-3" style={{ marginTop: "32px" }}>
              <Form.Control
                type="description"
                placeholder="Enter product description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a description
              </Form.Control.Feedback>
            </InputGroup>
          </Col>
        </Row>

        <Button variant="primary" type="submit" className="mt-3">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default AddProduct;

// Create a use state for

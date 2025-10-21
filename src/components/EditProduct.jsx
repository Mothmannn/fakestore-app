import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import InputGroup from "react-bootstrap/InputGroup";
import Spinner from "react-bootstrap/Spinner";
import { useParams } from "react-router-dom";
import axios from "axios";

function EditProduct() {
  const [submitted, setSubmitted] = useState(false);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [validated, setValidated] = useState(false);

  const { id } = useParams(); // Get the product ID from the URL

const [formData, setFormData] = useState({
  title: "",
  description: "",
  price: "",
  category: "",
});

useEffect(() => {
  axios
    .get(`https://fakestoreapi.com/products/${id}`)
    .then((response) => {
      setProduct(response.data);
      setFormData({
        title: response.data.title,
        description: response.data.description,
        price: response.data.price,
        category: response.data.category,
      });
      setLoading(false);
    })
    .catch((error) => {
      setError(`Failed to fetch product: ${error.message}`);
      setLoading(false);
    });
}, [id]);

  if (loading) {
    return (
      <Container>
        <h3>
          <Spinner
            animation="border"
            variant="info"
            style={{ marginRight: "15px" }}
            role="status"
          />
          Loading Product...
        </h3>
      </Container>
    );
  }

  if (error) return <p>{error}</p>;
  if (!product) return <p>No product data available.</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      try {
        const response = await axios.put(
          `https://fakestoreapi.com/products/${id}`,
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
    <Container className="mt-5 border p-4 rounded shadow" style={{ maxWidth: "800px" }}>
      <h2 style={{ fontFamily: "Arial" }}>Edit Product</h2>
      {submitted && (
        <Alert variant="success" dismissible>
          {product.title} edited successfully!
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
              <Form.Label>Product Title</Form.Label>
              <Form.Control
                type="text"
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
            <p className="mt-3">Product Description</p>
            <InputGroup className="mb-3">
              <Form.Control
                type="description"
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

export default EditProduct;

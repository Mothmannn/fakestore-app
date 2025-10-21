import { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

function Products() {
  const [products, setProducts] = useState([]); // State to store products
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setProducts(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(`Failed to fetch products: ${error.message}`);
        setLoading(false);
      });
  }, []); // Empty dependency array ensures this runs only once

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
          Loading Users...
        </h3>
      </Container>
    );
  }

  if (error) return <p>{error}</p>;

  return (
    <Container>
      <h1 className="text-center mt-5" style={{ fontFamily: "Arial" }}>
        Products
      </h1>
      <p className="text-center">Choose from a variety of stylish products</p>
      <Row>
        {products.map((product) => (
          <Col key={product.id} className="mt-4">
            <Card
              className="h-100 d-flex flex-column"
              style={{ width: "18rem" }}
            >
              <Card.Body className="d-flex flex-column flex-grow-1 shadow">
                <Card.Title className="text-center">{product.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted text-center">
                  {product.category}
                </Card.Subtitle>
                <div
                  style={{
                    height: 200,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{
                      maxHeight: "100%",
                      maxWidth: "100%",
                      objectFit: "contain",
                    }}
                  />
                </div>
                <Card.Text className="mt-3 font-weight-bold p-2">
                  Price: ${product.price}
                </Card.Text>

                <Button
                  href={`/ProductDetails/${product.id}`}
                  variant="primary"
                  className="mt-auto d-block mx-auto"
                >
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Products;

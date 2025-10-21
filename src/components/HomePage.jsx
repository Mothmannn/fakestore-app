import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import { useState, useEffect } from "react";
import axios from "axios";

const FEATURED_IDS = [1, 2, 3];

function HomePage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    Promise.all(
      FEATURED_IDS.map((id) =>
        axios.get(`https://fakestoreapi.com/products/${id}`).then((r) => r.data)
      )
    )
      .then((results) => {
        setProducts(results);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to load featured products");
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading featured items...</div>;
  if (error) return <div>{error}</div>;

  return (
    /* make the background of the page pale blue */
    <Container className="mt-4 text-center bg-light p-4 rounded" style={{ backgroundColor: "#f0f8ff" }}>
      <Row>
        <Col>
          <h1 style={{ fontSize: "2rem", fontFamily: "Arial, sans-serif", fontWeight: "bold" }}>Welcome to Fake Store!</h1>
          <p>
            Shop from our wide variety of fake products at affordable fake
            prices!
          </p>
          <p className="text-muted" style={{ fontSize: "0.9rem" }}>
            (FakeStoreAPI is used for testing purposes only. Adding, editing, or
            deleting will not have an effect.)
          </p>
        </Col>
      </Row>
      <Row>
        
        <Col className= "d-flex justify-content-center">
          <Carousel
            activeIndex={activeIndex}
            onSelect={(idx) => setActiveIndex(idx)}
            style={{ width: "50%" }}
          >
            {products.map((p) => (
              <Carousel.Item key={p.id}>
                <img className="w-100 mx-auto d-block" src={p.image} alt={p.title} />
                <Carousel.Caption>
                  <h3 className="text-dark bg-primary rounded">{p.title}</h3>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="primary" className="mt-4" href="/products">
            Shop Now
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;

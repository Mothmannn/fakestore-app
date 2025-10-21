import { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import DeletedModal from "./DeletedModal";
import { useParams } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);

  // delete handler
  const handleDelete = async () => {
    if (
      !confirm(
        "Are you sure you want to delete this product? (FakeStore API is for testing purposes, item will not actually be deleted)"
      )
    )
      return;
    setDeleteLoading(true);
    setShowModal(true);
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: "DELETE",
      });
      if (!response.ok)
        throw new Error(`Delete failed (status ${response.status})`);
      await response.json();

      setSuccess(`Product ${product.id} deleted successfully`);
      // navigate back to product list (adjust route if needed)
    } catch (error) {
      setError(error.message || "Failed to delete product");
    } finally {
      setDeleteLoading(false);
    }
  };

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        setProduct(response.data);
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

  return (
    <Container className="mt-4">
      <DeletedModal
        product={product}
        deleted={success}
        showModal={showModal}
        handleCloseModal={handleCloseModal}
      />
      <h1
        className="mt-4 p-4 text-center border-bottom shadow-sm"
        style={{ fontFamily: "Arial" }}
      >
        {product.title}
      </h1>
      <img
        src={product.image}
        alt={product.title}
        className="img-fluid mx-auto d-block mb-4 border p-4"
      />
      <Row className="w-75 mx-auto">
        <Col>
          <p className="mt-2 text-center lead" style={{ fontFamily: "Arial" }}>
            {product.description}
          </p>
          <p className="text-center" style={{ fontFamily: "Arial" }}>
            <strong>Category:</strong> {product.category}
          </p>
          <p className="text-center " style={{ fontFamily: "Arial" }}>
            <strong>Price:</strong> ${product.price}
          </p>
        </Col>
      </Row>
      <Row className="pb-4 pt-4 border-top shadow-sm">
        <Col className="text-center">
          <Button variant="primary" className="m-2">
            Add to Cart
          </Button>
          <Button
            href={`/edit-product/${product.id}`}
            variant="warning"
            className="m-2"
          >
            Edit Product
          </Button>
          <Button
            variant="danger"
            className="m-2"
            onClick={handleDelete}
            disabled={deleteLoading}
          >
            {deleteLoading ? "Deleting..." : "Delete Product"}
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetails;

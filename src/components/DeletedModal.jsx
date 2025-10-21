import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

const DeletedModal = ({ product, deleted, showModal, handleCloseModal }) => {
  const navigate = useNavigate();
    return (
    <>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Product Deleted</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {deleted ? (
            <p>The product "{product.title}" has been deleted successfully.</p>
          ) : (
            <p>Failed to delete the product "{product.title}".</p>
          )}
          <p>FakeStoreAPI is used for testing purposes only. Product will not be deleted from the data.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => { handleCloseModal(); navigate("/products"); }}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeletedModal;

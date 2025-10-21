import { Link } from "react-router-dom";

function NavBar() {
  return (
    /* simple navbar with links on the right side*/
    <nav className="navbar navbar-light bg-light p-2">
      <div className="container-fluid d-flex flex-column flex-md-row align-items-center">
        <h1 className="navbar-brand mb-2 mb-md-0">FakeStore</h1>
        <div className="ms-md-auto d-flex flex-column flex-sm-row align-items-center">
          <Link className="btn btn-info text-black m-2" to="/">
            Home
          </Link>
          <Link className="btn btn-info text-black m-2" to="/products">
            Products
          </Link>
          <Link className="btn btn-info text-black m-2" to="/add-product">
            Add Product
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;


import { Link } from 'react-router-dom';

function NavBar() {
    return (
        /* simple navbar with links on the right side*/
        <nav className="navbar  navbar-light bg-light">
            <h1 className="navbar-brand p-2">FakeStore</h1>
            <div className="ml-auto">
                <Link className="btn btn-info text-black m-2" to="/">Home</Link>
                <Link className="btn btn-info text-black m-2" to="/products"> Products</Link>
                <Link className="btn btn-info text-black m-2" to="/add-product"> Add Product</Link>
            </div>
        </nav>
    );
}

export default NavBar;
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import useToken, { tokenInfo } from '../useToken';



function Navigationbar() {
  // eslint-disable-next-line
  const { token, setToken } = useToken();
  const { isLoggedIn } = tokenInfo();
  const navigate = useNavigate();

  const signout = function () {
    setToken(null);
    localStorage.setItem("token", "");
    return navigate("/");
  }

  const renderProfileIcon = () => {
    return (
      <>
        <div>
          <span class="profileText">My Profile</span>
          <img src="/profile-pic.png" width="25px" height="25px" alt="Profile" />
        </div>
      </>
    )
  }

  const renderMenuItems = () => {
    if (isLoggedIn()) {
      return (
        <>
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/create">Create New Recipe</Nav.Link>
          <Nav.Link as={Link} to="/myrecipes">My Recipes</Nav.Link>
          <Nav.Link as={Link} to="/marked">Marked Recipes</Nav.Link>
          <Nav.Link as={Link} to="/all">All Recipes</Nav.Link>
        </>
      )
    }
    return (
      <>
        <Nav.Link as={Link} to="/">Home</Nav.Link>
        <Nav.Link as={Link} to="/login">Login</Nav.Link>
        <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
      </>
    )

  }
  const renderProfileDropdown = () => {
    if (isLoggedIn()) {
      return (
        <>
          <NavDropdown title={renderProfileIcon()} id="basic-nav-dropdown" align="end">
            <div className="d-flex flex-column justify-content-center align-items-center px-2 py-1">
              <p className="m-0">Total Recipes: 5</p>
            </div>
            <NavDropdown.Item href="/Edit">Edit Profile</NavDropdown.Item>
            <NavDropdown.Item href="/ShoppingList">Shopping List</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={signout}>Sign Out</NavDropdown.Item>
          </NavDropdown>

        </>
      )
    }
    return (<></>)
  }




  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Easy Chef
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {renderMenuItems()}
          </Nav>
          {renderProfileDropdown()}

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );

}

export default Navigationbar;

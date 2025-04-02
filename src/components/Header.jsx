import { Navbar, Container, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
function Header() {
    const navigate = useNavigate();
    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="p-3">
            <Container fluid>
                <Navbar.Brand style={{ cursor: 'pointer' }} onClick={() => navigate("/")}>MoviesHub</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => navigate("/")}>Watchlist</Nav.Link>
                        <Nav.Link onClick={() => navigate("/favorites")}>Favorites</Nav.Link>
                    </Nav>
                    <Form className="d-flex">
                        <FormControl type="search" placeholder="Search..." className="me-2" aria-label="Search" />
                        <Button variant="outline-light">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
export default Header;
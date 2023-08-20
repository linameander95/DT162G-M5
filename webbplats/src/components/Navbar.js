import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
// navbar component that gets imported to the main part of the page, thus reducing the need for repeating code
export default function Nav() {
    return (
        <>
            <Navbar className="bg-body-tertiary" bg="dark" data-bs-theme="dark" expand="sm">
                <Container>
                    <Navbar.Brand id="brand" href="#home">
                        <img
                            id="logo"
                            alt=""
                            src="logo.png"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        Projekt
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </>
    );
}
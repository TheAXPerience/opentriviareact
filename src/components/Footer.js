import { Container } from "reactstrap";
import './Footer.css';

const Footer = () => {
    return (
        <Container className="sm-12 foot">
            <span>Questions are sourced from <a href="https://opentdb.com/api_config.php">Open Trivia Database</a>.</span>
        </Container>
    );
}

export default Footer;
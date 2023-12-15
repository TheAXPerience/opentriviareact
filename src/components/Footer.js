import { Container } from "reactstrap";

const Footer = () => {
    return (
        <Container sticky='bottom'>
            <span>Questions are sourced from <a href="https://opentdb.com/api_config.php">Open Trivia Database</a>.</span>
        </Container>
    );
}

export default Footer;
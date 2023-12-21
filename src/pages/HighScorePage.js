import { Container } from "reactstrap";
import HighScoresCarousel from "../features/highScores/HighScoresCarousel";
import './GamePage.css';

const HighScorePage = () => {
    return (
        <Container className='sm-8 backdrop'>
            <HighScoresCarousel />
        </Container>
    );
}

export default HighScorePage;
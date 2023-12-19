import { Container } from "reactstrap";
import HighScoresCarousel from "../features/highScores/HighScoresCarousel";

const HighScorePage = () => {
    return (
        <Container className='sm-8'>
            <HighScoresCarousel />
        </Container>
    );
}

export default HighScorePage;
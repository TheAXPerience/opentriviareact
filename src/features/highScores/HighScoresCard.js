import { Card, CardBody, CardTitle, Col, Row } from "reactstrap";
import './HighScoresCard.css';

const HighScoresCard = ({ categoryName, scores }) => {
    return (
        <Card className='text-center leaderboard-card'>
            <CardTitle><h3>{categoryName}</h3></CardTitle>
            <CardBody>
                {
                    scores.length ? scores.map(({name, score}, idx) => {
                        return (
                            <Row key={idx}>
                                <Col sm='3' className='border row-col-ele'><h5>#{idx+1}.</h5></Col>
                                <Col sm='6' className='border row-col-ele'><h5>{name}</h5></Col>
                                <Col sm='3' className='border row-col-ele'><h5>{score}</h5></Col>
                            </Row>
                        );
                    }) : <h5>No High Scores</h5>
                }
            </CardBody>
        </Card>
    );
}

export default HighScoresCard;
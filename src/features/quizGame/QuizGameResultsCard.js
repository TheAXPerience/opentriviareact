import { useSelector } from "react-redux";
import { getAnswers } from "./quizGameSlice";
import { Col, Row } from "reactstrap";

const QuizGameResultsCard = () => {
    const answers = useSelector(getAnswers);

    return (
        <>
            <h1>Results</h1>
            {
                answers.map((answer, idx) => {
                    return (
                        <Row key={idx}>
                            <Col>{answer[0]}</Col>
                            <Col>{answer[1]}</Col>
                        </Row>
                    );
                })
            }
        </>
    );
}

export default QuizGameResultsCard;
import parse from 'html-react-parser';
import { Card, CardBody, CardTitle } from 'reactstrap';

const QuizGameResultsAnswer = ({ questionIndex, question, answer, score, isCorrect }) => {
    return (
        <Card className='text-center'>
            <CardTitle>
                <h3>Question #{questionIndex}</h3>
                <h3>{parse(question)}</h3>
            </CardTitle>
            <CardBody>
                <h5 className={isCorrect ? 'text-success' : 'text-danger'}>{parse(answer)}</h5>
                <h5 className={isCorrect ? 'text-success' : 'text-danger'}>{score}</h5>
            </CardBody>
        </Card>
    );
}

export default QuizGameResultsAnswer;
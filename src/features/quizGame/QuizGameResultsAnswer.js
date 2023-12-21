import parse from 'html-react-parser';
import { Card, CardBody, CardTitle, Container } from 'reactstrap';
import './QuizGameResultsAnswer.css';

const QuizGameResultsAnswer = ({ questionIndex, question, answer, score, isCorrect }) => {
    return (
        <Container className='text-center answer-card'>
            <CardTitle className='bg-transparent'>
                <h4>Question #{questionIndex}</h4>
                <h3>{parse(question)}</h3>
            </CardTitle>
            <CardBody className='bg-transparent'>
                <h4 className={isCorrect ? 'text-success' : 'text-danger'}>{parse(answer)}</h4>
                <h5 className={isCorrect ? 'text-success' : 'text-danger'}>{score}</h5>
            </CardBody>
        </Container>
    );
}

export default QuizGameResultsAnswer;
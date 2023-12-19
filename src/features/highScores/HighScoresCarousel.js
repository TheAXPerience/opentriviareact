import { useState } from "react";
import { useSelector } from "react-redux";
import { Carousel, CarouselControl, CarouselItem } from "reactstrap";
import HighScoresCard from "./HighScoresCard";

const HighScoresCarousel = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const highScores = useSelector((state) => state.highScores.highScores);
    const isLoading = useSelector((state) => state.highScores.isLoading);
    const errorMessage = useSelector((state) => state.highScores.errorMessage);

    if (isLoading) {
        return (
            <div>
                Loading...
            </div>
        );
    } else if (errorMessage) {
        return (
            <div className='text-danger'>
                {errorMessage}
            </div>
        );
    }

    const items = Object.entries(highScores).map(([categoryName, categoryScores], idx) => {
        return <HighScoresCard categoryName={categoryName} scores={categoryScores} />;
    });

    const slides = items.map((item, idx) => {
        return (
            <CarouselItem
                tag='div'
                key={idx}
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
            >
                {item}
            </CarouselItem>
        )
    });

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }

    return (
        <Carousel
            activeIndex={activeIndex}
            next={next}
            previous={previous}
            interval={null}
            keyboard
        >
            {slides}
            <CarouselControl
                direction='prev'
                directionText='previous'
                onClickHandler={previous}
            />
            <CarouselControl
                direction='next'
                directionText='next'
                onClickHandler={next}
            />
        </Carousel>
    );
}

export default HighScoresCarousel;
class SlideShow {
    constructor(slideShowElement) {
        this.slideShowElement = slideShowElement;
        this.currentSlideIndex = 0;
        this.slideElements = Array.from(this.slideShowElement.querySelectorAll('.slide'));
        this.cursorElements = Array.from(this.slideShowElement.querySelectorAll('.cursor'));

        this.setupEventListeners();
        this.render();
    }

    setupEventListeners() {
        const previousElement = this.slideShowElement.querySelector('.prev');
        const nextElement = this.slideShowElement.querySelector('.next');

        previousElement.addEventListener('click', () => this.prevSlide());
        nextElement.addEventListener('click', () => this.nextSlide());

        for (let i = 0; i < this.cursorElements.length; ++i) {
            this.cursorElements[i].addEventListener('click', () => this.selectSlide(i));
        }
    }

    prevSlide() {
        const newCurrentSlideIndex = this.currentSlideIndex - 1;
        const maxIndex = this.slideElements.length - 1;

        this.currentSlideIndex = newCurrentSlideIndex > 0 ? newCurrentSlideIndex : maxIndex;

        this.render();
    }

    nextSlide() {
        const newCurrentSlideIndex = this.currentSlideIndex + 1;
        const maxIndex = this.slideElements.length - 1;

        this.currentSlideIndex = newCurrentSlideIndex > maxIndex ? 0 : newCurrentSlideIndex;

        this.render();
    }

    selectSlide(index) {
        this.currentSlideIndex = index;

        this.render();
    }

    render() {
        this.slideElements.forEach((slideElement, index) => {
            const dotElement = this.cursorElements[index];

            if (this.currentSlideIndex === index) {
                slideElement.style.display = 'block';
                dotElement && dotElement.classList.add('active');
            } else {
                slideElement.style.display = 'none';
                dotElement && dotElement.classList.remove('active');
            }
        });
    }
}

const slideShows = Array.from(document.querySelectorAll('.gallery'));

for (const slideShow of slideShows) {
    new SlideShow(slideShow);
}
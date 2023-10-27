// Функція для перевірки відповіді
function checkAnswer(clickedOption) {
    const correct = clickedOption.getAttribute('data-correct') === 'true';
    const color = correct ? 'green' : 'red';
    clickedOption.style.backgroundColor = color;

    const cardContainers = document.querySelectorAll('.card-container');
    const currentCardIndex = Array.from(cardContainers).indexOf(clickedOption.closest('.card-container'));
    const options = cardContainers[currentCardIndex].querySelectorAll('.option');
    const isAllCorrect = Array.from(options).every(option => option.getAttribute('data-correct') === 'true');

    if (isAllCorrect) {
        showNextButton(currentCardIndex);
    }
}

// Функція для показу кнопки "далі"
function showNextButton(index) {
    const currentNextButton = document.querySelector('.card-container:nth-child(' + (index + 1) + ') .next');
    currentNextButton.style.display = 'block';
}

// Обробник кліку на кнопку " розпочати гру"
document.getElementById('start-button').addEventListener('click', function() {
    const mainContainer = document.querySelector('.main-container');
    mainContainer.style.display = 'none';

    const gameContainer = document.getElementById('game-container');
    const cards = gameContainer.querySelectorAll('.card-container');
    cards.forEach((card, index) => {
        card.style.display = index === 0 ? 'flex' : 'none';
    });
});

// Функція для налаштування гри
function setupCardGame() {
    const cardContainers = document.querySelectorAll('.card-container');
    let currentCardIndex = 0;

    function nextCard() {
        cardContainers[currentCardIndex].style.display = 'none';
        currentCardIndex++;

        if (currentCardIndex < cardContainers.length) {
            cardContainers[currentCardIndex].style.display = 'flex';
        } else {
            // Ця умова виконується, коли всі карточки пройдені
            alert('Кінець гри');
        }
    }

    document.querySelectorAll('.next').forEach(button => {
        button.style.display = 'none';
        button.addEventListener('click', nextCard);
    });

    cardContainers.forEach((container, index) => {
        const options = container.querySelectorAll('.option');
        options.forEach(option => {
            option.addEventListener('click', function() {
                checkAnswer(this);
                showNextButton(index);
            });
        });
    });
}

setupCardGame();

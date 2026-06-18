// Основной модуль игры

class PhishingDetective {
    constructor() {
        this.messages = [];
        this.currentIndex = 0;
        this.correctCount = 0;
        this.totalMessages = 10;
        this.gameStarted = false;
    }

    init() {
        // Показываем экран правил
        new RulesScreen(() => {
            this.startGame();
        });
    }

    startGame() {
        this.gameStarted = true;
        UI.init();
        this.shuffleMessages();
        this.bindEvents();
        this.loadMessage();
    }

    shuffleMessages() {
        this.messages = [...MESSAGES]
            .sort(() => Math.random() - 0.5)
            .slice(0, this.totalMessages);
    }

    bindEvents() {
        UI.elements.btnSafe.addEventListener('click', () => this.handleAnswer(false));
        UI.elements.btnPhishing.addEventListener('click', () => this.handleAnswer(true));
        UI.elements.btnNext.addEventListener('click', () => this.nextMessage());
        UI.elements.btnRestart.addEventListener('click', () => this.restart());
        UI.elements.helperCharacter.addEventListener('click', () => this.showHelperTip());
    }

    loadMessage() {
        if (this.currentIndex >= this.totalMessages) {
            this.finishGame();
            return;
        }

        const message = this.messages[this.currentIndex];
        UI.showMessage(message);
        UI.updateRound(this.currentIndex + 1, this.totalMessages);
        UI.updateProgress(this.correctCount, this.totalMessages);
    }

    handleAnswer(userThinksIsPhishing) {
        UI.disableButtons();

        const message = this.messages[this.currentIndex];
        const isCorrect = userThinksIsPhishing === message.isPhishing;

        if (isCorrect) {
            this.correctCount++;
        }

        UI.highlightCard(isCorrect);
        UI.showModal(isCorrect, message);
    }

    nextMessage() {
        UI.hideModal();
        this.currentIndex++;

        if (this.currentIndex >= this.totalMessages) {
            setTimeout(() => this.finishGame(), 300);
        } else {
            setTimeout(() => this.loadMessage(), 300);
        }
    }

    finishGame() {
        const percentage = Math.round((this.correctCount / this.totalMessages) * 100);

        Storage.saveScore(percentage);
        Storage.saveStats(this.correctCount, this.totalMessages);

        UI.showFinishModal(this.correctCount, this.totalMessages);
    }

    restart() {
        UI.hideFinishModal();

        this.currentIndex = 0;
        this.correctCount = 0;
        this.shuffleMessages();

        setTimeout(() => this.loadMessage(), 300);
    }

    showHelperTip() {
        const message = this.messages[this.currentIndex];
        if (!message) return;

        const tips = [
            "Обратите внимание на адрес отправителя! 📧",
            "Есть ли срочность в сообщении? ⚠️",
            "Просят ли перейти по ссылке? 🔗",
            "Запрашивают ли личные данные? 🔒",
            "Есть ли грамматические ошибки? ✍️"
        ];

        const tip = tips[Math.floor(Math.random() * tips.length)];
        UI.showHelperTip(tip);
    }
}

// Инициализация игры после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    const game = new PhishingDetective();
    game.init();
});
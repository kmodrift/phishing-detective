// UI модуль - работа с DOM, модалками, прогресс-баром

const UI = {
    elements: {
        messageCard: null,
        msgIcon: null,
        msgType: null,
        msgDate: null,
        msgSender: null,
        msgSubject: null,
        msgBody: null,
        btnSafe: null,
        btnPhishing: null,
        progressFill: null,
        progressText: null,
        correctCount: null,
        roundNum: null,
        levelIcon: null,
        levelText: null,
        modal: null,
        modalHeader: null,
        modalTitle: null,
        modalText: null,
        explanationText: null,
        btnNext: null,
        finalScore: null,
        finalLevel: null,
        finalProgress: null,
        finalProgressText: null,
        finalMessage: null,
        btnRestart: null,
        helperCharacter: null,
        helperBubble: null
    },

    init() {
        this.cacheElements();
    },

    cacheElements() {
        this.elements.messageCard = document.getElementById('messageCard');
        this.elements.msgIcon = document.getElementById('msgIcon');
        this.elements.msgType = document.getElementById('msgType');
        this.elements.msgDate = document.getElementById('msgDate');
        this.elements.msgSender = document.getElementById('msgSender');
        this.elements.msgSubject = document.getElementById('msgSubject');
        this.elements.msgBody = document.getElementById('msgBody');
        this.elements.btnSafe = document.getElementById('btnSafe');
        this.elements.btnPhishing = document.getElementById('btnPhishing');
        this.elements.progressFill = document.getElementById('progressFill');
        this.elements.progressText = document.getElementById('progressText');
        this.elements.correctCount = document.getElementById('correctCount');
        this.elements.roundNum = document.getElementById('roundNum');
        this.elements.levelIcon = document.getElementById('levelIcon');
        this.elements.levelText = document.getElementById('levelText');
        this.elements.modal = document.getElementById('modal');
        this.elements.modalHeader = document.getElementById('modalHeader');
        this.elements.modalTitle = document.getElementById('modalTitle');
        this.elements.modalText = document.getElementById('modalText');
        this.elements.explanationText = document.getElementById('explanationText');
        this.elements.btnNext = document.getElementById('btnNext');
        this.elements.finalScore = document.getElementById('finalScore');
        this.elements.finalLevel = document.getElementById('finalLevel');
        this.elements.finalProgress = document.getElementById('finalProgress');
        this.elements.finalProgressText = document.getElementById('finalProgressText');
        this.elements.finalMessage = document.getElementById('finalMessage');
        this.elements.btnRestart = document.getElementById('btnRestart');
        this.elements.helperCharacter = document.getElementById('helperCharacter');
        this.elements.helperBubble = document.getElementById('helperBubble');
    },

    showMessage(message) {
        this.elements.msgIcon.textContent = this.getIcon(message.type);
        this.elements.msgType.textContent = this.getTypeLabel(message.type);
        this.elements.msgDate.textContent = this.getCurrentDate();
        this.elements.msgSender.textContent = message.sender;
        this.elements.msgSubject.textContent = message.subject;
        this.elements.msgBody.textContent = message.body;

        this.elements.messageCard.className = 'message-card';
        this.enableButtons();
    },

    getIcon(type) {
        const icons = {
            email: '📧',
            sms: '💬',
            messenger: '💭'
        };
        return icons[type] || '📨';
    },

    getTypeLabel(type) {
        const labels = {
            email: 'Email',
            sms: 'SMS',
            messenger: 'Мессенджер'
        };
        return labels[type] || type;
    },

    getCurrentDate() {
        const today = new Date();
        return today.toLocaleDateString('ru-RU');
    },

    updateProgress(correct, total) {
        const percentage = Math.round((correct / total) * 100);
        this.elements.progressFill.style.width = `${percentage}%`;
        this.elements.progressText.textContent = `${percentage}%`;
        this.elements.correctCount.textContent = `${correct} из ${total}`;
        this.updateLevel(percentage);
    },

    updateLevel(percentage) {
        let level, icon;
        if (percentage >= 90) {
            level = 'Эксперт';
            icon = '🏆';
        } else if (percentage >= 70) {
            level = 'Продвинутый';
            icon = '⭐';
        } else if (percentage >= 50) {
            level = 'Средний';
            icon = '📊';
        } else {
            level = 'Новичок';
            icon = '🔰';
        }

        this.elements.levelIcon.textContent = icon;
        this.elements.levelText.textContent = level;
    },

    updateRound(current, total) {
        this.elements.roundNum.textContent = `${current} из ${total}`;
    },

    highlightCard(isCorrect) {
        if (isCorrect) {
            this.elements.messageCard.classList.add('correct');
        } else {
            this.elements.messageCard.classList.add('incorrect');
        }
    },

    showModal(isCorrect, message) {
        const header = this.elements.modalHeader;
        const title = this.elements.modalTitle;
        const text = this.elements.modalText;

        header.className = 'modal-header ' + (isCorrect ? 'success' : 'danger');
        title.innerHTML = isCorrect ? '✅ Правильно!' : '❌ Ошибка!';
        text.textContent = isCorrect
            ? 'Вы верно определили тип сообщения.'
            : 'Вы ошиблись в определении типа сообщения.';

        this.elements.explanationText.textContent = message.explanation;
        this.elements.modal.classList.add('active');
    },

    hideModal() {
        this.elements.modal.classList.remove('active');
    },

    showFinishModal(correct, total) {
        const percentage = Math.round((correct / total) * 100);

        document.getElementById('finishModal').classList.add('active');
        this.elements.finalScore.textContent = `${percentage}%`;
        this.elements.finalProgress.style.width = `${percentage}%`;
        this.elements.finalProgressText.textContent = `${correct} из ${total}`;

        let level, message;
        if (percentage >= 90) {
            level = '🏆 Эксперт по кибербезопасности';
            message = 'Превосходно! Вы отлично разбираетесь в фишинговых атаках.';
        } else if (percentage >= 70) {
            level = '⭐ Продвинутый пользователь';
            message = 'Хороший результат! Вы знаете основные признаки фишинга.';
        } else if (percentage >= 50) {
            level = '📊 Средний уровень';
            message = 'Неплохо, но есть куда расти. Будьте внимательны!';
        } else {
            level = '🔰 Новичок';
            message = 'Вам стоит больше узнать о фишинговых атаках.';
        }

        this.elements.finalLevel.textContent = level;
        this.elements.finalMessage.textContent = message;
    },

    hideFinishModal() {
        document.getElementById('finishModal').classList.remove('active');
    },

    disableButtons() {
        this.elements.btnSafe.disabled = true;
        this.elements.btnPhishing.disabled = true;
    },

    enableButtons() {
        this.elements.btnSafe.disabled = false;
        this.elements.btnPhishing.disabled = false;
    },

    showHelperTip(tip) {
        this.elements.helperBubble.textContent = tip;
        this.elements.helperBubble.classList.add('active');

        setTimeout(() => {
            this.elements.helperBubble.classList.remove('active');
        }, 5000);
    }
};

// Модуль для работы с localStorage
const Storage = {
    KEYS: {
        BEST_SCORE: 'phishing_detective_best_score',
        TOTAL_GAMES: 'phishing_detective_total_games',
        TOTAL_CORRECT: 'phishing_detective_total_correct',
        TOTAL_QUESTIONS: 'phishing_detective_total_questions'
    },

    saveScore(percentage) {
        const bestScore = this.getBestScore();
        if (percentage > bestScore) {
            localStorage.setItem(this.KEYS.BEST_SCORE, percentage);
        }

        const totalGames = this.getTotalGames() + 1;
        localStorage.setItem(this.KEYS.TOTAL_GAMES, totalGames);
    },

    saveStats(correct, total) {
        const totalCorrect = this.getTotalCorrect() + correct;
        const totalQuestions = this.getTotalQuestions() + total;

        localStorage.setItem(this.KEYS.TOTAL_CORRECT, totalCorrect);
        localStorage.setItem(this.KEYS.TOTAL_QUESTIONS, totalQuestions);
    },

    getBestScore() {
        return parseInt(localStorage.getItem(this.KEYS.BEST_SCORE) || '0');
    },

    getTotalGames() {
        return parseInt(localStorage.getItem(this.KEYS.TOTAL_GAMES) || '0');
    },

    getTotalCorrect() {
        return parseInt(localStorage.getItem(this.KEYS.TOTAL_CORRECT) || '0');
    },

    getTotalQuestions() {
        return parseInt(localStorage.getItem(this.KEYS.TOTAL_QUESTIONS) || '0');
    }
};
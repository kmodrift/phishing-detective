// Модуль экрана правил

class RulesScreen {
    constructor(onStart) {
        this.onStart = onStart;
        this.init();
    }

    init() {
        this.render();
        this.bindEvents();
    }

    render() {
        const rulesHTML = `
            <div class="rules-screen" id="rulesScreen">
                <div class="rules-content">
                    <h2>🕵️ Фишинг-детектив</h2>
                    <p style="color: var(--text-secondary); margin-bottom: 2rem;">
                        Добро пожаловать в игру по распознаванию мошеннических сообщений!
                    </p>

                    <h3>📋 Как играть:</h3>
                    <ul>
                        <li>Вам будут показаны 10 сообщений (email, SMS, мессенджеры)</li>
                        <li>Определите: это официальное сообщение или фишинг</li>
                        <li>Нажмите "Безопасно" или "Мошенники"</li>
                        <li>Получите объяснение и переходите к следующему сообщению</li>
                    </ul>

                    <h3>⚠️ Признаки фишинга:</h3>
                    <div class="phishing-signs">
                        <ul>
                            <li>Подозрительный адрес отправителя (неофициальный домен)</li>
                            <li>Срочность и угрозы ("Срочно!", "Ваш аккаунт будет удален")</li>
                            <li>Запрос личных данных (пароли, номера карт, CVV)</li>
                            <li>Подозрительные ссылки на сторонние сайты</li>
                            <li>Грамматические ошибки и опечатки</li>
                            <li>Обобщенные обращения ("Уважаемый клиент")</li>
                            <li>Неожиданные вложения или просьбы позвонить</li>
                        </ul>
                    </div>

                    <h3>🎯 Цель игры:</h3>
                    <p style="color: var(--text-secondary);">
                        Научиться распознавать фишинговые атаки и повысить уровень киберграмотности. 
                        Попробуйте набрать максимальное количество правильных ответов!
                    </p>

                    <h3>💡 Подсказка:</h3>
                    <p style="color: var(--text-secondary);">
                        Внизу справа вы увидите детектива-помощника. Нажмите на него в любое время, 
                        чтобы получить подсказку по текущему сообщению!
                    </p>

                    <button class="btn-start" id="btnStartGame">
                        Начать игру →
                    </button>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('afterbegin', rulesHTML);
    }

    bindEvents() {
        document.getElementById('btnStartGame').addEventListener('click', () => {
            this.hide();
            this.onStart();
        });
    }

    hide() {
        const rulesScreen = document.getElementById('rulesScreen');
        rulesScreen.style.opacity = '0';
        setTimeout(() => {
            rulesScreen.remove();
        }, 300);
    }
}
"use strict";

const IMG_URL = 'img/';

    const setBG = imgName => {
        const app = document.getElementById('app');
        app.style.backgroundImage = `url(${IMG_URL}${imgName})`
    }

    const renderStartScreen = () => {
        setBG('start.jpg')

        return `
        <h1>Лови шар!</h1>
        <input type="button" class="start_button" value="Старт" onclick="switchToGamePage()">
        <br>
        <input type="button" class="start_button" value="Настройки" onclick="switchToSettingsPage()">
        <br>
        <input type="button" class="start_button" value="Выход" onclick="switchToExitPage()">
      `
    }

    const renderGamePage = () => {
        const script = document.createElement('script');
        script.src = "gamePage.js";
        script.async = false; // чтобы гарантировать порядок
        document.head.appendChild(script);
        return `
        <canvas id="myCanvas" width="700" height="600"></canvas>
      `   
    }

    // import {switchToGameoverPage} from 'gamePage.js';

    // const renderGameoverPage = () => {
    //     gameOverAudio.play();
    //     return `
    //     <span>Вы проиграли!</span>
    //     <span>Ваш результат:</span>+${score}$
    //     <input type="button" class="start_button" value="Старт" onclick="switchToGamePage()">
    //     <input type="button" class="start_button" value="Главная" onclick="switchToStartScreen()">
    //     <input type="button" class="start_button" value="Выход" onclick="switchToExitPage()">
    //   `  
    // }


window.onhashchange = switchToStateFromURLHash;


    function switchToStateFromURLHash() {
        const URLHash = window.location.hash || "#start-screen";


        let pageHTML = '';

        switch (URLHash) {
            case '#start-screen':
                pageHTML += renderStartScreen();
                break;
            case '#game-page':
                pageHTML += renderGamePage();
                break;
            case '#settings-page':
                pageHTML += renderSettingsScreen();
                break;
                case '#gameover-page':
                    pageHTML += renderGameoverPage();
                    break;
            case '#exit-page':
                pageHTML += "<span class='text'>Выход</span>";
                break;
        }
        document.getElementById('app').innerHTML = pageHTML;

    }

    function switchToState(newState) {
        location.hash = newState.pagename;
    }

    function switchToStartScreePage() {
        switchToState({pagename: 'start-screen'});
    }

    function switchToGamePage() {
        switchToState({pagename: 'game-page'});
    }

    function switchToGameoverPage() {
        switchToState({pagename: 'gameover-page'});
    }

    function switchToSettingsPage() {
        switchToState({pagename: 'settings-page'});
    }

    function switchToExitPage() {
        switchToState({pagename: 'exit-page'});
    }

    switchToStateFromURLHash();
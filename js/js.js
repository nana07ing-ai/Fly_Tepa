const tepa = document.getElementById('tepa');

const trybi = document.querySelectorAll('.tryba');

const pelmen = document.getElementById('pelmen');

const start_btn = document.getElementById('play_btn');

const am = new Audio('./sounds/am.mp3');
am.volume = 1.0;

let eat_pelmen = 0;


const sound_btn = document.getElementById('sound_btn');

const score = document.getElementById('score');

let game_start = false;

let tepa_rotate = 0;
let tepa_y = 0;

const jump = document.getElementById('jump');

let pelmen_x = 12;

let tryba_x = 10;

let sound = true;


start_btn.addEventListener('click', function() {
    game_start = !game_start;
    if (game_start) {
        start_btn.textContent = 'Стоп';
        playing = requestAnimationFrame(game);
    }
    else {
        tepa_y = 0;
        tepa.style.top = tepa_y + '%';
        tepa_rotate = 0;
        tepa.style.rotate = tepa_rotate + 'deg';
        pelmen_x = 12;
        pelmen.style.right = pelmen_x + '%';
        trybi.forEach((tryba_takaia) => {
            tryba_x = 12
            tryba_takaia.style.right = tryba_x + '%';
        })
        start_btn.textContent = 'Старт';
        cancelAnimationFrame(playing);
    }
})

function game() {
    game_start = true;
    if (tepa_rotate < 20) {
        tepa_rotate += 1;
        tepa.style.rotate = tepa_rotate + 'deg';
    }
    if (tepa_y > 80) {
        location.reload();
    }
    else if (tepa_y <= -10) {
        location.reload();
    }
    else {
        tepa_y += 1;
        tepa.style.top = tepa_y + '%';
    }
    if (tryba_x === tepa_y) {
        location.reload();
    }
    
    if (pelmen_x < 110) {
        pelmen_x += 0.4;
        pelmen.style.right = pelmen_x + '%';
    }
    else {
        pelmen_x = 12;
        pelmen.style.right = pelmen_x + '%';
    }


    let pelmen_x_y = pelmen.getBoundingClientRect();
    
    let tepa_x_y = tepa.getBoundingClientRect();

    if (tepa_x_y.left < pelmen_x_y.right && tepa_x_y.right > pelmen_x_y.left && tepa_x_y.top < pelmen_x_y.bottom && tepa_x_y.bottom > pelmen_x_y.top) {
        am.play();
        eat_pelmen += 1;
        score.textContent = 'Съедено Пельменей: ' + eat_pelmen;
        pelmen.style.display = 'none';
        setTimeout(() => {
            pelmen_x = -0.4;
            pelmen.style.right = pelmen_x;
            pelmen.style.display = 'block';
        }, 1000);
    }


    trybi.forEach((t) => {
        if (tryba_x < 100) {
            tryba_x += 0.2;
            t.style.right = tryba_x + '%';
        }
        else {
            tryba_x = 0;
            t.style.right = tryba_x + '%';
        }
        let tepa_x_y = tepa.getBoundingClientRect();
    
        let trybochki = t.getBoundingClientRect();

        if (tepa_x_y.left < trybochki.right && tepa_x_y.right > trybochki.left && tepa_x_y.top < trybochki.bottom && tepa_x_y.bottom > trybochki.top) {
            location.reload();
        }
    })


    if (game_start) {
        playing = requestAnimationFrame(game);
    }
}

window.addEventListener('keydown', function() {
    if (game_start === true) {
        tepa_y -= 20;
        tepa.style.top = tepa_y + '%';
        tepa_rotate = -5;
        tepa.style.rotate = tepa_rotate + 'deg';
    }
})

sound_btn.addEventListener('click', function() {
    if (sound) {
        am.muted = true;
        sound_btn.textContent = '🔇';
        sound = false;
    }
    else {
        am.muted = false;
        sound_btn.textContent = '🔊';
        sound = true;
    }
})

if (window.innerWidth <= 768) {
    jump.style.display = 'block';
}
window.addEventListener('touchstart', function(e) {
    if (game_start === true) {
        tepa_y -= 20;
        tepa.style.top = tepa_y + '%';
        tepa_rotate = -5;
        tepa.style.rotate = tepa_rotate + 'deg';
    }
})
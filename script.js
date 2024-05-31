
let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
    {
        img : 'imagenes/A.jpg',
        name : 'Teletubbies son',
        artist : 'Desconocido',
        music : 'musica/La_cancion_de_los_teletubbies.mp3'
    },
    {
        img : 'imagenes/B.jpg',
        name : 'Pájaros de barro',
        artist : 'Manolo García',
        music : 'musica/Pajaros_de_barro.mp3'
    },
    {
        img : 'imagenes/C.jpg',
        name : 'Sé lo que hicisteis',
        artist : 'Melendi',
        music : 'musica/Se_lo_que_hicisteis.mp3'
    },
    {
        img : 'imagenes/D.jpg',
        name : 'Como Camarón',
        artist : 'Estopa',
        music : 'musica/Como_camaron.mp3'
    },
    {
        img : 'imagenes/descarga.jpg',
        name : 'Rayos',
        artist : 'Huecco',
        music : 'musica/Rayos.mp3'
    },
    {
        img : 'imagenes/juansubdelegado.png',
        name : 'Juanito Juan',
        artist : 'Juanito Juan',
        music : 'musica/juansubdelegado.mp3'
    }
];

loadTrack(track_index);

function loadTrack(track_index) {
    clearInterval(updateTimer);
    reset();

    let currentTrack = music_list[track_index];

    curr_track.src = currentTrack.music;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + currentTrack.img + ")";
    track_name.textContent = currentTrack.name;
    track_artist.textContent = currentTrack.artist;
    now_playing.textContent = "Reproduciendo música " + (track_index + 1) + " de " + music_list.length;

    // Actualizar nombres de las canciones y artistas en el reproductor
    document.querySelector('.track-name').innerText = currentTrack.name;
    document.querySelector('.track-artist').innerText = currentTrack.artist;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
}


function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}
function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
}
function playRandom(){
    isRandom = true;
    randomIcon.classList.add('randomActive');
}
function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}
function repeatTrack(){
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}
function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack(){
    curr_track.play();
    isPlaying = true;
    wave.classList.add('loader');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    wave.classList.remove('loader');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack(){
    if(track_index < music_list.length - 1 && isRandom === false){
        track_index += 1;
    }else if(track_index < music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}
function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    playTrack();
}
function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}
function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}
function setUpdate() {
    let seekPosition = 0;
    if (!isNaN(curr_track.duration)) {
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        currentMinutes = currentMinutes < 10 ? "0" + currentMinutes : currentMinutes;
        currentSeconds = currentSeconds < 10 ? "0" + currentSeconds : currentSeconds;
        durationMinutes = durationMinutes < 10 ? "0" + durationMinutes : durationMinutes;
        durationSeconds = durationSeconds < 10 ? "0" + durationSeconds : durationSeconds;

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}
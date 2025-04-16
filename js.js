const replay = document.querySelector('.replay');
const backward = document.querySelector('.backward');
const btnpause = document.querySelector('.pause');
const forward = document.querySelector('.forward');
const shuffle = document.querySelector('.shuffle');
const audio = document.getElementById('audio');
const showList = document.querySelector('.show-list');
let imageCD = document.querySelector('.cd');
let nameMusic = document.querySelector('.name-music');
const equalizer = document.querySelector('.equalizer');
const playMusic = document.querySelector('.pause i');
const progress = document.getElementById('progress');
const durationSong = document.querySelector('.second');
let isShuffle = false;
let currentIndex = 0;
let  isdragging = false;

const night = document.querySelector('.night');
const sun = document.querySelector('.sun')

const toggle = document.getElementById('toggledark');
const root = document.documentElement;
const moon = document.querySelector('.moon');
// declare song listlist


const listMusic = [
    {
        name: 'chúng ta của tương lai',
        singer: 'Sơn Tùng MTP',
        path: 'music/y2mate.com - youtube video zoEtcR5EW08.mp3',
        image: 'image/tải\ xuống.jpg'
    },

    {
        name: 'Giá như',
        singer: 'Soobin Hoàng Sơn',
        path: 'music/y2mate.com - GIÁ NHƯ  TÙNG DƯƠNG  SOOBIN HOÀNG SƠN  Liveshow Người Đàn Ông Hát  Giá Như Em Muốn Anh.mp3',
        image: 'image/tải\ xuống\ \(1\).jpg'
    },

    {
        name: 'Tháng tư là lời nói dối của em',
        singer: 'Hà Anh Tuấn',
        path: 'music/y2mate.com - Hà Anh Tuấn  Tháng Tư Là Lời Nói Dối Của Em Official MV.mp3',
        image: 'image/tải\ xuống\ \(2\).jpg'
    },

    {
        name: 'Mang Chủng',
        singer: 'Âm Khuyết Thi Thính',
        path: 'music/y2mate.com - MANG CHỦNG REMIX    Glwk REMIX  Nhạc hot trend tiktok 2024.mp3',
        image: 'image/tải\ xuống\ \(3\).jpg'
    },

    {
        name: 'Yêu 5 - remix',
        singer: 'Rhymastic',
        path:'music/y2mate.com - Lyrics  YÊU 5  Rhymastic.mp3',
        image: 'image/tải\ xuống\ \(4\).jpg'

    },

    {
        name: 'Save Me',
        singer: 'Deamn',
        path:'music/y2mate.com - DEAMN  Save Me Audio.mp3',
        image: 'image/tải\ xuống\ \(5\).jpg'

    },
    {
        name: 'Shape of you',
        singer: 'Ed Sheeran',
        path:'music/y2mate.com - Ed Sheeran  Shape of You Official Music Video.mp3',
        image: 'image/tải\ xuống\ \(6\).jpg'

    },
    {
        name: 'happy - Pharrell Williams',
        singer: 'Pharrell Williams',
        path:'music/y2mate.com - Pharrell Williams  Happy Video.mp3',
        image: 'image/tải\ xuống\ \(7\).jpg'

    },
    {
        name: 'Sóng Gió',
        singer: 'J97',
        path:'music/y2mate.com - SÓNG GIÓ  ICM x JACK  OFFICIAL MUSIC VIDEO.mp3',
        image: 'image/tải\ xuống\ \(8\).jpg'

    },
    {
        name: 'Bạc Phận',
        singer: 'J97',
        path:'music/y2mate.com - BẠC PHẬN  ICM x JACK  OFFICIAL MV.mp3',
        image: 'image/tải\ xuống\ \(8\).jpg'

    },
];

//darkmode
toggle.addEventListener('change', () => {
    root.classList.toggle('dark');
    moon.classList.toggle('active');
    sun.classList.toggle('active');
    if(root.classList.contains('dark')){
        
        for(let i = 1; i <= 50; i++){
            const star = document.createElement('div')
            star.classList.add('star');

            const top = Math.floor(Math.random() * night.offsetHeight);
            const left = Math.floor(Math.random() * night.offsetWidth);

            star.style.top = top +'px';
            star.style.left = left +'px';
            night.appendChild(star);
        }
        
    }else{
        const stars = document.querySelectorAll('.star');
        stars.forEach(star => {
            star.remove();
        });


    };
    
});
// load pagepage
function loadSong(index) {
    const songItem = listMusic[index];
    nameMusic.innerHTML = songItem.name;
    audio.src = songItem.path;
    imageCD.style.backgroundImage = `url('${songItem.image}')`;
    borderSong(index);
}


// border musicmusic
function borderSong(index){
    const songs = document.querySelectorAll('.song');
    songs.forEach((e, i) => {
        if( i === index){
            e.classList.add('active');
        }else {
            e.classList.remove('active');
        }
    })
}
// play musicmusic
function play() {
    audio.play();
    playMusic.classList.remove('ti-control-play');
    playMusic.classList.add('ti-control-pause');
    equalizer.classList.add('visible');
}

function pause() {
    audio.pause();
    playMusic.classList.remove('ti-control-pause');
    playMusic.classList.add('ti-control-play');
    equalizer.classList.remove('visible');
}

btnpause.addEventListener('click', () => {
    const isPaused = playMusic.classList.contains('ti-control-pause');
    if (isPaused) {
        pause();
    } else {
        play();
    }
});



// replay sonng
replay.addEventListener('click', () => {
    audio.currentTime = 0;  
    audio.play();    
})

// privious song
backward.addEventListener('click', () => {
    currentIndex--;
    if(currentIndex < 0){
        currentIndex = listMusic.length -1;
    }
    loadSong(currentIndex);
    play();
})

// next song

forward.addEventListener('click', () => {
    currentIndex++;
    
    if(currentIndex == listMusic.length){
        currentIndex = 0;
    }
    loadSong(currentIndex);
    play();
})
// random songsong
shuffle.addEventListener('click', () => {
    isShuffle = !isShuffle;
    const visible = document.querySelector('.shuffle i');
    visible.classList.toggle('active');
});

audio.addEventListener('ended',() => {
    if(isShuffle){
        currentIndex = Math.floor(Math.random() * listMusic.length);
    }else {
        currentIndex++;
        if(currentIndex == listMusic.length){
            currentIndex = 0;
        }
    }
    loadSong(currentIndex);
    play();
})

// progress
audio.addEventListener('timeupdate', () => {
    if(audio.duration && !isdragging){
        const Timesong = (audio.currentTime / audio.duration) *100;
        progress.value = Timesong;
        const durationMinute = String(Math.floor(audio.duration / 60)).padStart(2, '0');
        const durationsecond = String(Math.floor(audio.duration % 60)).padStart(2, '0');
        
        const currentMinute = String(Math.floor(audio.currentTime / 60)).padStart(2, '0');
        const currentsecond = String(Math.floor(audio.currentTime % 60)).padStart(2, '0');
        
        durationSong.textContent =
        `${currentMinute}:${currentsecond} / ${durationMinute}:${durationsecond}`;
    }
    
})

progress.addEventListener('change',()  => {
    const Timesong = (progress.value / 100) * audio.duration;
    audio.currentTime = Timesong;
})

progress.addEventListener('mousedown', () => {
    isdragging = true;
})

progress.addEventListener('mouseup', () => {
    isdragging = false;
})
// Cập nhật tiến trình khi đang phát

// show second 


// renderrender
function render() {
    listMusic.forEach((song, index) => {
        let songItem = document.createElement('div');
        songItem.classList.add('song')
        songItem.innerHTML =  `
           <div class="picture-music" style="background-image: url('${song.image}' )"></div> 
           <div class="infor">
                <h2 class="name">${song.name}</h2> 
                <p class="namesinger">${song.singer}</p>
            </div>
            <div class="option">...</div>
        `;
        
        songItem.addEventListener('click', () => {
            currentIndex = index;
            loadSong(currentIndex);
            play();
            
        })
        showList.appendChild(songItem)
    });
};


// windown loadload
window.addEventListener('DOMContentLoaded', () => {
    render();
    loadSong(currentIndex);
})






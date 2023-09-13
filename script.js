
const prevButton = document.querySelector("#prev")
const nextButton = document.querySelector("#next")
const repeatButton = document.querySelector("#repeat")
const shuffleButton = document.querySelector("#shuffle")
const audio = document.querySelector("#audio")
const songImage = document.querySelector("#song-image")
const songName = document.querySelector("#song-name")
const songArtist = document.querySelector("#song-artist")
const pauseButton = document.querySelector("#pause")
const playButton = document.querySelector("#play")
const playListButton = document.querySelector("#playlist")

const maxDuration = document.querySelector("#max-duration")
const currentTimeRef = document.querySelector("#current-time")

const ProgressBar = document.querySelector("#progress-bar")
const currentProgress = document.querySelector("#current-progress")
const playListContainer = document.querySelector("#playlist-container")
const closeButton = document.querySelector("#close-button")
const playListSongs = document.querySelector("#playlist-song")

//index
let index

//loop
let loop

//decode - parse
const songList = [
    {
        name: "Force",
        link: "assets/Alan Walker - Force.mp3",
        artist: "Alan Walker",
        image: "assets/Alan.jpg"
    },
    {
        name: "Nova",
        link: "assets/Ahrix - Nova.mp3",
        artist: "Ahrix",
        image: "assets/Ahrix.jpg"
    },
    {
        name: "Rubik",
        link: "assets/Distrion - Rubik.mp3",
        artist: "Distrion",
        image: "assets/Distrion.jpg"
    },
    {
        name: "My Heart",
        link: "assets/EH!DE - My Heart.mp3",
        artist: "EH!DE",
        image: "assets/EH!DE.jpg"
    },
    {
        name: "Infectious",
        link: "assets/Tobu - Infectious.mp3",
        artist: "Tobu",
        image: "assets/tobu.jpg"
    },
]

//Events
let events = {
    mouse: {
        click: "click"
    },
    touch: {
        click: "touchstart"
    }
}

let deviceType = ""

const isTouchDevice = () => {
    try {
        document.createEvent('TouchEvent')
        deviceType = 'touch'
        return true
    } catch (error) {
        deviceType = "mouse"
        return false
    }
}

//Time Edit
const timeFormatter = (timeInput) => {
    let minute = Math.floor(timeInput / 60)
    minute = minute < 10 ? "0" + minute : minute
    let second = Math.floor(timeInput % 60)
    second = second < 10 ? "0" + second : second
    return `${minute}:${second}`
}
// Set Song
const setSong = (arrayIndex) => {
    let { name, link, artist, image } = songList[arrayIndex]
    audio.src = link
    songName.innerHTML = name
    songArtist.innerHTML = artist
    songImage.src = image

    //Display Time
    audio.onloadedmetadata = () => {
        maxDuration.innerText = timeFormatter(audio.duration)
    }
    playListContainer.classList.add("hide")
    playAudio()
}
// Play Audio
const playAudio = () => {
    audio.play()
    pauseButton.classList.remove('hide')
    playButton.classList.add('hide')
}
//Replay Song
repeatButton.addEventListener('click', () => {
    if (repeatButton.classList.contains('active')) {
        repeatButton.classList.remove("active")
        audio.loop = false
        console.log('Loop Disable');
    } else {
        repeatButton.classList.add('active')
        audio.loop = true
        console.log('Loop Enable');
    }
})
//Next Song
const nextSong = () => {
    //If loop Enable
    if (loop) {
        if (index == (songList.length - 1)) {
            //If last song, then go first song
            index = 0
        } else {
            index += 1
        }
        setSong(index)
    } else {
        let randIndex = Math.floor(Math.random() * songList.length)
        setSong(randIndex)
    }
    playAudio()
}
//Pause
const pauseAudio = () => {
    audio.pause()
    pauseButton.classList.add('hide')
    playButton.classList.remove('hide')
}
//Previous
const previousSong = () => {
    if (index > 0) {
        pauseAudio()
        index -= 1
    } else {
        index = songList.length - 1
    }
    setSong(index)
    playAudio()
}
//Auto-Next
audio.onended = () => {
    nextSong()
}
//Shuffle
shuffleButton.addEventListener('click', () => {
    if (shuffleButton.classList.contains('active')) {
        shuffleButton.classList.remove('active')
        loop = true
        console.log('Shuffle Disable');
    } else {
        shuffleButton.classList.add('active')
        loop = false
        console.log('Shuffle Enable');
    }
})


//Play Button
playButton.addEventListener('click', playAudio)
//Next Button
nextButton.addEventListener('click', nextSong)
//Pause Button
pauseButton.addEventListener('click', pauseAudio)
//Previous Button
prevButton.addEventListener('click', previousSong)
//------

isTouchDevice()
ProgressBar.addEventListener(events[deviceType].click, (event) => {
    //initiate Progress-Bar
    let coordStart = ProgressBar.getBoundingClientRect().left

    //Mouse Click
    let coordEnd = !isTouchDevice() ? event.clientX : event.touch[0].clientX
    let progress = (coordEnd - coordStart) / ProgressBar.offsetWidth

    //Set Width
    currentProgress.style.width = progress * 100 + '%'

    //Set Time
    audio.currentTime = progress * audio.duration

    //Set Play
    audio.play()
    pauseButton.classList.remove("hide")
    playButton.classList.add('hide')
})
//Progress Update
setInterval(() => {
    currentTimeRef.innerHTML = timeFormatter(audio.currentTime)
    currentProgress.style.width = (audio.currentTime / audio.duration.toFixed(3)) * 100 + '%'
}, 1000);

//Time Update
audio.addEventListener('timeupdate', () => {
    currentTimeRef.innerHTML = timeFormatter(audio.currentTime);
    currentProgress.style.width = (audio.currentTime / audio.duration) * 100 + '%';
})
window.onload = () => {
    index = 0
    setSong(index)
    initPlayList()
}
const initPlayList = () => {
    for (let i in songList) {
        playListSongs.innerHTML += `<li class="playlistSong"
        onclick="setSong(${i})">
        <div class="playlist-image-container">
            <img src="${songList[i].image}"/>
        </div>
        <div class="playlist-song-details">
            <span id="playlist-song-name">
                ${songList[i].name}
            </span>
            <span id="playlist-song-album">
            ${songList[i].artist}
            </span>
        </div>
        </li>
        `
    }
}

//Display Playlist
playListButton.addEventListener('click', () => {
    playListContainer.classList.remove('hide')
})

//Turn-off Playlist
closeButton.addEventListener('click', () => {
    playListContainer.classList.add("hide")
})


















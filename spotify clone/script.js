console.log("Welcome to Spotify");

//  Initilizing variables
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let masterPlay = document.getElementById("masterPlay");
let range = document.getElementById("range");
let songItemContainer = Array.from(document.getElementsByClassName("songItemContainer")
);

// songs object
let songs = [
  {
    songName: "Maahi",
    filePath: "songs/1.mp3",
    coverPath: "covers/1.jpg",
  },
  {
    songName: "Tere liye",
    filePath: "songs/2.mp3",
    coverPath: "covers/2.jpg",
  },
  {
    songName: "To fir aao",
    filePath: "songs/3.mp3",
    coverPath: "covers/3.jpg",
  },
  {
    songName: "Bin Tere Sanam",
    filePath: "songs/4.mp3",
    coverPath: "covers/4.jpg",
  },
  {
    songName: "Break up Meshup",
    filePath: "songs/5.mp3",
    coverPath: "covers/5.jpg",
  },
  {
    songName: "Love Meshup",
    filePath: "songs/6.mp3",
    coverPath: "covers/6.jpg",
  },
  {
    songName: "No Love",
    filePath: "songs/7.mp3",
    coverPath: "covers/7.jpg",
  },
  {
    songName: "Wo Lamhe",
    filePath: "songs/8.mp3",
    coverPath: "covers/8.jpg",
  },
  {
    songName: "Aafreen Aafreen",
    filePath: "songs/9.mp3",
    coverPath: "covers/9.jpg",
  },
  {
    songName: "Kaho na kaho",
    filePath: "songs/10.mp3",
    coverPath: "covers/10.jpg",
  },
];

// display songs
songItemContainer.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerHTML = songs[i].songName;
});

// listen to events
audioElement.addEventListener("timeupdate", () => {
  // update range / seek bar
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  range.value = progress;
});
range.addEventListener("change", () => {
  audioElement.currentTime = (range.value * audioElement.duration) / 100;
  console.log(audioElement.value);
});

// master Play/Pause
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    masterSongName.innerText = songs[songIndex].songName;
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
    masterSongName.innerText = songs[songIndex].songName;
    gif.style.opacity = 0;
  }
});

// change song
const makeAllPlay = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-circle-pause");
      element.classList.add("fa-circle-play");
    }
  );
};

Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      makeAllPlay();
      e.target.classList.remove("fa-circle-play");
      e.target.classList.add("fa-circle-pause");
      songIndex = parseInt(e.target.id);
      audioElement.src = `songs/${songIndex}.mp3`;
      masterSongName.innerText = songs[songIndex].songName;
      if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        e.target.classList.remove("fa-circle-play");
        e.target.classList.add("fa-circle-pause");
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        gif.style.opacity = 1;
      } else {
        audioElement.pause();
        e.target.classList.remove("fa-circle-pause");
        e.target.classList.add("fa-circle-play");
        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
        gif.style.opacity = 0;
      }
    });
  }
);

// change song using previous/next
document.getElementById("next").addEventListener("click", () => {
  if (songIndex >= 9) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  audioElement.src = `songs/${songIndex}.mp3`;
  audioElement.play();
  audioElement.currentTime = 0;
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
  masterSongName.innerText = songs[songIndex].songName;
});
document.getElementById("previous").addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = 0;
  } else {
    songIndex -= 1;
  }
  audioElement.src = `songs/${songIndex}.mp3`;
  audioElement.play();
  audioElement.currentTime = 0;
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
  masterSongName.innerText = songs[songIndex].songName;
});

// Auto change to next song

audioElement.addEventListener("ended", () => {
  // Increment the songIndex or reset to 0 if it reaches the end
  songIndex = (songIndex + 1) % songs.length;

  // Update the audio source and play the next song
  audioElement.src = songs[songIndex].filePath;
  audioElement.play();

  // Update the song name and other elements
  masterSongName.innerText = songs[songIndex].songName;
  gif.style.opacity = 1;

  // Update the play/pause icon
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");

  // Update the play icons for individual song items
  makeAllPlay();
  document.getElementById(songIndex).classList.remove("fa-circle-play");
  document.getElementById(songIndex).classList.add("fa-circle-pause");
});

import Player from "@vimeo/player";
import throttle from "lodash.throttle";

const iframe = document.querySelector("iframe");
const player = new Vimeo.Player(iframe);

// час відтворення оновлюється у сховищі не частіше, ніж раз на секунду
// зберігається час відтворення у локальне сховище - ключ для сховища "videoplayer-current-time"
const onPlay = throttle((data) => {
    localStorage.setItem("videoplayer-current-time", data.seconds);
}, 1000);

// відстеження події timeupdate - оновлення часу відтворення
player.on("timeupdate", onPlay);


// відновлення відтворення зі збереженої позиції
player.on("loaded", function () {
        if (localStorage.getItem("videoplayer-current-time")) {
            player.setCurrentTime(localStorage.getItem("videoplayer-current-time"));
        }
    });
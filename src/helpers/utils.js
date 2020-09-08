export const getTimeoutSecondsViaLevel = level => {
    const levels = {
        "easy": 1500,
        "middle": 1000,
        "hard": 400
    };
    return levels[level];
};


export const playAudio = (idSegment) => {
    const sounds = {
        1: require("@/assets/sounds/1.mp3"),
        2: require("@/assets/sounds/2.mp3"),
        3: require("@/assets/sounds/3.mp3"),
        4: require("@/assets/sounds/4.mp3")
    };
    const sound = new Audio(sounds[idSegment]);
    sound.play()
};

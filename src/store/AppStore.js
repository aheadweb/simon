export default {
    state: {
        gameStart: false,
        modalShow: false,
        score: 0,
        level: "easy", // easy || middle || hard
        round: 1,
        gameStatus: "normal" // wait || normal
    },
    mutations: {
        setLevel(state, level) {
            state.level = level;
        },
        setGameStart(state, flag) {
            state.gameStart = flag;
        },
        incScore(state) {
            state.score += 1;
        },
        incRound(state) {
            state.round += 1;
        },
        setModal(state, flag) {
            state.modalShow = flag;
        },
        setGameStatus(state, status) {
            state.gameStatus = status;
        },
        resetRound(state) {
            state.round = 0;
        },
        resetScore(state) {
            state.score = 0;
        }

    },
    actions: {
        changeLevel({commit, getters}, level) {
            if (!getters.gameStart) {
                commit("setLevel", level);
            }
        },
        changeGameStart({commit}, flag) {
            commit("setGameStart", flag);
        },
        gameNext({commit, dispatch}) {
            commit("incScore");
            commit("incRound");
            dispatch("resetCountClick");
            dispatch("generateRandomSegment");
            dispatch("fireSegmentInArray");
        },
        gameStop({commit, dispatch}) {
            commit("setGameStart", false);
            commit("setModal", true);
            dispatch("clearRound");
            dispatch("toggleGameStatus", "normal");
            dispatch("clearArraySegments");
            dispatch("resetCountClick");
        },
        toggleModal({commit}, flag) {
            commit("setModal", flag);
        },
        toggleGameStatus({commit}, status) {
            commit("setGameStatus", status);
        },
        clearRound({commit}) {
            commit("resetRound")
        },
        clearScore({commit}) {
            commit("resetScore")
        }
    },
    getters: {
        isModalShow({modalShow}) {
            return modalShow;
        },
        gameStart({gameStart}) {
            return gameStart;
        },
        getScore({score}) {
            return score;
        },
        getLevel({level}) {
            return level;
        },
        getRound({round}) {
            return round;
        },
        getGameStatus({gameStatus}) {
            return gameStatus;
        }
    }
}

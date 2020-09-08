import {getTimeoutSecondsViaLevel, playAudio} from "../helpers/utils";

export default {
    state: {
        segments: [
            {id: 1, color: "blue", position: "top-left", active: false},
            {id: 2, color: "red", position: "top-right", active: false},
            {id: 3, color: "yellow", position: "bottom-left", active: false},
            {id: 4, color: "green", position: "bottom-right", active: false},
        ],
        segmentsArray: [],
        countClick: 0,

    },
    mutations: {
        setNextSegmentOnRound({segmentsArray}, idSegment) {
            segmentsArray.push(idSegment);
        },
        setActiveSegments({segments}, idSegment) {
            let segment = segments
                .find((segment) => segment.id === idSegment);
            segment.active = true;
        },
        removeActiveSegments({segments}, idSegment) {
            let segment = segments
                .find((segment) => segment.id === idSegment);
            segment.active = false;
        },
        incCountClick(state) {
            state.countClick = state.countClick += 1;
        },
        clearCountClick(state) {
            state.countClick = 0
        },
        resetArraySegments(state) {
            state.segmentsArray = [];
        }
    },
    actions: {
        generateRandomSegment({commit}) {
            const idSegment = Math.floor(1 + Math.random() * 4);
            commit("setNextSegmentOnRound", idSegment);
        },
        async segmentClick({commit, getters, dispatch}, segmentId) {
            if (getters.getGameStatus === "normal") {
                commit("incCountClick");
                dispatch("toggleGameStatus", "wait");
                await dispatch("fireSegment", segmentId);
                if (getters.getSegmentsArray[getters.getCountClick - 1] === segmentId) {
                    dispatch("toggleGameStatus", "normal");
                    if (getters.getCountClick === getters.getSegmentsArray.length) {
                        setTimeout(() => {
                            dispatch("gameNext");
                        }, 500)
                    }
                } else {
                    dispatch("gameStop");
                }
            }
        },
        async fireSegmentInArray({dispatch, getters}) {
            dispatch("toggleGameStatus", "wait");
            for (const idSegment of getters.getSegmentsArray) {
                await dispatch("fireSegment", idSegment);
            }
            dispatch("toggleGameStatus", "normal");
        },

        fireSegment({commit, getters}, idSegment) {
            const timerFlashBack = 200;
            const timer = getTimeoutSecondsViaLevel(getters.getLevel) - timerFlashBack;
            return new Promise((resolve) => {
                commit("setActiveSegments", idSegment);
                playAudio(idSegment);
                setTimeout(() => {
                    commit("removeActiveSegments", idSegment);
                    setTimeout(() => {
                        resolve();
                    }, timerFlashBack);
                }, timer)
            })
        },
        resetCountClick({commit}) {
            commit("clearCountClick");
        },
        clearArraySegments({commit}) {
            commit("resetArraySegments");
        }
    },
    getters: {
        getSegmentsArray({segmentsArray}) {
            return segmentsArray;
        },
        getSegments({segments}) {
            return segments;
        },
        getCountClick({countClick}) {
            return countClick;
        }
    }
}

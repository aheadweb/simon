<template>
    <div id="app">
        <div class="title">Simon Game</div>
        <div v-if="!gameStart" class="game-start" @click="start">Начать игру!</div>
        <div v-else class="subtitle">Round: {{getRound}}</div>
        <div class="container">
            <div class="row">
                <Simon/>
                <Menu/>
            </div>
        </div>
        <Modal/>
    </div>
</template>

<script>

    import Simon from "./components/simon/Simon";
    import Menu from "./components/menu/Menu";
    import Modal from "./components/modal/Modal";
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: 'App',
        components: {
            Modal,
            Menu,
            Simon,
        },
        computed: {
            ...mapGetters([
                "gameStart",
                "getRound"
            ]),
        },
        methods: {
            ...mapActions([
                "changeGameStart",
                "fireSegmentInArray",
                "generateRandomSegment",
                "toggleGameStatus"
            ]),
            start() {
                this.changeGameStart(true);
                this.toggleGameStatus("wait");
                this.generateRandomSegment();
                this.fireSegmentInArray();
            }
        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    .title {
        font-size: 4rem;
        margin-bottom: 1rem;
    }

    .subtitle {
        font-size: 1.4rem;
        margin-bottom: 4rem;
    }

    .container {
        max-width: 1024px;
        margin: 0 auto;
    }

    .row {
        display: flex;
        justify-content: space-between;
    }

    .game-start {
        background-color: #e7e7e7;
        padding: 2rem;
        font-size: 2rem;
        cursor: pointer;
        max-width: 1024px;
        margin: 0 auto 2rem;
        border-radius: 1.4rem;
    }


</style>

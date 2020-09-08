<template>
    <div class="overlay" :class="className">
        <div class="modal">
            <div class="modal__title">Игра закончена!</div>
            <div class="modal__title">Результат: {{getScore}}</div>
            <div class="modal__content">
                <div class="modal__btn" @click="modalClose">Окей</div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "Modal",
        computed: {
            ...mapGetters([
                "getScore",
                "isModalShow",
            ]),
            className() {
                return {
                    "overlay_show": this.isModalShow
                }
            },
        },
        methods: {
            ...mapActions([
                "toggleModal",
                "clearScore"
            ]),
            modalClose() {
                this.clearScore();
                this.toggleModal(false)
            }
        }
    }
</script>

<style lang="scss">
    .overlay {
        display: none;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: rgba(0, 0, 0, .6);

        &_show {
            display: block;
        }
    }

    .modal {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 400px;
        padding: 2rem;
        background-color: #fff;
        border-radius: 20px;

        &__title {
            font-size: 2rem;
            margin-bottom: 2rem;
        }

        &__content {
            margin-bottom: 1rem;
        }

        &__btn {
            cursor: pointer;
            padding: 1rem;
            border: 1px solid #e7e7e7;

            &:hover {
                background-color: #e7e7e7;
            }
        }
    }
</style>

<template>
    <nav class="menu">
        <div class="menu__title">Уровень сложности</div>
        <div class="menu__options"
            :class="gameStart ? 'menu__options_disable': ''"
        >
            <div class="menu__option" :class="level.level === getLevel ? 'menu__option_active':''"
                 @click="setLevel(level.level)"
                 :key="level.level"
                 v-for="level in levels">
                {{level.title}}
            </div>
        </div>
    </nav>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "Menu",
        data() {
            return {
                levels: [
                    {title: "Легко", level: "easy"},
                    {title: "Средне", level: "middle"},
                    {title: "Сложно", level: "hard"},
                ],
            }
        },
        computed: {
            ...mapGetters([
                "getLevel",
                "gameStart"
            ]),
        },
        methods: {
            ...mapActions([
               "changeLevel"
            ]),
            setLevel(level) {
                this.changeLevel(level);
            }
        }
    }
</script>

<style lang="scss">
    .menu {
        &__title {
            font-size: 2rem;
            margin-bottom: 2rem;
        }

        &__option {
            margin-bottom: 1.5rem;
            padding: 1rem;
            border-radius: .2rem;
            font-size: 1.5rem;
            background-color: #e7e7e7;
            cursor: pointer;

            &_active,
            &:hover {
                background-color: #928d8d;
                color: #fff;
            }

            &:last-child {
                margin-bottom: 0;
            }

            &_start {
                background-color: #b7c3d0;
            }

        }

        &__options {
            &_disable {
                pointer-events: none;
                cursor: not-allowed;
                opacity: .5;
            }
        }

    }
</style>

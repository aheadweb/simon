<template>
    <div class="simon"
         :class="className"
    >
        <div class="simon__part"
             :class="`simon__part_${segment.color} simon__part_${segment.position} ${segment.active ? 'simon__part_active':''}`"
             :key="segment.id"
             :data-id="segment.id"
             @click="segmentClick(segment.id)"
             v-for="segment in getSegments">
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "Simon",
        computed: {
            ...mapGetters([
                "getSegments",
                "getGameStatus",
                "gameStart"
            ]),
            className() {
                return {
                    "simon_disable": this.getGameStatus === "wait" || this.gameStart === false
                }
            }
        },
        methods: {
            ...mapActions([
                "segmentClick"
            ])
        },
    }
</script>

<style lang="scss">
    .simon {
        display: flex;
        flex-wrap: wrap;
        width: 400px;
        margin-right: 30px;

        &_disable {
            cursor: not-allowed;
            pointer-events: none;
        }

        &_disable &__part {
            cursor: not-allowed;
        }

        &__part {
            width: 200px;
            height: 200px;
            background-color: #e7e7e7;
            cursor: pointer;
            opacity: .35;

            &_active {
                opacity: 1;
            }


            &_blue {
                background-color: blue;
            }

            &_yellow {
                background-color: yellow;
            }

            &_green {
                background-color: green;
            }

            &_red {
                background-color: red;
            }

            &_top-left {
                border-top-left-radius: 100%;

                &:hover {
                    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.7)
                }
            }

            &_top-right {
                border-top-right-radius: 100%;

                &:hover {
                    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.7)
                }
            }

            &_bottom-left {
                border-bottom-left-radius: 100%;

                &:hover {
                    box-shadow: 0 4px 14px 0 rgba(0, 0, 0, 0.7)
                }
            }

            &_bottom-right {
                border-bottom-right-radius: 100%;

                &:hover {
                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.7)
                }
            }
        }
    }
</style>

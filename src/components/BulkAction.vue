<template>
    <div class="bulk__action">
        <div class="bulk__action-wrapper">
            <p>Bulk Action:</p>
            <div class="bulk__action-button">
                <div class="bulk__action-item">
                    <Button content="Done" type="detail"></Button>
                </div>
                <div class="bulk__action-item" @click="removeItems()">
                    <Button content="Remove" type="remove"></Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Button from './Button.vue';

export default {
    components: {
        Button
    },
    methods: {
        removeItems() {
            this.$emit('remove-items')
        }
    }
}
</script>

<style scoped>
.bulk__action {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100vw;
    background-color: #f1f1f1;
    border-top: 1px solid #1e1e1e;
}
.bulk__action-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 40px;
}
.bulk__action-button {
    display: flex;
}
.bulk__action-item {
    margin-left: 15px;
}
@media screen and (max-width: 768px) {
    .bulk__action-wrapper {
        display: block;
        padding: 20px;
    }
    .bulk__action-button {
        justify-content: center;
        margin-top: 5px;
    }
}
</style>
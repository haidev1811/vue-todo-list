<template>
    <div class="todo__item">
        <div class="todo__item-summary">
            <div class="left">
                <input 
                    type="checkbox" 
                    :value="formData.id"
                    v-model="checked"
                    @change="selectItem($event)"
                >
                <label class="label__title">{{ formData.title }}</label>
            </div>
            <div class="right">
                <div class="button__option" @click="showDetail()">
                    <Button content="Detail" type="detail"></Button>
                </div>
                <div class="button__option" @click="removeItem()">
                    <Button content="Remove" type="remove"></Button>
                </div>
            </div>
        </div>
        <div v-show="isShowDetail" class="todo__item-detail">
            <FormInput :isUpdate="true" :formData="formData" @update="updateTodoItem"/>
        </div>
    </div>
</template>

<script>
import Button from './Button.vue';
import FormInput from './FormInput.vue';

export default {
    name: 'TodoItem',
    props: {
        formData: {
            type: Object,
            default: () => {}
        },
        id: {
            type: String,
        },
    },
    components: {
        Button,
        FormInput
    },
    data() {
        return {
            isShowDetail: false,
            checked: false,
        }
    },
    methods: {
        showDetail() {
            this.isShowDetail = !this.isShowDetail
        },
        updateTodoItem(form) {
            this.$emit('update', this.id, form)
        },
        removeItem() {
            this.$emit('remove', this.id)
            this.checked = false
        },
        selectItem(e) {
            if(e.target.checked) {
                this.$emit('select-item', e.target.value)
                return
            }
            this.$emit('remove-select', e.target.value)
        },
        resetCheck() {
            this.checked = false
        }
    }
}
</script>

<style scoped>
.todo__item {
    border: 1px solid #1e1e1e;
    margin: 20px 0;
    border-radius: 5px;
}
.todo__item-summary {
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #1e1e1e;
}
.label__title{
    margin-left: 10px;
}
.left {
    display: flex;
    align-items: center;
}
.right {
    display: flex;
}
.button__option {
    margin-left: 10px;
}
.todo__item-detail {
    padding: 30px 20px;
}
</style>
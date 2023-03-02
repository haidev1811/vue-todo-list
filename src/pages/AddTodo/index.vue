<template>
    <div>
        <Header title="New Task"></Header>
        <FormInput 
            @create="addNewTask"
        ></FormInput>
    </div>
</template>

<script>
import Header from '@/components/Header.vue';
import FormInput from '@/components/FormInput.vue';

export default {
    name: 'AddTodoPage',
    components: {
        Header,
        FormInput
    },
    data() {
        return {
            todoList: localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : []
        }
    },
    methods: {
        addNewTask(form) {
            this.todoList.push(form)
            localStorage.setItem('todos', JSON.stringify(this.todoList))
            this.$router.push('/')
        }
    }
}
</script>
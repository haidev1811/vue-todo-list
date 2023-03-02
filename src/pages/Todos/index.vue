<template>
    <div>
        <Header title="To Do List"></Header>
        <input 
            type="text" 
            class="form__input" 
            placeholder="Search..."
            v-model="search"
        />
        <div class="todo__list">
            <template v-if="todoList && todoList.length > 0">
                <TodoItem 
                    ref="refTodoItem"
                    v-for="(todoItem, todoIndex) in todoList"
                    :key="todoIndex" 
                    :formData="todoItem"
                    :id="todoItem.id"
                    @update="updateTodoItem"
                    @remove="removeTodoItem"
                    @select-item="selectItem"
                    @remove-select="removeSelect"
                />
            </template>
        </div>
        <BulkAction 
            v-if="isShowBulkAction"
            @remove-items="removeTodoItems"
        />
    </div>
</template>

<script>
import Header from '@/components/Header.vue';
import TodoItem from '@/components/TodoItem.vue';
import BulkAction from '@/components/BulkAction.vue';

export default {
    name: 'TodosPage',
    components: {
        Header,
        TodoItem,
        BulkAction
    },
    data() {
        return {
            todoList: localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [],
            selected: [],
            search: '',
            todoListCopy: []
        }
    },
    created() {
        this.sortTodoList()
    },
    computed: {
        isShowBulkAction() {
            if(this.selected.length > 0) {
                return true
            } else {
                return false
            }
        }
    },
    watch: {
        search() {
            this.onSearchTask()
        }
    },
    methods: {
        sortTodoList() {
            this.todoList.sort((first, second) => 
                new Date(first.date) - new Date(second.date)
            )
            this.todoListCopy = [...this.todoList]
        },
        setLocalStorage() {
            this.sortTodoList()
            localStorage.setItem('todos', JSON.stringify(this.todoList))
        },
        updateTodoItem(id, form) {
            const indexItem = this.todoList.findIndex((item) => item.id === id)
            this.todoList[indexItem] = form
            this.setLocalStorage(this.todoList)
        },
        removeTodoItem(id) {
            this.todoList = this.todoList.filter((item) => item.id !== id)
            this.setLocalStorage(this.todoList)
            this.removeSelect(id)
        },
        selectItem(item) {
            this.selected.push(item)
        },
        removeSelect(item) {
            this.selected = this.selected.filter((itemSelected) => itemSelected !== item)
        },
        removeTodoItems() {
            this.selected.forEach((item) => {
                this.removeTodoItem(item)
            })
            this.selected = []
            this.$refs.refTodoItem.forEach((item) => {
                item.checked = false
            })
        },
        onSearchTask() {
            setTimeout(() => {
                this.todoList = []
                if(this.search.length > 0) {
                    this.todoList = this.todoListCopy.filter((todoItem) => 
                        todoItem.title.toLowerCase().includes(this.search.toLowerCase())
                    )
                } else {
                    this.todoList = [...this.todoListCopy]
                }
            }, 400)
        }
    }
}
</script>

<style scoped>
.form__input {
    width: 100%;
    border: 1px solid #1e1e1e;
    min-height: 38px;
    border-radius: 5px;
    padding: 10px;
    outline: none;
}
.todo__list {
    padding-bottom: 80px;
}
</style>
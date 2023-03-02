<template>
    <div class="form__group">
        <form>
            <div class="form__element">
                <input 
                    type="text" 
                    class="form__input form__input-title"
                    :class="{'border-danger': checkValidTitle}"
                    placeholder="Add new task..."
                    v-model="form.title"
                    required
                />
                <div v-show="checkValidTitle" class="text-danger">Title is required.</div>
            </div>
            <div class="form__element">
                <label for="description">Description</label>
                <textarea 
                    name="description" 
                    rows="10" 
                    class="form__input form__input-desc"
                    v-model="form.description"
                ></textarea>
            </div>
            <div class="form__input-flex">
                <div class="form__input-option">
                    <label for="description">Due Date</label>
                    <Datepicker 
                        class="form__input-time"
                        format="DD/MM/YYYY"
                        :disabled-date="disabledRange"
                        v-model="form.date"
                    ></Datepicker>
                </div>
                <div class="form__input-option">
                    <label for="description">Priority</label>
                    <select class="form__input" v-model="form.priority">
                        <option 
                            v-for="priorityItem in prioritySelect" 
                            :key="priorityItem.value" 
                            :value="priorityItem.value"
                        >
                            {{ priorityItem.text }}
                        </option>
                    </select>
                </div>
            </div>
        </form>
        <div class="button__submit" @click="submitForm()">
            <Button v-if="isUpdate" content="Update" :fullWidth="true"></Button>
            <Button v-else content="Add" :fullWidth="true"></Button>
        </div>
    </div>
</template>

<script>
import Datepicker from 'vue2-datepicker'
import Button from './Button.vue'

export default {
    name: 'FormInput',
    props: {
        isUpdate: {
            type: Boolean,
            default: false
        },
        formData: {
            type: Object,
            default: () => {}
        }
    },
    components: {
        Datepicker,
        Button
    },
    data() {
        return {
            form: {
                id: '',
                title: '',
                description: '',
                date: null,
                priority: 'normal'
            },
            prioritySelect: [
                {
                    text: 'Low',
                    value: 'low'
                },
                {
                    text: 'Normal',
                    value: 'normal'
                },
                {
                    text: 'High',
                    value: 'high'
                },
            ],
            onValidate: false
        }
    },
    created() {
        this.form.date = new Date(Date.now())
        if(this.isUpdate) {
            this.form = { ...this.formData }
            this.form.date = new Date(this.form.date)
        }
    },
    computed: {
        checkValidTitle() {
            if(this.onValidate && this.form.title.length === 0) {
                return true
            } else {
                return false
            }
        }
    },
    methods: {
        disabledRange(date) {
            const now = new Date(Date.now())
            return date.getTime() < now.setDate(now.getDate() - 1)
        },
        submitForm() {
            this.onValidate = true
            if(this.form.title.length === 0) {
                return
            }
            if(this.isUpdate) {
                this.$emit('update', this.form)
            } else {
                this.form.id = this.randomId()
                this.$emit('create', this.form)
            }
        },
        randomId(length = 6) {
            return Math.random().toString(36).substring(2, length + 2);
        }
    }
}
</script>

<style scoped>
.form__group {
    margin: 30px unset;
}
.form__element {
    margin-bottom: 30px;
}
.form__input {
    width: 100%;
    border: 1px solid #1e1e1e;
    min-height: 38px;
    border-radius: 5px;
    padding: 10px;
    outline: none;
}
.form__input-flex {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.form__input-option {
    width: 45%;
}
label{
    margin-bottom: 30px;
}
.form__input-time {
    width: 100%;
}
::v-deep .form__input-time input {
    min-height: 38px;
    border: 1px solid #1e1e1e;
    border-radius: 5px;
}
.text-danger {
    font-size: 0.8rem;
    color: #dc3545;
}
.button__submit{
    margin-top: 30px;
}
.border-danger {
    border-color: #dc3545;
}
@media screen and (max-width: 768px) {
    .form__input-flex {
        display: block;
    }
    .form__input-option {
        width: 100%;
        margin-bottom: 30px;
    }
}
</style>
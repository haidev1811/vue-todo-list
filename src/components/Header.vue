<template>
    <div class="header">
        <h2>{{ title }}</h2>
        <div class="button-right" @click="changePage()">
            <Button :content="contentButton"></Button>
        </div>
    </div>
</template>

<script>
import Button from './Button.vue';

export default {
    name: 'HeaderComponent',
    props: {
        title: {
            type: String,
            required: true,
        }
    },
    components: {
        Button
    },
    computed: {
        contentButton() {
            if(this.$route.path === '/') {
                return 'New'
            } else {
                return 'List'
            }
        },
    },
    methods: {
        changePage() {
            if(this.$route.path === '/') {
                this.$router.push('/add')
            } else {
                this.$router.push('/')
            }
        }
    }
}
</script>

<style scoped>
.header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 5px;
    position: relative;
}
h2 {
    font-size: 2rem;
    font-weight: 600;
}
.button-right {
    position: absolute;
    right: 0;
}
</style>
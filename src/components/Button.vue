<template>
    <button 
        class="button" 
        :class="`${fullWidth ? 'w-100' : ''} ${type}`"
    >
        {{ content }}
    </button>
</template>

<script>
export default {
    name: 'ButtonComponent',
    props: {
        content: {
            type: String,
            required: true
        },
        fullWidth: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            default: 'add'
        },
    }
}
</script>

<style scoped>
.button {
    min-width: 120px;
    padding: 0 10px;
    border: none;
    outline: none;
    cursor: pointer;
    border-radius: 5px;
    color: #eee;
    font-size: 1rem;
    min-height: 38px;
}
.w-100 {
    width: 100%;
}
.button.add {
    background-color: #198754;
}
.button.detail {
    background-color: #0dcaf0;
}
.button.remove {
    background-color: #dc3545;
}
</style>
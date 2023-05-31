<template>
    <aside>
        <ul>
            <li v-for="topic in topics" :key="topic.id">
                {{ topic.title }}
            </li>
        </ul>
    </aside>
</template>

<script>
export default {
    data() {
        return {
            topics: [
                {title: 'Gaming', id:'1'},
                {title: 'Sport', id:'2'},
                {title: 'Business', id:'3'},
                {title: 'Television', id:'4'},
                {title: 'Celebrity', id:'5'},
                {title: 'Music', id:'6'},
                {title: 'Art', id:'7'},
                {title: 'Animals', id:'8'},
                {title: 'Food and Drink', id:'9'},
                {title: 'Fashion', id:'10'}
            ]
        }
    },
    methods: {
        showTitle() {
            this.title = true;
        }
    }
}
</script>

<style>

    aside {
        width: 15%;
        margin-left: 30px;
        background: white;
        height: 75vh;
        text-align: center;
    }

    ul {
        list-style: none;
        padding: 0;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    li {
        padding: 12px 0;
        width: 100%;
        cursor: pointer;
    }

    li:hover {
        background: #FF4500;
    }
</style>
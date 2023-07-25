<template>
    <div>
        <div class="comment" v-for="comment, i in comments" :key="i">
            <span class="comment-author">
                {{ comment.author }}
            </span>
            <span class="comment-date">
                {{ comment.updated_at }}
            </span>
            <span class="comment-content">
                {{  comment.comment }}
            </span>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        comments: Array
    },
}
</script>
<style>
.comment {
    border: 1px solid #ccc;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 8px;
}
.comment-author {
    font-weight: 650;
}
.comment-date {
    display: block;
    float: right;
    font-size: 80%;
}
.comment-content {
    display: block;
    line-height: 1;
}
</style>

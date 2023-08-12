<template>
    <div class="comments">
        <div class="comment" v-for="comment, i in comments" :key="i">
            <span class="comment-author">
                {{ comment.author }}
            </span>
            <span class="comment-date">
                {{ comment.updated_at }}
            </span>
            <br>
            <span class="comment-content">
                {{ comment.comment }}
            </span>
            <span class="comment-delete" v-if="comment.deletable" @click="del(comment)">
                <b-icon icon="trash" />
            </span>
        </div>
        <div class="new-comment" v-if="loggedIn">
            <b-form @submit.prevent="addComment()">
                <b-form-group label="Escreva um comentário">
                    <b-form-textarea v-model="comment" rows="2" minlength="3"
                    required/>
                </b-form-group>
                <b-button class="float-right" variant="success" type="submit">
                    COMENTAR
                </b-button>
            </b-form>
        </div>
    </div>
</template>
<script>
import Swal from 'sweetalert2'

export default {
    computed: {
        loggedIn() {
            return this.$auth.loggedIn
        },
        comments() {
            return this.grupoComments.map(comment => {
                if (this.userComments.some(c => c.id == comment.id))
                    comment.deletable = true
                return comment
            })
        },
        userComments() {
            return this.$store.state.grupo.userComments
        },
    },
    data() {
       return {
            comment: "" // new comment
       }
    },
    methods: {
        addComment() {
            this.$store.dispatch('grupo/addComment', {
                grupo_id: this.grupoId,
                comment: this.comment,
            }).then(() => {
                this.comment = ""
            })
        },
        del(comment) {
            Swal.fire({
                title: 'Tem certeza?',
                text: 'Você está prestes a deletar o comentário.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sim, deletar',
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$store.dispatch('grupo/deleteComment', comment)
                }
            })
        }
    },
    props: {
        grupoComments: Array,
        grupoId: Number,
    },
    watch: {
        grupo: {
            deep: true,
            immediate: false
        }
    }
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
    line-height: 1;
}

.comment-delete {
    display: block;
    float: right;
}

.comment-delete:hover {
    color: red;
    cursor: pointer;
}

.new-comment {
    font-size: 95%;
}
</style>

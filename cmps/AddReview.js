import { bookService } from "../services/book.service.js"

export default {
    template: `
        <section class="book-edit">
            <hr />
            <h4>add-review</h4>
            <form @submit.prevent="save">
                <label for="fullname">Fullname:</label>
                <input name="fullname" type="text" v-model="review.fullname" placeholder="fullname">
                <label for="rate">Rate:</label>
                <input name="rate" type="number" min="0" max="5" v-model.number="review.rating">
                <label for="read-at">Read At:</label>
                <input name="read-at" type="date" v-model="review.readAt">
                <button>Save</button>
            </form>

            <hr />

            

        </section>
    `,
    data (){
        return {
            bookId: null,
            review: {
                fullname: '',
                rating: 0,
                readAt: "2023-02-27",
            },
        }
    },
    created() {
        this.bookId = this.$route.params.bookId
    },
    methods: {
        save() {
            bookService.addReview(this.bookId, this.review)
            console.log('saved rev');
        }
    },
}
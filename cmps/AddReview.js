import { bookService } from "../services/book.service.js"

export default {
    template: `
        <section class="book-edit">
            <h4>add-review</h4>
            <form @submit.prevent="save">
                <label for="fullname">Fullname:</label>
                <input name="fullname" type="text" v-model="review.fullname" placeholder="fullname">
                <label for="read-at">Read At:</label>
                <input name="read-at" type="date" v-model="review.readAt">
                <label>rating:</label>
                <div class="rating">
                    <template v-if="true" v-for="n in 5">
                        <input type="radio" name="rating" :value="5-n+1 +' ☆'" :id="n" v-model="review.rating" />
                        <label :for="n">☆</label>
                    </template>
                </div>

                <button>Save</button>
            </form>


            

        </section>
    `,
    data() {
        return {
            rats: [],
            bookId: null,
            review: bookService.getEmptyReview(),
        }
    },
    created() {
        this.bookId = this.$route.params.bookId
    },
    methods: {
        save() {
            // bookService.addReview(this.bookId, this.review)
            console.log('saved rev')
            this.$emit('add', this.review)
        }
    },
}
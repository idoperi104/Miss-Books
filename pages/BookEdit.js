import { bookService } from "../services/book.service.js"
import { eventBusService } from "../services/event-bus.service.js"

export default {
    template: `
        <section class="book-edit">
            <h2>Add a book</h2>
            <form @submit.prevent="save">
                <label for="title">title:</label>
                <input name="title" type="text" v-model="book.title" placeholder="title">
                <label for="sub-title">sub title:</label>
                <input name="sub-title" type="text" v-model="book.subtitle" placeholder="sub title">
                <label for="price">price:</label>
                <input name="price" type="number" v-model.number="book.listPrice.amount">
                <label for="date">published year:</label>
                <input name="date" type="number" v-model.number="book.publishedDate">
                <label for="description">description:</label>
                <input name="description" type="text" v-model="book.description" placeholder="description">
                <button>Save</button>
            </form>
        </section>
    `,
    data() {
        return {
            book: bookService.getEmptyBook()
        }
    },
    created() {
        const {bookId} = this.$route.params
        if (bookId) {
            bookService.get(bookId)
                .then(book => this.book = book)
        }
    },
    methods: {
        save() {
            bookService.save(this.book)
                .then(savedBook => {
                    this.book = bookService.getEmptyBook()
                    this.$emit('book-saved', savedBook)
                    this.$router.push('/book')
                })
        }
    },
    
}
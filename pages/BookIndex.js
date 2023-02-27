import { bookService } from '../services/book.service.js'

import BookFilter from '../cmps/BookFilter.js'
import BookList from '../cmps/BookList.js'

import { eventBusService } from '../services/event-bus.service.js'

export default {
    template: `
        <section class="car-index">
            <RouterLink to="/book/edit">Add a book</RouterLink>
            <BookFilter @filter="setFilterBy"/>
            <BookList
                :books="filteredBooks"
                v-if="books"
                @remove="removeBook"
            />

        </section>
    `,
    data() {
        return {
            books: null,
            filterBy: {},

        }
    },
    methods: {
        removeBook(bookId) {
            bookService.remove(bookId)
                .then(() => {
                    const idx = this.books.findIndex(book => book.id === bookId)
                    this.books.splice(idx, 1)
                    eventBusService.emit('show-msg', { txt: 'book removed', type: 'success' })
                })
                .catch(err=>{
                    eventBusService.emit('show-msg', { txt: 'book remove failed', type: 'error' })
                })
        },
        setFilterBy(filterBy) {
            this.filterBy = filterBy
        },
    },
    computed: {
        filteredBooks() {
            const regex = new RegExp(this.filterBy.title, 'i')
            return this.books.filter(book => {
                return regex.test(book.title) 
                && book.listPrice.amount <= this.filterBy.maxPrice
            })
        }
    },
    created() {
        bookService.query()
            .then(books => this.books = books)
    },
    components: {
        BookList,
        BookFilter,
    }
}
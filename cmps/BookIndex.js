import { bookService } from '../services/book.service.js'

import BookFilter from './BookFilter.js'
import BookList from './BookList.js'

import BookDetails from './BookDetails.js'
import BookEdit from './BookEdit.js'

export default {
    template: `
        <section class="car-index">
            <BookFilter @filter="setFilterBy"/>
            <BookList
                :books="filteredBooks"
                v-if="books"
                @remove="removeBook"
                @show-details="showBookDetails"
            />
            <BookDetails 
            v-if="selectedBook" 
            @hide-details="selectedBook = null"
            :book="selectedBook"
            />
            <BookEdit @book-saved="onSaveBook"/>

        </section>
    `,
    data() {
        return {
            books: null,
            selectedBook: null,
            filterBy: {},

        }
    },
    methods: {
        removeBook(bookId) {
            bookService.remove(bookId)
                .then(() => {
                    const idx = this.books.findIndex(book => book.id === bookId)
                    this.books.splice(idx, 1)
                })
        },
        showBookDetails(bookId) {
            this.selectedBook = this.books.find(book => book.id === bookId)
        },
        setFilterBy(filterBy) {
            this.filterBy = filterBy
        },
        onSaveBook(newBook){
            this.books.unshift(newBook)
        }
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
        BookDetails,
        BookFilter,
        BookEdit,
    }
}
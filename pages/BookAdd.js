import { bookService } from "../services/book.service.js"
import { googleBookService } from "../services/googleBook.service.js"

export default {
    template: `
        <h1>bookAdd</h1>
        <form @submit.prevent="search">
            <input 
                v-model="searchName"
                placeholder="Search"
                type="text" />
            <button>search</button>
        </form>


        <ul>
            <li class="google-books-list" v-for="(book, idx) in books" :key="book.id">
                <h3>{{idx+1 + '. '}}{{book.title}}</h3>
                <button @click="addBook(book)">+</button>
            </li>
        </ul>
    `,
    data() {
        return {
            searchName: '',
            books: [],
        }
    },
    methods: {
        addBook(book) {
            bookService.addGoogleBook(book)
                .then(book => this.$router.push(`/book/${book.id}`))
                .catch(console.log)
        },
        search() {
            console.log(this.searchName);
            googleBookService.query(this.searchName)
                .then( books => {
                    this.books = books
                })

        }
    },
    computed: {

    },

}














// filteredGoogleBooks() {
        //     const regex = new RegExp(this.searchName, 'i')
        //     return this.books.filter(book => {
        //         return regex.test(book.title)
        //     })
        // }


// https://www.googleapis.com/books/v1/volumes?q=HTML5
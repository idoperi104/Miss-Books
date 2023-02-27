import { bookService } from '../services/book.service.js'
import LongText from '../cmps/LongText.js'

export default {
    template: `
        <section class="book-details" v-if="book">
            <h2>{{ book.title }}</h2>
            <h3>{{ book.subtitle }}</h3>
            <h4>authors: {{ book.authors.join(', ') }}</h4>
            <h5>Published Date: {{ book.publishedDate }} - {{ setTypeOfDate }}</h5>
            <br/>

            <p>description: </p>
            <LongText
                :txt="book.description"/>
            <br/>

            <p :class="priceClass">price: {{ formattedPrice }}</p>
            <p>pageCount: {{ book.pageCount }} {{ setTypeOfReading }}</p>
            <p>categories: {{ book.categories.join(', ') }}</p>

            <img :src="book.thumbnail" alt="">
            
            <RouterLink to="/book">Back to list</RouterLink>
        </section>
    `,
    data (){
        return {
            book: null
        }
    },
    created() {
        const {bookId} = this.$route.params
        bookService.get(bookId)
            .then(book => this.book = book)
    },
    methods: {
        closeDetails() {
            this.$emit('hide-details')
        },

    },
    computed: {
        priceClass() {
            return {
                'high-price': this.book.listPrice.amount > 150,
                'low-price': this.book.listPrice.amount < 20,
            }
        },
        setTypeOfReading() {
            if (this.book.pageCount > 500) return 'Serious Reading'
            else if (this.book.pageCount > 200) return 'Descent Reading'
            else if (this.book.pageCount < 100) return 'Light Reading'
        },
        setTypeOfDate() {
            const currYear = (new Date().getYear()) + 1900
            const diff = currYear - this.book.publishedDate
            
            if (diff > 10) return 'Vintage'
            return 'New'
        },
        formattedPrice(){
            const {amount, currencyCode} = this.book.listPrice
            return new Intl.NumberFormat('en', {style: 'currency', currency:currencyCode}).format(amount)
        }
    },
    components: {
        LongText,
    }
}

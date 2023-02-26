export default {
    props: ['book'],
    template: `
        <article class="book-preview">
            <h2>{{ book.title }}</h2>
            <h3 :class="priceClass" >{{ book.listPrice.amount }} {{ book.listPrice.currencyCode }}</h3>
            <img class="sale" :src="getSrc" alt="">
            <img :src="book.thumbnail" alt="">
            
        </article>
    `,
    computed: {
        priceClass(){
            return {
                'high-price': this.book.listPrice.amount > 150,
                'low-price': this.book.listPrice.amount < 20,
            }
        },
        getSrc(){
                if(this.book.listPrice.isOnSale) return '/imgs/sale.png'
        }
    }
}
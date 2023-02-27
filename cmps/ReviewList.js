import ReviewPreview from './ReviewPreview.js'

export default {
    props: ['reviews'],
    template: `
        <section class="book-list">
            <ul>
                <li v-for="review in reviews" :key="review.id">
                    <ReviewPreview
                        :review="review"/>
                    <button @click="remove(review.id)">x</button>
                </li>
            </ul>
        </section>
    `,
    methods: {
        remove(reviewId) {
            this.$emit('remove', reviewId)
        },
    },
    components: {
        ReviewPreview,
    }
}
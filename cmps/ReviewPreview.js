export default {
    props: ['review'],
    template: `
        <article class="review-preview">
            <p>{{ review.fullname }}</p>
            <p>{{ review.rating }}</p>
            <p>{{ review.readAt }}</p>
        </article>
    `,

}
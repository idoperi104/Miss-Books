export default {
    template: `
        <section class="book-filter">
            <input 
                v-model="filterBy.title"
                @input="filter" 
                placeholder="Search"
                type="text" />
            <input 
                v-model="filterBy.maxPrice"
                @input="filter" 
                type="range" 
                min="0"
                max="500"
                step="50"/>
            <span>{{ this.filterBy.maxPrice }}</span>
        </section>
    `,
    data() {
        return {
            filterBy: { title: '', maxPrice: 500 },
        }
    },
    methods: {
        filter(){
            this.$emit('filter', this.filterBy)
        }
    },
    created() {
        this.filter()
    },
}
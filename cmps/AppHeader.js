export default {
    template: `
        <header class="app-header">
            <h1>Books</h1>
            <nav>
                <RouterLink v-for="(route, idx) in routs" :to="route.path" 
                :title="route.name" :key="idx">{{route.name}}</RouterLink> |
            </nav>
        </header>
    `,
    data() {
        return {
            routs: [
                { path: '/', name: 'Home' },
                { path: '/book', name: 'Book' },
                { path: '/about', name: 'About' }
            ]
        }
    },
    methods: {
        setRoute(route) {
            this.$emit('set-route', route)
        }
    }
}
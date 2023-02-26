
export default {
    props: ['txt'],
    template: `
        <article class="long-text">
            <p>
                {{ getTxt }}
                <span class="show-more" @click="isShowMore = !isShowMore">{{ getBtnTxt }}</span>
            </p>
        </article>
    `,
    data(){
        return {
            isShowMore: false,
        }
    },
    computed: {
        getTxt(){
            if(this.txt.length <= 100) return this.txt
            if (this.isShowMore) return this.txt
            return this.txt.slice(0, 100)
        },
        getBtnTxt(){
            if(this.txt.length <= 100) return ''
            if (this.isShowMore) return 'Show Less...'
            return 'Show More...'
        }
    },
}
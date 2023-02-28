'use strict'

import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'
import { bookService } from './book.service.js'

const STORAGE_KEY = 'googleBookDB'

export const googleBookService = {
    query,
}

function query(txt) {
    return storageService.query(STORAGE_KEY)
        .then(searches => {
            var search = searches.find(search => search.searchName === txt)
            if (search) return search.books
            return Promise.reject('error')
        })
        .catch(err => {
            console.log(err);
            const url = `https://www.googleapis.com/books/v1/volumes?q=${txt}`
            console.log(url);
            return axios.get(url)
                .then(res => {
                    console.log('Hi from then()')
                    // TODO save to storage
                    storageService.post(STORAGE_KEY, { searchName: txt, books: res.data.items })
                    return res.data.items
                })
                .catch(err => {
                    console.log('err: ', err)
                    throw 'Had a problem'
                })
        })
        .then(books => {
            console.log(books);
            return books.map(book => {
                const { volumeInfo } = book
                var emptyBook = bookService.getEmptyBook()
                emptyBook.title = volumeInfo.title || ''
                emptyBook.subtitle = volumeInfo.subtitle || ''
                emptyBook.authors = volumeInfo.authors || []
                emptyBook.publishedDate = volumeInfo.publishedDate || ''
                emptyBook.description = volumeInfo.description || ''
                emptyBook.pageCount = volumeInfo.pageCount || 0
                emptyBook.categories = volumeInfo.categories || []
                emptyBook.thumbnail = volumeInfo.imageLinks? volumeInfo.imageLinks.thumbnail : ''
                emptyBook.language = volumeInfo.language || ''
                return emptyBook
            })
        })
}





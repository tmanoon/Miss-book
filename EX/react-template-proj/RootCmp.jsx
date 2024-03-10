const { useState} = React

import {Header} from './cmps/Header.jsx'
// import {HomePage} from './pages/HomePage.jsx'
import {AboutUs} from './pages/AboutUs.jsx'
import {BookIndex} from './pages/BookIndex.jsx'

export function App() {
    const [page, setPage] = useState('books')

    return <section className="app">
            <Header setPage={setPage}/>

        <main className="container">
            {/* {page === 'home' && <HomePage/>} */}
            {page === 'about' && <AboutUs/>}
            {page === 'books' && <BookIndex/>}
        </main>
    </section>
}

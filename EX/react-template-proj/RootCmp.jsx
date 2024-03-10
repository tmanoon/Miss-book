const { useState} = React

import {Header} from './cmps/Header.jsx'
// import {HomePage} from './pages/HomePage.jsx'
// import {AboutUs} from './pages/AboutUs.jsx'
// import {BookIndex} from './pages/BookIndex.jsx'

export function App() {
    const [page, setPage] = useState('books')

    return <section className="app">
            <Header setPage={setPage}/>

        <main className="container">
            {/* {page === 'home' && <HomePage/>}
            {page === 'about' && <AboutUs/>}
            {page === 'books' && <BookIndex/>} */}
        </main>
    </section>
}

/* export function RootCmp() {
    const [page, setPage] = useState('car')

    console.log(page);

    return <section className="app main-layout">
        <AppHeader setPage={setPage} />

        <main className="full main-layout">
            {page === 'home' && <Home />}
            {page === 'about' && <About />}
            {page === 'car' && <CarIndex />}
        </main>
    </section>
} */
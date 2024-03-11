const { useState} = React
const Router = ReactRouterDOM.HashRouter
const { Route, Routes } = ReactRouterDOM

import {Header} from './cmps/Header.jsx'
import {HomePage} from './pages/HomePage.jsx'
import {AboutUs} from './pages/AboutUs.jsx'
import {BookIndex} from './pages/BookIndex.jsx'
import { BookDetails } from './pages/BookDetails.jsx'
import { BookEdit } from './pages/BookEdit.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'

export function App() {
    // const [page, setPage] = useState('books')

    return <Router>
        <section className="app">
            <Header />
        <main className="container">
            <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/about"  element={<AboutUs/>} />
            <Route path="/book" element={<BookIndex />} />
            <Route path="/book/:bookId" element={<BookDetails/>} />
            <Route path="/book/edit" element={<BookEdit />} />
            <Route path="/book/edit/:bookId" element={<BookEdit />} />
        </Routes>
        </main>
        <UserMsg/>
    </section>
    </Router>
}


const { useState} = React
const Router = ReactRouterDOM.HashRouter
const { Route, Routes } = ReactRouterDOM

import {Header} from './cmps/Header.jsx'
import {HomePage} from './pages/HomePage.jsx'
import {AboutUs} from './pages/AboutUs.jsx'
import {BookIndex} from './pages/BookIndex.jsx'
import { BookDetails } from './pages/BookDetails.jsx'
import { BookEdit } from './pages/BookEdit.jsx'

export function App() {
    // const [page, setPage] = useState('books')

    return <Router>
        <section className="app">
            <Header />
        <main className="container">
            <Routes>
            <Route path='EX/react-template-proj/' element={<HomePage/>} />
            <Route path='EX/react-template-proj/about'  element={<AboutUs/>} />
            <Route path='EX/react-template-proj/book' element={<BookIndex />} />
            <Route path='EX/react-template-proj/book/:bookId' element={<BookDetails/>} />
            <Route path="EX/react-template-proj/book/edit" element={<BookEdit/>} />
        </Routes>
        </main>
    </section>
    </Router>
}


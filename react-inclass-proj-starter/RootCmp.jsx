const { useState } = React

import { Home } from './pages/home.jsx'
import { About } from './pages/About.jsx'
import { CarIndex } from './pages/CarIndex.jsx'

import { AppHeader } from './cmps/AppHeader.jsx'

export function RootCmp() {
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
}
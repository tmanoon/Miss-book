const { useState, useEffect } = React
import { bookService } from "../services/book.service.js"
import { BookPreview } from '../cmps/BookPreview.jsx'
import { BookList } from '../cmps/BookList.jsx'
import { BookDetails } from '../cmps/BookDetails.jsx'
import { BookFilter } from '../cmps/BookFilter.jsx'

export function BookIndex() {
    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    const [selectedBook, setSelectedBook] = useState(null)
    // const [userMsg, setUserMsg] = useState('')

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query()
            .then(books => setBooks(books))
    }

    if (!books) return <div>loading...</div>
    return <section className="book-index">
        {
            !selectedBook && <React.Fragment>
                <BookFilter
                    onSetFilter={onSetFilter}
                    filterBy={filterBy} />
                <h1>Our Books</h1>
                <BookList
                    books={books}
                    onRemoveBook={onRemoveBook}
                    onUpdateBook={onUpdateBook}
                    onSelectBook={onSelectBook}
                />
            </React.Fragment>
        }

        {
            selectedBook && <BookDetails
                book={selectedBook}
                onGoBack={() => onSelectBook(null)}
            />
        }
{/* 
        <UserMsg msg={userMsg} /> */}
    </section >
}

/* <BookIndex> - renders the filter and the list
2. <BookList> - Renders a list of <BookPreview> components 3. <BookPreview> - a preview with basic book details
const { useState, useEffect } = React

import { CarList } from '../cmps/CarList.jsx'
import { CarFilter } from './../cmps/CarFilter.jsx'
import { CarDetails } from './CarDetails.jsx'

import { carService } from './../services/car.service.js'
import { UserMsg } from '../cmps/UserMsg.jsx'


export function CarIndex() {
    const [cars, setCars] = useState(null)
    const [filterBy, setFilterBy] = useState(carService.getDefaultFilter())
    const [selectedCar, setSelectedCar] = useState(null)
    const [userMsg, setUserMsg] = useState('')

    useEffect(() => {
        loadCars()
    }, [filterBy])

    function onSetFilter(fieldsToUpdate) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...fieldsToUpdate }))
    }

    function loadCars() {
        carService.query(filterBy)
            .then((cars) => {
                setCars(cars)
            })
    }

    function onRemoveCar(carId) {
        carService.remove(carId)
            .then(() => {
                setCars((prevCars) => prevCars.filter(car => car.id !== carId))
                flashMsg(`Car removed successfully (${carId})`)
            })
            .catch((err) => {
                console.log('Had issues removing car', err)
                flashMsg(`Could not remove car (${carId})`)
            })
    }

    function onUpdateCar(carToUpdate) {
        carService.save(carToUpdate)
            .then((savedCar) => {
                setCars(prevCars => prevCars.map(car => car.id === savedCar.id ? savedCar : car))
                flashMsg(`Car updated successfully (${carToUpdate.id})`)
            })
            .catch(err => {
                console.log('Had issues with updating car', err)
                flashMsg(`Could not update car (${carToUpdate.id})`)
            })
    }

    function onSelectCar(car) {
        console.log('selected car', car)
        setSelectedCar(car)
    }

    function flashMsg(txt) {
        setUserMsg(txt)
        setTimeout(() => {
            setUserMsg('')
        }, 3000)
    }

    // console.log('cars from car index', cars)
    // console.log('selectedCar from car index', selectedCar)
    if (!cars) return <div>loading...</div>
    return <section className="car-index">
        {
            !selectedCar && <React.Fragment>
                <CarFilter
                    onSetFilter={onSetFilter}
                    filterBy={filterBy} />
                <h1>Our cars</h1>
                <CarList
                    cars={cars}
                    onRemoveCar={onRemoveCar}
                    onUpdateCar={onUpdateCar}
                    onSelectCar={onSelectCar}
                />
            </React.Fragment>
        }

        {
            selectedCar && <CarDetails
                car={selectedCar}
                onGoBack={() => onSelectCar(null)}
            />
        }

        <UserMsg msg={userMsg} />
    </section >
} */

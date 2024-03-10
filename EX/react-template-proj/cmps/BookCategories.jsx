export function BookCategories({book}) {
    return <ul className={`${book.title} categories`}>
        {book.categories.map(category => {
            return <li key={category}>
                {category}
            </li>
        })}
    </ul>
}
export function BookCategories({ book }) {
    return <section className={`${book.title} categories`}>
        <ul className={`${book.title} categories`}>
            {book.categories.map(category => {
                return <li key={category}>
                    {category}
                </li>
            })}
        </ul>
    </section>
}
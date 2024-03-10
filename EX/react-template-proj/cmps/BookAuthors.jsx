export function BookAuthors({book}) {
    return <div>
        <h3>Authors: </h3>
        <ul>
            {book.authors.map(author => {
                return <li key={author}>
                    {author}
                </li>
            })}
        </ul>
    </div>
}
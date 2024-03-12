const { useState, Fragment } = React

export function ReviewList({ reviews = [] }) {
    const [isDeleted, setIsDeleted] = useState(false)

    function onDeleteBtn(e) {
        e.stopPropagation()
        setIsDeleted(prevIsDeleted => !prevIsDeleted)
    }

    return (
        <Fragment>
            {!isDeleted && (
                <ul>
                    {reviews.map(review => (
                        <li key={review.id}>
                            <h1>{review.fullname}</h1>
                            <h3>{'★'.repeat(+review.rating)}{console.log('★'.repeat(+review.rating),+review.rating )}</h3>
                            <p>{review.readAt}</p>
                            <button onClick={onDeleteBtn}>Delete Review</button>
                        </li>
                    ))}
                </ul>
            )}
            {isDeleted && <p>Reviews are deleted.</p>}
        </Fragment>
    );
}
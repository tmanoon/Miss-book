export function LongTxt({ txt, length = 100 }) {
    if (length === 100) return
    const txtToAdd = txt.slice(100, length)
    return <p>
        {txtToAdd}
    </p>
}
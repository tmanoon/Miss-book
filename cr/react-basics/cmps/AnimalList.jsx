import { AnimalPreview } from "./AnimalPreview.jsx";

export function AnimalList({ animalInfos }) {

    return (
        <section className="animals-list-container">
            <h2>Rare animals</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>Animal</th>
                        <th>Count</th>
                        <th>Search</th>
                    </tr>
                </thead>

                <tbody>
                    {/* Splitting into CMPS is better */}
                    {animalInfos.map(animal => <AnimalPreview
                        key={animal.type}
                        animal={animal}
                    />)}
                    {/* Could also render it here */}
                    {/* {animalInfos.map(animal => <tr key={animal.type}>
                        <td>{animal.type}</td>
                        <td>{animal.count}</td>
                        <td><a href={`https://www.google.com/search?q=${animal.type}`} target="_blank">Search</a></td>
                    </tr>)} */}
                </tbody>
            </table>
        </section>
    )
}
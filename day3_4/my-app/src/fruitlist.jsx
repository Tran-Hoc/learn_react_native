function FruitList() {
    const fruits = ["Apple 🍎", "Banana 🥬", "Cherry 🥀", "Date 🍉", "Elderberry 🍈"];

    return (
        <ul>
            {fruits.map((fruit, index) => (
                <li key={index} style={{ margin: "8px 0", listStyle: "none" }}>
                    {fruit}
                </li>
            ))}
        </ul>
    )
}

export default FruitList;
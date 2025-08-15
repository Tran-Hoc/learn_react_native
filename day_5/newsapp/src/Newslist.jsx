const { useState, useEffect } = require("react");

function NewsList() {
    const [articles, setArticles] = useState([]);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //Call api when component mount
    useEffect(() => {
        async function fetchNews() {
            try {
                const response = await fetch("https://jsonplaceholder.typicode.com/posts");
                if (!response.ok) throw new Error("Failed to fetch news");
                const data = await response.json();
                setArticles(data.slice(0, 10)); // get 10 first articles
            }
            catch (error) {
                setError(error.message);
            }
            finally {
                setLoading(false);
            }
        }
        fetchNews();
    }, []);

    // render
    if (loading) return <p> Loading ...</p>

    if (error) return <p style={{ color: "red" }}> Error:{Error.message} </p>

    if (selectedArticle) {
        return (
            <div>
                <h2> Detail Article </h2>
                <h3> {selectedArticle.title}</h3>
                <p>{selectedArticle.body}</p>
                <button onClick = {() => setSelectedArticle(null)}> Return </button>
            </div>

        )
    }
    return (
        <div>
            <h2>News list</h2>
            <ul style={{ listStyleType: "none", padding: 0 }}>
                {articles.map((article) => (
                    <li key={article.id} style={{ marginBottom: "20px", borderBottom: "1px solid #ccc", cursor: "pointer" }} onClick={() => setSelectedArticle(article)}>
                        <h3 style={{ color: "gold" }}> {article.title}</h3>
                        <p> {article.body}</p>
                    </li>

                ))}
            </ul>
        </div>
    )
}


export default NewsList;
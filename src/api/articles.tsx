import axios from "axios";

const getArticles = async (): Promise<Article[]> => {
    try {
        const response = await axios.get<ArticleResponse>(
            "https://node-express-conduit.appspot.com/api/articles"
        );
        return response.data.articles;
    } catch (error) {
        console.error("Error fetching the articles:", error);
        return [];
    }
};

export default getArticles;

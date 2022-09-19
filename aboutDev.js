console.log("enlazando")

const HEROKUAPP_ENDPOINT = "https://pursuit-9-2-full-stack-project.herokuapp.com/api/quotes"

const renderQuote = (quote) => {
    const mainQuoteArticleElement = document.querySelector(".main-quote__article")
    const mainQuoteArticleHTML = `<h2>"${quote}"</h2>`
    mainQuoteArticleElement.innerHTML = mainQuoteArticleHTML 
}

fetch (HEROKUAPP_ENDPOINT)
    .then(response=> response.json())
    .then(data => {
        const myPersonalQuote = data[5].quote

        renderQuote(myPersonalQuote)

        // const mainQuoteArticleElement = document.querySelector (".main-quote__article")
        // const mainQuoteArticleHTML = `<h2>"${myPersonalQuote}"</h2>`
        // mainQuoteArticleElement.innerHTML = mainQuoteArticleHTML 
})

    
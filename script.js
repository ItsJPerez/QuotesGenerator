//Get Quotes from API
//You have the option to pull quotes locally, for now we will do it via API fetch request.

const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const quoteAuthor = document.getElementById('author')
const twitterBtn = document.getElementById('x')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader');


let apiQuotes = [];

function newQuote(){
    showLoadingSpinner();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    if(quote.author == null){
        quoteAuthor.textContent = 'Unknown'
    } else {
        quoteAuthor.textContent = quote.author
    }

    if(quote.text.length > 50){
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote')
    }
    //Set Quote, Hide Loader
    quoteText.textContent = quote.text
    completeLoadingSpinner();
}


async function getQuotes(){
    showLoadingSpinner();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote()
    } catch(error){
        alert(error)
        //Catch Error Here
    }
}

//Tweet Quote
function tweetQuote(){
    const xUrl = `https://x.com/intent/post?text=${quoteText.textContent} - ${quoteAuthor.textContent}`
    window.open(xUrl, '_blank')
}

//Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);


//Show Loading
function showLoadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Loading Complete
function completeLoadingSpinner(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// On Load
getQuotes()

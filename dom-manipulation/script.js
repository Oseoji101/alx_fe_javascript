// 1. quotes database
let quotes = [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Your time is limited, so don’t waste it living someone else’s life.", category: "Inspiration" },
  { text: "Not everything that can be counted counts.", category: "Wisdom" }
];

// 2. Grab DOM elements
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");
const addQuoteBtn = document.getElementById("addQuoteBtn");
const newQuoteText = document.getElementById("newQuoteText");
const newQuoteCategory = document.getElementById("newQuoteCategory");

// 3. Show a random quote
function displayRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  quoteDisplay.textContent = `"${quote.text}" — ${quote.category}`;
}
// 6. Show a quote immediately on page load
displayRandomQuote();
newQuoteBtn.addEventListener("click", displayRandomQuote);

function showRandomQuote() {
  const newQuote = newQuoteText.Value.trim();
  const newCategory = newQuoteCategory.Value.trim();
} 
showRandomQuote();
addQuoteBtn.addEventListener("click", showRandomQuote);
// ----- Step 2: Quotes data -----
let quotes = [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Your time is limited, so don’t waste it living someone else’s life.", category: "Inspiration" },
  { text: "Not everything that can be counted counts.", category: "Wisdom" }
];

// Grab existing DOM elements
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn  = document.getElementById("newQuote");

/**
 * showRandomQuote()
 * Picks a random quote object from the quotes array
 * and displays it in the #quoteDisplay div.
 */
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  // use innerHTML to demonstrate dynamic markup
  quoteDisplay.innerHTML = `
    <p>"${quote.text}"</p>
    <p><em>— ${quote.category}</em></p>
  `;
}

/**
 * createAddQuoteForm()
 * Dynamically creates a form (inputs + button) in the DOM
 * where users will later be able to add quotes.
 */
function createAddQuoteForm() {
  const form = document.createElement("form");
  form.id = "addQuoteForm";
  form.style.marginTop = "20px";

  // Input for quote text
  const textInput = document.createElement("input");
  textInput.type = "text";
  textInput.id = "newQuoteText";
  textInput.placeholder = "Enter a new quote";
  textInput.required = true;

  // Input for category
  const categoryInput = document.createElement("input");
  categoryInput.type = "text";
  categoryInput.id = "newQuoteCategory";
  categoryInput.placeholder = "Enter quote category";
  categoryInput.required = true;

  // Submit button
  const addButton = document.createElement("button");
  addButton.type = "submit";
  addButton.textContent = "Add Quote";

  // Put everything into the form
  form.appendChild(textInput);
  form.appendChild(categoryInput);
  form.appendChild(addButton);

  // Insert into the DOM (just after the "Show New Quote" button)
  newQuoteBtn.insertAdjacentElement("afterend", form);
}

// Attach event for "Show New Quote" button
newQuoteBtn.addEventListener("click", showRandomQuote);

// On page load: show one random quote & create the add-quote form
showRandomQuote();
createAddQuoteForm();

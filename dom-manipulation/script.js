// ----- Step 2: Quotes data -----
let quotes = [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Your time is limited, so don’t waste it living someone else’s life.", category: "Inspiration" },
  { text: "Not everything that can be counted counts.", category: "Wisdom" }
];

// ----- Load quotes from localStorage on initialization -----
const storedQuotes = localStorage.getItem("quotes");
if (storedQuotes) {
  quotes = JSON.parse(storedQuotes);
}

// Grab existing DOM elements
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn  = document.getElementById("newQuote");

// ----- Helper: Save to localStorage -----
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes)); 
}
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
  // Save last viewed quote in sessionStorage
  sessionStorage.setItem("lastViewedQuote", JSON.stringify(quote));
}



// Export quotes as JSON
function exportToJsonFile() {
  const jsonStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();

  URL.revokeObjectURL(url);
}

// Import quotes from JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      if (!Array.isArray(importedQuotes)) throw new Error("Invalid JSON format");

      quotes.push(...importedQuotes);
      localStorage.setItem("quotes", JSON.stringify(quotes));

      alert("Quotes imported successfully!");
    } catch (error) {
      alert("Failed to import quotes: " + error.message);
    }
  };

  if (event.target.files.length > 0) {
    fileReader.readAsText(event.target.files[0]);
  }
}

// ---- Event Listeners ----

newQuoteBtn.addEventListener("click", showRandomQuote);

// ----- On Page Load -----
let lastQuote = sessionStorage.getItem("lastViewedQuote"); // explicit
if (lastQuote) {
  const quote = JSON.parse(lastQuote);
  quoteDisplay.innerHTML = `
    <p>"${quote.text}"</p>
    <p><em>— ${quote.category}</em></p>
  `;
} else {
  showRandomQuote();
}





// ----- Step 1: Populate Categories Dropdown -----
function populateCategories() {
  const categoryFilter = document.getElementById("categoryFilter");

  // Clear existing options except "All Categories"
  categoryFilter.innerHTML = `<option value="all">All Categories</option>`;

  // Create a Set to store unique categories
  const categories = new Set(quotes.map(q => q.category));

  // Add each category as an option
  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  // Restore last selected filter from localStorage
  const lastFilter = localStorage.getItem("lastSelectedCategory");
  if (lastFilter) {
    categoryFilter.value = lastFilter;
  }
}

// ----- Step 2: Filter Quotes Based on Selected Category -----
function filterQuotes() {
  const categoryFilter = document.getElementById("categoryFilter");
  const selectedCategory = categoryFilter.value;

  // Save selected filter in localStorage
  localStorage.setItem("lastSelectedCategory", selectedCategory);

  // Filter quotes array
  const filteredQuotes = selectedCategory === "all" 
    ? quotes 
    : quotes.filter(q => q.category === selectedCategory);

  // Display a random quote from the filtered list
  if (filteredQuotes.length > 0) {
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const quote = filteredQuotes[randomIndex];

    quoteDisplay.innerHTML = `
      <p>"${quote.text}"</p>
      <p><em>— ${quote.category}</em></p>
    `;

    // Save last viewed quote in sessionStorage
    sessionStorage.setItem("lastViewedQuote", JSON.stringify(quote));
  } else {
    quoteDisplay.innerHTML = "<p>No quotes available for this category.</p>";
  }
}

// ----- Initialize categories on page load -----
populateCategories();




function addQuote(e) {
  // If this was triggered by a form submit, prevent page reload
  if (e) e.preventDefault();

  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const text = textInput.value.trim();
  const category = categoryInput.value.trim();

  if (!text || !category) {
    alert("Please fill in both fields!");
    return;
  }

  // Add new quote to array
  quotes.push({ text, category });

  // Persist in localStorage
  localStorage.setItem("quotes", JSON.stringify(quotes));


  // Clear input fields
  textInput.value = "";
  categoryInput.value = "";

// Refresh categories in dropdown
  populateCategories();

  // Immediately show the newly added quote
  const categoryFilter = document.getElementById("categoryFilter");
  // If filter matches new quote category or "all", display it
  if (categoryFilter.value === category || categoryFilter.value === "all") {
    quoteDisplay.innerHTML = `
      <p>"${text}"</p>
      <p><em>— ${category}</em></p>
    `;
  } else {
    // Otherwise, apply current filter
    filterQuotes();
  }
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

  form.addEventListener("submit", addQuote);

  // Insert into the DOM (just after the "Show New Quote" button)
  newQuoteBtn.insertAdjacentElement("afterend", form);
}


const API_ENDPOINT = "https://type.fit/api/quotes";
let quotes = [];

const init = async () => {
  try {
    const jsonRes = await fetch(API_ENDPOINT);
    quotes = await jsonRes.json();
    setMarkup();
  } catch (error) {
    quotation.innerHTML = error.message;
  }
};

const randomIndexGenerator = (len) => {
  return Math.floor(Math.random() * (len + 1));
};

init();

const setMarkup = () => {
  const { text, author } = quotes[randomIndexGenerator(quotes.length)];
  quotation.innerHTML = `
        <span class="quote">${text}</span>  
        <div class="footer">
            <span id="refresh" title="Refresh | click R">
                <i class="fas fa-sync"></i>
            </span>
            <div class="author">
                <span class="line"></span>&nbsp;
                <span>${author ? author : "Anonymous"}</span>
            </div>
        </div>
    `;
  refresh.addEventListener("click", () => {
    setMarkup();
  });
};

document.onkeypress = (e) => {
  if (e.key === "r" || e.key === "R") setMarkup();
};

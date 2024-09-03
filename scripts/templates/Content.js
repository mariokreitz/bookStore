import Card from "./Card.js";

export default function Content(books, HeartEmpty, HeartFilled, StarEmpty, StarFilled) {
  if (!books) {
    return /*html*/ `
      <div class="content-container">
        <p>No books in inventory</p>
      </div>
    `;
  } else {
    const cardsHtml = books
      .map((book, index) => {
        return Card(book, index, HeartEmpty, HeartFilled, StarEmpty, StarFilled);
      })
      .join("");

    const container = document.createElement("div");
    container.className = "content-container";
    container.innerHTML = cardsHtml;

    return container.outerHTML;
  }
}

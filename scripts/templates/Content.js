import Card from "./Card.js";
import { getData } from "../fetchData.js";

export default async function Content(HeartEmpty, HeartFilled, StarEmpty, StarFilled) {
  const data = await getData("./../../data/bookstore.json");
  const books = data.bookstore.inventory;

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

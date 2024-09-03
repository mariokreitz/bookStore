import Card from "./Card.js";
import FetchData from "../fetchData.js";

export default async function Content(HeartEmpty, HeartFilled, StarEmpty, StarFilled) {
  const data = await FetchData("./../../data/bookstore.json");
  const books = data.bookstore.inventory;

  return /*html*/ `
    <div class="content-container">
      ${books
        .map((book) => {
          return Card(book, HeartEmpty, HeartFilled, StarEmpty, StarFilled);
        })
        .join("")}
    </div>
  `;
}

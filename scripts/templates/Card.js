export default function Card(book, HeartEmpty, HeartFilled, StarEmpty, StarFilled) {
  function getDiscount() {
    return book.price * 0.2;
  }

  function calcPrice(bookPrice) {
    return formatPrice(bookPrice - getDiscount());
  }

  function formatPrice(bookPrice) {
    return bookPrice.toLocaleString("de-DE", { style: "currency", currency: "EUR" });
  }

  return /*html*/ `
    <div class="card">
        <div class="card-header">
            <img class="card-image" src="./assets/img/${book.cover_image_url}" alt="${book.title}">
            <div class="card-description">
                <h2 class="card-title lato-bold">${book.title}</h2>
                <p class="card-author">Author: ${book.author}</p>
                <div class="rating">
                    <span>${book.rating}</span>
                    <div class="stars">
                    ${Array(Math.round(book.rating))
                      .fill(0)
                      .map((_) => `<span class="star filled">${StarFilled}</span>`)
                      .join("")}${Array(5 - Math.round(book.rating))
    .fill(0)
    .map((_) => `<span class="star">${StarEmpty}</span>`)
    .join("")}
                    </div>
                    <span>${book.reviews} reviews</span>
                </div>
                <div class="price">
                    <span class="original">${formatPrice(book.price)}</span>
                    <span class="discount">${calcPrice(book.price)}</span>
                </div>
                <div class="book-description">${book.description}</div>
                <div class="call-to-action">
                    <div class="heart-container">
                        <span class="heart">${HeartEmpty}</span>
                        <span>${book.likes}</span>
                    </div>
                    <div class="in-stock-container">
                        <span class="in-stock">In Stock: ${book.quantity}</span>
                        <button class="btn btn-primary">Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-body">
            <table>
                <tr>
                    <td>Book Title</td>
                    <td>${book.title}</td>
                </tr>
                <tr>
                    <td>Author</td>
                    <td>${book.author}</td>
                </tr>
                <tr>
                    <td>ISBN</td>
                    <td>${book.isbn}</td>
                </tr>
                <tr>
                    <td>Publisher</td>
                    <td>${book.publisher}</td>
                </tr>
                <tr>
                    <td>Publish Date</td>
                    <td>${book.publication_date}</td>
                </tr>
            </table>
        </div>
        <div class="card-footer">
            <h3 class="card-title lato-bold">Community Reviews</h3>
            <div class="horizontal-line"></div>
            <div class="reviews-container">
                ${book.comments
                  .map((comment) => {
                    return /*html*/ `
                      <div class="comment">
                        <div class="comment-header">
                            <img class="comment-image" src="https://via.placeholder.com/250" alt="Placeholder">
                            <div class="comment-info">
                                <p class="comment-name lato-bold">${
                                  comment.author
                                } <span class="comment-rating lato-regular">Rated it</span><span>${Array(5)
                      .fill(0)
                      .map((_) => `<span class="star filled">${StarFilled}</span>`)
                      .join("")}</span></p>
                                <p class="comment-date">${comment.date}</p>
                            </div>
                        </div>
                        <p class="comment-text">${comment.text}</p>
                      </div>
                    `;
                  })
                  .join("")}
            </div>
            <div class="add-review-container">
                <h3 class="card-title lato-bold">Add Your Review</h3>
                <div class="horizontal-line"></div>
                <form class="add-review-form">
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" id="name" class="form-control" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="comment">Comment</label>
                        <textarea id="comment" rows="5" cols="30" class="form-control" name="comment" required></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    </div>
  `;
}

export default function Card(book, index, HeartEmpty, HeartFilled, StarEmpty, StarFilled) {
  const currentBook = book;
  const currentBookIndex = index;

  function getDiscount() {
    return currentBook.price * 0.2;
  }

  function calcPrice(currentBookPrice) {
    return formatPrice(currentBookPrice - getDiscount());
  }

  function formatPrice(currentBookPrice) {
    return currentBookPrice.toLocaleString("de-DE", { style: "currency", currency: "EUR" });
  }

  return /*html*/ `
    <div class="card">
        <div class="card-header">
            <img class="card-image" src="./assets/img/${currentBook.cover_image_url}" alt="${currentBook.title}">
            <div class="card-description">
                <h2 class="card-title lato-bold">${currentBook.title}</h2>
                <p class="card-author">Author: ${currentBook.author}</p>
                <div class="rating">
                    <span>${currentBook.rating}</span>
                    <div class="stars">
                    ${Array(Math.round(currentBook.rating))
                      .fill(0)
                      .map((_) => `<span class="star filled">${StarFilled}</span>`)
                      .join("")}${Array(5 - Math.round(currentBook.rating))
    .fill(0)
    .map((_) => `<span class="star">${StarEmpty}</span>`)
    .join("")}
                    </div>
                    <span>${currentBook.reviews} reviews</span>
                </div>
                <div class="price">
                    <span class="original">${formatPrice(currentBook.price)}</span>
                    <span class="discount">${calcPrice(currentBook.price)}</span>
                </div>
                <div class="book-description">${currentBook.description}</div>
                <div class="call-to-action">
                    <div class="heart-container">
                        <span onclick="likeBook(${currentBookIndex})" class="heart">${HeartEmpty}</span>
                        <span>${currentBook.likes}</span>
                    </div>
                    <div class="in-stock-container">
                        <span class="in-stock">In Stock: ${currentBook.quantity}</span>
                        <button class="btn btn-primary">Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-body">
            <table>
                <tr>
                    <td>currentBook Title</td>
                    <td>${currentBook.title}</td>
                </tr>
                <tr>
                    <td>Author</td>
                    <td>${currentBook.author}</td>
                </tr>
                <tr>
                    <td>ISBN</td>
                    <td>${currentBook.isbn}</td>
                </tr>
                <tr>
                    <td>Publisher</td>
                    <td>${currentBook.publisher}</td>
                </tr>
                <tr>
                    <td>Publish Date</td>
                    <td>${currentBook.publication_date}</td>
                </tr>
            </table>
        </div>
        <div class="card-footer">
            <h3 class="card-title lato-bold">Community Reviews</h3>
            <div class="horizontal-line"></div>
            <div class="reviews-container">
                ${currentBook.comments
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
                <div id="form-${currentBookIndex}" class="add-review-form">
                    <div class="form-group">
                        <label for="name-${currentBookIndex}">Name</label>
                        <input type="text" minlength="3" placeholder="min. 3 characters" maxlength="20" id="name-${currentBookIndex}" class="form-control" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="comment-${currentBookIndex}">Comment</label>
                        <textarea id="comment-${currentBookIndex}" placeholder="min. 10 characters" minlength="10" rows="5" cols="30" class="form-control" name="comment" required></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary" data-book-index="${index}">Submit</button>
                </div>
            </div>
        </div>
    </div>
  `;
}

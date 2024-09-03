export default function Header(Bookmark, ShoppingCart, User) {
  return /*html*/ `
  <div class="container header-container lato-bold">
    <a class="home-link" href="#">
      ${Bookmark}BOOKSHOP
    </a>
    <nav>
        <a href="#">
          ${ShoppingCart}
        </a>
        <a href="#">
          ${User}
        </a>
    </nav>
  </div>
  `;
}

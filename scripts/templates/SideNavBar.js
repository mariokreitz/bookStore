export default function SideNavbar(navItems) {
  return /*html*/ `
  <div class="breadcrumb-container lato-regular">
    <a href="#">Home</a> / <a href="#">Books</a>
  </div>
  <h1 class="lato-bold">Shop by Category</h1>
    <nav class="side-navbar">
        ${navItems
          .map((item, index) => {
            return /*html*/ `
            <a href="#" class="lato-regular ${index == 0 ? "selected" : ""}">${item}</a>
            `;
          })
          .join("")}
    </nav>
`;
}

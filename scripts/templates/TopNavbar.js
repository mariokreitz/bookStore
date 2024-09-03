export default function TopNavbar(navItems) {
  return /*html*/ `
    <div class="container">
      <nav class="top-navbar">
        ${navItems
          .map((item, index) => {
            return /*html*/ `
              <a href="#" class="lato-regular ${index == 1 ? "active" : ""}">${item}</a>
            `;
          })
          .join("")}
      </nav>
    </div>
    `;
}

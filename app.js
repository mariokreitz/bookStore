import Header from "./scripts/templates/header.js";
import TopNavbar from "./scripts/templates/TopNavbar.js";
import SideNavbar from "./scripts/templates/SideNavbar.js";
import Content from "./scripts/templates/Content.js";
import Footer from "./scripts/templates/Footer.js";
import {
  Bookmark,
  ShoppingCart,
  HeartEmpty,
  HeartFilled,
  StarEmpty,
  StarFilled,
  User,
} from "./scripts/templates/icons.js";

document.addEventListener("DOMContentLoaded", () => {
  const { header, topNavbar, sideNavbar, content, footer } = getAllElements();
  renderPage(header, topNavbar, sideNavbar, content, footer);
});

function getAllElements() {
  const header = document.getElementById("header");
  const topNavbar = document.getElementById("top-navbar");
  const sideNavbar = document.getElementById("side-navbar");
  const content = document.getElementById("content");
  const footer = document.getElementById("footer");

  console.log("DOM fully loaded and parsed");

  return {
    header,
    topNavbar,
    sideNavbar,
    content,
    footer,
  };
}

const topNavbarItems = ["Home", "Books", "Magazine", "Textbooks", "Audiobooks", "Recommended", "Sale"];
const sideNavbarItems = [
  "All Genre",
  "Arts & Photography",
  "Biographies & Memoirs",
  "Business & Finance",
  "Children's Books",
  "Comics & Graphic Novels",
  "Computers & Technology",
  "Cookbooks",
  "Fiction",
];

async function renderPage(header, topNavbar, sideNavbar, content, footer) {
  header.innerHTML = Header(Bookmark, ShoppingCart, User);
  topNavbar.innerHTML = TopNavbar(topNavbarItems);
  sideNavbar.innerHTML = SideNavbar(sideNavbarItems);
  content.innerHTML = await Content(HeartEmpty, HeartFilled, StarEmpty, StarFilled);
  footer.innerHTML = Footer();
}

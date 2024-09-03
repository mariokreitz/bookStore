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
import { getData, putData } from "./scripts/FetchData.js";

let books = {};

document.addEventListener("DOMContentLoaded", () => {
  const { header, topNavbar, sideNavbar, content, footer } = getAllElements();
  renderPage(header, topNavbar, sideNavbar, content, footer);

  console.log("DOM fully loaded and parsed");
});

function getAllElements() {
  const header = document.getElementById("header");
  const topNavbar = document.getElementById("top-navbar");
  const sideNavbar = document.getElementById("side-navbar");
  const content = document.getElementById("content");
  const footer = document.getElementById("footer");

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
  await loadData();

  header.innerHTML = Header(Bookmark, ShoppingCart, User);
  topNavbar.innerHTML = TopNavbar(topNavbarItems);
  sideNavbar.innerHTML = SideNavbar(sideNavbarItems);
  content.innerHTML = Content(books, HeartEmpty, HeartFilled, StarEmpty, StarFilled);
  footer.innerHTML = Footer();

  addEventListenersToBooks();
}

async function loadData() {
  const localData = JSON.parse(localStorage.getItem("data"));
  const remoteData = localData || (await getData("../../data/bookstore.json"));
  localStorage.setItem("data", JSON.stringify(remoteData));
  books = remoteData.bookstore.inventory;
}

function addEventListenersToBooks() {
  const submitButtons = document.querySelectorAll('button[type="submit"]');
  submitButtons.forEach((button) => {
    button.addEventListener("click", handleButtonClick);
  });

  const heartButton = document.querySelectorAll(".heart");
  heartButton.forEach((button) => {
    button.addEventListener("click", toggleFavorite);
  });
}

function handleButtonClick(event) {
  const formData = new FormData(event.target.parentElement);
  console.log(formData.keys.length != 0 ? formData : "no form data");

  const data = Object.fromEntries(formData.entries());

  const bookIndex = Number(event.target.dataset.bookIndex);
  const book = books[bookIndex];

  const newComments = [...book.comments, { ...data, date: new Date() }];
  book.comments = newComments;
  const localData = JSON.parse(localStorage.getItem("data"));
  localData.bookstore.inventory[bookIndex] = book;
  localStorage.setItem("data", JSON.stringify(localData));
}

function toggleFavorite(event) {
  event.preventDefault();

  const bookElement = event.target.closest(".heart");
  const bookIndex = Number(bookElement.dataset.bookIndex);

  const book = books[bookIndex];
  book.favorite = !book.favorite;

  const localData = JSON.parse(localStorage.getItem("data"));
  localData.bookstore.inventory[bookIndex] = book;
  localStorage.setItem("data", JSON.stringify(localData));
}

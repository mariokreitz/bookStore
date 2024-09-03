import Header from "./scripts/templates/Header.js";
import TopNavbar from "./scripts/templates/TopNavbar.js";
import SideNavbar from "./scripts/templates/SideNavBar.js";
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

let books = {};

document.addEventListener("DOMContentLoaded", () => {
  loadPage();
});

function loadPage() {
  const { header, topNavbar, sideNavbar, content, footer } = getElements();
  renderPage(header, topNavbar, sideNavbar, content, footer);
}

function getElements() {
  const elements = {
    header: document.getElementById("header"),
    topNavbar: document.getElementById("top-navbar"),
    sideNavbar: document.getElementById("side-navbar"),
    content: document.getElementById("content"),
    footer: document.getElementById("footer"),
  };

  return elements;
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

async function renderPage(headerElement, topNavbarElement, sideNavbarElement, contentElement, footerElement) {
  await loadData();

  headerElement.innerHTML = Header(Bookmark, ShoppingCart, User);
  topNavbarElement.innerHTML = TopNavbar(topNavbarItems);
  sideNavbarElement.innerHTML = SideNavbar(sideNavbarItems);
  contentElement.innerHTML = Content(books, HeartEmpty, HeartFilled, StarEmpty, StarFilled);
  footerElement.innerHTML = Footer();

  addEventListenersToBookElements();
}

async function fetchLocalData() {
  const storedData = localStorage.getItem("data");

  if (storedData) {
    return JSON.parse(storedData);
  }

  const response = await fetch("./data/bookstore.json");
  const remoteData = await response.json();

  localStorage.setItem("data", JSON.stringify(remoteData));

  return remoteData;
}

async function loadData() {
  const data = await fetchLocalData();
  books = data.bookstore.inventory;
}

function addEventListenersToBookElements() {
  const submitButtons = document.querySelectorAll("button[type='submit']");
  submitButtons.forEach((submitButton) => {
    submitButton.addEventListener("click", handleAddComment);
  });

  const heartButtons = document.querySelectorAll(".heart");
  heartButtons.forEach((heartButton) => {
    heartButton.addEventListener("click", toggleFavorite);
  });
}

function handleAddComment(event) {
  event.preventDefault();

  const commentForm = event.target.parentElement;

  const formData = new FormData(commentForm);
  const commentData = Object.fromEntries(formData);

  if (!commentData.author || !commentData.text) {
    showError(commentForm);
    return;
  }

  const bookIndex = Number(commentForm.dataset.bookIndex);

  const book = books[bookIndex];

  const newComment = {
    ...commentData,
    date: new Date().toLocaleDateString("en-GB"),
  };

  book.comments = [...book.comments, newComment];

  const localData = JSON.parse(localStorage.getItem("data"));
  localData.bookstore.inventory[bookIndex] = book;
  localStorage.setItem("data", JSON.stringify(localData));

  loadPage();
}

function showError(commentForm) {
  const notification = document.createElement("p");
  notification.classList.add("notification");
  notification.textContent = "Please fill out all fields!";
  commentForm.appendChild(notification);
  setTimeout(() => notification.remove(), 3000);
}

function toggleFavorite(event) {
  event.preventDefault();

  const bookElement = event.target.closest(".heart");
  const bookIndex = Number(bookElement.dataset.bookIndex);
  const book = books[bookIndex];

  book.favorite = !book.favorite;
  book.likes += book.favorite ? 1 : -1;

  const localData = JSON.parse(localStorage.getItem("data"));
  localData.bookstore.inventory[bookIndex] = book;

  localStorage.setItem("data", JSON.stringify(localData));
  loadPage();
}

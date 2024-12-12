import slide1 from "../../src/assets/images/slide1.png";
import slide2 from "../../src/assets/images/slide2.png";
import slide3 from "../../src/assets/images/slide3.png";

const productGridContainer = document.querySelector(".product-grid-container");
const bannerContainer = document.querySelector(".banner");
const bannerImage = document.querySelector(".banner-image");

const nav = document.querySelector(".nav");
nav.classList.add("sticky");

let x = 2;

setInterval(() => {
  if (x === 4) x = 1;

  if (x === 1) html = bannerImage.src = `${slide1}`;
  if (x === 2) html = bannerImage.src = `${slide2}`;
  if (x === 3) html = bannerImage.src = `${slide3}`;
  x++;
  console.log(x);
}, 1000);

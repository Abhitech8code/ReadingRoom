import React from "react";
import Navbar from "../Components/Navbar";
import Banner from "../Components/Banner";
import Freebook from "../Components/Freebook";
import Footer from "../Components/Footer";
import Cards from "../Components/Cards";

function Home() {
  const items = [
    {
      image:
        "https://img.freepik.com/premium-photo/react-js-programming-language-with-laptop-code-script-screen_1020200-5413.jpg?uid=R157439276&ga=GA1.1.390215850.1702361898&semt=ais_items_boosted&w=740",
      name: "React Book",
      category: "Programming",
      title: "Learn React from Scratch",
      price: 29.99,
    },
    {
      image:
        "https://th.bing.com/th/id/OIP.xx3J_r1dWn6iU2G5mD3T4AHaJI?rs=1&pid=ImgDetMain",
      name: "Node.js Mastery",
      category: "Backend",
      title: "Deep Dive into Node.js",
      price: 34.99,
    },
    {
      image:
        "https://th.bing.com/th/id/OIP.kxUdl9oDP2fWpMl1V6n5UgHaJy?o=7rm=3&rs=1&pid=ImgDetMain",
      name: "JavaScript Basics",
      category: "Frontend",
      title: "Master JavaScript Fundamentals",
      price: 19.99,
    },
    {
      image:
        "https://1.bp.blogspot.com/-_gie8qAwZPY/X0HgTfDEoMI/AAAAAAAAIjk/KsZvNYbtGHU6Dq9wi7koZ-QYfSLa8MgYwCLcBGAsYHQ/s1600/touchmaster_1598152338675.jpeg",
      name: "Python",
      category: "AI & ML",
      title: "Intro to Python",
      price: 39.99,
    },
    {
      image:
        "https://th.bing.com/th/id/OIP.DvLwAkxUIwhj0o7vrahASgHaLG?rs=1&pid=ImgDetMain",
      name: "HTML&CSS",
      category: "WebDesign",
      title: "Responsive UI/UX",
      price: 14.99,
    },
    {
      image: "https://m.media-amazon.com/images/I/51a0slNQpoL.jpg",
      name: "Data Structures",
      category: "DSA",
      title: "DSA in Easy Steps",
      price: 24.99,
    },
  ];

  return (
    <>
      <Navbar />
      <Banner />
      <Freebook />

      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
          Popular Books
        </h2>
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4">
          {items.map((item, index) => (
            <Cards key={index} item={item} />
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Home;

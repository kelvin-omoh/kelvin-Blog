import React, { useContext, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import SignIn from "./Pages/Auth/SignIn";
import SignUp from "./Pages/Auth/SignUp";
import AddPost from "./Pages/post/AddPost";
import { useCookies } from "react-cookie";
import toast, { Toaster } from 'react-hot-toast';
import UpdatePost from "./Pages/post/UpdatePost";
import axios from "axios";
import ReadPost from "./Pages/post/ReadPost";
// import { CategoryContext } from '../context/Category'

import Category from "./context/Category";

function App() {
  const [token, setToken] = useCookies(["accessToken"]);
  const navigate = useNavigate();
  // const {categoryTitle,setCategoryTitle} =useContext(CategoryContext) 
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const [SampleArray, setSampleArray] = useState([]);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get('http://localhost:3001/post');
       
        setSampleArray(res.data)
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault()
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = SampleArray.filter(
      (item) =>
        item.title.toLowerCase().includes(lowerCaseQuery) ||
        item.category.some((cat) => cat.toLowerCase().includes(lowerCaseQuery))
    );
    setFilteredResults(filtered);
  };

  return (
    <div className="App">
      <Category>
        <Toaster
          position="bottom-right"
          reverseOrder={false}
        />
        <Navbar searchQuery={searchQuery} handleSearch={handleSearch} setSearchQuery={setSearchQuery} />
        <div className="">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/post" element={<AddPost />} />
            <Route path="/posts/:id" element={<UpdatePost />} />
            <Route path="/posts/read/:id" element={<ReadPost />} />
          </Routes>
        </div>
      </Category>
    </div>
  );
}

export default App;

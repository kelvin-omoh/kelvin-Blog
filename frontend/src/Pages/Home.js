import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import img1 from "../Assets/p1.webp";
import img2 from "../Assets/p2.jpeg";
import img3 from "../Assets/p3.jpeg";
import { formatDistanceToNow, format } from 'date-fns';
import { Link } from 'react-router-dom';
import { CategoryContext } from '../context/Category';
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import 'atropos/css'
import Atropos from 'atropos/react';
import { FaSearch } from 'react-icons/fa';
import { AiOutlineWarning } from 'react-icons/ai';

const Home = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [filteredData, setFilteredData] = useState(allPosts);

  const { categoryTitle, setCategoryTitle } = useContext(CategoryContext);
  const formatDate = (dateString) => {
    const currentDate = new Date();
    const providedDate = new Date(dateString);
  
    const minutesAgo = formatDistanceToNow(providedDate, { addSuffix: true });
  
    if (minutesAgo === 'less than a minute ago') {
      // Display the specific date format
      const formattedDate = format(providedDate, "do MMM yyyy");
      return (
        <div>
          <div>Date: {formattedDate}</div>
        </div>
      );
    } else {
      // Display "x minutes ago" format
      return (
        <div className=' flex justify-between w-full text-[.7em] font-bold text-black/50'>
          <div>{minutesAgo}</div>
          <div>date: {format(providedDate, "do MMM yyyy")}</div>
        </div>
      );
    }
  };
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get('http://localhost:3001/post');
        setAllPosts(res.data);
        setFilterData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, []);

  function truncateString(str, maxLength) {
    if (str.length <= maxLength) {
      return str;
    } else {
      return str.slice(0, maxLength) + "...";
    }
  }

  function extractPlainText(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  }

  const createDriverSteps = () => {
    const filterSteps = filterData.map((item) => ({
      element: `.${item.title.replace(/\s+/g, '')}`,
      popover: { title: `${item.title}`, description: 'Description' },
    }));
    return filterSteps;
  };

  const ShowDriver = () => {
    if (filterData.length > 0 && categoryTitle !== 'All' ) {
      const filterSteps = createDriverSteps();
      const driverObj = driver({
        showProgress: true,
        steps: filterSteps,
      });
      driverObj.drive();
    }
  };

  useEffect(() => {
    const filteredPosts = allPosts.filter(item => item.category.includes(categoryTitle));
    setFilterData(filteredPosts);
    console.log(filterData);
  }, [categoryTitle]);

  useEffect(() => {
    if (categoryTitle !== 'All') {
      ShowDriver();
    }
  }, [filterData]);

 
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();

    const filteredResults = allPosts.filter((item) => {
      const titleMatch = item.title.toLowerCase().includes(query);
      const categoryMatch = item.category.some((cat) => cat.toLowerCase().includes(query));
      return titleMatch || categoryMatch;
    });

    setSearchQuery(query);
    setFilterData(filteredResults);
  };

  return (
    <div className='w-full'>
     
      <Carousel infiniteLoop={true} showStatus={false} autoPlay={true} showThumbs={false} showArrows={true}>
        <div>
          <img className='h-[50vh] object-center object-fit' src={img1} alt="Image 1" />
        </div>
        <div>
          <img className='h-[50vh] object-center object-fit' src={img2} alt="Image 2" />
        </div>
        <div>
          <img className='h-[50vh] object-center object-fit' src={img3} alt="Image 3" />
        </div>
      </Carousel>


      <div className=' flex gap-1 w-fit m-9  border-black p-3 rounded-md border-[.1px] items-center justify-center'>
                    <label htmlFor=""><FaSearch/></label>
                    <input type="text " 
                            value={searchQuery}
                            onChange={handleSearch}
        className=' w-[20em] p-2  border-none '  
         placeholder="Search by title or category" />
         {/* <button onClick={handleSearch}>Search</button> */}
                </div>

      <section className='my-[4em] grid grid-cols-4 w-full px-[3em] md:px-[5em] justify-between items-center gap-[3em]'>
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="border-t-transparent border-solid animate-spin rounded-full border-blue-400 border-4 h-6 w-6"></div>
            <span>Processing...</span>
          </div>
        ) : (
          filterData.length>0  ? (
            <>
              {filterData.map(pst => (
                <Link to={`/posts/read/${pst._id}`} key={pst._id}>
                   <Atropos
                      activeOffset={40}
                     
                      
                      highlight={true}
                      shadowOffset={50}
                      shadowScale={1.00}
                      onEnter={() => console.log('Enter')}
                      onLeave={() => console.log('Leave')}
                      onRotate={(x, y) => console.log('Rotate', x, y)}
                    >
        {/* ... */}<div className={`${filterData.length > 0 && pst.title.replace(/\s+/g, '')} w-[20em] rounded-md bg-slate-200 p-3 flex flex-col gap-3`}>
                    <img src={pst.coverImage} alt={pst._id} className='h-[15em] rounded-md object-cover object-center w-full' />
                    <p className="legend font-sans font-bold text-center">{pst.title}</p>
                    <p>{extractPlainText(truncateString(pst.description, 100))}</p>
                    {formatDate(pst.createdAt)}
                    <p className="legend font-sans font-bold text-[.7em] text-black/50">Author: {pst.author}</p>
                  </div>
              </Atropos>
                  
                </Link>
              ))}
            </>
          )
          : <div className=' flex justify-center items-center bg-red-50 p-4 w-[90vw]'>
            <AiOutlineWarning className=' text-[1.3em] text-red-700'/>
             <p  className=' text-center  font-bold  text-[1.3em] text-red-700'> No Post Available</p> 
        
          </div>)}
          
         
      </section>
    </div>
  );
};

export default Home;

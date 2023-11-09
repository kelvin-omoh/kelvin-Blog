import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const AddPost = () => {
    const [value, setValue] = useState('enter description .....');
    const [category, setCategory] = useState('Tech')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [coverImage, setCoverImage] = useState('')
    const [token,setToken]=useCookies(["accessToken",'userName'])
     const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
    const navigate=useNavigate()
 
    const  toolbarOptions  = {
      toolbar: [
          [{ font: [] }],
          [{ header: [1, 2, 3] }],
          ["bold", "italic", "underline","strike"],
          [{ color: [] }, { background: [] }],
          [{ script:  "sub" }, { script:  "super" }],
          ["blockquote", "code-block"],
          [{ list:  "ordered" }, { list:  "bullet" }],
          [{ indent:  "-1" }, { indent:  "+1" }, { align: [] }],
          ["link", "image", "video"],
          ["clean"],
      ],
  };


function changeCategory(e) {
  setCategory(e.target.value);
  console.log(category)
}



const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setPreview(reader.result);
    };
  };



console.log(token.accessToken);
  const addAPost = async () => {
    try {
      const data = new FormData();
  data.append("file", image);
  data.append(
    "upload_preset",
    process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
  );
  data.append("cloud_name", process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);
  data.append("folder", "Cloudinary-React");

      const res=await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );
    const MainCoverImage=await res.json()
    const headers = {
      authorization: `${token}`,
    };
      
      await axios.post('https://kelvinblog-api.onrender.com/post/', {
        title,
        description,
        coverImage: `${MainCoverImage.url}`, // Use the uploaded image URL
        author: `${token.accessToken.userName}`,
        authorId: `${token.accessToken.userId}`,
        category,
      },{headers});
      navigate("/")
      toast.success('Post added successfully');
      console.log('Post added successfully');
    } catch (error) {
      toast.error('Failed to Post, try again later....');
    }
  };

    return (

      <div className=' px-[4em] w-full flex-col gap-4  flex '>
       
        <h1></h1>
        <form onSubmit={(e)=>{
          e.preventDefault();
          addAPost()
        }} className=' flex flex-col w-full gap-3 ' action="">
          <div className=' flex flex-col w-full gap-3'>
            <div className=' w-[60vw]  '>
            <div className=' flex items-center  justify-start  gap-3'>
              <p className='w-[7.3em]'>Title :</p>
           <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)}   className='  border-[.1em] w-full rounded-md p-4' placeholder=' Enter title....' />
              </div>
   
          </div>
          <div className=' flex gap-12 items-center'>
            <p>Category:</p>
              <select
  defaultValue={category}
  onChange={changeCategory}
  className="browser-default custom-select border w-fit p-3 rounded-md">
    
  <option selected value=" ">Choose a category</option>
  <option value="Frontend">Frontend</option>
  <option value="Backend">Backend</option>
  <option value="Devops">Devopos</option>
  {/* <option value="UI/UX">UI/UX</option> */}
  <option value="Science">Science</option>
  <option value="Cloud">Cloud</option>
  <option value="More">More ++</option>

</select>
          </div>
        
         
          <div className=' flex items-center w-fit  justify-start  gap-3'>
         
          <p className="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
            <span>Click on Upload a File</span>&nbsp;
          </p>
          <input
            id="hidden-input"
            type="file"
            className="hidden"
            onChange={handleImageChange}
            accept="image/*"
          />
          <label htmlFor="hidden-input" className="cursor-pointer">
            <div className="mt-2 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none">
              Upload a file
            </div>
          </label>

          <div className="flex justify-center items-center mt-5 mx-3 max-w-xs">
            {preview && <img src={preview} alt="preview" className="w-full" />}
          </div>

            </div>
            </div>
            
          <label htmlFor="">Enter descriptions below:</label>
        <ReactQuill  placeholder=' '  modules={toolbarOptions} className=' h-[30vh]' onChange={setDescription} theme="snow"/> 
        <button type='submit' className=' bg-slate-900 text-white p-4 rounded-md my-9'> Submit</button>
        </form>

      </div>
    )  
  };

export default AddPost

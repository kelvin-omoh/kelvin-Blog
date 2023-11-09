import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router-dom';
const UpdatePost = () => {

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
  const [post,setPost]=useState({});
  const [quillValue, setQuillValue] = useState(''); // Store React Quill value as a string


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
const {id} = useParams();

console.log(id);
useEffect(() => {
  const getPost = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/post/${id}`);
      const data = await res.data;
      console.log(data);
      setPost(data);
      setTitle(data.title);
      setDescription(data.description);
      setCategory(data.category);
      setImage(data.coverImage);
      setPreview(data.coverImage);
      setQuillValue(data.description); // Set React Quill value as a string
    
    } catch (error) {
      console.log(error);
    }
  };

  getPost();
}, [id]);



  console.log(description);

  const headers = {
    authorization: `${token}`,
  };
const handleSubmit=async()=>{

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



    await axios.put(`http://localhost:3001/post/${id}`,{title,description,category,   coverImage: `${MainCoverImage.url}`},
    {headers})
    console.log('Successfully updated');
    navigate("/")
    console.log(MainCoverImage.url);
    
   } catch (error) {
    console.log(error);
   }
    


}







  return (
   
    <div className=' px-[4em] w-full flex-col gap-4  flex '>
       
    <h1>hello</h1>
    <form onSubmit={(e)=>{
      e.preventDefault();
       handleSubmit()
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
<option value="Devops">Frontend</option>
<option value="Devops">Backend</option>
<option value="Devops">Devopos</option>
<option value="Devops">UI/UX</option>
<option value="Devops">Science</option>
<option value="Devops">Cloud</option>
<option value="Devops">More ++</option>

</select>
      </div>
    
     
      <div className=' flex flex-col items-center w-fit  justify-start  gap-3'>
      <div className=' flex gap-3 items-start ml-0 justify-center h-fit'>
       <p className=" font-semibold text-gray-900 flex  justify-center">
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
        <div className=" rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none">
          Upload a file
        </div>
      </label> 
      </div>
      

      <div className="flex justify-center items-center mt-5 mx-3 max-w-xs">
        {preview && <img src={preview} alt="preview" className=" h-[10em] object-center object-cover w-[10em]" />}
      </div>

        </div>
        </div>
        
      <label htmlFor="">Enter descriptions below:</label>
    
    <ReactQuill value={description}  placeholder=' '  modules={toolbarOptions} className=' h-[30vh]' onChange={setDescription} theme="snow"/> 
    <button type='submit' className=' bg-slate-900 text-white p-4 rounded-md my-9'> Submit</button>
    </form>

  </div>
  )
}

export default UpdatePost
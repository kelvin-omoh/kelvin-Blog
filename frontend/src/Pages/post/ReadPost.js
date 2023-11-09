import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useCookies } from 'react-cookie'
import { FaPen, FaTrash } from 'react-icons/fa'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ReactQuill from 'react-quill';
import Quill from 'quill';
import 'react-quill/dist/quill.bubble.css'
import 'quill/dist/quill.snow.css'; // Import Quill's CSS styles

const ReadPost = () => {

    const [category, setCategory] = useState('Tech')
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [description, setDescription] = useState('')
    const [token,setToken]=useCookies(["accessToken",'userName'])
     const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [post,setPost]=useState({});
  const [quillValue, setQuillValue] = useState(''); // Store React Quill value as a string
 const navigate=useNavigate()

    const {id} = useParams();
    function htmlToText(html) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        return doc.body.textContent;
      }

      const headers = {
        authorization: `${token}`,
      };

    useEffect(() => {
        const getPost = async () => {
          try {
            const res = await axios.get(`http://localhost:3001/post/${id}`);
            const data = await res.data;
            console.log(data);
            setPost(data);
            setTitle(data.title);
            setDescription( htmlToText(data.description));
            setCategory(data.category);
            setImage(data.coverImage);
            setPreview(data.coverImage);
            setAuthor(data.authorId);
            setQuillValue(data.description); // Set React Quill value as a string
          
          } catch (error) {
            console.log(error);
          }
        };
      
        getPost();
      }, [id]);

    
      const deleteAPost=async()=>{
        try {
          await axios.delete(`http://localhost:3001/post/${id}`,{headers})
      console.log(title+' deleted');
      navigate("/")
        } catch (error) {
         console.log(error); 
        }
        
      }
     
    
     
    
   
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

  return (
    <div className=' w-full px-[10em] py-[3em]'>
        <div>
            <img src={image} className=' w-full h-[15em] object-cover object-center' alt="dbbd"/>
        </div>
      
      <div  className=' my-[3em]'>
   
      <ReactQuill
  value={description} // Use the React Quill value you fetched from the API
  readOnly={true} // Make the content read-only
  theme="bubble"
  modules={toolbarOptions}

/>

<div
     
      dangerouslySetInnerHTML={{ __html: description }}/>
      </div>
     <div className='  flex gap-[4em] justify-center items-center w-full '>
     {token?.accessToken?.userId=== author &&<>

     <Link to={`/posts/${id}`}>
        <button  className=' flex gap-5  justify-normal items-center rounded-lg py-3 px-5 bg-blue-500 text-white '>edit <FaPen size={20}/></button>
        </Link>
        <button onClick={()=>deleteAPost()} className=' flex gap-5 justify-normal items-center rounded-lg text-white bg-red-500 py-3 px-5'>delete  <FaTrash size={20}/></button>
        </> }
       </div>
       <p></p>
    </div>
  )
}

export default ReadPost





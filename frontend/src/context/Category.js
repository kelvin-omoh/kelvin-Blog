


import { createContext, useState } from "react";

export const CategoryContext = createContext();

const Category = ({ children }) => {
  const [categoryTitle, setCategoryTitle] = useState('All');
  const [search, setSearch] = useState('');

  return (
    <CategoryContext.Provider value={{ categoryTitle, setCategoryTitle }}>
      {children}
    </CategoryContext.Provider>
  );
}

export default Category;

import { useNavigate } from 'react-router-dom';
import { assets } from './../../assets';
import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
export default function SearchBar({ data }) {
  const { theme } = useContext(AppContext);

  const navigate = useNavigate();
  const [input, setInput] = useState(data ? data : '');
  const onSearchHandler = (e) => {
    e.preventDefault();
    navigate(`/course-list/${input.trim()}`);
  };
  return (
    <form
      onSubmit={onSearchHandler}
      className={`max-w-xl w-full md:h-14 h-12 flex items-center border rounded-lg bg-gradient-to-r ${
        theme === 'light'
          ? 'text-light-purple gradient-light'
          : 'text-dark-gold gradient-dark'
      }`}
    >
      <img
        src={assets.search_icon}
        alt="search_icon"
        className="md:w-auto w-10 px-3"
      />

      <input
        onChange={(e) => setInput(e.target.value)}
        value={input}
        type="text"
        placeholder="Search for courses"
        className="w-full h-full outline-none bg-transparent"
      />
      <button
        type="submit"
        className={`${
          theme === 'light' ? 'btn-light' : 'btn-dark'
        } rounded-lg md:px-10 px-7 md:py-3 py-2 mx-1`}
      >
        Search
      </button>
    </form>
  );
}

interface GenreFilterProps {
  genres: string[];
  selectedGenre: string;
  onGenreChange: (genre: string) => void;
}

const GenreFilter = ({ genres, selectedGenre, onGenreChange }: GenreFilterProps) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {genres.map((genre) => (
        <button
          key={genre}
          onClick={() => onGenreChange(genre)}
          className={`
            px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all
            ${selectedGenre === genre
              ? 'bg-red-600 text-white shadow-md scale-105'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }
          `}
        >
          {genre}
        </button>
      ))}
    </div>
  );
};

export default GenreFilter;
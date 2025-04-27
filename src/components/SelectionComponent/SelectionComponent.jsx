const SelectionComponent = ({ title, options, selected, setSelected }) => {
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold my-4">{title}</h2>
      {options.map((option) => (
        <div
          key={option.id}
          className={`flex items-center p-4 border-[1px] transition-all duration-300 ease-in-out cursor-pointer w-full
            ${
              selected === option.id
                ? "border-black bg-[#f6f6f6]"
                : "border-gray-300"
            }`}
          onClick={() => setSelected(option.id)}
        >
          <input
            type="radio"
            id={option.id}
            name={title}
            checked={selected === option.id}
            onChange={() => setSelected(option.id)}
            className="mr-3 h-5 w-5 border-2 cursor-pointer rounded-full appearance-none 
              bg-white checked:bg-[#f6f6f6] checked:border-[6px] checked:border-black transition-colors duration-700 ease-in-out transform"
          />
          <label htmlFor={option.id} className="text-sm flex-1 cursor-pointer">
            {option.label}
          </label>
          {option.price && <span className="text-xs font-semibold">{option.price}</span>}
        </div>
      ))}
    </div>
  );
};

export default SelectionComponent;

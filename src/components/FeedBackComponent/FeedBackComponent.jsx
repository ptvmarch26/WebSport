import { IoIosStar } from "react-icons/io";

const FeedbackComponent = ({ name, rating, content, images, time }) => {
  return (
    <div className="border-t border-[rgba(0, 0, 0, 0.1)] pb-6">
      <div className="flex items-center gap-1 my-2">
        <p className="font-medium mr-2">{name}</p>
        {[...Array(5)].map((_, index) =>
          index < rating ? (
            <IoIosStar key={index} className="text-lg text-yellow-400" />
          ) : (
            <IoIosStar key={index} className="text-lg text-gray-400" />
          )
        )}
        <p className="ml-2">{new Date(time).toLocaleDateString("en-GB")}</p>
      </div>
      <h3 className="font-semibold mt-2">{content.title}</h3>
      <p className="text-gray-700">{content.text}</p>
      {images.length > 0 && (
        <div className="flex gap-2 mt-2">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              className="w-16 h-16 object-cover rounded"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedbackComponent;

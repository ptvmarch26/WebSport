import { useState } from "react";
import { IoIosStar } from "react-icons/io";

const FeedbackComponent = ({ feedback }) => {
  const {
    rating,
    content,
    color,
    variant,
    feedback_media = {},
    createdAt,
  } = feedback;

  const { images = [], videos = [] } = feedback_media;

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewContent, setPreviewContent] = useState(null);

  const handlePreview = (e, type) => {
    setIsPreviewOpen(true);
    setPreviewContent({
      type,
      content: e.currentTarget.src || e.currentTarget.srcObject,
    });
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
    setPreviewContent(null);
  };

  return (
    <div className="border-t border-gray-200 py-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="flex flex-col gap-2 space-y-1">
          <div>
            <div className="flex gap-2 items-center">
              <img
                src={feedback.user_id.avt_img}
                alt="avatar"
                className="w-8 h-8 rounded-full"
              />
              <p className="font-medium text-base">
                {feedback.user_id?.user_name}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            {[...Array(5)].map((_, index) =>
              index < rating ? (
                <IoIosStar key={index} className="text-yellow-400 text-lg" />
              ) : (
                <IoIosStar key={index} className="text-gray-300 text-lg" />
              )
            )}
          </div>
          <div className="flex gap-3">
            <p className="text-gray-500 text-sm">
              {new Date(createdAt).toLocaleDateString("vi-VN")}
            </p>
            {(color || variant) && (
              <p className="text-sm text-gray-500">
                Phân loại:{" "}
                <span className="font-medium text-gray-700">
                  {color || "Không rõ"} - {variant || "Không rõ"}
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
      <p className="mt-3 text-gray-800 font-semibold">{content}</p>

      {images.length > 0 && (
        <div className="flex gap-2 mt-3 flex-wrap">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`feedback-img-${index}`}
              className="w-24 h-24 object-cover rounded-lg border border-gray-200 cursor-pointer"
              onClick={(e) => handlePreview(e, "image")}
            />
          ))}

          {videos.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {videos.map((videoUrl, index) => (
                <video
                  key={index}
                  src={videoUrl}
                  controls
                  className="w-24 h-24 rounded-lg border border-gray-200 object-cover cursor-pointer"
                  onClick={(e) => handlePreview(e, "video")}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {isPreviewOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
          onClick={handleClosePreview}
        >
          <div
            className="relative bg-white p-4 rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {/* <button
              onClick={handleClosePreview}
              className="absolute top-0 right-0 text-black text-2xl"
            >
              <TbXboxXFilled size={30}/>
            </button> */}

            {previewContent?.type === "image" ? (
              <img
                src={previewContent.content}
                alt="Preview"
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <video
                src={previewContent.content}
                controls
                className="max-w-full max-h-full object-contain"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackComponent;

import { useState } from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { HiArrowSmRight, HiArrowSmLeft } from "react-icons/hi";

const PanigationComponent = ({ currentPage, totalPages, onPageChange }) => {
  const [active, setActive] = useState(currentPage || 1);

  const handlePageChange = (index) => {
    setActive(index);
    onPageChange(index);
  };

  const getItemProps = (index) => ({
    variant: active === index ? "filled" : "text",
    color: "gray",
    onClick: () => handlePageChange(index),
  });

  const next = () => {
    if (active < totalPages) {
      handlePageChange(active + 1);
    }
  };

  const prev = () => {
    if (active > 1) {
      handlePageChange(active - 1);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={prev}
        disabled={active === 1}
      >
        <HiArrowSmLeft className="h-4 w-4" />
      </Button>
      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <IconButton key={i + 1} {...getItemProps(i + 1)}>
            {i + 1}
          </IconButton>
        ))}
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={next}
        disabled={active === totalPages}
      >
        <HiArrowSmRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default PanigationComponent;

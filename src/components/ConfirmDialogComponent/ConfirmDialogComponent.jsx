import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";

const ConfirmDialogComponent = ({ open, onClose, onConfirm, title, message }) => {
  return (
    <Dialog open={open} handler={onClose}>
      <DialogHeader>{title}</DialogHeader>
      <DialogBody>{message}</DialogBody>
      <DialogFooter className="gap-4">
        <Button variant="text" color="gray" onClick={onClose}>
          Hủy
        </Button>
        <Button variant="gradient" color="red" onClick={onConfirm}>
          Xác nhận
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ConfirmDialogComponent;

import Modal from "./Modal";

const ConfirmationDialog = ({
  isOpen,
  onClose,
  title = "Confirm Action",
  message = "Are you sure want to processed",
  confirmText="Confirm",
  cancelText = "Cancel",
  onConfirm,
  confirmationButtonClass = "bg-red-600 hover:bg-red-700"
}) => {
  return  (
  <Modal
  isOpen={isOpen} 
  onClose={onClose} 
  title={title} 
  confirmText={confirmText}
  cancelText={cancelText}
  onConfirm={onConfirm}
  confirmationButtonClass={confirmationButtonClass}
  size="sm"

  >
  <p className="text-gray-600">{message}</p>
  


  </Modal>
  );
  
   
};

export default ConfirmationDialog;

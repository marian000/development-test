import { useState } from '@wordpress/element';
import { Button, Modal } from '@wordpress/components';
import CreateProdForm from './CreateProdForm';

export default function CreateProdButton() {
  const [isOpen, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  return (
    <>
      <Button onClick={openModal} variant="primary">
        Create a new Product
      </Button>
      {isOpen && (
        <Modal onRequestClose={closeModal} title="Create a new Product">
          <CreateProdForm onCancel={closeModal} onSaveFinished={closeModal} />
        </Modal>
      )}
    </>
  );
}

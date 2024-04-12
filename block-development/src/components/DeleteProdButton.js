import { store as noticesStore } from '@wordpress/notices';
import { store as coreDataStore } from '@wordpress/core-data';
import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { Button, Spinner } from '@wordpress/components';

const DeleteProdButton = ({ productId }) => {
  const { createSuccessNotice, createErrorNotice } = useDispatch(noticesStore);
  // useSelect returns a list of selectors if you pass the store handle
  // instead of a callback:
  const { getLastEntityDeleteError } = useSelect(coreDataStore);
  const handleDelete = async () => {
    const success = await deleteEntityRecord('postType', 'products', productId);
    if (success) {
      // Tell the user the operation succeeded:
      createSuccessNotice('The Product was deleted!', {
        type: 'snackbar',
      });
    } else {
      // We use the selector directly to get the fresh error *after* the deleteEntityRecord
      // have failed.
      const lastError = getLastEntityDeleteError('postType', 'products', productId);
      const message = (lastError?.message || 'There was an error.') + ' Please refresh the page and try again.';
      // Tell the user how exactly the operation has failed:
      createErrorNotice(message, {
        type: 'snackbar',
      });
    }
  };
  const { deleteEntityRecord } = useDispatch(coreDataStore);
  const { isDeleting, error } = useSelect(
    (select) => ({
      isDeleting: select(coreDataStore).isDeletingEntityRecord('postType', 'products', productId),
      error: select(coreDataStore).getLastEntityDeleteError('postType', 'products', productId),
    }),
    [productId]
  );
  useEffect(() => {
    if (error) {
      // Display the error
    }
  }, [error]);
  return (
    <Button variant="secondary" onClick={handleDelete} disabled={isDeleting}>
      {isDeleting ? (
        <>
          <Spinner />
          Deleting...
        </>
      ) : (
        'Delete'
      )}
    </Button>
  );
};

export default DeleteProdButton;

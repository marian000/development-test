import { Button } from '@wordpress/components';

export default function MediaUploadButton({ onImageSelect }) {
  const openMediaUploader = () => {
    // Define the media frame and its properties
    const file_frame = wp.media({
      title: 'Select or upload media',
      button: {
        text: 'Use this media',
      },
      multiple: false, // Allow single file select
    });

    // Handle file selection
    file_frame.on('select', () => {
      const attachment = file_frame.state().get('selection').first().toJSON();
      onImageSelect(attachment.id); // Pass the selected image ID to the handler
    });

    // Open the frame
    file_frame.open();
  };

  return (
    <Button isPrimary onClick={openMediaUploader}>
      Upload Image
    </Button>
  );
}

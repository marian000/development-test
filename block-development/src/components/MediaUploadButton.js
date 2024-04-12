import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';

export default function MediaUploadButton({ onFileSelect }) {
  return (
    <MediaUploadCheck>
      <MediaUpload
        onSelect={onFileSelect} // Callback function when a file is selected
        allowedTypes={['image']} // Specify allowed types e.g., 'image', 'application/pdf'
        value={null} // Media ID (useful for editing and default selections)
        render={({ open }) => <Button onClick={open}>Upload Image</Button>}
      />
    </MediaUploadCheck>
  );
}

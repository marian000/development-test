import { useState } from '@wordpress/element';
import { useDispatch, useSelect } from '@wordpress/data';
import { store as coreDataStore } from '@wordpress/core-data';
import { Button, TextControl, CheckboxControl, PanelBody } from '@wordpress/components';
import CategoryDropdown from './CategorySelect';

export default function CreateProdForm({ onCancel, onSaveFinished }) {
  // Initial state setup for each field
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [featuredImage, setFeaturedImage] = useState(0); // Featured image ID
  const [price, setPrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [isOnSale, setIsOnSale] = useState(false);
  const [youtubeVideo, setYouTubeVideo] = useState('');
  const [category, setCategory] = useState('');

  const { saveEntityRecord } = useDispatch(coreDataStore);

  // Load categories
  const categories = useSelect((select) => select(coreDataStore).getEntityRecords('taxonomy', 'product_categories', { per_page: -1 }), []);

  // Media Upload handling
  const openMediaLibrary = () => {
    wp.media({
      title: 'Select or Upload Media',
      button: {
        text: 'Use this media',
      },
      multiple: false,
    })
      .open()
      .on('select', () => {
        const attachment = wp.media.frame.state().get('selection').first().toJSON();
        setFeaturedImage(attachment.id);
      });
  };

  const handleSave = async () => {
    console.log('save product');
    const productData = {
      title,
      content: description,
      status: 'publish',
      featured_media: featuredImage,
      meta: {
        price,
        sale_price: salePrice,
        is_on_sale: isOnSale,
        youtube_video: youtubeVideo,
      },
      categories: [category], // Ensure this is handled as an array of IDs
    };

    const savedRecord = await saveEntityRecord('postType', 'products', productData);
    console.log('savedRecord ', savedRecord);
    if (savedRecord) {
      onSaveFinished();
    }
  };

  return (
    <PanelBody>
      <TextControl label="Product Title" value={title} onChange={setTitle} />
      <TextControl label="Description" value={description} onChange={setDescription} />
      <Button isDefault onClick={openMediaLibrary}>
        Set Featured Image
      </Button>
      {featuredImage && <p>Image ID: {featuredImage}</p>}
      <TextControl label="Price" value={price} onChange={setPrice} />
      <TextControl label="Sale Price" value={salePrice} onChange={setSalePrice} />
      <CheckboxControl label="Is On Sale?" checked={isOnSale} onChange={setIsOnSale} />
      <TextControl label="YouTube Video URL" value={youtubeVideo} onChange={setYouTubeVideo} />
      <CategoryDropdown onCategoryChange={setCategory} selectedCategoryId={category} />
      <Button isPrimary onClick={handleSave} disabled={!title || !description}>
        Save Product
      </Button>
      <Button onClick={onCancel}>Cancel</Button>
    </PanelBody>
  );
}

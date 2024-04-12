import { useState, useEffect } from '@wordpress/element';
import { useDispatch, useSelect } from '@wordpress/data';
import { store as coreDataStore } from '@wordpress/core-data';
import { Button, TextControl, CheckboxControl, PanelBody } from '@wordpress/components';
import CategoryDropdown from './CategorySelect';
import MediaUploadButton from './MediaUploadButton';

export default function EditPageForm({ pageId, onCancel, onSaveFinished }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [featuredImage, setFeaturedImage] = useState(0);
  const [price, setPrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [isOnSale, setIsOnSale] = useState(false);
  const [youtubeVideo, setYouTubeVideo] = useState('');
  const [category, setCategory] = useState('');

  const { saveEditedEntityRecord } = useDispatch(coreDataStore);
  const handleSave = async () => {
    // Construct the product data object with current state values
    const productData = {
      title,
      content: description, // Assuming 'content' is used for description in your WordPress setup
      featured_media: featuredImage,
      status: 'publish', // Assuming you want to publish/update the post status directly
      meta: {
        price,
        sale_price: salePrice,
        is_on_sale: isOnSale,
        youtube_video: youtubeVideo,
      },
      categories: [category], // Assuming categories need to be an array of IDs
    };

    console.log('productData', productData);

    // Save the edited record
    const updatedRecord = await saveEditedEntityRecord('postType', 'products', pageId, productData);
    console.log('updatedRecord ', updatedRecord);
    if (updatedRecord) {
      onSaveFinished();
    }
  };
  const { page } = useSelect(
    (select) => ({
      page: select(coreDataStore).getEditedEntityRecord('postType', 'products', pageId),
    }),
    [pageId]
  );

  // Update state when product data is fetched
  useEffect(() => {
    if (page) {
      console.log('page ', page);
      setTitle(page.title);
      setDescription(page.content);
      setFeaturedImage(page?.featured_media || 0);
      setPrice(page?.meta?.price || '');
      setSalePrice(page?.meta?.sale_price || '');
      setIsOnSale(page?.meta?.is_on_sale || false);
      setYouTubeVideo(page?.meta?.youtube_video || '');
      setCategory(page?.product_categories?.[0] || '');
    }
  }, [page]);

  return (
    <PanelBody>
      {() => {
        console.log(page);
      }}
      <TextControl label="Product Title" value={title} onChange={(value) => setTitle(value)} />
      <TextControl label="Description" value={description} onChange={(value) => setDescription(value)} />
      {/*<Button isDefault onClick={openMediaLibrary}>Set Featured Image</Button>*/}
      <MediaUploadButton onImageSelect={setFeaturedImage} />
      {featuredImage && <p>Image ID: {featuredImage}</p>}
      <TextControl label="Price" value={price} onChange={(value) => setPrice(value)} />
      <TextControl label="Sale Price" value={salePrice} onChange={(value) => setSalePrice(value)} />
      <CheckboxControl label="Is On Sale?" checked={isOnSale} onChange={(isChecked) => setIsOnSale(isChecked)} />
      <TextControl label="YouTube Video URL" value={youtubeVideo} onChange={(value) => setYouTubeVideo(value)} />
      <CategoryDropdown selectedCategoryId={category} onCategoryChange={setCategory} />
      <Button isPrimary onClick={handleSave} disabled={!title || !description}>
        Update Product
      </Button>
      <Button onClick={onCancel}>Cancel</Button>
    </PanelBody>
  );
}

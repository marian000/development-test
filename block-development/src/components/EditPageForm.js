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

  // Get the dispatch function
  const { editEntityRecord, saveEditedEntityRecord } = useDispatch(coreDataStore);

  // Handlers that update the Redux store immediately
  const handleTitleChange = (value) => {
    setTitle(value);
    editEntityRecord('postType', 'products', pageId, { title: value });
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
    editEntityRecord('postType', 'products', pageId, { content: value });
  };

  const handlePriceChange = (value) => {
    setPrice(value);
    editEntityRecord('postType', 'products', pageId, { meta: { price: value } });
  };

  const handleSalePriceChange = (value) => {
    setSalePrice(value);
    editEntityRecord('postType', 'products', pageId, { meta: { sale_price: value } });
  };

  const handleIsOnSaleChange = (isChecked) => {
    setIsOnSale(isChecked);
    editEntityRecord('postType', 'products', pageId, { meta: { is_on_sale: isChecked } });
  };

  const handleYouTubeVideoChange = (value) => {
    setYouTubeVideo(value);
    editEntityRecord('postType', 'products', pageId, { meta: { youtube_video: value } });
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
    editEntityRecord('postType', 'products', pageId, { product_categories: [value] });
  };

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
      product_categories: [category], // Assuming categories need to be an array of IDs
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
      <TextControl label="Product Title" value={title} onChange={handleTitleChange} />
      <TextControl label="Description" value={description} onChange={handleDescriptionChange} />
      <MediaUploadButton onImageSelect={setFeaturedImage} />
      <TextControl label="Price" value={price} onChange={handlePriceChange} />
      <TextControl label="Sale Price" value={salePrice} onChange={handleSalePriceChange} />
      <CheckboxControl label="Is On Sale?" checked={isOnSale} onChange={handleIsOnSaleChange} />
      <TextControl label="YouTube Video URL" value={youtubeVideo} onChange={handleYouTubeVideoChange} />
      <CategoryDropdown selectedCategoryId={category} onCategoryChange={handleCategoryChange} />
      <Button isPrimary onClick={handleSave} disabled={!title || !description}>
        Update Product
      </Button>
      <Button onClick={onCancel}>Cancel</Button>
    </PanelBody>
  );
}

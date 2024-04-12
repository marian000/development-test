import { useSelect } from '@wordpress/data';
import { SelectControl } from '@wordpress/components';

export default function CategoryDropdown({ onCategoryChange, selectedCategoryId }) {
  const categories = useSelect((select) => {
    // Fetch terms from the 'product_categories' taxonomy
    return select('core').getEntityRecords('taxonomy', 'product_categories', { per_page: 100 }) || [];
  }, []);

  return (
    <SelectControl
      label="Select a Category"
      value={selectedCategoryId}
      options={[
        { label: 'Select...', value: '' },
        ...categories.map((cat) => ({
          label: cat.name,
          value: cat.id,
        })),
      ]}
      onChange={onCategoryChange}
    />
  );
}

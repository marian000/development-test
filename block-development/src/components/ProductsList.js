import { decodeEntities } from '@wordpress/html-entities';
import { Button, Spinner } from '@wordpress/components';
import PageEditButton from './PageEditButton';

export default function ProductsList({ hasResolved, pages }) {
  if (!hasResolved) {
    return <Spinner />;
  }
  if (!pages?.length) {
    return <div>No results</div>;
  }

  return (
    <table className="wp-list-table widefat fixed striped table-view-list">
      <thead>
        <tr>
          <td>Featured Image</td>
          <td>Title</td>
          <td style={{ width: 190 }}>Actions</td>
        </tr>
      </thead>
      <tbody>
        {pages?.map((page) => {
          // if featured_image_src not available, use a placeholder image
          const image = page?.featured_image_src ? (
            <img src={page?.featured_image_src} alt={page.title.rendered} style={{ width: '50px' }} />
          ) : (
            <img style={{ width: '50px' }} src="https://via.placeholder.com/150" alt={page.title.rendered} />
          );
          return (
            <tr key={page.id}>
              <td>{image}</td>
              <td>{decodeEntities(page.title.rendered)}</td>
              <td>
                <div className="form-buttons">
                  <PageEditButton pageId={page.id} />
                  <Button variant="secondary">Delete</Button>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

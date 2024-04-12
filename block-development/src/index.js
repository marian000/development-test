import { createRoot } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { store as coreDataStore } from '@wordpress/core-data';

import './style.scss';
import CreateProdButton from './components/CreateProdButton';
import ProductsList from './components/ProductsList';

function MyFirstApp() {
  const { pages, hasResolved } = useSelect((select) => {
    const query = {};

    const selectorArgs = ['postType', 'products', query];
    return {
      pages: select(coreDataStore).getEntityRecords(...selectorArgs),
      hasResolved: select(coreDataStore).hasFinishedResolution('getEntityRecords', selectorArgs),
    };
  }, []);

  return (
    <div>
      <div className="list-controls">
        <CreateProdButton />
      </div>
      <ProductsList hasResolved={hasResolved} pages={pages} />
    </div>
  );
}

window.addEventListener(
  'load',
  function () {
    const rootDomElement = document.getElementById('my-custom-gutenberg-app');
    const root = createRoot(rootDomElement);
    root.render(<MyFirstApp />);
  },
  false
);

import { createRoot } from '@wordpress/element';

import './style.scss';

function MyFirstApp() {
  return <div>Gutenberg Components</div>;
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

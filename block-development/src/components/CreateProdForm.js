export default function CreateProdForm() {
  return (
    <form>
      <label htmlFor="product-title">Title</label>
      <input type="text" id="product-title" name="product-title" />
      <label htmlFor="product-content">Content</label>
      <textarea id="product-content" name="product-content" />
      <button type="submit">Save</button>
    </form>
  );
}

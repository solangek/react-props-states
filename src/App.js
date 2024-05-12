import { useState } from 'react';

/*
    * example from the official React docs: https://react.dev/learn/thinking-in-react
    NOTE: YOU SHOULD NOT WRITE YOUR CODE IN A SINGLE FILE! THIS IS JUST FOR DEMONSTRATION PURPOSES.
    * Suggestion to get started with React:
    * 1. Create a new folder in the src directory called "components"
    * 2. Create a new file called "FilterableProductTable.js"
    * 3. Move the FilterableProductTable component code to the new file
    * 4. Create a new file called "ProductTable.js"
    * 5. Move the ProductTable component code to the new file
    * 6. Create a new file called "SearchBar.js"
    * 7. Move the SearchBar component code to the new file
    * 8. Create a new file called "ProductCategoryRow.js"
    * 9. Move the ProductCategoryRow component code to the new file
    * 10. Create a new file called "ProductRow.js"
    * 11. Move the ProductRow component code to the new file
    * 12. Import the components in the App.js file
    * 13. Use the components in the App component
 */

function FilterableProductTable({ products }) {
  const [searchText, setSearchText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
      <div>
        <SearchBar
            filterText={searchText}
            inStockOnly={inStockOnly}
            onFilterTextChange={setSearchText}
            onInStockOnlyChange={setInStockOnly} />
        <ProductTable
            products={products}
            filterText={searchText}
            inStockOnly={inStockOnly} />
      </div>
  );
}

function ProductCategoryRow({ category }) {
  return (
      <tr>
        <th colSpan="2">
          {category}
        </th>
      </tr>
  );
}

function ProductRow({ product }) {
  const name = product.stocked ? product.name :
      <span style={{ color: 'red' }}>
      {product.name}
    </span>;

  return (
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
  );
}

function ProductTable({ products, filterText, inStockOnly }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
    if (product.category !== lastCategory) { // Add a category row
      rows.push(
          <ProductCategoryRow
              category={product.category}
              key={product.category} />
      );
    }
    rows.push(
        <ProductRow
            product={product}
            key={product.name} />
    );
    lastCategory = product.category;
  });

  return (
      <table>
        <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
  );
}

function SearchBar({filterText, inStockOnly, onFilterTextChange, onInStockOnlyChange}) {
  return (
      <form>
        <input
            type="text"
            value={filterText} placeholder="Search..."
            onChange={(e) => onFilterTextChange(e.target.value)} />
        <label>
          <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => onInStockOnlyChange(e.target.checked)} />
          {' '}
          Only show products in stock
        </label>
      </form>
  );
}

// note that products are already organized by category
const PRODUCTS = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}

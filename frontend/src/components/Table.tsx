import React from "react";

interface Product {
  name: string;
  price: number;
  quantity: number;
}

interface TableProps {
  products: Product[];
}
const Table: React.FC<TableProps> = ({ products }) => {
  const amount = products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0,
  );
  const gst = +(amount * 0.18).toFixed(2);
  const totalAmount = +(amount + gst).toFixed(2);

  return (
    <div>
      <div className="relative overflow-x-auto rounded-lg shadow-md">
        <table className="w-full text-left text-sm text-gray-400">
          <thead className="bg-gray-700 text-xs uppercase text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>

              <th scope="col" className="px-6 py-3">
                Quantity
              </th>

              <th scope="col" className="px-6 py-3">
                Price
              </th>

              <th scope="col" className="px-6 py-3">
                Total Price
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr
                key={index}
                className="border-b border-gray-700 odd:bg-gray-900 even:bg-gray-800"
              >
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 font-medium text-white"
                >
                  {product.name}
                </th>
                <td className="px-6 py-4">{product.quantity}</td>
                <td className="px-6 py-4">₹{product.price}</td>
                <td className="px-6 py-4">
                  ₹{product.price * product.quantity}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="text-white">
              <td scope="row" className="px-6 py-3">
                Amount
              </td>
              <td></td>
              <td></td>
              <td className="px-6 py-3">₹ {amount}</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td>+ GST 18%</td>
              <td className="px-6 py-3">₹ {gst}</td>
            </tr>
            <tr className="bg-gray-700 font-semibold text-white">
              <th scope="row" className="px-6 py-3 text-base">
                Total Amount
              </th>
              <td></td>
              <td></td>
              <td className="px-6 py-3">₹ {totalAmount}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default Table;

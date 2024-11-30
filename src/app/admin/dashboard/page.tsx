"use client";

import React, { useEffect, useState } from "react";
import { setLoading } from "@/redux/features/loadingReducer";
import { useAppDispatch } from "@/redux/hooks";
import axios from "axios";
import ProductRow from "@/components/admin/ProductRow";
import Popup from "@/components/admin/Popup";

export interface IProduct {
  _id: string;
  imgSrc: string;
  fileKey: string;
  name: string;
  price: string;
  category: string;
}

const Dashboard = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [updateTable, setUpdateTable] = useState<number>(0);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading(true));

    axios
      .get("/api/get_products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err))
      .finally(() => dispatch(setLoading(false)));
  }, [updateTable, dispatch]); // Include `dispatch` in the dependency array

  return (
    <div>
      <div className="bg-white h-[calc(100vh-96px)] rounded-lg p-4">
        <h2 className="text-3xl">All Products</h2>
        <div className="mt-4 h-[calc(100vh-180px)] overflow-y-auto">
          <table className="w-full">
            <thead>
              <tr className="text-gray-500 border-t border-[#ececec]">
                <th>Sr No.</th>
                <th>Name</th>
                <th>Price</th>
                <th>Picture</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product: IProduct, index) => (
                <ProductRow
                  key={product._id}
                  srNo={index + 1}
                  setOpenPopup={setOpenPopup}
                  setUpdateTable={setUpdateTable}
                  product={product}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {openPopup && (
        <Popup setOpenPopup={setOpenPopup} setUpdateTable={setUpdateTable} />
      )}
    </div>
  );
};

export default Dashboard;

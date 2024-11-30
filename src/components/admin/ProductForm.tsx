"use client";

import { setLoading } from "@/redux/features/loadingReducer";
import { useAppDispatch } from "@/redux/hooks";
import { makeToast } from "@/utils/helper";
import axios from "axios";
import Image from "next/image";
import { UploadButton } from "@uploadthing/react";
import React, { FormEvent, useState } from "react";

interface IPayload {
  imgSrc: string; // Ensure string, no null
  fileKey: null | string;
  name: string;
  category: string;
  price: string;
}

const ProductForm = () => {
  const [payload, setPayload] = useState<IPayload>({
    imgSrc: "",
    fileKey: null,
    name: "",
    category: "",
    price: "",
  });

  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(setLoading(true));

    axios
      .post("/api/add_product", payload)
      .then(() => {
        makeToast("Product added successfully");
        setPayload({
          imgSrc: "",
          fileKey: null,
          name: "",
          category: "",
          price: "",
        });
      })
      .catch((err) => console.error(err))
      .finally(() => dispatch(setLoading(false)));
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <Image
        className="max-h-[300px] w-auto object-contain rounded-md"
        src={payload.imgSrc || "/placeholder.jpg"}
        width={800}
        height={500}
        alt="product_image"
      />
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          if (res && res[0]?.url) {
            setPayload({
              ...payload,
              imgSrc: res[0].url,
              fileKey: res[0].key,
            });
          } else {
            console.error("Invalid upload response.");
          }
        }}
        onUploadError={(error: Error) => {
          console.error(`Upload error: ${error}`);
        }}
      />
      <div>
        <label className="block ml-1"> Product Name</label>
        <input
          type="text"
          className="bg-gray-300 w-full px-2 py-2 border outline-pink rounded-md"
          value={payload.name}
          onChange={(e) => setPayload({ ...payload, name: e.target.value })}
          required
        />
        <label className="block ml-1"> Product Category</label>
        <input
          type="text"
          className="bg-gray-300 w-full px-2 py-2 border outline-pink rounded-md"
          value={payload.category}
          onChange={(e) => setPayload({ ...payload, category: e.target.value })}
          required
        />
        <label className="block ml-1"> Product Price</label>
        <input
          type="text"
          className="bg-gray-300 w-full px-2 py-2 border outline-pink rounded-md"
          value={payload.price}
          onChange={(e) => setPayload({ ...payload, price: e.target.value })}
          required
        />
      </div>
      <div className="flex justify-end">
        <button className="bg-pink text-white px-8 py-2 rounded-md">Add</button>
      </div>
    </form>
  );
};

export default ProductForm;

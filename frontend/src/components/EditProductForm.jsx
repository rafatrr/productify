
import React from 'react'
import { useState } from 'react';
import { ArrowLeft, ImageIcon, TypeIcon, FileTextIcon, SaveIcon } from 'lucide-react';
import { Link } from 'react-router';
import { uploadImage } from '../lib/api';

const EditProductForm = ({ isPending, product, onSubmit, isError }) => {
  const [formData, setFormData] = useState({
    title: product.title,
    desc: product.desc,
    imageUrl: product.imageUrl,
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(product.imageUrl || '');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = formData.imageUrl;

    if (imageFile) {
      const result = await uploadImage(imageFile);
      imageUrl = result.url;
    }

    onSubmit({ ...formData, imageUrl });
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <Link to="/profile" className="btn btn-ghost mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Link>
      <h1 className="text-3xl font-bold mb-8">Edit Product</h1>

      <form onSubmit={handleSubmit} className="space-y-6">

        <label className="label">
          <TypeIcon className="size-4 text-base-content/50" />
          <span className="label-text font-medium">Title</span>
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="input input-bordered w-full"
          placeholder="Enter product title"
        />

        <label className="label">
          <FileTextIcon className="size-4 text-base-content/50" />
          <span className="label-text font-medium">Description</span>
        </label>
        <textarea
          value={formData.desc}
          onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
          className="textarea textarea-bordered w-full h-32"
          placeholder="Enter product description"
        />

        <label className="label">
          <ImageIcon className="size-4 text-base-content/50" />
          <span className="label-text font-medium">Image</span>
        </label>

        {/* Image Upload */}
        <label className="flex items-center gap-2 p-3 rounded-box bg-base-200 border border-base-300 cursor-pointer w-full">
          <ImageIcon className='size-4 text-base-content/50' />
          <span className="text-base-content/50 text-sm">
            {imageFile ? imageFile.name : 'Choose a new image...'}
          </span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </label>

        {/* Preview */}
        {previewUrl && (
          <div className="rounded-box overflow-hidden w-full">
            <img
              src={previewUrl}
              alt="preview"
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        )}

        {isError && (
          <div role="alert" className="alert alert-error alert-sm">
            <span>Failed to update. Try again.</span>
          </div>
        )}

        <button type="submit" className="btn btn-primary w-full" disabled={isPending}>
          {isPending ? <span className="loading loading-spinner" /> : "Save Changes"}
        </button>

      </form>
    </div>
  );
};

export default EditProductForm;
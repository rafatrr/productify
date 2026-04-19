import React from "react";
import { Link, useNavigate } from 'react-router';
import { useCreateProduct } from '../hooks/useProducts';
import { ArrowLeft, FileTextIcon, Image, SparklesIcon, TypeIcon } from 'lucide-react';
import { uploadImage } from '../lib/api';

const CreatePage = () => {
  const navigate = useNavigate();
  const createProduct = useCreateProduct();
  
  const [formData, setFormData] = React.useState({
    title: '',
    desc: '',
    imageFile: null,
  });
  const [previewUrl, setPreviewUrl] = React.useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFormData({ ...formData, imageFile: file });
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handelSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = '';

    if (formData.imageFile) {
      const result = await uploadImage(formData.imageFile);
      imageUrl = result.url;
    }

    createProduct.mutate(
      { title: formData.title, desc: formData.desc, imageUrl },
      { onSuccess: () => navigate('/') }
    );
  };

  return (
    <div className='max-w-lg mx-auto'>
      <Link to="/" className="btn btn-ghost btn-sm gap-1 mb-4">
        <ArrowLeft className='size-4'/>Back
      </Link>

      <div className="card bg-base-300">
        <div className="card-body">
          <h1 className='card-title'>
            <SparklesIcon className='size-5 text-primary'/>
            Create Product
          </h1>
          <form onSubmit={handelSubmit} className="flex flex-col gap-4 place-items-start">
            
            {/* Title Input */}
            <label className="input input-bordered flex items-center gap-2 bg-base-200">
              <TypeIcon className='size-4 bg-base-content/50' />
              <input
                type="text"
                placeholder="Title"
                className="grow"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </label>

            {/* Image Upload */}
            <label className="flex items-center gap-2 p-3 rounded-box bg-base-200 border border-base-300 cursor-pointer w-full">
              <Image className='size-4 text-base-content/50' />
              <span className="text-base-content/50 text-sm">
                {formData.imageFile ? formData.imageFile.name : 'Choose an image...'}
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

            {/* Description Input */}
            <div className="form-control w-full">
              <div className="flex items-start gap-2 p-3 rounded-box bg-base-200 border border-base-300">
                <FileTextIcon className="size-4 text-base-content/50 mt-1" />
                <textarea
                  placeholder="Description"
                  className="grow bg-transparent resize-none focus:outline-none min-h-24"
                  value={formData.desc}
                  onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                  required
                />
              </div>
            </div>

            {createProduct.isError && (
              <div role='alert' className="alert alert-error">
                <span>{createProduct.error.message}</span>
              </div>
            )}

            <button type='submit'
              className='btn btn-primary w-full'
              disabled={createProduct.isPending}
            >
              {createProduct.isPending ? (<span className='loading loading-spinner'/>) : ("Create product")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
import React from 'react'
import { useState } from 'react';
import { ArrowLeft , ImageIcon , TypeIcon, FileTextIcon, SaveIcon } from 'lucide-react';
import { Link } from 'react-router';
const EditProductForm = ({ isPending, product, onSubmit ,isError}) => {
  const [formData, setFormData] = useState({
    title: product.title,
    desc: product.desc,
    imageUrl: product.imageUrl,
  });

  return (
    <div className="max-w-xl mx-auto p-6">
      <Link to="/profile" className="btn btn-ghost mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Link>
      <h1 className="text-3xl font-bold mb-8">Edit Product</h1>


      <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} className="space-y-6">

          <label className="label">
            <TypeIcon className="size-4  text-base-content/50" />
            <span className="label-text font-medium">Title</span>
          </label>
          <input 
            type="text" 
            value={formData.title} 
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="input input-bordered w-full"
            placeholder="Enter product title"
          />
          <label className="label">
            <FileTextIcon className="size-4  text-base-content/50" />
            <span className="label-text font-medium">Description</span>
          </label>
          <textarea 
            value={formData.desc} 
            onChange={(e) => setFormData({...formData, desc: e.target.value})}
            className="textarea textarea-bordered w-full h-32"
            placeholder="Enter product description"
          />
          <label className="label">
            <TypeIcon className="size-4  text-base-content/50" />
            <span className="label-text font-medium">Image URL</span>
          </label>
          <input 
            type="text" 
            value={formData.imageUrl} 
            onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
            className="input input-bordered w-full"
            placeholder="Enter image URL"
          />

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
  )
}

export default EditProductForm;

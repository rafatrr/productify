import { ArrowLeft, EditIcon, Trash2Icon, Calendar, UserIcon, CalendarIcon } from 'lucide-react'
import LoadingSpinner from '../components/LoadingSpinner';
import CommintsSection from '../components/CommintsSection';
import { useAuth } from '@clerk/clerk-react';
import {useParams, Link, useNavigate } from 'react-router'
import { useDeleteProduct, useProduct } from '../hooks/useProducts';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userId } = useAuth();

  const { data: product, isLoading, error } = useProduct(id);
  const deleteProduct = useDeleteProduct(id)
  const handelDelete = () =>{
    if(confirm("Are you sure you want to delete this product?")){
      deleteProduct.mutate(id, { onSuccess: () => navigate('/') });
    }
  }

  if (isLoading) return <LoadingSpinner />;

   if (error || !product) {
    <div className="card bg-base-300 max-w-md mx-auto">
      <div className="card-body items-center text-center">
        <h2 className="card-title text-error">Product not found</h2>
        <Link to="/">Go back to home</Link>
      </div>
    </div>
   }

   const isOwner = userId === product?.userId;
  
  return (
    <div className='max-w-4xl mx-auto space-y-6'>
      <div className="flex items-center justify-between">
        <Link to='/' className='btn btn-ghost btn-sm gap-1' >
          <ArrowLeft className="size-4" />
          Back
        </Link>
              {isOwner && (
          <div className="flex gap-2">
            <Link to={`/edit/${product.id}`} className="btn btn-ghost btn-sm gap-1">
              <EditIcon className="size-4" /> Edit
            </Link>
            <button
              onClick={handelDelete}
              className="btn btn-error btn-sm gap-1"
              disabled={deleteProduct.isPending}
            >
              {deleteProduct.isPending ? (
                <span className="loading loading-spinner loading-xs" />
              ) : (
                <Trash2Icon className="size-4" />
              )}
              Delete
            </button>
          </div>
        )}


      </div>

      <div className="grid lg:grid-cols-2 ">
        {/* image */}
        <div className="card rounded-sm bg-base-300">
          <figure className='p-4'>
            <img src={product.imageUrl} 
            alt={product.title} 
            className='rounded-sm w-full h-80 object-cover' />
          </figure>
        </div>

        <div className="card rounded-sm bg-base-300">
          <div className="card-body">
            <h1 className="card-title text-2xl">{product.title}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-base-content/60 my-2">
              <div className="flex items-center gap-1">
                <CalendarIcon className="size-4" />
                {new Date(product.createdAt).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-1">
                <UserIcon className="size-4" />
                {product.user?.name}
              </div>
            </div>

            <div className="divider my-2"></div>
            <p className="text-base-content/80 leading-relaxed ">{product.desc}</p>
             
                  {product.user && (
              <>
                <div className="divider my-2"></div>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={product.user.imageUrl} alt={product.user.name} />
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold">{product.user.name}</p>
                    <p className="text-xs text-base-content/50">Creator</p>
                  </div>
                      {product.user?.phoneNumber && !isOwner && (
                      <a
                        href={`https://wa.me/${product.user.phoneNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn bg-green-500 text-white w-48 gap-2 mt-2"
                      >
                       Contact on WhatsApp
                      </a>
                    )}            
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* commint */}
      <div className="card bg-base-300">
        <div className="card-body">
          <CommintsSection productId={product.id} comments={product.comments} currentUserId={userId} />
        </div>
      </div>
    </div>
  )
}
export default ProductPage;

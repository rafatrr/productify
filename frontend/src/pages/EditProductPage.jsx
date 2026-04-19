import { useParams, Link, useNavigate } from "react-router";
import { useAuth  } from '@clerk/clerk-react';
import { useProduct, useUpdateProduct } from "../hooks/useProducts";
import LoadingSpinner from "../components/LoadingSpinner";
import EditProductForm from "../components/EditProductForm";



const EditPage = () => {
  const { id } = useParams();
 const navigate = useNavigate();
  const { userId} = useAuth();
  const {data: product, isLoading} = useProduct(id);
  const updateProduct = useUpdateProduct();




  if(isLoading) return <LoadingSpinner />;

  if(!product || product.userId !== userId){
    return <div className="card bg-base-300 max-w-md mx-auto">
      <div className="card-body items-center text-center">
        <h2 className="card-title text-error"> {!product ? 'not found': 'Access denied'} </h2>
        <Link to="/" className="btn btn-primary btn-sm">Go home</Link>
      </div>
    </div>;
  }
   

  return (
    <div>
      
       <EditProductForm
       isPending={updateProduct.isPending} 
       product={product}
       onSubmit={(formData) => {
        updateProduct.mutate({id, ...formData}, {
          onSuccess: () => {
            navigate(`/product/${id}`);
          }
        });
       }}
       />
    </div>
  )
}

export default EditPage

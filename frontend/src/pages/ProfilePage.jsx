import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useMyProducts, useDeleteProduct } from "../hooks/useProducts";
import { useUpdatePhone } from "../hooks/useUserSync";
import LoadingSpinner from "../components/LoadingSpinner";
import { useUser } from "@clerk/clerk-react";
import { PlusIcon, PackageIcon, EyeIcon, EditIcon, Trash2Icon, PhoneIcon, SaveIcon } from "lucide-react";


 const countries = [
  { name: "Saudi Arabia", code: "966", flag: "🇸🇦" },
  { name: "UAE", code: "971", flag: "🇦🇪" },
  { name: "Kuwait", code: "965", flag: "🇰🇼" },
  { name: "Qatar", code: "974", flag: "🇶🇦" },
  { name: "Bahrain", code: "973", flag: "🇧🇭" },
  { name: "Oman", code: "968", flag: "🇴🇲" },
  { name: "Jordan", code: "962", flag: "🇯🇴" },
  { name: "Syria", code: "963", flag: "🇸🇾" },
  { name: "Lebanon", code: "961", flag: "🇱🇧" },
  { name: "Egypt", code: "20", flag: "🇪🇬" },
  { name: "Turkey", code: "90", flag: "🇹🇷" },
  { name: "Iraq", code: "964", flag: "🇮🇶" },
  { name: "Morocco", code: "212", flag: "🇲🇦" },
  { name: "Tunisia", code: "216", flag: "🇹🇳" },
  { name: "Algeria", code: "213", flag: "🇩🇿" },
  { name: "United States", code: "1", flag: "🇺🇸" },
  { name: "United Kingdom", code: "44", flag: "🇬🇧" },
  { name: "Germany", code: "49", flag: "🇩🇪" },
  { name: "France", code: "33", flag: "🇫🇷" },
];


const ProfilePage = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { data: products = [], isLoading, isError } = useMyProducts();
  const deleteProduct = useDeleteProduct();
  const updatePhone = useUpdatePhone();
  const [phoneNumber, setPhoneNumber] = useState('');

 
const [selectedCountry, setSelectedCountry] = useState(countries[0]);
const [localPhone, setLocalPhone] = useState('');


  
  const handleDelete = (id) => {
    if (confirm("Delete this product?")) deleteProduct.mutate(id);
  };

  const handlePhoneSubmit = () => {
    updatePhone.mutate(phoneNumber);
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p>Error loading products</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Products</h1>
          <p className="text-base-content/60 text-sm">Manage your listings</p>
        </div>
        <Link to="/create" className="btn btn-primary btn-sm gap-1">
          <PlusIcon className="size-4" /> New
        </Link>
      </div>

      {/* Profile Card */}
      <div className="card bg-base-300">
        <div className="card-body">
          <div className="flex items-center gap-4">
            <img src={user?.imageUrl} alt={user?.fullName} className="size-16 rounded-full" />
            <div>
              <h2 className="font-bold text-lg">{user?.fullName}</h2>
              <p className="text-base-content/60 text-sm">{user?.primaryEmailAddress?.emailAddress}</p>
            </div>
          </div>
<div className="mt-4">
  <label className="label">
    <PhoneIcon className="size-4 text-base-content/50" />
    <span className="label-text font-medium ml-2">WhatsApp Number</span>
  </label>
  <div className="flex gap-2">
    {/* Country Selector */}
    <select
      className="select select-bordered w-40"
      value={selectedCountry.code}
      onChange={(e) => setSelectedCountry(countries.find(c => c.code === e.target.value))}
    >
      {countries.map((country) => (
        <option key={country.code} value={country.code}>
          {country.flag} +{country.code}
        </option>
      ))}
    </select>

    {/* Phone Input */}
    <input
      type="tel"
      placeholder="501234567"
      className="input input-bordered flex-1"
      value={localPhone}
      onChange={(e) => {
      const value = e.target.value.replace(/\D/g, "");
       setLocalPhone(value);
       }}
    />
    
    {/* Save Button */}
      <button
      className="btn btn-primary"
      onClick={() => {
        const digits = (selectedCountry.code + localPhone).replace(/\D/g, "");
        if (digits.length < 7 || localPhone.length > 10) {
          alert("Please enter a valid phone number");
          return;
        }
        updatePhone.mutate(digits);
      }}
      disabled={updatePhone.isPending || !localPhone}
    >
      {updatePhone.isPending ? <span className="loading loading-spinner" /> : <SaveIcon className="size-4" />}
    </button>
  </div>
  {updatePhone.isSuccess && (
    <p className="text-success text-sm mt-1">Phone number saved! ✓</p>
  )}
</div>
        </div>
      </div>

      {/* Stats */}
      <div className="stats bg-base-300 w-full">
        <div className="stat">
          <div className="stat-title">Total Products</div>
          <div className="stat-value text-primary">{products?.length || 0}</div>
        </div>
      </div>

      {/* Products */}
      {products && products.length === 0 ? (
        <div className="card bg-base-300">
          <div className="card-body items-center text-center py-16">
            <PackageIcon className="size-16 text-base-content/20" />
            <h3 className="card-title text-base-content/50">No products yet</h3>
            <p className="text-base-content/40 text-sm">Start by creating your first product</p>
            <Link to="/create" className="btn btn-primary btn-sm mt-4">
              Create Product
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-4">
          {products.map((product) => (
            <div key={product.id} className="card card-side bg-base-300">
              <figure className="w-32 shrink-0">
                <img src={product.imageUrl} alt={product.title} className="h-full object-cover" />
              </figure>
              <div className="card-body p-4">
                <h2 className="card-title text-base">{product.title}</h2>
                <p className="text-sm text-base-content/60 line-clamp-1">{product.description}</p>
                <div className="card-actions justify-end mt-2">
                  <button
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="btn btn-ghost btn-xs gap-1"
                  >
                    <EyeIcon className="size-3" /> View
                  </button>
                  <button
                    onClick={() => navigate(`/edit/${product.id}`)}
                    className="btn btn-ghost btn-xs gap-1"
                  >
                    <EditIcon className="size-3" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="btn btn-ghost btn-xs text-error gap-1"
                    disabled={deleteProduct.isPending}
                  >
                    <Trash2Icon className="size-3" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;


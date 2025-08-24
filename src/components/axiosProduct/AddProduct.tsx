// import React, { useState } from 'react'
// import { NewProduct } from '../../types/productType';
// import api from '../../app/api/api';


// interface Props {
//     onCreated:() => void;

// }
// const AddProduct:React.FC<Props> = ({onCreated}) => {
//     const [form,setForm]=useState<NewProduct>({
//         productName:"",
//         price:"",
//     });
//     const [loading,setLoading]=useState(false);
//     const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>
//     setForm({...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       /* 
//         Axios automatically stringifies objects and sets Content-Type application/json
//         So we can pass `form` directly.
//       */
//       const createRes = await api.post<{ id: number }>("/products", form);
//       console.log("Create response (API may return only id):", createRes.data);

//       // Many teaching APIs only return { id }, so we fetch the full created resource
//       const newId = createRes.data.id;
//       if (newId) {
//         const fullRes = await api.get(`/products/${newId}`);
//         console.log("Full user fetched after create:", fullRes.data);
//       }

//       // Tell parent to refresh the list
//       onCreated();

//       // Reset form
//       setForm({ productName: "", price: "" });

//       // Feedback for students (in production use toasts instead of alert)
//       alert("product created successfully");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to save product");
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <div>
//       <h2>Add product</h2>
//       <form action="">
//           <input type="text"
//           name='productName'
//           value={form.productName}
//           placeholder='product name'
//           className='w-full border p-2 rounded'
//           />
//           <input type="text"
//           name='price'
//           value={form.price}
//           placeholder='product price'
//           className='w-full border p-2 rounded'
//           />
//           <button 
//           type='submit'
//           className='bg-gray-600 px-4 py-2 rounded'
//           disabled={loading}
//           >
//             {loading? "Adding...":"Add product"}
//           </button>
//       </form>
      
//     </div>
//   )
// }

// export default AddProduct

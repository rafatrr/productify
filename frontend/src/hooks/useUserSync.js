
import { useAuth, useUser } from "@clerk/clerk-react";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { syncUser } from "../lib/api";

function useUserSync() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  // user = {
  //   id: "user_...",
  //   primaryEmailAddress: { emailAddress: "user@example.com" },
  //   fullName: "John Doe",
  //   imageUrl: "https://..."
  // }

  const { mutate: syncUserMutation, isPending, isSuccess } = useMutation({ mutationFn: syncUser });
  useEffect(() => {
    if (isSignedIn && user && !isPending && !isSuccess) {
      syncUserMutation({
        email: user.primaryEmailAddress?.emailAddress,
        name: user.fullName || user.firstName,
        imageUrl: user.imageUrl,
      });
    }
  }, [isSignedIn, user, syncUserMutation, isPending, isSuccess]);

  return { isSynced: isSuccess };
}
export default useUserSync;












// import { syncUser } from "../lip/api";
// import { useEffect } from "react";
// import { useUser, useAuth} from '@clerk/clerk-react';
// import {useMutation} from '@tanstack/react-query';
// const useUserSync = () => {
//     const { isSignedIn } = useAuth();
//     const { user } = useUser() ;
//     const { mutate: syncUserMutation ,isPending, isSuccess } = useMutation({ 
//         mutationFn: syncUser});

//         useEffect(() => {
//             if(isSignedIn && !isPending && !isSuccess){

//                 syncUserMutation({
//                     email: user.primaryEmailAddress.emailAddress,
//                     name: user.fullName || user.firstName,
//                     imageUrl: user.imageUrl,
//                 });
//             }  
//         },[isSignedIn, user, syncUserMutation,isPending,isSuccess])
//  return{isSignedIn: isSuccess};
// }
// export default useUserSync;

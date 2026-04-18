
import { useAuth, useUser } from "@clerk/clerk-react";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { syncUser, updatePhoneNumber } from "../lib/api";
import { useQueryClient } from "@tanstack/react-query";

function useUserSync() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();

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



export function useUpdatePhone() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updatePhoneNumber,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      console.error("Phone update error:", error.response?.data);
      console.error("Status:", error.response?.status);
    },
  });
}









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

import React from "react";

export interface UserDetailsType {
  userDetails: {
    userName: string;
    id: number;
    firstName: string;
    lastName: string;
    role: string | null;
  };
  setUserDetails: ({ }) => void

}

export const UserContext = React.createContext<UserDetailsType>({
  userDetails: {
    userName: "",
    id: 0,
    firstName: "",
    lastName: "",
    role: null
  }, setUserDetails: ({ }) => { },
});

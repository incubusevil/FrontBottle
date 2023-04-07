import * as React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import Switch from '@mui/material/Switch';
import Avatar from '@mui/material/Avatar';
import FormControlLabel from '@mui/material/FormControlLabel';
import {EditUser} from "./EditUser";

export const UserRow = ({ user }) => {
  const [accountStatus, setAccountStatus] = React.useState(user.accountStatus);
  const [accountStatusBool, setAccountStatusBool] = React.useState(user.accountStatus === "ACTIVE");

  const changeStatus = (e) =>{
    const email = user.email;
    const savedToken = localStorage.getItem('token');
    console.log(email, accountStatus);
    axios.get("http://localhost:8080/rest/api/user/setNewAccountStatus", {
        headers: {
            Authorization: `Bearer ${savedToken}`,
          },
      params: { email, accountStatus },
    });
    console.log(e)
        if(e === true){
            setAccountStatus("ACTIVE")

        }
        else{
            setAccountStatus("INACTIVE")

        }

  }

  return (
    <TableRow hover role="checkbox" tabIndex={-1}>
        <TableCell><Avatar
                        src={user.profilePhotoPath}
                        style={{
                          margin: "10px",
                          width: "60px",
                          height: "60px",
                        }}
                      /></TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.firstName}</TableCell>
      <TableCell>{user.lastName}</TableCell>
      <TableCell>{user.address}</TableCell>
      <TableCell>{user.phoneNumber}</TableCell>
      <TableCell>{user.company}</TableCell>
      <TableCell>
      <FormControlLabel control={<Switch defaultChecked = {accountStatusBool}  onChange={(e) => changeStatus(e.target.checked)} />} label= {accountStatus} />
      </TableCell>
      <TableCell>
        <EditUser user={user}/>
      </TableCell>
    </TableRow>
  );
};

import {  Grid, Typography } from "@mui/material";
import AdminTables from "../components/AdminTable";

const AdminDashboard = () => {

   return <>
    <Grid container  justifyContent='center' >
    <Grid item sm={10}>
    <Typography style={{marginTop:'20px'}} align="center" variant="h4">APPROVE COVID DATA OF ALL STATES </Typography>
        <hr />      
      <AdminTables/>
      </Grid>
    </Grid>
  </>;
};

export default AdminDashboard;

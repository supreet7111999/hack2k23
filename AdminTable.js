import  React , {useState, useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Button, Alert} from '@mui/material'
import {approveStateCovidData, getStateCovidDataForAdmin} from '../services/api.js'
import { getToken } from '../services/LocalStorageService.js';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));




export default function AdminTables({searchState}) {

    const [error, setError] = useState({
    status: false,
    msg: "",
    type: ""
  })
  const [data, setData] = useState([]);
  const [sort, setSort] = useState('asc');

  const token = getToken()

    
  const getData=async()=>{
    const res = await getStateCovidDataForAdmin(token,searchState, sort);
    if(res.data.status==='success'){
      console.log(res.data);
      setData(res.data.data);
   
      setError({ status: true, msg: res.data.message , type: 'success' })
    }
    else{
      setError({ status: true, msg: res.data.message , type: 'error' })

    }
}

useEffect(() => {
  getData();
},[searchState, sort])

const calculatDate = (Isodate)=>{
  var date = new Date(Isodate);
  var year = date.getFullYear();
  var month = date.getMonth()+1;
  var dt = date.getDate();
  
  if (dt < 10) {
    dt = '0' + dt;
  }
  if (month < 10) {
    month = '0' + month;
  }
  return (year+'-' + month + '-'+dt);
    
}

const approveData = async(id)=>{

  // console.log(id," id and token" ,token);
 const res = await approveStateCovidData(id, token);

 if(res.data.status==='success'){
   setError({ status: true, msg: res.data.message , type: 'success' })
     setTimeout(()=>{
       getData();
     },500); 
}
else{
  setError({ status: true, msg: res.data.message , type: 'error' })

}

}


    return (

    <TableContainer component={Paper} >
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>State <ArrowUpwardIcon onClick={()=>setSort('asc')}/> <ArrowDownwardIcon onClick={()=>setSort('desc')}/> </StyledTableCell>
            <StyledTableCell align="right">Total Cases</StyledTableCell>
            <StyledTableCell align="right">Recovered</StyledTableCell>
            <StyledTableCell align="right">Active Cases</StyledTableCell>
            <StyledTableCell align="right">Death</StyledTableCell>
            <StyledTableCell align="right">Vaccinated</StyledTableCell>
            <StyledTableCell align="right">Created On</StyledTableCell>
            <StyledTableCell align="right">Approved On</StyledTableCell>
            <StyledTableCell align="right">Approval Link</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((data) => (
            <StyledTableRow key={data._id}>
              <StyledTableCell component="th" scope="row">
                {data.state}
              </StyledTableCell>
              <StyledTableCell align="right">{data.totalcases}</StyledTableCell>
              <StyledTableCell align="right">{data.recovered}</StyledTableCell>
              <StyledTableCell align="right">{data.activecases}</StyledTableCell>
              <StyledTableCell align="right">{data.death}</StyledTableCell>
              <StyledTableCell align="right">{data.vaccinated}</StyledTableCell>
              <StyledTableCell align="right">{calculatDate(data.createdon)}</StyledTableCell>
            {data.isapproved ?  <StyledTableCell align="right">{calculatDate(data.dateapproved)}</StyledTableCell>: <StyledTableCell align='right'>Not Approved</StyledTableCell> }
             {data.isapproved ?<StyledTableCell align="right">Already Approved</StyledTableCell>: <StyledTableCell onClick={()=>approveData(data._id)} align="right"><Button >Approve</Button></StyledTableCell>}

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>

      {error.status  && error.type==='error' && <Alert onClose={()=>{setError({status:false})}} severity={error.type} sx={{ mt: 3 }}>{error.msg}</Alert> }

    </TableContainer>
  );
}
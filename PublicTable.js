import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Alert} from '@mui/material'
import { useEffect, useState } from 'react';
import {getStateCovidDataForPublic} from '../services/api.js'
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


export default function PublicTables({searchState}) {

  
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: ""
  })
  const [data, setData] = useState([]);
  const [sort, setSort] = useState('asc');

  const getData=async()=>{

    const res = await getStateCovidDataForPublic(searchState, sort);

    if(res.data.status==='success'){

      setData(res.data.data);

      setError({ status: true, msg: res.data.message , type: 'success' })
    }
    else{
      setError({ status: true, msg: res.data.message , type: 'error' })

    }
}

const calculateTotalcases = ()=>{
    
   let totalcasesofallstates= 0;
  data.map((data)=>{
    totalcasesofallstates += data.Total;
  })
  return totalcasesofallstates;

}


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

useEffect(() => {
  getData();
}, [searchState, sort])



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
            <StyledTableCell align="right">Last Updated On</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((data) => (
            <StyledTableRow key={data._id.State}>
              <StyledTableCell component="th" scope="row">
                {data._id.State}
              </StyledTableCell>
              <StyledTableCell align="right">{data.Total}</StyledTableCell>
              <StyledTableCell align="right">{data.Recovered}</StyledTableCell>
              <StyledTableCell align="right">{data.Active}</StyledTableCell>
              <StyledTableCell align="right">{data.Death}</StyledTableCell>
              <StyledTableCell align="right">{data.Vaccinated}</StyledTableCell>
              <StyledTableCell align="right">{calculatDate(data.LastUpdated)}</StyledTableCell>
            </StyledTableRow>
          ))}
        <StyledTableRow ><StyledTableCell >Total Cases of All States {calculateTotalcases()} </StyledTableCell></StyledTableRow>
        </TableBody>
      </Table>
      {error.status  && error.type==='error' && <Alert onClose={()=>{setError({status:false})}} severity={error.type} sx={{ mt: 3 }}>{error.msg}</Alert> }

    </TableContainer>
  );
}
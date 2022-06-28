/* eslint-disable react-hooks/exhaustive-deps */
import React,{useEffect,useState} from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import { MenuContext } from "../../../dashboard";
import BasicSelect from '../../StatusSelect';
import Spinner from '../../Spinner';
import moment from 'moment'
moment.locale("fr")

function createData(_id,date, description, status,messageAdmin) {
    return {
        _id,
        date,
        description,
        status,
        messageAdmin
    };
}



function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }
  const headCells = [
    {
      id: 'date',
      numeric: false,
      disablePadding: true,
      label: 'date',
    },
    {
      id: 'description',
      numeric: false,
      disablePadding: true,
      label: 'description',
    },
    {
      id: 'status',
      numeric: true,
      disablePadding: true,
      label: 'status',
    },
    
    {
      id: 'message',
      numeric: false,
      disablePadding: true,
      label: 'message',
    },
    {
      id: 'modifier',
      numeric: true,
      disablePadding: true,
      label: "modifier",
    },
      
    {
    id: 'supprimer',
    numeric: true,
    disablePadding: true,
    label: "supprimer",
    }
  ];

  function EnhancedTableHead(props) {
    const {  order, orderBy, onRequestSort } =
      props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'center' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
  
  EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };
  
 
  
  export default function IncidentsAdminTable({incidentUpdated,setIncidentUpdated,setIncidentToDelete,setIncidentToModify}) {

    const context=React.useContext(MenuContext)

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('date');
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);
    const [rows,setRows]=React.useState([])
    const [isLoaded, setIsLoaded] = useState(false);
  
    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  

    useEffect(() => {
        let incidentArray=[]
        setRows([])
        const user= JSON.parse(localStorage.getItem("user")||'')
        const token="Bearer " + user.token
        const headers = {
          "content-type": "application/json",
            "Authorization": token,
        };
        
        const requestOptions = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ 
                query:` {
                incidents{
                    _id
                    date
                    description
                    status
                    messageAdmin
                    
                }
                }`
            })
        };
        fetch('http://localhost:4000/graphql', requestOptions)
        .then(response => response.json())
        .then(response=>response.data.incidents.map(incident=>incidentArray.push(createData(incident._id,incident.date,incident.description,incident.status,incident.messageAdmin))))
        .then(r=>setRows(incidentArray))
        .then(r=>setIncidentUpdated(false))
        .then(()=>setIsLoaded(true))
        .catch(error=>console.log(error))
  }, [incidentUpdated])
  

    function handleDeleteIncident(_id){
     setIncidentToDelete({_id:_id})
  }

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  
    return (
      <Box sx={{ width: '100%' }}className="table">
        <Paper sx={{ width: '100%', mb: 2 }}>
         {isLoaded ? <TableContainer>
            <Table
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
            >
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
            />
       
              <TableBody>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                   rows.slice().sort(getComparator(order, orderBy)) */}
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;
  
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row._id}
                      >
                        <TableCell align="left"> {moment(row.date).format("Do/MM/YYYY")}

</TableCell>

                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {row.description}
                        </TableCell>
                        <TableCell  align="center"><BasicSelect type={"incidents"} status={row.status}id={row._id}/></TableCell>
                        <TableCell  align="center">{row.messageAdmin}</TableCell>
                        <TableCell onClick={()=>setIncidentToModify({_id:row._id,message:row.messageAdmin,description:row.description})} align="center"><i className="fa-solid fa-gear"></i></TableCell>

                        <TableCell onClick={()=>handleDeleteIncident(row._id)} align="center"><i className="fa-solid fa-xmark fa-2xl"></i></TableCell>

                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>:<Spinner />}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    );
  }
  

/* eslint-disable react-hooks/exhaustive-deps */
import React,{useEffect,useContext} from 'react';
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



function createData(_id,date,name, type, recette, depense) {
    return {
        _id,
        date,
        name,
        type,
        recette,
        depense
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
      id: 'name',
      numeric: false,
      disablePadding: false,
      label: 'name',
    },
    {
      id: 'email',
      numeric: false,
      disablePadding: false,
      label: 'email',
    },
    {
      id: 'lot',
      numeric: false,
      disablePadding: false,
      label: 'lot',
    },
    {
      id: 'millieme',
      numeric: false,
      disablePadding: false,
      label: 'millieme',
    },
    {
        id: 'modifier',
        numeric: true,
        disablePadding: false,
        label: "modifier",
    },
    {
      id: 'supprimer',
      numeric: true,
      disablePadding: false,
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
  
 
  
  export default function UsersTable({operationUpdated,setOperationUpdated,setOperationToDelete,setOperationToModify}) {

    const context=React.useContext(MenuContext)

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('date');
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);
    const [rows,setRows]=React.useState([])
  
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
  
    //let rows = []

    useEffect(() => {
        let operationArray=[]
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
                users{
                    _id
                    name
                    email
                    lot
                    millieme
                }
                }`
            })
        };
        fetch('http://localhost:4000/graphql', requestOptions)
        .then(response => response.json())
        .then(response=>response.data.users.map(operation=>operationArray.push(createData(operation._id,operation.date,operation.name,operation.type,operation.recette,operation.depense))))
        .then(r=>setRows(operationArray))
        .then(r=>setOperationUpdated(false))
        .catch(error=>console.log(error))
  }, [operationUpdated])
  
    function handleModifyOperation(_id,name,date,type,recette,depense){
      setOperationToModify({_id:_id,name:name,date:date,type:type,recette:recette,depense:depense})
    }


    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  
    return (
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer>
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
                        <TableCell align="left">{row.date}</TableCell>

                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                        >
                          {row.name}
                        </TableCell>
                        <TableCell align="left">{row.type}</TableCell>
                        <TableCell align="left">{row.recette}</TableCell>
                        <TableCell align="left">{row.depense}</TableCell>
                        <TableCell onClick={()=>handleModifyOperation(row._id,row.name,row.tyoe,row.date,row.recette,row.depense)} align="center"><i className="fa-solid fa-user-pen"></i></TableCell>
                        <TableCell onClick={()=>setOperationToDelete({_id:row._id})} align="center"><i className="fa-solid fa-user-slash"></i></TableCell>

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
          </TableContainer>
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
  

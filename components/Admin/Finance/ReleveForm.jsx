/* eslint-disable react-hooks/exhaustive-deps */
import React,{useEffect} from 'react';
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
import moment from 'moment'
moment.locale("fr")



function createData(_id,date, description, type, recette,depense) {
    return {
        _id,
        date,
        description,
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
      id: 'date',
      numeric: false,
      disablePadding: false,
      label: 'date',
    },
    {
      id: 'description',
      numeric: false,
      disablePadding: false,
      label: 'description',
    },
    {
      id: 'type',
      numeric: false,
      disablePadding: false,
      label: 'type',
    },
    {
      id: 'recette',
      numeric: false,
      disablePadding: false,
      label: 'recette',
    },
    {
        id: 'depense',
        numeric: false,
        disablePadding: false,
        label: 'depense',
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
  
 
  
  export default function ReleveForm({setReleveCreated,setDeleteReleve,setModifyReleve,releveData}) {


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
        if(releveData){    
            let releveArray=[]
            setRows([])

            releveData.map(releve=>releveArray.push(createData(releve._id,releve.date,releve.description,releve.type,releve.recette,releve.depense)))
            setRows(releveArray)
            setReleveCreated(false)
        }
     
  }, [releveData])
  
    function handleModifyReleve(_id,date,description,type,recette,depense){
        setModifyReleve({_id:_id,date:date,description:description,type:type,recette:recette,depense:depense})
    }


    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
      const euro = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2
      });
    return (
        <Paper className="container" sx={{ width: '100%', mb: 2 }}>
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
                        key={row.id}
                      >
                     <TableCell
                          component="th"
                          scope="row"
                        >
                          {moment(row.date).format("Do/MM")}
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                        >
                          {row.description}
                        </TableCell>
                        <TableCell align="left">{row.type}</TableCell>
                        <TableCell align="left">{euro.format(row.recette)}</TableCell>
                        <TableCell align="left">{euro.format(row.depense)}</TableCell>
                        <TableCell onClick={()=>handleModifyReleve(row._id,row.date,row.description,row.type,row.recette,row.depense)} align="center"><i className="fa-solid fa-gear"></i></TableCell>
                        <TableCell onClick={()=>setDeleteReleve({_id:row._id})} align="center"><i className="fa-solid fa-xmark fa-2xl"></i></TableCell>

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
    );
  }
  

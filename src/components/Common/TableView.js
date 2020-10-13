import React , {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class TableView extends Component{
    render(){
        const {rows, columns} = this.props;
        return(
            <Paper>
                <Table>
                    <TableHead>
                        {columns ?
                            columns.map((col, i)=>{
                                return(
                                    <TableCell key={i}>{col.lable}</TableCell>
                                )
                            })
                            
                        : null}
                    </TableHead>
                    <TableBody>
                        {rows ?
                            rows.map((row, i)=>{
                                return columns.map((col, colIndex)=>{
                                    return(
                                        <TableCell>
                                            {row[col.name]}
                                        </TableCell>
                                )
                                })
                                
                            })
                        :null}
                    </TableBody>
                </Table>
            </Paper>
        )
    }
}


export default TableView;
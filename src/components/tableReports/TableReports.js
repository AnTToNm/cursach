import React, {useState, useEffect} from 'react';
import {TableWrapper, Table, TD, TH, TR, Str, ButtonStr} from './TableReports.style';
import {FaSort, FaSortUp, FaSortDown} from 'react-icons/fa';

const TableReports = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sortColumn, setSortColumn] = useState('data');
    const [sortDirection, setSortDirection] = useState('desc');

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:3001/cattle-report?page=${page}&limit=10&column=${sortColumn}&direction=${sortDirection}`);
            const {results, total_pages} = await response.json();
            setData(results);
            setTotalPages(total_pages);
        };
        fetchData();
    }, [page, sortColumn, sortDirection]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleSort = (column) => {
        if (sortColumn === column) {
            // If the same column was clicked again, toggle the sort direction
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            // Otherwise, sort by the new column in ascending order
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const getSortIcon = (column) => {
        if (sortColumn === column) {
            return sortDirection === 'asc' ? <FaSortUp/> : <FaSortDown/>;
        } else {
            return <FaSort/>;
        }
    };

    return (
        <TableWrapper>
            <Table>
                <thead>
                <TR>
                    <TH onClick={() => handleSort('number')}>
                        Код животного {getSortIcon('number')}
                    </TH>
                    <TH onClick={() => handleSort('data')}>
                        Дата {getSortIcon('data')}
                    </TH>
                    <TH onClick={() => handleSort('event')}>
                        Событие {getSortIcon('event')}
                    </TH>
                    <TH onClick={() => handleSort('animal')}>
                        Животное {getSortIcon('animal')}
                    </TH>
                    <TH onClick={() => handleSort('typeAnimal')}>
                        Вид {getSortIcon('typeAnimal')}
                    </TH>
                    <TH onClick={() => handleSort('quantity')}>
                        Количество {getSortIcon('quantity')}
                    </TH>
                    <TH onClick={() => handleSort('measurement')}>
                        Единица измерения {getSortIcon('measurement')}
                    </TH>
                    <TH onClick={() => handleSort('weight')}>
                        Масса {getSortIcon('weight')}
                    </TH>
                    <TH onClick={() => handleSort('note')}>
                        Примечание {getSortIcon('note')}
                    </TH>
                </TR>
                </thead>
                <tbody>
                {data
                    .sort((a, b) => {
                        if (sortColumn) {
                            const columnA = a[sortColumn];
                            const columnB = b[sortColumn];
                            if (columnA < columnB) return sortDirection === 'asc' ? -1 : 1;
                            if (columnA > columnB) return sortDirection === 'asc' ? 1 : -1;
                        }
                        return 0;
                    })
                    .map((item) => (
                        <TR key={item.id}>
                            <TD>{item.number}</TD>
                            <TD>{new Date(item.data).toLocaleString()}</TD>
                            <TD>{item.event}</TD>
                            <TD>{item.animal}</TD>
                            <TD>{item.typeAnimal}</TD>
                            <TD>{item.quantity}</TD>
                            <TD>{item.measurement}</TD>
                            <TD>{item.weight}</TD>
                            <TD>{item.note}</TD>
                        </TR>
                    ))}
                </tbody>
            </Table>
            <Str>
                <p>
                    Page {page} of {totalPages}
                </p>
                {page > 1 && (
                    <ButtonStr onClick={() => handlePageChange(page - 1)}>Prev</ButtonStr>
                )}
                {page < totalPages && (
                    <ButtonStr onClick={() => handlePageChange(page + 1)}>Next</ButtonStr>
                )}
            </Str>
        </TableWrapper>
    );
};

export default TableReports;

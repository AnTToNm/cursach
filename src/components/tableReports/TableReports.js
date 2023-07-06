import React, { useState, useEffect } from 'react';
import { TableWrapper, Table, TD, TH, TR, Str, ButtonStr, Modal, ModalContent } from './TableReports.style';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

const TableReports = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sortColumn, setSortColumn] = useState('data');
    const [sortDirection, setSortDirection] = useState('desc');
    const [editItemId, setEditItemId] = useState(null);
    const [editedValues, setEditedValues] = useState({});
    const [showModal, setShowModal] = useState(false);

    const fetchData = async () => {
        const response = await fetch(`http://localhost:3001/cattle-report?page=${page}&limit=10&column=${sortColumn}&direction=${sortDirection}`);
        const { results, total_pages } = await response.json();
        setData(results);
        setTotalPages(total_pages);
    };

    useEffect(() => {
        fetchData();
    }, [page, sortColumn, sortDirection]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const getSortIcon = (column) => {
        if (sortColumn === column) {
            return sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />;
        } else {
            return <FaSort />;
        }
    };

    const handleDelete = async (id) => {
        await fetch(`http://localhost:3001/cattle-report/${id}`, {
            method: 'DELETE',
        });
        // После удаления обновляем данные
        fetchData();
    };

    const handleUpdate = async (id, newData) => {
        await fetch(`http://localhost:3001/cattle-report/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newData),
        });
        // После обновления обновляем данные
        fetchData();
    };

    const handleEdit = (id) => {
        const itemToEdit = data.find(item => item.id === id);
        setEditItemId(id);
        setEditedValues(itemToEdit);
        setShowModal(true);
    };

    const handleSave = (id) => {
        handleUpdate(id, editedValues);
        setEditItemId(null);
        setEditedValues({});
        setShowModal(false);
    };

    const handleCancel = () => {
        setEditItemId(null);
        setEditedValues({});
        setShowModal(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedValues((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <TableWrapper>
            <h2 style={{ display: 'flex', justifyContent: 'center' }}>Таблица Изменений</h2>
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
                    <TH onClick={() => handleSort('quantity')}>
                        Количество {getSortIcon('quantity')}
                    </TH>
                    <TH onClick={() => handleSort('weight')}>
                        Масса {getSortIcon('weight')}
                    </TH>
                    <TH onClick={() => handleSort('note')}>
                        Примечание {getSortIcon('note')}
                    </TH>
                    <TH>Действия</TH>
                </TR>
                </thead>
                <tbody>
                {data.map((item) => (
                    <TR key={item.id}>
                        <TD>{item.number}</TD>
                        <TD>{new Date(item.data).toLocaleString()}</TD>
                        <TD>{item.event}</TD>
                        <TD>{item.animal}</TD>
                        <TD>{item.quantity}</TD>
                        <TD>{item.weight}</TD>
                        <TD>{item.note}</TD>
                        <TD>
                            {editItemId === item.id ? (
                                <>
                                    <ButtonStr
                                        style={{ marginRight: '5px' }}
                                        onClick={() => handleSave(item.id)}
                                    >
                                        Сохранить
                                    </ButtonStr>
                                    <ButtonStr onClick={handleCancel}>Отмена</ButtonStr>
                                </>
                            ) : (
                                <ButtonStr
                                    style={{ marginRight: 'auto', marginLeft: 'auto', marginBottom: 'auto', padding: '5px 10px' }}
                                    onClick={() => handleEdit(item.id)}>Редактировать
                                </ButtonStr>
                            )}
                        </TD>
                        <TD>
                            <ButtonStr
                                style={{ marginRight: 'auto', marginLeft: 'auto', marginBottom: 'auto', padding: '5px 10px' }}
                                onClick={() => handleDelete(item.id)}
                            >
                                Удалить
                            </ButtonStr>
                        </TD>
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

            {showModal && (
                <Modal>
                    <ModalContent>
                        <h3>Редактировать элемент</h3>
                        <form>
                            <input
                                type="text"
                                name="number"
                                value={editedValues.number || ''}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="data"
                                value={editedValues.data || ''}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="event"
                                value={editedValues.event || ''}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="animal"
                                value={editedValues.animal || ''}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="weight"
                                value={editedValues.weight || ''}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="note"
                                value={editedValues.note || ''}
                                onChange={handleInputChange}
                            />
                        </form>
                        <div style={{marginTop: '1%'}}>
                            <ButtonStr onClick={() => handleSave(editItemId)}>Сохранить</ButtonStr>
                            <ButtonStr onClick={handleCancel}>Отмена</ButtonStr>
                        </div>
                    </ModalContent>
                </Modal>
            )}
        </TableWrapper>
    );
};

export default TableReports;

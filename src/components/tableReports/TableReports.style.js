import styled from 'styled-components';

export const TableWrapper = styled.div`
  overflow-x: auto;
  max-width: 100%;
`;

export const Table = styled.table`
  border-collapse: collapse;
  width: 85vw;
  margin-left: 7.5vw;
  margin-top: 2vw;
  table-layout: fixed;
`;

export const TH = styled.th`
  font-weight: bold;
  padding: 0.5rem;
  text-align: left;
`;

export const TD = styled.td`
  border: 1px solid #ddd;
  padding: 0.5rem;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TR = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

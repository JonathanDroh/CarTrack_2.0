import "../styles/Table.css";

function DataTable({ columns, data, actions, renderCell }) {
    return (
        <div className="table-container">
            <table className="data-table">
                <thead>
                    <tr>
                        {columns.map((col, index) => (
                            <th key={index}>{col}</th>
                        ))}
                        <th className="empty-column"></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map((col, colIndex) => (
                                <td key={colIndex}>
                                    {renderCell ? renderCell(col, row) : row[col.toLowerCase()]}
                                </td>
                            ))}
                            <td className="delete-column">
                                {actions.map((ActionComponent, actionIndex) => (
                                    <ActionComponent key={actionIndex} rowData={row} />
                                ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DataTable;

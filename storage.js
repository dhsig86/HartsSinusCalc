export function saveTableData(tableData) {
  localStorage.setItem('tableData', JSON.stringify(tableData));
}

export function getTableData() {
  const data = localStorage.getItem('tableData');
  return JSON.parse(data) || [];
}

export function addTableData(symptomsChecked, guidelineUsed, result) {
  const tableData = getTableData();
  const newRow = [guidelineUsed.name].concat(symptomsChecked).concat(result);
  tableData.push(newRow);
  saveTableData(tableData);
}

export function clearTableData() {
  localStorage.removeItem('tableData');
}

export function displayTableData() {
  const tableData = getTableData();
  const tableContainer = document.getElementById('tableContainer');
  const table = document.createElement('table');
  table.classList.add('data-table');

  tableData.forEach(rowData => {
    const dataRow = document.createElement('tr');
    rowData.forEach(cellData => {
      const cell = document.createElement('td');
      cell.textContent = cellData;
      dataRow.appendChild(cell);
    });
    table.appendChild(dataRow);
  });

  tableContainer.innerHTML = '';
  tableContainer.appendChild(table);
}

export function clearTable() {
  document.getElementById('tableContainer').innerHTML = '';
  clearTableData();
}

import { EPOS, AAO_HNSF } from './guidelines.js';
import { addTableData, displayTableData, clearTable } from './storage.js';

let isCtrlPressed = false;
let isSPressed = false;
let isWPressed = false;
let lastSelectedGuideline = null;

function checkShortcut(event) {
  if (event.ctrlKey) {
    isCtrlPressed = true;
  }
  if (event.key === 's') {
    isSPressed = true;
  }
  if (event.key === 'w') {
    isWPressed = true;
  }
  if (isCtrlPressed && isSPressed && isWPressed) {
    createTable(getCheckedSymptoms(), lastSelectedGuideline, document.getElementById('result').textContent);
  }
}

function resetShortcutState() {
  isCtrlPressed = false;
  isSPressed = false;
  isWPressed = false;
}

document.addEventListener('keydown', checkShortcut);
document.addEventListener('keyup', resetShortcutState);

document.addEventListener('DOMContentLoaded', () => {
  displayTableData();
});

function generateSymptomsCheckboxes(guideline) {
  const symptomsDiv = document.getElementById('symptoms');
  symptomsDiv.innerHTML = '';
  guideline.symptoms.forEach(symptom => {
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    const span = document.createElement('span');
    span.textContent = symptom;
    label.appendChild(checkbox);
    label.appendChild(span);
    symptomsDiv.appendChild(label);
  });
  const guidelineInfoDiv = document.getElementById('guideline-info');
  guidelineInfoDiv.textContent = `Diretriz: ${guideline.description} (${guideline.name}), Referência: ${guideline.reference}`;
}

document.getElementById('EPOS').addEventListener('click', () => {
  lastSelectedGuideline = EPOS;
  generateSymptomsCheckboxes(EPOS);
});

document.getElementById('AAO-HNSF').addEventListener('click', () => {
  lastSelectedGuideline = AAO_HNSF;
  generateSymptomsCheckboxes(AAO_HNSF);
});

document.getElementById('calculate').addEventListener('click', () => {
  const symptomsChecked = getCheckedSymptoms();
  let result;
  if (lastSelectedGuideline === EPOS) {
    result = EPOS.calculateChance(symptomsChecked);
  } else if (lastSelectedGuideline === AAO_HNSF) {
    result = AAO_HNSF.calculateChance(symptomsChecked);
  }
  displayResult(result);
  document.getElementById('alert').style.display = 'block';
  createTable(symptomsChecked, lastSelectedGuideline, result);
});

document.getElementById('tableInsert').addEventListener('click', () => {
  const symptomsChecked = getCheckedSymptoms();
  const guidelineUsed = lastSelectedGuideline;
  const result = document.getElementById('result').textContent;
  addTableData(symptomsChecked, guidelineUsed, result);
  displayTableData();
});

document.getElementById('resetButton').addEventListener('click', () => {
  resetCalculation();
  resetGuidelineSelection();
});

window.addEventListener('DOMContentLoaded', () => {
  displayTableData();
});

window.addEventListener('keydown', event => {
  if (event.ctrlKey && event.altKey && event.key.toLowerCase() === 't') {
    document.getElementById('tableContainer').style.display = '';
  }
});

function getCheckedSymptoms() {
  const checkboxes = document.querySelectorAll('#symptoms input[type="checkbox"]');
  const checkedSymptoms = [];
  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      const symptomText = checkbox.nextElementSibling.textContent.trim();
      checkedSymptoms.push(symptomText);
    }
  });
  return checkedSymptoms;
}

function displayResult(probability) {
  const resultElement = document.getElementById('result');
  let comment = '';
  if (typeof probability !== 'undefined') {
    if (probability < 33) {
      resultElement.style.color = 'green';
      comment = 'Baixa probabilidade de sinusite bacteriana';
    } else if (probability < 66) {
      resultElement.style.color = 'orange';
      comment = 'Média probabilidade de sinusite bacteriana';
    } else {
      resultElement.style.color = 'red';
      comment = 'Alta probabilidade de sinusite bacteriana';
    }
    resultElement.textContent = `${comment}: ${probability.toFixed(2)}%`;
  }
}

function createTable(symptomsChecked, guidelineUsed, result) {
  const tableContainer = document.getElementById('tableContainer');
  let table = tableContainer.querySelector('table');
  if (!table) {
    table = document.createElement('table');
    table.classList.add('data-table');
    tableContainer.appendChild(table);

    const headerRow = document.createElement('tr');
    const header1 = document.createElement('th');
    header1.textContent = 'Sintoma';
    headerRow.appendChild(header1);
    symptomsChecked.forEach(symptom => {
      const symptomHeader = document.createElement('th');
      symptomHeader.textContent = symptom;
      headerRow.appendChild(symptomHeader);
    });
    const resultHeader = document.createElement('th');
    resultHeader.textContent = 'Resultado';
    headerRow.appendChild(resultHeader);
    table.appendChild(headerRow);
  }

  const dataRow = document.createElement('tr');
  const guidelineCell = document.createElement('td');
  guidelineCell.textContent = guidelineUsed.name;
  dataRow.appendChild(guidelineCell);
  symptomsChecked.forEach(() => {
    const symptomCell = document.createElement('td');
    symptomCell.textContent = '✔';
    dataRow.appendChild(symptomCell);
  });
  const resultCell = document.createElement('td');
  resultCell.textContent = result;
  dataRow.appendChild(resultCell);
  table.appendChild(dataRow);
}

function resetCalculation() {
  const checkboxes = document.querySelectorAll('#symptoms input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    checkbox.checked = false;
  });
  document.getElementById('result').textContent = '';
  document.getElementById('alert').style.display = 'none';
}

function resetGuidelineSelection() {
  document.getElementById('EPOS').checked = false;
  document.getElementById('AAO-HNSF').checked = false;
  document.getElementById('guideline-info').textContent = '';
  document.getElementById('symptoms').innerHTML = '';
  lastSelectedGuideline = null;
}

export { getCheckedSymptoms, displayResult, createTable, resetCalculation, resetGuidelineSelection, checkShortcut, resetShortcutState };

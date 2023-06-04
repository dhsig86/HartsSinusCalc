document.addEventListener('DOMContentLoaded', (event) => {
    // Coloque seu código JavaScript aqui...
    console.log('DOM fully loaded and parsed');

let lastSelectedGuideline = null;

// Definição das diretrizes
const EPOS = {
    name: "EPOS 2012",
    description: "European Position Paper on Rhinosinusitis and Nasal Polyps 2012",
    reference: "Fokkens WJ, et al. Eur Arch Otorhinolaryngol. 2012",
    symptoms: [
        "Obstrução/congestão nasal",
        "Secreção nasal (anterior ou posterior)",
        "Dor facial / pressão",
        "Redução ou perda do olfato",
        "Febre alta (>38°C) e secreção purulenta nasal",
        "Sintomas graves ou sintomas durando mais de 10 dias"
    ],
    calculateChance: function(symptomsChecked) {
        let chance = 0;
  
        if (symptomsChecked.includes("Sintomas graves ou sintomas durando mais de 10 dias")) {
          chance = 95; // Se tem sintomas graves ou sintomas duram mais de 10 dias, é quase certeza que é sinusite bacteriana
        } else if (symptomsChecked.includes("Febre alta (>38°C) e secreção purulenta nasal")) {
          chance = 75; // Se tem febre alta e secreção purulenta, é alta a chance de ser sinusite bacteriana.
        }  else if (symptomsChecked.length >= 3) {
          chance = 70; // Se tem pelo menos dois sintomas comuns de rinossinusite, é possível que seja sinusite bacteriana
          
        } else if (symptomsChecked.length >= 2) {
          chance = 50; // Se tem pelo menos dois sintomas comuns de rinossinusite, é possível que seja sinusite bacteriana
        }
          else if (symptomsChecked.length >= 1) {
          chance = 25; // Se tem pelo menos dois sintomas comuns de rinossinusite, é possível que seja sinusite bacteriana
        }  
  
        return chance;
    }
  };
  const AAO_HNSF = {
    name: "AAO-HNSF",
    description: "American Academy of Otolaryngology - Head and Neck Surgery Foundation",
    reference: "Rosenfeld RM, et al. Otolaryngol Head Neck Surg. 2015",
    symptoms: [
        "Dor ou Pressão facial",
        "Obstrução ou Congestão nasal",
        "Secreção nasal ou Gotejamento Posterior",
        "Redução ou Perda de olfato",
        "Temperatura maior que 38°C",
        "Secreção nasal purulenta ou Edema periorbitário",
        "Dor facial intensa ou piora dos sintomas unilateralmente",
        "Piora dos sintomas após o quinto dia ou sintomas persistentes após o décimo dia"
    ],
    calculateChance: function(symptomsChecked) {
        let chance = 0;
  
        if (symptomsChecked.includes("Piora dos sintomas após o quinto dia ou sintomas persistentes após o décimo dia")) {
          chance = 95; // Se os sintomas pioram após o quinto dia ou persistem após o décimo, é quase certeza que é sinusite bacteriana
        } else if (symptomsChecked.includes("Dor facial intensa ou piora dos sintomas unilateralmente")) {
          chance = 85; // Se tem dor facial intensa ou piora dos sintomas de um lado só, é muito alta a chance de ser sinusite bacteriana
        } else if (symptomsChecked.includes("Secreção nasal purulenta ou edema periorbitário")) {
          chance = 70; // Se tem secreção nasal purulenta ou edema ao redor dos olhos, é alta a chance de ser sinusite bacteriana
        } else if (symptomsChecked.length >= 3) {
          chance = 50; // Se tem pelo menos três sintomas comuns de rinossinusite, é possível que seja sinusite bacteriana
        } else if (symptomsChecked.length >= 2) {
          chance = 35; // Se tem pelo menos três sintomas comuns de rinossinusite, é possível que seja sinusite bacteriana
        } else if (symptomsChecked.length >= 1) {
            chance = 20; // Se tem pelo menos três sintomas comuns de rinossinusite, é possível que seja sinusite bacteriana
        }   
  
        return chance;
    }
  };

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
    let symptomsChecked = getCheckedSymptoms();
    let result;
    if (lastSelectedGuideline === EPOS) {
        result = EPOS.calculateChance(symptomsChecked);
    } else if (lastSelectedGuideline === AAO_HNSF) {
        result = AAO_HNSF.calculateChance(symptomsChecked);
    }
  
    displayResult(result);
    document.getElementById('alert').style.display = 'block';

  });
    
  function displayResult(probability) {
    const resultElement = document.getElementById('result');
    let comment = '';
  
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
  
  function getCheckedSymptoms() {
    let checkboxes = document.querySelectorAll('#symptoms input[type="checkbox"]');
    let checkedSymptoms = [];
    checkboxes.forEach(checkbox => {
      if (checkbox.checked) {
        let symptomText = checkbox.nextElementSibling.textContent.trim();
        checkedSymptoms.push(symptomText);
      }
    });
    return checkedSymptoms;
  }
  
  function resetCalculation() {
    let checkboxes = document.querySelectorAll('#symptoms input[type="checkbox"]');
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

  
  
document.getElementById('resetButton').addEventListener('click', () => {
    resetCalculation();
    resetGuidelineSelection();
  });
  
}); 
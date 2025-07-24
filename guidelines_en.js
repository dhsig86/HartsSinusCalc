export const EPOS = {
  name: "EPOS 2012",
  description: "European Position Paper on Rhinosinusitis and Nasal Polyps 2012",
  reference: "Fokkens WJ, et al. Eur Arch Otorhinolaryngol. 2012",
  symptoms: [
    "Nasal obstruction/congestion",
    "Nasal discharge (anterior or posterior)",
    "Facial pain/pressure",
    "Reduced or loss of smell",
    "High fever (>38°C) and purulent nasal discharge",
    "Severe symptoms or symptoms lasting more than 10 days"
  ],
  calculateChance(symptomsChecked) {
    let chance = 0;
    if (symptomsChecked.includes("Severe symptoms or symptoms lasting more than 10 days")) {
      chance = 95;
    } else if (symptomsChecked.includes("High fever (>38°C) and purulent nasal discharge")) {
      chance = 75;
    } else if (symptomsChecked.length >= 3) {
      chance = 70;
    } else if (symptomsChecked.length >= 2) {
      chance = 50;
    } else if (symptomsChecked.length >= 1) {
      chance = 25;
    }
    return chance;
  }
};

export const AAO_HNSF = {
  name: "AAO-HNSF",
  description: "American Academy of Otolaryngology - Head and Neck Surgery Foundation",
  reference: "Rosenfeld RM, et al. Otolaryngol Head Neck Surg. 2015",
  symptoms: [
    "Facial pain or pressure",
    "Nasal obstruction or congestion",
    "Nasal discharge or postnasal drip",
    "Reduced or loss of smell",
    "Temperature higher than 38°C",
    "Purulent nasal discharge or periorbital edema",
    "Severe facial pain or unilateral symptom worsening",
    "Symptom worsening after day five or persistent symptoms after day ten"
  ],
  calculateChance(symptomsChecked) {
    let chance = 0;
    if (symptomsChecked.includes("Symptom worsening after day five or persistent symptoms after day ten")) {
      chance = 95;
    } else if (symptomsChecked.includes("Severe facial pain or unilateral symptom worsening")) {
      chance = 85;
    } else if (symptomsChecked.includes("Purulent nasal discharge or periorbital edema")) {
      chance = 70;
    } else if (symptomsChecked.length >= 3) {
      chance = 50;
    } else if (symptomsChecked.length >= 2) {
      chance = 35;
    } else if (symptomsChecked.length >= 1) {
      chance = 20;
    }
    return chance;
  }
};

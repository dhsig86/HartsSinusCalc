export const EPOS = {
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
  calculateChance(symptomsChecked) {
    let chance = 0;
    if (symptomsChecked.includes("Sintomas graves ou sintomas durando mais de 10 dias")) {
      chance = 95;
    } else if (symptomsChecked.includes("Febre alta (>38°C) e secreção purulenta nasal")) {
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
    "Dor ou Pressão facial",
    "Obstrução ou Congestão nasal",
    "Secreção nasal ou Gotejamento Posterior",
    "Redução ou Perda de olfato",
    "Temperatura maior que 38°C",
    "Secreção nasal purulenta ou Edema periorbitário",
    "Dor facial intensa ou piora dos sintomas unilateralmente",
    "Piora dos sintomas após o quinto dia ou sintomas persistentes após o décimo dia"
  ],
  calculateChance(symptomsChecked) {
    let chance = 0;
    if (symptomsChecked.includes("Piora dos sintomas após o quinto dia ou sintomas persistentes após o décimo dia")) {
      chance = 95;
    } else if (symptomsChecked.includes("Dor facial intensa ou piora dos sintomas unilateralmente")) {
      chance = 85;
    } else if (symptomsChecked.includes("Secreção nasal purulenta ou Edema periorbitário")) {
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

import { Chart } from "chart.js/auto";

let i = 0;

(async function puzzles() {
  const req = new XMLHttpRequest();
  req.addEventListener("load", (evt) => {
    let data = JSON.parse(req.responseText);
    let thirdElementData = data[2].data;
    for (let i = 0; i < thirdElementData.length; i++) {}
    construct(thirdElementData);
  });
  req.open(
    "GET",
    "http://www.cril.univ-artois.fr/~lecoutre/teaching/jssae/code5/results.json"
  );
  req.send();

  function construct(thirdElementData) {
    let set = new Set(
      thirdElementData.map((row) => row.name),
      thirdElementData.map((row) => row.time)
    );
    let names = Array.from(set);

    // Moyen des temps de résolution

    function average(name) {
      let sum = 0;
      let count = 0;
      for (let i = 0; i < thirdElementData.length; i++) {
        let solverName = name;
        if (
          (thirdElementData[i].status == "SAT" &&
            thirdElementData[i].name == solverName) ||
          (thirdElementData[i].status == "UNSAT" &&
            thirdElementData[i].name == solverName)
        ) {
          sum += thirdElementData[i].time;
          count++;
        }
      }
      let average = sum / count;
      console.log(name, average);
      return average;
    }

    let tableauaverage = [];

    for (let i = 0; i < names.length; i++) {
      let averagenumber = average(names[i]);
      tableauaverage.push(averagenumber);
    }

    // console.log("tableau average", tableauaverage);

    let sorted = tableauaverage.slice().sort((a, b) => a - b);

    let sortedNames = [];

    for (let i = 0; i < sorted.length; i++) {
      let index = tableauaverage.indexOf(sorted[i]);
      sortedNames.push(names[index]);
    }

    // console.log("sorted", sorted);

    new Chart(document.getElementById("rank"), {
      type: "line",
      data: {
        labels: sortedNames,
        datasets: [
          {
            label: "Solver les plus performants",
            data: sorted,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Les 10 meilleurs solvers",
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      },
    });
  }
})();

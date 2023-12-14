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
    let set = new Set(thirdElementData.map((row) => row.time, 0));
    let times = Array.from(set);

    // console.log("time", times);

    let sorted = [];
    // Check status
    if (thirdElementData[i].status == "SAT") {
      for (let i = 0; i < times.length; i++) {
        let solved = 0;
        for (let j = 0; j < thirdElementData.length; j++) {
          if (thirdElementData[j].status == "SAT") {
            if (thirdElementData[j].time == times[i]) {
              solved++;
            }
          }
        }
        sorted.push(solved);
      }
    }

    // console.log("sorted", sorted);

    // Trier les temps par ordre croissant
    let sortedTimes = times.sort((a, b) => a - b);
    // console.log("sortedTimes", sortedTimes);

    new Chart(document.getElementById("dimensions"), {
      type: "bar",
      barPercentage: 0.5,
      data: {
        labels: sortedTimes,
        maxBarThickness: 8,
        stepValue: 5,
        datasets: [
          {
            label: "Nombre de puzzles résolus par temps ",
            data: sorted,
            barPercentage: 2,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 205, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(201, 203, 207, 0.2)",
              "rgba(255, 99, 132, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 205, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(201, 203, 207, 0.2)",
            ],
            borderColor: [
              "rgb(255, 99, 132)",
              "rgb(255, 159, 64)",
              "rgb(255, 205, 86)",
              "rgb(75, 192, 192)",
              "rgb(54, 162, 235)",
              "rgb(153, 102, 255)",
              "rgb(201, 203, 207)",
              "rgb(255, 99, 132)",
              "rgb(255, 159, 64)",
              "rgb(255, 205, 86)",
              "rgb(75, 192, 192)",
              "rgb(54, 162, 235)",
              "rgb(153, 102, 255)",
              "rgb(201, 203, 207)",
            ],
            borderWidth: 1,
            barThickness: 10,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
            textDirection: "ltr",
            display: true,
            labels: {
              color: "rgb(255, 99, 132)",
            },
            textAlign: "start",
          },
          title: {
            display: true,
            text: "Meilleur temps de résolution",
          },
          scales: {
            xAxes: [
              {
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: "Nombre de puzzles résolus par temps",
                },
              },
            ],
            yAxes: [
              {
                display: true,
                screenReaderLabel: "Nombre de puzzles résolus par temps",
                ticks: {
                  beginAtZero: true,
                  steps: 10,
                  stepValue: 5,
                  max: 100,
                },
              },
            ],
          },
        },
      },
    });
  }
})();

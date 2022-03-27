import React from "react";
import Chart from "chart.js";

function CardLineChart() {
  React.useEffect(() => {
    var config = {
      type: "line",
      data: {
        labels: [
          "Siječanj",
          "Veljača",
          "Ožujak",
          "Travanj",
          "Svibanj",
          "Lipanj",
          "Srpanj",
          "Kolovoz",
          "Rujan",
          "Listopad",
          "Studeni",
          "Prosinac",
        ],
        datasets: [
          {
            // label: new Date().getFullYear(),
            label: "Broj ponuda",
            backgroundColor: "#4c51bf",
            borderColor: "#4c51bf",
            data: [0, 20, 11, 0, 0, 17, 21],
            fill: false,
          },
          {
            // label: new Date().getFullYear() - 1,
            label: "Broj potražnje",
            fill: false,
            backgroundColor: "#fff",
            borderColor: "#fff",
            data: [0, 0, 0, 12, 22, 25, 31],
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Sales Charts",
          fontColor: "white",
        },
        legend: {
          labels: {
            fontColor: "white",
          },
          align: "end",
          position: "bottom",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: "rgba(255,255,255,.7)",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Month",
                fontColor: "white",
              },
              gridLines: {
                display: false,
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(0, 0, 0, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                fontColor: "rgba(255,255,255,.7)",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Value",
                fontColor: "white",
              },
              gridLines: {
                borderDash: [3],
                borderDashOffset: [3],
                drawBorder: false,
                color: "rgba(255, 255, 255, 0.15)",
                zeroLineColor: "rgba(33, 37, 41, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    };
    var ctx = document.getElementById("line-chart").getContext("2d");
    window.myLine = new Chart(ctx, config);
  }, []);
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-gray-800">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-gray-200 mb-1 text-xs font-semibold">
                Pregled
              </h6>
              <h2 className="text-white">Ponuda/Potražnja</h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <canvas id="line-chart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
export default CardLineChart;
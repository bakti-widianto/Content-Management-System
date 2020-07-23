//bar chart
function barChart(apiData) {
   google.charts.load("current", { packages: ["bar"] });
   google.charts.setOnLoadCallback(drawChart);

   function drawChart() {
      let rawData = apiData.map((item) => [item.letter, item.frequency]);
      // console.log(rawData)
      rawData.unshift(["Letter", "Frequency"]);

      let data = new google.visualization.arrayToDataTable(rawData);
      let option = {
         title: "Frequency for each subject",
         width: "100%",
         height: 500,
         legend: { position: "none" },
         hAxis: { title: "Subject" },
         vAxis: { title: "Frequency" },
         animation: { duration: 1000, startup: true, easing: "in" }
      };

      const chart = new google.visualization.ColumnChart(document.getElementById('bar-chart'));
      chart.draw(data, option);
   }
}

//Pie Chart
function pieChart(apiData) {
   google.charts.load("current", { packages: ["corechart"] });
   google.charts.setOnLoadCallback(drawChart);
   function drawChart() {
      let rawData = apiData.map(item => [item.letter, item.frequency])
      rawData.unshift(['Subject', 'Frequency'])
      // console.log(rawData)

      var data = google.visualization.arrayToDataTable(rawData);

      var options = {
         title: 'Frequency for each subject',
         is3D: true,
         width: 800,
         height: 500
      };

      var chart = new google.visualization.PieChart(document.getElementById('pie-chart'));
      chart.draw(data, options);
   }

}

export { barChart, pieChart };
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

//Line Chart
function lineChart(dataDates) {
   google.charts.load('current', { 'packages': ['line'] });
   google.charts.setOnLoadCallback(drawChart);

   function drawChart() {

      var data = new google.visualization.DataTable();
      data.addColumn("string", "Date");
      data.addColumn("number", "Frequency");

      data.addRows(dataDates.map(item => [item.letter, item.frequency]));

      var options = {
         title: "Frequency Rate for Each Date",
         width: "100%",
         height: 500,
         hAxis: { title: "Date" },
         vAxis: { title: "Frequency" },
         legend: { position: "none" },
         animation: { duration: 1000, startup: true, easing: "in" }
      };

      var chart = new google.charts.Line(document.getElementById('linechart_material'));
      chart.draw(data, google.charts.Line.convertOptions(options));
   }
}

//Map Chart
function mapChart(apiData) {
   google.charts.load('current', {
      'packages': ['map'],
      'mapsApiKey': 'AIzaSyBvu5r9W_wbQcAn9e5qYfMX1_Eo7t-2qmI'

   });
   google.charts.setOnLoadCallback(drawMap);

   function drawMap() {
      let rawData = apiData.map(item => [item.lat, item.lng, item.title]);
      rawData.unshift(['Lat', 'Long', 'Name'])
      var data = google.visualization.arrayToDataTable(rawData);

      var options = {
         showTooltip: true,
         showInfoWindow: true,
         zoomLevel: 13,
         width: "100%",
         height: 500,
      };

      var map = new google.visualization.Map(document.getElementById('chart_div'));

      map.draw(data, options);
   };
}


export { barChart, pieChart, lineChart, mapChart };
function barChart(apiData) {
    google.charts.load("current", { packages: ["bar"] });
    google.charts.setOnLoadCallback(drawChart);
 
    function drawChart() {
       let rawData = apiData.map((item, index) => [item.letter, item.frequency]);
       rawData.unshift(["Letter", "Frequency"]);
 
       let data = new google.visualization.arrayToDataTable(rawData);
       let option = {
          title: "Frequency for each subject",
          width: "100%",
          height: 400,
          legend: { position: "none" },
          hAxis: { title: "Subject" },
          vAxis: { title: "Frequency" },
          animation: { duration: 1000, startup: true, easing: "in" }
       };
 
       const chart = new google.visualization.ColumnChart(document.getElementById('bar-chart'));
       chart.draw(data, option);
    }
 }

 export {barChart};
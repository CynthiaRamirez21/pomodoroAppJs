let config = "";
let myChart;

function initializeGraphic()
{
  const labels = [
    'Completed',
    'Pending'
  ];

  const data = {
    labels: labels,
    datasets: [{
      label: 'My First dataset',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: getTasksInfo()
    }]
  };
  
  config = {
    type: 'bar',
    data: data,
    options: {
		scales: {
			y: { max: getTasksQty() }
		},
	}
  };
}

function drawGraphic()
{
	let ctx = document.getElementById('myChart').getContext("2d");

  if (myChart) {
    myChart.destroy();
  }
	
	myChart = new Chart(
		ctx,
		config
	);
}
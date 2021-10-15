

// For each item in the array, add a div element
// if the number is < 5, color it red, otherwise gray
function addImage() {
  console.log('Hello, world!');
  const waffle = d3.select('.waffle');

  // Create an array with numbers 0 - 99
  const numbers = d3.range(617);
  waffle
    .selectAll('.block')
    .data(numbers)
    .enter()
    .append('div')
    .attr('class', 'block')
    .style(
      'background-color',
      d => (
        d < 315 ? '#b595ff' :
        d < 615 ? '#ffe107' :
        '#CCCCCC'
      )
    );
}

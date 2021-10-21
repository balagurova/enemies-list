function addImage(step) {
  // Create an array with numbers 0 - 99
  const img = d3.select('.waffle')
    .append('svg')
    //.attr('height', '100%')
    .attr('width', '100%')
    .attr('viewBox', '0 0 781 781');
  d3.csv("/data/names.csv")
    .then(d => renderData(d, img, step));
}

const RELIGIOUS_PP = "political prisoners (r)";
const REGULAR_PP = "political prisoners";
const UNDESIRABLES = "Undesirable organizations"
const FOREIGN_AGENT = "Foreign agents (o)"
const INDIVIDUAL_FA = "Foreign agents (p)"

const simpleStyle = circle => circle
  .attr("stroke", "black")
  .attr("stroke-width", "1")
  .attr("fill", "#F7F8F8");

const politicalPrisonersStyle = circle => circle
  .attr("stroke", d => politicalPrisonersColored(d, "black"))
  .attr("stroke-width", "1")
  .attr("fill", d => politicalPrisonersColored(d, "#F7F8F8"));

const undesirableStyle = circle => circle
  .attr("stroke", d => d.Status == UNDESIRABLES ? "#FF4444" : "black")
  .attr("stroke-width", "1")
  .attr("fill", d => d.Status == UNDESIRABLES ? "#FF4444" : "#F7F8F8");

const foreignAgentStyle = circle => circle
  .attr("stroke", d => foreignAgentColored(d, "black"))
  .attr("stroke-width", "1")
  .attr("fill", d => foreignAgentColored(d, "#F7F8F8"));

function politicalPrisonersColored(d, defaultColor) {
  switch (d.Status) {
    case RELIGIOUS_PP:
      return "#FF4444";
    case REGULAR_PP:
      return "#99DDEC";
    default:
      return defaultColor;
  }
}

function foreignAgentColored(d, defaultColor) {
  switch (d.Status) {
    case FOREIGN_AGENT:
      return "#FF4444";
    case INDIVIDUAL_FA:
      return "#99DDEC";
    default:
      return defaultColor;
  }
}

const styling = {
  "1": simpleStyle,
  "2": politicalPrisonersStyle,
  "3": undesirableStyle,
  "4": foreignAgentStyle,
  "5": simpleStyle,
}

function renderData(data, canvas, step) {
  canvas.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', (d, i) => (i % 25 + 1) * 31 - 13)
    .attr('cy', (d, i) => (Math.floor(i / 25) + 1) * 31 - 13)
    .attr('r', 13)
    .call(styling[step])
    .on("mouseover", function(d) {
      div.transition()
        .duration(200)
        .style("opacity", .9);
      div.html(d.Name)
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
    })
    .on("mouseout", function(d) {
      div.transition()
        .duration(50)
        .style("opacity", 0);
    })
    .on("mousewheel.zoom", function(d) {
      div.transition()
        .duration(0)
        .style("opacity", 0);
    });
}


function removeImage() {
  const waffle = d3.select('.waffle');
  waffle.selectAll('svg').remove();
}


// scrollama event handlers
function handleStepEnter(response) {
  // response = { element, direction, index }
  var el = response.element;

  // remove is-active from all steps
  // then add is-active to this step
  steps.forEach(step => step.classList.remove('is-active'));
  removeImage();
  el.classList.add('is-active');
  addImage(el.dataset.step);

  // update graphic based on step
  //sticky.querySelector("p").innerText = el.dataset.step;
}

function init() {
  scroller
    .setup({
      step: "#scrolly article .step",
      offset: 0.4,
      debug: false
    })
    .onStepEnter(handleStepEnter);
  // setup resize event
  window.addEventListener("resize", scroller.resize);
}

d3.json("/data/?sql=select * from T", function (data) {
  d3.select("body").selectAll("div.row")
    .data(data)
    .enter()
    .append("div")
    .attr("class","row")
    .text(function(d) { return d.id + " " + d.name });
})
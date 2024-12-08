let data = [
    { label: "T1P", value: 13.13 },
    { label: "T2P", value: 59.70 },
    { label: "T3P", value: 23.88 },
    { label: "BP", value: 17.91 }
  ];
  
  const HEIGHT = 250;
  let WIDTH = 500;  // HTML에서 설정한 width와 동일하게 설정
  let RADIUS = 0;
  const COLOR_RANGE = ["#17A2B8", "#FFC107", "#DC3545", "#28A745"];
  
  window.onload = function() {
    let colors = d3.scaleOrdinal().range(COLOR_RANGE);
    let canvas = setCanvas();
    let arc = setArc();
    let pie = setPie();
    setArcs(canvas, arc, pie, colors);
    setLegend(canvas, data);
  };
  
  function setArc() {
    return d3.arc()
      .innerRadius(50)
      .outerRadius(RADIUS);
  }
  
  function setArcs(canvas, arc, pie, colors) {
    let arcs = canvas
      .selectAll("g.slice")
      .data(pie)
      .enter()
      .append("svg:g")
      .attr("class", "slice");
  
    arcs
      .append("svg:path")
      .attr("fill", function(d, i) {
        return colors(i);
      })
      .attr("d", arc);
  
    arcs
      .append("svg:text")
      .attr("transform", function(d) {
        var textWidth = getTextWidth(
          (d.value.toFixed(2) + "%").toString(),
          "Roboto"
        );
        let x = arc.centroid(d)[0] - textWidth / 2;
        let y = arc.centroid(d)[1];
        return "translate(" + x + "," + y + ")";
      })
      .attr("class", "label-half-donut")
      .attr("dy", ".35em")
      .attr("text-anchor", function(d) {
        return (d.endAngle + d.startAngle) / 2 > Math.PI ? "end" : "start";
      })
      .text(function(d) {
        return d.value.toFixed(2) + "%";
      });
  }
  
  function getTextWidth(text, font) {
    var canvas =
      getTextWidth.canvas ||
      (getTextWidth.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);
    return metrics.width;
  }
  
  function setCanvas() {
    // 컨테이너의 너비를 동적으로 계산
    WIDTH = parseFloat(d3.select("#container-1").style("width"));
    RADIUS = Math.min(WIDTH, HEIGHT) / 2;
  
    // SVG 생성: container-1 div에 차트를 그리기 위해 SVG를 삽입
    let svg = d3
      .select("#container-1") // container-1 div 선택
      .append("svg") // 새로운 SVG 요소를 추가
      .style("background-color", "#354560")
      .style("color", "#FFFFFF")
      .data([data]) // 데이터를 SVG와 연결
      .attr("width", WIDTH) // SVG 너비 설정
      .attr("height", HEIGHT) // SVG 높이 설정
      .append("svg:g") // 그룹 요소(g) 추가
      .attr(
        "transform",
        "translate(" +
          WIDTH / 2 +
          "," +
          (HEIGHT + 30) / 2 +
          ")"
      ); // 차트의 위치 설정
  
    // 차트 타이틀 추가
    svg
      .append("g")
      .append("text")
      .attr("transform", "translate(0, 25)")
      .style("text-anchor", "middle")
      .text("Distribución de posesiones")
      .attr("class", "title");
  
    return svg; // svg를 반환하여 이후 작업에 사용
  }
  
  function setLegend(canvas, data) {
    let colors = d3
      .scaleOrdinal()
      .domain(COLOR_RANGE)
      .range(COLOR_RANGE);
  
    let svg = canvas.append("g").attr("transform", "translate(185, -100)");
  
    svg
      .selectAll("squares")
      .data(COLOR_RANGE)
      .enter()
      .append("rect")
      .attr("width", 12)
      .attr("height", 12)
      .attr("x", 0)
      .attr("y", function(d, i) {
        return i * 20;
      })
      .style("fill", function(d) {
        return colors(d);
      });
  
    svg
      .selectAll("labels")
      .data(data)
      .enter()
      .append("text")
      .attr("x", 20)
      .attr("y", function(d, i) {
        return (i + 0.55) * 20;
      })
      .text(function(d) {
        return d.label + "%";
      })
      .attr("class", "label-half-donut")
      .attr("text-anchor", "left")
      .style("alignment-baseline", "bottom");
  }
  
  function setPie() {
    return d3
      .pie()
      .startAngle(-90 * (Math.PI / 180))
      .endAngle(90 * (Math.PI / 180))
      .padAngle(0.02)
      .sort(null)
      .value(function(d) {
        return d.value;
      });
  }
  
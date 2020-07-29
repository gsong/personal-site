/** @jsx jsx */
import { jsx } from "theme-ui";

import { svgStyle } from "./DispatchFlow";

function SvgSetStateFlow(props) {
  return (
    <svg
      id="mermaid-1595182964434"
      width="100%"
      height="100%"
      viewBox="-50 -10 485 209"
      aria-labelledby="set-state-flow"
      sx={{ ...svgStyle, maxWidth: 485 }}
      {...props}
    >
      <title id="set-state-flow">
        Sequence diagram of React.useState setState flow
      </title>
      <style>
        {
          "#mermaid-1595182964434 .label{font-family:'trebuchet ms', verdana, arial;font-family:var(--mermaid-font-family);color:#333}#mermaid-1595182964434 .label text{fill:#333}#mermaid-1595182964434 .node rect,#mermaid-1595182964434 .node circle,#mermaid-1595182964434 .node ellipse,#mermaid-1595182964434 .node polygon,#mermaid-1595182964434 .node path{fill:#ECECFF;stroke:#9370db;stroke-width:1px}#mermaid-1595182964434 .node .label{text-align:center}#mermaid-1595182964434 .node.clickable{cursor:pointer}#mermaid-1595182964434 .arrowheadPath{fill:#333}#mermaid-1595182964434 .edgePath .path{stroke:#333;stroke-width:1.5px}#mermaid-1595182964434 .flowchart-link{stroke:#333;fill:none}#mermaid-1595182964434 .edgeLabel{background-color:#e8e8e8;text-align:center}#mermaid-1595182964434 .edgeLabel rect{opacity:0.5}#mermaid-1595182964434 .cluster rect{fill:#ffffde;stroke:#aa3;stroke-width:1px}#mermaid-1595182964434 .cluster text{fill:#333}#mermaid-1595182964434 div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:'trebuchet ms', verdana, arial;font-family:var(--mermaid-font-family);font-size:12px;background:#ffffde;border:1px solid #aa3;border-radius:2px;pointer-events:none;z-index:100}#mermaid-1595182964434 .actor{stroke:#ccf;fill:#ECECFF}#mermaid-1595182964434 text.actor&gt;tspan{fill:#000;stroke:none}#mermaid-1595182964434 .actor-line{stroke:grey}#mermaid-1595182964434 .messageLine0{stroke-width:1.5;stroke-dasharray:none;stroke:#333}#mermaid-1595182964434 .messageLine1{stroke-width:1.5;stroke-dasharray:2, 2;stroke:#333}#mermaid-1595182964434 #arrowhead path{fill:#333;stroke:#333}#mermaid-1595182964434 .sequenceNumber{fill:#fff}#mermaid-1595182964434 #sequencenumber{fill:#333}#mermaid-1595182964434 #crosshead path{fill:#333;stroke:#333}#mermaid-1595182964434 .messageText{fill:#333;stroke:#333}#mermaid-1595182964434 .labelBox{stroke:#ccf;fill:#ECECFF}#mermaid-1595182964434 .labelText,#mermaid-1595182964434 .labelText&gt;tspan{fill:#000;stroke:none}#mermaid-1595182964434 .loopText,#mermaid-1595182964434 .loopText&gt;tspan{fill:#000;stroke:none}#mermaid-1595182964434 .loopLine{stroke-width:2px;stroke-dasharray:2, 2;stroke:#ccf;fill:#ccf}#mermaid-1595182964434 .note{stroke:#aa3;fill:#fff5ad}#mermaid-1595182964434 .noteText,#mermaid-1595182964434 .noteText&gt;tspan{fill:#000;stroke:none}#mermaid-1595182964434 .activation0{fill:#f4f4f4;stroke:#666}#mermaid-1595182964434 .activation1{fill:#f4f4f4;stroke:#666}#mermaid-1595182964434 .activation2{fill:#f4f4f4;stroke:#666}#mermaid-1595182964434 .mermaid-main-font{font-family:\"trebuchet ms\", verdana, arial;font-family:var(--mermaid-font-family)}#mermaid-1595182964434 .section{stroke:none;opacity:0.2}#mermaid-1595182964434 .section0{fill:rgba(102,102,255,0.49)}#mermaid-1595182964434 .section2{fill:#fff400}#mermaid-1595182964434 .section1,#mermaid-1595182964434 .section3{fill:#fff;opacity:0.2}#mermaid-1595182964434 .sectionTitle0{fill:#333}#mermaid-1595182964434 .sectionTitle1{fill:#333}#mermaid-1595182964434 .sectionTitle2{fill:#333}#mermaid-1595182964434 .sectionTitle3{fill:#333}#mermaid-1595182964434 .sectionTitle{text-anchor:start;font-size:11px;text-height:14px;font-family:'trebuchet ms', verdana, arial;font-family:var(--mermaid-font-family)}#mermaid-1595182964434 .grid .tick{stroke:#d3d3d3;opacity:0.8;shape-rendering:crispEdges}#mermaid-1595182964434 .grid .tick text{font-family:'trebuchet ms', verdana, arial;font-family:var(--mermaid-font-family)}#mermaid-1595182964434 .grid path{stroke-width:0}#mermaid-1595182964434 .today{fill:none;stroke:red;stroke-width:2px}#mermaid-1595182964434 .task{stroke-width:2}#mermaid-1595182964434 .taskText{text-anchor:middle;font-family:'trebuchet ms', verdana, arial;font-family:var(--mermaid-font-family)}#mermaid-1595182964434 .taskText:not([font-size]){font-size:11px}#mermaid-1595182964434 .taskTextOutsideRight{fill:#000;text-anchor:start;font-size:11px;font-family:'trebuchet ms', verdana, arial;font-family:var(--mermaid-font-family)}#mermaid-1595182964434 .taskTextOutsideLeft{fill:#000;text-anchor:end;font-size:11px}#mermaid-1595182964434 .task.clickable{cursor:pointer}#mermaid-1595182964434 .taskText.clickable{cursor:pointer;fill:#003163 !important;font-weight:bold}#mermaid-1595182964434 .taskTextOutsideLeft.clickable{cursor:pointer;fill:#003163 !important;font-weight:bold}#mermaid-1595182964434 .taskTextOutsideRight.clickable{cursor:pointer;fill:#003163 !important;font-weight:bold}#mermaid-1595182964434 .taskText0,#mermaid-1595182964434 .taskText1,#mermaid-1595182964434 .taskText2,#mermaid-1595182964434 .taskText3{fill:#fff}#mermaid-1595182964434 .task0,#mermaid-1595182964434 .task1,#mermaid-1595182964434 .task2,#mermaid-1595182964434 .task3{fill:#8a90dd;stroke:#534fbc}#mermaid-1595182964434 .taskTextOutside0,#mermaid-1595182964434 .taskTextOutside2{fill:#000}#mermaid-1595182964434 .taskTextOutside1,#mermaid-1595182964434 .taskTextOutside3{fill:#000}#mermaid-1595182964434 .active0,#mermaid-1595182964434 .active1,#mermaid-1595182964434 .active2,#mermaid-1595182964434 .active3{fill:#bfc7ff;stroke:#534fbc}#mermaid-1595182964434 .activeText0,#mermaid-1595182964434 .activeText1,#mermaid-1595182964434 .activeText2,#mermaid-1595182964434 .activeText3{fill:#000 !important}#mermaid-1595182964434 .done0,#mermaid-1595182964434 .done1,#mermaid-1595182964434 .done2,#mermaid-1595182964434 .done3{stroke:grey;fill:#d3d3d3;stroke-width:2}#mermaid-1595182964434 .doneText0,#mermaid-1595182964434 .doneText1,#mermaid-1595182964434 .doneText2,#mermaid-1595182964434 .doneText3{fill:#000 !important}#mermaid-1595182964434 .crit0,#mermaid-1595182964434 .crit1,#mermaid-1595182964434 .crit2,#mermaid-1595182964434 .crit3{stroke:#f88;fill:red;stroke-width:2}#mermaid-1595182964434 .activeCrit0,#mermaid-1595182964434 .activeCrit1,#mermaid-1595182964434 .activeCrit2,#mermaid-1595182964434 .activeCrit3{stroke:#f88;fill:#bfc7ff;stroke-width:2}#mermaid-1595182964434 .doneCrit0,#mermaid-1595182964434 .doneCrit1,#mermaid-1595182964434 .doneCrit2,#mermaid-1595182964434 .doneCrit3{stroke:#f88;fill:#d3d3d3;stroke-width:2;cursor:pointer;shape-rendering:crispEdges}#mermaid-1595182964434 .milestone{transform:rotate(45deg) scale(0.8, 0.8)}#mermaid-1595182964434 .milestoneText{font-style:italic}#mermaid-1595182964434 .doneCritText0,#mermaid-1595182964434 .doneCritText1,#mermaid-1595182964434 .doneCritText2,#mermaid-1595182964434 .doneCritText3{fill:#000 !important}#mermaid-1595182964434 .activeCritText0,#mermaid-1595182964434 .activeCritText1,#mermaid-1595182964434 .activeCritText2,#mermaid-1595182964434 .activeCritText3{fill:#000 !important}#mermaid-1595182964434 .titleText{text-anchor:middle;font-size:18px;fill:#000;font-family:'trebuchet ms', verdana, arial;font-family:var(--mermaid-font-family)}#mermaid-1595182964434 g.classGroup text{fill:#9370db;stroke:none;font-family:'trebuchet ms', verdana, arial;font-family:var(--mermaid-font-family);font-size:10px}#mermaid-1595182964434 g.classGroup text .title{font-weight:bolder}#mermaid-1595182964434 g.clickable{cursor:pointer}#mermaid-1595182964434 g.classGroup rect{fill:#ECECFF;stroke:#9370db}#mermaid-1595182964434 g.classGroup line{stroke:#9370db;stroke-width:1}#mermaid-1595182964434 .classLabel .box{stroke:none;stroke-width:0;fill:#ECECFF;opacity:0.5}#mermaid-1595182964434 .classLabel .label{fill:#9370db;font-size:10px}#mermaid-1595182964434 .relation{stroke:#9370db;stroke-width:1;fill:none}#mermaid-1595182964434 .dashed-line{stroke-dasharray:3}#mermaid-1595182964434 #compositionStart{fill:#9370db;stroke:#9370db;stroke-width:1}#mermaid-1595182964434 #compositionEnd{fill:#9370db;stroke:#9370db;stroke-width:1}#mermaid-1595182964434 #aggregationStart{fill:#ECECFF;stroke:#9370db;stroke-width:1}#mermaid-1595182964434 #aggregationEnd{fill:#ECECFF;stroke:#9370db;stroke-width:1}#mermaid-1595182964434 #dependencyStart{fill:#9370db;stroke:#9370db;stroke-width:1}#mermaid-1595182964434 #dependencyEnd{fill:#9370db;stroke:#9370db;stroke-width:1}#mermaid-1595182964434 #extensionStart{fill:#9370db;stroke:#9370db;stroke-width:1}#mermaid-1595182964434 #extensionEnd{fill:#9370db;stroke:#9370db;stroke-width:1}#mermaid-1595182964434 .commit-id,#mermaid-1595182964434 .commit-msg,#mermaid-1595182964434 .branch-label{fill:lightgrey;color:lightgrey;font-family:'trebuchet ms', verdana, arial;font-family:var(--mermaid-font-family)}#mermaid-1595182964434 .pieTitleText{text-anchor:middle;font-size:25px;fill:#000;font-family:'trebuchet ms', verdana, arial;font-family:var(--mermaid-font-family)}#mermaid-1595182964434 .slice{font-family:'trebuchet ms', verdana, arial;font-family:var(--mermaid-font-family)}#mermaid-1595182964434 g.stateGroup text{fill:#9370db;stroke:none;font-size:10px;font-family:'trebuchet ms', verdana, arial;font-family:var(--mermaid-font-family)}#mermaid-1595182964434 g.stateGroup text{fill:#9370db;stroke:none;font-size:10px}#mermaid-1595182964434 g.stateGroup .state-title{font-weight:bolder;fill:#000}#mermaid-1595182964434 g.stateGroup rect{fill:#ECECFF;stroke:#9370db}#mermaid-1595182964434 g.stateGroup line{stroke:#9370db;stroke-width:1}#mermaid-1595182964434 .transition{stroke:#9370db;stroke-width:1;fill:none}#mermaid-1595182964434 .stateGroup .composit{fill:white;border-bottom:1px}#mermaid-1595182964434 .stateGroup .alt-composit{fill:#e0e0e0;border-bottom:1px}#mermaid-1595182964434 .state-note{stroke:#aa3;fill:#fff5ad}#mermaid-1595182964434 .state-note text{fill:black;stroke:none;font-size:10px}#mermaid-1595182964434 .stateLabel .box{stroke:none;stroke-width:0;fill:#ECECFF;opacity:0.5}#mermaid-1595182964434 .stateLabel text{fill:#000;font-size:10px;font-weight:bold;font-family:'trebuchet ms', verdana, arial;font-family:var(--mermaid-font-family)}#mermaid-1595182964434 .node circle.state-start{fill:black;stroke:black}#mermaid-1595182964434 .node circle.state-end{fill:black;stroke:white;stroke-width:1.5}#mermaid-1595182964434 #statediagram-barbEnd{fill:#9370db}#mermaid-1595182964434 .statediagram-cluster rect{fill:#ECECFF;stroke:#9370db;stroke-width:1px}#mermaid-1595182964434 .statediagram-cluster rect.outer{rx:5px;ry:5px}#mermaid-1595182964434 .statediagram-state .divider{stroke:#9370db}#mermaid-1595182964434 .statediagram-state .title-state{rx:5px;ry:5px}#mermaid-1595182964434 .statediagram-cluster.statediagram-cluster .inner{fill:white}#mermaid-1595182964434 .statediagram-cluster.statediagram-cluster-alt .inner{fill:#e0e0e0}#mermaid-1595182964434 .statediagram-cluster .inner{rx:0;ry:0}#mermaid-1595182964434 .statediagram-state rect.basic{rx:5px;ry:5px}#mermaid-1595182964434 .statediagram-state rect.divider{stroke-dasharray:10,10;fill:#efefef}#mermaid-1595182964434 .note-edge{stroke-dasharray:5}#mermaid-1595182964434 .statediagram-note rect{fill:#fff5ad;stroke:#aa3;stroke-width:1px;rx:0;ry:0}:root{--mermaid-font-family: '\"trebuchet ms\", verdana, arial';--mermaid-font-family: \"Comic Sans MS\", \"Comic Sans\", cursive}#mermaid-1595182964434 .error-icon{fill:#522}#mermaid-1595182964434 .error-text{fill:#522;stroke:#522}#mermaid-1595182964434 .edge-thickness-normal{stroke-width:2px}#mermaid-1595182964434 .edge-thickness-thick{stroke-width:3.5px}#mermaid-1595182964434 .edge-pattern-solid{stroke-dasharray:0}#mermaid-1595182964434 .edge-pattern-dashed{stroke-dasharray:3}#mermaid-1595182964434 .edge-pattern-dotted{stroke-dasharray:2}#mermaid-1595182964434 .marker{fill:#333}#mermaid-1595182964434 .marker.cross{stroke:#333}\n\n:root { --mermaid-font-family: \"trebuchet ms\", verdana, arial;}"
        }
      </style>
      <style>
        {
          '#mermaid-1595182964434 {\n    color: rgb(0, 0, 0);\n    font: 16px "trebuchet ms", verdana, arial;\n  }'
        }
      </style>
      <g />
      <g>
        <line
          id="actor0"
          x1={75}
          y1={5}
          x2={75}
          y2={198}
          className="actor-line"
          strokeWidth="0.5px"
          stroke="#999"
        />
        <rect
          x={0}
          y={0}
          fill="#eaeaea"
          stroke="#666"
          width={150}
          height={65}
          rx={3}
          ry={3}
          className="actor"
        />
        <text
          x={75}
          y={32.5}
          dominantBaseline="central"
          alignmentBaseline="central"
          className="actor"
          style={{
            textAnchor: "middle",
            fontSize: 14,
            fontWeight: 400,
            fontFamily: "Open-Sans, sans-serif",
          }}
        >
          <tspan x={75} dy={0}>
            {"setState"}
          </tspan>
        </text>
      </g>
      <g>
        <line
          id="actor1"
          x1={310}
          y1={5}
          x2={310}
          y2={198}
          className="actor-line"
          strokeWidth="0.5px"
          stroke="#999"
        />
        <rect
          x={235}
          y={0}
          fill="#eaeaea"
          stroke="#666"
          width={150}
          height={65}
          rx={3}
          ry={3}
          className="actor"
        />
        <text
          x={310}
          y={32.5}
          dominantBaseline="central"
          alignmentBaseline="central"
          className="actor"
          style={{
            textAnchor: "middle",
            fontSize: 14,
            fontWeight: 400,
            fontFamily: "Open-Sans, sans-serif",
          }}
        >
          <tspan x={310} dy={0}>
            {"state"}
          </tspan>
        </text>
      </g>
      <defs>
        <marker
          id="arrowhead"
          refX={5}
          refY={2}
          markerWidth={6}
          markerHeight={4}
          orient="auto"
        >
          <path d="M 0,0 V 4 L6,2 Z" />
        </marker>
      </defs>
      <defs>
        <marker
          id="crosshead"
          markerWidth={15}
          markerHeight={8}
          orient="auto"
          refX={16}
          refY={4}
        >
          <path
            fill="black"
            stroke="#000000"
            strokeWidth="1px"
            d="M 9,2 V 6 L16,4 Z"
            style={{
              strokeDasharray: "0, 0",
            }}
          />
          <path
            fill="none"
            stroke="#000000"
            strokeWidth="1px"
            d="M 0,1 L 6,7 M 6,1 L 0,7"
            style={{
              strokeDasharray: "0, 0",
            }}
          />
        </marker>
      </defs>
      <defs>
        <marker
          id="sequencenumber"
          refX={15}
          refY={15}
          markerWidth={60}
          markerHeight={40}
          orient="auto"
        >
          <circle cx={15} cy={15} r={6} />
        </marker>
      </defs>
      <text
        x={193}
        y={80}
        textAnchor="middle"
        dominantBaseline="middle"
        alignmentBaseline="middle"
        className="messageText"
        dy="1em"
        style={{
          fontSize: 16,
          fontWeight: 400,
        }}
      >
        {"replace with new state"}
      </text>
      <line
        x1={75}
        y1={113}
        x2={310}
        y2={113}
        className="messageLine1"
        strokeWidth={2}
        stroke="none"
        markerEnd="url(#arrowhead)"
        style={{
          strokeDasharray: "3, 3",
          fill: "none",
        }}
      />
      <g>
        <rect
          x={0}
          y={133}
          fill="#eaeaea"
          stroke="#666"
          width={150}
          height={65}
          rx={3}
          ry={3}
          className="actor"
        />
        <text
          x={75}
          y={165.5}
          dominantBaseline="central"
          alignmentBaseline="central"
          className="actor"
          style={{
            textAnchor: "middle",
            fontSize: 14,
            fontWeight: 400,
            fontFamily: "Open-Sans, sans-serif",
          }}
        >
          <tspan x={75} dy={0}>
            {"setState"}
          </tspan>
        </text>
      </g>
      <g>
        <rect
          x={235}
          y={133}
          fill="#eaeaea"
          stroke="#666"
          width={150}
          height={65}
          rx={3}
          ry={3}
          className="actor"
        />
        <text
          x={310}
          y={165.5}
          dominantBaseline="central"
          alignmentBaseline="central"
          className="actor"
          style={{
            textAnchor: "middle",
            fontSize: 14,
            fontWeight: 400,
            fontFamily: "Open-Sans, sans-serif",
          }}
        >
          <tspan x={310} dy={0}>
            {"state"}
          </tspan>
        </text>
      </g>
    </svg>
  );
}

export default SvgSetStateFlow;
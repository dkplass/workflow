export default {
  nodes: [
    {
      type: "node",
      size: "72*72",
      shape: "flow-circle",
      style: {
        fill: "#FA8C16",
        stroke: "green"
      },
      // color: "red",
      label: "開始",
      labelCfg: {
        position: "bottom",
        offset: 100,
        style: {
          fill: "#666"
        }
      },
      x: 468,
      y: 61,
      id: "01729835",
      index: 0,
      data: [
        {
          name: "prop1",
          value: "prop1"
        },
        {
          name: "prop2",
          value: "prop2"
        }
      ]
    },
    {
      type: "node",
      size: "80*48",
      shape: "flow-rect",
      color: "#1890FF",
      label: "測試節點",
      x: 468,
      y: 201.5,
      id: "b69121d6",
      index: 1,
      data: [
        {
          name: "prop3",
          value: "prop3"
        },
        {
          name: "prop4",
          value: "prop4"
        }
      ]
    },
    {
      id: "node0",
      type: "custom",
      shape: "custom",
      x: 200,
      y: 100
    }
  ],
  edges: [
    {
      id: "070785c1",
      index: 4,
      shape: "custom-polyline",
      source: "01729835",
      sourceAnchor: 2,
      target: "b69121d6",
      targetAnchor: 0,
      // size: 5,
      style: {
        stroke: "#979190",
        lineWidth: 3
      },
      // label: "cubic-vertical",
      // labelCfg: {
      //   position: "center",
      //   autoRotate: true,
      //   style: {
      //     stroke: "white",
      //     lineWidth: 5,
      //     fill: "#722ed1"
      //   }
      // },
      controlPoints: [
        {
          x: 600,
          y: 100
        },
        {
          x: 468,
          y: 150
        }
      ]
    }
  ]
};

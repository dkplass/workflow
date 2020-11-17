// export default {
//   nodes: [
//     { 'type': 'node', 'size': '80*48', 'shape': 'flow-rect', 'style': { 'fill': '#FFA500', 'stroke': '#000000' }, 'label': '16', 'x': -596, 'y': 284.5284118652344, 'id': '2ba8b349', 'index': 0 },
//     { 'type': 'node', 'size': '80*48', 'shape': 'flow-rect', 'style': { 'fill': '#FFA500', 'stroke': '#000000' }, 'label': '17', 'x': -456, 'y': 284.0284118652344, 'id': '70b3acfd', 'index': 1 },
//     { 'type': 'node', 'size': '80*48', 'shape': 'flow-rect', 'style': { 'fill': '#FFA500', 'stroke': '#000000' }, 'label': '18', 'x': -309.5, 'y': 284.0284118652344, 'id': '1c5b602b', 'index': 2 },
//     { 'type': 'node', 'size': '80*48', 'shape': 'flow-rect', 'style': { 'fill': '#FFA500', 'stroke': '#000000' }, 'label': '19', 'x': -160.5, 'y': 284.0284118652344, 'id': '03dbb53a', 'index': 3 },
//     { 'type': 'node', 'size': '80*48', 'shape': 'flow-rect', 'style': { 'fill': '#FFA500', 'stroke': '#000000' }, 'label': '21', 'x': 0.5, 'y': 284.0284118652344, 'id': '12a435b8', 'index': 4 },
//     { 'type': 'node', 'size': '80*48', 'shape': 'flow-rect', 'style': { 'fill': '#FFA500', 'stroke': '#000000' }, 'label': '23', 'x': 156.5, 'y': 284.0284118652344, 'id': '164e0db6', 'index': 5 },
//     { 'type': 'node', 'size': '80*48', 'shape': 'flow-rect', 'style': { 'fill': '#FFA500', 'stroke': '#000000' }, 'label': '15', 'x': -309, 'y': 164.02841186523438, 'id': 'cc21ab3c', 'index': 6 },
//     { 'type': 'node', 'size': '80*48', 'shape': 'flow-rect', 'style': { 'fill': '#FFA500', 'stroke': '#000000' }, 'label': '20', 'x': 0, 'y': 165.02841186523438, 'id': '01686a97', 'index': 13 },
//     { 'type': 'node', 'size': '80*48', 'shape': 'flow-rect', 'style': { 'fill': '#FFA500', 'stroke': '#000000' }, 'label': '22', 'x': 156, 'y': 164.02841186523438, 'id': '3f25a76e', 'index': 16 }
//   ],
//   edges: [
//     { 'source': '2ba8b349', 'sourceAnchor': 1, 'target': '70b3acfd', 'targetAnchor': 3, 'id': 'fedaba8b', 'index': 7, 'style': {}},
//     { 'source': '70b3acfd', 'sourceAnchor': 1, 'target': '1c5b602b', 'targetAnchor': 3, 'id': '77910a01', 'index': 8 },
//     { 'source': 'cc21ab3c', 'sourceAnchor': 2, 'target': '1c5b602b', 'targetAnchor': 0, 'id': '7a9bb1e0', 'index': 9 },
//     { 'source': '1c5b602b', 'sourceAnchor': 1, 'target': '03dbb53a', 'targetAnchor': 3, 'id': '7e646f66', 'index': 10 },
//     { 'source': '03dbb53a', 'sourceAnchor': 1, 'target': '12a435b8', 'targetAnchor': 3, 'id': '5adc137e', 'index': 11 },
//     { 'source': '01686a97', 'sourceAnchor': 2, 'target': '12a435b8', 'targetAnchor': 0, 'id': 'db59a783', 'index': 12 },
//     { 'source': '12a435b8', 'sourceAnchor': 1, 'target': '164e0db6', 'targetAnchor': 3, 'id': '839e5325', 'index': 14 },
//     { 'source': '3f25a76e', 'sourceAnchor': 2, 'target': '164e0db6', 'targetAnchor': 0, 'id': '7e917f91', 'index': 15 }
//   ]
// }

export default
{
  'nodes': [{
    'ComNo': 'L1 ',
    'ProdNo': '305AA-AK002-N09',
    'LoopNum': 1,
    'VersionNo': '0.0.1',
    'id': '01729835',
    'index': 0,
    'type': 'node',
    'size': '72*72',
    'shape': 'flow-circle',
    'label': '外加',
    'x': 468,
    'y': 61,
    'style': {
      'fill': '#FA8C16',
      'stroke': '#FA8C16'
    }
  }, {
    'ComNo': 'L1 ',
    'ProdNo': '305AA-AK002-N09',
    'LoopNum': 1,
    'VersionNo': '0.0.1',
    'id': 'b69121d6',
    'index': 1,
    'type': 'node',
    'size': '80*48',
    'shape': 'flow-rect',
    'label': '裁切',
    'x': 468,
    'y': 202,
    'style': {
      'fill': '#FA8C16',
      'stroke': '#FA8C16'
    }
  }],
  'edges': [{
    'style': {
      'stroke': '#000000',
      'lineWidth': 2
    },
    'ComNo': 'L1 ',
    'ProdNo': '305AA-AK002-N09',
    'LoopNum': 1,
    'VersionNo': '0.0.1',
    'id': '070785c1',
    'index': 4,
    'shape': 'flow-polyline',
    'source': '01729835',
    'sourceAnchor': 2,
    'target': 'b69121d6',
    'targetAnchor': 0
  }]
}

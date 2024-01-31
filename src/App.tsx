import "./App.css";
import Autocomplete from "./components/autocomplete.tsx";
import { useGetNodes } from "./hooks/useGetNodes.ts";
import { AutocompleteResult, KnimeNode } from "./types";
import { useCallback, useRef, useState } from "react";
import { addEdge, applyEdgeChanges, applyNodeChanges, Background, Controls, Edge, ReactFlow, Node, useReactFlow, getOutgoers, updateEdge } from "reactflow";
import "reactflow/dist/style.css";
import CustomNode from "./components/custom-node.tsx";
import { NodeChange } from "@reactflow/core/dist/esm/types/changes";
import { Connection } from "@reactflow/core/dist/esm/types/general";
import { generateRandomString } from "./utils/common.ts";

const nodeTypes = { node: CustomNode };

// TODO: this file is quite big, it would be a good idea to thing how it can be splited
function App() {
  const edgeUpdateSuccessful = useRef(true);
  const { status, error, data } = useGetNodes();
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const { getNodes, getEdges } = useReactFlow();

  const onNodesChange = useCallback((changes: NodeChange[]) => setNodes(nds => applyNodeChanges(changes, nds)), [setNodes]);
  const onEdgesChange = useCallback((changes: NodeChange[]) => setEdges(eds => applyEdgeChanges(changes, eds)), [setEdges]);
  const onConnect = useCallback((connection: Connection) => setEdges((eds: Edge[]) => addEdge(connection, eds)), [setEdges]);

  const autocompleteFn = useCallback(
    (term: string): AutocompleteResult<KnimeNode>[] => {
      if (data) {
        return data.filter(node => node.name.toLowerCase().includes(term.toLowerCase())).map(item => ({ id: item.id, name: item.name, value: item }));
      }
      return [];
    },
    [data],
  );

  const handleSelect = useCallback((item: AutocompleteResult<KnimeNode>) => {
    setNodes(prevState => [...prevState, { id: generateRandomString(10), type: "node", position: { x: 0, y: 0 }, data: { item: item.value } }]);
  }, []);

  const isValidConnection = useCallback(
    (connection: Connection) => {
      const nodes = getNodes();
      const edges = getEdges();
      const target = nodes.find(node => node.id === connection.target);
      const hasCycle = (node: Node, visited = new Set()) => {
        if (visited.has(node.id)) return false;

        visited.add(node.id);

        for (const outgoer of getOutgoers(node, nodes, edges)) {
          if (outgoer.id === connection.source) return true;
          if (hasCycle(outgoer, visited)) return true;
        }
      };

      if (target?.id === connection.source) return false;
      return !!target && !hasCycle(target);
    },
    [getNodes, getEdges],
  );

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback((oldEdge: Edge, newConnection: Connection) => {
    edgeUpdateSuccessful.current = true;
    setEdges(els => updateEdge(oldEdge, newConnection, els));
  }, []);

  const onEdgeUpdateEnd = useCallback((_: MouseEvent | TouchEvent, edge: Edge) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges(eds => eds.filter(e => e.id !== edge.id));
    }

    edgeUpdateSuccessful.current = true;
  }, []);

  if (status === "pending") return "Loading...";
  if (status === "error") return error ? JSON.stringify(error) : "something went wrong, try again later";

  return (
    <div className="app">
      <div className="app__search">
        <Autocomplete placeholder="Add new node" autocompleteFn={autocompleteFn} onSelect={handleSelect} />
      </div>
      <div className="node-sandbox">
        <ReactFlow
          isValidConnection={isValidConnection}
          nodes={nodes}
          nodeTypes={nodeTypes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onEdgeUpdate={onEdgeUpdate}
          onEdgeUpdateStart={onEdgeUpdateStart}
          onEdgeUpdateEnd={onEdgeUpdateEnd}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}

export default App;

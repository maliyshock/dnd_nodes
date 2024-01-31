import { Handle, Position, NodeProps, useUpdateNodeInternals } from "reactflow";
import "./node.css";
import { KnimeNode } from "../types";
import { useEffect } from "react";
import { getShape } from "../utils/getShape.tsx";

type NodeData = {
  item: KnimeNode;
  name: string;
};

export default function CustomNode({ id, data, isConnectable }: NodeProps<NodeData>) {
  const updateNodeInternals = useUpdateNodeInternals();

  useEffect(() => {
    updateNodeInternals(id);
  }, [id, updateNodeInternals]);

  return (
    <div className="node-wrapper">
      <div className="node__header">
        <h4>{data.item.name}</h4>
      </div>
      <div className="node__body" style={{ backgroundColor: data.item.color }}>
        <div className="node__connectors node__outputs">
          {data.item.outputs.map((output, index) => (
            <Handle
              className="handle"
              type="target"
              position={Position.Right}
              isConnectable={isConnectable}
              key={`handle-output-${index}`}
              id={`handle-output-${index}`}
            >
              {getShape(output.type)}
            </Handle>
          ))}
        </div>
        <div className="node__connectors node__inputs">
          {data.item.inputs.map((input, index) => (
            <Handle
              className="handle"
              type="source"
              position={Position.Left}
              isConnectable={isConnectable}
              key={`handle-input-${index}`}
              id={`handle-input-${index}`}
            >
              {getShape(input.type)}
            </Handle>
          ))}
        </div>
      </div>
    </div>
  );
}

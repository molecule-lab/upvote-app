// utils/lexical-utils.ts
export function lexicalJSONToPlainText(jsonString: string): string {
  try {
    const editorState = JSON.parse(jsonString);

    function extractTextFromNode(node: any): string {
      if (node.type === "text") {
        return node.text || "";
      }

      if (node.children && Array.isArray(node.children)) {
        return node.children.map(extractTextFromNode).join("");
      }

      return "";
    }

    if (editorState.root && editorState.root.children) {
      return editorState.root.children
        .map(extractTextFromNode)
        .join("\n")
        .trim();
    }

    return "";
  } catch (error) {
    // If it's not valid JSON, return the original string
    return jsonString;
  }
}

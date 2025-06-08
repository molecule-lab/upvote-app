// utils/lexical-utils.ts
export function lexicalJSONToPlainText(
  jsonString: string,
  truncate: boolean = true,
  maxLength: number = 150
): string {
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
      const fullText = editorState.root.children
        .map(extractTextFromNode)
        .join("\n")
        .trim();

      // Return truncated or full text based on the truncate parameter
      if (truncate) {
        if (fullText.length > maxLength) {
          return fullText.substring(0, maxLength).trim() + "...";
        }
      }

      return fullText;
    }

    return "";
  } catch (error) {
    // If it's not valid JSON, return the original string (truncated if needed)
    if (truncate) {
      const maxLength = 150;
      if (jsonString.length > maxLength) {
        return jsonString.substring(0, maxLength).trim() + "...";
      }
    }
    return jsonString;
  }
}

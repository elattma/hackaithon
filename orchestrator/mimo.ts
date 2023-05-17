export const getContext = async (
  query: string,
  maxTokens: number
): Promise<string> => {
  const response = await fetch(
    `https://api.mimo.team/context?use_sample_data=True&query=${encodeURIComponent(
      query
    )}&max_tokens=${encodeURIComponent(maxTokens)}`,
    {
      method: "GET",
      headers: {
        "x-api-key": process.env.MIMO_API_KEY || "",
      },
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const jsonResponse = await response.json();
  const contexts: {
    text: string;
    source: {
      id: string;
      integration: string;
    };
  }[] = jsonResponse.contexts;
  if (!contexts) {
    return "no context found";
  }

  return contexts.map((context) => context.text).join("\n\n");
};

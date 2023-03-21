export const spoonacularApiKeys = [
  `5962ec749418426c81fa226be6317343`,
  `a15745668f894779b75adf57f9d76136`,
  `8e4e45b4d72f4a74b59440190f82116e`,
  `fc30ca941c9141489055ff119a8ac01c`,
];

export const checkApiKey = async (
  apiKeys: string[],
  url: string
): Promise<string> => {
  for (const apiKey of apiKeys) {
    const queryUrl = `${url}?apiKey=${apiKey}`;
    try {
      const response = await fetch(queryUrl);
      if (response.ok) {
        return apiKey;
      }
    } catch (error) {
      console.error(`Failed to check API key ${apiKey}: ${error}`);
    }
  }
  throw new Error('All provided API keys failed');
};

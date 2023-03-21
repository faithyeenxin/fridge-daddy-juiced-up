export const spoonacularApiKeys = [
  `5962ec749418426c81fa226be6317343`,
  `a15745668f894779b75adf57f9d76136`,
  `8e4e45b4d72f4a74b59440190f82116e`,
  `fc30ca941c9141489055ff119a8ac01c`,
];

export async function fetchWithBackupKeys(
  apiKeys: string[],
  url: string
): Promise<any> {
  if (apiKeys.length === 0) {
    throw new Error('No API keys provided');
  }

  const apiKey = apiKeys[0];
  const apiKeyUrl = `${url}&apiKey=${apiKey}`;

  try {
    const response = await fetch(apiKeyUrl);
    if (!response.ok) {
      throw new Error(`Fetch failed with status ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Fetch failed with API key ${apiKey}: ${error}`);
    const remainingApiKeys = apiKeys.slice(1);
    return fetchWithBackupKeys(remainingApiKeys, url);
  }
}

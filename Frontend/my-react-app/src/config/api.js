const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const api = {
  createChat: async () => {
    const response = await fetch(`${BASE_URL}/chats`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages: [] })
    });
    
    if (!response.ok) {
      throw new Error('Failed to create chat');
    }
    
    return await response.json();
  }
};

export { BASE_URL };

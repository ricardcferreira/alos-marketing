'use server'

export async function submitStudyLead(data: {
  firstName: string;
  lastName: string;
  email: string;
  studyName: string;
}) {
  const NOTION_API_KEY = process.env.NOTION_API_KEY;
  const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

  if (!NOTION_API_KEY || !NOTION_DATABASE_ID) {
    console.error("Missing Notion Environment Variables");
    return { success: false, error: "Server configuration error" };
  }

  try {
    const response = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOTION_API_KEY}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28'
      },
      body: JSON.stringify({
        parent: { database_id: NOTION_DATABASE_ID },
        properties: {
          // Ensure these property names match your Notion Database columns exactly!
          "Nome": {
            title: [
              { text: { content: `${data.firstName} ${data.lastName}`.trim() } }
            ]
          },
          "Email": {
            email: data.email
          },
          "Estudo": {
            select: { name: data.studyName }
          },
          "Data": {
            date: { start: new Date().toISOString() }
          }
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Notion API Error:", errorData);
      return { success: false, error: "Failed to save lead" };
    }

    return { success: true };
  } catch (error) {
    console.error("Action Error:", error);
    return { success: false, error: "Internal server error" };
  }
}
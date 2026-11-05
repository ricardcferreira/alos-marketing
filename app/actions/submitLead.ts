'use server'

export async function submitStudyLead(data: {
  firstName: string;
  lastName: string;
  email: string;
  studyName: string;
}) {
  const NOTION_API_KEY = process.env.NOTION_API_KEY;
  const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;
  const HUBSPOT_ACCESS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN; // Nova variável

  if (!NOTION_API_KEY || !NOTION_DATABASE_ID) {
    console.error("Missing Notion Environment Variables");
    return { success: false, error: "Server configuration error" };
  }

  try {
    // 1. Guardar Lead no Notion (O seu código original)
    const notionResponse = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOTION_API_KEY}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28'
      },
      body: JSON.stringify({
        parent: { database_id: NOTION_DATABASE_ID },
        properties: {
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

    if (!notionResponse.ok) {
      const errorData = await notionResponse.json();
      console.error("Notion API Error:", errorData);
      return { success: false, error: "Failed to save lead in Notion" };
    }

    // 2. Enviar Lead para o HubSpot Diretamente
    if (HUBSPOT_ACCESS_TOKEN) {
      try {
        const hubspotData = {
          properties: {
            firstname: data.firstName,
            lastname: data.lastName,
            ultimo_estudo_descarregado: data.studyName
          }
        };

        // A. Tentar ATUALIZAR o contacto existente pelo email
        let hubspotResponse = await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${data.email}?idProperty=email`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(hubspotData)
        });

        // B. Se o contacto não existir (Erro 404), CRIAR um novo contacto
        if (hubspotResponse.status === 404) {
          hubspotResponse = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              properties: {
                email: data.email,
                ...hubspotData.properties
              }
            })
          });
        }

        // Mostrar no terminal do VS Code qualquer erro que o HubSpot devolva
        if (!hubspotResponse.ok) {
           const errorData = await hubspotResponse.json();
           console.error("❌ HubSpot API Error:", JSON.stringify(errorData, null, 2));
        } else {
           console.log("✅ HubSpot Atualizado/Criado com sucesso para:", data.email);
        }

      } catch (hubspotError) {
        console.error("❌ Failed to connect to HubSpot:", hubspotError);
      }
    }

    return { success: true };
  } catch (error) {
    console.error("Action Error:", error);
    return { success: false, error: "Internal server error" };
  }
}
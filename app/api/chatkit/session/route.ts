import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const openaiApiKey = process.env.OPENAI_API_KEY;
    const workflowId = process.env.WORKFLOW_ID;

    if (!openaiApiKey) {
      return NextResponse.json(
        { error: 'OPENAI_API_KEY no está configurada' },
        { status: 500 }
      );
    }

    if (!workflowId) {
      return NextResponse.json(
        { error: 'WORKFLOW_ID no está configurada' },
        { status: 500 }
      );
    }

    // Obtener el user ID del body o generar uno aleatorio
    const body = await request.json().catch(() => ({}));
    const userId = body.userId || `user_${Math.random().toString(36).substring(7)}`;

    // Crear sesión de ChatKit usando la API HTTP directa de OpenAI
    const response = await fetch('https://api.openai.com/v1/chatkit/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'chatkit_beta=v1',
        'Authorization': `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify({
        workflow: { id: workflowId },
        user: userId,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Error de OpenAI API:', errorData);
      return NextResponse.json(
        { error: 'Error al crear sesión de ChatKit', details: errorData },
        { status: response.status }
      );
    }

    const session = await response.json();
    return NextResponse.json({
      client_secret: session.client_secret,
    });
  } catch (error: any) {
    console.error('Error al crear sesión de ChatKit:', error);
    return NextResponse.json(
      { error: 'Error al crear sesión de ChatKit', details: error.message },
      { status: 500 }
    );
  }
}


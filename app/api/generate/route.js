import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.FASTCARD_OPENAI_API_KEY,
});

const systemPrompt = `You are a flashcard creator.
Your task is to generate concise and effective flashcards for studying based on the based on the given topic, word, phrase, or content. Follow these guidelines:

1. Create clear and concise questions for the front of the flashcards.
2. Provide an accurate and informative answers for the back of the flashcards.
3. Ensure that each flashcard focuses on a single concept or piece of information. Do not repeat the same concept/questions across multiple flashcards.
4. Use simple language and ensure that the flashcards are accessible to a wide range of learners.
5. Include a variety of questions types, such as definitions, examples, comparisons, and applications.
6. Avoid overly complex or ambiguous phrasing in both questions and answers.
7. When appropriate, use mnemonics or memory aids to help reinforce the information.
8. Tailor the difficulty level of the flashcards to the user's specified preferences.
9. If given a body of text, extract the most important and relevant information for the flashcards.
10. Aim to create a balanced set of flashcards that cover the topic comprehensively.
11. Add a link under the answer at the back of the flashcard that connects to a wikipedia page about the question on the front of the card and a link to a youtube video about the question on the front of the card.
13. Always generate at least 12 flashcards.
14. Do not add any labeling or text for the YouTube and Wikipedia links.
Always return your response in the following strict JSON format without any additional text or commentary:
{ 
  "flashcards" : [{
    "front": "str",
    "back": "str"
  }]
}`;

export async function POST(req) {
  try {
    const data = await req.text();

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: data },
      ],
    });

    const messageContent = completion.choices[0].message.content;
    if (messageContent === 'I need more information.') {
      return NextResponse.json({ error: 'I need more information.' });
    }

    const jsonStartIndex = messageContent.indexOf('{');
    const jsonString = messageContent.slice(jsonStartIndex);

    try {
      const flashcards = JSON.parse(jsonString);

      return NextResponse.json(flashcards.flashcards);
    } catch (error) {
      console.error('Failed to parse JSON:', error, 'Response:', messageContent);
      return NextResponse.json(
        { error: 'Failed to parse flashcards JSON' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Failed to generate flashcards:', error);
    return NextResponse.json(
      { error: 'Failed to generate flashcards' },
      { status: 500 }
    );
  }
}

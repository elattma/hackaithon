import { traverseState } from "@/utils/stateMachine";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function POST(request: Request) {
  const body = await request.json();
  const { state, humanAction } = body;
  const newState = await traverseState(openai, state, humanAction);
  return NextResponse.json({ state: newState });
}

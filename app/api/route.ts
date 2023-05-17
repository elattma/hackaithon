import { ActionType } from "@/orchestrator/model";
import { traverseState } from "@/orchestrator/stateMachine";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function POST(request: Request) {
  const body = await request.json();
  const { state, action } = body;
  const newState = await traverseState(openai, state, action);
  return NextResponse.json({ state: newState, nextAction: ActionType });
}

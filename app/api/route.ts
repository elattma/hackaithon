import { Action, State } from "@/orchestrator/model";
import { traverseState } from "@/orchestrator/state-machine";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

function iteratorToStream(iterator: any) {
  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await iterator.next();

      if (done) {
        controller.close();
      } else {
        controller.enqueue(value);
      }
    },
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { state: rawState, action: rawAction } = body;
  const state: State = rawState;
  const action: Action = rawAction;
  if (!openai || !state || !action) {
    return NextResponse.error();
  }
  const iterator = traverseState(openai, state, action);
  const stream = iteratorToStream(iterator);
  return new Response(stream);
}

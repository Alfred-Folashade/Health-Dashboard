from flask import Flask, Response, request, stream_with_context
from openai import OpenAI
import os

app = Flask(__name__)
client = OpenAi(api_key=os.getenv("OPENAI_API_KEY"))

def stream_response(messages):
    stream=client.chat.completions.create(
        model="gpt-4o-mini",
        messages=messages,
        stream=True 
    )

    for events in stream:
        if events.choices[0].delta.get("content"):
            # SSE format: "data: <text>\n\n"
             yield f"data: {event.choices[0].delta.content}\n\n"
    yield "data: [DONE]\n\n"

@app.route("/chats", methods=["POST"])
def chat():
    data = request.get_json()
    messages = data.get('messages', [])
    return Response(
        stream_with_context(stream_response(responses)),
        mimetype="text/event-stream"
    )


if __name__ == "__main__":
    app.run(debug=True, threaded=True)


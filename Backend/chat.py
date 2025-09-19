from flask import Flask, Response, request, stream_with_context
from openai import OpenAI
from flask_cors import CORS
import os
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)
CORS(app, supports_credentials=True)
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def stream_response(messages):
    stream=client.chat.completions.create(
        model="gpt-4o-mini",
        messages=messages,
        stream=True 
    )
    print(stream);

    for events in stream:
       
        if events.choices[0].delta.content:
            # SSE format: "data: <text>\n\n"
             yield f"data: {events.choices[0].delta.content}\n\n"
    yield "data: [DONE]\n\n"

@app.route("/chats", methods=["POST"])
def chat():
    data = request.get_json()
    messages = data.get('messages', [])
    return Response(
        stream_with_context(stream_response(messages)),
        mimetype="text/event-stream"
    )


if __name__ == "__main__":
    app.run(debug=True, threaded=True)


from flask import Flask, jsonify, request, send_file

app = Flask(__name__)


@app.get("/")
def home():
    return send_file("my girl.html")


@app.get("/health")
def health():
    return jsonify({"status": "ok"})


@app.post("/api/plan")
def receive_plan():
    payload = request.get_json(silent=True) or {}
    required = ["date", "time", "place", "plan"]

    if not all(payload.get(field) for field in required):
        return jsonify({
            "ok": False,
            "message": "Please provide date, time, place, and plan."
        }), 400

    plan_data = {
        "date": payload["date"],
        "time": payload["time"],
        "place": payload["place"].strip(),
        "plan": payload["plan"].strip(),
    }

    return jsonify({
        "ok": True,
        "message": "Plan received successfully.",
        "data": plan_data
    })


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)

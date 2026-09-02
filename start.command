#!/bin/zsh
cd "$(dirname "$0")"
PORT=8000
URL="http://localhost:$PORT"

# Open the browser shortly after the server starts.
(sleep 1; open "$URL") &

python3 -m http.server "$PORT"

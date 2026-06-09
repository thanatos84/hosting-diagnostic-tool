#!/usr/bin/env python3
# test.py — Server-side Python test
# If the hosting server supports Python/CGI execution, it will run this script
# and return the output instead of the raw source code.

import sys
import json
import os
import platform
from datetime import datetime

response = {
    "status": "PYTHON_EXECUTED",
    "python_version": sys.version,
    "platform": platform.platform(),
    "timestamp": datetime.utcnow().isoformat(),
    "server_software": os.environ.get("SERVER_SOFTWARE", "unknown"),
    "gateway_interface": os.environ.get("GATEWAY_INTERFACE", "unknown"),
    "request_method": os.environ.get("REQUEST_METHOD", "unknown"),
    "script_name": os.environ.get("SCRIPT_NAME", "unknown"),
    "server_name": os.environ.get("SERVER_NAME", "unknown"),
    "server_port": os.environ.get("SERVER_PORT", "unknown"),
    "cgi": True
}

print("Content-Type: application/json")
print("")
print(json.dumps(response, indent=2))

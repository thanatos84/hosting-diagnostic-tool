#!/usr/bin/env python3
# test.cgi — CGI test script
# Tests if the server supports CGI execution

import sys
import json
import os
from datetime import datetime

response = {
    "status": "CGI_EXECUTED",
    "python_version": sys.version,
    "timestamp": datetime.utcnow().isoformat(),
    "server_software": os.environ.get("SERVER_SOFTWARE", "unknown"),
    "gateway_interface": os.environ.get("GATEWAY_INTERFACE", "unknown"),
    "request_method": os.environ.get("REQUEST_METHOD", "unknown"),
    "script_name": os.environ.get("SCRIPT_NAME", "unknown"),
    "content_type": os.environ.get("CONTENT_TYPE", "unknown"),
    "query_string": os.environ.get("QUERY_STRING", "unknown"),
    "path_info": os.environ.get("PATH_INFO", "unknown"),
    "remote_addr": os.environ.get("REMOTE_ADDR", "unknown"),
    "http_user_agent": os.environ.get("HTTP_USER_AGENT", "unknown"),
    "document_root": os.environ.get("DOCUMENT_ROOT", "unknown"),
    "cgi": True
}

print("Content-Type: application/json")
print("")
print(json.dumps(response, indent=2))

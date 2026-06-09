#!/bin/bash
# test.sh — Server-side Bash test
# If the hosting server supports Shell/CGI, it will run this script

echo "Content-Type: application/json"
echo ""

cat <<EOF
{
  "status": "BASH_EXECUTED",
  "shell": "$SHELL",
  "bash_version": "${BASH_VERSION:-unknown}",
  "user": "$(whoami 2>/dev/null || echo unknown)",
  "hostname": "$(hostname 2>/dev/null || echo unknown)",
  "kernel": "$(uname -s 2>/dev/null || echo unknown)",
  "arch": "$(uname -m 2>/dev/null || echo unknown)",
  "timestamp": "$(date -u +%Y-%m-%dT%H:%M:%SZ 2>/dev/null || echo unknown)",
  "cgi": true
}
EOF

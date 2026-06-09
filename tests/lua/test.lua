#!/usr/bin/env lua
-- test.lua — Server-side Lua test
-- If the hosting server supports Lua/CGI, it will run this script

io.write("Content-Type: application/json\r\n")
io.write("\r\n")

local response = string.format([[
{
  "status": "LUA_EXECUTED",
  "lua_version": "%s",
  "os": "%s",
  "timestamp": "%s",
  "cgi": true
}
]], _VERSION or "unknown", os and os.date("!%Y-%m-%dT%H:%M:%SZ") or "unknown", os and os.date("!%Y-%m-%dT%H:%M:%SZ") or "unknown")

print(response)

#!/usr/bin/env ruby
# test.rb — Server-side Ruby test
# If the hosting server supports Ruby/CGI execution, it will run this script

require 'json'

response = {
  status: "RUBY_EXECUTED",
  ruby_version: RUBY_VERSION,
  ruby_platform: RUBY_PLATFORM,
  timestamp: Time.now.utc.iso8601,
  cgi: true
}

print "Content-Type: application/json\r\n"
print "\r\n"
print JSON.pretty_generate(response)

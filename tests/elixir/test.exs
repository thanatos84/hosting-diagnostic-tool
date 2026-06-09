#!/usr/bin/env elixir
# test.exs — Server-side Elixir test
# If the hosting server supports Elixir, it will run this script

IO.puts("Content-Type: application/json")
IO.puts("")

response = %{
  status: "ELIXIR_EXECUTED",
  elixir_version: System.version(),
  erlang_version: System.otp_release(),
  timestamp: DateTime.utc_now() |> DateTime.to_iso8601(),
  cgi: true
}

response
|> Jason.encode!()
|> IO.puts()

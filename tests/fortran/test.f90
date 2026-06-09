program test_fortran
  ! test.f90 — Server-side Fortran test
  ! If the hosting server supports Fortran CGI, it will compile and run this

  implicit none
  character(len=8) :: date
  character(len=10) :: time

  call date_and_time(date, time)

  print *, "Content-Type: application/json"
  print *, ""
  print *, "{"
  print *, "  ""status"": ""FORTRAN_EXECUTED"","
  print *, "  ""compiler"": ""gfortran"","
  print *, "  ""timestamp"": """ // date(1:4) // "-" // date(5:6) // "-" // date(7:8) // "T" // time(1:2) // ":" // time(3:4) // ":" // time(5:6) // "Z"","
  print *, "  ""cgi"": true"
  print *, "}"

end program test_fortran

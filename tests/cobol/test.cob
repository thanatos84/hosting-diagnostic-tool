       IDENTIFICATION DIVISION.
       PROGRAM-ID. TEST-COBOL.
       AUTHOR. THANATOS-DIAGNOSTIC.
       DATE-WRITTEN. 2024-01-01.

       PROCEDURE DIVISION.
           DISPLAY "Content-Type: application/json".
           DISPLAY "".
           DISPLAY "{".
           DISPLAY "  ""status"": ""COBOL_EXECUTED"",".
           DISPLAY "  ""runtime"": ""GnuCOBOL"",".
           DISPLAY "  ""cgi"": true".
           DISPLAY "}".
           STOP RUN.

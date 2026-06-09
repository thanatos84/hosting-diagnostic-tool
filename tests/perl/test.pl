#!/usr/bin/perl
# test.pl — Server-side Perl test
# If the hosting server supports Perl/CGI, it will execute this script

use strict;
use warnings;
use JSON::PP;

print "Content-Type: application/json\r\n\r\n";

my $response = {
    status => "PERL_EXECUTED",
    perl_version => $^V,
    timestamp => scalar gmtime(),
    os => $^O,
    cgi => JSON::PP::true
};

print JSON::PP->new->pretty->encode($response);

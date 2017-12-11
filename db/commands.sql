-- HELP & GENERAL
-- list shell commands 
\?

-- help on syntax of SQL commands
\h [NAME]              

-- quit psql
-- \q

-- INFORMATIONAL ("+" = additional detail)
-- list databases
\l[+]

-- list tables, views, and sequences
\d[+]                 
-- describe table, view, sequence, or index
\d[+]  NAME           
-- list tables
\dt[+]
-- list user roles
\du[+]

-- FORMATTING
\H                     toggle HTML output mode (currently off)

-- CONNECTION
  \c[onnect] {[DBNAME|- USER|- HOST|- PORT|-] | conninfo}

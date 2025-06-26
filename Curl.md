curl -X GET https://dragon-ball-api-grlr.onrender.com/random

curl -X GET https://dragon-ball-api-grlr.onrender.com/question/60

curl -X GET https://dragon-ball-api-grlr.onrender.com/series/Dragon%20Ball%20Movies

curl -X POST https://dragon-ball-api-grlr.onrender.com/add \
  -H "Content-Type: application/json" \
  -d '{"question":"Who is Goku'\''s first enemy in the Dragon Ball Z: Dead Zone movie?","answer":"Garlic Jr.","series":"Dragon Ball Movies"}'

curl -X PUT https://dragon-ball-api-grlr.onrender.com/question/60 \
  -H "Content-Type: application/json" \
  -d '{"question":"Who is Goku'\''s first enemy in the Dragon Ball Z: Dead Zone movie?","answer":"Garlic Jr.","series":"Dragon Ball Movies"}'

curl -X PATCH https://dragon-ball-api-grlr.onrender.com/question/60 \
  -H "Content-Type: application/json" \
  -d '{"answer":"Garlic Jr."}'

curl -X DELETE https://dragon-ball-api-grlr.onrender.com/question/60 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9wre.eyJ1c2VybmFtZSI6IlNoYXJkZW5kdSBNaXNocmEiLCJpYXQiOjE3NwrwerTA5NzEwODQsImV4cCI6MTc1MDk3NDY4NH0.eZfgHIe7rBIi0-53Maf9QHT6oF8GECWjzBOPv5UxpIo"

curl -X DELETE https://dragon-ball-api-grlr.onrender.com/delete \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9wre.eyJ1c2VybmFtZSI6IlNoYXJkZW5kdSBNaXNocmEiLCJpYXQiOjE3NwrwerTA5NzEwODQsImV4cCI6MTc1MDk3NDY4NH0.eZfgHIe7rBIi0-53Maf9QHT6oF8GECWjzBOPv5UxpIo"

curl -X POST https://dragon-ball-api-grlr.onrender.com/GetTokenAdmin \
  -H "Content-Type: application/json" \
  -d '{"username":"Shardendu Mishra","password":"i like ice little too much"}'
